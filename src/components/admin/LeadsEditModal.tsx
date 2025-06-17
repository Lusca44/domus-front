
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useState, useEffect } from "react";
import { userApi } from "@/utils/apiConfig";

interface Lead {
  id: string;
  nomeLancamento: string;
  nomeCliente: string;
  emailCliente?: string;
  telefoneCliente: string;
  usuarioOpcionista: string;
}

interface EditForm {
  nomeCliente: string;
  emailCliente: string;
  telefoneCliente: string;
  nomeLancamento: string;
  corretorOpcionistaId: string;
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

  useEffect(() => {
    if (open) {
      fetchCorretores();
    }
  }, [open]);

  const fetchCorretores = async () => {
    setLoadingCorretores(true);
    try {
      console.log('🔍 Buscando corretores do backend...');
      
      const data = await userApi.obterUsuarios();
      
      setCorretores(data);
      console.log('✅ Corretores carregados:', data);
    } catch (error) {
      console.error('❌ Erro ao buscar corretores:', error);
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
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={editForm.emailCliente}
              onChange={(e) => onEditFormChange({ ...editForm, emailCliente: e.target.value })}
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
                <SelectItem value="null">Nenhum corretor</SelectItem>
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
