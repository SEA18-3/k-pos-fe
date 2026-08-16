import { Navigate } from 'react-router-dom';
import type { ReactElement } from 'react';
import { useAuthStore, type UserRole } from '../store/auth';
import { getDefaultRoute } from '../utils/auth';

interface RequireRoleProps {
  roles: UserRole[];
  children: ReactElement;
}

// Authorization boundary berbasis role. Jangan hanya menyembunyikan menu —
// user yang mengetik URL secara manual tetap ditolak (redirect).
export const RequireRole: React.FC<RequireRoleProps> = ({ roles, children }) => {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const user = useAuthStore((state) => state.user);

  if (!isAuthenticated || !user) {
    return <Navigate to="/login" replace />;
  }

  if (!roles.includes(user.role)) {
    return <Navigate to={getDefaultRoute(user.role)} replace />;
  }

  return children;
};