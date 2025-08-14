"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"

export default function ProfileDetails() {
  const [overview, setOverview] = useState("University Hospital Charite Berlin is the largest university clinic in Berlin, with more than 300 years of history. It was established in 1710 by King Frederick I of Prussia and had four Berlin campuses. Charite is one of the most prestigious medical institutions in Europe, known for its cutting-edge research and exceptional patient care.");
  
  const [diagnosisDetails, setDiagnosisDetails] = useState([
    {
      id: 1,
      name: "Computed tomography",
      description: "This scan, available at each leading neurology hospital and clinic, helps neurologists see inside the brain. It's used to find neurology-related diseases like stroke, hydrocephalus, and brain tumors."
    }
  ]);

  const [advancedTreatments, setAdvancedTreatments] = useState([
    {
      id: 1,
      name: "Savion",
      description: "It is a computer program designed to treat Alzheimer's disease. The goal is to stimulate long-term memory, which is inextricably linked with short-term memory. Savion improves a person's spatial orientation, speech skills, and general knowledge."
    }
  ]);

  const [newDiagnosis, setNewDiagnosis] = useState({ name: "", description: "" });
  const [newTreatment, setNewTreatment] = useState({ name: "", description: "" });

  const addDiagnosis = () => {
    if (newDiagnosis.name.trim() && newDiagnosis.description.trim()) {
      setDiagnosisDetails(prev => [...prev, { id: Date.now(), ...newDiagnosis }]);
      setNewDiagnosis({ name: "", description: "" });
    }
  };

  const addTreatment = () => {
    if (newTreatment.name.trim() && newTreatment.description.trim()) {
      setAdvancedTreatments(prev => [...prev, { id: Date.now(), ...newTreatment }]);
      setNewTreatment({ name: "", description: "" });
    }
  };

  const removeDiagnosis = (id) => {
    setDiagnosisDetails(prev => prev.filter(item => item.id !== id));
  };

  const removeTreatment = (id) => {
    setAdvancedTreatments(prev => prev.filter(item => item.id !== id));
  };

  return (
    <div className="space-y-8">
      {/* Write Overview Section */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Write Overview</h3>
        <textarea
          value={overview}
          onChange={(e) => setOverview(e.target.value)}
          className="w-full h-32 p-4 border border-gray-300 rounded-md resize-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 placeholder-gray-500"
          placeholder="Write your overview here..."
        />
      </div>

      {/* Diagnosis Details Section */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Diagnosis Details</h3>
        
        {/* Existing Diagnosis Items */}
        {diagnosisDetails.map((item) => (
          <div key={item.id} className="mb-6 p-4 border border-gray-200 rounded-lg">
            <div className="flex items-start justify-between mb-3">
              <input
                type="text"
                value={item.name}
                onChange={(e) => {
                  setDiagnosisDetails(prev => 
                    prev.map(d => d.id === item.id ? { ...d, name: e.target.value } : d)
                  );
                }}
                className="text-lg font-medium text-gray-900 border-b border-transparent focus:border-blue-500 focus:outline-none px-1 py-1"
                placeholder="Diagnosis name"
              />
              <button
                onClick={() => removeDiagnosis(item.id)}
                className="text-red-500 hover:text-red-700 p-1"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
              </button>
            </div>
            <textarea
              value={item.description}
              onChange={(e) => {
                setDiagnosisDetails(prev => 
                  prev.map(d => d.id === item.id ? { ...d, description: e.target.value } : d)
                );
              }}
              className="w-full h-24 p-3 border border-gray-300 rounded-md resize-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 placeholder-gray-500"
              placeholder="Write diagnosis description..."
            />
          </div>
        ))}

        {/* Add New Diagnosis */}
        <div className="border border-gray-200 rounded-lg p-4">
          <div className="flex items-start space-x-4">
            <div className="flex-1 space-y-3">
              <input
                type="text"
                value={newDiagnosis.name}
                onChange={(e) => setNewDiagnosis(prev => ({ ...prev, name: e.target.value }))}
                className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 placeholder-gray-500"
                placeholder="Write Overview"
              />
              <textarea
                value={newDiagnosis.description}
                onChange={(e) => setNewDiagnosis(prev => ({ ...prev, description: e.target.value }))}
                className="w-full h-24 p-3 border border-gray-300 rounded-md resize-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 placeholder-gray-500"
                placeholder="Write diagnosis description..."
              />
            </div>
            <button
              onClick={addDiagnosis}
              className="w-12 h-12 bg-green-500 hover:bg-green-600 text-white rounded-lg flex items-center justify-center transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Advanced Treatment Solutions Section */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Advanced treatment solutions</h3>
        
        {/* Existing Treatment Items */}
        {advancedTreatments.map((item) => (
          <div key={item.id} className="mb-6 p-4 border border-gray-200 rounded-lg">
            <div className="flex items-start justify-between mb-3">
              <input
                type="text"
                value={item.name}
                onChange={(e) => {
                  setAdvancedTreatments(prev => 
                    prev.map(t => t.id === item.id ? { ...t, name: e.target.value } : d)
                  );
                }}
                className="text-lg font-medium text-gray-900 border-b border-transparent focus:border-blue-500 focus:outline-none px-1 py-1"
                placeholder="Treatment name"
              />
              <button
                onClick={() => removeTreatment(item.id)}
                className="text-red-500 hover:text-red-700 p-1"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
              </button>
            </div>
            <textarea
              value={item.description}
              onChange={(e) => {
                setAdvancedTreatments(prev => 
                  prev.map(t => t.id === item.id ? { ...t, description: e.target.value } : d)
                );
              }}
              className="w-full h-24 p-3 border border-gray-300 rounded-md resize-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 placeholder-gray-500"
              placeholder="Write treatment description..."
            />
            

          </div>
        ))}

        {/* Add New Treatment */}
        <div className="border border-gray-200 rounded-lg p-4">
          <div className="flex items-start space-x-4">
            <div className="flex-1 space-y-3">
              <input
                type="text"
                value={newTreatment.name}
                onChange={(e) => setNewTreatment(prev => ({ ...prev, name: e.target.value }))}
                className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 placeholder-gray-500"
                placeholder="Write Overview"
              />
              <textarea
                value={newTreatment.description}
                onChange={(e) => setNewTreatment(prev => ({ ...prev, description: e.target.value }))}
                className="w-full h-24 p-3 border border-gray-300 rounded-md resize-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 placeholder-gray-500"
                placeholder="Write treatment description..."
              />
              

            </div>
            <button
              onClick={addTreatment}
              className="w-12 h-12 bg-green-500 hover:bg-green-600 text-white rounded-lg flex items-center justify-center transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Cost Section */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Cost</h3>
        <input
          type="text"
          className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 placeholder-gray-500"
          placeholder="Enter cost (e.g., 1,00,000 US Dollar)"
        />
      </div>
    </div>
  )
} 