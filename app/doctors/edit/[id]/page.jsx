"use client"

import { useEffect, useState, use } from 'react'
import DoctorApi from '@/lib/api/doctorApi'
import { HospitalApi } from '@/lib/api/hospitalApi'
import { Layout } from '@/components/layout'
import Swal from 'sweetalert2'
import { Briefcase, User, Building2, Star, Users, Bed, Calendar, Mail, Phone, Globe, MapPin, Award, Info, Navigation, Plus, Trash2, Stethoscope, Microscope, Camera, ChevronDown, ChevronUp } from "lucide-react"
import { useRouter } from 'next/navigation'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

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
    degrees: true,
    languages: true,
    awards: true
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

  useEffect(() => {
    DoctorApi.getById(id)
      .then(res => {
        const data = res.data || res
        setFormData({
          id: data.id || '',
          name: data.name || '',
          image: data.image || null,
          specialty: data.specialty || '',
          location: data.location || '',
          experience: data.experience || '',
          rating: data.rating || '',
          introduction: data.introduction || '',
          designation: data.designation || '',
          hospitalId: data.hospitalId?.id || data.hospitalId || '',
          affiliatedHospitalIds: (data.affiliatedHospitalIds || []).map(h => h.name || h.id || h),
          specializations: data.specializations || [],
          degrees: data.degrees || [],
          languages: data.languages || [],
          awards: data.awards || [],
          researchWork: data.researchWork || '',
          publications: data.publications || [],
          certifications: data.certifications || []
        })
      })
      .catch(err => setError(err?.message || 'Failed to load doctor'))
  }, [id])

  const submitUpdate = async () => {
    if (!formData) return
    setSaving(true)
    try {
      const fd = new FormData()
      fd.append('id', formData.id || '')
      fd.append('name', formData.name || '')
      fd.append('specialty', formData.specialty || '')
      fd.append('location', formData.location || '')
      fd.append('experience', formData.experience || '')
      fd.append('rating', formData.rating || '')
      fd.append('introduction', formData.introduction || '')
      fd.append('designation', formData.designation || '')
      fd.append('hospitalId', formData.hospitalId || '')
      fd.append('affiliatedHospitalIds', JSON.stringify(formData.affiliatedHospitalIds || []))
      fd.append('specializations', JSON.stringify(formData.specializations || []))
      fd.append('degrees', JSON.stringify(formData.degrees || []))
      fd.append('languages', JSON.stringify(formData.languages || []))
      fd.append('awards', JSON.stringify(formData.awards || []))
      fd.append('researchWork', formData.researchWork || '')
      fd.append('publications', JSON.stringify(formData.publications || []))
      fd.append('certifications', JSON.stringify(formData.certifications || []))
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
        title: 'Error!',
        text: e?.response?.data?.message || 'Failed to update doctor',
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
              goBack={goBack}
              submitUpdate={submitUpdate}
              saving={saving}
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
  const [imagePreview, setImagePreview] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData(prev => ({ ...prev, image: file }));
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleRemoveImage = () => {
    setFormData(prev => ({ ...prev, image: null }));
    setImagePreview(null);
  };

  const getCurrentImageSrc = () => {
    if (imagePreview) return imagePreview;
    if (formData.image && typeof formData.image === 'string') {
      return formData.image.startsWith('http') ? formData.image : `http://localhost:5000${formData.image}`;
    }
    return null;
  };

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
              <label className="block text-sm font-medium text-gray-700">Doctor ID *</label>
              <input 
                type="text" 
                placeholder="e.g., DOC_001" 
                value={formData.id}
                onChange={(e) => setFormData(prev => ({ ...prev, id: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 placeholder-gray-500"
                required
              />
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
                max="10"
                placeholder="9.7" 
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
              <label className="block text-sm font-medium text-gray-700">Primary Hospital *</label>
              <select
                value={formData.hospitalId}
                onChange={(e) => setFormData(prev => ({ ...prev, hospitalId: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 placeholder-gray-500"
                required
              >
                <option value="">Select Hospital</option>
                {hospitals.map(h => (
                  <option key={h.id} value={h.id}>{h.name}</option>
                ))}
              </select>
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
                  <span key={idx} className="bg-green-100 text-green-800 px-3 py-1 rounded-full flex items-center gap-1">
                    {hospital}
                    <button 
                      type="button" 
                      onClick={() => setFormData(prev => ({ ...prev, affiliatedHospitalIds: prev.affiliatedHospitalIds.filter((_, i) => i !== idx) }))} 
                      className="ml-1 text-green-500 hover:text-red-500"
                    >
                      &times;
                    </button>
                  </span>
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
  goBack,
  submitUpdate,
  saving
}) => {
  const [specializationInput, setSpecializationInput] = useState('')
  const [languageInput, setLanguageInput] = useState('')
  const [awardInput, setAwardInput] = useState('')
  const [publicationInput, setPublicationInput] = useState('')
  const [certificationInput, setCertificationInput] = useState('')
  
  // Degree inputs
  const [degreeNameInput, setDegreeNameInput] = useState('')
  const [degreeInstitutionInput, setDegreeInstitutionInput] = useState('')
  const [degreeYearInput, setDegreeYearInput] = useState('')

  const addDegree = () => {
    if (degreeNameInput && degreeInstitutionInput && degreeYearInput) {
      setFormData(prev => ({
        ...prev,
        degrees: [...(prev.degrees || []), { 
          name: degreeNameInput, 
          institution: degreeInstitutionInput,
          year: degreeYearInput
        }]
      }))
      setDegreeNameInput('')
      setDegreeInstitutionInput('')
      setDegreeYearInput('')
    }
  }

  const handleRemoveDegree = (index) => {
    setFormData(prev => ({
      ...prev,
      degrees: (prev.degrees || []).filter((_, idx) => idx !== index)
    }))
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

  const getCurrentImageSrc = () => {
    if (formData?.image) {
      if (formData.image.startsWith('http')) {
        return formData.image
      }
      return `http://localhost:5000${formData.image}`
    }
    return null
  }

  const handleImageChange = (e) => {
    const file = e.target.files?.[0]
    if (file) {
      setFormData(prev => ({ ...prev, image: file }))
    }
  }

  const handleRemoveImage = () => {
    setFormData(prev => ({ ...prev, image: null }))
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
              {getCurrentImageSrc() ? (
                <div className="relative w-full h-full">
                  <img
                    src={getCurrentImageSrc()}
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
                 onClick={() => document.getElementById('image-upload-edit-bio').click()}>
              <div className="text-center">
                <p className="text-sm text-gray-600 font-medium">Upload new photo</p>
              </div>
            </div>
            <input
              id="image-upload-edit-bio"
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
                <span key={idx} className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full flex items-center gap-1">
                  {item}
                  <button 
                    type="button" 
                    onClick={() => handleRemove(item, formData.specializations, (newList) => setFormData(prev => ({ ...prev, specializations: newList })))} 
                    className="ml-1 text-blue-500 hover:text-red-500"
                  >
                    &times;
                  </button>
                </span>
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
                <div key={idx} className="bg-gray-50 p-3 rounded-md flex items-center justify-between">
                  <div className="flex-1">
                    <span className="font-medium text-gray-900">{degree.name}</span>
                    <span className="text-gray-600 ml-2">from {degree.institution}</span>
                    <span className="text-gray-500 ml-2">({degree.year})</span>
                  </div>
                  <button 
                    type="button" 
                    onClick={() => handleRemoveDegree(idx)} 
                    className="ml-2 text-red-500 hover:text-red-700 transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
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
                <span key={idx} className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full flex items-center gap-1">
                  {item}
                  <button 
                    type="button" 
                    onClick={() => handleRemove(item, formData.languages, (newList) => setFormData(prev => ({ ...prev, languages: newList })))} 
                    className="ml-1 text-purple-500 hover:text-red-500"
                  >
                    &times;
                  </button>
                </span>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Awards */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <div 
          className="flex items-center justify-between mb-4 cursor-pointer hover:bg-gray-50 p-2 rounded-md transition-colors"
          onClick={() => toggleSection('awards')}
        >
          <div className="flex items-center space-x-2">
            <Award className="w-5 h-5 text-gray-600" />
            <h3 className="text-lg font-medium text-gray-900">Awards & Recognitions</h3>
            <span className="text-sm text-gray-500">({formData.awards.length})</span>
          </div>
          {expandedSections.awards ? (
            <ChevronUp className="w-5 h-5 text-gray-400" />
          ) : (
            <ChevronDown className="w-5 h-5 text-gray-400" />
          )}
        </div>
        
        {expandedSections.awards && (
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
                <span key={idx} className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full flex items-center gap-1">
                  {item}
                  <button 
                    type="button" 
                    onClick={() => handleRemove(item, formData.awards, (newList) => setFormData(prev => ({ ...prev, awards: newList })))} 
                    className="ml-1 text-yellow-500 hover:text-red-500"
                  >
                    &times;
                  </button>
                </span>
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

