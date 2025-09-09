/* eslint-disable no-unused-vars */
import React from 'react';
import { motion } from 'framer-motion';
import { useStats } from '/src/hooks/useAdmin.js';
import { Link } from 'react-router-dom';

const StatCard = ({ title, value, icon, color, trend }) => (
  <motion.div
    className={`relative overflow-hidden bg-gradient-to-br ${color} p-8 rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300 group cursor-pointer`}
    whileHover={{ scale: 1.05, y: -5 }}
    whileTap={{ scale: 0.95 }}
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
  >
    {/* Background decoration */}
    <div className="absolute top-0 right-0 w-24 h-24 bg-white/10 rounded-full -translate-y-8 translate-x-8"></div>
    <div className="absolute bottom-0 left-0 w-16 h-16 bg-white/5 rounded-full translate-y-4 -translate-x-4"></div>
    
    <div className="relative z-10 flex items-start justify-between">
      <div className="flex-1">
        <p className="text-white/80 text-sm font-medium mb-2 tracking-wide uppercase">{title}</p>
        <p className="text-4xl font-black text-white mb-1">{value || 0}</p>
        {trend && (
          <div className="flex items-center gap-1">
            <span className="text-white/90 text-xs font-medium">{trend}</span>
            <svg className="w-3 h-3 text-white/90" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M3.293 9.707a1 1 0 010-1.414l6-6a1 1 0 011.414 0l6 6a1 1 0 01-1.414 1.414L11 5.414V17a1 1 0 11-2 0V5.414L4.707 9.707a1 1 0 01-1.414 0z" clipRule="evenodd" />
            </svg>
          </div>
        )}
      </div>
      <div className="text-5xl text-white/20 group-hover:text-white/30 transition-colors duration-300 group-hover:scale-110 transform">
        {icon}
      </div>
    </div>
  </motion.div>
);

const InfoCard = ({ title, children, icon }) => (
  <motion.div
    className="bg-white/60 backdrop-blur-sm border border-white/20 p-8 rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 group"
    whileHover={{ y: -5 }}
    initial={{ opacity: 0, y: 30 }}
    animate={{ opacity: 1, y: 0 }}
  >
    <div className="flex items-center gap-3 mb-6">
      <div className="text-2xl">{icon}</div>
      <h2 className="text-2xl font-bold text-gray-800 group-hover:text-blue-600 transition-colors">
        {title}
      </h2>
    </div>
    <div className="space-y-4">
      {children}
    </div>
  </motion.div>
);

const UserItem = ({ user }) => (
  <motion.div
    className="flex items-center gap-4 p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl hover:from-blue-100 hover:to-purple-100 transition-all duration-200 group"
    whileHover={{ x: 5 }}
  >
    <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-lg">
      {user.name?.charAt(0)?.toUpperCase() || '?'}
    </div>
    <div className="flex-1">
      <p className="font-semibold text-gray-800 group-hover:text-blue-600 transition-colors">
        {user.name}
      </p>
      <p className="text-sm text-gray-500">{user.email}</p>
    </div>
    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
  </motion.div>
);

const CourseItem = ({ course }) => (
  <motion.div
    className="flex items-center gap-4 p-4 bg-gradient-to-r from-emerald-50 to-teal-50 rounded-2xl hover:from-emerald-100 hover:to-teal-100 transition-all duration-200 group"
    whileHover={{ x: 5 }}
  >
    <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl flex items-center justify-center text-white text-2xl">
      📚
    </div>
    <div className="flex-1">
      <p className="font-semibold text-gray-800 group-hover:text-emerald-600 transition-colors line-clamp-2">
        {course.title}
      </p>
      <p className="text-sm text-gray-500">Baru dibuat</p>
    </div>
    <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></div>
  </motion.div>
);

const LoadingSkeleton = () => (
  <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
    <div className="h-10 bg-gray-200 rounded-lg w-64 mb-8 animate-pulse"></div>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
      {[1, 2, 3].map((i) => (
        <div key={i} className="h-40 bg-gray-200 rounded-3xl animate-pulse"></div>
      ))}
    </div>
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      {[1, 2].map((i) => (
        <div key={i} className="h-64 bg-gray-200 rounded-3xl animate-pulse"></div>
      ))}
    </div>
  </div>
);

const AdminDashboardPage = () => {
  const { data: response, isLoading } = useStats();
  const stats = response?.data?.data;

  if (isLoading) {
    return <LoadingSkeleton />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <motion.div
        className="container mx-auto px-4 sm:px-6 lg:px-8 py-12"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        {/* Header Section */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-5xl sm:text-6xl font-black bg-gradient-to-r from-blue-600 via-purple-600 to-emerald-600 bg-clip-text text-transparent mb-4">
            Dashboard Admin
          </h1>
          <p className="text-xl text-gray-600 font-medium">
            Kelola platform pembelajaran dengan mudah
          </p>
        </motion.div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          <StatCard 
            title="Total Pengguna" 
            value={stats?.totalUsers} 
            icon="👥" 
            color="from-blue-500 to-blue-600"
            trend="+12% bulan ini"
          />
          <StatCard 
            title="Total Kursus" 
            value={stats?.totalCourses} 
            icon="📚" 
            color="from-emerald-500 to-emerald-600"
            trend="+8% bulan ini"
          />
          <StatCard
            title="Total Pendaftaran"
            value={stats?.totalEnrollments}
            icon="🎓"
            color="from-purple-500 to-purple-600"
            trend="+24% bulan ini"
          />
        </div>

        {/* Info Cards */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
          <InfoCard title="Pengguna Baru Terdaftar" icon="✨">
            <div className="space-y-3">
              {stats?.recentUsers?.length > 0 ? (
                stats.recentUsers.map((user, index) => (
                  <motion.div
                    key={user._id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <UserItem user={user} />
                  </motion.div>
                ))
              ) : (
                <div className="text-center py-8">
                  <div className="text-4xl mb-4">🤷‍♂️</div>
                  <p className="text-gray-500">Belum ada pengguna baru</p>
                </div>
              )}
            </div>
          </InfoCard>

          <InfoCard title="Kursus Baru Dibuat" icon="🚀">
            <div className="space-y-3">
              {stats?.recentCourses?.length > 0 ? (
                stats.recentCourses.map((course, index) => (
                  <motion.div
                    key={course._id}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <CourseItem course={course} />
                  </motion.div>
                ))
              ) : (
                <div className="text-center py-8">
                  <div className="text-4xl mb-4">📝</div>
                  <p className="text-gray-500">Belum ada kursus baru</p>
                </div>
              )}
            </div>
          </InfoCard>
        </div>

        {/* Quick Actions */}
        <motion.div
          className="mt-16 text-center"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
        >
          <div className="flex flex-wrap justify-center gap-4">
            <button className="px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold rounded-2xl hover:from-blue-700 hover:to-blue-800 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl">
              Kelola Pengguna
            </button>
            <button className="px-8 py-4 bg-gradient-to-r from-emerald-600 to-emerald-700 text-white font-semibold rounded-2xl hover:from-emerald-700 hover:to-emerald-800 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl">
              Tambah Kursus
            </button>
            <button className="px-8 py-4 bg-gradient-to-r from-purple-600 to-purple-700 text-white font-semibold rounded-2xl hover:from-purple-700 hover:to-purple-800 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl">
              Lihat Laporan
            </button>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default AdminDashboardPage;