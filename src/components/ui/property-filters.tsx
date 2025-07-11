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
  showSearchButton?: boolean;
  showFinalidadeBox?: boolean;
  isMenuAluguel?:boolean;
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
  showSearchButton = false,
  showFinalidadeBox,
  isMenuAluguel,
}: PropertyFiltersProps) => {
  return (
    <div className="bg-white rounded-lg p-4 sm:p-6 shadow-xl mb-8">
      {/* <div className="flex flex-col gap-4 sm:grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-7 sm:gap-6 sm:items-end"> */}
      <div className="flex flex-wrap justify-center items-end gap-4 sm:gap-6">
        {showFinalidadeBox && (
          // <div className="w-full sm:min-w-[120px]">
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
                <SelectItem value="venda">Venda</SelectItem>
                <SelectItem value="aluguel">Locação</SelectItem>
                <SelectItem value="lancamento">Lançamento na Planta</SelectItem>
              </SelectContent>
            </Select>
          </div>
        )}

        {/* <div className="w-full sm:min-w-[120px]"> */}
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
              <SelectItem value="loft">Loft</SelectItem>
              <SelectItem value="casa">Casa</SelectItem>
              <SelectItem value="cobertura">Cobertura</SelectItem>
              <SelectItem value="garden">Garden</SelectItem>
              <SelectItem value="apartamento">Apartamento</SelectItem>
              <SelectItem value="duplex">Duplex</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* <div className="w-full sm:min-w-[120px]"> */}
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

        {/* <div className="w-full sm:min-w-[120px]"> */}
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
              <SelectItem value="0">Studio</SelectItem>
              <SelectItem value="1">1 Quarto</SelectItem>
              <SelectItem value="2">2 Quartos</SelectItem>
              <SelectItem value="3">3 Quartos</SelectItem>
              <SelectItem value="4">4+ Quartos</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* <div className="w-full sm:min-w-[120px]"> */}
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
              <SelectItem value="50">Até 50m²</SelectItem>
              <SelectItem value="80">Até 80m²</SelectItem>
              <SelectItem value="120">Até 120m²</SelectItem>
              <SelectItem value="150">Até 150m²</SelectItem>
              <SelectItem value="200">Até 200m²</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* <div className="w-full sm:min-w-[120px]"> */}
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

                <SelectItem value="300000">Até R$ 300.000</SelectItem>
                <SelectItem value="500000">Até R$ 500.000</SelectItem>
                <SelectItem value="800000">Até R$ 800.000</SelectItem>
                <SelectItem value="1000000">Até R$ 1.000.000</SelectItem>
                <SelectItem value="1500000">Até R$ 1.500.000</SelectItem>
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

                <SelectItem value="1000">Até R$ 1.000</SelectItem>
                <SelectItem value="1500">Até R$ 1.500</SelectItem>
                <SelectItem value="2000">Até R$ 2.000</SelectItem>
                <SelectItem value="2500">Até R$ 2.500</SelectItem>
                <SelectItem value="3000">Até R$ 3.000</SelectItem>
                <SelectItem value="3500">Até R$ 3.500</SelectItem>
                <SelectItem value="4000">Até R$ 4.000</SelectItem>
                <SelectItem value="4500">Até R$ 4.500</SelectItem>
                <SelectItem value="5000">Até R$ 5.000</SelectItem>
                <SelectItem value="5500">Até R$ 5.500</SelectItem>
                <SelectItem value="6000+">Até R$ 6.000 ou +</SelectItem>
              </SelectContent>
            </Select>
          </div>
        )}

        {showSearchButton && (
          // <div className="w-full sm:w-auto mt-2 sm:mt-0">
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