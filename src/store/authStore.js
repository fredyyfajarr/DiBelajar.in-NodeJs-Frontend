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
        const cleanToken = sanitizeToken(token);
        set({ user: userData, token: cleanToken, isAuthenticated: true });
      },
      setToken: (newToken) => {
        const cleanToken = sanitizeToken(newToken);
        set((state) => ({ ...state, token: cleanToken }));
      },

      // --- PERBAIKAN UTAMA DAN FINAL DI SINI ---
      updateUser: (newUserData) => {
        // DEBUGGING LANGKAH 3: Apakah fungsi ini dipanggil, dan apa isinya?
        console.log(
          'AUTH STORE: Menerima data baru untuk diupdate:',
          newUserData
        );
        set((currentState) => {
          const updatedUser = { ...currentState.user, ...newUserData };
          return { ...currentState, user: updatedUser };
        });
      },

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
      name: 'auth-storage',
      storage: createJSONStorage(() => localStorage),
    }
  )
);

export default useAuthStore;
