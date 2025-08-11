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

// Sample leave data matching the reference image
const leavesData = [
  {
    id: 1,
    employee: {
      name: "Taylor Melan",
      role: "Doctor"
    },
    leaveType: "Medical leaves",
    from: "13 Jul, 2025",
    to: "15 Jul, 2025",
    days: "2 days",
    reason: "Going to vacation",
    status: "Accepted"
  },
  {
    id: 2,
    employee: {
      name: "Ronald Sulvian",
      role: "Nurse"
    },
    leaveType: "Casual leaves",
    from: "08 Aug, 2025",
    to: "11 Aug, 2025",
    days: "3 days",
    reason: "Family Function",
    status: "New"
  },
  {
    id: 3,
    employee: {
      name: "George Baily",
      role: "Laboratories"
    },
    leaveType: "Casual leaves",
    from: "13 May, 2025",
    to: "17 May, 2025",
    days: "4 days",
    reason: "Not Feeling Weell",
    status: "Declined"
  },
  {
    id: 4,
    employee: {
      name: "Bshton Cozei",
      role: "Accountant"
    },
    leaveType: "Casual leaves",
    from: "27 Jun, 2025",
    to: "29 Jun, 2025",
    days: "2 days",
    reason: "Going to Native place",
    status: "Approved"
  },
  {
    id: 5,
    employee: {
      name: "Alan Stuart",
      role: "Pharmacist"
    },
    leaveType: "Casual leaves",
    from: "09 Apr, 2025",
    to: "11 Apr, 2025",
    days: "2 days",
    reason: "Going to Marriage",
    status: "Declined"
  },
  {
    id: 6,
    employee: {
      name: "Meera Gill",
      role: "Admin"
    },
    leaveType: "Casual leaves",
    from: "11 Feb, 2025",
    to: "14 Feb, 2025",
    days: "3 days",
    reason: "For Travel",
    status: "Approved"
  },
  {
    id: 7,
    employee: {
      name: "Gilbert Sandoval",
      role: "Helper"
    },
    leaveType: "Casual leaves",
    from: "13 Jul, 2025",
    to: "15 Jul, 2025",
    days: "2 days",
    reason: "Feeling Unwell",
    status: "New"
  },
  {
    id: 8,
    employee: {
      name: "Taylor Melan",
      role: "Doctor"
    },
    leaveType: "Medical leaves",
    from: "13 Jul, 2025",
    to: "15 Jul, 2025",
    days: "2 days",
    reason: "Going to vacation",
    status: "Accepted"
  },
  // Add more data for pagination testing
  {
    id: 9,
    employee: {
      name: "Sarah Johnson",
      role: "Nurse"
    },
    leaveType: "Medical leaves",
    from: "20 Jul, 2025",
    to: "22 Jul, 2025",
    days: "2 days",
    reason: "Health Checkup",
    status: "New"
  },
  {
    id: 10,
    employee: {
      name: "Michael Chen",
      role: "Doctor"
    },
    leaveType: "Casual leaves",
    from: "25 Jul, 2025",
    to: "28 Jul, 2025",
    days: "3 days",
    reason: "Family Event",
    status: "Approved"
  },
  {
    id: 11,
    employee: {
      name: "Lisa Wang",
      role: "Pharmacist"
    },
    leaveType: "Medical leaves",
    from: "30 Jul, 2025",
    to: "01 Aug, 2025",
    days: "2 days",
    reason: "Medical Appointment",
    status: "New"
  },
  {
    id: 12,
    employee: {
      name: "David Kim",
      role: "Laboratories"
    },
    leaveType: "Casual leaves",
    from: "05 Aug, 2025",
    to: "07 Aug, 2025",
    days: "2 days",
    reason: "Personal Work",
    status: "Declined"
  }
]

export default function HospitalLeavesPage() {
  const [searchTerm, setSearchTerm] = useState("")

  // Filter leaves based on search term
  const filteredLeaves = useMemo(() => {
    return leavesData.filter(leave =>
      leave.employee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      leave.employee.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
      leave.leaveType.toLowerCase().includes(searchTerm.toLowerCase()) ||
      leave.reason.toLowerCase().includes(searchTerm.toLowerCase()) ||
      leave.status.toLowerCase().includes(searchTerm.toLowerCase())
    )
  }, [searchTerm])

  // Use pagination hook
  const {
    currentPage,
    totalPages,
    totalItems,
    itemsPerPage,
    currentItems: currentLeaves,
    handlePageChange,
    handleItemsPerPageChange,
    resetPagination
  } = usePagination(filteredLeaves, 8)

  const handleSearch = (e) => {
    setSearchTerm(e.target.value)
    resetPagination() // Reset to first page when searching
  }

  const getStatusBadge = (status) => {
    const statusStyles = {
      "Accepted": "bg-green-100 text-green-800 border-green-200",
      "Approved": "bg-blue-100 text-blue-800 border-blue-200",
      "New": "bg-yellow-100 text-yellow-800 border-yellow-200",
      "Declined": "bg-red-100 text-red-800 border-red-200"
    }
    
    return (
      <span className={`px-3 py-1 text-xs font-semibold rounded-full border ${statusStyles[status] || "bg-gray-100 text-gray-800 border-gray-200"}`}>
        {status}
      </span>
    )
  }

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Leaves</h1>
            <p className="text-gray-700 text-lg">Manage employee leave requests and approvals</p>
          </div>
          <button className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold shadow-sm flex items-center space-x-2">
            <Plus className="w-4 h-4" />
            <span>Add Leave</span>
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
              {searchTerm && (
                <div className="text-sm text-gray-800 font-semibold bg-blue-100 px-4 py-2 rounded-lg">
                  Found <span className="text-blue-700 font-bold">{filteredLeaves.length}</span> leave request{filteredLeaves.length !== 1 ? 's' : ''}
                  <span className="text-gray-700 ml-2">for "{searchTerm}"</span>
                </div>
              )}
            </div>
          </div>
          
          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gradient-to-r from-blue-600 to-indigo-600">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-bold text-white uppercase tracking-wider">
                    Employee
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-white uppercase tracking-wider">
                    Leave Type
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-white uppercase tracking-wider">
                    From
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-white uppercase tracking-wider">
                    To
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-white uppercase tracking-wider">
                    Days
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-white uppercase tracking-wider">
                    Reason
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-white uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-white uppercase tracking-wider">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-blue-100">
                {currentLeaves.map((leave, index) => (
                  <tr key={leave.id} className="hover:bg-blue-50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center ring-2 ring-blue-200">
                          <span className="text-sm font-semibold text-blue-600">
                            {leave.employee.name.split(' ').map(n => n[0]).join('')}
                          </span>
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-bold text-gray-900">{leave.employee.name}</div>
                          <div className="text-sm text-gray-500">{leave.employee.role}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-blue-700">
                      {leave.leaveType}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800">
                      {leave.from}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800">
                      {leave.to}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-gray-900">
                      {leave.days}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-700">
                      {leave.reason}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {getStatusBadge(leave.status)}
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