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
  Plus,
  Settings
} from "lucide-react"

// Sample salary data matching the reference image
const salaryData = [
  {
    id: 1,
    employee: {
      name: "Taylor Melon",
      email: "hello@hinton.com"
    },
    empId: "FT-0001",
    days: 23,
    role: "Nurse",
    salary: 5960
  },
  {
    id: 2,
    employee: {
      name: "Ronald Sullivan",
      email: "hello@hinton.com"
    },
    empId: "FT-0002",
    days: 20,
    role: "Doctor",
    salary: 7660
  },
  {
    id: 3,
    employee: {
      name: "George Bailey",
      email: "hello@hinton.com"
    },
    empId: "FT-0003",
    days: 22,
    role: "Helper",
    salary: 4560
  },
  {
    id: 4,
    employee: {
      name: "Bshton Cozei",
      email: "hello@hinton.com"
    },
    empId: "FT-0004",
    days: 21,
    role: "Pharmacist",
    salary: 6780
  },
  {
    id: 5,
    employee: {
      name: "Alan Stuart",
      email: "hello@hinton.com"
    },
    empId: "FT-0005",
    days: 24,
    role: "Admin",
    salary: 8900
  },
  {
    id: 6,
    employee: {
      name: "Smith White",
      email: "hello@hinton.com"
    },
    empId: "FT-0006",
    days: 19,
    role: "Accountant",
    salary: 7200
  },
  {
    id: 7,
    employee: {
      name: "Meera Gill",
      email: "hello@hinton.com"
    },
    empId: "FT-0007",
    days: 25,
    role: "Doctor",
    salary: 8500
  },
  {
    id: 8,
    employee: {
      name: "Gilbert Sandoval",
      email: "hello@hinton.com"
    },
    empId: "FT-0008",
    days: 18,
    role: "Nurse",
    salary: 5200
  },
  // Add more data for pagination testing
  {
    id: 9,
    employee: {
      name: "Maria Rodriguez",
      email: "hello@hinton.com"
    },
    empId: "FT-0009",
    days: 22,
    role: "Pharmacist",
    salary: 6900
  },
  {
    id: 10,
    employee: {
      name: "David Kim",
      email: "hello@hinton.com"
    },
    empId: "FT-0010",
    days: 23,
    role: "Doctor",
    salary: 9200
  },
  {
    id: 11,
    employee: {
      name: "Sarah Johnson",
      email: "hello@hinton.com"
    },
    empId: "FT-0011",
    days: 20,
    role: "Admin",
    salary: 7800
  },
  {
    id: 12,
    employee: {
      name: "Michael Chen",
      email: "hello@hinton.com"
    },
    empId: "FT-0012",
    days: 21,
    role: "Accountant",
    salary: 6500
  }
]

export default function HospitalSalaryPage() {
  const [searchTerm, setSearchTerm] = useState("")

  // Filter salary data based on search term
  const filteredSalaryData = useMemo(() => {
    return salaryData.filter(item =>
      item.employee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.employee.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.empId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.role.toLowerCase().includes(searchTerm.toLowerCase())
    )
  }, [searchTerm])

  // Use pagination hook
  const {
    currentPage,
    totalPages,
    totalItems,
    itemsPerPage,
    currentItems: currentSalaryData,
    handlePageChange,
    handleItemsPerPageChange,
    resetPagination
  } = usePagination(filteredSalaryData, 8)

  const handleSearch = (e) => {
    setSearchTerm(e.target.value)
    resetPagination() // Reset to first page when searching
  }

  const formatSalary = (salary) => {
    return `$${salary.toLocaleString()}`
  }

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Salary</h1>
            <p className="text-gray-700 text-lg">Manage employee salary information and payroll</p>
          </div>
          <div className="flex items-center space-x-3">
            <button className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold shadow-sm flex items-center space-x-2">
              <Settings className="w-4 h-4" />
              <span>Salary Settings</span>
            </button>
            <button className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold shadow-sm flex items-center space-x-2">
              <Plus className="w-4 h-4" />
              <span>Add Salary</span>
            </button>
          </div>
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
                  Found <span className="text-blue-700 font-bold">{filteredSalaryData.length}</span> employee{filteredSalaryData.length !== 1 ? 's' : ''}
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
                    Employees
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-white uppercase tracking-wider">
                    Emp ID
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-white uppercase tracking-wider">
                    Email
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-white uppercase tracking-wider">
                    Days
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-white uppercase tracking-wider">
                    Role
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-white uppercase tracking-wider">
                    Salary
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-white uppercase tracking-wider">
                    Pay Slip
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-white uppercase tracking-wider">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-blue-100">
                {currentSalaryData.map((item, index) => (
                  <tr key={item.id} className="hover:bg-blue-50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center ring-2 ring-blue-200">
                          <span className="text-sm font-semibold text-blue-600">
                            {item.employee.name.split(' ').map(n => n[0]).join('')}
                          </span>
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-bold text-gray-900">{item.employee.name}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-blue-700">
                      {item.empId}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800">
                      {item.employee.email}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-gray-900">
                      {item.days}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-blue-700">
                      {item.role}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-gray-900">
                      {formatSalary(item.salary)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <button className="px-4 py-2 bg-gray-500 text-white text-xs font-semibold rounded-lg hover:bg-gray-600 transition-colors">
                        Generate Slip
                      </button>
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