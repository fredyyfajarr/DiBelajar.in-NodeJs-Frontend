import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  // TAMBAHKAN BLOK build DI BAWAH INI
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          react: ['react', 'react-dom', 'react-router-dom'],
          query: ['@tanstack/react-query', 'zustand'],
          editor: ['@tinymce/tinymce-react'],
          motion: ['framer-motion'],
        },
      },
    },
    terserOptions: {
      compress: {
        drop_console: true, // Ini akan menghapus semua console.log saat build
        drop_debugger: true,
      },
    },
  },
});
