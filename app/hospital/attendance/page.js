"use client"

import { useState, useMemo } from "react"
import { Layout } from "@/components/layout"
import { Pagination } from "@/components/ui/pagination"
import { usePagination } from "@/lib/hooks/usePagination"
import { Search, Check, X } from "lucide-react"

// Sample attendance data matching the reference image
const attendanceData = [
  {
    id: 1,
    name: "Willian Mathews",
    attendance: {
      1: true, 2: true, 3: false, 4: true, 5: true, 6: true, 7: true, 8: true, 9: true, 10: true,
      11: false, 12: true, 13: true, 14: true, 15: true, 16: true, 17: true, 18: true, 19: true, 20: true,
      21: true, 22: true, 23: true, 24: true, 25: true, 26: true, 27: true, 28: true, 29: true, 30: true
    }
  },
  {
    id: 2,
    name: "Fermin Bradley",
    attendance: {
      1: true, 2: true, 3: true, 4: true, 5: true, 6: false, 7: true, 8: true, 9: true, 10: true,
      11: true, 12: true, 13: true, 14: true, 15: false, 16: true, 17: true, 18: true, 19: true, 20: true,
      21: true, 22: true, 23: true, 24: true, 25: true, 26: true, 27: true, 28: true, 29: true, 30: true
    }
  },
  {
    id: 3,
    name: "Merle Daniel",
    attendance: {
      1: true, 2: true, 3: true, 4: true, 5: false, 6: true, 7: true, 8: true, 9: true, 10: true,
      11: true, 12: true, 13: true, 14: true, 15: true, 16: false, 17: true, 18: true, 19: true, 20: true,
      21: true, 22: true, 23: true, 24: true, 25: true, 26: true, 27: true, 28: true, 29: true, 30: true
    }
  },
  {
    id: 4,
    name: "Nicole Sellers",
    attendance: {
      1: true, 2: true, 3: true, 4: true, 5: true, 6: true, 7: true, 8: true, 9: true, 10: true,
      11: true, 12: true, 13: false, 14: true, 15: true, 16: true, 17: true, 18: true, 19: true, 20: true,
      21: true, 22: false, 23: true, 24: true, 25: false, 26: true, 27: true, 28: true, 29: true, 30: true
    }
  },
  {
    id: 5,
    name: "Kathy Atkinson",
    attendance: {
      1: true, 2: true, 3: true, 4: true, 5: true, 6: true, 7: false, 8: true, 9: true, 10: true,
      11: true, 12: true, 13: false, 14: true, 15: true, 16: true, 17: true, 18: true, 19: true, 20: true,
      21: true, 22: true, 23: true, 24: true, 25: true, 26: true, 27: true, 28: true, 29: false, 30: true
    }
  },
  {
    id: 6,
    name: "Roger Briggs",
    attendance: {
      1: true, 2: true, 3: false, 4: true, 5: true, 6: true, 7: true, 8: true, 9: true, 10: true,
      11: false, 12: true, 13: true, 14: true, 15: true, 16: true, 17: true, 18: true, 19: true, 20: true,
      21: true, 22: true, 23: true, 24: true, 25: false, 26: true, 27: true, 28: true, 29: true, 30: true
    }
  },
  {
    id: 7,
    name: "Mervin Elliott",
    attendance: {
      1: true, 2: true, 3: false, 4: true, 5: true, 6: true, 7: true, 8: true, 9: true, 10: true,
      11: false, 12: true, 13: true, 14: true, 15: true, 16: true, 17: true, 18: true, 19: true, 20: true,
      21: true, 22: true, 23: true, 24: true, 25: false, 26: true, 27: true, 28: true, 29: true, 30: true
    }
  },
  {
    id: 8,
    name: "Olen George",
    attendance: {
      1: false, 2: true, 3: true, 4: true, 5: true, 6: true, 7: false, 8: true, 9: true, 10: true,
      11: true, 12: true, 13: true, 14: true, 15: true, 16: true, 17: true, 18: true, 19: true, 20: true,
      21: true, 22: true, 23: true, 24: true, 25: true, 26: true, 27: true, 28: true, 29: true, 30: false
    }
  }
]

export default function HospitalAttendancePage() {
  const [searchTerm, setSearchTerm] = useState("")

  // Filter employees based on search term
  const filteredEmployees = useMemo(() => {
    return attendanceData.filter(employee =>
      employee.name.toLowerCase().includes(searchTerm.toLowerCase())
    )
  }, [searchTerm])

  // Use pagination hook
  const {
    currentPage,
    totalPages,
    totalItems,
    itemsPerPage,
    currentItems: currentEmployees,
    handlePageChange,
    handleItemsPerPageChange,
    resetPagination
  } = usePagination(filteredEmployees, 8)

  const handleSearch = (e) => {
    setSearchTerm(e.target.value)
    resetPagination() // Reset to first page when searching
  }

  // Generate day columns (1-30)
  const dayColumns = Array.from({ length: 30 }, (_, i) => i + 1)

  return (
    <Layout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Attendance</h1>
            <p className="text-gray-700 text-lg">Track and manage employee attendance records</p>
          </div>
        </div>

        {/* Search Bar */}
        <div className="flex justify-end">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search employees..."
              value={searchTerm}
              onChange={handleSearch}
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 w-64 text-gray-900"
            />
          </div>
        </div>

        {/* Attendance Table */}
        <div className="bg-white rounded-lg shadow-lg border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-900 uppercase tracking-wider border-r border-gray-200">
                    Employees
                  </th>
                  {dayColumns.map((day) => (
                    <th key={day} className="px-3 py-4 text-center text-xs font-bold text-gray-900 uppercase tracking-wider border-r border-gray-200 min-w-[40px]">
                      {day}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {currentEmployees.map((employee) => (
                  <tr key={employee.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-gray-900 border-r border-gray-200">
                      {employee.name}
                    </td>
                    {dayColumns.map((day) => (
                      <td key={day} className="px-3 py-4 text-center border-r border-gray-200">
                        {employee.attendance[day] ? (
                          <div className="flex justify-center">
                            <Check className="w-4 h-4 text-green-600" />
                          </div>
                        ) : (
                          <div className="flex justify-center">
                            <X className="w-4 h-4 text-red-600" />
                          </div>
                        )}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="bg-gray-50 border-t border-gray-200">
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

        {/* Legend */}
        <div className="flex items-center justify-center space-x-6 text-sm">
          <div className="flex items-center space-x-2">
            <Check className="w-4 h-4 text-green-600" />
            <span className="text-gray-700">Present</span>
          </div>
          <div className="flex items-center space-x-2">
            <X className="w-4 h-4 text-red-600" />
            <span className="text-gray-700">Absent</span>
          </div>
        </div>
      </div>
    </Layout>
  )
} 