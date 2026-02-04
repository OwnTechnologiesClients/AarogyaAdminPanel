"use client"

import { useState, useEffect } from "react"
import { Layout } from "@/components/layout"
import { Pagination } from "@/components/ui/pagination"
import { Search, Trash2, Edit, Eye, Filter, Stethoscope } from "lucide-react"
import Link from "next/link"
import Swal from "sweetalert2"
import SpecialityApi from "@/lib/api/specialityApi"

export default function HospitalSpecialitiesList() {
  const [searchTerm, setSearchTerm] = useState("")
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [totalItems, setTotalItems] = useState(0)
  const [itemsPerPage, setItemsPerPage] = useState(10)

  const handlePageChange = (page) => {
    setCurrentPage(page)
  }

  const handleItemsPerPageChange = (newItemsPerPage, total = null, totalPagesValue = null) => {
    setItemsPerPage(newItemsPerPage)
    setCurrentPage(1)
    if (total !== null) setTotalItems(total)
    if (totalPagesValue !== null) setTotalPages(totalPagesValue)
  }

  const resetPagination = () => {
    setCurrentPage(1)
  }

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      try {
        const data = await SpecialityApi.list({
          page: currentPage,
          limit: itemsPerPage,
          search: searchTerm || undefined,
        })
        if (data?.success) {
          const list = data.data || []
          setItems(list)
          const total = data.total ?? data.count ?? (Array.isArray(list) ? list.length : 0)
          setTotalItems(total)
          setTotalPages(data.totalPages ?? Math.max(1, Math.ceil(total / itemsPerPage)))
        } else {
          setItems(data.data || data || [])
          setTotalItems((data.data || data || []).length)
          setTotalPages(1)
        }
      } catch (e) {
        console.error(e)
        setItems([])
        setTotalItems(0)
        setTotalPages(1)
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

  const handleToggleStatus = async (id, currentStatus, name) => {
    const newStatus = !currentStatus
    const statusText = newStatus ? "Active" : "Disabled"

    try {
      await SpecialityApi.update(id, { isActive: newStatus })

      await Swal.fire({
        title: "Updated!",
        text: `"${name}" is now ${statusText}`,
        icon: "success",
        timer: 1500,
        showConfirmButton: false,
      })

      const data = await SpecialityApi.list({
        page: currentPage,
        limit: itemsPerPage,
        search: searchTerm || undefined,
      })
      if (data?.success) {
        const list = data.data || []
        setItems(list)
        const total = data.total ?? data.count ?? (Array.isArray(list) ? list.length : 0)
        setTotalItems(total)
        setTotalPages(data.totalPages ?? Math.max(1, Math.ceil(total / itemsPerPage)))
      }
    } catch (error) {
      await Swal.fire({
        title: "Error!",
        text: error?.response?.data?.message || "Failed to update status",
        icon: "error",
        timer: 2000,
      })
    }
  }

  const handleDelete = async (id, name) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: `You are about to delete speciality "${name}". This action cannot be undone!`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "Cancel",
    })

    if (result.isConfirmed) {
      try {
        await SpecialityApi.remove(id)
        await Swal.fire({
          title: "Deleted!",
          text: "Speciality has been deleted successfully.",
          icon: "success",
          confirmButtonText: "OK",
        })

        const data = await SpecialityApi.list({
          page: currentPage,
          limit: itemsPerPage,
          search: searchTerm || undefined,
        })
        if (data?.success) {
          const list = data.data || []
          setItems(list)
          const total = data.total ?? data.count ?? (Array.isArray(list) ? list.length : 0)
          setTotalItems(total)
          setTotalPages(data.totalPages ?? Math.max(1, Math.ceil(total / itemsPerPage)))
        }
      } catch (error) {
        await Swal.fire({
          title: "Error!",
          text: error?.response?.data?.message || "Failed to delete speciality",
          icon: "error",
          confirmButtonText: "OK",
        })
      }
    }
  }

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Hospital Specialities</h1>
            <p className="text-gray-700 text-lg">Manage master list of hospital specialities</p>
          </div>
          <Link href="/hospital-specialities/add">
            <button className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold shadow-sm">
              Add New Speciality
            </button>
          </Link>
        </div>

        <div className="bg-gradient-to-br from-white to-blue-50 rounded-xl shadow-lg border border-blue-100">
          <div className="p-6 border-b border-blue-200 bg-gradient-to-r from-blue-50 to-indigo-50">
            <div className="flex justify-between items-center">
              <div className="flex items-center space-x-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-600 w-4 h-4" />
                  <input
                    type="text"
                    placeholder="Search specialities..."
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
                  Found <span className="text-blue-700 font-bold">{totalItems}</span> specialit
                  {totalItems !== 1 ? "ies" : "y"}
                  <span className="text-gray-700 ml-2">for "{searchTerm}"</span>
                </div>
              )}
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gradient-to-r from-blue-600 to-indigo-600">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-bold text-white uppercase tracking-wider">Name</th>
                  <th className="px-4 py-3 text-left text-xs font-bold text-white uppercase tracking-wider">
                    Description
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-bold text-white uppercase tracking-wider">
                    Key Services
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-bold text-white uppercase tracking-wider">Status</th>
                  <th className="px-4 py-3 text-left text-xs font-bold text-white uppercase tracking-wider">Action</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-blue-100">
                {loading ? (
                  <tr>
                    <td colSpan="5" className="px-4 py-8 text-center text-gray-500">
                      <div className="flex items-center justify-center space-x-2">
                        <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600"></div>
                        <span>Loading specialities...</span>
                      </div>
                    </td>
                  </tr>
                ) : items.length === 0 ? (
                  <tr>
                    <td colSpan="5" className="px-4 py-8 text-center text-gray-500">
                      <div className="flex flex-col items-center space-y-2">
                        <div className="text-gray-400">
                          <Stethoscope className="w-12 h-12 mx-auto" />
                        </div>
                        <span className="text-lg font-medium">No specialities found</span>
                        <span className="text-sm">
                          {searchTerm ? `No specialities match "${searchTerm}"` : "Start by adding your first speciality"}
                        </span>
                      </div>
                    </td>
                  </tr>
                ) : (
                  items.map((item) => (
                    <tr key={item._id} className="hover:bg-blue-50 transition-colors">
                      <td className="px-4 py-3 whitespace-nowrap text-sm font-bold text-blue-700">{item.name}</td>
                      <td className="px-4 py-3 text-sm text-gray-800 max-w-md">
                        {item.description || <span className="text-gray-400 italic">No description</span>}
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-700 max-w-xs">
                        {Array.isArray(item.keyServices) && item.keyServices.length > 0 ? (
                          <span>{item.keyServices.join(", ")}</span>
                        ) : (
                          <span className="text-gray-400 italic">-</span>
                        )}
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap">
                        <button
                          onClick={() => handleToggleStatus(item._id, item.isActive, item.name)}
                          className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 ${
                            item.isActive ? "bg-green-600 focus:ring-green-500" : "bg-gray-200 focus:ring-gray-500"
                          }`}
                          title={item.isActive ? "Click to disable" : "Click to enable"}
                        >
                          <span
                            className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                              item.isActive ? "translate-x-5" : "translate-x-0"
                            }`}
                          />
                        </button>
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm font-medium">
                        <div className="flex items-center space-x-2">
                          <button
                            onClick={() => handleDelete(item._id, item.name)}
                            className="text-red-600 hover:text-red-700 p-2 rounded hover:bg-red-50 transition-colors"
                            title="Delete speciality"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                          <Link
                            href={`/hospital-specialities/edit/${item._id}`}
                            className="text-green-600 hover:text-green-700 p-2 rounded hover:bg-green-50 transition-colors"
                            title="Edit speciality"
                          >
                            <Edit className="w-4 h-4" />
                          </Link>
                          <Link
                            href={`/hospital-specialities/view/${item._id}`}
                            className="text-blue-600 hover:text-blue-700 p-2 rounded hover:bg-blue-50 transition-colors"
                            title="View speciality"
                          >
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

