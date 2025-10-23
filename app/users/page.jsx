"use client"

import { useState, useEffect } from "react"
import { Layout } from "@/components/layout"
import { Pagination } from "@/components/ui/pagination"
import { 
  Search, 
  Filter,
  User,
  Mail,
  Phone,
  Shield,
  Calendar,
  Eye
} from "lucide-react"
import { useRouter } from 'next/navigation'

export default function UsersPage() {
  const router = useRouter()
  const [searchTerm, setSearchTerm] = useState("")
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [totalItems, setTotalItems] = useState(0)
  const [itemsPerPage, setItemsPerPage] = useState(10)
  const [filterAuthProvider, setFilterAuthProvider] = useState("")

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
    const fetchData = async () => {
      setLoading(true)
      try {
        const params = new URLSearchParams({
          page: currentPage,
          limit: itemsPerPage,
          ...(searchTerm && { search: searchTerm }),
          ...(filterAuthProvider && { authProvider: filterAuthProvider })
        })

        const response = await fetch(`http://localhost:5000/api/users?${params}`)
        const data = await response.json()

        if (data?.success) {
          setUsers(data.data || [])
          setTotalItems(data.pagination?.total || 0)
          setTotalPages(data.pagination?.totalPages || 1)
        }
      } catch (e) {
        console.error('Error fetching users:', e)
        setUsers([])
        setTotalItems(0)
        setTotalPages(1)
        if (e.response?.status === 404) {
          console.error('API endpoint not found. Make sure the backend is running.')
        } else if (e.code === 'ECONNREFUSED') {
          console.error('Cannot connect to backend server. Make sure it\'s running on http://localhost:5000')
        }
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [currentPage, itemsPerPage, searchTerm, filterAuthProvider])

  const handleSearch = (e) => {
    setSearchTerm(e.target.value)
    resetPagination()
  }

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Registered Users</h1>
            <p className="text-gray-700 text-lg">View and manage all users who have logged in</p>
          </div>
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
                    placeholder="Search users by name, email, phone..."
                    value={searchTerm}
                    onChange={handleSearch}
                    className="pl-10 pr-4 py-3 border-2 border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 w-80 text-gray-900 placeholder-gray-500 shadow-md bg-white"
                  />
                </div>
                <select
                  value={filterAuthProvider}
                  onChange={(e) => setFilterAuthProvider(e.target.value)}
                  className="px-4 py-3 border-2 border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 shadow-md bg-white"
                >
                  <option value="">All Auth Methods</option>
                  <option value="google">Google</option>
                  <option value="phone">Phone</option>
                  <option value="email">Email</option>
                </select>
                <button className="flex items-center space-x-2 px-4 py-3 border-2 border-blue-200 rounded-lg hover:bg-blue-50 hover:border-blue-400 transition-colors shadow-md bg-white">
                  <Filter className="w-4 h-4 text-blue-600" />
                  <span className="text-sm font-medium text-gray-900">Filter</span>
                </button>
              </div>
              {searchTerm && (
                <div className="text-sm text-gray-800 font-semibold bg-blue-100 px-4 py-2 rounded-lg">
                  Found <span className="text-blue-700 font-bold">{totalItems}</span> user{totalItems !== 1 ? 's' : ''}
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
                    User
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-bold text-white uppercase tracking-wider">
                    Auth Method
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-bold text-white uppercase tracking-wider">
                    Last Login
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-bold text-white uppercase tracking-wider">
                    Created
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-bold text-white uppercase tracking-wider">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-blue-100">
                {loading ? (
                  <tr>
                    <td colSpan="5" className="px-4 py-8 text-center text-gray-500">
                      <div className="flex items-center justify-center space-x-2">
                        <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600"></div>
                        <span>Loading users...</span>
                      </div>
                    </td>
                  </tr>
                ) : users.length === 0 ? (
                  <tr>
                    <td colSpan="5" className="px-4 py-8 text-center text-gray-500">
                      <div className="flex flex-col items-center space-y-2">
                        <div className="text-gray-400">
                          <User className="w-12 h-12 mx-auto" />
                        </div>
                        <span className="text-lg font-medium">No users found</span>
                        <span className="text-sm">
                          {searchTerm ? `No users match "${searchTerm}"` : 'No users have registered yet'}
                        </span>
                      </div>
                    </td>
                  </tr>
                ) : (
                  users.map((user) => (
                    <tr key={user._id} className="hover:bg-blue-50 transition-colors">
                      <td className="px-4 py-3 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="w-12 h-12 rounded-lg overflow-hidden ring-2 ring-blue-200 bg-blue-100 flex items-center justify-center">
                            {user.photoURL ? (
                              <img 
                                src={user.photoURL} 
                                alt={user.displayName}
                                className="w-full h-full object-cover"
                                onError={(e) => {
                                  e.target.style.display = 'none';
                                  e.target.nextSibling.style.display = 'flex';
                                }}
                              />
                            ) : null}
                            <div className="w-full h-full bg-blue-100 rounded-lg flex items-center justify-center" style={{ display: user.photoURL ? 'none' : 'flex' }}>
                              <span className="text-sm font-semibold text-blue-600">
                                {(user.displayName || '').split(' ').map(n => n[0]).join('')}
                              </span>
                            </div>
                          </div>
                          <div className="ml-3">
                            <div className="text-sm font-bold text-gray-900">{user.displayName}</div>
                            <div className="text-xs text-gray-500 flex items-center gap-1">
                              {user.email && (
                                <>
                                  <Mail className="h-3 w-3" />
                                  {user.email}
                                </>
                              )}
                              {user.phoneNumber && (
                                <>
                                  <Phone className="h-3 w-3 ml-2" />
                                  {user.phoneNumber}
                                </>
                              )}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm font-semibold text-gray-800">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          user.authProvider === 'google' 
                            ? 'bg-red-100 text-red-800' 
                            : user.authProvider === 'phone'
                            ? 'bg-green-100 text-green-800'
                            : 'bg-blue-100 text-blue-800'
                        }`}>
                          <Shield className="h-3 w-3 mr-1" />
                          {user.authProvider}
                        </span>
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm font-semibold text-gray-800">
                        {user.lastLogin 
                          ? new Date(user.lastLogin).toLocaleDateString()
                          : "Never"
                        }
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm font-semibold text-gray-800">
                        {new Date(user.createdAt).toLocaleDateString()}
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm font-medium">
                        <div className="flex items-center space-x-2">
                          <button className="text-blue-600 hover:text-blue-700 p-2 rounded hover:bg-blue-50 transition-colors">
                            <Eye className="w-4 h-4" />
                          </button>
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