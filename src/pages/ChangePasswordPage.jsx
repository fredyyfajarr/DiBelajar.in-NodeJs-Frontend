import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import useToastStore from '/src/store/toastStore.js';
import { useChangePassword } from '/src/hooks/useUser.js';
import { ArrowLeft, Lock, Save, Eye, EyeOff } from 'lucide-react';
import { getApiErrorMessage } from '/src/utils/apiError.js';

const ChangePasswordPage = () => {
  const { success, error } = useToastStore();
  const navigate = useNavigate();

  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isDirty },
    watch,
  } = useForm({
    mode: 'onChange',
  });

  const { mutate: changePassword, isPending } = useChangePassword();

  const onSubmit = (data) => {
    changePassword(data, {
      onSuccess: () => {
        success('Password berhasil diubah!', {
          title: 'Update Berhasil',
        });
        navigate('/profile');
      },
      onError: (err) => {
        error(getApiErrorMessage(err, 'Gagal mengubah password.'), {
          title: 'Update Gagal',
        });
      },
    });
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
          <h1 className="text-4xl font-bold text-gray-900">Ubah Password</h1>
          <p className="text-gray-500 mt-1">
            Pastikan untuk menggunakan password yang kuat.
          </p>
        </div>

        <div className="space-y-6">
          {/* Password Lama */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Password Lama
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type={showOldPassword ? 'text' : 'password'}
                {...register('oldPassword', {
                  required: 'Password lama tidak boleh kosong',
                })}
                className="w-full pl-10 pr-12 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
              <button
                type="button"
                onClick={() => setShowOldPassword(!showOldPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
              >
                {showOldPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
            {errors.oldPassword && (
              <p className="text-red-500 text-xs mt-1">
                {errors.oldPassword.message}
              </p>
            )}
          </div>

          {/* Password Baru */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Password Baru
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type={showNewPassword ? 'text' : 'password'}
                {...register('newPassword', {
                  required: 'Password baru tidak boleh kosong',
                  minLength: {
                    value: 8,
                    message: 'Password minimal 8 karakter',
                  },
                })}
                className="w-full pl-10 pr-12 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
              <button
                type="button"
                onClick={() => setShowNewPassword(!showNewPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
              >
                {showNewPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
            {errors.newPassword && (
              <p className="text-red-500 text-xs mt-1">
                {errors.newPassword.message}
              </p>
            )}
          </div>

          {/* Konfirmasi Password Baru */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Konfirmasi Password Baru
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type={showConfirmPassword ? 'text' : 'password'}
                {...register('confirmNewPassword', {
                  required: 'Konfirmasi password tidak boleh kosong',
                  validate: (value) =>
                    value === watch('newPassword') || 'Password tidak cocok',
                })}
                className="w-full pl-10 pr-12 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
              >
                {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
            {errors.confirmNewPassword && (
              <p className="text-red-500 text-xs mt-1">
                {errors.confirmNewPassword.message}
              </p>
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

export default ChangePasswordPage;
