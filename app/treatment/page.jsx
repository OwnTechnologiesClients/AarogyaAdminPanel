"use client"

import { useState, useEffect } from "react"
import TreatmentApi from "@/lib/api/treatmentApi"
import { Layout } from "@/components/layout"
import { Pagination } from "@/components/ui/pagination"
import { 
  Search, 
  Trash2, 
  Edit, 
  Eye, 
  Filter,
  Stethoscope,
  DollarSign,
  Clock,
  UserCheck,
  Building2
} from "lucide-react"
import Link from "next/link"
import Swal from 'sweetalert2'
import { useRouter } from 'next/navigation'
import { isSuperadmin } from '@/lib/authUtils'
import { resolveBackendPath, BACKEND_URL } from "@/lib/config"

export default function TreatmentList() {
  const router = useRouter()
  const [searchTerm, setSearchTerm] = useState("")
  const [treatments, setTreatments] = useState([])
  const [loading, setLoading] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [totalItems, setTotalItems] = useState(0)
  const [itemsPerPage, setItemsPerPage] = useState(10)

  // Server-side pagination handlers
  const handlePageChange = (page) => {
    setCurrentPage(page)
  }

  const handleItemsPerPageChange = (newItemsPerPage, total = null, totalPages = null) => {
    setItemsPerPage(newItemsPerPage)
    setCurrentPage(1)
    if (total !== null) setTotalItems(total)
    if (totalPages !== null) setTotalPages(totalPages)
  }

  const resetPagination = () => {
    setCurrentPage(1)
  }

  const withBase = (p) => resolveBackendPath(p)

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      try {
        const data = await TreatmentApi.list({ page: currentPage, limit: itemsPerPage, search: searchTerm })
        if (data?.success) {
          setTreatments(data.data || [])
          setTotalItems(data.total || 0)
          setTotalPages(data.totalPages || 1)
        }
      } catch (e) {
        console.error('Error fetching treatments:', e)
        setTreatments([])
        setTotalItems(0)
        setTotalPages(1)
        if (e.response?.status === 404) {
          console.error('API endpoint not found. Make sure the backend is running.')
        } else if (e.code === 'ECONNREFUSED') {
          console.error(`Cannot connect to backend server. Make sure it's running on ${BACKEND_URL}`)
        }
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [currentPage, itemsPerPage, searchTerm])

  const handleSearch = (e) => {
    setSearchTerm(e.target.value)
    resetPagination()
  }

  const handleToggleStatus = async (treatmentId, currentStatus, treatmentName) => {
    const newStatus = !currentStatus
    const statusText = newStatus ? 'Active' : 'Disabled'
    
    try {
      const fd = new FormData()
      fd.append('isActive', newStatus)
      
      await TreatmentApi.update(treatmentId, fd)
      
      await Swal.fire({
        title: 'Updated!',
        text: `"${treatmentName}" is now ${statusText}`,
        icon: 'success',
        timer: 1500,
        showConfirmButton: false
      })
      
      // Refresh the list
      const data = await TreatmentApi.list({ page: currentPage, limit: itemsPerPage, search: searchTerm })
      if (data?.success) {
        setTreatments(data.data || [])
        setTotalItems(data.total || 0)
        setTotalPages(data.totalPages || 1)
      }
    } catch (error) {
      await Swal.fire({
        title: 'Error!',
        text: error?.response?.data?.message || 'Failed to update status',
        icon: 'error',
        timer: 2000
      })
    }
  }

  const handleDeleteTreatment = async (treatmentId, treatmentName) => {
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: `You are about to delete treatment "${treatmentName}". This action cannot be undone!`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'Cancel'
    })

    if (result.isConfirmed) {
      try {
        await TreatmentApi.remove(treatmentId)
        await Swal.fire({
          title: 'Deleted!',
          text: 'Treatment has been deleted successfully.',
          icon: 'success',
          confirmButtonText: 'OK'
        })
        // Refresh the data
        router.refresh()
        // Also refetch the data
        const data = await TreatmentApi.list({ page: currentPage, limit: itemsPerPage, search: searchTerm })
        if (data?.success) {
          setTreatments(data.data || [])
          setTotalItems(data.total || 0)
          setTotalPages(data.totalPages || 1)
        }
      } catch (error) {
        await Swal.fire({
          title: 'Error!',
          text: error?.response?.data?.message || 'Failed to delete treatment',
          icon: 'error',
          confirmButtonText: 'OK'
        })
      }
    }
  }

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Treatment List</h1>
            <p className="text-gray-700 text-lg">View and manage all medical treatments</p>
          </div>
          <Link href="/treatment/add">
          <button className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold shadow-sm">
              Add New Treatment
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
                    placeholder="Search treatments, category, description..."
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
                  Found <span className="text-blue-700 font-bold">{totalItems}</span> treatment{totalItems !== 1 ? 's' : ''}
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
                    Treatment Name
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-bold text-white uppercase tracking-wider">
                    Category
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-bold text-white uppercase tracking-wider">
                    Duration & Recovery
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-bold text-white uppercase tracking-wider">
                    Cost Considerations
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-bold text-white uppercase tracking-wider">
                    Top Hospitals
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-bold text-white uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-bold text-white uppercase tracking-wider">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-blue-100">
                {loading ? (
                  <tr>
                    <td colSpan="8" className="px-4 py-8 text-center text-gray-500">
                      <div className="flex items-center justify-center space-x-2">
                        <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600"></div>
                        <span>Loading treatments...</span>
                      </div>
                    </td>
                  </tr>
                ) : treatments.length === 0 ? (
                  <tr>
                    <td colSpan="8" className="px-4 py-8 text-center text-gray-500">
                      <div className="flex flex-col items-center space-y-2">
                        <div className="text-gray-400">
                          <Stethoscope className="w-12 h-12 mx-auto" />
                        </div>
                        <span className="text-lg font-medium">No treatments found</span>
                        <span className="text-sm">
                          {searchTerm ? `No treatments match "${searchTerm}"` : 'Start by adding your first treatment'}
                        </span>
                      </div>
                    </td>
                  </tr>
                ) : (
                  treatments.map((treatment, index) => (
                    <tr key={index} className="hover:bg-blue-50 transition-colors">
                      <td className="px-4 py-3 whitespace-nowrap text-sm font-bold text-blue-700">
                        #{treatment.id}
                    </td>
                      <td className="px-4 py-3 whitespace-nowrap">
                      <div className="flex items-center">
                          <div className="w-12 h-12 rounded-lg overflow-hidden ring-2 ring-blue-200">
                            {treatment.image ? (
                              <img 
                                src={withBase(treatment.image)} 
                                alt={treatment.name}
                            className="w-full h-full object-cover"
                                onError={(e) => {
                                  e.target.style.display = 'none';
                                  e.target.nextSibling.style.display = 'flex';
                                }}
                          />
                            ) : null}
                            <div className={`w-full h-full bg-blue-100 rounded-lg flex items-center justify-center ${treatment.image ? 'hidden' : 'flex'}`}>
                              <Stethoscope className="w-6 h-6 text-blue-600" />
                            </div>
                        </div>
                          <div className="ml-3">
                            <div className="text-sm font-bold text-gray-900">{treatment.name}</div>
                            <div className="text-xs text-gray-500 truncate max-w-32">{treatment.description?.substring(0, 50)}...</div>
                        </div>
                      </div>
                    </td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm font-semibold text-gray-800">
                        {treatment.category}
                    </td>
                      <td className="px-4 py-3">
                      <div className="space-y-1">
                        <div className="flex items-center space-x-1">
                            <Clock className="w-3 h-3 text-gray-500" />
                            <span className="text-xs text-gray-600">{treatment.duration || '-'}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <UserCheck className="w-3 h-3 text-gray-500" />
                            <span className="text-xs text-gray-600">{treatment.recovery || '-'}</span>
                        </div>
                      </div>
                    </td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm font-semibold text-gray-700">
                        <div className="flex items-center space-x-1">
                          <DollarSign className="w-3 h-3 text-green-600" />
                          <span className="text-xs text-gray-600 truncate max-w-24">{treatment.costConsiderations?.substring(0, 30)}...</span>
                      </div>
                    </td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm font-semibold text-gray-700">
                        <div className="flex items-center space-x-1">
                          <Building2 className="w-3 h-3 text-blue-600" />
                          <span className="text-xs text-gray-600">{treatment.topHospitals?.length || 0} hospitals</span>
                      </div>
                    </td>
                      <td className="px-4 py-3 whitespace-nowrap">
                        <button
                          onClick={() => handleToggleStatus(treatment.id, treatment.isActive, treatment.name)}
                          className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 ${
                            treatment.isActive ? 'bg-green-600 focus:ring-green-500' : 'bg-gray-200 focus:ring-gray-500'
                          }`}
                          title={treatment.isActive ? 'Click to disable' : 'Click to enable'}
                        >
                          <span
                            className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                              treatment.isActive ? 'translate-x-5' : 'translate-x-0'
                            }`}
                          />
                        </button>
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm font-medium">
                      <div className="flex items-center space-x-2">
                          {isSuperadmin() && (
                            <button 
                              onClick={() => handleDeleteTreatment(treatment.id, treatment.name)}
                              className="text-red-600 hover:text-red-700 p-2 rounded hover:bg-red-50 transition-colors"
                            >
                            <Trash2 className="w-4 h-4" />
                          </button>
                          )}
                          <Link href={`/treatment/edit/${treatment.id}`} className="text-green-600 hover:text-green-700 p-2 rounded hover:bg-green-50 transition-colors">
                          <Edit className="w-4 h-4" />
                        </Link>
                        <Link href={`/treatment/view/${treatment.id}`} className="text-blue-600 hover:text-blue-700 p-2 rounded hover:bg-blue-50 transition-colors">
                          <Eye className="w-4 h-4" />
                        </Link>
                      </div>
                    </td>
                  </tr>
                  ))
                )}
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