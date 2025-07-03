
import React, { useState } from 'react';
import { AdminLayout } from '@/components/admin/AdminLayout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Plus, Edit, Trash2, Eye, Globe } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { landingPageApi } from '@/services/landingPageApi';
import { LandingPageData } from '@/types/landingPage';
import { LandingPageCreateModal } from '@/components/admin/LandingPageCreateModal';
import { LandingPageEditModal } from '@/components/admin/LandingPageEditModal';
import { LandingPageDeleteModal } from '@/components/admin/LandingPageDeleteModal';
import { useToast } from '@/hooks/use-toast';

const AdminLandingPages = () => {
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedLandingPage, setSelectedLandingPage] = useState<LandingPageData | null>(null);
  const { toast } = useToast();

  // Buscar todas as landing pages
  const { data: landingPages = [], isLoading, refetch } = useQuery({
    queryKey: ['landingPages'],
    queryFn: landingPageApi.getAll,
  });

  const handleEdit = (landingPage: LandingPageData) => {
    setSelectedLandingPage(landingPage);
    setEditModalOpen(true);
  };

  const handleDelete = (landingPage: LandingPageData) => {
    setSelectedLandingPage(landingPage);
    setDeleteModalOpen(true);
  };

  const handleStatusChange = async (id: string, status: 'ativo' | 'inativo' | 'rascunho') => {
    try {
      await landingPageApi.updateStatus(id, status);
      toast({
        title: 'Status atualizado',
        description: 'Status da landing page atualizado com sucesso.',
      });
      refetch();
    } catch (error) {
      toast({
        title: 'Erro',
        description: 'Erro ao atualizar status da landing page.',
        variant: 'destructive',
      });
    }
  };

  const getStatusBadge = (status: string) => {
    const variants: Record<string, "default" | "secondary" | "destructive"> = {
      ativo: "default",
      rascunho: "secondary",
      inativo: "destructive",
    };
    return <Badge variant={variants[status] || "secondary"}>{status}</Badge>;
  };

  if (isLoading) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold">Landing Pages</h1>
            <p className="text-gray-600">Gerencie suas landing pages de lançamentos</p>
          </div>
          <Button onClick={() => setCreateModalOpen(true)}>
            <Plus className="w-4 h-4 mr-2" />
            Nova Landing Page
          </Button>
        </div>

        {/* Lista de Landing Pages */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {landingPages.map((landingPage) => (
            <Card key={landingPage.id} className="hover:shadow-md transition-shadow">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <CardTitle className="text-lg">{landingPage.nome}</CardTitle>
                  {getStatusBadge(landingPage.status)}
                </div>
                <div className="text-sm text-gray-600">
                  <p>{landingPage.regiao}</p>
                  <p className="font-mono text-xs mt-1">/{landingPage.regiao.toLowerCase().replace(/\s+/g, '-')}/lancamento/{landingPage.slug}</p>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-700 mb-4 line-clamp-2">
                  {landingPage.descricao}
                </p>
                
                <div className="flex justify-between items-center">
                  <div className="flex space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleEdit(landingPage)}
                    >
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleDelete(landingPage)}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                    {landingPage.status === 'ativo' && (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => window.open(`/${landingPage.regiao.toLowerCase().replace(/\s+/g, '-')}/lancamento/${landingPage.slug}`, '_blank')}
                      >
                        <Eye className="w-4 h-4" />
                      </Button>
                    )}
                  </div>
                  
                  <select
                    value={landingPage.status}
                    onChange={(e) => handleStatusChange(landingPage.id, e.target.value as any)}
                    className="text-xs border rounded px-2 py-1"
                  >
                    <option value="rascunho">Rascunho</option>
                    <option value="ativo">Ativo</option>
                    <option value="inativo">Inativo</option>
                  </select>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {landingPages.length === 0 && (
          <div className="text-center py-12">
            <Globe className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-sm font-semibold text-gray-900">Nenhuma landing page</h3>
            <p className="mt-1 text-sm text-gray-500">
              Comece criando sua primeira landing page.
            </p>
            <div className="mt-6">
              <Button onClick={() => setCreateModalOpen(true)}>
                <Plus className="w-4 h-4 mr-2" />
                Nova Landing Page
              </Button>
            </div>
          </div>
        )}
      </div>

      {/* Modais */}
      <LandingPageCreateModal
        open={createModalOpen}
        onOpenChange={setCreateModalOpen}
        onSuccess={() => {
          refetch();
          setCreateModalOpen(false);
        }}
      />

      {selectedLandingPage && (
        <>
          <LandingPageEditModal
            open={editModalOpen}
            onOpenChange={setEditModalOpen}
            landingPage={selectedLandingPage}
            onSuccess={() => {
              refetch();
              setEditModalOpen(false);
              setSelectedLandingPage(null);
            }}
          />

          <LandingPageDeleteModal
            open={deleteModalOpen}
            onOpenChange={setDeleteModalOpen}
            landingPage={selectedLandingPage}
            onSuccess={() => {
              refetch();
              setDeleteModalOpen(false);
              setSelectedLandingPage(null);
            }}
          />
        </>
      )}
    </AdminLayout>
  );
};

export default AdminLandingPages;
