import api from '@/lib/api'

export const SpecialityApi = {
  list: (params = {}) => api.get('/specialties/list', { params }).then(r => r.data),
  getById: (id) => api.get(`/specialties/list/${id}`).then(r => r.data),
  create: (data) => api.post('/specialties/create', data).then(r => r.data),
  update: (id, data) => api.put(`/specialties/update/${id}`, data).then(r => r.data),
  remove: (id) => api.delete(`/specialties/delete/${id}`).then(r => r.data)
}

export default SpecialityApi
