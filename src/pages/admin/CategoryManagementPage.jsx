import React, { useState } from 'react';
import useToastStore from '/src/store/toastStore.js';
import { useCategories, useDeleteCategory } from '/src/hooks/useCategories.js';
import { useDebounce } from '/src/hooks/useDebounce.js';
import CategoryFormModal from '/src/components/admin/CategoryFormModal.jsx';
import ConfirmationModal from '/src/components/ConfirmationModal.jsx';
import Pagination from '/src/components/Pagination.jsx';
import { Tag, Plus, Edit, Trash2, Search } from 'lucide-react';

const CategoryManagementPage = () => {
  const [page, setPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  // Asumsi useCategories bisa menerima parameter search
  const { data: response, isLoading } = useCategories({
    page,
    limit: 10,
    keyword: debouncedSearchTerm,
  });
  const { mutate: deleteCategory } = useDeleteCategory();

  const { success, error, confirm } = useToastStore();

  const [modalState, setModalState] = useState({
    isOpen: false,
    mode: 'add',
    currentCategory: null,
  });
  const [confirmDeleteState, setConfirmDeleteState] = useState({
    isOpen: false,
    categoryId: null,
  });

  const categories = response || [];
  const totalCategories = response?.length || 0; // Ganti ini jika API Anda mengembalikan total
  const totalPages = Math.ceil(totalCategories / 10);

  const handleOpenModal = (mode, category = null) => {
    setModalState({ isOpen: true, mode, currentCategory: category });
  };
  const handleCloseModal = () => {
    setModalState({ isOpen: false, mode: 'add', currentCategory: null });
  };

  const openDeleteConfirmation = (id) => {
    setConfirmDeleteState({ isOpen: true, categoryId: id });
  };
  const closeDeleteConfirmation = () => {
    setConfirmDeleteState({ isOpen: false, categoryId: null });
  };

  const handleDelete = () => {
    deleteCategory(confirmDeleteState.categoryId, {
      onSuccess: () => {
        success('Kategori berhasil dihapus');
        closeDeleteConfirmation();
      },
      onError: (err) => {
        const errorMessage =
          err.response?.data?.error || 'Gagal menghapus kategori.';
        error(errorMessage, { title: 'Gagal Menghapus' });
        closeDeleteConfirmation();
      },
    });
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
                  Manajemen Kategori
                  <span className="block text-lg font-normal text-gray-600 mt-2">
                    Kelola semua kategori kursus di sini.
                  </span>
                </h1>
              </div>
              <button
                onClick={() => handleOpenModal('add')}
                className="group relative inline-flex items-center gap-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold px-8 py-4 rounded-2xl hover:shadow-xl hover:shadow-indigo-500/25 transition-all duration-300 transform hover:-translate-y-1 overflow-hidden"
              >
                <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                <Plus className="w-5 h-5 relative z-10" />
                <span className="relative z-10">Tambah Kategori</span>
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
                  placeholder="Cari berdasarkan nama kategori..."
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
          ) : categories.length === 0 ? (
            <div className="text-center py-20">
              <div className="w-24 h-24 mx-auto mb-6 bg-gray-100 rounded-full flex items-center justify-center">
                <Tag className="w-12 h-12 text-gray-400" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Belum ada kategori
              </h3>
              <p className="text-gray-600 mb-6">
                Mulai dengan menambahkan kategori pertama Anda.
              </p>
            </div>
          ) : (
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden mt-8">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50/80 backdrop-blur-sm">
                    <tr>
                      <th className="text-left p-6 font-semibold text-gray-700 text-sm uppercase tracking-wide">
                        Nama Kategori
                      </th>
                      <th className="text-left p-6 font-semibold text-gray-700 text-sm uppercase tracking-wide">
                        Slug
                      </th>
                      <th className="text-right p-6 font-semibold text-gray-700 text-sm uppercase tracking-wide">
                        Aksi
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {categories.map((cat) => (
                      <tr
                        key={cat._id}
                        className="hover:bg-gray-50/50 transition-colors duration-200 group"
                      >
                        <td className="p-6 font-medium text-gray-900">
                          {cat.name}
                        </td>
                        <td className="p-6 text-gray-600 font-mono text-sm">
                          {cat.slug}
                        </td>
                        <td className="p-6 text-right space-x-4">
                          <button
                            onClick={() => handleOpenModal('edit', cat)}
                            className="text-blue-600 hover:underline font-medium inline-flex items-center gap-1"
                          >
                            <Edit size={14} /> Edit
                          </button>
                          <button
                            onClick={() => openDeleteConfirmation(cat._id)}
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

      <CategoryFormModal
        isOpen={modalState.isOpen}
        onClose={handleCloseModal}
        mode={modalState.mode}
        currentCategory={modalState.currentCategory}
      />
      <ConfirmationModal
        isOpen={confirmDeleteState.isOpen}
        onClose={closeDeleteConfirmation}
        onConfirm={handleDelete}
        message="Apakah Anda yakin ingin menghapus kategori ini? Tindakan ini tidak dapat dibatalkan."
      />
    </>
  );
};

export default CategoryManagementPage;
