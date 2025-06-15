
import { Label } from "@/components/ui/label";
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
        <Select value={itemsPerPage.toString()} onValueChange={(value) => onItemsPerPageChange(Number(value))}>
          <SelectTrigger className="w-[120px]">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="10">10</SelectItem>
            <SelectItem value="25">25</SelectItem>
            <SelectItem value="50">50</SelectItem>
            <SelectItem value="100">100</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
