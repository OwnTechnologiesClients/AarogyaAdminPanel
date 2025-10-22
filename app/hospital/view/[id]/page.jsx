"use client"

import { useEffect, useState } from "react"
import { Layout } from "@/components/layout"
import { useParams, useRouter } from "next/navigation"
import HospitalApi from "@/lib/api/hospitalApi"
import Link from "next/link"
import { Building2, Star, Users, Bed, Calendar, Mail, Phone, Globe, MapPin, Award, Info, Navigation, Stethoscope, Microscope, Camera, ChevronDown, ChevronUp, User } from "lucide-react"

export default function HospitalViewPage() {
  const params = useParams()
  const router = useRouter()
  const id = params?.id
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [expandedSections, setExpandedSections] = useState({
    specialties: true,
    features: true,
    equipment: true,
    gallery: true,
    doctors: true
  })

  const toggleSection = (section) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }))
  }

  useEffect(() => {
    if (!id) return
    const fetchOne = async () => {
      setLoading(true)
      try {
        const json = await HospitalApi.getById(id)
        if (!json?.success) throw new Error(json?.message || 'Failed to load')
        setData(json.data)
      } catch (e) {
        setError(e?.message || 'Error')
      } finally {
        setLoading(false)
      }
    }
    fetchOne()
  }, [id])

  const withBase = (p) => {
    if (!p) return ''
    if (p.startsWith('http')) return p
    const path = p.startsWith('/') ? p : `/${p}`
    return `http://localhost:5000${path}`
  }

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold text-gray-900">Hospital Details</h1>
          {data?.id && (
            <Link href={`/hospital/edit/${data.id}`} className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">Edit</Link>
          )}
        </div>
        {loading && <p className="text-gray-600">Loading...</p>}
        {error && <p className="text-red-600">{error}</p>}
        {data && (
          <div className="space-y-6">
            {/* Hospital Header */}
            <div className="bg-white rounded-xl border p-6">
              <div className="flex items-center gap-6">
                <div className="w-24 h-24 rounded-lg overflow-hidden border bg-gray-100 flex items-center justify-center">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  {(() => {
                    const headerImg = (Array.isArray(data.gallery) && data.gallery[0]) ? data.gallery[0] : data.image
                    return headerImg ? (
                    <img
                      src={withBase(headerImg)}
                      alt={data.name}
                      className="w-full h-full object-cover"
                      loading="lazy"
                      decoding="async"
                      onError={(e) => { e.currentTarget.src = '/logo.png' }}
                    />
                  ) : (
                    <span className="text-gray-400 text-xs">No Image</span>
                  )
                  })()}
                </div>
                
                <div className="flex-1">
                  <h2 className="text-2xl font-bold text-gray-900">{data.name}</h2>
                  <p className="text-gray-600">{data.location}</p>
                  <p className="text-gray-800 font-semibold">User Score: {data.rating?.userScore ?? data.userScore ?? '-' } • Google: {data.rating?.googleRating ?? data.googleRating ?? '-'}</p>
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

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 space-y-6">
                {/* Basic Information */}
                <div className="bg-white rounded-xl border p-6">
                  <h3 className="text-lg font-semibold mb-4 flex items-center gap-2 text-gray-900">
                    <Building2 className="w-5 h-5 text-gray-900" />
                    Basic Information
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-800">
                    <div><span className="font-semibold text-gray-900">Hospital ID:</span> <span className="text-gray-800">{data.id}</span></div>
                    <div><span className="font-semibold text-gray-900">Year Founded:</span> <span className="text-gray-800">{data.overview?.founded || data.established || '-'}</span></div>
                    <div><span className="font-semibold text-gray-900">Annual Patients:</span> <span className="text-gray-800">{data.overview?.patients || '-'}</span></div>
                    <div><span className="font-semibold text-gray-900">Total Doctors:</span> <span className="text-gray-800">{data.overview?.doctors || data.doctorsCount || '-'}</span></div>
                    <div><span className="font-semibold text-gray-900">Operation Theaters:</span> <span className="text-gray-800">{data.overview?.sizeAndCapacity?.ot || '-'}</span></div>
                    <div><span className="font-semibold text-gray-900">ICU Beds:</span> <span className="text-gray-800">{data.overview?.sizeAndCapacity?.icu || '-'}</span></div>
                    <div><span className="font-semibold text-gray-900">Patient Beds:</span> <span className="text-gray-800">{data.overview?.sizeAndCapacity?.patientBeds || '-'}</span></div>
                  </div>
                </div>

                {/* About Hospital */}
                {data.about && (data.about.description || data.about.vision || data.about.mission) && (
                  <div className="bg-white rounded-xl border p-6">
                    <h3 className="text-lg font-semibold mb-4 flex items-center gap-2 text-gray-900">
                      <Info className="w-5 h-5 text-gray-900" />
                      About Hospital
                    </h3>
                    {data.about.description && (
                      <div className="mb-4">
                        <h4 className="font-semibold mb-2">Description:</h4>
                        <p className="text-gray-700">{data.about.description}</p>
                      </div>
                    )}
                    {data.about.vision && (
                      <div className="mb-4">
                        <h4 className="font-semibold mb-2">Vision:</h4>
                        <p className="text-gray-700">{data.about.vision}</p>
                      </div>
                    )}
                    {data.about.mission && (
                      <div>
                        <h4 className="font-semibold mb-2">Mission:</h4>
                        <p className="text-gray-700">{data.about.mission}</p>
                      </div>
                    )}
                  </div>
                )}

                {/* Specialties */}
                <div className="bg-white rounded-xl border p-6">
                  <div 
                    className="flex items-center justify-between mb-4 cursor-pointer hover:bg-gray-50 p-2 rounded-md transition-colors"
                    onClick={() => toggleSection('specialties')}
                  >
                    <h3 className="text-lg font-semibold flex items-center gap-2 text-gray-900">
                      <Stethoscope className="w-5 h-5 text-gray-900" />
                      Medical Specialties ({data.specialties?.length || 0})
                    </h3>
                    {expandedSections.specialties ? (
                      <ChevronUp className="w-5 h-5 text-gray-400" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-gray-400" />
                    )}
                  </div>
                  
                  {expandedSections.specialties && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {(data.specialties || []).map((s, i) => (
                        <div key={i} className="border border-gray-200 rounded-lg p-4 bg-gray-50">
                          <h4 className="font-semibold text-gray-900">{s?.name}</h4>
                          {s?.rating && <p className="text-sm text-gray-600">Rating: {s.rating}/5</p>}
                          {s?.doctorsCount && <p className="text-sm text-gray-600">Doctors: {s.doctorsCount}</p>}
                          {s?.description && <p className="text-sm text-gray-700 mt-2">{s.description}</p>}
                          {s?.keyServices && s.keyServices.length > 0 && (
                            <div className="mt-2">
                              <p className="text-xs font-semibold text-gray-600">Key Services:</p>
                              <p className="text-xs text-gray-700">{s.keyServices.join(', ')}</p>
                            </div>
                          )}
                        </div>
                      ))}
                      {(!data.specialties || data.specialties.length === 0) && (
                        <p className="text-gray-500">No specialties available</p>
                      )}
                    </div>
                  )}
                </div>

                {/* Associated Doctors */}
                <div className="bg-white rounded-xl border p-6">
                  <div 
                    className="flex items-center justify-between mb-4 cursor-pointer hover:bg-gray-50 p-2 rounded-md transition-colors"
                    onClick={() => toggleSection('doctors')}
                  >
                    <h3 className="text-lg font-semibold flex items-center gap-2 text-gray-900">
                      <User className="w-5 h-5 text-gray-900" />
                      Associated Doctors ({data.doctors?.length || 0})
                    </h3>
                    {expandedSections.doctors ? (
                      <ChevronUp className="w-5 h-5 text-gray-400" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-gray-400" />
                    )}
                  </div>
                  
                  {expandedSections.doctors && (
                    <div className="space-y-4">
                      {(data.doctors && data.doctors.length > 0) ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {data.doctors.map((doctor, i) => (
                            <div key={i} className="border border-gray-200 rounded-lg p-4 bg-gray-50 hover:bg-gray-100 transition-colors">
                              <div className="flex items-start gap-4">
                                <div className="w-16 h-16 rounded-lg overflow-hidden border bg-gray-100 flex items-center justify-center flex-shrink-0">
                                  {doctor.image ? (
                                    <img
                                      src={withBase(doctor.image)}
                                      alt={doctor.name}
                                      className="w-full h-full object-cover"
                                      loading="lazy"
                                      decoding="async"
                                      onError={(e) => { e.currentTarget.src = '/logo.png' }}
                                    />
                                  ) : (
                                    <User className="w-8 h-8 text-gray-400" />
                                  )}
                                </div>
                                <div className="flex-1 min-w-0">
                                  <h4 className="font-semibold text-gray-900 truncate">{doctor.name}</h4>
                                  <p className="text-sm text-blue-600 font-medium">{doctor.specialty}</p>
                                  <div className="mt-2 space-y-1">
                                    {doctor.experience && (
                                      <p className="text-xs text-gray-600">{doctor.experience} experience</p>
                                    )}
                                    {doctor.location && (
                                      <p className="text-xs text-gray-600">{doctor.location}</p>
                                    )}
                                    {doctor.rating && (
                                      <div className="flex items-center gap-1">
                                        <Star className="w-3 h-3 text-yellow-400 fill-current" />
                                        <span className="text-xs text-gray-600">{doctor.rating}</span>
                                      </div>
                                    )}
                                  </div>
                                  <div className="mt-3">
                                    <Link 
                                      href={`/doctors/view/${doctor.id}`}
                                      className="text-xs text-blue-600 hover:text-blue-800 font-medium"
                                    >
                                      View Profile →
                                    </Link>
                                  </div>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className="text-center py-8 text-gray-500">
                          <User className="w-12 h-12 text-gray-300 mx-auto mb-2" />
                          <p className="text-sm">No doctors associated with this hospital</p>
                        </div>
                      )}
                    </div>
                  )}
                </div>

                {/* Hospital Features */}
                <div className="bg-white rounded-xl border p-6">
                  <div 
                    className="flex items-center justify-between mb-4 cursor-pointer hover:bg-gray-50 p-2 rounded-md transition-colors"
                    onClick={() => toggleSection('features')}
                  >
                    <h3 className="text-lg font-semibold flex items-center gap-2 text-gray-900">
                      <Building2 className="w-5 h-5 text-gray-900" />
                      Hospital Features & Facilities ({(data.hospitalFeatures || data.features || []).length})
                    </h3>
                    {expandedSections.features ? (
                      <ChevronUp className="w-5 h-5 text-gray-400" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-gray-400" />
                    )}
                  </div>
                  
                  {expandedSections.features && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {(data.hospitalFeatures || data.features || []).map((f, i) => (
                        <div key={i} className="border border-gray-200 rounded-lg p-4 bg-gray-50">
                          <h4 className="font-semibold text-gray-900">{f?.name}</h4>
                          {f?.description && <p className="text-sm text-gray-700 mt-2">{f.description}</p>}
                        </div>
                      ))}
                      {(!data.hospitalFeatures && !data.features) && (
                        <p className="text-gray-500">No features available</p>
                      )}
                    </div>
                  )}
                </div>

                {/* Advanced Medical Equipment */}
                {data.advancedMedicalEquipment && data.advancedMedicalEquipment.length > 0 && (
                  <div className="bg-white rounded-xl border p-6">
                    <div 
                      className="flex items-center justify-between mb-4 cursor-pointer hover:bg-gray-50 p-2 rounded-md transition-colors"
                      onClick={() => toggleSection('equipment')}
                    >
                      <h3 className="text-lg font-semibold flex items-center gap-2 text-gray-900">
                        <Microscope className="w-5 h-5 text-gray-900" />
                        Advanced Medical Equipment ({data.advancedMedicalEquipment.length})
                      </h3>
                      {expandedSections.equipment ? (
                        <ChevronUp className="w-5 h-5 text-gray-400" />
                      ) : (
                        <ChevronDown className="w-5 h-5 text-gray-400" />
                      )}
                    </div>
                    
                    {expandedSections.equipment && (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {data.advancedMedicalEquipment.map((eq, i) => (
                          <div key={i} className="border border-gray-200 rounded-lg p-4 bg-gray-50">
                            <h4 className="font-semibold text-gray-900">{eq?.name}</h4>
                            {eq?.description && <p className="text-sm text-gray-700 mt-2">{eq.description}</p>}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}

                {/* How to Reach */}
                {data.howToReach && (
                  <div className="bg-white rounded-xl border p-6">
                    <h3 className="text-lg font-semibold mb-4 flex items-center gap-2 text-gray-900">
                      <Navigation className="w-5 h-5 text-gray-900" />
                      How to Reach Us
                    </h3>
                    <p className="text-gray-700">{data.howToReach}</p>
                  </div>
                )}
              </div>

              <div className="space-y-6">
                {/* Quick Info */}
                <div className="bg-white rounded-xl border p-6">
                  <h3 className="text-lg font-semibold mb-4 text-gray-900">Quick Info</h3>
                  <div className="text-sm text-gray-800 space-y-2">
                    <div><span className="font-semibold">ID:</span> {data.id}</div>
                    <div><span className="font-semibold">Established:</span> {data.overview?.founded || data.established || '-'}</div>
                    <div><span className="font-semibold">Doctors:</span> {data.overview?.doctors || data.doctorsCount || '-'}</div>
                    <div><span className="font-semibold">Accreditation:</span> {(data.accreditation||[]).join(', ') || '-'}</div>
                    {data.overview?.clinicType && data.overview.clinicType.length > 0 && (
                      <div><span className="font-semibold">Clinic Type:</span> {data.overview.clinicType.join(', ')}</div>
                    )}
                    {data.overview?.typeOfCare && data.overview.typeOfCare.length > 0 && (
                      <div><span className="font-semibold">Type of Care:</span> {data.overview.typeOfCare.join(', ')}</div>
                    )}
                    {data.overview?.ageGroup && data.overview.ageGroup.length > 0 && (
                      <div><span className="font-semibold">Age Groups:</span> {data.overview.ageGroup.join(', ')}</div>
                    )}
                  </div>
                </div>


                {/* Contact */}
                <div className="bg-white rounded-xl border p-6">
                  <h3 className="text-lg font-semibold mb-4 flex items-center gap-2 text-gray-900">
                    <Phone className="w-5 h-5 text-gray-900" />
                    Contact Information
                  </h3>
                  <div className="text-sm text-gray-800 space-y-2">
                    <div><span className="font-semibold">Phone:</span> {data.contact?.phone || '-'}</div>
                    <div><span className="font-semibold">Email:</span> {data.contact?.email || '-'}</div>
                    <div><span className="font-semibold">Website:</span> {data.contact?.website || '-'}</div>
                    <div><span className="font-semibold">Emergency:</span> {data.contact?.emergency || '-'}</div>
                    {data.contact?.address && (
                      <div className="mt-3">
                        <span className="font-semibold">Address:</span>
                        <p className="text-gray-700 mt-1">{data.contact.address}</p>
                      </div>
                    )}
                  </div>
                </div>

                {/* Gallery */}
                {data.gallery && data.gallery.length > 0 && (
                  <div className="bg-white rounded-xl border p-6">
                    <div 
                      className="flex items-center justify-between mb-4 cursor-pointer hover:bg-gray-50 p-2 rounded-md transition-colors"
                      onClick={() => toggleSection('gallery')}
                    >
                      <h3 className="text-lg font-semibold flex items-center gap-2 text-gray-900">
                        <Camera className="w-5 h-5 text-gray-900" />
                        Hospital Gallery ({data.gallery.length})
                      </h3>
                      {expandedSections.gallery ? (
                        <ChevronUp className="w-5 h-5 text-gray-400" />
                      ) : (
                        <ChevronDown className="w-5 h-5 text-gray-400" />
                      )}
                    </div>
                    
                    {expandedSections.gallery && (
                      <div className="grid grid-cols-2 gap-4">
                        {data.gallery.map((img, i) => (
                          <div key={i} className="aspect-square rounded-lg overflow-hidden border">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img src={withBase(img)} alt={`Gallery ${i + 1}`} className="w-full h-full object-cover" />
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </Layout>
  )
}



