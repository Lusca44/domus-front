import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { MapPin, BedDouble, DollarSign, TrendingUp, Building2, Star } from 'lucide-react';
import LeadCaptureForm from '@/components/LeadCaptureForm';

/**
 * Página Principal - Portal de Lançamentos Porto Maravilha
 * 
 * Esta página funciona como um portal agregador de todos os lançamentos
 * de apartamentos na planta da região portuária do Rio de Janeiro.
 * 
 * Funcionalidades:
 * - Exibição de todos os lançamentos disponíveis em carrossel
 * - Mensagem inspiradora sobre a valorização da região
 * - Formulário de captação de leads geral
 * - Links para landing pages específicas de cada projeto
 */
const Index = () => {
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

      {/* Seção de Valorização da Região */}
      <section className="py-16 bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h3 className="text-4xl font-bold text-gray-900 mb-6">
                Por que Investir no Porto Maravilha?
              </h3>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                O maior projeto de revitalização urbana da América Latina está transformando 
                a região portuária em um novo centro de negócios, cultura e moradia no Rio de Janeiro.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Card 1 - Valorização */}
              <div className="bg-white p-8 rounded-lg shadow-lg text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-6">
                  <TrendingUp className="w-8 h-8 text-green-600" />
                </div>
                <h4 className="text-2xl font-bold text-gray-900 mb-4">
                  Valorização Acelerada
                </h4>
                <p className="text-gray-600">
                  Imóveis na região já apresentam valorização de até 35% ao ano, 
                  impulsionados pelos investimentos em infraestrutura e mobilidade urbana.
                </p>
              </div>

              {/* Card 2 - Infraestrutura */}
              <div className="bg-white p-8 rounded-lg shadow-lg text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-6">
                  <Building2 className="w-8 h-8 text-blue-600" />
                </div>
                <h4 className="text-2xl font-bold text-gray-900 mb-4">
                  Infraestrutura Moderna
                </h4>
                <p className="text-gray-600">
                  VLT, Museu do Amanhã, Boulevard Olímpico e dezenas de novos 
                  empreendimentos comerciais fazem da região o novo centro do Rio.
                </p>
              </div>

              {/* Card 3 - Localização */}
              <div className="bg-white p-8 rounded-lg shadow-lg text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-purple-100 rounded-full mb-6">
                  <Star className="w-8 h-8 text-purple-600" />
                </div>
                <h4 className="text-2xl font-bold text-gray-900 mb-4">
                  Localização Privilegiada
                </h4>
                <p className="text-gray-600">
                  Conectado ao Centro, Zona Sul e Norte por diversas opções de transporte, 
                  com vista única da Baía de Guanabara e proximidade aos principais pontos turísticos.
                </p>
              </div>
            </div>

            {/* Estatísticas */}
            <div className="mt-16 bg-white rounded-lg shadow-lg p-8">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                <div>
                  <div className="text-3xl font-bold text-blue-600 mb-2">R$ 8 Bi</div>
                  <div className="text-gray-600">Investimento Total</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-green-600 mb-2">5 Mi m²</div>
                  <div className="text-gray-600">Área Revitalizada</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-purple-600 mb-2">70+</div>
                  <div className="text-gray-600">Novos Projetos</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-orange-600 mb-2">25 Anos</div>
                  <div className="text-gray-600">Prazo do Projeto</div>
                </div>
              </div>
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
              {lancamentos.map((lancamento) => (
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
