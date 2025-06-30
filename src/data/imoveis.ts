
import cardPixinguinhaImg from "./images/card-pixinguinha.jpeg";

export interface Imovel {
  id: string;
  titulo: string;
  descricao: string;
  preco: string;
  imagem: string;
  regiao: string;
  quartos: number;
  area: string;
  url: string;
  destaque: boolean;
  tipo: "lancamento" | "aluguel" | "imoveis-usados";
}

// Re-exportar os dados dos arquivos específicos
export { lancamentos } from './lancamentos';
export { alugueis } from './alugueis';
export { imoveisUsados } from './imoveis-usados';

// Manter as funções de filtro para compatibilidade
export const getLancamentos = () => import('./lancamentos').then(m => m.lancamentos);
export const getAlugueis = () => import('./alugueis').then(m => m.alugueis);
export const getImoveisUsados = () => import('./imoveis-usados').then(m => m.imoveisUsados);
