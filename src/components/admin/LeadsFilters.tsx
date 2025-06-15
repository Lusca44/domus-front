
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";

interface LeadsFiltersProps {
  // Estado do filtro de corretor - pode ser "all", "with-corrector" ou "without-corrector"
  correctorFilter: string;
  // Função callback para atualizar o filtro de corretor
  onCorrectorFilterChange: (value: string) => void;
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
      {/* FILTRO 1: DROPDOWN PARA FILTRAR POR CORRETOR */}
      <div className="flex flex-col space-y-2">
        <Label htmlFor="corrector-filter">Filtrar por Corretor</Label>
        <Select value={correctorFilter} onValueChange={onCorrectorFilterChange}>
          <SelectTrigger>
            <SelectValue placeholder="Selecione..." />
          </SelectTrigger>
          <SelectContent>
            {/* Opção "all" - mostra todas as leads independente de ter corretor ou não */}
            <SelectItem value="all">Todos</SelectItem>
            {/* Opção "with-corrector" - mostra apenas leads que TEM corretor atribuído */}
            <SelectItem value="with-corrector">Com Corretor</SelectItem>
            {/* Opção "without-corrector" - mostra apenas leads que NÃO TEM corretor atribuído */}
            <SelectItem value="without-corrector">Sem Corretor</SelectItem>
          </SelectContent>
        </Select>
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
