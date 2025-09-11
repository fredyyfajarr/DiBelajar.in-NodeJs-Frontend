// src/pages/LoginPage.jsx
import React from 'react';
import { useForm } from 'react-hook-form';
import { useLogin } from '../hooks/useAuth';
import useModalStore from '../store/modalStore';

const LoginPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { mutate: login, isPending, isError, error } = useLogin();
  const { openModal } = useModalStore();

  const onSubmit = (data) => {
    console.log('Form data:', data);
    login(data);
  };

  const switchToRegister = () => openModal('REGISTER');
  const switchToForgotPassword = () => openModal('FORGOT_PASSWORD'); // <-- Tambahkan ini

  return (
    <div className="p-8 w-full max-w-sm">
      <h2 className="text-2xl font-bold mb-1 text-center text-text-primary">
        Selamat Datang Kembali
      </h2>
      <p className="text-center text-text-muted mb-6">
        Silakan login untuk melanjutkan.
      </p>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
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
            className="w-full pl-10 pr-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            {...register('password', { required: 'Password wajib diisi' })}
          />
        </div>
        {errors.password && (
          <p className="text-red-500 text-xs -mt-2">
            {errors.password.message}
          </p>
        )}
        <div className="text-right text-sm">
          <button
            type="button" // <-- Penting agar tidak men-submit form
            onClick={switchToForgotPassword}
            className="font-semibold text-primary hover:underline"
          >
            Lupa Password?
          </button>
        </div>
        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-primary text-white py-2 rounded-lg hover:opacity-90 transition-opacity disabled:opacity-50 font-semibold"
          disabled={isPending}
        >
          {isPending ? 'Loading...' : 'Login'}
        </button>

        {isError && (
          <p className="text-red-500 text-center text-sm">
            {error.response?.data?.error || 'Login gagal!'}
          </p>
        )}
      </form>

      <p className="text-center text-text-muted text-sm mt-6">
        Belum punya akun?{' '}
        <button
          onClick={switchToRegister}
          className="font-semibold text-primary hover:underline"
        >
          Daftar di sini
        </button>
      </p>
    </div>
  );
};

export default LoginPage;
