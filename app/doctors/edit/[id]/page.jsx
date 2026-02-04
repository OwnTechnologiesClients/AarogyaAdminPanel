"use client"

import { useEffect, useState, use } from 'react'
import DoctorApi from '@/lib/api/doctorApi'
import { HospitalApi } from '@/lib/api/hospitalApi'
import { Layout } from '@/components/layout'
import Swal from 'sweetalert2'
import { Briefcase, User, Building2, Star, Users, Bed, Calendar, Mail, Phone, Globe, MapPin, Award, Info, Navigation, Plus, Trash2, Stethoscope, Microscope, Camera, ChevronDown, ChevronUp, Pencil, X } from "lucide-react"
import { useRouter } from 'next/navigation'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { resolveBackendPath } from '@/lib/config'
import { getApiErrorMessage } from '@/lib/utils'

export default function EditDoctor({ params }) {
  const router = useRouter()
  const resolvedParams = use(params)
  const { id } = resolvedParams
  const [activeTab, setActiveTab] = useState('doctor-details')
  const [formData, setFormData] = useState(null)
  const [hospitals, setHospitals] = useState([])
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState("")
  const [expandedSections, setExpandedSections] = useState({
    specializations: true,
    professionalExperience: true,
    degrees: true,
    languages: true,
    awards: true,
    publications: true,
    certifications: true
  })

  const [professionalExperienceInput, setProfessionalExperienceInput] = useState({
    position: '',
    institution: '',
    duration: ''
  })

  useEffect(() => {
    HospitalApi.list().then(res => {
      const data = Array.isArray(res.data) ? res.data : res.data?.data || []
      setHospitals(data)
    }).catch(() => setHospitals([]))
  }, [])

  // Helper functions for form management
  const toggleSection = (section) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }))
  }

  const handleAdd = (input, setInput, list, setList) => {
    if (input.trim() && !list.includes(input.trim())) {
      setList([...list, input.trim()])
      setInput('')
    }
  }
  
  const handleRemove = (item, list, setList) => {
    setList(list.filter(i => i !== item))
  }
  const handleUpdate = (list, setList, index, newValue) => {
    const trimmed = newValue.trim()
    if (!trimmed) return
    const updated = [...list]
    updated[index] = trimmed
    setList(updated)
  }

  const handleAddProfessionalExperience = () => {
    if (professionalExperienceInput.position.trim() && 
        professionalExperienceInput.institution.trim() && 
        professionalExperienceInput.duration.trim()) {
      const newExperience = {
        position: professionalExperienceInput.position.trim(),
        institution: professionalExperienceInput.institution.trim(),
        duration: professionalExperienceInput.duration.trim()
      }
      setFormData(prev => ({
        ...prev,
        professionalExperience: [...(prev.professionalExperience || []), newExperience]
      }))
      setProfessionalExperienceInput({ position: '', institution: '', duration: '' })
    }
  }

  const handleRemoveProfessionalExperience = (index) => {
    setFormData(prev => ({
      ...prev,
      professionalExperience: (prev.professionalExperience || []).filter((_, idx) => idx !== index)
    }))
  }
  const handleUpdateProfessionalExperience = (index, position, institution, duration) => {
    if (!position?.trim() || !institution?.trim() || !duration?.trim()) return
    setFormData(prev => {
      const updated = [...(prev.professionalExperience || [])]
      updated[index] = { position: position.trim(), institution: institution.trim(), duration: duration.trim() }
      return { ...prev, professionalExperience: updated }
    })
  }

  // Format validation functions
  const validateRating = (rating) => {
    if (!rating) return { valid: true, message: '' }
    const num = parseFloat(rating)
    if (isNaN(num)) return { valid: false, message: 'Rating must be a number' }
    if (num < 0 || num > 5) return { valid: false, message: 'Rating must be between 0 and 5' }
    return { valid: true, message: '' }
  }

  const validateExperience = (experience) => {
    if (!experience) return { valid: true, message: '' }
    // Allow numeric values or format like "12+ years", "5 years", etc.
    const numericMatch = experience.match(/^(\d+)\+?\s*(years?)?$/i)
    if (numericMatch) return { valid: true, message: '' }
    // Check if it's just a number
    if (!isNaN(parseFloat(experience)) && isFinite(experience)) return { valid: true, message: '' }
    return { valid: false, message: 'Experience must be a number or format like "12" or "12+ years"' }
  }

  const validateYear = (year) => {
    // Year is optional for degrees; if not provided, treat as valid
    if (!year) return { valid: true, message: '' }
    // Check if it's a 4-digit number between 1900 and current year + 10
    const yearNum = parseInt(year, 10)
    const currentYear = new Date().getFullYear()
    if (isNaN(yearNum) || year.length !== 4) {
      return { valid: false, message: 'Year must be a 4-digit number (e.g., 2015)' }
    }
    if (yearNum < 1900 || yearNum > currentYear + 10) {
      return { valid: false, message: `Year must be between 1900 and ${currentYear + 10}` }
    }
    return { valid: true, message: '' }
  }

  useEffect(() => {
    DoctorApi.getById(id)
      .then(res => {
        const data = res.data || res
        const hasCustomHospital = data.customHospitalName && !data.hospitalId
        setFormData({
          id: data.id || '',
          name: data.name || '',
          image: data.image || null,
          specialty: data.specialty || '',
          category: data.category || '',
          location: data.location || '',
          experience: data.experience || '',
          rating: data.rating || '',
          introduction: data.introduction || '',
          designation: data.designation || '',
          hospitalId: hasCustomHospital ? '' : (data.hospitalId?._id || data.hospitalId || ''),
          customHospitalName: data.customHospitalName || '',
          useCustomHospital: hasCustomHospital,
          affiliatedHospitalIds: (data.affiliatedHospitalIds || []).map(h => h.name || h.id || h),
          professionalExperience: data.professionalExperience || [],
          specializations: data.specializations || [],
          degrees: data.degrees || [],
          languages: data.languages || [],
          awards: data.awards || [],
          researchWork: data.researchWork || '',
          publications: data.publications || [],
          certifications: data.certifications || [],
          isActive: data.isActive !== undefined ? data.isActive : true
        })
      })
      .catch(err => setError(getApiErrorMessage(err, 'Failed to load doctor details. Please refresh the page.')))
  }, [id])

  const submitUpdate = async () => {
    if (!formData) return

    // Format validation
    const ratingValidation = validateRating(formData.rating)
    if (!ratingValidation.valid) {
      await Swal.fire({
        title: 'Validation Error!',
        text: `Rating: ${ratingValidation.message}`,
        icon: 'error',
        confirmButtonText: 'OK'
      })
      return
    }

    const experienceValidation = validateExperience(formData.experience)
    if (!experienceValidation.valid) {
      await Swal.fire({
        title: 'Validation Error!',
        text: `Experience: ${experienceValidation.message}`,
        icon: 'error',
        confirmButtonText: 'OK'
      })
      return
    }

    // Validate all degree years (only when year is provided)
    for (let i = 0; i < (formData.degrees || []).length; i++) {
      const year = formData.degrees[i].year
      if (year) {
        const yearValidation = validateYear(year)
        if (!yearValidation.valid) {
          await Swal.fire({
            title: 'Validation Error!',
            text: `Degree ${i + 1} Year: ${yearValidation.message}`,
            icon: 'error',
            confirmButtonText: 'OK'
          })
          return
        }
      }
    }

    setSaving(true)
    try {
      const fd = new FormData()
      // ID is auto-generated and not editable, so we don't send it
      fd.append('name', formData.name || '')
      fd.append('specialty', formData.specialty || '')
      fd.append('category', formData.category || '')
      fd.append('location', formData.location || '')
      fd.append('experience', formData.experience || '')
      fd.append('rating', formData.rating || '')
      fd.append('introduction', formData.introduction || '')
      fd.append('designation', formData.designation || '')
      if (formData.useCustomHospital && formData.customHospitalName) {
        fd.append('customHospitalName', formData.customHospitalName)
      } else {
        fd.append('hospitalId', formData.hospitalId || '')
      }
      fd.append('affiliatedHospitalIds', JSON.stringify(formData.affiliatedHospitalIds || []))
      fd.append('professionalExperience', JSON.stringify(formData.professionalExperience || []))
      fd.append('specializations', JSON.stringify(formData.specializations || []))
      fd.append('degrees', JSON.stringify(formData.degrees || []))
      fd.append('languages', JSON.stringify(formData.languages || []))
      fd.append('awards', JSON.stringify(formData.awards || []))
      fd.append('researchWork', formData.researchWork || '')
      fd.append('publications', JSON.stringify(formData.publications || []))
      fd.append('certifications', JSON.stringify(formData.certifications || []))
      fd.append('isActive', formData.isActive)
      if (formData.image && typeof formData.image !== 'string') {
        fd.append('image', formData.image)
      }
      await DoctorApi.update(id, fd)
      
      await Swal.fire({
        title: 'Success!',
        text: 'Doctor updated successfully!',
        icon: 'success',
        confirmButtonText: 'OK'
      })
      
      // Redirect to doctors list page
      router.push('/doctors')
    } catch (e) {
      await Swal.fire({
        title: 'Could not update doctor',
        text: getApiErrorMessage(e, 'Failed to update doctor. Please review the details and try again.'),
        icon: 'error',
        confirmButtonText: 'OK'
      })
    } finally {
      setSaving(false)
    }
  }

  const tabs = [
    { id: 'doctor-details', label: 'Doctor Details', icon: Briefcase },
    { id: 'profile-bio', label: 'Profile & Bio', icon: User },
  ]

  const goNext = () => setActiveTab('profile-bio')
  const goBack = () => setActiveTab('doctor-details')

  if (error) return <Layout><p className="p-6 text-red-600">{error}</p></Layout>
  if (!formData) return <Layout><p className="p-6">Loading...</p></Layout>

  return (
    <Layout>
      <div className="space-y-6">
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex space-x-8">
            {tabs.map((tab) => {
              const Icon = tab.icon
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`
                    flex items-center space-x-2 py-2 px-1 border-b-2 font-medium text-sm transition-colors duration-200
                    ${activeTab === tab.id
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    }
                  `}
                >
                  <Icon className="h-4 w-4" />
                  <span>{tab.label}</span>
                </button>
              )
            })}
          </nav>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className={activeTab === 'doctor-details' ? 'block' : 'hidden'}>
            <DoctorDetailsEditTab 
              formData={formData}
              setFormData={setFormData}
              hospitals={hospitals}
              goNext={goNext}
            />
          </div>
          <div className={activeTab === 'profile-bio' ? 'block' : 'hidden'}>
            <ProfileBioEditTab
              formData={formData}
              setFormData={setFormData}
              expandedSections={expandedSections}
              toggleSection={toggleSection}
              handleAdd={handleAdd}
              handleRemove={handleRemove}
              handleUpdate={handleUpdate}
              handleAddProfessionalExperience={handleAddProfessionalExperience}
              handleRemoveProfessionalExperience={handleRemoveProfessionalExperience}
              handleUpdateProfessionalExperience={handleUpdateProfessionalExperience}
              professionalExperienceInput={professionalExperienceInput}
              setProfessionalExperienceInput={setProfessionalExperienceInput}
              goBack={goBack}
              submitUpdate={submitUpdate}
              saving={saving}
              validateYear={validateYear}
            />
          </div>
        </div>
      </div>
      <ToastContainer position="top-right" autoClose={3000} />
    </Layout>
  )
}

// Doctor Details Edit Tab Component
const DoctorDetailsEditTab = ({ formData, setFormData, hospitals, goNext }) => {
  const uploadInputId = 'doctor-image-upload-details'
  const [editingAffiliatedIdx, setEditingAffiliatedIdx] = useState(-1)
  const [editAffiliatedValue, setEditAffiliatedValue] = useState('')
  const [imagePreview, setImagePreview] = useState(() => {
    if (formData?.image && typeof formData.image === 'string') {
      return resolveBackendPath(formData.image)
    }
    return null
  })
  const [inputKey, setInputKey] = useState(0)

  useEffect(() => {
    if (!formData?.image) {
      setImagePreview(null)
      return
    }
    if (typeof formData.image === 'string') {
      setImagePreview(resolveBackendPath(formData.image))
    }
  }, [formData?.image])

  useEffect(() => {
    return () => {
      if (imagePreview && imagePreview.startsWith('blob:')) {
        URL.revokeObjectURL(imagePreview)
      }
    }
  }, [imagePreview])

  const openFileDialog = () => {
    document.getElementById(uploadInputId)?.click()
  }

  const handleImageChange = (e) => {
    const file = e.target.files?.[0]
    if (!file) return

    setFormData(prev => ({ ...prev, image: file }))
    setImagePreview(prev => {
      if (prev && prev.startsWith('blob:')) {
        URL.revokeObjectURL(prev)
      }
      return URL.createObjectURL(file)
    })
    setInputKey(key => key + 1)
  }

  const handleRemoveImage = () => {
    setFormData(prev => ({ ...prev, image: null }))
    setImagePreview(prev => {
      if (prev && prev.startsWith('blob:')) {
        URL.revokeObjectURL(prev)
      }
      return null
    })
    setInputKey(key => key + 1)
  }

  const getCurrentImageSrc = () => {
    if (imagePreview) return imagePreview
    if (formData.image && typeof formData.image === 'string') {
      return resolveBackendPath(formData.image)
    }
    return null
  }

  return (
    <div className="space-y-6">
      <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
        {/* Page Header */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center space-x-3 mb-2">
            <Briefcase className="w-6 h-6 text-gray-600" />
            <h2 className="text-xl font-semibold text-gray-900">Edit Doctor Information</h2>
          </div>
          <p className="text-gray-600">Update the basic details about the doctor</p>
        </div>

        {/* Basic Information */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Basic Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Doctor ID</label>
              <input 
                type="text" 
                value={formData.id}
                disabled
                readOnly
                className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-100 text-gray-600 cursor-not-allowed"
              />
              <p className="text-xs text-gray-500">Doctor ID is auto-generated and cannot be changed</p>
            </div>
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Doctor Name *</label>
              <input 
                type="text" 
                placeholder="e.g., Dr. John Smith" 
                value={formData.name}
                onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 placeholder-gray-500"
                required
              />
            </div>
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Specialty *</label>
              <input 
                type="text" 
                placeholder="e.g., Cardiology" 
                value={formData.specialty}
                onChange={(e) => setFormData(prev => ({ ...prev, specialty: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 placeholder-gray-500"
                required
              />
            </div>
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Category *</label>
              <select
                value={formData.category || ''}
                onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900"
                required
              >
                <option value="">Select category</option>
                {['Cardiology', 'Orthopaedics', 'Neurology', 'Oncology'].map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Designation *</label>
              <input 
                type="text" 
                placeholder="e.g., Senior Consultant" 
                value={formData.designation}
                onChange={(e) => setFormData(prev => ({ ...prev, designation: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 placeholder-gray-500"
                required
              />
            </div>
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Location *</label>
              <input 
                type="text" 
                placeholder="e.g., Chennai, Tamil Nadu" 
                value={formData.location}
                onChange={(e) => setFormData(prev => ({ ...prev, location: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 placeholder-gray-500"
                required
              />
            </div>
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Experience (Years)</label>
              <input 
                type="text" 
                placeholder="e.g., 12" 
                value={formData.experience}
                onChange={(e) => setFormData(prev => ({ ...prev, experience: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 placeholder-gray-500"
              />
            </div>
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Rating</label>
              <input 
                type="number" 
                step="0.1"
                min="0"
                max="5"
                placeholder="4.7" 
                value={formData.rating}
                onChange={(e) => setFormData(prev => ({ ...prev, rating: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 placeholder-gray-500"
              />
            </div>
          </div>
        </div>

        {/* Hospital Assignment */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Hospital Assignment</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <div className="flex items-center justify-between mb-2">
                <label className="block text-sm font-medium text-gray-700">Primary Hospital *</label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.useCustomHospital}
                    onChange={(e) => {
                      setFormData(prev => ({
                        ...prev,
                        useCustomHospital: e.target.checked,
                        hospitalId: e.target.checked ? '' : prev.hospitalId,
                        customHospitalName: !e.target.checked ? '' : prev.customHospitalName
                      }))
                    }}
                    className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                  />
                  <span className="text-xs text-gray-600">Use custom hospital</span>
                </label>
              </div>
              {formData.useCustomHospital ? (
                <input
                  type="text"
                  value={formData.customHospitalName}
                  onChange={(e) => setFormData(prev => ({ ...prev, customHospitalName: e.target.value }))}
                  placeholder="Enter custom hospital name"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 placeholder-gray-500"
                  required={formData.useCustomHospital}
                />
              ) : (
                <select
                  value={formData.hospitalId}
                  onChange={(e) => setFormData(prev => ({ ...prev, hospitalId: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 placeholder-gray-500"
                  required={!formData.useCustomHospital}
                >
                  <option value="">Select Hospital</option>
                  {hospitals.map(h => (
                    <option key={h._id} value={h._id}>{h.name}</option>
                  ))}
                </select>
              )}
            </div>
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Designation *</label>
              <input
                type="text"
                value={formData.designation}
                onChange={(e) => setFormData(prev => ({ ...prev, designation: e.target.value }))}
                placeholder="e.g., Senior Consultant, Head of Department"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 placeholder-gray-500"
                required
              />
            </div>
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Affiliated Hospitals</label>
              <div className="flex gap-2">
                <input 
                  type="text" 
                  placeholder="Add affiliated hospital name and press Enter" 
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 placeholder-gray-500"
                  onKeyDown={(e) => { 
                    if (e.key === 'Enter') { 
                      e.preventDefault(); 
                      const value = e.target.value.trim();
                      if (value && !formData.affiliatedHospitalIds.includes(value)) {
                        setFormData(prev => ({ ...prev, affiliatedHospitalIds: [...prev.affiliatedHospitalIds, value] }));
                        e.target.value = '';
                      }
                    }
                  }}
                />
                <button 
                  type="button" 
                  onClick={(e) => {
                    const input = e.target.previousElementSibling;
                    const value = input.value.trim();
                    if (value && !formData.affiliatedHospitalIds.includes(value)) {
                      setFormData(prev => ({ ...prev, affiliatedHospitalIds: [...prev.affiliatedHospitalIds, value] }));
                      input.value = '';
                    }
                  }}
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                >
                  Add
                </button>
              </div>
              <div className="flex flex-wrap gap-2 mt-2">
                {formData.affiliatedHospitalIds.map((hospital, idx) => (
                  editingAffiliatedIdx === idx ? (
                    <div key={idx} className="w-full flex gap-2 items-center flex-wrap">
                      <input type="text" value={editAffiliatedValue} onChange={(e) => setEditAffiliatedValue(e.target.value)} onKeyDown={(e) => { if (e.key === 'Enter') { const trimmed = editAffiliatedValue.trim(); if (trimmed) { const updated = [...formData.affiliatedHospitalIds]; updated[idx] = trimmed; setFormData(prev => ({ ...prev, affiliatedHospitalIds: updated })); setEditingAffiliatedIdx(-1); setEditAffiliatedValue(''); } } if (e.key === 'Escape') { setEditingAffiliatedIdx(-1); setEditAffiliatedValue(''); } }} className="flex-1 min-w-0 px-3 py-2 border border-green-300 rounded-md text-sm text-gray-900 bg-white placeholder-gray-400" autoFocus />
                      <button type="button" onClick={() => { const trimmed = editAffiliatedValue.trim(); if (trimmed) { const updated = [...formData.affiliatedHospitalIds]; updated[idx] = trimmed; setFormData(prev => ({ ...prev, affiliatedHospitalIds: updated })); setEditingAffiliatedIdx(-1); setEditAffiliatedValue(''); } }} className="px-3 py-1.5 bg-green-600 text-white rounded-md text-sm whitespace-nowrap flex-shrink-0">Save</button>
                      <button type="button" onClick={() => { setEditingAffiliatedIdx(-1); setEditAffiliatedValue(''); }} className="px-3 py-1.5 text-gray-600 rounded-md text-sm whitespace-nowrap flex-shrink-0 border border-gray-300 bg-white hover:bg-gray-50">Cancel</button>
                    </div>
                  ) : (
                    <span key={idx} className="bg-green-100 text-green-800 px-3 py-1 rounded-md flex items-center gap-1 break-words max-w-full">
                      {hospital}
                      <button type="button" onClick={() => { setEditingAffiliatedIdx(idx); setEditAffiliatedValue(hospital); }} className="ml-1 text-green-600 hover:text-green-800 flex-shrink-0" title="Edit"><Pencil className="w-3.5 h-3.5" /></button>
                      <button type="button" onClick={() => setFormData(prev => ({ ...prev, affiliatedHospitalIds: prev.affiliatedHospitalIds.filter((_, i) => i !== idx) }))} className="text-green-500 hover:text-red-500 flex-shrink-0 p-0.5" title="Remove"><X className="w-3.5 h-3.5" /></button>
                    </span>
                  )
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Controls */}
        <div className="flex justify-end items-center pt-2">
          <button
            type="button"
            onClick={goNext}
            className="px-8 py-3 rounded-lg transition-colors font-medium text-white bg-blue-600 hover:bg-blue-700"
          >
            Next
          </button>
        </div>

      </form>
    </div>
  );
};

// Profile & Bio Edit Tab Component  
const ProfileBioEditTab = ({
  formData,
  setFormData,
  expandedSections,
  toggleSection,
  handleAdd,
  handleRemove,
  handleUpdate,
  handleAddProfessionalExperience,
  handleRemoveProfessionalExperience,
  handleUpdateProfessionalExperience,
  professionalExperienceInput,
  setProfessionalExperienceInput,
  goBack,
  submitUpdate,
  saving,
  validateYear
}) => {
  const [editingItem, setEditingItem] = useState({ field: null, index: -1 })
  const [editValue, setEditValue] = useState('')
  useEffect(() => {
    if (!editingItem.field || editingItem.index < 0) {
      setEditValue('')
      return
    }
    const list = formData?.[editingItem.field]
    if (!Array.isArray(list)) return
    const val = list[editingItem.index]
    setEditValue(val != null ? (typeof val === 'string' ? val : (val?.name ?? val?.value ?? String(val))) : '')
  }, [editingItem.field, editingItem.index])
  const [editingExpIdx, setEditingExpIdx] = useState(-1)
  const [editingExpForm, setEditingExpForm] = useState({ position: '', institution: '', duration: '' })
  const [editingDegreeIdx, setEditingDegreeIdx] = useState(-1)
  const [editingDegreeForm, setEditingDegreeForm] = useState({ name: '', institution: '', year: '' })
  const [specializationInput, setSpecializationInput] = useState('')
  const [languageInput, setLanguageInput] = useState('')
  const [awardInput, setAwardInput] = useState('')
  const [publicationInput, setPublicationInput] = useState('')
  const [certificationInput, setCertificationInput] = useState('')
  const [imagePreview, setImagePreview] = useState(() => {
    if (formData?.image && typeof formData.image === 'string') {
      return resolveBackendPath(formData.image)
    }
    return null
  })
  const uploadInputId = 'doctor-image-upload-profile'
  const [inputKey, setInputKey] = useState(0)

  useEffect(() => {
    if (!formData?.image) {
      setImagePreview(null)
      return
    }

    if (typeof formData.image === 'string') {
      setImagePreview(resolveBackendPath(formData.image))
      return
    }

    // File previews handled in image change handler
  }, [formData?.image])
  
  useEffect(() => {
    return () => {
      if (imagePreview && imagePreview.startsWith('blob:')) {
        URL.revokeObjectURL(imagePreview)
      }
    }
  }, [imagePreview])
  
  // Degree inputs
  const [degreeNameInput, setDegreeNameInput] = useState('')
  const [degreeInstitutionInput, setDegreeInstitutionInput] = useState('')
  const [degreeYearInput, setDegreeYearInput] = useState('')

  const addDegree = () => {
    // Only degree name is mandatory; institution and year are optional
    if (!degreeNameInput) {
      Swal.fire({
        title: 'Validation Error!',
        text: 'Please enter the degree name',
        icon: 'error',
        confirmButtonText: 'OK'
      })
      return
    }

    // Validate year only if it is provided
    if (validateYear && degreeYearInput) {
      const yearValidation = validateYear(degreeYearInput)
      if (!yearValidation.valid) {
        Swal.fire({
          title: 'Validation Error!',
          text: `Year: ${yearValidation.message}`,
          icon: 'error',
          confirmButtonText: 'OK'
        })
        return
      }
    }

    setFormData(prev => ({
      ...prev,
      degrees: [...(prev.degrees || []), { 
        name: degreeNameInput.trim(), 
        institution: degreeInstitutionInput.trim(),
        year: degreeYearInput.trim()
      }]
    }))
    setDegreeNameInput('')
    setDegreeInstitutionInput('')
    setDegreeYearInput('')
  }

  const handleRemoveDegree = (index) => {
    setFormData(prev => ({
      ...prev,
      degrees: (prev.degrees || []).filter((_, idx) => idx !== index)
    }))
  }
  const handleUpdateDegree = (index, name, institution, year) => {
    if (!name?.trim()) return
    if (validateYear && year) {
      const v = validateYear(year)
      if (!v.valid) { Swal.fire({ title: 'Validation Error!', text: `Year: ${v.message}`, icon: 'error', confirmButtonText: 'OK' }); return }
    }
    setFormData(prev => {
      const updated = [...(prev.degrees || [])]
      updated[index] = { name: name.trim(), institution: (institution || '').trim(), year: (year || '').trim() }
      return { ...prev, degrees: updated }
    })
  }

  const addSpecialization = () => {
    if (specializationInput.trim() && !formData.specializations.includes(specializationInput.trim())) {
      setFormData(prev => ({
        ...prev,
        specializations: [...prev.specializations, specializationInput.trim()]
      }))
      setSpecializationInput('')
    }
  }

  const addLanguage = () => {
    if (languageInput.trim() && !formData.languages.includes(languageInput.trim())) {
      setFormData(prev => ({
        ...prev,
        languages: [...prev.languages, languageInput.trim()]
      }))
      setLanguageInput('')
    }
  }

  const addAward = () => {
    if (awardInput.trim() && !formData.awards.includes(awardInput.trim())) {
      setFormData(prev => ({
        ...prev,
        awards: [...prev.awards, awardInput.trim()]
      }))
      setAwardInput('')
    }
  }

  const addPublication = () => {
    if (publicationInput.trim() && !formData.publications.includes(publicationInput.trim())) {
      setFormData(prev => ({
        ...prev,
        publications: [...prev.publications, publicationInput.trim()]
      }))
      setPublicationInput('')
    }
  }

  const addCertification = () => {
    if (certificationInput.trim() && !formData.certifications.includes(certificationInput.trim())) {
      setFormData(prev => ({
        ...prev,
        certifications: [...prev.certifications, certificationInput.trim()]
      }))
      setCertificationInput('')
    }
  }

  const handleRemoveSpecialization = (index) => {
    setFormData(prev => ({
      ...prev,
      specializations: prev.specializations.filter((_, idx) => idx !== index)
    }))
  }

  const handleRemoveLanguage = (index) => {
    setFormData(prev => ({
      ...prev,
      languages: prev.languages.filter((_, idx) => idx !== index)
    }))
  }

  const handleRemoveAward = (index) => {
    setFormData(prev => ({
      ...prev,
      awards: prev.awards.filter((_, idx) => idx !== index)
    }))
  }

  const handleRemovePublication = (index) => {
    setFormData(prev => ({
      ...prev,
      publications: prev.publications.filter((_, idx) => idx !== index)
    }))
  }

  const handleRemoveCertification = (index) => {
    setFormData(prev => ({
      ...prev,
      certifications: prev.certifications.filter((_, idx) => idx !== index)
    }))
  }

  const openFileDialog = () => {
    document.getElementById(uploadInputId)?.click()
  }

  const handleImageChange = (e) => {
    const file = e.target.files?.[0]
    if (!file) return

    setImagePreview(prev => {
      if (prev && prev.startsWith('blob:')) {
        URL.revokeObjectURL(prev)
      }
      return URL.createObjectURL(file)
    })
    setFormData(prev => ({ ...prev, image: file }))
    setInputKey(key => key + 1)
  }

  const handleRemoveImage = () => {
    setImagePreview(prev => {
      if (prev && prev.startsWith('blob:')) {
        URL.revokeObjectURL(prev)
      }
      return null
    })
    setFormData(prev => ({ ...prev, image: null }))
    setInputKey(key => key + 1)
  }





  return (
    <div className="space-y-6">
      {/* Profile Image */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Profile Image</h3>
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">Update Profile Image</label>
          <div className="flex items-center space-x-6">
            {/* Current Image */}
            <div className="relative w-32 h-32 bg-gray-100 rounded-lg border border-gray-300 flex items-center justify-center overflow-hidden">
              {imagePreview ? (
                <div className="relative w-full h-full">
                  <img
                    src={imagePreview}
                    alt="Current"
                    className="w-full h-full object-cover rounded-lg"
                  />
                  <button
                    type="button"
                    onClick={handleRemoveImage}
                    className="absolute top-2 right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center hover:bg-red-600 transition-colors"
                  >
                    ×
                  </button>
                </div>
              ) : (
                <div className="text-center">
                  <Camera className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                  <p className="text-xs text-gray-500">No image</p>
                </div>
              )}
            </div>

            {/* Upload Section */}
            <div className="w-32 h-32 bg-gray-100 rounded-lg border border-gray-300 flex items-center justify-center hover:bg-gray-200 transition-colors cursor-pointer"
                 onClick={openFileDialog}>
              <div className="text-center">
                <p className="text-sm text-gray-600 font-medium">Upload new photo</p>
              </div>
            </div>
            <input
              key={inputKey}
              id={uploadInputId}
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="hidden"
            />
          </div>
        </div>
      </div>

        {/* Introduction */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Introduction</h3>
          <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">Doctor's Introduction & Bio</label>
          <textarea 
            rows="6"
            placeholder="Enter doctor's introduction and expertise description..." 
            value={formData.introduction}
            onChange={(e) => setFormData(prev => ({ ...prev, introduction: e.target.value }))}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 placeholder-gray-500 resize-none"
          />
          </div>
        </div>

        {/* Research Work */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Research Work</h3>
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">Research Background & Work</label>
            <textarea 
              rows="8"
              placeholder="Enter doctor's research work, studies, and clinical research background..." 
              value={formData.researchWork}
              onChange={(e) => setFormData(prev => ({ ...prev, researchWork: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 placeholder-gray-500 resize-none"
            />
          </div>
        </div>

      {/* Specializations */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <div 
          className="flex items-center justify-between mb-4 cursor-pointer hover:bg-gray-50 p-2 rounded-md transition-colors"
          onClick={() => toggleSection('specializations')}
        >
          <div className="flex items-center space-x-2">
            <Stethoscope className="w-5 h-5 text-gray-600" />
            <h3 className="text-lg font-medium text-gray-900">Medical Specializations</h3>
            <span className="text-sm text-gray-500">({formData.specializations.length})</span>
          </div>
          {expandedSections.specializations ? (
            <ChevronUp className="w-5 h-5 text-gray-400" />
          ) : (
            <ChevronDown className="w-5 h-5 text-gray-400" />
          )}
        </div>
        
        {expandedSections.specializations && (
          <div className="space-y-4">
            <div className="flex gap-2">
              <input 
                type="text" 
                value={specializationInput}
                onChange={(e) => setSpecializationInput(e.target.value)}
                onKeyDown={(e) => { 
                  if (e.key === 'Enter') { 
                    e.preventDefault(); 
                    handleAdd(specializationInput, setSpecializationInput, formData.specializations, (newList) => setFormData(prev => ({ ...prev, specializations: newList })))
                  }
                }}
                placeholder="Add specialization and press Enter" 
                className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 placeholder-gray-500" 
              />
              <button 
                type="button" 
                onClick={() => handleAdd(specializationInput, setSpecializationInput, formData.specializations, (newList) => setFormData(prev => ({ ...prev, specializations: newList })))}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
              >
                Add
              </button>
            </div>
            <div className="flex flex-wrap gap-2">
              {formData.specializations.map((item, idx) => (
                editingItem.field === 'specializations' && editingItem.index === idx ? (
                  <div key={idx} className="w-full flex gap-2 items-center flex-wrap">
                    <input type="text" value={editValue} onChange={(e) => setEditValue(e.target.value)} onKeyDown={(e) => { if (e.key === 'Enter') { handleUpdate(formData.specializations, (nl) => setFormData(prev => ({ ...prev, specializations: nl })), idx, editValue); setEditingItem({ field: null, index: -1 }); setEditValue(''); } if (e.key === 'Escape') { setEditingItem({ field: null, index: -1 }); setEditValue(''); } }} className="flex-1 min-w-0 px-3 py-2 border border-blue-300 rounded-md text-sm text-gray-900 bg-white placeholder-gray-400" autoFocus />
                    <button type="button" onClick={() => { handleUpdate(formData.specializations, (nl) => setFormData(prev => ({ ...prev, specializations: nl })), idx, editValue); setEditingItem({ field: null, index: -1 }); setEditValue(''); }} className="px-3 py-1.5 bg-blue-600 text-white rounded-md text-sm whitespace-nowrap flex-shrink-0">Save</button>
                    <button type="button" onClick={() => { setEditingItem({ field: null, index: -1 }); setEditValue(''); }} className="px-3 py-1.5 text-gray-600 rounded-md text-sm whitespace-nowrap flex-shrink-0 border border-gray-300 bg-white hover:bg-gray-50">Cancel</button>
                  </div>
                ) : (
                  <span key={idx} className="bg-blue-100 text-blue-800 px-3 py-1 rounded-md flex items-center gap-1 break-words max-w-full">
                    {item}
                    <button type="button" onClick={() => setEditingItem({ field: 'specializations', index: idx })} className="ml-1 text-blue-600 hover:text-blue-800 flex-shrink-0" title="Edit"><Pencil className="w-3.5 h-3.5" /></button>
                    <button type="button" onClick={() => handleRemove(item, formData.specializations, (newList) => setFormData(prev => ({ ...prev, specializations: newList })))} className="text-blue-500 hover:text-red-500 flex-shrink-0 p-0.5" title="Remove"><X className="w-3.5 h-3.5" /></button>
                  </span>
                )
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Professional Experience */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <div 
          className="flex items-center justify-between mb-4 cursor-pointer hover:bg-gray-50 p-2 rounded-md transition-colors"
          onClick={() => toggleSection('professionalExperience')}
        >
          <div className="flex items-center space-x-2">
            <Briefcase className="w-5 h-5 text-gray-600" />
            <h3 className="text-lg font-medium text-gray-900">Professional Experience</h3>
            <span className="text-sm text-gray-500">({formData.professionalExperience?.length || 0})</span>
          </div>
          {expandedSections.professionalExperience ? (
            <ChevronUp className="w-5 h-5 text-gray-400" />
          ) : (
            <ChevronDown className="w-5 h-5 text-gray-400" />
          )}
        </div>
        
        {expandedSections.professionalExperience && (
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <input 
                type="text" 
                value={professionalExperienceInput.position || ''}
                onChange={(e) => setProfessionalExperienceInput(prev => ({ ...prev, position: e.target.value }))}
                placeholder="Position (e.g., Senior Consultant)" 
                className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 placeholder-gray-500" 
              />
              <input 
                type="text" 
                value={professionalExperienceInput.institution || ''}
                onChange={(e) => setProfessionalExperienceInput(prev => ({ ...prev, institution: e.target.value }))}
                placeholder="Institution (e.g., Fortis Memorial Research Institute)" 
                className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 placeholder-gray-500" 
              />
              <input 
                type="text" 
                value={professionalExperienceInput.duration || ''}
                onChange={(e) => setProfessionalExperienceInput(prev => ({ ...prev, duration: e.target.value }))}
                placeholder="Duration (e.g., 24+ years)" 
                className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 placeholder-gray-500" 
              />
            </div>
            <div className="flex gap-2">
              <button 
                type="button" 
                onClick={() => handleAddProfessionalExperience()}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
              >
                Add Experience
              </button>
            </div>
            <div className="space-y-2">
              {formData.professionalExperience?.map((exp, idx) => (
                editingExpIdx === idx ? (
                  <div key={idx} className="bg-gray-50 p-3 rounded-md space-y-3">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <input type="text" value={editingExpForm.position} onChange={(e) => setEditingExpForm(f => ({ ...f, position: e.target.value }))} placeholder="Position" className="px-3 py-2 border border-gray-300 rounded-md text-sm text-gray-900 placeholder-gray-500 bg-white" />
                      <input type="text" value={editingExpForm.institution} onChange={(e) => setEditingExpForm(f => ({ ...f, institution: e.target.value }))} placeholder="Institution" className="px-3 py-2 border border-gray-300 rounded-md text-sm text-gray-900 placeholder-gray-500 bg-white" />
                      <input type="text" value={editingExpForm.duration} onChange={(e) => setEditingExpForm(f => ({ ...f, duration: e.target.value }))} placeholder="Duration" className="px-3 py-2 border border-gray-300 rounded-md text-sm text-gray-900 placeholder-gray-500 bg-white" />
                    </div>
                    <div className="flex gap-2">
                      <button type="button" onClick={() => { handleUpdateProfessionalExperience(idx, editingExpForm.position, editingExpForm.institution, editingExpForm.duration); setEditingExpIdx(-1); setEditingExpForm({ position: '', institution: '', duration: '' }); }} className="px-3 py-1 bg-blue-600 text-white rounded-md text-sm">Update</button>
                      <button type="button" onClick={() => { setEditingExpIdx(-1); setEditingExpForm({ position: '', institution: '', duration: '' }); }} className="px-3 py-1 text-gray-600 rounded-md text-sm">Cancel</button>
                    </div>
                  </div>
                ) : (
                  <div key={idx} className="bg-gray-50 p-3 rounded-md flex items-center justify-between">
                    <div>
                      <span className="font-semibold text-gray-800">{exp.position}</span>
                      <span className="text-gray-600"> at {exp.institution}</span>
                      <span className="text-gray-500"> ({exp.duration})</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <button type="button" onClick={() => { setEditingExpIdx(idx); setEditingExpForm({ position: exp.position, institution: exp.institution, duration: exp.duration }); }} className="text-blue-600 hover:text-blue-800 p-1" title="Edit"><Pencil className="w-4 h-4" /></button>
                      <button type="button" onClick={() => handleRemoveProfessionalExperience(idx)} className="text-red-500 hover:text-red-700"><Trash2 className="w-4 h-4" /></button>
                    </div>
                  </div>
                )
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Degrees */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <div 
          className="flex items-center justify-between mb-4 cursor-pointer hover:bg-gray-50 p-2 rounded-md transition-colors"
          onClick={() => toggleSection('degrees')}
        >
          <div className="flex items-center space-x-2">
            <Award className="w-5 h-5 text-gray-600" />
            <h3 className="text-lg font-medium text-gray-900">Educational Degrees</h3>
            <span className="text-sm text-gray-500">({formData.degrees?.length || 0})</span>
          </div>
          {expandedSections.degrees ? (
            <ChevronUp className="w-5 h-5 text-gray-400" />
          ) : (
            <ChevronDown className="w-5 h-5 text-gray-400" />
          )}
        </div>
        
        {expandedSections.degrees && (
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
              <input
                type="text"
                value={degreeNameInput}
                onChange={(e) => setDegreeNameInput(e.target.value)}
                placeholder="Degree Name (e.g., MBBS, MD)"
                className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 placeholder-gray-500"
              />
              <input
                type="text"
                value={degreeInstitutionInput}
                onChange={(e) => setDegreeInstitutionInput(e.target.value)}
                placeholder="Institution (e.g., AIIMS Delhi)"
                className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 placeholder-gray-500"
              />
              <input
                type="text"
                value={degreeYearInput}
                onChange={(e) => setDegreeYearInput(e.target.value)}
                placeholder="Year (e.g., 2015)"
                className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 placeholder-gray-500"
              />
              <button
                type="button"
                onClick={addDegree}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
              >
                Add Degree
              </button>
            </div>
            <div className="space-y-2">
              {formData.degrees?.map((degree, idx) => (
                editingDegreeIdx === idx ? (
                  <div key={idx} className="bg-gray-50 p-3 rounded-md space-y-3">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
                      <input type="text" value={editingDegreeForm.name} onChange={(e) => setEditingDegreeForm(f => ({ ...f, name: e.target.value }))} placeholder="Degree Name" className="px-3 py-2 border border-gray-300 rounded-md text-sm text-gray-900 placeholder-gray-500 bg-white" />
                      <input type="text" value={editingDegreeForm.institution} onChange={(e) => setEditingDegreeForm(f => ({ ...f, institution: e.target.value }))} placeholder="Institution" className="px-3 py-2 border border-gray-300 rounded-md text-sm text-gray-900 placeholder-gray-500 bg-white" />
                      <input type="text" value={editingDegreeForm.year} onChange={(e) => setEditingDegreeForm(f => ({ ...f, year: e.target.value }))} placeholder="Year" className="px-3 py-2 border border-gray-300 rounded-md text-sm text-gray-900 placeholder-gray-500 bg-white" />
                    </div>
                    <div className="flex gap-2">
                      <button type="button" onClick={() => { handleUpdateDegree(idx, editingDegreeForm.name, editingDegreeForm.institution, editingDegreeForm.year); setEditingDegreeIdx(-1); setEditingDegreeForm({ name: '', institution: '', year: '' }); }} className="px-3 py-1 bg-blue-600 text-white rounded-md text-sm">Update</button>
                      <button type="button" onClick={() => { setEditingDegreeIdx(-1); setEditingDegreeForm({ name: '', institution: '', year: '' }); }} className="px-3 py-1 text-gray-600 rounded-md text-sm">Cancel</button>
                    </div>
                  </div>
                ) : (
                  <div key={idx} className="bg-gray-50 p-3 rounded-md flex items-center justify-between">
                    <div className="flex-1">
                      <span className="font-medium text-gray-900">{degree.name}</span>
                      <span className="text-gray-600 ml-2">from {degree.institution}</span>
                      <span className="text-gray-500 ml-2">({degree.year})</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <button type="button" onClick={() => { setEditingDegreeIdx(idx); setEditingDegreeForm({ name: degree.name, institution: degree.institution || '', year: degree.year || '' }); }} className="text-blue-600 hover:text-blue-800 p-1" title="Edit"><Pencil className="w-4 h-4" /></button>
                      <button type="button" onClick={() => handleRemoveDegree(idx)} className="text-red-500 hover:text-red-700"><Trash2 className="w-4 h-4" /></button>
                    </div>
                  </div>
                )
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Languages */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <div 
          className="flex items-center justify-between mb-4 cursor-pointer hover:bg-gray-50 p-2 rounded-md transition-colors"
          onClick={() => toggleSection('languages')}
        >
          <div className="flex items-center space-x-2">
            <Globe className="w-5 h-5 text-gray-600" />
            <h3 className="text-lg font-medium text-gray-900">Languages</h3>
            <span className="text-sm text-gray-500">({formData.languages.length})</span>
          </div>
          {expandedSections.languages ? (
            <ChevronUp className="w-5 h-5 text-gray-400" />
          ) : (
            <ChevronDown className="w-5 h-5 text-gray-400" />
          )}
        </div>

        {expandedSections.languages && (
          <div className="space-y-4">
            <div className="flex gap-2">
              <input 
                type="text" 
                value={languageInput}
                onChange={(e) => setLanguageInput(e.target.value)}
                onKeyDown={(e) => { 
                  if (e.key === 'Enter') { 
                    e.preventDefault(); 
                    handleAdd(languageInput, setLanguageInput, formData.languages, (newList) => setFormData(prev => ({ ...prev, languages: newList })))
                  }
                }}
                placeholder="Add language and press Enter" 
                className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 placeholder-gray-500" 
              />
              <button 
                type="button" 
                onClick={() => handleAdd(languageInput, setLanguageInput, formData.languages, (newList) => setFormData(prev => ({ ...prev, languages: newList })))}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
              >
                Add
              </button>
            </div>
            <div className="flex flex-wrap gap-2">
              {formData.languages.map((item, idx) => (
                editingItem.field === 'languages' && editingItem.index === idx ? (
                  <div key={idx} className="w-full flex gap-2 items-center flex-wrap">
                    <input type="text" value={editValue} onChange={(e) => setEditValue(e.target.value)} onKeyDown={(e) => { if (e.key === 'Enter') { handleUpdate(formData.languages, (nl) => setFormData(prev => ({ ...prev, languages: nl })), idx, editValue); setEditingItem({ field: null, index: -1 }); setEditValue(''); } if (e.key === 'Escape') { setEditingItem({ field: null, index: -1 }); setEditValue(''); } }} className="flex-1 min-w-0 px-3 py-2 border border-purple-300 rounded-md text-sm text-gray-900 bg-white placeholder-gray-400" autoFocus />
                    <button type="button" onClick={() => { handleUpdate(formData.languages, (nl) => setFormData(prev => ({ ...prev, languages: nl })), idx, editValue); setEditingItem({ field: null, index: -1 }); setEditValue(''); }} className="px-3 py-1.5 bg-purple-600 text-white rounded-md text-sm whitespace-nowrap flex-shrink-0">Save</button>
                    <button type="button" onClick={() => { setEditingItem({ field: null, index: -1 }); setEditValue(''); }} className="px-3 py-1.5 text-gray-600 rounded-md text-sm whitespace-nowrap flex-shrink-0 border border-gray-300 bg-white hover:bg-gray-50">Cancel</button>
                  </div>
                ) : (
                  <span key={idx} className="bg-purple-100 text-purple-800 px-3 py-1 rounded-md flex items-center gap-1 break-words max-w-full">
                    {item}
                    <button type="button" onClick={() => setEditingItem({ field: 'languages', index: idx })} className="ml-1 text-purple-600 hover:text-purple-800 flex-shrink-0" title="Edit"><Pencil className="w-3.5 h-3.5" /></button>
                    <button type="button" onClick={() => handleRemove(item, formData.languages, (newList) => setFormData(prev => ({ ...prev, languages: newList })))} className="text-purple-500 hover:text-red-500 flex-shrink-0 p-0.5" title="Remove"><X className="w-3.5 h-3.5" /></button>
                  </span>
                )
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Awards */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Awards & Recognitions</h3>
        <div className="space-y-4">
          <div className="flex gap-2">
            <input 
              type="text" 
              value={awardInput}
              onChange={(e) => setAwardInput(e.target.value)}
              onKeyDown={(e) => { 
                if (e.key === 'Enter') { 
                  e.preventDefault(); 
                  handleAdd(awardInput, setAwardInput, formData.awards, (newList) => setFormData(prev => ({ ...prev, awards: newList })))
                }
              }}
              placeholder="Add award and press Enter" 
              className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 placeholder-gray-500" 
            />
            <button 
              type="button" 
              onClick={() => handleAdd(awardInput, setAwardInput, formData.awards, (newList) => setFormData(prev => ({ ...prev, awards: newList })))}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
            >
              Add
            </button>
          </div>
          <div className="flex flex-wrap gap-2">
            {formData.awards.map((item, idx) => (
              editingItem.field === 'awards' && editingItem.index === idx ? (
                <div key={idx} className="w-full flex gap-2 items-center flex-wrap">
                  <input type="text" value={editValue} onChange={(e) => setEditValue(e.target.value)} onKeyDown={(e) => { if (e.key === 'Enter') { handleUpdate(formData.awards, (nl) => setFormData(prev => ({ ...prev, awards: nl })), idx, editValue); setEditingItem({ field: null, index: -1 }); setEditValue(''); } if (e.key === 'Escape') { setEditingItem({ field: null, index: -1 }); setEditValue(''); } }} className="flex-1 min-w-0 px-3 py-2 border border-yellow-300 rounded-md text-sm text-gray-900 bg-white placeholder-gray-400" autoFocus />
                  <button type="button" onClick={() => { handleUpdate(formData.awards, (nl) => setFormData(prev => ({ ...prev, awards: nl })), idx, editValue); setEditingItem({ field: null, index: -1 }); setEditValue(''); }} className="px-3 py-1.5 bg-yellow-600 text-white rounded-md text-sm whitespace-nowrap flex-shrink-0">Save</button>
                  <button type="button" onClick={() => { setEditingItem({ field: null, index: -1 }); setEditValue(''); }} className="px-3 py-1.5 text-gray-600 rounded-md text-sm whitespace-nowrap flex-shrink-0 border border-gray-300 bg-white hover:bg-gray-50">Cancel</button>
                </div>
              ) : (
                <span key={idx} className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-md flex items-center gap-1 break-words max-w-full">
                  {item}
                  <button type="button" onClick={() => setEditingItem({ field: 'awards', index: idx })} className="ml-1 text-yellow-600 hover:text-yellow-800 flex-shrink-0" title="Edit"><Pencil className="w-3.5 h-3.5" /></button>
                  <button type="button" onClick={() => handleRemove(item, formData.awards, (newList) => setFormData(prev => ({ ...prev, awards: newList })))} className="text-yellow-500 hover:text-red-500 flex-shrink-0 p-0.5" title="Remove"><X className="w-3.5 h-3.5" /></button>
                </span>
              )
            ))}
          </div>
        </div>
      </div>

      {/* Publications */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <div 
          className="flex items-center justify-between mb-4 cursor-pointer hover:bg-gray-50 p-2 rounded-md transition-colors"
          onClick={() => toggleSection('publications')}
        >
          <div className="flex items-center space-x-2">
            <Info className="w-5 h-5 text-gray-600" />
            <h3 className="text-lg font-medium text-gray-900">Publications</h3>
            <span className="text-sm text-gray-500">({formData.publications.length})</span>
          </div>
          {expandedSections.publications ? (
            <ChevronUp className="w-5 h-5 text-gray-400" />
          ) : (
            <ChevronDown className="w-5 h-5 text-gray-400" />
          )}
        </div>
        {expandedSections.publications && (
          <div className="space-y-4">
            <div className="flex gap-2">
              <textarea
                value={publicationInput}
                onChange={(e) => setPublicationInput(e.target.value)}
                onKeyDown={(e) => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleAdd(publicationInput, setPublicationInput, formData.publications, (newList) => setFormData(prev => ({ ...prev, publications: newList }))); } }}
                placeholder="Add publication (Shift+Enter for new line, Enter to add)"
                rows={2}
                className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 placeholder-gray-500 resize-y min-h-[60px]"
              />
              <button type="button" onClick={() => handleAdd(publicationInput, setPublicationInput, formData.publications, (newList) => setFormData(prev => ({ ...prev, publications: newList })))} className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors self-start">Add</button>
            </div>
            <div className="space-y-2">
              {formData.publications.map((item, idx) => (
                editingItem.field === 'publications' && editingItem.index === idx ? (
                  <div key={idx} className="w-full flex gap-2 items-start flex-wrap">
                    <textarea value={editValue} onChange={(e) => setEditValue(e.target.value)} rows={3} className="flex-1 min-w-0 px-3 py-2 border border-indigo-300 rounded-md text-sm resize-y text-gray-900 bg-white placeholder-gray-400" autoFocus />
                    <div className="flex flex-col gap-1">
                      <button type="button" onClick={() => { handleUpdate(formData.publications, (nl) => setFormData(prev => ({ ...prev, publications: nl })), idx, editValue); setEditingItem({ field: null, index: -1 }); setEditValue(''); }} className="px-3 py-1.5 bg-indigo-600 text-white rounded-md text-sm whitespace-nowrap">Save</button>
                      <button type="button" onClick={() => { setEditingItem({ field: null, index: -1 }); setEditValue(''); }} className="px-3 py-1.5 text-gray-600 rounded-md text-sm whitespace-nowrap border border-gray-300 bg-white hover:bg-gray-50">Cancel</button>
                    </div>
                  </div>
                ) : (
                  <div key={idx} className="bg-indigo-50 text-indigo-800 px-3 py-2 rounded-md border border-indigo-200 flex items-start justify-between gap-2">
                    <p className="whitespace-pre-wrap break-words flex-1 min-w-0">{item}</p>
                    <div className="flex items-center gap-1 flex-shrink-0">
                      <button type="button" onClick={() => setEditingItem({ field: 'publications', index: idx })} className="text-indigo-600 hover:text-indigo-800" title="Edit"><Pencil className="w-3.5 h-3.5" /></button>
                      <button type="button" onClick={() => handleRemove(item, formData.publications, (newList) => setFormData(prev => ({ ...prev, publications: newList })))} className="text-indigo-500 hover:text-red-500 p-0.5" title="Remove"><X className="w-3.5 h-3.5" /></button>
                    </div>
                  </div>
                )
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Certifications */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <div 
          className="flex items-center justify-between mb-4 cursor-pointer hover:bg-gray-50 p-2 rounded-md transition-colors"
          onClick={() => toggleSection('certifications')}
        >
          <div className="flex items-center space-x-2">
            <Award className="w-5 h-5 text-gray-600" />
            <h3 className="text-lg font-medium text-gray-900">Certifications</h3>
            <span className="text-sm text-gray-500">({formData.certifications.length})</span>
          </div>
          {expandedSections.certifications ? (
            <ChevronUp className="w-5 h-5 text-gray-400" />
          ) : (
            <ChevronDown className="w-5 h-5 text-gray-400" />
          )}
        </div>
        {expandedSections.certifications && (
          <div className="space-y-4">
            <div className="flex gap-2">
              <textarea
                value={certificationInput}
                onChange={(e) => setCertificationInput(e.target.value)}
                onKeyDown={(e) => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleAdd(certificationInput, setCertificationInput, formData.certifications, (newList) => setFormData(prev => ({ ...prev, certifications: newList }))); } }}
                placeholder="Add certification (Shift+Enter for new line, Enter to add)"
                rows={2}
                className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 placeholder-gray-500 resize-y min-h-[60px]"
              />
              <button type="button" onClick={() => handleAdd(certificationInput, setCertificationInput, formData.certifications, (newList) => setFormData(prev => ({ ...prev, certifications: newList })))} className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors self-start">Add</button>
            </div>
            <div className="space-y-2">
              {formData.certifications.map((item, idx) => (
                editingItem.field === 'certifications' && editingItem.index === idx ? (
                  <div key={idx} className="w-full flex gap-2 items-start flex-wrap">
                    <textarea value={editValue} onChange={(e) => setEditValue(e.target.value)} rows={3} className="flex-1 min-w-0 px-3 py-2 border border-teal-300 rounded-md text-sm resize-y text-gray-900 bg-white placeholder-gray-400" autoFocus />
                    <div className="flex flex-col gap-1">
                      <button type="button" onClick={() => { handleUpdate(formData.certifications, (nl) => setFormData(prev => ({ ...prev, certifications: nl })), idx, editValue); setEditingItem({ field: null, index: -1 }); setEditValue(''); }} className="px-3 py-1.5 bg-teal-600 text-white rounded-md text-sm whitespace-nowrap">Save</button>
                      <button type="button" onClick={() => { setEditingItem({ field: null, index: -1 }); setEditValue(''); }} className="px-3 py-1.5 text-gray-600 rounded-md text-sm whitespace-nowrap border border-gray-300 bg-white hover:bg-gray-50">Cancel</button>
                    </div>
                  </div>
                ) : (
                  <div key={idx} className="bg-teal-50 text-teal-800 px-3 py-2 rounded-md border border-teal-200 flex items-start justify-between gap-2">
                    <p className="whitespace-pre-wrap break-words flex-1 min-w-0">{item}</p>
                    <div className="flex items-center gap-1 flex-shrink-0">
                      <button type="button" onClick={() => setEditingItem({ field: 'certifications', index: idx })} className="text-teal-600 hover:text-teal-800" title="Edit"><Pencil className="w-3.5 h-3.5" /></button>
                      <button type="button" onClick={() => handleRemove(item, formData.certifications, (newList) => setFormData(prev => ({ ...prev, certifications: newList })))} className="text-teal-500 hover:text-red-500 p-0.5" title="Remove"><X className="w-3.5 h-3.5" /></button>
                    </div>
                  </div>
                )
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Step Controls (Profile tab) */}
      <div className="flex justify-between items-center pt-4">
        <button
          type="button"
          onClick={goBack}
          className="px-6 py-3 rounded-lg border text-sm font-medium transition-colors border-gray-300 text-gray-700 hover:bg-gray-50"
        >
          Back
        </button>
        <button
          type="button"
          onClick={submitUpdate}
          className={`px-8 py-3 rounded-lg transition-colors font-medium text-white ${saving ? 'bg-blue-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'}`}
          disabled={saving}
        >
          {saving ? 'Saving...' : 'Save Changes'}
        </button>
      </div>
      </div>
  )
}

