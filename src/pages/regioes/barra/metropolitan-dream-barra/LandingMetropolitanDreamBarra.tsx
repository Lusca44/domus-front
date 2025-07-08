import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  MapPin, 
  Building2, 
  Car, 
  Waves,
  Dumbbell,
  Coffee,
  TreePine,
  Users,
  Shield,
  Star,
  Camera,
  Play,
  ArrowLeft
} from 'lucide-react';
import PhotoCarousel from '@/components/PhotoCarousel';
import LeadCaptureForm from '@/components/LeadCaptureForm';
import fotos from './assets/fotos';
import videos from './assets/videos';

const LandingMetropolitanDreamBarra = () => {
  // TODO: Substituir por fotos reais
  const allPhotos = [...fotos.map(foto => ({ url: foto.url, titulo: foto.titulo }))];

  const diferenciais = [
    {
      icon: <Building2 className="w-8 h-8 text-blue-600" />,
      titulo: "5 Torres Premium",
      descricao: "Mega complexo com 808 unidades distribuídas em 5 torres modernas"
    },
    {
      icon: <Waves className="w-8 h-8 text-blue-600" />,
      titulo: "Bar da Piscina",
      descricao: "Área de lazer exclusiva com bar integrado às piscinas adulto e infantil"
    },
    {
      icon: <Dumbbell className="w-8 h-8 text-blue-600" />,
      titulo: "Campo Society",
      descricao: "Campo de futebol society profissional para momentos de diversão"
    },
    {
      icon: <Coffee className="w-8 h-8 text-blue-600" />,
      titulo: "Coworking Premium",
      descricao: "Espaço moderno e equipado para trabalho e estudos"
    },
    {
      icon: <TreePine className="w-8 h-8 text-blue-600" />,
      titulo: "Pet Care",
      descricao: "Espaço dedicado ao bem-estar e cuidado dos seus pets"
    },
    {
      icon: <Users className="w-8 h-8 text-blue-600" />,
      titulo: "Sala de Massagem",
      descricao: "Ambiente de relaxamento e bem-estar exclusivo"
    },
    {
      icon: <Shield className="w-8 h-8 text-blue-600" />,
      titulo: "Easy Market",
      descricao: "Conveniência integrada para o seu dia a dia"
    },
    {
      icon: <Star className="w-8 h-8 text-blue-600" />,
      titulo: "Rooftop Panorâmico",
      descricao: "Vista privilegiada da Barra da Tijuca no rooftop premium"
    }
  ];

  const localizacao = [
    "Via Parque Shopping - 2 km",
    "Parque Olímpico - 3 km", 
    "Farmasi Arena - 1,5 km",
    "Terminal Alvorada - 800m",
    "Barra Shopping - 4 km",
    "Cidade das Artes - 5 km",
    "Praia da Barra - 6 km",
    "Recreio Shopping - 8 km"
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Header com botão voltar */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-slate-200">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <Button
              variant="ghost"
              size="sm"
              asChild
              className="text-slate-700 hover:text-blue-600 hover:bg-blue-50"
            >
              <Link to="/" className="flex items-center gap-2">
                <ArrowLeft className="w-4 h-4" />
                Voltar para o início
              </Link>
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section 
        className="relative min-h-screen flex items-center justify-center text-white bg-cover bg-center bg-no-repeat pt-16"
        style={{
          backgroundImage: `linear-gradient(rgba(15, 23, 42, 0.8), rgba(30, 58, 138, 0.6)), url('/assets/lancamentos/metropolitan-dream-barra/background-metropolitan-dream.jpg')`
        }}
      >
        <div className="container mx-auto px-4 text-center z-10">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-white to-slate-200 bg-clip-text text-transparent">
              Metropolitan Dream Barra
            </h1>
            
            <p className="text-xl md:text-2xl mb-4 text-slate-200">
              5 torres + Lazer completo
            </p>
            
            <div className="flex items-center justify-center gap-2 mb-8">
              <MapPin className="w-5 h-5 text-blue-400" />
              <span className="text-lg text-slate-200">Barra da Tijuca, Rio de Janeiro</span>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 mb-8 border border-white/20">
              <p className="text-2xl md:text-3xl font-bold text-blue-200 mb-2">
                A partir de R$ 380.000
              </p>
              <p className="text-slate-300">Studio • 1, 2 e 3 Quartos • Garden</p>
            </div>

            <Button 
              size="lg" 
              className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-8 py-4 text-lg rounded-full shadow-2xl transform hover:scale-105 transition-all duration-300"
              onClick={() => document.getElementById('interesse')?.scrollIntoView({ behavior: 'smooth' })}
            >
              Tenho Interesse
            </Button>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white/70 rounded-full mt-2"></div>
          </div>
        </div>
      </section>

      {/* Galeria de Fotos e Vídeos */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-slate-800 mb-4">
              Conheça o Metropolitan Dream
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Um mega complexo projetado para oferecer o melhor estilo de vida na Barra da Tijuca
            </p>
          </div>

          <PhotoCarousel 
            photos={allPhotos}
            className="mb-12"
          />

          {/* TODO: Implementar player de vídeo quando os vídeos reais estiverem disponíveis */}
          <div className="grid md:grid-cols-3 gap-6 mt-12">
            {videos.map((video, index) => (
              <Card key={index} className="group hover:shadow-xl transition-all duration-300 cursor-pointer">
                <CardContent className="p-0">
                  <div className="relative">
                    <img 
                      src={video.thumbnailLocal || '/placeholder.svg'} 
                      alt={video.titulo}
                      className="w-full h-48 object-cover rounded-t-lg"
                    />
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-t-lg">
                      <Play className="w-16 h-16 text-white" />
                    </div>
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold text-slate-800">{video.titulo}</h3>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Diferenciais */}
      <section className="py-20 bg-gradient-to-br from-slate-50 to-blue-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-slate-800 mb-4">
              Lazer Completo & Premium
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Mais de 20 itens de lazer distribuídos em 5 torres modernas
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {diferenciais.map((item, index) => (
              <Card key={index} className="group hover:shadow-xl hover:-translate-y-2 transition-all duration-300 border-0 bg-white/80 backdrop-blur-sm">
                <CardContent className="p-6 text-center">
                  <div className="mb-4 flex justify-center group-hover:scale-110 transition-transform duration-300">
                    {item.icon}
                  </div>
                  <h3 className="text-xl font-bold text-slate-800 mb-2">
                    {item.titulo}
                  </h3>
                  <p className="text-slate-600">
                    {item.descricao}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Localização Premium */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-slate-800 mb-4">
              Localização Estratégica
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Entre as principais avenidas da Barra da Tijuca, próximo a tudo que você precisa
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="bg-gradient-to-br from-blue-600 to-blue-700 text-white p-8 rounded-2xl shadow-2xl">
                <h3 className="text-2xl font-bold mb-6 flex items-center">
                  <MapPin className="w-6 h-6 mr-2" />
                  Pontos de Interesse
                </h3>
                <div className="grid grid-cols-1 gap-4">
                  {localizacao.map((local, index) => (
                    <div key={index} className="flex items-center justify-between bg-white/10 backdrop-blur-sm rounded-lg p-3">
                      <span className="font-medium">{local.split(' - ')[0]}</span>
                      <span className="text-blue-200 font-bold">{local.split(' - ')[1]}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <Card className="p-6 border-l-4 border-blue-600">
                <h4 className="text-xl font-bold text-slate-800 mb-2">
                  Mobilidade Urbana
                </h4>
                <p className="text-slate-600">
                  Acesso direto às Av. das Américas, Av. Abelardo Bueno e Av. Ayrton Senna. 
                  Terminal Alvorada a apenas 800m.
                </p>
              </Card>

              <Card className="p-6 border-l-4 border-blue-600">
                <h4 className="text-xl font-bold text-slate-800 mb-2">
                  Entretenimento & Cultura
                </h4>
                <p className="text-slate-600">
                  Próximo ao Parque Olímpico, Farmasi Arena e Cidade das Artes. 
                  O melhor da cultura e entretenimento carioca.
                </p>
              </Card>

              <Card className="p-6 border-l-4 border-blue-600">
                <h4 className="text-xl font-bold text-slate-800 mb-2">
                  Shopping & Lazer
                </h4>
                <p className="text-slate-600">
                  Via Parque Shopping e Barra Shopping nas proximidades. 
                  Praia da Barra a poucos minutos.
                </p>
              </Card>
            </div>
          </div>

          {/* TODO: Implementar mapa interativo quando a API key estiver disponível */}
          <div className="mt-12 bg-slate-100 h-96 rounded-2xl flex items-center justify-center">
            <div className="text-center text-slate-500">
              <MapPin className="w-16 h-16 mx-auto mb-4" />
              <p className="text-lg font-medium">Mapa Interativo</p>
              <p className="text-sm">Localização premium na Barra da Tijuca</p>
            </div>
          </div>
        </div>
      </section>

      {/* Plantas e Especificações */}
      <section className="py-20 bg-gradient-to-br from-slate-50 to-blue-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-slate-800 mb-4">
              Opções para Todos os Perfis
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              De 28m² a 90m² - Studio, 1, 2, 3 quartos e Garden
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="group hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 bg-white border-0">
              <CardContent className="p-8">
                <div className="text-center mb-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-blue-700 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Building2 className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-slate-800">Studio</h3>
                  <p className="text-slate-600">A partir de 28m²</p>
                </div>
                <ul className="space-y-2 text-slate-600">
                  <li>• Ambiente integrado</li>
                  <li>• Cozinha americana</li>
                  <li>• Banheiro completo</li>
                  <li>• Sacada com vista</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="group hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 bg-white border-0">
              <CardContent className="p-8">
                <div className="text-center mb-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-blue-700 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Building2 className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-slate-800">1 Quarto</h3>
                  <p className="text-slate-600">A partir de 45m²</p>
                </div>
                <ul className="space-y-2 text-slate-600">
                  <li>• Sala de estar</li>
                  <li>• Quarto com closet</li>
                  <li>• Cozinha separada</li>
                  <li>• Área de serviço</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="group hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 bg-white border-0">
              <CardContent className="p-8">
                <div className="text-center mb-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-blue-700 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Building2 className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-slate-800">2 Quartos</h3>
                  <p className="text-slate-600">A partir de 65m²</p>
                </div>
                <ul className="space-y-2 text-slate-600">
                  <li>• Sala ampla</li>
                  <li>• 2 quartos com armários</li>
                  <li>• Cozinha americana</li>
                  <li>• 2 banheiros</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="group hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 bg-white border-0">
              <CardContent className="p-8">
                <div className="text-center mb-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-blue-700 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Building2 className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-slate-800">3 Quartos</h3>
                  <p className="text-slate-600">A partir de 85m²</p>
                </div>
                <ul className="space-y-2 text-slate-600">
                  <li>• Sala de estar/jantar</li>
                  <li>• 3 quartos (1 suíte)</li>
                  <li>• Cozinha equipada</li>
                  <li>• Área gourmet</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="group hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 bg-white border-0">
              <CardContent className="p-8">
                <div className="text-center mb-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-blue-700 rounded-full flex items-center justify-center mx-auto mb-4">
                    <TreePine className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-slate-800">Garden</h3>
                  <p className="text-slate-600">Até 90m² + área externa</p>
                </div>
                <ul className="space-y-2 text-slate-600">
                  <li>• Jardim privativo</li>
                  <li>• Área gourmet externa</li>
                  <li>• Acesso direto ao lazer</li>
                  <li>• Pet friendly</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="group hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 bg-gradient-to-br from-blue-600 to-blue-700 text-white border-0">
              <CardContent className="p-8">
                <div className="text-center mb-6">
                  <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center mx-auto mb-4">
                    <Star className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold">Acabamentos</h3>
                  <p className="text-blue-100">Premium inclusos</p>
                </div>
                <ul className="space-y-2 text-blue-100">
                  <li>• Piso porcelanato</li>
                  <li>• Previsão aquecedor gás</li>
                  <li>• Louças e metais</li>
                  <li>• Pintura acrílica</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Formulário de Interesse */}
      <section id="interesse" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl md:text-5xl font-bold text-slate-800 mb-6">
                Realize o Seu Dream Living
              </h2>
              
              <div className="space-y-6 mb-8">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-blue-700 rounded-full flex items-center justify-center flex-shrink-0">
                    <Building2 className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-slate-800 mb-2">
                      Mega Complexo Premium
                    </h3>
                    <p className="text-slate-600">
                      5 torres modernas com 808 unidades e mais de 20 itens de lazer
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-blue-700 rounded-full flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-slate-800 mb-2">
                      Localização Estratégica
                    </h3>
                    <p className="text-slate-600">
                      Entre as principais avenidas da Barra, próximo a shopping centers e entretenimento
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-blue-700 rounded-full flex items-center justify-center flex-shrink-0">
                    <Car className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-slate-800 mb-2">
                      Mobilidade Total
                    </h3>
                    <p className="text-slate-600">
                      813 vagas de garagem e acesso fácil ao transporte público
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-br from-slate-50 to-blue-50 p-6 rounded-2xl">
                <p className="text-lg text-slate-600 mb-4">
                  <strong className="text-slate-800">Metropolitan Dream Barra</strong> - 
                  O empreendimento que vai redefinir o conceito de viver bem na Barra da Tijuca.
                </p>
                <p className="text-slate-600">
                  Entre em contato e garante já a sua unidade neste mega lançamento!
                </p>
              </div>
            </div>

            <div>
              <LeadCaptureForm 
                nomeLancamento="Metropolitan Dream Barra"
                title="Garanta Sua Unidade"
                description="Preencha seus dados e receba informações exclusivas sobre preços e condições especiais"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Footer Premium */}
      <footer className="bg-gradient-to-br from-slate-800 to-slate-900 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold mb-4">Metropolitan Dream Barra</h3>
            <p className="text-slate-300 text-lg max-w-2xl mx-auto">
              Mais que um lar, um estilo de vida premium na Barra da Tijuca
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <div className="text-center">
              <Building2 className="w-12 h-12 text-blue-400 mx-auto mb-4" />
              <h4 className="text-xl font-bold mb-2">5 Torres</h4>
              <p className="text-slate-300">808 unidades modernas</p>
            </div>
            
            <div className="text-center">
              <Car className="w-12 h-12 text-blue-400 mx-auto mb-4" />
              <h4 className="text-xl font-bold mb-2">813 Vagas</h4>
              <p className="text-slate-300">Garagem para todos</p>
            </div>
            
            <div className="text-center">
              <Star className="w-12 h-12 text-blue-400 mx-auto mb-4" />
              <h4 className="text-xl font-bold mb-2">20+ Lazer</h4>
              <p className="text-slate-300">Itens de lazer premium</p>
            </div>
          </div>

          <div className="border-t border-slate-700 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <div className="mb-4 md:mb-0">
                <p className="text-slate-300">
                  &copy; 2024 Metropolitan Dream Barra. Incorporação CURY.
                </p>
              </div>
              <div className="flex items-center gap-4">
                <span className="text-slate-400">Realização:</span>
                <div className="bg-white/10 backdrop-blur-sm px-4 py-2 rounded-lg">
                  <span className="font-bold text-white">CURY</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingMetropolitanDreamBarra;
