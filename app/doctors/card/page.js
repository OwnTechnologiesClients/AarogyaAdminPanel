"use client"

import { useState } from "react"
import { Layout } from "@/components/layout"
import { Search, Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

// Doctor data matching the image
const doctors = [
  {
    id: 1,
    name: "Dr. Clive Nathan",
    specialty: "Gynecologist, MD, FCPS",
    experience: "8 Years Experience",
    rating: 5,
    image: "/doctorimg/doctor-1.png"
  },
  {
    id: 2,
    name: "Dr. Tom Kenneth",
    specialty: "MBBS, M.D of Medicine",
    experience: "4 Years Experience",
    rating: 5,
    image: "/doctorimg/doctor-2.png"
  },
  {
    id: 3,
    name: "Dr. Rulia Stuard",
    specialty: "Anesthesiologist",
    experience: "10 Years Experience",
    rating: 5,
    image: "/doctorimg/doctor-3.png"
  },
  {
    id: 4,
    name: "Dr. Olivia Addison",
    specialty: "Neurology Specialist",
    experience: "3 Years Experience",
    rating: 5,
    image: "/doctorimg/doctor-4.png"
  },
  {
    id: 5,
    name: "Dr. Meredith Combs",
    specialty: "Behavioral Pediatric",
    experience: "6 Years Experience",
    rating: 5,
    image: "/doctorimg/doctor-5.png"
  },
  {
    id: 6,
    name: "Dr. Gilberto Stevens",
    specialty: "Rehabilitation Specialist",
    experience: "7 Years Experience",
    rating: 5,
    image: "/doctorimg/doctor-6.png"
  },
  {
    id: 7,
    name: "Dr. Alphonso Hamilton",
    specialty: "Dermetalogist",
    experience: "12 Years Experience",
    rating: 5,
    image: "/doctorimg/doctor-7.png"
  },
  {
    id: 8,
    name: "Dr. Trevor Underwood",
    specialty: "Associate Eye",
    experience: "5 Years Experience",
    rating: 5,
    image: "/doctorimg/doctor-8.png"
  }
]

export default function DoctorsCard() {
  const [searchName, setSearchName] = useState("")
  const [searchDepartment, setSearchDepartment] = useState("")
  const [filteredDoctors, setFilteredDoctors] = useState(doctors)

  // Real-time search functionality
  const handleSearch = () => {
    const filtered = doctors.filter(doctor => {
      const nameMatch = doctor.name.toLowerCase().includes(searchName.toLowerCase())
      const departmentMatch = doctor.specialty.toLowerCase().includes(searchDepartment.toLowerCase())
      
      if (searchName && searchDepartment) {
        return nameMatch && departmentMatch
      } else if (searchName) {
        return nameMatch
      } else if (searchDepartment) {
        return departmentMatch
      }
      return true
    })
    
    setFilteredDoctors(filtered)
  }

  // Auto-search when input changes
  const handleNameChange = (e) => {
    setSearchName(e.target.value)
    const filtered = doctors.filter(doctor => {
      const nameMatch = doctor.name.toLowerCase().includes(e.target.value.toLowerCase())
      const departmentMatch = doctor.specialty.toLowerCase().includes(searchDepartment.toLowerCase())
      
      if (e.target.value && searchDepartment) {
        return nameMatch && departmentMatch
      } else if (e.target.value) {
        return nameMatch
      } else if (searchDepartment) {
        return departmentMatch
      }
      return true
    })
    setFilteredDoctors(filtered)
  }

  const handleDepartmentChange = (e) => {
    setSearchDepartment(e.target.value)
    const filtered = doctors.filter(doctor => {
      const nameMatch = doctor.name.toLowerCase().includes(searchName.toLowerCase())
      const departmentMatch = doctor.specialty.toLowerCase().includes(e.target.value.toLowerCase())
      
      if (searchName && e.target.value) {
        return nameMatch && departmentMatch
      } else if (searchName) {
        return nameMatch
      } else if (e.target.value) {
        return departmentMatch
      }
      return true
    })
    setFilteredDoctors(filtered)
  }

  // Clear search functionality
  const clearSearch = () => {
    setSearchName("")
    setSearchDepartment("")
    setFilteredDoctors(doctors)
  }

  const handleBookAppointment = (doctorId) => {
    // Handle booking appointment logic
    console.log(`Booking appointment with doctor ${doctorId}`)
  }

  return (
    <Layout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Doctors Card</h1>
          <p className="text-gray-700 text-lg">Browse and book appointments with our medical professionals</p>
        </div>

        {/* Search Section */}
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex flex-col md:flex-row gap-4 items-end">
            <div className="flex-1">
              <label className="block text-sm font-semibold text-gray-800 mb-2">
                Search By Doctors Name
              </label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-500 w-4 h-4" />
                <input
                  type="text"
                  value={searchName}
                  onChange={handleNameChange}
                  placeholder="Enter doctor name..."
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-800 placeholder-gray-500"
                />
              </div>
            </div>
            
            <div className="flex-1">
              <label className="block text-sm font-semibold text-gray-800 mb-2">
                Search By Department
              </label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-500 w-4 h-4" />
                <input
                  type="text"
                  value={searchDepartment}
                  onChange={handleDepartmentChange}
                  placeholder="Enter department..."
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-800 placeholder-gray-500"
                />
              </div>
            </div>
            
            <div className="flex gap-2">
              <Button 
                onClick={handleSearch}
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors shadow-sm"
              >
                Search
              </Button>
              {(searchName || searchDepartment) && (
                <Button 
                  onClick={clearSearch}
                  variant="outline"
                  className="border-gray-300 text-gray-700 hover:bg-gray-50 px-6 py-3 rounded-lg font-semibold transition-colors"
                >
                  Clear
                </Button>
              )}
            </div>
          </div>
        </div>

        {/* Search Results Counter */}
        {(searchName || searchDepartment) && (
          <div className="flex items-center justify-between">
            <p className="text-gray-700 font-medium">
              Found <span className="text-blue-600 font-bold">{filteredDoctors.length}</span> doctor{filteredDoctors.length !== 1 ? 's' : ''}
              {(searchName || searchDepartment) && (
                <span className="text-gray-600 ml-2">
                  for "{searchName || searchDepartment}"
                </span>
              )}
            </p>
          </div>
        )}

        {/* Doctors Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredDoctors.map((doctor) => (
            <div key={doctor.id} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
              <div className="text-center">
                {/* Doctor Avatar */}
                <div className="mb-4">
                  <Avatar className="w-20 h-20 mx-auto">
                    <AvatarImage src={doctor.image} alt={doctor.name} />
                    <AvatarFallback className="bg-blue-100 text-blue-600 text-lg font-semibold">
                      {doctor.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                </div>

                {/* Doctor Info */}
                <h3 className="text-xl font-bold text-gray-900 mb-2">{doctor.name}</h3>
                <p className="text-sm font-medium text-blue-600 mb-2">{doctor.specialty}</p>
                <p className="text-sm text-gray-700 mb-3 font-medium">{doctor.experience}</p>

                {/* Rating */}
                <div className="flex justify-center mb-4">
                  {[...Array(doctor.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                  ))}
                </div>

                {/* Book Appointment Button */}
                <Button
                  onClick={() => handleBookAppointment(doctor.id)}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium transition-colors"
                >
                  Book Appointment
                </Button>
              </div>
            </div>
          ))}
        </div>

        {/* No Results Message */}
        {filteredDoctors.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <Search className="w-16 h-16 mx-auto" />
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">No doctors found</h3>
            <p className="text-gray-700 text-lg">Try adjusting your search criteria</p>
          </div>
        )}
      </div>
    </Layout>
  )
} 