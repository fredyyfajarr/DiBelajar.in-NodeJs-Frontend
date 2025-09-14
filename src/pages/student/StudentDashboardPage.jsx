/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import useAuthStore from '/src/store/authStore.js';
import { useMyEnrollments, useMyReview } from '/src/hooks/useStudent.js';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import ReviewModal from '/src/components/ReviewModal.jsx';
import { BookOpen, Award, Calendar, Users, ChevronRight, Clock, CheckCircle, Star, Play } from 'lucide-react';

// Course Card Component untuk dashboard baru
const CourseCard = ({ enrollment, handleOpenReviewModal }) => {
  const courseSlug = enrollment.courseId.slug || enrollment.courseId._id;
  const { data: reviewResponse, isLoading: isReviewLoading } = useMyReview(courseSlug);
  const myReview = reviewResponse?.data;
  
  const hasReviewed = !!myReview;
  const buttonText = hasReviewed ? 'Edit Ulasan' : 'Beri Ulasan';
  const modalMode = hasReviewed ? 'edit' : 'add';
  
  // Hitung progress berdasarkan enrollment data
  const totalMaterials = enrollment.courseId.materials?.length || 0;
  const completedMaterials = enrollment.progress?.filter(p => p.isCompleted).length || 0;
  const progress = totalMaterials > 0 ? Math.round((completedMaterials / totalMaterials) * 100) : 0;
  
  const isCompleted = enrollment.completedAt;
  const status = isCompleted ? "Selesai" : "Sedang dipelajari";
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-gray-50 rounded-lg p-4 mb-3 hover:bg-gray-100 transition-colors"
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <img
            src={enrollment.courseId.thumbnail}
            alt={enrollment.courseId.title}
            className="w-16 h-12 object-cover rounded"
          />
          <div className="flex-1">
            <h4 className="font-medium text-gray-900 text-sm">
              {enrollment.courseId.title}
            </h4>
            <p className="text-xs text-gray-600 mt-1">
              {status}
            </p>
            {!isCompleted && (
              <div className="mt-2">
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-blue-500 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${progress}%` }}
                  />
                </div>
                <span className="text-xs text-gray-500 mt-1">
                  {progress}% selesai
                </span>
              </div>
            )}
          </div>
        </div>
        <Link 
          to={`/learn/${courseSlug}`}
          className="text-blue-600 text-sm font-medium hover:underline flex items-center gap-1"
        >
          Lanjutkan
          <ChevronRight className="w-4 h-4" />
        </Link>
      </div>
      
      {enrollment.completedAt && (
        <div className="mt-3 pt-3 border-t border-gray-200">
          <button
            onClick={() => handleOpenReviewModal(courseSlug, modalMode, myReview)}
            disabled={isReviewLoading}
            className="w-full text-center bg-blue-50 text-blue-700 font-medium py-2 rounded-lg hover:bg-blue-100 transition-colors disabled:opacity-50 text-sm"
          >
            {isReviewLoading ? 'Memuat...' : buttonText}
          </button>
        </div>
      )}
    </motion.div>
  );
};

const StudentDashboardPage = () => {
  const { user } = useAuthStore();
  const { data: response, isLoading } = useMyEnrollments(user._id);
  const enrollments = response?.data?.data || [];

  const [modalState, setModalState] = useState({
    isOpen: false,
    mode: 'add',
    courseSlug: null,
    currentReview: null,
  });

  const handleOpenReviewModal = (slug, mode, review) => {
    setModalState({
      isOpen: true,
      mode,
      courseSlug: slug,
      currentReview: review,
    });
  };

  const handleCloseReviewModal = () => {
    setModalState({
      isOpen: false,
      mode: 'add',
      courseSlug: null,
      currentReview: null,
    });
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { duration: 0.5, staggerChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  // Hitung statistik
  const totalCourses = enrollments.length;
  const completedCourses = enrollments.filter(e => e.completedAt).length;
  const ongoingCourses = enrollments.filter(e => !e.completedAt);

  // Generate recent activities
  const recentActivities = [
    ...enrollments.filter(e => e.completedAt).slice(0, 2).map(e => ({
      type: 'completed',
      title: `Menyelesaikan kursus "${e.courseId.title}"`,
      time: new Date(e.completedAt).toLocaleDateString('id-ID'),
      color: 'bg-green-500'
    })),
    ...ongoingCourses.slice(0, 3).map(e => ({
      type: 'progress',
      title: `Melanjutkan pembelajaran "${e.courseId.title}"`,
      time: 'Sedang berlangsung',
      color: 'bg-blue-500'
    }))
  ].slice(0, 5);

  return (
    <>
      <div className="min-h-screen bg-transparent">
        {/* Header Section */}
        <div className="bg-transparent text-gray-900">
          <div className="container mx-auto px-4 py-8">
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="text-3xl font-bold mb-2">
                Selamat datang {user.name}!
              </h1>
              <p className="text-gray-500 text-lg">
                Semoga aktivitas belajarmu menyenangkan.
              </p>
            </motion.div>

            {/* Learning Status Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-gray-100 border border-gray-400 rounded-lg p-4 mt-6 text-gray-900"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <BookOpen className="w-5 h-5 text-gray-600" />
                  <div>
                    <h3 className="font-semibold text-gray-900">Status Pembelajaran</h3>
                    <p className="text-sm text-gray-600">
                      {totalCourses === 0 
                        ? "Belum ada kursus yang diikuti. Mulai perjalanan belajar Anda sekarang!"
                        : `${totalCourses} kursus diikuti, ${completedCourses} telah selesai`
                      }
                      {totalCourses > 0 && ongoingCourses.length > 0 && `, ${ongoingCourses.length} sedang dipelajari`}

                    </p>
                  </div>
                </div>
                <Link 
                  to="/"
                  className="bg-gray-800 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-700 transition-colors"
                >
                  Jelajahi Kursus
                </Link>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Main Content */}
        <div className="container mx-auto px-4 py-8">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 lg:grid-cols-3 gap-8"
          >
            {/* Learning Activities */}
            <motion.div variants={itemVariants} className="lg:col-span-2">
              <div className="bg-white rounded-lg shadow-sm border border-gray-400 overflow-hidden">
                <div className="p-6 border-b border-gray-400 bg-purple-200">
                  <div className="flex items-center gap-2">
                    <BookOpen className="w-5 h-5 text-gray-900" />
                    <h2 className="text-xl font-semibold text-gray-900">
                      Aktivitas Belajar
                    </h2>
                  </div>
                </div>
                <div className="p-6">
                  {isLoading && (
                    <p className="text-gray-600 text-center">
                      Memuat kursus Anda...
                    </p>
                  )}
                  {!isLoading && enrollments.length === 0 && (
                    <div className="text-center py-8">
                      <BookOpen className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                      <p className="text-gray-600 mb-4">
                        Belum ada kursus yang diikuti
                      </p>
                      <Link
                        to="/"
                        className="inline-flex items-center px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
                      >
                        Mulai Belajar
                        <ChevronRight className="w-4 h-4 ml-2" />
                      </Link>
                    </div>
                  )}
                  {!isLoading && enrollments.length > 0 && (
                    <>
                      {enrollments.map((enrollment) => (
                        <CourseCard 
                          key={enrollment._id} 
                          enrollment={enrollment}
                          handleOpenReviewModal={handleOpenReviewModal}
                          
                        />
                      ))}
                      {enrollments.length > 5 && (
                        <div className="text-center mt-6">
                          <button className="text-purple-600 text-sm hover:underline">
                            Selengkapnya
                          </button>
                        </div>
                      )}
                    </>
                  )}
                </div>
              </div>
            </motion.div>

            {/* Sidebar */}
            <motion.div variants={itemVariants}>
              {/* Quick Stats */}
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="bg-white rounded-lg p-4 border border-gray-400 text-center">
                  <div className="text-2xl font-bold text-purple-600">
                    {totalCourses}
                  </div>
                  <div className="text-sm text-gray-600">Kursus Diikuti</div>
                </div>
                <div className="bg-white rounded-lg p-4 border border-gray-400 text-center">
                  <div className="text-2xl font-bold text-green-600">
                    {completedCourses}
                  </div>
                  <div className="text-sm text-gray-600">Kursus Selesai</div>
                </div>
              </div>

              {/* Achievements Section */}
              <div className="bg-white rounded-lg shadow-sm border border-gray-400 overflow-hidden">
                <div className="p-6 border-b bg-pink-200 border-gray-400">
                  <div className="flex items-center gap-2">
                    <Award className="w-5 h-5 text-gray-800" />
                    <h2 className="text-xl font-semibold text-gray-900">
                      Pencapaian
                    </h2>
                  </div>
                </div>
                <div className="p-6">
                  {completedCourses > 0 ? (
                    <div className="space-y-3">
                      <div className="flex items-start gap-3 p-3 rounded-lg border border-green-100 bg-green-50">
                        <span className="text-2xl">🏆</span>
                        <div className="flex-1">
                          <p className="text-sm font-medium text-gray-900">
                            Pembelajar Aktif
                          </p>
                          <p className="text-xs text-gray-600">
                            Telah menyelesaikan {completedCourses} kursus
                          </p>
                        </div>
                      </div>
                      {totalCourses >= 3 && (
                        <div className="flex items-start gap-3 p-3 rounded-lg border border-blue-100 bg-blue-50">
                          <span className="text-2xl">📚</span>
                          <div className="flex-1">
                            <p className="text-sm font-medium text-gray-900">
                              Kolektur Pengetahuan
                            </p>
                            <p className="text-xs text-gray-600">
                              Mengikuti {totalCourses} kursus
                            </p>
                          </div>
                        </div>
                      )}
                    </div>
                  ) : (
                    <p className="text-sm text-gray-600 text-center py-4">
                      Selesaikan kursus pertama Anda untuk mendapatkan pencapaian!
                    </p>
                  )}
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Recent Activity Timeline */}
          {recentActivities.length > 0 && (
            <motion.div
              variants={itemVariants}
              className="mt-8 bg-white rounded-lg shadow-sm border border-gray-400 overflow-hidden"
            >
              <div className="p-6 border-b bg-indigo-200 border-gray-400">
                <div className="flex items-center gap-2">
                  <Clock className="w-5 h-5 text-gray-800" />
                  <h2 className="text-xl font-semibold text-gray-900">
                    Aktivitas Terbaru
                  </h2>
                </div>
              </div>
              <div className="p-6">
                <div className="space-y-4">
                  {recentActivities.map((activity, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <div className={`w-2 h-2 ${activity.color} rounded-full mt-2`}></div>
                      <div>
                        <p className="text-sm font-medium text-gray-900">
                          {activity.title}
                        </p>
                        <p className="text-xs text-gray-500">{activity.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </div>

      <ReviewModal
        isOpen={modalState.isOpen}
        onClose={handleCloseReviewModal}
        courseSlug={modalState.courseSlug}
        mode={modalState.mode}
        currentReview={modalState.currentReview}
      />
    </>
  );
};

export default StudentDashboardPage;
