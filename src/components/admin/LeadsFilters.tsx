
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";

interface LeadsFiltersProps {
  correctorFilter: string;
  onCorrectorFilterChange: (value: string) => void;
  nomeLancamentoFilter: string;
  onNomeLancamentoFilterChange: (value: string) => void;
  nomeClienteFilter: string;
  onNomeClienteFilterChange: (value: string) => void;
  onSearch: () => void;
}

export function LeadsFilters({
  correctorFilter,
  onCorrectorFilterChange,
  nomeLancamentoFilter,
  onNomeLancamentoFilterChange,
  nomeClienteFilter,
  onNomeClienteFilterChange,
  onSearch,
}: LeadsFiltersProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      <div className="flex flex-col space-y-2">
        <Label htmlFor="corrector-filter">Filtrar por Corretor</Label>
        <Select value={correctorFilter} onValueChange={onCorrectorFilterChange}>
          <SelectTrigger>
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
        <Label htmlFor="nome-lancamento-filter">Nome do Lançamento</Label>
        <Input
          id="nome-lancamento-filter"
          type="text"
          placeholder="Digite o nome do lançamento..."
          value={nomeLancamentoFilter}
          onChange={(e) => onNomeLancamentoFilterChange(e.target.value)}
        />
      </div>

      <div className="flex flex-col space-y-2">
        <Label htmlFor="nome-cliente-filter">Nome do Cliente</Label>
        <Input
          id="nome-cliente-filter"
          type="text"
          placeholder="Digite o nome do cliente..."
          value={nomeClienteFilter}
          onChange={(e) => onNomeClienteFilterChange(e.target.value)}
        />
      </div>

      <div className="flex items-end">
        <Button onClick={onSearch} className="gap-2 w-full">
          <Search className="h-4 w-4" />
          Pesquisar
        </Button>
      </div>
    </div>
  );
}
