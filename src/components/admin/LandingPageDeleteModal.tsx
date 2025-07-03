
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
} from "@/components/ui/alert-dialog";

interface LandingPageDeleteModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  landingPageName: string;
}

export const LandingPageDeleteModal: React.FC<LandingPageDeleteModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  landingPageName,
}) => {
  return (
    <AlertDialog open={isOpen} onOpenChange={onClose}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Excluir Landing Page</AlertDialogTitle>
          <AlertDialogDescription>
            Tem certeza que deseja excluir a landing page "{landingPageName}"?
            <br />
            <br />
            Esta ação irá:
            <ul className="list-disc list-inside mt-2 space-y-1">
              <li>Remover todos os arquivos da landing page</li>
              <li>Excluir as rotas associadas</li>
              <li>Remover o card da página inicial</li>
              <li>Apagar todas as imagens e vídeos</li>
            </ul>
            <br />
            <strong>Esta ação não pode ser desfeita.</strong>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={onClose}>Cancelar</AlertDialogCancel>
          <AlertDialogAction
            onClick={onConfirm}
            className="bg-red-600 hover:bg-red-700"
          >
            Excluir Definitivamente
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
