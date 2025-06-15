
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";

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
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
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
