"use client"

import { useState, useEffect } from "react"
import { useRouter, useParams } from "next/navigation"
import { isSuperadmin } from '@/lib/authUtils'
import { Layout } from "@/components/layout"
import { 
  UserCog, 
  ArrowLeft, 
  Save, 
  Mail,
  User,
  Shield,
  ToggleLeft,
  ToggleRight
} from "lucide-react"
import Link from "next/link"
import Swal from 'sweetalert2'
import { API_BASE_URL } from "@/lib/config"

export default function EditAdminUserPage() {
  const router = useRouter()
  const params = useParams()
  const adminUserId = params.id
  
  const [loading, setLoading] = useState(false)
  const [fetching, setFetching] = useState(true)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    role: "admin",
    isActive: true
  })

  useEffect(() => {
    if (!isSuperadmin()) {
      router.push('/')
      return
    }
    
    fetchAdminUser()
  }, [adminUserId, router])

  const fetchAdminUser = async () => {
    try {
      const token = localStorage.getItem('adminToken')
      const response = await fetch(`${API_BASE_URL}/admin/users/${adminUserId}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      })

      if (!response.ok) {
        if (response.status === 404) {
          setError("Admin user not found")
        } else if (response.status === 401) {
          setError("Authentication failed. Please login again.")
        } else if (response.status === 403) {
          setError("Access denied. Only superadmin can edit admin users.")
        } else {
          setError("Failed to fetch admin user")
        }
        return
      }

      const data = await response.json()
      if (data.success) {
        setFormData({
          name: data.data.name,
          email: data.data.email,
          role: data.data.role,
          isActive: data.data.isActive
        })
      } else {
        setError(data.message || "Failed to fetch admin user")
      }
    } catch (error) {
      console.error("Error fetching admin user:", error)
      setError("An error occurred while fetching the admin user")
    } finally {
      setFetching(false)
    }
  }

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }))
    if (error) setError("")
  }

  const validateForm = () => {
    if (!formData.name.trim()) {
      setError("Name is required")
      return false
    }

    if (!formData.email.trim()) {
      setError("Email is required")
      return false
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      setError("Please enter a valid email address")
      return false
    }

    return true
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!isSuperadmin()) {
      router.push('/')
      return
    }
    
    if (!validateForm()) return

    setLoading(true)
    setError("")

    try {
      const token = localStorage.getItem('adminToken')
      const response = await fetch(`${API_BASE_URL}/admin/users/${adminUserId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          role: formData.role,
          isActive: formData.isActive
        })
      })

      const data = await response.json()

      if (!response.ok) {
        if (response.status === 401) {
          setError("Authentication failed. Please login again.")
        } else if (response.status === 403) {
          setError("Access denied. Only superadmin can edit admin users.")
        } else if (response.status === 400) {
          setError(data.message || "Invalid data provided. Please check your inputs.")
        } else {
          setError(data.message || "Failed to update admin user")
        }
        return
      }

      if (data.success) {
        await Swal.fire({
          title: 'Success!',
          text: 'Admin user updated successfully!',
          icon: 'success',
          timer: 2000,
          showConfirmButton: false
        })
        router.push("/admin-users")
      } else {
        console.error('Update admin user error:', data)
        setError(data.message || "Failed to update admin user")
      }
    } catch (error) {
      console.error("Error updating admin user:", error)
      setError("An error occurred while updating the admin user")
    } finally {
      setLoading(false)
    }
  }

  if (fetching) {
    return (
      <Layout>
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          <span className="ml-2 text-gray-600">Loading admin user...</span>
        </div>
      </Layout>
    )
  }

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <Link href="/admin-users">
            <button className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-colors">
              <ArrowLeft className="h-4 w-4" />
              Back to Admin Users
            </button>
          </Link>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Edit Admin User</h1>
            <p className="text-gray-700 text-lg">Update admin user information and permissions</p>
          </div>
        </div>

        <div className="bg-gradient-to-br from-white to-blue-50 rounded-xl shadow-lg border border-blue-100 p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {success && (
              <div className="p-4 bg-green-50 border border-green-200 text-green-700 rounded-lg">
                {success}
              </div>
            )}

            {error && (
              <div className="p-4 bg-red-50 border border-red-200 text-red-700 rounded-lg">
                {error}
              </div>
            )}

            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                <User className="h-4 w-4 inline mr-2" />
                Full Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="Enter full name"
                className="w-full px-4 py-3 border-2 border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 placeholder-gray-500 shadow-md bg-white"
                required
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                <Mail className="h-4 w-4 inline mr-2" />
                Email Address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="Enter email address"
                className="w-full px-4 py-3 border-2 border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 placeholder-gray-500 shadow-md bg-white"
                required
              />
            </div>

            <div>
              <label htmlFor="role" className="block text-sm font-medium text-gray-700 mb-2">
                <Shield className="h-4 w-4 inline mr-2" />
                Role
              </label>
              <select
                id="role"
                name="role"
                value={formData.role}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border-2 border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 shadow-md bg-white"
              >
                <option value="admin">Admin</option>
                <option value="superadmin">Super Admin</option>
              </select>
              <p className="text-sm text-gray-500 mt-1">
                Super Admin has full access to all features including user management
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Account Status
              </label>
              <div className="flex items-center space-x-3">
                <button
                  type="button"
                  onClick={() => setFormData(prev => ({ ...prev, isActive: !prev.isActive }))}
                  className="flex items-center space-x-2"
                >
                  {formData.isActive ? (
                    <ToggleRight className="h-8 w-8 text-green-600" />
                  ) : (
                    <ToggleLeft className="h-8 w-8 text-gray-400" />
                  )}
                  <span className={`text-sm font-medium ${formData.isActive ? 'text-green-600' : 'text-gray-500'}`}>
                    {formData.isActive ? 'Active' : 'Inactive'}
                  </span>
                </button>
                <p className="text-sm text-gray-500">
                  {formData.isActive ? 'User can login and access the system' : 'User cannot login or access the system'}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4 pt-6">
              <button
                type="submit"
                disabled={loading}
                className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                    Updating...
                  </>
                ) : (
                  <>
                    <Save className="h-4 w-4" />
                    Update Admin User
                  </>
                )}
              </button>
              
              <Link href="/admin-users">
                <button 
                  type="button" 
                  className="px-6 py-3 border-2 border-blue-200 text-blue-600 rounded-lg hover:bg-blue-50 hover:border-blue-400 transition-colors font-semibold shadow-sm"
                >
                  Cancel
                </button>
              </Link>
            </div>
          </form>
        </div>
      </div>
    </Layout>
  )
}
