"use client"

import { useState, useMemo } from "react"
import { Layout } from "@/components/layout"
import { Pagination } from "@/components/ui/pagination"
import { usePagination } from "@/lib/hooks/usePagination"
import { 
  Search, 
  Filter
} from "lucide-react"


// Sample users data matching the reference image
const usersData = [
  {
    id: "#0047",
    name: "Taylor Melon",
    phoneNumber: "+91-9876543456",
    email: "abc@gmail.com",
    password: "test email"
  },
  {
    id: "#0048",
    name: "Sarah Johnson",
    phoneNumber: "+91-8765432109",
    email: "sarah.j@example.com",
    password: "secure123"
  },
  {
    id: "#0049",
    name: "Michael Chen",
    phoneNumber: "+91-7654321098",
    email: "michael.c@example.com",
    password: "pass456"
  },
  {
    id: "#0050",
    name: "Emily Davis",
    phoneNumber: "+91-6543210987",
    email: "emily.d@example.com",
    password: "emily789"
  },
  {
    id: "#0051",
    name: "David Wilson",
    phoneNumber: "+91-5432109876",
    email: "david.w@example.com",
    password: "david2024"
  },
  {
    id: "#0052",
    name: "Lisa Brown",
    phoneNumber: "+91-4321098765",
    email: "lisa.b@example.com",
    password: "lisa123"
  },
  {
    id: "#0053",
    name: "James Miller",
    phoneNumber: "+91-3210987654",
    email: "james.m@example.com",
    password: "james456"
  },
  {
    id: "#0054",
    name: "Jennifer Garcia",
    phoneNumber: "+91-2109876543",
    email: "jennifer.g@example.com",
    password: "jen789"
  },
  // Add more users for pagination testing
  {
    id: "#0055",
    name: "Robert Martinez",
    phoneNumber: "+91-1098765432",
    email: "robert.m@example.com",
    password: "rob2024"
  },
  {
    id: "#0056",
    name: "Amanda Taylor",
    phoneNumber: "+91-0987654321",
    email: "amanda.t@example.com",
    password: "amanda123"
  },
  {
    id: "#0057",
    name: "Christopher Lee",
    phoneNumber: "+91-9876543210",
    email: "chris.l@example.com",
    password: "chris456"
  },
  {
    id: "#0058",
    name: "Jessica White",
    phoneNumber: "+91-8765432109",
    email: "jessica.w@example.com",
    password: "jess789"
  }
]

export default function UsersPage() {
  const [searchTerm, setSearchTerm] = useState("")

  // Filter users based on search term
  const filteredUsers = useMemo(() => {
    return usersData.filter(user =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.phoneNumber.includes(searchTerm) ||
      user.id.toLowerCase().includes(searchTerm.toLowerCase())
    )
  }, [searchTerm])

  // Use pagination hook
  const {
    currentPage,
    totalPages,
    totalItems,
    itemsPerPage,
    currentItems: currentUsers,
    handlePageChange,
    handleItemsPerPageChange,
    resetPagination
  } = usePagination(filteredUsers, 8)

  const handleSearch = (e) => {
    setSearchTerm(e.target.value)
    resetPagination() // Reset to first page when searching
  }

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Signup Users</h1>
            <p className="text-gray-700 text-lg">View and manage all registered users</p>
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
                    placeholder="Search users by name, email, phone..."
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
                  Found <span className="text-blue-700 font-bold">{filteredUsers.length}</span> user{filteredUsers.length !== 1 ? 's' : ''}
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
                    Name
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-white uppercase tracking-wider">
                    Phone Number
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-white uppercase tracking-wider">
                    Email
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-white uppercase tracking-wider">
                    Password
                  </th>

                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-blue-100">
                {currentUsers.map((user, index) => (
                  <tr key={index} className="hover:bg-blue-50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-blue-700">
                      {user.id}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center ring-2 ring-blue-200">
                          <span className="text-sm font-semibold text-blue-600">
                            {user.name.split(' ').map(n => n[0]).join('')}
                          </span>
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-bold text-gray-900">{user.name}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-gray-800">
                      {user.phoneNumber}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-700">
                      {user.email}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-600">
                      {user.password}
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