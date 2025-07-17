
import { useState, useMemo } from "react";
import { useFilterData } from "./useFilterData";

export interface PropertyFilterOptions {
  selectedFinalidade: string;
  selectedTipo: string;
  selectedBairro: string;
  selectedQuartos: string;
  selectedMetragem: string;
  selectedValor: string;
}

export const usePropertyFilters = (allProperties: any[]) => {
  const [selectedFinalidade, setSelectedFinalidade] = useState("null");
  const [selectedTipo, setSelectedTipo] = useState("null");
  const [selectedBairro, setSelectedBairro] = useState("null");
  const [selectedQuartos, setSelectedQuartos] = useState("null");
  const [selectedMetragem, setSelectedMetragem] = useState("null");
  const [selectedValor, setSelectedValor] = useState("null");

  const filterData = useFilterData(allProperties);

  // Função para extrair valor numérico do preço
  const extractPrice = (preco: string): number => {
    const numbers = preco.replace(/[^\d]/g, '');
    return parseInt(numbers) || 0;
  };

  // Função para extrair área numérica de uma string (ex: "41m²" -> 41)
  const extractArea = (area: string): number => {
    const numbers = area.replace(/[^\d,]/g, '').replace(',', '.');
    return parseFloat(numbers) || 0;
  };

  // Função para verificar se o imóvel atende aos filtros
  const matchesFilters = (imovel: any) => {
    // Filtro de finalidade
    if (selectedFinalidade && selectedFinalidade !== "null") {
      if (selectedFinalidade === "venda" && imovel.tipo === "aluguel") return false;
      if (selectedFinalidade === "aluguel" && imovel.tipo !== "aluguel") return false;
      if (selectedFinalidade === "lancamento" && imovel.tipo !== "lancamento") return false;
    }
    
    // Filtro de tipo (apartamento, casa, etc.) - usando o atributo tipagem
    if (selectedTipo && selectedTipo !== "null") {
      // Verificar se o imóvel tem o atributo tipagem
      if (imovel.tipagem && Array.isArray(imovel.tipagem)) {
        // Buscar por tipo específico na lista de tipagens (case insensitive)
        const hasSelectedType = imovel.tipagem.some((tipo: string) => 
          tipo.toLowerCase().includes(selectedTipo.toLowerCase())
        );
        if (!hasSelectedType) return false;
      } else {
        // Fallback: se não tem tipagem, não atende ao filtro de tipo
        return false;
      }
    }

    // Filtro de bairro
    if (selectedBairro && selectedBairro !== "null" && imovel.regiao.toLowerCase() !== selectedBairro) return false;

    // Filtro de quartos
    if (selectedQuartos && selectedQuartos !== "null") {
      const quartos = parseInt(selectedQuartos);
      // Se o imóvel tem quartosDisponiveis, verificar se contém o valor selecionado
      if (imovel.quartosDisponiveis && imovel.quartosDisponiveis.length > 0) {
        if (quartos === 4) {
          // Para 4+, verificar se tem algum valor >= 4
          if (!imovel.quartosDisponiveis.some((q: number) => q >= 4)) return false;
        } else {
          // Para valores específicos, verificar se está na lista
          if (!imovel.quartosDisponiveis.includes(quartos)) return false;
        }
      } else {
        // Fallback para o comportamento antigo se não tiver quartosDisponiveis
        if (quartos === 4 && imovel.quartos < 4) return false;
        if (quartos !== 4 && imovel.quartos !== quartos) return false;
      }
    }

    // Filtro de metragem (até) - verifica se existe alguma área disponível que seja <= ao filtro
    if (selectedMetragem && selectedMetragem !== "null") {
      const maxArea = parseInt(selectedMetragem);
      
      // Se o imóvel tem areasDisponiveis, verificar se alguma área é <= maxArea
      if (imovel.areasDisponiveis && imovel.areasDisponiveis.length > 0) {
        const hasValidArea = imovel.areasDisponiveis.some((area: string) => {
          const areaNumeric = extractArea(area);
          return areaNumeric <= maxArea;
        });
        if (!hasValidArea) return false;
      } else {
        // Fallback para o comportamento antigo se não tiver areasDisponiveis
        const area = extractArea(imovel.area);
        if (area > maxArea) return false;
      }
    }

    // Filtro de valor (até)
    if (selectedValor && selectedValor !== "null") {
      const preco = extractPrice(imovel.preco);
      const maxValor = parseInt(selectedValor);
      if (preco > maxValor) return false;
    }

    return true;
  };

  // Filtrar imóveis baseado nos filtros selecionados
  const filteredProperties = useMemo(() => {
    return allProperties.filter(matchesFilters);
  }, [allProperties, selectedFinalidade, selectedTipo, selectedBairro, selectedQuartos, selectedMetragem, selectedValor]);

  const clearFilters = () => {
    setSelectedFinalidade("null");
    setSelectedTipo("null");
    setSelectedBairro("null");
    setSelectedQuartos("null");
    setSelectedMetragem("null");
    setSelectedValor("null");
  };

  return {
    filters: {
      selectedFinalidade,
      selectedTipo,
      selectedBairro,
      selectedQuartos,
      selectedMetragem,
      selectedValor,
    },
    setters: {
      setSelectedFinalidade,
      setSelectedTipo,
      setSelectedBairro,
      setSelectedQuartos,
      setSelectedMetragem,
      setSelectedValor,
    },
    filterData,
    filteredProperties,
    clearFilters,
    hasActiveFilters: Boolean(
      (selectedFinalidade && selectedFinalidade !== "null") ||
        (selectedTipo && selectedTipo !== "null") ||
        (selectedBairro && selectedBairro !== "null") ||
        (selectedQuartos && selectedQuartos !== "null") ||
        (selectedMetragem && selectedMetragem !== "null") ||
        (selectedValor && selectedValor !== "null")
    ),
  };
};
