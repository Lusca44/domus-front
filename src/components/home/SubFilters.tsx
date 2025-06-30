
import React from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Filter } from "lucide-react";

interface SubFiltersProps {
  onRegionChange: (region: string) => void;
  onRoomsChange: (rooms: string) => void;
  selectedRegion: string;
  selectedRooms: string;
}

const SubFilters = ({ onRegionChange, onRoomsChange, selectedRegion, selectedRooms }: SubFiltersProps) => {
  const regioes = [
    { value: "todas", label: "Todas as Regiões" },
    { value: "porto-maravilha", label: "Porto Maravilha" },
    { value: "barra-tijuca", label: "Barra da Tijuca" },
    { value: "recreio", label: "Recreio dos Bandeirantes" },
    { value: "copacabana", label: "Copacabana" },
    { value: "ipanema", label: "Ipanema" },
    { value: "tijuca", label: "Tijuca" },
  ];

  const quartos = [
    { value: "todos", label: "Todos os Quartos" },
    { value: "1", label: "1 Quarto" },
    { value: "2", label: "2 Quartos" },
    { value: "3", label: "3 Quartos" },
    { value: "4", label: "4+ Quartos" },
  ];

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border mb-8">
      <div className="flex flex-col sm:flex-row gap-4 items-center">
        <div className="flex items-center gap-2 text-gray-700">
          <Filter className="w-4 h-4" />
          <span className="font-medium">Filtros:</span>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-4 flex-1">
          <div className="flex-1 min-w-[200px]">
            <Select value={selectedRegion} onValueChange={onRegionChange}>
              <SelectTrigger>
                <SelectValue placeholder="Selecione a região" />
              </SelectTrigger>
              <SelectContent>
                {regioes.map((regiao) => (
                  <SelectItem key={regiao.value} value={regiao.value}>
                    {regiao.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="flex-1 min-w-[200px]">
            <Select value={selectedRooms} onValueChange={onRoomsChange}>
              <SelectTrigger>
                <SelectValue placeholder="Quantidade de quartos" />
              </SelectTrigger>
              <SelectContent>
                {quartos.map((quarto) => (
                  <SelectItem key={quarto.value} value={quarto.value}>
                    {quarto.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <Button 
          variant="outline" 
          onClick={() => {
            onRegionChange("todas");
            onRoomsChange("todos");
          }}
          className="whitespace-nowrap"
        >
          Limpar Filtros
        </Button>
      </div>
    </div>
  );
};

export default SubFilters;
