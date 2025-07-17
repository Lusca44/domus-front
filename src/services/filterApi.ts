
import { RegiaoAPI } from '@/pages/general-pages/cards-home-page';
import { supabase, isSupabaseConfigured } from '@/integrations/supabase/client';

export const obterTodasFinalidades = async (): Promise<string[]> => {
  try {
    if (isSupabaseConfigured) {
      const { data, error } = await supabase
        .from('finalidades')
        .select('*');
        
      if (error) {
        console.error('Erro ao buscar finalidades:', error);
        return getMockFinalidades();
      }
      
      return data.map((item: any) => item.nomeFinalidade) || [];
    } else {
      console.log('Supabase não configurado, usando dados mock para finalidades');
      return getMockFinalidades();
    }
  } catch (error) {
    console.error('Erro ao carregar finalidades:', error);
    return getMockFinalidades();
  }
};

export const obterTodasTipologias = async (): Promise<string[]> => {
  try {
    if (isSupabaseConfigured) {
      const { data, error } = await supabase
        .from('tipologias')
        .select('*');
        
      if (error) {
        console.error('Erro ao buscar tipologias:', error);
        return getMockTipologias();
      }
      
      return data.map((item: any) => item.nomeTipologia) || [];
    } else {
      console.log('Supabase não configurado, usando dados mock para tipologias');
      return getMockTipologias();
    }
  } catch (error) {
    console.error('Erro ao carregar tipologias:', error);
    return getMockTipologias();
  }
};

export const obterTodasRegioes = async (): Promise<RegiaoAPI[]> => {
  try {
    if (isSupabaseConfigured) {
      const { data, error } = await supabase
        .from('regioes')
        .select('*');
        
      if (error) {
        console.error('Erro ao buscar regiões:', error);
        return getMockRegioes();
      }
      
      return data || [];
    } else {
      console.log('Supabase não configurado, usando dados mock para regiões');
      return getMockRegioes();
    }
  } catch (error) {
    console.error('Erro ao carregar regiões:', error);
    return getMockRegioes();
  }
};

// Mock data functions
const getMockFinalidades = (): string[] => {
  return ['Aluguel', 'Venda', 'Lançamento'];
};

const getMockTipologias = (): string[] => {
  return ['Apartamento', 'Casa', 'Cobertura', 'Studio', 'Sala Comercial', 'Loja'];
};

const getMockRegioes = (): RegiaoAPI[] => {
  return [
    {
      nomeRegiao: "Porto Maravilha",
      id: "68753c6c8291d97eb6d66768",
      destaque: true
    },
    {
      nomeRegiao: "Recreio",
      id: "68753d548291d97eb6d66769",
      destaque: false
    },
    {
      nomeRegiao: "Barra da Tijuca",
      id: "68753d5c8291d97eb6d6676a",
      destaque: true
    },
    {
      nomeRegiao: "Taquara",
      id: "68753d658291d97eb6d6676b",
      destaque: false
    },
    {
      nomeRegiao: "Niterói",
      id: "68753d6e8291d97eb6d6676c",
      destaque: false
    },
    {
      nomeRegiao: "Campo Grande",
      id: "68753d9b8291d97eb6d6676d",
      destaque: false
    }
  ];
};

// Make sure the Supabase client file exists
export const checkSupabaseConnection = async (): Promise<boolean> => {
  return isSupabaseConfigured;
};
