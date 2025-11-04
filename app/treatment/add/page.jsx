"use client"

import { useState, useEffect } from 'react'
import TreatmentApi from '@/lib/api/treatmentApi'
import { HospitalApi } from '@/lib/api/hospitalApi'
import { DoctorApi } from '@/lib/api/doctorApi'
import { Layout } from '@/components/layout'
import Swal from 'sweetalert2'
import { Stethoscope, User, Building2, Star, Clock, DollarSign, Camera, ChevronDown, ChevronUp, Plus, Trash2, Info, Award, Microscope } from "lucide-react"
import { useRouter } from 'next/navigation'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

export default function AddTreatment() {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState('treatment-details')
  const [expandedSections, setExpandedSections] = useState({
    diagnosticTools: true,
    advancedTreatmentOptions: true,
    advantages: true,
    faq: true
  })

  const [formData, setFormData] = useState({
    id: '',
    category: '',
    name: '',
    image: null,
    description: '',
    duration: '',
    recovery: '',
    topHospitals: [],
    hospitalSelectionHelp: '',
    hospitalSelectionHelpArray: [],
    topDoctors: [],
    doctorSelectionHelp: '',
    doctorSelectionHelpArray: [],
    diagnosticTools: [],
    advancedTreatmentOptions: [],
    advantages: [],
    costConsiderations: '',
    faq: [],
    isActive: false // Default to disabled, admin will enable from list page
  })

  const [hospitals, setHospitals] = useState([])
  const [doctors, setDoctors] = useState([])
  const [submitting, setSubmitting] = useState(false)

  // Helper functions for form management
  const toggleSection = (section) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }))
  }

  useEffect(() => {
    // Load hospitals and doctors for selection
    Promise.all([
      HospitalApi.list(),
      DoctorApi.list()
    ]).then(([hospitalsRes, doctorsRes]) => {
      const hospitalsData = Array.isArray(hospitalsRes.data) ? hospitalsRes.data : hospitalsRes.data?.data || []
      const doctorsData = Array.isArray(doctorsRes.data) ? doctorsRes.data : doctorsRes.data?.data || []
      setHospitals(hospitalsData)
      setDoctors(doctorsData)
    }).catch(() => {
      setHospitals([])
      setDoctors([])
    })
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

  // Helper function to convert comma-separated string to array
  const parseCommaSeparated = (value) => {
    return value.split(',').map(item => item.trim()).filter(item => item.length > 0)
  }

  // Helper function to handle comma-separated input changes
  const handleCommaSeparatedChange = (value, setValue, setArray) => {
    setValue(value)
    const parsedArray = parseCommaSeparated(value)
    setArray(parsedArray)
  }

  const submitTreatment = async () => {
    if (submitting) return
    // Basic validation
    if (!formData.id || !formData.category || !formData.name || !formData.description || !formData.duration || !formData.recovery || !formData.costConsiderations) {
      alert('Please fill required fields: ID, Category, Name, Description, Duration, Recovery, Cost Considerations')
      return
    }

    setSubmitting(true)
    try {
      const fd = new FormData()
      fd.append('id', (formData.id || '').toUpperCase())
      fd.append('category', formData.category || '')
      fd.append('name', formData.name || '')
      fd.append('description', formData.description || '')
      fd.append('duration', formData.duration || '')
      fd.append('recovery', formData.recovery || '')
      fd.append('topHospitals', JSON.stringify(formData.topHospitals || []))
      fd.append('hospitalSelectionHelp', JSON.stringify(formData.hospitalSelectionHelpArray || []))
      fd.append('topDoctors', JSON.stringify(formData.topDoctors || []))
      fd.append('doctorSelectionHelp', JSON.stringify(formData.doctorSelectionHelpArray || []))
      fd.append('diagnosticTools', JSON.stringify(formData.diagnosticTools || []))
      fd.append('advancedTreatmentOptions', JSON.stringify(formData.advancedTreatmentOptions || []))
      fd.append('advantages', JSON.stringify(formData.advantages || []))
      fd.append('costConsiderations', formData.costConsiderations || '')
      fd.append('faq', JSON.stringify(formData.faq || []))
      fd.append('isActive', formData.isActive)
      if (formData.image) {
        fd.append('image', formData.image)
      }

      await TreatmentApi.create(fd)
      
      await Swal.fire({
        title: 'Success!',
        text: 'Treatment created successfully!',
        icon: 'success',
        confirmButtonText: 'OK'
      })
      
      // Redirect to treatments list page
      router.push('/treatment')
    } catch (err) {
      await Swal.fire({
        title: 'Error!',
        text: err.response?.data?.message || 'Failed to create treatment',
        icon: 'error',
        confirmButtonText: 'OK'
      })
    } finally {
      setSubmitting(false)
    }
  }

  const tabs = [
    { id: 'treatment-details', label: 'Treatment Details', icon: Stethoscope },
    { id: 'profile-bio', label: 'Profile & Bio', icon: User },
  ]

  const goNext = () => setActiveTab('profile-bio')
  const goBack = () => setActiveTab('treatment-details')

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
          <div className={activeTab === 'treatment-details' ? 'block' : 'hidden'}>
            <TreatmentDetailsTab 
              formData={formData}
              setFormData={setFormData}
              hospitals={hospitals}
              doctors={doctors}
              goNext={goNext}
              handleCommaSeparatedChange={handleCommaSeparatedChange}
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
              goBack={goBack}
              submitTreatment={submitTreatment}
              submitting={submitting}
            />
          </div>
        </div>
      </div>
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />
    </Layout>
  )
} 

// Treatment Details Tab Component
const TreatmentDetailsTab = ({ formData, setFormData, hospitals, doctors, goNext, handleCommaSeparatedChange }) => {
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
            <Stethoscope className="w-6 h-6 text-gray-600" />
            <h2 className="text-xl font-semibold text-gray-900">Treatment Information</h2>
                </div>
          <p className="text-gray-600">Complete the basic details about the treatment</p>
              </div>
              
        {/* Basic Information */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Basic Information</h3>
              
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Treatment ID *</label>
                  <input 
                    type="text" 
                placeholder="e.g., CARDIOLOGY_001" 
                value={formData.id}
                onChange={(e) => setFormData(prev => ({ ...prev, id: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 placeholder-gray-500"
                    required
                  />
                </div>
                <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Treatment Category *</label>
                  <input 
                    type="text" 
                placeholder="e.g., Cardiology" 
                value={formData.category}
                onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 placeholder-gray-500"
                    required
                  />
                </div>
                <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Treatment Name *</label>
                  <input 
                    type="text" 
                placeholder="e.g., Coronary Angioplasty" 
                value={formData.name}
                onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 placeholder-gray-500"
                    required
                  />
                </div>
                <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Duration *</label>
                  <input 
                    type="text" 
                    placeholder="e.g., 1-2 hours" 
                value={formData.duration}
                onChange={(e) => setFormData(prev => ({ ...prev, duration: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 placeholder-gray-500"
                required
                  />
                </div>
                <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Recovery Time *</label>
                  <input 
                    type="text" 
                    placeholder="e.g., 1-3 days" 
                value={formData.recovery}
                onChange={(e) => setFormData(prev => ({ ...prev, recovery: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 placeholder-gray-500"
                required
                  />
                </div>
              </div>
              
              <div className="mt-6 space-y-2">
            <label className="block text-sm font-medium text-gray-700">Description *</label>
                <textarea 
                  rows="3"
              placeholder="Enter treatment description..." 
              value={formData.description}
              onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 placeholder-gray-500 resize-none"
                  required
                />
              </div>
            </div>

        {/* Hospital & Doctor Assignment */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Hospital & Doctor Assignment</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Top Hospitals</label>
              <SearchableMultiSelect
                options={hospitals}
                selected={formData.topHospitals}
                onChange={(selected) => setFormData(prev => ({ ...prev, topHospitals: selected }))}
                placeholder="Search and select hospitals..."
                displayKey="name"
                valueKey="_id"
              />
              <p className="text-xs text-gray-500">Search and select hospitals that offer this treatment</p>
                </div>
                <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Top Doctors</label>
              <SearchableMultiSelect
                options={doctors}
                selected={formData.topDoctors}
                onChange={(selected) => setFormData(prev => ({ ...prev, topDoctors: selected }))}
                placeholder="Search and select doctors..."
                displayKey="name"
                valueKey="_id"
                subtitleKey="specialty"
              />
              <p className="text-xs text-gray-500">Search and select doctors who specialize in this treatment</p>
            </div>
                </div>
                
          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Hospital Selection Help</label>
                  <textarea 
                    rows="3"
                placeholder="Enter criteria for hospital selection (comma-separated)..." 
                value={formData.hospitalSelectionHelp}
                onChange={(e) => handleCommaSeparatedChange(
                  e.target.value, 
                  (value) => setFormData(prev => ({ ...prev, hospitalSelectionHelp: value })),
                  (array) => setFormData(prev => ({ ...prev, hospitalSelectionHelpArray: array }))
                )}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 placeholder-gray-500 resize-none"
                  />
                  {formData.hospitalSelectionHelpArray.length > 0 && (
                    <div className="mt-2">
                      <p className="text-xs text-gray-600 font-medium mb-1">Parsed criteria:</p>
                      <div className="flex flex-wrap gap-1">
                        {formData.hospitalSelectionHelpArray.map((item, index) => (
                          <span key={index} className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs">
                            {item}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
                <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Doctor Selection Help</label>
                  <textarea 
                    rows="3"
                placeholder="Enter criteria for doctor selection (comma-separated)..." 
                value={formData.doctorSelectionHelp}
                onChange={(e) => handleCommaSeparatedChange(
                  e.target.value, 
                  (value) => setFormData(prev => ({ ...prev, doctorSelectionHelp: value })),
                  (array) => setFormData(prev => ({ ...prev, doctorSelectionHelpArray: array }))
                )}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 placeholder-gray-500 resize-none"
                  />
                  {formData.doctorSelectionHelpArray.length > 0 && (
                    <div className="mt-2">
                      <p className="text-xs text-gray-600 font-medium mb-1">Parsed criteria:</p>
                      <div className="flex flex-wrap gap-1">
                        {formData.doctorSelectionHelpArray.map((item, index) => (
                          <span key={index} className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs">
                            {item}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

        {/* Cost Considerations */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Cost Considerations</h3>
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">Treatment Cost & Considerations *</label>
            <textarea 
              rows="3"
              placeholder="Enter cost considerations and pricing information..." 
              value={formData.costConsiderations}
              onChange={(e) => setFormData(prev => ({ ...prev, costConsiderations: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 placeholder-gray-500 resize-none"
              required
            />
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
  goBack,
  submitTreatment,
  submitting
}) => {
  const [diagnosticToolInput, setDiagnosticToolInput] = useState('')
  const [advancedOptionInput, setAdvancedOptionInput] = useState('')
  const [advantageInput, setAdvantageInput] = useState('')
  
  // FAQ inputs
  const [faqQuestionInput, setFaqQuestionInput] = useState('')
  const [faqAnswerInput, setFaqAnswerInput] = useState('')

  const addFaq = () => {
    if (faqQuestionInput && faqAnswerInput) {
      setFormData(prev => ({
        ...prev,
        faq: [...(prev.faq || []), { 
          question: faqQuestionInput, 
          answer: faqAnswerInput
        }]
      }))
      setFaqQuestionInput('')
      setFaqAnswerInput('')
    }
  }

  const handleRemoveFaq = (index) => {
    setFormData(prev => ({
      ...prev,
      faq: (prev.faq || []).filter((_, idx) => idx !== index)
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
        <h3 className="text-lg font-medium text-gray-900 mb-4">Treatment Image</h3>
                <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">Upload Treatment Image</label>
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
                  />
                </div>
              </div>
            </div>

      {/* Diagnostic Tools */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <div 
          className="flex items-center justify-between mb-4 cursor-pointer hover:bg-gray-50 p-2 rounded-md transition-colors"
          onClick={() => toggleSection('diagnosticTools')}
        >
          <div className="flex items-center space-x-2">
            <Microscope className="w-5 h-5 text-gray-600" />
            <h3 className="text-lg font-medium text-gray-900">Diagnostic Tools</h3>
            <span className="text-sm text-gray-500">({formData.diagnosticTools?.length || 0})</span>
          </div>
          {expandedSections.diagnosticTools ? (
            <ChevronUp className="w-5 h-5 text-gray-400" />
          ) : (
            <ChevronDown className="w-5 h-5 text-gray-400" />
          )}
        </div>
        
        {expandedSections.diagnosticTools && (
          <div className="space-y-4">
            <div className="flex gap-2">
              <input 
                type="text" 
                value={diagnosticToolInput}
                onChange={(e) => setDiagnosticToolInput(e.target.value)}
                onKeyDown={(e) => { 
                  if (e.key === 'Enter') { 
                    e.preventDefault(); 
                    handleAdd(diagnosticToolInput, setDiagnosticToolInput, formData.diagnosticTools, (newList) => setFormData(prev => ({ ...prev, diagnosticTools: newList })))
                  }
                }}
                placeholder="Add diagnostic tool and press Enter" 
                className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 placeholder-gray-500" 
              />
              <button 
                type="button" 
                onClick={() => handleAdd(diagnosticToolInput, setDiagnosticToolInput, formData.diagnosticTools, (newList) => setFormData(prev => ({ ...prev, diagnosticTools: newList })))}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
              >
                Add
              </button>
            </div>
            <div className="flex flex-wrap gap-2">
              {formData.diagnosticTools?.map((item, idx) => (
                <span key={idx} className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full flex items-center gap-1">
                  {item}
                  <button 
                    type="button" 
                    onClick={() => handleRemove(item, formData.diagnosticTools, (newList) => setFormData(prev => ({ ...prev, diagnosticTools: newList })))} 
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

      {/* Advanced Treatment Options */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <div 
          className="flex items-center justify-between mb-4 cursor-pointer hover:bg-gray-50 p-2 rounded-md transition-colors"
          onClick={() => toggleSection('advancedTreatmentOptions')}
        >
          <div className="flex items-center space-x-2">
            <Award className="w-5 h-5 text-gray-600" />
            <h3 className="text-lg font-medium text-gray-900">Advanced Treatment Options</h3>
            <span className="text-sm text-gray-500">({formData.advancedTreatmentOptions?.length || 0})</span>
                </div>
          {expandedSections.advancedTreatmentOptions ? (
            <ChevronUp className="w-5 h-5 text-gray-400" />
          ) : (
            <ChevronDown className="w-5 h-5 text-gray-400" />
          )}
              </div>
              
        {expandedSections.advancedTreatmentOptions && (
          <div className="space-y-4">
            <div className="flex gap-2">
              <input 
                type="text" 
                value={advancedOptionInput}
                onChange={(e) => setAdvancedOptionInput(e.target.value)}
                onKeyDown={(e) => { 
                  if (e.key === 'Enter') { 
                    e.preventDefault(); 
                    handleAdd(advancedOptionInput, setAdvancedOptionInput, formData.advancedTreatmentOptions, (newList) => setFormData(prev => ({ ...prev, advancedTreatmentOptions: newList })))
                  }
                }}
                placeholder="Add advanced treatment option and press Enter" 
                className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 placeholder-gray-500" 
              />
              <button 
                type="button" 
                onClick={() => handleAdd(advancedOptionInput, setAdvancedOptionInput, formData.advancedTreatmentOptions, (newList) => setFormData(prev => ({ ...prev, advancedTreatmentOptions: newList })))}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
              >
                Add
              </button>
            </div>
            <div className="flex flex-wrap gap-2">
              {formData.advancedTreatmentOptions?.map((item, idx) => (
                <span key={idx} className="bg-green-100 text-green-800 px-3 py-1 rounded-full flex items-center gap-1">
                  {item}
                  <button 
                    type="button" 
                    onClick={() => handleRemove(item, formData.advancedTreatmentOptions, (newList) => setFormData(prev => ({ ...prev, advancedTreatmentOptions: newList })))} 
                    className="ml-1 text-green-500 hover:text-red-500"
                  >
                    &times;
                  </button>
                </span>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Advantages */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <div 
          className="flex items-center justify-between mb-4 cursor-pointer hover:bg-gray-50 p-2 rounded-md transition-colors"
          onClick={() => toggleSection('advantages')}
        >
          <div className="flex items-center space-x-2">
            <Star className="w-5 h-5 text-gray-600" />
            <h3 className="text-lg font-medium text-gray-900">Advantages</h3>
            <span className="text-sm text-gray-500">({formData.advantages?.length || 0})</span>
          </div>
          {expandedSections.advantages ? (
            <ChevronUp className="w-5 h-5 text-gray-400" />
          ) : (
            <ChevronDown className="w-5 h-5 text-gray-400" />
          )}
                </div>
                
        {expandedSections.advantages && (
          <div className="space-y-4">
            <div className="flex gap-2">
                  <input 
                    type="text" 
                value={advantageInput}
                onChange={(e) => setAdvantageInput(e.target.value)}
                onKeyDown={(e) => { 
                  if (e.key === 'Enter') { 
                    e.preventDefault(); 
                    handleAdd(advantageInput, setAdvantageInput, formData.advantages, (newList) => setFormData(prev => ({ ...prev, advantages: newList })))
                  }
                }}
                placeholder="Add advantage and press Enter" 
                className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 placeholder-gray-500" 
              />
              <button 
                type="button" 
                onClick={() => handleAdd(advantageInput, setAdvantageInput, formData.advantages, (newList) => setFormData(prev => ({ ...prev, advantages: newList })))}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
              >
                Add
              </button>
            </div>
            <div className="flex flex-wrap gap-2">
              {formData.advantages?.map((item, idx) => (
                <span key={idx} className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full flex items-center gap-1">
                  {item}
                  <button 
                    type="button" 
                    onClick={() => handleRemove(item, formData.advantages, (newList) => setFormData(prev => ({ ...prev, advantages: newList })))} 
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

      {/* FAQ */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <div 
          className="flex items-center justify-between mb-4 cursor-pointer hover:bg-gray-50 p-2 rounded-md transition-colors"
          onClick={() => toggleSection('faq')}
        >
          <div className="flex items-center space-x-2">
            <Info className="w-5 h-5 text-gray-600" />
            <h3 className="text-lg font-medium text-gray-900">Frequently Asked Questions</h3>
            <span className="text-sm text-gray-500">({formData.faq?.length || 0})</span>
                </div>
          {expandedSections.faq ? (
            <ChevronUp className="w-5 h-5 text-gray-400" />
          ) : (
            <ChevronDown className="w-5 h-5 text-gray-400" />
          )}
              </div>
              
        {expandedSections.faq && (
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <input
                type="text"
                value={faqQuestionInput}
                onChange={(e) => setFaqQuestionInput(e.target.value)}
                placeholder="Question"
                className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 placeholder-gray-500"
              />
              <input
                type="text"
                value={faqAnswerInput}
                onChange={(e) => setFaqAnswerInput(e.target.value)}
                placeholder="Answer"
                className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 placeholder-gray-500"
              />
              <button
                type="button"
                onClick={addFaq}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
              >
                Add FAQ
              </button>
            </div>
              <div className="space-y-2">
              {formData.faq?.map((faq, idx) => (
                <div key={idx} className="bg-gray-50 p-3 rounded-md flex items-center justify-between">
                  <div className="flex-1">
                    <div className="font-medium text-gray-900">{faq.question}</div>
                    <div className="text-gray-600 mt-1">{faq.answer}</div>
                  </div>
                  <button 
                    type="button" 
                    onClick={() => handleRemoveFaq(idx)} 
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
          onClick={submitTreatment}
          className={`px-8 py-3 rounded-lg transition-colors font-medium text-white ${submitting ? 'bg-blue-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'}`}
          disabled={submitting}
        >
          {submitting ? 'Creating...' : 'Create Treatment Profile'}
          </button>
        </div>
    </div>
  )
}

// Searchable Multi-Select Component
const SearchableMultiSelect = ({ 
  options = [], 
  selected = [], 
  onChange, 
  placeholder = "Search and select...", 
  displayKey = "name", 
  valueKey = "id",
  subtitleKey = null 
}) => {
  const [isOpen, setIsOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [searchInput, setSearchInput] = useState("")

  const filteredOptions = options.filter(option => {
    const displayText = option[displayKey]?.toLowerCase() || ""
    const subtitleText = subtitleKey ? option[subtitleKey]?.toLowerCase() || "" : ""
    const search = searchTerm.toLowerCase()
    return displayText.includes(search) || subtitleText.includes(search)
  })

  const selectedOptions = options.filter(option => selected.includes(option[valueKey]))

  const handleSelect = (option) => {
    const value = option[valueKey]
    if (selected.includes(value)) {
      onChange(selected.filter(id => id !== value))
    } else {
      onChange([...selected, value])
    }
    setSearchInput("")
    setSearchTerm("")
  }

  const handleRemove = (value) => {
    onChange(selected.filter(id => id !== value))
  }

  const handleSearchChange = (e) => {
    setSearchInput(e.target.value)
    setSearchTerm(e.target.value)
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Escape') {
      setIsOpen(false)
      setSearchInput("")
      setSearchTerm("")
    }
  }

  return (
    <div className="relative">
      {/* Search Input */}
      <div className="relative">
        <input
          type="text"
          value={searchInput}
          onChange={handleSearchChange}
          onFocus={() => setIsOpen(true)}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 placeholder-gray-500"
        />
        <div className="absolute inset-y-0 right-0 flex items-center pr-3">
          <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
      </div>

      {/* Selected Items Display */}
      {selectedOptions.length > 0 && (
        <div className="mt-2 flex flex-wrap gap-2">
          {selectedOptions.map(option => (
            <span
              key={option[valueKey]}
              className="inline-flex items-center gap-1 px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full"
            >
              {option[displayKey]}
              <button
                type="button"
                onClick={() => handleRemove(option[valueKey])}
                className="ml-1 text-blue-600 hover:text-blue-800"
              >
                ×
              </button>
            </span>
          ))}
        </div>
      )}

      {/* Dropdown Options */}
      {isOpen && (
        <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-y-auto">
          {filteredOptions.length === 0 ? (
            <div className="px-3 py-2 text-gray-500 text-sm">
              {searchTerm ? 'No results found' : 'No options available'}
            </div>
          ) : (
            filteredOptions.map(option => {
              const isSelected = selected.includes(option[valueKey])
              return (
                <div
                  key={option[valueKey]}
                  onClick={() => handleSelect(option)}
                  className={`px-3 py-2 cursor-pointer hover:bg-gray-50 flex items-center justify-between ${
                    isSelected ? 'bg-blue-50' : ''
                  }`}
                >
                  <div className="flex-1">
                    <div className="text-sm text-gray-900">{option[displayKey]}</div>
                    {subtitleKey && option[subtitleKey] && (
                      <div className="text-xs text-gray-500">{option[subtitleKey]}</div>
                    )}
                  </div>
                  {isSelected && (
                    <svg className="w-4 h-4 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  )}
                </div>
              )
            })
          )}
        </div>
      )}

      {/* Click outside to close */}
      {isOpen && (
        <div
          className="fixed inset-0 z-0"
          onClick={() => {
            setIsOpen(false)
            setSearchInput("")
            setSearchTerm("")
          }}
        />
        )}
      </div>
  )
}