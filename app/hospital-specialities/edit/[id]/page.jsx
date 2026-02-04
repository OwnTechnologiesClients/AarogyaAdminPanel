"use client"

import { useEffect, useState, use } from "react"
import { Layout } from "@/components/layout"
import Swal from "sweetalert2"
import SpecialityApi from "@/lib/api/specialityApi"
import { Stethoscope, Info, ListChecks } from "lucide-react"
import { useRouter } from "next/navigation"
import { getApiErrorMessage } from "@/lib/utils"

export default function EditHospitalSpeciality({ params }) {
  const router = useRouter()
  const resolvedParams = use(params)
  const { id } = resolvedParams

  const [formData, setFormData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    if (!id) return
    const fetchOne = async () => {
      setLoading(true)
      try {
        const json = await SpecialityApi.getById(id)
        if (!json?.success) throw new Error(json?.message || "Failed to load speciality")
        const data = json.data
        setFormData({
          name: data.name || "",
          description: data.description || "",
          keyServicesInput: "",
          keyServices: Array.isArray(data.keyServices) ? data.keyServices : [],
          isActive: data.isActive !== undefined ? data.isActive : true,
        })
      } catch (e) {
        await Swal.fire({
          title: "Could not load speciality",
          text: getApiErrorMessage(e, "Failed to load speciality details. Please refresh the page."),
          icon: "error",
          confirmButtonText: "OK",
        })
        router.push("/hospital-specialities")
      } finally {
        setLoading(false)
      }
    }
    fetchOne()
  }, [id, router])

  const handleAddKeyService = () => {
    if (!formData) return
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

  const submitUpdate = async () => {
    if (!formData || saving) return
    if (!formData.name.trim()) {
      await Swal.fire({
        title: "Validation Error!",
        text: "Please provide a speciality name",
        icon: "warning",
        confirmButtonText: "OK",
      })
      return
    }

    setSaving(true)
    try {
      const payload = {
        name: formData.name.trim(),
        description: formData.description.trim() || undefined,
        keyServices: formData.keyServices,
        isActive: formData.isActive,
      }

      const json = await SpecialityApi.update(id, payload)
      if (!json?.success) {
        throw new Error(json?.message || "Failed to update speciality")
      }

      await Swal.fire({
        title: "Success!",
        text: "Speciality updated successfully!",
        icon: "success",
        confirmButtonText: "OK",
      })

      router.push("/hospital-specialities")
    } catch (e) {
      await Swal.fire({
        title: "Could not update speciality",
        text: getApiErrorMessage(e, "Failed to update speciality. Please review the details and try again."),
        icon: "error",
        confirmButtonText: "OK",
      })
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return (
      <Layout>
        <p className="p-6 text-gray-600">Loading...</p>
      </Layout>
    )
  }

  if (!formData) return null

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Edit Hospital Speciality</h1>
            <p className="text-gray-700 text-lg">Update details for this speciality</p>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <form
            className="space-y-6"
            onSubmit={(e) => {
              e.preventDefault()
              submitUpdate()
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
                          : "bg:white text-gray-700 border-gray-300"
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
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="e.g., Angioplasty"
                  value={formData.keyServicesInput}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      keyServicesInput: e.target.value,
                    }))
                  }
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
                <p className="font-medium">Note</p>
                <p className="mt-1">
                  Changes here will affect how this speciality appears wherever it is referenced, including hospital
                  profiles.
                </p>
              </div>
            </div>

            {/* Controls */}
            <div className="flex justify-between items-center pt-4">
              <button
                type="button"
                onClick={() => router.push("/hospital-specialities")}
                className="px-6 py-3 rounded-lg border text-sm font-medium transition-colors border-gray-300 text-gray-700 hover:bg-gray-50"
              >
                Back
              </button>
              <button
                type="submit"
                className={`px-8 py-3 rounded-lg transition-colors font-medium text-white ${
                  saving ? "bg-blue-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"
                }`}
                disabled={saving}
              >
                {saving ? "Saving..." : "Save Changes"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </Layout>
  )
}

