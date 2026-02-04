import api from '@/lib/api'

export const EquipmentApi = {
  list: (params = {}) => api.get('/medical-equipments/list', { params }).then(r => r.data),
  getById: (id) => api.get(`/medical-equipments/list/${id}`).then(r => r.data),
  create: (data) => api.post('/medical-equipments/create', data).then(r => r.data),
  update: (id, data) => api.put(`/medical-equipments/update/${id}`, data).then(r => r.data),
  remove: (id) => api.delete(`/medical-equipments/delete/${id}`).then(r => r.data)
}

export default EquipmentApi
