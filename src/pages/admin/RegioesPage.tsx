import React, { useState, useEffect } from 'react';
import { useApi } from '@/hooks/useApi';
import { regiaoApi } from '@/utils/apiConfig';
import { AdminLayout } from '@/components/admin/AdminLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Trash2, Edit, Plus, MapPin, Star } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';

interface Regiao {
  id: string;
  nomeRegiao: string;
  destaque: boolean;
}

/**
 * Página de Gestão de Regiões
 * 
 * Esta página permite gerenciar as regiões dos imóveis (ex: Porto Maravilha, Centro)
 * que são utilizadas para categorizar os imóveis no sistema.
 */
export default function RegioesPage() {
  const [regioes, setRegioes] = useState<Regiao[]>([]);
  const [selectedRegiao, setSelectedRegiao] = useState<Regiao | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [formData, setFormData] = useState({
    nomeRegiao: '',
    isDestaque: false
  });
  const [loadingDestaqueId, setLoadingDestaqueId] = useState<string | null>(null); // Estado para controlar loading por região

  const { toast } = useToast();
  const { execute: fetchRegioes, loading: loadingRegioes } = useApi();
  const { execute: createRegiao, loading: loadingCreate } = useApi({
    showSuccessToast: true,
    successMessage: 'Região criada com sucesso!'
  });
  const { execute: updateRegiao, loading: loadingUpdate } = useApi({
    showSuccessToast: true,
    successMessage: 'Região atualizada com sucesso!'
  });
  const { execute: deleteRegiao, loading: loadingDelete } = useApi({
    showSuccessToast: true,
    successMessage: 'Região excluída com sucesso!'
  });

  /**
   * Carrega todas as regiões do backend
   */
  const loadRegioes = async () => {
    try {
      const data = await fetchRegioes(() => regiaoApi.obterTodasRegioes());
      setRegioes(data || []);
    } catch (error) {
      console.error('Erro ao carregar regiões:', error);
    }
  };

  /**
   * Inicializa os dados da página
   */
  useEffect(() => {
    loadRegioes();
  }, []);

  /**
   * Manipula o envio do formulário de criação/edição
   */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.nomeRegiao.trim()) {
      toast({
        title: 'Erro',
        description: 'Nome da região é obrigatório',
        variant: 'destructive'
      });
      return;
    }

    try {
      // Se estiver editando (selectedRegiao existe)
      if (selectedRegiao) {
        await updateRegiao(() => regiaoApi.update(selectedRegiao.id, formData));
      } else {
        await createRegiao(() => regiaoApi.create(formData));
      }
      
      resetForm();
      setIsDialogOpen(false);
      loadRegioes();
    } catch (error) {
      console.error('Erro ao salvar região:', error);
    }
  };

  /**
   * Manipula a exclusão de uma região
   */
  const handleDelete = async (id: string) => {
    try {
      await deleteRegiao(() => regiaoApi.delete?.(id));
      loadRegioes();
    } catch (error) {
      console.error('Erro ao excluir região:', error);
    }
  };

  /**
   * Reseta o formulário
   */
  const resetForm = () => {
    setFormData({ nomeRegiao: '', isDestaque: false });
    setSelectedRegiao(null);
  };

  /**
   * Preenche o formulário para edição
   */
  const handleEditClick = (regiao: Regiao) => {
    setSelectedRegiao(regiao);
    setFormData({
      nomeRegiao: regiao.nomeRegiao,
      isDestaque: regiao.destaque
    });
    setIsDialogOpen(true);
  };
  
  /**
   * Altera o status de destaque de uma região
   */
  const handleDestaqueClick = async (id: string) => {
    setLoadingDestaqueId(id); // Ativa o estado de loading para esta região
    try {
      // Chama a API para alterar o status de destaque
      await regiaoApi.alterarStatusDestaque(id);
      
      // Atualiza a lista de regiões
      await loadRegioes();
      
      toast({
        title: 'Sucesso',
        description: 'Status de destaque alterado!',
        variant: 'default'
      });
    } catch (error) {
      console.error('Erro ao alterar destaque:', error);
      toast({
        title: 'Erro',
        description: 'Falha ao alterar o status de destaque',
        variant: 'destructive'
      });
    } finally {
      setLoadingDestaqueId(null); // Desativa o estado de loading
    }
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Cabeçalho da página */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Regiões</h1>
            <p className="text-muted-foreground">
              Gerencie as regiões dos imóveis (ex: Porto Maravilha, Centro)
            </p>
          </div>
          
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button onClick={resetForm}>
                <Plus className="w-4 h-4 mr-2" />
                Nova Região
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>{selectedRegiao ? 'Editar Região' : 'Nova Região'}</DialogTitle>
              </DialogHeader>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="nomeRegiao">Nome *</Label>
                  <Input
                    id="nomeRegiao"
                    value={formData.nomeRegiao}
                    onChange={(e) => setFormData({ ...formData, nomeRegiao: e.target.value })}
                    placeholder="Ex: Porto Maravilha, Centro"
                    required
                  />
                </div>
                <div className="flex justify-end space-x-2">
                  <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
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

        {/* Lista de regiões */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MapPin className="w-5 h-5" />
              Regiões Cadastradas
            </CardTitle>
            <CardDescription>
              {regioes.length} região(ões) encontrada(s)
            </CardDescription>
          </CardHeader>
          <CardContent>
            {loadingRegioes ? (
              <div className="flex justify-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
              </div>
            ) : regioes.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                Nenhuma região cadastrada
              </div>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Nome</TableHead>
                    <TableHead>Destaque</TableHead>
                    <TableHead className="text-right">Ações</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {regioes.map((regiao) => (
                    <TableRow key={regiao.id}>
                      <TableCell className="font-medium">{regiao.nomeRegiao}</TableCell>
                      <TableCell>
                        {regiao.destaque ? (
                          <Badge variant="default">
                            <Star className="w-4 h-4 mr-1" />
                            Destaque
                          </Badge>
                        ) : (
                          <Badge variant="secondary">Normal</Badge>
                        )}
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end space-x-2">
                          <Button 
                            variant="outline" 
                            size="sm" 
                            onClick={() => handleDestaqueClick(regiao.id)}
                            disabled={loadingDestaqueId === regiao.id}
                          >
                            {loadingDestaqueId === regiao.id ? (
                              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-gray-900" />
                            ) : (
                              <Star className="w-4 h-4" />
                            )}
                          </Button>

                          <Button 
                            variant="outline" 
                            size="sm" 
                            onClick={() => handleEditClick(regiao)}
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
                                  Tem certeza que deseja excluir a região "{regiao.nomeRegiao}"?
                                  Esta ação não pode ser desfeita.
                                </AlertDialogDescription>
                              </AlertDialogHeader>
                              <AlertDialogFooter>
                                <AlertDialogCancel>Cancelar</AlertDialogCancel>
                                <AlertDialogAction
                                  onClick={() => handleDelete(regiao.id)}
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