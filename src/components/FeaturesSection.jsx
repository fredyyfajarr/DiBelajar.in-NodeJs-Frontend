/* eslint-disable no-unused-vars */
import React from 'react';
import { motion } from 'framer-motion';
import { Users, BookOpen, Heart } from 'lucide-react';
// import { ReactComponent as ExpertIcon } from '/src/assets/icons/expert.svg';

const features = [
  {
    icon: <Users className="w-10 h-10" />,
    title: 'Instruktur Ahli',
    description: 'Belajar dari praktisi terbaik di industrinya.',
    gradient: 'from-purple-500 to-purple-600',
    bgGradient: 'from-purple-50 to-purple-100',
  },
  {
    icon: <BookOpen className="w-10 h-10" />,
    title: 'Pembelajaran Fleksibel',
    description: 'Akses materi kapan saja sesuai kecepatan Anda.',
    gradient: 'from-pink-500 to-rose-500',
    bgGradient: 'from-pink-50 to-pink-100',
  },
  {
    icon: <Heart className="w-10 h-10" />,
    title: 'Gratis Selamanya',
    description: '100% gratis tanpa biaya tersembunyi.',
    gradient: 'from-purple-600 to-pink-600',
    bgGradient: 'from-purple-50 to-pink-50',
  },
];

const FeaturesSection = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  const titleVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  return (
    <div className="relative py-24 bg-transparent overflow-hidden">
      {/* Background Decorations */}
      <div className="absolute inset-0 opacity-40">
        <div className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-br from-purple-300/30 to-pink-300/30 rounded-full blur-xl"></div>
        <div className="absolute bottom-20 right-10 w-40 h-40 bg-gradient-to-br from-pink-300/30 to-purple-300/30 rounded-full blur-xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-60 h-60 bg-gradient-to-br from-purple-200/20 to-pink-200/20 rounded-full blur-2xl"></div>
      </div>

      <div className="relative z-10 container mx-auto px-4 sm:px-6">
        <motion.div
          className="text-center mb-20"
          variants={titleVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <motion.h2 
            className="text-4xl md:text-6xl font-bold mb-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              Mengapa Memilih
            </span>
            <br />
            <span className="text-gray-800">DiBelajar.in?</span>
          </motion.h2>
          <motion.p 
            className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            Platform terbaik untuk meningkatkan skill Anda dengan cara yang
            sederhana dan menyenangkan.
          </motion.p>
          <motion.div
            className="w-24 h-1 bg-gradient-to-r from-purple-500 to-pink-500 mx-auto mt-8 rounded-full"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
          ></motion.div>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              variants={cardVariants}
              whileHover={{ 
                y: -15,
                transition: { duration: 0.4, ease: "easeOut" } 
              }}
              className="group relative h-full"
            >
              {/* Animated Background Gradient */}
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-white to-gray-50 shadow-2xl group-hover:shadow-purple-500/25 transition-all duration-500"></div>
              
              {/* Glowing Border Effect */}
              <div className={`absolute -inset-0.5 bg-gradient-to-br ${feature.gradient} rounded-3xl opacity-0 group-hover:opacity-100 transition-all duration-500 blur-sm`}></div>
              
              {/* Inner Glow */}
              <div className="absolute inset-1 rounded-3xl bg-white shadow-inner"></div>
              
              {/* Main Content */}
              <div className="relative z-20 p-10 h-full flex flex-col items-center text-center">
                {/* Floating Icon with Complex Animation */}
                <motion.div
                  className="relative mb-8"
                  animate={{
                    y: [0, -8, 0],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: index * 0.5
                  }}
                >
                  {/* Icon Glow Background */}
                  <div className={`absolute inset-0 w-20 h-20 bg-gradient-to-br ${feature.gradient} rounded-full opacity-20 blur-xl group-hover:opacity-40 transition-opacity duration-300`}></div>
                  
                  {/* Icon Container */}
                  <motion.div
                    className={`relative w-20 h-20 rounded-2xl bg-gradient-to-br ${feature.bgGradient} flex items-center justify-center border border-white shadow-lg group-hover:scale-110 group-hover:rotate-3 transition-all duration-300`}
                    whileHover={{ 
                      boxShadow: "0 20px 40px rgba(139, 92, 246, 0.3)",
                    }}
                  >
                    <div className={`text-gray-700`}>
                     {feature.icon}
                    </div>

                  </motion.div>

                  {/* Floating Particles */}
                  <motion.div
                    className="absolute -top-2 -right-2 w-3 h-3 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full"
                    animate={{
                      scale: [1, 1.5, 1],
                      opacity: [0.5, 1, 0.5]
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      delay: index * 0.3
                    }}
                  />
                </motion.div>

                {/* Title with Hover Effect */}
                <motion.h3 
                  className="text-2xl font-bold mb-4 group-hover:bg-gradient-to-r group-hover:from-purple-600 group-hover:to-pink-600 group-hover:bg-clip-text group-hover:text-transparent transition-all duration-300"
                  initial={{ color: '#1F2937' }}
                >
                  {feature.title}
                </motion.h3>

                {/* Description */}
                <p className="text-gray-600 leading-relaxed text-lg group-hover:text-gray-700 transition-colors duration-300 flex-grow">
                  {feature.description}
                </p>

                {/* Interactive Bottom Bar */}
                <motion.div
                  className={`mt-8 w-16 h-1 bg-gradient-to-r ${feature.gradient} rounded-full opacity-0 group-hover:opacity-100 group-hover:w-24 transition-all duration-500`}
                />

                {/* Corner Decorations */}
                <div className="absolute top-6 right-6 w-2 h-2 bg-gradient-to-br from-purple-400/50 to-pink-400/50 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 animate-pulse"></div>
                <div className="absolute bottom-6 left-6 w-1.5 h-1.5 bg-gradient-to-br from-pink-400/50 to-purple-400/50 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 animate-pulse" style={{ animationDelay: '0.5s' }}></div>
              </div>

              {/* Subtle Pattern Overlay */}
              <div className="absolute inset-0 rounded-3xl opacity-5 group-hover:opacity-10 transition-opacity duration-300"
                style={{
                  backgroundImage: `radial-gradient(circle at 50% 50%, #8B5CF6 1px, transparent 1px)`,
                  backgroundSize: '20px 20px'
                }}
              />
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom CTA */}
        <motion.div
          className="text-center mt-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          viewport={{ once: true }}
        >
          <p className="text-lg text-gray-600 mb-6">
            Siap memulai perjalanan belajar Anda?
          </p>
          <motion.button
            className="inline-flex items-center px-8 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Jelajahi Kursus
            <motion.span
              className="ml-2"
              animate={{ x: [0, 5, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              →
            </motion.span>
          </motion.button>
        </motion.div>
      </div>
    </div>
  );
};

export default FeaturesSection;
