
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';

interface AuthState {
  token: string | null;
  user: any | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

export const useAuth = () => {
  const [authState, setAuthState] = useState<AuthState>({
    token: null,
    user: null,
    isAuthenticated: false,
    isLoading: true
  });
  
  const navigate = useNavigate();
  const { toast } = useToast();

  // Verificar token no localStorage ao inicializar
  useEffect(() => {
    const checkAuth = () => {
      try {
        const token = localStorage.getItem('token');
        const user = localStorage.getItem('user');
        
        if (token && user) {
          setAuthState({
            token,
            user: JSON.parse(user),
            isAuthenticated: true,
            isLoading: false
          });
        } else {
          setAuthState({
            token: null,
            user: null,
            isAuthenticated: false,
            isLoading: false
          });
        }
      } catch (error) {
        console.error('Erro ao verificar autenticação:', error);
        // Se houver erro ao parsear dados, limpar localStorage
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        setAuthState({
          token: null,
          user: null,
          isAuthenticated: false,
          isLoading: false
        });
      }
    };

    checkAuth();
  }, []);

  const login = (token: string, userData: any) => {
    try {
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(userData));
      
      setAuthState({
        token,
        user: userData,
        isAuthenticated: true,
        isLoading: false
      });

      toast({
        title: "Login realizado com sucesso!",
        description: "Redirecionando para o dashboard...",
      });

      navigate('/admin/dashboard');
    } catch (error) {
      console.error('Erro ao fazer login:', error);
      toast({
        title: "Erro no login",
        description: "Erro interno. Tente novamente.",
        variant: "destructive",
      });
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    
    setAuthState({
      token: null,
      user: null,
      isAuthenticated: false,
      isLoading: false
    });

    toast({
      title: "Logout realizado",
      description: "Você foi desconectado com sucesso.",
    });

    navigate('/admin/login');
  };

  const requireAuth = () => {
    if (!authState.isAuthenticated && !authState.isLoading) {
      toast({
        title: "Acesso negado",
        description: "Você precisa fazer login para acessar esta página.",
        variant: "destructive",
      });
      navigate('/admin/login');
      return false;
    }
    return true;
  };

  return {
    ...authState,
    login,
    logout,
    requireAuth
  };
};
