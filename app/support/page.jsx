"use client";
import React, { useState, useEffect } from "react";
import { Search, Filter, Eye, MessageCircle, Clock, CheckCircle, AlertCircle, Paperclip, User } from "lucide-react";
import { Layout } from "@/components/layout";
import { Pagination } from "@/components/ui/pagination";
import SupportTicketModal from "@/components/support/SupportTicketModal";
import NoDataPlaceholder from "@/components/support/NoDataPlaceholder";
import SupportApi from "@/lib/api/supportApi";
import { getApiErrorMessage } from "@/lib/utils";

const SupportPage = () => {
  const [tickets, setTickets] = useState([]);
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [priorityFilter, setPriorityFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [totalItems, setTotalItems] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  // Fetch support tickets from API
  useEffect(() => {
    const fetchTickets = async () => {
      try {
        setLoading(true);
        console.log('Admin Panel - Fetching support tickets with params:', {
          page: currentPage,
          limit: itemsPerPage,
          search: searchTerm,
          status: statusFilter,
          priority: priorityFilter
        });
        
        const response = await SupportApi.list({
          page: currentPage,
          limit: itemsPerPage,
          search: searchTerm,
          status: statusFilter,
          priority: priorityFilter
        });
        
        console.log('Admin Panel - API Response:', response);
        
        if (response.success) {
          setTickets(response.data || []);
          setTotalItems(response.pagination?.totalItems || 0);
          setTotalPages(response.pagination?.totalPages || 0);
          console.log('Admin Panel - Tickets loaded:', response.data?.length || 0);
        } else {
          setError('Failed to load support tickets from the server.');
        }
      } catch (err) {
        console.error('Admin Panel - Error fetching support tickets:', err);
        setError(getApiErrorMessage(err, 'Failed to load support tickets. Please try again.'));
        setTickets([]);
      } finally {
        setLoading(false);
      }
    };

    fetchTickets();
  }, [currentPage, itemsPerPage, searchTerm, statusFilter, priorityFilter]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleItemsPerPageChange = (newItemsPerPage) => {
    setItemsPerPage(newItemsPerPage);
    setCurrentPage(1);
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'resolved':
        return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'pending':
        return <Clock className="w-4 h-4 text-yellow-500" />;
      case 'urgent':
        return <AlertCircle className="w-4 h-4 text-red-500" />;
      default:
        return <Clock className="w-4 h-4 text-gray-500" />;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'resolved':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'urgent':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high':
        return 'bg-red-100 text-red-800';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800';
      case 'low':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const handleViewTicket = (ticket) => {
    console.log('Admin Panel - Viewing ticket:', ticket);
    setSelectedTicket(ticket);
    setIsModalOpen(true);
  };

  const handleReplyTicket = (ticket) => {
    console.log('Admin Panel - Replying to ticket:', ticket);
    setSelectedTicket(ticket);
    setIsModalOpen(true);
  };

  const handleUpdateTicket = (updatedTicket) => {
    setTickets(prev => prev.map(ticket => 
      ticket.id === updatedTicket.id ? updatedTicket : ticket
    ));
    setSelectedTicket(updatedTicket);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedTicket(null);
  };

  // Fetch support statistics
  const [stats, setStats] = useState({ total: 0, pending: 0, resolved: 0, highPriority: 0 });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await SupportApi.getStats();
        if (response.success) {
          setStats(response.data);
        }
      } catch (err) {
        console.error('Error fetching support stats:', err);
      }
    };

    fetchStats();
  }, []);

  return (
    <Layout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Support Management</h1>
            <p className="text-gray-700 text-lg">Manage and respond to customer support tickets</p>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-xl shadow-lg border border-blue-200">
            <div className="flex items-center">
              <div className="p-3 bg-blue-500 rounded-full">
                <User className="w-6 h-6 text-white" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-blue-700">Total Tickets</p>
                <p className="text-2xl font-bold text-blue-900">{stats.total}</p>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-yellow-50 to-yellow-100 p-6 rounded-xl shadow-lg border border-yellow-200">
            <div className="flex items-center">
              <div className="p-3 bg-yellow-500 rounded-full">
                <Clock className="w-6 h-6 text-white" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-yellow-700">Pending</p>
                <p className="text-2xl font-bold text-yellow-900">{stats.pending}</p>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-green-50 to-green-100 p-6 rounded-xl shadow-lg border border-green-200">
            <div className="flex items-center">
              <div className="p-3 bg-green-500 rounded-full">
                <CheckCircle className="w-6 h-6 text-white" />
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-green-700">Resolved</p>
                <p className="text-2xl font-bold text-green-900">{stats.resolved}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content Card */}
        <div className="bg-gradient-to-br from-white to-blue-50 rounded-xl shadow-lg border border-blue-100">
          {/* Search and Controls */}
          <div className="p-6 border-b border-blue-200 bg-gradient-to-r from-blue-50 to-indigo-50">
            <div className="flex justify-between items-center">
              <div className="flex items-center space-x-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-600 w-4 h-4" />
                  <input
                    type="text"
                    placeholder="Search tickets by subject, name, or email..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 pr-4 py-3 border-2 border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 w-80 text-gray-900 placeholder-gray-500 shadow-md bg-white"
                  />
                </div>
                <div className="flex items-center space-x-2">
                  <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    className="px-4 py-3 border-2 border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 shadow-md bg-white"
                  >
                    <option value="all">All Status</option>
                    <option value="pending">Pending</option>
                    <option value="resolved">Resolved</option>
                  </select>
                  {/* <select
                    value={priorityFilter}
                    onChange={(e) => setPriorityFilter(e.target.value)}
                    className="px-4 py-3 border-2 border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 shadow-md bg-white"
                  >
                    <option value="all">All Priority</option>
                    <option value="high">High</option>
                    <option value="medium">Medium</option>
                    <option value="low">Low</option>
                  </select> */}
                </div>
              </div>
              {searchTerm && (
                <div className="text-sm text-gray-800 font-semibold bg-blue-100 px-4 py-2 rounded-lg">
                  Found <span className="text-blue-700 font-bold">{totalItems}</span> ticket{totalItems !== 1 ? 's' : ''}
                  <span className="text-gray-700 ml-2">for "{searchTerm}"</span>
                </div>
              )}
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            {loading ? (
              <div className="flex items-center justify-center py-12">
                <div className="text-gray-500">Loading support tickets...</div>
              </div>
            ) : error ? (
              <NoDataPlaceholder type="error" />
            ) : (
              <table className="w-full">
                <thead className="bg-gradient-to-r from-blue-600 to-indigo-600">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-bold text-white uppercase tracking-wider">
                      Ticket ID
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-bold text-white uppercase tracking-wider">
                      Subject
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-bold text-white uppercase tracking-wider">
                      User
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-bold text-white uppercase tracking-wider">
                      Status
                    </th>
                    {/* <th className="px-4 py-3 text-left text-xs font-bold text-white uppercase tracking-wider">
                      Priority
                    </th> */}
                    <th className="px-4 py-3 text-left text-xs font-bold text-white uppercase tracking-wider">
                      Created
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-bold text-white uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-blue-100">
                  {tickets.length === 0 ? (
                    <tr>
                      <td colSpan="7" className="px-4 py-8">
                        <NoDataPlaceholder type="tickets" />
                      </td>
                    </tr>
                  ) : (
                    tickets.map((ticket) => (
                    <tr key={ticket.id} className="hover:bg-blue-50 transition-colors">
                      <td className="px-4 py-3 whitespace-nowrap text-sm font-bold text-blue-700">
                        #{ticket.id}
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap">
                        <div className="flex items-center">
                          {getStatusIcon(ticket.status)}
                          <div className="ml-3">
                            <div className="text-sm font-bold text-gray-900 max-w-xs truncate">
                              {ticket.subject}
                            </div>
                            <div className="text-xs text-gray-500 max-w-xs truncate">
                              {ticket.message.substring(0, 50)}...
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap">
                        <div>
                          <div className="text-sm font-bold text-gray-900">
                            {ticket.user.name}
                          </div>
                          <div className="text-xs text-gray-500">
                            {ticket.user.email}
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(ticket.status)}`}>
                          {getStatusIcon(ticket.status)}
                          <span className="ml-1 capitalize">{ticket.status}</span>
                        </span>
                      </td>
                      {/* <td className="px-4 py-3 whitespace-nowrap">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getPriorityColor(ticket.priority)}`}>
                          {ticket.priority}
                        </span>
                      </td> */}
                      <td className="px-4 py-3 whitespace-nowrap text-sm font-semibold text-gray-700">
                        {formatDate(ticket.createdAt)}
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm font-medium">
                        <div className="flex items-center space-x-2">
                          <button
                            onClick={() => handleViewTicket(ticket)}
                            className="text-blue-600 hover:text-blue-700 p-2 rounded hover:bg-blue-50 transition-colors"
                            title="View Conversation"
                          >
                            <Eye className="w-4 h-4" />
                          </button>
                          {/* Show reply button if ticket is pending */}
                          {ticket.status === 'pending' && (
                            <button
                              onClick={() => handleReplyTicket(ticket)}
                              className="text-green-600 hover:text-green-700 p-2 rounded hover:bg-green-50 transition-colors"
                              title="Reply to Ticket"
                            >
                              <MessageCircle className="w-4 h-4" />
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                    ))
                  )}
                </tbody>
              </table>
            )}
          </div>

          {/* Pagination */}
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border-t border-blue-200">
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
              totalItems={totalItems}
              itemsPerPage={itemsPerPage}
              onItemsPerPageChange={handleItemsPerPageChange}
            />
          </div>
        </div>

        {/* Modal */}
        {isModalOpen && selectedTicket && (
          <SupportTicketModal
            ticket={selectedTicket}
            onUpdate={handleUpdateTicket}
            onClose={handleCloseModal}
            mode={selectedTicket.status === 'pending' ? 'reply' : 'view'}
          />
        )}
      </div>
    </Layout>
  );
};

export default SupportPage;
