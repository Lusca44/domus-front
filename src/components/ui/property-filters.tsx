import React from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";

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
  availableRegions: string[];
  availableTipologias: string[];
  availableFinalidades: string[];
  showSearchButton?: boolean;
  showFinalidadeBox?: boolean;
  isMenuAluguel?: boolean;
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
  availableRegions,
  availableTipologias,
  availableFinalidades,
  showSearchButton = false,
  showFinalidadeBox,
  isMenuAluguel,
}: PropertyFiltersProps) => {
  // Definir os intervalos para metragem
  const areaRanges = [
    { label: "0 a 50m²", value: "0-50" },
    { label: "51 a 100m²", value: "51-100" },
    { label: "101 a 200m²", value: "101-200" },
    { label: "201 a 300m²", value: "201-300" },
    { label: "Acima de 300m²", value: "301+" },
  ];

  // Definir os intervalos para valor (venda)
  const valorVendaRanges = [
    { label: "Até R$ 300.000", value: "0-300000" },
    { label: "R$ 300.001 a R$ 500.000", value: "300001-500000" },
    { label: "R$ 500.001 a R$ 800.000", value: "500001-800000" },
    { label: "R$ 800.001 a R$ 1.000.000", value: "800001-1000000" },
    { label: "R$ 1.000.001 a R$ 1.500.000", value: "1000001-1500000" },
    { label: "R$ 1.500.001 a R$ 2.000.000", value: "1500001-2000000" },
    { label: "Acima de R$ 2.000.000", value: "2000001+" },
  ];

  // Definir os intervalos para valor (aluguel)
  const valorAluguelRanges = [
    { label: "Até R$ 1.000", value: "0-1000" },
    { label: "R$ 1.001 a R$ 1.500", value: "1001-1500" },
    { label: "R$ 1.501 a R$ 2.000", value: "1501-2000" },
    { label: "R$ 2.001 a R$ 2.500", value: "2001-2500" },
    { label: "R$ 2.501 a R$ 3.000", value: "2501-3000" },
    { label: "R$ 3.001 a R$ 3.500", value: "3001-3500" },
    { label: "R$ 3.501 a R$ 4.000", value: "3501-4000" },
    { label: "R$ 4.001 a R$ 4.500", value: "4001-4500" },
    { label: "R$ 4.501 a R$ 5.000", value: "4501-5000" },
    { label: "R$ 5.001 a R$ 6.000", value: "5001-6000" },
    { label: "Acima de R$ 6.000", value: "6001+" },
  ];

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
                {availableFinalidades.map((finalidade) => (
                  <SelectItem key={finalidade} value={finalidade.toLowerCase()}>
                    {finalidade}
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
              {availableTipologias.map((tipologia) => (
                <SelectItem key={tipologia} value={tipologia.toLowerCase()}>
                  {tipologia}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="flex-1 min-w-[150px] max-w-[200px]">
          <label className="block text-sm font-medium text-gray-700 mb-2 sm:hidden">
            Bairro
          </label>
          <Select value={selectedBairro} onValueChange={onBairroChange}>
            <SelectTrigger className="text-gray-900 w-full h-12">
              <SelectValue placeholder="Bairro" />
            </SelectTrigger>
            <SelectContent className="min-w-[200px]">
              <SelectItem value="null">Bairro</SelectItem>
              {availableRegions.map((regiao) => (
                <SelectItem key={regiao} value={regiao.toLowerCase()}>
                  {regiao}
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
              <SelectItem value="1">1 Quarto</SelectItem>
              <SelectItem value="2">2 Quartos</SelectItem>
              <SelectItem value="3">3 Quartos</SelectItem>
              <SelectItem value="4">4+ Quartos</SelectItem>
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

        {!isMenuAluguel && (
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
                {valorVendaRanges.map((range) => (
                  <SelectItem key={range.value} value={range.value}>
                    {range.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        )}
        
        {isMenuAluguel && (
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
                {valorAluguelRanges.map((range) => (
                  <SelectItem key={range.value} value={range.value}>
                    {range.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        )}

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