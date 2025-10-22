"use client";
import React, { useState } from "react";
import { X, Paperclip, User, MessageCircle, CheckCircle, Clock, AlertCircle, Download } from "lucide-react";
import SupportApi from "@/lib/api/supportApi";
import Swal from 'sweetalert2';

const SupportTicketModal = ({ ticket, onUpdate, onClose, mode = 'reply' }) => {
  const [replyMessage, setReplyMessage] = useState("");
  const [replyAttachment, setReplyAttachment] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

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

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 10 * 1024 * 1024) {
        Swal.fire({
          title: 'File Size Error',
          text: 'File size must be less than 10MB',
          icon: 'error',
          confirmButtonText: 'OK'
        });
        return;
      }
      setReplyAttachment(file);
    }
  };

  const removeAttachment = () => {
    setReplyAttachment(null);
  };

  const handleDownloadAttachment = async (attachment) => {
    if (!attachment || !attachment.path) {
      Swal.fire({
        title: 'Download Error',
        text: 'Attachment not available for download',
        icon: 'error',
        confirmButtonText: 'OK'
      });
      return;
    }

    try {
      // Extract filename from the normalized path (e.g., /uploads/support/filename.pdf -> filename.pdf)
      const filename = attachment.path.split('/').pop();
      
      // Construct the download URL using the dedicated download endpoint
      const downloadUrl = `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}/api/support/download/${filename}`;
      
      // Fetch the file
      const response = await fetch(downloadUrl, {
        method: 'GET',
        headers: {
          'Accept': '*/*',
        },
      });

      if (!response.ok) {
        throw new Error(`Failed to download file: ${response.statusText}`);
      }

      // Get the blob data
      const blob = await response.blob();
      
      // Create a blob URL and trigger download
      const blobUrl = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = blobUrl;
      link.download = attachment.name || 'attachment';
      document.body.appendChild(link);
      link.click();
      
      // Clean up
      document.body.removeChild(link);
      window.URL.revokeObjectURL(blobUrl);
      
    } catch (error) {
      console.error('Download error:', error);
      Swal.fire({
        title: 'Download Failed',
        text: `Failed to download attachment: ${error.message}`,
        icon: 'error',
        confirmButtonText: 'OK'
      });
    }
  };

  const handleSubmitReply = async (e) => {
    e.preventDefault();
    
    if (!replyMessage.trim()) {
      Swal.fire({
        title: 'Message Required',
        text: 'Please enter a reply message',
        icon: 'warning',
        confirmButtonText: 'OK'
      });
      return;
    }

    setIsSubmitting(true);

    try {
      console.log('Admin Modal - Updating ticket:', {
        ticketId: ticket.id,
        status: 'resolved', // Automatically set to resolved when sending reply
        replyMessage: replyMessage,
        hasAttachment: !!replyAttachment
      });
      
      const response = await SupportApi.update(ticket.id, {
        status: 'resolved', // Automatically set to resolved when sending reply
        replyMessage: replyMessage,
        attachment: replyAttachment
      });

      console.log('Admin Modal - Update response:', response);

      if (response.success) {
        onUpdate(response.data);
        setReplyMessage("");
        setReplyAttachment(null);
        Swal.fire({
          title: 'Success!',
          text: 'Reply sent successfully! Ticket status changed to resolved.',
          icon: 'success',
          confirmButtonText: 'OK'
        });
      } else {
        Swal.fire({
          title: 'Error!',
          text: 'Failed to send reply. Please try again.',
          icon: 'error',
          confirmButtonText: 'OK'
        });
      }
    } catch (error) {
      console.error("Admin Modal - Error submitting reply:", error);
      Swal.fire({
        title: 'Error!',
        text: 'Failed to send reply. Please try again.',
        icon: 'error',
        confirmButtonText: 'OK'
      });
    } finally {
      setIsSubmitting(false);
    }
  };


  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex items-center gap-3">
            {getStatusIcon(ticket.status)}
            <h2 className="text-xl font-semibold text-gray-900">
              {ticket.subject}
            </h2>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-hidden flex">
          {/* Left Side - Ticket Details */}
          <div className="w-1/2 border-r border-gray-200 flex flex-col">
            {/* Ticket Info */}
            <div className="p-6 border-b border-gray-200">
              <div className="space-y-2 text-sm text-gray-600">
                <div><strong>User:</strong> {ticket.user.name}</div>
                <div><strong>Email:</strong> {ticket.user.email}</div>
                <div><strong>Phone:</strong> {ticket.user.phone}</div>
                <div><strong>Created:</strong> {formatDate(ticket.createdAt)}</div>
                {ticket.lastUpdated && (
                  <div><strong>Last Updated:</strong> {formatDate(ticket.lastUpdated)}</div>
                )}
              </div>
            </div>

            {/* Original Message - Only show in reply mode */}
            {mode === 'reply' && (
              <div className="flex-1 overflow-y-auto p-6">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Original Message</h3>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="flex items-start gap-3 mb-3">
                    <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center flex-shrink-0">
                      <User className="w-4 h-4 text-gray-600" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-sm font-medium text-gray-900">
                          {ticket.user.name}
                        </span>
                        <span className="text-xs text-gray-500">
                          {formatDate(ticket.createdAt)}
                        </span>
                      </div>
                      <div className="text-sm text-gray-700 whitespace-pre-wrap break-words overflow-wrap-anywhere">
                        {ticket.message}
                      </div>
                      {ticket.attachment && (
                        <div className="mt-3 flex items-center gap-2 text-sm text-blue-600">
                          <Paperclip className="w-3 h-3" />
                          <span className="break-all">{ticket.attachment.name || 'Attachment'}</span>
                          <button 
                            onClick={() => handleDownloadAttachment(ticket.attachment)}
                            className="ml-2 text-blue-600 hover:text-blue-800"
                            title="Download attachment"
                          >
                            <Download className="w-3 h-3" />
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )}

          </div>

          {/* Right Side - Reply Form Only */}
          <div className="w-1/2 flex flex-col">

            {/* Reply Form - Only show in reply mode */}
            {mode === 'reply' && (
              <div className="border-t border-gray-200 p-6">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Send Reply</h3>
                <form onSubmit={handleSubmitReply} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Message *
                    </label>
                  <textarea
                    value={replyMessage}
                    onChange={(e) => setReplyMessage(e.target.value)}
                    rows={4}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 placeholder-gray-500"
                    placeholder="Type your reply here..."
                    required
                  />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Attachment (Optional)
                    </label>
                    
                    {!replyAttachment ? (
                      <div className="relative">
                        <input
                          type="file"
                          onChange={handleFileChange}
                          className="hidden"
                          id="reply-attachment"
                          accept=".jpg,.jpeg,.png,.gif,.webp,.pdf,.doc,.docx,.txt"
                        />
                        <label
                          htmlFor="reply-attachment"
                          className="flex items-center justify-center w-full px-4 py-3 border-2 border-dashed border-gray-300 rounded-md cursor-pointer hover:border-blue-500 hover:bg-blue-50 transition-colors"
                        >
                          <Paperclip className="w-3 h-3 mr-2 text-gray-400" />
                          <span className="text-sm text-gray-600">
                            Click to upload attachment
                          </span>
                        </label>
                      </div>
                    ) : (
                      <div className="flex items-center justify-between p-3 bg-gray-50 border border-gray-200 rounded-md">
                        <div className="flex items-center">
                          <Paperclip className="w-3 h-3 mr-2 text-gray-400" />
                          <span className="text-sm text-gray-700">{replyAttachment.name}</span>
                          <span className="ml-2 text-xs text-gray-500">
                            ({(replyAttachment.size / 1024 / 1024).toFixed(2)} MB)
                          </span>
                        </div>
                        <button
                          type="button"
                          onClick={removeAttachment}
                          className="text-red-500 hover:text-red-700"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </div>
                    )}
                  </div>

                  <div className="flex justify-end gap-3">
                    <button
                      type="button"
                      onClick={onClose}
                      className="px-4 py-2 text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300 transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className={`px-4 py-2 rounded-md font-medium transition-colors ${
                        isSubmitting
                          ? 'bg-gray-400 cursor-not-allowed'
                          : 'bg-blue-600 hover:bg-blue-700 text-white'
                      }`}
                    >
                      {isSubmitting ? 'Sending...' : 'Send Reply'}
                    </button>
                  </div>
                </form>
              </div>
            )}

            {/* Conversation History for view mode */}
            {mode === 'view' && (
              <div className="flex-1 overflow-y-auto">
                <div className="p-6">
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Conversation History</h3>
                  
                  {/* Original Message */}
                  <div className="mb-6">
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <div className="flex items-start gap-3 mb-3">
                        <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center flex-shrink-0">
                          <User className="w-4 h-4 text-gray-600" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-2">
                            <span className="text-sm font-medium text-gray-900">
                              {ticket.user.name}
                            </span>
                            <span className="text-xs text-gray-500">
                              {formatDate(ticket.createdAt)}
                            </span>
                          </div>
                          <div className="text-sm text-gray-700 whitespace-pre-wrap break-words overflow-wrap-anywhere">
                            {ticket.message}
                          </div>
                          {ticket.attachment && (
                            <div className="mt-3 flex items-center gap-2 text-sm text-blue-600">
                              <Paperclip className="w-3 h-3" />
                              <span className="break-all">{ticket.attachment.name || 'Attachment'}</span>
                              <button 
                                onClick={() => handleDownloadAttachment(ticket.attachment)}
                                className="ml-2 text-blue-600 hover:text-blue-800"
                                title="Download attachment"
                              >
                                <Download className="w-3 h-3" />
                              </button>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Admin Reply */}
                  {ticket.reply && ticket.reply.message && (
                    <div className="mb-6">
                      <div className="bg-blue-50 p-4 rounded-lg">
                        <div className="flex items-start gap-3 mb-3">
                          <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0">
                            <User className="w-4 h-4 text-white" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-2">
                              <span className="text-sm font-medium text-gray-900">
                                {ticket.reply.adminName || 'Admin'}
                              </span>
                              <span className="text-xs text-gray-500">
                                {ticket.reply.createdAt ? formatDate(ticket.reply.createdAt) : 'Recently'}
                              </span>
                            </div>
                            <div className="text-sm text-gray-700 whitespace-pre-wrap break-words overflow-wrap-anywhere">
                              {ticket.reply.message}
                            </div>
                            {ticket.reply.attachment && (
                              <div className="mt-3 flex items-center gap-2 text-sm text-blue-600">
                                <Paperclip className="w-3 h-3" />
                                <span className="break-all">{ticket.reply.attachment.name || 'Attachment'}</span>
                                <button 
                                  onClick={() => handleDownloadAttachment(ticket.reply.attachment)}
                                  className="ml-2 text-blue-600 hover:text-blue-800"
                                  title="Download attachment"
                                >
                                  <Download className="w-3 h-3" />
                                </button>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* No reply message */}
                  {(!ticket.reply || !ticket.reply.message) && (
                    <div className="text-center text-gray-500 py-8">
                      <MessageCircle className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                      <p className="text-sm">No admin reply yet</p>
                    </div>
                  )}
                </div>

                {/* Close button */}
                <div className="border-t border-gray-200 p-6">
                  <div className="flex justify-end">
                    <button
                      onClick={onClose}
                      className="px-4 py-2 text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300 transition-colors"
                    >
                      Close
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SupportTicketModal;
