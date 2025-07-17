
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
  descricao?: string;
  ativo: boolean;
  createdAt: string;
  updatedAt: string;
}

/**
 * Página de Gestão de Finalidades
 * 
 * Esta página permite gerenciar as finalidades dos imóveis (ex: aluguel, venda, lançamento)
 * que são utilizadas para categorizar os imóveis no sistema.
 */
export default function FinalidadesPage() {
  const [finalidades, setFinalidades] = useState<Finalidade[]>([]);
  const [selectedFinalidade, setSelectedFinalidade] = useState<Finalidade | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [formData, setFormData] = useState({
    nome: '',
    descricao: ''
  });

  const { toast } = useToast();
  const { execute: fetchFinalidades, loading: loadingFinalidades } = useApi();
  const { execute: createFinalidade, loading: loadingCreate } = useApi({
    showSuccessToast: true,
    successMessage: 'Finalidade criada com sucesso!'
  });
  const { execute: deleteFinalidade, loading: loadingDelete } = useApi({
    showSuccessToast: true,
    successMessage: 'Finalidade excluída com sucesso!'
  });

  /**
   * Carrega todas as finalidades do backend
   */
  const loadFinalidades = async () => {
    try {
      const data = await fetchFinalidades(() => finalidadeApi.obterTodasFinalidades());

      console.log("----------------------");
      console.log(data);
      setFinalidades(data || []);
    } catch (error) {
      console.error('Erro ao carregar finalidades:', error);
    }
  };

  /**
   * Inicializa os dados da página
   */
  useEffect(() => {
    loadFinalidades();
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
      await createFinalidade(() => finalidadeApi.create(formData));
      setFormData({ nome: '', descricao: '' });
      setIsDialogOpen(false);
      loadFinalidades();
    } catch (error) {
      console.error('Erro ao criar finalidade:', error);
    }
  };

  /**
   * Manipula a exclusão de uma finalidade
   */
  const handleDelete = async (id: string) => {
    try {
      await deleteFinalidade(() => finalidadeApi.delete?.(id));
      loadFinalidades();
    } catch (error) {
      console.error('Erro ao excluir finalidade:', error);
    }
  };

  /**
   * Reseta o formulário
   */
  const resetForm = () => {
    setFormData({ nome: '', descricao: '' });
    setSelectedFinalidade(null);
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Cabeçalho da página */}
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
                <DialogTitle>Nova Finalidade</DialogTitle>
              </DialogHeader>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="nome">Nome *</Label>
                  <Input
                    id="nome"
                    value={formData.nome}
                    onChange={(e) => setFormData({ ...formData, nome: e.target.value })}
                    placeholder="Ex: Aluguel, Venda, Lançamento"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="descricao">Descrição</Label>
                  <Input
                    id="descricao"
                    value={formData.descricao}
                    onChange={(e) => setFormData({ ...formData, descricao: e.target.value })}
                    placeholder="Descrição da finalidade"
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

        {/* Lista de finalidades */}
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
                    <TableHead>Descrição</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Criado em</TableHead>
                    <TableHead className="text-right">Ações</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {finalidades.map((finalidade) => (
                    <TableRow key={finalidade.id}>
                      <TableCell className="font-medium">{finalidade.nome}</TableCell>
                      <TableCell>{finalidade.descricao || '-'}</TableCell>
                      <TableCell>
                        <Badge variant={finalidade.ativo ? 'default' : 'secondary'}>
                          {finalidade.ativo ? 'Ativo' : 'Inativo'}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        {new Date(finalidade.createdAt).toLocaleDateString('pt-BR')}
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
