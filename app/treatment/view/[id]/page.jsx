"use client"

import { useEffect, useState, use } from 'react'
import TreatmentApi from '@/lib/api/treatmentApi'
import { Layout } from '@/components/layout'
import Link from 'next/link'
import { Stethoscope, Star, Clock, DollarSign, Building2, User, Info, Award, Microscope, ChevronDown, ChevronUp } from "lucide-react"

export default function TreatmentView({ params }) {
  const resolvedParams = use(params)
  const { id } = resolvedParams
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [expandedSections, setExpandedSections] = useState({
    diagnosticTools: false,
    advancedTreatmentOptions: false,
    advantages: false,
    faq: false
  })
  const [error, setError] = useState("")

  const toggleSection = (section) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }))
  }

  const withBase = (p) => {
    if (!p) return ''
    if (p.startsWith('http')) return p
    return `http://localhost:5000${p}`
  }

  useEffect(() => {
    setLoading(true)
    TreatmentApi.getById(id)
      .then(res => {
        setData(res.data || res)
      })
      .catch(err => setError(err?.message || 'Failed to load treatment'))
      .finally(() => setLoading(false))
  }, [id])

  if (loading) return <Layout><p className="p-6">Loading...</p></Layout>
  if (error) return <Layout><p className="p-6 text-red-600">{error}</p></Layout>
  if (!data) return <Layout><p className="p-6">Treatment not found</p></Layout>

  return (
    <Layout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">{data.name}</h1>
            <p className="text-gray-700 text-lg">{data.category} • {data.duration} • {data.recovery}</p>
          </div>
          <div className="flex space-x-3">
            <Link href={`/treatment/edit/${id}`}>
              <button className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold shadow-sm">
                Edit Treatment
              </button>
            </Link>
            <Link href="/treatment">
              <button className="px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors font-semibold shadow-sm">
                Back to List
              </button>
            </Link>
          </div>
        </div>

        {/* Treatment Profile Card */}
        <div className="bg-white rounded-lg shadow-lg border border-gray-200 overflow-hidden">
          <div className="p-6 border-b border-gray-200 bg-gradient-to-r from-blue-50 to-indigo-50">
            <div className="flex items-start space-x-6">
              {data.image && (
                <div className="flex-shrink-0">
                  <img
                    src={withBase(data.image)}
                    alt={data.name}
                    className="w-32 h-32 rounded-lg object-cover border-4 border-white shadow-lg"
                  />
                </div>
              )}
              <div className="flex-1 min-w-0">
                <div className="flex items-center space-x-4 mb-4">
                  <div className="flex items-center space-x-2">
                    <Clock className="w-5 h-5 text-blue-500" />
                    <span className="text-lg font-semibold text-gray-900">{data.duration}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-gray-600">
                    <User className="w-5 h-5" />
                    <span>Recovery: {data.recovery}</span>
                  </div>
                </div>
                {data.description && (
                  <div className="bg-white rounded-lg p-4 border border-gray-200">
                    <h3 className="font-semibold text-gray-900 mb-2">Description</h3>
                    <p className="text-gray-700 leading-relaxed">{data.description}</p>
                  </div>
                )}
              </div>

              {/* Record Information - Right Side */}
              {(data.createdBy || data.createdAt || data.updatedBy || data.updatedAt) && (
                <div className="bg-gray-50 rounded-lg p-4 min-w-[280px]">
                  <div className="space-y-2 text-sm">
                    {data.createdBy && (
                      <div className="flex items-center gap-2">
                        <span className="text-gray-600 font-medium">Created By:</span>
                        <span className="text-blue-600 font-semibold">
                          {typeof data.createdBy === 'object' ? data.createdBy.name || data.createdBy.username : data.createdBy}
                        </span>
                        {data.createdAt && (
                          <span className="text-gray-500 text-xs ml-2">
                            on {new Date(data.createdAt).toLocaleDateString()}
                          </span>
                        )}
                      </div>
                    )}
                    {data.updatedBy && (
                      <div className="flex items-center gap-2">
                        <span className="text-gray-600 font-medium">Updated By:</span>
                        <span className="text-green-600 font-semibold">
                          {typeof data.updatedBy === 'object' ? data.updatedBy.name || data.updatedBy.username : data.updatedBy}
                        </span>
                        {data.updatedAt && (
                          <span className="text-gray-500 text-xs ml-2">
                            on {new Date(data.updatedAt).toLocaleDateString()}
                          </span>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Collapsible Sections */}
          <div className="p-6 space-y-6">
            {/* Basic Information */}
            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <Info className="w-5 h-5 mr-2 text-blue-600" />
                Basic Information
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-3">
                  <div><span className="font-medium text-gray-700">Treatment ID:</span> <span className="text-gray-900">{data.id}</span></div>
                  <div><span className="font-medium text-gray-700">Name:</span> <span className="text-gray-900">{data.name}</span></div>
                  <div><span className="font-medium text-gray-700">Category:</span> <span className="text-gray-900">{data.category}</span></div>
                </div>
                <div className="space-y-3">
                  <div><span className="font-medium text-gray-700">Duration:</span> <span className="text-gray-900">{data.duration}</span></div>
                  <div><span className="font-medium text-gray-700">Recovery Time:</span> <span className="text-gray-900">{data.recovery}</span></div>
                </div>
              </div>
            </div>

            {/* Cost Considerations */}
            {data.costConsiderations && (
              <div className="bg-gray-50 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                  <DollarSign className="w-5 h-5 mr-2 text-green-600" />
                  Cost Considerations
                </h3>
                <div className="bg-white rounded-lg p-4 border border-gray-200">
                  <p className="text-gray-700 leading-relaxed">{data.costConsiderations}</p>
                </div>
              </div>
            )}

            {/* Hospital & Doctor Information */}
            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <Building2 className="w-5 h-5 mr-2 text-green-600" />
                Hospital & Doctor Information
              </h3>
              <div className="space-y-4">
                {data.topHospitals && data.topHospitals.length > 0 && (
                  <div>
                    <span className="font-medium text-gray-700">Top Hospitals:</span>
                    <div className="mt-2 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {data.topHospitals.map((hospital, idx) => (
                        <div key={idx} className="p-4 bg-white rounded-lg border hover:shadow-md transition-shadow">
                          <div className="flex items-center space-x-3">
                            {hospital.image && (
                              <img
                                src={withBase(hospital.image)}
                                alt={hospital.name}
                                className="w-12 h-12 rounded-lg object-cover border"
                              />
                            )}
                            <div className="flex-1 min-w-0">
                              <div className="font-medium text-gray-900 truncate">{hospital.name || hospital}</div>
                              {hospital.location && (
                                <div className="text-sm text-gray-600 truncate">{hospital.location}</div>
                              )}
                              {hospital.rating && (
                                <div className="flex items-center mt-1 space-x-2">
                                  {typeof hospital.rating === 'object' ? (
                                    <>
                                      {hospital.rating.userScore && (
                                        <div className="flex items-center">
                                          <Star className="w-4 h-4 text-yellow-400 fill-current" />
                                          <span className="text-sm text-gray-600 ml-1">{hospital.rating.userScore}/10</span>
                                        </div>
                                      )}
                                      {hospital.rating.googleRating && (
                                        <div className="flex items-center">
                                          <span className="text-sm text-gray-600">Google: {hospital.rating.googleRating}/5</span>
                                        </div>
                                      )}
                                    </>
                                  ) : (
                                    <div className="flex items-center">
                                      <Star className="w-4 h-4 text-yellow-400 fill-current" />
                                      <span className="text-sm text-gray-600 ml-1">{hospital.rating}</span>
                                    </div>
                                  )}
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                {data.topDoctors && data.topDoctors.length > 0 && (
                  <div>
                    <span className="font-medium text-gray-700">Top Doctors:</span>
                    <div className="mt-2 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {data.topDoctors.map((doctor, idx) => (
                        <div key={idx} className="p-4 bg-white rounded-lg border hover:shadow-md transition-shadow">
                          <div className="flex items-center space-x-3">
                            {doctor.image && (
                              <img
                                src={withBase(doctor.image)}
                                alt={doctor.name}
                                className="w-12 h-12 rounded-full object-cover border"
                              />
                            )}
                            <div className="flex-1 min-w-0">
                              <div className="font-medium text-gray-900 truncate">{doctor.name || doctor}</div>
                              {doctor.specialty && (
                                <div className="text-sm text-gray-600 truncate">{doctor.specialty}</div>
                              )}
                              {doctor.experience && (
                                <div className="text-sm text-gray-500 truncate">{doctor.experience}</div>
                              )}
                              {doctor.rating && (
                                <div className="flex items-center mt-1">
                                  <Star className="w-4 h-4 text-yellow-400 fill-current" />
                                  <span className="text-sm text-gray-600 ml-1">{doctor.rating}</span>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                {data.hospitalSelectionHelp && (
                  <div>
                    <span className="font-medium text-gray-700">Hospital Selection Help:</span>
                    <div className="mt-1 p-3 bg-white rounded-lg border">
                      <p className="text-gray-700">{data.hospitalSelectionHelp}</p>
                    </div>
                  </div>
                )}
                {data.doctorSelectionHelp && (
                  <div>
                    <span className="font-medium text-gray-700">Doctor Selection Help:</span>
                    <div className="mt-1 p-3 bg-white rounded-lg border">
                      <p className="text-gray-700">{data.doctorSelectionHelp}</p>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Diagnostic Tools */}
            <div className="bg-gray-50 rounded-lg p-6">
              <div 
                className="flex items-center justify-between cursor-pointer hover:bg-gray-100 p-2 rounded-md transition-colors"
                onClick={() => toggleSection('diagnosticTools')}
              >
                <h3 className="text-lg font-semibold text-gray-900 flex items-center">
                  <Microscope className="w-5 h-5 mr-2 text-purple-600" />
                  Diagnostic Tools
                  <span className="ml-2 text-sm font-normal text-gray-500">({data.diagnosticTools?.length || 0})</span>
                </h3>
                {expandedSections.diagnosticTools ? (
                  <ChevronUp className="w-5 h-5 text-gray-400" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-gray-400" />
                )}
              </div>
              {expandedSections.diagnosticTools && (
                <div className="mt-4">
                  {data.diagnosticTools && data.diagnosticTools.length > 0 ? (
                    <div className="flex flex-wrap gap-2">
                      {data.diagnosticTools.map((tool, idx) => (
                        <span key={idx} className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm font-medium">
                          {tool}
                        </span>
                      ))}
                    </div>
                  ) : (
                    <div className="text-gray-500 text-sm">No diagnostic tools listed</div>
                  )}
                </div>
              )}
            </div>

            {/* Advanced Treatment Options */}
            <div className="bg-gray-50 rounded-lg p-6">
              <div 
                className="flex items-center justify-between cursor-pointer hover:bg-gray-100 p-2 rounded-md transition-colors"
                onClick={() => toggleSection('advancedTreatmentOptions')}
              >
                <h3 className="text-lg font-semibold text-gray-900 flex items-center">
                  <Award className="w-5 h-5 mr-2 text-indigo-600" />
                  Advanced Treatment Options
                  <span className="ml-2 text-sm font-normal text-gray-500">({data.advancedTreatmentOptions?.length || 0})</span>
                </h3>
                {expandedSections.advancedTreatmentOptions ? (
                  <ChevronUp className="w-5 h-5 text-gray-400" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-gray-400" />
                )}
              </div>
              {expandedSections.advancedTreatmentOptions && (
                <div className="mt-4">
                  {data.advancedTreatmentOptions && data.advancedTreatmentOptions.length > 0 ? (
                    <div className="space-y-3">
                      {data.advancedTreatmentOptions.map((option, idx) => (
                        <div key={idx} className="p-4 bg-white rounded-lg border border-gray-200">
                          <div className="text-gray-900 font-medium">{option}</div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-gray-500 text-sm">No advanced treatment options listed</div>
                  )}
                </div>
              )}
            </div>

            {/* Advantages */}
            <div className="bg-gray-50 rounded-lg p-6">
              <div 
                className="flex items-center justify-between cursor-pointer hover:bg-gray-100 p-2 rounded-md transition-colors"
                onClick={() => toggleSection('advantages')}
              >
                <h3 className="text-lg font-semibold text-gray-900 flex items-center">
                  <Star className="w-5 h-5 mr-2 text-yellow-600" />
                  Advantages
                  <span className="ml-2 text-sm font-normal text-gray-500">({data.advantages?.length || 0})</span>
                </h3>
                {expandedSections.advantages ? (
                  <ChevronUp className="w-5 h-5 text-gray-400" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-gray-400" />
                )}
              </div>
              {expandedSections.advantages && (
                <div className="mt-4">
                  {data.advantages && data.advantages.length > 0 ? (
                    <div className="flex flex-wrap gap-2">
                      {data.advantages.map((advantage, idx) => (
                        <span key={idx} className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-sm font-medium">
                          {advantage}
                        </span>
                      ))}
                    </div>
                  ) : (
                    <div className="text-gray-500 text-sm">No advantages listed</div>
                  )}
                </div>
              )}
            </div>

            {/* FAQ */}
            <div className="bg-gray-50 rounded-lg p-6">
              <div 
                className="flex items-center justify-between cursor-pointer hover:bg-gray-100 p-2 rounded-md transition-colors"
                onClick={() => toggleSection('faq')}
              >
                <h3 className="text-lg font-semibold text-gray-900 flex items-center">
                  <Info className="w-5 h-5 mr-2 text-orange-600" />
                  Frequently Asked Questions
                  <span className="ml-2 text-sm font-normal text-gray-500">({data.faq?.length || 0})</span>
                </h3>
                {expandedSections.faq ? (
                  <ChevronUp className="w-5 h-5 text-gray-400" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-gray-400" />
                )}
              </div>
              {expandedSections.faq && (
                <div className="mt-4">
                  {data.faq && data.faq.length > 0 ? (
                    <div className="space-y-4">
                      {data.faq.map((faq, idx) => (
                        <div key={idx} className="p-4 bg-white rounded-lg border-l-4 border-orange-400">
                          <div className="font-medium text-gray-900 mb-2">{faq.question}</div>
                          <div className="text-gray-700">{faq.answer}</div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-gray-500 text-sm">No FAQ listed</div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}
