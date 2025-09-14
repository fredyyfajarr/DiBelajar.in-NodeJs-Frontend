import React, { useState } from 'react';
import { useEnrollments, useDeleteEnrollment } from '/src/hooks/useAdmin.js';
import { useDebounce } from '/src/hooks/useDebounce.js';
import useToastStore from '/src/store/toastStore.js';
import Pagination from '/src/components/Pagination.jsx';
import ConfirmationModal from '/src/components/ConfirmationModal.jsx';
import { BookOpen, Search, Trash2 } from 'lucide-react';

const EnrollmentManagementPage = () => {
  const [page, setPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  const { data: response, isLoading } = useEnrollments({
    page,
    limit: 10,
    keyword: debouncedSearchTerm,
  });
  const { mutate: deleteEnrollment } = useDeleteEnrollment();
  const { success } = useToastStore();

  const [confirmDeleteState, setConfirmDeleteState] = useState({
    isOpen: false,
    data: null,
  });

  const enrollments = response?.data?.data || [];
  const totalEnrollments = response?.data?.total || 0;
  const totalPages = Math.ceil(totalEnrollments / 10);

  const openDeleteConfirmation = (enrollmentData) =>
    setConfirmDeleteState({ isOpen: true, data: enrollmentData });
  const closeDeleteConfirmation = () =>
    setConfirmDeleteState({ isOpen: false, data: null });

  const handleDelete = () => {
    if (confirmDeleteState.data) {
      const { userId, courseId } = confirmDeleteState.data;
      deleteEnrollment(
        { userId: userId._id, courseId: courseId._id },
        {
          onSuccess: () => {
            success('Pendaftaran berhasil dibatalkan.');
            closeDeleteConfirmation();
          },
        }
      );
    }
  };

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
                  Manajemen Pendaftaran
                  <span className="block text-lg font-normal text-gray-600 mt-2">
                    Lihat dan kelola semua data pendaftaran kursus.
                  </span>
                </h1>
              </div>
            </div>

            {/* Search Bar */}
            <div className="flex flex-col sm:flex-row gap-4 mt-8">
              <div className="flex-1 relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Search className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  placeholder="Cari berdasarkan nama pengguna, email, atau judul kursus..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 bg-white/80 backdrop-blur-sm border border-white/50 rounded-2xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent shadow-sm placeholder-gray-500 text-gray-900"
                />
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
          ) : enrollments.length === 0 ? (
            <div className="text-center py-20">
              <div className="w-24 h-24 mx-auto mb-6 bg-gray-100 rounded-full flex items-center justify-center">
                <BookOpen className="w-12 h-12 text-gray-400" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Tidak ada data pendaftaran
              </h3>
              <p className="text-gray-600">
                Saat ini belum ada pengguna yang mendaftar di kursus mana pun.
              </p>
            </div>
          ) : (
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden mt-8">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50/80 backdrop-blur-sm">
                    <tr>
                      <th className="text-left p-6 font-semibold text-gray-700 text-sm uppercase tracking-wide">
                        Nama Pengguna
                      </th>
                      <th className="text-left p-6 font-semibold text-gray-700 text-sm uppercase tracking-wide">
                        Email
                      </th>
                      <th className="text-left p-6 font-semibold text-gray-700 text-sm uppercase tracking-wide">
                        Kursus yang Diikuti
                      </th>
                      <th className="text-right p-6 font-semibold text-gray-700 text-sm uppercase tracking-wide">
                        Aksi
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {enrollments.map((enrollment) => (
                      <tr
                        key={enrollment._id}
                        className="hover:bg-gray-50/50 transition-colors duration-200 group"
                      >
                        <td className="p-6 font-medium text-gray-900">
                          {enrollment.userId?.name || 'Pengguna Dihapus'}
                        </td>
                        <td className="p-6 text-gray-600">
                          {enrollment.userId?.email || 'N/A'}
                        </td>
                        <td className="p-6 text-gray-600">
                          {enrollment.courseId?.title || 'Kursus Dihapus'}
                        </td>
                        <td className="p-6 text-right">
                          <button
                            onClick={() => openDeleteConfirmation(enrollment)}
                            className="text-red-600 hover:underline font-medium inline-flex items-center gap-1"
                          >
                            <Trash2 size={14} /> Batalkan
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
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
        </div>
      </div>

      <ConfirmationModal
        isOpen={confirmDeleteState.isOpen}
        onClose={closeDeleteConfirmation}
        onConfirm={handleDelete}
        message={`Apakah Anda yakin ingin membatalkan pendaftaran "${confirmDeleteState.data?.userId?.name}" dari kursus "${confirmDeleteState.data?.courseId?.title}"?`}
      />
    </>
  );
};

export default EnrollmentManagementPage;
