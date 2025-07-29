import axios from 'axios';

// Base URL for the API - you can change this to your actual backend URL
const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:3001/api';

// Create axios instance with default config
const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor for adding auth tokens if needed
api.interceptors.request.use(
  (config) => {
    // Add auth token if available
    const token = localStorage.getItem('authToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for handling common errors
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // Handle common errors
    if (error.response?.status === 401) {
      // Handle unauthorized access
      localStorage.removeItem('authToken');
      // Optionally redirect to login
    }
    return Promise.reject(error);
  }
);

// API service functions
export const apiService = {
  // Shorten a URL
  shortenUrl: async (data) => {
    try {
      const response = await api.post('/shorten', data);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Get all URL statistics
  getStats: async () => {
    try {
      const response = await api.get('/stats');
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Handle redirect and log click
  handleRedirect: async (shortCode) => {
    try {
      const response = await api.get(`/redirect/${shortCode}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Get specific URL stats
  getUrlStats: async (shortCode) => {
    try {
      const response = await api.get(`/stats/${shortCode}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Delete a URL
  deleteUrl: async (shortCode) => {
    try {
      const response = await api.delete(`/urls/${shortCode}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
};

export default api;