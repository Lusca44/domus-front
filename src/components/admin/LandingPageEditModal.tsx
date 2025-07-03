
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { LandingPageForm } from './LandingPageForm';
import { LandingPageData, LandingPageFormData } from '@/types/landingPage';
import { landingPageApi } from '@/services/landingPageApi';
import { useApi } from '@/hooks/useApi';

interface LandingPageEditModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  landingPage: LandingPageData;
  onSuccess: () => void;
}

export function LandingPageEditModal({ open, onOpenChange, landingPage, onSuccess }: LandingPageEditModalProps) {
  const { execute, loading } = useApi({
    showSuccessToast: true,
    successMessage: 'Landing page atualizada com sucesso!',
  });

  const handleSubmit = async (data: LandingPageFormData) => {
    try {
      await execute(() => landingPageApi.update(landingPage.id, data));
      onSuccess();
    } catch (error) {
      console.error('Erro ao atualizar landing page:', error);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Editar Landing Page</DialogTitle>
        </DialogHeader>
        
        <LandingPageForm
          initialData={landingPage}
          onSubmit={handleSubmit}
          loading={loading}
          submitText="Atualizar Landing Page"
        />
      </DialogContent>
    </Dialog>
  );
}
