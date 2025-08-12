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
  Filter
} from "lucide-react"
import Link from "next/link"

// Sample hospital data matching the reference image
const hospitalsData = [
  {
    id: "#0047",
    name: "Fortis",
    institutionType: "Hospital",
    mobile: "+91-9987654345",
    email: "hello@fortis.com",
    location: "Vasant Kunj",
    avatar: "/logo.png"
  },
  {
    id: "#0048",
    name: "Max",
    institutionType: "Hospital",
    mobile: "+91-9987654346",
    email: "hello@max.com",
    location: "Saket",
    avatar: "/logo.png"
  },
  {
    id: "#0049",
    name: "Apollo",
    institutionType: "Hospital",
    mobile: "+91-9987654347",
    email: "hello@apollo.com",
    location: "Sarita Vihar",
    avatar: "/logo.png"
  },
  {
    id: "#0050",
    name: "Medanta",
    institutionType: "Hospital",
    mobile: "+91-9987654348",
    email: "hello@medanta.com",
    location: "Gurgaon",
    avatar: "/logo.png"
  },
  {
    id: "#0051",
    name: "AIIMS",
    institutionType: "Medical Institute",
    mobile: "+91-9987654349",
    email: "hello@aiims.com",
    location: "Ansari Nagar",
    avatar: "/logo.png"
  },
  {
    id: "#0052",
    name: "Safdarjung",
    institutionType: "Hospital",
    mobile: "+91-9987654350",
    email: "hello@safdarjung.com",
    location: "Ansari Nagar West",
    avatar: "/logo.png"
  },
  {
    id: "#0053",
    name: "Ram Manohar Lohia",
    institutionType: "Hospital",
    mobile: "+91-9987654351",
    email: "hello@rml.com",
    location: "Connaught Place",
    avatar: "/logo.png"
  },
  {
    id: "#0054",
    name: "Lady Hardinge",
    institutionType: "Hospital",
    mobile: "+91-9987654352",
    email: "hello@ladyhardinge.com",
    location: "Connaught Place",
    avatar: "/logo.png"
  },
  {
    id: "#0055",
    name: "Guru Teg Bahadur",
    institutionType: "Hospital",
    mobile: "+91-9987654353",
    email: "hello@gtb.com",
    location: "Dilshad Garden",
    avatar: "/logo.png"
  },
  {
    id: "#0056",
    name: "Deen Dayal Upadhyay",
    institutionType: "Hospital",
    mobile: "+91-9987654354",
    email: "hello@ddu.com",
    location: "Hari Nagar",
    avatar: "/logo.png"
  },
  {
    id: "#0057",
    name: "Batra",
    institutionType: "Hospital",
    mobile: "+91-9987654355",
    email: "hello@batra.com",
    location: "Tughlakabad",
    avatar: "/logo.png"
  },
  {
    id: "#0058",
    name: "BLK",
    institutionType: "Hospital",
    mobile: "+91-9987654356",
    email: "hello@blk.com",
    location: "Pusa Road",
    avatar: "/logo.png"
  },
  {
    id: "#0059",
    name: "Ganga Ram",
    institutionType: "Hospital",
    mobile: "+91-9987654357",
    email: "hello@gangaram.com",
    location: "New Rajinder Nagar",
    avatar: "/logo.png"
  },
  {
    id: "#0060",
    name: "Holy Family",
    institutionType: "Hospital",
    mobile: "+91-9987654358",
    email: "hello@holyfamily.com",
    location: "Okhla",
    avatar: "/logo.png"
  },
  {
    id: "#0061",
    name: "St. Stephen's",
    institutionType: "Hospital",
    mobile: "+91-9987654359",
    email: "hello@ststephens.com",
    location: "Tis Hazari",
    avatar: "/logo.png"
  },
  {
    id: "#0062",
    name: "Lok Nayak",
    institutionType: "Hospital",
    mobile: "+91-9987654360",
    email: "hello@loknayak.com",
    location: "Jawaharlal Nehru Marg",
    avatar: "/logo.png"
  },
  {
    id: "#0063",
    name: "Rajiv Gandhi",
    institutionType: "Hospital",
    mobile: "+91-9987654361",
    email: "hello@rajivgandhi.com",
    location: "Tahirpur",
    avatar: "/logo.png"
  },
  {
    id: "#0064",
    name: "Chacha Nehru",
    institutionType: "Hospital",
    mobile: "+91-9987654362",
    email: "hello@chachanehru.com",
    location: "Geeta Colony",
    avatar: "/logo.png"
  },
  {
    id: "#0065",
    name: "Acharya Shree Bhikshu",
    institutionType: "Hospital",
    mobile: "+91-9987654363",
    email: "hello@acharyashree.com",
    location: "Moti Nagar",
    avatar: "/logo.png"
  },
  {
    id: "#0066",
    name: "Guru Gobind Singh",
    institutionType: "Hospital",
    mobile: "+91-9987654364",
    email: "hello@gurugobindsingh.com",
    location: "Raghubir Nagar",
    avatar: "/logo.png"
  },
  {
    id: "#0067",
    name: "Maharaja Agrasen",
    institutionType: "Hospital",
    mobile: "+91-9987654365",
    email: "hello@maharajaagrasen.com",
    location: "Punjabi Bagh",
    avatar: "/logo.png"
  },
  {
    id: "#0068",
    name: "Shakti Nagar",
    institutionType: "Hospital",
    mobile: "+91-9987654366",
    email: "hello@shaktinagar.com",
    location: "Shakti Nagar",
    avatar: "/logo.png"
  },
  {
    id: "#0069",
    name: "Kasturba",
    institutionType: "Hospital",
    mobile: "+91-9987654367",
    email: "hello@kasturba.com",
    location: "Daryaganj",
    avatar: "/logo.png"
  },
  {
    id: "#0070",
    name: "Swami Dayanand",
    institutionType: "Hospital",
    mobile: "+91-9987654368",
    email: "hello@swamidayanand.com",
    location: "Shahdara",
    avatar: "/logo.png"
  },
  {
    id: "#0071",
    name: "Babu Jagjivan Ram",
    institutionType: "Hospital",
    mobile: "+91-9987654369",
    email: "hello@babujagjivanram.com",
    location: "Jahangirpuri",
    avatar: "/logo.png"
  },
  {
    id: "#0072",
    name: "Sanjay Gandhi",
    institutionType: "Hospital",
    mobile: "+91-9987654370",
    email: "hello@sanjaygandhi.com",
    location: "Mangolpuri",
    avatar: "/logo.png"
  },
  {
    id: "#0073",
    name: "Dr. Hedgewar",
    institutionType: "Hospital",
    mobile: "+91-9987654371",
    email: "hello@drhedgewar.com",
    location: "Karkardooma",
    avatar: "/logo.png"
  },
  {
    id: "#0074",
    name: "Ambedkar",
    institutionType: "Hospital",
    mobile: "+91-9987654372",
    email: "hello@ambedkar.com",
    location: "Rohini",
    avatar: "/logo.png"
  },
  {
    id: "#0075",
    name: "Sardar Vallabhbhai Patel",
    institutionType: "Hospital",
    mobile: "+91-9987654373",
    email: "hello@sardarvallabhbhai.com",
    location: "Patel Nagar",
    avatar: "/logo.png"
  },
  {
    id: "#0076",
    name: "Dr. Ram Manohar Lohia",
    institutionType: "Hospital",
    mobile: "+91-9987654374",
    email: "hello@drrml.com",
    location: "Baba Kharak Singh Marg",
    avatar: "/logo.png"
  },
  {
    id: "#0077",
    name: "Indraprastha Apollo",
    institutionType: "Hospital",
    mobile: "+91-9987654375",
    email: "hello@indraprasthapollo.com",
    location: "Sarita Vihar",
    avatar: "/logo.png"
  },
  {
    id: "#0078",
    name: "Max Super Speciality",
    institutionType: "Hospital",
    mobile: "+91-9987654376",
    email: "hello@maxsuperspeciality.com",
    location: "Saket",
    avatar: "/logo.png"
  },
  {
    id: "#0079",
    name: "Fortis Escorts",
    institutionType: "Hospital",
    mobile: "+91-9987654377",
    email: "hello@fortisescorts.com",
    location: "Okhla",
    avatar: "/logo.png"
  },
  {
    id: "#0080",
    name: "Medanta Medicity",
    institutionType: "Hospital",
    mobile: "+91-9987654378",
    email: "hello@medantamedicity.com",
    location: "Gurgaon",
    avatar: "/logo.png"
  }
]

export default function HospitalList() {
  const [searchTerm, setSearchTerm] = useState("")

  // Filter hospitals based on search term
  const filteredHospitals = useMemo(() => {
    return hospitalsData.filter(hospital =>
      hospital.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      hospital.institutionType.toLowerCase().includes(searchTerm.toLowerCase()) ||
      hospital.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
      hospital.mobile.includes(searchTerm) ||
      hospital.email.includes(searchTerm)
    )
  }, [searchTerm])

  // Use pagination hook
  const {
    currentPage,
    totalPages,
    totalItems,
    itemsPerPage,
    currentItems: currentHospitals,
    handlePageChange,
    handleItemsPerPageChange,
    resetPagination
  } = usePagination(filteredHospitals, 8)

  const handleSearch = (e) => {
    setSearchTerm(e.target.value)
    resetPagination() // Reset to first page when searching
  }

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Hospital List</h1>
            <p className="text-gray-700 text-lg">View and manage all hospitals</p>
          </div>
          <Link href="/hospital/add">
            <button className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold shadow-sm">
              Add New Hospital
            </button>
          </Link>
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
                    placeholder="Search hospitals, type, location..."
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
                    Hospital Name
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-white uppercase tracking-wider">
                    Institution Type
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-white uppercase tracking-wider">
                    <div className="flex items-center space-x-1">
                      <span>Mobile</span>
                      <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                    </div>
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-white uppercase tracking-wider">
                    Email
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-white uppercase tracking-wider">
                    Location
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-white uppercase tracking-wider">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-blue-100">
                {currentHospitals.map((hospital, index) => (
                  <tr key={index} className="hover:bg-blue-50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-blue-700">
                      {hospital.id}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="w-10 h-10 rounded-full overflow-hidden ring-2 ring-blue-200">
                          <img 
                            src={hospital.avatar} 
                            alt={hospital.name}
                            className="w-full h-full object-cover"
                            onError={(e) => {
                              // Fallback to initials if image fails to load
                              e.target.style.display = 'none';
                              e.target.nextSibling.style.display = 'flex';
                            }}
                          />
                          <div className="w-full h-full bg-blue-100 rounded-full flex items-center justify-center hidden">
                            <span className="text-sm font-semibold text-blue-600">
                              {hospital.name.split(' ').map(n => n[0]).join('')}
                            </span>
                          </div>
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-bold text-gray-900">{hospital.name}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-blue-700">
                      {hospital.institutionType}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-gray-800">
                      {hospital.mobile}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-700">
                      {hospital.email}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-gray-900">
                      {hospital.location}
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