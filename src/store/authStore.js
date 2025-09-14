// src/store/authStore.js
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

// 'persist' akan menyimpan state ke localStorage secara otomatis
const useAuthStore = create(
  persist(
    (set, get) => ({
      user: null,
      token: null,
      isAuthenticated: false,
      // Aksi untuk menyimpan data setelah login berhasil
      login: (userData, token) => {
        console.log('AuthStore: Saving user data:', { userData, token });
        set({ user: userData, token, isAuthenticated: true });
        console.log('AuthStore: Data saved successfully');
        
        // Verifikasi data tersimpan
        setTimeout(() => {
          const currentState = get();
          console.log('AuthStore: Current state after save:', currentState);
          console.log('AuthStore: localStorage data:', localStorage.getItem('auth-storage'));
        }, 100);
      },
      updateUser: (newUserData) =>
        set((state) => ({
          user: { ...state.user, ...newUserData },
        })),
      // Aksi untuk membersihkan data setelah logout
      logout: () => {
        console.log('AuthStore: Logging out user');
        set({ user: null, token: null, isAuthenticated: false });
        // Hapus juga dari localStorage
        localStorage.removeItem('auth-storage');
      },
      // Debug function untuk melihat state saat ini
      debugState: () => {
        const state = get();
        console.log('AuthStore: Current state:', state);
        console.log('AuthStore: localStorage:', localStorage.getItem('auth-storage'));
        return state;
      },
    }),
    {
      name: 'auth-storage', // Nama key di localStorage
      // Tambahkan partialize untuk memastikan semua data tersimpan
      partialize: (state) => ({
        user: state.user,
        token: state.token,
        isAuthenticated: state.isAuthenticated,
      }),
      // Tambahkan storage untuk fallback
      storage: {
        getItem: (name) => {
          try {
            const item = localStorage.getItem(name);
            console.log('Zustand: Getting from localStorage:', item);
            return item;
          } catch (error) {
            console.error('Zustand: Error getting from localStorage:', error);
            return null;
          }
        },
        setItem: (name, value) => {
          try {
            console.log('Zustand: Setting to localStorage:', { name, value });
            localStorage.setItem(name, value);
          } catch (error) {
            console.error('Zustand: Error setting to localStorage:', error);
          }
        },
        removeItem: (name) => {
          try {
            console.log('Zustand: Removing from localStorage:', name);
            localStorage.removeItem(name);
          } catch (error) {
            console.error('Zustand: Error removing from localStorage:', error);
          }
        },
      },
    }
  )
);

export default useAuthStore;
