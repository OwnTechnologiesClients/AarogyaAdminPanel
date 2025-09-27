"use client"

import { useState, useEffect } from "react"
import { Layout } from "@/components/layout"
import Link from "next/link"
import { Building2, User, Stethoscope, Users, BarChart3, Settings } from "lucide-react"

export default function Dashboard() {
  const [adminName, setAdminName] = useState('Admin')

  useEffect(() => {
    // Only access localStorage after component mounts on client
    const name = localStorage.getItem('adminName') || 'Admin'
    setAdminName(name)
  }, [])

  const dashboardItems = [
    {
      title: "Hospitals",
      description: "Manage hospital information",
      icon: Building2,
      href: "/hospital",
      color: "bg-blue-500 hover:bg-blue-600"
    },
    {
      title: "Doctors",
      description: "Manage doctor profiles",
      icon: User,
      href: "/doctors",
      color: "bg-green-500 hover:bg-green-600"
    },
    {
      title: "Treatments",
      description: "Manage treatment information",
      icon: Stethoscope,
      href: "/treatment",
      color: "bg-purple-500 hover:bg-purple-600"
    },
    {
      title: "Users",
      description: "Manage user accounts",
      icon: Users,
      href: "/users",
      color: "bg-orange-500 hover:bg-orange-600"
    },
    {
      title: "Analytics",
      description: "View system analytics",
      icon: BarChart3,
      href: "/analytics",
      color: "bg-indigo-500 hover:bg-indigo-600"
    },
    {
      title: "Settings",
      description: "System configuration",
      icon: Settings,
      href: "/settings",
      color: "bg-gray-500 hover:bg-gray-600"
    }
  ]

  return (
    <Layout>
      <div className="space-y-6">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h1 className="text-3xl font-bold text-gray-900">Welcome back, {adminName}!</h1>
          <p className="text-gray-600 mt-2">Manage your healthcare platform from the admin dashboard</p>
        </div>

        {/* Dashboard Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {dashboardItems.map((item, index) => {
            const Icon = item.icon
            return (
              <Link key={index} href={item.href}>
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow cursor-pointer">
                  <div className="flex items-center space-x-4">
                    <div className={`p-3 rounded-lg text-white ${item.color}`}>
                      <Icon className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">{item.title}</h3>
                      <p className="text-gray-600 text-sm">{item.description}</p>
                    </div>
                  </div>
                </div>
              </Link>
            )
          })}
        </div>

        {/* Quick Stats */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Quick Overview</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <Building2 className="w-8 h-8 text-blue-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-blue-600">0</div>
              <div className="text-gray-600">Hospitals</div>
            </div>
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <User className="w-8 h-8 text-green-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-green-600">0</div>
              <div className="text-gray-600">Doctors</div>
            </div>
            <div className="text-center p-4 bg-purple-50 rounded-lg">
              <Stethoscope className="w-8 h-8 text-purple-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-purple-600">0</div>
              <div className="text-gray-600">Treatments</div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
} 