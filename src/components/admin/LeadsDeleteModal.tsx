
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
  emailCliente?: string;
  telefoneCliente: string;
  usuarioOpcionistaId: string;
}

interface LeadsDeleteModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  selectedLead: Lead | null;
  onConfirm: () => void;
  loading?: boolean;
}

export function LeadsDeleteModal({
  open,
  onOpenChange,
  selectedLead,
  onConfirm,
  loading = false,
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
          <AlertDialogCancel disabled={loading}>Cancelar</AlertDialogCancel>
          <AlertDialogAction onClick={onConfirm} disabled={loading}>
            {loading ? "Excluindo..." : "Excluir"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
