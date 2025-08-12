import React from 'react';

const HospitalDetails = () => {
  return (
    <div className="space-y-8">
      <form className="space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="space-y-3">
            <label className="block text-sm font-semibold text-gray-900">Hospital Name</label>
            <input 
              type="text" 
              placeholder="Enter Hospital Name" 
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 placeholder-gray-500"
            />
          </div>
          <div className="space-y-3">
            <label className="block text-sm font-semibold text-gray-900">Institution Type</label>
            <input 
              type="text" 
              placeholder="Enter Institution Type" 
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 placeholder-gray-500"
            />
          </div>
          <div className="space-y-3">
            <label className="block text-sm font-semibold text-gray-900">Location/Google Map Link</label>
            <input 
              type="text" 
              placeholder="Link" 
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 placeholder-gray-500"
            />
          </div>
          <div className="space-y-3">
            <label className="block text-sm font-semibold text-gray-900">Year Founded</label>
            <input 
              type="text" 
              placeholder="Enter Year Founded" 
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 placeholder-gray-500"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="space-y-3">
            <label className="block text-sm font-semibold text-gray-900">Type Of Care</label>
            <select className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 bg-white">
              <option value="" className="text-gray-500">Select</option>
              <option value="inpatient">Inpatient</option>
              <option value="outpatient">Outpatient</option>
              <option value="both">Both</option>
            </select>
          </div>
          <div className="space-y-3">
            <label className="block text-sm font-semibold text-gray-900">Email ID</label>
            <input 
              type="email" 
              placeholder="Enter Email ID" 
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 placeholder-gray-500"
            />
          </div>
          <div className="space-y-3">
            <label className="block text-sm font-semibold text-gray-900">Age Group</label>
            <select className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 bg-white">
              <option value="" className="text-gray-500">Select</option>
              <option value="pediatric">Pediatric</option>
              <option value="adult">Adult</option>
              <option value="geriatric">Geriatric</option>
              <option value="all">All Ages</option>
            </select>
          </div>
          <div className="space-y-3">
            <label className="block text-sm font-semibold text-gray-900">Size Capacity</label>
            <input 
              type="text" 
              placeholder="Enter Size Capacity" 
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 placeholder-gray-500"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="space-y-3">
            <label className="block text-sm font-semibold text-gray-900">Patients Treated</label>
            <input 
              type="text" 
              placeholder="Enter Patients Treated" 
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 placeholder-gray-500"
            />
          </div>
          <div className="space-y-3">
            <label className="block text-sm font-semibold text-gray-900">Medical Units</label>
            <input 
              type="text" 
              placeholder="Number of departments" 
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 placeholder-gray-500"
            />
          </div>
          <div className="space-y-3">
            <label className="block text-sm font-semibold text-gray-900">Departments</label>
            <input 
              type="text" 
              placeholder="Enter Departments" 
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 placeholder-gray-500"
            />
          </div>
          <div className="space-y-3">
            <label className="block text-sm font-semibold text-gray-900">Features</label>
            <input 
              type="text" 
              placeholder="Enter Features" 
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 placeholder-gray-500"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="space-y-3">
            <label className="block text-sm font-semibold text-gray-900">Focus Areas</label>
            <input 
              type="text" 
              placeholder="Enter Focus Areas" 
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 placeholder-gray-500"
            />
          </div>
          <div className="space-y-3">
            <label className="block text-sm font-semibold text-gray-900">Select Doctors</label>
            <select className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 bg-white">
              <option value="" className="text-gray-500">Select</option>
              <option value="doctor1">Doctor 1</option>
              <option value="doctor2">Doctor 2</option>
              <option value="doctor3">Doctor 3</option>
            </select>
          </div>
          <div className="md:col-span-2 space-y-3">
            <label className="block text-sm font-semibold text-gray-900">Full Address</label>
            <input 
              type="text" 
              placeholder="Enter Full Address" 
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 placeholder-gray-500"
            />
          </div>
        </div>

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