import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import authService from '/src/api/authService.js';
import useAuthStore from '/src/store/authStore.js';
import useModalStore from '/src/store/modalStore.js';
import { getDashboardPath } from '../utils/getDashboardPath';

// Hook untuk proses login
export const useLogin = () => {
  const navigate = useNavigate();
  const { login: loginToStore } = useAuthStore();
  const { closeModal } = useModalStore();

  return useMutation({
    mutationFn: authService.login,
    onSuccess: (response) => {
      const { data: user, token } = response.data;

      // 1. Simpan data user dan token ke Zustand store
      loginToStore(user, token);

      // 2. Tutup modal login
      closeModal();

      // 3. Tentukan path tujuan berdasarkan role user yang baru saja login
      const destination = getDashboardPath(user);

      // 4. Arahkan pengguna ke dashboard yang sesuai
      navigate(destination);
    },
    onError: (error) => {
      // Log error details untuk debugging
      console.error('Login failed:', error);
      console.error('Error response:', error.response?.data);
      console.error('Error status:', error.response?.status);
    },
  });
};

// Hook untuk proses registrasi
export const useRegister = () => {
  const navigate = useNavigate();
  const { login: loginToStore } = useAuthStore();
  const { closeModal } = useModalStore();

  return useMutation({
    mutationFn: authService.register,
    onSuccess: (response) => {
      const { data: user, token } = response.data;

      // Langsung loginkan user setelah registrasi berhasil
      loginToStore(user, token);
      closeModal();

      // Arahkan ke dashboard student (default setelah registrasi)
      const destination = getDashboardPath(user);
      navigate(destination);
    },
    onError: (error) => {
      console.error('Registration failed:', error);
    },
  });
};
