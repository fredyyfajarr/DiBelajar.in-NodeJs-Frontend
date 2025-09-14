// src/pages/RegisterPage.jsx
import React from 'react';
import { useForm } from 'react-hook-form';
import { useRegister } from '../hooks/useAuth';
import useModalStore from '../store/modalStore';

const RegisterPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { mutate: registerUser, isPending, isError, error } = useRegister();
  const { openModal } = useModalStore();

  const onSubmit = (data) => {
    registerUser(data);
  };

  const switchToLogin = () => {
    openModal('LOGIN');
  };

  return (
    <div className="p-8 w-full max-w-sm">
      <h2 className="text-2xl font-bold mb-1 text-center text-text-primary">
        Buat Akun Baru
      </h2>
      <p className="text-center text-text-muted mb-6">
        Gratis dan hanya butuh beberapa detik.
      </p>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Name Field */}
        <div className="relative">
          <span className="absolute inset-y-0 left-0 flex items-center pl-3">
            <svg
              className="h-5 w-5 text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
              />
            </svg>
          </span>
          <input
            type="text"
            placeholder="Nama Lengkap"
            className="w-full pl-10 pr-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            {...register('name', {
              required: 'Nama wajib diisi',
              minLength: { value: 3, message: 'Nama minimal 3 karakter' },
            })}
          />
        </div>
        {errors.name && (
          <p className="text-red-500 text-xs -mt-2">{errors.name.message}</p>
        )}

        {/* Email Field */}
        <div className="relative">
          <span className="absolute inset-y-0 left-0 flex items-center pl-3">
            <svg
              className="h-5 w-5 text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
              />
            </svg>
          </span>
          <input
            type="email"
            placeholder="Email"
            autoComplete="email"
            className="w-full pl-10 pr-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            {...register('email', { required: 'Email wajib diisi' })}
          />
        </div>
        {errors.email && (
          <p className="text-red-500 text-xs -mt-2">{errors.email.message}</p>
        )}

        {/* Password Field */}
        <div className="relative">
          <span className="absolute inset-y-0 left-0 flex items-center pl-3">
            <svg
              className="h-5 w-5 text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
              />
            </svg>
          </span>
          <input
            type="password"
            placeholder="Password"
            autoComplete="new-password"
            className="w-full pl-10 pr-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            {...register('password', {
              required: 'Password wajib diisi',
              minLength: { value: 8, message: 'Password minimal 8 karakter' },
            })}
          />
        </div>
        {errors.password && (
          <p className="text-red-500 text-xs -mt-2">
            {errors.password.message}
          </p>
        )}

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-primary text-white py-2 rounded-lg hover:opacity-90 transition-opacity disabled:opacity-50 font-semibold"
          disabled={isPending}
        >
          {isPending ? 'Mendaftarkan...' : 'Buat Akun'}
        </button>

        {isError && (
          <p className="text-red-500 text-center text-sm">
            {error.response?.data?.error || 'Registrasi gagal!'}
          </p>
        )}
      </form>

      <p className="text-center text-text-muted text-sm mt-6">
        Sudah punya akun?{' '}
        <button
          onClick={switchToLogin}
          className="font-semibold text-primary hover:underline"
        >
          Login di sini
        </button>
      </p>
    </div>
  );
};

export default RegisterPage;
