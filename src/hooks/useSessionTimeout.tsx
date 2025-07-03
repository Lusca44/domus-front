
import { useEffect, useRef } from 'react';
import { useAuth } from '@/hooks/useAuth';

const SESSION_TIMEOUT = 30 * 60 * 1000; // 30 minutos em millisegundos
const WARNING_TIME = 5 * 60 * 1000; // 5 minutos antes de expirar

export const useSessionTimeout = () => {
  const { isAuthenticated, logout } = useAuth();
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const warningRef = useRef<NodeJS.Timeout | null>(null);

  const resetTimer = () => {
    // Limpar timers existentes
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    if (warningRef.current) {
      clearTimeout(warningRef.current);
    }

    // Só configurar timer se estiver autenticado
    if (isAuthenticated) {
      // Timer de aviso (5 minutos antes)
      warningRef.current = setTimeout(() => {
        console.log('Sessão expirará em 5 minutos');
      }, SESSION_TIMEOUT - WARNING_TIME);

      // Timer de logout
      timeoutRef.current = setTimeout(() => {
        console.log('Sessão expirada - fazendo logout automático');
        logout();
      }, SESSION_TIMEOUT);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      resetTimer();

      // Eventos que resetam o timer (atividade do usuário)
      const events = ['mousedown', 'mousemove', 'keypress', 'scroll', 'touchstart', 'click'];
      
      const resetTimerHandler = () => {
        resetTimer();
      };

      // Adicionar listeners para atividade do usuário
      events.forEach(event => {
        document.addEventListener(event, resetTimerHandler, true);
      });

      return () => {
        // Limpar listeners
        events.forEach(event => {
          document.removeEventListener(event, resetTimerHandler, true);
        });
        
        // Limpar timers
        if (timeoutRef.current) {
          clearTimeout(timeoutRef.current);
        }
        if (warningRef.current) {
          clearTimeout(warningRef.current);
        }
      };
    }
  }, [isAuthenticated]);

  return { resetTimer };
};
