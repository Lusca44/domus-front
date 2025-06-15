import React from 'react';
import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { MapPin, BedDouble, DollarSign, TrendingUp, Building2, Star } from 'lucide-react';
import ImagemPortoBackGround from '@/assets/images/imagem-regiao-portuaria-MAM-praca-flutuante.jpg'
import lancamentos from './cards-index';
import Footer from "@/components/Footer";

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
const IndexPorto = () => {

  const lancamentosRef = useRef(null);

  const scrollToLancamentos = () => {
    lancamentosRef.current?.scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    });
  };



  const isPoucosLancamentos = lancamentos.length <= 3;
  const isAtivarCarrocel = lancamentos.length > 3;


  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Principal */}
      <header className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-6">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-2">
              Lançamentos de apartamentos no Porto Maravilha
            </h1>
            <p className="text-xl text-gray-600">
              Descubra seu novo lar na região portuária do Rio de Janeiro
            </p>
          </div>
        </div>
      </header>

      {/* Seção Hero com imagem de fundo */}
      <section
        className="relative h-96 bg-cover bg-center"
        style={{
          /* IMAGEM DE FUNDO: Substitua a URL abaixo pela imagem da região portuária */
          backgroundImage: `url(${ImagemPortoBackGround})`,
        }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-30"></div>
        <div className="relative container mx-auto px-4 h-full flex items-center justify-center">
          <div className="text-center text-white">
            <h2 className="text-5xl font-bold mb-4">
              {/* Invista no Futuro do Rio */}
              Venha fazer parte do Futuro do Rio
            </h2>
            <p className="text-xl mb-8">
              Apartamentos na planta na região de maior valorização da cidade
            </p>
            <Button
              size="lg"
              className="bg-blue-600 hover:bg-blue-700"
              onClick={scrollToLancamentos}
            >
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
                O maior projeto de revitalização urbana da América Latina está
                transformando a região portuária em um novo centro de negócios,
                cultura e moradia no Rio de Janeiro.
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
                  impulsionados pelos investimentos em infraestrutura e
                  mobilidade urbana.
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
                  empreendimentos comerciais fazem da região o novo centro do
                  Rio.
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
                  Conectado ao Centro, Zona Sul e Norte por diversas opções de
                  transporte, com vista única da Baía de Guanabara e proximidade
                  aos principais pontos turísticos.
                </p>
              </div>
            </div>

            {/* Estatísticas */}
            <div className="mt-16 bg-white rounded-lg shadow-lg p-8">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                <div>
                  <div className="text-3xl font-bold text-blue-600 mb-2">
                    R$ 8 Bi
                  </div>
                  <div className="text-gray-600">Investimento Total</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-green-600 mb-2">
                    5 Mi m²
                  </div>
                  <div className="text-gray-600">Área Revitalizada</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-purple-600 mb-2">
                    70+
                  </div>
                  <div className="text-gray-600">Novos Projetos</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-orange-600 mb-2">
                    25 Anos
                  </div>
                  <div className="text-gray-600">Prazo do Projeto</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Seção de Lançamentos com Carrossel */}
      <section className="py-12" ref={lancamentosRef}>
        <div className="container mx-auto px-4">
          <h3 className="text-3xl font-bold text-center mb-8">
            Nossos Lançamentos
          </h3>

          {/* Carrossel de Lançamentos */}
          <Carousel
            opts={{
              align: isPoucosLancamentos ? "center" : "start",
              loop: isAtivarCarrocel,
              containScroll: "trimSnaps",
            }}
            className="w-full relative"
          >
            <CarouselContent
              className={
                isPoucosLancamentos ? "justify-center" : "-ml-2 md:-ml-4"
              }
            >
              {lancamentos.map((lancamento) => (
                <CarouselItem
                  key={lancamento.id}
                  className={
                    isPoucosLancamentos
                      ? "px-4 max-w-[400px] flex-shrink-0 basis-auto"
                      : "pl-2 md:pl-4 md:basis-1/2 lg:basis-1/3"
                  }
                >
                  <Card className="overflow-hidden hover:shadow-lg transition-shadow h-full">
                    {/* IMAGEM DO CARD: As imagens abaixo podem ser substituídas */}
                    <div
                      className="h-48 bg-cover bg-center"
                      style={{ backgroundImage: `url(${lancamento.imagem})` }}
                    >
                      {/* Overlay para melhor legibilidade */}
                      <div className="h-full bg-black bg-opacity-20"></div>
                    </div>

                    <CardHeader>
                      <CardTitle className="text-xl">
                        {lancamento.nome}
                      </CardTitle>
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
                      </div>

                      {/* Link para a landing page específica do lançamento */}
                      <Link
                        to={lancamento.urlLanding}
                        onClick={() => window.scrollTo(0, 0)}
                      >
                        <Button className="w-full">Ver Detalhes</Button>
                      </Link>
                    </CardContent>
                  </Card>
                </CarouselItem>
              ))}
            </CarouselContent>
            {isAtivarCarrocel && (
              <>
                <CarouselPrevious className="hidden md:flex" />
                <CarouselNext className="hidden md:flex" />
              </>
            )}
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
      <Footer />
    </div>
  );
};

export default IndexPorto;
