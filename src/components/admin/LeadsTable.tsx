
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Edit, Trash2 } from "lucide-react";
import { useState, useEffect } from "react";
import { userApi } from "@/utils/apiConfig";


interface Lead {
  id: string;
  nomeLancamento: string;
  nomeCliente: string;
  telefoneCliente: string;
  usuarioOpcionistaId: string; // ID do corretor
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

export function LeadsTable({ leads, onEdit, onDelete }: LeadsTableProps) {
  const [corretoresMap, setCorretoresMap] = useState<Map<string, Corretor>>(new Map());
  const [loadingCorretores, setLoadingCorretores] = useState<Set<string>>(new Set());

  // Buscar dados dos corretores quando as leads mudarem
  useEffect(() => {
    
    
    const corretorIds = leads
    .map(lead => lead.usuarioOpcionistaId)
    .filter(id => id && id.trim() !== '') // Filtrar IDs válidos
    .filter((id, index, arr) => arr.indexOf(id) === index); // Remover duplicatas
    
    if (corretorIds.length > 0) {
      fetchCorretoresData(corretorIds);
    }
  }, [leads]);

  const fetchCorretoresData = async (ids: string[]) => {
    // Identificar quais corretores ainda não foram carregados
    const idsToFetch = ids.filter(id => !corretoresMap.has(id));
    
    if (idsToFetch.length === 0) return;

    console.log('🔍 Buscando dados dos corretores para IDs:', idsToFetch);
    
    // Marcar como carregando
    setLoadingCorretores(prev => new Set([...prev, ...idsToFetch]));

    // Fazer requisições individuais para cada corretor
    const fetchPromises = idsToFetch.map(async (id) => {
      try {
        console.log(`📡 Fazendo requisição para corretor ID: ${id}`);
        const corretor = await userApi.getById(id);
        console.log(`✅ Dados do corretor ${id} recebidos:`, corretor);
        return { id, corretor };
      } catch (error) {
        console.error(`❌ Erro ao buscar corretor ${id}:`, error);
        return { id, corretor: null };
      }
    });

    try {
      const results = await Promise.all(fetchPromises);
      
      // Atualizar o mapa com os dados recebidos
      setCorretoresMap(prev => {
        const newMap = new Map(prev);
        results.forEach(({ id, corretor }) => {
          if (corretor) {
            newMap.set(id, corretor);
          }
        });
        return newMap;
      });

      console.log('✅ Todos os corretores carregados com sucesso');
    } catch (error) {
      console.error('❌ Erro geral ao buscar corretores:', error);
    } finally {
      // Remover da lista de carregamento
      setLoadingCorretores(prev => {
        const newSet = new Set(prev);
        idsToFetch.forEach(id => newSet.delete(id));
        return newSet;
      });
    }
  };

  const getCorretorNome = (corretorId: string) => {
    if (!corretorId || corretorId.trim() === '') {
      return '-';
    }
    
    if (loadingCorretores.has(corretorId)) {
      return 'Carregando...';
    }
    
    const corretor = corretoresMap.get(corretorId);
    if (corretor) {
      return corretor.nome;
    }
    
    return `ID: ${corretorId}`;
  };

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Interesse</TableHead>
          <TableHead>Nome</TableHead>
          <TableHead>Telefone</TableHead>
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
            <TableCell>{getCorretorNome(lead.usuarioOpcionistaId)}</TableCell>
            <TableCell>
              <div className="flex space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => onEdit(lead)}
                >
                  <Edit className="h-4 w-4" />
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => onDelete(lead)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
