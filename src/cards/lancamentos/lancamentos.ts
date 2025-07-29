import { Imovel } from "../imoveis";

export let lancamentos: Imovel[] = [];

export const updateLancamentosFromAPI = (apiLancamentos: Imovel[]) => {
  lancamentos.length = 0;
  lancamentos.push(...apiLancamentos);
};
