import { Navigate } from 'react-router-dom';
import { useAuthStore } from '../../stores/authStore';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requireAuth?: boolean;
  requiredRole?: 'user' | 'admin';
}

export default function ProtectedRoute({ 
  children, 
  requireAuth = true, 
  requiredRole 
}: ProtectedRouteProps) {
  const { isAuthenticated, user } = useAuthStore();

  if (requireAuth && !isAuthenticated) {
    return <Navigate to="/auth/login" replace />;
  }

  if (requiredRole && (!user || user.role !== requiredRole)) {
    return <Navigate to="/unauthorized" replace />;
  }

  return <>{children}</>;
}