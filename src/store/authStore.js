// src/store/authStore.js
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

// Fungsi helper untuk membersihkan token
const sanitizeToken = (token) => {
  if (!token) return null;
  return token.startsWith('Bearer ') ? token.split(' ')[1] : token;
};

const useAuthStore = create(
  persist(
    (set, get) => ({
      user: null,
      token: null,
      isAuthenticated: false,
      login: (userData, token) => {
        const cleanToken = sanitizeToken(token); // <-- Gunakan helper
        set({ user: userData, token: cleanToken, isAuthenticated: true });
      },
      setToken: (newToken) => {
        const cleanToken = sanitizeToken(newToken); // <-- Gunakan helper
        set((state) => ({ ...state, token: cleanToken }));
      },
      updateUser: (newUserData) =>
        set((state) => ({
          user: { ...state.user, ...newUserData },
        })),
      logout: () => {
        set({ user: null, token: null, isAuthenticated: false });
      },
      debugState: () => {
        const state = get();
        console.log('AuthStore: Current state:', state);
        console.log(
          'AuthStore: localStorage:',
          localStorage.getItem('auth-storage')
        );
        return state;
      },
    }),
    {
      name: 'auth-storage', // Nama key di localStorage

      // PERBAIKAN UTAMA: Menggunakan cara standar dan benar untuk localStorage
      storage: createJSONStorage(() => localStorage),
    }
  )
);

export default useAuthStore;
