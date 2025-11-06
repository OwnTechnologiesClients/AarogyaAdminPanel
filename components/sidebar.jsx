"use client"

import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { 
  Stethoscope, 
  Users, 
  Building2, 
  Calendar, 
  MessageCircle, 
  Bell, 
  ChevronDown,
  ChevronRight,
  Circle,
  Menu,
  X,
  UserCog,
  HeadphonesIcon
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import Image from "next/image"

const menuItems = [
   {
    title: "Hospital Dashboard",
    icon: Building2,
    href: "/hospital",
    subItems: [
      { title: "Add Hospital", href: "/hospital/add" },
      { title: "Hospital List", href: "/hospital" },
    ]
  },
  {
    title: "Doctors Dashboard",
    icon: Stethoscope,
    href: "/doctors",
    subItems: [
      { title: "Add Doctor", href: "/doctors/add" },
      { title: "Doctors List", href: "/doctors" },
    ]
  },
  {
    title: "Treatment Dashboard",
    icon: Users,
    href: "/treatment",
    subItems: [
      { title: "Add Treatment", href: "/treatment/add" },
      { title: "Treatments List", href: "/treatment" },
    ]
  },

  {
    title: "Enquiry",
    icon: MessageCircle,
    href: "/enquiry",
  },
  {
    title: "Support",
    icon: HeadphonesIcon,
    href: "/support",
  },
  {
    title: "Users",
    icon: Users,
    href: "/users",
  },
  {
    title: "Admin Users",
    icon: UserCog,
    href: "/admin-users",
    subItems: [
      { title: "Add Admin User", href: "/admin-users/add" },
      { title: "Admin Users List", href: "/admin-users" },
    ]
  },
]

export function Sidebar({ isOpen, onToggle }) {
  const [expandedItem, setExpandedItem] = useState(null)
  const [isMobile, setIsMobile] = useState(false)
  const [focusedIndex, setFocusedIndex] = useState(-1)
  const [adminRole, setAdminRole] = useState('admin')
  const pathname = usePathname()
  const sidebarRef = useRef(null)

  // Handle responsive behavior
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    
    checkMobile()
    window.addEventListener('resize', checkMobile)
    
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  useEffect(() => {
    const role = localStorage.getItem('adminRole') || 'admin'
    const token = localStorage.getItem('adminToken')
    if (token) {
      setAdminRole(role)
    } else {
      setAdminRole('admin')
    }
  }, [])

  // Auto-expand the section containing the current active page
  useEffect(() => {
    const currentMenuItem = menuItems.find(item => 
      item.subItems && item.subItems.some(subItem => isExactActive(subItem.href))
    )
    
    if (currentMenuItem) {
      setExpandedItem(currentMenuItem.title)
    }
  }, [pathname])

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!isOpen) return

      const menuButtons = sidebarRef.current?.querySelectorAll('[role="menuitem"]')
      if (!menuButtons) return

      const currentIndex = Array.from(menuButtons).findIndex(button => 
        button === document.activeElement
      )

      switch (e.key) {
        case 'ArrowDown':
          e.preventDefault()
          const nextIndex = currentIndex < menuButtons.length - 1 ? currentIndex + 1 : 0
          menuButtons[nextIndex]?.focus()
          setFocusedIndex(nextIndex)
          break
        case 'ArrowUp':
          e.preventDefault()
          const prevIndex = currentIndex > 0 ? currentIndex - 1 : menuButtons.length - 1
          menuButtons[prevIndex]?.focus()
          setFocusedIndex(prevIndex)
          break
        case 'Enter':
        case ' ':
          e.preventDefault()
          document.activeElement?.click()
          break
        case 'Escape':
          if (isMobile && onToggle) {
            onToggle()
          }
          break
      }
    }

    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown)
    }

    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [isOpen, isMobile, onToggle])

  const toggleExpanded = (title) => {
    setExpandedItem(prev => prev === title ? null : title)
  }

  const isExpanded = (title) => expandedItem === title
  // Parent items active when current path is under their section
  const isParentActive = (href) => pathname === href || pathname.startsWith(href + "/")
  // Exact match for sub items
  const isExactActive = (href) => pathname === href

  // Close mobile sidebar when clicking on a link
  const handleLinkClick = () => {
    if (isMobile && onToggle) {
      onToggle()
    }
  }

  return (
    <>
      {/* Mobile Overlay */}
      {isMobile && isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-10 z-20 lg:hidden pointer-events-none"
          aria-hidden="true"
        />
      )}

      {/* Sidebar */}
      <aside 
        ref={sidebarRef}
        className={cn(
          "fixed lg:static inset-y-0 left-0 z-50 w-64 bg-white border-r border-gray-200 h-screen flex flex-col transform transition-transform duration-300 ease-in-out shadow-xl",
          isMobile && !isOpen && "-translate-x-full",
          "lg:translate-x-0 lg:shadow-none"
        )}
        role="navigation"
        aria-label="Main navigation"
        style={{
          WebkitOverflowScrolling: 'touch'
        }}
        onClick={(e) => {
          // Close sidebar when clicking on the sidebar background (not on menu items)
          if (isMobile && e.target === e.currentTarget) {
            onToggle()
          }
        }}
      >
        {/* Header with Mobile Toggle */}
        <div className="flex items-center justify-between py-6 px-4 border-b border-gray-200">
          <Link href="/" className="flex items-center hover:opacity-80 transition-opacity">
            <Image src="/logo.png" alt="Aarogya Admin Logo" width={350} height={300} className="h-10  w-auto" priority />
          </Link>
          {isMobile && (
            <Button
              variant="ghost"
              size="sm"
              onClick={onToggle}
              className="lg:hidden"
              aria-label="Close menu"
            >
              <X className="h-5 w-5" />
            </Button>
          )}
        </div>

        {/* Navigation Menu */}
        <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto" role="menu">
          {menuItems.filter(item => {
            if (item.title === "Admin Users" && adminRole !== 'superadmin') {
              return false
            }
            return true
          }).map((item, index) => {
            const Icon = item.icon
            const hasSubItems = item.subItems && item.subItems.length > 0
            const expanded = isExpanded(item.title)
            const active = isParentActive(item.href)

            return (
              <div key={item.title}>
                <Button
                  variant={active ? "default" : "ghost"}
                  className={cn(
                    "w-full justify-between h-12 px-4 transition-all duration-200 ease-in-out group focus:ring-2 focus:ring-blue-500 focus:ring-offset-2",
                    active 
                      ? "bg-blue-600 text-white hover:bg-blue-700 shadow-md" 
                      : "bg-gray-50 text-gray-700 hover:bg-gray-100 hover:shadow-sm"
                  )}
                  onClick={() => hasSubItems ? toggleExpanded(item.title) : null}
                  asChild={!hasSubItems}
                  role="menuitem"
                  aria-expanded={hasSubItems ? expanded : undefined}
                  aria-haspopup={hasSubItems ? "true" : undefined}
                >
                  {hasSubItems ? (
                    <>
                      <div className="flex items-center space-x-3">
                        <Icon className={cn(
                          "h-5 w-5 transition-transform duration-200",
                          active ? "text-white" : "text-gray-600 group-hover:text-gray-800"
                        )} />
                        <span className="text-sm font-medium">{item.title}</span>
                      </div>
                      <div className="transition-transform duration-200">
                        {expanded ? (
                          <ChevronDown className="h-4 w-4" />
                        ) : (
                          <ChevronRight className="h-4 w-4" />
                        )}
                      </div>
                    </>
                  ) : (
                    <Link href={item.href} className="flex items-center justify-between w-full" onClick={handleLinkClick}>
                      <div className="flex items-center space-x-3">
                        <Icon className={cn(
                          "h-5 w-5 transition-colors duration-200",
                          active ? "text-white" : "text-gray-600 group-hover:text-gray-800"
                        )} />
                        <span className="text-sm font-medium">{item.title}</span>
                      </div>
                    </Link>
                  )}
                </Button>

                {/* Sub Items with Animation and Scrolling */}
                {hasSubItems && (
                  <div 
                    className={cn(
                      "overflow-hidden transition-all duration-300 ease-in-out",
                      expanded ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
                    )}
                    role="menu"
                    aria-label={`${item.title} submenu`}
                  >
                    <div className="ml-6 mt-2 space-y-1 max-h-80 overflow-y-auto overflow-x-hidden scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
                      {item.subItems.map((subItem) => {
                        const subActive = pathname === subItem.href
                        return (
                          <Link
                            key={subItem.title}
                            href={subItem.href}
                            onClick={(e) => {
                              e.stopPropagation()
                              handleLinkClick()
                            }}
                            className={cn(
                              "flex items-center space-x-3 px-4 py-2 rounded-lg text-sm transition-all duration-200 ease-in-out transform hover:scale-105 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:outline-none border-l-2 border-transparent",
                              subActive
                                ? "bg-blue-100 text-blue-700 shadow-sm border-l-blue-600"
                                : "text-gray-600 hover:bg-gray-50 hover:text-gray-800 hover:border-l-gray-300"
                            )}
                            role="menuitem"
                          >
                            <Circle className={cn(
                              "h-2 w-2 transition-colors duration-200 flex-shrink-0",
                              subActive ? "text-blue-600" : "text-gray-400"
                            )} />
                            <span className="font-medium truncate">{subItem.title}</span>
                          </Link>
                        )
                      })}
                    </div>
                  </div>
                )}
              </div>
            )
          })}
        </nav>

        {/* Footer */}
        <div className="p-4 border-t border-gray-200">
          <div className="text-xs text-gray-500 text-center">
            © 2024 Aarogya Admin
          </div>
        </div>
      </aside>
    </>
  )
} 