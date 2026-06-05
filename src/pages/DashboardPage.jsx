// src/pages/DashboardPage.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import useAuthStore from '../store/authStore';
import authService from '/src/api/authService.js';

const DashboardPage = () => {
  const { user, logout } = useAuthStore();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await authService.logout();
    } catch {
      // Tetap logout lokal walau request logout gagal.
    }
    logout();
    navigate('/');
  };

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-3xl font-bold text-text-primary">
        Selamat Datang, {user?.name || 'Pengguna'}!
      </h1>
      <p className="text-text-muted mt-2">Anda berhasil login.</p>
      <button
        onClick={handleLogout}
        className="mt-6 bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
      >
        Logout
      </button>
    </div>
  );
};
export default DashboardPage;
