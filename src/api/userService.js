// src/api/userService.js
import axiosInstance from './axiosInstance.js';

const getUserProfile = (slug) => {
  return axiosInstance.get(`/users/${slug}/profile`);
};

const changePassword = (data) => {
  return axiosInstance.put('/users/change-password', data);
};

export default {
  getUserProfile,
  changePassword,
};
