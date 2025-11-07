"use client"

import { useState, useEffect } from "react"
import { Layout } from "@/components/layout"
import { Pagination } from "@/components/ui/pagination"
import { 
  Plus, 
  Search, 
  Edit, 
  Trash2, 
  Eye,
  UserCog,
  Mail,
  Shield,
  Filter
} from "lucide-react"
import Link from "next/link"
import Swal from 'sweetalert2'
import { useRouter } from 'next/navigation'
import { isSuperadmin } from '@/lib/authUtils'
import { API_BASE_URL, BACKEND_URL } from "@/lib/config"

export default function AdminUsersPage() {
  const router = useRouter()
  const [searchTerm, setSearchTerm] = useState("")
  const [adminUsers, setAdminUsers] = useState([])
  const [loading, setLoading] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [totalItems, setTotalItems] = useState(0)
  const [itemsPerPage, setItemsPerPage] = useState(10)
  const [filterRole, setFilterRole] = useState("")
  const [filterStatus, setFilterStatus] = useState("")

  // Server-side pagination handlers
  const handlePageChange = (page) => {
    setCurrentPage(page)
  }

  const handleItemsPerPageChange = (newItemsPerPage, total = null, totalPages = null) => {
    setItemsPerPage(newItemsPerPage)
    setCurrentPage(1)
    if (total !== null) setTotalItems(total)
    if (totalPages !== null) setTotalPages(totalPages)
  }

  const resetPagination = () => {
    setCurrentPage(1)
  }

  useEffect(() => {
    if (!isSuperadmin()) {
      router.push('/')
      return
    }
    
    const fetchData = async () => {
      setLoading(true)
      try {
        const params = new URLSearchParams({
          page: currentPage,
          limit: itemsPerPage,
          ...(searchTerm && { search: searchTerm }),
          ...(filterRole && { role: filterRole }),
          ...(filterStatus && { isActive: filterStatus })
        })

        const token = localStorage.getItem('adminToken')
        const response = await fetch(`${API_BASE_URL}/admin/users?${params}`, {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        })
        const data = await response.json()

        if (data?.success) {
          setAdminUsers(data.data || [])
          setTotalItems(data.pagination?.total || 0)
          setTotalPages(data.pagination?.totalPages || 1)
        } else {
          console.error('API Error:', data)
          setAdminUsers([])
          setTotalItems(0)
          setTotalPages(1)
        }
      } catch (e) {
        console.error('Error fetching admin users:', e)
        setAdminUsers([])
        setTotalItems(0)
        setTotalPages(1)
        if (e.response?.status === 404) {
          console.error('API endpoint not found. Make sure the backend is running.')
        } else if (e.code === 'ECONNREFUSED') {
          console.error(`Cannot connect to backend server. Make sure it's running on ${BACKEND_URL}`)
        }
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [currentPage, itemsPerPage, searchTerm, filterRole, filterStatus, router])

  const handleSearch = (e) => {
    setSearchTerm(e.target.value)
    resetPagination()
  }

  const handleToggleStatus = async (adminUserId, adminUserName, currentStatus) => {
    const newStatus = !currentStatus
    const action = newStatus ? 'activate' : 'deactivate'
    
    const result = await Swal.fire({
      title: `Are you sure?`,
      text: `You are about to ${action} admin user "${adminUserName}".`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: newStatus ? '#10b981' : '#ef4444',
      cancelButtonColor: '#6b7280',
      confirmButtonText: `Yes, ${action}!`,
      cancelButtonText: 'Cancel'
    })

    if (result.isConfirmed) {
      try {
        const token = localStorage.getItem('adminToken')
        const response = await fetch(`${API_BASE_URL}/admin/users/${adminUserId}`, {
          method: 'PUT',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            isActive: newStatus
          })
        })
        
        if (response.ok) {
          await Swal.fire({
            title: 'Success!',
            text: `Admin user ${action}d successfully.`,
            icon: 'success',
            timer: 2000,
            showConfirmButton: false
          })
          
          const refreshParams = new URLSearchParams({
            page: currentPage,
            limit: itemsPerPage,
          })
          if (searchTerm) {
            refreshParams.set('search', searchTerm)
          }
          const data = await fetch(`${API_BASE_URL}/admin/users?${refreshParams.toString()}`, {
            headers: {
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json'
            }
          })
          const result = await data.json()
          if (result?.success) {
            setAdminUsers(result.data || [])
            setTotalItems(result.pagination?.total || 0)
            setTotalPages(result.pagination?.totalPages || 1)
          }
        } else {
          const errorData = await response.json()
          await Swal.fire({
            title: 'Error!',
            text: errorData.message || `Failed to ${action} admin user`,
            icon: 'error',
            confirmButtonText: 'OK'
          })
        }
      } catch (error) {
        await Swal.fire({
          title: 'Error!',
          text: `Failed to ${action} admin user`,
          icon: 'error',
          confirmButtonText: 'OK'
        })
      }
    }
  }

  const handleDeleteAdminUser = async (adminUserId, adminUserName) => {
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: `You are about to delete admin user "${adminUserName}". This action cannot be undone!`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'Cancel'
    })

    if (result.isConfirmed) {
      try {
        const token = localStorage.getItem('adminToken')
        const response = await fetch(`${API_BASE_URL}/admin/users/${adminUserId}`, {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        })
        
        if (response.ok) {
          await Swal.fire({
            title: 'Deleted!',
            text: 'Admin user has been deleted successfully.',
            icon: 'success',
            confirmButtonText: 'OK'
          })
          // Refresh the data
          router.refresh()
          // Also refetch the data
          const token = localStorage.getItem('adminToken')
          const refreshParams = new URLSearchParams({
            page: currentPage,
            limit: itemsPerPage,
          })
          if (searchTerm) {
            refreshParams.set('search', searchTerm)
          }
          const data = await fetch(`${API_BASE_URL}/admin/users?${refreshParams.toString()}`, {
            headers: {
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json'
            }
          })
          const result = await data.json()
          if (result?.success) {
            setAdminUsers(result.data || [])
            setTotalItems(result.pagination?.total || 0)
            setTotalPages(result.pagination?.totalPages || 1)
          }
        } else {
          throw new Error('Failed to delete admin user')
        }
      } catch (error) {
        await Swal.fire({
          title: 'Error!',
          text: error?.message || 'Failed to delete admin user',
          icon: 'error',
          confirmButtonText: 'OK'
        })
      }
    }
  }

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Admin Users</h1>
            <p className="text-gray-700 text-lg">Manage admin users and their permissions</p>
          </div>
          <Link href="/admin-users/add">
            <button className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold shadow-sm">
              Add New Admin User
            </button>
          </Link>
        </div>

        <div className="bg-gradient-to-br from-white to-blue-50 rounded-xl shadow-lg border border-blue-100">
          {/* Search and Controls */}
          <div className="p-6 border-b border-blue-200 bg-gradient-to-r from-blue-50 to-indigo-50">
            <div className="flex justify-between items-center">
              <div className="flex items-center space-x-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-600 w-4 h-4" />
                  <input
                    type="text"
                    placeholder="Search admin users by name or email..."
                    value={searchTerm}
                    onChange={handleSearch}
                    className="pl-10 pr-4 py-3 border-2 border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 w-80 text-gray-900 placeholder-gray-500 shadow-md bg-white"
                  />
                </div>
                <select
                  value={filterRole}
                  onChange={(e) => setFilterRole(e.target.value)}
                  className="px-4 py-3 border-2 border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 shadow-md bg-white"
                >
                  <option value="">All Roles</option>
                  <option value="admin">Admin</option>
                  <option value="superadmin">Super Admin</option>
                </select>
                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className="px-4 py-3 border-2 border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 shadow-md bg-white"
                >
                  <option value="">All Status</option>
                  <option value="true">Active</option>
                  <option value="false">Inactive</option>
                </select>
                <button className="flex items-center space-x-2 px-4 py-3 border-2 border-blue-200 rounded-lg hover:bg-blue-50 hover:border-blue-400 transition-colors shadow-md bg-white">
                  <Filter className="w-4 h-4 text-blue-600" />
                  <span className="text-sm font-medium text-gray-900">Filter</span>
                </button>
              </div>
              {searchTerm && (
                <div className="text-sm text-gray-800 font-semibold bg-blue-100 px-4 py-2 rounded-lg">
                  Found <span className="text-blue-700 font-bold">{totalItems}</span> admin user{totalItems !== 1 ? 's' : ''}
                  <span className="text-gray-700 ml-2">for "{searchTerm}"</span>
                </div>
              )}
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gradient-to-r from-blue-600 to-indigo-600">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-bold text-white uppercase tracking-wider">
                    Admin User
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-bold text-white uppercase tracking-wider">
                    Role
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-bold text-white uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-bold text-white uppercase tracking-wider">
                    Created
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-bold text-white uppercase tracking-wider">
                    Last Login
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-bold text-white uppercase tracking-wider">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-blue-100">
                {loading ? (
                  <tr>
                    <td colSpan="6" className="px-4 py-8 text-center text-gray-500">
                      <div className="flex items-center justify-center space-x-2">
                        <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600"></div>
                        <span>Loading admin users...</span>
                      </div>
                    </td>
                  </tr>
                ) : adminUsers.length === 0 ? (
                  <tr>
                    <td colSpan="6" className="px-4 py-8 text-center text-gray-500">
                      <div className="flex flex-col items-center space-y-2">
                        <div className="text-gray-400">
                          <UserCog className="w-12 h-12 mx-auto" />
                        </div>
                        <span className="text-lg font-medium">No admin users found</span>
                        <span className="text-sm">
                          {searchTerm ? `No admin users match "${searchTerm}"` : 'Start by adding your first admin user'}
                        </span>
                      </div>
                    </td>
                  </tr>
                ) : (
                  adminUsers.map((user) => (
                    <tr key={user._id} className="hover:bg-blue-50 transition-colors">
                      <td className="px-4 py-3 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="w-12 h-12 rounded-lg overflow-hidden ring-2 ring-blue-200 bg-blue-100 flex items-center justify-center">
                            <UserCog className="h-6 w-6 text-blue-600" />
                          </div>
                          <div className="ml-3">
                            <div className="text-sm font-bold text-gray-900">{user.name}</div>
                            <div className="text-xs text-gray-500 flex items-center gap-1">
                              <Mail className="h-3 w-3" />
                              {user.email}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm font-semibold text-gray-800">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          user.role === 'superadmin' 
                            ? 'bg-red-100 text-red-800' 
                            : 'bg-blue-100 text-blue-800'
                        }`}>
                          <Shield className="h-3 w-3 mr-1" />
                          {user.role}
                        </span>
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm font-semibold text-gray-800">
                        <button
                          onClick={() => handleToggleStatus(user._id, user.name, user.isActive)}
                          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium cursor-pointer hover:opacity-80 transition-opacity ${
                            user.isActive 
                              ? 'bg-green-100 text-green-800 hover:bg-green-200' 
                              : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                          }`}
                          title={`Click to ${user.isActive ? 'deactivate' : 'activate'} user`}
                        >
                          {user.isActive ? 'Active' : 'Inactive'}
                        </button>
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm font-semibold text-gray-800">
                        {new Date(user.createdAt).toLocaleDateString()}
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm font-semibold text-gray-800">
                        {user.lastLogin 
                          ? new Date(user.lastLogin).toLocaleDateString()
                          : "Never"
                        }
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm font-medium">
                        <div className="flex items-center space-x-2">
                          <button 
                            onClick={() => handleDeleteAdminUser(user._id, user.name)}
                            className="text-red-600 hover:text-red-700 p-2 rounded hover:bg-red-50 transition-colors"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                          <Link href={`/admin-users/edit/${user._id}`} className="text-green-600 hover:text-green-700 p-2 rounded hover:bg-green-50 transition-colors">
                            <Edit className="w-4 h-4" />
                          </Link>
                          <Link href={`/admin-users/view/${user._id}`} className="text-blue-600 hover:text-blue-700 p-2 rounded hover:bg-blue-50 transition-colors">
                            <Eye className="w-4 h-4" />
                          </Link>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border-t border-blue-200">
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
              totalItems={totalItems}
              itemsPerPage={itemsPerPage}
              onItemsPerPageChange={handleItemsPerPageChange}
            />
          </div>
        </div>
      </div>
    </Layout>
  )
}
