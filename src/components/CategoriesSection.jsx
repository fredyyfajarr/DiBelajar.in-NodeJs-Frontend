/* eslint-disable no-unused-vars */
import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useCategories } from '/src/hooks/useCategories.js';
import {
  Laptop,
  Palette,
  TrendingUp,
  BarChart,
  Code,
  Layers,
  Briefcase,
  Zap,
  Theater,
  DollarSign,
  BookOpen,
  Cpu,
  LaptopMinimal, // kalau mau pakai ikon laptop
} from "lucide-react";


// Helper function untuk mendapatkan icon berdasarkan nama kategori
const getCategoryIcon = (name) => {
  const iconMap = { 
    'Web Development': <Laptop className="w-10 h-10 text-white" />,
    'Design': <Palette className="w-10 h-10 text-white" />,
    'Digital Marketing': <TrendingUp className="w-10 h-10 text-white" />,
    'Data Science': <BarChart className="w-10 h-10 text-white" />,
    'Programming': <Code className="w-10 h-10 text-white" />,
    'UI/UX': <Layers className="w-10 h-10 text-white" />,
    'Marketing': <TrendingUp className="w-10 h-10 text-white" />,
    'Data': <BarChart className="w-10 h-10 text-white" />,
    'Business': <Briefcase className="w-10 h-10 text-white" />,
    'Technology': <Zap className="w-10 h-10 text-white" />,
    'Creative': <Theater className="w-10 h-10 text-white" />,
    'Finance': <DollarSign className="w-10 h-10 text-white" />,
  };
  return iconMap[name] || <BookOpen className="w-10 h-10 text-white" />;
};


// Helper function untuk mendapatkan gradient berdasarkan index
const getCategoryGradient = (index) => {
  const gradients = [
    { gradient: 'from-purple-500 to-indigo-600', bgGradient: 'from-purple-50 to-indigo-50' },
    { gradient: 'from-pink-500 to-rose-600', bgGradient: 'from-pink-50 to-pink-50' },
    { gradient: 'from-purple-600 to-pink-600', bgGradient: 'from-purple-50 to-pink-50' },
    { gradient: 'from-indigo-500 to-purple-600', bgGradient: 'from-indigo-50 to-purple-50' },
    { gradient: 'from-emerald-500 to-teal-600', bgGradient: 'from-emerald-50 to-teal-50' },
    { gradient: 'from-orange-500 to-red-600', bgGradient: 'from-orange-50 to-red-50' },
    { gradient: 'from-blue-500 to-cyan-600', bgGradient: 'from-blue-50 to-cyan-50' },
    { gradient: 'from-yellow-500 to-orange-600', bgGradient: 'from-yellow-50 to-orange-50' }
  ];
  return gradients[index % gradients.length];
};

const CategoriesSection = () => {
  const { data: categories = [], isLoading } = useCategories();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { 
        staggerChildren: 0.15,
        delayChildren: 0.2
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 50, scale: 0.8 },
    visible: { 
      opacity: 1, 
      y: 0, 
      scale: 1,
      transition: {
        duration: 0.6,
        type: "spring",
        stiffness: 100,
        damping: 12
      }
    },
  };

  if (isLoading) {
    return (
      <div className="relative py-24 overflow-hidden">
        <div className="container mx-auto px-6 relative z-10">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-6xl font-bold mb-6">
              <span className="bg-gradient-to-r from-purple-600 via-pink-600 to-purple-800 bg-clip-text text-transparent">
                Kategori
              </span>
              <br />
              <span className="text-gray-700">Populer</span>
          </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Memuat kategori...
          </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative py-24 overflow-hidden">
      {/* Background dengan gradient dan pattern */}
      <div className="absolute inset-0 bg-transparent"></div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Header Section dengan animasi */}
        <motion.div 
          className="text-center mb-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <motion.h2 
            className="text-4xl md:text-6xl font-bold mb-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1 }}
          >
            <span className="bg-gradient-to-r from-purple-600 via-pink-600 to-purple-800 bg-clip-text text-transparent">
              Kategori
            </span>
            <br />
            <span className="text-gray-700">Populer</span>
          </motion.h2>
          
          <motion.div 
            className="w-24 h-1 bg-gradient-to-r from-purple-500 to-pink-500 mx-auto mb-8 rounded-full"
            initial={{ width: 0 }}
            whileInView={{ width: 96 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.5 }}
          ></motion.div>
          
          <motion.p 
            className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            Temukan bidang yang sesuai dengan passion Anda dan mulai perjalanan pembelajaran yang menginspirasi
          </motion.p>
        </motion.div>

        {/* Categories Grid */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {categories.slice(0, 4).map((category, index) => {
            const { gradient, bgGradient } = getCategoryGradient(index);
            const icon = getCategoryIcon(category.name);
            
            return (
            <motion.div
              key={category._id}
              variants={cardVariants}
              whileHover={{
                  y: -12,
                  scale: 1.05,
                  transition: { 
                    duration: 0.3, 
                    type: "spring", 
                    stiffness: 300 
                  }
                }}
                whileTap={{ scale: 0.98 }}
                className="group cursor-pointer"
              >
                <Link to={`/courses?category=${category.slug}`} className="block h-full">
                  <div className={`relative h-full bg-gradient-to-br ${bgGradient} p-8 rounded-3xl border border-white/50 shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden`}>
                    {/* Glow effect */}
                    <div className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}></div>
                    
                    {/* Shimmer effect */}
                    <div className="absolute inset-0 -top-2 -left-2 bg-gradient-to-r from-transparent via-white/30 to-transparent transform -skew-x-12 opacity-0 group-hover:opacity-100 group-hover:animate-shimmer transition-opacity duration-700"></div>
                    
                    {/* Content */}
                    <div className="relative z-10 text-center">
                      {/* Icon container dengan floating animation */}
                      <motion.div 
                        className={`inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br ${gradient} rounded-2xl shadow-lg mb-6 group-hover:shadow-xl transition-shadow duration-300`}
                        whileHover={{ 
                          rotate: [0, -10, 10, 0],
                          transition: { duration: 0.5 }
                        }}
                      >
                        <span className="text-3xl filter drop-shadow-sm">
                          {icon}
                        </span>
                      </motion.div>
                      
                      {/* Category name */}
                      <h3 className="text-xl font-bold text-gray-800 mb-2 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-purple-600 group-hover:to-pink-600 transition-all duration-300">
                        {category.name}
                      </h3>
                      
                      {/* Subtitle */}
                      <p className="text-sm text-gray-600 opacity-80 group-hover:opacity-100 transition-opacity duration-300">
                        Pelajari skill terdepan
                      </p>
                      
                      {/* Arrow indicator */}
                      <motion.div 
                        className="mt-4 flex justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                        initial={{ x: -10 }}
                        whileHover={{ x: 0 }}
                      >
                        <div className={`p-2 bg-gradient-to-r ${gradient} rounded-full`}>
                          <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                          </svg>
                        </div>
                      </motion.div>
                    </div>
                    
                    {/* Decorative elements */}
                    <div className="absolute top-4 right-4 w-12 h-12 bg-white/20 rounded-full opacity-50"></div>
                    <div className="absolute bottom-4 left-4 w-8 h-8 bg-white/10 rounded-full opacity-30"></div>
                </div>
              </Link>
            </motion.div>
            );
          })}
        </motion.div>

        {/* Bottom CTA */}
        <motion.div 
          className="text-center mt-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          <p className="text-gray-600 mb-6">
            Tidak menemukan kategori yang Anda cari?
          </p>
          <Link 
            to="/courses" 
            className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold rounded-full hover:from-purple-700 hover:to-pink-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
          >
            Jelajahi Semua Kursus
            <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </Link>
        </motion.div>
      </div>

      <style>{`
        @keyframes shimmer {
          0% { transform: translateX(-100%) skewX(-12deg); }
          100% { transform: translateX(200%) skewX(-12deg); }
        }
        
        .animate-shimmer {
          animation: shimmer 1.5s ease-out;
        }
      `}</style>
    </div>
  );
};

export default CategoriesSection;
