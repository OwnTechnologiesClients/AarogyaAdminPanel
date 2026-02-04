"use client"

import { useState } from "react"
import { Layout } from "@/components/layout"
import Swal from "sweetalert2"
import SpecialityApi from "@/lib/api/specialityApi"
import { Stethoscope, Info, ListChecks } from "lucide-react"
import { useRouter } from "next/navigation"
import { getApiErrorMessage } from "@/lib/utils"

export default function AddHospitalSpeciality() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    keyServicesInput: "",
    keyServices: [],
    isActive: true,
  })
  const [submitting, setSubmitting] = useState(false)

  const handleAddKeyService = () => {
    const value = formData.keyServicesInput.trim()
    if (!value) return
    if (formData.keyServices.includes(value)) {
      setFormData((prev) => ({ ...prev, keyServicesInput: "" }))
      return
    }
    setFormData((prev) => ({
      ...prev,
      keyServices: [...prev.keyServices, value],
      keyServicesInput: "",
    }))
  }

  const handleRemoveKeyService = (value) => {
    setFormData((prev) => ({
      ...prev,
      keyServices: prev.keyServices.filter((item) => item !== value),
    }))
  }

  const submitSpeciality = async () => {
    if (submitting) return
    if (!formData.name.trim()) {
      await Swal.fire({
        title: "Validation Error!",
        text: "Please provide a speciality name",
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
        keyServices: formData.keyServices,
        isActive: formData.isActive,
      }

      await SpecialityApi.create(payload)

      await Swal.fire({
        title: "Success!",
        text: "Speciality created successfully!",
        icon: "success",
        confirmButtonText: "OK",
      })

      router.push("/hospital-specialities")
    } catch (err) {
      await Swal.fire({
        title: "Could not create speciality",
        text: getApiErrorMessage(err, "Failed to create speciality. Please review the details and try again."),
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
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Add Hospital Speciality</h1>
            <p className="text-gray-700 text-lg">Create a new speciality that hospitals can be tagged with</p>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <form
            className="space-y-6"
            onSubmit={(e) => {
              e.preventDefault()
              submitSpeciality()
            }}
          >
            {/* Basic Information */}
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <div className="flex items-center space-x-3 mb-4">
                <Stethoscope className="w-6 h-6 text-gray-600" />
                <h2 className="text-xl font-semibold text-gray-900">Speciality Information</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">Speciality Name *</label>
                  <input
                    type="text"
                    placeholder="e.g., Cardiology"
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
                  placeholder="Briefly describe this speciality..."
                  value={formData.description}
                  onChange={(e) => setFormData((prev) => ({ ...prev, description: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 placeholder-gray-500 resize-none"
                />
              </div>
            </div>

            {/* Key Services */}
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <div className="flex items-center space-x-3 mb-4">
                <ListChecks className="w-5 h-5 text-gray-600" />
                <h2 className="text-lg font-semibold text-gray-900">Key Services (Optional)</h2>
              </div>
              <p className="text-sm text-gray-600 mb-3">
                Add key services that typically fall under this speciality. This helps describe the speciality to users.
              </p>
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="e.g., Angioplasty"
                  value={formData.keyServicesInput}
                  onChange={(e) => setFormData((prev) => ({ ...prev, keyServicesInput: e.target.value }))}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault()
                      handleAddKeyService()
                    }
                  }}
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 placeholder-gray-500"
                />
                <button
                  type="button"
                  onClick={handleAddKeyService}
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors text-sm font-medium"
                >
                  Add
                </button>
              </div>
              {formData.keyServices.length > 0 && (
                <div className="mt-3 flex flex-wrap gap-2">
                  {formData.keyServices.map((service) => (
                    <span
                      key={service}
                      className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-xs font-medium flex items-center gap-2"
                    >
                      {service}
                      <button
                        type="button"
                        onClick={() => handleRemoveKeyService(service)}
                        className="text-blue-500 hover:text-red-500"
                      >
                        ×
                      </button>
                    </span>
                  ))}
                </div>
              )}
            </div>

            {/* Info */}
            <div className="bg-blue-50 border border-blue-100 rounded-lg p-4 flex items-start space-x-3">
              <Info className="w-5 h-5 text-blue-600 mt-0.5" />
              <div className="text-sm text-blue-900">
                <p className="font-medium">How this is used</p>
                <p className="mt-1">
                  Specialities created here can be assigned to hospitals on the Hospital Add/Edit pages via the
                  checkbox list.
                </p>
              </div>
            </div>

            {/* Controls */}
            <div className="flex justify-end items-center pt-4">
              <button
                type="button"
                onClick={() => router.push("/hospital-specialities")}
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
                {submitting ? "Creating..." : "Create Speciality"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </Layout>
  )
}

