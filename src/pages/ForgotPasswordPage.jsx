// src/pages/ForgotPasswordPage.jsx
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useForgotPassword } from '../hooks/useAuth';
import { getApiErrorMessage } from '/src/utils/apiError.js';

const ForgotPasswordPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [isSuccess, setIsSuccess] = useState(false);
  const { mutate: requestReset, isPending, isError, error } =
    useForgotPassword();

  const onSubmit = (data) => {
    requestReset(data, {
      onSuccess: () => setIsSuccess(true),
    });
  };

  if (isSuccess) {
    return (
      <div className="p-8 w-full max-w-sm text-center">
        <h2 className="text-2xl font-bold mb-2 text-text-primary">
          Periksa Email Anda
        </h2>
        <p className="text-text-muted">
          Jika email Anda terdaftar, kami telah mengirimkan link untuk mereset
          password.
        </p>
      </div>
    );
  }

  return (
    <div className="p-8 w-full max-w-sm">
      <h2 className="text-2xl font-bold mb-2 text-center text-text-primary">
        Lupa Password?
      </h2>
      <p className="text-center text-text-muted mb-6">
        Masukkan email Anda untuk menerima link reset.
      </p>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="relative">
          <input
            type="email"
            placeholder="Email"
            className="w-full px-3 py-2 border border-border rounded-lg"
            {...register('email', { required: 'Email wajib diisi' })}
          />
        </div>
        {errors.email && (
          <p className="text-red-500 text-xs">{errors.email.message}</p>
        )}
        <button
          type="submit"
          className="w-full bg-primary text-white py-2 rounded-lg font-semibold"
          disabled={isPending}
        >
          {isPending ? 'Mengirim...' : 'Kirim Link Reset'}
        </button>
        {isError && (
          <p className="text-red-500 text-center text-sm">
            {getApiErrorMessage(error, 'Gagal mengirim link reset.')}
          </p>
        )}
      </form>
    </div>
  );
};

export default ForgotPasswordPage;
