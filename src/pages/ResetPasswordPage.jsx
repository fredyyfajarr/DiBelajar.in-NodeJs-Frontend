import React from 'react';
import { useForm } from 'react-hook-form';
import { Link, useParams } from 'react-router-dom';
import { Lock, Save } from 'lucide-react';
import { useResetPassword } from '../hooks/useAuth';
import { getApiErrorMessage } from '/src/utils/apiError.js';

const ResetPasswordPage = () => {
  const { token } = useParams();
  const { mutate: resetPassword, isPending, isError, error } =
    useResetPassword();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({ mode: 'onChange' });

  const onSubmit = (data) => {
    resetPassword({
      token,
      password: data.password,
      confirmPassword: data.confirmPassword,
    });
  };

  return (
    <div className="max-w-md mx-auto bg-white rounded-2xl shadow-lg p-8">
      <h1 className="text-3xl font-bold text-gray-900 text-center">
        Reset Password
      </h1>
      <p className="text-gray-500 text-center mt-2 mb-8">
        Masukkan password baru untuk akun Anda.
      </p>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Password Baru
          </label>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="password"
              autoComplete="new-password"
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              {...register('password', {
                required: 'Password baru wajib diisi',
                minLength: {
                  value: 8,
                  message: 'Password minimal 8 karakter',
                },
              })}
            />
          </div>
          {errors.password && (
            <p className="text-red-500 text-xs mt-1">
              {errors.password.message}
            </p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Konfirmasi Password
          </label>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="password"
              autoComplete="new-password"
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              {...register('confirmPassword', {
                required: 'Konfirmasi password wajib diisi',
                validate: (value) =>
                  value === watch('password') || 'Password tidak cocok',
              })}
            />
          </div>
          {errors.confirmPassword && (
            <p className="text-red-500 text-xs mt-1">
              {errors.confirmPassword.message}
            </p>
          )}
        </div>

        {isError && (
          <p className="text-red-500 text-sm text-center">
            {getApiErrorMessage(error, 'Gagal reset password.')}
          </p>
        )}

        <button
          type="submit"
          disabled={isPending}
          className="w-full inline-flex items-center justify-center gap-2 bg-purple-600 text-white py-3 rounded-lg font-semibold hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Save size={18} />
          {isPending ? 'Menyimpan...' : 'Simpan Password Baru'}
        </button>
      </form>

      <Link
        to="/"
        className="block text-center text-sm text-purple-600 font-semibold mt-6 hover:underline"
      >
        Kembali ke beranda
      </Link>
    </div>
  );
};

export default ResetPasswordPage;
