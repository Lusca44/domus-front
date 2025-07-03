
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { LandingPageForm } from './LandingPageForm';
import { LandingPageFormData } from '@/types/landingPage';
import { landingPageApi } from '@/services/landingPageApi';
import { useApi } from '@/hooks/useApi';

interface LandingPageCreateModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess: () => void;
}

export function LandingPageCreateModal({ open, onOpenChange, onSuccess }: LandingPageCreateModalProps) {
  const { execute, loading } = useApi({
    showSuccessToast: true,
    successMessage: 'Landing page criada com sucesso!',
  });

  const handleSubmit = async (data: LandingPageFormData) => {
    try {
      await execute(() => landingPageApi.create(data));
      onSuccess();
    } catch (error) {
      console.error('Erro ao criar landing page:', error);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Nova Landing Page</DialogTitle>
        </DialogHeader>
        
        <LandingPageForm
          onSubmit={handleSubmit}
          loading={loading}
          submitText="Criar Landing Page"
        />
      </DialogContent>
    </Dialog>
  );
}
