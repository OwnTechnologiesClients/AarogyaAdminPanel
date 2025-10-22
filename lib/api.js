import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000/api',
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: false,
});

// Optional: Add a request interceptor for auth token
api.interceptors.request.use(
  (config) => {
    // Example: Attach token from localStorage if available
    const token = typeof window !== 'undefined' ? (localStorage.getItem('token') || localStorage.getItem('adminToken')) : null;
    console.log('Admin API Request:', {
      url: config.url,
      hasToken: !!token,
      tokenPreview: token ? token.substring(0, 20) + '...' : 'No token'
    });
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Add a response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.log('Admin API Error:', {
      status: error.response?.status,
      url: error.config?.url,
      message: error.message
    });
    
    // Handle 401 Unauthorized errors
    if (error.response && error.response.status === 401) {
      console.log('401 Error - Authentication failed');
      console.log('Error details:', error.response.data);
      console.log('Request URL:', error.config?.url);
      
      // Clear tokens for all 401 errors
      if (typeof window !== 'undefined') {
        localStorage.removeItem('adminToken');
        localStorage.removeItem('token');
        localStorage.removeItem('adminName');
        localStorage.removeItem('adminRole');
        
        // Only redirect if not already on login page
        if (window.location.pathname !== '/login') {
          console.log('Redirecting to login due to 401 error');
          window.location.href = '/login';
        }
      }
    }
    return Promise.reject(error);
  }
);

export default api;