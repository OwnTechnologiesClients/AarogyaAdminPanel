"use client"

import { useState, useMemo, useEffect } from "react"
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
import Link from "next/link"
import api from '@/lib/api'

export default function DoctorsList() {
  const [doctorsData, setDoctorsData] = useState([])
  const [loading, setLoading] = useState(true)
  const [fetchError, setFetchError] = useState("")
  const [searchTerm, setSearchTerm] = useState("")

  useEffect(() => {
    setLoading(true)
    api.get('/doctors')
      .then(res => {
        // Ensure doctorsData is always an array
        const data = Array.isArray(res.data.data) ? res.data.data : []
        setDoctorsData(data)
      })
      .catch(err => setFetchError(err.response?.data?.message || 'Failed to fetch doctors'))
      .finally(() => setLoading(false))
  }, [])

  // Filter doctors based on search term
  const filteredDoctors = useMemo(() => {
    return doctorsData.filter(doctor =>
      doctor.doctorName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doctor.specialty.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doctor.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doctor.specializations.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doctor.treatmentsProcedures.toLowerCase().includes(searchTerm.toLowerCase())
    )
  }, [searchTerm, doctorsData])

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
  } = usePagination(filteredDoctors, 6)

  const handleSearch = (e) => {
    setSearchTerm(e.target.value)
    resetPagination() // Reset to first page when searching
  }

  if (loading) {
    return <Layout><div className="text-center py-10">Loading doctors...</div></Layout>
  }

  if (fetchError) {
    return <Layout><div className="text-center py-10 text-red-600">{fetchError}</div></Layout>
  }

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Doctors List</h1>
            <p className="text-gray-700 text-lg">View and manage all doctors</p>
          </div>
          <Link href="/doctors/add">
            <button className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold shadow-sm">
              Add New Doctor
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
                    placeholder="Search doctors, specialty, location, specializations..."
                    value={searchTerm}
                    onChange={handleSearch}
                    className="pl-10 pr-4 py-3 border-2 border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 w-80 text-gray-900 placeholder-gray-500 shadow-md bg-white"
                  />
                </div>
           
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
                  <th className="px-4 py-3 text-left text-xs font-bold text-white uppercase tracking-wider">
                    ID
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-bold text-white uppercase tracking-wider">
                    Doctor Name
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-bold text-white uppercase tracking-wider">
                    Specialty
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-bold text-white uppercase tracking-wider">
                    Location
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-bold text-white uppercase tracking-wider">
                    Experience
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-bold text-white uppercase tracking-wider">
                    Rating
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-bold text-white uppercase tracking-wider">
                    Patients
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-bold text-white uppercase tracking-wider">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-blue-100">
                {currentDoctors.map((doctor, index) => (
                  <tr key={index} className="hover:bg-blue-50 transition-colors">
                    <td className="px-4 py-3 whitespace-nowrap text-sm font-bold text-blue-700">
                      #{doctor.id}
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="w-10 h-10 rounded-full overflow-hidden ring-2 ring-blue-200">
                          <img 
                            src={doctor.image ? `http://localhost:5000${doctor.image}` : `/doctorimg/doctor-${(doctor.id % 8) + 1}.png`} 
                            alt={doctor.doctorName}
                            className="w-full h-full object-cover"
                            onError={(e) => {
                              e.target.onerror = null;
                              e.target.src = `/doctorimg/doctor-${(doctor.id % 8) + 1}.png`;
                            }}
                          />
                          <div className="w-full h-full bg-blue-100 rounded-full flex items-center justify-center hidden">
                            <span className="text-sm font-semibold text-blue-600">
                              {doctor.doctorName.split(' ').map(n => n[0]).join('')}
                            </span>
                          </div>
                        </div>
                        <div className="ml-3">
                          <div className="text-sm font-bold text-gray-900">{doctor.doctorName}</div>
                          <div className="text-xs text-gray-500 truncate max-w-32">{doctor.specializations.split(',')[0]}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm font-bold text-blue-700">
                      {doctor.specialty}
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm font-semibold text-gray-800">
                      {doctor.location}
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm font-semibold text-gray-800">
                      {doctor.experience}
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm font-bold text-green-600">
                      ⭐ {doctor.rating}
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm font-semibold text-gray-700">
                      {doctor.patientsTreated}
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm font-medium">
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