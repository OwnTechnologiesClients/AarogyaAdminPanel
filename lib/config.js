const rawBackendUrl =
  process.env.NEXT_PUBLIC_BACKEND_URL_PRODUCTION ||
  process.env.BACKEND_URL_PRODUCTION ||
  process.env.Backend_URL_PRODUCTION ||
  process.env.backend_url_production ||
  'http://localhost:5000';

const normalizeBaseUrl = (url) => {
  if (!url) return '';
  return url.endsWith('/') ? url.slice(0, -1) : url;
};

export const BACKEND_URL = normalizeBaseUrl(rawBackendUrl);

export const API_BASE_URL = `${BACKEND_URL}/api`;

export const resolveBackendPath = (path = '') => {
  if (!path) return '';
  if (typeof path !== 'string') return path;

  if (/^https?:\/\//i.test(path)) {
    return path;
  }

  if (!path.startsWith('/')) {
    path = `/${path}`;
  }

  return `${BACKEND_URL}${path}`;
};

export default {
  BACKEND_URL,
  API_BASE_URL,
  resolveBackendPath,
};

