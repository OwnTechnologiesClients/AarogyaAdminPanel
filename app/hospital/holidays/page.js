"use client"

import { useState, useMemo } from "react"
import { Layout } from "@/components/layout"
import { Pagination } from "@/components/ui/pagination"
import { usePagination } from "@/lib/hooks/usePagination"
import { 
  Search, 
  Trash2, 
  Edit, 
  Eye, 
  Plus
} from "lucide-react"

// Sample holidays data matching the reference image
const holidaysData = [
  {
    id: 1,
    title: "Barked",
    date: "23 Aug, 2025",
    day: "Wednesday"
  },
  {
    id: 2,
    title: "Christmas",
    date: "25 Dec, 2025",
    day: "Tuesday"
  },
  {
    id: 3,
    title: "Depavali",
    date: "18 Oct, 2025",
    day: "Thursday"
  },
  {
    id: 4,
    title: "Good Friday",
    date: "13 Apr, 2025",
    day: "Tuesday"
  },
  {
    id: 5,
    title: "New year",
    date: "01 Mar, 2025",
    day: "Monday"
  },
  {
    id: 6,
    title: "Ramadan",
    date: "23 May, 2025",
    day: "Wednesday"
  },
  {
    id: 7,
    title: "Memorial Day",
    date: "01 Jan, 2025",
    day: "Sunday"
  },
  {
    id: 8,
    title: "May Day",
    date: "26 Jun, 2025",
    day: "Friday"
  },
  // Add more data for pagination testing
  {
    id: 9,
    title: "Independence Day",
    date: "04 Jul, 2025",
    day: "Friday"
  },
  {
    id: 10,
    title: "Labor Day",
    date: "01 Sep, 2025",
    day: "Monday"
  },
  {
    id: 11,
    title: "Thanksgiving",
    date: "27 Nov, 2025",
    day: "Thursday"
  },
  {
    id: 12,
    title: "Easter",
    date: "20 Apr, 2025",
    day: "Sunday"
  },
  {
    id: 13,
    title: "Halloween",
    date: "31 Oct, 2025",
    day: "Friday"
  },
  {
    id: 14,
    title: "Valentine's Day",
    date: "14 Feb, 2025",
    day: "Friday"
  },
  {
    id: 15,
    title: "St. Patrick's Day",
    date: "17 Mar, 2025",
    day: "Monday"
  },
  {
    id: 16,
    title: "Black Friday",
    date: "28 Nov, 2025",
    day: "Friday"
  }
]

export default function HospitalHolidaysPage() {
  const [searchTerm, setSearchTerm] = useState("")

  // Filter holidays based on search term
  const filteredHolidays = useMemo(() => {
    return holidaysData.filter(holiday =>
      holiday.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      holiday.date.toLowerCase().includes(searchTerm.toLowerCase()) ||
      holiday.day.toLowerCase().includes(searchTerm.toLowerCase())
    )
  }, [searchTerm])

  // Use pagination hook
  const {
    currentPage,
    totalPages,
    totalItems,
    itemsPerPage,
    currentItems: currentHolidays,
    handlePageChange,
    handleItemsPerPageChange,
    resetPagination
  } = usePagination(filteredHolidays, 8)

  const handleSearch = (e) => {
    setSearchTerm(e.target.value)
    resetPagination() // Reset to first page when searching
  }

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Holidays</h1>
            <p className="text-gray-700 text-lg">Manage hospital holidays and working schedules</p>
          </div>
          <button className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold shadow-sm flex items-center space-x-2">
            <Plus className="w-4 h-4" />
            <span>Add Holiday</span>
          </button>
        </div>

        <div className="bg-gradient-to-br from-white to-blue-50 rounded-xl shadow-lg border border-blue-100">
          {/* Search and Controls */}
          <div className="p-6 border-b border-blue-200 bg-gradient-to-r from-blue-50 to-indigo-50">
            <div className="flex justify-between items-center">
              <div className="flex items-center space-x-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-600 w-4 h-4" />
                  <input
                    type="text"
                    placeholder="Search:"
                    value={searchTerm}
                    onChange={handleSearch}
                    className="pl-10 pr-4 py-3 border-2 border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 w-80 text-gray-900 placeholder-gray-500 shadow-md bg-white"
                  />
                </div>
              </div>
            </div>
          </div>
          
          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gradient-to-r from-blue-600 to-indigo-600">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-bold text-white uppercase tracking-wider">
                    #
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-white uppercase tracking-wider">
                    Title
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-white uppercase tracking-wider">
                    Holiday Date
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-white uppercase tracking-wider">
                    Day
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-white uppercase tracking-wider">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-blue-100">
                {currentHolidays.map((holiday, index) => (
                  <tr key={holiday.id} className="hover:bg-blue-50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-gray-900">
                      {holiday.id}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-blue-700">
                      {holiday.title}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800">
                      {holiday.date}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-gray-900">
                      {holiday.day}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex items-center space-x-2">
                        <button className="text-red-600 hover:text-red-700 p-2 rounded hover:bg-red-50 transition-colors">
                          <Trash2 className="w-4 h-4" />
                        </button>
                        <button className="text-green-600 hover:text-green-700 p-2 rounded hover:bg-green-50 transition-colors">
                          <Edit className="w-4 h-4" />
                        </button>
                        <button className="text-blue-600 hover:text-blue-700 p-2 rounded hover:bg-blue-50 transition-colors">
                          <Eye className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border-t border-blue-200">
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
              totalItems={totalItems}
              itemsPerPage={itemsPerPage}
              onItemsPerPageChange={handleItemsPerPageChange}
            />
          </div>
        </div>
      </div>
    </Layout>
  )
} 