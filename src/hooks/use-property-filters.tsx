import { useState, useMemo } from "react";

// Função para extrair valor numérico do preço formatado
const extractPrice = (preco: string): number => {
  // Remove texto não numérico, mantendo vírgulas e pontos
  const cleaned = preco.replace(/[^\d,.]/g, '');
  
  // Casos especiais para formatos brasileiros
  if (cleaned.includes(',')) {
    // Formato: 310.000,00 ou 1.444,00
    const parts = cleaned.split(',');
    const integerPart = parts[0].replace(/\./g, '');
    const decimalPart = parts[1] || '00';
    return parseFloat(`${integerPart}.${decimalPart}`);
  } else if (cleaned.includes('.')) {
    // Formato: 1.444 ou 2.444
    return parseFloat(cleaned.replace(/\./g, ''));
  }
  
  return parseFloat(cleaned) || 0;
};

// Função para extrair área numérica
const extractArea = (area: string): number => {
  const numbers = area.replace(/[^\d]/g, "");
  return parseInt(numbers) || 0;
};

// Função para verificar se um valor está em um intervalo
const inRange = (value: number, range: string): boolean => {
  if (range.endsWith('+')) {
    return value >= parseInt(range.replace('+', ''));
  }
  
  const [minStr, maxStr] = range.split('-');
  const min = parseInt(minStr);
  const max = parseInt(maxStr);
  
  return value >= min && value <= max;
};

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

  const matchesFilters = (imovel: any) => {
    if (selectedFinalidade !== "null") {
      const finalidadeFiltro = selectedFinalidade.toLowerCase();

      if (
        finalidadeFiltro === "lancamento" &&
        imovel.tipo !== "lancamento"
      ) {
        return false;
      }

      if (
        finalidadeFiltro !== "lancamento" &&
        imovel.finalidade &&
        imovel.finalidade.toLowerCase() !== finalidadeFiltro
      ) {
        return false;
      }

      if (finalidadeFiltro === "lancamento") {
        if (imovel.tipo !== "lancamento") return false;
      } else if (finalidadeFiltro === "aluguel") {
        if (imovel.tipo !== "aluguel") return false;
      } else if (finalidadeFiltro === "venda") {
        if (imovel.tipo !== "imoveis-usados") return false;
      }
    }

    if (selectedTipo !== "null") {
      const tipoNormalized = selectedTipo.toLowerCase();
      if (imovel.tipologia && Array.isArray(imovel.tipologia)) {
        const hasSelectedType = imovel.tipologia.some((tipo: string) =>
          tipo.toLowerCase().includes(tipoNormalized)
        );
        if (!hasSelectedType) return false;
      } else {
        return false;
      }
    }

    if (selectedBairro !== "null") {
      const selectedBairroNormalized = selectedBairro.toLowerCase();
      const imovelRegiaoNormalized = imovel.regiao
        ? imovel.regiao.toLowerCase()
        : "";

      if (!imovelRegiaoNormalized.includes(selectedBairroNormalized)) {
        return false;
      }
    }

    if (selectedQuartos !== "null") {
      const quartosFiltro = parseInt(selectedQuartos);

      if (imovel.quartosDisponiveis && imovel.quartosDisponiveis.length > 0) {
        if (quartosFiltro === 4) {
          if (!imovel.quartosDisponiveis.some((q: number) => q >= 4))
            return false;
        } else {
          if (!imovel.quartosDisponiveis.includes(quartosFiltro)) return false;
        }
      }
      else if (imovel.quartos) {
        if (quartosFiltro === 4 && imovel.quartos < 4) return false;
        if (quartosFiltro !== 4 && imovel.quartos !== quartosFiltro)
          return false;
      }
    }

    // Filtro de metragem (área)
    if (selectedMetragem !== "null") {
      // Para lançamentos com areasDisponiveis
      if (imovel.areasDisponiveis && imovel.areasDisponiveis.length > 0) {
        // Verifica se pelo menos uma área disponível está no intervalo
        const hasMatch = imovel.areasDisponiveis.some((area: string) => {
          const areaNumeric = extractArea(area);
          return inRange(areaNumeric, selectedMetragem);
        });
        
        if (!hasMatch) return false;
      }
      // Para outros imóveis (useImoveis)
      else if (imovel.area) {
        const areaNumeric = extractArea(imovel.area);
        if (!inRange(areaNumeric, selectedMetragem)) return false;
      }
    }

    // Filtro de valor
    if (selectedValor !== "null") {
      const preco = extractPrice(imovel.preco);
      if (!inRange(preco, selectedValor)) return false;
    }

    return true;
  };

  const filteredProperties = useMemo(() => {
    return allProperties.filter(matchesFilters);
  }, [
    allProperties,
    selectedFinalidade,
    selectedTipo,
    selectedBairro,
    selectedQuartos,
    selectedMetragem,
    selectedValor,
  ]);

  const availableRegions = useMemo(() => {
    const regions = [
      ...new Set(allProperties.map((property) => property.regiao)),
    ];
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
    ),
  };
};