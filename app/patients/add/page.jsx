"use client"

import { useState } from "react"
import { Layout } from "@/components/layout"
import { Button } from "@/components/ui/button"

const bloodGroups = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];
const occupations = ["Student", "Engineer", "Doctor", "Teacher", "Other"];
const cities = ["Mumbai", "Delhi", "Bangalore", "Chennai", "Other"];
const states = ["Maharashtra", "Delhi", "Karnataka", "Tamil Nadu", "Other"];
const genders = ["Male", "Female", "Other"];
const maritalStatuses = ["Single", "Married", "Divorced", "Widowed"];

export default function AddPatient() {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    age: "",
    gender: "",
    createId: "",
    email: "",
    mobile: "",
    maritalStatus: "",
    occupation: "",
    bloodGroup: "",
    bloodPressure: "80 - 120",
    sugarLevel: "",
    address: "",
    city: "",
    state: "",
    postalCode: "",
    reports: null,
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Submit logic here
  };

  return (
    <Layout>
      <div className="space-y-6">
        <h1 className="text-2xl font-bold text-gray-900">Add Patient Details</h1>
        <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 space-y-8">
          <div className="grid grid-cols-4 gap-6">
            <div className="col-span-1">
              <label className="block text-sm font-semibold text-gray-800 mb-1">First Name</label>
              <input name="firstName" value={form.firstName} onChange={handleChange} placeholder="Enter First Name" className="w-full border border-gray-300 rounded-md px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900" />
            </div>
            <div className="col-span-1">
              <label className="block text-sm font-semibold text-gray-800 mb-1">Last Name</label>
              <input name="lastName" value={form.lastName} onChange={handleChange} placeholder="Enter Last Name" className="w-full border border-gray-300 rounded-md px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900" />
            </div>
            <div className="col-span-1">
              <label className="block text-sm font-semibold text-gray-800 mb-1">Age</label>
              <input name="age" value={form.age} onChange={handleChange} placeholder="Age" className="w-full border border-gray-300 rounded-md px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900" />
            </div>
            <div className="col-span-1">
              <label className="block text-sm font-semibold text-gray-800 mb-1">Gender</label>
              <select name="gender" value={form.gender} onChange={handleChange} className="w-full border border-gray-300 rounded-md px-4 py-2 text-gray-900">
                <option value="">Select</option>
                {genders.map((g) => <option key={g} value={g}>{g}</option>)}
              </select>
            </div>
            <div className="col-span-1">
              <label className="block text-sm font-semibold text-gray-800 mb-1">Create ID</label>
              <input name="createId" value={form.createId} onChange={handleChange} placeholder="Create Unique ID" className="w-full border border-gray-300 rounded-md px-4 py-2 text-gray-900" />
            </div>
            <div className="col-span-1">
              <label className="block text-sm font-semibold text-gray-800 mb-1">Email ID</label>
              <input name="email" value={form.email} onChange={handleChange} placeholder="Enter Email ID" className="w-full border border-gray-300 rounded-md px-4 py-2 text-gray-900" />
            </div>
            <div className="col-span-1">
              <label className="block text-sm font-semibold text-gray-800 mb-1">Mobile Number</label>
              <input name="mobile" value={form.mobile} onChange={handleChange} placeholder="Enter Mobile Number" className="w-full border border-gray-300 rounded-md px-4 py-2 text-gray-900" />
            </div>
            <div className="col-span-1">
              <label className="block text-sm font-semibold text-gray-800 mb-1">Marital Status</label>
              <select name="maritalStatus" value={form.maritalStatus} onChange={handleChange} className="w-full border border-gray-300 rounded-md px-4 py-2 text-gray-900">
                <option value="">Select</option>
                {maritalStatuses.map((m) => <option key={m} value={m}>{m}</option>)}
              </select>
            </div>
            <div className="col-span-1">
              <label className="block text-sm font-semibold text-gray-800 mb-1">Occupation</label>
              <select name="occupation" value={form.occupation} onChange={handleChange} className="w-full border border-gray-300 rounded-md px-4 py-2 text-gray-900">
                <option value="">Select</option>
                {occupations.map((o) => <option key={o} value={o}>{o}</option>)}
              </select>
            </div>
            <div className="col-span-1">
              <label className="block text-sm font-semibold text-gray-800 mb-1">Blood Group</label>
              <select name="bloodGroup" value={form.bloodGroup} onChange={handleChange} className="w-full border border-gray-300 rounded-md px-4 py-2 text-gray-900">
                <option value="">Select</option>
                {bloodGroups.map((b) => <option key={b} value={b}>{b}</option>)}
              </select>
            </div>
            <div className="col-span-1">
              <label className="block text-sm font-semibold text-gray-800 mb-1">Blood Pressure</label>
              <input name="bloodPressure" value={form.bloodPressure} onChange={handleChange} placeholder="80 - 120" className="w-full border border-gray-300 rounded-md px-4 py-2 text-gray-900" />
            </div>
            <div className="col-span-1">
              <label className="block text-sm font-semibold text-gray-800 mb-1">Sugar Level</label>
              <input name="sugarLevel" value={form.sugarLevel} onChange={handleChange} placeholder="Enter Sugar Levels" className="w-full border border-gray-300 rounded-md px-4 py-2 text-gray-900" />
            </div>
            <div className="col-span-1">
              <label className="block text-sm font-semibold text-gray-800 mb-1">Address</label>
              <input name="address" value={form.address} onChange={handleChange} placeholder="Enter Mobile Number" className="w-full border border-gray-300 rounded-md px-4 py-2 text-gray-900" />
            </div>
            <div className="col-span-1">
              <label className="block text-sm font-semibold text-gray-800 mb-1">City</label>
              <select name="city" value={form.city} onChange={handleChange} className="w-full border border-gray-300 rounded-md px-4 py-2 text-gray-900">
                <option value="">Select</option>
                {cities.map((c) => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
            <div className="col-span-1">
              <label className="block text-sm font-semibold text-gray-800 mb-1">State</label>
              <select name="state" value={form.state} onChange={handleChange} className="w-full border border-gray-300 rounded-md px-4 py-2 text-gray-900">
                <option value="">Select</option>
                {states.map((s) => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>
            <div className="col-span-1">
              <label className="block text-sm font-semibold text-gray-800 mb-1">Postal Code</label>
              <input name="postalCode" value={form.postalCode} onChange={handleChange} placeholder="Enter Postal Code" className="w-full border border-gray-300 rounded-md px-4 py-2 text-gray-900" />
            </div>
          </div>

          {/* Upload Health Reports */}
          <div className="mt-8">
            <label className="block text-sm font-semibold text-gray-800 mb-2">Upload your health reports</label>
            <div className="flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-lg bg-gray-50 py-12 cursor-pointer hover:border-blue-400 transition-colors">
              <input type="file" name="reports" onChange={handleChange} className="hidden" id="reports-upload" />
              <label htmlFor="reports-upload" className="cursor-pointer text-center">
                <span className="block text-gray-600 mb-2">Click here to upload or Drag your reports here</span>
                <span className="font-bold text-blue-700 text-lg">Upload your health reports</span>
              </label>
            </div>
          </div>

          {/* Buttons */}
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
           Create Patient Profile
          </button>
        </div>
        </form>
      </div>
    </Layout>
  )
}