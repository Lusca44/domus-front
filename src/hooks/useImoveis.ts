import { useState, useEffect } from "react";
import {
  imovelApi,
  regiaoApi,
  tipologiaApi,
  finalidadeApi,
} from "@/utils/apiConfig";
import { Imovel } from "@/cards/imoveis";
import {
  updateAlugueisFromAPI,
  updateImoveisUsadosFromAPI,
} from "@/cards/imoveis/imoveis";
import { resolveImageUrl } from "@/utils/imageConfig";

export const useImoveis = () => {
  const [alugueis, setAlugueis] = useState<Imovel[]>([]);
  const [imoveisUsados, setImoveisUsados] = useState<Imovel[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchImoveis = async () => {
      try {
        setLoading(true);

        // Buscar dados necessários em paralelo
        const [imoveisData, regioesData, tipologiasData, finalidadesData] =
          await Promise.all([
            imovelApi.obterTodosImoveis(),
            regiaoApi.obterTodasRegioes(),
            tipologiaApi.obterTodasTipologias(),
            finalidadeApi.obterTodasFinalidades(),
          ]);

        // Criar mapas para substituir IDs por nomes
        const regiaoMap = new Map<string, string>();
        regioesData.forEach((regiao) => regiaoMap.set(regiao.id, regiao.nomeRegiao));

        

        const tipologiaMap = new Map<string, string>();
        tipologiasData.forEach((tipologia) =>
          tipologiaMap.set(tipologia.id, tipologia.nome)
        );

        const finalidadeMap = new Map<string, string>();
        finalidadesData.forEach((finalidade) =>
          finalidadeMap.set(finalidade.id, finalidade.nome)
        );

        // Formatar os imóveis para o card
        const alugueis: Imovel[] = [];
        const imoveisUsados: Imovel[] = [];

        imoveisData.forEach((imovel) => {
          // Determinar a finalidade (aluguel ou venda)
          const finalidadeNome =
            imovel.finalidadeId && imovel.finalidadeId.length > 0
              ? finalidadeMap.get(imovel.finalidadeId[0]) || ""
              : "";

          const tipo =
            finalidadeNome.toLowerCase() === "aluguel"
              ? "aluguel"
              : "imoveis-usados";

          // Formatar o preco
          const preco = imovel.valor
            ? tipo === "aluguel"
              ? `R$ ${parseFloat(imovel.valor).toLocaleString("pt-BR")}/mês`
              : `R$ ${parseFloat(imovel.valor).toLocaleString("pt-BR")}`
            : "Preço sob consulta";

          // Mapear tipologias
          const tipologiaNomes = imovel.tipologiaId
            ? imovel.tipologiaId
                .map((id) => tipologiaMap.get(id) || "")
                .filter(Boolean)
            : [];

          // Formatar o objeto Imovel
          const imovelFormatado: Imovel = {
            id: imovel.id,
            titulo: imovel.titulo,
            descricao: imovel.descricaoImovel || "",
            preco: preco,
            imagem: resolveImageUrl(imovel.urlFotoCard) || "/placeholder.svg",
            regiao: imovel.regiaoId
              ? regiaoMap.get(imovel.regiaoId) || "Região não informada"
              : "Região não informada",
            quartos: parseInt(imovel.quantidadeQuartos || "0"),
            banheiros: imovel.quantidadeBanheiros || "0",
            vagas: parseInt(imovel.quantidadeVagas || "0"),
            area: imovel.areaQuadrada || "0",
            url: `/imovel/${imovel.id}`,
            destaque: false, // Não temos essa informação, mas podemos ajustar depois
            tipo: tipo,
            tipologia: tipologiaNomes,
            finalidade: finalidadeNome,
          };

          // Separar por finalidade
          if (tipo === "aluguel") {
            alugueis.push(imovelFormatado);
          } else {
            imoveisUsados.push(imovelFormatado);
          }
        });

        setAlugueis(alugueis);

        console.log("USE-IMOVEIS")
        console.log(imoveisUsados)
        setImoveisUsados(imoveisUsados);
        
        updateAlugueisFromAPI(alugueis);
        updateImoveisUsadosFromAPI(imoveisUsados);
      } catch (error) {
        console.error("Erro ao carregar imóveis:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchImoveis();
  }, []);

  return { alugueis, imoveisUsados, loading };
};
