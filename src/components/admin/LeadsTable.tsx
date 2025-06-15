
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Edit, Trash2 } from "lucide-react";

interface Lead {
  id: string;
  nomeLancamento: string;
  nomeCliente: string;
  telefoneCliente: string;
  usuarioOpcionista: string;
}

interface LeadsTableProps {
  leads: Lead[];
  onEdit: (lead: Lead) => void;
  onDelete: (lead: Lead) => void;
}

export function LeadsTable({ leads, onEdit, onDelete }: LeadsTableProps) {
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
            <TableCell>{lead.usuarioOpcionista || '-'}</TableCell>
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
