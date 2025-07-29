import { useState, useEffect } from "react";
import { regiaoApi } from "@/utils/apiConfig";

interface Regiao {
  id: string;
  nomeRegiao: string;
  destaque: boolean;
}

export const useRegioes = () => {
  const [regioes, setRegioes] = useState<Regiao[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const carregarRegioes = async () => {
      try {
        const regioesDaApi = await regiaoApi.obterTodasRegioes();
        setRegioes(regioesDaApi);
      } catch (err) {
        setError("Erro ao carregar regiões");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    carregarRegioes();
  }, []);

  const regioesDestaque = regioes.filter(regiao => regiao.destaque);

  return {
    regioes,
    regioesDestaque,
    loading,
    error
  };
};