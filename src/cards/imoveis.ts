
import cardPixinguinhaImg from "./images/card-pixinguinha.jpeg";

export interface Imovel {
  id: string;
  titulo: string;
  descricao: string;
  preco: string;
  imagem: string;
  regiao: string;
  quartos: number;
  banheiros?: number;
  quartosDisponiveis?: number[];
  area: string;
  areasDisponiveis?: string[];
  url: string;
  destaque: boolean;
  tipo: "lancamento" | "aluguel" | "imoveis-usados";
  
  // Adicione estas novas propriedades:
  tipologia?: string[]; // Tipologias do imóvel
  finalidade?: string;   // Finalidade do imóvel
  regiaoDestaque?: boolean;
  statusObra?: "Lançamento" | "Em obras" | "Pronto";
  
  // Mantenha a tipagem existente para compatibilidade
  tipagem?: string[]; 
  vagas?: number
}

export interface RegiaoDestaque {
  nome: string;
  destaque: boolean;
}

// Re-exportar os dados dos arquivos específicos
export { lancamentos } from './lancamentos/lancamentos';
export { alugueis } from './alugueis/alugueis';
export { imoveisUsados } from './imoveis-usados/imoveis-usados';

// Manter as funções de filtro para compatibilidade
export const getLancamentos = () => import('./lancamentos/lancamentos').then(m => m.lancamentos);
export const getAlugueis = () => import('./alugueis/alugueis').then(m => m.alugueis);
export const getImoveisUsados = () => import('./imoveis-usados/imoveis-usados').then(m => m.imoveisUsados);
