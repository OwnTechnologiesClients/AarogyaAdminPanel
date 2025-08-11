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

// Sample department data matching the reference image
const departmentsData = [
  {
    id: 1,
    name: "Cancer Department",
    status: "Active"
  },
  {
    id: 2,
    name: "Dental Department",
    status: "Inactive"
  },
  {
    id: 3,
    name: "ENT Department",
    status: "Active"
  },
  {
    id: 4,
    name: "Neurology Department",
    status: "Active"
  },
  {
    id: 5,
    name: "Opthamology",
    status: "Active"
  },
  {
    id: 6,
    name: "Primary Care",
    status: "Active"
  },
  {
    id: 7,
    name: "Orthopedic",
    status: "Inactive"
  },
  {
    id: 8,
    name: "Eye Care",
    status: "Active"
  },
  // Add more data for pagination testing
  {
    id: 9,
    name: "Cardiology Department",
    status: "Active"
  },
  {
    id: 10,
    name: "Pediatrics Department",
    status: "Active"
  },
  {
    id: 11,
    name: "Emergency Department",
    status: "Active"
  },
  {
    id: 12,
    name: "Radiology Department",
    status: "Inactive"
  },
  {
    id: 13,
    name: "Surgery Department",
    status: "Active"
  },
  {
    id: 14,
    name: "Psychiatry Department",
    status: "Active"
  },
  {
    id: 15,
    name: "Dermatology Department",
    status: "Inactive"
  },
  {
    id: 16,
    name: "Urology Department",
    status: "Active"
  }
]

export default function HospitalDepartmentsPage() {
  const [searchTerm, setSearchTerm] = useState("")

  // Filter departments based on search term
  const filteredDepartments = useMemo(() => {
    return departmentsData.filter(department =>
      department.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      department.status.toLowerCase().includes(searchTerm.toLowerCase())
    )
  }, [searchTerm])

  // Use pagination hook
  const {
    currentPage,
    totalPages,
    totalItems,
    itemsPerPage,
    currentItems: currentDepartments,
    handlePageChange,
    handleItemsPerPageChange,
    resetPagination
  } = usePagination(filteredDepartments, 8)

  const handleSearch = (e) => {
    setSearchTerm(e.target.value)
    resetPagination() // Reset to first page when searching
  }

  const getStatusBadge = (status) => {
    const statusStyles = {
      "Active": "bg-green-100 text-green-800 border-green-200",
      "Inactive": "bg-gray-100 text-gray-800 border-gray-200"
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
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Department</h1>
            <p className="text-gray-700 text-lg">Manage hospital departments and their status</p>
          </div>
          <button className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold shadow-sm flex items-center space-x-2">
            <Plus className="w-4 h-4" />
            <span>Add Department</span>
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
                    Department Name
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
                {currentDepartments.map((department, index) => (
                  <tr key={department.id} className="hover:bg-blue-50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-gray-900">
                      {department.id}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-blue-700">
                      {department.name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {getStatusBadge(department.status)}
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