
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Edit, Trash2 } from "lucide-react";
import { useState, useEffect } from "react";

interface Lead {
  id: string;
  nomeLancamento: string;
  nomeCliente: string;
  telefoneCliente: string;
  usuarioOpcionista: string; // ID do corretor
}

interface Corretor {
  id: string;
  nome: string;
  email?: string;
}

interface LeadsTableProps {
  leads: Lead[];
  onEdit: (lead: Lead) => void;
  onDelete: (lead: Lead) => void;
}

export function LeadsTable({ leads, onEdit, onDelete }: LeadsTableProps) {
  const [corretoresMap, setCorretoresMap] = useState<Map<string, string>>(new Map());
  const [loadingCorretores, setLoadingCorretores] = useState(false);

  // Buscar nomes dos corretores quando as leads mudarem
  useEffect(() => {
    const corretorIds = leads
      .map(lead => lead.usuarioOpcionista)
      .filter(id => id && id.trim() !== '') // Filtrar IDs válidos
      .filter((id, index, arr) => arr.indexOf(id) === index); // Remover duplicatas

    if (corretorIds.length > 0) {
      fetchCorretoresNomes(corretorIds);
    }
  }, [leads]);

  const fetchCorretoresNomes = async (ids: string[]) => {
    setLoadingCorretores(true);
    try {
      // TODO: SUBSTITUIR PELA SUA CHAMADA DE API REAL
      // Exemplo de como deve ser a chamada:
      // const response = await corretoresApi.getByIds(ids);
      // const map = new Map(response.map(corretor => [corretor.id, corretor.nome]));
      // setCorretoresMap(map);
      
      console.log('🔍 Buscando nomes dos corretores para IDs:', ids);
      
      // MOCK DE DADOS - REMOVER QUANDO IMPLEMENTAR A API REAL
      // Simular delay da API
      await new Promise(resolve => setTimeout(resolve, 300));
      
      // Dados mockados - substitua pela sua API
      const mockCorretoresMap = new Map([
        ["1", "João Silva"],
        ["2", "Maria Santos"], 
        ["3", "Pedro Oliveira"],
      ]);
      
      setCorretoresMap(mockCorretoresMap);
      console.log('✅ Nomes dos corretores carregados:', Object.fromEntries(mockCorretoresMap));
    } catch (error) {
      console.error('❌ Erro ao buscar nomes dos corretores:', error);
    } finally {
      setLoadingCorretores(false);
    }
  };

  const getCorretorNome = (corretorId: string) => {
    if (!corretorId || corretorId.trim() === '') {
      return '-';
    }
    
    if (loadingCorretores) {
      return 'Carregando...';
    }
    
    return corretoresMap.get(corretorId) || `ID: ${corretorId}`;
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
            <TableCell>{getCorretorNome(lead.usuarioOpcionista)}</TableCell>
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
