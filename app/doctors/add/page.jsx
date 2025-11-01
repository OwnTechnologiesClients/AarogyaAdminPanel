"use client"

import { useState, useEffect } from 'react'
import { Layout } from "@/components/layout"
import api from '@/lib/api'
import { HospitalApi } from '@/lib/api/hospitalApi'
import Swal from 'sweetalert2'
import { Briefcase, User, Building2, Star, Users, Bed, Calendar, Mail, Phone, Globe, MapPin, Award, Info, Navigation, Plus, Trash2, Stethoscope, Microscope, Camera, ChevronDown, ChevronUp } from "lucide-react"
import { useRouter } from 'next/navigation'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'


export default function AddDoctor() {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState('doctor-details')
  const [expandedSections, setExpandedSections] = useState({
    specializations: true,
    professionalExperience: true,
    degrees: true,
    languages: true,
    awards: true
  })

  const [formData, setFormData] = useState({
    id: '',
    name: '',
    image: null,
    specialty: '',
    location: '',
    experience: '',
    rating: '',
    introduction: '',
    hospitalId: '',
    designation: '',
    degrees: [],
    affiliatedHospitalIds: [],
    professionalExperience: [],
    specializations: [],
    languages: [],
    awards: [],
    researchWork: '',
    publications: [],
    certifications: [],
    isActive: false // Default to disabled, admin will enable from list page
  })

  const [professionalExperienceInput, setProfessionalExperienceInput] = useState({
    position: '',
    institution: '',
    duration: ''
  })

  const [hospitals, setHospitals] = useState([])
  const [submitting, setSubmitting] = useState(false)

  // Helper functions for form management
  const toggleSection = (section) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }))
  }

  useEffect(() => {
    HospitalApi.list()
      .then(res => {
        const data = Array.isArray(res.data) ? res.data : res.data?.data || []
        setHospitals(data)
      })
      .catch(() => setHospitals([]))
  }, [])

  const handleAdd = (input, setInput, list, setList) => {
    if (input.trim() && !list.includes(input.trim())) {
      setList([...list, input.trim()])
      setInput('')
    }
  }
  const handleRemove = (item, list, setList) => {
    setList(list.filter(i => i !== item))
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
        professionalExperience: [...prev.professionalExperience, newExperience]
      }))
      setProfessionalExperienceInput({ position: '', institution: '', duration: '' })
    }
  }

  const handleRemoveProfessionalExperience = (index) => {
    setFormData(prev => ({
      ...prev,
      professionalExperience: prev.professionalExperience.filter((_, idx) => idx !== index)
    }))
  }

  const submitDoctor = async () => {
    if (submitting) return
    // Basic validation
    if (!formData.id || !formData.name || !formData.specialty || !formData.location) {
      alert('Please fill required fields: ID, Name, Specialty, Location')
      return
    }
    if (!formData.image) {
      alert('Please upload the doctor profile image')
      return
    }

    setSubmitting(true)
    try {
      const fd = new FormData()
      fd.append('id', (formData.id || '').toUpperCase())
      fd.append('name', formData.name || '')
      fd.append('specialty', formData.specialty || '')
      fd.append('location', formData.location || '')
      fd.append('experience', formData.experience || '')
      fd.append('rating', formData.rating || '')
      fd.append('introduction', formData.introduction || '')
      fd.append('hospitalId', formData.hospitalId || '')
      fd.append('designation', formData.designation || '')
      fd.append('affiliatedHospitalIds', JSON.stringify(formData.affiliatedHospitalIds || []))
      fd.append('professionalExperience', JSON.stringify(formData.professionalExperience || []))
      fd.append('specializations', JSON.stringify(formData.specializations || []))
      fd.append('workExperience', JSON.stringify(formData.workExperience || []))
      fd.append('languages', JSON.stringify(formData.languages || []))
      fd.append('awards', JSON.stringify(formData.awards || []))
      fd.append('researchWork', formData.researchWork || '')
      fd.append('publications', JSON.stringify(formData.publications || []))
      fd.append('certifications', JSON.stringify(formData.certifications || []))
      fd.append('isActive', formData.isActive)
      fd.append('image', formData.image)

      await api.post('/doctors/create', fd, {
        headers: { 'Content-Type': 'multipart/form-data' }
      })
      
      await Swal.fire({
        title: 'Success!',
        text: 'Doctor profile created successfully!',
        icon: 'success',
        confirmButtonText: 'OK'
      })
      
      // Redirect to doctors list page
      router.push('/doctors')
    } catch (err) {
      await Swal.fire({
        title: 'Error!',
        text: err.response?.data?.message || 'Failed to create doctor profile',
        icon: 'error',
        confirmButtonText: 'OK'
      })
    } finally {
      setSubmitting(false)
    }
  }

  const tabs = [
    { id: 'doctor-details', label: 'Doctor Details', icon: Briefcase },
    { id: 'profile-bio', label: 'Profile & Bio', icon: User },
  ]

  const goNext = () => setActiveTab('profile-bio')
  const goBack = () => setActiveTab('doctor-details')

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
          <div className={activeTab === 'doctor-details' ? 'block' : 'hidden'}>
            <DoctorDetailsTab 
              formData={formData}
              setFormData={setFormData}
              hospitals={hospitals}
              goNext={goNext}
            />
          </div>
          <div className={activeTab === 'profile-bio' ? 'block' : 'hidden'}>
            <ProfileBioTab
              formData={formData}
              setFormData={setFormData}
              expandedSections={expandedSections}
              toggleSection={toggleSection}
              handleAdd={handleAdd}
              handleRemove={handleRemove}
              handleAddProfessionalExperience={handleAddProfessionalExperience}
              handleRemoveProfessionalExperience={handleRemoveProfessionalExperience}
              professionalExperienceInput={professionalExperienceInput}
              setProfessionalExperienceInput={setProfessionalExperienceInput}
              goBack={goBack}
              submitDoctor={submitDoctor}
              submitting={submitting}
            />
          </div>
        </div>
      </div>
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />
    </Layout>
  )
} 

// Doctor Details Tab Component
const DoctorDetailsTab = ({ formData, setFormData, hospitals, goNext }) => {
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

  return (
    <div className="space-y-6">
      <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
        {/* Page Header */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center space-x-3 mb-2">
            <Briefcase className="w-6 h-6 text-gray-600" />
            <h2 className="text-xl font-semibold text-gray-900">Doctor Information</h2>
          </div>
          <p className="text-gray-600">Complete the basic details about the doctor</p>
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
              <label className="block text-sm font-medium text-gray-700">Primary Hospital *</label>
              <select
                value={formData.hospitalId}
                onChange={(e) => setFormData(prev => ({ ...prev, hospitalId: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 placeholder-gray-500"
                required
              >
                <option value="">Select Hospital</option>
                {hospitals.map(h => (
                  <option key={h._id} value={h._id}>{h.name}</option>
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

// Profile & Bio Tab Component
const ProfileBioTab = ({
  formData,
  setFormData,
  expandedSections,
  toggleSection,
  handleAdd,
  handleRemove,
  handleAddProfessionalExperience,
  handleRemoveProfessionalExperience,
  professionalExperienceInput,
  setProfessionalExperienceInput,
  goBack,
  submitDoctor,
  submitting
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
        degrees: [...prev.degrees, { 
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
      degrees: prev.degrees.filter((_, idx) => idx !== index)
    }))
  }

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

  return (
    <div className="space-y-6">
      {/* Profile Image */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Profile Image</h3>
            <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">Upload Profile Image *</label>
          <div className="flex items-center space-x-6">
            {/* Current/Preview Image */}
            <div className="relative w-32 h-32 bg-gray-100 rounded-lg border border-gray-300 flex items-center justify-center overflow-hidden">
              {imagePreview ? (
                <div className="relative w-full h-full">
                  <img
                    src={imagePreview}
                    alt="Preview"
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
                 onClick={() => document.getElementById('image-upload-bio').click()}>
              <div className="text-center">
                <p className="text-sm text-gray-600 font-medium">Upload new photo</p>
              </div>
            </div>
              <input 
              id="image-upload-bio"
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="hidden"
              required
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

      {/* Professional Experience */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <div 
          className="flex items-center justify-between mb-4 cursor-pointer hover:bg-gray-50 p-2 rounded-md transition-colors"
          onClick={() => toggleSection('professionalExperience')}
        >
          <div className="flex items-center space-x-2">
            <Briefcase className="w-5 h-5 text-gray-600" />
            <h3 className="text-lg font-medium text-gray-900">Professional Experience</h3>
            <span className="text-sm text-gray-500">({formData.professionalExperience.length})</span>
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
              {formData.professionalExperience.map((exp, idx) => (
                <div key={idx} className="bg-gray-50 p-3 rounded-md flex items-center justify-between">
                  <div>
                    <span className="font-semibold text-gray-800">{exp.position}</span>
                    <span className="text-gray-600"> at {exp.institution}</span>
                    <span className="text-gray-500"> ({exp.duration})</span>
                  </div>
                  <button 
                    type="button" 
                    onClick={() => handleRemoveProfessionalExperience(idx)} 
                    className="text-red-500 hover:text-red-700"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
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
            <span className="text-sm text-gray-500">({formData.degrees.length})</span>
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
              {formData.degrees.map((degree, idx) => (
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

      {/* Publications */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Publications</h3>
        <div className="space-y-4">
          <div className="flex gap-2">
            <input
              type="text"
              value={publicationInput}
              onChange={(e) => setPublicationInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  handleAdd(publicationInput, setPublicationInput, formData.publications, (newList) => setFormData(prev => ({ ...prev, publications: newList })))
                }
              }}
              placeholder="Add publication and press Enter"
              className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 placeholder-gray-500"
            />
            <button
              type="button"
              onClick={() => handleAdd(publicationInput, setPublicationInput, formData.publications, (newList) => setFormData(prev => ({ ...prev, publications: newList })))}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
            >
              Add
            </button>
          </div>
          <div className="flex flex-wrap gap-2">
            {formData.publications.map((item, idx) => (
              <span key={idx} className="bg-indigo-100 text-indigo-800 px-3 py-1 rounded-full flex items-center gap-1">
                {item}
                <button
                  type="button"
                  onClick={() => handleRemove(item, formData.publications, (newList) => setFormData(prev => ({ ...prev, publications: newList })))}
                  className="ml-1 text-indigo-500 hover:text-red-500"
                >
                  &times;
                </button>
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Certifications */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Certifications</h3>
        <div className="space-y-4">
          <div className="flex gap-2">
            <input
              type="text"
              value={certificationInput}
              onChange={(e) => setCertificationInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  handleAdd(certificationInput, setCertificationInput, formData.certifications, (newList) => setFormData(prev => ({ ...prev, certifications: newList })))
                }
              }}
              placeholder="Add certification and press Enter"
              className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 placeholder-gray-500"
            />
            <button
              type="button"
              onClick={() => handleAdd(certificationInput, setCertificationInput, formData.certifications, (newList) => setFormData(prev => ({ ...prev, certifications: newList })))}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
            >
              Add
            </button>
          </div>
          <div className="flex flex-wrap gap-2">
            {formData.certifications.map((item, idx) => (
              <span key={idx} className="bg-teal-100 text-teal-800 px-3 py-1 rounded-full flex items-center gap-1">
                {item}
                <button
                  type="button"
                  onClick={() => handleRemove(item, formData.certifications, (newList) => setFormData(prev => ({ ...prev, certifications: newList })))}
                  className="ml-1 text-teal-500 hover:text-red-500"
                >
                  &times;
                </button>
              </span>
            ))}
          </div>
        </div>
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
          onClick={submitDoctor}
          className={`px-8 py-3 rounded-lg transition-colors font-medium text-white ${submitting ? 'bg-blue-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'}`}
          disabled={submitting}
        >
          {submitting ? 'Creating...' : 'Create Doctor Profile'}
        </button>
      </div>
    </div>
  )
}