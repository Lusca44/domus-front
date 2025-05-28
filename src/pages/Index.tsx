
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { MapPin, BedDouble, DollarSign, Search } from 'lucide-react';
import LeadCaptureForm from '@/components/LeadCaptureForm';

/**
 * Página Principal - Portal de Lançamentos Porto Maravilha
 * 
 * Esta página funciona como um portal agregador de todos os lançamentos
 * de apartamentos na planta da região portuária do Rio de Janeiro.
 * 
 * Funcionalidades:
 * - Exibição de todos os lançamentos disponíveis em carrossel
 * - Filtros de busca por quartos, preço e localização
 * - Formulário de captação de leads geral
 * - Links para landing pages específicas de cada projeto
 */
const Index = () => {
  // Estados para controle dos filtros de busca
  const [filtroQuartos, setFiltroQuartos] = React.useState('');
  const [filtroPreco, setFiltroPreco] = React.useState('');
  const [filtroLocalizacao, setFiltroLocalizacao] = React.useState('');

  /**
   * Dados dos lançamentos - AQUI VOCÊ PODE CONECTAR COM SUA API
   * Para integrar com backend, substitua este array por uma chamada para sua API:
   * 
   * useEffect(() => {
   *   fetch('https://seuservidor.com/api/lancamentos')
   *     .then(response => response.json())
   *     .then(data => setLancamentos(data));
   * }, []);
   */
  const lancamentos = [
    {
      id: 1,
      nome: 'Vista Baía Residencial',
      descricao: 'Apartamentos de 2 e 3 quartos com vista para a Baía de Guanabara',
      quartos: '2-3',
      precoInicial: 'A partir de R$ 850.000',
      localizacao: 'Gamboa',
      // IMAGEM: Substitua o caminho abaixo pela URL da sua imagem
      imagem: 'https://images.unsplash.com/photo-1487958449943-2429e8be8625?w=800&h=600&fit=crop',
      // URL da landing page específica deste lançamento
      urlLanding: '/lancamento/vista-baia'
    },
    {
      id: 2,
      nome: 'Porto Maravilha Tower',
      descricao: 'Edifício residencial de alto padrão no coração da zona portuária',
      quartos: '3-4',
      precoInicial: 'A partir de R$ 1.200.000',
      localizacao: 'Santo Cristo',
      // IMAGEM: Substitua o caminho abaixo pela URL da sua imagem
      imagem: 'https://images.unsplash.com/photo-1518005020951-eccb494ad742?w=800&h=600&fit=crop',
      urlLanding: '/lancamento/porto-maravilha-tower'
    },
    {
      id: 3,
      nome: 'Residencial Pier',
      descricao: 'Apartamentos compactos e modernos para jovens profissionais',
      quartos: '1-2',
      precoInicial: 'A partir de R$ 650.000',
      localizacao: 'Saúde',
      // IMAGEM: Substitua o caminho abaixo pela URL da sua imagem
      imagem: 'https://images.unsplash.com/photo-1496307653780-42ee777d4833?w=800&h=600&fit=crop',
      urlLanding: '/lancamento/residencial-pier'
    },
    {
      id: 4,
      nome: 'Marina Bay Residence',
      descricao: 'Apartamentos de luxo com vista panorâmica da marina',
      quartos: '3-4',
      precoInicial: 'A partir de R$ 1.800.000',
      localizacao: 'Gamboa',
      imagem: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&h=600&fit=crop',
      urlLanding: '/lancamento/marina-bay'
    },
    {
      id: 5,
      nome: 'Boulevard Porto',
      descricao: 'Estúdios e apartamentos de 1 quarto no centro da renovação urbana',
      quartos: '0-1',
      precoInicial: 'A partir de R$ 450.000',
      localizacao: 'Centro',
      imagem: 'https://images.unsplash.com/photo-1502005229762-cf1b2da60b8e?w=800&h=600&fit=crop',
      urlLanding: '/lancamento/boulevard-porto'
    },
    {
      id: 6,
      nome: 'Sunset Towers',
      descricao: 'Torres residenciais com amenidades completas e piscina infinita',
      quartos: '2-4',
      precoInicial: 'A partir de R$ 1.400.000',
      localizacao: 'Santo Cristo',
      imagem: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&h=600&fit=crop',
      urlLanding: '/lancamento/sunset-towers'
    }
  ];

  /**
   * Função para filtrar lançamentos baseado nos critérios selecionados
   * Esta função pode ser expandida para incluir mais filtros conforme necessário
   */
  const filtrarLancamentos = () => {
    return lancamentos.filter(lancamento => {
      const matchQuartos = !filtroQuartos || lancamento.quartos.includes(filtroQuartos);
      const matchLocalizacao = !filtroLocalizacao || lancamento.localizacao.toLowerCase().includes(filtroLocalizacao.toLowerCase());
      // Adicione mais lógica de filtro de preço conforme necessário
      return matchQuartos && matchLocalizacao;
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Principal */}
      <header className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-6">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-2">
              Porto Maravilha Lançamentos
            </h1>
            <p className="text-xl text-gray-600">
              Descubra seu novo lar na região portuária do Rio de Janeiro
            </p>
          </div>
        </div>
      </header>

      {/* Seção Hero com imagem de fundo */}
      <section className="relative h-96 bg-cover bg-center" 
               style={{
                 /* IMAGEM DE FUNDO: Substitua a URL abaixo pela imagem da região portuária */
                 backgroundImage: 'url(https://images.unsplash.com/photo-1431576901776-e539bd916ba2?w=1200&h=800&fit=crop)'
               }}>
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>
        <div className="relative container mx-auto px-4 h-full flex items-center justify-center">
          <div className="text-center text-white">
            <h2 className="text-5xl font-bold mb-4">
              Invista no Futuro do Rio
            </h2>
            <p className="text-xl mb-8">
              Apartamentos na planta na região de maior valorização da cidade
            </p>
            <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
              Ver Lançamentos
            </Button>
          </div>
        </div>
      </section>

      {/* Seção de Filtros */}
      <section className="py-8 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h3 className="text-2xl font-semibold mb-6 text-center">
              Encontre o Apartamento Ideal
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {/* Filtro por Quartos */}
              <Select value={filtroQuartos} onValueChange={setFiltroQuartos}>
                <SelectTrigger>
                  <BedDouble className="w-4 h-4 mr-2" />
                  <SelectValue placeholder="Quartos" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">1 Quarto</SelectItem>
                  <SelectItem value="2">2 Quartos</SelectItem>
                  <SelectItem value="3">3 Quartos</SelectItem>
                  <SelectItem value="4">4+ Quartos</SelectItem>
                </SelectContent>
              </Select>

              {/* Filtro por Preço */}
              <Select value={filtroPreco} onValueChange={setFiltroPreco}>
                <SelectTrigger>
                  <DollarSign className="w-4 h-4 mr-2" />
                  <SelectValue placeholder="Faixa de Preço" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="ate-700k">Até R$ 700.000</SelectItem>
                  <SelectItem value="700k-1m">R$ 700.000 - R$ 1.000.000</SelectItem>
                  <SelectItem value="1m-1.5m">R$ 1.000.000 - R$ 1.500.000</SelectItem>
                  <SelectItem value="acima-1.5m">Acima de R$ 1.500.000</SelectItem>
                </SelectContent>
              </Select>

              {/* Filtro por Localização */}
              <Input
                placeholder="Localização"
                value={filtroLocalizacao}
                onChange={(e) => setFiltroLocalizacao(e.target.value)}
                className="w-full"
              />

              {/* Botão de Busca */}
              <Button className="w-full">
                <Search className="w-4 h-4 mr-2" />
                Buscar
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Seção de Lançamentos com Carrossel */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <h3 className="text-3xl font-bold text-center mb-8">
            Nossos Lançamentos
          </h3>
          
          {/* Carrossel de Lançamentos */}
          <Carousel
            opts={{
              align: "start",
              loop: true,
            }}
            className="w-full"
          >
            <CarouselContent className="-ml-2 md:-ml-4">
              {filtrarLancamentos().map((lancamento) => (
                <CarouselItem key={lancamento.id} className="pl-2 md:pl-4 md:basis-1/2 lg:basis-1/3">
                  <Card className="overflow-hidden hover:shadow-lg transition-shadow h-full">
                    {/* IMAGEM DO CARD: As imagens abaixo podem ser substituídas */}
                    <div className="h-48 bg-cover bg-center" 
                         style={{ backgroundImage: `url(${lancamento.imagem})` }}>
                      {/* Overlay para melhor legibilidade */}
                      <div className="h-full bg-black bg-opacity-20"></div>
                    </div>
                    
                    <CardHeader>
                      <CardTitle className="text-xl">{lancamento.nome}</CardTitle>
                      <CardDescription>{lancamento.descricao}</CardDescription>
                    </CardHeader>
                    
                    <CardContent className="flex-1">
                      <div className="space-y-2 mb-4">
                        <div className="flex items-center text-sm text-gray-600">
                          <BedDouble className="w-4 h-4 mr-1" />
                          {lancamento.quartos} quartos
                        </div>
                        <div className="flex items-center text-sm text-gray-600">
                          <MapPin className="w-4 h-4 mr-1" />
                          {lancamento.localizacao}
                        </div>
                        <div className="flex items-center text-sm font-semibold text-green-600">
                          <DollarSign className="w-4 h-4 mr-1" />
                          {lancamento.precoInicial}
                        </div>
                      </div>
                      
                      {/* Link para a landing page específica do lançamento */}
                      <Link to={lancamento.urlLanding}>
                        <Button className="w-full">
                          Ver Detalhes
                        </Button>
                      </Link>
                    </CardContent>
                  </Card>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="hidden md:flex" />
            <CarouselNext className="hidden md:flex" />
          </Carousel>
          
          {/* Indicador de navegação para mobile */}
          <div className="flex justify-center mt-6 md:hidden">
            <p className="text-sm text-gray-500">
              Deslize para ver mais lançamentos
            </p>
          </div>
        </div>
      </section>

      {/* Seção de Captação de Leads Geral */}
      <section className="py-16 bg-blue-50">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            <h3 className="text-3xl font-bold mb-4">
              Receba Novidades dos Lançamentos
            </h3>
            <p className="text-gray-600 mb-8">
              Cadastre-se e seja o primeiro a saber sobre novos projetos na região portuária
            </p>
            
            {/* Componente de formulário de captação de leads */}
            <LeadCaptureForm 
              source="portal-principal"
              redirectTo="/obrigado"
            />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8">
        <div className="container mx-auto px-4 text-center">
          <p>&copy; 2024 Porto Maravilha Lançamentos. Todos os direitos reservados.</p>
          <p className="text-gray-400 mt-2">
            Região Portuária - Rio de Janeiro, RJ
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
