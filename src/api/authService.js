// src/api/authService.js
import axiosInstance from './axiosInstance.js';

const login = (credentials) => {
  return axiosInstance.post('/auth/login', credentials);
};

// Pastikan fungsi ini sudah ada
const register = (userData) => {
  return axiosInstance.post('/auth/register', userData);
};

const refreshToken = () => {
  return axiosInstance.post('/auth/refresh-token');
};

const getMe = () => {
  return axiosInstance.get('/auth/me');
};

const logout = () => {
  return axiosInstance.post('/auth/logout');
};

const forgotPassword = (data) => {
  return axiosInstance.post('/auth/forgot-password', data);
};

const resetPassword = ({ token, password, confirmPassword }) => {
  return axiosInstance.post(`/auth/reset-password/${token}`, {
    password,
    confirmPassword,
  });
};

export default {
  login,
  register, // <-- dan diekspor
  refreshToken,
  getMe,
  logout,
  forgotPassword,
  resetPassword,
};
