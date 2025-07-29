import React, { useState, useEffect } from 'react';
import { useApi } from '@/hooks/useApi';
import { finalidadeApi } from '@/utils/apiConfig';
import { AdminLayout } from '@/components/admin/AdminLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Trash2, Edit, Plus, Building } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';

interface Finalidade {
  id: string;
  nome: string;
}

export default function FinalidadesPage() {
  const [finalidades, setFinalidades] = useState<Finalidade[]>([]);
  const [selectedFinalidade, setSelectedFinalidade] = useState<Finalidade | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [formData, setFormData] = useState({
    nomeFinalidade: ''
  });

  const { toast } = useToast();
  const { execute: fetchFinalidades, loading: loadingFinalidades } = useApi();
  const { execute: createFinalidade, loading: loadingCreate } = useApi({
    showSuccessToast: true,
    successMessage: 'Finalidade criada com sucesso!'
  });
  const { execute: updateFinalidade, loading: loadingUpdate } = useApi({
    showSuccessToast: true,
    successMessage: 'Finalidade atualizada com sucesso!'
  });
  const { execute: deleteFinalidade, loading: loadingDelete } = useApi({
    showSuccessToast: true,
    successMessage: 'Finalidade excluída com sucesso!'
  });

  const loadFinalidades = async () => {
    try {
      const data = await fetchFinalidades(() => finalidadeApi.obterTodasFinalidades());
      setFinalidades(data || []);
    } catch (error) {
      console.error('Erro ao carregar finalidades:', error);
    }
  };

  useEffect(() => {
    loadFinalidades();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.nomeFinalidade.trim()) {
      toast({
        title: 'Erro',
        description: 'Nome é obrigatório',
        variant: 'destructive'
      });
      return;
    }

    try {
      if (selectedFinalidade) {
        await updateFinalidade(() => finalidadeApi.update(selectedFinalidade.id, formData));
      } else {
        await createFinalidade(() => finalidadeApi.create(formData));
      }
      
      resetForm();
      setIsDialogOpen(false);
      loadFinalidades();
    } catch (error) {
      console.error('Erro ao salvar finalidade:', error);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteFinalidade(() => finalidadeApi.delete?.(id));
      loadFinalidades();
    } catch (error) {
      console.error('Erro ao excluir finalidade:', error);
    }
  };

  const resetForm = () => {
    setFormData({ nomeFinalidade: '' });
    setSelectedFinalidade(null);
  };

  const handleEditClick = (finalidade: Finalidade) => {
    setSelectedFinalidade(finalidade);
    setFormData({
      nomeFinalidade: finalidade.nome
    });
    setIsDialogOpen(true); // Abre o modal
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Finalidades</h1>
            <p className="text-muted-foreground">
              Gerencie as finalidades dos imóveis (aluguel, venda, lançamento)
            </p>
          </div>
          
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button onClick={resetForm}>
                <Plus className="w-4 h-4 mr-2" />
                Nova Finalidade
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>
                  {selectedFinalidade ? 'Editar Finalidade' : 'Nova Finalidade'}
                </DialogTitle>
              </DialogHeader>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="nome">Nome *</Label>
                  <Input
                    id="nome"
                    value={formData.nomeFinalidade}
                    onChange={(e) => setFormData({ ...formData, nomeFinalidade: e.target.value })}
                    placeholder="Ex: Aluguel, Venda, Lançamento"
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
              <Building className="w-5 h-5" />
              Finalidades Cadastradas
            </CardTitle>
            <CardDescription>
              {finalidades.length} finalidade(s) encontrada(s)
            </CardDescription>
          </CardHeader>
          <CardContent>
            {loadingFinalidades ? (
              <div className="flex justify-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
              </div>
            ) : finalidades.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                Nenhuma finalidade cadastrada
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
                  {finalidades.map((finalidade) => (
                    <TableRow key={finalidade.id}>
                      <TableCell className="font-medium">{finalidade.nome}</TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end space-x-2">
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => handleEditClick(finalidade)}
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
                                  Tem certeza que deseja excluir a finalidade "{finalidade.nome}"?
                                  Esta ação não pode ser desfeita.
                                </AlertDialogDescription>
                              </AlertDialogHeader>
                              <AlertDialogFooter>
                                <AlertDialogCancel>Cancelar</AlertDialogCancel>
                                <AlertDialogAction
                                  onClick={() => handleDelete(finalidade.id)}
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