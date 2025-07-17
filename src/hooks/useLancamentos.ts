
import { useEffect, useState } from 'react';
import { lancamentos, loadLancamentosFromAPI } from '@/cards/lancamentos/lancamentos';
import { Imovel } from '@/cards/imoveis';

export const useLancamentos = () => {
  const [lancamentosData, setLancamentosData] = useState<Imovel[]>(lancamentos);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        await loadLancamentosFromAPI();
        setLancamentosData([...lancamentos]); // Forçar re-render
      } catch (error) {
        console.error('Erro ao carregar lançamentos:', error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  return { lancamentos: lancamentosData, loading };
};
