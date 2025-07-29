import { Imovel } from "../imoveis";

export let alugueis: Imovel[] = [];
export let imoveisUsados: Imovel[] = [];

export const updateAlugueisFromAPI = (apiAlugueis: Imovel[]) => {
  alugueis.length = 0;
  alugueis.push(...apiAlugueis);
};

export const updateImoveisUsadosFromAPI = (apiImoveisUsados: Imovel[]) => {
  imoveisUsados.length = 0;
  imoveisUsados.push(...apiImoveisUsados);
};