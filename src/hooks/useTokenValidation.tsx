
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/hooks/use-toast';

export const useTokenValidation = () => {
  const { isAuthenticated, isLoading, token } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    // Só valida se não estiver carregando
    if (!isLoading) {
      // Se não estiver autenticado ou não tiver token
      if (!isAuthenticated || !token) {
        toast({
          title: "Sessão expirada",
          description: "Faça login novamente para continuar.",
          variant: "destructive",
        });
        navigate('/admin/login');
      }
    }
  }, [isAuthenticated, isLoading, token, navigate, toast]);

  return { isAuthenticated, isLoading };
};
