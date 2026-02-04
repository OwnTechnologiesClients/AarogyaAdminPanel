"use client"

import { useState } from "react"
import { Layout } from "@/components/layout"
import Swal from "sweetalert2"
import EquipmentApi from "@/lib/api/equipmentApi"
import { Microscope, Info } from "lucide-react"
import { useRouter } from "next/navigation"
import { getApiErrorMessage } from "@/lib/utils"

export default function AddMedicalEquipment() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    isActive: true,
  })
  const [submitting, setSubmitting] = useState(false)

  const submitEquipment = async () => {
    if (submitting) return
    if (!formData.name.trim()) {
      await Swal.fire({
        title: "Validation Error!",
        text: "Please provide an equipment name",
        icon: "warning",
        confirmButtonText: "OK",
      })
      return
    }

    setSubmitting(true)
    try {
      const payload = {
        name: formData.name.trim(),
        description: formData.description.trim() || undefined,
        isActive: formData.isActive,
      }

      await EquipmentApi.create(payload)

      await Swal.fire({
        title: "Success!",
        text: "Equipment created successfully!",
        icon: "success",
        confirmButtonText: "OK",
      })

      router.push("/medical-equipments")
    } catch (err) {
      await Swal.fire({
        title: "Could not create equipment",
        text: getApiErrorMessage(err, "Failed to create equipment. Please review the details and try again."),
        icon: "error",
        confirmButtonText: "OK",
      })
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Add Medical Equipment</h1>
            <p className="text-gray-700 text-lg">Create a new equipment that hospitals can list as available</p>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <form
            className="space-y-6"
            onSubmit={(e) => {
              e.preventDefault()
              submitEquipment()
            }}
          >
            {/* Basic Information */}
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <div className="flex items-center space-x-3 mb-4">
                <Microscope className="w-6 h-6 text-gray-600" />
                <h2 className="text-xl font-semibold text-gray-900">Equipment Information</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">Equipment Name *</label>
                  <input
                    type="text"
                    placeholder="e.g., MRI Scanner"
                    value={formData.name}
                    onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 placeholder-gray-500"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">Status</label>
                  <div className="flex items-center space-x-3 mt-1">
                    <button
                      type="button"
                      onClick={() => setFormData((prev) => ({ ...prev, isActive: true }))}
                      className={`px-4 py-2 rounded-md text-sm font-medium border ${
                        formData.isActive
                          ? "bg-green-600 text-white border-green-600"
                          : "bg-white text-gray-700 border-gray-300"
                      }`}
                    >
                      Active
                    </button>
                    <button
                      type="button"
                      onClick={() => setFormData((prev) => ({ ...prev, isActive: false }))}
                      className={`px-4 py-2 rounded-md text-sm font-medium border ${
                        !formData.isActive
                          ? "bg-red-600 text-white border-red-600"
                          : "bg-white text-gray-700 border-gray-300"
                      }`}
                    >
                      Disabled
                    </button>
                  </div>
                </div>
              </div>

              <div className="mt-4 space-y-2">
                <label className="block text-sm font-medium text-gray-700">Description</label>
                <textarea
                  rows="3"
                  placeholder="Briefly describe this equipment..."
                  value={formData.description}
                  onChange={(e) => setFormData((prev) => ({ ...prev, description: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 placeholder-gray-500 resize:none"
                />
              </div>
            </div>

            {/* Info */}
            <div className="bg-blue-50 border border-blue-100 rounded-lg p-4 flex items-start space-x-3">
              <Info className="w-5 h-5 text-blue-600 mt-0.5" />
              <div className="text-sm text-blue-900">
                <p className="font-medium">How this is used</p>
                <p className="mt-1">
                  Equipments created here can be assigned to hospitals on the Hospital Add/Edit pages via the checkbox
                  list.
                </p>
              </div>
            </div>

            {/* Controls */}
            <div className="flex justify-end items-center pt-4">
              <button
                type="button"
                onClick={() => router.push("/medical-equipments")}
                className="px-6 py-3 rounded-lg border text-sm font-medium transition-colors border-gray-300 text-gray-700 hover:bg-gray-50 mr-3"
              >
                Cancel
              </button>
              <button
                type="submit"
                className={`px-8 py-3 rounded-lg transition-colors font-medium text-white ${
                  submitting ? "bg-blue-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"
                }`}
                disabled={submitting}
              >
                {submitting ? "Creating..." : "Create Equipment"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </Layout>
  )
}

