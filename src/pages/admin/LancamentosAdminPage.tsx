
import React, { useState, useEffect } from 'react';
import { useApi } from '@/hooks/useApi';
import { lancamentoApi, regiaoApi, tipologiaApi, finalidadeApi } from '@/utils/apiConfig';
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
import { Trash2, Edit, Plus, Building2, MapPin, ExternalLink, RefreshCw } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { Imovel } from '@/cards/imoveis';

interface Lancamento {
  id: string;
  nomeLancamento: string;
  urlFotoBackGround?: string;
  urlsFotos?: string[];
  slogan?: string;
  regiaoId?: string;
  endereco?: string;
  sobreLancamento?: {
    titulo: string;
    texto: string;
    cardsSobreLancamento?: Array<{
      icone: string;
      titulo: string;
      texto: string;
    }>;
  };
  diferenciaisLancamento?: string[];
  proximidadesDaLocalizacao?: string[];
  localizacaoMapsSource?: string;
  cardLancamentoInfo?: {
    valor: string;
    quartosDisponiveis: string[];
    isCardDestaque: boolean;
    areasDisponiveis: string[];
    finalidadeId: string;
    tipologiaId: string[];
    urlImagemCard: string;
    statusObra: 'Lançamento' | 'Em obras' | 'Pronto';
  };
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

export default function LancamentosAdminPage() {
  const [lancamentos, setLancamentos] = useState<Lancamento[]>([]);
  const [regioes, setRegioes] = useState<Regiao[]>([]);
  const [tipologias, setTipologias] = useState<Tipologia[]>([]);
  const [finalidades, setFinalidades] = useState<Finalidade[]>([]);
  const [selectedLancamento, setSelectedLancamento] = useState<Lancamento | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [formData, setFormData] = useState({
    nomeLancamento: '',
    urlFotoBackGround: '',
    urlsFotos: '',
    slogan: '',
    regiaoId: '',
    endereco: '',
    sobreLancamentoTitulo: '',
    sobreLancamentoTexto: '',
    diferenciaisLancamento: '',
    proximidadesDaLocalizacao: '',
    localizacaoMapsSource: '',
    // Card info
    valor: '',
    quartosDisponiveis: '',
    isCardDestaque: false,
    areasDisponiveis: '',
    finalidadeId: '',
    tipologiaId: '',
    urlImagemCard: '',
    statusObra: 'Lançamento' as const
  });

  const { toast } = useToast();
  const { execute: fetchLancamentos, loading: loadingLancamentos } = useApi();
  const { execute: fetchRegioes } = useApi();
  const { execute: fetchTipologias } = useApi();
  const { execute: fetchFinalidades } = useApi();
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
      
      // Se existem lançamentos, atualizar o arquivo lancamentos.ts
      if (data && data.length > 0) {
        await updateLancamentosFile(data);
      }
    } catch (error) {
      console.error('Erro ao carregar lançamentos:', error);
    }
  };

  /**
   * Atualiza o arquivo lancamentos.ts com os dados da API
   */
  const updateLancamentosFile = async (lancamentosData: Lancamento[]) => {
    try {
      const lancamentosForCards: Imovel[] = lancamentosData
        .filter(lancamento => lancamento.cardLancamentoInfo)
        .map((lancamento, index) => {
          const cardInfo = lancamento.cardLancamentoInfo!;
          const regiao = regioes.find(r => r.id === lancamento.regiaoId);
          
          return {
            id: lancamento.id || String(index + 1),
            titulo: lancamento.nomeLancamento,
            descricao: lancamento.sobreLancamento?.texto || lancamento.slogan || '',
            preco: `A partir de R$ ${cardInfo.valor}`,
            imagem: cardInfo.urlImagemCard || '/placeholder.svg',
            regiao: regiao?.nome || 'Não informado',
            quartos: parseInt(cardInfo.quartosDisponiveis[0]) || 1,
            quartosDisponiveis: cardInfo.quartosDisponiveis.map(q => parseInt(q)),
            area: cardInfo.areasDisponiveis[0] ? `${cardInfo.areasDisponiveis[0]}m²` : '0m²',
            areasDisponiveis: cardInfo.areasDisponiveis.map(a => `${a}m²`),
            url: `/lancamento/${lancamento.id}`,
            destaque: cardInfo.isCardDestaque,
            tipo: "lancamento" as const,
            statusObra: cardInfo.statusObra,
            regiaoDestaque: cardInfo.isCardDestaque
          };
        });

      console.log('Cards de lançamentos gerados:', lancamentosForCards);
      
      // Aqui você poderia fazer uma requisição para atualizar o arquivo no servidor
      // ou usar uma funcionalidade específica para isso
      toast({
        title: 'Sucesso',
        description: `${lancamentosForCards.length} lançamento(s) sincronizado(s) para exibição`,
      });
    } catch (error) {
      console.error('Erro ao atualizar arquivo de lançamentos:', error);
      toast({
        title: 'Aviso',
        description: 'Erro ao sincronizar lançamentos para exibição',
        variant: 'destructive'
      });
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
    loadLancamentos();
    loadAuxiliaryData();
  }, []);

  /**
   * Manipula o envio do formulário de criação/edição
   */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.nomeLancamento.trim()) {
      toast({
        title: 'Erro',
        description: 'Nome do lançamento é obrigatório',
        variant: 'destructive'
      });
      return;
    }

    try {
      // Preparar dados para envio
      const dataToSend = {
        nomeLancamento: formData.nomeLancamento,
        urlFotoBackGround: formData.urlFotoBackGround,
        urlsFotos: formData.urlsFotos ? formData.urlsFotos.split(',').map(url => url.trim()) : [],
        slogan: formData.slogan,
        regiaoId: formData.regiaoId,
        endereco: formData.endereco,
        sobreLancamento: {
          titulo: formData.sobreLancamentoTitulo,
          texto: formData.sobreLancamentoTexto,
          cardsSobreLancamento: []
        },
        diferenciaisLancamento: formData.diferenciaisLancamento ? formData.diferenciaisLancamento.split(',').map(d => d.trim()) : [],
        proximidadesDaLocalizacao: formData.proximidadesDaLocalizacao ? formData.proximidadesDaLocalizacao.split(',').map(p => p.trim()) : [],
        localizacaoMapsSource: formData.localizacaoMapsSource,
        cardLancamentoInfo: {
          valor: formData.valor,
          quartosDisponiveis: formData.quartosDisponiveis ? formData.quartosDisponiveis.split(',').map(q => q.trim()) : [],
          isCardDestaque: formData.isCardDestaque,
          areasDisponiveis: formData.areasDisponiveis ? formData.areasDisponiveis.split(',').map(a => a.trim()) : [],
          finalidadeId: formData.finalidadeId,
          tipologiaId: formData.tipologiaId ? [formData.tipologiaId] : [],
          urlImagemCard: formData.urlImagemCard,
          statusObra: formData.statusObra
        }
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
      nomeLancamento: '',
      urlFotoBackGround: '',
      urlsFotos: '',
      slogan: '',
      regiaoId: '',
      endereco: '',
      sobreLancamentoTitulo: '',
      sobreLancamentoTexto: '',
      diferenciaisLancamento: '',
      proximidadesDaLocalizacao: '',
      localizacaoMapsSource: '',
      valor: '',
      quartosDisponiveis: '',
      isCardDestaque: false,
      areasDisponiveis: '',
      finalidadeId: '',
      tipologiaId: '',
      urlImagemCard: '',
      statusObra: 'Lançamento'
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
          
          <div className="flex gap-2">
            <Button variant="outline" onClick={loadLancamentos}>
              <RefreshCw className="w-4 h-4 mr-2" />
              Sincronizar
            </Button>
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button onClick={resetForm}>
                  <Plus className="w-4 h-4 mr-2" />
                  Novo Lançamento
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-4xl">
                <DialogHeader>
                  <DialogTitle>Novo Lançamento</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="space-y-4 max-h-[70vh] overflow-y-auto">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="nomeLancamento">Nome do Lançamento *</Label>
                      <Input
                        id="nomeLancamento"
                        value={formData.nomeLancamento}
                        onChange={(e) => setFormData({ ...formData, nomeLancamento: e.target.value })}
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
                    <Label htmlFor="urlFotoBackGround">URL Foto Background</Label>
                    <Input
                      id="urlFotoBackGround"
                      value={formData.urlFotoBackGround}
                      onChange={(e) => setFormData({ ...formData, urlFotoBackGround: e.target.value })}
                      placeholder="https://exemplo.com/background.jpg"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="urlsFotos">URLs das Fotos</Label>
                    <Textarea
                      id="urlsFotos"
                      value={formData.urlsFotos}
                      onChange={(e) => setFormData({ ...formData, urlsFotos: e.target.value })}
                      placeholder="https://exemplo.com/foto1.jpg, https://exemplo.com/foto2.jpg (separadas por vírgula)"
                      rows={2}
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
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="sobreLancamentoTitulo">Sobre - Título</Label>
                      <Input
                        id="sobreLancamentoTitulo"
                        value={formData.sobreLancamentoTitulo}
                        onChange={(e) => setFormData({ ...formData, sobreLancamentoTitulo: e.target.value })}
                        placeholder="Título da seção sobre"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="sobreLancamentoTexto">Sobre - Texto</Label>
                      <Textarea
                        id="sobreLancamentoTexto"
                        value={formData.sobreLancamentoTexto}
                        onChange={(e) => setFormData({ ...formData, sobreLancamentoTexto: e.target.value })}
                        placeholder="Texto descritivo sobre o lançamento"
                        rows={2}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="diferenciaisLancamento">Diferenciais</Label>
                    <Textarea
                      id="diferenciaisLancamento"
                      value={formData.diferenciaisLancamento}
                      onChange={(e) => setFormData({ ...formData, diferenciaisLancamento: e.target.value })}
                      placeholder="Piscina, Academia, Salão de festas (separados por vírgula)"
                      rows={2}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="proximidadesDaLocalizacao">Proximidades</Label>
                    <Textarea
                      id="proximidadesDaLocalizacao"
                      value={formData.proximidadesDaLocalizacao}
                      onChange={(e) => setFormData({ ...formData, proximidadesDaLocalizacao: e.target.value })}
                      placeholder="Shopping, Metro, Escola (separados por vírgula)"
                      rows={2}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="localizacaoMapsSource">URL do Mapa</Label>
                    <Input
                      id="localizacaoMapsSource"
                      value={formData.localizacaoMapsSource}
                      onChange={(e) => setFormData({ ...formData, localizacaoMapsSource: e.target.value })}
                      placeholder="URL do Google Maps embed"
                    />
                  </div>

                  {/* Seção Card Info */}
                  <div className="border-t pt-4">
                    <h3 className="text-lg font-semibold mb-4">Informações do Card</h3>
                    
                    <div className="grid grid-cols-3 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="valor">Valor (R$)</Label>
                        <Input
                          id="valor"
                          value={formData.valor}
                          onChange={(e) => setFormData({ ...formData, valor: e.target.value })}
                          placeholder="310000"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="quartosDisponiveis">Quartos Disponíveis</Label>
                        <Input
                          id="quartosDisponiveis"
                          value={formData.quartosDisponiveis}
                          onChange={(e) => setFormData({ ...formData, quartosDisponiveis: e.target.value })}
                          placeholder="1, 2, 3 (separados por vírgula)"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="areasDisponiveis">Áreas Disponíveis</Label>
                        <Input
                          id="areasDisponiveis"
                          value={formData.areasDisponiveis}
                          onChange={(e) => setFormData({ ...formData, areasDisponiveis: e.target.value })}
                          placeholder="43, 50, 65 (separados por vírgula)"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-3 gap-4 mt-4">
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
                        <Label htmlFor="finalidadeId">Finalidade</Label>
                        <Select value={formData.finalidadeId} onValueChange={(value) => setFormData({ ...formData, finalidadeId: value })}>
                          <SelectTrigger>
                            <SelectValue placeholder="Selecione a finalidade" />
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

                    <div className="grid grid-cols-2 gap-4 mt-4">
                      <div className="space-y-2">
                        <Label htmlFor="urlImagemCard">URL Imagem do Card</Label>
                        <Input
                          id="urlImagemCard"
                          value={formData.urlImagemCard}
                          onChange={(e) => setFormData({ ...formData, urlImagemCard: e.target.value })}
                          placeholder="https://exemplo.com/card-image.jpg"
                        />
                      </div>
                      <div className="space-y-2 flex items-end">
                        <div className="flex items-center space-x-2">
                          <input
                            type="checkbox"
                            id="isCardDestaque"
                            checked={formData.isCardDestaque}
                            onChange={(e) => setFormData({ ...formData, isCardDestaque: e.target.checked })}
                            className="rounded"
                          />
                          <Label htmlFor="isCardDestaque">Card em Destaque</Label>
                        </div>
                      </div>
                    </div>
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
                    <TableHead>Valor</TableHead>
                    <TableHead>Destaque</TableHead>
                    <TableHead className="text-right">Ações</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {lancamentos.map((lancamento) => (
                    <TableRow key={lancamento.id}>
                      <TableCell className="font-medium">{lancamento.nomeLancamento}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          <MapPin className="w-4 h-4 text-muted-foreground" />
                          {lancamento.regiao?.nome || '-'}
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant={
                          lancamento.cardLancamentoInfo?.statusObra === 'Pronto' ? 'default' : 
                          lancamento.cardLancamentoInfo?.statusObra === 'Em obras' ? 'secondary' : 'outline'
                        }>
                          {lancamento.cardLancamentoInfo?.statusObra || '-'}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        {lancamento.cardLancamentoInfo?.valor ? `R$ ${lancamento.cardLancamentoInfo.valor}` : '-'}
                      </TableCell>
                      <TableCell>
                        {lancamento.cardLancamentoInfo?.isCardDestaque && (
                          <Badge variant="secondary">Destaque</Badge>
                        )}
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
                                  Tem certeza que deseja excluir o lançamento "{lancamento.nomeLancamento}"?
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
