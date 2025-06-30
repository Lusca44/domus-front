
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Users, Save } from "lucide-react";
import { userApi } from "@/utils/apiConfig";

interface Lead {
  id: string;
  nomeLancamento: string;
  nomeCliente: string;
  telefoneCliente: string;
  usuarioOpcionistaId: string;
}

interface Corretor {
  id: string;
  nome: string;
}

interface LeadsBulkEditModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  leads: Lead[];
  onBulkUpdate: (leadIds: string[], newCorretorId: string) => void;
}

export function LeadsBulkEditModal({
  open,
  onOpenChange,
  leads,
  onBulkUpdate,
}: LeadsBulkEditModalProps) {
  const [selectedLeads, setSelectedLeads] = useState<string[]>([]);
  const [newCorretorId, setNewCorretorId] = useState("");
  const [corretores, setCorretores] = useState<Corretor[]>([]);

  // TODO: IMPLEMENTAR BUSCA DE CORRETORES DO BACKEND
  // Esta função deve buscar todos os corretores opcionistas disponíveis
  useEffect(() => {
    const fetchCorretores = async () => {
      try {
        // TODO: Substituir por chamada real ao backend
        // const response = await fetch('/api/corretores');
        // const data = await response.json();
        // setCorretores(data);
        const data = await userApi.obterUsuarios();
        console.log("teste aqui")
        setCorretores(data);
      } catch (error) {
        console.error('Erro ao buscar corretores:', error);
      }
    };

    if (open) {
      fetchCorretores();
    }
  }, [open]);

  const handleLeadToggle = (leadId: string, checked: boolean) => {
    if (checked) {
      setSelectedLeads(prev => [...prev, leadId]);
    } else {
      setSelectedLeads(prev => prev.filter(id => id !== leadId));
    }
  };

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedLeads(leads.map(lead => lead.id));
    } else {
      setSelectedLeads([]);
    }
  };

  const handleSave = () => {
    if (selectedLeads.length > 0 && newCorretorId) {

      const finalCorretorId = newCorretorId === "null"  ? "" : newCorretorId;

      onBulkUpdate(selectedLeads, finalCorretorId);
      setSelectedLeads([]);
      setNewCorretorId("");
      onOpenChange(false);
    }
  };

  const handleClose = () => {
    setSelectedLeads([]);
    setNewCorretorId("");
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-hidden flex flex-col">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Users className="h-5 w-5" />
            Alterar Corretor em Lote
          </DialogTitle>
        </DialogHeader>

        <div className="flex-1 overflow-auto space-y-4">
          {/* Seletor de Corretor */}
          <div className="space-y-2">
            <Label>Novo Corretor Opcionista</Label>
            <Select value={newCorretorId} onValueChange={setNewCorretorId}>
              <SelectTrigger>
                <SelectValue placeholder="Selecione o corretor" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="null">Remover corretor</SelectItem>
                {corretores.map((corretor) => (
                  <SelectItem key={corretor.id} value={corretor.id}>
                    {corretor.nome}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Lista de Leads com Checkboxes */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <Label className="text-sm font-medium">Selecionar Leads</Label>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="select-all"
                  checked={selectedLeads.length === leads.length && leads.length > 0}
                  onCheckedChange={handleSelectAll}
                />
                <Label htmlFor="select-all" className="text-sm">
                  Selecionar Todas ({leads.length})
                </Label>
              </div>
            </div>

            <div className="border rounded-lg max-h-60 overflow-auto">
              {leads.length === 0 ? (
                <div className="p-4 text-center text-gray-500">
                  Nenhuma lead disponível para alteração
                </div>
              ) : (
                <div className="divide-y">
                  {leads.map((lead) => (
                    <div key={lead.id} className="p-3 flex items-center space-x-3 hover:bg-gray-50">
                      <Checkbox
                        id={`lead-${lead.id}`}
                        checked={selectedLeads.includes(lead.id)}
                        onCheckedChange={(checked) => handleLeadToggle(lead.id, !!checked)}
                      />
                      <div className="flex-1 min-w-0">
                        <div className="text-sm font-medium text-gray-900 truncate">
                          {lead.nomeCliente}
                        </div>
                        <div className="text-xs text-gray-500 truncate">
                          {lead.nomeLancamento} • {lead.telefoneCliente}
                        </div>
                        <div className="text-xs text-gray-400">
                          Corretor atual: {lead.usuarioOpcionistaId || "Nenhum"}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Botões de Ação */}
        <div className="flex justify-end gap-3 pt-4 border-t">
          <Button variant="outline" onClick={handleClose}>
            Cancelar
          </Button>
          <Button 
            onClick={handleSave}
            disabled={selectedLeads.length === 0}
            className="gap-2"
          >
            <Save className="h-4 w-4" />
            Atualizar {selectedLeads.length} Lead(s)
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
