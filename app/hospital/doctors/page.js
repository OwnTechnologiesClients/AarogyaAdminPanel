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

// Sample doctor data matching the reference image
const doctorsData = [
  {
    id: "#0047",
    name: "Taylor Melon",
    specialization: "Therapist",
    contactNumber: "(203) 869-0576",
    availability: "Sunday to Friday: 10:00am - 02:00pm",
    location: "Downtown Medical Center",
    experience: "10 years",
    avatar: "/doctorimg/doctor-1.png"
  },
  {
    id: "#0044",
    name: "Ronald Sullivan",
    specialization: "Radiologist",
    contactNumber: "(808) 947-1332",
    availability: "Sunday to Friday: 03:00pm - 09:00pm",
    location: "River Valley Hospital",
    experience: "30 years",
    avatar: "/doctorimg/doctor-2.png"
  },
  {
    id: "#0044",
    name: "George Bailey",
    specialization: "Pediatrics",
    contactNumber: "(269) 657-8949",
    availability: "Sunday to Friday: 05:00pm - 08:00pm",
    location: "Skin & Aesthetics Clinic",
    experience: "15 years",
    avatar: "/doctorimg/doctor-3.png"
  },
  {
    id: "#0067",
    name: "Bshton Cozei",
    specialization: "Oncologist",
    contactNumber: "(704) 896-7895",
    availability: "Sunday to Friday: 09:00am - 02:00pm",
    location: "West Side Pediatric Clinic",
    experience: "08 years",
    avatar: "/doctorimg/doctor-4.png"
  },
  {
    id: "#0047",
    name: "Allan Stuart",
    specialization: "Neurologist",
    contactNumber: "(718) 875-3677",
    availability: "Sunday to Friday: 03:00pm - 05:00pm",
    location: "East Side Family Center",
    experience: "19 years",
    avatar: "/doctorimg/doctor-5.png"
  },
  {
    id: "#0047",
    name: "Smith White",
    specialization: "Gynecologist",
    contactNumber: "(832) 296-1988",
    availability: "Sunday to Friday: 01:00pm - 04:00pm",
    location: "Sunshine Medical Center",
    experience: "13 years",
    avatar: "/doctorimg/doctor-6.png"
  },
  {
    id: "#0039",
    name: "Meera Gill",
    specialization: "Dentist",
    contactNumber: "(800) 869-3557",
    availability: "Sunday to Friday: 08:00am - 03:00pm",
    location: "Tokyo International Hospital",
    experience: "11 years",
    avatar: "/doctorimg/doctor-7.png"
  },
  {
    id: "#0026",
    name: "Gilbert Sandoval",
    specialization: "Cardiologist",
    contactNumber: "(888) 826-6890",
    availability: "Sunday to Friday: 03:00am - 06:00pm",
    location: "Advanced Orthopedic Center",
    experience: "24 years",
    avatar: "/doctorimg/doctor-8.png"
  },
  // Add more doctors for pagination testing
  {
    id: "#0027",
    name: "Maria Rodriguez",
    specialization: "Dermatologist",
    contactNumber: "(555) 123-4567",
    availability: "Monday to Friday: 09:00am - 05:00pm",
    location: "Central Medical Plaza",
    experience: "12 years",
    avatar: "/doctorimg/doctor-1.png"
  },
  {
    id: "#0028",
    name: "David Kim",
    specialization: "Orthopedic Surgeon",
    contactNumber: "(555) 234-5678",
    availability: "Tuesday to Saturday: 08:00am - 04:00pm",
    location: "Sports Medicine Center",
    experience: "18 years",
    avatar: "/doctorimg/doctor-2.png"
  },
  {
    id: "#0029",
    name: "Sarah Johnson",
    specialization: "Psychiatrist",
    contactNumber: "(555) 345-6789",
    availability: "Monday to Thursday: 10:00am - 06:00pm",
    location: "Mental Health Institute",
    experience: "14 years",
    avatar: "/doctorimg/doctor-3.png"
  },
  {
    id: "#0030",
    name: "Michael Chen",
    specialization: "Endocrinologist",
    contactNumber: "(555) 456-7890",
    availability: "Monday to Friday: 07:00am - 03:00pm",
    location: "Diabetes Care Center",
    experience: "16 years",
    avatar: "/doctorimg/doctor-4.png"
  }
]

export default function HospitalDoctorsPage() {
  const [searchTerm, setSearchTerm] = useState("")

  // Filter doctors based on search term
  const filteredDoctors = useMemo(() => {
    return doctorsData.filter(doctor =>
      doctor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doctor.specialization.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doctor.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doctor.contactNumber.includes(searchTerm)
    )
  }, [searchTerm])

  // Use pagination hook
  const {
    currentPage,
    totalPages,
    totalItems,
    itemsPerPage,
    currentItems: currentDoctors,
    handlePageChange,
    handleItemsPerPageChange,
    resetPagination
  } = usePagination(filteredDoctors, 8)

  const handleSearch = (e) => {
    setSearchTerm(e.target.value)
    resetPagination() // Reset to first page when searching
  }

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Doctors List</h1>
            <p className="text-gray-700 text-lg">View and manage all doctors</p>
          </div>
          <button className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold shadow-sm">
            Add New Doctor
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
                    placeholder="Search doctors, specialization, location..."
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
                  Found <span className="text-blue-700 font-bold">{filteredDoctors.length}</span> doctor{filteredDoctors.length !== 1 ? 's' : ''}
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
                    Doctor Name
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-white uppercase tracking-wider">
                    Specialization
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-white uppercase tracking-wider">
                    <div className="flex items-center space-x-1">
                      <span>Contact Number</span>
                      <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                    </div>
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-white uppercase tracking-wider">
                    Availability
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-white uppercase tracking-wider">
                    Location
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-white uppercase tracking-wider">
                    Experience
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-white uppercase tracking-wider">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-blue-100">
                {currentDoctors.map((doctor, index) => (
                  <tr key={index} className="hover:bg-blue-50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-blue-700">
                      {doctor.id}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="w-10 h-10 rounded-full overflow-hidden ring-2 ring-blue-200">
                          <img 
                            src={doctor.avatar} 
                            alt={doctor.name}
                            className="w-full h-full object-cover"
                            onError={(e) => {
                              // Fallback to initials if image fails to load
                              e.target.style.display = 'none';
                              e.target.nextSibling.style.display = 'flex';
                            }}
                          />
                          <div className="w-full h-full bg-blue-100 rounded-full flex items-center justify-center hidden">
                            <span className="text-sm font-semibold text-blue-600">
                              {doctor.name.split(' ').map(n => n[0]).join('')}
                            </span>
                          </div>
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-bold text-gray-900">{doctor.name}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-blue-700">
                      {doctor.specialization}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-gray-800">
                      {doctor.contactNumber}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-700">
                      {doctor.availability}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-gray-900">
                      {doctor.location}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-gray-800">
                      {doctor.experience}
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