import React from 'react';

const PersonalDetails = () => {
  return (
    <div className="space-y-8">
      <form className="space-y-8">
        {/* Basic Information */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="space-y-3">
            <label className="block text-sm font-semibold text-gray-900">Doctor ID</label>
            <input 
              type="text" 
              placeholder="Enter Doctor ID" 
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 placeholder-gray-500"
            />
          </div>
          <div className="space-y-3">
            <label className="block text-sm font-semibold text-gray-900">Doctor Name</label>
            <input 
              type="text" 
              placeholder="Enter Doctor Name" 
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 placeholder-gray-500"
            />
          </div>
          <div className="space-y-3">
            <label className="block text-sm font-semibold text-gray-900">Specialty</label>
            <input 
              type="text" 
              placeholder="Enter Specialty" 
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 placeholder-gray-500"
            />
          </div>
          <div className="space-y-3">
            <label className="block text-sm font-semibold text-gray-900">Location</label>
            <input 
              type="text" 
              placeholder="Enter Location" 
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 placeholder-gray-500"
            />
          </div>
        </div>

        {/* Image and Experience */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="space-y-3">
            <label className="block text-sm font-semibold text-gray-900">Image</label>
            <input 
              type="file" 
              accept="image/*"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 placeholder-gray-500"
            />
          </div>
          <div className="space-y-3">
            <label className="block text-sm font-semibold text-gray-900">Experience</label>
            <input 
              type="text" 
              placeholder="e.g., 30+ years" 
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 placeholder-gray-500"
            />
          </div>
          <div className="space-y-3">
            <label className="block text-sm font-semibold text-gray-900">Rating</label>
            <input 
              type="number" 
              step="0.1"
              min="0"
              max="10"
              placeholder="e.g., 9.9" 
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 placeholder-gray-500"
            />
          </div>
          <div className="space-y-3">
            <label className="block text-sm font-semibold text-gray-900">Patients Treated</label>
            <input 
              type="text" 
              placeholder="e.g., 50+" 
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 placeholder-gray-500"
            />
          </div>
        </div>

        {/* Introduction and Specializations */}
        <div className="space-y-6">
          <div className="space-y-3">
            <label className="block text-sm font-semibold text-gray-900">Introduction</label>
            <textarea 
              rows="3"
              placeholder="Enter doctor's introduction and expertise description" 
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 placeholder-gray-500"
            />
          </div>
          <div className="space-y-3">
            <label className="block text-sm font-semibold text-gray-900">Specializations</label>
            <textarea 
              rows="3"
              placeholder="Enter specializations (comma separated)" 
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 placeholder-gray-500"
            />
          </div>
        </div>

        {/* Education and Professional Experience */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-3">
            <label className="block text-sm font-semibold text-gray-900">Education</label>
            <textarea 
              rows="4"
              placeholder="Enter educational background and degrees" 
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 placeholder-gray-500"
            />
          </div>
          <div className="space-y-3">
            <label className="block text-sm font-semibold text-gray-900">Professional Experience</label>
            <textarea 
              rows="4"
              placeholder="Enter professional experience and positions held" 
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 placeholder-gray-500"
            />
          </div>
        </div>

        {/* Languages and Treatments */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-3">
            <label className="block text-sm font-semibold text-gray-900">Languages</label>
            <input 
              type="text" 
              placeholder="e.g., English, Spanish" 
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 placeholder-gray-500"
            />
          </div>
          <div className="space-y-3">
            <label className="block text-sm font-semibold text-gray-900">Treatments & Procedures</label>
            <textarea 
              rows="3"
              placeholder="Enter treatments and procedures performed" 
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 placeholder-gray-500"
            />
          </div>
        </div>

        {/* Awards and About */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-3">
            <label className="block text-sm font-semibold text-gray-900">Awards</label>
            <textarea 
              rows="3"
              placeholder="Enter awards and recognitions" 
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 placeholder-gray-500"
            />
          </div>
          <div className="space-y-3">
            <label className="block text-sm font-semibold text-gray-900">About</label>
            <textarea 
              rows="3"
              placeholder="Enter detailed about information" 
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 placeholder-gray-500"
            />
          </div>
        </div>

        {/* Work Experience */}
        <div className="space-y-3">
          <label className="block text-sm font-semibold text-gray-900">Work Experience</label>
          <textarea 
            rows="4"
            placeholder="Enter detailed work experience with timeline" 
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 placeholder-gray-500"
          />
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
            Create Doctor Profile
          </button>
        </div>
      </form>
    </div>
  );
};

export default PersonalDetails;