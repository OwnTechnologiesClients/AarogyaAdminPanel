export const getAdminRole = () => {
  if (typeof window === 'undefined') return 'admin'
  return localStorage.getItem('adminRole') || 'admin'
}

export const isSuperadmin = () => {
  return getAdminRole() === 'superadmin'
}

export const isAdmin = () => {
  const role = getAdminRole()
  return role === 'admin' || role === 'superadmin'
}

export const getAdminName = () => {
  if (typeof window === 'undefined') return 'Admin'
  return localStorage.getItem('adminName') || 'Admin'
}

export const isAuthenticated = () => {
  if (typeof window === 'undefined') return false
  return !!localStorage.getItem('adminToken')
}
