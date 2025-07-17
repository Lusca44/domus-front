
import { supabase } from "@/integrations/supabase/client";
import { Finalidade, Tipologia, Regiao } from "@/types/api";

export const obterTodasFinalidades = async (): Promise<Finalidade[]> => {
  try {
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
