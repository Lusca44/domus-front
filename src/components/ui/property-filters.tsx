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
  showSearchButton = false
}: PropertyFiltersProps) => {
  return (
    <div className="bg-white rounded-lg p-6 shadow-xl mb-8">
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-7 gap-6 items-end">
        <div className="min-w-[140px]">
          <Select value={selectedFinalidade} onValueChange={onFinalidadeChange}>
            <SelectTrigger className="text-gray-900 w-full">
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

        <div className="min-w-[120px]">
          <Select value={selectedTipo} onValueChange={onTipoChange}>
            <SelectTrigger className="text-gray-900 w-full">
              <SelectValue placeholder="Tipo" />
            </SelectTrigger>
            <SelectContent className="min-w-[200px]">
              <SelectItem value="null">Tipo</SelectItem>
              <SelectItem value="apartamento">Apartamento</SelectItem>
              <SelectItem value="casa">Casa</SelectItem>
              <SelectItem value="cobertura">Cobertura</SelectItem>
              <SelectItem value="loja">Loja</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="min-w-[120px]">
          <Select value={selectedBairro} onValueChange={onBairroChange}>
            <SelectTrigger className="text-gray-900 w-full">
              <SelectValue placeholder="Bairro" />
            </SelectTrigger>
            <SelectContent className="min-w-[200px]">
              <SelectItem value="null">Bairro</SelectItem>
              {availableRegions.map(regiao => (
                <SelectItem key={regiao} value={regiao.toLowerCase()}>
                  {regiao}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="min-w-[120px]">
          <Select value={selectedQuartos} onValueChange={onQuartosChange}>
            <SelectTrigger className="text-gray-900 w-full">
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

        <div className="min-w-[130px]">
          <Select value={selectedMetragem} onValueChange={onMetragemChange}>
            <SelectTrigger className="text-gray-900 w-full">
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

        <div className="min-w-[120px]">
          <Select value={selectedValor} onValueChange={onValorChange}>
            <SelectTrigger className="text-gray-900 w-full">
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
        
        {showSearchButton && (
          <div>
            <Button size="lg" className="bg-blue-600 hover:bg-blue-700 h-10 w-10 p-0" onClick={onSearch}>
              <Search className="w-4 h-4" />
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};