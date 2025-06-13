
import React from 'react';
import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { MapPin, BedDouble, TrendingUp, Building2, Star, Waves, Car, ShoppingBag } from 'lucide-react';
import lancamentos from './cards-index';

const IndexBarra = () => {
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
              Lançamentos de apartamentos na Barra da Tijuca
            </h1>
            <p className="text-xl text-gray-600">
              Descubra seu novo lar no coração moderno do Rio de Janeiro
            </p>
          </div>
        </div>
      </header>

      {/* Seção Hero com imagem de fundo */}
      <section className="relative h-96 bg-cover bg-center"
        style={{
          backgroundImage: `url(https://images.unsplash.com/photo-1544989164-19c0c8d9d1b8?w=1200&h=800&fit=crop)`
        }}>
        <div className="absolute inset-0 bg-black bg-opacity-40"></div>
        <div className="relative container mx-auto px-4 h-full flex items-center justify-center">
          <div className="text-center text-white">
            <h2 className="text-5xl font-bold mb-4">
              Viva o Futuro na Barra
            </h2>
            <p className="text-xl mb-8">
              Apartamentos modernos na região mais desenvolvida do Rio
            </p>
            <Button size="lg" className="bg-blue-600 hover:bg-blue-700" onClick={scrollToLancamentos}>
              Ver Lançamentos
            </Button>
          </div>
        </div>
      </section>

      {/* Seção de Valorização da Região */}
      <section className="py-16 bg-gradient-to-br from-blue-50 to-cyan-100">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h3 className="text-4xl font-bold text-gray-900 mb-6">
                Por que Investir na Barra da Tijuca?
              </h3>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                A região mais moderna do Rio de Janeiro, com infraestrutura completa,
                praias paradisíacas e o maior centro comercial da América Latina.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Card 1 - Praias */}
              <div className="bg-white p-8 rounded-lg shadow-lg text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-6">
                  <Waves className="w-8 h-8 text-blue-600" />
                </div>
                <h4 className="text-2xl font-bold text-gray-900 mb-4">
                  Praias de Classe Mundial
                </h4>
                <p className="text-gray-600">
                  18km de praias deslumbrantes com águas cristalinas e areia branca,
                  perfeitas para esportes aquáticos e momentos de lazer.
                </p>
              </div>

              {/* Card 2 - Shopping */}
              <div className="bg-white p-8 rounded-lg shadow-lg text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-6">
                  <ShoppingBag className="w-8 h-8 text-green-600" />
                </div>
                <h4 className="text-2xl font-bold text-gray-900 mb-4">
                  Centro Comercial Completo
                </h4>
                <p className="text-gray-600">
                  BarraShopping, Village Mall, Downtown e centenas de restaurantes,
                  oferecendo tudo o que você precisa sem sair da região.
                </p>
              </div>

              {/* Card 3 - Mobilidade */}
              <div className="bg-white p-8 rounded-lg shadow-lg text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-purple-100 rounded-full mb-6">
                  <Car className="w-8 h-8 text-purple-600" />
                </div>
                <h4 className="text-2xl font-bold text-gray-900 mb-4">
                  Mobilidade Urbana
                </h4>
                <p className="text-gray-600">
                  BRT Transoeste, TransCarioca e principais vias expressas,
                  conectando você rapidamente a toda cidade.
                </p>
              </div>
            </div>

            {/* Estatísticas */}
            <div className="mt-16 bg-white rounded-lg shadow-lg p-8">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                <div>
                  <div className="text-3xl font-bold text-blue-600 mb-2">18km</div>
                  <div className="text-gray-600">Extensão de Praias</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-green-600 mb-2">300+</div>
                  <div className="text-gray-600">Restaurantes</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-purple-600 mb-2">15</div>
                  <div className="text-gray-600">Shopping Centers</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-orange-600 mb-2">40+</div>
                  <div className="text-gray-600">Condomínios de Luxo</div>
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
              containScroll: "trimSnaps"
            }}
            className="w-full relative"
          >
            <CarouselContent className={isPoucosLancamentos ? "justify-center" : "-ml-2 md:-ml-4"}>
              {lancamentos.map((lancamento) => (
                <CarouselItem key={lancamento.id} 
                  className={isPoucosLancamentos ? "px-4 max-w-[400px] flex-shrink-0 basis-auto" :"pl-2 md:pl-4 md:basis-1/2 lg:basis-1/3"}>
                  <Card className="overflow-hidden hover:shadow-lg transition-shadow h-full">
                    <div className="h-48 bg-cover bg-center"
                      style={{ backgroundImage: `url(${lancamento.imagem})` }}>
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
                      </div>

                      <Link to={lancamento.urlLanding} onClick={() => window.scrollTo(0, 0)}>
                        <Button className="w-full">
                          Ver Detalhes
                        </Button>
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
      <footer className="bg-gray-900 text-white py-8">
        <div className="container mx-auto px-4 text-center">
          <p>&copy; 2025 Barra da Tijuca Lançamentos. Todos os direitos reservados.</p>
          <p className="text-gray-400 mt-2">
            Barra da Tijuca - Rio de Janeiro, RJ
          </p>
        </div>
      </footer>
    </div>
  );
};

export default IndexBarra;
