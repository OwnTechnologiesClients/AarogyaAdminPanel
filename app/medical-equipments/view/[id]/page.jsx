"use client"

import { useEffect, useState, use } from "react"
import { Layout } from "@/components/layout"
import EquipmentApi from "@/lib/api/equipmentApi"
import Link from "next/link"
import { Microscope, Info, CheckCircle, XCircle } from "lucide-react"
import { getApiErrorMessage } from "@/lib/utils"

export default function MedicalEquipmentView({ params }) {
  const resolvedParams = use(params)
  const { id } = resolvedParams
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  useEffect(() => {
    const fetchOne = async () => {
      setLoading(true)
      try {
        const json = await EquipmentApi.getById(id)
        if (!json?.success) throw new Error(json?.message || "Failed to load equipment")
        setData(json.data)
      } catch (e) {
        setError(getApiErrorMessage(e, "Failed to load equipment details. Please refresh the page."))
      } finally {
        setLoading(false)
      }
    }
    fetchOne()
  }, [id])

  if (loading) {
    return (
      <Layout>
        <p className="p-6 text-gray-600">Loading...</p>
      </Layout>
    )
  }

  if (error) {
    return (
      <Layout>
        <p className="p-6 text-red-600">{error}</p>
      </Layout>
    )
  }

  if (!data) {
    return (
      <Layout>
        <p className="p-6 text-gray-600">Equipment not found</p>
      </Layout>
    )
  }

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">{data.name}</h1>
            <p className="text-gray-700 text-lg">Medical Equipment</p>
          </div>
          <div className="flex space-x-3">
            <Link href={`/medical-equipments/edit/${id}`}>
              <button className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold shadow-sm">
                Edit Equipment
              </button>
            </Link>
            <Link href="/medical-equipments">
              <button className="px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors font-semibold shadow-sm">
                Back to List
              </button>
            </Link>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-lg border border-gray-200 overflow-hidden">
          <div className="p-6 border-b border-gray-200 bg-gradient-to-r from-blue-50 to-indigo-50">
            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0">
                <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center">
                  <Microscope className="w-8 h-8 text-blue-600" />
                </div>
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center space-x-3 mb-2">
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-blue-100 text-blue-800">
                    Medical Equipment
                  </span>
                  <span
                    className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${
                      data.isActive ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-700"
                    }`}
                  >
                    {data.isActive ? (
                      <>
                        <CheckCircle className="w-3 h-3 mr-1" />
                        Active
                      </>
                    ) : (
                      <>
                        <XCircle className="w-3 h-3 mr-1" />
                        Disabled
                      </>
                    )}
                  </span>
                </div>
                {data.description && (
                  <div className="bg-white rounded-lg p-4 border border-gray-200">
                    <h3 className="font-semibold text-gray-900 mb-2 flex items-center">
                      <Info className="w-4 h-4 mr-2 text-blue-600" />
                      Description
                    </h3>
                    <p className="text-gray-700 leading-relaxed">{data.description}</p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {(data.createdAt || data.updatedAt) && (
            <div className="p-6 space-y-6">
              <div className="bg-gray-50 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                  <Info className="w-5 h-5 mr-2 text-gray-600" />
                  Record Information
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-700">
                  {data.createdAt && (
                    <div>
                      <span className="font-medium">Created At: </span>
                      <span>{new Date(data.createdAt).toLocaleString()}</span>
                    </div>
                  )}
                  {data.updatedAt && (
                    <div>
                      <span className="font-medium">Last Updated: </span>
                      <span>{new Date(data.updatedAt).toLocaleString()}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </Layout>
  )
}

