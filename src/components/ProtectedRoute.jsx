import { useEffect, useState } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import authService from '/src/api/authService.js';
import useAuthStore from '/src/store/authStore.js';

const ProtectedRoute = () => {
  const { isAuthenticated, token, user, setUser, logout } = useAuthStore();
  const [isCheckingSession, setIsCheckingSession] = useState(
    !!token && !user
  );

  useEffect(() => {
    if (!token || user) {
      setIsCheckingSession(false);
      return;
    }

    let isMounted = true;

    authService
      .getMe()
      .then((response) => {
        if (isMounted) {
          setUser(response.data.data);
        }
      })
      .catch(() => {
        if (isMounted) {
          logout();
        }
      })
      .finally(() => {
        if (isMounted) {
          setIsCheckingSession(false);
        }
      });

    return () => {
      isMounted = false;
    };
  }, [logout, setUser, token, user]);

  if (isCheckingSession) {
    return (
      <div className="flex min-h-[40vh] items-center justify-center text-gray-500">
        Memuat sesi...
      </div>
    );
  }

  if (!isAuthenticated || !token) {
    // Jika tidak login, selalu arahkan ke halaman utama.
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
