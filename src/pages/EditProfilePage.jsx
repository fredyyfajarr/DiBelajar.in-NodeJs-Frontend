import React from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import useAuthStore from '/src/store/authStore.js';
import useToastStore from '/src/store/toastStore.js';
import { useUpdateUser } from '/src/hooks/useAdmin.js';
import { ArrowLeft, User, Mail, Save } from 'lucide-react';

const EditProfilePage = () => {
  const { user, updateUser: updateUserInStore } = useAuthStore();
  const { success, error } = useToastStore();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isDirty },
  } = useForm({
    defaultValues: {
      name: user?.name || '',
      email: user?.email || '',
      bio: user?.bio || '',
    },
  });

  const { mutate: updateUser, isPending } = useUpdateUser();

  const onSubmit = (data) => {
    // Hanya siapkan data yang benar-benar berubah untuk dikirim ke backend
    const updatedData = {};
    if (data.name !== user.name) {
      updatedData.name = data.name;
    }
    // Perbandingan bio yang lebih aman untuk nilai null/undefined
    if (data.bio !== (user.bio || '')) {
      updatedData.bio = data.bio;
    }

    // Jika tidak ada perubahan, tidak perlu melakukan apa-apa
    if (Object.keys(updatedData).length === 0) {
      return;
    }

    updateUser(
      { userId: user._id, userData: updatedData },
      {
        onSuccess: () => {
          // Sekarang onSuccess hanya perlu menangani toast dan navigasi
          success('Profil berhasil diperbarui!', {
            title: 'Update Berhasil',
          });
          navigate('/profile');
        },
        onError: (err) => {
          const errorMessage =
            err.response?.data?.error || 'Gagal memperbarui profil.';
          error(errorMessage, {
            title: 'Update Gagal',
          });
        },
      }
    );
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-4xl mx-auto"
    >
      <Link
        to="/profile"
        className="inline-flex items-center gap-2 text-purple-600 font-semibold mb-6 hover:underline"
      >
        <ArrowLeft size={20} />
        Kembali ke Profil
      </Link>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white rounded-2xl shadow-lg p-8"
      >
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900">Edit Profil</h1>
          <p className="text-gray-500 mt-1">
            Perbarui informasi akun Anda di sini.
          </p>
        </div>

        <div className="space-y-6">
          {/* Nama */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Nama Lengkap
            </label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                {...register('name', { required: 'Nama tidak boleh kosong' })}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>
            {errors.name && (
              <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>
            )}
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-500 mb-1">
              Email
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="email"
                {...register('email')}
                className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg bg-gray-100 text-gray-500 cursor-not-allowed"
                disabled
              />
            </div>
          </div>

          {/* Bio */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Bio Singkat
            </label>
            <textarea
              {...register('bio', {
                maxLength: {
                  value: 250,
                  message: 'Bio tidak boleh lebih dari 250 karakter',
                },
              })}
              className="w-full border border-gray-300 rounded-lg p-3"
              rows="3"
              placeholder="Ceritakan sedikit tentang diri Anda..."
            ></textarea>
            {errors.bio && (
              <p className="text-red-500 text-xs mt-1">{errors.bio.message}</p>
            )}
          </div>
        </div>

        <div className="text-right mt-8">
          <motion.button
            type="submit"
            disabled={isPending || !isDirty}
            className="inline-flex items-center gap-2 bg-purple-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Save size={18} />
            {isPending ? 'Menyimpan...' : 'Simpan Perubahan'}
          </motion.button>
        </div>
      </form>
    </motion.div>
  );
};

export default EditProfilePage;
