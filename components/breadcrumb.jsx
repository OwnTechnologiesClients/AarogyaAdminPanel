"use client"

import { usePathname } from "next/navigation"
import Link from "next/link"
import { ChevronRight, Home } from "lucide-react"

const pathMap = {
  "/": "Home",
  "/doctors": "Doctors Dashboard",
  "/doctors/list": "Doctors List",
  "/doctors/card": "Doctors Card",
  "/doctors/profile": "Doctor Profile",
  "/doctors/add": "Add Doctor",
  "/doctors/edit": "Edit Doctor",
  "/patients": "Patients Dashboard",
  "/patients/list": "Patients List",
  "/patients/profile": "Patient Profile",
  "/patients/add": "Add Patient",
  "/hospital": "Hospital Dashboard",
  "/hospital/departments": "Departments",
  "/hospital/staff": "Staff",
  "/appointments": "All Appointments",
  "/appointments/schedule": "Schedule",
  "/appointments/calendar": "Calendar",
  "/chat": "Chat",
  "/notifications": "Notification",
}

export function Breadcrumb() {
  const pathname = usePathname()
  
  // Generate breadcrumb items
  const generateBreadcrumbs = () => {
    const paths = pathname.split('/').filter(Boolean)
    const breadcrumbs = [{ name: "Home", href: "/" }]
    
    let currentPath = ""
    
    paths.forEach((path, index) => {
      currentPath += `/${path}`
      const name = pathMap[currentPath] || path.charAt(0).toUpperCase() + path.slice(1)
      breadcrumbs.push({
        name,
        href: currentPath,
        isLast: index === paths.length - 1
      })
    })
    
    return breadcrumbs
  }
  
  const breadcrumbs = generateBreadcrumbs()
  
  return (
    <nav className="flex items-center space-x-2 text-sm text-gray-500">
      {breadcrumbs.map((breadcrumb, index) => (
        <div key={breadcrumb.href} className="flex items-center">
          {index > 0 && <ChevronRight className="h-4 w-4 mx-2" />}
          {breadcrumb.isLast ? (
            <span className="text-gray-900 font-medium">{breadcrumb.name}</span>
          ) : (
            <Link 
              href={breadcrumb.href}
              className="hover:text-gray-700 transition-colors flex items-center"
            >
              {index === 0 ? (
                <Home className="h-4 w-4" />
              ) : (
                breadcrumb.name
              )}
            </Link>
          )}
        </div>
      ))}
    </nav>
  )
} 