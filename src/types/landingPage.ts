
export interface LandingPageData {
  id: string;
  nome: string;
  slug: string; // para URL: /regiao/lancamento/slug
  regiao: string;
  status: 'ativo' | 'inativo' | 'rascunho';
  
  // Dados básicos
  titulo: string;
  slogan: string;
  descricao: string;
  endereco: string;
  entrega: string;
  
  // Características
  caracteristicas: {
    titulo: string;
    valor: string;
    icone: string; // nome do ícone do lucide-react
  }[];
  
  // Diferenciais
  diferenciais: string[];
  
  // Seções de conteúdo
  sobreEmpreendimento: {
    titulo: string;
    descricao: string;
  };
  
  localizacao: {
    titulo: string;
    descricao: string;
    facilidades: string[];
    mapaSrc: string;
  };
  
  ctaFinal: {
    titulo: string;
    descricao: string;
    condicoes: string[];
  };
  
  // Metadados
  createdAt: string;
  updatedAt: string;
}

export interface LandingPageFormData extends Omit<LandingPageData, 'id' | 'createdAt' | 'updatedAt'> {}
