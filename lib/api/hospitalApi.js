import api from '@/lib/api'

export const HospitalApi = {
  list: (params = {}) => api.get('/hospitals/list', { params }).then(r => r.data),
  getById: (id) => api.get(`/hospitals/list/${id}`).then(r => r.data),
  create: (formData) => api.post('/hospitals/create', formData, { headers: { 'Content-Type': 'multipart/form-data' } }).then(r => r.data),
  update: (id, formData) => api.put(`/hospitals/update/${id}`, formData, { headers: { 'Content-Type': 'multipart/form-data' } }).then(r => r.data),
  remove: (id) => api.delete(`/hospitals/delete/${id}`).then(r => r.data)
}

export default HospitalApi


