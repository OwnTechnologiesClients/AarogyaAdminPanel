import React from 'react';

const AccountDetails = () => {
  return (
    <div className="space-y-8">
      <form className="space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="space-y-3">
            <label className="block text-sm font-semibold text-gray-900">Name</label>
            <input 
              type="text" 
              placeholder="Full name" 
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 placeholder-gray-500"
            />
          </div>
          <div className="space-y-3">
            <label className="block text-sm font-semibold text-gray-900">Qualification</label>
            <select className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 bg-white">
              <option value="" className="text-gray-500">Select</option>
              <option value="mbbs">MBBS</option>
              <option value="md">MD</option>
              <option value="ms">MS</option>
            </select>
          </div>
          <div className="space-y-3">
            <label className="block text-sm font-semibold text-gray-900">Age</label>
            <input 
              type="number" 
              placeholder="Age" 
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 placeholder-gray-500"
            />
          </div>
          <div className="space-y-3">
            <label className="block text-sm font-semibold text-gray-900">Email ID</label>
            <input 
              type="email" 
              placeholder="Enter Email ID" 
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 placeholder-gray-500"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="space-y-3">
            <label className="block text-sm font-semibold text-gray-900">Mobile Number</label>
            <input 
              type="text" 
              placeholder="Enter Mobile Number" 
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 placeholder-gray-500"
            />
          </div>
          <div className="space-y-3">
            <label className="block text-sm font-semibold text-gray-900">Designation</label>
            <select className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 bg-white">
              <option value="" className="text-gray-500">Select</option>
              <option value="consultant">Consultant</option>
              <option value="surgeon">Surgeon</option>
              <option value="resident">Resident</option>
            </select>
          </div>
          <div className="space-y-3">
            <label className="block text-sm font-semibold text-gray-900">Blood Group</label>
            <select className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 bg-white">
              <option value="" className="text-gray-500">Select</option>
              <option value="a+">A+</option>
              <option value="a-">A-</option>
              <option value="b+">B+</option>
              <option value="b-">B-</option>
              <option value="o+">O+</option>
              <option value="o-">O-</option>
              <option value="ab+">AB+</option>
              <option value="ab-">AB-</option>
            </select>
          </div>
          <div className="space-y-3">
            <label className="block text-sm font-semibold text-gray-900">Address</label>
            <input 
              type="text" 
              placeholder="Enter Address" 
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 placeholder-gray-500"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="space-y-3">
            <label className="block text-sm font-semibold text-gray-900">Country</label>
            <select className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 bg-white">
              <option value="" className="text-gray-500">Select</option>
              <option value="india">India</option>
              <option value="usa">USA</option>
              <option value="uk">UK</option>
            </select>
          </div>
          <div className="space-y-3">
            <label className="block text-sm font-semibold text-gray-900">State</label>
            <select className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 bg-white">
              <option value="" className="text-gray-500">Select</option>
              <option value="maharashtra">Maharashtra</option>
              <option value="delhi">Delhi</option>
              <option value="karnataka">Karnataka</option>
            </select>
          </div>
          <div className="space-y-3">
            <label className="block text-sm font-semibold text-gray-900">City</label>
            <select className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 bg-white">
              <option value="" className="text-gray-500">Select</option>
              <option value="mumbai">Mumbai</option>
              <option value="pune">Pune</option>
              <option value="bangalore">Bangalore</option>
            </select>
          </div>
          <div className="space-y-3">
            <label className="block text-sm font-semibold text-gray-900">Postal Code</label>
            <input 
              type="text" 
              placeholder="Enter Postal Code" 
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
            Create Doctor Profile
          </button>
        </div>
      </form>
    </div>
  );
};

export default AccountDetails;