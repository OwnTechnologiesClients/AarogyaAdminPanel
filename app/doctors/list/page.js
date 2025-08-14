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
  Filter
} from "lucide-react"
import Link from "next/link"

// Sample doctor data matching the Excel sheet fields
const doctorsData = [
  {
    id: 1,
    doctorName: "Dr. Steven Nissen",
    specialty: "Interventional Cardiologist",
    location: "Mumbai, India",
    image: "img1.png",
    experience: "30+ years",
    rating: 9.9,
    patientsTreated: "50+",
    introduction: "Specializes in catheter-based treatment of structural heart diseases and coronary artery disease. Expert in minimally invasive cardiac procedures.",
    specializations: "Interventional Cardiology, Clinical Trials, Preventive Cardiology, Coronary Artery Disease, Structural Heart Disease",
    education: "Harvard Medical School (Medical Degree)",
    professionalExperience: "Senior Consultant - Cleveland Clinic (30+ years), Attending Physician - Medical Center (5+ years), Chief Resident - Teaching Hospital (2 years)",
    languages: "English, Spanish",
    treatmentsProcedures: "Minimally Invasive Heart Procedures, Coronary Stenting, Valve Repair",
    awards: "Distinguished Scientist Award, Top Cardiologist 2023",
    about: "Leading interventional cardiologist with experience in clinical trials and preventive cardiology",
    workExperience: "Senior Cardiologist - Cleveland Clinic (2010-Present), Interventional Cardiologist - Mount Sinai (2008-2010)"
  },
  {
    id: 2,
    doctorName: "Dr. Sarah Johnson",
    specialty: "Neurologist",
    location: "Delhi, India",
    image: "img2.png",
    experience: "15+ years",
    rating: 9.7,
    patientsTreated: "200+",
    introduction: "Expert in neurological disorders and brain mapping techniques. Specializes in stroke treatment and epilepsy management.",
    specializations: "Neurology, Stroke Treatment, Epilepsy, Brain Mapping, Neuroimaging",
    education: "AIIMS Delhi (Medical Degree), Johns Hopkins (Neurology Residency)",
    professionalExperience: "Senior Neurologist - AIIMS Delhi (10+ years), Consultant - Apollo Hospital (5+ years)",
    languages: "English, Hindi",
    treatmentsProcedures: "Stroke Treatment, Epilepsy Management, Brain Surgery, Neurological Rehabilitation",
    awards: "Best Neurologist Award 2022, Excellence in Stroke Care",
    about: "Renowned neurologist with expertise in complex neurological cases and innovative treatment approaches",
    workExperience: "Senior Neurologist - AIIMS Delhi (2015-Present), Consultant - Apollo Hospital (2010-2015)"
  },
  {
    id: 3,
    doctorName: "Dr. Michael Chen",
    specialty: "Oncologist",
    location: "Bangalore, India",
    image: "img3.png",
    experience: "20+ years",
    rating: 9.8,
    patientsTreated: "300+",
    introduction: "Specializes in cancer treatment and research. Expert in chemotherapy, radiation therapy, and targeted therapy.",
    specializations: "Oncology, Cancer Research, Chemotherapy, Radiation Therapy, Targeted Therapy",
    education: "Manipal University (Medical Degree), MD Anderson Cancer Center (Oncology Fellowship)",
    professionalExperience: "Senior Oncologist - Manipal Hospital (15+ years), Research Fellow - MD Anderson (5+ years)",
    languages: "English, Kannada, Mandarin",
    treatmentsProcedures: "Chemotherapy, Radiation Therapy, Immunotherapy, Cancer Surgery, Palliative Care",
    awards: "Oncology Excellence Award 2023, Research Innovation Award",
    about: "Leading oncologist with extensive experience in cancer treatment and research",
    workExperience: "Senior Oncologist - Manipal Hospital (2010-Present), Research Fellow - MD Anderson (2005-2010)"
  },
  {
    id: 4,
    doctorName: "Dr. Emily Rodriguez",
    specialty: "Gynecologist",
    location: "Pune, India",
    image: "img4.png",
    experience: "18+ years",
    rating: 9.6,
    patientsTreated: "150+",
    introduction: "Expert in women's health and gynecological procedures. Specializes in high-risk pregnancies and fertility treatments.",
    specializations: "Gynecology, Obstetrics, High-Risk Pregnancy, Fertility Treatment, Women's Health",
    education: "B.J. Medical College (Medical Degree), Fellowship in Reproductive Medicine",
    professionalExperience: "Senior Gynecologist - Ruby Hall Clinic (12+ years), Consultant - Sahyadri Hospital (6+ years)",
    languages: "English, Marathi, Spanish",
    treatmentsProcedures: "Gynecological Surgery, Fertility Treatment, High-Risk Pregnancy Care, Women's Health Screening",
    awards: "Best Gynecologist Award 2022, Excellence in Women's Health",
    about: "Experienced gynecologist dedicated to providing comprehensive women's healthcare",
    workExperience: "Senior Gynecologist - Ruby Hall Clinic (2012-Present), Consultant - Sahyadri Hospital (2006-2012)"
  },
  {
    id: 5,
    doctorName: "Dr. David Kim",
    specialty: "Orthopedic Surgeon",
    location: "Chennai, India",
    image: "img5.png",
    experience: "25+ years",
    rating: 9.9,
    patientsTreated: "400+",
    introduction: "Expert in joint replacement and sports medicine. Specializes in minimally invasive orthopedic procedures.",
    specializations: "Orthopedic Surgery, Joint Replacement, Sports Medicine, Trauma Surgery, Arthroscopy",
    education: "Madras Medical College (Medical Degree), Harvard Medical School (Orthopedic Fellowship)",
    professionalExperience: "Senior Orthopedic Surgeon - Apollo Hospital (20+ years), Consultant - Fortis Hospital (5+ years)",
    languages: "English, Tamil, Korean",
    treatmentsProcedures: "Joint Replacement, Arthroscopic Surgery, Sports Injury Treatment, Trauma Surgery",
    awards: "Orthopedic Excellence Award 2023, Best Surgeon Award",
    about: "Leading orthopedic surgeon with expertise in complex joint surgeries and sports medicine",
    workExperience: "Senior Orthopedic Surgeon - Apollo Hospital (2005-Present), Consultant - Fortis Hospital (2000-2005)"
  },
  {
    id: 6,
    doctorName: "Dr. Lisa Wang",
    specialty: "Urologist",
    location: "Hyderabad, India",
    image: "img6.png",
    experience: "22+ years",
    rating: 9.7,
    patientsTreated: "250+",
    introduction: "Specializes in urological disorders and minimally invasive urological procedures. Expert in kidney stone treatment.",
    specializations: "Urology, Kidney Stone Treatment, Prostate Surgery, Bladder Disorders, Urological Oncology",
    education: "Osmania Medical College (Medical Degree), Cleveland Clinic (Urology Residency)",
    professionalExperience: "Senior Urologist - KIMS Hospital (17+ years), Consultant - Continental Hospital (5+ years)",
    languages: "English, Telugu, Mandarin",
    treatmentsProcedures: "Kidney Stone Treatment, Prostate Surgery, Bladder Surgery, Urological Cancer Treatment",
    awards: "Urology Excellence Award 2022, Innovation in Surgery Award",
    about: "Experienced urologist with expertise in advanced urological procedures and treatments",
    workExperience: "Senior Urologist - KIMS Hospital (2008-Present), Consultant - Continental Hospital (2003-2008)"
  }
]

export default function DoctorsList() {
  const [searchTerm, setSearchTerm] = useState("")

  // Filter doctors based on search term
  const filteredDoctors = useMemo(() => {
    return doctorsData.filter(doctor =>
      doctor.doctorName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doctor.specialty.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doctor.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doctor.specializations.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doctor.treatmentsProcedures.toLowerCase().includes(searchTerm.toLowerCase())
    )
  }, [searchTerm])

  // Use pagination hook
  const {
    currentPage,
    totalPages,
    totalItems,
    itemsPerPage,
    currentItems: currentDoctors,
    handlePageChange,
    handleItemsPerPageChange,
    resetPagination
  } = usePagination(filteredDoctors, 6)

  const handleSearch = (e) => {
    setSearchTerm(e.target.value)
    resetPagination() // Reset to first page when searching
  }

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Doctors List</h1>
            <p className="text-gray-700 text-lg">View and manage all doctors</p>
          </div>
          <Link href="/doctors/add">
            <button className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold shadow-sm">
              Add New Doctor
            </button>
          </Link>
        </div>

        <div className="bg-gradient-to-br from-white to-blue-50 rounded-xl shadow-lg border border-blue-100">
          {/* Search and Controls */}
          <div className="p-6 border-b border-blue-200 bg-gradient-to-r from-blue-50 to-indigo-50">
            <div className="flex justify-between items-center">
              <div className="flex items-center space-x-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-600 w-4 h-4" />
                  <input
                    type="text"
                    placeholder="Search doctors, specialty, location, specializations..."
                    value={searchTerm}
                    onChange={handleSearch}
                    className="pl-10 pr-4 py-3 border-2 border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 w-80 text-gray-900 placeholder-gray-500 shadow-md bg-white"
                  />
                </div>
                <button className="flex items-center space-x-2 px-4 py-3 border-2 border-blue-200 rounded-lg hover:bg-blue-50 hover:border-blue-400 transition-colors shadow-md bg-white">
                  <Filter className="w-4 h-4 text-blue-600" />
                  <span className="text-sm font-medium text-gray-900">Filter</span>
                </button>
              </div>
              {searchTerm && (
                <div className="text-sm text-gray-800 font-semibold bg-blue-100 px-4 py-2 rounded-lg">
                  Found <span className="text-blue-700 font-bold">{filteredDoctors.length}</span> doctor{filteredDoctors.length !== 1 ? 's' : ''}
                  <span className="text-gray-700 ml-2">for "{searchTerm}"</span>
                </div>
              )}
            </div>
          </div>
          
          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gradient-to-r from-blue-600 to-indigo-600">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-bold text-white uppercase tracking-wider">
                    ID
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-bold text-white uppercase tracking-wider">
                    Doctor Name
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-bold text-white uppercase tracking-wider">
                    Specialty
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-bold text-white uppercase tracking-wider">
                    Location
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-bold text-white uppercase tracking-wider">
                    Experience
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-bold text-white uppercase tracking-wider">
                    Rating
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-bold text-white uppercase tracking-wider">
                    Patients
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-bold text-white uppercase tracking-wider">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-blue-100">
                {currentDoctors.map((doctor, index) => (
                  <tr key={index} className="hover:bg-blue-50 transition-colors">
                    <td className="px-4 py-3 whitespace-nowrap text-sm font-bold text-blue-700">
                      #{doctor.id}
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="w-10 h-10 rounded-full overflow-hidden ring-2 ring-blue-200">
                          <img 
                            src={`/doctorimg/doctor-${(doctor.id % 8) + 1}.png`} 
                            alt={doctor.doctorName}
                            className="w-full h-full object-cover"
                            onError={(e) => {
                              // Fallback to initials if image fails to load
                              e.target.style.display = 'none';
                              e.target.nextSibling.style.display = 'flex';
                            }}
                          />
                          <div className="w-full h-full bg-blue-100 rounded-full flex items-center justify-center hidden">
                            <span className="text-sm font-semibold text-blue-600">
                              {doctor.doctorName.split(' ').map(n => n[0]).join('')}
                            </span>
                          </div>
                        </div>
                        <div className="ml-3">
                          <div className="text-sm font-bold text-gray-900">{doctor.doctorName}</div>
                          <div className="text-xs text-gray-500 truncate max-w-32">{doctor.specializations.split(',')[0]}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm font-bold text-blue-700">
                      {doctor.specialty}
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm font-semibold text-gray-800">
                      {doctor.location}
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm font-semibold text-gray-800">
                      {doctor.experience}
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm font-bold text-green-600">
                      ⭐ {doctor.rating}
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm font-semibold text-gray-700">
                      {doctor.patientsTreated}
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm font-medium">
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
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border-t border-blue-200">
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

    
      </div>
    </Layout>
  )
} 