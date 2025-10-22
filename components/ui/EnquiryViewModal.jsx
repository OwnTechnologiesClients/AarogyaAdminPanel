'use client';

import { useState } from 'react';
import { X, User, Mail, Phone, Calendar, FileText, Tag, Globe, Building2, Stethoscope, MapPin, Users } from 'lucide-react';

// Add CSS animations
const modalStyles = `
  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }
  
  @keyframes modalSlideIn {
    from { 
      opacity: 0;
      transform: translateY(-20px) scale(0.95);
    }
    to { 
      opacity: 1;
      transform: translateY(0) scale(1);
    }
  }
`;

// Inject styles
if (typeof document !== 'undefined') {
  const styleSheet = document.createElement('style');
  styleSheet.textContent = modalStyles;
  document.head.appendChild(styleSheet);
}

const EnquiryViewModal = ({ enquiry, isOpen, onClose }) => {
  if (!isOpen || !enquiry) return null;

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return date.toLocaleString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });
  };

  const formatEnquiryId = (enquiry) => {
    // Always generate EQ_001 format, ignore any existing enquiryId
    const index = enquiry._id ? parseInt(enquiry._id.slice(-4), 16) : 1;
    return `EQ_${String(index).padStart(3, '0')}`;
  };

  // Helper function to determine form type
  const getFormType = (enquiry) => {
    if (enquiry.pageRef === 'Partnership' || enquiry.organizationName || enquiry.organizationType) {
      return 'partnership';
    }
    if (enquiry.specialty || enquiry.hospital) {
      return 'consultation';
    }
    if (enquiry.pageRef?.includes('Hospital -') || enquiry.pageRef?.includes('Hospital Search')) {
      return 'hospital';
    }
    if (enquiry.pageRef?.includes('Specialty -') || enquiry.pageRef?.includes('Doctors Page')) {
      return 'callback';
    }
    return 'contact';
  };

  const formType = getFormType(enquiry);

  return (
    <div 
      className="fixed inset-0 backdrop-blur-md bg-opacity-30 flex items-center justify-center z-50 p-4"
      style={{
        animation: 'fadeIn 0.3s ease-out'
      }}
    >
      <div 
        className="bg-white rounded-xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden"
        style={{
          animation: 'modalSlideIn 0.4s ease-out'
        }}
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-6 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-full bg-white bg-opacity-20 flex items-center justify-center">
              <FileText className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white">Enquiry Details</h2>
              <p className="text-blue-100 text-sm">ID: {formatEnquiryId(enquiry)}</p>
            </div>
          </div>
        </div>

        {/* Content */}
        <div 
          className="p-6 overflow-y-auto max-h-[calc(90vh-140px)]"
          style={{
            animation: 'fadeIn 0.5s ease-out 0.2s both'
          }}
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Left Column - Customer Info */}
            <div className="space-y-6">
              {/* Customer Information */}
              <div className="bg-gray-50 rounded-lg p-4 transition-all duration-200 hover:shadow-md hover:bg-gray-100">
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                  <User className="w-5 h-5 mr-2 text-blue-600" />
                  {formType === 'partnership' ? 'Contact Information' : 'Customer Information'}
                </h3>
                <div className="space-y-3">
                  {formType === 'partnership' && enquiry.organizationName && (
                    <div>
                      <label className="text-sm font-medium text-gray-600">Organization Name</label>
                      <p className="text-gray-900 font-medium">{enquiry.organizationName}</p>
                    </div>
                  )}
                  {formType === 'partnership' && enquiry.contactPerson && (
                    <div>
                      <label className="text-sm font-medium text-gray-600">Contact Person</label>
                      <p className="text-gray-900 font-medium">{enquiry.contactPerson}</p>
                    </div>
                  )}
                  {formType !== 'partnership' && (
                    <div>
                      <label className="text-sm font-medium text-gray-600">Name</label>
                      <p className="text-gray-900 font-medium">{enquiry.name || 'N/A'}</p>
                    </div>
                  )}
                  <div>
                    <label className="text-sm font-medium text-gray-600">Email</label>
                    <p className="text-gray-900 flex items-center">
                      <Mail className="w-4 h-4 mr-2 text-gray-500" />
                      {enquiry.email || 'N/A'}
                    </p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-600">Phone</label>
                    <p className="text-gray-900 flex items-center">
                      <Phone className="w-4 h-4 mr-2 text-gray-500" />
                      {enquiry.formattedPhone || enquiry.phone || 'N/A'}
                    </p>
                  </div>
                </div>
              </div>

              {/* Organization Details - Partnership Forms */}
              {formType === 'partnership' && (enquiry.organizationType || enquiry.services || enquiry.location) && (
                <div className="bg-gray-50 rounded-lg p-4 transition-all duration-200 hover:shadow-md hover:bg-gray-100">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                    <Building2 className="w-5 h-5 mr-2 text-blue-600" />
                    Organization Details
                  </h3>
                  <div className="space-y-3">
                    {enquiry.organizationType && (
                      <div>
                        <label className="text-sm font-medium text-gray-600">Organization Type</label>
                        <p className="text-gray-900">{enquiry.organizationType}</p>
                      </div>
                    )}
                    {enquiry.location && (
                      <div>
                        <label className="text-sm font-medium text-gray-600">Location</label>
                        <p className="text-gray-900 flex items-center">
                          <MapPin className="w-4 h-4 mr-2 text-gray-500" />
                          {enquiry.location}
                        </p>
                      </div>
                    )}
                    {enquiry.services && enquiry.services.length > 0 && (
                      <div>
                        <label className="text-sm font-medium text-gray-600">Services Offered</label>
                        <div className="flex flex-wrap gap-2 mt-1">
                          {enquiry.services.map((service, index) => (
                            <span
                              key={index}
                              className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full"
                            >
                              {service}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Medical Details - Consultation Forms */}
              {formType === 'consultation' && (enquiry.specialty || enquiry.hospital) && (
                <div className="bg-gray-50 rounded-lg p-4 transition-all duration-200 hover:shadow-md hover:bg-gray-100">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                    <Stethoscope className="w-5 h-5 mr-2 text-blue-600" />
                    Medical Details
                  </h3>
                  <div className="space-y-3">
                    {enquiry.specialty && (
                      <div>
                        <label className="text-sm font-medium text-gray-600">Medical Specialty</label>
                        <p className="text-gray-900">{enquiry.specialty}</p>
                      </div>
                    )}
                    {enquiry.hospital && (
                      <div>
                        <label className="text-sm font-medium text-gray-600">Preferred Hospital</label>
                        <p className="text-gray-900 flex items-center">
                          <Building2 className="w-4 h-4 mr-2 text-gray-500" />
                          {enquiry.hospital}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Enquiry Details */}
              <div className="bg-gray-50 rounded-lg p-4 transition-all duration-200 hover:shadow-md hover:bg-gray-100">
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                  <Tag className="w-5 h-5 mr-2 text-blue-600" />
                  Enquiry Details
                </h3>
                <div className="space-y-3">
                  <div>
                    <label className="text-sm font-medium text-gray-600">Subject</label>
                    <p className="text-gray-900 font-medium">{enquiry.subject || 'N/A'}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-600">Page Reference</label>
                    <p className="text-gray-900 flex items-center">
                      <Globe className="w-4 h-4 mr-2 text-gray-500" />
                      {enquiry.pageRef || 'N/A'}
                    </p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-600">Form Source</label>
                    <p className="text-gray-900">{enquiry.formSource || 'N/A'}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column - Message & Timestamps */}
            <div className="space-y-6">
              {/* Message */}
              <div className="bg-gray-50 rounded-lg p-4 transition-all duration-200 hover:shadow-md hover:bg-gray-100">
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                  <FileText className="w-5 h-5 mr-2 text-blue-600" />
                  Message
                </h3>
                <div className="bg-white rounded-lg p-4 border border-gray-200">
                  <p className="text-gray-900 whitespace-pre-wrap leading-relaxed">
                    {enquiry.message || 'No message provided'}
                  </p>
                </div>
              </div>


            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="bg-gray-50 px-6 p-2 border-t border-gray-200 flex justify-end">
          <button
            onClick={onClose}
            className="px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all duration-200 font-semibold hover:scale-105 active:scale-95 shadow-lg hover:shadow-xl text-base"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default EnquiryViewModal;
