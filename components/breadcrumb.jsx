"use client"

import { usePathname } from "next/navigation"
import Link from "next/link"
import { ChevronRight, Home } from "lucide-react"

const pathMap = {
  "/": "Home",
  "/doctors": "Doctors",
  "/doctors/list": "Doctors List",
  "/doctors/add": "Add Doctor",

  "/treatment": "Treatment Dashboard",
  "/treatment/add": "Add Treatment",
  "/hospital": "Hospital List",
  "/hospital/add": "Add Hospital",
  "/chat": "Chat",
  "/enquiry": "Enquiry Management",
  "/users": "Signup Users",
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