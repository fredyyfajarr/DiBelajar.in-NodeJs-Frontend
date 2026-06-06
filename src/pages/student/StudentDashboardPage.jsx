import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Activity,
  ArrowRight,
  Award,
  BookOpen,
  CheckCircle,
  Clock,
  GraduationCap,
  Star,
} from 'lucide-react';
import ReviewModal from '/src/components/ReviewModal.jsx';
import { useMyEnrollments, useMyReview } from '/src/hooks/useStudent.js';
import useAuthStore from '/src/store/authStore.js';

const getCourseProgress = (enrollment) => {
  const progressItems = enrollment.progress || [];
  const completed = progressItems.filter((item) => item.isCompleted).length;
  const total = progressItems.length;

  return {
    completed,
    total,
    percentage: total > 0 ? Math.round((completed / total) * 100) : 0,
  };
};

const CourseProgressCard = ({ enrollment, onReview }) => {
  const course = enrollment.courseId;
  const courseSlug = course.slug || course._id;
  const progress = getCourseProgress(enrollment);
  const isCompleted = !!enrollment.completedAt;
  const { data: reviewResponse, isLoading: isReviewLoading } =
    useMyReview(courseSlug);
  const myReview = reviewResponse?.data;
  const hasReviewed = !!myReview;

  return (
    <div className="rounded-lg border border-gray-200 bg-white p-4 transition hover:border-primary/40 hover:shadow-sm">
      <div className="flex gap-4">
        <img
          src={course.thumbnail}
          alt={course.title}
          className="h-24 w-32 flex-shrink-0 rounded-md object-cover"
        />
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-gray-500">
                {isCompleted ? 'Selesai' : 'Sedang dipelajari'}
              </p>
              <h3 className="mt-1 line-clamp-2 text-lg font-semibold text-gray-900">
                {course.title}
              </h3>
            </div>
            <Link
              to={`/learn/${courseSlug}`}
              className="inline-flex items-center gap-2 rounded-md bg-gray-900 px-3 py-2 text-sm font-semibold text-white transition hover:bg-gray-800"
            >
              {isCompleted ? 'Buka' : 'Lanjutkan'}
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="mt-4">
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-600">
                {progress.completed}/{progress.total || 0} materi selesai
              </span>
              <span className="font-semibold text-gray-900">
                {progress.percentage}%
              </span>
            </div>
            <div className="mt-2 h-2 rounded-full bg-gray-100">
              <div
                className="h-full rounded-full bg-primary transition-all"
                style={{ width: `${progress.percentage}%` }}
              />
            </div>
          </div>

          {isCompleted && (
            <button
              type="button"
              onClick={() =>
                onReview(courseSlug, hasReviewed ? 'edit' : 'add', myReview)
              }
              disabled={isReviewLoading}
              className="mt-4 inline-flex items-center gap-2 rounded-md border border-primary/30 px-3 py-2 text-sm font-semibold text-primary transition hover:bg-primary/5 disabled:opacity-50"
            >
              <Star className="h-4 w-4" />
              {isReviewLoading
                ? 'Memuat ulasan...'
                : hasReviewed
                  ? 'Edit ulasan'
                  : 'Beri ulasan'}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

const MetricCard = ({ icon, label, value, tone }) => (
  <div className="rounded-lg border border-gray-200 bg-white p-5">
    <div className="flex items-center gap-3">
      <div className={`rounded-md p-2 ${tone}`}>
        {React.createElement(icon, { className: 'h-5 w-5' })}
      </div>
      <div>
        <p className="text-sm text-gray-500">{label}</p>
        <p className="text-2xl font-bold text-gray-900">{value}</p>
      </div>
    </div>
  </div>
);

const StudentDashboardPage = () => {
  const { user } = useAuthStore();
  const { data: response, isLoading } = useMyEnrollments(user?._id);
  const enrollments = response?.data?.data || [];
  const completedCourses = enrollments.filter(
    (enrollment) => enrollment.completedAt
  );
  const activeCourses = enrollments.filter(
    (enrollment) => !enrollment.completedAt
  );
  const nextCourse = activeCourses[0] || completedCourses[0];

  const [modalState, setModalState] = useState({
    isOpen: false,
    mode: 'add',
    courseSlug: null,
    currentReview: null,
  });

  const handleOpenReviewModal = (courseSlug, mode, review) => {
    setModalState({
      isOpen: true,
      mode,
      courseSlug,
      currentReview: review,
    });
  };

  const handleCloseReviewModal = () => {
    setModalState({
      isOpen: false,
      mode: 'add',
      courseSlug: null,
      currentReview: null,
    });
  };

  return (
    <>
      <div className="min-h-screen bg-gray-50">
        <div className="border-b border-gray-200 bg-white">
          <div className="container mx-auto px-4 py-8">
            <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
              <div>
                <p className="text-sm font-semibold uppercase tracking-wide text-primary">
                  Dashboard belajar
                </p>
                <h1 className="mt-2 text-3xl font-bold text-gray-900">
                  Halo, {user?.name}
                </h1>
                <p className="mt-2 max-w-2xl text-gray-600">
                  Lanjutkan materi terakhir, pantau progress kursus, dan cek
                  hasil tugas dari satu tempat.
                </p>
              </div>
              <div className="flex flex-wrap gap-3">
                <Link
                  to="/courses"
                  className="inline-flex items-center gap-2 rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-semibold text-gray-800 transition hover:bg-gray-100"
                >
                  <BookOpen className="h-4 w-4" />
                  Jelajahi kursus
                </Link>
                <Link
                  to="/student-activity"
                  className="inline-flex items-center gap-2 rounded-md bg-primary px-4 py-2 text-sm font-semibold text-white transition hover:bg-primary/90"
                >
                  <Activity className="h-4 w-4" />
                  Riwayat aktivitas
                </Link>
              </div>
            </div>
          </div>
        </div>

        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            <MetricCard
              icon={GraduationCap}
              label="Kursus diikuti"
              value={enrollments.length}
              tone="bg-blue-50 text-blue-700"
            />
            <MetricCard
              icon={Clock}
              label="Sedang berjalan"
              value={activeCourses.length}
              tone="bg-amber-50 text-amber-700"
            />
            <MetricCard
              icon={CheckCircle}
              label="Kursus selesai"
              value={completedCourses.length}
              tone="bg-emerald-50 text-emerald-700"
            />
          </div>

          <div className="mt-8 grid grid-cols-1 gap-6 xl:grid-cols-[1fr_360px]">
            <section className="space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold text-gray-900">
                  Kursus Anda
                </h2>
                <Link
                  to="/student-activity"
                  className="text-sm font-semibold text-primary hover:underline"
                >
                  Lihat semua aktivitas
                </Link>
              </div>

              {isLoading && (
                <div className="rounded-lg border border-gray-200 bg-white p-8 text-center text-gray-500">
                  Memuat kursus Anda...
                </div>
              )}
              {!isLoading && enrollments.length === 0 && (
                <div className="rounded-lg border border-dashed border-gray-300 bg-white p-10 text-center">
                  <BookOpen className="mx-auto h-12 w-12 text-gray-300" />
                  <h3 className="mt-4 text-lg font-semibold text-gray-900">
                    Belum ada kursus
                  </h3>
                  <p className="mt-2 text-gray-600">
                    Mulai dari katalog kursus dan enroll ke materi pertama.
                  </p>
                  <Link
                    to="/courses"
                    className="mt-5 inline-flex items-center gap-2 rounded-md bg-primary px-4 py-2 text-sm font-semibold text-white transition hover:bg-primary/90"
                  >
                    Cari kursus
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              )}
              {!isLoading &&
                enrollments.map((enrollment) => (
                  <CourseProgressCard
                    key={enrollment._id}
                    enrollment={enrollment}
                    onReview={handleOpenReviewModal}
                  />
                ))}
            </section>

            <aside className="space-y-4">
              <div className="rounded-lg border border-gray-200 bg-white p-5">
                <h2 className="text-lg font-semibold text-gray-900">
                  Berikutnya
                </h2>
                {nextCourse ? (
                  <div className="mt-4">
                    <p className="text-sm text-gray-500">Lanjutkan kursus</p>
                    <h3 className="mt-1 font-semibold text-gray-900">
                      {nextCourse.courseId.title}
                    </h3>
                    <Link
                      to={`/learn/${
                        nextCourse.courseId.slug || nextCourse.courseId._id
                      }`}
                      className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-md bg-gray-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-gray-800"
                    >
                      Buka ruang belajar
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  </div>
                ) : (
                  <p className="mt-4 text-sm text-gray-600">
                    Belum ada kursus aktif.
                  </p>
                )}
              </div>

              <div className="rounded-lg border border-gray-200 bg-white p-5">
                <div className="flex items-center gap-2">
                  <Award className="h-5 w-5 text-amber-600" />
                  <h2 className="text-lg font-semibold text-gray-900">
                    Pencapaian
                  </h2>
                </div>
                <div className="mt-4 space-y-3">
                  <div className="rounded-md bg-gray-50 p-3">
                    <p className="text-sm font-semibold text-gray-900">
                      Pembelajar aktif
                    </p>
                    <p className="mt-1 text-xs text-gray-500">
                      {activeCourses.length > 0
                        ? 'Masih ada kursus yang sedang berjalan.'
                        : 'Enroll kursus untuk mulai progress.'}
                    </p>
                  </div>
                  <div className="rounded-md bg-gray-50 p-3">
                    <p className="text-sm font-semibold text-gray-900">
                      Penyelesai kursus
                    </p>
                    <p className="mt-1 text-xs text-gray-500">
                      {completedCourses.length} kursus selesai.
                    </p>
                  </div>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </div>

      <ReviewModal
        isOpen={modalState.isOpen}
        onClose={handleCloseReviewModal}
        courseSlug={modalState.courseSlug}
        mode={modalState.mode}
        currentReview={modalState.currentReview}
      />
    </>
  );
};

export default StudentDashboardPage;
