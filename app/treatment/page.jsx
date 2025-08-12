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
  Building2
} from "lucide-react"
import Image from "next/image"

// Sample institutions data
const institutionsData = [
  {
    id: "#0047",
    name: "Fortis",
    institutionType: "Hospital",
    mobile: "+91-9987654345",
    email: "hello@hinton.com",
    location: "Vasant Kunj",
    image: "/logo.png"
  },
  {
    id: "#0048",
    name: "Max",
    institutionType: "Hospital",
    mobile: "+91-9987654346",
    email: "hello@max.com",
    location: "Saket",
    image: "/logo.png"
  },
  {
    id: "#0049",
    name: "Apollo",
    institutionType: "Hospital",
    mobile: "+91-9987654347",
    email: "hello@apollo.com",
    location: "Dwarka",
    image: "/logo.png"
  },
  {
    id: "#0050",
    name: "Fortis",
    institutionType: "Hospital",
    mobile: "+91-9987654348",
    email: "hello@fortis.com",
    location: "Gurgaon",
    image: "/logo.png"
  },
  {
    id: "#0051",
    name: "Medanta",
    institutionType: "Hospital",
    mobile: "+91-9987654349",
    email: "hello@medanta.com",
    location: "Gurgaon",
    image: "/logo.png"
  },
  {
    id: "#0052",
    name: "Safdarjung",
    institutionType: "Hospital",
    mobile: "+91-9987654350",
    email: "hello@safdarjung.com",
    location: "New Delhi",
    image: "/logo.png"
  },
  {
    id: "#0053",
    name: "AIIMS",
    institutionType: "Hospital",
    mobile: "+91-9987654351",
    email: "hello@aiims.com",
    location: "New Delhi",
    image: "/logo.png"
  },
  {
    id: "#0054",
    name: "BLK",
    institutionType: "Hospital",
    mobile: "+91-9987654352",
    email: "hello@blk.com",
    location: "Pusa Road",
    image: "/logo.png"
  },
  {
    id: "#0055",
    name: "Gangaram",
    institutionType: "Hospital",
    mobile: "+91-9987654353",
    email: "hello@gangaram.com",
    location: "Old Delhi",
    image: "/logo.png"
  },
  {
    id: "#0056",
    name: "Holy Family",
    institutionType: "Hospital",
    mobile: "+91-9987654354",
    email: "hello@holyfamily.com",
    location: "Okhla",
    image: "/logo.png"
  },
  {
    id: "#0057",
    name: "Indraprastha",
    institutionType: "Hospital",
    mobile: "+91-9987654355",
    email: "hello@indraprastha.com",
    location: "Dwarka",
    image: "/logo.png"
  },
  {
    id: "#0058",
    name: "Kailash",
    institutionType: "Hospital",
    mobile: "+91-9987654356",
    email: "hello@kailash.com",
    location: "Greater Noida",
    image: "/logo.png"
  },
  {
    id: "#0059",
    name: "Lok Nayak",
    institutionType: "Hospital",
    mobile: "+91-9987654357",
    email: "hello@loknayak.com",
    location: "Delhi Gate",
    image: "/logo.png"
  },
  {
    id: "#0060",
    name: "Moolchand",
    institutionType: "Hospital",
    mobile: "+91-9987654358",
    email: "hello@moolchand.com",
    location: "Lajpat Nagar",
    image: "/logo.png"
  },
  {
    id: "#0061",
    name: "Narayana",
    institutionType: "Hospital",
    mobile: "+91-9987654359",
    email: "hello@narayana.com",
    location: "Gurgaon",
    image: "/logo.png"
  },
  {
    id: "#0062",
    name: "Paras",
    institutionType: "Hospital",
    mobile: "+91-9987654360",
    email: "hello@paras.com",
    location: "Gurgaon",
    image: "/logo.png"
  },
  {
    id: "#0063",
    name: "Pushpawati",
    institutionType: "Hospital",
    mobile: "+91-9987654361",
    email: "hello@pushpawati.com",
    location: "Saket",
    image: "/logo.png"
  },
  {
    id: "#0064",
    name: "Rajiv Gandhi",
    institutionType: "Hospital",
    mobile: "+91-9987654362",
    email: "hello@rajivgandhi.com",
    location: "Vasant Kunj",
    image: "/logo.png"
  },
  {
    id: "#0065",
    name: "Sitaram",
    institutionType: "Hospital",
    mobile: "+91-9987654363",
    email: "hello@sitaram.com",
    location: "Old Delhi",
    image: "/logo.png"
  },
  {
    id: "#0066",
    name: "St. Stephen's",
    institutionType: "Hospital",
    mobile: "+91-9987654364",
    email: "hello@ststephens.com",
    location: "Tis Hazari",
    image: "/logo.png"
  },
  {
    id: "#0067",
    name: "Tata Memorial",
    institutionType: "Hospital",
    mobile: "+91-9987654365",
    email: "hello@tatamemorial.com",
    location: "Mumbai",
    image: "/logo.png"
  },
  {
    id: "#0068",
    name: "Wockhardt",
    institutionType: "Hospital",
    mobile: "+91-9987654366",
    email: "hello@wockhardt.com",
    location: "Mumbai",
    image: "/logo.png"
  },
  {
    id: "#0069",
    name: "Yashoda",
    institutionType: "Hospital",
    mobile: "+91-9987654367",
    email: "hello@yashoda.com",
    location: "Hyderabad",
    image: "/logo.png"
  },
  {
    id: "#0070",
    name: "Care",
    institutionType: "Hospital",
    mobile: "+91-9987654368",
    email: "hello@care.com",
    location: "Hyderabad",
    image: "/logo.png"
  },
  {
    id: "#0071",
    name: "KIMS",
    institutionType: "Hospital",
    mobile: "+91-9987654369",
    email: "hello@kims.com",
    location: "Hyderabad",
    image: "/logo.png"
  },
  {
    id: "#0072",
    name: "Manipal",
    institutionType: "Hospital",
    mobile: "+91-9987654370",
    email: "hello@manipal.com",
    location: "Bangalore",
    image: "/logo.png"
  },
  {
    id: "#0073",
    name: "Narayana Health",
    institutionType: "Hospital",
    mobile: "+91-9987654371",
    email: "hello@narayanahealth.com",
    location: "Bangalore",
    image: "/logo.png"
  },
  {
    id: "#0074",
    name: "Fortis Malar",
    institutionType: "Hospital",
    mobile: "+91-9987654372",
    email: "hello@fortismalar.com",
    location: "Chennai",
    image: "/logo.png"
  },
  {
    id: "#0075",
    name: "Apollo Chennai",
    institutionType: "Hospital",
    mobile: "+91-9987654373",
    email: "hello@apollochennai.com",
    location: "Chennai",
    image: "/logo.png"
  }
]

export default function InstitutionsList() {
  const [searchTerm, setSearchTerm] = useState("")

  // Filter institutions based on search term
  const filteredInstitutions = useMemo(() => {
    return institutionsData.filter(institution =>
      institution.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      institution.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      institution.mobile.includes(searchTerm) ||
      institution.id.toLowerCase().includes(searchTerm.toLowerCase())
    )
  }, [searchTerm])

  // Use pagination hook
  const {
    currentPage,
    totalPages,
    totalItems,
    itemsPerPage,
    currentItems: currentInstitutions,
    handlePageChange,
    handleItemsPerPageChange,
    resetPagination
  } = usePagination(filteredInstitutions, 8)

  const handleSearch = (e) => {
    setSearchTerm(e.target.value)
    resetPagination() // Reset to first page when searching
  }

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Institutions List</h1>
            <p className="text-gray-700 text-lg">View and manage all institutions</p>
          </div>
          <button className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold shadow-sm">
            Add New Institution
          </button>
        </div>

        <div className="bg-white rounded-xl shadow-lg border border-gray-200">
          {/* Search and Controls */}
          <div className="p-6 border-b border-gray-200 bg-gray-50">
            <div className="flex justify-between items-center">
              <div className="flex items-center space-x-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-600 w-4 h-4" />
                  <input
                    type="text"
                    placeholder="Search institutions, email, mobile..."
                    value={searchTerm}
                    onChange={handleSearch}
                    className="pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 w-80 text-gray-900 placeholder-gray-500 bg-white"
                  />
                </div>
                <button className="flex items-center space-x-2 px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors bg-white">
                  <Filter className="w-4 h-4 text-gray-600" />
                  <span className="text-sm font-medium text-gray-900">Filter</span>
                </button>
              </div>
              {searchTerm && (
                <div className="text-sm text-gray-800 font-semibold bg-blue-100 px-4 py-2 rounded-lg">
                  Found <span className="text-blue-700 font-bold">{filteredInstitutions.length}</span> institution{filteredInstitutions.length !== 1 ? 's' : ''}
                  <span className="text-gray-700 ml-2">for "{searchTerm}"</span>
                </div>
              )}
            </div>
          </div>
          
          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-900 uppercase tracking-wider">
                    ID
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-900 uppercase tracking-wider">
                    Name
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-900 uppercase tracking-wider">
                    institutionType
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-900 uppercase tracking-wider">
                    Mobile
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-900 uppercase tracking-wider">
                    Email
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-900 uppercase tracking-wider">
                    Location
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-900 uppercase tracking-wider">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {currentInstitutions.map((institution, index) => (
                  <tr key={index} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-gray-900">
                      {institution.id}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="w-10 h-10 rounded-full overflow-hidden ring-2 ring-gray-200">
                          <Image
                            src={institution.image}
                            alt={institution.name}
                            width={40}
                            height={40}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-bold text-gray-900">{institution.name}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {institution.institutionType}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {institution.mobile}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {institution.email}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {institution.location}
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