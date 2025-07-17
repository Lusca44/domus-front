
import React from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import { Finalidade, Tipologia, Regiao } from "@/types/api";

interface PropertyFiltersProps {
  selectedFinalidade: string;
  selectedTipo: string;
  selectedBairro: string;
  selectedQuartos: string;
  selectedMetragem: string;
  selectedValor: string;
  onFinalidadeChange: (value: string) => void;
  onTipoChange: (value: string) => void;
  onBairroChange: (value: string) => void;
  onQuartosChange: (value: string) => void;
  onMetragemChange: (value: string) => void;
  onValorChange: (value: string) => void;
  onSearch?: () => void;
  showSearchButton?: boolean;
  showFinalidadeBox?: boolean;
  isMenuAluguel?: boolean;
  filterData?: {
    finalidades: Finalidade[];
    tipologias: Tipologia[];
    regioes: Regiao[];
    quartosDisponiveis: number[];
    areasDisponiveis: string[];
    valoresDisponiveis: number[];
    loading: boolean;
  };
}

export const PropertyFilters = ({
  selectedFinalidade,
  selectedTipo,
  selectedBairro,
  selectedQuartos,
  selectedMetragem,
  selectedValor,
  onFinalidadeChange,
  onTipoChange,
  onBairroChange,
  onQuartosChange,
  onMetragemChange,
  onValorChange,
  onSearch,
  showSearchButton = false,
  showFinalidadeBox,
  isMenuAluguel,
  filterData
}: PropertyFiltersProps) => {
  if (filterData?.loading) {
    return (
      <div className="bg-white rounded-lg p-4 sm:p-6 shadow-xl mb-8">
        <div className="flex justify-center items-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          <span className="ml-2 text-gray-600">Carregando filtros...</span>
        </div>
      </div>
    );
  }

  // Criar ranges de valores baseados nos valores disponíveis
  const createValueRanges = (valores: number[]) => {
    if (valores.length === 0) return [];
    
    const maxValue = Math.max(...valores);
    const ranges = [];
    
    if (isMenuAluguel) {
      ranges.push(
        { value: "1000", label: "Até R$ 1.000" },
        { value: "1500", label: "Até R$ 1.500" },
        { value: "2000", label: "Até R$ 2.000" },
        { value: "2500", label: "Até R$ 2.500" },
        { value: "3000", label: "Até R$ 3.000" },
        { value: "3500", label: "Até R$ 3.500" },
        { value: "4000", label: "Até R$ 4.000" },
        { value: "4500", label: "Até R$ 4.500" },
        { value: "5000", label: "Até R$ 5.000" },
        { value: "5500", label: "Até R$ 5.500" },
        { value: "6000", label: "Até R$ 6.000 ou +" }
      );
    } else {
      ranges.push(
        { value: "300000", label: "Até R$ 300.000" },
        { value: "500000", label: "Até R$ 500.000" },
        { value: "800000", label: "Até R$ 800.000" },
        { value: "1000000", label: "Até R$ 1.000.000" },
        { value: "1500000", label: "Até R$ 1.500.000" }
      );
    }
    
    return ranges;
  };

  // Criar ranges de metragem baseados nas áreas disponíveis
  const createAreaRanges = (areas: string[]) => {
    return [
      { value: "50", label: "Até 50m²" },
      { value: "80", label: "Até 80m²" },
      { value: "120", label: "Até 120m²" },
      { value: "150", label: "Até 150m²" },
      { value: "200", label: "Até 200m²" }
    ];
  };

  const valueRanges = createValueRanges(filterData?.valoresDisponiveis || []);
  const areaRanges = createAreaRanges(filterData?.areasDisponiveis || []);

  return (
    <div className="bg-white rounded-lg p-4 sm:p-6 shadow-xl mb-8">
      <div className="flex flex-wrap justify-center items-end gap-4 sm:gap-6">
        {showFinalidadeBox && (
          <div className="flex-1 min-w-[150px] max-w-[200px]">
            <label className="block text-sm font-medium text-gray-700 mb-2 sm:hidden">
              Finalidade
            </label>
            <Select
              value={selectedFinalidade}
              onValueChange={onFinalidadeChange}
            >
              <SelectTrigger className="text-gray-900 w-full h-12">
                <SelectValue placeholder="Finalidade" />
              </SelectTrigger>
              <SelectContent className="min-w-[200px]">
                <SelectItem value="null">Finalidade</SelectItem>
                {filterData?.finalidades.map((finalidade) => (
                  <SelectItem key={finalidade.id} value={finalidade.id}>
                    {finalidade.nome}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        )}

        <div className="flex-1 min-w-[150px] max-w-[200px]">
          <label className="block text-sm font-medium text-gray-700 mb-2 sm:hidden">
            Tipo
          </label>
          <Select value={selectedTipo} onValueChange={onTipoChange}>
            <SelectTrigger className="text-gray-900 w-full h-12">
              <SelectValue placeholder="Tipo" />
            </SelectTrigger>
            <SelectContent className="min-w-[200px]">
              <SelectItem value="null">Tipo</SelectItem>
              {filterData?.tipologias.map((tipologia) => (
                <SelectItem key={tipologia.id} value={tipologia.id}>
                  {tipologia.nome}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="flex-1 min-w-[150px] max-w-[200px]">
          <label className="block text-sm font-medium text-gray-700 mb-2 sm:hidden">
            Região
          </label>
          <Select value={selectedBairro} onValueChange={onBairroChange}>
            <SelectTrigger className="text-gray-900 w-full h-12">
              <SelectValue placeholder="Região" />
            </SelectTrigger>
            <SelectContent className="min-w-[200px]">
              <SelectItem value="null">Região</SelectItem>
              {filterData?.regioes.map((regiao) => (
                <SelectItem key={regiao.id} value={regiao.id}>
                  {regiao.nomeRegiao}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="flex-1 min-w-[150px] max-w-[200px]">
          <label className="block text-sm font-medium text-gray-700 mb-2 sm:hidden">
            Quartos
          </label>
          <Select value={selectedQuartos} onValueChange={onQuartosChange}>
            <SelectTrigger className="text-gray-900 w-full h-12">
              <SelectValue placeholder="Quartos" />
            </SelectTrigger>
            <SelectContent className="min-w-[200px]">
              <SelectItem value="null">Quartos</SelectItem>
              {filterData?.quartosDisponiveis.map((quartos) => (
                <SelectItem key={quartos} value={quartos.toString()}>
                  {quartos === 0 ? "Studio" : 
                   quartos >= 4 ? "4+ Quartos" : 
                   `${quartos} ${quartos === 1 ? "Quarto" : "Quartos"}`}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="flex-1 min-w-[150px] max-w-[200px]">
          <label className="block text-sm font-medium text-gray-700 mb-2 sm:hidden">
            Metragem
          </label>
          <Select value={selectedMetragem} onValueChange={onMetragemChange}>
            <SelectTrigger className="text-gray-900 w-full h-12">
              <SelectValue placeholder="Metragem" />
            </SelectTrigger>
            <SelectContent className="min-w-[200px]">
              <SelectItem value="null">Metragem</SelectItem>
              {areaRanges.map((range) => (
                <SelectItem key={range.value} value={range.value}>
                  {range.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="flex-1 min-w-[150px] max-w-[200px]">
          <label className="block text-sm font-medium text-gray-700 mb-2 sm:hidden">
            Valor
          </label>
          <Select value={selectedValor} onValueChange={onValorChange}>
            <SelectTrigger className="text-gray-900 w-full h-12">
              <SelectValue placeholder="Valor" />
            </SelectTrigger>
            <SelectContent className="min-w-[200px]">
              <SelectItem value="null">Valor</SelectItem>
              {valueRanges.map((range) => (
                <SelectItem key={range.value} value={range.value}>
                  {range.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {showSearchButton && (
          <div className="flex-1 min-w-[150px] max-w-[200px]">
            <Button
              size="lg"
              className="bg-blue-600 hover:bg-blue-700 w-full sm:w-12 h-12 sm:p-0 text-sm sm:text-base"
              onClick={onSearch}
            >
              <Search className="w-4 h-4 sm:mr-0 mr-2" />
              <span className="sm:hidden">Buscar</span>
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};
