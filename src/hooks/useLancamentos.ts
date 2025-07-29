// hooks/useLancamentos.ts
import { useState, useEffect } from "react";
import { lancamentoApi, regiaoApi, tipologiaApi } from "@/utils/apiConfig";
import { Imovel } from "@/cards/imoveis";
import { updateLancamentosFromAPI } from "@/cards/lancamentos/lancamentos";
import { resolveImageUrl } from "@/utils/imageConfig";

export const useLancamentos = () => {
  const [lancamentos, setLancamentos] = useState<Imovel[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLancamentos = async () => {
      try {
        setLoading(true);
        
        const [lancamentosData, regioesData, tipologiasData] = await Promise.all([
          lancamentoApi.obterTodosLancamentos(),
          regiaoApi.obterTodasRegioes(),
          tipologiaApi.obterTodasTipologias(),
        ]);

        const regiaoMap = new Map<string, string>();
        regioesData.forEach(regiao => regiaoMap.set(regiao.id, regiao.nomeRegiao));
        
        const tipologiaMap = new Map<string, string>();
        tipologiasData.forEach(tipologia => tipologiaMap.set(tipologia.id, tipologia.nome));
        
        const lancamentosForCards: Imovel[] = lancamentosData
        .filter(l => l.cardLancamentoInfo)
        .map((l, index) => {
          const cardInfo = l.cardLancamentoInfo!;
          
            return {
              id: l.id || `lancamento-${index}`,
              titulo: l.nomeLancamento,
              descricao: l.sobreLancamento?.texto || l.slogan || '',
              preco: `A partir de R$ ${cardInfo.valor}`,
              imagem: resolveImageUrl(cardInfo.urlImagemCard) || '/placeholder.svg',
              regiao: regiaoMap.get(l.regiaoId) || "Região não informada",
              quartos: parseInt(cardInfo.quartosDisponiveis[0]) || 1,
              quartosDisponiveis: cardInfo.quartosDisponiveis.map(Number),
              area: cardInfo.areasDisponiveis[0] ? `${cardInfo.areasDisponiveis[0]}` : '0',
              areasDisponiveis: cardInfo.areasDisponiveis.map(a => `${a}`),
              url: `/lancamento/${l.id}`,
              destaque: cardInfo.isCardDestaque,
              tipo: "lançamento" as const,
              statusObra: cardInfo.statusObra,
              regiaoDestaque: cardInfo.isCardDestaque,
              
              // Propriedade tipologia agora faz parte da interface
              tipologia: cardInfo.tipologiaId 
                ? cardInfo.tipologiaId
                    .map(id => tipologiaMap.get(id) || "")
                    .filter(nome => nome)
                : [],
            };
          });

        setLancamentos(lancamentosForCards);
        updateLancamentosFromAPI(lancamentosForCards);
      } catch (error) {
        console.error("Erro ao carregar lançamentos:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchLancamentos();
  }, []);

  return { lancamentos, loading };
};