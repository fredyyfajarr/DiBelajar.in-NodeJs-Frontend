import axios from 'axios';
import useAuthStore from '/src/store/authStore.js';

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api',
});

// Interceptor untuk menyisipkan token JWT secara otomatis
axiosInstance.interceptors.request.use(
  (config) => {
    // Ambil token dari Zustand store
    const token = useAuthStore.getState().token;
    if (token) {
      // Jika token ada, tambahkan ke header Authorization dengan format Bearer
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    if (config.data instanceof FormData) {
      delete config.headers['Content-Type']; // biar browser set otomatis
    } else if (config.data && typeof config.data === 'object' && !config.headers['Content-Type']) {
      // Set Content-Type untuk JSON data jika belum ada
      config.headers['Content-Type'] = 'application/json';
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Interceptor untuk menangani response error (401, 403, dll)
axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // Jika mendapat error 401 (Unauthorized) dan bukan dari endpoint login/register
    if (error.response?.status === 401 && !error.config?.url?.includes('/auth/')) {
      const { logout } = useAuthStore.getState();
      logout();
      // Redirect ke halaman utama
      window.location.href = '/';
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
