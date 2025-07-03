
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useState, useEffect } from "react";
import { userApi } from "@/utils/apiConfig";
import { useApi } from "@/hooks/useApi";

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
  loading?: boolean;
}

export function LeadsEditModal({ 
  open, 
  onOpenChange, 
  editForm, 
  onEditFormChange, 
  onSave,
  loading = false
}: LeadsEditModalProps) {
  const [corretores, setCorretores] = useState<Corretor[]>([]);

  const { loading: loadingCorretores, execute: executeGetCorretores } = useApi<Corretor[]>({
    showErrorToast: true,
    errorMessage: "Erro ao carregar corretores",
  });

  useEffect(() => {
    if (open) {
      fetchCorretores();
    }
  }, [open]);

  const fetchCorretores = async () => {
    try {
      console.log('🔍 Buscando corretores do backend...');
      const data = await executeGetCorretores(() => userApi.obterUsuarios());
      setCorretores(data || []);
      console.log('✅ Corretores carregados:', data);
    } catch (error) {
      console.error('❌ Erro ao buscar corretores:', error);
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
              disabled={loading}
            />
          </div>
          <div>
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={editForm.emailCliente}
              onChange={(e) => onEditFormChange({ ...editForm, emailCliente: e.target.value })}
              disabled={loading}
            />
          </div>
          <div>
            <Label htmlFor="phone">Telefone</Label>
            <Input
              id="phone"
              value={editForm.telefoneCliente}
              onChange={(e) => onEditFormChange({ ...editForm, telefoneCliente: e.target.value })}
              disabled={loading}
            />
          </div>
          <div>
            <Label htmlFor="interest">Interesse</Label>
            <Input
              id="interest"
              value={editForm.nomeLancamento}
              onChange={(e) => onEditFormChange({ ...editForm, nomeLancamento: e.target.value })}
              disabled={loading}
            />
          </div>
          <div>
            <Label htmlFor="corretor">Corretor Opcionista</Label>
            <Select
              value={editForm.corretorOpcionistaId}
              onValueChange={(value) => onEditFormChange({ ...editForm, corretorOpcionistaId: value })}
              disabled={loadingCorretores || loading}
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
          <Button variant="outline" onClick={() => onOpenChange(false)} disabled={loading}>
            Cancelar
          </Button>
          <Button onClick={onSave} disabled={loading}>
            {loading ? "Salvando..." : "Salvar"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
