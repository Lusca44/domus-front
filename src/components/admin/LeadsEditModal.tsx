
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useState, useEffect } from "react";

interface Lead {
  id: string;
  nomeLancamento: string;
  nomeCliente: string;
  telefoneCliente: string;
  usuarioOpcionista: string;
}

interface EditForm {
  nomeCliente: string;
  telefoneCliente: string;
  nomeLancamento: string;
  corretorOpcionistaId: string; // ID do corretor selecionado
}

interface Corretor {
  id: string;
  nome: string;
  email?: string;
}

interface LeadsEditModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  editForm: EditForm;
  onEditFormChange: (form: EditForm) => void;
  onSave: () => void;
}

export function LeadsEditModal({ 
  open, 
  onOpenChange, 
  editForm, 
  onEditFormChange, 
  onSave 
}: LeadsEditModalProps) {
  const [corretores, setCorretores] = useState<Corretor[]>([]);
  const [loadingCorretores, setLoadingCorretores] = useState(false);

  // Buscar lista de corretores quando o modal abrir
  useEffect(() => {
    if (open) {
      fetchCorretores();
    }
  }, [open]);

  const fetchCorretores = async () => {
    setLoadingCorretores(true);
    try {
      // TODO: SUBSTITUIR PELA SUA CHAMADA DE API REAL
      // Exemplo de como deve ser a chamada:
      // const response = await corretoresApi.getAll();
      // setCorretores(response);
      
      // MOCK DE DADOS - REMOVER QUANDO IMPLEMENTAR A API REAL
      console.log('🔍 Buscando corretores do backend...');
      // Simular delay da API
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Dados mockados - substitua pela sua API
      const mockCorretores: Corretor[] = [
        { id: "1", nome: "João Silva", email: "joao@exemplo.com" },
        { id: "2", nome: "Maria Santos", email: "maria@exemplo.com" },
        { id: "3", nome: "Pedro Oliveira", email: "pedro@exemplo.com" },
      ];
      
      setCorretores(mockCorretores);
      console.log('✅ Corretores carregados:', mockCorretores);
    } catch (error) {
      console.error('❌ Erro ao buscar corretores:', error);
      // TODO: Adicionar toast de erro se necessário
    } finally {
      setLoadingCorretores(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Editar Lead</DialogTitle>
          <DialogDescription>
            Edite as informações da lead selecionada.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          <div>
            <Label htmlFor="name">Nome</Label>
            <Input
              id="name"
              value={editForm.nomeCliente}
              onChange={(e) => onEditFormChange({ ...editForm, nomeCliente: e.target.value })}
            />
          </div>
          <div>
            <Label htmlFor="phone">Telefone</Label>
            <Input
              id="phone"
              value={editForm.telefoneCliente}
              onChange={(e) => onEditFormChange({ ...editForm, telefoneCliente: e.target.value })}
            />
          </div>
          <div>
            <Label htmlFor="interest">Interesse</Label>
            <Input
              id="interest"
              value={editForm.nomeLancamento}
              onChange={(e) => onEditFormChange({ ...editForm, nomeLancamento: e.target.value })}
            />
          </div>
          <div>
            <Label htmlFor="corretor">Corretor Opcionista</Label>
            <Select
              value={editForm.corretorOpcionistaId}
              onValueChange={(value) => onEditFormChange({ ...editForm, corretorOpcionistaId: value })}
              disabled={loadingCorretores}
            >
              <SelectTrigger>
                <SelectValue placeholder={loadingCorretores ? "Carregando corretores..." : "Selecione um corretor"} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">Nenhum corretor</SelectItem>
                {corretores.map((corretor) => (
                  <SelectItem key={corretor.id} value={corretor.id}>
                    {corretor.nome}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancelar
          </Button>
          <Button onClick={onSave}>Salvar</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
