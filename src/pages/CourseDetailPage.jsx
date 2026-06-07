import React from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import {
  ArrowRight,
  BookOpen,
  CheckCircle,
  FileText,
  Lock,
  MessageCircle,
  Play,
  Star,
  User,
} from 'lucide-react';
import CourseReviews from '../components/CourseReviews';
import { useCourseDetail } from '/src/hooks/useCourses.js';
import { useEnrollInCourse } from '/src/hooks/useStudent.js';
import useAuthStore from '/src/store/authStore.js';
import useModalStore from '/src/store/modalStore.js';

const stripHtml = (html = '') => html.replace(/<[^>]*>/g, ' ');

const CourseDetailPage = () => {
  const { courseSlug } = useParams();
  const navigate = useNavigate();
  const { data, isLoading, isError } = useCourseDetail(courseSlug);
  const { isAuthenticated, user } = useAuthStore();
  const { openModal } = useModalStore();
  const { mutate: enroll, isPending: isEnrolling } = useEnrollInCourse();

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center text-gray-600">
        Memuat detail kursus...
      </div>
    );
  }

  if (isError || !data?.course) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="rounded-lg border border-red-200 bg-white p-8 text-center">
          <h2 className="text-xl font-semibold text-red-700">
            Kursus tidak tersedia
          </h2>
          <p className="mt-2 text-red-600">
            Gagal memuat kursus. Silakan coba lagi.
          </p>
        </div>
      </div>
    );
  }

  const { course, materials = [], enrollment } = data;
  const isEnrolled = !!enrollment;
  const isLearner = user?.role === 'student';
  const isStaff = ['admin', 'instructor'].includes(user?.role);
  const previewMaterials = isAuthenticated ? materials : materials.slice(0, 4);
  const courseUrl = `/learn/${course.slug || course._id}`;
  const workspaceUrl = `/${
    user?.role === 'admin' ? 'admin' : 'instructor'
  }/courses/${course.slug || course._id}/materials`;
  const descriptionPreview = stripHtml(course.description).slice(0, 220);

  const handlePrimaryAction = () => {
    if (!isAuthenticated) {
      openModal('LOGIN');
      return;
    }

    if (isEnrolled) {
      navigate(courseUrl);
      return;
    }

    if (isStaff) {
      navigate(workspaceUrl);
      return;
    }

    enroll(course._id || course.slug);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <section className="border-b border-gray-200 bg-white">
        <div className="container mx-auto grid grid-cols-1 gap-8 px-4 py-10 lg:grid-cols-[1fr_380px]">
          <div>
            <Link
              to="/courses"
              className="text-sm font-semibold text-primary hover:underline"
            >
              Kembali ke katalog
            </Link>
            <div className="mt-5 inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1 text-sm font-semibold text-primary">
              <BookOpen className="h-4 w-4" />
              Kursus online
            </div>
            <h1 className="mt-4 max-w-4xl text-4xl font-bold leading-tight text-gray-900 lg:text-5xl">
              {course.title}
            </h1>
            <p className="mt-4 max-w-3xl text-lg leading-8 text-gray-600">
              {descriptionPreview}
              {descriptionPreview.length >= 220 ? '...' : ''}
            </p>
            <div className="mt-6 flex flex-wrap items-center gap-4 text-sm text-gray-600">
              <span className="inline-flex items-center gap-2">
                <User className="h-4 w-4 text-gray-400" />
                {course.instructorId?.name || 'Instruktur'}
              </span>
              <span className="inline-flex items-center gap-2">
                <FileText className="h-4 w-4 text-gray-400" />
                {materials.length} materi
              </span>
              <span className="inline-flex items-center gap-2">
                <Star className="h-4 w-4 text-amber-500" />
                Review siswa
              </span>
            </div>
          </div>

          <aside className="rounded-lg border border-gray-200 bg-white p-5 shadow-sm">
            <img
              src={course.thumbnail}
              alt={course.title}
              className="h-52 w-full rounded-md object-cover"
            />
            <button
              type="button"
              onClick={handlePrimaryAction}
              disabled={isEnrolling}
              className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-md bg-primary px-4 py-3 text-sm font-semibold text-white transition hover:bg-primary/90 disabled:opacity-50"
            >
              {isEnrolling
                ? 'Mendaftarkan...'
                : isEnrolled
                  ? 'Lanjut belajar'
                  : isStaff
                    ? 'Kelola kursus'
                    : isLearner
                      ? 'Enroll gratis'
                      : 'Login untuk enroll'}
              <ArrowRight className="h-4 w-4" />
            </button>
            <div className="mt-5 space-y-3 text-sm text-gray-700">
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-emerald-600" />
                Akses materi pembelajaran
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-emerald-600" />
                Tugas, quiz, dan forum diskusi
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-emerald-600" />
                Sertifikat setelah selesai
              </div>
            </div>
          </aside>
        </div>
      </section>

      <main className="container mx-auto grid grid-cols-1 gap-8 px-4 py-10 lg:grid-cols-[1fr_320px]">
        <section className="space-y-8">
          <div className="rounded-lg border border-gray-200 bg-white p-6">
            <h2 className="text-2xl font-bold text-gray-900">
              Tentang kursus
            </h2>
            <div
              className="prose prose-gray mt-4 max-w-none text-gray-700"
              dangerouslySetInnerHTML={{ __html: course.description }}
            />
          </div>

          <div className="rounded-lg border border-gray-200 bg-white p-6">
            <div className="flex items-center justify-between gap-4">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">
                  Kurikulum
                </h2>
                <p className="mt-1 text-sm text-gray-600">
                  Urutan materi yang akan dipelajari di kursus ini.
                </p>
              </div>
              {!isAuthenticated && materials.length > previewMaterials.length && (
                <span className="rounded-full bg-gray-100 px-3 py-1 text-xs font-semibold text-gray-600">
                  {materials.length - previewMaterials.length} materi terkunci
                </span>
              )}
            </div>

            <div className="mt-5 divide-y divide-gray-100">
              {previewMaterials.map((material, index) => (
                <div key={material._id} className="flex gap-4 py-4">
                  <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-md bg-gray-100 text-sm font-bold text-gray-700">
                    {index + 1}
                  </div>
                  <div className="min-w-0 flex-1">
                    <h3 className="font-semibold text-gray-900">
                      {material.title}
                    </h3>
                    <p className="mt-1 line-clamp-2 text-sm text-gray-600">
                      {stripHtml(material.description)}
                    </p>
                  </div>
                  <Play className="mt-2 h-4 w-4 flex-shrink-0 text-gray-400" />
                </div>
              ))}
            </div>

            {!isAuthenticated && materials.length > previewMaterials.length && (
              <button
                type="button"
                onClick={() => openModal('LOGIN')}
                className="mt-5 inline-flex items-center gap-2 rounded-md border border-gray-300 px-4 py-2 text-sm font-semibold text-gray-800 transition hover:bg-gray-100"
              >
                <Lock className="h-4 w-4" />
                Login untuk melihat semua materi
              </button>
            )}
          </div>

          <CourseReviews courseSlug={courseSlug} />
        </section>

        <aside className="space-y-4">
          <div className="rounded-lg border border-gray-200 bg-white p-5">
            <h3 className="font-semibold text-gray-900">Requirement selesai</h3>
            <div className="mt-4 space-y-3 text-sm text-gray-700">
              <div className="flex items-start gap-2">
                <CheckCircle className="mt-0.5 h-4 w-4 text-emerald-600" />
                Kerjakan quiz pada materi yang memilikinya.
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle className="mt-0.5 h-4 w-4 text-emerald-600" />
                Submit tugas untuk setiap materi.
              </div>
              <div className="flex items-start gap-2">
                <MessageCircle className="mt-0.5 h-4 w-4 text-emerald-600" />
                Ikut forum minimal 2 posting per materi.
              </div>
            </div>
          </div>

          <div className="rounded-lg border border-gray-200 bg-white p-5">
            <h3 className="font-semibold text-gray-900">Cocok untuk</h3>
            <p className="mt-2 text-sm leading-6 text-gray-600">
              Siswa yang ingin belajar bertahap dengan materi, latihan, diskusi,
              dan feedback instruktur.
            </p>
          </div>
        </aside>
      </main>
    </div>
  );
};

export default CourseDetailPage;
