"use client"

import { useEffect, useState, use } from 'react'
import DoctorApi from '@/lib/api/doctorApi'
import { Layout } from '@/components/layout'
import Link from 'next/link'
import { Building2, Star, Users, Bed, Calendar, Mail, Phone, Globe, MapPin, Award, Info, Navigation, Stethoscope, Microscope, Camera, ChevronDown, ChevronUp, Briefcase, BookOpen, GraduationCap, FileText } from "lucide-react"
import { resolveBackendPath } from '@/lib/config'

export default function DoctorView({ params }) {
  const resolvedParams = use(params)
  const { id } = resolvedParams
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [expandedSections, setExpandedSections] = useState({
    specializations: false,
    degrees: false,
    professionalExperience: false,
    languages: false,
    awards: false,
    publications: false,
    certifications: false,
    researchWork: false
  })
  const [error, setError] = useState("")

  const toggleSection = (section) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }))
  }

  const withBase = (p) => resolveBackendPath(p)

  useEffect(() => {
    setLoading(true)
    DoctorApi.getById(id)
      .then(res => {
        setData(res.data || res)
      })
      .catch(err => setError(err?.message || 'Failed to load doctor'))
      .finally(() => setLoading(false))
  }, [id])

  if (loading) return <Layout><p className="p-6">Loading...</p></Layout>
  if (error) return <Layout><p className="p-6 text-red-600">{error}</p></Layout>
  if (!data) return <Layout><p className="p-6">Doctor not found</p></Layout>

  return (
    <Layout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">{data.name}</h1>
            <p className="text-gray-700 text-lg">{data.specialty} • {data.location}</p>
          </div>
          <div className="flex space-x-3">
            <Link href={`/doctors/edit/${id}`}>
              <button className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold shadow-sm">
                Edit Doctor
              </button>
            </Link>
            <Link href="/doctors">
              <button className="px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors font-semibold shadow-sm">
                Back to List
              </button>
            </Link>
          </div>
        </div>

        {/* Doctor Profile Card */}
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
                    <Star className="w-5 h-5 text-yellow-500 fill-current" />
                    <span className="text-lg font-semibold text-gray-900">{data.rating || 'N/A'}</span>
                  </div>
                  {data.experience && (
                    <div className="flex items-center space-x-2 text-gray-600">
                      <Calendar className="w-5 h-5" />
                      <span>{data.experience} years experience</span>
                    </div>
                  )}
                </div>
                {data.introduction && (
                  <div className="bg-white rounded-lg p-4 border border-gray-200">
                    <h3 className="font-semibold text-gray-900 mb-2">About</h3>
                    <p className="text-gray-700 leading-relaxed">{data.introduction}</p>
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
                  <div><span className="font-medium text-gray-700">Doctor ID:</span> <span className="text-gray-900">{data.id}</span></div>
                  <div><span className="font-medium text-gray-700">Name:</span> <span className="text-gray-900">{data.name}</span></div>
                  <div><span className="font-medium text-gray-700">Specialty:</span> <span className="text-gray-900">{data.specialty}</span></div>
                </div>
                <div className="space-y-3">
                  <div><span className="font-medium text-gray-700">Location:</span> <span className="text-gray-900">{data.location}</span></div>
                  <div><span className="font-medium text-gray-700">Experience:</span> <span className="text-gray-900">{data.experience || 'N/A'} years</span></div>
                  <div><span className="font-medium text-gray-700">Rating:</span> <span className="text-gray-900">{data.rating || 'N/A'}</span></div>
                </div>
              </div>
            </div>

            {/* Hospital Affiliation */}
            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <Building2 className="w-5 h-5 mr-2 text-green-600" />
                Hospital Affiliation
              </h3>
              <div className="space-y-4">
                {data.customHospitalName ? (
                  <div>
                    <span className="font-medium text-gray-700">Primary Hospital:</span>
                    <div className="mt-1 p-3 bg-white rounded-lg border">
                      <div className="font-medium text-gray-900">{data.customHospitalName}</div>
                      <span className="text-xs text-gray-500 italic">(Custom Hospital)</span>
                    </div>
                  </div>
                ) : data.hospitalId ? (
                  <div>
                    <span className="font-medium text-gray-700">Primary Hospital:</span>
                    <div className="mt-1 p-3 bg-white rounded-lg border">
                      <div className="font-medium text-gray-900">{data.hospitalId.name || data.hospitalId}</div>
                    </div>
                  </div>
                ) : (
                  <div className="text-gray-500">No primary hospital assigned</div>
                )}
                {data.affiliatedHospitalIds && data.affiliatedHospitalIds.length > 0 && (
                  <div>
                    <span className="font-medium text-gray-700">Affiliated Hospitals:</span>
                    <div className="mt-2 space-y-2">
                      {data.affiliatedHospitalIds.map((hospital, idx) => (
                        <div key={idx} className="p-3 bg-white rounded-lg border">
                          <div className="font-medium text-gray-900">{typeof hospital === 'string' ? hospital : hospital.name || hospital}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Research Work */}
            {data.researchWork && (
              <div className="bg-gray-50 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                  <FileText className="w-5 h-5 mr-2 text-blue-600" />
                  Research Work
                </h3>
                <div className="p-4 bg-white rounded-lg border border-gray-200">
                  <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">{data.researchWork}</p>
                </div>
              </div>
            )}

            {/* Medical Specializations */}
            <div className="bg-gray-50 rounded-lg p-6">
              <div 
                className="flex items-center justify-between cursor-pointer hover:bg-gray-100 p-2 rounded-md transition-colors"
                onClick={() => toggleSection('specializations')}
              >
                <h3 className="text-lg font-semibold text-gray-900 flex items-center">
                  <Stethoscope className="w-5 h-5 mr-2 text-purple-600" />
                  Medical Specializations
                  <span className="ml-2 text-sm font-normal text-gray-500">({data.specializations?.length || 0})</span>
                </h3>
                {expandedSections.specializations ? (
                  <ChevronUp className="w-5 h-5 text-gray-400" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-gray-400" />
                )}
              </div>
              {expandedSections.specializations && (
                <div className="mt-4">
                  {data.specializations && data.specializations.length > 0 ? (
                    <div className="flex flex-wrap gap-2">
                      {data.specializations.map((spec, idx) => (
                        <span key={idx} className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm font-medium">
                          {spec}
                        </span>
                      ))}
                    </div>
                  ) : (
                    <div className="text-gray-500 text-sm">No specializations listed</div>
                  )}
                </div>
              )}
            </div>

            {/* Education */}
            <div className="bg-gray-50 rounded-lg p-6">
              <div 
                className="flex items-center justify-between cursor-pointer hover:bg-gray-100 p-2 rounded-md transition-colors"
                onClick={() => toggleSection('degrees')}
              >
                <h3 className="text-lg font-semibold text-gray-900 flex items-center">
                  <Award className="w-5 h-5 mr-2 text-indigo-600" />
                  Education
                  <span className="ml-2 text-sm font-normal text-gray-500">({data.degrees?.length || 0})</span>
                </h3>
                {expandedSections.degrees ? (
                  <ChevronUp className="w-5 h-5 text-gray-400" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-gray-400" />
                )}
              </div>
              {expandedSections.degrees && (
                <div className="mt-4">
                  {data.degrees && data.degrees.length > 0 ? (
                    <div className="space-y-2">
                      {data.degrees.map((deg, idx) => (
                        <div key={idx} className="bg-gray-50 p-3 rounded-md">
                          <span className="font-semibold text-gray-800">{deg.name}</span>
                          <span className="text-gray-600"> from {deg.institution}</span>
                          <span className="text-gray-500"> ({deg.year})</span>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-gray-500 text-sm">No education details listed</div>
                  )}
                </div>
              )}
            </div>

            {/* Professional Experience */}
            <div className="bg-gray-50 rounded-lg p-6">
              <div 
                className="flex items-center justify-between cursor-pointer hover:bg-gray-100 p-2 rounded-md transition-colors"
                onClick={() => toggleSection('professionalExperience')}
              >
                <h3 className="text-lg font-semibold text-gray-900 flex items-center">
                  <Briefcase className="w-5 h-5 mr-2 text-blue-600" />
                  Professional Experience
                  <span className="ml-2 text-sm font-normal text-gray-500">({data.professionalExperience?.length || 0})</span>
                </h3>
                {expandedSections.professionalExperience ? (
                  <ChevronUp className="w-5 h-5 text-gray-400" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-gray-400" />
                )}
              </div>
              {expandedSections.professionalExperience && (
                <div className="mt-4">
                  {data.professionalExperience && data.professionalExperience.length > 0 ? (
                    <div className="space-y-2">
                      {data.professionalExperience.map((exp, idx) => (
                        <div key={idx} className="bg-gray-50 p-3 rounded-md">
                          <span className="font-semibold text-gray-800">{exp.position}</span>
                          <span className="text-gray-600"> at {exp.institution}</span>
                          <span className="text-gray-500"> ({exp.duration})</span>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-gray-500 text-sm">No professional experience listed</div>
                  )}
                </div>
              )}
            </div>

            {/* Languages */}
            <div className="bg-gray-50 rounded-lg p-6">
              <div 
                className="flex items-center justify-between cursor-pointer hover:bg-gray-100 p-2 rounded-md transition-colors"
                onClick={() => toggleSection('languages')}
              >
                <h3 className="text-lg font-semibold text-gray-900 flex items-center">
                  <Globe className="w-5 h-5 mr-2 text-orange-600" />
                  Languages
                  <span className="ml-2 text-sm font-normal text-gray-500">({data.languages?.length || 0})</span>
                </h3>
                {expandedSections.languages ? (
                  <ChevronUp className="w-5 h-5 text-gray-400" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-gray-400" />
                )}
              </div>
              {expandedSections.languages && (
                <div className="mt-4">
                  {data.languages && data.languages.length > 0 ? (
                    <div className="flex flex-wrap gap-2">
                      {data.languages.map((lang, idx) => (
                        <span key={idx} className="bg-orange-100 text-orange-800 px-3 py-1 rounded-full text-sm font-medium">
                          {lang}
                        </span>
                      ))}
                    </div>
                  ) : (
                    <div className="text-gray-500 text-sm">No languages listed</div>
                  )}
                </div>
              )}
            </div>

            {/* Awards & Recognitions */}
            <div className="bg-gray-50 rounded-lg p-6">
              <div 
                className="flex items-center justify-between cursor-pointer hover:bg-gray-100 p-2 rounded-md transition-colors"
                onClick={() => toggleSection('awards')}
              >
                <h3 className="text-lg font-semibold text-gray-900 flex items-center">
                  <Award className="w-5 h-5 mr-2 text-yellow-600" />
                  Awards & Recognitions
                  <span className="ml-2 text-sm font-normal text-gray-500">({data.awards?.length || 0})</span>
                </h3>
                {expandedSections.awards ? (
                  <ChevronUp className="w-5 h-5 text-gray-400" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-gray-400" />
                )}
              </div>
              {expandedSections.awards && (
                <div className="mt-4">
                  {data.awards && data.awards.length > 0 ? (
                    <div className="space-y-3">
                      {data.awards.map((award, idx) => (
                        <div key={idx} className="p-4 bg-white rounded-lg border-l-4 border-yellow-400">
                          <div className="text-gray-900 font-medium">{award}</div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-gray-500 text-sm">No awards listed</div>
                  )}
                </div>
              )}
            </div>

            {/* Publications */}
            <div className="bg-gray-50 rounded-lg p-6">
              <div 
                className="flex items-center justify-between cursor-pointer hover:bg-gray-100 p-2 rounded-md transition-colors"
                onClick={() => toggleSection('publications')}
              >
                <h3 className="text-lg font-semibold text-gray-900 flex items-center">
                  <BookOpen className="w-5 h-5 mr-2 text-indigo-600" />
                  Publications
                  <span className="ml-2 text-sm font-normal text-gray-500">({data.publications?.length || 0})</span>
                </h3>
                {expandedSections.publications ? (
                  <ChevronUp className="w-5 h-5 text-gray-400" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-gray-400" />
                )}
              </div>
              {expandedSections.publications && (
                <div className="mt-4">
                  {data.publications && data.publications.length > 0 ? (
                    <div className="space-y-3">
                      {data.publications.map((publication, idx) => (
                        <div key={idx} className="p-4 bg-white rounded-lg border-l-4 border-indigo-400">
                          <div className="text-gray-900 font-medium">{publication}</div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-gray-500 text-sm">No publications listed</div>
                  )}
                </div>
              )}
            </div>

            {/* Certifications */}
            <div className="bg-gray-50 rounded-lg p-6">
              <div 
                className="flex items-center justify-between cursor-pointer hover:bg-gray-100 p-2 rounded-md transition-colors"
                onClick={() => toggleSection('certifications')}
              >
                <h3 className="text-lg font-semibold text-gray-900 flex items-center">
                  <GraduationCap className="w-5 h-5 mr-2 text-teal-600" />
                  Certifications
                  <span className="ml-2 text-sm font-normal text-gray-500">({data.certifications?.length || 0})</span>
                </h3>
                {expandedSections.certifications ? (
                  <ChevronUp className="w-5 h-5 text-gray-400" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-gray-400" />
                )}
              </div>
              {expandedSections.certifications && (
                <div className="mt-4">
                  {data.certifications && data.certifications.length > 0 ? (
                    <div className="space-y-3">
                      {data.certifications.map((certification, idx) => (
                        <div key={idx} className="p-4 bg-white rounded-lg border-l-4 border-teal-400">
                          <div className="text-gray-900 font-medium">{certification}</div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-gray-500 text-sm">No certifications listed</div>
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


