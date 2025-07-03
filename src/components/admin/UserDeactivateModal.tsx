
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { useToast } from "@/hooks/use-toast";
import { useApi } from "@/hooks/useApi";
import { userApi } from "@/utils/apiConfig";

interface User {
  id: string;
  nome: string;
  email: string;
  telefone?: string;
  isAdmin: boolean;
  ativo: boolean;
  dataCadastro: string;
}

interface UserDeactivateModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  user: User | null;
  onUserUpdated: () => void;
}

export function UserDeactivateModal({ open, onOpenChange, user, onUserUpdated }: UserDeactivateModalProps) {
  const { toast } = useToast();
  const { loading, execute } = useApi({
    showSuccessToast: true,
    successMessage: user?.ativo ? "Usuário desativado com sucesso!" : "Usuário ativado com sucesso!",
  });

  const handleToggleStatus = async () => {
    if (!user) return;

    try {
      await execute(async () => {
        console.log('Alterando status do usuário:', { id: user.id, novoStatus: !user.ativo });
        // Aqui você implementará a chamada real para a API
        // userApi.toggleStatus(user.id, !user.ativo)
        return { success: true };
      });

      onUserUpdated();
      onOpenChange(false);
    } catch (error) {
      console.error('Erro ao alterar status do usuário:', error);
    }
  };

  if (!user) return null;

  const isActivating = !user.ativo;
  const actionText = isActivating ? "ativar" : "desativar";

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            Confirmar {isActivating ? "Ativação" : "Desativação"}
          </AlertDialogTitle>
          <AlertDialogDescription>
            Tem certeza que deseja {actionText} o usuário <strong>{user.nome}</strong>?
            <br />
            <span className="text-orange-600 font-medium">
              {isActivating 
                ? "O usuário poderá fazer login no sistema novamente." 
                : "O usuário não poderá mais fazer login no sistema."}
            </span>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={loading}>
            Cancelar
          </AlertDialogCancel>
          <AlertDialogAction
            onClick={handleToggleStatus}
            disabled={loading}
            className={isActivating ? "bg-green-600 hover:bg-green-700" : "bg-orange-600 hover:bg-orange-700"}
          >
            {loading ? "Processando..." : `${isActivating ? "Ativar" : "Desativar"} Usuário`}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
