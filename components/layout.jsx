"use client"

import { useState, useEffect } from "react"
import { Navbar } from "@/components/navbar"
import { Sidebar } from "@/components/sidebar"
import { Breadcrumb } from "@/components/breadcrumb"

export function Layout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false)

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