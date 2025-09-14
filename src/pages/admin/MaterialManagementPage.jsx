import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useMaterials, useDeleteMaterial } from '/src/hooks/useAdmin.js';
import { useCourseDetail } from '/src/hooks/useCourses.js'; // Impor hook untuk detail kursus
import useAuthStore from '/src/store/authStore.js';
import MaterialFormModal from '/src/components/admin/MaterialFormModal.jsx';
import ConfirmationModal from '/src/components/ConfirmationModal.jsx';

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

  const { data: response, isLoading: isLoadingMaterials } =
    useMaterials(courseId);
  const { mutate: deleteMaterial } = useDeleteMaterial();

  // Mengambil data detail kursus secara terpisah
  const { data: courseData, isLoading: isLoadingCourse } =
    useCourseDetail(courseId);

  const materials = response?.data?.data || [];
  // Menggunakan judul dari courseData, bukan dari materi pertama
  const courseTitle = courseData?.course?.title || 'Memuat Nama Kursus...';

  const basePath =
    user?.role === 'admin' ? '/admin/courses' : '/instructor/courses';

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

  // Gabungkan status loading
  const isLoading = isLoadingMaterials || isLoadingCourse;

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-6">
        <Link
          to={basePath}
          className="text-sm text-primary hover:underline mb-2 inline-block"
        >
          &larr; Kembali ke Daftar Kursus
        </Link>
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 font-sans mt-2">
          Manajemen Materi: <span className="font-normal">{courseTitle}</span>
        </h1>
      </div>
      <div className="flex justify-end mb-4">
        <button
          onClick={() => handleOpenModal('add')}
          className="bg-primary text-white font-semibold px-4 py-2 rounded-xl hover:bg-opacity-90 transition-all duration-200"
        >
          + Tambah Materi
        </button>
      </div>
      <div className="bg-white p-6 rounded-2xl shadow-md">
        {isLoading ? (
          <p className="text-center py-4 text-gray-600">Memuat materi...</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left p-3 font-semibold text-gray-700">
                    Judul Materi
                  </th>
                  <th className="text-left p-3 font-semibold text-gray-700">
                    Deskripsi
                  </th>
                  <th className="text-left p-3 font-semibold text-gray-700">
                    Aksi
                  </th>
                </tr>
              </thead>
              <tbody>
                {materials.length > 0 ? (
                  materials.map((material) => (
                    <tr
                      key={material._id}
                      className="border-b border-gray-100 last:border-0 hover:bg-gray-50 transition-colors duration-200"
                    >
                      <td className="p-3 font-medium text-gray-900">
                        {material.title}
                      </td>
                      <td
                        className="p-3 text-sm text-gray-600"
                        dangerouslySetInnerHTML={{
                          __html:
                            material.description.substring(0, 70) +
                            (material.description.length > 70 ? '...' : ''),
                        }}
                      />
                      <td className="p-3">
                        <Link
                          to={`${basePath}/${courseId}/materials/${
                            material.slug || material._id
                          }`}
                          className="text-green-600 hover:underline mr-4 font-medium"
                        >
                          Detail
                        </Link>
                        <button
                          onClick={() => handleOpenModal('edit', material)}
                          className="text-blue-600 hover:underline mr-4 font-medium"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => openDeleteConfirmation(material._id)}
                          className="text-red-600 hover:underline font-medium"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="3" className="text-center p-4 text-gray-600">
                      Belum ada materi untuk kursus ini.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
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
    </div>
  );
};

export default MaterialManagementPage;
