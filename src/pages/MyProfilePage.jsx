// src/pages/MyProfilePage.jsx

import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import useAuthStore from '/src/store/authStore.js';
import { User, Mail, Edit, Lock } from 'lucide-react';

const MyProfilePage = () => {
  const { user } = useAuthStore();

  if (!user) {
    return <div>Memuat data pengguna...</div>;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-4xl mx-auto"
    >
      {/* Profile Header */}
      <div className="bg-white rounded-2xl shadow-lg p-8 flex flex-col md:flex-row items-center gap-8">
        <motion.div
          whileHover={{ scale: 1.05 }}
          className="relative w-32 h-32 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white shadow-xl"
        >
          <span className="text-6xl font-bold">
            {user.name.charAt(0).toUpperCase()}
          </span>
        </motion.div>
        <div className="text-center md:text-left">
          <h1 className="text-4xl font-bold text-gray-900">{user.name}</h1>
          <p className="text-lg text-gray-500 capitalize mt-1">{user.role}</p>
          <div className="flex items-center justify-center md:justify-start gap-4 mt-4 text-gray-600">
            <div className="flex items-center gap-2">
              <User size={16} />
              <span>{user.slug}</span>
            </div>
            <div className="flex items-center gap-2">
              <Mail size={16} />
              <span>{user.email}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Bio and Actions */}
      <div className="grid md:grid-cols-3 gap-8 mt-8">
        <div className="md:col-span-2 bg-white rounded-2xl shadow-lg p-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            Tentang Saya
          </h2>
          <p className="text-gray-600 leading-relaxed">
            {user.bio ||
              'Pengguna ini belum menulis bio. Edit profil untuk menambahkannya.'}
          </p>
        </div>

        <div className="space-y-4">
          <Link to="/profile/edit">
            <motion.div
              whileHover={{ y: -2 }}
              className="w-full bg-blue-500 text-white p-4 rounded-xl shadow-lg flex items-center justify-center gap-3 font-semibold hover:bg-blue-600 transition-colors cursor-pointer"
            >
              <Edit size={20} />
              <span>Edit Profil</span>
            </motion.div>
          </Link>
          <motion.div
            whileHover={{ y: -2 }}
            className="w-full bg-gray-700 text-white p-4 rounded-xl shadow-lg flex items-center justify-center gap-3 font-semibold hover:bg-gray-800 transition-colors cursor-pointer"
          >
            <Lock size={20} />
            <span>Ubah Password</span>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default MyProfilePage;
