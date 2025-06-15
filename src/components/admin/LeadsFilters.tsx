
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";

interface LeadsFiltersProps {
  correctorFilter: string;
  onCorrectorFilterChange: (value: string) => void;
  onSearch: () => void;
}

export function LeadsFilters({
  correctorFilter,
  onCorrectorFilterChange,
  onSearch,
}: LeadsFiltersProps) {
  return (
    <div className="flex flex-col sm:flex-row gap-4 mb-6 p-4 sm:p-0">
      <div className="flex flex-col space-y-2 w-full sm:w-auto">
        <Label htmlFor="corrector-filter" className="text-sm">Filtrar por Corretor</Label>
        <Select value={correctorFilter} onValueChange={onCorrectorFilterChange}>
          <SelectTrigger className="w-full sm:w-[200px]">
            <SelectValue placeholder="Selecione..." />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todos</SelectItem>
            <SelectItem value="with-corrector">Com Corretor</SelectItem>
            <SelectItem value="without-corrector">Sem Corretor</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="flex items-end w-full sm:w-auto">
        <Button onClick={onSearch} className="gap-2 w-full sm:w-auto">
          <Search className="h-4 w-4" />
          Pesquisar
        </Button>
      </div>
    </div>
  );
}
