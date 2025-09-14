/* eslint-disable no-unused-vars */
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useCourseDetail } from '/src/hooks/useCourses.js';
import { useEnrollInCourse } from '/src/hooks/useStudent.js';
import useAuthStore from '/src/store/authStore.js';
import useModalStore from '/src/store/modalStore.js';
import CourseReviews from '../components/CourseReviews';
import { BookOpen, Clock, Video, Lock, ArrowRight, Plus } from 'lucide-react';

const CourseDetailPage = () => {
  const { courseSlug } = useParams();
  const { data, isLoading, isError } = useCourseDetail(courseSlug);
  const { isAuthenticated } = useAuthStore();
  const { openModal } = useModalStore();
  const { mutate: enroll, isPending: isEnrolling } = useEnrollInCourse();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-transparent">
        <div className="text-center p-8">
          <div className="w-16 h-16 border-4 border-pink-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600 text-lg font-medium">
            Memuat detail kursus...
          </p>
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-transparent">
        <div className="text-center p-8 max-w-md mx-4">
          <div className="w-20 h-20 bg-pink-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-pink-600 text-2xl font-bold">!</span>
          </div>
          <h2 className="text-xl font-bold text-pink-700 mb-2">
            Terjadi Kesalahan
          </h2>
          <p className="text-pink-600">
            Gagal memuat kursus. Silakan coba lagi.
          </p>
        </div>
      </div>
    );
  }

  const { course, materials } = data || {};
  if (!course) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-transparent">
        <div className="text-center p-8 max-w-md mx-4">
          <div className="w-20 h-20 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-purple-600 text-2xl font-bold">?</span>
          </div>
          <h2 className="text-xl font-bold text-purple-700 mb-2">
            Kursus Tidak Ditemukan
          </h2>
          <p className="text-purple-600">
            Kursus yang Anda cari tidak tersedia.
          </p>
        </div>
      </div>
    );
  }

  const materialsToShow = isAuthenticated ? materials : materials.slice(0, 3);

  const handleEnrollClick = () => {
    console.log('Enrolling in course:', course?._id || course?.slug);
    console.log('Course data:', course);
    enroll(course?._id || course?.slug);
  };

  return (
    <div className="min-h-screen bg-transparent">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg-col-span-2">
            {/* Header Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-10"
            >
              <div className="inline-flex items-center px-4 py-2 rounded-full bg-pink-100 text-pink-700 text-sm font-semibold mb-6">
                <span className="w-4 h-4 bg-pink-500 rounded-full mr-2"></span>
                Kursus Online
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight mb-8">
                {course.title}
              </h1>

              <div className="flex items-center gap-4 mb-8">
                <div>
                  <p className="text-gray-900 font-bold text-xl">
                    <span className="text-gray-600 text-xl">
                      Di Terbitkan Oleh{' '}
                    </span>
                    <Link
                      // PERBAIKAN DITERAPKAN DI SINI:
                      // Gunakan slug jika ada, jika tidak ada, gunakan _id sebagai fallback.
                      to={`/profile/${
                        course.instructorId?.name || course.instructorId?._id
                      }`}
                      className="text-purple-600 hover:underline hover:text-pink-600 transition-colors"
                    >
                      {course.instructorId?.name || 'Instruktur Ahli'}
                    </Link>
                  </p>
                </div>
              </div>

              <div
                className="prose prose-lg prose-pink max-w-none text-gray-700 leading-relaxed"
                dangerouslySetInnerHTML={{ __html: course.description }}
              />
            </motion.div>
            {/* Course Materials */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="mb-10"
            >
              <div className="flex items-center gap-6 mb-8">
                <div className="w-12 h-12 bg-pink-500 rounded-2xl flex items-center justify-center shadow-lg text-white">
                  <BookOpen size={24} />
                </div>
                <h2 className="text-3xl lg:text-4xl font-bold text-gray-900">
                  Materi Kursus
                </h2>
                <div className="flex-1 h-1 bg-pink-200 rounded-full"></div>
              </div>

              <div className="space-y-6">
                {materialsToShow.map((material, index) => (
                  <motion.div
                    key={material._id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="group bg-white/80 backdrop-blur-sm border border-pink-100 rounded-3xl p-8 shadow-lg hover:shadow-xl transition-all duration-300"
                  >
                    <div className="flex items-start gap-6">
                      <div className="flex-shrink-0 w-14 h-14 bg-pink-500 rounded-2xl flex items-center justify-center text-white font-bold text-xl shadow-lg">
                        {index + 1}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-bold text-xl text-gray-900 mb-3 group-hover:text-pink-700 transition-colors">
                          {material.title}
                        </h3>
                        <div
                          className="text-gray-600 leading-relaxed mb-4 line-clamp-3"
                          dangerouslySetInnerHTML={{
                            __html:
                              material.description.substring(0, 150) + '...',
                          }}
                        />
                        <div className="flex items-center gap-6 text-sm text-gray-600">
                          <div className="flex items-center gap-2">
                            <Clock className="w-4 h-4 text-pink-600" />
                            <span className="font-medium">15 menit</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Video className="w-4 h-4 text-pink-600" />
                            <span className="font-medium">Video</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex-shrink-0">
                        <div className="w-6 h-6 rounded-full border-2 border-pink-300 group-hover:border-pink-500 transition-colors flex items-center justify-center">
                          <div className="w-2 h-2 bg-pink-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              {!isAuthenticated && materials.length > 3 && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                  className="mt-8"
                >
                  <div className="bg-pink-50 rounded-3xl p-10 text-center border-2 border-dashed border-pink-300 shadow-lg">
                    <div className="w-20 h-20 bg-pink-500 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-lg text-white">
                      <Lock size={40} />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-4">
                      Masih Ada {materials.length - 3} Materi Lagi!
                    </h3>
                    <p className="text-gray-600 mb-8 max-w-md mx-auto text-lg">
                      Daftar atau login sekarang untuk mengakses semua materi
                      kursus dan mulai belajar.
                    </p>
                    <motion.button
                      whileHover={{ scale: 1.05, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => openModal('LOGIN')}
                      className="bg-pink-600 hover:bg-pink-700 text-white font-bold px-10 py-4 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 inline-flex items-center gap-3"
                    >
                      <ArrowRight size={20} />
                      Login atau Daftar Gratis
                    </motion.button>
                  </div>
                </motion.div>
              )}
            </motion.div>

            {/* Reviews */}
            <CourseReviews courseSlug={courseSlug} />
          </div>

          {/* Sidebar Card */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-xl border border-pink-100 overflow-hidden sticky top-8"
            >
              <div className="relative">
                <img
                  src={course.thumbnail}
                  alt={course.title}
                  className="w-full h-56 object-cover"
                />
                <div className="absolute top-4 right-4">
                  <div className="bg-white/95 backdrop-blur-sm rounded-2xl px-4 py-2 shadow-lg">
                    <span className="text-pink-600 font-bold text-xl">
                      GRATIS
                    </span>
                  </div>
                </div>
              </div>

              <div className="p-8">
                <div className="flex items-center justify-between mb-8">
                  <div className="flex items-center text-pink-500">
                    <div className="flex gap-1">
                      {[...Array(5)].map((_, i) => (
                        <span key={i} className="text-pink-500 text-lg">
                          ⭐
                        </span>
                      ))}
                    </div>
                    <span className="ml-2 font-bold text-gray-800 text-lg">
                      4.8
                    </span>
                  </div>
                  <div className="text-gray-600 font-semibold">
                    {materials?.length || 0} Materi
                  </div>
                </div>

                {isAuthenticated ? (
                  <motion.button
                    whileHover={{ scale: 1.02, y: -2 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleEnrollClick}
                    disabled={isEnrolling}
                    className="w-full bg-pink-600 hover:bg-pink-700 text-white font-bold py-4 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3"
                  >
                    {isEnrolling ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        Mendaftarkan...
                      </>
                    ) : (
                      <>
                        <Plus size={20} />
                        Daftar ke Kursus Ini
                      </>
                    )}
                  </motion.button>
                ) : (
                  <motion.button
                    whileHover={{ scale: 1.02, y: -2 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => openModal('LOGIN')}
                    className="w-full bg-pink-600 hover:bg-pink-700 text-white font-bold py-4 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-3"
                  >
                    <ArrowRight size={20} />
                    Login untuk Mendaftar
                  </motion.button>
                )}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseDetailPage;
