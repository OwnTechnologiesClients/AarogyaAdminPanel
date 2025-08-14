"use client"

import { useState, useMemo } from "react"
import { Layout } from "@/components/layout"
import { Pagination } from "@/components/ui/pagination"
import { usePagination } from "@/lib/hooks/usePagination"
import { 
  Search, 
  Trash2, 
  Edit, 
  Eye, 
  ChevronUp,
  Filter,
  Building2,
  Stethoscope,
  DollarSign,
  Clock,
  UserCheck
} from "lucide-react"
import Image from "next/image"

// Sample institutions data with treatment information
const institutionsData = [
  {
    id: "#0047",
    name: "Fortis Escorts Heart Institute",
    institutionType: "Cardiac Hospital",
    mobile: "+91-9987654345",
    email: "info@fortisescorts.com",
    location: "Okhla, New Delhi",
    image: "/logo.png",
    specializations: "Cardiology, Cardiac Surgery, Interventional Cardiology",
    rating: 9.8,
    treatments: ["Coronary Angioplasty", "Heart Transplant", "Cardiac Surgery"],
    priceRange: "₹50,000 - ₹15,00,000",
    experience: "25+ years"
  },
  {
    id: "#0048",
    name: "Max Super Speciality Hospital",
    institutionType: "Multi-Specialty Hospital",
    mobile: "+91-9987654346",
    email: "info@maxhealthcare.com",
    location: "Saket, New Delhi",
    image: "/logo.png",
    specializations: "Cardiology, Neurology, Oncology, Orthopedics",
    rating: 9.6,
    treatments: ["Coronary Angioplasty", "Brain Surgery", "Cancer Treatment"],
    priceRange: "₹75,000 - ₹20,00,000",
    experience: "30+ years"
  },
  {
    id: "#0049",
    name: "Apollo Hospitals Enterprise",
    institutionType: "Multi-Specialty Hospital",
    mobile: "+91-9987654347",
    email: "info@apollohospitals.com",
    location: "Sarita Vihar, New Delhi",
    image: "/logo.png",
    specializations: "Cardiology, Transplant, Oncology, Neurology",
    rating: 9.7,
    treatments: ["Coronary Angioplasty", "Liver Transplant", "Kidney Transplant"],
    priceRange: "₹60,000 - ₹25,00,000",
    experience: "35+ years"
  },
  {
    id: "#0050",
    name: "Medanta - The Medicity",
    institutionType: "Multi-Specialty Hospital",
    mobile: "+91-9987654348",
    email: "info@medanta.org",
    location: "Gurgaon, Haryana",
    image: "/logo.png",
    specializations: "Cardiology, Cardiac Surgery, Transplant, Oncology",
    rating: 9.9,
    treatments: ["Coronary Angioplasty", "Heart Transplant", "Robotic Surgery"],
    priceRange: "₹80,000 - ₹30,00,000",
    experience: "20+ years"
  },
  {
    id: "#0051",
    name: "Safdarjung Hospital",
    institutionType: "Government Hospital",
    mobile: "+91-9987654349",
    email: "info@safdarjung.gov.in",
    location: "Ansari Nagar, New Delhi",
    image: "/logo.png",
    specializations: "General Medicine, Surgery, Emergency Care",
    rating: 8.5,
    treatments: ["General Surgery", "Emergency Treatment", "Trauma Care"],
    priceRange: "₹5,000 - ₹50,000",
    experience: "50+ years"
  },
  {
    id: "#0052",
    name: "AIIMS Delhi",
    institutionType: "Government Medical Institute",
    mobile: "+91-9987654350",
    email: "info@aiims.edu",
    location: "Ansari Nagar, New Delhi",
    image: "/logo.png",
    specializations: "All Medical Specialties, Research, Education",
    rating: 9.5,
    treatments: ["Advanced Surgery", "Research Trials", "Specialized Care"],
    priceRange: "₹10,000 - ₹1,00,000",
    experience: "60+ years"
  },
  {
    id: "#0053",
    name: "BLK Super Speciality Hospital",
    institutionType: "Multi-Specialty Hospital",
    mobile: "+91-9987654351",
    email: "info@blkhospital.com",
    location: "Pusa Road, New Delhi",
    image: "/logo.png",
    specializations: "Cardiology, Oncology, Neurology, Orthopedics",
    rating: 9.4,
    treatments: ["Coronary Angioplasty", "Cancer Treatment", "Joint Replacement"],
    priceRange: "₹70,000 - ₹18,00,000",
    experience: "28+ years"
  },
  {
    id: "#0054",
    name: "Sir Ganga Ram Hospital",
    institutionType: "Multi-Specialty Hospital",
    mobile: "+91-9987654352",
    email: "info@sgrh.com",
    location: "Old Rajinder Nagar, New Delhi",
    image: "/logo.png",
    specializations: "Cardiology, Nephrology, Gastroenterology",
    rating: 9.3,
    treatments: ["Coronary Angioplasty", "Dialysis", "Endoscopy"],
    priceRange: "₹55,000 - ₹12,00,000",
    experience: "40+ years"
  },
  {
    id: "#0055",
    name: "Holy Family Hospital",
    institutionType: "Multi-Specialty Hospital",
    mobile: "+91-9987654353",
    email: "info@holyfamilyhospital.org",
    location: "Okhla, New Delhi",
    image: "/logo.png",
    specializations: "Cardiology, Pediatrics, Obstetrics",
    rating: 9.1,
    treatments: ["Coronary Angioplasty", "Child Care", "Maternity Care"],
    priceRange: "₹45,000 - ₹8,00,000",
    experience: "35+ years"
  },
  {
    id: "#0056",
    name: "Indraprastha Apollo Hospitals",
    institutionType: "Multi-Specialty Hospital",
    mobile: "+91-9987654354",
    email: "info@indapollo.com",
    location: "Sarita Vihar, New Delhi",
    image: "/logo.png",
    specializations: "Cardiology, Transplant, Oncology, Neurology",
    rating: 9.6,
    treatments: ["Coronary Angioplasty", "Organ Transplant", "Cancer Care"],
    priceRange: "₹65,000 - ₹22,00,000",
    experience: "25+ years"
  },
  {
    id: "#0057",
    name: "Kailash Hospital",
    institutionType: "Multi-Specialty Hospital",
    mobile: "+91-9987654355",
    email: "info@kailashhospital.com",
    location: "Greater Noida, UP",
    image: "/logo.png",
    specializations: "Cardiology, General Surgery, Emergency Care",
    rating: 8.8,
    treatments: ["Coronary Angioplasty", "General Surgery", "Emergency Care"],
    priceRange: "₹40,000 - ₹6,00,000",
    experience: "20+ years"
  },
  {
    id: "#0058",
    name: "Lok Nayak Hospital",
    institutionType: "Government Hospital",
    mobile: "+91-9987654356",
    email: "info@loknayak.gov.in",
    location: "Delhi Gate, New Delhi",
    image: "/logo.png",
    specializations: "General Medicine, Surgery, Emergency Care",
    rating: 8.2,
    treatments: ["General Surgery", "Emergency Treatment", "Trauma Care"],
    priceRange: "₹3,000 - ₹30,000",
    experience: "45+ years"
  },
  {
    id: "#0059",
    name: "Moolchand Medcity",
    institutionType: "Multi-Specialty Hospital",
    mobile: "+91-9987654357",
    email: "info@moolchand.com",
    location: "Lajpat Nagar, New Delhi",
    image: "/logo.png",
    specializations: "Cardiology, Orthopedics, Gynecology",
    rating: 9.0,
    treatments: ["Coronary Angioplasty", "Joint Replacement", "Women's Health"],
    priceRange: "₹50,000 - ₹10,00,000",
    experience: "30+ years"
  },
  {
    id: "#0060",
    name: "Narayana Health",
    institutionType: "Multi-Specialty Hospital",
    mobile: "+91-9987654358",
    email: "info@narayanahealth.org",
    location: "Gurgaon, Haryana",
    image: "/logo.png",
    specializations: "Cardiology, Cardiac Surgery, Transplant",
    rating: 9.7,
    treatments: ["Coronary Angioplasty", "Heart Surgery", "Organ Transplant"],
    priceRange: "₹75,000 - ₹20,00,000",
    experience: "25+ years"
  },
  {
    id: "#0061",
    name: "Paras Hospitals",
    institutionType: "Multi-Specialty Hospital",
    mobile: "+91-9987654359",
    email: "info@parashospitals.com",
    location: "Gurgaon, Haryana",
    image: "/logo.png",
    specializations: "Cardiology, Neurology, Orthopedics",
    rating: 9.2,
    treatments: ["Coronary Angioplasty", "Neurological Care", "Joint Surgery"],
    priceRange: "₹60,000 - ₹15,00,000",
    experience: "22+ years"
  },
  {
    id: "#0062",
    name: "Pushpawati Singhania Hospital",
    institutionType: "Multi-Specialty Hospital",
    mobile: "+91-9987654360",
    email: "info@psrihospital.com",
    location: "Saket, New Delhi",
    image: "/logo.png",
    specializations: "Cardiology, Gastroenterology, Nephrology",
    rating: 9.4,
    treatments: ["Coronary Angioplasty", "Digestive Care", "Kidney Care"],
    priceRange: "₹70,000 - ₹16,00,000",
    experience: "35+ years"
  },
  {
    id: "#0063",
    name: "Rajiv Gandhi Cancer Institute",
    institutionType: "Cancer Hospital",
    mobile: "+91-9987654361",
    email: "info@rgci.org",
    location: "Rohini, New Delhi",
    image: "/logo.png",
    specializations: "Oncology, Radiation Therapy, Surgical Oncology",
    rating: 9.6,
    treatments: ["Cancer Surgery", "Radiation Therapy", "Chemotherapy"],
    priceRange: "₹1,00,000 - ₹25,00,000",
    experience: "30+ years"
  },
  {
    id: "#0064",
    name: "Sitaram Bhartia Institute",
    institutionType: "Multi-Specialty Hospital",
    mobile: "+91-9987654362",
    email: "info@sitarambhartia.org",
    location: "Qutab Institutional Area, New Delhi",
    image: "/logo.png",
    specializations: "Cardiology, Endocrinology, Diabetes Care",
    rating: 9.1,
    treatments: ["Coronary Angioplasty", "Diabetes Management", "Endocrine Care"],
    priceRange: "₹45,000 - ₹8,00,000",
    experience: "25+ years"
  },
  {
    id: "#0065",
    name: "St. Stephen's Hospital",
    institutionType: "Multi-Specialty Hospital",
    mobile: "+91-9987654363",
    email: "info@ststephenshospital.org",
    location: "Tis Hazari, New Delhi",
    image: "/logo.png",
    specializations: "General Medicine, Surgery, Emergency Care",
    rating: 8.9,
    treatments: ["General Surgery", "Emergency Care", "Trauma Treatment"],
    priceRange: "₹35,000 - ₹7,00,000",
    experience: "40+ years"
  },
  {
    id: "#0066",
    name: "Tata Memorial Hospital",
    institutionType: "Cancer Hospital",
    mobile: "+91-9987654364",
    email: "info@tmc.gov.in",
    location: "Mumbai, Maharashtra",
    image: "/logo.png",
    specializations: "Oncology, Cancer Research, Surgical Oncology",
    rating: 9.8,
    treatments: ["Cancer Surgery", "Research Trials", "Palliative Care"],
    priceRange: "₹50,000 - ₹20,00,000",
    experience: "70+ years"
  },
  {
    id: "#0067",
    name: "Wockhardt Hospitals",
    institutionType: "Multi-Specialty Hospital",
    mobile: "+91-9987654365",
    email: "info@wockhardthospitals.com",
    location: "Mumbai, Maharashtra",
    image: "/logo.png",
    specializations: "Cardiology, Neurology, Orthopedics",
    rating: 9.3,
    treatments: ["Coronary Angioplasty", "Brain Surgery", "Joint Replacement"],
    priceRange: "₹80,000 - ₹18,00,000",
    experience: "30+ years"
  },
  {
    id: "#0068",
    name: "Yashoda Hospitals",
    institutionType: "Multi-Specialty Hospital",
    mobile: "+91-9987654366",
    email: "info@yashodahospitals.com",
    location: "Hyderabad, Telangana",
    image: "/logo.png",
    specializations: "Cardiology, Transplant, Oncology, Neurology",
    rating: 9.5,
    treatments: ["Coronary Angioplasty", "Organ Transplant", "Cancer Care"],
    priceRange: "₹70,000 - ₹25,00,000",
    experience: "35+ years"
  },
  {
    id: "#0069",
    name: "Care Hospitals",
    institutionType: "Multi-Specialty Hospital",
    mobile: "+91-9987654367",
    email: "info@carehospitals.com",
    location: "Hyderabad, Telangana",
    image: "/logo.png",
    specializations: "Cardiology, Cardiac Surgery, Transplant",
    rating: 9.4,
    treatments: ["Coronary Angioplasty", "Heart Surgery", "Organ Transplant"],
    priceRange: "₹65,000 - ₹20,00,000",
    experience: "30+ years"
  },
  {
    id: "#0070",
    name: "KIMS Hospitals",
    institutionType: "Multi-Specialty Hospital",
    mobile: "+91-9987654368",
    email: "info@kimshospitals.com",
    location: "Hyderabad, Telangana",
    image: "/logo.png",
    specializations: "Cardiology, Neurology, Orthopedics",
    rating: 9.2,
    treatments: ["Coronary Angioplasty", "Neurological Care", "Joint Surgery"],
    priceRange: "₹60,000 - ₹16,00,000",
    experience: "28+ years"
  },
  {
    id: "#0071",
    name: "Manipal Hospitals",
    institutionType: "Multi-Specialty Hospital",
    mobile: "+91-9987654369",
    email: "info@manipalhospitals.com",
    location: "Bangalore, Karnataka",
    image: "/logo.png",
    specializations: "Cardiology, Transplant, Oncology, Neurology",
    rating: 9.6,
    treatments: ["Coronary Angioplasty", "Organ Transplant", "Cancer Care"],
    priceRange: "₹75,000 - ₹22,00,000",
    experience: "40+ years"
  },
  {
    id: "#0072",
    name: "Narayana Health City",
    institutionType: "Multi-Specialty Hospital",
    mobile: "+91-9987654370",
    email: "info@narayanahealth.org",
    location: "Bangalore, Karnataka",
    image: "/logo.png",
    specializations: "Cardiology, Cardiac Surgery, Transplant",
    rating: 9.7,
    treatments: ["Coronary Angioplasty", "Heart Surgery", "Organ Transplant"],
    priceRange: "₹80,000 - ₹25,00,000",
    experience: "30+ years"
  },
  {
    id: "#0073",
    name: "Fortis Malar Hospital",
    institutionType: "Multi-Specialty Hospital",
    mobile: "+91-9987654371",
    email: "info@fortismalar.com",
    location: "Chennai, Tamil Nadu",
    image: "/logo.png",
    specializations: "Cardiology, Neurology, Orthopedics",
    rating: 9.3,
    treatments: ["Coronary Angioplasty", "Brain Surgery", "Joint Replacement"],
    priceRange: "₹70,000 - ₹18,00,000",
    experience: "25+ years"
  },
  {
    id: "#0074",
    name: "Apollo Hospitals Chennai",
    institutionType: "Multi-Specialty Hospital",
    mobile: "+91-9987654372",
    email: "info@apollochennai.com",
    location: "Chennai, Tamil Nadu",
    image: "/logo.png",
    specializations: "Cardiology, Transplant, Oncology, Neurology",
    rating: 9.5,
    treatments: ["Coronary Angioplasty", "Organ Transplant", "Cancer Care"],
    priceRange: "₹75,000 - ₹22,00,000",
    experience: "35+ years"
  }
]

export default function InstitutionsList() {
  const [searchTerm, setSearchTerm] = useState("")

  // Filter institutions based on search term
  const filteredInstitutions = useMemo(() => {
    return institutionsData.filter(institution =>
      institution.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      institution.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      institution.mobile.includes(searchTerm) ||
      institution.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      institution.specializations.toLowerCase().includes(searchTerm.toLowerCase()) ||
      institution.treatments.some(treatment => 
        treatment.toLowerCase().includes(searchTerm.toLowerCase())
      )
    )
  }, [searchTerm])

  // Use pagination hook
  const {
    currentPage,
    totalPages,
    totalItems,
    itemsPerPage,
    currentItems: currentInstitutions,
    handlePageChange,
    handleItemsPerPageChange,
    resetPagination
  } = usePagination(filteredInstitutions, 10)

  const handleSearch = (e) => {
    setSearchTerm(e.target.value)
    resetPagination() // Reset to first page when searching
  }

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Institutions List</h1>
            <p className="text-gray-700 text-lg">View and manage all medical institutions</p>
          </div>
          <button className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold shadow-sm">
            Add New Institution
          </button>
        </div>

        <div className="bg-white rounded-xl shadow-lg border border-gray-200">
          {/* Search and Controls */}
          <div className="p-6 border-b border-gray-200 bg-gray-50">
            <div className="flex justify-between items-center">
              <div className="flex items-center space-x-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-600 w-4 h-4" />
                  <input
                    type="text"
                    placeholder="Search institutions, specializations, treatments..."
                    value={searchTerm}
                    onChange={handleSearch}
                    className="pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 w-80 text-gray-900 placeholder-gray-500 bg-white"
                  />
                </div>
                <button className="flex items-center space-x-2 px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors bg-white">
                  <Filter className="w-4 h-4 text-gray-600" />
                  <span className="text-sm font-medium text-gray-900">Filter</span>
                </button>
              </div>
              {searchTerm && (
                <div className="text-sm text-gray-800 font-semibold bg-blue-100 px-4 py-2 rounded-lg">
                  Found <span className="text-blue-700 font-bold">{filteredInstitutions.length}</span> institution{filteredInstitutions.length !== 1 ? 's' : ''}
                  <span className="text-gray-700 ml-2">for "{searchTerm}"</span>
                </div>
              )}
            </div>
          </div>
          
          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-900 uppercase tracking-wider">
                    ID
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-900 uppercase tracking-wider">
                    Institution
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-900 uppercase tracking-wider">
                    Type & Specializations
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-900 uppercase tracking-wider">
                    Rating & Experience
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-900 uppercase tracking-wider">
                    Treatments & Price Range
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-900 uppercase tracking-wider">
                    Contact
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-900 uppercase tracking-wider">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {currentInstitutions.map((institution, index) => (
                  <tr key={index} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-gray-900">
                      {institution.id}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="w-12 h-12 rounded-full overflow-hidden ring-2 ring-gray-200">
                          <Image
                            src={institution.image}
                            alt={institution.name}
                            width={48}
                            height={48}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-bold text-gray-900">{institution.name}</div>
                          <div className="text-xs text-gray-500">{institution.location}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="space-y-1">
                        <div className="text-sm font-semibold text-gray-900">{institution.institutionType}</div>
                        <div className="text-xs text-gray-600 max-w-xs truncate">{institution.specializations}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="space-y-1">
                        <div className="flex items-center space-x-1">
                          <span className="text-sm font-semibold text-gray-900">{institution.rating}</span>
                          <span className="text-xs text-gray-500">/10</span>
                        </div>
                        <div className="text-xs text-gray-600">{institution.experience}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="space-y-1">
                        <div className="text-xs text-gray-600 max-w-xs">
                          {institution.treatments.slice(0, 2).join(", ")}
                          {institution.treatments.length > 2 && "..."}
                        </div>
                        <div className="text-xs font-medium text-green-600">{institution.priceRange}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="space-y-1">
                        <div className="text-xs text-gray-900">{institution.mobile}</div>
                        <div className="text-xs text-gray-600 max-w-xs truncate">{institution.email}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex items-center space-x-2">
                        <button className="text-red-600 hover:text-red-700 p-2 rounded hover:bg-red-50 transition-colors">
                          <Trash2 className="w-4 h-4" />
                        </button>
                        <button className="text-green-600 hover:text-green-700 p-2 rounded hover:bg-green-50 transition-colors">
                          <Edit className="w-4 h-4" />
                        </button>
                        <button className="text-blue-600 hover:text-blue-700 p-2 rounded hover:bg-blue-50 transition-colors">
                          <Eye className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
            totalItems={totalItems}
            itemsPerPage={itemsPerPage}
            onItemsPerPageChange={handleItemsPerPageChange}
          />
        </div>
      </div>
    </Layout>
  )
} 