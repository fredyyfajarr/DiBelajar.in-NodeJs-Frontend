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
      console.log('Login response:', response);
      console.log('Response data:', response.data);
      
      // Periksa struktur response - mungkin struktur berbeda
      if (!response || !response.data) {
        console.error('Invalid response structure:', response);
        return;
      }

      // Coba beberapa kemungkinan struktur response
      let user, token;
      
      if (response.data.data && response.data.token) {
        // Struktur: { data: { data: user, token: token } }
        user = response.data.data;
        token = response.data.token;
      } else if (response.data.user && response.data.token) {
        // Struktur: { data: { user: user, token: token } }
        user = response.data.user;
        token = response.data.token;
      } else if (response.data.data && response.data.data.user) {
        // Struktur: { data: { data: { user: user, token: token } } }
        user = response.data.data.user;
        token = response.data.data.token;
      } else {
        console.error('Unknown response structure:', response.data);
        return;
      }

      // Periksa apakah user dan token ada
      if (!user || !token) {
        console.error('Missing user or token in response:', { user, token });
        return;
      }

      console.log('Saving to store:', { user, token });
      console.log('Token format check:', {
        token,
        startsWithBearer: token.startsWith('Bearer '),
        tokenLength: token.length
      });

      // 1. Simpan data user dan token ke Zustand store
      loginToStore(user, token);

      // 2. Tutup modal login
      closeModal();

      // 3. Tentukan path tujuan berdasarkan role user yang baru saja login
      const destination = getDashboardPath(user);
      console.log('Navigating to:', destination);

      // 4. Arahkan pengguna ke dashboard yang sesuai dengan delay kecil
      setTimeout(() => {
        console.log('Navigating to dashboard after delay');
        navigate(destination);
      }, 100);
    },
    onError: (error) => {
      console.error('Login failed:', error);
      console.error('Error response:', error.response?.data);
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
      console.log('Register response:', response);
      console.log('Response data:', response.data);
      
      // Periksa struktur response - mungkin struktur berbeda
      if (!response || !response.data) {
        console.error('Invalid response structure:', response);
        return;
      }

      // Coba beberapa kemungkinan struktur response
      let user, token;
      
      if (response.data.data && response.data.token) {
        // Struktur: { data: { data: user, token: token } }
        user = response.data.data;
        token = response.data.token;
      } else if (response.data.user && response.data.token) {
        // Struktur: { data: { user: user, token: token } }
        user = response.data.user;
        token = response.data.token;
      } else if (response.data.data && response.data.data.user) {
        // Struktur: { data: { data: { user: user, token: token } } }
        user = response.data.data.user;
        token = response.data.data.token;
      } else {
        console.error('Unknown response structure:', response.data);
        return;
      }

      // Periksa apakah user dan token ada
      if (!user || !token) {
        console.error('Missing user or token in response:', { user, token });
        return;
      }

      console.log('Saving to store:', { user, token });

      // Langsung loginkan user setelah registrasi berhasil
      loginToStore(user, token);
      closeModal();

      // Arahkan ke dashboard student (default setelah registrasi)
      const destination = getDashboardPath(user);
      console.log('Navigating to:', destination);
      
      // Delay kecil untuk memastikan data tersimpan
      setTimeout(() => {
        console.log('Navigating to dashboard after delay');
        navigate(destination);
      }, 100);
    },
    onError: (error) => {
      console.error('Registration failed:', error);
      console.error('Error response:', error.response?.data);
    },
  });
};
