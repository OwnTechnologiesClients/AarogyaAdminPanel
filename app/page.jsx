"use client"

import { useState, useEffect } from "react"
import { Layout } from "@/components/layout"
import Link from "next/link"
import { Building2, User, Stethoscope, Users, BarChart3, Settings, RefreshCw, MessageCircle, HeadphonesIcon, UserCog } from "lucide-react"
import { HospitalApi } from "@/lib/api/hospitalApi"
import { DoctorApi } from "@/lib/api/doctorApi"
import { TreatmentApi } from "@/lib/api/treatmentApi"

export default function Dashboard() {
  const [adminName, setAdminName] = useState('Admin')
  const [stats, setStats] = useState({
    hospitals: 0,
    doctors: 0,
    treatments: 0,
    loading: true
  })

  useEffect(() => {
    // Only access localStorage after component mounts on client
    const name = localStorage.getItem('adminName') || 'Admin'
    setAdminName(name)
    
    // Fetch dashboard statistics
    fetchDashboardStats()
  }, [])

  const fetchDashboardStats = async () => {
    try {
      setStats(prev => ({ ...prev, loading: true }))
      
      // Fetch all data in parallel
      const [hospitalsResponse, doctorsResponse, treatmentsResponse] = await Promise.all([
        HospitalApi.list(),
        DoctorApi.list(),
        TreatmentApi.list()
      ])
      
      setStats({
        hospitals: hospitalsResponse?.data?.length || 0,
        doctors: doctorsResponse?.data?.length || 0,
        treatments: treatmentsResponse?.data?.length || 0,
        loading: false
      })
    } catch (error) {
      console.error('Error fetching dashboard stats:', error)
      setStats(prev => ({ ...prev, loading: false }))
    }
  }

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
      icon: Stethoscope,
      href: "/doctors",
      color: "bg-green-500 hover:bg-green-600"
    },
    {
      title: "Treatments",
      description: "Manage treatment information",
      icon: Users,
      href: "/treatment",
      color: "bg-purple-500 hover:bg-purple-600"
    },
    {
      title: "Enquiry",
      description: "Manage patient enquiries",
      icon: MessageCircle,
      href: "/enquiry",
      color: "bg-yellow-500 hover:bg-yellow-600"
    },
    {
      title: "Support",
      description: "Customer support tickets",
      icon: HeadphonesIcon,
      href: "/support",
      color: "bg-indigo-500 hover:bg-indigo-600"
    },
    {
      title: "Users",
      description: "Manage user accounts",
      icon: Users,
      href: "/users",
      color: "bg-orange-500 hover:bg-orange-600"
    },
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
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-gray-900">Quick Overview</h2>
            <button
              onClick={fetchDashboardStats}
              disabled={stats.loading}
              className="flex items-center space-x-2 px-3 py-1 text-sm text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-md transition-colors disabled:opacity-50"
            >
              <RefreshCw className={`w-4 h-4 ${stats.loading ? 'animate-spin' : ''}`} />
              <span>Refresh</span>
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <Building2 className="w-8 h-8 text-blue-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-blue-600">
                {stats.loading ? (
                  <div className="animate-pulse bg-blue-200 h-8 w-12 rounded mx-auto"></div>
                ) : (
                  stats.hospitals
                )}
              </div>
              <div className="text-gray-600">Hospitals</div>
            </div>
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <User className="w-8 h-8 text-green-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-green-600">
                {stats.loading ? (
                  <div className="animate-pulse bg-green-200 h-8 w-12 rounded mx-auto"></div>
                ) : (
                  stats.doctors
                )}
              </div>
              <div className="text-gray-600">Doctors</div>
            </div>
            <div className="text-center p-4 bg-purple-50 rounded-lg">
              <Stethoscope className="w-8 h-8 text-purple-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-purple-600">
                {stats.loading ? (
                  <div className="animate-pulse bg-purple-200 h-8 w-12 rounded mx-auto"></div>
                ) : (
                  stats.treatments
                )}
              </div>
              <div className="text-gray-600">Treatments</div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
} 