import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useUserProfile } from '/src/hooks/useUser.js';
import CourseCard from '/src/components/CourseCard.jsx';
import { User, Mail, BookOpen, AlertTriangle } from 'lucide-react';

const ProfilePage = () => {
  const { userSlug } = useParams();
  const { data: response, isLoading, isError } = useUserProfile(userSlug);

  if (isLoading) {
    return <div className="text-center py-20">Memuat profil instruktur...</div>;
  }

  if (isError) {
    return (
      <div className="text-center py-20 max-w-lg mx-auto">
        <AlertTriangle className="w-16 h-16 text-red-400 mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-gray-800">
          Profil Tidak Ditemukan
        </h2>
        <p className="text-gray-600 mt-2">
          Maaf, kami tidak dapat menemukan profil untuk instruktur ini.
        </p>
        <Link
          to="/courses"
          className="mt-6 inline-block bg-purple-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-purple-700"
        >
          Kembali ke Daftar Kursus
        </Link>
      </div>
    );
  }

  // --- PERBAIKAN UTAMA DI SINI ---
  // Kita perlu masuk satu tingkat lebih dalam ke properti 'data'
  const { user: instructor, courses } = response.data.data;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-6xl mx-auto"
    >
      {/* Profile Header */}
      <div className="bg-white rounded-2xl shadow-lg p-8 flex flex-col md:flex-row items-center gap-8 mb-10">
        <motion.div
          whileHover={{ scale: 1.05 }}
          className="relative w-32 h-32 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white shadow-xl"
        >
          <span className="text-6xl font-bold">
            {instructor.name.charAt(0).toUpperCase()}
          </span>
        </motion.div>
        <div className="text-center md:text-left">
          <p className="text-lg font-semibold text-purple-600">Instruktur</p>
          <h1 className="text-4xl font-bold text-gray-900">
            {instructor.name}
          </h1>
          <div className="flex items-center justify-center md:justify-start gap-4 mt-4 text-gray-600">
            <div className="flex items-center gap-2">
              <Mail size={16} />
              <span>{instructor.email}</span>
            </div>
          </div>
          <p className="text-gray-600 leading-relaxed mt-4 max-w-xl">
            {instructor.bio || 'Instruktur ini belum menulis bio.'}
          </p>
        </div>
      </div>

      {/* Daftar Kursus oleh Instruktur */}
      <div>
        <div className="flex items-center gap-3 mb-6">
          <BookOpen className="w-8 h-8 text-pink-600" />
          <h2 className="text-3xl font-bold text-gray-800">
            Kursus oleh {instructor.name}
          </h2>
        </div>

        {courses && courses.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {courses.map((course) => (
              <CourseCard key={course._id} course={course} />
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-500 py-10 bg-gray-50 rounded-lg">
            Instruktur ini belum memiliki kursus.
          </p>
        )}
      </div>
    </motion.div>
  );
};

export default ProfilePage;
