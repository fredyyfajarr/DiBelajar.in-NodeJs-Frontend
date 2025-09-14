import axiosInstance from './axiosInstance.js';

// === FUNGSI PENGGUNA (Tidak Berubah) ===
export const getAllUsers = (params) => {
  return axiosInstance.get('/users', { params });
};
export const createUser = (userData) => {
  return axiosInstance.post('/users', userData);
};
export const updateUser = async (userId, userData) => {
  const response = await axiosInstance.put(`/users/${userId}`, userData);
  return response.data; // <-- Kembalikan langsung properti 'data' dari respons
};
export const deleteUser = (userId) => {
  return axiosInstance.delete(`/users/${userId}`);
};

// === FUNGSI KURSUS (Perbaiki di sini) ===
export const getAllCourses = (params) => {
  return axiosInstance.get('/courses', { params });
};

// === FUNGSI BARU UNTUK INSTRUKTUR ===
export const getInstructorCourses = (params) => {
  return axiosInstance.get('/courses/my-courses', { params });
};

export const createCourse = (formData) => {
  // Hapus header 'Content-Type' dari sini. Biarkan browser yang mengaturnya.
  return axiosInstance.post('/courses', formData);
};

export const updateCourse = (courseId, formData) => {
  // Hapus header 'Content-Type' dari sini juga.
  return axiosInstance.put(`/courses/${courseId}`, formData);
};

export const deleteCourse = (courseId) => {
  return axiosInstance.delete(`/courses/${courseId}`);
};

// === FUNGSI MATERI (Tidak Berubah) ===
export const getMaterialsByCourse = (courseId) => {
  return axiosInstance.get(`/courses/${courseId}/materials`);
};
export const createMaterial = (courseId, materialData) => {
  return axiosInstance.post(`/courses/${courseId}/materials`, materialData);
};
export const updateMaterial = (courseId, materialId, materialData) => {
  return axiosInstance.put(
    `/courses/${courseId}/materials/${materialId}`,
    materialData
  );
};
export const deleteMaterial = (courseId, materialId) => {
  return axiosInstance.delete(`/courses/${courseId}/materials/${materialId}`);
};

// === FUNGSI STATISTIK (Tambahkan Ini) ===
export const getStats = () => {
  return axiosInstance.get('/stats');
};

// === FUNGSI PENDAFTARAN (Tambahkan Ini) ===
export const getAllEnrollments = (params) => {
  return axiosInstance.get('/enrollments', { params });
};

export const deleteEnrollment = ({ userId, courseId }) => {
  // Sesuai dengan backend Anda: DELETE /api/users/:userId/enrollments/:courseId
  return axiosInstance.delete(`/users/${userId}/enrollments/${courseId}`);
};

// === FUNGSI DETAIL MATERI (Tambahkan Ini) ===
export const getSubmissions = (courseId, materialId) => {
  return axiosInstance.get(
    `/courses/${courseId}/materials/${materialId}/assignments`
  );
};

export const getTestResults = (courseId, materialId) => {
  return axiosInstance.get(
    `/courses/${courseId}/materials/${materialId}/tests`
  );
};

export const getForumPosts = (courseId, materialId) => {
  return axiosInstance.get(
    `/courses/${courseId}/materials/${materialId}/forum/posts`
  );
};

// Fungsi untuk mengambil detail satu materi (untuk judul halaman)
export const getMaterialDetail = (courseId, materialId) => {
  return axiosInstance.get(`/courses/${courseId}/materials/${materialId}`);
};

export const getEnrollmentsByCourse = (courseId) => {
  return axiosInstance.get(`/courses/${courseId}/enrollments`);
};

export const getStudentProgress = (courseId, userId) => {
  return axiosInstance.get(`/courses/${courseId}/enrollments/${userId}`);
};

export const getCourseAnalytics = (courseId) => {
  return axiosInstance.get(`/courses/${courseId}/analytics`);
};

// Gabungkan semua fungsi untuk diekspor
const adminService = {
  getAllUsers,
  createUser,
  updateUser,
  deleteUser,
  getAllCourses,
  createCourse,
  updateCourse,
  deleteCourse,
  getMaterialsByCourse,
  createMaterial,
  updateMaterial,
  deleteMaterial,
  getStats,
  getAllEnrollments,
  deleteEnrollment,
  getSubmissions,
  getTestResults,
  getForumPosts,
  getMaterialDetail,
  getEnrollmentsByCourse,
  getInstructorCourses,
  getStudentProgress,
  getCourseAnalytics,
};

export default adminService;
