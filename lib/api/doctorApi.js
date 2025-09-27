import api from '@/lib/api'

export const DoctorApi = {
  list: (params = {}) => api.get('/doctors/list', { params }).then(r => r.data),
  getById: (id) => api.get(`/doctors/list/${id}`).then(r => r.data),
  create: (formData) => api.post('/doctors/create', formData, { headers: { 'Content-Type': 'multipart/form-data' } }).then(r => r.data),
  update: (id, formData) => api.put(`/doctors/update/${id}`, formData, { headers: { 'Content-Type': 'multipart/form-data' } }).then(r => r.data),
  remove: (id) => api.delete(`/doctors/delete/${id}`).then(r => r.data)
}

export default DoctorApi


