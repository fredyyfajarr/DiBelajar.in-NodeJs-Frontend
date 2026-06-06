import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  BarChart3,
  BookOpen,
  Edit,
  FileText,
  Grid2X2,
  List,
  Plus,
  Search,
  Trash2,
  Users,
} from 'lucide-react';
import ConfirmationModal from '/src/components/ConfirmationModal.jsx';
import Pagination from '/src/components/Pagination.jsx';
import CourseFormModal from '/src/components/admin/CourseFormModal.jsx';
import {
  useAdminCourses,
  useDeleteCourse,
  useInstructorCourses,
} from '/src/hooks/useAdmin.js';
import useAuthStore from '/src/store/authStore.js';
import useToastStore from '/src/store/toastStore.js';
import { useDebounce } from '/src/hooks/useDebounce.js';

const getCoursePath = (role, course, suffix) =>
  `/${role === 'admin' ? 'admin' : 'instructor'}/courses/${
    course.slug || course._id
  }/${suffix}`;

const CourseActions = ({ course, user, onEdit, onDelete }) => (
  <div className="flex flex-wrap gap-2">
    <Link
      to={getCoursePath(user?.role, course, 'materials')}
      className="inline-flex items-center gap-1.5 rounded-md border border-gray-200 px-3 py-2 text-sm font-semibold text-gray-700 transition hover:bg-gray-50"
    >
      <FileText className="h-4 w-4" />
      Materi
    </Link>
    {user?.role === 'instructor' && (
      <Link
        to={getCoursePath(user?.role, course, 'enrollments')}
        className="inline-flex items-center gap-1.5 rounded-md border border-gray-200 px-3 py-2 text-sm font-semibold text-gray-700 transition hover:bg-gray-50"
      >
        <Users className="h-4 w-4" />
        Pendaftar
      </Link>
    )}
    <Link
      to={getCoursePath(user?.role, course, 'analytics')}
      className="inline-flex items-center gap-1.5 rounded-md border border-gray-200 px-3 py-2 text-sm font-semibold text-gray-700 transition hover:bg-gray-50"
    >
      <BarChart3 className="h-4 w-4" />
      Analitik
    </Link>
    <button
      type="button"
      onClick={() => onEdit(course)}
      className="inline-flex items-center gap-1.5 rounded-md border border-blue-200 px-3 py-2 text-sm font-semibold text-blue-700 transition hover:bg-blue-50"
    >
      <Edit className="h-4 w-4" />
      Edit
    </button>
    <button
      type="button"
      onClick={() => onDelete(course._id)}
      className="inline-flex items-center gap-1.5 rounded-md border border-red-200 px-3 py-2 text-sm font-semibold text-red-700 transition hover:bg-red-50"
    >
      <Trash2 className="h-4 w-4" />
      Hapus
    </button>
  </div>
);

const CourseCard = ({ course, user, onEdit, onDelete }) => (
  <article className="overflow-hidden rounded-lg border border-gray-200 bg-white transition hover:border-primary/40 hover:shadow-sm">
    <img
      src={course.thumbnail}
      alt={course.title}
      className="h-44 w-full object-cover"
    />
    <div className="p-5">
      <p className="text-xs font-semibold uppercase tracking-wide text-gray-500">
        {course.category?.name || 'Kursus'}
      </p>
      <h3 className="mt-2 line-clamp-2 text-lg font-semibold text-gray-900">
        {course.title}
      </h3>
      <p className="mt-2 flex items-center gap-2 text-sm text-gray-600">
        <Users className="h-4 w-4 text-gray-400" />
        {course.instructorId?.name || 'Instruktur'}
      </p>
      <div className="mt-5 border-t border-gray-100 pt-4">
        <CourseActions
          course={course}
          user={user}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      </div>
    </div>
  </article>
);

const CourseTable = ({ courses, user, onEdit, onDelete }) => (
  <div className="overflow-hidden rounded-lg border border-gray-200 bg-white">
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead className="bg-gray-50 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">
          <tr>
            <th className="p-4">Kursus</th>
            <th className="p-4">Instruktur</th>
            <th className="p-4">Kategori</th>
            <th className="p-4 text-right">Aksi</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
          {courses.map((course) => (
            <tr key={course._id} className="align-top">
              <td className="p-4">
                <div className="flex gap-3">
                  <img
                    src={course.thumbnail}
                    alt={course.title}
                    className="h-16 w-24 rounded-md object-cover"
                  />
                  <div>
                    <p className="font-semibold text-gray-900">
                      {course.title}
                    </p>
                    <p className="mt-1 text-xs text-gray-500">
                      {course.slug || course._id}
                    </p>
                  </div>
                </div>
              </td>
              <td className="p-4 text-sm text-gray-600">
                {course.instructorId?.name || 'N/A'}
              </td>
              <td className="p-4 text-sm text-gray-600">
                {course.category?.name || '-'}
              </td>
              <td className="p-4">
                <div className="flex justify-end">
                  <CourseActions
                    course={course}
                    user={user}
                    onEdit={onEdit}
                    onDelete={onDelete}
                  />
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);

const CourseManagementPage = () => {
  const { user } = useAuthStore();
  const { success } = useToastStore();
  const [page, setPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [viewMode, setViewMode] = useState('grid');
  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  const queryParams = {
    page,
    limit: 10,
    keyword: debouncedSearchTerm,
  };
  const isInstructor = user?.role === 'instructor';
  const adminCoursesQuery = useAdminCourses(queryParams, {
    enabled: user?.role === 'admin',
  });
  const instructorCoursesQuery = useInstructorCourses(queryParams, {
    enabled: isInstructor,
  });
  const activeCoursesQuery = isInstructor
    ? instructorCoursesQuery
    : adminCoursesQuery;
  const { data: response, isLoading } = activeCoursesQuery;
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
  const totalCourses = response?.data?.total || courses.length;
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

  return (
    <>
      <div className="min-h-screen bg-gray-50">
        <div className="border-b border-gray-200 bg-white">
          <div className="container mx-auto px-4 py-8">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
              <div>
                <p className="text-sm font-semibold uppercase tracking-wide text-primary">
                  {isInstructor ? 'Instructor workspace' : 'Admin workspace'}
                </p>
                <h1 className="mt-2 text-3xl font-bold text-gray-900">
                  Manajemen Kursus
                </h1>
                <p className="mt-2 text-gray-600">
                  Kelola konten kursus, materi, enrollment, dan analitik dari
                  satu tempat.
                </p>
              </div>
              <button
                type="button"
                onClick={() => handleOpenModal('add')}
                className="inline-flex items-center justify-center gap-2 rounded-md bg-primary px-4 py-2 text-sm font-semibold text-white transition hover:bg-primary/90"
              >
                <Plus className="h-4 w-4" />
                Tambah kursus
              </button>
            </div>

            <div className="mt-6 flex flex-col gap-3 md:flex-row md:items-center">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Cari judul atau deskripsi kursus..."
                  value={searchTerm}
                  onChange={(event) => {
                    setSearchTerm(event.target.value);
                    setPage(1);
                  }}
                  className="w-full rounded-md border border-gray-300 bg-white py-2 pl-10 pr-4 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                />
              </div>
              <div className="inline-flex rounded-md border border-gray-300 bg-white p-1">
                <button
                  type="button"
                  onClick={() => setViewMode('grid')}
                  className={`inline-flex items-center gap-2 rounded px-3 py-1.5 text-sm font-semibold ${
                    viewMode === 'grid'
                      ? 'bg-gray-900 text-white'
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  <Grid2X2 className="h-4 w-4" />
                  Grid
                </button>
                <button
                  type="button"
                  onClick={() => setViewMode('table')}
                  className={`inline-flex items-center gap-2 rounded px-3 py-1.5 text-sm font-semibold ${
                    viewMode === 'table'
                      ? 'bg-gray-900 text-white'
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  <List className="h-4 w-4" />
                  Table
                </button>
              </div>
            </div>
          </div>
        </div>

        <main className="container mx-auto px-4 py-8">
          <div className="mb-5 flex items-center justify-between">
            <p className="text-sm text-gray-600">
              {totalCourses} kursus ditemukan
            </p>
          </div>

          {isLoading ? (
            <div className="rounded-lg border border-gray-200 bg-white p-8 text-center text-gray-500">
              Memuat kursus...
            </div>
          ) : courses.length === 0 ? (
            <div className="rounded-lg border border-dashed border-gray-300 bg-white p-10 text-center">
              <BookOpen className="mx-auto h-12 w-12 text-gray-300" />
              <h3 className="mt-4 text-lg font-semibold text-gray-900">
                Belum ada kursus
              </h3>
              <p className="mt-2 text-gray-600">
                Tambahkan kursus pertama atau ubah kata kunci pencarian.
              </p>
            </div>
          ) : viewMode === 'grid' ? (
            <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
              {courses.map((course) => (
                <CourseCard
                  key={course._id}
                  course={course}
                  user={user}
                  onEdit={(item) => handleOpenModal('edit', item)}
                  onDelete={openDeleteConfirmation}
                />
              ))}
            </div>
          ) : (
            <CourseTable
              courses={courses}
              user={user}
              onEdit={(item) => handleOpenModal('edit', item)}
              onDelete={openDeleteConfirmation}
            />
          )}

          {totalPages > 1 && (
            <div className="mt-8 flex justify-center">
              <Pagination
                currentPage={page}
                totalPages={totalPages}
                onPageChange={(nextPage) => setPage(nextPage)}
              />
            </div>
          )}
        </main>
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
