import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

const PersonalDetails = ({ doctorData }) => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    age: '',
    gender: '',
    createId: '',
    email: '',
    mobile: '',
    maritalStatus: '',
    qualification: '',
    designation: '',
    bloodGroup: '',
    address: '',
    country: '',
    state: '',
    city: '',
    postalCode: ''
  });

  useEffect(() => {
    if (doctorData) {
      setFormData({
        firstName: doctorData.firstName || '',
        lastName: doctorData.lastName || '',
        age: doctorData.age || '',
        gender: doctorData.gender || '',
        createId: doctorData.createId || '',
        email: doctorData.email || '',
        mobile: doctorData.mobile || '',
        maritalStatus: doctorData.maritalStatus || '',
        qualification: doctorData.qualification || '',
        designation: doctorData.designation || '',
        bloodGroup: doctorData.bloodGroup || '',
        address: doctorData.address || '',
        country: doctorData.country || '',
        state: doctorData.state || '',
        city: doctorData.city || '',
        postalCode: doctorData.postalCode || ''
      });
    }
  }, [doctorData]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // In a real app, you would send the updated data to your API
      // const response = await fetch(`/api/doctors/${doctorData.id}`, {
      //   method: 'PUT',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(formData)
      // });
      
      console.log('Updated doctor data:', formData);
      alert('Doctor profile updated successfully!');
      router.push('/doctors/list');
    } catch (error) {
      console.error('Error updating doctor:', error);
      alert('Error updating doctor profile');
    }
  };

  const handleCancel = () => {
    router.push('/doctors/list');
  };

  return (
    <div className="space-y-8">
      <form className="space-y-8" onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="space-y-3">
            <label className="block text-sm font-semibold text-gray-900">First Name</label>
            <input 
              type="text" 
              name="firstName"
              value={formData.firstName}
              onChange={handleInputChange}
              placeholder="Enter First Name" 
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 placeholder-gray-500"
            />
          </div>
          <div className="space-y-3">
            <label className="block text-sm font-semibold text-gray-900">Last Name</label>
            <input 
              type="text" 
              name="lastName"
              value={formData.lastName}
              onChange={handleInputChange}
              placeholder="Enter Last Name" 
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 placeholder-gray-500"
            />
          </div>
          <div className="space-y-3">
            <label className="block text-sm font-semibold text-gray-900">Age</label>
            <input 
              type="number" 
              name="age"
              value={formData.age}
              onChange={handleInputChange}
              placeholder="Age" 
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 placeholder-gray-500"
            />
          </div>
          <div className="space-y-3">
            <label className="block text-sm font-semibold text-gray-900">Gender</label>
            <select 
              name="gender"
              value={formData.gender}
              onChange={handleInputChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 bg-white"
            >
              <option value="" className="text-gray-500">Select</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="space-y-3">
            <label className="block text-sm font-semibold text-gray-900">Create ID</label>
            <input 
              type="text" 
              name="createId"
              value={formData.createId}
              onChange={handleInputChange}
              placeholder="Create Unique ID" 
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 placeholder-gray-500"
            />
          </div>
          <div className="space-y-3">
            <label className="block text-sm font-semibold text-gray-900">Email ID</label>
            <input 
              type="email" 
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="Enter Email ID" 
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 placeholder-gray-500"
            />
          </div>
          <div className="space-y-3">
            <label className="block text-sm font-semibold text-gray-900">Mobile Number</label>
            <input 
              type="text" 
              name="mobile"
              value={formData.mobile}
              onChange={handleInputChange}
              placeholder="Enter Mobile Number" 
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 placeholder-gray-500"
            />
          </div>
          <div className="space-y-3">
            <label className="block text-sm font-semibold text-gray-900">Marital Status</label>
            <select 
              name="maritalStatus"
              value={formData.maritalStatus}
              onChange={handleInputChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 bg-white"
            >
              <option value="" className="text-gray-500">Select</option>
              <option value="single">Single</option>
              <option value="married">Married</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="space-y-3">
            <label className="block text-sm font-semibold text-gray-900">Qualification</label>
            <select 
              name="qualification"
              value={formData.qualification}
              onChange={handleInputChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 bg-white"
            >
              <option value="" className="text-gray-500">Select</option>
              <option value="mbbs">MBBS</option>
              <option value="md">MD</option>
              <option value="ms">MS</option>
            </select>
          </div>
          <div className="space-y-3">
            <label className="block text-sm font-semibold text-gray-900">Designation</label>
            <select 
              name="designation"
              value={formData.designation}
              onChange={handleInputChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 bg-white"
            >
              <option value="" className="text-gray-500">Select</option>
              <option value="consultant">Consultant</option>
              <option value="surgeon">Surgeon</option>
              <option value="resident">Resident</option>
            </select>
          </div>
          <div className="space-y-3">
            <label className="block text-sm font-semibold text-gray-900">Blood Group</label>
            <select 
              name="bloodGroup"
              value={formData.bloodGroup}
              onChange={handleInputChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 bg-white"
            >
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
              name="address"
              value={formData.address}
              onChange={handleInputChange}
              placeholder="Enter Address" 
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 placeholder-gray-500"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="space-y-3">
            <label className="block text-sm font-semibold text-gray-900">Country</label>
            <select 
              name="country"
              value={formData.country}
              onChange={handleInputChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 bg-white"
            >
              <option value="" className="text-gray-500">Select</option>
              <option value="india">India</option>
              <option value="usa">USA</option>
              <option value="uk">UK</option>
            </select>
          </div>
          <div className="space-y-3">
            <label className="block text-sm font-semibold text-gray-900">State</label>
            <select 
              name="state"
              value={formData.state}
              onChange={handleInputChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 bg-white"
            >
              <option value="" className="text-gray-500">Select</option>
              <option value="maharashtra">Maharashtra</option>
              <option value="delhi">Delhi</option>
              <option value="karnataka">Karnataka</option>
            </select>
          </div>
          <div className="space-y-3">
            <label className="block text-sm font-semibold text-gray-900">City</label>
            <select 
              name="city"
              value={formData.city}
              onChange={handleInputChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 bg-white"
            >
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
              name="postalCode"
              value={formData.postalCode}
              onChange={handleInputChange}
              placeholder="Enter Postal Code" 
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 placeholder-gray-500"
            />
          </div>
        </div>

        <div className="flex justify-end space-x-4 pt-8 border-t border-gray-200">
          <button 
            type="button" 
            onClick={handleCancel}
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
      </form>
    </div>
  );
};

export default PersonalDetails; 