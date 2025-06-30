import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

interface Lead {
  id: string;
  nomeLancamento: string;
  nomeCliente: string;
  telefoneCliente: string;
  usuarioOpcionistaId: string;
}

interface LeadsDeleteModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  selectedLead: Lead | null;
  onConfirm: () => void;
}

export function LeadsDeleteModal({
  open,
  onOpenChange,
  selectedLead,
  onConfirm,
}: LeadsDeleteModalProps) {
  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Confirmar Exclusão</AlertDialogTitle>
          <AlertDialogDescription>
            Tem certeza que deseja excluir a lead "{selectedLead?.nomeCliente}"?
            Esta ação não pode ser desfeita.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancelar</AlertDialogCancel>
          <AlertDialogAction onClick={onConfirm}>Excluir</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
