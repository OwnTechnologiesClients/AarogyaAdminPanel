import React from 'react';

const Availability = () => {
  const days = ['Saturday', 'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {days.map((day) => (
          <div key={day} className="space-y-3">
            <label className="block text-sm font-semibold text-gray-900">{day}</label>
            <select className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 bg-white">
              <option value="" className="text-gray-500">Select</option>
              <option value="available">Available</option>
              <option value="not-available">Not Available</option>
              <option value="morning-only">Morning Only</option>
              <option value="evening-only">Evening Only</option>
            </select>
          </div>
        ))}
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
          Create Doctor Profile
        </button>
      </div>
    </div>
  );
};

export default Availability;