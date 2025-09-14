import React, { useState } from 'react';
import { useUsers, useDeleteUser } from '/src/hooks/useAdmin.js';
import { useDebounce } from '/src/hooks/useDebounce.js';
import useToastStore from '/src/store/toastStore.js';
import UserFormModal from '/src/components/admin/UserFormModal.jsx';
import Pagination from '/src/components/Pagination.jsx';
import ConfirmationModal from '/src/components/ConfirmationModal.jsx';
import { Users, Plus, Edit, Trash2, Search } from 'lucide-react';

const UserManagementPage = () => {
  const [page, setPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  const { data: response, isLoading } = useUsers({
    page,
    limit: 10,
    keyword: debouncedSearchTerm,
  });
  const { mutate: deleteUser } = useDeleteUser();
  const { success, confirm } = useToastStore();

  const [modalState, setModalState] = useState({
    isOpen: false,
    mode: null,
    currentUser: null,
  });
  const [confirmDeleteState, setConfirmDeleteState] = useState({
    isOpen: false,
    userId: null,
  });

  const users = response?.data?.data || [];
  const totalUsers = response?.data?.total || 0;
  const totalPages = Math.ceil(totalUsers / 10);

  const handleOpenModal = (mode, user = null) =>
    setModalState({ isOpen: true, mode, currentUser: user });
  const handleCloseModal = () =>
    setModalState({ isOpen: false, mode: null, currentUser: null });
  const openDeleteConfirmation = (userId) =>
    setConfirmDeleteState({ isOpen: true, userId });
  const closeDeleteConfirmation = () =>
    setConfirmDeleteState({ isOpen: false, userId: null });

  const handleDelete = () => {
    deleteUser(confirmDeleteState.userId, {
      onSuccess: () => {
        success('Pengguna berhasil dihapus.');
        closeDeleteConfirmation();
      },
    });
  };

  const roleColorMap = {
    admin: 'bg-red-100 text-red-700',
    instructor: 'bg-blue-100 text-blue-700',
    student: 'bg-green-100 text-green-700',
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
                  Manajemen Pengguna
                  <span className="block text-lg font-normal text-gray-600 mt-2">
                    Kelola semua pengguna terdaftar di platform.
                  </span>
                </h1>
              </div>
              <button
                onClick={() => handleOpenModal('add')}
                className="group relative inline-flex items-center gap-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold px-8 py-4 rounded-2xl hover:shadow-xl hover:shadow-indigo-500/25 transition-all duration-300 transform hover:-translate-y-1 overflow-hidden"
              >
                <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                <Plus className="w-5 h-5 relative z-10" />
                <span className="relative z-10">Tambah Pengguna</span>
              </button>
            </div>

            {/* Search Bar */}
            <div className="flex flex-col sm:flex-row gap-4 mt-8">
              <div className="flex-1 relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Search className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  placeholder="Cari berdasarkan nama atau email..."
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
          ) : users.length === 0 ? (
            <div className="text-center py-20">
              <div className="w-24 h-24 mx-auto mb-6 bg-gray-100 rounded-full flex items-center justify-center">
                <Users className="w-12 h-12 text-gray-400" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Tidak ada pengguna ditemukan
              </h3>
              <p className="text-gray-600">
                Coba kata kunci lain atau tambahkan pengguna baru.
              </p>
            </div>
          ) : (
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden mt-8">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50/80 backdrop-blur-sm">
                    <tr>
                      <th className="text-left p-6 font-semibold text-gray-700 text-sm uppercase tracking-wide">
                        Nama
                      </th>
                      <th className="text-left p-6 font-semibold text-gray-700 text-sm uppercase tracking-wide">
                        Email
                      </th>
                      <th className="text-left p-6 font-semibold text-gray-700 text-sm uppercase tracking-wide">
                        Role
                      </th>
                      <th className="text-right p-6 font-semibold text-gray-700 text-sm uppercase tracking-wide">
                        Aksi
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {users.map((user) => (
                      <tr
                        key={user._id}
                        className="hover:bg-gray-50/50 transition-colors duration-200 group"
                      >
                        <td className="p-6 font-medium text-gray-900">
                          {user.name}
                        </td>
                        <td className="p-6 text-gray-600">{user.email}</td>
                        <td className="p-6">
                          <span
                            className={`px-3 py-1 text-xs font-semibold rounded-full ${
                              roleColorMap[user.role] ||
                              'bg-gray-100 text-gray-700'
                            }`}
                          >
                            {user.role}
                          </span>
                        </td>
                        <td className="p-6 text-right space-x-4">
                          <button
                            onClick={() => handleOpenModal('edit', user)}
                            className="text-blue-600 hover:underline font-medium inline-flex items-center gap-1"
                          >
                            <Edit size={14} /> Edit
                          </button>
                          <button
                            onClick={() => openDeleteConfirmation(user._id)}
                            className="text-red-600 hover:underline font-medium inline-flex items-center gap-1"
                          >
                            <Trash2 size={14} /> Hapus
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

      <UserFormModal
        isOpen={modalState.isOpen}
        onClose={handleCloseModal}
        mode={modalState.mode}
        currentUser={modalState.currentUser}
      />
      <ConfirmationModal
        isOpen={confirmDeleteState.isOpen}
        onClose={closeDeleteConfirmation}
        onConfirm={handleDelete}
        message="Apakah Anda yakin ingin menghapus pengguna ini? Semua data terkait (pendaftaran, progres, dll) akan ikut terhapus."
      />
    </>
  );
};

export default UserManagementPage;
