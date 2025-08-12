import React from 'react';

const ProfileBio = () => {
  return (
    <div className="space-y-8">
      {/* Photo Sections */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-900">Current Photo</h3>
          <div className="w-80 h-80 bg-white rounded-xl flex items-center justify-center overflow-hidden border border-gray-200 shadow-sm">
            <img 
              src="/doctorimg/doctor-1.png" 
              alt="Hospital" 
              className="w-full h-full object-cover"
            />
          </div>
        </div>
        
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-900">Upload New Photo</h3>
          <div className="w-80 h-80 border-2 border-dashed border-gray-300 rounded-xl flex items-center justify-center bg-gray-50 hover:bg-gray-100 transition-colors duration-200">
            <div className="text-center">
              <svg className="mx-auto h-16 w-16 mb-4 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48">
                <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <p className="text-base font-medium text-gray-600">Upload new photo</p>
            </div>
          </div>
        </div>
      </div>

      {/* Bio Section */}
      <div className="space-y-4">
        <label className="block text-lg font-semibold text-gray-900">Write Bio</label>
        <textarea 
          placeholder="Write something about the hospital..."
          defaultValue="University Hospital Charite Berlin is the largest university clinic in Berlin, with more than 300 years of history. It was established in 1710 by King Frederick I of Prussia and had four Berlin campuses. Ch"
          rows={6}
          className="w-full px-4 py-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none text-gray-900 placeholder-gray-500 text-base"
        />
      </div>

      {/* Specialization Section */}
      <div className="space-y-4">
        <label className="block text-lg font-semibold text-gray-900">Specialization</label>
        <input 
          type="text" 
          placeholder="Cardio, Neurology, etc." 
          className="w-full px-4 py-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none text-gray-900 placeholder-gray-500 text-base"
        />
      </div>

      {/* Medical Units Section */}
      <div className="space-y-4">
        <label className="block text-lg font-semibold text-gray-900">Medical Units</label>
        <input 
          type="text" 
          placeholder="Number of departments" 
          className="w-full px-4 py-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none text-gray-900 placeholder-gray-500 text-base"
        />
      </div>

      {/* Certificates & Badges Section */}
      <div className="space-y-4">
        <label className="block text-lg font-semibold text-gray-900">Certificates & Badges</label>
        <div className="flex items-center space-x-6">
          {/* First Certificate */}
          <div className="w-24 h-24 bg-gradient-to-br from-yellow-100 to-yellow-200 rounded-full flex items-center justify-center border-2 border-yellow-300 shadow-sm">
            <div className="text-center">
              <div className="w-10 h-10 bg-yellow-500 rounded-full mx-auto mb-2 flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z" clipRule="evenodd" />
                </svg>
              </div>
              <p className="text-xs text-yellow-800 font-semibold text-center leading-tight px-1">LEADING MEDICINE GUIDE CERTIFICATE</p>
            </div>
          </div>
          
          {/* Second Certificate */}
          <div className="w-24 h-24 bg-gradient-to-br from-pink-100 to-pink-200 rounded-full flex items-center justify-center border-2 border-pink-300 shadow-sm">
            <div className="text-center">
              <div className="w-10 h-10 bg-pink-500 rounded-full mx-auto mb-2 flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                </svg>
              </div>
              <p className="text-xs text-pink-800 font-semibold text-center leading-tight px-1">CHEST PAIN UNIT</p>
              <p className="text-xs text-pink-700 font-medium text-center leading-tight px-1">DGK-ZERTIFIZIERT</p>
            </div>
          </div>

          {/* Add More Certificate */}
          <div className="w-24 h-24 bg-gray-100 rounded-lg border-2 border-dashed border-gray-300 flex items-center justify-center hover:bg-gray-200 transition-colors duration-200 cursor-pointer">
            <svg className="w-8 h-8 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
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
    </div>
  );
};

export default ProfileBio; 