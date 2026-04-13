import { Navigate } from 'react-router-dom';
import { useAuth } from '../features/auth/AuthContext';
import type { ReactNode } from 'react';

export default function ProtectedRoute({ children }: { children: ReactNode }) {
  const { state } = useAuth();

  if (!state.user) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
}
