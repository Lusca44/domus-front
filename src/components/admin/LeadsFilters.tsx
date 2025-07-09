
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Search, Filter } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

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
  // NOVO: Estado do filtro "Minhas leads" para administradores
  myLeadsFilter: boolean;
  // NOVO: Função callback para atualizar o filtro "Minhas leads"
  onMyLeadsFilterChange: (value: boolean) => void;
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
  myLeadsFilter,
  onMyLeadsFilterChange,
  onSearch,
}: LeadsFiltersProps) {
  const { isAdmin } = useAuth(); // Verificar se é administrador

  return (
    <div className="flex flex-col md:flex-row items-stretch md:items-center gap-3 mb-6">
      {/* DROPDOWN COM TODOS OS FILTROS */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" className="gap-2 w-full md:w-auto">
            <Filter className="h-4 w-4" />
            Filtros
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-80 md:w-80 p-4 bg-white border shadow-lg z-50" align="start">
          <div className="space-y-4">
            {/* FILTRO 1: CHECKBOX PARA FILTRAR APENAS LEADS SEM CORRETOR */}
            {/* Este filtro só aparece para administradores */}
            {isAdmin && (
              <div className="flex flex-col space-y-2">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="corrector-filter"
                    checked={correctorFilter}
                    onCheckedChange={(checked) => onCorrectorFilterChange(!!checked)}
                  />
                  <Label htmlFor="corrector-filter" className="cursor-pointer text-sm">
                    Sem corretor vinculado
                  </Label>
                </div>
              </div>
            )}

            {/* NOVO FILTRO: CHECKBOX PARA ADMINISTRADOR VER APENAS SUAS LEADS */}
            {/* Este filtro só aparece para administradores */}
            {isAdmin && (
              <div className="flex flex-col space-y-2">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="my-leads-filter"
                    checked={myLeadsFilter}
                    onCheckedChange={(checked) => onMyLeadsFilterChange(!!checked)}
                  />
                  <Label htmlFor="my-leads-filter" className="cursor-pointer text-sm">
                    Apenas minhas leads (como corretor)
                  </Label>
                </div>
              </div>
            )}

            {/* FILTRO 2: INPUT DE TEXTO PARA BUSCAR POR NOME DO LANÇAMENTO */}
            <div className="flex flex-col space-y-2">
              <Label htmlFor="nome-lancamento-filter" className="text-sm">Nome do Lançamento</Label>
              <Input
                id="nome-lancamento-filter"
                type="text"
                placeholder="Digite o nome do lançamento..."
                value={nomeLancamentoFilter}
                // Atualiza o estado a cada digitação do usuário
                onChange={(e) => onNomeLancamentoFilterChange(e.target.value)}
                className="text-sm"
              />
            </div>

            {/* FILTRO 3: INPUT DE TEXTO PARA BUSCAR POR NOME DO CLIENTE */}
            <div className="flex flex-col space-y-2">
              <Label htmlFor="nome-cliente-filter" className="text-sm">Nome do Cliente</Label>
              <Input
                id="nome-cliente-filter"
                type="text"
                placeholder="Digite o nome do cliente..."
                value={nomeClienteFilter}
                // Atualiza o estado a cada digitação do usuário
                onChange={(e) => onNomeClienteFilterChange(e.target.value)}
                className="text-sm"
              />
            </div>
          </div>
        </DropdownMenuContent>
      </DropdownMenu>

      {/* BOTÃO DE APLICAR FILTROS */}
      <Button onClick={onSearch} className="gap-2 w-full md:w-auto">
        <Search className="h-4 w-4" />
        Pesquisar
      </Button>
    </div>
  );
}
