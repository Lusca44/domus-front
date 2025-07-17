
import React, { useState, useEffect } from 'react';
import { useApi } from '@/hooks/useApi';
import { lancamentoApi, regiaoApi, tipologiaApi } from '@/utils/apiConfig';
import { AdminLayout } from '@/components/admin/AdminLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Trash2, Edit, Plus, Building2, MapPin, ExternalLink } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';

interface Lancamento {
  id: string;
  nome: string;
  slogan?: string;
  descricao?: string;
  endereco?: string;
  preco?: number;
  statusObra: 'Lançamento' | 'Em obras' | 'Pronto';
  areasDisponiveis?: string[];
  imagemPrincipal?: string;
  imagens?: string[];
  mapUrl?: string;
  diferenciais?: string[];
  caracteristicas?: any[];
  regiaoId?: string;
  tipologiaId?: string;
  regiao?: any;
  tipologia?: any;
  createdAt: string;
  updatedAt: string;
}

interface Regiao {
  id: string;
  nome: string;
}

interface Tipologia {
  id: string;
  nome: string;
}

/**
 * Página de Gestão de Lançamentos (Admin)
 * 
 * Esta página permite gerenciar os lançamentos imobiliários que serão utilizados
 * para gerar Landing Pages dinâmicas.
 */
export default function LancamentosAdminPage() {
  const [lancamentos, setLancamentos] = useState<Lancamento[]>([]);
  const [regioes, setRegioes] = useState<Regiao[]>([]);
  const [tipologias, setTipologias] = useState<Tipologia[]>([]);
  const [selectedLancamento, setSelectedLancamento] = useState<Lancamento | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [formData, setFormData] = useState({
    nome: '',
    slogan: '',
    descricao: '',
    endereco: '',
    preco: '',
    statusObra: 'Lançamento' as const,
    areasDisponiveis: '',
    imagemPrincipal: '',
    imagens: '',
    mapUrl: '',
    diferenciais: '',
    regiaoId: '',
    tipologiaId: ''
  });

  const { toast } = useToast();
  const { execute: fetchLancamentos, loading: loadingLancamentos } = useApi();
  const { execute: fetchRegioes } = useApi();
  const { execute: fetchTipologias } = useApi();
  const { execute: createLancamento, loading: loadingCreate } = useApi({
    showSuccessToast: true,
    successMessage: 'Lançamento criado com sucesso!'
  });
  const { execute: deleteLancamento, loading: loadingDelete } = useApi({
    showSuccessToast: true,
    successMessage: 'Lançamento excluído com sucesso!'
  });

  /**
   * Carrega todos os lançamentos do backend
   */
  const loadLancamentos = async () => {
    try {
      const data = await fetchLancamentos(() => lancamentoApi.obterTodosLancamentos());
      setLancamentos(data || []);
    } catch (error) {
      console.error('Erro ao carregar lançamentos:', error);
    }
  };

  /**
   * Carrega dados auxiliares (regiões e tipologias)
   */
  const loadAuxiliaryData = async () => {
    try {
      const [regioesData, tipologiasData] = await Promise.all([
        fetchRegioes(() => regiaoApi.obterTodasRegioes()),
        fetchTipologias(() => tipologiaApi.obterTodasTipologias())
      ]);
      setRegioes(regioesData || []);
      setTipologias(tipologiasData || []);
    } catch (error) {
      console.error('Erro ao carregar dados auxiliares:', error);
    }
  };

  /**
   * Inicializa os dados da página
   */
  useEffect(() => {
    loadLancamentos();
    loadAuxiliaryData();
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
      // Preparar dados para envio
      const dataToSend = {
        ...formData,
        preco: formData.preco ? parseFloat(formData.preco) : undefined,
        areasDisponiveis: formData.areasDisponiveis ? formData.areasDisponiveis.split(',').map(a => a.trim()) : [],
        imagens: formData.imagens ? formData.imagens.split(',').map(img => img.trim()) : [],
        diferenciais: formData.diferenciais ? formData.diferenciais.split(',').map(d => d.trim()) : [],
      };

      await createLancamento(() => lancamentoApi.create(dataToSend));
      resetForm();
      setIsDialogOpen(false);
      loadLancamentos();
    } catch (error) {
      console.error('Erro ao criar lançamento:', error);
    }
  };

  /**
   * Manipula a exclusão de um lançamento
   */
  const handleDelete = async (id: string) => {
    try {
      await deleteLancamento(() => lancamentoApi.delete?.(id));
      loadLancamentos();
    } catch (error) {
      console.error('Erro ao excluir lançamento:', error);
    }
  };

  /**
   * Reseta o formulário
   */
  const resetForm = () => {
    setFormData({
      nome: '',
      slogan: '',
      descricao: '',
      endereco: '',
      preco: '',
      statusObra: 'Lançamento',
      areasDisponiveis: '',
      imagemPrincipal: '',
      imagens: '',
      mapUrl: '',
      diferenciais: '',
      regiaoId: '',
      tipologiaId: ''
    });
    setSelectedLancamento(null);
  };

  /**
   * Gera URL da landing page para o lançamento
   */
  const getLandingPageUrl = (lancamento: Lancamento) => {
    return `/lancamento/${lancamento.id}`;
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Cabeçalho da página */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Lançamentos</h1>
            <p className="text-muted-foreground">
              Gerencie os lançamentos imobiliários e suas landing pages
            </p>
          </div>
          
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button onClick={resetForm}>
                <Plus className="w-4 h-4 mr-2" />
                Novo Lançamento
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Novo Lançamento</DialogTitle>
              </DialogHeader>
              <form onSubmit={handleSubmit} className="space-y-4 max-h-[70vh] overflow-y-auto">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="nome">Nome *</Label>
                    <Input
                      id="nome"
                      value={formData.nome}
                      onChange={(e) => setFormData({ ...formData, nome: e.target.value })}
                      placeholder="Nome do lançamento"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="slogan">Slogan</Label>
                    <Input
                      id="slogan"
                      value={formData.slogan}
                      onChange={(e) => setFormData({ ...formData, slogan: e.target.value })}
                      placeholder="Slogan do lançamento"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="descricao">Descrição</Label>
                  <Textarea
                    id="descricao"
                    value={formData.descricao}
                    onChange={(e) => setFormData({ ...formData, descricao: e.target.value })}
                    placeholder="Descrição detalhada do lançamento"
                    rows={3}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="endereco">Endereço</Label>
                    <Input
                      id="endereco"
                      value={formData.endereco}
                      onChange={(e) => setFormData({ ...formData, endereco: e.target.value })}
                      placeholder="Endereço completo"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="preco">Preço (R$)</Label>
                    <Input
                      id="preco"
                      type="number"
                      step="0.01"
                      value={formData.preco}
                      onChange={(e) => setFormData({ ...formData, preco: e.target.value })}
                      placeholder="0.00"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="statusObra">Status da Obra</Label>
                    <Select value={formData.statusObra} onValueChange={(value: any) => setFormData({ ...formData, statusObra: value })}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Lançamento">Lançamento</SelectItem>
                        <SelectItem value="Em obras">Em obras</SelectItem>
                        <SelectItem value="Pronto">Pronto</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="regiaoId">Região</Label>
                    <Select value={formData.regiaoId} onValueChange={(value) => setFormData({ ...formData, regiaoId: value })}>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione a região" />
                      </SelectTrigger>
                      <SelectContent>
                        {regioes.map((regiao) => (
                          <SelectItem key={regiao.id} value={regiao.id}>
                            {regiao.nome}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="tipologiaId">Tipologia</Label>
                    <Select value={formData.tipologiaId} onValueChange={(value) => setFormData({ ...formData, tipologiaId: value })}>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione a tipologia" />
                      </SelectTrigger>
                      <SelectContent>
                        {tipologias.map((tipologia) => (
                          <SelectItem key={tipologia.id} value={tipologia.id}>
                            {tipologia.nome}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="areasDisponiveis">Áreas Disponíveis</Label>
                  <Input
                    id="areasDisponiveis"
                    value={formData.areasDisponiveis}
                    onChange={(e) => setFormData({ ...formData, areasDisponiveis: e.target.value })}
                    placeholder="41m², 50m², 65m² (separados por vírgula)"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="imagemPrincipal">Imagem Principal (URL)</Label>
                  <Input
                    id="imagemPrincipal"
                    value={formData.imagemPrincipal}
                    onChange={(e) => setFormData({ ...formData, imagemPrincipal: e.target.value })}
                    placeholder="https://exemplo.com/imagem.jpg"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="imagens">Imagens Adicionais (URLs)</Label>
                  <Textarea
                    id="imagens"
                    value={formData.imagens}
                    onChange={(e) => setFormData({ ...formData, imagens: e.target.value })}
                    placeholder="https://exemplo.com/img1.jpg, https://exemplo.com/img2.jpg (separadas por vírgula)"
                    rows={2}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="mapUrl">URL do Mapa</Label>
                  <Input
                    id="mapUrl"
                    value={formData.mapUrl}
                    onChange={(e) => setFormData({ ...formData, mapUrl: e.target.value })}
                    placeholder="URL do Google Maps embed"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="diferenciais">Diferenciais</Label>
                  <Textarea
                    id="diferenciais"
                    value={formData.diferenciais}
                    onChange={(e) => setFormData({ ...formData, diferenciais: e.target.value })}
                    placeholder="Piscina, Academia, Salão de festas (separados por vírgula)"
                    rows={2}
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

        {/* Lista de lançamentos */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Building2 className="w-5 h-5" />
              Lançamentos Cadastrados
            </CardTitle>
            <CardDescription>
              {lancamentos.length} lançamento(s) encontrado(s)
            </CardDescription>
          </CardHeader>
          <CardContent>
            {loadingLancamentos ? (
              <div className="flex justify-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
              </div>
            ) : lancamentos.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                Nenhum lançamento cadastrado
              </div>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Nome</TableHead>
                    <TableHead>Região</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Preço</TableHead>
                    <TableHead>Criado em</TableHead>
                    <TableHead className="text-right">Ações</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {lancamentos.map((lancamento) => (
                    <TableRow key={lancamento.id}>
                      <TableCell className="font-medium">{lancamento.nome}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          <MapPin className="w-4 h-4 text-muted-foreground" />
                          {lancamento.regiao?.nome || '-'}
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant={
                          lancamento.statusObra === 'Pronto' ? 'default' : 
                          lancamento.statusObra === 'Em obras' ? 'secondary' : 'outline'
                        }>
                          {lancamento.statusObra}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        {lancamento.preco ? `R$ ${lancamento.preco.toLocaleString('pt-BR')}` : '-'}
                      </TableCell>
                      <TableCell>
                        {new Date(lancamento.createdAt).toLocaleDateString('pt-BR')}
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end space-x-2">
                          <Button variant="outline" size="sm" asChild>
                            <a href={getLandingPageUrl(lancamento)} target="_blank" rel="noopener noreferrer">
                              <ExternalLink className="w-4 h-4" />
                            </a>
                          </Button>
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
                                  Tem certeza que deseja excluir o lançamento "{lancamento.nome}"?
                                  Esta ação não pode ser desfeita.
                                </AlertDialogDescription>
                              </AlertDialogHeader>
                              <AlertDialogFooter>
                                <AlertDialogCancel>Cancelar</AlertDialogCancel>
                                <AlertDialogAction
                                  onClick={() => handleDelete(lancamento.id)}
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
