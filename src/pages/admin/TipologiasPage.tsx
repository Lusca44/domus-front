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
}

export default function TipologiasPage() {
  const [tipologias, setTipologias] = useState<Tipologia[]>([]);
  const [selectedTipologia, setSelectedTipologia] = useState<Tipologia | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [formData, setFormData] = useState({
    nomeTipologia: ''
  });

  const { toast } = useToast();
  const { execute: fetchTipologias, loading: loadingTipologias } = useApi();
  const { execute: createTipologia, loading: loadingCreate } = useApi({
    showSuccessToast: true,
    successMessage: 'Tipologia criada com sucesso!'
  });
  const { execute: updateTipologia, loading: loadingUpdate } = useApi({
    showSuccessToast: true,
    successMessage: 'Tipologia atualizada com sucesso!'
  });
  const { execute: deleteTipologia, loading: loadingDelete } = useApi({
    showSuccessToast: true,
    successMessage: 'Tipologia excluída com sucesso!'
  });

  const loadTipologias = async () => {
    try {
      const data = await fetchTipologias(() => tipologiaApi.obterTodasTipologias());
      setTipologias(data || []);
    } catch (error) {
      console.error('Erro ao carregar tipologias:', error);
    }
  };

  useEffect(() => {
    loadTipologias();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.nomeTipologia.trim()) {
      toast({
        title: 'Erro',
        description: 'Nome é obrigatório',
        variant: 'destructive'
      });
      return;
    }

    try {
      if (selectedTipologia) {
        await updateTipologia(() => tipologiaApi.update(selectedTipologia.id, formData));
      } else {
        await createTipologia(() => tipologiaApi.create(formData));
      }
      
      resetForm();
      setIsDialogOpen(false);
      loadTipologias();
    } catch (error) {
      console.error('Erro ao salvar tipologia:', error);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteTipologia(() => tipologiaApi.delete?.(id));
      loadTipologias();
    } catch (error) {
      console.error('Erro ao excluir tipologia:', error);
    }
  };

  const resetForm = () => {
    setFormData({ nomeTipologia: '' });
    setSelectedTipologia(null);
  };

  // Correção: Abrir o diálogo ao editar
  const handleEditClick = (tipologia: Tipologia) => {
    setSelectedTipologia(tipologia);
    setFormData({
      nomeTipologia: tipologia.nome
    });
    setIsDialogOpen(true); // Esta linha estava faltando para abrir o modal
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
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
                <DialogTitle>
                  {selectedTipologia ? 'Editar Tipologia' : 'Nova Tipologia'}
                </DialogTitle>
              </DialogHeader>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="nome">Nome *</Label>
                  <Input
                    id="nome"
                    value={formData.nomeTipologia}
                    onChange={(e) => setFormData({ ...formData, nomeTipologia: e.target.value })}
                    placeholder="Ex: Apartamento, Casa, Terreno"
                    required
                  />
                </div>
                <div className="flex justify-end space-x-2">
                  <Button 
                    type="button" 
                    variant="outline" 
                    onClick={() => {
                      resetForm();
                      setIsDialogOpen(false);
                    }}
                  >
                    Cancelar
                  </Button>
                  <Button type="submit" disabled={loadingCreate || loadingUpdate}>
                    {loadingCreate || loadingUpdate ? 'Salvando...' : 'Salvar'}
                  </Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
        </div>

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
                    <TableHead className="text-right">Ações</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {tipologias.map((tipologia) => (
                    <TableRow key={tipologia.id}>
                      <TableCell className="font-medium">{tipologia.nome}</TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end space-x-2">
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => handleEditClick(tipologia)}
                          >
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