
import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { LandingPageCreateModal } from "@/components/admin/LandingPageCreateModal";
import { LandingPageEditModal } from "@/components/admin/LandingPageEditModal";
import { LandingPageDeleteModal } from "@/components/admin/LandingPageDeleteModal";
import { useToast } from "@/hooks/use-toast";
import { Plus, Edit, Trash2, Eye, Copy } from "lucide-react";

export interface LandingPageData {
  id: string;
  nome_projeto: string;
  slogan: string;
  descricao: string;
  regiao: string;
  endereco: string;
  previsao_entrega: string;
  preco: string;
  url_pagina: string;
  tipos_apartamento: string;
  vagas: string;
  area: string;
  diferenciais: string[];
  imagem_background: string;
  fotos_galeria: string[];
  videos_urls: string[];
  imagem_card: string;
  url_maps: string;
  telefone: string;
  responsavel_lead: string;
  ativo: boolean;
  data_criacao: string;
  data_modificacao: string;
}

const AdminLandingPages = () => {
  const [landingPages, setLandingPages] = useState<LandingPageData[]>([]);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedLandingPage, setSelectedLandingPage] = useState<LandingPageData | null>(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  // Simulação de dados - em produção seria uma chamada à API
  useEffect(() => {
    const fetchLandingPages = async () => {
      setLoading(true);
      // Simular delay de API
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const mockData: LandingPageData[] = [
        {
          id: "1",
          nome_projeto: "Residencial Pixinguinha",
          slogan: "A junção do passado e o presente moldando o futuro",
          descricao: "Apartamentos modernos no coração do Porto Maravilha",
          regiao: "Porto Maravilha",
          endereco: "Rua Sacadura Cabral, Centro, Rio de Janeiro",
          previsao_entrega: "Maio/2027",
          preco: "A partir de R$ 294.900",
          url_pagina: "/porto-maravilha/lancamento/pixinguinha",
          tipos_apartamento: "1 a 3 quartos",
          vagas: "Opcionais",
          area: "45m² a 85m²",
          diferenciais: ["Academia completa", "Rooftop com vista panorâmica", "Salão de festas"],
          imagem_background: "/pixinguinha/background.jpg",
          fotos_galeria: ["/pixinguinha/foto1.jpg", "/pixinguinha/foto2.jpg"],
          videos_urls: ["https://youtube.com/watch?v=example"],
          imagem_card: "/pixinguinha/card.jpg",
          url_maps: "https://maps.google.com/embed/example",
          telefone: "(21) 99999-9999",
          responsavel_lead: "João Silva",
          ativo: true,
          data_criacao: "2024-01-15",
          data_modificacao: "2024-01-20"
        }
      ];
      
      setLandingPages(mockData);
      setLoading(false);
    };

    fetchLandingPages();
  }, []);

  const handleCreateLandingPage = (data: Omit<LandingPageData, 'id' | 'data_criacao' | 'data_modificacao'>) => {
    const newLandingPage: LandingPageData = {
      ...data,
      id: Date.now().toString(),
      data_criacao: new Date().toISOString().split('T')[0],
      data_modificacao: new Date().toISOString().split('T')[0]
    };
    
    setLandingPages(prev => [...prev, newLandingPage]);
    setIsCreateModalOpen(false);
    
    toast({
      title: "Landing Page criada com sucesso!",
      description: `${data.nome_projeto} foi criada e está ativa.`,
    });
  };

  const handleEditLandingPage = (data: LandingPageData) => {
    const updatedData = {
      ...data,
      data_modificacao: new Date().toISOString().split('T')[0]
    };
    
    setLandingPages(prev => 
      prev.map(lp => lp.id === data.id ? updatedData : lp)
    );
    setIsEditModalOpen(false);
    setSelectedLandingPage(null);
    
    toast({
      title: "Landing Page atualizada!",
      description: `${data.nome_projeto} foi atualizada com sucesso.`,
    });
  };

  const handleDeleteLandingPage = (id: string) => {
    setLandingPages(prev => prev.filter(lp => lp.id !== id));
    setIsDeleteModalOpen(false);
    setSelectedLandingPage(null);
    
    toast({
      title: "Landing Page excluída",
      description: "A landing page foi removida com sucesso.",
    });
  };

  const handleDuplicateLandingPage = (landingPage: LandingPageData) => {
    const duplicated: LandingPageData = {
      ...landingPage,
      id: Date.now().toString(),
      nome_projeto: `${landingPage.nome_projeto} (Cópia)`,
      url_pagina: `${landingPage.url_pagina}-copia`,
      data_criacao: new Date().toISOString().split('T')[0],
      data_modificacao: new Date().toISOString().split('T')[0]
    };
    
    setLandingPages(prev => [...prev, duplicated]);
    
    toast({
      title: "Landing Page duplicada!",
      description: `Cópia de ${landingPage.nome_projeto} foi criada.`,
    });
  };

  const handleToggleStatus = (id: string) => {
    setLandingPages(prev =>
      prev.map(lp => 
        lp.id === id 
          ? { ...lp, ativo: !lp.ativo, data_modificacao: new Date().toISOString().split('T')[0] }
          : lp
      )
    );
    
    toast({
      title: "Status atualizado",
      description: "O status da landing page foi alterado.",
    });
  };

  if (loading) {
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
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Landing Pages</h1>
            <p className="text-gray-600 mt-1">
              Gerencie as landing pages dos empreendimentos
            </p>
          </div>
          <Button onClick={() => setIsCreateModalOpen(true)}>
            <Plus className="w-4 h-4 mr-2" />
            Nova Landing Page
          </Button>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Landing Pages Cadastradas</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Projeto</TableHead>
                  <TableHead>Região</TableHead>
                  <TableHead>URL</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Criação</TableHead>
                  <TableHead>Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {landingPages.map((landingPage) => (
                  <TableRow key={landingPage.id}>
                    <TableCell>
                      <div>
                        <div className="font-medium">{landingPage.nome_projeto}</div>
                        <div className="text-sm text-gray-500">{landingPage.preco}</div>
                      </div>
                    </TableCell>
                    <TableCell>{landingPage.regiao}</TableCell>
                    <TableCell>
                      <code className="bg-gray-100 px-2 py-1 rounded text-xs">
                        {landingPage.url_pagina}
                      </code>
                    </TableCell>
                    <TableCell>
                      <Badge 
                        variant={landingPage.ativo ? "default" : "secondary"}
                        className="cursor-pointer"
                        onClick={() => handleToggleStatus(landingPage.id)}
                      >
                        {landingPage.ativo ? "Ativo" : "Inativo"}
                      </Badge>
                    </TableCell>
                    <TableCell>{landingPage.data_criacao}</TableCell>
                    <TableCell>
                      <div className="flex space-x-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => window.open(landingPage.url_pagina, '_blank')}
                        >
                          <Eye className="w-4 h-4" />
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => {
                            setSelectedLandingPage(landingPage);
                            setIsEditModalOpen(true);
                          }}
                        >
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleDuplicateLandingPage(landingPage)}
                        >
                          <Copy className="w-4 h-4" />
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => {
                            setSelectedLandingPage(landingPage);
                            setIsDeleteModalOpen(true);
                          }}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        <LandingPageCreateModal
          isOpen={isCreateModalOpen}
          onClose={() => setIsCreateModalOpen(false)}
          onSubmit={handleCreateLandingPage}
        />

        {selectedLandingPage && (
          <>
            <LandingPageEditModal
              isOpen={isEditModalOpen}
              onClose={() => {
                setIsEditModalOpen(false);
                setSelectedLandingPage(null);
              }}
              onSubmit={handleEditLandingPage}
              landingPage={selectedLandingPage}
            />

            <LandingPageDeleteModal
              isOpen={isDeleteModalOpen}
              onClose={() => {
                setIsDeleteModalOpen(false);
                setSelectedLandingPage(null);
              }}
              onConfirm={() => handleDeleteLandingPage(selectedLandingPage.id)}
              landingPageName={selectedLandingPage.nome_projeto}
            />
          </>
        )}
      </div>
    </AdminLayout>
  );
};

export default AdminLandingPages;
