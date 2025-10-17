import { Navigate } from 'react-router-dom';
import { useAuthStore } from '../../stores/authStore';

export default function AuthRedirect() {
  const { isAuthenticated, user } = useAuthStore();

  if (!isAuthenticated) {
    return <Navigate to="/auth/login" replace />;
  }

  if (user?.role === 'admin') {
    return <Navigate to="/admin" replace />;
  }

  return <Navigate to="/home" replace />;
}