"use client"

import { useState } from "react"
import { Layout } from "@/components/layout"
import { Button } from "@/components/ui/button"
import ProfileDetails from "./profile-details"

export default function AddTreatment() {
  const [activeTab, setActiveTab] = useState("treatment");
  const [treatmentData, setTreatmentData] = useState({
    treatmentId: "",
    treatmentName: "",
    price: "",
    description: "",
    duration: "",
    recovery: "",
    hospital: "",
    hospitalSelectionCriteria: "",
    topDoctors: "",
    doctorSelectionCriteria: "",
    diagnosticTools: "",
    advancedTreatmentOptions: "",
    advantages: "",
    cost: "",
    faq: ""
  });

  const handleInputChange = (field, value) => {
    setTreatmentData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Treatment Data:", treatmentData);
    // Handle form submission here
  };

  return (
    <Layout>
      <div className="space-y-8">
        {/* Page Header */}
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-200">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Add New Treatment</h1>
          <p className="text-gray-600 text-lg">Fill in the comprehensive details about the medical treatment</p>
        </div>

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
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Section 1: Basic Treatment Information */}
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <div className="flex items-center mb-6">
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                  <span className="text-blue-600 font-semibold text-sm">1</span>
                </div>
                <h3 className="text-lg font-semibold text-gray-900">Basic Treatment Information</h3>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-gray-900">Treatment ID *</label>
                  <input 
                    type="text" 
                    value={treatmentData.treatmentId}
                    onChange={(e) => handleInputChange('treatmentId', e.target.value)}
                    placeholder="e.g., cardiology" 
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 placeholder-gray-500"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-gray-900">Treatment Name *</label>
                  <input 
                    type="text" 
                    value={treatmentData.treatmentName}
                    onChange={(e) => handleInputChange('treatmentName', e.target.value)}
                    placeholder="e.g., Coronary Angioplasty" 
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 placeholder-gray-500"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-gray-900">Price *</label>
                  <input 
                    type="text" 
                    value={treatmentData.price}
                    onChange={(e) => handleInputChange('price', e.target.value)}
                    placeholder="e.g., ₹8,500" 
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 placeholder-gray-500"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-gray-900">Duration</label>
                  <input 
                    type="text" 
                    value={treatmentData.duration}
                    onChange={(e) => handleInputChange('duration', e.target.value)}
                    placeholder="e.g., 1-2 hours" 
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 placeholder-gray-500"
                  />
                </div>
                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-gray-900">Recovery Time</label>
                  <input 
                    type="text" 
                    value={treatmentData.recovery}
                    onChange={(e) => handleInputChange('recovery', e.target.value)}
                    placeholder="e.g., 1-3 days" 
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 placeholder-gray-500"
                  />
                </div>
              </div>
              
              <div className="mt-6 space-y-2">
                <label className="block text-sm font-semibold text-gray-900">Description *</label>
                <textarea 
                  value={treatmentData.description}
                  onChange={(e) => handleInputChange('description', e.target.value)}
                  rows="3"
                  placeholder="e.g., Minimally invasive procedure to open blocked coronary arteries" 
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 placeholder-gray-500"
                  required
                />
              </div>
            </div>

            {/* Section 2: Hospital & Doctor Information */}
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <div className="flex items-center mb-6">
                <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center mr-3">
                  <span className="text-green-600 font-semibold text-sm">2</span>
                </div>
                <h3 className="text-lg font-semibold text-gray-900">Hospital & Doctor Information</h3>
              </div>
              
              <div className="space-y-6">
                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-gray-900">Hospital (related to treatment)</label>
                  <textarea 
                    value={treatmentData.hospital}
                    onChange={(e) => handleInputChange('hospital', e.target.value)}
                    rows="3"
                    placeholder="Enter hospital name and data as mentioned on Hospital_Data_template" 
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 placeholder-gray-500"
                  />
                </div>
                
                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-gray-900">What helps to find the best hospital for this treatment?</label>
                  <textarea 
                    value={treatmentData.hospitalSelectionCriteria}
                    onChange={(e) => handleInputChange('hospitalSelectionCriteria', e.target.value)}
                    rows="4"
                    placeholder="Enter criteria for hospital selection (comma separated) e.g., Specialized treatment experience, Board certifications, Success rates, Patient testimonials, International experience" 
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 placeholder-gray-500"
                  />
                </div>
                
                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-gray-900">Top doctors for this treatment</label>
                  <textarea 
                    value={treatmentData.topDoctors}
                    onChange={(e) => handleInputChange('topDoctors', e.target.value)}
                    rows="3"
                    placeholder="Enter related doctors details" 
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 placeholder-gray-500"
                  />
                </div>
                
                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-gray-900">How to select the best doctor for this treatment?</label>
                  <textarea 
                    value={treatmentData.doctorSelectionCriteria}
                    onChange={(e) => handleInputChange('doctorSelectionCriteria', e.target.value)}
                    rows="3"
                    placeholder="e.g., Latest Treatment Options" 
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 placeholder-gray-500"
                  />
                </div>
              </div>
            </div>

            {/* Section 3: Treatment Benefits & Features */}
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <div className="flex items-center mb-6">
                <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center mr-3">
                  <span className="text-purple-600 font-semibold text-sm">3</span>
                </div>
                <h3 className="text-lg font-semibold text-gray-900">Treatment Benefits & Features</h3>
              </div>
              
              <div className="space-y-6">
                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-gray-900">Treatment Benefits & Features</label>
                  <textarea 
                    value={treatmentData.diagnosticTools}
                    onChange={(e) => handleInputChange('diagnosticTools', e.target.value)}
                    rows="6"
                    placeholder="Enter treatment benefits and features (comma separated) e.g., Treatment Benefits, Minimally Invasive Procedures, High Success Rate, Advanced surgical techniques, Proven effectiveness, Robotic Surgery, Minimal Recovery Time, Laser Treatment, Reduced Complications, Targeted Therapy, Better Outcomes, Recent Advancements, Why Choose This Treatment, Innovative Techniques, Expert Care, Cutting-edge treatment methods, Specialized medical expertise, 3D Imaging, Advanced Technology, Precision Medicine, Comprehensive Care, Regenerative Therapy, Patient Support" 
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 placeholder-gray-500"
                  />
                </div>
                
                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-gray-900">Advanced treatment options</label>
                  <textarea 
                    value={treatmentData.advancedTreatmentOptions}
                    onChange={(e) => handleInputChange('advancedTreatmentOptions', e.target.value)}
                    rows="3"
                    placeholder="Enter advanced treatment options for this procedure" 
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 placeholder-gray-500"
                  />
                </div>
              </div>
            </div>

            {/* Section 4: Advantages & Cost */}
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <div className="flex items-center mb-6">
                <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center mr-3">
                  <span className="text-orange-600 font-semibold text-sm">4</span>
                </div>
                <h3 className="text-lg font-semibold text-gray-900">Advantages & Cost</h3>
              </div>
              
              <div className="space-y-6">
                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-gray-900">Advantages of this treatment</label>
                  <textarea 
                    value={treatmentData.advantages}
                    onChange={(e) => handleInputChange('advantages', e.target.value)}
                    rows="3"
                    placeholder="Enter advantages (comma separated) e.g., Treatment cost worldwide, Treatment name, ₹7,65,000" 
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 placeholder-gray-500"
                  />
                </div>
                
                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-gray-900">Cost *</label>
                  <input 
                    type="text" 
                    value={treatmentData.cost}
                    onChange={(e) => handleInputChange('cost', e.target.value)}
                    placeholder="e.g., ₹8,500 / ₹7,65,000" 
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 placeholder-gray-500"
                    required
                  />
                </div>
              </div>
            </div>

            {/* Section 5: FAQ */}
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <div className="flex items-center mb-6">
                <div className="w-8 h-8 bg-teal-100 rounded-full flex items-center justify-center mr-3">
                  <span className="text-teal-600 font-semibold text-sm">5</span>
                </div>
                <h3 className="text-lg font-semibold text-gray-900">Frequently Asked Questions</h3>
              </div>
              
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-900">FAQ</label>
                <textarea 
                  value={treatmentData.faq}
                  onChange={(e) => handleInputChange('faq', e.target.value)}
                  rows="6"
                  placeholder="Enter frequently asked questions (comma separated) e.g., Frequently Asked Questions about this treatment, What is this treatment?, How long does this treatment take?, What is the cost of this treatment?, What are the risks of this treatment?, How do I prepare for this treatment?" 
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 placeholder-gray-500"
                />
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
            Create Treatment Profile
          </button>
        </div>
          </form>
        )}

        {/* Profile & Bio Tab */}
        {activeTab === "profile" && (
          <ProfileDetails />
        )}
      </div>
    </Layout>
  )
}