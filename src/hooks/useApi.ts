
import { useState, useCallback } from 'react';
import { useToast } from '@/hooks/use-toast';

interface UseApiOptions {
  showSuccessToast?: boolean;
  showErrorToast?: boolean;
  successMessage?: string;
  errorMessage?: string;
}

export const useApi = <T = any>(options: UseApiOptions = {}) => {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  const {
    showSuccessToast = false,
    showErrorToast = true,
    successMessage = 'Operação realizada com sucesso',
    errorMessage = 'Erro ao realizar operação',
  } = options;

  const execute = useCallback(
    async (apiCall: () => Promise<T>) => {
      try {
        setLoading(true);
        setError(null);
        
        const result = await apiCall();
        setData(result);
        
        if (showSuccessToast) {
          toast({
            title: 'Sucesso',
            description: successMessage,
          });
        }
        
        return result;
      } catch (err) {
        const errorMsg = err instanceof Error ? err.message : errorMessage;
        setError(errorMsg);
        
        if (showErrorToast) {
          toast({
            title: 'Erro',
            description: errorMsg,
            variant: 'destructive',
          });
        }
        
        throw err;
      } finally {
        setLoading(false);
      }
    },
    [toast, showSuccessToast, showErrorToast, successMessage, errorMessage]
  );

  const reset = useCallback(() => {
    setData(null);
    setError(null);
    setLoading(false);
  }, []);

  return {
    data,
    loading,
    error,
    execute,
    reset,
  };
};
