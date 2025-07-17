
import { supabase, isSupabaseConfigured } from "@/integrations/supabase/client";
import { Finalidade, Tipologia, Regiao } from "@/types/api";

export const obterTodasFinalidades = async (): Promise<Finalidade[]> => {
  try {
    if (!isSupabaseConfigured() || !supabase) {
      console.warn('Supabase not configured, returning mock data');
      return [
        { id: '1', nome: 'Venda' },
        { id: '2', nome: 'Aluguel' }
      ];
    }
    
    const { data, error } = await supabase.functions.invoke('obterTodasFinalidades');
    
    if (error) {
      console.error('Erro ao buscar finalidades:', error);
      return [];
    }
    
    return data || [];
  } catch (error) {
    console.error('Erro ao buscar finalidades:', error);
    return [];
  }
};

export const obterTodasTipologias = async (): Promise<Tipologia[]> => {
  try {
    if (!isSupabaseConfigured() || !supabase) {
      console.warn('Supabase not configured, returning mock data');
      return [
        { id: '1', nome: 'Apartamento' },
        { id: '2', nome: 'Casa' },
        { id: '3', nome: 'Studio' }
      ];
    }
    
    const { data, error } = await supabase.functions.invoke('obterTodasTipologias');
    
    if (error) {
      console.error('Erro ao buscar tipologias:', error);
      return [];
    }
    
    return data || [];
  } catch (error) {
    console.error('Erro ao buscar tipologias:', error);
    return [];
  }
};

export const obterTodasRegioes = async (): Promise<Regiao[]> => {
  try {
    if (!isSupabaseConfigured() || !supabase) {
      console.warn('Supabase not configured, returning mock data');
      return [
        { id: '1', nomeRegiao: 'Porto Maravilha', destaque: true },
        { id: '2', nomeRegiao: 'Barra da Tijuca', destaque: true },
        { id: '3', nomeRegiao: 'Copacabana', destaque: false }
      ];
    }
    
    const { data, error } = await supabase.functions.invoke('obterTodasRegioes');
    
    if (error) {
      console.error('Erro ao buscar regiões:', error);
      return [];
    }
    
    return data || [];
  } catch (error) {
    console.error('Erro ao buscar regiões:', error);
    return [];
  }
};
