// src/hooks/useAuth.js

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
      // PERBAIKAN: Langsung gunakan data dari response API
      const { data: user, token } = response.data;

      if (user && token) {
        // 1. Simpan data user dan token ke Zustand store
        loginToStore(user, token);
        // 2. Tutup modal login
        closeModal();
        // 3. Arahkan pengguna ke dashboard yang sesuai
        const destination = getDashboardPath(user);
        navigate(destination);
      } else {
        console.error('Login response missing user or token:', response.data);
      }
    },
    onError: (error) => {
      console.error('Login failed:', error.response?.data);
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
      // PERBAIKAN: Langsung gunakan data dari response API
      const { data: user, token } = response.data;

      if (user && token) {
        loginToStore(user, token);
        closeModal();
        const destination = getDashboardPath(user);
        navigate(destination);
      } else {
        console.error(
          'Register response missing user or token:',
          response.data
        );
      }
    },
    onError: (error) => {
      console.error('Registration failed:', error.response?.data);
    },
  });
};
