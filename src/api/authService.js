// src/api/authService.js
import axiosInstance from './axiosInstance.js';

const login = (credentials) => {
  console.log('Login attempt with credentials:', credentials);
  return axiosInstance.post('/auth/login', credentials);
};

// Pastikan fungsi ini sudah ada
const register = (userData) => {
  return axiosInstance.post('/auth/register', userData);
};

export default {
  login,
  register, // <-- dan diekspor
};
