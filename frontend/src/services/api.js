import axios from "axios";

import { API_BASE_URL } from "../config/env";

const API = axios.create({
  baseURL: `${API_BASE_URL}/api/v1`,

  withCredentials: true,

  headers: {
    "Content-Type": "application/json",
  },

  timeout: 15000,
});

// ==========================================
// Request Interceptor
// ==========================================

API.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => Promise.reject(error)
);

// ==========================================
// Response Interceptor
// ==========================================

API.interceptors.response.use(
  (response) => response,

  (error) => {
    console.error(
      "API Error:",
      error.response?.data || error.message
    );

    // Unauthorized
    if (error.response?.status === 401) {
      console.warn("Unauthorized request.");
    }

    // Forbidden
    if (error.response?.status === 403) {
      console.warn("Access denied.");
    }

    // Server Error
    if (error.response?.status >= 500) {
      console.warn("Internal server error.");
    }

    return Promise.reject(error);
  }
);

export default API;
