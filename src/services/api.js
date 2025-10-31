

// import axios from 'axios';


// const API_BASE_URL = 'http://localhost:5000/api';


// const getToken = () => localStorage.getItem('token');


// const axiosInstance = axios.create({
//   baseURL: API_BASE_URL,
//   headers: {
//     'Content-Type': 'application/json'
//   }
// });


// axiosInstance.interceptors.request.use(config => {
//   const token = getToken();
//   if (token) {
//     config.headers['Authorization'] = `Bearer ${token}`;
//   }
//   return config;
// });


// export const registerUser = async (userData) => {
//   try {
//     const response = await axiosInstance.post('/users/register', userData);
//     return response.data;
//   } catch (error) {
//     console.error("Error registering user:", error);
//     return { success: false, message: error.response?.data?.message || "Registration failed" };
//   }
// };


// export const loginUser = async (credentials) => {
//   try {
//     const response = await axiosInstance.post('/users/login', credentials);
//     return response.data;
//   } catch (error) {
//     console.error("Error logging in:", error);
//     return { success: false, message: error.response?.data?.message || "Login failed" };
//   }
// };


// export const fetchSensors = async () => {
//   try {
//     const response = await axiosInstance.get('/sensors');
//     return response.data;
//   } catch (error) {
//     console.error("Error fetching sensors:", error);
//     return { success: false, message: "Failed to fetch sensors" };
//   }
// };


// export const fetchAlerts = async () => {
//   try {
//     const response = await axiosInstance.get('/alerts');
//     return response.data;
//   } catch (error) {
//     console.error("Error fetching alerts:", error);
//     return { success: false, message: "Failed to fetch alerts" };
//   }
// };


// export const generateReport = async (params) => {
//   try {
//     const response = await axiosInstance.post('/reports', params);
//     return response.data;
//   } catch (error) {
//     console.error("Error generating report:", error);
//     return { success: false, message: "Failed to generate report" };
//   }
// };


// export const fetchProfile = async () => {
//   try {
//     const response = await axiosInstance.get('/profile');
//     return response.data;
//   } catch (error) {
//     console.error("Error fetching profile:", error);
//     return { success: false, message: "Failed to fetch profile" };
//   }
// };

// export const updateProfile = async (profileData) => {
//   try {
//     const response = await axiosInstance.put('/profile', profileData);
//     return response.data;
//   } catch (error) {
//     console.error("Error updating profile:", error);
//     return { success: false, message: "Failed to update profile" };
//   }
// };


// export const updateSettings = async (settingsData) => {
//   try {
//     const response = await axiosInstance.put('/settings', settingsData);
//     return response.data;
//   } catch (error) {
//     console.error("Error updating settings:", error);
//     return { success: false, message: "Failed to update settings" };
//   }
// };

import axios from 'axios';

// ✅ Use deployed backend URL or fallback to localhost for local dev
const API_BASE_URL = `${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/api`;

// Function to get stored token
const getToken = () => localStorage.getItem('token');

// Create axios instance
const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: { 'Content-Type': 'application/json' }
});

// Add token to every request automatically
axiosInstance.interceptors.request.use(config => {
  const token = getToken();
  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`;
  }
  return config;
});

// ==================== AUTH ====================
export const registerUser = async (userData) => {
  try {
    const response = await axiosInstance.post('/users/register', userData);
    return response.data;
  } catch (error) {
    console.error("Error registering user:", error);
    return { success: false, message: error.response?.data?.message || "Registration failed" };
  }
};

export const loginUser = async (credentials) => {
  try {
    const response = await axiosInstance.post('/users/login', credentials);
    return response.data;
  } catch (error) {
    console.error("Error logging in:", error);
    return { success: false, message: error.response?.data?.message || "Login failed" };
  }
};

// ==================== SENSORS & ALERTS ====================
export const fetchSensors = async () => {
  try {
    const response = await axiosInstance.get('/sensors');
    return response.data;
  } catch (error) {
    console.error("Error fetching sensors:", error);
    return { success: false, message: "Failed to fetch sensors" };
  }
};

export const fetchAlerts = async () => {
  try {
    const response = await axiosInstance.get('/alerts');
    return response.data;
  } catch (error) {
    console.error("Error fetching alerts:", error);
    return { success: false, message: "Failed to fetch alerts" };
  }
};

// ==================== REPORTS ====================
export const generateReport = async (params) => {
  try {
    const response = await axiosInstance.post('/reports', params);
    return response.data;
  } catch (error) {
    console.error("Error generating report:", error);
    return { success: false, message: "Failed to generate report" };
  }
};

// ==================== PROFILE ====================
export const fetchProfile = async () => {
  try {
    const response = await axiosInstance.get('/profile');
    return response.data;
  } catch (error) {
    console.error("Error fetching profile:", error);
    return { success: false, message: "Failed to fetch profile" };
  }
};

export const updateProfile = async (profileData) => {
  try {
    const response = await axiosInstance.put('/profile', profileData);
    return response.data;
  } catch (error) {
    console.error("Error updating profile:", error);
    return { success: false, message: "Failed to update profile" };
  }
};

// ==================== SETTINGS ====================
export const updateSettings = async (settingsData) => {
  try {
    const response = await axiosInstance.put('/settings', settingsData);
    return response.data;
  } catch (error) {
    console.error("Error updating settings:", error);
    return { success: false, message: "Failed to update settings" };
  }
};
