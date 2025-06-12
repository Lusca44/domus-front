
/**
 * HOOK CUSTOMIZADO PARA REQUISIÇÕES DE API
 * 
 * Este hook simplifica o uso das APIs nos componentes React, fornecendo:
 * - Estados de loading, data e error automaticamente
 * - Tratamento de erros com toast notifications
 * - Mensagens de sucesso configuráveis
 * - Função para resetar o estado
 * 
 * Como usar:
 * const { data, loading, error, execute } = useApi();
 * await execute(() => leadsApi.create(formData));
 */

import { useState, useCallback } from 'react';
import { useToast } from '@/hooks/use-toast';

/**
 * OPÇÕES DE CONFIGURAÇÃO DO HOOK
 */
interface UseApiOptions {
  showSuccessToast?: boolean;    // Mostrar toast de sucesso?
  showErrorToast?: boolean;      // Mostrar toast de erro?
  successMessage?: string;       // Mensagem personalizada de sucesso
  errorMessage?: string;         // Mensagem personalizada de erro
}

/**
 * HOOK useApi
 * 
 * @param options - Opções de configuração
 * @returns - Estados e funções para gerenciar requisições
 */
export const useApi = <T = any>(options: UseApiOptions = {}) => {
  // Estados internos do hook
  const [data, setData] = useState<T | null>(null);  // Dados retornados da API
  const [loading, setLoading] = useState(false);     // Estado de carregamento
  const [error, setError] = useState<string | null>(null); // Mensagem de erro
  const { toast } = useToast(); // Hook para mostrar notificações

  // Configurações padrão com fallback
  const {
    showSuccessToast = false,
    showErrorToast = true,
    successMessage = 'Operação realizada com sucesso',
    errorMessage = 'Erro ao realizar operação',
  } = options;

  /**
   * FUNÇÃO PRINCIPAL: execute
   * 
   * Esta função executa qualquer chamada de API e gerencia todos os estados.
   * 
   * Exemplo de uso:
   * const { execute } = useApi({ showSuccessToast: true });
   * await execute(() => leadsApi.create(dadosDoFormulario));
   */
  const execute = useCallback(
    async (apiCall: () => Promise<T>) => {
      try {
        setLoading(true);  // Ativar loading
        setError(null);    // Limpar erros anteriores
        
        console.log('🚀 Executando chamada de API...');
        const result = await apiCall(); // Executar a função da API
        
        setData(result);   // Salvar resultado
        console.log('✅ API executada com sucesso:', result);
        
        // Mostrar toast de sucesso se configurado
        if (showSuccessToast) {
          toast({
            title: 'Sucesso',
            description: successMessage,
          });
        }
        
        return result; // Retornar resultado para o componente
      } catch (err) {
        // Tratar erro
        const errorMsg = err instanceof Error ? err.message : errorMessage;
        setError(errorMsg);
        console.error('❌ Erro na API:', errorMsg);
        
        // Mostrar toast de erro se configurado
        if (showErrorToast) {
          toast({
            title: 'Erro',
            description: errorMsg,
            variant: 'destructive',
          });
        }
        
        throw err; // Re-lançar erro para o componente tratar se necessário
      } finally {
        setLoading(false); // Desativar loading sempre
      }
    },
    [toast, showSuccessToast, showErrorToast, successMessage, errorMessage]
  );

  /**
   * FUNÇÃO PARA RESETAR ESTADOS
   * 
   * Útil para limpar dados antes de uma nova operação
   */
  const reset = useCallback(() => {
    setData(null);
    setError(null);
    setLoading(false);
  }, []);

  // Retornar estados e funções para o componente
  return {
    data,      // Dados retornados da API
    loading,   // Estado de carregamento
    error,     // Mensagem de erro (se houver)
    execute,   // Função para executar chamadas de API
    reset,     // Função para resetar estados
  };
};
