
import React from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  MapPin,
  Home,
  Car,
  Waves,
  Trees,
  Dumbbell,
  Wifi,
  Car as CarIcon,
  Phone,
  Mail,
  Star,
  Building,
  Bed,
  Bath,
  Maximize,
  Users,
  Camera,
  Play,
} from "lucide-react";
import PhotoCarousel from "@/components/PhotoCarousel";
import LeadCaptureForm from "@/components/LeadCaptureForm";
import Footer from "@/components/Footer";
import { fotosCarrossel, fotosAmericas19 } from "./assets/fotos";
import { videosCarrossel } from "./assets/videos";

/**
 * Landing Page - Américas19
 * Lançamento imobiliário no Recreio dos Bandeirantes
 */
const LandingAmericas19 = () => {
  const handleScrollToForm = () => {
    const formElement = document.getElementById("lead-form");
    if (formElement) {
      formElement.scrollIntoView({ behavior: "smooth" });
    }
  };

  // Convert photos for PhotoCarousel component
  const photosForCarousel = fotosCarrossel.map(foto => ({
    url: foto.src,
    titulo: foto.title
  }));

  const plantas = [
    {
      tipo: "2 Quartos",
      area: "58m²",
      quartos: 2,
      banheiros: 1,
      vagas: 1,
      preco: "A partir de R$ 320.000",
      destaque: false,
    },
    {
      tipo: "3 Quartos",
      area: "75m²",
      quartos: 3,
      banheiros: 2,
      vagas: 1,
      preco: "A partir de R$ 420.000",
      destaque: true,
    },
    {
      tipo: "Garden",
      area: "103m²",
      quartos: 3,
      banheiros: 2,
      vagas: 1,
      preco: "A partir de R$ 580.000",
      destaque: true,
    },
    {
      tipo: "Cobertura Duplex",
      area: "138m²",
      quartos: 4,
      banheiros: 3,
      vagas: 2,
      preco: "A partir de R$ 750.000",
      destaque: true,
    },
  ];

  const amenities = [
    { nome: "Piscina Adulto e Infantil", icone: <Waves className="w-6 h-6" /> },
    { nome: "Campo Society", icone: <Users className="w-6 h-6" /> },
    { nome: "Espaço Gourmet", icone: <Home className="w-6 h-6" /> },
    { nome: "Pet Place", icone: <Trees className="w-6 h-6" /> },
    { nome: "Coworking Space", icone: <Wifi className="w-6 h-6" /> },
    { nome: "Spa Relaxamento", icone: <Dumbbell className="w-6 h-6" /> },
    { nome: "Lavanderia Compartilhada", icone: <Home className="w-6 h-6" /> },
    { nome: "Área de Tênis de Mesa", icone: <Users className="w-6 h-6" /> },
  ];

  const diferenciais = [
    "Melhor quilômetro da Av. das Américas",
    "Acesso fácil à praia de bike",
    "Próximo ao Recreio Shopping",
    "Ciclovia na porta",
    "Conexão com natureza e praia",
    "Área de tênis de mesa e futmesa",
    "Espaço gourmet com churrasqueira",
    "Opções garden e cobertura duplex",
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section
        className="relative min-h-screen flex items-center justify-center bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url(${fotosAmericas19.background})`,
        }}
      >
        <div className="container mx-auto px-4 py-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Conteúdo Principal */}
            <div className="text-white space-y-6">
              <div className="space-y-4">
                <Badge variant="secondary" className="bg-blue-600 text-white px-4 py-2">
                  <Star className="w-4 h-4 mr-2" />
                  Lançamento Exclusivo
                </Badge>
                <h1 className="text-4xl md:text-6xl font-bold leading-tight">
                  Américas19
                </h1>
                <p className="text-xl md:text-2xl text-blue-100">
                  Melhor quilômetro da Av. das Américas
                </p>
              </div>

              <div className="space-y-3">
                <div className="flex items-center gap-2 text-lg">
                  <MapPin className="w-5 h-5 text-blue-300" />
                  <span>Recreio dos Bandeirantes, Rio de Janeiro</span>
                </div>
                <div className="flex flex-wrap gap-4 text-sm">
                  <div className="flex items-center gap-1">
                    <Building className="w-4 h-4" />
                    <span>2 a 4 quartos</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Maximize className="w-4 h-4" />
                    <span>58m² a 138m²</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <CarIcon className="w-4 h-4" />
                    <span>1 a 2 vagas</span>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <p className="text-lg leading-relaxed">
                  Bem-vindo ao melhor jeito de viver no Recreio. 
                  Conectado com a natureza, próximo às praias e com lazer completo 
                  para toda a família.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button
                    size="lg"
                    onClick={() => handleScrollToForm()}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3"
                  >
                    Quero Saber Mais
                  </Button>
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-white text-white hover:bg-white hover:text-gray-900"
                    asChild
                  >
                    <a href="tel:+552122223333">
                      <Phone className="w-4 h-4 mr-2" />
                      (21) 2222-3333
                    </a>
                  </Button>
                </div>
              </div>
            </div>

            {/* Formulário Lateral */}
            <div className="lg:max-w-md">
              <LeadCaptureForm
                nomeLancamento="Américas19"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Galeria de Mídia */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Conheça o Américas19
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Explore cada detalhe do seu futuro lar através de nossa galeria completa
            </p>
          </div>

          <PhotoCarousel photos={photosForCarousel} />
        </div>
      </section>

      {/* Plantas e Preços */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Plantas e Preços
            </h2>
            <p className="text-lg text-gray-600">
              Opções de 2 a 4 quartos, incluindo garden e cobertura duplex
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {plantas.map((planta, index) => (
              <Card 
                key={index} 
                className={`relative ${planta.destaque ? 'ring-2 ring-blue-500' : ''} hover:shadow-lg transition-shadow`}
              >
                {planta.destaque && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <Badge className="bg-blue-600 text-white">
                      Destaque
                    </Badge>
                  </div>
                )}
                
                <CardHeader className="text-center">
                  <CardTitle className="text-xl text-blue-600">
                    {planta.tipo}
                  </CardTitle>
                  <p className="text-2xl font-bold text-gray-900">
                    {planta.preco}
                  </p>
                </CardHeader>
                
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div className="flex items-center gap-1">
                      <Maximize className="w-4 h-4 text-gray-500" />
                      <span>{planta.area}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Bed className="w-4 h-4 text-gray-500" />
                      <span>{planta.quartos} quartos</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Bath className="w-4 h-4 text-gray-500" />
                      <span>{planta.banheiros} banheiros</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Car className="w-4 h-4 text-gray-500" />
                      <span>{planta.vagas} vaga{planta.vagas > 1 ? 's' : ''}</span>
                    </div>
                  </div>
                  
                  <Button 
                    onClick={() => handleScrollToForm()}
                    className="w-full bg-blue-600 hover:bg-blue-700"
                  >
                    Tenho Interesse
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Lazer e Amenities */}
      <section className="py-16 bg-gradient-to-br from-blue-50 to-blue-100">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Lazer Completo
            </h2>
            <p className="text-lg text-gray-600">
              Infraestrutura pensada para o seu bem-estar e diversão
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {amenities.map((amenity, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow bg-white">
                <CardContent className="p-6">
                  <div className="text-blue-600 mb-4 flex justify-center">
                    {amenity.icone}
                  </div>
                  <p className="font-medium text-gray-800">{amenity.nome}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Localização e Diferenciais */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Localização Privilegiada
              </h2>
              <p className="text-lg text-gray-600 mb-8">
                No melhor quilômetro da Av. das Américas, o Américas19 oferece 
                acesso fácil às praias, centros comerciais e toda infraestrutura 
                do Recreio dos Bandeirantes.
              </p>

              <div className="grid md:grid-cols-2 gap-4">
                {diferenciais.map((diferencial, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-blue-600 rounded-full flex-shrink-0"></div>
                    <span className="text-gray-700">{diferencial}</span>
                  </div>
                ))}
              </div>

              <div className="mt-8">
                <Button
                  size="lg"
                  onClick={() => handleScrollToForm()}
                  className="bg-blue-600 hover:bg-blue-700"
                >
                  Agendar Visita
                </Button>
              </div>
            </div>

            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <img
                  src={fotosAmericas19.praiaPontal}
                  alt="Praia do Pontal"
                  className="rounded-lg shadow-lg h-40 w-full object-cover"
                />
                <img
                  src={fotosAmericas19.ciclovia}
                  alt="Ciclovia do Recreio"
                  className="rounded-lg shadow-lg h-40 w-full object-cover"
                />
              </div>
              <img
                src={fotosAmericas19.recreioShopping}
                alt="Recreio Shopping"
                className="rounded-lg shadow-lg h-48 w-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-blue-800 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Não Perca Esta Oportunidade
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Garante já o seu apartamento no melhor empreendimento do Recreio. 
            Condições especiais de lançamento por tempo limitado.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              onClick={() => handleScrollToForm()}
              className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-3"
            >
              Quero Meu Apartamento
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-white text-white hover:bg-white hover:text-blue-600"
              asChild
            >
              <a href="tel:+552122223333">
                <Phone className="w-4 h-4 mr-2" />
                Ligar Agora
              </a>
            </Button>
          </div>
        </div>
      </section>

      {/* Formulário de Contato */}
      <section id="lead-form" className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Fale Conosco
              </h2>
              <p className="text-lg text-gray-600">
                Deixe seus dados e nossa equipe entrará em contato
              </p>
            </div>
            
            <LeadCaptureForm
              nomeLancamento="Américas19"
            />
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer
        empreendimentoNome="Américas19"
        empreendimentoEndereco="Av. das Américas - Recreio dos Bandeirantes, Rio de Janeiro"
        regiao={{
          nome: "no Recreio dos Bandeirantes",
          path: "/"
        }}
      />
    </div>
  );
};

export default LandingAmericas19;
