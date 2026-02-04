"use client"

import { useState, useEffect } from "react"
import { Navbar } from "@/components/navbar"
import { Sidebar } from "@/components/sidebar"
import { Breadcrumb } from "@/components/breadcrumb"
import { useRouter, usePathname } from "next/navigation"

export function Layout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isChecking, setIsChecking] = useState(true)
  const router = useRouter()
  const pathname = usePathname()

  // Authentication check: redirect to /login if not logged in
  useEffect(() => {
    const checkAuth = () => {
      const token = localStorage.getItem('adminToken') || localStorage.getItem('token')
      
      // No token at all: treat as logged out
      if (!token) {
        setIsAuthenticated(false)
        setIsChecking(false)
        if (pathname !== '/login') {
          router.replace('/login')
        }
        return
      }

      // If token looks like a JWT, try to check expiry on the client
      try {
        const parts = token.split('.')
        if (parts.length === 3) {
          const payloadJson = atob(parts[1].replace(/-/g, '+').replace(/_/g, '/'))
          const payload = JSON.parse(payloadJson)
          if (payload && typeof payload.exp === 'number') {
            const isExpired = payload.exp * 1000 < Date.now()
            if (isExpired) {
              // Expired token: clear it and force login before user continues
              localStorage.removeItem('adminToken')
              localStorage.removeItem('token')
              localStorage.removeItem('adminName')
              localStorage.removeItem('adminRole')
              window.dispatchEvent(new Event('localStorageChange'))
              setIsAuthenticated(false)
              setIsChecking(false)
              if (pathname !== '/login') {
                router.replace('/login')
              }
              return
            }
          }
        }
      } catch {
        // If parsing fails, fall back to treating the token as present and let the backend validate
      }
      
      setIsAuthenticated(true)
      setIsChecking(false)
    }

    checkAuth()
    
    // Also check on pathname changes
    if (pathname !== '/login') {
      checkAuth()
    }

    // Listen for storage changes (e.g., logout in another tab)
    const handleStorageChange = (e) => {
      if (e.key === 'adminToken' || e.key === 'token') {
        checkAuth()
      }
    }

    window.addEventListener('storage', handleStorageChange)

    // Also listen for custom storage events (for same-tab logout)
    const handleCustomStorageChange = () => {
      checkAuth()
    }

    window.addEventListener('localStorageChange', handleCustomStorageChange)

    return () => {
      window.removeEventListener('storage', handleStorageChange)
      window.removeEventListener('localStorageChange', handleCustomStorageChange)
    }
  }, [router, pathname])

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen)
  }

  // Prevent body scroll when sidebar is open on mobile
  useEffect(() => {
    if (sidebarOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }

    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [sidebarOpen])

  // Show loading state while checking authentication
  if (isChecking) {
    return (
      <div className="flex h-screen items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#04CE78] mx-auto mb-4"></div>
          <p className="text-gray-600">Checking authentication...</p>
        </div>
      </div>
    )
  }

  // Don't render protected layout if not authenticated
  if (!isAuthenticated && pathname !== '/login') {
    return null
  }

  return (
    <div className="flex h-screen bg-gray-50 relative">
      {/* Sidebar */}
      <Sidebar isOpen={sidebarOpen} onToggle={toggleSidebar} />
      
      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden min-w-0 relative z-30">
        {/* Navbar */}
        <Navbar onMenuToggle={toggleSidebar} />
        
        {/* Page Content */}
        <main className="flex-1 overflow-y-auto p-6 bg-gray-50">
          {/* Breadcrumb - Right Positioned */}
          <div className="mb-6 flex justify-end">
            <Breadcrumb />
          </div>
          
          {/* Page Content */}
          {children}
        </main>
      </div>
    </div>
  )
} 