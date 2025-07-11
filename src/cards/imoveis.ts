
import cardPixinguinhaImg from "./images/card-pixinguinha.jpeg";

export interface Imovel {
  id: string;
  titulo: string;
  descricao: string;
  preco: string;
  imagem: string;
  regiao: string;
  quartos: number;
  quartosDisponiveis?: number[];
  area: string;
  areasDisponiveis?: string[]; // Lista de áreas disponíveis para o imóvel (ex: ["41m²", "22m²", "30m²"])
  url: string;
  destaque: boolean;
  tipo: "lancamento" | "aluguel" | "imoveis-usados";
  tipagem?: string[]; 
  regiaoDestaque?: boolean;
  // Status da obra para lançamentos: "Lançamento", "Em obras", "Pronto"
  statusObra?: "Lançamento" | "Em obras" | "Pronto";
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
