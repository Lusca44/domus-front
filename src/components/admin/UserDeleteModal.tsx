
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { useToast } from "@/hooks/use-toast";
import { useApi } from "@/hooks/useApi";

interface User {
  id: string;
  nome: string;
  email: string;
  telefone?: string;
  isAdmin: boolean;
  ativo: boolean;
  dataCadastro: string;
}

interface UserDeleteModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  user: User | null;
  onUserDeleted: () => void;
}

export function UserDeleteModal({ open, onOpenChange, user, onUserDeleted }: UserDeleteModalProps) {
  const { toast } = useToast();
  const { loading, execute } = useApi({
    showSuccessToast: true,
    successMessage: "Usuário excluído com sucesso!",
  });

  const handleDelete = async () => {
    if (!user) return;

    try {
      await execute(async () => {
        console.log('Excluindo usuário:', user.id);
        return { success: true };
      });

      onUserDeleted();
      onOpenChange(false);
    } catch (error) {
      console.error('Erro ao excluir usuário:', error);
    }
  };

  if (!user) return null;

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Confirmar Exclusão</AlertDialogTitle>
          <AlertDialogDescription>
            Tem certeza que deseja excluir o usuário <strong>{user.nome}</strong>?
            <br />
            <span className="text-red-600 font-medium">Esta ação não pode ser desfeita.</span>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={loading}>
            Cancelar
          </AlertDialogCancel>
          <AlertDialogAction
            onClick={handleDelete}
            disabled={loading}
            className="bg-red-600 hover:bg-red-700"
          >
            {loading ? "Excluindo..." : "Excluir Usuário"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
