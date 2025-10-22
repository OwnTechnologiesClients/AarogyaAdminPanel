"use client"

import { useState, useEffect } from 'react'
import { Layout } from "@/components/layout"
import Swal from 'sweetalert2'
import { Briefcase, User, Building2, Star, Users, Bed, Calendar, Mail, Phone, Globe, MapPin, Award, Info, Navigation, Plus, Trash2, Stethoscope, Microscope, Camera, ChevronDown, ChevronUp } from "lucide-react"
import { useRouter } from 'next/navigation'
import HospitalApi from '@/lib/api/hospitalApi'

export default function AddHospital() {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState('hospital-details')
  const [galleryPreviews, setGalleryPreviews] = useState([])
  const [expandedSections, setExpandedSections] = useState({
    specialties: true,
    features: true,
    equipment: true,
    gallery: true
  })

  const [formData, setFormData] = useState({
    id: '',
    name: '',
    rating: {
      userScore: '',
      googleRating: ''
    },
    location: '',
    address: '',
    doctorsCount: '',
    established: '',
    accreditation: [],
    contact: {
      website: '',
      address: ''
    },
    specialties: [],
    hospitalFeatures: [],
    advancedMedicalEquipment: [],
    about: {
      description: '',
      vision: '',
      mission: ''
    },
    overview: {
      founded: '',
      patients: '',
      doctors: '',
      clinicType: [],
      typeOfCare: [],
      ageGroup: [],
      sizeAndCapacity: {
        ot: '',
        icu: '',
        patientBeds: ''
      }
    },
    howToReach: '',
    operatingHours: {
      emergency: '',
      opd: ''
    },
    gallery: [],
    isActive: false // Default to disabled, admin will enable from list page
  })

  const [submitting, setSubmitting] = useState(false)

  // Helper functions for form management
  const toggleSection = (section) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }))
  }

  useEffect(() => {
    // Cleanup existing object URLs
    galleryPreviews.forEach((url) => {
      if (url && url.startsWith('blob:')) URL.revokeObjectURL(url)
    })

    // Generate new previews for gallery items
    const newPreviews = formData.gallery.map((item) => {
      if (item && typeof item === 'object' && item instanceof File) {
        return URL.createObjectURL(item)
      }
      return null
    })
    setGalleryPreviews(newPreviews)

    // Cleanup function
    return () => {
      newPreviews.forEach((url) => {
        if (url && url.startsWith('blob:')) URL.revokeObjectURL(url)
      })
    }
  }, [formData.gallery])

  const updateSpecialty = (idx, field, value) => {
    const updated = [...formData.specialties]
    if (field === 'keyServices') {
      // Store the raw input value for keyServices
      updated[idx] = { ...updated[idx], [field]: value }
    } else {
      updated[idx] = { ...updated[idx], [field]: value }
    }
    setFormData(prev => ({ ...prev, specialties: updated }))
  }

  const processKeyServices = (keyServicesValue) => {
    // Convert comma-separated string to array when submitting
    if (typeof keyServicesValue === 'string') {
      return keyServicesValue.split(',').map(s => s.trim()).filter(s => s)
    }
    return Array.isArray(keyServicesValue) ? keyServicesValue : []
  }

  const addSpecialty = () => {
    setFormData(prev => ({ 
      ...prev, 
      specialties: [...prev.specialties, { name: '', doctorsCount: '', description: '', keyServices: '' }] 
    }))
  }

  const removeSpecialty = (idx) => {
    setFormData(prev => ({ ...prev, specialties: prev.specialties.filter((_, i) => i !== idx) }))
  }

  const updateHospitalFeature = (idx, field, value) => {
    const updated = [...(formData.hospitalFeatures || [])]
    updated[idx] = { ...updated[idx], [field]: value }
    setFormData(prev => ({ ...prev, hospitalFeatures: updated }))
  }

  const addHospitalFeature = () => {
    setFormData(prev => ({ 
      ...prev, 
      hospitalFeatures: [...(prev.hospitalFeatures || []), { name: '', description: '' }] 
    }))
  }

  const removeHospitalFeature = (idx) => {
    setFormData(prev => ({ ...prev, hospitalFeatures: (prev.hospitalFeatures || []).filter((_, i) => i !== idx) }))
  }

  const updateAdvancedEquipment = (idx, field, value) => {
    const updated = [...(formData.advancedMedicalEquipment || [])]
    updated[idx] = { ...updated[idx], [field]: value }
    setFormData(prev => ({ ...prev, advancedMedicalEquipment: updated }))
  }

  const addAdvancedEquipment = () => {
    setFormData(prev => ({ 
      ...prev, 
      advancedMedicalEquipment: [...(prev.advancedMedicalEquipment || []), { name: '', description: '' }] 
    }))
  }

  const removeAdvancedEquipment = (idx) => {
    setFormData(prev => ({ ...prev, advancedMedicalEquipment: (prev.advancedMedicalEquipment || []).filter((_, i) => i !== idx) }))
  }

  const updateGalleryItem = (idx, file) => {
    const updated = [...formData.gallery]
    updated[idx] = file
    setFormData(prev => ({ ...prev, gallery: updated }))
  }

  const addGalleryItems = (files) => {
    if (files && files.length > 0) {
      const fileArray = Array.from(files)
      setFormData(prev => ({ ...prev, gallery: [...prev.gallery, ...fileArray] }))
    }
  }

  const removeGalleryItem = (idx) => {
    setFormData(prev => ({ ...prev, gallery: prev.gallery.filter((_, i) => i !== idx) }))
  }

  const submitHospital = async () => {
    if (submitting) return
    // Basic validation
    if (!formData.id || !formData.name || !formData.location) {
      await Swal.fire({
        title: 'Validation Error!',
        text: 'Please fill required fields: ID, Name, Location',
        icon: 'warning',
        confirmButtonText: 'OK'
      })
      return
    }

    // Validate Hospital Features
    const invalidFeatures = (formData.hospitalFeatures || []).filter((ft, idx) => !ft.name || ft.name.trim() === '');
    if (invalidFeatures.length > 0) {
      await Swal.fire({
        title: 'Validation Error!',
        text: 'Please provide names for all Hospital Features (marked with *)',
        icon: 'warning',
        confirmButtonText: 'OK'
      })
      return
    }

    // Validate Advanced Medical Equipment
    const invalidEquipment = (formData.advancedMedicalEquipment || []).filter((eq, idx) => !eq.name || eq.name.trim() === '');
    if (invalidEquipment.length > 0) {
      await Swal.fire({
        title: 'Validation Error!',
        text: 'Please provide names for all Medical Equipment (marked with *)',
        icon: 'warning',
        confirmButtonText: 'OK'
      })
      return
    }

    // Main image is optional - no validation needed

    setSubmitting(true)
    try {
      const fd = new FormData()
      fd.append('id', (formData.id || '').toUpperCase())
      fd.append('name', formData.name || '')
      fd.append('location', formData.location || '')
      fd.append('address', formData.contact?.address || '')
      fd.append('established', formData.overview?.founded || '')
      if (formData.rating?.userScore !== '') fd.append('userScore', String(Number(formData.rating.userScore)))
      if (formData.rating?.googleRating !== '') fd.append('googleRating', String(Number(formData.rating.googleRating)))
      fd.append('doctorsCount', String(Number(formData.overview?.doctors || 0)))
      ;(formData.gallery || []).filter(Boolean).forEach((file) => {
        fd.append('gallery', file)
      })
      fd.append('accreditation', JSON.stringify(formData.accreditation || []))
      fd.append('contact', JSON.stringify(formData.contact || {}))
      fd.append('isActive', formData.isActive)
      fd.append('operatingHours', JSON.stringify(formData.operatingHours || {}))
      fd.append('specialties', JSON.stringify((formData.specialties || []).map(s => ({
        name: s.name || '',
        doctorsCount: s.doctorsCount ? Number(s.doctorsCount) : undefined,
        description: s.description || '',
        keyServices: processKeyServices(s.keyServices),
        icon: s.icon || ''
      }))))
      fd.append('hospitalFeatures', JSON.stringify(formData.hospitalFeatures || []))
      fd.append('advancedMedicalEquipment', JSON.stringify(formData.advancedMedicalEquipment || []))
      fd.append('about', JSON.stringify(formData.about || {}))
      fd.append('overview', JSON.stringify(formData.overview || {}))
      fd.append('howToReach', formData.howToReach || '')

      await HospitalApi.create(fd)

      await Swal.fire({
        title: 'Success!',
        text: 'Hospital created successfully!',
        icon: 'success',
        confirmButtonText: 'OK'
      })
      
      // Redirect to hospitals list page
      router.push('/hospital')
    } catch (err) {
      console.error(err)
      await Swal.fire({
        title: 'Error!',
        text: err?.message || 'Failed to create hospital',
        icon: 'error',
        confirmButtonText: 'OK'
      })
    } finally {
      setSubmitting(false)
    }
  }

  const tabs = [
    { id: 'hospital-details', label: 'Hospital Details', icon: Briefcase },
    { id: 'profile-bio', label: 'Profile & Bio', icon: User },
  ]

  const goNext = () => setActiveTab('profile-bio')
  const goBack = () => setActiveTab('hospital-details')

  return (
    <Layout>
      <div className="space-y-6">
        {/* Tabs */}
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

        {/* Tab Content (keep both mounted so inputs persist) */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className={activeTab === 'hospital-details' ? 'block' : 'hidden'}>
            <div className="space-y-6">
              <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
                {/* Page Header */}
                <div className="bg-white rounded-lg border border-gray-200 p-6">
                  <div className="flex items-center space-x-3 mb-2">
                    <Building2 className="w-6 h-6 text-gray-600" />
                    <h2 className="text-xl font-semibold text-gray-900">Hospital Information</h2>
                  </div>
                  <p className="text-gray-600">Complete the basic details about your hospital</p>
                </div>

                {/* Basic Information */}
                <div className="bg-white rounded-lg border border-gray-200 p-6">
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Basic Information</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <label className="block text-sm font-medium text-gray-700">Hospital ID *</label>
                      <input 
                        type="text" 
                        placeholder="e.g., APOLLO_001" 
                        value={formData.id}
                        onChange={(e) => {
                          const value = e.target.value.toUpperCase().replace(/[^A-Z0-9_-]/g, '');
                          setFormData(prev => ({ ...prev, id: value }));
                        }}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 placeholder-gray-500"
                        required
                      />
                      <p className="text-xs text-gray-500">Only letters, numbers, hyphens, and underscores allowed</p>
                    </div>
                    <div className="space-y-2">
                      <label className="block text-sm font-medium text-gray-700">Hospital Name *</label>
                      <input 
                        type="text" 
                        placeholder="e.g., Apollo Hospital" 
                        value={formData.name}
                        onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
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
                      <label className="block text-sm font-medium text-gray-700">Year Founded</label>
                      <input 
                        type="text" 
                        placeholder="e.g., 1983" 
                        value={formData.overview?.founded || ''}
                        onChange={(e) => setFormData(prev => ({ 
                          ...prev, 
                          overview: { ...prev.overview, founded: e.target.value }
                        }))}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 placeholder-gray-500"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="block text-sm font-medium text-gray-700">Annual Patients</label>
                      <input 
                        type="text" 
                        placeholder="e.g., 50,000+ patients annually" 
                        value={formData.overview?.patients || ''}
                        onChange={(e) => setFormData(prev => ({ 
                          ...prev, 
                          overview: { ...prev.overview, patients: e.target.value }
                        }))}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 placeholder-gray-500"
                      />
                    </div>
                  </div>
                </div>


                {/* Hospital Classification */}
                <div className="bg-white rounded-lg border border-gray-200 p-6">
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Hospital Classification</h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Clinic Type</label>
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                        {['Multi-Specialty', 'Super Specialty', 'General', 'Specialty', 'Chain', 'Standalone'].map((type) => {
                          const selected = (formData.overview?.clinicType || []).includes(type)
                          return (
                            <button
                              type="button"
                              key={type}
                              onClick={() => setFormData(prev => ({
                                ...prev,
                                overview: {
                                  ...prev.overview,
                                  clinicType: selected
                                    ? (prev.overview?.clinicType || []).filter(t => t !== type)
                                    : [...(prev.overview?.clinicType || []), type]
                                }
                              }))}
                              className={`px-3 py-2 rounded-md border text-sm font-medium transition-colors ${
                                selected 
                                  ? 'bg-blue-600 text-white border-blue-600' 
                                  : 'border-gray-300 text-gray-700 hover:bg-gray-50'
                              }`}
                            >
                              {type}
                            </button>
                          )
                        })}
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Type of Care</label>
                      <div className="grid grid-cols-2 gap-2">
                        {['Emergency', 'Outpatient', 'Inpatient', 'Both'].map((type) => {
                          const selected = (formData.overview?.typeOfCare || []).includes(type)
                          return (
                            <button
                              type="button"
                              key={type}
                              onClick={() => setFormData(prev => ({
                                ...prev,
                                overview: {
                                  ...prev.overview,
                                  typeOfCare: selected
                                    ? (prev.overview?.typeOfCare || []).filter(t => t !== type)
                                    : [...(prev.overview?.typeOfCare || []), type]
                                }
                              }))}
                              className={`px-3 py-2 rounded-md border text-sm font-medium transition-colors ${
                                selected 
                                  ? 'bg-blue-600 text-white border-blue-600' 
                                  : 'border-gray-300 text-gray-700 hover:bg-gray-50'
                              }`}
                            >
                              {type}
                            </button>
                          )
                        })}
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Age Groups Served</label>
                      <div className="grid grid-cols-2 gap-2">
                        {['Pediatric', 'Adult', 'Geriatric', 'All Ages'].map((age) => {
                          const selected = (formData.overview?.ageGroup || []).includes(age)
                          return (
                            <button
                              type="button"
                              key={age}
                              onClick={() => setFormData(prev => ({
                                ...prev,
                                overview: {
                                  ...prev.overview,
                                  ageGroup: selected
                                    ? (prev.overview?.ageGroup || []).filter(a => a !== age)
                                    : [...(prev.overview?.ageGroup || []), age]
                                }
                              }))}
                              className={`px-3 py-2 rounded-md border text-sm font-medium transition-colors ${
                                selected 
                                  ? 'bg-blue-600 text-white border-blue-600' 
                                  : 'border-gray-300 text-gray-700 hover:bg-gray-50'
                              }`}
                            >
                              {age}
                            </button>
                          )
                        })}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Ratings */}
                <div className="bg-white rounded-lg border border-gray-200 p-6">
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Ratings</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="block text-sm font-medium text-gray-700">User Score (0-10)</label>
                      <input 
                        type="number" 
                        step="0.1"
                        min="0"
                        max="10"
                        placeholder="9.7" 
                        value={formData.rating?.userScore || ''}
                        onChange={(e) => setFormData(prev => ({ 
                          ...prev, 
                          rating: { ...prev.rating, userScore: e.target.value }
                        }))}
                        onWheel={(e) => e.target.blur()}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 placeholder-gray-500"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="block text-sm font-medium text-gray-700">Google Rating (0-5)</label>
                      <input 
                        type="number" 
                        step="0.1"
                        min="0"
                        max="5"
                        placeholder="4.7" 
                        value={formData.rating?.googleRating || ''}
                        onChange={(e) => setFormData(prev => ({ 
                          ...prev, 
                          rating: { ...prev.rating, googleRating: e.target.value }
                        }))}
                        onWheel={(e) => e.target.blur()}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 placeholder-gray-500"
                      />
                    </div>
                  </div>
                </div>

                {/* Size and Capacity */}
                <div className="bg-white rounded-lg border border-gray-200 p-6">
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Size and Capacity</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    <div className="space-y-2">
                      <label className="block text-sm font-medium text-gray-700">Total Doctors</label>
                      <input 
                        type="number" 
                        placeholder="600" 
                        value={formData.overview?.doctors || ''}
                        onChange={(e) => setFormData(prev => ({ 
                          ...prev, 
                          overview: { ...prev.overview, doctors: e.target.value }
                        }))}
                        onWheel={(e) => e.target.blur()}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 placeholder-gray-500"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="block text-sm font-medium text-gray-700">Operation Theaters</label>
                      <input 
                        type="number" 
                        placeholder="20" 
                        value={formData.overview?.sizeAndCapacity?.ot || ''}
                        onChange={(e) => setFormData(prev => ({ 
                          ...prev, 
                          overview: { 
                            ...prev.overview, 
                            sizeAndCapacity: { ...prev.overview?.sizeAndCapacity, ot: e.target.value }
                          }
                        }))}
                        onWheel={(e) => e.target.blur()}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 placeholder-gray-500"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="block text-sm font-medium text-gray-700">ICU Beds</label>
                      <input 
                        type="number" 
                        placeholder="50" 
                        value={formData.overview?.sizeAndCapacity?.icu || ''}
                        onChange={(e) => setFormData(prev => ({ 
                          ...prev, 
                          overview: { 
                            ...prev.overview, 
                            sizeAndCapacity: { ...prev.overview?.sizeAndCapacity, icu: e.target.value }
                          }
                        }))}
                        onWheel={(e) => e.target.blur()}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 placeholder-gray-500"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="block text-sm font-medium text-gray-700">Patient Beds</label>
                      <input 
                        type="number" 
                        placeholder="600" 
                        value={formData.overview?.sizeAndCapacity?.patientBeds || ''}
                        onChange={(e) => setFormData(prev => ({ 
                          ...prev, 
                          overview: { 
                            ...prev.overview, 
                            sizeAndCapacity: { ...prev.overview?.sizeAndCapacity, patientBeds: e.target.value }
                          }
                        }))}
                        onWheel={(e) => e.target.blur()}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 placeholder-gray-500"
                      />
                    </div>
                  </div>
                </div>

                {/* About Hospital */}
                <div className="bg-white rounded-lg border border-gray-200 p-6">
                  <h3 className="text-lg font-medium text-gray-900 mb-4">About Hospital</h3>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <label className="block text-sm font-medium text-gray-700">Description</label>
                      <textarea 
                        rows="4"
                        placeholder="Provide a comprehensive description of your hospital..." 
                        value={formData.about?.description || ''}
                        onChange={(e) => setFormData(prev => ({ 
                          ...prev, 
                          about: { ...prev.about, description: e.target.value }
                        }))}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 placeholder-gray-500 resize-none"
                      />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label className="block text-sm font-medium text-gray-700">Vision Statement</label>
                        <textarea 
                          rows="3"
                          placeholder="Enter your hospital's vision statement..." 
                          value={formData.about?.vision || ''}
                          onChange={(e) => setFormData(prev => ({ 
                            ...prev, 
                            about: { ...prev.about, vision: e.target.value }
                          }))}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 placeholder-gray-500 resize-none"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="block text-sm font-medium text-gray-700">Mission Statement</label>
                        <textarea 
                          rows="3"
                          placeholder="Enter your hospital's mission statement..." 
                          value={formData.about?.mission || ''}
                          onChange={(e) => setFormData(prev => ({ 
                            ...prev, 
                            about: { ...prev.about, mission: e.target.value }
                          }))}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 placeholder-gray-500 resize-none"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Accreditation */}
                <div className="bg-white rounded-lg border border-gray-200 p-6">
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Accreditation & Certifications</h3>
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-2">
                    {['JCI','NABH','NABL','ISO','CAP'].map((acc) => {
                      const selected = (formData.accreditation || []).includes(acc)
                      return (
                        <button
                          type="button"
                          key={acc}
                          onClick={() => setFormData(prev => ({
                            ...prev,
                            accreditation: selected
                              ? (prev.accreditation || []).filter(a => a !== acc)
                              : [...(prev.accreditation || []), acc]
                          }))}
                          className={`px-3 py-2 rounded-md border text-sm font-medium transition-colors ${
                            selected 
                              ? 'bg-blue-600 text-white border-blue-600' 
                              : 'border-gray-300 text-gray-700 hover:bg-gray-50'
                          }`}
                        >
                          {acc}
                        </button>
                      )
                    })}
                  </div>
                </div>

                {/* Contact Information */}
                <div className="bg-white rounded-lg border border-gray-200 p-6">
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Contact Information</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="block text-sm font-medium text-gray-700">Website</label>
                      <input 
                        type="text" 
                        placeholder="https://www.hospital.com" 
                        value={formData.contact?.website || ''}
                        onChange={(e) => setFormData(prev => ({ ...prev, contact: { ...prev.contact, website: e.target.value } }))}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 placeholder-gray-500"
                      />
                    </div>
                    <div className="md:col-span-2 space-y-2">
                      <label className="block text-sm font-medium text-gray-700">Full Address</label>
                      <textarea 
                        rows="3"
                        placeholder="Enter complete hospital address..." 
                        value={formData.contact?.address || ''}
                        onChange={(e) => setFormData(prev => ({ 
                          ...prev, 
                          contact: { ...prev.contact, address: e.target.value }
                        }))}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 placeholder-gray-500 resize-none"
                      />
                    </div>
                  </div>
                </div>

                {/* How to Reach */}
                <div className="bg-white rounded-lg border border-gray-200 p-6">
                  <h3 className="text-lg font-medium text-gray-900 mb-4">How to Reach Us</h3>
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">Directions & Transportation</label>
                    <textarea 
                      rows="4"
                      placeholder="Provide detailed directions, nearby landmarks, parking information..." 
                      value={formData.howToReach || ''}
                      onChange={(e) => setFormData(prev => ({ ...prev, howToReach: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 placeholder-gray-500 resize-none"
                    />
                  </div>
                </div>
              </form>
            </div>
          </div>
          <div className={activeTab === 'profile-bio' ? 'block' : 'hidden'}>
            <div className="space-y-6">
              {/* Specialties */}
              <div className="bg-white rounded-lg border border-gray-200 p-6">
                <div 
                  className="flex items-center justify-between mb-4 cursor-pointer hover:bg-gray-50 p-2 rounded-md transition-colors"
                  onClick={() => toggleSection('specialties')}
                >
                  <div className="flex items-center space-x-2">
                    <Stethoscope className="w-5 h-5 text-gray-600" />
                    <h3 className="text-lg font-medium text-gray-900">Medical Specialties</h3>
                    <span className="text-sm text-gray-500">({formData.specialties.length})</span>
                  </div>
                  {expandedSections.specialties ? (
                    <ChevronUp className="w-5 h-5 text-gray-400" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-gray-400" />
                  )}
                </div>
                
                {expandedSections.specialties && (
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                      {formData.specialties.map((sp, idx) => (
                        <div key={idx} className="border border-gray-200 rounded-lg p-4 bg-gray-50 hover:bg-gray-100 transition-colors">
                          <div className="flex items-center justify-between mb-3">
                            <h4 className="text-sm font-medium text-gray-700">Specialty #{idx + 1}</h4>
                            <button 
                              type="button" 
                              onClick={() => removeSpecialty(idx)} 
                              className="text-red-600 hover:text-red-800 text-sm font-medium"
                            >
                              Remove
                            </button>
                          </div>
                          
                          <div className="space-y-3">
                            <div className="space-y-1">
                              <label className="block text-xs font-medium text-gray-600">Specialty Name *</label>
                              <input 
                                type="text" 
                                placeholder="e.g., Cardiology" 
                                value={sp.name} 
                                onChange={(e) => updateSpecialty(idx, 'name', e.target.value)} 
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 placeholder-gray-500 text-sm" 
                              />
                            </div>
                            
                            <div className="grid grid-cols-1 gap-3">
                              <div className="space-y-1">
                                <label className="block text-xs font-medium text-gray-600">Number of Doctors</label>
                                <input 
                                  type="number" 
                                  min="0" 
                                  placeholder="25" 
                                  value={sp.doctorsCount} 
                                  onChange={(e) => updateSpecialty(idx, 'doctorsCount', e.target.value)} 
                                  onWheel={(e) => e.target.blur()}
                                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 placeholder-gray-500 text-sm" 
                                />
                              </div>
                            </div>
                            
                            <div className="space-y-1">
                              <label className="block text-xs font-medium text-gray-600">Description</label>
                              <textarea 
                                placeholder="Brief description of the specialty..." 
                                value={sp.description} 
                                onChange={(e) => updateSpecialty(idx, 'description', e.target.value)} 
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 placeholder-gray-500 text-sm resize-none" 
                                rows="2"
                              />
                            </div>
                            
                            <div className="space-y-1">
                              <label className="block text-xs font-medium text-gray-600">Key Services</label>
                              <input 
                                type="text" 
                                placeholder="Surgery, Consultation, Treatment (comma separated)" 
                                value={typeof sp.keyServices === 'string' ? sp.keyServices : (sp.keyServices || []).join(', ')} 
                                onChange={(e) => updateSpecialty(idx, 'keyServices', e.target.value)} 
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 placeholder-gray-500 text-sm" 
                              />
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                    
                    {formData.specialties.length === 0 && (
                      <div className="text-center py-8 text-gray-500">
                        <Stethoscope className="w-12 h-12 text-gray-300 mx-auto mb-2" />
                        <p className="text-sm">No specialties added yet</p>
                      </div>
                    )}
                    
                    <div className="mt-4">
                      <button 
                        type="button" 
                        onClick={addSpecialty} 
                        className="flex items-center space-x-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md text-sm transition-colors w-full justify-center"
                      >
                        <Plus className="w-4 h-4" />
                        <span>Add Specialty</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* Hospital Features */}
              <div className="bg-white rounded-lg border border-gray-200 p-6">
                <div 
                  className="flex items-center justify-between mb-4 cursor-pointer hover:bg-gray-50 p-2 rounded-md transition-colors"
                  onClick={() => toggleSection('features')}
                >
                  <div className="flex items-center space-x-2">
                    <Building2 className="w-5 h-5 text-gray-600" />
                    <h3 className="text-lg font-medium text-gray-900">Hospital Features & Facilities</h3>
                    <span className="text-sm text-gray-500">({(formData.hospitalFeatures || []).length})</span>
                  </div>
                  {expandedSections.features ? (
                    <ChevronUp className="w-5 h-5 text-gray-400" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-gray-400" />
                  )}
                </div>
                
                {expandedSections.features && (
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                      {(formData.hospitalFeatures || []).map((ft, idx) => (
                        <div key={idx} className="border border-gray-200 rounded-lg p-4 bg-gray-50 hover:bg-gray-100 transition-colors">
                          <div className="flex items-center justify-between mb-3">
                            <h4 className="text-sm font-medium text-gray-700">Feature #{idx + 1}</h4>
                            <button 
                              type="button" 
                              onClick={() => removeHospitalFeature(idx)} 
                              className="text-red-600 hover:text-red-800 text-sm font-medium"
                            >
                              Remove
                            </button>
                          </div>
                          
                          <div className="space-y-3">
                            <div className="space-y-1">
                              <label className="block text-xs font-medium text-gray-600">Feature Name *</label>
                              <input 
                                type="text" 
                                placeholder="e.g., 24/7 Emergency Services" 
                                value={ft.name} 
                                onChange={(e) => updateHospitalFeature(idx, 'name', e.target.value)} 
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 placeholder-gray-500 text-sm" 
                              />
                            </div>
                            
                            <div className="space-y-1">
                              <label className="block text-xs font-medium text-gray-600">Description</label>
                              <textarea 
                                placeholder="Describe this feature..." 
                                value={ft.description} 
                                onChange={(e) => updateHospitalFeature(idx, 'description', e.target.value)} 
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 placeholder-gray-500 text-sm resize-none" 
                                rows="2"
                              />
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                    
                    {(formData.hospitalFeatures || []).length === 0 && (
                      <div className="text-center py-8 text-gray-500">
                        <Building2 className="w-12 h-12 text-gray-300 mx-auto mb-2" />
                        <p className="text-sm">No hospital features added yet</p>
                      </div>
                    )}
                    
                    <div className="mt-4">
                      <button 
                        type="button" 
                        onClick={addHospitalFeature} 
                        className="flex items-center space-x-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md text-sm transition-colors w-full justify-center"
                      >
                        <Plus className="w-4 h-4" />
                        <span>Add Feature</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* Advanced Medical Equipment */}
              <div className="bg-white rounded-lg border border-gray-200 p-6">
                <div 
                  className="flex items-center justify-between mb-4 cursor-pointer hover:bg-gray-50 p-2 rounded-md transition-colors"
                  onClick={() => toggleSection('equipment')}
                >
                  <div className="flex items-center space-x-2">
                    <Microscope className="w-5 h-5 text-gray-600" />
                    <h3 className="text-lg font-medium text-gray-900">Advanced Medical Equipment</h3>
                    <span className="text-sm text-gray-500">({(formData.advancedMedicalEquipment || []).length})</span>
                  </div>
                  {expandedSections.equipment ? (
                    <ChevronUp className="w-5 h-5 text-gray-400" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-gray-400" />
                  )}
                </div>
                
                {expandedSections.equipment && (
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                      {(formData.advancedMedicalEquipment || []).map((eq, idx) => (
                        <div key={idx} className="border border-gray-200 rounded-lg p-4 bg-gray-50 hover:bg-gray-100 transition-colors">
                          <div className="flex items-center justify-between mb-3">
                            <h4 className="text-sm font-medium text-gray-700">Equipment #{idx + 1}</h4>
                            <button 
                              type="button" 
                              onClick={() => removeAdvancedEquipment(idx)} 
                              className="text-red-600 hover:text-red-800 text-sm font-medium"
                            >
                              Remove
                            </button>
                          </div>
                          
                          <div className="space-y-3">
                            <div className="space-y-1">
                              <label className="block text-xs font-medium text-gray-600">Equipment Name *</label>
                              <input 
                                type="text" 
                                placeholder="e.g., MRI Scanner" 
                                value={eq.name} 
                                onChange={(e) => updateAdvancedEquipment(idx, 'name', e.target.value)} 
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 placeholder-gray-500 text-sm" 
                              />
                            </div>
                            
                            <div className="space-y-1">
                              <label className="block text-xs font-medium text-gray-600">Description</label>
                              <textarea 
                                placeholder="Describe this equipment..." 
                                value={eq.description} 
                                onChange={(e) => updateAdvancedEquipment(idx, 'description', e.target.value)} 
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 placeholder-gray-500 text-sm resize-none" 
                                rows="2"
                              />
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                    
                    {(formData.advancedMedicalEquipment || []).length === 0 && (
                      <div className="text-center py-8 text-gray-500">
                        <Microscope className="w-12 h-12 text-gray-300 mx-auto mb-2" />
                        <p className="text-sm">No medical equipment added yet</p>
                      </div>
                    )}
                    
                    <div className="mt-4">
                      <button 
                        type="button" 
                        onClick={addAdvancedEquipment} 
                        className="flex items-center space-x-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md text-sm transition-colors w-full justify-center"
                      >
                        <Plus className="w-4 h-4" />
                        <span>Add Equipment</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* Gallery Uploads */}
              <div className="bg-white rounded-lg border border-gray-200 p-6">
                <div 
                  className="flex items-center justify-between mb-4 cursor-pointer hover:bg-gray-50 p-2 rounded-md transition-colors"
                  onClick={() => toggleSection('gallery')}
                >
                  <div className="flex items-center space-x-2">
                    <Camera className="w-5 h-5 text-gray-600" />
                    <h3 className="text-lg font-medium text-gray-900">Hospital Gallery</h3>
                    <span className="text-sm text-gray-500">({formData.gallery.length})</span>
                  </div>
                  {expandedSections.gallery ? (
                    <ChevronUp className="w-5 h-5 text-gray-400" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-gray-400" />
                  )}
                </div>
                
                {expandedSections.gallery && (
                  <div className="space-y-4">
                    <input
                      type="file"
                      accept="image/*"
                      multiple
                      onChange={(e) => addGalleryItems(e.target.files)}
                      className="hidden"
                      id="gallery-files-multiple"
                    />

                    {/* Gallery Preview Grid or Empty State */}
                    {formData.gallery.length > 0 ? (
                      <div className="space-y-3">
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                          {formData.gallery.map((item, idx) => (
                            <div key={idx} className="relative border border-gray-200 rounded-lg overflow-hidden bg-white hover:shadow-md transition-shadow group">
                              <div className="aspect-square relative">
                                {galleryPreviews[idx] && (
                                  <img 
                                    src={galleryPreviews[idx]} 
                                    alt={`Gallery ${idx + 1}`} 
                                    className="w-full h-full object-cover" 
                                  />
                                )}
                                
                                {!galleryPreviews[idx] && typeof item === 'string' && item && (
                                  <img 
                                    src={item.startsWith('http') ? item : `http://localhost:5000${item}`} 
                                    alt={`Gallery ${idx + 1}`} 
                                    className="w-full h-full object-cover" 
                                  />
                                )}
                                
                                {!galleryPreviews[idx] && !item && (
                                  <div className="w-full h-full flex items-center justify-center bg-gray-100">
                                    <Camera className="w-8 h-8 text-gray-400" />
                                  </div>
                                )}
                                
                                {/* Remove Button Overlay */}
                                <button 
                                  type="button" 
                                  onClick={() => removeGalleryItem(idx)} 
                                  className="absolute top-2 right-2 bg-red-600 hover:bg-red-700 text-white rounded-full p-1.5 opacity-0 group-hover:opacity-100 transition-opacity shadow-lg"
                                  title="Remove image"
                                >
                                  <Trash2 className="w-4 h-4" />
                                </button>
                              </div>
                              
                              {/* Image Info */}
                              <div className="p-2 bg-gray-50 border-t border-gray-200">
                                <p className="text-xs text-gray-600 truncate">
                                  {item ? (typeof item === 'string' ? item.split('/').pop() : item.name) : 'No file'}
                                </p>
                              </div>
                            </div>
                          ))}
                          
                          {/* Add More Button */}
                          <button
                            type="button"
                            onClick={() => document.getElementById('gallery-files-multiple').click()}
                            className="aspect-square border-2 border-dashed border-gray-300 rounded-lg bg-gray-50 hover:bg-gray-100 hover:border-blue-400 transition-all flex flex-col items-center justify-center gap-2 cursor-pointer group"
                          >
                            <Plus className="w-8 h-8 text-gray-400 group-hover:text-blue-600 transition-colors" />
                            <span className="text-xs text-gray-500 group-hover:text-blue-600 font-medium">Add More</span>
                          </button>
                        </div>
                      </div>
                    ) : (
                      <button
                        type="button"
                        onClick={() => document.getElementById('gallery-files-multiple').click()}
                        className="w-full text-center py-16 text-gray-500 border-2 border-dashed border-gray-300 rounded-lg hover:border-blue-400 hover:bg-blue-50/50 transition-all cursor-pointer group"
                      >
                        <Camera className="w-20 h-20 text-gray-300 group-hover:text-blue-500 mx-auto mb-4 transition-colors" />
                        <p className="text-base font-medium text-gray-700 group-hover:text-blue-600">Click to add gallery images</p>
                        <p className="text-sm mt-2 text-gray-500">You can select multiple images at once</p>
                      </button>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Step Controls */}
        <div className="flex justify-between items-center pt-4">
          <button
            type="button"
            onClick={goBack}
            className={`px-6 py-3 rounded-lg border text-sm font-medium transition-colors ${
              activeTab === 'profile-bio'
                ? 'border-gray-300 text-gray-700 hover:bg-gray-50'
                : 'border-gray-200 text-gray-400 cursor-not-allowed'
            }`}
            disabled={activeTab !== 'profile-bio'}
          >
            Back
          </button>
          {activeTab === 'hospital-details' ? (
            <button
              type="button"
              onClick={goNext}
              className="px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
            >
              Next
            </button>
          ) : (
            <button
              type="button"
              onClick={submitHospital}
              className={`px-8 py-3 rounded-lg transition-colors font-medium text-white ${submitting ? 'bg-blue-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'}`}
              disabled={submitting}
            >
              {submitting ? 'Creating...' : 'Create Hospital Profile'}
            </button>
          )}
        </div>
      </div>
    </Layout>
  )
} 