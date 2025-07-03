
import React from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Filter } from "lucide-react";
import { RegiaoFilter, QuartosFilter } from "@/config/filterConfig";

interface SubFiltersProps {
  onRegionChange: (region: string) => void;
  onRoomsChange: (rooms: string) => void;
  selectedRegion: string;
  selectedRooms: string;
  availableRegions: RegiaoFilter[];
  availableRooms: QuartosFilter[];
}

const SubFilters = ({ 
  onRegionChange, 
  onRoomsChange, 
  selectedRegion, 
  selectedRooms,
  availableRegions,
  availableRooms
}: SubFiltersProps) => {
  const handleClearFilters = () => {
    onRegionChange("todas");
    onRoomsChange("todos");
  };

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
                {availableRegions.map((regiao) => (
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
                {availableRooms.map((quarto) => (
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
          onClick={handleClearFilters}
          className="whitespace-nowrap"
        >
          Limpar Filtros
        </Button>
      </div>
    </div>
  );
};

export default SubFilters;
