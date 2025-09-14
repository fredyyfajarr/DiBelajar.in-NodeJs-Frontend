import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import useAuthStore from '/src/store/authStore.js';

const ProtectedRoute = () => {
  const { isAuthenticated, user, token, debugState } = useAuthStore();

  // console.log('ProtectedRoute: Checking authentication:', { isAuthenticated, user, token });

  // Debug state untuk melihat data yang tersimpan
  React.useEffect(() => {
    // console.log('ProtectedRoute: useEffect - Current state:', debugState());
  }, [debugState]);

  if (!isAuthenticated) {
    // console.log('ProtectedRoute: Not authenticated, redirecting to home');
    // Jika tidak login, selalu arahkan ke halaman utama.
    return <Navigate to="/" replace />;
  }

  // console.log('ProtectedRoute: Authenticated, rendering protected content');
  return <Outlet />;
};

export default ProtectedRoute;
