"use client"

import { useState, useEffect } from "react"
import { ArrowRight, ArrowLeft } from "lucide-react"
import { FcGoogle } from "react-icons/fc"
import Link from "next/link"
import { useRouter } from "next/navigation"

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
      // Simulate API call - replace with actual authentication API
      // For demo purposes, we'll accept any email/password combination
      if (formData.email && formData.password) {
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 1000))
        
        // Set authentication tokens
        const adminName = formData.email.split('@')[0] || 'Admin'
        localStorage.setItem('adminToken', 'demo-token-' + Date.now())
        localStorage.setItem('adminName', adminName)
        
        // Redirect to home page (which will redirect to doctors dashboard)
        router.push('/')
      } else {
        setError("Please fill in all fields")
      }
    } catch (err) {
      setError("Login failed. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Back Button */}
      <div className="p-6">
        <Link href="/">
          <button className="flex items-center gap-3 text-gray-700 hover:text-gray-900 transition-colors duration-200 font-medium text-base">
            <ArrowLeft size={22} />
            <span className="text-lg">Back to Dashboard</span>
          </button>
        </Link>
      </div>
      
      <div className="flex items-center justify-center p-6">
        <div className="flex flex-col md:flex-row gap-10 justify-center items-start w-full max-w-7xl px-6 py-16">
          {/* Login Form */}
          <div className="bg-white shadow-2xl border-gray-200 border rounded-3xl p-10 w-full md:w-1/2 h-full flex flex-col justify-between">
            <div>
              <h2 className="text-3xl font-bold mb-8 text-[#000D44] leading-tight">Log In To Your Account</h2>
              <p className="text-gray-600 text-lg mb-8 leading-relaxed">Welcome back! Please enter your credentials to access your dashboard.</p>
            </div>
            
            <form onSubmit={handleLogin} className="space-y-6 flex-grow">
              {error && (
                <div className="p-4 bg-red-50 border border-red-200 text-red-700 rounded-xl text-base font-medium">
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
                  className="w-full px-5 py-4 rounded-xl bg-gray-50 focus:outline-none focus:ring-2 focus:ring-[#04CE78] focus:bg-white border border-gray-200 text-gray-800 placeholder-gray-500 text-base transition-all duration-200"
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
                  className="w-full px-5 py-4 rounded-xl bg-gray-50 focus:outline-none focus:ring-2 focus:ring-[#04CE78] focus:bg-white border border-gray-200 text-gray-800 placeholder-gray-500 text-base transition-all duration-200"
                  required
                />
              </div>
              
              <div className="flex items-center justify-between text-gray-600 text-base">
                <label className="flex items-center gap-3 cursor-pointer hover:text-gray-800 transition-colors">
                  <input type="checkbox" className="accent-[#04CE78] w-5 h-5" />
                  <span className="font-medium">Keep Me Logged In</span>
                </label>
                <a href="#" className="hover:text-[#04CE78] hover:underline font-medium transition-colors">Forgot Password?</a>
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
            
            <div className="mt-8">
              <div className="flex items-center my-8">
                <div className="flex-grow h-px bg-gray-200" />
                <span className="mx-6 text-gray-400 font-medium text-base">Or continue with</span>
                <div className="flex-grow h-px bg-gray-200" />
              </div>
              <button className="w-full flex items-center justify-center gap-3 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold py-4 rounded-xl transition-all duration-200 border border-gray-200 hover:border-gray-300">
                <FcGoogle size={22} />
                <span className="text-base">Login with Google</span>
              </button>
            </div>
          </div>

          {/* Register Form */}
          <div className="bg-white shadow-2xl border-gray-200 border rounded-3xl p-10 w-full md:w-1/2 h-full flex flex-col justify-between">
            <div>
              <h2 className="text-3xl font-bold mb-8 text-[#000D44] leading-tight">Create Account</h2>
              <p className="text-gray-600 text-lg mb-8 leading-relaxed">Join us today! Create your account to get started with our platform.</p>
            </div>
            
            <form className="space-y-6 flex-grow">
              <div className="space-y-2">
                <label className="block text-gray-700 font-semibold text-base">Full Name</label>
                <input
                  type="text"
                  placeholder="Enter your full name"
                  className="w-full px-5 py-4 rounded-xl bg-gray-50 focus:outline-none focus:ring-2 focus:ring-[#1F5FFF] focus:bg-white border border-gray-200 text-gray-800 placeholder-gray-500 text-base transition-all duration-200"
                />
              </div>
              
              <div className="space-y-2">
                <label className="block text-gray-700 font-semibold text-base">Email Address</label>
                <input
                  type="email"
                  placeholder="Enter your email address"
                  className="w-full px-5 py-4 rounded-xl bg-gray-50 focus:outline-none focus:ring-2 focus:ring-[#1F5FFF] focus:bg-white border border-gray-200 text-gray-800 placeholder-gray-500 text-base transition-all duration-200"
                />
              </div>
              
              <div className="space-y-2">
                <label className="block text-gray-700 font-semibold text-base">Password</label>
                <input
                  type="password"
                  placeholder="Create a strong password"
                  className="w-full px-5 py-4 rounded-xl bg-gray-50 focus:outline-none focus:ring-2 focus:ring-[#1F5FFF] focus:bg-white border border-gray-200 text-gray-800 placeholder-gray-500 text-base transition-all duration-200"
                />
              </div>
              
              <div className="space-y-2">
                <label className="block text-gray-700 font-semibold text-base">Confirm Password</label>
                <input
                  type="password"
                  placeholder="Confirm your password"
                  className="w-full px-5 py-4 rounded-xl bg-gray-50 focus:outline-none focus:ring-2 focus:ring-[#1F5FFF] focus:bg-white border border-gray-200 text-gray-800 placeholder-gray-500 text-base transition-all duration-200"
                />
              </div>
              
              <button
                type="submit"
                className="w-full flex items-center justify-center gap-3 bg-[#1F5FFF] cursor-pointer hover:bg-violet-800 text-white font-bold py-4 rounded-xl transition-all duration-200 text-lg shadow-lg hover:shadow-xl"
              >
                <span>Register Now</span>
                <ArrowRight size={22} />
              </button>
            </form>
            
            <div className="mt-8">
              <div className="flex items-center my-8">
                <div className="flex-grow h-px bg-gray-200" />
                <span className="mx-6 text-gray-400 font-medium text-base">Or continue with</span>
                <div className="flex-grow h-px bg-gray-200" />
              </div>
              <button className="w-full flex items-center justify-center gap-3 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold py-4 rounded-xl transition-all duration-200 border border-gray-200 hover:border-gray-300">
                <FcGoogle size={22} />
                <span className="text-base">Sign up with Google</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 