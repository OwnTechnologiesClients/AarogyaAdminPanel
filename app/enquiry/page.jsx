'use client';

import { useState, useMemo } from 'react';
import { Layout } from '@/components/layout';
import { Badge } from '@/components/ui/badge';
import { Pagination } from '@/components/ui/pagination';
import { usePagination } from '@/lib/hooks/usePagination';
import { Search, Filter } from 'lucide-react';

export default function EnquiryPage() {
  const [searchTerm, setSearchTerm] = useState('');

  // Mock data with more variety for pagination testing
  const mockEnquiries = [
    {
      id: '#0047',
      name: 'Taylor Melon',
      phoneNumber: '+91-9876543456',
      email: 'taylor.melon@gmail.com',
      subject: 'General Inquiry',
      pageRef: 'Contact Us',
      message: 'Downtown Medical Center - Looking for appointment information',
      status: 'pending'
    },
    {
      id: '#0048',
      name: 'Sarah Johnson',
      phoneNumber: '+91-9876543457',
      email: 'sarah.johnson@gmail.com',
      subject: 'Treatment Information',
      pageRef: 'Treatment',
      message: 'Need details about orthopedic treatments available',
      status: 'in-progress'
    },
    {
      id: '#0049',
      name: 'Michael Chen',
      phoneNumber: '+91-9876543458',
      email: 'michael.chen@gmail.com',
      subject: 'Hospital Services',
      pageRef: 'Hospital',
      message: 'Inquiry about emergency room services and wait times',
      status: 'resolved'
    },
    {
      id: '#0050',
      name: 'Emily Davis',
      phoneNumber: '+91-9876543459',
      email: 'emily.davis@gmail.com',
      subject: 'Appointment Booking',
      pageRef: 'Contact Us',
      message: 'Want to schedule a consultation with Dr. Smith',
      status: 'pending'
    },
    {
      id: '#0051',
      name: 'David Wilson',
      phoneNumber: '+91-9876543460',
      email: 'david.wilson@gmail.com',
      subject: 'Insurance Coverage',
      pageRef: 'Hospital',
      message: 'Checking if my insurance covers the procedures',
      status: 'pending'
    },
    {
      id: '#0052',
      name: 'Lisa Brown',
      phoneNumber: '+91-9876543461',
      email: 'lisa.brown@gmail.com',
      subject: 'Medical Records',
      pageRef: 'Treatment',
      message: 'Need to request my medical records from last visit',
      status: 'in-progress'
    },
    {
      id: '#0053',
      name: 'Robert Taylor',
      phoneNumber: '+91-9876543462',
      email: 'robert.taylor@gmail.com',
      subject: 'Billing Question',
      pageRef: 'Hospital',
      message: 'Have a question about my recent hospital bill',
      status: 'resolved'
    },
    {
      id: '#0054',
      name: 'Jennifer Lee',
      phoneNumber: '+91-9876543463',
      email: 'jennifer.lee@gmail.com',
      subject: 'Specialist Referral',
      pageRef: 'Treatment',
      message: 'Looking for a referral to a cardiologist',
      status: 'pending'
    },
    {
      id: '#0055',
      name: 'Christopher Martinez',
      phoneNumber: '+91-9876543464',
      email: 'chris.martinez@gmail.com',
      subject: 'Lab Results',
      pageRef: 'Hospital',
      message: 'When will my blood test results be available?',
      status: 'in-progress'
    },
    {
      id: '#0056',
      name: 'Amanda Garcia',
      phoneNumber: '+91-9876543465',
      email: 'amanda.garcia@gmail.com',
      subject: 'Prescription Refill',
      pageRef: 'Treatment',
      message: 'Need to refill my prescription for blood pressure medication',
      status: 'pending'
    },
    {
      id: '#0057',
      name: 'James Rodriguez',
      phoneNumber: '+91-9876543466',
      email: 'james.rodriguez@gmail.com',
      subject: 'Emergency Care',
      pageRef: 'Hospital',
      message: 'What are the emergency department hours?',
      status: 'resolved'
    },
    {
      id: '#0058',
      name: 'Michelle White',
      phoneNumber: '+91-9876543467',
      email: 'michelle.white@gmail.com',
      subject: 'Physical Therapy',
      pageRef: 'Treatment',
      message: 'Interested in physical therapy sessions for back pain',
      status: 'pending'
    },
    {
      id: '#0059',
      name: 'Daniel Thompson',
      phoneNumber: '+91-9876543468',
      email: 'daniel.thompson@gmail.com',
      subject: 'Insurance Verification',
      pageRef: 'Hospital',
      message: 'Need to verify my insurance before scheduling surgery',
      status: 'in-progress'
    },
    {
      id: '#0060',
      name: 'Jessica Anderson',
      phoneNumber: '+91-9876543469',
      email: 'jessica.anderson@gmail.com',
      subject: 'Appointment Rescheduling',
      pageRef: 'Contact Us',
      message: 'Need to reschedule my appointment from next week',
      status: 'pending'
    },
    {
      id: '#0061',
      name: 'Kevin Moore',
      phoneNumber: '+91-9876543470',
      email: 'kevin.moore@gmail.com',
      subject: 'Medical Equipment',
      pageRef: 'Treatment',
      message: 'Looking for information about renting medical equipment',
      status: 'resolved'
    },
    {
      id: '#0062',
      name: 'Nicole Jackson',
      phoneNumber: '+91-9876543471',
      email: 'nicole.jackson@gmail.com',
      subject: 'Nutrition Consultation',
      pageRef: 'Treatment',
      message: 'Interested in meeting with a nutritionist',
      status: 'pending'
    }
  ];

  // Filter enquiries based on search term
  const filteredEnquiries = useMemo(() => {
    if (!searchTerm.trim()) return mockEnquiries;
    
    const searchLower = searchTerm.toLowerCase();
    return mockEnquiries.filter(enquiry =>
      enquiry.name.toLowerCase().includes(searchLower) ||
      enquiry.email.toLowerCase().includes(searchLower) ||
      enquiry.phoneNumber.includes(searchTerm) ||
      enquiry.subject.toLowerCase().includes(searchLower) ||
      enquiry.pageRef.toLowerCase().includes(searchLower) ||
      enquiry.message.toLowerCase().includes(searchLower) ||
      enquiry.status.toLowerCase().includes(searchLower) ||
      enquiry.id.toLowerCase().includes(searchLower)
    );
  }, [searchTerm]);

  // Use pagination hook
  const {
    currentPage,
    totalPages,
    totalItems,
    itemsPerPage,
    currentItems: currentEnquiries,
    handlePageChange,
    handleItemsPerPageChange,
    resetPagination
  } = usePagination(filteredEnquiries, 8);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    resetPagination(); // Reset to first page when searching
  };



  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Enquiry Management</h1>
            <p className="text-gray-700 text-lg">Manage and track customer enquiries</p>
          </div>
        </div>

        <div className="bg-gradient-to-br from-white to-blue-50 rounded-xl shadow-lg border border-blue-100">
          {/* Search and Controls */}
          <div className="p-6 border-b border-blue-200 bg-gradient-to-r from-blue-50 to-indigo-50">
            <div className="flex justify-between items-center">
              <div className="flex items-center space-x-4">
                                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-600 w-4 h-4" />
                  <input
                    type="text"
                    placeholder="Search enquiries, names, emails, subjects..."
                    value={searchTerm}
                    onChange={handleSearch}
                    className="pl-10 pr-4 py-3 border-2 border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 w-80 text-gray-900 placeholder-gray-500 shadow-md bg-white"
                  />
                </div>
                <button className="flex items-center space-x-2 px-4 py-3 border-2 border-blue-200 rounded-lg hover:bg-blue-50 hover:border-blue-400 transition-colors shadow-md bg-white">
                  <Filter className="w-4 h-4 text-blue-600" />
                  <span className="text-sm font-medium text-gray-900">Filter</span>
                </button>
              </div>
         
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead className="bg-gradient-to-r from-blue-600 to-indigo-600">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-bold text-white uppercase tracking-wider">
                    ID
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-white uppercase tracking-wider">
                    Customer Name
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-white uppercase tracking-wider">
                    Contact Info
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-white uppercase tracking-wider">
                    Subject
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-white uppercase tracking-wider">
                    Page Reference
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-white uppercase tracking-wider">
                    Message
                  </th>

                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-blue-100">
                {currentEnquiries.map((enquiry, index) => (
                  <tr key={index} className="hover:bg-blue-50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-blue-700">
                      {enquiry.id}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="w-10 h-10 rounded-full overflow-hidden ring-2 ring-blue-200 bg-blue-100 flex items-center justify-center">
                          <span className="text-sm font-semibold text-blue-600">
                            {enquiry.name.split(' ').map(n => n[0]).join('')}
                          </span>
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-bold text-gray-900">{enquiry.name}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        <div className="font-semibold">{enquiry.phoneNumber}</div>
                        <div className="text-gray-600">{enquiry.email}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-700">
                      {enquiry.subject || '-'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200 font-medium">
                        {enquiry.pageRef}
                      </Badge>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 max-w-xs truncate">
                      {enquiry.message}
                    </td>

                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {filteredEnquiries.length === 0 && (
            <div className="text-center py-8">
              <p className="text-gray-500">No enquiries found matching your search criteria.</p>
            </div>
          )}

          {/* Pagination */}
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
            totalItems={filteredEnquiries.length}
            itemsPerPage={itemsPerPage}
            onItemsPerPageChange={handleItemsPerPageChange}
          />
        </div>
      </div>
    </Layout>
  );
} 