
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Search } from "lucide-react";

interface LeadsFiltersProps {
  // Estado do filtro de corretor - agora é um boolean (true = sem corretor, false = todos)
  correctorFilter: boolean;
  // Função callback para atualizar o filtro de corretor
  onCorrectorFilterChange: (value: boolean) => void;
  // Estado do filtro por nome do lançamento - string de busca
  nomeLancamentoFilter: string;
  // Função callback para atualizar o filtro de nome do lançamento
  onNomeLancamentoFilterChange: (value: string) => void;
  // Estado do filtro por nome do cliente - string de busca
  nomeClienteFilter: string;
  // Função callback para atualizar o filtro de nome do cliente
  onNomeClienteFilterChange: (value: string) => void;
  // Função callback executada quando o usuário clica no botão "Pesquisar"
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
      {/* FILTRO 1: CHECKBOX PARA FILTRAR APENAS LEADS SEM CORRETOR */}
      <div className="flex flex-col space-y-2">
        <div className="flex items-center space-x-2">
          <Checkbox
            id="corrector-filter"
            checked={correctorFilter}
            onCheckedChange={(checked) => onCorrectorFilterChange(!!checked)}
          />
          <Label htmlFor="corrector-filter" className="cursor-pointer">
            Sem corretor vinculado
          </Label>
        </div>
      </div>

      {/* FILTRO 2: INPUT DE TEXTO PARA BUSCAR POR NOME DO LANÇAMENTO */}
      <div className="flex flex-col space-y-2">
        <Label htmlFor="nome-lancamento-filter">Nome do Lançamento</Label>
        <Input
          id="nome-lancamento-filter"
          type="text"
          placeholder="Digite o nome do lançamento..."
          value={nomeLancamentoFilter}
          // Atualiza o estado a cada digitação do usuário
          onChange={(e) => onNomeLancamentoFilterChange(e.target.value)}
        />
      </div>

      {/* FILTRO 3: INPUT DE TEXTO PARA BUSCAR POR NOME DO CLIENTE */}
      <div className="flex flex-col space-y-2">
        <Label htmlFor="nome-cliente-filter">Nome do Cliente</Label>
        <Input
          id="nome-cliente-filter"
          type="text"
          placeholder="Digite o nome do cliente..."
          value={nomeClienteFilter}
          // Atualiza o estado a cada digitação do usuário
          onChange={(e) => onNomeClienteFilterChange(e.target.value)}
        />
      </div>

      {/* BOTÃO DE APLICAR FILTROS */}
      <div className="flex items-end">
        <Button onClick={onSearch} className="gap-2 w-full">
          <Search className="h-4 w-4" />
          Pesquisar
        </Button>
      </div>
    </div>
  );
}
