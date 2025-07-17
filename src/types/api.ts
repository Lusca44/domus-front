
export interface Finalidade {
  id: string;
  nome: string;
}

export interface Tipologia {
  id: string;
  nome: string;
}

export interface Regiao {
  id: string;
  nomeRegiao: string;
  destaque: boolean;
}

export interface ImovelAPI {
  id: string;
  titulo: string;
  urlFotoCard: string;
  urlsFotos: string[];
  finalidadeId: string[];
  tipologiaId: string[];
  regiaoId: string;
  endereco: string;
  quantidadeQuartos: string;
  quantidadeBanheiros: string;
  quantidadeVagas: string;
  quantidadeSuites: string;
  areaQuadrada: string;
  descricaoImovel: string;
  valor: string;
  valorCondominio: string;
  valorIptu: string;
  urlLocalizacaoMaps: string;
}
