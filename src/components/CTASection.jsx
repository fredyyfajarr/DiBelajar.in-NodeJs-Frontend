/* eslint-disable no-unused-vars */
import React from 'react';
import { motion } from 'framer-motion';
import { Heart, Star, Zap, ArrowRight } from 'lucide-react';

// Impor dari versi kolaborator untuk state management
import useModalStore from '/src/store/modalStore';
import useAuthStore from '/src/store/authStore.js';

const CTASection = () => {
  // Menggunakan state management asli, bukan mock function lagi
  const { openModal } = useModalStore();
  const { isAuthenticated } = useAuthStore();

  // Semua variant animasi dari versi Anda dipertahankan
  const buttonVariants = {
    hover: { 
      scale: 1.05,
      y: -2,
      boxShadow: "0 20px 40px rgba(236, 72, 153, 0.3)",
      transition: { duration: 0.3 } 
    },
    tap: { scale: 0.95 },
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15, duration: 0.8 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20, scale: 0.95 },
    visible: { 
      opacity: 1, 
      y: 0,
      scale: 1,
      transition: { duration: 0.6, ease: "easeOut", type: "spring", stiffness: 100 }
    }
  };

  const floatingVariants = {
    animate: {
      y: [0, -8, 0],
      rotate: [0, 3, -3, 0],
      transition: { duration: 4, repeat: Infinity, ease: "easeInOut" }
    }
  };

  const features = [
    { icon: Heart, text: "Pembelajaran dengan Love", color: "text-pink-500" },
    { icon: Star, text: "Kualitas Premium", color: "text-purple-500" },
    { icon: Zap, text: "Progress Cepat", color: "text-pink-400" }
  ];

  const iconPaths = [
  "/icons/MongoDB.svg",
  "/icons/Express.svg",
  "/icons/React.svg",
  "/icons/Node.js.svg",
  ];

  return (
    // Seluruh struktur visual dan layout dari versi Anda dipertahankan
    <div className="relative py-20 lg:py-28 overflow-hidden">
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-10 left-10 w-32 h-32 bg-pink-300 rounded-full blur-3xl"></div>
        <div className="absolute top-32 right-20 w-48 h-48 bg-purple-300 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 left-1/3 w-40 h-40 bg-pink-200 rounded-full blur-3xl"></div>
      </div>
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={i}
            className={`absolute w-3 h-3 rounded-full ${i % 3 === 0 ? 'bg-pink-300' : i % 3 === 1 ? 'bg-purple-300' : 'bg-white'} opacity-60`}
            style={{ left: `${Math.random() * 100}%`, top: `${Math.random() * 100}%`}}
            animate={{ scale: [1, 1.3, 1], opacity: [0.4, 0.8, 0.4], y: [0, -20, 0]}}
            transition={{ duration: 3 + Math.random() * 2, repeat: Infinity, delay: Math.random() * 2 }}
          />
        ))}
      </div>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="text-center max-w-4xl mx-auto"
        >
          <motion.div
            variants={floatingVariants}
            animate="animate"
            className="inline-flex items-center gap-2 bg-gradient-to-r from-pink-100 to-purple-100 backdrop-blur-sm border border-pink-200 rounded-full px-6 py-3 mb-8 shadow-lg"
          >
            <Heart className="w-5 h-5 text-pink-500" />
            <span className="text-pink-700 font-medium text-sm">Bergabung dengan Keluarga Besar Kami</span>
          </motion.div>
          <motion.h2 variants={itemVariants} className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
            <span className="bg-gradient-to-r from-pink-500 via-purple-500 to-pink-400 bg-clip-text text-transparent">
              Wujudkan Impianmu
            </span>
            <br />
            <span className="text-gray-800">Bersama Kami</span>
          </motion.h2>

          {/* Subtitle dinamis berdasarkan status login dari kolaborator */}
          <motion.p variants={itemVariants} className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto mb-10 leading-relaxed">
            {isAuthenticated
              ? 'Lanjutkan perjalanan belajarmu dan jelajahi lebih banyak kursus inspiratif lainnya!'
              : 'Mulai perjalanan belajarmu hari ini dan rasakan pengalaman pembelajaran yang penuh inspirasi dan menyenangkan!'}
          </motion.p>
          
          <motion.div variants={itemVariants} className="flex flex-col sm:flex-row justify-center items-center gap-6 sm:gap-8 mb-12">
            {features.map((feature, index) => (
              <motion.div key={index} whileHover={{ scale: 1.05, y: -2 }} className="flex items-center gap-3 bg-white/80 backdrop-blur-sm rounded-2xl px-6 py-4 shadow-lg border border-pink-100">
                <div className="p-2 bg-gradient-to-r from-pink-100 to-purple-100 rounded-xl">
                  <feature.icon className={`w-5 h-5 ${feature.color}`} />
                </div>
                <span className="text-gray-700 font-medium">{feature.text}</span>
              </motion.div>
            ))}
          </motion.div>

          {/* Tombol CTA dinamis berdasarkan status login */}
          <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center items-center mb-12">
            {isAuthenticated ? (
              // Jika sudah login, tampilkan satu tombol utama
              <motion.button
                variants={buttonVariants}
                whileHover="hover"
                whileTap="tap"
                onClick={() => { /* Logika untuk redirect ke halaman kursus */ window.location.href = '/courses'; }}
                className="group relative bg-gradient-to-r from-pink-500 to-purple-500 text-white font-bold py-4 px-8 sm:px-12 rounded-2xl shadow-xl overflow-hidden min-w-[220px] sm:min-w-[260px]"
              >
                <span className="relative z-10 flex items-center justify-center gap-2 text-lg">
                  Jelajahi Kursus
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-pink-400 to-purple-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </motion.button>
            ) : (
              // Jika belum login, tampilkan tombol Daftar dan Login
              <>
                <motion.button
                  variants={buttonVariants}
                  whileHover="hover"
                  whileTap="tap"
                  onClick={() => openModal('REGISTER')}
                  className="group relative bg-gradient-to-r from-pink-500 to-purple-500 text-white font-bold py-4 px-8 sm:px-12 rounded-2xl shadow-xl overflow-hidden min-w-[220px] sm:min-w-[260px]"
                >
                  <span className="relative z-10 flex items-center justify-center gap-2 text-lg">
                    Daftar Gratis Sekarang
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-pink-400 to-purple-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.02, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => openModal('LOGIN')}
                  className="group bg-white/80 backdrop-blur-sm border-2 border-pink-200 text-gray-700 font-semibold py-4 px-8 sm:px-12 rounded-2xl hover:bg-white hover:border-pink-300 transition-all duration-300 min-w-[220px] sm:min-w-[260px] shadow-lg"
                >
                  <span className="text-lg">Sudah Punya Akun?</span>
                </motion.button>
              </>
            )}
          </motion.div>

          {/* Bagian Trust Elements dipertahankan */}
         <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row justify-center items-center gap-6 sm:gap-12"
          >
            <div className="flex items-center gap-3 sm:flex-row flex-col sm:items-center">
              <div className="flex -space-x-2">
                {iconPaths.map((src, i) => (
                  <motion.img
                    key={i}
                    src={src}
                    alt={`icon-${i}`}
                    className="w-12 h-12 px-2"
                    whileHover={{ scale: 1.2, zIndex: 10 }}
                  />
                ))}
              </div>
              <div className="text-left mt-2 sm:mt-0">
                <div className="text-sm md:font-semibold text-center font-black text-gray-700">Build With MERN STACK</div>
                <div className="text-xs text-gray-500">Di Buat dengan Tech Stack Masa Kini</div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex text-pink-400">
                {[...Array(5)].map((_, i) => (
                  <motion.span key={i} initial={{ opacity: 0, scale: 0 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: i * 0.1 }} className="text-lg">
                    ★
                  </motion.span>
                ))}
              </div>
              <div className="text-left">
                <div className="text-sm font-semibold text-gray-700">Rating 4.9/5</div>
                <div className="text-xs text-gray-500">Dari 10K+ review</div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="p-2 bg-gradient-to-r from-pink-100 to-purple-100 rounded-xl">
                <Zap className="w-5 h-5 text-purple-500" />
              </div>
              <div className="text-left">
                <div className="text-sm font-semibold text-gray-700">100% Gratis</div>
                <div className="text-xs text-gray-500">Tidak ada biaya tersembunyi</div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default CTASection;
