import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useMaterials, useDeleteMaterial } from '/src/hooks/useAdmin.js';
import { useCourseDetail } from '/src/hooks/useCourses.js';
import useAuthStore from '/src/store/authStore.js';
import MaterialFormModal from '/src/components/admin/MaterialFormModal.jsx';
import ConfirmationModal from '/src/components/ConfirmationModal.jsx';
import { Plus, Edit, Trash2, BookOpen, Search } from 'lucide-react';

const MaterialManagementPage = () => {
  const { courseId } = useParams();
  const { user } = useAuthStore();

  const [modalState, setModalState] = useState({
    isOpen: false,
    mode: null,
    currentMaterial: null,
  });
  const [confirmDeleteState, setConfirmDeleteState] = useState({
    isOpen: false,
    materialId: null,
  });

  const { data: materialsResponse, isLoading: isLoadingMaterials } =
    useMaterials(courseId);
  const { data: courseData, isLoading: isLoadingCourse } =
    useCourseDetail(courseId);
  const { mutate: deleteMaterial } = useDeleteMaterial();

  const materials = materialsResponse?.data?.data || [];
  const courseTitle = courseData?.course?.title || 'Memuat Nama Kursus...';
  const basePath =
    user?.role === 'admin' ? '/admin/courses' : '/instructor/courses';
  const isLoading = isLoadingMaterials || isLoadingCourse;

  const handleOpenModal = (mode, material = null) =>
    setModalState({ isOpen: true, mode, currentMaterial: material });
  const handleCloseModal = () =>
    setModalState({ isOpen: false, mode: null, currentMaterial: null });
  const openDeleteConfirmation = (materialId) =>
    setConfirmDeleteState({ isOpen: true, materialId });
  const closeDeleteConfirmation = () =>
    setConfirmDeleteState({ isOpen: false, materialId: null });

  const handleDelete = () => {
    deleteMaterial(
      { courseId, materialId: confirmDeleteState.materialId },
      { onSuccess: closeDeleteConfirmation }
    );
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
                <Link
                  to={basePath}
                  className="text-sm font-semibold text-indigo-600 hover:underline mb-2 inline-block"
                >
                  &larr; Kembali ke Daftar Kursus
                </Link>
                <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-2">
                  Manajemen Materi
                </h1>
                <p className="text-lg font-normal text-gray-600">
                  Untuk kursus:{' '}
                  <span className="font-semibold">{courseTitle}</span>
                </p>
              </div>
              <button
                onClick={() => handleOpenModal('add')}
                className="group relative inline-flex items-center gap-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold px-8 py-4 rounded-2xl hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
              >
                <Plus className="w-5 h-5" />
                <span>Tambah Materi</span>
              </button>
            </div>
          </div>
        </div>

        {/* Content Section */}
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 pb-12">
          {isLoading ? (
            <div className="flex items-center justify-center py-20">
              <div className="w-16 h-16 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin"></div>
            </div>
          ) : materials.length === 0 ? (
            <div className="text-center py-20">
              <div className="w-24 h-24 mx-auto mb-6 bg-gray-100 rounded-full flex items-center justify-center">
                <BookOpen className="w-12 h-12 text-gray-400" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Belum ada materi
              </h3>
              <p className="text-gray-600">
                Mulai dengan menambahkan materi pertama untuk kursus ini.
              </p>
            </div>
          ) : (
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden mt-8">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50/80">
                    <tr>
                      <th className="text-left p-6 font-semibold text-gray-700 text-sm uppercase tracking-wide">
                        Judul Materi
                      </th>
                      <th className="text-left p-6 font-semibold text-gray-700 text-sm uppercase tracking-wide">
                        Deskripsi Singkat
                      </th>
                      <th className="text-right p-6 font-semibold text-gray-700 text-sm uppercase tracking-wide">
                        Aksi
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {materials.map((material) => (
                      <tr
                        key={material._id}
                        className="hover:bg-gray-50/50 transition-colors"
                      >
                        <td className="p-6 font-medium text-gray-900">
                          {material.title}
                        </td>
                        <td className="p-6 text-gray-600 text-sm">
                          <div
                            className="line-clamp-2"
                            dangerouslySetInnerHTML={{
                              __html: material.description,
                            }}
                          />
                        </td>
                        <td className="p-6 text-right space-x-4">
                          <Link
                            to={`${basePath}/${courseId}/materials/${
                              material.slug || material._id
                            }`}
                            className="text-green-600 hover:underline font-medium inline-flex items-center gap-1"
                          >
                            Detail
                          </Link>
                          <button
                            onClick={() => handleOpenModal('edit', material)}
                            className="text-blue-600 hover:underline font-medium inline-flex items-center gap-1"
                          >
                            <Edit size={14} /> Edit
                          </button>
                          <button
                            onClick={() => openDeleteConfirmation(material._id)}
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
        </div>
      </div>

      <MaterialFormModal
        key={modalState.mode + (modalState.currentMaterial?._id || 'new')}
        isOpen={modalState.isOpen}
        onClose={handleCloseModal}
        mode={modalState.mode}
        currentMaterial={modalState.currentMaterial}
        courseId={courseId}
      />
      <ConfirmationModal
        isOpen={confirmDeleteState.isOpen}
        onClose={closeDeleteConfirmation}
        onConfirm={handleDelete}
        message="Apakah Anda yakin ingin menghapus materi ini?"
      />
    </>
  );
};

export default MaterialManagementPage;
