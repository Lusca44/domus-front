
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Card } from "@/components/ui/card";
import { Edit, Trash2 } from "lucide-react";
import { useState, useEffect } from "react";
import { userApi } from "@/utils/apiConfig";

interface Lead {
  id: string;
  nomeLancamento: string;
  nomeCliente: string;
  telefoneCliente: string;
  usuarioOpcionistaId: string;
  emailCliente: string;
}

interface Corretor {
  id: string;
  nome: string;
  email: string;
  dataCadastro: string;
  isAtivo: boolean;
  dataDesativacao: string | null;
  telefone: string;
  isAdmin: boolean;
}

interface LeadsTableProps {
  leads: Lead[];
  onEdit: (lead: Lead) => void;
  onDelete: (lead: Lead) => void;
}

/**
 * COMPONENTE LeadsTable
 * 
 * Renderiza uma tabela de leads com busca otimizada de dados dos corretores.
 * Implementa cache de corretores para evitar requisições duplicadas.
 */
export function LeadsTable({ leads, onEdit, onDelete }: LeadsTableProps) {
  // Cache de corretores para evitar requisições duplicadas
  const [corretoresMap, setCorretoresMap] = useState<Map<string, Corretor>>(new Map());
  
  // Controle de quais corretores estão sendo carregados
  const [loadingCorretores, setLoadingCorretores] = useState<Set<string>>(new Set());

  /**
   * EFEITO: Buscar dados dos corretores quando as leads mudarem
   * 
   * Extrai IDs únicos dos corretores das leads e inicia o carregamento
   * dos dados que ainda não estão em cache.
   */
  useEffect(() => {
    const corretorIds = leads
      .map(lead => lead.usuarioOpcionistaId)
      .filter(id => id && id.trim() !== '') // Filtrar IDs válidos
      .filter((id, index, arr) => arr.indexOf(id) === index); // Remover duplicatas
    
    if (corretorIds.length > 0) {
      fetchCorretoresData(corretorIds);
    }
  }, [leads]);

  /**
   * FUNÇÃO: Buscar dados dos corretores de forma otimizada
   * 
   * @param ids - Array de IDs dos corretores para buscar
   * 
   * Implementação otimizada que:
   * - Evita requisições duplicadas usando cache
   * - Controla estado de loading por corretor
   * - Usa Promise.allSettled para não falhar se uma requisição der erro
   * - Atualiza cache incrementalmente
   */
  const fetchCorretoresData = async (ids: string[]) => {
    // Identificar quais corretores ainda não foram carregados
    const idsToFetch = ids.filter(id => 
      !corretoresMap.has(id) && !loadingCorretores.has(id)
    );
    
    if (idsToFetch.length === 0) return;
    
    // Marcar como carregando para evitar requisições duplicadas
    setLoadingCorretores(prev => new Set([...prev, ...idsToFetch]));

    // Criar promises para buscar cada corretor individualmente
    const fetchPromises = idsToFetch.map(async (id) => {
      try {
        const corretor = await userApi.getById(id);
        return { id, corretor, success: true };
      } catch (error) {
        console.error(`Erro ao buscar corretor ${id}:`, error);
        return { id, corretor: null, success: false };
      }
    });

    try {
      // Usar Promise.allSettled para não falhar se uma requisição der erro
      const results = await Promise.allSettled(fetchPromises);
      
      // Atualizar o cache com os dados recebidos com sucesso
      setCorretoresMap(prev => {
        const newMap = new Map(prev);
        results.forEach((result) => {
          if (result.status === 'fulfilled' && result.value.success && result.value.corretor) {
            newMap.set(result.value.id, result.value.corretor);
          }
        });
        return newMap;
      });

    } catch (error) {
      console.error('Erro geral ao processar corretores:', error);
    } finally {
      // Remover da lista de carregamento
      setLoadingCorretores(prev => {
        const newSet = new Set(prev);
        idsToFetch.forEach(id => newSet.delete(id));
        return newSet;
      });
    }
  };

  /**
   * FUNÇÃO: Obter nome do corretor com tratamento de estados
   * 
   * @param corretorId - ID do corretor
   * @returns Nome do corretor, indicador de loading, ou placeholder
   * 
   * Gerencia diferentes estados:
   * - ID vazio: retorna placeholder "-"
   * - Carregando: retorna "Carregando..."
   * - Encontrado no cache: retorna nome do corretor
   * - Não encontrado: inicia nova busca e retorna ID temporariamente
   */
  const getCorretorNome = (corretorId: string) => {
    // Se não tem ID ou está vazio, retorna placeholder
    if (!corretorId || corretorId.trim() === '') {
      return '-';
    }
    
    // Se está carregando, mostra indicador
    if (loadingCorretores.has(corretorId)) {
      return 'Carregando...';
    }
    
    // Se encontrou o corretor no cache, retorna o nome
    const corretor = corretoresMap.get(corretorId);
    if (corretor) {
      return corretor.nome;
    }
    
    // Se não encontrou e não está carregando, tenta buscar novamente
    if (!loadingCorretores.has(corretorId)) {
      fetchCorretoresData([corretorId]);
    }
    
    return `ID: ${corretorId}`;
  };

  return (
    <>
      {/* Desktop Table */}
      <div className="hidden md:block">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Interesse</TableHead>
              <TableHead>Nome</TableHead>
              <TableHead>Telefone</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Corretor Opcionista</TableHead>
              <TableHead>Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {leads.map((lead) => (
              <TableRow key={lead.id}>
                <TableCell>{lead.nomeLancamento}</TableCell>
                <TableCell>{lead.nomeCliente}</TableCell>
                <TableCell>{lead.telefoneCliente}</TableCell>
                <TableCell className="break-all">{lead.emailCliente}</TableCell>
                <TableCell>{getCorretorNome(lead.usuarioOpcionistaId)}</TableCell>
                <TableCell>
                  <div className="flex space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => onEdit(lead)}
                      title="Editar lead"
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => onDelete(lead)}
                      title="Excluir lead"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Mobile Cards */}
      <div className="md:hidden space-y-4">
        {leads.map((lead) => (
          <Card key={lead.id} className="p-4 space-y-3">
            <div className="space-y-2">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <h3 className="font-medium text-sm">{lead.nomeLancamento}</h3>
                  <p className="text-sm text-gray-900">{lead.nomeCliente}</p>
                </div>
              </div>
              
              <div className="space-y-1">
                <p className="text-xs text-gray-600">
                  <span className="font-medium">Tel:</span> {lead.telefoneCliente}
                </p>
                <p className="text-xs text-gray-600 break-all">
                  <span className="font-medium">Email:</span> {lead.emailCliente}
                </p>
                <p className="text-xs text-gray-600">
                  <span className="font-medium">Corretor:</span> {getCorretorNome(lead.usuarioOpcionistaId)}
                </p>
              </div>
              
              <div className="flex justify-end gap-2 pt-2 border-t">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => onEdit(lead)}
                  title="Editar lead"
                >
                  <Edit className="h-3 w-3" />
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => onDelete(lead)}
                  title="Excluir lead"
                >
                  <Trash2 className="h-3 w-3" />
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </>
  );
}
