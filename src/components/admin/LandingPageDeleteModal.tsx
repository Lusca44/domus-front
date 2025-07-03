
import React from 'react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { LandingPageData } from '@/types/landingPage';
import { landingPageApi } from '@/services/landingPageApi';
import { useApi } from '@/hooks/useApi';

interface LandingPageDeleteModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  landingPage: LandingPageData;
  onSuccess: () => void;
}

export function LandingPageDeleteModal({ open, onOpenChange, landingPage, onSuccess }: LandingPageDeleteModalProps) {
  const { execute, loading } = useApi({
    showSuccessToast: true,
    successMessage: 'Landing page excluída com sucesso!',
  });

  const handleDelete = async () => {
    try {
      await execute(() => landingPageApi.delete(landingPage.id));
      onSuccess();
    } catch (error) {
      console.error('Erro ao excluir landing page:', error);
    }
  };

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Excluir Landing Page</AlertDialogTitle>
          <AlertDialogDescription>
            Tem certeza que deseja excluir a landing page "{landingPage.nome}"?
            Esta ação não pode ser desfeita e todos os dados serão perdidos.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={loading}>Cancelar</AlertDialogCancel>
          <AlertDialogAction
            onClick={handleDelete}
            disabled={loading}
            className="bg-red-600 hover:bg-red-700"
          >
            {loading ? 'Excluindo...' : 'Excluir'}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
