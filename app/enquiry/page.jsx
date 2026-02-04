'use client';

import { useState, useEffect } from 'react';
import { Layout } from '@/components/layout';
import { Badge } from '@/components/ui/badge';
import { Pagination } from '@/components/ui/pagination';
import { Search, Filter, Eye } from 'lucide-react';
import enquiryApi from '@/lib/api/enquiryApi';
import EnquiryViewModal from '@/components/ui/EnquiryViewModal';
import { API_BASE_URL, BACKEND_URL } from '@/lib/config';
import { getApiErrorMessage } from '@/lib/utils';

export default function EnquiryPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [enquiries, setEnquiries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [pageRefFilter, setPageRefFilter] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [selectedEnquiry, setSelectedEnquiry] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Server-side pagination handlers
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleItemsPerPageChange = (newItemsPerPage, total = null, totalPages = null) => {
    setItemsPerPage(newItemsPerPage);
    setCurrentPage(1);
    if (total !== null) setTotalItems(total);
    if (totalPages !== null) setTotalPages(totalPages);
  };

  const resetPagination = () => {
    setCurrentPage(1);
  };

  // Modal handlers
  const handleViewEnquiry = (enquiry) => {
    setSelectedEnquiry(enquiry);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedEnquiry(null);
  };

  // Format enquiry ID to EQ_001 style
  const formatEnquiryId = (enquiry, index) => {
    if (enquiry.enquiryId) return enquiry.enquiryId;
    
    // Generate EQ_001 format based on index or _id
    const baseIndex = enquiry._id ? parseInt(enquiry._id.slice(-4), 16) : index + 1;
    return `EQ_${String(baseIndex).padStart(3, '0')}`;
  };

  // Fetch enquiries from API
  useEffect(() => {
        const fetchEnquiries = async () => {
          setLoading(true);
          setError(null);
          try {
            const params = {
              page: currentPage,
              limit: itemsPerPage,
              ...(searchTerm && { search: searchTerm }),
              ...(pageRefFilter && { pageRef: pageRefFilter })
            };
            
            const response = await enquiryApi.list(params);
            
            if (response.success) {
              setEnquiries(response.data || []);
              setTotalItems(response.pagination?.total || 0);
              setTotalPages(response.pagination?.totalPages || 1);
            } else {
              setError('Failed to fetch enquiries from the server.');
            }
          } catch (err) {
            console.error('Error fetching enquiries:', err);
            setError(getApiErrorMessage(err, 'Failed to fetch enquiries. Please try again.'));
          } finally {
            setLoading(false);
          }
        };

    fetchEnquiries();
  }, [currentPage, itemsPerPage, searchTerm, pageRefFilter]);


  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    resetPagination(); // Reset to first page when searching
  };

  if (loading) {
    return (
      <Layout>
        <div className="flex items-center justify-center h-64">
          <div className="text-lg text-gray-600">Loading enquiries...</div>
        </div>
      </Layout>
    );
  }

  if (error) {
    return (
      <Layout>
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Enquiry Management</h1>
              <p className="text-gray-700 text-lg">Manage and track customer enquiries</p>
            </div>
          </div>
          
          <div className="bg-red-50 border border-red-200 rounded-lg p-6">
            <div className="flex items-center">
              <div className="text-red-600 text-lg font-semibold mb-2">
                Connection Error
              </div>
            </div>
            <div className="text-red-700 mb-4">
              {error}
            </div>
            <div className="text-sm text-gray-600 mb-4">
              <p><strong>Possible causes:</strong></p>
              <ul className="list-disc list-inside mt-2 space-y-1">
                <li>Backend server is not running</li>
                <li>Backend is running on a different port</li>
                <li>Database connection issues</li>
                <li>API endpoint not found</li>
              </ul>
            </div>
            <div className="text-sm text-gray-600">
              <p><strong>To fix this:</strong></p>
              <ol className="list-decimal list-inside mt-2 space-y-1">
                <li>Make sure the backend is running: <code className="bg-gray-100 px-2 py-1 rounded">cd AarogyaBackend && npm start</code></li>
                <li>Check if backend is accessible at: <code className="bg-gray-100 px-2 py-1 rounded">{BACKEND_URL}</code></li>
                <li>Verify the API endpoint: <code className="bg-gray-100 px-2 py-1 rounded">{`${API_BASE_URL}/enquiries`}</code></li>
              </ol>
            </div>
            <button 
              onClick={() => window.location.reload()} 
              className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              Retry Connection
            </button>
          </div>
        </div>
      </Layout>
    );
  }

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
                    placeholder="Search enquiries by name, email, phone, subject, or message..."
                    value={searchTerm}
                    onChange={handleSearch}
                    className="pl-10 pr-4 py-3 border-2 border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 w-80 text-gray-900 placeholder-gray-500 shadow-md bg-white"
                  />
                </div>
                <select
                  value={pageRefFilter}
                  onChange={(e) => setPageRefFilter(e.target.value)}
                  className="px-4 py-3 border-2 border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 shadow-md bg-white"
                >
                  <option value="">All Pages</option>
                  <option value="Contact Us">Contact Us</option>
                  <option value="Treatment">Treatment</option>
                  <option value="Hospital">Hospital</option>
                  <option value="Partnership">Partnership</option>
                  <option value="Home Page">Home Page</option>
                  <option value="Doctors Page">Doctors Page</option>
                </select>
                <button className="flex items-center space-x-2 px-4 py-3 border-2 border-blue-200 rounded-lg hover:bg-blue-50 hover:border-blue-400 transition-colors shadow-md bg-white">
                  <Filter className="w-4 h-4 text-blue-600" />
                  <span className="text-sm font-medium text-gray-900">Filter</span>
                </button>
              </div>
              {searchTerm && (
                <div className="text-sm text-gray-800 font-semibold bg-blue-100 px-4 py-2 rounded-lg">
                  Found <span className="text-blue-700 font-bold">{totalItems}</span> enquiry{totalItems !== 1 ? 'ies' : 'y'}
                  <span className="text-gray-700 ml-2">for "{searchTerm}"</span>
                </div>
              )}
            </div>
          </div>
          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gradient-to-r from-blue-600 to-indigo-600">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-bold text-white uppercase tracking-wider">
                    ID
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-bold text-white uppercase tracking-wider">
                    Customer Name
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-bold text-white uppercase tracking-wider">
                    Contact Info
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-bold text-white uppercase tracking-wider">
                    Subject
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-bold text-white uppercase tracking-wider">
                    Page Reference
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-bold text-white uppercase tracking-wider">
                    Message
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-bold text-white uppercase tracking-wider">
                    Date
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-bold text-white uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white">
                {enquiries.map((enquiry, index) => (
                  <tr key={enquiry._id || index} className="hover:bg-blue-50 transition-colors border-b border-gray-200">
                    <td className="px-4 py-4 whitespace-nowrap text-sm font-bold text-blue-700">
                      {formatEnquiryId(enquiry, index)}
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="w-10 h-10 rounded-full overflow-hidden ring-2 ring-blue-200 bg-blue-100 flex items-center justify-center">
                          <span className="text-sm font-semibold text-blue-600">
                            {(() => {
                              // For partnership forms, use organization name for initials
                              if (enquiry.pageRef === 'Partnership' && enquiry.organizationName) {
                                return enquiry.organizationName.split(' ').map(n => n[0]).join('').substring(0, 4);
                              }
                              // For callback forms, use "CR" prefix
                              if (enquiry.name?.includes('Callback Request')) {
                                return 'CR' + (enquiry.email?.substring(0, 2) || '');
                              }
                              // Default to name initials
                              return enquiry.name?.split(' ').map(n => n[0]).join('') || 'N/A';
                            })()}
                          </span>
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-bold text-gray-900">
                            {(() => {
                              // For partnership forms, show organization name
                              if (enquiry.pageRef === 'Partnership' && enquiry.organizationName) {
                                return enquiry.organizationName;
                              }
                              // For callback forms, show the full callback request text
                              if (enquiry.name?.includes('Callback Request')) {
                                return enquiry.name;
                              }
                              // Default to name
                              return enquiry.name || 'N/A';
                            })()}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        <div className="font-semibold">{enquiry.formattedPhone || enquiry.phone || 'N/A'}</div>
                        <div className="text-gray-600">{enquiry.email || 'N/A'}</div>
                      </div>
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap text-sm font-medium text-gray-700">
                      {enquiry.subject || '-'}
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap">
                      <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200 font-medium">
                        {enquiry.pageRef || 'N/A'}
                      </Badge>
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-700 max-w-xs truncate">
                      {enquiry.message || '-'}
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
                      {enquiry.createdAt ? new Date(enquiry.createdAt).toLocaleDateString() : 'N/A'}
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
                      <button
                        onClick={() => handleViewEnquiry(enquiry)}
                        className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-blue-700 bg-blue-100 hover:bg-blue-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
                        title="View enquiry details"
                      >
                        <Eye className="w-4 h-4 mr-1" />
                        View
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {enquiries.length === 0 && !loading && (
            <div className="text-center py-12 bg-gray-50">
              <div className="text-gray-500 text-lg">
                No enquiries found matching your search criteria.
              </div>
            </div>
          )}

          {/* Pagination */}
          {enquiries.length > 0 && (
            <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
                totalItems={totalItems}
            itemsPerPage={itemsPerPage}
            onItemsPerPageChange={handleItemsPerPageChange}
          />
            </div>
          )}
        </div>
      </div>

      {/* Enquiry View Modal */}
      <EnquiryViewModal
        enquiry={selectedEnquiry}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </Layout>
  );
} 