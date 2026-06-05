import { Navigate, Outlet } from 'react-router-dom';
import useAuthStore from '/src/store/authStore.js';

const ProtectedRoute = () => {
  const { isAuthenticated } = useAuthStore();

  if (!isAuthenticated) {
    // Jika tidak login, selalu arahkan ke halaman utama.
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
