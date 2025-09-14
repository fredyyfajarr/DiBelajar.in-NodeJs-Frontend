import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import Modal from '/src/components/Modal.jsx';
import {
  useCreateCategory,
  useUpdateCategory,
} from '/src/hooks/useCategories.js'; // Kita akan tambah useUpdateCategory

const CategoryFormModal = ({ isOpen, onClose, mode, currentCategory }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const { mutate: createCategory, isPending: isCreating } = useCreateCategory();
  const { mutate: updateCategory, isPending: isUpdating } = useUpdateCategory();

  useEffect(() => {
    if (isOpen) {
      if (mode === 'edit' && currentCategory) {
        reset({ name: currentCategory.name });
      } else {
        reset({ name: '' });
      }
    }
  }, [isOpen, mode, currentCategory, reset]);

  const onSubmit = (data) => {
    const handleSuccess = () => {
      reset();
      onClose();
    };

    if (mode === 'edit') {
      updateCategory(
        { categoryId: currentCategory._id, categoryData: data },
        { onSuccess: handleSuccess }
      );
    } else {
      createCategory(data, { onSuccess: handleSuccess });
    }
  };

  const isPending = isCreating || isUpdating;

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="p-6 w-full max-w-lg">
        <h2 className="text-2xl font-bold mb-4">
          {mode === 'edit' ? 'Edit Kategori' : 'Tambah Kategori Baru'}
        </h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Nama Kategori
            </label>
            <input
              {...register('name', { required: 'Nama kategori wajib diisi' })}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3"
            />
            {errors.name && (
              <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>
            )}
          </div>
          <div className="pt-4 flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-200 rounded-md"
            >
              Batal
            </button>
            <button
              type="submit"
              disabled={isPending}
              className="px-4 py-2 bg-primary text-white rounded-md disabled:opacity-50"
            >
              {isPending ? 'Menyimpan...' : 'Simpan'}
            </button>
          </div>
        </form>
      </div>
    </Modal>
  );
};

export default CategoryFormModal;
