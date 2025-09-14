// src/api/authService.js
import axiosInstance from './axiosInstance.js';

const login = (credentials) => {
  return axiosInstance.post('/auth/login', credentials);
};

// Pastikan fungsi ini sudah ada
const register = (userData) => {
  return axiosInstance.post('/auth/register', userData);
};

const refreshToken = (refreshToken) => {
  return axiosInstance.post('/auth/refresh-token', { refreshToken });
};

export default {
  login,
  register, // <-- dan diekspor
  refreshToken,
};
