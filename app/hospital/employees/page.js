
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
  ChevronUp,
  Filter
} from "lucide-react"

// Sample employee data matching the reference image
const employeesData = [
  {
    id: "#0047",
    name: "William Mathews",
    designation: "Supervisor",
    mobile: "(203) 869-0576",
    email: "hello@hinton.com",
    doj: "20/10/2020",
    avatar: "/doctorimg/doctor-1.png"
  },
  {
    id: "#0044",
    name: "Fermin Bradley",
    designation: "Nurse",
    mobile: "(808) 947-1332",
    email: "hello@hinton.com",
    doj: "12/03/22",
    avatar: "/doctorimg/doctor-2.png"
  },
  {
    id: "#0044",
    name: "Meris Danial",
    designation: "Receptionist",
    mobile: "(269) 657-8949",
    email: "hello@hinton.com",
    doj: "03/09/2025",
    avatar: "/doctorimg/doctor-3.png"
  },
  {
    id: "#0067",
    name: "Nicole Sellers",
    designation: "Pharmacist",
    mobile: "(704) 896-7895",
    email: "hello@hinton.com",
    doj: "18/12/2021",
    avatar: "/doctorimg/doctor-4.png"
  },
  {
    id: "#0047",
    name: "Kathy Atknson",
    designation: "Admin",
    mobile: "(718) 875-3677",
    email: "hello@hinton.com",
    doj: "23/10/2025",
    avatar: "/doctorimg/doctor-5.png"
  },
  {
    id: "#0047",
    name: "Roger Brigs",
    designation: "Assistant",
    mobile: "(832) 296-1988",
    email: "hello@hinton.com",
    doj: "15/06/2025",
    avatar: "/doctorimg/doctor-6.png"
  },
  // Add more employees for pagination testing
  {
    id: "#0039",
    name: "Sarah Johnson",
    designation: "Lab Technician",
    mobile: "(800) 869-3557",
    email: "hello@hinton.com",
    doj: "05/01/2023",
    avatar: "/doctorimg/doctor-7.png"
  },
  {
    id: "#0026",
    name: "Michael Chen",
    designation: "Security Guard",
    mobile: "(888) 826-6890",
    email: "hello@hinton.com",
    doj: "10/04/2022",
    avatar: "/doctorimg/doctor-8.png"
  },
  {
    id: "#0027",
    name: "Maria Rodriguez",
    designation: "Housekeeping",
    mobile: "(555) 123-4567",
    email: "hello@hinton.com",
    doj: "15/07/2021",
    avatar: "/doctorimg/doctor-1.png"
  },
  {
    id: "#0028",
    name: "David Kim",
    designation: "IT Support",
    mobile: "(555) 234-5678",
    email: "hello@hinton.com",
    doj: "22/11/2020",
    avatar: "/doctorimg/doctor-2.png"
  },
  {
    id: "#0029",
    name: "Lisa Thompson",
    designation: "Cafeteria Staff",
    mobile: "(555) 345-6789",
    email: "hello@hinton.com",
    doj: "08/03/2024",
    avatar: "/doctorimg/doctor-3.png"
  },
  {
    id: "#0030",
    name: "Robert Wilson",
    designation: "Maintenance",
    mobile: "(555) 456-7890",
    email: "hello@hinton.com",
    doj: "14/09/2023",
    avatar: "/doctorimg/doctor-4.png"
  }
]

export default function HospitalEmployeesPage() {
  const [searchTerm, setSearchTerm] = useState("")

  // Filter employees based on search term
  const filteredEmployees = useMemo(() => {
    return employeesData.filter(employee =>
      employee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      employee.designation.toLowerCase().includes(searchTerm.toLowerCase()) ||
      employee.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      employee.mobile.includes(searchTerm)
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

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Employees List</h1>
            <p className="text-gray-700 text-lg">View and manage all employees</p>
          </div>
          <button className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold shadow-sm">
            Add Employees
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
                    placeholder="Search employees by name, designation, email, or mobile..."
                    value={searchTerm}
                    onChange={handleSearch}
                    className="pl-10 pr-4 py-3 border-2 border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 w-80 text-gray-900 placeholder-gray-500 shadow-md bg-white"
                  />
                  {searchTerm && (
                    <button
                      onClick={() => {
                        setSearchTerm("")
                        resetPagination()
                      }}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  )}
                </div>
                <button className="flex items-center space-x-2 px-4 py-3 border-2 border-blue-200 rounded-lg hover:bg-blue-50 hover:border-blue-400 transition-colors shadow-md bg-white">
                  <Filter className="w-4 h-4 text-blue-600" />
                  <span className="text-sm font-medium text-gray-900">Filter</span>
                </button>
              </div>
              {searchTerm && (
                <div className="text-sm text-gray-800 font-semibold bg-blue-100 px-4 py-2 rounded-lg">
                  Found <span className="text-blue-700 font-bold">{filteredEmployees.length}</span> employee{filteredEmployees.length !== 1 ? 's' : ''}
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
                  <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                    ID
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                    Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                    Designation
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                    Mobile
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                    Email
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                    DOJ
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {currentEmployees.map((employee, index) => (
                  <tr key={index} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {employee.id}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="w-8 h-8 rounded-full overflow-hidden">
                          <img 
                            src={employee.avatar} 
                            alt={employee.name}
                            className="w-full h-full object-cover"
                            onError={(e) => {
                              // Fallback to initials if image fails to load
                              e.target.style.display = 'none';
                              e.target.nextSibling.style.display = 'flex';
                            }}
                          />
                          <div className="w-full h-full bg-gray-200 rounded-full flex items-center justify-center hidden">
                            <span className="text-xs font-semibold text-gray-600">
                              {employee.name.split(' ').map(n => n[0]).join('')}
                            </span>
                          </div>
                        </div>
                        <div className="ml-3">
                          <div className="text-sm font-medium text-gray-900">{employee.name}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {employee.designation}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {employee.mobile}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {employee.email}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {employee.doj}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex items-center space-x-2">
                        <button className="text-red-600 hover:text-red-700 p-1 rounded hover:bg-red-50 transition-colors">
                          <Trash2 className="w-4 h-4" />
                        </button>
                        <button className="text-green-600 hover:text-green-700 p-1 rounded hover:bg-green-50 transition-colors">
                          <Edit className="w-4 h-4" />
                        </button>
                        <button className="text-blue-600 hover:text-blue-700 p-1 rounded hover:bg-blue-50 transition-colors">
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

    
      </div>
    </Layout>
  )
} 
