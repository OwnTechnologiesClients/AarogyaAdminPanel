"use client"

import { useState, useMemo } from "react"
import { Layout } from "@/components/layout"
import { Pagination } from "@/components/ui/pagination"
import {
  Twitter,
  Facebook,
  Linkedin,
  Mail,
  ShoppingCart,
  Globe,
  Google,
  Bell,
  MessageSquare,
  Calendar,
  User,
  Star,
  Youtube,
  Instagram
} from "lucide-react"

const iconMap = {
  twitter: <Twitter className="w-5 h-5 text-blue-400" />,
  facebook: <Facebook className="w-5 h-5 text-blue-600" />,
  linkedin: <Linkedin className="w-5 h-5 text-blue-700" />,
  google: <Globe className="w-5 h-5 text-yellow-500" />,
  mail: <Mail className="w-5 h-5 text-gray-500" />,
  cart: <ShoppingCart className="w-5 h-5 text-orange-500" />,
  bell: <Bell className="w-5 h-5 text-yellow-500" />,
  message: <MessageSquare className="w-5 h-5 text-blue-500" />,
  calendar: <Calendar className="w-5 h-5 text-green-500" />,
  user: <User className="w-5 h-5 text-indigo-500" />,
  star: <Star className="w-5 h-5 text-yellow-400" />,
  youtube: <Youtube className="w-5 h-5 text-red-500" />,
  instagram: <Instagram className="w-5 h-5 text-pink-500" />,
}

export default function Notifications() {
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage, setItemsPerPage] = useState(8)
  const [selectedFilter, setSelectedFilter] = useState("Last 7 Days")
  const [activeTab, setActiveTab] = useState("list")

  // Mock notification data matching the reference image style
  const notifications = [
    {
      id: 1,
      icon: "google",
      title: "Hello – Trip home from 🎉 Colombo has been arranged, then Jenna will com...",
      message: "Trip home from 🎉 Colombo has been arranged, then Jenna will come to home...",
      date: "10 Mar, 2025"
    },
    {
      id: 2,
      icon: "google",
      title: "Last pic over my village – Yeah i'd like that! Do you remember the video som..",
      message: "Yeah I'd like that! Do you remember the video some...",
      date: "08 Mar, 2025"
    },
    {
      id: 3,
      icon: "twitter",
      title: "Mochila Beta: Subscription Confirmed – You’ve been confirmed! Welcome to",
      message: "You’ve been confirmed! Welcome to the ruling class of the inbox. For your...",
      date: "05 Mar, 2025"
    },
    {
      id: 4,
      icon: "linkedin",
      title: "You've been confirmed! Welcome to the ruling class of the inbox. For your",
      message: "Welcome to the ruling class of the inbox. For your records, here is a copy...",
      date: "2 Mar, 2025"
    },
    {
      id: 5,
      icon: "mail",
      title: "For your records, here is a copy of the information you submitted to us...",
      message: "Here is a copy of the information you submitted to us...",
      date: "26 Feb, 2025"
    },
    {
      id: 6,
      icon: "google",
      title: "Hello – Trip home from 🎉 Colombo has been arranged, then Jenna will com...",
      message: "Trip home from 🎉 Colombo has been arranged, then Jenna will come to home...",
      date: "23 Feb, 2025"
    },
    {
      id: 7,
      icon: "facebook",
      title: "Off on Thursday – Eff that place, you might as well stay here with us inst",
      message: "Eff that place, you might as well stay here with us instead...",
      date: "17 Feb, 2025"
    },
    {
      id: 8,
      icon: "cart",
      title: "Trip home from 🎉 Colombo has been arranged, then Jenna will come to hom...",
      message: "Trip home from 🎉 Colombo has been arranged, then Jenna will come to home...",
      date: "15 Feb, 2025"
    },
    {
      id: 9,
      icon: "star",
      title: "This Week's Top Stories – Our top pick for you on Medium this week The",
      message: "Our top pick for you on Medium this week...",
      date: "13 Feb, 2025"
    },
    {
      id: 10,
      icon: "user",
      title: "Weekend on Revibe – Today's Friday and we thought maybe you want so",
      message: "Today's Friday and we thought maybe you want some great content...",
      date: "12 Feb, 2025"
    },
  ]

  // Filter options
  const filterOptions = [
    "Last 7 Days",
    "Last 30 Days", 
    "Last 3 Months",
    "Last 6 Months",
    "Last Year",
    "All Time"
  ]

  // For demo, show all notifications
  const filteredNotifications = useMemo(() => notifications, [selectedFilter])

  // Pagination logic
  const totalItems = filteredNotifications.length
  const totalPages = Math.ceil(totalItems / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const currentNotifications = filteredNotifications.slice(startIndex, endIndex)

  const handlePageChange = (page) => {
    setCurrentPage(page)
  }

  const handleItemsPerPageChange = (newItemsPerPage) => {
    setItemsPerPage(newItemsPerPage)
    setCurrentPage(1)
  }

  return (
    <Layout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Notification</h1>
          </div>
        </div>

        {/* Main Content */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          {/* Tab Header */}
          <div className="p-6 border-b border-gray-200">
            <div className="flex justify-between items-center">
              <div className="flex space-x-6">
                <p className="text-xl font-bold text-gray-900">Notification List</p>
              </div>
              {/* Filter Dropdown */}
              <div className="relative">
                <select
                  value={selectedFilter}
                  onChange={(e) => setSelectedFilter(e.target.value)}
                  className="appearance-none bg-white border border-gray-300 rounded-lg px-4 py-2 pr-10 text-sm font-medium text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  {filterOptions.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
                <svg className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
          </div>

          {/* Notifications List */}
          <div className="divide-y divide-gray-200">
            {/* Column Header */}
            <div className="px-6 py-3 bg-gray-50">
              <div className="flex justify-between items-center">
                <div className="flex items-center w-8 mr-4"></div>
                <div className="flex-1">
                  <span className="text-sm font-medium text-gray-500">Notification Details</span>
                </div>
                <div className="w-32 text-right">
                  <span className="text-sm font-medium text-gray-500">Date</span>
                </div>
              </div>
            </div>

            {/* Notification Items */}
            {currentNotifications.map((notification) => (
              <div key={notification.id} className="px-6 py-4 hover:bg-gray-50 transition-colors duration-150">
                <div className="flex items-center justify-between">
                  <div className="flex items-center w-8 mr-4">
                    {iconMap[notification.icon]}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="font-medium text-gray-900 truncate">
                      {notification.title}
                    </div>
                    <div className="text-sm text-gray-500 truncate">
                      {notification.message}
                    </div>
                  </div>
                  <div className="w-32 text-right">
                    <span className="text-sm text-gray-500">{notification.date}</span>
                  </div>
                </div>
              </div>
            ))}

            {/* Empty State */}
            {currentNotifications.length === 0 && (
              <div className="px-6 py-12 text-center">
                <div className="mx-auto h-12 w-12 text-gray-400 text-4xl">🔔</div>
                <h3 className="mt-2 text-sm font-medium text-gray-900">No notifications</h3>
                <p className="mt-1 text-sm text-gray-500">
                  No notifications found for the selected filter.
                </p>
              </div>
            )}
          </div>

          {/* Pagination */}
          {totalItems > 0 && (
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
              totalItems={totalItems}
              itemsPerPage={itemsPerPage}
              onItemsPerPageChange={handleItemsPerPageChange}
            />
          )}
        </div>
      </div>
    </Layout>
  )
} 