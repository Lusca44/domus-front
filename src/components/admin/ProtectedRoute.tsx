
import { useEffect } from 'react';
import { useAuth } from '@/hooks/useAuth';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const { isAuthenticated, isLoading, requireAuth } = useAuth();

  useEffect(() => {
    if (!isLoading) {
      requireAuth();
    }
  }, [isAuthenticated, isLoading, requireAuth]);

  // Mostrar loading enquanto verifica autenticação
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Verificando autenticação...</p>
        </div>
      </div>
    );
  }

  // Só renderizar o conteúdo se estiver autenticado
  if (!isAuthenticated) {
    return null;
  }

  return <>{children}</>;
};
