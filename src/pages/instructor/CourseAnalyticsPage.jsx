import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useCourseAnalytics } from '/src/hooks/useAdmin.js';
import { useCourseDetail } from '/src/hooks/useCourses.js'; // Untuk mendapatkan nama kursus
import { motion } from 'framer-motion';

const StatCard = ({ title, value }) => (
  <div className="bg-white p-6 rounded-2xl shadow-sm">
    <p className="text-sm font-medium text-gray-500">{title}</p>
    <p className="text-3xl font-bold text-gray-900 mt-1">{value}</p>
  </div>
);

const CourseAnalyticsPage = () => {
  const { courseId } = useParams();

  // Mengambil data analitik dan detail kursus
  const { data: analyticsResponse, isLoading: isLoadingAnalytics } =
    useCourseAnalytics(courseId);
  const { data: courseData, isLoading: isLoadingCourse } =
    useCourseDetail(courseId);

  const analytics = analyticsResponse?.data?.data;
  const courseTitle = courseData?.course?.title || 'Memuat...';

  if (isLoadingAnalytics || isLoadingCourse) {
    return <p>Memuat data analitik...</p>;
  }

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <Link
        to="/instructor/courses"
        className="text-sm text-primary hover:underline mb-4 inline-block"
      >
        &larr; Kembali ke Kursus
      </Link>
      <h1 className="text-3xl font-bold mb-2">Analitik Kursus</h1>
      <p className="text-lg text-gray-600 mb-6">{courseTitle}</p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <StatCard title="Total Pendaftar" value={analytics.totalEnrollments} />
        <StatCard
          title="Tingkat Penyelesaian"
          value={`${analytics.completionRate}%`}
        />
        <StatCard
          title="Rata-rata Skor Tes"
          value={analytics?.overallAvgScore || 0}
        />

        {/* Anda bisa menambahkan kartu lain di sini */}
      </div>

      {/* Anda bisa menambahkan komponen lain seperti chart atau daftar di sini */}
      <div className="bg-white p-6 rounded-2xl shadow-sm">
        <h2 className="text-xl font-semibold mb-4">Pendaftar Terbaru</h2>
        <ul>
          {analytics.recentEnrollments.map((enroll) => (
            <li key={enroll._id} className="border-b py-2">
              {enroll.userId.name} ({enroll.userId.email})
            </li>
          ))}
        </ul>
      </div>
    </motion.div>
  );
};

export default CourseAnalyticsPage;
