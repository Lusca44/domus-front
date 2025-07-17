
import React, { useState, useEffect } from 'react';
import { useApi } from '@/hooks/useApi';
import { tipologiaApi } from '@/utils/apiConfig';
import { AdminLayout } from '@/components/admin/AdminLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Trash2, Edit, Plus, Home } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';

interface Tipologia {
  id: string;
  nome: string;
  descricao?: string;
  ativo: boolean;
  createdAt: string;
  updatedAt: string;
}

/**
 * Página de Gestão de Tipologias
 * 
 * Esta página permite gerenciar as tipologias dos imóveis (ex: apartamento, casa, terreno)
 * que são utilizadas para categorizar os tipos de imóveis no sistema.
 */
export default function TipologiasPage() {
  const [tipologias, setTipologias] = useState<Tipologia[]>([]);
  const [selectedTipologia, setSelectedTipologia] = useState<Tipologia | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [formData, setFormData] = useState({
    nome: '',
    descricao: ''
  });

  const { toast } = useToast();
  const { execute: fetchTipologias, loading: loadingTipologias } = useApi();
  const { execute: createTipologia, loading: loadingCreate } = useApi({
    showSuccessToast: true,
    successMessage: 'Tipologia criada com sucesso!'
  });
  const { execute: deleteTipologia, loading: loadingDelete } = useApi({
    showSuccessToast: true,
    successMessage: 'Tipologia excluída com sucesso!'
  });

  /**
   * Carrega todas as tipologias do backend
   */
  const loadTipologias = async () => {
    try {
      const data = await fetchTipologias(() => tipologiaApi.obterTodasTipologias());
      setTipologias(data || []);
    } catch (error) {
      console.error('Erro ao carregar tipologias:', error);
    }
  };

  /**
   * Inicializa os dados da página
   */
  useEffect(() => {
    loadTipologias();
  }, []);

  /**
   * Manipula o envio do formulário de criação/edição
   */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.nome.trim()) {
      toast({
        title: 'Erro',
        description: 'Nome é obrigatório',
        variant: 'destructive'
      });
      return;
    }

    try {
      await createTipologia(() => tipologiaApi.create(formData));
      setFormData({ nome: '', descricao: '' });
      setIsDialogOpen(false);
      loadTipologias();
    } catch (error) {
      console.error('Erro ao criar tipologia:', error);
    }
  };

  /**
   * Manipula a exclusão de uma tipologia
   */
  const handleDelete = async (id: string) => {
    try {
      await deleteTipologia(() => tipologiaApi.delete?.(id));
      loadTipologias();
    } catch (error) {
      console.error('Erro ao excluir tipologia:', error);
    }
  };

  /**
   * Reseta o formulário
   */
  const resetForm = () => {
    setFormData({ nome: '', descricao: '' });
    setSelectedTipologia(null);
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Cabeçalho da página */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Tipologias</h1>
            <p className="text-muted-foreground">
              Gerencie as tipologias dos imóveis (apartamento, casa, terreno)
            </p>
          </div>
          
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button onClick={resetForm}>
                <Plus className="w-4 h-4 mr-2" />
                Nova Tipologia
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Nova Tipologia</DialogTitle>
              </DialogHeader>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="nome">Nome *</Label>
                  <Input
                    id="nome"
                    value={formData.nome}
                    onChange={(e) => setFormData({ ...formData, nome: e.target.value })}
                    placeholder="Ex: Apartamento, Casa, Terreno"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="descricao">Descrição</Label>
                  <Input
                    id="descricao"
                    value={formData.descricao}
                    onChange={(e) => setFormData({ ...formData, descricao: e.target.value })}
                    placeholder="Descrição da tipologia"
                  />
                </div>
                <div className="flex justify-end space-x-2">
                  <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                    Cancelar
                  </Button>
                  <Button type="submit" disabled={loadingCreate}>
                    {loadingCreate ? 'Criando...' : 'Criar'}
                  </Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        {/* Lista de tipologias */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Home className="w-5 h-5" />
              Tipologias Cadastradas
            </CardTitle>
            <CardDescription>
              {tipologias.length} tipologia(s) encontrada(s)
            </CardDescription>
          </CardHeader>
          <CardContent>
            {loadingTipologias ? (
              <div className="flex justify-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
              </div>
            ) : tipologias.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                Nenhuma tipologia cadastrada
              </div>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Nome</TableHead>
                    <TableHead>Descrição</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Criado em</TableHead>
                    <TableHead className="text-right">Ações</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {tipologias.map((tipologia) => (
                    <TableRow key={tipologia.id}>
                      <TableCell className="font-medium">{tipologia.nome}</TableCell>
                      <TableCell>{tipologia.descricao || '-'}</TableCell>
                      <TableCell>
                        <Badge variant={tipologia.ativo ? 'default' : 'secondary'}>
                          {tipologia.ativo ? 'Ativo' : 'Inativo'}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        {new Date(tipologia.createdAt).toLocaleDateString('pt-BR')}
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end space-x-2">
                          <Button variant="outline" size="sm">
                            <Edit className="w-4 h-4" />
                          </Button>
                          <AlertDialog>
                            <AlertDialogTrigger asChild>
                              <Button variant="destructive" size="sm">
                                <Trash2 className="w-4 h-4" />
                              </Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                              <AlertDialogHeader>
                                <AlertDialogTitle>Confirmar exclusão</AlertDialogTitle>
                                <AlertDialogDescription>
                                  Tem certeza que deseja excluir a tipologia "{tipologia.nome}"?
                                  Esta ação não pode ser desfeita.
                                </AlertDialogDescription>
                              </AlertDialogHeader>
                              <AlertDialogFooter>
                                <AlertDialogCancel>Cancelar</AlertDialogCancel>
                                <AlertDialogAction
                                  onClick={() => handleDelete(tipologia.id)}
                                  className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                                >
                                  {loadingDelete ? 'Excluindo...' : 'Excluir'}
                                </AlertDialogAction>
                              </AlertDialogFooter>
                            </AlertDialogContent>
                          </AlertDialog>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
}
