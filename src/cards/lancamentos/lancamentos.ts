
import cardPixinguinhaImg from "./images/card-pixinguinha.jpeg";
import { Imovel } from "../imoveis";
import { resolveImageUrl } from "@/utils/imageConfig";

export let lancamentos: Imovel[] = [

];

export const updateLancamentosFromAPI = (apiLancamentos: Imovel[]) => {
  lancamentos.length = 0;
  lancamentos.push(...apiLancamentos);
};


const obterRegiao = async (regiaoId: string): Promise<string> => {
  try {
    const { regiaoApi } = await import('../../utils/apiConfig');
    const regiao = await regiaoApi.getById(regiaoId);
    return regiao.nomeRegiao || "Região não encontrada";
  } catch (error) {
    console.error(`Erro ao obter região ${regiaoId}:`, error);
    return "Região desconhecida";
  }
};

export const loadLancamentosFromAPI = async () => {
  try {
    const { lancamentoApi } = await import('../../utils/apiConfig');
    const apiLancamentos = await lancamentoApi.obterTodosLancamentos();
   
    if (!apiLancamentos || apiLancamentos.length === 0) return;
    
    const regioesIds = [...new Set(
      apiLancamentos
        .filter(l => l.cardLancamentoInfo)
        .map(l => l.regiaoId)
    )];


    const regioesMap = new Map<string, string>();
    await Promise.all(
      regioesIds.map(async (id: string) => {
        const nome = await obterRegiao(id);
        regioesMap.set(id, nome);
      })
    );

    const lancamentosForCards: Imovel[] = apiLancamentos
      .filter(lancamento => lancamento.cardLancamentoInfo)
      .map((lancamento, index) => {
        const cardInfo = lancamento.cardLancamentoInfo;
        const nomeRegiao = regioesMap.get(lancamento.regiaoId) || "Região não informada";

        return {
          id: lancamento.id || String(index + 2),
          titulo: lancamento.nomeLancamento,
          descricao: lancamento.sobreLancamento?.texto || lancamento.slogan || '',
          preco: `A partir de R$ ${cardInfo.valor}`,
          imagem: resolveImageUrl(cardInfo.urlImagemCard) || '/placeholder.svg',
          regiao: nomeRegiao,
          quartos: parseInt(cardInfo.quartosDisponiveis[0]) || 1,
          quartosDisponiveis: cardInfo.quartosDisponiveis.map(Number),
          area: cardInfo.areasDisponiveis[0] ? `${cardInfo.areasDisponiveis[0]}` : '0',
          areasDisponiveis: cardInfo.areasDisponiveis.map(a => `${a}m²`),
          url: `/lancamento/${lancamento.id}`,
          destaque: cardInfo.isCardDestaque,
          tipo: "lancamento" as const,
          statusObra: cardInfo.statusObra,
          regiaoDestaque: cardInfo.isCardDestaque
        };
      });
    
    updateLancamentosFromAPI(lancamentosForCards);
  } catch (error) {
    console.error('Erro ao carregar lançamentos da API:', error);
  }
};

loadLancamentosFromAPI();
