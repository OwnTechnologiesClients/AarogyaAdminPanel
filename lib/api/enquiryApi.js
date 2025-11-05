import api from '../api.js';

class EnquiryApi {
  /**
   * Get all enquiries with pagination and filters
   * @param {Object} params - Query parameters
   * @returns {Promise<Object>} - API response with enquiries and pagination
   */
  async list(params = {}) {
    try {
      const response = await api.get('/enquiries/list', { params });
      return response.data;
    } catch (error) {
      console.error('Error fetching enquiries:', error);
      throw error;
    }
  }

  /**
   * Get single enquiry by ID
   * @param {string} id - Enquiry ID
   * @returns {Promise<Object>} - API response with enquiry data
   */
  async getById(id) {
    try {
      const response = await api.get(`/enquiries/list/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching enquiry:', error);
      throw error;
    }
  }

  /**
   * Update enquiry details
   * @param {string} id - Enquiry ID
   * @param {Object} enquiryData - Enquiry update data
   * @returns {Promise<Object>} - API response
   */
  async update(id, enquiryData) {
    try {
      const response = await api.put(`/enquiries/update/${id}`, enquiryData);
      return response.data;
    } catch (error) {
      console.error('Error updating enquiry:', error);
      throw error;
    }
  }

  /**
   * Delete enquiry
   * @param {string} id - Enquiry ID
   * @returns {Promise<Object>} - API response
   */
  async delete(id) {
    try {
      const response = await api.delete(`/enquiries/delete/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error deleting enquiry:', error);
      throw error;
    }
  }

  /**
   * Get enquiry statistics
   * @returns {Promise<Object>} - API response with statistics
   */
  async getStats() {
    try {
      const response = await api.get('/enquiries/stats');
      return response.data;
    } catch (error) {
      console.error('Error fetching enquiry stats:', error);
      throw error;
    }
  }

  /**
   * Search enquiries
   * @param {string} searchTerm - Search term
   * @param {Object} additionalParams - Additional search parameters
   * @returns {Promise<Object>} - API response with filtered enquiries
   */
  async search(searchTerm, additionalParams = {}) {
    try {
      const params = {
        search: searchTerm,
        ...additionalParams
      };
      return this.list(params);
    } catch (error) {
      console.error('Error searching enquiries:', error);
      throw error;
    }
  }

  /**
   * Filter enquiries by page reference
   * @param {string} pageRef - Page reference to filter by
   * @param {Object} additionalParams - Additional parameters
   * @returns {Promise<Object>} - API response with filtered enquiries
   */
  async filterByPageRef(pageRef, additionalParams = {}) {
    try {
      const params = {
        pageRef,
        ...additionalParams
      };
      return this.list(params);
    } catch (error) {
      console.error('Error filtering enquiries by page reference:', error);
      throw error;
    }
  }
}

const enquiryApi = new EnquiryApi();
export default enquiryApi;
