import api from '../api.js';

const SupportApi = {
  /**
   * Get all support tickets with filters and pagination
   * @param {Object} params - Query parameters
   * @param {string} params.status - Filter by status (pending, resolved, all)
   * @param {string} params.priority - Filter by priority (low, medium, high, all)
   * @param {string} params.search - Search term
   * @param {number} params.page - Page number
   * @param {number} params.limit - Items per page
   * @returns {Promise} API response
   */
  async list(params = {}) {
    try {
      const response = await api.get('/support/list', { params });
      return response.data;
    } catch (error) {
      console.error('Error fetching support tickets:', error);
      throw error;
    }
  },

  /**
   * Get support statistics
   * @returns {Promise} API response
   */
  async getStats() {
    try {
      const response = await api.get('/support/stats');
      return response.data;
    } catch (error) {
      console.error('Error fetching support stats:', error);
      throw error;
    }
  },

  /**
   * Get specific support ticket by ID
   * @param {string} ticketId - Ticket ID
   * @returns {Promise} API response
   */
  async getById(ticketId) {
    try {
      const response = await api.get(`/support/ticket/${ticketId}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching support ticket:', error);
      throw error;
    }
  },

  /**
   * Update support ticket (reply or status change)
   * @param {string} ticketId - Ticket ID
   * @param {Object} updateData - Update data
   * @param {string} updateData.status - New status (pending, resolved)
   * @param {string} updateData.replyMessage - Reply message
   * @param {File} updateData.attachment - Optional attachment file
   * @returns {Promise} API response
   */
  async update(ticketId, updateData) {
    try {
      const formData = new FormData();
      
      if (updateData.status) {
        formData.append('status', updateData.status);
      }
      if (updateData.replyMessage) {
        formData.append('replyMessage', updateData.replyMessage);
      }
      if (updateData.attachment) {
        formData.append('attachment', updateData.attachment);
      }

      const response = await api.put(`/support/update/${ticketId}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      return response.data;
    } catch (error) {
      console.error('Error updating support ticket:', error);
      throw error;
    }
  },

  /**
   * Delete support ticket
   * @param {string} ticketId - Ticket ID
   * @returns {Promise} API response
   */
  async delete(ticketId) {
    try {
      const response = await api.delete(`/support/delete/${ticketId}`);
      return response.data;
    } catch (error) {
      console.error('Error deleting support ticket:', error);
      throw error;
    }
  }
};

export default SupportApi;



