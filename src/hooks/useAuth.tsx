
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';

interface AuthState {
  token: string | null;
  user: any | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  isAdmin: boolean;
}

export const useAuth = () => {
  const [authState, setAuthState] = useState<AuthState>({
    token: null,
    user: null,
    isAuthenticated: false,
    isLoading: true,
    isAdmin: false
  });
  
  const navigate = useNavigate();
  const { toast } = useToast();

  // Verificar token no localStorage ao inicializar
  useEffect(() => {
    const checkAuth = () => {
      try {
        const token = localStorage.getItem('token');
        const user = localStorage.getItem('user');
        const loginTime = localStorage.getItem('loginTime');
        
        if (token && user && loginTime) {
          const userData = JSON.parse(user);
          const loginTimestamp = parseInt(loginTime);
          const currentTime = Date.now();
          const sessionDuration = 60 * 60 * 1000; // 30 minutos
          
          // Verificar se a sessão expirou
          if (currentTime - loginTimestamp > sessionDuration) {
            // Sessão expirada
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            localStorage.removeItem('loginTime');
            
            setAuthState({
              token: null,
              user: null,
              isAuthenticated: false,
              isLoading: false,
              isAdmin: false
            });
            
            toast({
              title: "Sessão expirada",
              description: "Sua sessão expirou. Faça login novamente.",
              variant: "destructive",
            });
            
            return;
          }
          
          // Verificar se o usuário é admin
          const isAdminUser = userData?.isAdmin === true;
        
          setAuthState({
            token,
            user: userData,
            isAuthenticated: true,
            isLoading: false,
            isAdmin: isAdminUser
          });
        } else {
          setAuthState({
            token: null,
            user: null,
            isAuthenticated: false,
            isLoading: false,
            isAdmin: false
          });
        }
      } catch (error) {
        console.error('Erro ao verificar autenticação:', error);
        // Se houver erro ao parsear dados, limpar localStorage
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        localStorage.removeItem('loginTime');
        setAuthState({
          token: null,
          user: null,
          isAuthenticated: false,
          isLoading: false,
          isAdmin: false
        });
      }
    };

    checkAuth();
  }, [toast]);

  const login = (token: string, userData: any) => {
    try {
      const loginTime = Date.now().toString();
      
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(userData));
      localStorage.setItem('loginTime', loginTime);
      
      console.log(token)
      console.log(userData)

      // Verificar se o usuário é admin
      const isAdminUser = userData?.isAdmin === true;
      
      setAuthState({
        token,
        user: userData,
        isAuthenticated: true,
        isLoading: false,
        isAdmin: isAdminUser
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
    localStorage.removeItem('loginTime');
    
    setAuthState({
      token: null,
      user: null,
      isAuthenticated: false,
      isLoading: false,
      isAdmin: false
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
    authState,
    login,
    logout,
    requireAuth
  };
};
