
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface LeadsFiltersProps {
  correctorFilter: string;
  onCorrectorFilterChange: (value: string) => void;
  itemsPerPage: number;
  onItemsPerPageChange: (value: number) => void;
}

export function LeadsFilters({
  correctorFilter,
  onCorrectorFilterChange,
  itemsPerPage,
  onItemsPerPageChange,
}: LeadsFiltersProps) {
  return (
    <div className="flex flex-col sm:flex-row gap-4 mb-6">
      <div className="flex flex-col space-y-2">
        <Label htmlFor="corrector-filter">Filtrar por Corretor</Label>
        <Select value={correctorFilter} onValueChange={onCorrectorFilterChange}>
          <SelectTrigger className="w-[200px]">
            <SelectValue placeholder="Selecione..." />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todos</SelectItem>
            <SelectItem value="with-corrector">Com Corretor</SelectItem>
            <SelectItem value="without-corrector">Sem Corretor</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="flex flex-col space-y-2">
        <Label htmlFor="items-per-page">Itens por página</Label>
        <Input
          id="items-per-page"
          type="number"
          min="1"
          max="100"
          value={itemsPerPage}
          onChange={(e) => {
            const value = parseInt(e.target.value) || 1;
            onItemsPerPageChange(Math.max(1, Math.min(100, value)));
          }}
          className="w-[120px]"
        />
      </div>
    </div>
  );
}
