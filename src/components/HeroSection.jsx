/* eslint-disable no-unused-vars */
import React from 'react';
import { motion } from 'framer-motion';
import useModalStore from '/src/store/modalStore';
import useAuthStore from '/src/store/authStore.js';

const HeroSection = () => {
  const { openModal } = useModalStore();
  const { isAuthenticated } = useAuthStore();
  const title = 'Platform Belajarnya Generasi Z';
  const words = title.split(' ');

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const wordVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  const buttonVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { delay: 0.5, duration: 0.6 } },
  };

  const floatingElements = [
    { size: 'w-20 h-20', position: 'top-10 left-10', delay: 0 },
    { size: 'w-16 h-16', position: 'top-1/4 right-16', delay: 1 },
    { size: 'w-12 h-12', position: 'bottom-20 left-1/4', delay: 2 },
    { size: 'w-14 h-14', position: 'bottom-32 right-20', delay: 1.5 },
  ];

  return (
    <div className="relative min-h-[80vh] overflow-hidden bg-transparent">
      {/* Animated Background Pattern */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute inset-0 bg-transparent"></div>
        <svg className="absolute inset-0 w-full h-full" viewBox="0 0 1000 1000" preserveAspectRatio="xMidYMid slice">
          <defs>
            <radialGradient id="grad1" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#8B5CF6" stopOpacity="0.1"/>
              <stop offset="100%" stopColor="#EC4899" stopOpacity="0.05"/>
            </radialGradient>
          </defs>
          <circle cx="200" cy="200" r="150" fill="url(#grad1)"/>
          <circle cx="800" cy="300" r="120" fill="url(#grad1)"/>
          <circle cx="600" cy="700" r="100" fill="url(#grad1)"/>
        </svg>
      </div>

      {/* Floating Elements */}
      {floatingElements.map((el, index) => (
        <motion.div
          key={index}
          className={`absolute ${el.size} ${el.position} bg-gradient-to-br from-purple-400/20 to-pink-400/20 rounded-full blur-sm`}
          animate={{
            y: [0, -20, 0],
            rotate: [0, 180, 360],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            delay: el.delay,
            ease: "easeInOut"
          }}
        />
      ))}

      {/* Main Content */}
      <div className="relative z-10 container mx-auto px-4 sm:px-6 flex items-center justify-center min-h-[80vh]">
        <div className="text-center max-w-5xl">
          {/* Main Title */}
          <motion.h1
            className="text-5xl md:text-7xl lg:text-8xl section-heading mb-8"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {words.map((word, index) => (
              <motion.span
                key={index}
                variants={wordVariants}
                className={`inline-block mr-3 ${
                  index % 2 === 0 
                    ? 'gradient-text' 
                    : 'text-gray-800'
                }`}
              >
                {word}
              </motion.span>
            ))}
          </motion.h1>

          {/* Subtitle */}
          <motion.div
            className="mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
          >
            <p className="text-xl md:text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed font-medium">
              Akses ribuan kursus gratis dari para ahli dan tingkatkan karir Anda
              dengan fleksibilitas penuh.
            </p>
            <div className="w-24 h-1 bg-gradient-to-r from-purple-500 to-pink-500 mx-auto mt-6 rounded-full"></div>
          </motion.div>

          {/* Conditional CTA Button Section */}
          <motion.div
            variants={buttonVariants}
            initial="hidden"
            animate="visible"
            className="space-y-4"
          >
            {isAuthenticated ? (
              // Jika pengguna sudah login
              <motion.a
                href="/courses" // Mengarahkan ke halaman kursus
                className="group relative inline-flex items-center justify-center px-8 py-4 text-lg font-bold text-white bg-gradient-to-r from-purple-600 to-pink-600 rounded-full shadow-2xl hover:shadow-purple-500/25 transition-all duration-300 transform hover:scale-105"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-purple-600 to-pink-600 rounded-full blur opacity-30 group-hover:opacity-50 transition-opacity duration-300"></span>
                <span className="relative">
                  Jelajahi Kursus Populer
                </span>
                 <motion.span
                  className="ml-2"
                  animate={{ x: [0, 5, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  →
                </motion.span>
              </motion.a>
            ) : (
              // Jika pengguna belum login
              <>
                <motion.button
                  onClick={() => openModal('REGISTER')}
                  className="group relative inline-flex items-center justify-center px-8 py-4 text-lg font-bold text-white bg-gradient-to-r from-purple-600 to-pink-600 rounded-full shadow-2xl hover:shadow-purple-500/25 transition-all duration-300 transform hover:scale-105"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-purple-600 to-pink-600 rounded-full blur opacity-30 group-hover:opacity-50 transition-opacity duration-300"></span>
                  <span className="relative">
                    Mulai Belajar Sekarang
                  </span>
                  <motion.span
                    className="ml-2"
                    animate={{ x: [0, 5, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    →
                  </motion.span>
                </motion.button>
                <motion.p
                  className="text-sm text-gray-500"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2, duration: 0.5 }}
                >
                  Gratis untuk memulai • Tidak perlu kartu kredit
                </motion.p>
              </>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
