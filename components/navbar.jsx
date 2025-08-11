"use client"

import { useState } from "react"
import { Search, Mail, Bell, User, Menu } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { cn } from "@/lib/utils"

export function Navbar({ onMenuToggle }) {
  const [searchQuery, setSearchQuery] = useState("")

  return (
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

        {/* Search Section */}
        <div className="relative">
          <input
            type="text"
            placeholder="Search here..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-48 lg:w-64 px-4 py-2 pl-4 pr-12 text-sm bg-gray-100 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
          />
          <Button
            size="icon"
            className="absolute right-1 top-1/2 transform -translate-y-1/2 h-8 w-8 bg-green-500 hover:bg-green-600 transition-colors duration-200"
          >
            <Search className="h-4 w-4 text-white" />
          </Button>
        </div>
      </div>

      {/* Right Section */}
      <div className="flex items-center space-x-2 lg:space-x-4">
        {/* Messages - Hidden on mobile */}
        <Button
          variant="ghost"
          size="icon"
          className="hidden md:flex relative h-10 w-10 bg-gray-100 hover:bg-gray-200 transition-colors duration-200"
        >
          <Mail className="h-5 w-5 text-blue-600" />
        </Button>

        {/* Notifications */}
        <Button
          variant="ghost"
          size="icon"
          className="relative h-10 w-10 bg-gray-100 hover:bg-gray-200 transition-colors duration-200"
        >
          <Bell className="h-5 w-5 text-blue-600" />
          <span className="absolute -top-1 -right-1 h-5 w-5 bg-blue-500 text-white text-xs rounded-full flex items-center justify-center">
            3
          </span>
        </Button>

        {/* Profile */}
        <div className="flex items-center space-x-2 lg:space-x-3">
          <Avatar className="h-8 w-8 lg:h-10 lg:w-10">
            <AvatarImage src="/api/placeholder/40/40" alt="Admin" />
            <AvatarFallback className="bg-blue-100 text-blue-600">
              <User className="h-4 w-4 lg:h-5 lg:w-5" />
            </AvatarFallback>
          </Avatar>
          <div className="hidden sm:flex flex-col">
            <span className="text-sm font-medium text-blue-600">Admin</span>
            <span className="text-xs text-gray-600">Aarogya Admin</span>
          </div>
        </div>
      </div>
    </nav>
  )
} 