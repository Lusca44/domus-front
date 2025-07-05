
import React from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { MapPin, Building2, Car, Users, Waves, Eye, Star, TreePalm, Wifi, Utensils, Car as CarIcon, Gamepad2, Heart, Shirt } from 'lucide-react';
import LeadCaptureForm from '@/components/LeadCaptureForm';
import PhotoCarousel from '@/components/PhotoCarousel';
import { fotosThePier } from './assets/fotos';
import { videosThePier } from './assets/videos';

const LandingThePierResidencial = () => {
  // Preparar dados para o PhotoCarousel
  const mediaData = [
    ...fotosThePier.map(foto => ({
      type: 'image' as const,
      src: foto.url,
      alt: foto.titulo,
      title: foto.titulo
    })),
    ...videosThePier.map(video => ({
      type: 'video' as const,
      src: video.url,
      alt: video.titulo,
      title: video.titulo,
      description: video.descricao
    }))
  ];

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      {/* Hero Section com Background */}
      <section 
        className="relative min-h-screen flex items-center justify-center bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `linear-gradient(rgba(15, 23, 42, 0.7), rgba(30, 58, 138, 0.8)), url('/assets/lancamentos/the-pier-residencial/background-the-pier.jpg')`
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-slate-800/90 via-blue-900/80 to-slate-800/90"></div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="space-y-8">
            {/* Badge de Destaque */}
            <div className="flex justify-center">
              <Badge className="bg-blue-500/20 text-blue-100 border-blue-400/30 px-6 py-2 text-sm font-medium backdrop-blur-sm">
                <Eye className="w-4 h-4 mr-2" />
                Vista para a Baía de Guanabara
              </Badge>
            </div>

            {/* Título Principal */}
            <div className="space-y-4">
              <h1 className="text-5xl md:text-7xl font-bold text-white leading-tight">
                The Pier
                <span className="block text-blue-300">Residencial</span>
              </h1>
              <p className="text-xl md:text-2xl text-blue-100 max-w-3xl mx-auto leading-relaxed">
                Vista eterna para a Baía de Guanabara no coração de Niterói
              </p>
            </div>

            {/* Informações Principais */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
              <div className="text-center">
                <MapPin className="w-8 h-8 text-blue-300 mx-auto mb-2" />
                <p className="text-white font-semibold">Centro</p>
                <p className="text-blue-200 text-sm">Niterói</p>
              </div>
              <div className="text-center">
                <Building2 className="w-8 h-8 text-blue-300 mx-auto mb-2" />
                <p className="text-white font-semibold">608</p>
                <p className="text-blue-200 text-sm">Unidades</p>
              </div>
              <div className="text-center">
                <Car className="w-8 h-8 text-blue-300 mx-auto mb-2" />
                <p className="text-white font-semibold">113</p>
                <p className="text-blue-200 text-sm">Vagas</p>
              </div>
              <div className="text-center">
                <Users className="w-8 h-8 text-blue-300 mx-auto mb-2" />
                <p className="text-white font-semibold">5</p>
                <p className="text-blue-200 text-sm">Áreas Rooftop</p>
              </div>
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-8">
              <Button 
                size="lg" 
                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 text-lg font-semibold shadow-xl"
                onClick={() => scrollToSection('interesse')}
              >
                <Waves className="w-5 h-5 mr-2" />
                Tenho Interesse
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="border-white text-white hover:bg-white hover:text-slate-800 px-8 py-4 text-lg font-semibold backdrop-blur-sm"
                onClick={() => scrollToSection('galeria')}
              >
                Ver Fotos
              </Button>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white rounded-full mt-2"></div>
          </div>
        </div>
      </section>

      {/* Galeria de Fotos */}
      <section id="galeria" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-slate-800 mb-6">
              Conheça o <span className="text-blue-600">The Pier</span>
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Descubra todos os detalhes deste empreendimento único com vista privilegiada para a Baía de Guanabara
            </p>
          </div>

          <PhotoCarousel photos={mediaData} />
        </div>
      </section>

      {/* Seção de Localização */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-slate-800 mb-6">
                Localização <span className="text-blue-600">Estratégica</span>
              </h2>
              <p className="text-lg text-slate-600 mb-8 leading-relaxed">
                No coração de Niterói, com vista eterna para a Baía de Guanabara. 
                Proximidade com barcas, Terminal Rodoviário e os principais pontos culturais da cidade.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <Card className="border-l-4 border-l-blue-500">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-3 mb-3">
                      <Waves className="w-6 h-6 text-blue-600" />
                      <h4 className="font-semibold text-slate-800">Terminal das Barcas</h4>
                    </div>
                    <p className="text-slate-600 text-sm">Acesso direto ao Rio de Janeiro</p>
                  </CardContent>
                </Card>

                <Card className="border-l-4 border-l-blue-500">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-3 mb-3">
                      <Building2 className="w-6 h-6 text-blue-600" />
                      <h4 className="font-semibold text-slate-800">Centro Comercial</h4>
                    </div>
                    <p className="text-slate-600 text-sm">Plaza Shopping e comércios</p>
                  </CardContent>
                </Card>

                <Card className="border-l-4 border-l-blue-500">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-3 mb-3">
                      <Star className="w-6 h-6 text-blue-600" />
                      <h4 className="font-semibold text-slate-800">Teatro Popular</h4>
                    </div>
                    <p className="text-slate-600 text-sm">Cultura e entretenimento</p>
                  </CardContent>
                </Card>

                <Card className="border-l-4 border-l-blue-500">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-3 mb-3">
                      <CarIcon className="w-6 h-6 text-blue-600" />
                      <h4 className="font-semibold text-slate-800">Terminal Rodoviário</h4>
                    </div>
                    <p className="text-slate-600 text-sm">João Goulart - mobilidade total</p>
                  </CardContent>
                </Card>
              </div>
            </div>

            <div className="space-y-6">
              <Card className="overflow-hidden shadow-xl">
                <div className="aspect-video bg-slate-200 flex items-center justify-center">
                  {/* TODO: Substituir por mapa interativo real */}
                  <p className="text-slate-500">Mapa Interativo - Centro de Niterói</p>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Seção do Rooftop Premium */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-slate-800 mb-6">
              Rooftop <span className="text-blue-600">Premium</span>
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              5 áreas distintas com vista panorâmica para a Baía de Guanabara
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="group hover:shadow-xl transition-all duration-300">
              <CardHeader>
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                  <Users className="w-6 h-6 text-blue-600" />
                </div>
                <CardTitle className="text-xl">Praça Central</CardTitle>
                <CardDescription>Área de convivência com vista panorâmica</CardDescription>
              </CardHeader>
            </Card>

            <Card className="group hover:shadow-xl transition-all duration-300">
              <CardHeader>
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                  <Utensils className="w-6 h-6 text-blue-600" />
                </div>
                <CardTitle className="text-xl">Lounge Bar</CardTitle>
                <CardDescription>Bar exclusivo com vista para a baía</CardDescription>
              </CardHeader>
            </Card>

            <Card className="group hover:shadow-xl transition-all duration-300">
              <CardHeader>
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                  <Utensils className="w-6 h-6 text-blue-600" />
                </div>
                <CardTitle className="text-xl">Espaço Gourmet</CardTitle>
                <CardDescription>Churrasqueira e área gourmet completa</CardDescription>
              </CardHeader>
            </Card>

            <Card className="group hover:shadow-xl transition-all duration-300">
              <CardHeader>
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                  <Star className="w-6 h-6 text-blue-600" />
                </div>
                <CardTitle className="text-xl">Sky Lounge</CardTitle>
                <CardDescription>Lounge premium com vista 360°</CardDescription>
              </CardHeader>
            </Card>

            <Card className="group hover:shadow-xl transition-all duration-300">
              <CardHeader>
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                  <TreePalm className="w-6 h-6 text-blue-600" />
                </div>
                <CardTitle className="text-xl">Área Verde</CardTitle>
                <CardDescription>Jardim suspenso com vista para o mar</CardDescription>
              </CardHeader>
            </Card>

            <Card className="group hover:shadow-xl transition-all duration-300 md:col-span-2 lg:col-span-1">
              <CardHeader>
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                  <Eye className="w-6 h-6 text-blue-600" />
                </div>
                <CardTitle className="text-xl">Mirante</CardTitle>
                <CardDescription>Vista privilegiada da Baía de Guanabara</CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* Seção de Lazer */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-slate-800 mb-6">
              Lazer <span className="text-blue-600">Completo</span>
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Amenities exclusivos para toda a família
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="text-center p-6 hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Waves className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="font-semibold text-slate-800 mb-2">Piscina</h3>
              <p className="text-slate-600 text-sm">Área aquática completa</p>
            </Card>

            <Card className="text-center p-6 hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Heart className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="font-semibold text-slate-800 mb-2">Espaço Zen</h3>
              <p className="text-slate-600 text-sm">Relaxamento com sauna</p>
            </Card>

            <Card className="text-center p-6 hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Wifi className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="font-semibold text-slate-800 mb-2">Coworking</h3>
              <p className="text-slate-600 text-sm">Espaço de trabalho moderno</p>
            </Card>

            <Card className="text-center p-6 hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Gamepad2 className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="font-semibold text-slate-800 mb-2">Brinquedoteca</h3>
              <p className="text-slate-600 text-sm">Diversão para as crianças</p>
            </Card>

            <Card className="text-center p-6 hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Heart className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="font-semibold text-slate-800 mb-2">Pet Care</h3>
              <p className="text-slate-600 text-sm">Cuidado especial para pets</p>
            </Card>

            <Card className="text-center p-6 hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shirt className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="font-semibold text-slate-800 mb-2">Lavanderia</h3>
              <p className="text-slate-600 text-sm">Praticidade no dia a dia</p>
            </Card>

            <Card className="text-center p-6 hover:shadow-lg transition-shadow md:col-span-2">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Building2 className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="font-semibold text-slate-800 mb-2">5 Lojas</h3>
              <p className="text-slate-600 text-sm">Conveniência no térreo</p>
            </Card>
          </div>
        </div>
      </section>

      {/* Seção Arquitetura */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-slate-800 mb-6">
                Arquitetura <span className="text-blue-600">Exclusiva</span>
              </h2>
              <p className="text-lg text-slate-600 mb-8 leading-relaxed">
                Fachada assinada por Afonso Kuenerz Arquitetura com azulejos exclusivos de Paulo Niemeyer, 
                criando uma identidade visual única que dialoga com a paisagem da Baía de Guanabara.
              </p>

              <div className="space-y-6">
                <Card className="border-l-4 border-l-blue-500">
                  <CardContent className="p-6">
                    <h4 className="font-semibold text-slate-800 mb-2">Afonso Kuenerz Arquitetura</h4>
                    <p className="text-slate-600 text-sm">CAU A3968-3 - Fachada exclusiva com vista para a baía</p>
                  </CardContent>
                </Card>

                <Card className="border-l-4 border-l-blue-500">
                  <CardContent className="p-6">
                    <h4 className="font-semibold text-slate-800 mb-2">Azulejos Paulo Niemeyer</h4>
                    <p className="text-slate-600 text-sm">Arte exclusiva que valoriza a identidade carioca</p>
                  </CardContent>
                </Card>

                <Card className="border-l-4 border-l-blue-500">
                  <CardContent className="p-6">
                    <h4 className="font-semibold text-slate-800 mb-2">Construtora CURY</h4>
                    <p className="text-slate-600 text-sm">Qualidade e tradição em empreendimentos residenciais</p>
                  </CardContent>
                </Card>
              </div>
            </div>

            <div className="space-y-6">
              <Card className="overflow-hidden shadow-xl">
                <div className="aspect-video bg-slate-200 flex items-center justify-center">
                  {/* TODO: Substituir por imagem real da fachada */}
                  <p className="text-slate-500">Fachada com Azulejos de Niemeyer</p>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Seção de Interesse */}
      <section id="interesse" className="py-20 bg-slate-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-slate-800 mb-6">
              Tenha sua Vista <span className="text-blue-600">Eterna</span>
            </h2>
            <p className="text-xl text-slate-600">
              Preencha seus dados e nossa equipe entrará em contato para apresentar as melhores condições
            </p>
          </div>

          <div className="max-w-lg mx-auto">
            <LeadCaptureForm 
              nomeLancamento="The Pier Residencial"
              title="Garanta sua Vista para a Baía"
              description="Preencha seus dados e receba informações exclusivas"
            />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-800 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-2xl font-bold mb-4">The Pier Residencial</h3>
              <p className="text-slate-300 mb-4">
                Vista eterna para a Baía de Guanabara no coração de Niterói
              </p>
              <div className="flex items-center gap-2 text-slate-300">
                <MapPin className="w-4 h-4" />
                <span>Centro, Niterói - RJ</span>
              </div>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Características</h4>
              <ul className="space-y-2 text-slate-300">
                <li>• 608 unidades</li>
                <li>• 5 lojas</li>
                <li>• 113 vagas</li>
                <li>• Rooftop com 5 áreas</li>
                <li>• Azulejos exclusivos</li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Construtora</h4>
              <div className="text-slate-300">
                <p className="mb-2">CURY Construtora</p>
                <p className="text-sm">Qualidade e tradição</p>
                {/* TODO: Adicionar selos de certificação CURY */}
              </div>
            </div>
          </div>
          
          <Separator className="my-8 bg-slate-700" />
          
          <div className="text-center text-slate-400">
            <p>&copy; 2024 The Pier Residencial. Todos os direitos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingThePierResidencial;
