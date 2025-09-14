import React from 'react';
import { useForm } from 'react-hook-form';
import useToastStore from '/src/store/toastStore.js';
import {
  useCategories,
  useCreateCategory,
  useDeleteCategory,
} from '/src/hooks/useCategories.js';

const CategoryManagementPage = () => {
  const { data: categories = [], isLoading } = useCategories();
  const { register, handleSubmit, reset } = useForm();
  const { mutate: createCategory, isPending } = useCreateCategory();
  const { mutate: deleteCategory } = useDeleteCategory();
  const { success, error, confirm } = useToastStore();

  const onSubmit = (data) => {
    createCategory(data, {
      onSuccess: () => {
        reset();
        success('Kategori berhasil ditambahkan');
      },
      onError: () => {
        error('Gagal menambahkan kategori');
      },
    });
  };

  const handleDelete = (id) => {
    confirm('Yakin ingin menghapus kategori ini?', {
      title: 'Konfirmasi Hapus',
      actions: [
        {
          label: 'Batal',
          handler: () => {},
          primary: false,
        },
        {
          label: 'Hapus',
          handler: () => {
            deleteCategory(id, {
              onSuccess: () => {
                success('Kategori berhasil dihapus');
              },
              onError: (err) => {
                const errorMessage =
                  err.response?.data?.error || 'Gagal menghapus kategori';
                error(errorMessage, { title: 'Gagal Menghapus' });
              },
            });
          },
          primary: true,
        },
      ],
    });
  };

  return (
    <div className="container mx-auto p-4 md:p-8">
      <h1 className="text-3xl font-bold mb-6">Manajemen Kategori</h1>
      <div className="grid md:grid-cols-2 gap-8">
        {/* Form Tambah Kategori */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Tambah Kategori Baru</h2>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <label>Nama Kategori</label>
              <input
                {...register('name', { required: true })}
                className="w-full border rounded p-2 mt-1"
              />
            </div>
            <button
              type="submit"
              disabled={isPending}
              className="bg-primary text-white px-4 py-2 rounded"
            >
              {isPending ? 'Menyimpan...' : 'Simpan'}
            </button>
          </form>
        </div>
        {/* Daftar Kategori */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Daftar Kategori</h2>
          {isLoading ? (
            <p>Memuat...</p>
          ) : (
            <ul className="space-y-2">
              {categories.map((cat) => (
                <li
                  key={cat._id}
                  className="flex justify-between items-center p-2 border-b"
                >
                  <span>{cat.name}</span>
                  <button
                    onClick={() => handleDelete(cat._id)}
                    className="text-red-500 hover:text-red-700"
                  >
                    Hapus
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default CategoryManagementPage;
