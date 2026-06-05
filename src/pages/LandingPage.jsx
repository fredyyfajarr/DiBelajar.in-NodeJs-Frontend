 
import React from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';

// Ganti dua hook lama dengan satu hook yang sudah disempurnakan
import { useCourses } from '/src/hooks/useCourses.js';

import CourseCard from '/src/components/CourseCard.jsx';
import HeroSection from '/src/components/HeroSection.jsx';
import FeaturesSection from '/src/components/FeaturesSection.jsx';
import CategoriesSection from '../components/CategoriesSection';
import TestimonialsSection from '../components/TestimonialsSection';
import CTASection from '../components/CTASection';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const LandingPage = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q');

  // --- PERUBAHAN UTAMA PADA CARA MENGAMBIL DATA ---
  // Gunakan satu hook 'useCourses' dan berikan parameter 'limit' untuk membatasi jumlah
  const { data: response, isLoading } = useCourses({
    limit: 8, // Hanya tampilkan maksimal 8 kursus
    keyword: query, // Tetap dukung fungsionalitas pencarian
  });

  // Sesuaikan cara mengekstrak data kursus dari respons API
  const courses = response?.data || [];
  // ---------------------------------------------

  const renderTitle = () => {
    if (query) {
      return (
        <h2 className="text-3xl font-bold mb-8">
          Hasil pencarian untuk: <span className="text-primary">"{query}"</span>
        </h2>
      );
    }
    return (
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-800">
            <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              Kursus Populer
            </span>
            {' '}
            Pilihan
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-purple-500 to-pink-500 mx-auto mt-4 rounded-full"></div>
        </div>
      );
  };

  const renderContent = () => {
    // Tampilkan loading state jika data belum ada sama sekali
    if (isLoading && courses.length === 0) {
      return <p className="text-center text-text-muted">Memuat kursus...</p>;
    }
    if (courses.length === 0) {
      return (
        <p className="text-center text-text-muted">
          Tidak ada hasil yang ditemukan.
        </p>
      );
    }
    return (
      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {courses.map((course) => (
          <CourseCard key={course._id} course={course} />
        ))}
      </motion.div>
    );
  };

  return (
    <>
      <HeroSection />
      <FeaturesSection />

      <div
        id="popular-courses"
        className="container mx-auto px-4 sm:px-6 py-12"
      >
        {renderTitle()}
        {renderContent()}

        {/* --- TOMBOL BARU UNTUK MELIHAT SEMUA KURSUS --- */}
        {/* Tampilkan tombol ini hanya jika bukan halaman hasil pencarian */}
        {!query && courses.length > 0 && (
          <div className="text-center mt-12">
            <Link
              to="/courses"
              className="bg-primary text-white font-semibold py-3 px-8 rounded-lg shadow-lg hover:scale-105 transform transition-transform duration-300"
            >
              Lihat Semua Kursus
            </Link>
          </div>
        )}
        {/* ------------------------------------------- */}
      </div>

      <CategoriesSection />
      <TestimonialsSection />
      <CTASection />
    </>
  );
};

export default LandingPage;
