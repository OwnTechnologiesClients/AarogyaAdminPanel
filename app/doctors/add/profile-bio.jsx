import React from 'react';

const ProfileBio = () => {
  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-900">Current Photo</h3>
          <div className="w-80 h-80 bg-gray-100 rounded-xl flex items-center justify-center overflow-hidden border border-gray-200">
            <img 
              src="/doctorimg/doctor-1.png" 
              alt="Doctor" 
              className="w-full h-full object-cover"
            />
          </div>
        </div>
        
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-900">Upload New Photo</h3>
          <div className="w-80 h-80 border-2 border-dashed border-gray-300 rounded-xl flex items-center justify-center bg-gray-50 hover:bg-gray-100 transition-colors duration-200">
            <label htmlFor="upload-photo" className="cursor-pointer text-center">
              <div className="text-gray-500 hover:text-gray-700">
                <svg className="mx-auto h-16 w-16 mb-6" stroke="currentColor" fill="none" viewBox="0 0 48 48">
                  <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <p className="text-base font-medium">Upload new photo</p>
                <p className="text-sm text-gray-400 mt-2">Click to browse files</p>
              </div>
              <input id="upload-photo" type="file" className="hidden" accept="image/*" />
            </label>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <label className="block text-lg font-semibold text-gray-900">Write Bio</label>
        <textarea 
          placeholder="Write something about the doctor..."
          defaultValue="Hello"
          rows={8}
          className="w-full px-4 py-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none text-gray-900 placeholder-gray-500 text-base"
        />
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
          Update Doctor Profile
        </button>
      </div>
    </div>
  );
};

export default ProfileBio;