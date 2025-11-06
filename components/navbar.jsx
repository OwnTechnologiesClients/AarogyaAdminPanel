"use client"

import { useState, useEffect } from "react"
import { Menu, UserCircle, LogOut } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useRouter, usePathname } from "next/navigation"
import Swal from 'sweetalert2'

export function Navbar({ onMenuToggle }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [adminName, setAdminName] = useState("Admin")
  const router = useRouter()
  const pathname = usePathname()

  // Check authentication status on component mount and when pathname changes
  useEffect(() => {
    const checkAuthStatus = () => {
      const token = localStorage.getItem('adminToken')
      const name = localStorage.getItem('adminName')
      
      if (token) {
        setIsLoggedIn(true)
        if (name) {
          setAdminName(name)
        }
      } else {
        setIsLoggedIn(false)
        setAdminName("Admin")
      }
    }

    checkAuthStatus()
  }, [pathname])

  const handleLogout = async () => {
    // Show confirmation dialog using SweetAlert
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: 'Do you want to logout from your account?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#04CE78',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, logout',
      cancelButtonText: 'Cancel'
    })

    if (result.isConfirmed) {
      // Clear authentication data
      localStorage.removeItem('adminToken')
      localStorage.removeItem('adminName')
      localStorage.removeItem('adminRole')
      localStorage.removeItem('token')
      setIsLoggedIn(false)
      setAdminName("Admin")
      
      window.dispatchEvent(new Event('localStorageChange'))
      
      // Show success message
      Swal.fire({
        title: 'Logged Out!',
        text: 'You have been successfully logged out.',
        icon: 'success',
        timer: 2000,
        showConfirmButton: false
      }).then(() => {
        router.push('/login')
      })
    }
  }

  const handleLoginClick = () => {
    router.push('/login')
  }

  return (
    <>
      <nav className="flex items-center justify-between px-6 py-4 bg-white border-b border-gray-200">
        {/* Left Section - Mobile Menu + Search */}
        <div className="flex items-center space-x-4">
          {/* Mobile Menu Toggle */}
          <Button
            variant="ghost"
            size="icon"
            onClick={onMenuToggle}
            className="lg:hidden h-10 w-10 bg-gray-100 hover:bg-gray-200"
          >
            <Menu className="h-5 w-5 text-gray-600" />
          </Button>
        </div>

        {/* Right Section */}
        <div className="flex items-center space-x-2 lg:space-x-3">
          {!isLoggedIn ? (
            /* Login Button - Show when not logged in */
            <Button
              variant="ghost"
              size="icon"
              onClick={handleLoginClick}
              className="h-8 w-8 lg:h-10 lg:w-10 bg-green-100 hover:bg-green-200"
              title="Login"
            >
              <UserCircle className="h-4 w-4 lg:h-5 lg:w-5 text-green-600" />
            </Button>
          ) : (
            /* Profile Section - Show when logged in */
            <div className="flex items-center space-x-2 lg:space-x-3">
              <Avatar className="h-8 w-8 lg:h-10 lg:w-10">
                <AvatarImage src="/api/placeholder/40/40" alt="Admin" />
                <AvatarFallback className="bg-blue-100 text-blue-600">
                  <span className="text-xs font-medium">{adminName.charAt(0).toUpperCase()}</span>
                </AvatarFallback>
              </Avatar>
              <div className="hidden sm:flex flex-col">
                <span className="text-sm font-medium text-blue-600">{adminName}</span>
                <span className="text-xs text-gray-600">Aarogya Admin</span>
              </div>
              {/* Logout Button */}
              <Button
                variant="ghost"
                size="icon"
                onClick={handleLogout}
                className="h-8 w-8 lg:h-10 lg:w-10 bg-red-100 hover:bg-red-200"
                title="Logout"
              >
                <LogOut className="h-4 w-4 lg:h-5 lg:w-5 text-red-600" />
              </Button>
            </div>
          )}
        </div>
      </nav>
    </>
  )
} 