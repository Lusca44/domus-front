
import React, { useState, useEffect } from 'react';
import { useApi } from '@/hooks/useApi';
import { imovelApi, regiaoApi, tipologiaApi, finalidadeApi } from '@/utils/apiConfig';
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Trash2, Edit, Plus, Home, MapPin, ExternalLink } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';

interface Imovel {
  id: string;
  nome: string;
  descricao?: string;
  endereco?: string;
  preco?: number;
  area?: string;
  quartos?: number;
  banheiros?: number;
  vagas?: number;
  imagemPrincipal?: string;
  imagens?: string[];
  mapUrl?: string;
  diferenciais?: string[];
  finalidadeId?: string;
  regiaoId?: string;
  tipologiaId?: string;
  finalidade?: any;
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

interface Finalidade {
  id: string;
  nome: string;
}

/**
 * Página de Gestão de Imóveis (Admin)
 * 
 * Esta página permite gerenciar os imóveis (aluguel e usados) que serão utilizados
 * para gerar Landing Pages dinâmicas.
 */
export default function ImoveisAdminPage() {
  const [imoveis, setImoveis] = useState<Imovel[]>([]);
  const [regioes, setRegioes] = useState<Regiao[]>([]);
  const [tipologias, setTipologias] = useState<Tipologia[]>([]);
  const [finalidades, setFinalidades] = useState<Finalidade[]>([]);
  const [selectedImovel, setSelectedImovel] = useState<Imovel | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('todos');
  const [formData, setFormData] = useState({
    nome: '',
    descricao: '',
    endereco: '',
    preco: '',
    area: '',
    quartos: '',
    banheiros: '',
    vagas: '',
    imagemPrincipal: '',
    imagens: '',
    mapUrl: '',
    diferenciais: '',
    finalidadeId: '',
    regiaoId: '',
    tipologiaId: ''
  });

  const { toast } = useToast();
  const { execute: fetchImoveis, loading: loadingImoveis } = useApi();
  const { execute: fetchRegioes } = useApi();
  const { execute: fetchTipologias } = useApi();
  const { execute: fetchFinalidades } = useApi();
  const { execute: createImovel, loading: loadingCreate } = useApi({
    showSuccessToast: true,
    successMessage: 'Imóvel criado com sucesso!'
  });
  const { execute: deleteImovel, loading: loadingDelete } = useApi({
    showSuccessToast: true,
    successMessage: 'Imóvel excluído com sucesso!'
  });

  /**
   * Carrega todos os imóveis do backend
   */
  const loadImoveis = async () => {
    try {
      const data = await fetchImoveis(() => imovelApi.obterTodosImoveis());
      setImoveis(data || []);
    } catch (error) {
      console.error('Erro ao carregar imóveis:', error);
    }
  };

  /**
   * Carrega dados auxiliares (regiões, tipologias e finalidades)
   */
  const loadAuxiliaryData = async () => {
    try {
      const [regioesData, tipologiasData, finalidadesData] = await Promise.all([
        fetchRegioes(() => regiaoApi.obterTodasRegioes()),
        fetchTipologias(() => tipologiaApi.obterTodasTipologias()),
        fetchFinalidades(() => finalidadeApi.obterTodasFinalidades())
      ]);
      setRegioes(regioesData || []);
      setTipologias(tipologiasData || []);
      setFinalidades(finalidadesData || []);
    } catch (error) {
      console.error('Erro ao carregar dados auxiliares:', error);
    }
  };

  /**
   * Inicializa os dados da página
   */
  useEffect(() => {
    loadImoveis();
    loadAuxiliaryData();
  }, []);

  /**
   * Filtra imóveis por finalidade
   */
  const filteredImoveis = imoveis.filter(imovel => {
    if (activeTab === 'todos') return true;
    if (activeTab === 'aluguel') return imovel.finalidade?.nome?.toLowerCase() === 'aluguel';
    if (activeTab === 'venda') return imovel.finalidade?.nome?.toLowerCase() === 'venda';
    return true;
  });

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
        quartos: formData.quartos ? parseInt(formData.quartos) : undefined,
        banheiros: formData.banheiros ? parseInt(formData.banheiros) : undefined,
        vagas: formData.vagas ? parseInt(formData.vagas) : undefined,
        imagens: formData.imagens ? formData.imagens.split(',').map(img => img.trim()) : [],
        diferenciais: formData.diferenciais ? formData.diferenciais.split(',').map(d => d.trim()) : [],
      };

      await createImovel(() => imovelApi.create(dataToSend));
      resetForm();
      setIsDialogOpen(false);
      loadImoveis();
    } catch (error) {
      console.error('Erro ao criar imóvel:', error);
    }
  };

  /**
   * Manipula a exclusão de um imóvel
   */
  const handleDelete = async (id: string) => {
    try {
      await deleteImovel(() => imovelApi.delete?.(id));
      loadImoveis();
    } catch (error) {
      console.error('Erro ao excluir imóvel:', error);
    }
  };

  /**
   * Reseta o formulário
   */
  const resetForm = () => {
    setFormData({
      nome: '',
      descricao: '',
      endereco: '',
      preco: '',
      area: '',
      quartos: '',
      banheiros: '',
      vagas: '',
      imagemPrincipal: '',
      imagens: '',
      mapUrl: '',
      diferenciais: '',
      finalidadeId: '',
      regiaoId: '',
      tipologiaId: ''
    });
    setSelectedImovel(null);
  };

  /**
   * Gera URL da landing page para o imóvel
   */
  const getLandingPageUrl = (imovel: Imovel) => {
    return `/imovel/${imovel.id}`;
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Cabeçalho da página */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Imóveis</h1>
            <p className="text-muted-foreground">
              Gerencie os imóveis e suas landing pages
            </p>
          </div>
          
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button onClick={resetForm}>
                <Plus className="w-4 h-4 mr-2" />
                Novo Imóvel
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Novo Imóvel</DialogTitle>
              </DialogHeader>
              <form onSubmit={handleSubmit} className="space-y-4 max-h-[70vh] overflow-y-auto">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="nome">Nome *</Label>
                    <Input
                      id="nome"
                      value={formData.nome}
                      onChange={(e) => setFormData({ ...formData, nome: e.target.value })}
                      placeholder="Nome do imóvel"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="area">Área</Label>
                    <Input
                      id="area"
                      value={formData.area}
                      onChange={(e) => setFormData({ ...formData, area: e.target.value })}
                      placeholder="Ex: 80m²"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="descricao">Descrição</Label>
                  <Textarea
                    id="descricao"
                    value={formData.descricao}
                    onChange={(e) => setFormData({ ...formData, descricao: e.target.value })}
                    placeholder="Descrição detalhada do imóvel"
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

                <div className="grid grid-cols-4 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="quartos">Quartos</Label>
                    <Input
                      id="quartos"
                      type="number"
                      value={formData.quartos}
                      onChange={(e) => setFormData({ ...formData, quartos: e.target.value })}
                      placeholder="0"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="banheiros">Banheiros</Label>
                    <Input
                      id="banheiros"
                      type="number"
                      value={formData.banheiros}
                      onChange={(e) => setFormData({ ...formData, banheiros: e.target.value })}
                      placeholder="0"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="vagas">Vagas</Label>
                    <Input
                      id="vagas"
                      type="number"
                      value={formData.vagas}
                      onChange={(e) => setFormData({ ...formData, vagas: e.target.value })}
                      placeholder="0"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="finalidadeId">Finalidade</Label>
                    <Select value={formData.finalidadeId} onValueChange={(value) => setFormData({ ...formData, finalidadeId: value })}>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione" />
                      </SelectTrigger>
                      <SelectContent>
                        {finalidades.map((finalidade) => (
                          <SelectItem key={finalidade.id} value={finalidade.id}>
                            {finalidade.nome}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
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

        {/* Abas para filtrar por finalidade */}
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList>
            <TabsTrigger value="todos">Todos</TabsTrigger>
            <TabsTrigger value="aluguel">Aluguel</TabsTrigger>
            <TabsTrigger value="venda">Venda</TabsTrigger>
          </TabsList>

          <TabsContent value={activeTab} className="space-y-4">
            {/* Lista de imóveis */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Home className="w-5 h-5" />
                  Imóveis Cadastrados
                </CardTitle>
                <CardDescription>
                  {filteredImoveis.length} imóvel(s) encontrado(s)
                </CardDescription>
              </CardHeader>
              <CardContent>
                {loadingImoveis ? (
                  <div className="flex justify-center py-8">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
                  </div>
                ) : filteredImoveis.length === 0 ? (
                  <div className="text-center py-8 text-muted-foreground">
                    Nenhum imóvel cadastrado
                  </div>
                ) : (
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Nome</TableHead>
                        <TableHead>Região</TableHead>
                        <TableHead>Finalidade</TableHead>
                        <TableHead>Preço</TableHead>
                        <TableHead>Área</TableHead>
                        <TableHead>Criado em</TableHead>
                        <TableHead className="text-right">Ações</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredImoveis.map((imovel) => (
                        <TableRow key={imovel.id}>
                          <TableCell className="font-medium">{imovel.nome}</TableCell>
                          <TableCell>
                            <div className="flex items-center gap-1">
                              <MapPin className="w-4 h-4 text-muted-foreground" />
                              {imovel.regiao?.nome || '-'}
                            </div>
                          </TableCell>
                          <TableCell>
                            <Badge variant="outline">
                              {imovel.finalidade?.nome || '-'}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            {imovel.preco ? `R$ ${imovel.preco.toLocaleString('pt-BR')}` : '-'}
                          </TableCell>
                          <TableCell>{imovel.area || '-'}</TableCell>
                          <TableCell>
                            {new Date(imovel.createdAt).toLocaleDateString('pt-BR')}
                          </TableCell>
                          <TableCell className="text-right">
                            <div className="flex justify-end space-x-2">
                              <Button variant="outline" size="sm" asChild>
                                <a href={getLandingPageUrl(imovel)} target="_blank" rel="noopener noreferrer">
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
                                      Tem certeza que deseja excluir o imóvel "{imovel.nome}"?
                                      Esta ação não pode ser desfeita.
                                    </AlertDialogDescription>
                                  </AlertDialogHeader>
                                  <AlertDialogFooter>
                                    <AlertDialogCancel>Cancelar</AlertDialogCancel>
                                    <AlertDialogAction
                                      onClick={() => handleDelete(imovel.id)}
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
          </TabsContent>
        </Tabs>
      </div>
    </AdminLayout>
  );
}
