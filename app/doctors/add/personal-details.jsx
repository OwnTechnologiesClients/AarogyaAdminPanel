import React, { useState } from 'react';
import api from '@/lib/api'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const PersonalDetails = () => {
  // State for multi-input fields
  const [specializations, setSpecializations] = useState([]);
  const [specializationInput, setSpecializationInput] = useState('');
  const [education, setEducation] = useState([]);
  const [educationInput, setEducationInput] = useState('');
  const [experience, setExperience] = useState([]);
  const [experienceInput, setExperienceInput] = useState('');
  const [languages, setLanguages] = useState([]);
  const [languageInput, setLanguageInput] = useState('');
  const [treatments, setTreatments] = useState([]);
  const [treatmentInput, setTreatmentInput] = useState('');
  const [awards, setAwards] = useState([]);
  const [awardInput, setAwardInput] = useState('');
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [submitLoading, setSubmitLoading] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [submitSuccess, setSubmitSuccess] = useState("");

  // Add state for required and relevant fields
  const [doctorId, setDoctorId] = useState('');
  const [doctorName, setDoctorName] = useState('');
  const [specialty, setSpecialty] = useState('');
  const [location, setLocation] = useState('');
  const [experienceText, setExperienceText] = useState('');
  const [rating, setRating] = useState('');
  const [surgeries, setSurgeries] = useState('');
  const [introduction, setIntroduction] = useState('');
  const [professionalExperience, setProfessionalExperience] = useState([]);

  // Helper for adding/removing tags
  const handleAdd = (input, setInput, list, setList) => {
    if (input.trim() && !list.includes(input.trim())) {
      setList([...list, input.trim()]);
      setInput('');
    }
  };
  const handleRemove = (item, list, setList) => {
    setList(list.filter(i => i !== item));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleRemoveImage = () => {
    setImage(null);
    setImagePreview(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitLoading(true);
    setSubmitError("");
    setSubmitSuccess("");
    try {
      // Build FormData for file upload and arrays
      const formData = new FormData();
      formData.append('doctorId', doctorId);
      formData.append('name', doctorName);
      formData.append('specialty', specialty);
      formData.append('location', location);
      formData.append('experience', experienceText);
      formData.append('rating', rating);
      formData.append('surgeries', surgeries);
      formData.append('introduction', introduction);
      formData.append('specializations', JSON.stringify(specializations));
      formData.append('education', JSON.stringify(education));
      formData.append('professionalExperience', JSON.stringify(professionalExperience));
      formData.append('languages', JSON.stringify(languages));
      formData.append('treatments', JSON.stringify(treatments));
      formData.append('awards', JSON.stringify(awards));
      if (image) {
        formData.append('image', image);
      }
      await api.post('/doctors', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      toast.success('Doctor profile created successfully!');
      // Optionally reset form or redirect
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to create doctor profile');
    } finally {
      setSubmitLoading(false);
    }
  };

  return (
    <div className="space-y-8">
      <form className="space-y-8" onSubmit={handleSubmit}>
        {/* Basic Information */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="space-y-3">
            <label className="block text-sm font-semibold text-gray-900">Doctor ID</label>
            <input 
              type="text" 
              value={doctorId}
              onChange={e => setDoctorId(e.target.value)}
              placeholder="Enter Doctor ID" 
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 placeholder-gray-500"
            />
          </div>
          <div className="space-y-3">
            <label className="block text-sm font-semibold text-gray-900">Doctor Name</label>
            <input 
              type="text" 
              value={doctorName}
              onChange={e => setDoctorName(e.target.value)}
              placeholder="Enter Doctor Name" 
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 placeholder-gray-500"
            />
          </div>
          <div className="space-y-3">
            <label className="block text-sm font-semibold text-gray-900">Specialty</label>
            <input 
              type="text" 
              value={specialty}
              onChange={e => setSpecialty(e.target.value)}
              placeholder="Enter Specialty" 
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 placeholder-gray-500"
            />
          </div>
          <div className="space-y-3">
            <label className="block text-sm font-semibold text-gray-900">Location</label>
            <input 
              type="text" 
              value={location}
              onChange={e => setLocation(e.target.value)}
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
              onChange={handleImageChange}
            />
            {imagePreview && (
              <div className="relative mt-2 w-32 h-32">
                <img
                  src={imagePreview}
                  alt="Preview"
                  className="w-full h-full object-cover rounded-lg border"
                />
                <button
                  type="button"
                  onClick={handleRemoveImage}
                  className="absolute top-0 right-0 bg-white bg-opacity-80 rounded-full p-1 text-red-600 hover:bg-opacity-100 shadow"
                  style={{ transform: 'translate(50%,-50%)' }}
                  aria-label="Remove image"
                >
                  &times;
                </button>
              </div>
            )}
          </div>
          <div className="space-y-3">
            <label className="block text-sm font-semibold text-gray-900">Experience</label>
            <input 
              type="text" 
              value={experienceText}
              onChange={e => setExperienceText(e.target.value)}
              placeholder="e.g., 30+ years" 
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 placeholder-gray-500"
            />
          </div>
          <div className="space-y-3">
            <label className="block text-sm font-semibold text-gray-900">Rating</label>
            <input 
              type="number" 
              value={rating}
              onChange={e => setRating(e.target.value)}
              step="0.1"
              min="0"
              max="10"
              placeholder="e.g., 9.9" 
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 placeholder-gray-500"
            />
          </div>
          <div className="space-y-3">
            <label className="block text-sm font-semibold text-gray-900">Surgeries</label>
            <input 
              type="text" 
              value={surgeries}
              onChange={e => setSurgeries(e.target.value)}
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
              value={introduction}
              onChange={e => setIntroduction(e.target.value)}
              placeholder="Enter doctor's introduction and expertise description" 
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 placeholder-gray-500"
            />
          </div>
          <div className="space-y-3">
            <label className="block text-sm font-semibold text-gray-900">Specializations</label>
            <div className="flex gap-2">
              <input
                type="text"
                value={specializationInput}
                onChange={e => setSpecializationInput(e.target.value)}
                onKeyDown={e => { if (e.key === 'Enter') { e.preventDefault(); handleAdd(specializationInput, setSpecializationInput, specializations, setSpecializations); }}}
                placeholder="Add specialization and press Enter"
                className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 placeholder-gray-500"
              />
              <button type="button" onClick={() => handleAdd(specializationInput, setSpecializationInput, specializations, setSpecializations)} className="px-3 py-2 bg-blue-500 text-white rounded">Add</button>
            </div>
            <div className="flex flex-wrap gap-2 mt-2">
              {specializations.map((item, idx) => (
                <span key={idx} className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full flex items-center gap-1">
                  {item}
                  <button type="button" onClick={() => handleRemove(item, specializations, setSpecializations)} className="ml-1 text-blue-500 hover:text-red-500">&times;</button>
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Education and Professional Experience */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-3">
            <label className="block text-sm font-semibold text-gray-900">Education</label>
            <div className="flex gap-2">
              <input
                type="text"
                value={educationInput}
                onChange={e => setEducationInput(e.target.value)}
                onKeyDown={e => { if (e.key === 'Enter') { e.preventDefault(); handleAdd(educationInput, setEducationInput, education, setEducation); }}}
                placeholder="Add education and press Enter"
                className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 placeholder-gray-500"
              />
              <button type="button" onClick={() => handleAdd(educationInput, setEducationInput, education, setEducation)} className="px-3 py-2 bg-blue-500 text-white rounded">Add</button>
            </div>
            <div className="flex flex-wrap gap-2 mt-2">
              {education.map((item, idx) => (
                <span key={idx} className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full flex items-center gap-1">
                  {item}
                  <button type="button" onClick={() => handleRemove(item, education, setEducation)} className="ml-1 text-blue-500 hover:text-red-500">&times;</button>
                </span>
              ))}
            </div>
          </div>
          <div className="space-y-3">
            <label className="block text-sm font-semibold text-gray-900">Professional Experience</label>
            <div className="flex gap-2">
              <input
                type="text"
                value={experienceInput}
                onChange={e => setExperienceInput(e.target.value)}
                onKeyDown={e => { if (e.key === 'Enter') { e.preventDefault(); handleAdd(experienceInput, setExperienceInput, professionalExperience, setProfessionalExperience); }}}
                placeholder="Add experience and press Enter"
                className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 placeholder-gray-500"
              />
              <button type="button" onClick={() => handleAdd(experienceInput, setExperienceInput, professionalExperience, setProfessionalExperience)} className="px-3 py-2 bg-blue-500 text-white rounded">Add</button>
            </div>
            <div className="flex flex-wrap gap-2 mt-2">
              {professionalExperience.map((item, idx) => (
                <span key={idx} className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full flex items-center gap-1">
                  {item}
                  <button type="button" onClick={() => handleRemove(item, professionalExperience, setProfessionalExperience)} className="ml-1 text-blue-500 hover:text-red-500">&times;</button>
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Languages and Treatments */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-3">
            <label className="block text-sm font-semibold text-gray-900">Languages</label>
            <div className="flex gap-2">
              <input
                type="text"
                value={languageInput}
                onChange={e => setLanguageInput(e.target.value)}
                onKeyDown={e => { if (e.key === 'Enter') { e.preventDefault(); handleAdd(languageInput, setLanguageInput, languages, setLanguages); }}}
                placeholder="Add language and press Enter"
                className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 placeholder-gray-500"
              />
              <button type="button" onClick={() => handleAdd(languageInput, setLanguageInput, languages, setLanguages)} className="px-3 py-2 bg-blue-500 text-white rounded">Add</button>
            </div>
            <div className="flex flex-wrap gap-2 mt-2">
              {languages.map((item, idx) => (
                <span key={idx} className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full flex items-center gap-1">
                  {item}
                  <button type="button" onClick={() => handleRemove(item, languages, setLanguages)} className="ml-1 text-blue-500 hover:text-red-500">&times;</button>
                </span>
              ))}
            </div>
          </div>
          <div className="space-y-3">
            <label className="block text-sm font-semibold text-gray-900">Treatments & Procedures</label>
            <div className="flex gap-2">
              <input
                type="text"
                value={treatmentInput}
                onChange={e => setTreatmentInput(e.target.value)}
                onKeyDown={e => { if (e.key === 'Enter') { e.preventDefault(); handleAdd(treatmentInput, setTreatmentInput, treatments, setTreatments); }}}
                placeholder="Add treatment/procedure and press Enter"
                className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 placeholder-gray-500"
              />
              <button type="button" onClick={() => handleAdd(treatmentInput, setTreatmentInput, treatments, setTreatments)} className="px-3 py-2 bg-blue-500 text-white rounded">Add</button>
            </div>
            <div className="flex flex-wrap gap-2 mt-2">
              {treatments.map((item, idx) => (
                <span key={idx} className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full flex items-center gap-1">
                  {item}
                  <button type="button" onClick={() => handleRemove(item, treatments, setTreatments)} className="ml-1 text-blue-500 hover:text-red-500">&times;</button>
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Awards and About */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-3">
            <label className="block text-sm font-semibold text-gray-900">Awards</label>
            <div className="flex gap-2">
              <input
                type="text"
                value={awardInput}
                onChange={e => setAwardInput(e.target.value)}
                onKeyDown={e => { if (e.key === 'Enter') { e.preventDefault(); handleAdd(awardInput, setAwardInput, awards, setAwards); }}}
                placeholder="Add award and press Enter"
                className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 placeholder-gray-500"
              />
              <button type="button" onClick={() => handleAdd(awardInput, setAwardInput, awards, setAwards)} className="px-3 py-2 bg-blue-500 text-white rounded">Add</button>
            </div>
            <div className="flex flex-wrap gap-2 mt-2">
              {awards.map((item, idx) => (
                <span key={idx} className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full flex items-center gap-1">
                  {item}
                  <button type="button" onClick={() => handleRemove(item, awards, setAwards)} className="ml-1 text-blue-500 hover:text-red-500">&times;</button>
                </span>
              ))}
            </div>
          </div>
        </div>

    

        {/* Action Buttons */}
        <div className="flex justify-end space-x-4 pt-8 border-t border-gray-200">
          <button 
            type="button" 
            className="cursor-pointer px-8 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent font-medium transition-colors duration-200"
          >
            Cancel
          </button>
          <button 
            type="submit" 
            className="cursor-pointer px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent font-medium transition-colors duration-200"
            disabled={submitLoading}
          >
            {submitLoading ? 'Creating...' : 'Create Doctor Profile'}
          </button>
        </div>
        {submitError && (
          <div className="text-red-500 text-center mt-4">{submitError}</div>
        )}
        {submitSuccess && (
          <div className="text-green-500 text-center mt-4">{submitSuccess}</div>
        )}
      </form>
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />
    </div>
  );
};

export default PersonalDetails;