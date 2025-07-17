
import { useState, useEffect } from 'react';
import { obterTodasFinalidades, obterTodasTipologias, obterTodasRegioes } from '@/services/filterApi';
import { Finalidade, Tipologia, Regiao } from '@/types/api';

export const useFilterData = (allProperties: any[]) => {
  const [finalidades, setFinalidades] = useState<Finalidade[]>([]);
  const [tipologias, setTipologias] = useState<Tipologia[]>([]);
  const [regioes, setRegioes] = useState<Regiao[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadFilterData = async () => {
      try {
        setLoading(true);
        const [finalidadesData, tipologiasData, regioesData] = await Promise.all([
          obterTodasFinalidades(),
          obterTodasTipologias(),
          obterTodasRegioes()
        ]);

        setFinalidades(finalidadesData);
        setTipologias(tipologiasData);
        setRegioes(regioesData);
      } catch (error) {
        console.error('Erro ao carregar dados dos filtros:', error);
      } finally {
        setLoading(false);
      }
    };

    loadFilterData();
  }, []);

  // Extrair quartos únicos dos imóveis
  const quartosDisponiveis = Array.from(
    new Set(
      allProperties
        .filter(item => item.quartosDisponiveis)
        .flatMap(item => item.quartosDisponiveis)
    )
  ).sort((a, b) => a - b);

  // Extrair áreas únicas dos imóveis
  const areasDisponiveis = Array.from(
    new Set(
      allProperties
        .filter(item => item.areasDisponiveis)
        .flatMap(item => item.areasDisponiveis)
    )
  ).sort();

  // Extrair valores únicos dos imóveis (para criar ranges)
  const valoresDisponiveis = allProperties
    .filter(item => item.valor)
    .map(item => {
      const numbers = item.valor.replace(/[^\d]/g, '');
      return parseInt(numbers) || 0;
    })
    .filter(val => val > 0)
    .sort((a, b) => a - b);

  return {
    finalidades,
    tipologias,
    regioes,
    quartosDisponiveis,
    areasDisponiveis,
    valoresDisponiveis,
    loading
  };
};
