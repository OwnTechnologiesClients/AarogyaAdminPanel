"use client"

import { useState, useEffect } from "react"
import { ArrowRight } from "lucide-react"
import { useRouter } from "next/navigation"
import api from '@/lib/api'

export default function LoginPage() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  })
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")

  // Check if user is already logged in
  useEffect(() => {
    const token = localStorage.getItem('adminToken')
    if (token) {
      // User is already logged in, redirect to home
      router.push('/')
    }
  }, [router])

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleLogin = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    try {
      // Real API call
      const response = await api.post('/auth/login', formData)
      const { token, user } = response.data.data || {}
      const name = user?.email || formData.email.split('@')[0] || 'Admin'
      if (token) {
        localStorage.setItem('adminToken', token)
        localStorage.setItem('adminName', name)
        router.push('/')
      } else {
        setError('Invalid response from server')
      }
    } catch (err) {
      setError(
        err.response?.data?.message ||
        err.message ||
        'Login failed. Please try again.'
      )
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#e0f7fa] via-[#f1f8e9] to-[#fce4ec]">
      <div className="w-full max-w-md mx-auto bg-white shadow-2xl border border-gray-100 rounded-3xl p-10 flex flex-col items-center">
        <img src="/logo.png" alt="Aarogya Logo" className="w-20 h-20 mb-6 rounded-full shadow-md border border-gray-200 bg-white object-contain" />
        <h2 className="text-3xl font-extrabold mb-4 text-[#000D44] leading-tight text-center">Log In To Your Account</h2>
        <p className="text-gray-600 text-lg mb-8 leading-relaxed text-center">Welcome back! Please enter your credentials to access your dashboard.</p>
        <form onSubmit={handleLogin} className="space-y-6 w-full">
          {error && (
            <div className="p-4 bg-red-50 border border-red-200 text-red-700 rounded-xl text-base font-medium text-center">
              {error}
            </div>
          )}
          <div className="space-y-2">
            <label className="block text-gray-700 font-semibold text-base">Email Address</label>
            <input
              type="email"
              name="email"
              placeholder="Enter your email address"
              value={formData.email}
              onChange={handleInputChange}
              className="w-full px-5 py-4 rounded-xl bg-gray-50 focus:outline-none focus:ring-2 focus:ring-[#04CE78] focus:bg-white border border-gray-200 text-gray-800 placeholder-gray-500 text-base transition-all duration-200 shadow-sm"
              required
            />
          </div>
          <div className="space-y-2">
            <label className="block text-gray-700 font-semibold text-base">Password</label>
            <input
              type="password"
              name="password"
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleInputChange}
              className="w-full px-5 py-4 rounded-xl bg-gray-50 focus:outline-none focus:ring-2 focus:ring-[#04CE78] focus:bg-white border border-gray-200 text-gray-800 placeholder-gray-500 text-base transition-all duration-200 shadow-sm"
              required
            />
          </div>
       
          <button
            type="submit"
            disabled={isLoading}
            className="w-full flex items-center justify-center gap-3 bg-[#04CE78] cursor-pointer hover:bg-green-600 text-white font-bold py-4 rounded-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed text-lg shadow-lg hover:shadow-xl"
          >
            {isLoading ? (
              <>
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                <span>Logging in...</span>
              </>
            ) : (
              <>
                <span>Login</span>
                <ArrowRight size={22} />
              </>
            )}
          </button>
        </form>
        <div className="mt-8 text-gray-400 text-sm text-center w-full border-t pt-6 border-gray-100">
          &copy; {new Date().getFullYear()} Aarogya. All rights reserved.
        </div>
      </div>
    </div>
  )
} 