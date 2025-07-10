import { useState, useMemo } from "react";

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

  // Função para extrair valor numérico do preço
  const extractPrice = (preco: string): number => {
    const numbers = preco.replace(/[^\d]/g, '');
    return parseInt(numbers) || 0;
  };

  // Função para extrair área numérica
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

    // Filtro de tipo (apartamento, casa, etc.) - seria necessário adicionar essa propriedade aos dados
    if (selectedTipo && selectedTipo !== "null") {
      // Como não temos essa propriedade nos dados ainda, vamos ignorar este filtro por enquanto
    }

    // Filtro de bairro
    if (selectedBairro && selectedBairro !== "null" && imovel.regiao.toLowerCase() !== selectedBairro) return false;

    // Filtro de quartos
    if (selectedQuartos && selectedQuartos !== "null") {
      const quartos = parseInt(selectedQuartos);
      if (quartos === 4 && imovel.quartos < 4) return false;
      if (quartos !== 4 && imovel.quartos !== quartos) return false;
    }

    // Filtro de metragem (até)
    if (selectedMetragem && selectedMetragem !== "null") {
      const area = extractArea(imovel.area);
      const maxArea = parseInt(selectedMetragem);
      if (area > maxArea) return false;
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

  // Obter regiões disponíveis
  const availableRegions = useMemo(() => {
    const regions = [...new Set(allProperties.map(property => property.regiao))];
    return regions.sort();
  }, [allProperties]);

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
      selectedValor
    },
    setters: {
      setSelectedFinalidade,
      setSelectedTipo,
      setSelectedBairro,
      setSelectedQuartos,
      setSelectedMetragem,
      setSelectedValor
    },
    filteredProperties,
    availableRegions,
    clearFilters,
    hasActiveFilters: Boolean(
      (selectedFinalidade && selectedFinalidade !== "null") || 
      (selectedTipo && selectedTipo !== "null") || 
      (selectedBairro && selectedBairro !== "null") || 
      (selectedQuartos && selectedQuartos !== "null") || 
      (selectedMetragem && selectedMetragem !== "null") || 
      (selectedValor && selectedValor !== "null")
    )
  };
};