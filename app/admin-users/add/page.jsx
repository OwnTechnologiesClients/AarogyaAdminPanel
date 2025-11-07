"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { isSuperadmin } from '@/lib/authUtils'
import { Layout } from "@/components/layout"
import { 
  UserCog, 
  ArrowLeft, 
  Save, 
  Eye, 
  EyeOff,
  Mail,
  Lock,
  User,
  Shield
} from "lucide-react"
import Link from "next/link"
import Swal from 'sweetalert2'
import { API_BASE_URL } from "@/lib/config"

export default function AddAdminUserPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "admin"
  })

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
    // Clear errors when user starts typing
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

    if (!formData.password) {
      setError("Password is required")
      return false
    }

    if (formData.password.length < 6) {
      setError("Password must be at least 6 characters long")
      return false
    }

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match")
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
      const response = await fetch(`${API_BASE_URL}/admin/users`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          password: formData.password,
          role: formData.role
        })
      })

      const data = await response.json()

      if (!response.ok) {
        if (response.status === 401) {
          setError("Authentication failed. Please login again.")
        } else if (response.status === 403) {
          setError("Access denied. Only superadmin can create admin users.")
        } else if (response.status === 400) {
          setError(data.message || "Invalid data provided. Please check your inputs.")
        } else {
          setError(data.message || "Failed to create admin user")
        }
        return
      }

       if (data.success) {
         await Swal.fire({
           title: 'Success!',
           text: 'Admin user created successfully!',
           icon: 'success',
           timer: 2000,
           showConfirmButton: false
         })
         router.push("/admin-users")
       } else {
         console.error('Create admin user error:', data)
         setError(data.message || "Failed to create admin user")
       }
    } catch (error) {
      console.error("Error creating admin user:", error)
      setError("An error occurred while creating the admin user")
    } finally {
      setLoading(false)
    }
  }

  return (
    <Layout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center gap-4">
          <Link href="/admin-users">
            <button className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-colors">
              <ArrowLeft className="h-4 w-4" />
              Back to Admin Users
            </button>
          </Link>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Add Admin User</h1>
            <p className="text-gray-700 text-lg">Create a new admin user account</p>
          </div>
        </div>

        {/* Form */}
        <div className="bg-gradient-to-br from-white to-blue-50 rounded-xl shadow-lg border border-blue-100 p-8">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Success Message */}
          {success && (
            <div className="p-4 bg-green-50 border border-green-200 text-green-700 rounded-lg">
              {success}
            </div>
          )}

          {/* Error Message */}
          {error && (
            <div className="p-4 bg-red-50 border border-red-200 text-red-700 rounded-lg">
              {error}
            </div>
          )}

          {/* Name Field */}
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

          {/* Email Field */}
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

          {/* Role Field */}
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

          {/* Password Field */}
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
              <Lock className="h-4 w-4 inline mr-2" />
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                placeholder="Enter password (min 6 characters)"
                className="w-full px-4 py-3 pr-12 border-2 border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 placeholder-gray-500 shadow-md bg-white"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
              </button>
            </div>
          </div>

          {/* Confirm Password Field */}
          <div>
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-2">
              <Lock className="h-4 w-4 inline mr-2" />
              Confirm Password
            </label>
            <div className="relative">
              <input
                type={showConfirmPassword ? "text" : "password"}
                id="confirmPassword"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleInputChange}
                placeholder="Confirm password"
                className="w-full px-4 py-3 pr-12 border-2 border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 placeholder-gray-500 shadow-md bg-white"
                required
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
              </button>
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex items-center gap-4 pt-6">
            <button
              type="submit"
              disabled={loading}
              className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                  Creating...
                </>
              ) : (
                <>
                  <Save className="h-4 w-4" />
                  Create Admin User
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
