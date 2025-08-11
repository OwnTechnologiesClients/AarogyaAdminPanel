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
  Filter,
  User
} from "lucide-react"

// Sample patient data
const patientsData = [
  {
    id: "#P001",
    name: "John Doe",
    age: 35,
    gender: "Male",
    contactNumber: "(555) 123-4567",
    email: "john.doe@email.com",
    lastVisit: "2024-01-15",
    status: "Active"
  },
  {
    id: "#P002",
    name: "Jane Smith",
    age: 28,
    gender: "Female",
    contactNumber: "(555) 234-5678",
    email: "jane.smith@email.com",
    lastVisit: "2024-01-10",
    status: "Active"
  },
  {
    id: "#P003",
    name: "Mike Johnson",
    age: 42,
    gender: "Male",
    contactNumber: "(555) 345-6789",
    email: "mike.johnson@email.com",
    lastVisit: "2024-01-08",
    status: "Inactive"
  },
  {
    id: "#P004",
    name: "Sarah Wilson",
    age: 31,
    gender: "Female",
    contactNumber: "(555) 456-7890",
    email: "sarah.wilson@email.com",
    lastVisit: "2024-01-12",
    status: "Active"
  },
  {
    id: "#P005",
    name: "David Brown",
    age: 55,
    gender: "Male",
    contactNumber: "(555) 567-8901",
    email: "david.brown@email.com",
    lastVisit: "2024-01-05",
    status: "Active"
  },
  {
    id: "#P006",
    name: "Lisa Davis",
    age: 29,
    gender: "Female",
    contactNumber: "(555) 678-9012",
    email: "lisa.davis@email.com",
    lastVisit: "2024-01-03",
    status: "Active"
  },
  {
    id: "#P007",
    name: "Robert Miller",
    age: 38,
    gender: "Male",
    contactNumber: "(555) 789-0123",
    email: "robert.miller@email.com",
    lastVisit: "2023-12-28",
    status: "Inactive"
  },
  {
    id: "#P008",
    name: "Emily Taylor",
    age: 26,
    gender: "Female",
    contactNumber: "(555) 890-1234",
    email: "emily.taylor@email.com",
    lastVisit: "2024-01-14",
    status: "Active"
  },
  {
    id: "#P009",
    name: "James Anderson",
    age: 45,
    gender: "Male",
    contactNumber: "(555) 901-2345",
    email: "james.anderson@email.com",
    lastVisit: "2024-01-11",
    status: "Active"
  },
  {
    id: "#P010",
    name: "Maria Garcia",
    age: 33,
    gender: "Female",
    contactNumber: "(555) 012-3456",
    email: "maria.garcia@email.com",
    lastVisit: "2024-01-09",
    status: "Active"
  }
]

export default function PatientsList() {
  const [searchTerm, setSearchTerm] = useState("")

  // Filter patients based on search term
  const filteredPatients = useMemo(() => {
    return patientsData.filter(patient =>
      patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      patient.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      patient.contactNumber.includes(searchTerm) ||
      patient.id.toLowerCase().includes(searchTerm.toLowerCase())
    )
  }, [searchTerm])

  // Use pagination hook
  const {
    currentPage,
    totalPages,
    totalItems,
    itemsPerPage,
    currentItems: currentPatients,
    handlePageChange,
    handleItemsPerPageChange,
    resetPagination
  } = usePagination(filteredPatients, 8)

  const handleSearch = (e) => {
    setSearchTerm(e.target.value)
    resetPagination() // Reset to first page when searching
  }

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Patients List</h1>
            <p className="text-gray-700 text-lg">View and manage all patients</p>
          </div>
          <button className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold shadow-sm">
            Add New Patient
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
                    placeholder="Search patients, email, contact..."
                    value={searchTerm}
                    onChange={handleSearch}
                    className="pl-10 pr-4 py-3 border-2 border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 w-80 text-gray-900 placeholder-gray-500 shadow-md bg-white"
                  />
                </div>
                <button className="flex items-center space-x-2 px-4 py-3 border-2 border-blue-200 rounded-lg hover:bg-blue-50 hover:border-blue-400 transition-colors shadow-md bg-white">
                  <Filter className="w-4 h-4 text-blue-600" />
                  <span className="text-sm font-medium text-gray-900">Filter</span>
                </button>
              </div>
              {searchTerm && (
                <div className="text-sm text-gray-800 font-semibold bg-blue-100 px-4 py-2 rounded-lg">
                  Found <span className="text-blue-700 font-bold">{filteredPatients.length}</span> patient{filteredPatients.length !== 1 ? 's' : ''}
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
                    ID
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-white uppercase tracking-wider">
                    Patient Name
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-white uppercase tracking-wider">
                    Age/Gender
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-white uppercase tracking-wider">
                    <div className="flex items-center space-x-1">
                      <span>Contact</span>
                      <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                    </div>
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-white uppercase tracking-wider">
                    Last Visit
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
                {currentPatients.map((patient, index) => (
                  <tr key={index} className="hover:bg-blue-50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-blue-700">
                      {patient.id}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="w-10 h-10 rounded-full overflow-hidden ring-2 ring-blue-200">
                          <div className="w-full h-full bg-blue-100 rounded-full flex items-center justify-center">
                            <User className="w-5 h-5 text-blue-600" />
                          </div>
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-bold text-gray-900">{patient.name}</div>
                          <div className="text-sm text-gray-500">{patient.email}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-blue-700">
                      {patient.age} / {patient.gender}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-gray-800">
                      {patient.contactNumber}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-700">
                      {patient.lastVisit}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 text-xs rounded-full ${
                        patient.status === "Active" 
                          ? "bg-green-100 text-green-800" 
                          : "bg-gray-100 text-gray-800"
                      }`}>
                        {patient.status}
                      </span>
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
    </Layout>
  )
} 