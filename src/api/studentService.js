import axiosInstance from './axiosInstance.js';

const enrollInCourse = (courseId) => {
  return axiosInstance.post(`/courses/${courseId}/enrollments`);
};

const getMyEnrollments = (userId) => {
  return axiosInstance.get(`/users/${userId}/enrollments`);
};

const getMyAssignments = (userId) => {
  return axiosInstance.get(`/users/${userId}/assignments`);
};

const getMyTestResults = (userId) => {
  return axiosInstance.get(`/users/${userId}/tests`);
};

const getMyForumPosts = (userId) => {
  return axiosInstance.get(`/users/${userId}/forum/posts`);
};

const submitAssignment = ({ courseId, materialId, formData }) => {
  return axiosInstance.post(
    `/courses/${courseId}/materials/${materialId}/assignments`,
    formData
  );
};

const submitTestResult = ({ courseId, materialId, resultData }) => {
  return axiosInstance.post(
    `/courses/${courseId}/materials/${materialId}/tests`,
    resultData
  );
};

const getForumPosts = ({ courseId, materialId }) => {
  return axiosInstance.get(
    `/courses/${courseId}/materials/${materialId}/forum/posts`
  );
};

const createForumPost = ({ courseId, materialId, postData }) => {
  return axiosInstance.post(
    `/courses/${courseId}/materials/${materialId}/forum/posts`,
    postData
  );
};

const updateProgress = ({ courseId, materialId, step }) => {
  return axiosInstance.put(
    `/courses/${courseId}/materials/${materialId}/progress`,
    { step }
  );
};

const getCertificateData = (courseSlug) => {
  return axiosInstance.get(`/courses/${courseSlug}/certificate-data`);
};

const getReviewsByCourse = (courseSlug) => {
  return axiosInstance.get(`/courses/${courseSlug}/reviews`);
};

const getMyReview = (courseSlug) => {
  return axiosInstance
    .get(`/courses/${courseSlug}/reviews/my`)
    .then((response) => {
      // console.log('Respons API getMyReview:', response.data); // Tambahkan log ini
      return response;
    });
};

const addReview = ({ courseSlug, reviewData }) => {
  return axiosInstance.post(`/courses/${courseSlug}/reviews`, reviewData);
};

const updateReview = ({ courseSlug, reviewData }) => {
  return axiosInstance.put(`/courses/${courseSlug}/reviews/my`, reviewData);
};

const deleteReview = (courseSlug) => {
  return axiosInstance.delete(`/courses/${courseSlug}/reviews/my`);
};

export default {
  enrollInCourse,
  getMyEnrollments,
  getMyAssignments,
  getMyTestResults,
  getMyForumPosts,
  submitAssignment,
  submitTestResult,
  getForumPosts,
  createForumPost,
  updateProgress,
  getCertificateData,
  getReviewsByCourse,
  addReview,
  getMyReview,
  updateReview,
  deleteReview,
};
