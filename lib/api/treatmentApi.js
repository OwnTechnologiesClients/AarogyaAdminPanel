import api from '@/lib/api'

export const TreatmentApi = {
  list: (params = {}) => api.get('/treatments/list', { params }).then(r => r.data),
  getById: (id) => api.get(`/treatments/list/${id}`).then(r => r.data),
  create: (formData) => api.post('/treatments/create', formData, { headers: { 'Content-Type': 'multipart/form-data' } }).then(r => r.data),
  update: (id, formData) => api.put(`/treatments/update/${id}`, formData, { headers: { 'Content-Type': 'multipart/form-data' } }).then(r => r.data),
  remove: (id) => api.delete(`/treatments/delete/${id}`).then(r => r.data)
}

export default TreatmentApi
