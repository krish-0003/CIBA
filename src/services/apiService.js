/**
 * Service for handling API calls
 */

import axios from "axios";

// Create axios instance with default config
const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

/**
 * Submits the form data to the API
 * @param {Object} formData - The formatted form data
 * @returns {Promise} API response
 */
export const submitFormData = async (formData) => {
  try {
    const response = await api.post("/submit", formData);
    return response.data;
  } catch (error) {
    throw new Error("Something went wrong");
  }
};

// Export the API instance for potential future use
export { api };
