

// import axios from "axios";

// const API_URL = "http://localhost:5000/api/auth"; 

// export const registerUser = async (userData) => {
//   try {
//     const { data } = await axios.post(`${API_URL}/register`, userData);
//     return data;
//   } catch (err) {
//     return { success: false, message: err.response?.data?.message || "Registration failed" };
//   }
// };

// export const loginUser = async (credentials) => {
//   try {
//     const { data } = await axios.post(`${API_URL}/login`, credentials);
//     return data;
//   } catch (err) {
//     return { success: false, message: err.response?.data?.message || "Login failed" };
//   }
// };

import axios from "axios";

// Use deployed backend URL (configurable for local or production)
const API_URL = import.meta.env.VITE_API_URL 
  ? `${import.meta.env.VITE_API_URL}/auth`
  : "https://construction-hazard-backend.onrender.com/api/auth";

export const registerUser = async (userData) => {
  try {
    const { data } = await axios.post(`${API_URL}/register`, userData);
    return data;
  } catch (err) {
    return { success: false, message: err.response?.data?.message || "Registration failed" };
  }
};

export const loginUser = async (credentials) => {
  try {
    const { data } = await axios.post(`${API_URL}/login`, credentials);
    return data;
  } catch (err) {
    return { success: false, message: err.response?.data?.message || "Login failed" };
  }
};
