"use client"

import { useState } from "react"
import { Layout } from "@/components/layout"
import { Button } from "@/components/ui/button"
import ProfileDetails from "./profile-details"

// Sample data for dropdowns
const specialties = [
  "Orthopaedics",
  "Cardiology", 
  "Neurology",
  "Oncology",
  "Dermatology",
  "Pediatrics",
  "General Surgery",
  "Internal Medicine"
];

const treatments = {
  "Orthopaedics": [
    "Knee Replacement",
    "Hip Replacement", 
    "Spine Surgery",
    "Arthroscopy",
    "Fracture Fixation"
  ],
  "Cardiology": [
    "Angioplasty",
    "Bypass Surgery",
    "Heart Valve Surgery",
    "Pacemaker Implantation"
  ],
  "Neurology": [
    "Brain Tumor Surgery",
    "Spine Surgery",
    "Epilepsy Surgery",
    "Deep Brain Stimulation"
  ]
};

const hospitals = [
  "Foritis",
  "Max",
  "Apollo",
  "Fortis",
  "Medanta",
  "AIIMS",
  "Tata Memorial",
  "Kokilaben Hospital"
];

const doctors = [
  "Prof. Anand",
  "Prof. Raj",
  "Dr. Sharma",
  "Dr. Patel",
  "Dr. Singh",
  "Dr. Kumar",
  "Dr. Verma"
];

export default function AddTreatment() {
  const [activeTab, setActiveTab] = useState("treatment");
  const [selectedSpecialty, setSelectedSpecialty] = useState("Orthopaedics");
  const [selectedTreatment, setSelectedTreatment] = useState("Knee Replacement");
  const [selectedHospitals, setSelectedHospitals] = useState(["Foritis", "Max", "Apollo"]);
  const [selectedDoctors, setSelectedDoctors] = useState(["Prof. Anand", "Prof. Raj"]);

  const handleSpecialtyChange = (specialty) => {
    setSelectedSpecialty(specialty);
    // Reset treatment when specialty changes
    if (treatments[specialty] && treatments[specialty].length > 0) {
      setSelectedTreatment(treatments[specialty][0]);
    } else {
      setSelectedTreatment("");
    }
  };

  const handleHospitalToggle = (hospital) => {
    setSelectedHospitals(prev => 
      prev.includes(hospital) 
        ? prev.filter(h => h !== hospital)
        : [...prev, hospital]
    );
  };

  const handleDoctorToggle = (doctor) => {
    setSelectedDoctors(prev => 
      prev.includes(doctor) 
        ? prev.filter(d => d !== doctor)
        : [...prev, doctor]
    );
  };

  return (
    <Layout>
      <div className="space-y-6">
        <h1 className="text-2xl font-bold text-gray-900">Add Treatment</h1>
        
        {/* Navigation Tabs */}
        <div className="flex space-x-8 border-b border-gray-200">
          <button
            onClick={() => setActiveTab("treatment")}
            className={`flex items-center space-x-2 pb-4 px-1 ${
              activeTab === "treatment"
                ? "border-b-2 border-blue-600 text-blue-600"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" />
            </svg>
            <span className="font-medium">Treatment Details</span>
          </button>
          
          <button
            onClick={() => setActiveTab("profile")}
            className={`flex items-center space-x-2 pb-4 px-1 ${
              activeTab === "profile"
                ? "border-b-2 border-blue-600 text-blue-600"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
            </svg>
            <span className="font-medium">Profile & Bio</span>
          </button>
        </div>

        {/* Treatment Details Form */}
        {activeTab === "treatment" && (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 space-y-8">
            <div className="space-y-6">
              {/* Select Specialty */}
              <div>
                <label className="block text-sm font-semibold text-gray-800 mb-3">Select Specialty</label>
                <div className="relative">
                  <select
                    value={selectedSpecialty}
                    onChange={(e) => handleSpecialtyChange(e.target.value)}
                    className="w-full border border-gray-300 rounded-md px-4 py-3 text-gray-600 bg-white appearance-none cursor-pointer focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    {specialties.map((specialty) => (
                      <option key={specialty} value={specialty}>
                        {specialty}
                      </option>
                    ))}
                  </select>
                  <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                    <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Select Treatment */}
              <div>
                <label className="block text-sm font-semibold text-gray-800 mb-3">Select Treatment</label>
                <div className="relative">
                  <select
                    value={selectedTreatment}
                    onChange={(e) => setSelectedTreatment(e.target.value)}
                    className="w-full border border-gray-300 rounded-md px-4 py-3 text-gray-600 bg-white appearance-none cursor-pointer focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    {treatments[selectedSpecialty]?.map((treatment) => (
                      <option key={treatment} value={treatment}>
                        {treatment}
                      </option>
                    )) || <option value="">No treatments available</option>}
                  </select>
                  <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                    <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Select Best Hospital */}
              <div>
                <label className="block text-sm font-semibold text-gray-800 mb-3">Select Best Hospital</label>
                <div className="relative">
                  <div className="w-full border border-gray-300 rounded-md px-4 py-3 text-gray-600 bg-white min-h-[52px] flex items-center">
                    <div className="flex flex-wrap gap-2">
                      {selectedHospitals.map((hospital) => (
                        <span
                          key={hospital}
                          className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-blue-100 text-blue-800"
                        >
                          {hospital}
                          <button
                            type="button"
                            onClick={() => handleHospitalToggle(hospital)}
                            className="ml-2 inline-flex items-center justify-center w-4 h-4 rounded-full text-blue-400 hover:bg-blue-200 hover:text-blue-500"
                          >
                            <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                            </svg>
                          </button>
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                    <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>
                {/* Hospital Options */}
                <div className="mt-2 grid grid-cols-2 gap-2">
                  {hospitals.map((hospital) => (
                    <label key={hospital} className="flex items-center space-x-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={selectedHospitals.includes(hospital)}
                        onChange={() => handleHospitalToggle(hospital)}
                        className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                      />
                      <span className="text-sm text-gray-700">{hospital}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Select Doctors */}
              <div>
                <label className="block text-sm font-semibold text-gray-800 mb-3">Select Doctors</label>
                <div className="relative">
                  <div className="w-full border border-gray-300 rounded-md px-4 py-3 text-gray-600 bg-white min-h-[52px] flex items-center">
                    <div className="flex flex-wrap gap-2">
                      {selectedDoctors.map((doctor) => (
                        <span
                          key={doctor}
                          className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-green-100 text-green-800"
                        >
                          {doctor}
                          <button
                            type="button"
                            onClick={() => handleDoctorToggle(doctor)}
                            className="ml-2 inline-flex items-center justify-center w-4 h-4 rounded-full text-green-400 hover:bg-green-200 hover:text-green-500"
                          >
                            <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                            </svg>
                          </button>
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                    <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>
                {/* Doctor Options */}
                <div className="mt-2 grid grid-cols-2 gap-2">
                  {doctors.map((doctor) => (
                    <label key={doctor} className="flex items-center space-x-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={selectedDoctors.includes(doctor)}
                        onChange={() => handleDoctorToggle(doctor)}
                        className="rounded border-gray-300 text-green-600 focus:ring-green-500"
                      />
                      <span className="text-sm text-gray-700">{doctor}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex justify-end space-x-4 pt-8 border-t border-gray-200">
              <Button
                type="button"
                variant="outline"
                className="px-8 py-3"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="px-8 py-3 bg-blue-600 hover:bg-blue-700"
              >
                Save Treatment Details
              </Button>
            </div>
          </div>
        )}

        {/* Profile & Bio Tab */}
        {activeTab === "profile" && (
          <ProfileDetails />
        )}
      </div>
    </Layout>
  )
}