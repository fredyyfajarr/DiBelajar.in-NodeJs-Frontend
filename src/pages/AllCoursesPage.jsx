// src/pages/AllCoursesPage.jsx

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useCourses } from '/src/hooks/useCourses.js';
import { useCategories } from '/src/hooks/useCategories.js';
import { useSearchParams } from 'react-router-dom';
import CourseCard from '/src/components/CourseCard.jsx';
import Pagination from '/src/components/Pagination.jsx';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const AllCoursesPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { data: categories = [] } = useCategories();

  const [page, setPage] = useState(parseInt(searchParams.get('page') || '1'));
  const [category, setCategory] = useState(searchParams.get('category') || '');

  const coursesPerPage = 12; // Increased for full layout

  const { data: response, isLoading } = useCourses({
    page,
    limit: coursesPerPage,
    category: category,
  });

  useEffect(() => {
    const params = {};
    if (category) params.category = category;
    if (page > 1) params.page = page;
    setSearchParams(params, { replace: true });
  }, [category, page, setSearchParams]);

  const handleCategoryChange = (newCategorySlug) => {
    setCategory(newCategorySlug);
    setPage(1);
  };

  const courses = response?.data || [];
  const totalPages = Math.ceil((response?.total || 0) / coursesPerPage);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1, 
      transition: { 
        staggerChildren: 0.06,
        delayChildren: 0.1 
      } 
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.95 },
    visible: { 
      opacity: 1, 
      y: 0, 
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 120,
        damping: 15
      }
    },
  };

  const headerVariants = {
    hidden: { opacity: 0, y: -30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut"
      }
    },
  };

  const categoryVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    },
  };

      const renderSkeletonCards = () => (
      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {Array(coursesPerPage)
          .fill()
          .map((_, index) => (
            <motion.div key={index} variants={cardVariants} className="group">
              <div className="bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100">
                <Skeleton height={200} className="rounded-t-3xl" />
                <div className="p-6 space-y-3">
                  <Skeleton height={24} width="80%" className="rounded-lg" />
                  <Skeleton height={16} width="60%" className="rounded-lg" />
                  <Skeleton height={20} width="40%" className="rounded-lg" />
                </div>
              </div>
            </motion.div>
          ))}
      </motion.div>
    );

    const renderCourses = () => (
      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {courses.map((course, index) => (
          <motion.div 
            key={course._id} 
            variants={cardVariants}
            custom={index}
            className="group"
          >
            <CourseCard course={course} />
          </motion.div>
        ))}
      </motion.div>
    );

    const renderEmptyState = () => (
      <motion.div
        className="text-center py-20"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="bg-white/80 backdrop-blur-xl rounded-3xl p-12 border border-purple-100 shadow-2xl max-w-2xl mx-auto">
          <motion.div
            className="w-24 h-24 mx-auto mb-8 bg-gradient-to-r from-purple-100 to-pink-100 rounded-full flex items-center justify-center"
            animate={{ 
              scale: [1, 1.1, 1],
              rotate: [0, 5, -5, 0]
            }}
            transition={{ 
              duration: 2, 
              repeat: Infinity, 
              ease: "easeInOut" 
            }}
          >
            <svg className="w-12 h-12 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
          </motion.div>
          
          <h3 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-4">
            Belum Ada Kursus
          </h3>
          
          <p className="text-gray-600 text-lg mb-8 leading-relaxed">
            {category 
              ? `Maaf, belum ada kursus yang tersedia untuk kategori "${categories.find(cat => cat.slug === category)?.name || category}" saat ini.`
              : "Maaf, belum ada kursus yang tersedia saat ini. Silakan coba lagi nanti atau pilih kategori lain."
            }
          </p>
          
          <motion.button
            onClick={() => handleCategoryChange('')}
            className="inline-flex items-center gap-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white px-8 py-4 rounded-2xl font-bold text-lg hover:from-purple-600 hover:to-pink-600 transition-all duration-300 shadow-lg hover:shadow-xl"
            whileHover={{ y: -2, scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
            Lihat Semua Kursus
          </motion.button>
        </div>
      </motion.div>
    );


  const renderContent = () => {
    if (isLoading && courses.length === 0) {
      return renderSkeletonCards();
    }
    if (courses.length === 0) {
      return renderEmptyState();
    }
    return renderCourses();
  };

  return (
    <div className="min-h-screen w-full bg-transparent relative overflow-x-hidden">
      {/* Full Screen Background Decorations */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Floating Elements */}
        <motion.div
          className="absolute top-40 right-20 w-4 h-4 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full opacity-60"
          animate={{ y: [0, -20, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        ></motion.div>
        <motion.div
          className="absolute bottom-60 left-32 w-6 h-6 bg-gradient-to-r from-pink-400 to-purple-300 rounded-full opacity-40"
          animate={{ y: [0, -30, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        ></motion.div>
      </div>

      <div className="relative w-full px-6 lg:px-12 xl:px-16 2xl:px-20 py-12">
        {/* Full Width Header Section */}
        <motion.div 
          className="text-center mb-16 max-w-7xl mx-auto"
          variants={headerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div
            className="inline-flex items-center gap-3 bg-white/90 backdrop-blur-md px-6 py-3 rounded-full border border-purple-100 shadow-lg mb-8"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <div className="w-3 h-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full animate-pulse"></div>
            <span className="text-sm font-semibold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              Eksplorasi Pembelajaran Terbaik
            </span>
          </motion.div>

          <h1 className="text-6xl sm:text-7xl lg:text-8xl xl:text-9xl font-black bg-gradient-to-r from-purple-600 via-pink-500 to-purple-700 bg-clip-text text-transparent mb-8 leading-tight tracking-tight">
            Semua Kursus
            <br />
            <span className="bg-gradient-to-r from-pink-500 via-purple-500 to-pink-600 bg-clip-text text-transparent">
              Premium
            </span>
          </h1>
          
          <motion.p 
            className="text-xl lg:text-2xl text-gray-700 max-w-4xl mx-auto leading-relaxed"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            Temukan ribuan kursus berkualitas tinggi dari berbagai kategori yang dirancang khusus untuk mengembangkan potensi terbaik Anda
          </motion.p>
        </motion.div>

        {/* Full Width Category Filter Section */}
        <motion.div 
          className="mb-16 max-w-7xl mx-auto"
          variants={categoryVariants}
          initial="hidden"
          animate="visible"
        >
          <div className="bg-white/80 backdrop-blur-xl rounded-3xl p-8 lg:p-12 border border-purple-100 shadow-2xl">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-2">
                Filter Kategori
              </h3>
              <p className="text-gray-600">Pilih kategori yang sesuai dengan minat Anda</p>
            </div>
            
            <div className="flex flex-wrap justify-center gap-4">
              <motion.button
                onClick={() => handleCategoryChange('')}
                className={`px-8 py-4 font-bold text-lg rounded-2xl transition-all duration-300 transform hover:scale-105 ${
                  category === ''
                    ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-2xl shadow-purple-200'
                    : 'bg-white/80 text-gray-700 hover:bg-gradient-to-r hover:from-purple-50 hover:to-pink-50 border-2 border-purple-100 hover:border-purple-300'
                }`}
                whileHover={{ y: -3 }}
                whileTap={{ scale: 0.97 }}
              >
                <span className="flex items-center gap-3">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                  </svg>
                  Semua Kategori
                </span>
              </motion.button>
              
              {categories.map((cat, index) => (
                <motion.button
                  key={cat._id}
                  onClick={() => handleCategoryChange(cat.slug)}
                  className={`px-8 py-4 font-bold text-lg rounded-2xl transition-all duration-300 transform hover:scale-105 ${
                    category === cat.slug
                      ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-2xl shadow-purple-200'
                      : 'bg-white/80 text-gray-700 hover:bg-gradient-to-r hover:from-purple-50 hover:to-pink-50 border-2 border-purple-100 hover:border-purple-300'
                  }`}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  whileHover={{ y: -3 }}
                  whileTap={{ scale: 0.97 }}
                >
                  {cat.name}
                </motion.button>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Full Width Content Section */}
        <div className="mb-20 max-w-7xl mx-auto">
          {renderContent()}
        </div>

        {/* Full Width Pagination Section */}
        {totalPages > 1 && (
          <motion.div 
            className="flex justify-center max-w-7xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <div className="bg-white/90 backdrop-blur-xl rounded-3xl p-6 border border-purple-100 shadow-2xl">
              <Pagination
                currentPage={page}
                totalPages={totalPages}
                onPageChange={(newPage) => setPage(newPage)}
              />
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default AllCoursesPage;