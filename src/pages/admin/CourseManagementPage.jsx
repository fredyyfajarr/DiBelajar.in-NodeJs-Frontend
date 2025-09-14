import React, { useState } from 'react';
import { useAdminCourses, useDeleteCourse } from '/src/hooks/useAdmin.js';
import useAuthStore from '/src/store/authStore.js';
import useToastStore from '/src/store/toastStore.js';
import { useDebounce } from '/src/hooks/useDebounce.js';
import CourseFormModal from '/src/components/admin/CourseFormModal.jsx';
import Pagination from '/src/components/Pagination.jsx';
import ConfirmationModal from '/src/components/ConfirmationModal.jsx';
import { Link } from 'react-router-dom';
import {
  Search,
  Plus,
  Edit,
  Trash2,
  BookOpen,
  Users,
  BarChart3,
  FileText,
} from 'lucide-react';

const CourseManagementPage = () => {
  const { user } = useAuthStore();
  const { success } = useToastStore();
  const [page, setPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [viewMode, setViewMode] = useState('grid');
  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  const { data: response, isLoading } = useAdminCourses({
    page,
    limit: 10,
    keyword: debouncedSearchTerm,
  });

  const { mutate: deleteCourse } = useDeleteCourse();

  const [modalState, setModalState] = useState({
    isOpen: false,
    mode: null,
    currentCourse: null,
  });

  const [confirmDeleteState, setConfirmDeleteState] = useState({
    isOpen: false,
    courseId: null,
  });

  const courses = response?.data?.data || [];
  const totalCourses = response?.data?.total || 0;
  const totalPages = Math.ceil(totalCourses / 10);

  const handleOpenModal = (mode, course = null) =>
    setModalState({ isOpen: true, mode, currentCourse: course });

  const handleCloseModal = () =>
    setModalState({ isOpen: false, mode: null, currentCourse: null });

  const openDeleteConfirmation = (courseId) =>
    setConfirmDeleteState({ isOpen: true, courseId });

  const closeDeleteConfirmation = () =>
    setConfirmDeleteState({ isOpen: false, courseId: null });

  const handleDelete = () => {
    deleteCourse(confirmDeleteState.courseId, {
      onSuccess: () => {
        success('Kursus berhasil dihapus.');
        closeDeleteConfirmation();
      },
    });
  };

  const CourseCard = ({ course }) => (
    <div className="group bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-xl hover:border-indigo-100 transition-all duration-300 transform hover:-translate-y-1">
      <div className="relative overflow-hidden">
        <img
          src={course.thumbnail}
          alt={course.title}
          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
      </div>
      <div className="p-6">
        <div className="mb-4">
          <h3 className="font-bold text-lg text-gray-900 mb-2 line-clamp-2 group-hover:text-indigo-600 transition-colors">
            {course.title}
          </h3>
          <p className="text-sm text-gray-600 flex items-center gap-2">
            <Users className="w-4 h-4" />
            {course.instructorId?.name || 'N/A'}
          </p>
        </div>

        <div className="flex flex-wrap gap-2">
          {user?.role === 'instructor' && (
            <>
              <Link
                to={`/${
                  user?.role === 'admin' ? 'admin' : 'instructor'
                }/courses/${course.slug || course._id}/enrollments`}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium rounded-lg bg-purple-50 text-purple-700 hover:bg-purple-100 transition-colors"
              >
                <Users className="w-4 h-4" />
                Pendaftar
              </Link>
              <Link
                to={`/${user?.role}/courses/${
                  course.slug || course._id
                }/analytics`}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium rounded-lg bg-amber-50 text-amber-700 hover:bg-amber-100 transition-colors"
              >
                <BarChart3 className="w-4 h-4" />
                Analitik
              </Link>
            </>
          )}
          <Link
            to={`/${user?.role === 'admin' ? 'admin' : 'instructor'}/courses/${
              course.slug || course._id
            }/materials`}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium rounded-lg bg-emerald-50 text-emerald-700 hover:bg-emerald-100 transition-colors"
          >
            <FileText className="w-4 h-4" />
            Materi
          </Link>
        </div>

        <div className="flex justify-between items-center mt-4 pt-4 border-t border-gray-100">
          <button
            onClick={() => handleOpenModal('edit', course)}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium rounded-lg text-blue-600 hover:bg-blue-50 transition-colors"
          >
            <Edit className="w-4 h-4" />
            Edit
          </button>
          <button
            onClick={() => openDeleteConfirmation(course._id)}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium rounded-lg text-red-600 hover:bg-red-50 transition-colors"
          >
            <Trash2 className="w-4 h-4" />
            Hapus
          </button>
        </div>
      </div>
    </div>
  );

  const TableView = () => (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden mt-8">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50/80 backdrop-blur-sm">
            <tr>
              <th className="text-left p-6 font-semibold text-gray-700 text-sm uppercase tracking-wide">
                Thumbnail
              </th>
              <th className="text-left p-6 font-semibold text-gray-700 text-sm uppercase tracking-wide">
                Judul
              </th>
              <th className="text-left p-6 font-semibold text-gray-700 text-sm uppercase tracking-wide">
                Instruktur
              </th>
              <th className="text-right p-6 font-semibold text-gray-700 text-sm uppercase tracking-wide">
                Aksi
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {courses.map((course) => (
              <tr
                key={course._id}
                className="hover:bg-gray-50/50 transition-colors duration-200 group"
              >
                <td className="p-6">
                  <img
                    src={course.thumbnail}
                    alt={course.title}
                    className="h-16 w-24 object-cover rounded-xl shadow-sm"
                  />
                </td>
                <td className="p-6 font-medium text-gray-900">
                  {course.title}
                </td>
                <td className="p-6 text-gray-600">
                  {course.instructorId?.name || 'N/A'}
                </td>
                <td className="p-6 text-right space-x-4">
                  {user?.role === 'instructor' && (
                    <>
                      <Link
                        to={`/${
                          user?.role === 'admin' ? 'admin' : 'instructor'
                        }/courses/${course.slug || course._id}/enrollments`}
                        className="text-purple-600 hover:underline font-medium inline-flex items-center gap-1"
                      >
                        <Users size={14} />
                        Pendaftar
                      </Link>
                      <Link
                        to={`/${user?.role}/courses/${
                          course.slug || course._id
                        }/analytics`}
                        className="text-amber-600 hover:underline font-medium inline-flex items-center gap-1"
                      >
                        <BarChart3 size={14} />
                        Analitik
                      </Link>
                    </>
                  )}
                  <Link
                    to={`/${
                      user?.role === 'admin' ? 'admin' : 'instructor'
                    }/courses/${course.slug || course._id}/materials`}
                    className="text-emerald-600 hover:underline font-medium inline-flex items-center gap-1"
                  >
                    <FileText size={14} />
                    Materi
                  </Link>
                  <button
                    onClick={() => handleOpenModal('edit', course)}
                    className="text-blue-600 hover:underline font-medium inline-flex items-center gap-1"
                  >
                    <Edit size={14} />
                    Edit
                  </button>
                  <button
                    onClick={() => openDeleteConfirmation(course._id)}
                    className="text-red-600 hover:underline font-medium inline-flex items-center gap-1"
                  >
                    <Trash2 size={14} />
                    Hapus
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/30">
        {/* Header Section */}
        <div className="relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-indigo-600/10 via-purple-600/5 to-pink-600/10" />
          <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center gap-6">
              <div>
                <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
                  Manajemen Kursus
                  <span className="block text-lg font-normal text-gray-600 mt-2">
                    Kelola kursus Anda dengan mudah dan efisien.
                  </span>
                </h1>
              </div>
              <button
                onClick={() => handleOpenModal('add')}
                className="group relative inline-flex items-center gap-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold px-8 py-4 rounded-2xl hover:shadow-xl hover:shadow-indigo-500/25 transition-all duration-300 transform hover:-translate-y-1 overflow-hidden"
              >
                <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                <Plus className="w-5 h-5 relative z-10" />
                <span className="relative z-10">Tambah Kursus</span>
              </button>
            </div>

            {/* Search and View Toggle */}
            <div className="flex flex-col sm:flex-row gap-4 mt-8">
              <div className="flex-1 relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Search className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  placeholder="Cari berdasarkan judul atau deskripsi..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 bg-white/80 backdrop-blur-sm border border-white/50 rounded-2xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent shadow-sm placeholder-gray-500 text-gray-900"
                />
              </div>
              <div className="flex items-center bg-white/80 backdrop-blur-sm rounded-2xl p-1 shadow-sm border border-white/50">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`flex items-center gap-2 px-4 py-3 rounded-xl transition-all duration-200 ${
                    viewMode === 'grid'
                      ? 'bg-indigo-600 text-white shadow-sm'
                      : 'text-gray-600 hover:text-indigo-600'
                  }`}
                >
                  <BookOpen className="w-4 h-4" />
                  Grid
                </button>
                <button
                  onClick={() => setViewMode('table')}
                  className={`flex items-center gap-2 px-4 py-3 rounded-xl transition-all duration-200 ${
                    viewMode === 'table'
                      ? 'bg-indigo-600 text-white shadow-sm'
                      : 'text-gray-600 hover:text-indigo-600'
                  }`}
                >
                  <FileText className="w-4 h-4" />
                  Table
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Content Section */}
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 pb-12">
          {isLoading ? (
            <div className="flex items-center justify-center py-20">
              <div className="w-16 h-16 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin"></div>
            </div>
          ) : courses.length === 0 ? (
            <div className="text-center py-20">
              <div className="w-24 h-24 mx-auto mb-6 bg-gray-100 rounded-full flex items-center justify-center">
                <BookOpen className="w-12 h-12 text-gray-400" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Tidak ada kursus ditemukan
              </h3>
              <p className="text-gray-600">
                Coba kata kunci lain atau tambahkan kursus baru.
              </p>
            </div>
          ) : (
            <>
              {viewMode === 'grid' ? (
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-8 mt-8">
                  {courses.map((course) => (
                    <CourseCard key={course._id} course={course} />
                  ))}
                </div>
              ) : (
                <TableView />
              )}

              {totalPages > 1 && (
                <div className="mt-12 flex justify-center">
                  <Pagination
                    currentPage={page}
                    totalPages={totalPages}
                    onPageChange={(p) => setPage(p)}
                    className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-sm border border-white/50 p-2"
                  />
                </div>
              )}
            </>
          )}
        </div>
      </div>

      <CourseFormModal
        isOpen={modalState.isOpen}
        onClose={handleCloseModal}
        mode={modalState.mode}
        currentCourse={modalState.currentCourse}
      />

      <ConfirmationModal
        isOpen={confirmDeleteState.isOpen}
        onClose={closeDeleteConfirmation}
        onConfirm={handleDelete}
        message="Apakah Anda yakin ingin menghapus kursus ini? Semua materi terkait akan ikut terhapus."
      />
    </>
  );
};

export default CourseManagementPage;
