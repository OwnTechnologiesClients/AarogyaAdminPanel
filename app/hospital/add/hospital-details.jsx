import React from 'react';

const HospitalDetails = () => {
  return (
    <div className="space-y-8">
      <form className="space-y-8">
        {/* Page Header */}
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-200">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Hospital Information</h2>
          <p className="text-gray-600">Fill in the basic details about your hospital</p>
        </div>

        {/* Section 1: Basic Information */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center mb-6">
            <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-3">
              <span className="text-blue-600 font-semibold text-sm">1</span>
            </div>
            <h3 className="text-lg font-semibold text-gray-900">Basic Information</h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-900">Hospital ID *</label>
              <input 
                type="text" 
                placeholder="Enter unique hospital ID" 
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 placeholder-gray-500"
                required
              />
            </div>
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-900">Hospital Name *</label>
              <input 
                type="text" 
                placeholder="Enter hospital name" 
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 placeholder-gray-500"
                required
              />
            </div>
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-900">Location *</label>
              <input 
                type="text" 
                placeholder="City, State, Country" 
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 placeholder-gray-500"
                required
              />
            </div>
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-900">Year Founded</label>
              <input 
                type="text" 
                placeholder="e.g., 2010" 
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 placeholder-gray-500"
              />
            </div>
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-900">Clinic Type *</label>
              <select className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 bg-white" required>
                <option value="" className="text-gray-500">Select clinic type</option>
                <option value="multi-specialty">Multi-Specialty</option>
                <option value="specialty">Specialty</option>
                <option value="general">General</option>
                <option value="research">Research Institute</option>
                <option value="government">Government Hospital</option>
              </select>
            </div>
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-900">Type of Care</label>
              <select className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 bg-white">
                <option value="" className="text-gray-500">Select care type</option>
                <option value="inpatient">Inpatient</option>
                <option value="outpatient">Outpatient</option>
                <option value="emergency">Emergency</option>
                <option value="day-care">Day Care</option>
                <option value="all">All Types</option>
              </select>
            </div>
          </div>
        </div>

        {/* Section 2: Image Upload */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center mb-6">
            <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center mr-3">
              <span className="text-green-600 font-semibold text-sm">2</span>
            </div>
            <h3 className="text-lg font-semibold text-gray-900">Hospital Images</h3>
          </div>
          
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-900">Main Hospital Image</label>
                <input 
                  type="file" 
                  accept="image/*"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
                />
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-900">Operation Theater</label>
                <input 
                  type="file" 
                  accept="image/*"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
                />
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-900">Patient Rooms</label>
                <input 
                  type="file" 
                  accept="image/*"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
                />
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-900">Hospital Facilities</label>
                <input 
                  type="file" 
                  accept="image/*"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
                />
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-900">Hospital Exterior</label>
                <input 
                  type="file" 
                  accept="image/*"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Section 3: Ratings */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center mb-6">
            <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center mr-3">
              <span className="text-purple-600 font-semibold text-sm">3</span>
            </div>
            <h3 className="text-lg font-semibold text-gray-900">Ratings</h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-900">Overall Rating</label>
              <input 
                type="number" 
                step="0.1"
                min="0"
                max="10"
                placeholder="e.g., 9.9" 
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 placeholder-gray-500"
              />
              <p className="text-xs text-gray-500">Scale: 0-10</p>
            </div>
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-900">User Score</label>
              <input 
                type="number" 
                step="0.1"
                min="0"
                max="10"
                placeholder="e.g., 9.9" 
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 placeholder-gray-500"
              />
              <p className="text-xs text-gray-500">Scale: 0-10</p>
            </div>
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-900">Google Rating</label>
              <input 
                type="number" 
                step="0.1"
                min="0"
                max="5"
                placeholder="e.g., 4.5" 
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 placeholder-gray-500"
              />
              <p className="text-xs text-gray-500">Scale: 0-5 (based on patient reviews)</p>
            </div>
          </div>
        </div>

        {/* Section 4: Overview & Capacity */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center mb-6">
            <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center mr-3">
              <span className="text-orange-600 font-semibold text-sm">4</span>
            </div>
            <h3 className="text-lg font-semibold text-gray-900">Overview & Size & Capacity</h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-900">Total Patients</label>
              <input 
                type="text" 
                placeholder="e.g., 50,000+" 
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 placeholder-gray-500"
              />
            </div>
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-900">Number of Doctors</label>
              <input 
                type="number" 
                placeholder="e.g., 45" 
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 placeholder-gray-500"
              />
            </div>
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-900">Operation Theaters (OT)</label>
              <input 
                type="number" 
                placeholder="e.g., 10" 
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 placeholder-gray-500"
              />
            </div>
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-900">ICU Units</label>
              <input 
                type="number" 
                placeholder="e.g., 5" 
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 placeholder-gray-500"
              />
            </div>
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-900">Patient Beds</label>
              <input 
                type="text" 
                placeholder="e.g., 100+" 
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 placeholder-gray-500"
              />
            </div>
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-900">Age Group</label>
              <select className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 bg-white">
                <option value="" className="text-gray-500">Select age group</option>
                <option value="kids">Kids</option>
                <option value="adults">Adults</option>
                <option value="elderly">Elderly</option>
                <option value="all">All Ages</option>
              </select>
            </div>
          </div>
        </div>

        {/* Section 5: Medical Specialities */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center mb-6">
            <div className="w-8 h-8 bg-teal-100 rounded-full flex items-center justify-center mr-3">
              <span className="text-teal-600 font-semibold text-sm">5</span>
            </div>
            <h3 className="text-lg font-semibold text-gray-900">Medical Specialities</h3>
          </div>
          
          <div className="space-y-4">
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-900">Primary Specialities *</label>
              <textarea 
                rows="3"
                placeholder="Enter primary medical specialities (comma separated) e.g., Interventional Cardiology, Heart Transplant, Electrophysiology, Cardiac Surgery" 
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 placeholder-gray-500"
                required
              />
            </div>
          </div>
        </div>

        {/* Section 6: Hospital Features & Equipment */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center mb-6">
            <div className="w-8 h-8 bg-indigo-100 rounded-full flex items-center justify-center mr-3">
              <span className="text-indigo-600 font-semibold text-sm">6</span>
            </div>
            <h3 className="text-lg font-semibold text-gray-900">Hospital Features & Equipment</h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-900">Hospital Features & Facilities</label>
              <textarea 
                rows="4"
                placeholder="Enter hospital features (comma separated) e.g., Advanced Cardiac Imaging, Robotic Surgery, Minimally Invasive Procedures, Hybrid ORs, 3D Printing Lab, Emergency Trauma Center" 
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 placeholder-gray-500"
              />
            </div>
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-900">Advanced Medical Equipment</label>
              <textarea 
                rows="4"
                placeholder="Enter advanced medical equipment (comma separated) e.g., MRI Scanner (3 Tesla MRI for detailed Imaging), Cardiac Cath Lab (State-of-the-art cardiac catheterization laboratory)" 
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 placeholder-gray-500"
              />
            </div>
          </div>
        </div>

        {/* Section 7: About & Values */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center mb-6">
            <div className="w-8 h-8 bg-pink-100 rounded-full flex items-center justify-center mr-3">
              <span className="text-pink-600 font-semibold text-sm">7</span>
            </div>
            <h3 className="text-lg font-semibold text-gray-900">About & Values</h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-900">About Our Hospital</label>
              <textarea 
                rows="4"
                placeholder="Enter detailed description about the hospital, its history, and achievements e.g., For over 300 years, we have been committed to providing exceptional healthcare services..." 
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 placeholder-gray-500"
              />
            </div>
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-900">Our Mission</label>
              <textarea 
                rows="4"
                placeholder="Enter hospital mission statement and goals e.g., To provide compassionate, high-quality healthcare services..." 
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 placeholder-gray-500"
              />
            </div>
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-900">Our Vision</label>
              <textarea 
                rows="4"
                placeholder="Enter hospital vision statement and future aspirations e.g., To be the leading healthcare provider in the region..." 
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 placeholder-gray-500"
              />
            </div>
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-900">Our Values</label>
              <textarea 
                rows="4"
                placeholder="Enter hospital values (comma separated) e.g., Compassion and empathy in every Interaction, Excellence in clinical care and service, Integrity and transparency in all we do, Innovation and continuous Improvement, Respect for patients, families, and colleagues" 
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 placeholder-gray-500"
              />
            </div>
          </div>
        </div>

        {/* Section 8: Certificates & Accreditations */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center mb-6">
            <div className="w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center mr-3">
              <span className="text-yellow-600 font-semibold text-sm">8</span>
            </div>
            <h3 className="text-lg font-semibold text-gray-900">Certificates & Accreditations</h3>
          </div>
          
          <div className="space-y-4">
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-900">Certificates & Accreditations</label>
              <textarea 
                rows="3"
                placeholder="Enter certificates and accreditations (comma separated) e.g., JCI Accreditation, NABH Accreditation, ISO 9001, Medical Council Recognition, Government Approval" 
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 placeholder-gray-500"
              />
            </div>
          </div>
        </div>

        {/* Section 9: Doctors */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center mb-6">
            <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center mr-3">
              <span className="text-red-600 font-semibold text-sm">9</span>
            </div>
            <h3 className="text-lg font-semibold text-gray-900">Doctors</h3>
          </div>
          
          <div className="space-y-4">
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-900">Number of Doctors</label>
              <input 
                type="number" 
                placeholder="e.g., 45" 
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 placeholder-gray-500"
              />
            </div>
          </div>
        </div>

        {/* Section 10: Gallery */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center mb-6">
            <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center mr-3">
              <span className="text-gray-600 font-semibold text-sm">10</span>
            </div>
            <h3 className="text-lg font-semibold text-gray-900">Gallery</h3>
          </div>
          
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-900">Operation Rooms</label>
                <input 
                  type="file" 
                  accept="image/*"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
                />
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-900">Patient Rooms</label>
                <input 
                  type="file" 
                  accept="image/*"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
                />
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-900">Facilities</label>
                <input 
                  type="file" 
                  accept="image/*"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
                />
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-900">Exterior</label>
                <input 
                  type="file" 
                  accept="image/*"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Section 11: Location & Contact */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center mb-6">
            <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-3">
              <span className="text-blue-600 font-semibold text-sm">11</span>
            </div>
            <h3 className="text-lg font-semibold text-gray-900">Location & Contact</h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-900">Hospital Name</label>
              <input 
                type="text" 
                placeholder="e.g., Granite Medical Center" 
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 placeholder-gray-500"
              />
            </div>
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-900">Email Address</label>
              <input 
                type="email" 
                placeholder="e.g., info@granitemedical.com" 
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 placeholder-gray-500"
              />
            </div>
            <div className="md:col-span-2 space-y-2">
              <label className="block text-sm font-semibold text-gray-900">Full Address</label>
              <textarea 
                rows="3"
                placeholder="Enter complete hospital address including street, city, state, postal code, and country e.g., 123 Medical Center Drive, Delhi, India 110001" 
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 placeholder-gray-500"
              />
            </div>
          </div>
        </div>

        {/* Section 12: Operating Hours */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center mb-6">
            <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center mr-3">
              <span className="text-green-600 font-semibold text-sm">12</span>
            </div>
            <h3 className="text-lg font-semibold text-gray-900">Operating Hours</h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-3">
              <label className="block text-sm font-semibold text-gray-900">Monday-Friday</label>
              <div className="space-y-2">
                <input 
                  type="text" 
                  placeholder="Emergency: 24/7" 
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 placeholder-gray-500"
                />
                <input 
                  type="text" 
                  placeholder="General: 8:00 AM - 8:00 PM" 
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 placeholder-gray-500"
                />
              </div>
            </div>
            <div className="space-y-3">
              <label className="block text-sm font-semibold text-gray-900">Saturday</label>
              <div className="space-y-2">
                <input 
                  type="text" 
                  placeholder="Emergency: 24/7" 
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 placeholder-gray-500"
                />
                <input 
                  type="text" 
                  placeholder="General: 9:00 AM - 6:00 PM" 
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 placeholder-gray-500"
                />
              </div>
            </div>
            <div className="space-y-3">
              <label className="block text-sm font-semibold text-gray-900">Sunday</label>
              <div className="space-y-2">
                <input 
                  type="text" 
                  placeholder="Emergency: 24/7" 
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 placeholder-gray-500"
                />
                <input 
                  type="text" 
                  placeholder="General: 10:00 AM - 4:00 PM" 
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 placeholder-gray-500"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Section 13: How to Reach Us */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center mb-6">
            <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center mr-3">
              <span className="text-purple-600 font-semibold text-sm">13</span>
            </div>
            <h3 className="text-lg font-semibold text-gray-900">How to Reach Us</h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-900">By Car</label>
              <textarea 
                rows="2"
                placeholder="e.g., Free parking (300+ spaces), valet service available" 
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 placeholder-gray-500"
              />
            </div>
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-900">By Bus</label>
              <textarea 
                rows="2"
                placeholder="e.g., Medical Center (30m), Central Station (200m)" 
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 placeholder-gray-500"
              />
            </div>
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-900">By Metro</label>
              <textarea 
                rows="2"
                placeholder="e.g., Central Metro Station (5 min walk, Blue Line, Red Line)" 
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 placeholder-gray-500"
              />
            </div>
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-900">By Air</label>
              <textarea 
                rows="2"
                placeholder="e.g., Delhi Airport (45 min drive, airport shuttle available)" 
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 placeholder-gray-500"
              />
            </div>
          </div>
        </div>

        {/* Section 14: Nearby Landmarks */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center mb-6">
            <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center mr-3">
              <span className="text-orange-600 font-semibold text-sm">14</span>
            </div>
            <h3 className="text-lg font-semibold text-gray-900">Nearby Landmarks</h3>
          </div>
          
          <div className="space-y-4">
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-900">Nearby Landmarks</label>
              <textarea 
                rows="3"
                placeholder="Enter nearby landmarks with distances (comma separated) e.g., Central Park: 0.5 km, City Mall: 1.2 km, Delhi University: 2.1 km, Government Hospital: 3.0 km, International Airport: 25 km" 
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 placeholder-gray-500"
              />
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-end space-x-4 pt-8 border-t border-gray-200">
          <button 
            type="button" 
            className="px-8 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent font-medium transition-colors duration-200"
          >
            Cancel
          </button>
          <button 
            type="submit" 
            className="px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent font-medium transition-colors duration-200"
          >
            Create Hospital Profile
          </button>
        </div>
      </form>
    </div>
  );
};

export default HospitalDetails; 