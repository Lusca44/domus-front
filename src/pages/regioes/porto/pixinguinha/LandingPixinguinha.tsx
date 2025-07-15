import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import {
  CheckCircle,
  MapPin,
  ArrowLeft,
  Play,
  Home,
  Car,
  Waves,
  Shield,
  Building,
  TreePine,
  Users,
  Menu,
  Phone,
} from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import LeadCaptureForm from "@/components/LeadCaptureForm";
import PhotoCarousel from "@/components/PhotoCarousel";
import { Dialog, DialogContent, DialogTrigger, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { useIsMobile } from "@/hooks/use-mobile";
import fotos from "./assets/fotos";
import videos from "./assets/videos";
import ImgBackground from "./assets/img/back-ground-pixinguinha.jpeg"
import Footer from "@/components/Footer";
import Header from "@/components/Header";


/**
 * Landing Page - Residencial Pixinguinha
 *
 * Esta página apresenta informações detalhadas sobre o empreendimento
 * Residencial Pixinguinha e captura leads interessados neste lançamento específico.
 */
const LandingPixinguinha = () => {
  const isMobile = useIsMobile();
  // Estado para galeria de imagens
  const [videoThumbnails, setVideoThumbnails] = useState<{[key: number]: string}>({});

  /**
   * Função para gerar thumbnail do vídeo local
   */
  const generateVideoThumbnail = (videoSrc: string, videoIndex: number) => {
    const video = document.createElement('video');
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');

    video.addEventListener('loadedmetadata', () => {
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      video.currentTime = 1; // Pega o frame de 1 segundo
    });

    video.addEventListener('seeked', () => {
      if (ctx) {
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
        const thumbnailDataUrl = canvas.toDataURL('image/jpeg', 0.8);
        setVideoThumbnails(prev => ({
          ...prev,
          [videoIndex]: thumbnailDataUrl
        }));
      }
    });

    video.src = videoSrc;
    video.load();
  };

  useEffect(() => {
    // Gerar thumbnails para vídeos locais
    empreendimento.videos.forEach((video, index) => {
      if (video.url && !video.url.includes('youtube') && !video.url.includes('embed')) {
        generateVideoThumbnail(video.url, index);
      }
    });
  }, []);

  /**
   * Função para obter thumbnail - prioriza vídeo local gerado, fallback para YouTube
   */
  const getVideoThumbnail = (video: any, index: number) => {
    // Se temos uma thumbnail gerada para este vídeo local
    if (videoThumbnails[index]) {
      return videoThumbnails[index];
    }
    
    // Fallback para uma imagem padrão enquanto gera a thumbnail
    return '';
  };

  /**
   * Função para detectar se é um vídeo do YouTube
   */
  const isYouTubeVideo = (url: string) => {
    return url.includes('youtube.com') || url.includes('youtu.be') || url.includes('embed');
  };

  /**
   * Função para converter URL do YouTube para embed
   */
  const getYouTubeEmbedUrl = (url: string) => {
    if (url.includes('embed')) {
      return url;
    }
    
    let videoId = '';
    if (url.includes('youtu.be/')) {
      videoId = url.split('youtu.be/')[1].split('?')[0];
    } else if (url.includes('youtube.com/watch?v=')) {
      videoId = url.split('v=')[1].split('&')[0];
    }
    
    return `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`;
  };

  /**
   * Dados do empreendimento
   */
  const empreendimento = {
    nome: "Residencial Pixinguinha",
    slogan: "A junção do passado e o presente moldando o futuro.",
    descricao:
      "O Residencial Pixinguinha oferece estúdios e apartamentos com 1 à 3 quartos com acabamento de alto padrão. Condominio com lazer completo e um SkyBar com uma vista incrível. Localizado no coração do Porto Maravilha, próximo a museus, restaurantes e do futuro estadio do Flamengo.",
    caracteristicas: [
      { titulo: "Tipos", valor: "1 a 3 quartos", icone: Home },
      { titulo: "Vagas", valor: "Opcionais", icone: Car },
      { titulo: "Lazer", valor: "Completo", icone: Waves },
      { titulo: "Segurança", valor: "24h", icone: Shield },
    ],
    diferenciais: [
      "Lazer diferenciado com SkyBar rooftop",
      "Piscina",
      "Varandas em todos os apartamentos",
      "Espaço gourmet com churrasqueira",
      "Academia equipada",
      "Área de spinnig",
      "Sauna",
      "Lavanderia",
      "Segurança 24h",
      "Próximo aos principais pontos turísticos da região",
    ],
    endereco: "Rua General Luís Mendes de Morais, S/N, Santo Cristo. Rio de Janeiro - RJ",
    imagens: fotos,
    videos: videos,
    mapa: "https://www.google.com/maps/embed?pb=!1m21!1m12!1m3!1d14431.125032052134!2d-43.211162307681796!3d-22.904241560534498!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!4m6!3e6!4m0!4m3!3m2!1d-22.9044362!2d-43.208009499999996!5e0!3m2!1spt-BR!2sbr!4v1749758760039!5m2!1spt-BR!2sbr",
  };

  const MobileMenu = () => (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="md:hidden">
          <Menu className="w-5 h-5" />
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="w-80">
        <div className="flex flex-col space-y-6 mt-6">
          <Link
            to="/"
            className="flex items-center text-blue-600 hover:text-blue-700 transition-colors text-lg"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Voltar para Início
          </Link>
          <div className="border-t pt-4">
            <a 
              href="tel:+552122223333" 
              className="flex items-center text-gray-900 hover:text-blue-600 transition-colors text-lg font-semibold"
            >
              <Phone className="w-5 h-5 mr-3" />
              (21) 2222-3333
            </a>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );

  return (
    <div className="min-h-screen bg-white">
      {/* Cabeçalho - adaptado para mobile */}
      <Header />

      {/* Hero Section - adaptado para mobile */}
      <section className="relative min-h-screen flex items-center overflow-hidden">
        {/* Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url(${ImgBackground})`,
          }}
        >
          {/* Overlay Gradiente */}
          <div className="absolute inset-0 bg-gradient-to-r from-blue-900/90 via-blue-900/70 to-blue-900/90"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-blue-900/80 via-transparent to-blue-900/60"></div>
        </div>

        {/* Background Pattern Adicional */}
        <div className="absolute inset-0 opacity-20 z-10">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/30 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-cyan-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        </div>

        <div className="container mx-auto px-4 py-8 md:py-16 relative z-20">
          <div
            className={`grid grid-cols-1 ${
              isMobile ? "gap-8" : "lg:grid-cols-12 gap-8 lg:gap-12"
            } items-center min-h-[80vh]`}
          >
            {/* Coluna de Conteúdo */}
            <div
              className={`${
                isMobile ? "" : "lg:col-span-7"
              } space-y-4 md:space-y-6 lg:space-y-8`}
            >
              <div className="space-y-3 md:space-y-4">
                <div className="inline-flex items-center px-3 md:px-4 py-2 bg-blue-500/30 backdrop-blur-sm rounded-full text-blue-200 text-xs md:text-sm font-medium border border-blue-400/30">
                  <Building className="w-3 h-3 md:w-4 md:h-4 mr-2" />
                  Lançamento Exclusivo
                </div>
                <h1
                  className={`font-bold text-white leading-tight ${
                    isMobile
                      ? "text-2xl sm:text-3xl"
                      : "text-3xl sm:text-4xl md:text-5xl lg:text-6xl"
                  }`}
                >
                  {empreendimento.nome}
                </h1>
                <p
                  className={`text-blue-200 font-light ${
                    isMobile
                      ? "text-base sm:text-lg"
                      : "text-lg sm:text-xl md:text-2xl"
                  }`}
                >
                  {empreendimento.slogan}
                </p>
              </div>

              <div className="flex items-start text-blue-100">
                <MapPin className="w-4 h-4 md:w-5 md:h-5 mr-2 md:mr-3 mt-1 text-blue-400 flex-shrink-0" />
                <p className="text-sm md:text-base lg:text-lg">
                  {empreendimento.endereco}
                </p>
              </div>

              <div className="bg-white/15 backdrop-blur-sm rounded-xl p-4 md:p-6 border border-white/20 shadow-xl">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-4">
                  {empreendimento.caracteristicas.map((item, index) => {
                    const IconComponent = item.icone;
                    return (
                      <div key={index} className="text-center">
                        <div className="bg-blue-500/25 backdrop-blur-sm rounded-lg p-2 md:p-3 mb-2 mx-auto w-fit border border-blue-400/30">
                          <IconComponent className="w-4 h-4 md:w-5 md:h-5 lg:w-6 lg:h-6 text-blue-300" />
                        </div>
                        <p className="text-xs text-blue-200 break-words">
                          {item.titulo}
                        </p>
                        <p className="font-semibold text-white text-xs md:text-sm break-words">
                          {item.valor}
                        </p>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Coluna do Formulário */}
            <div className={`${isMobile ? "" : "lg:col-span-5"}`}>
              <div className="bg-white/98 backdrop-blur-sm rounded-2xl shadow-2xl border border-white/30 overflow-hidden">
                <LeadCaptureForm
                  nomeLancamento="Pixinguinha"
                  redirectTo="/obrigado"
                  title="Garanta sua unidade no lançamento!"
                  description="Preencha o formulário e nossa equipe entrará em contato com condições especiais"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Seção Sobre o Empreendimento - adaptada para mobile */}
      <section className="py-12 md:py-16 lg:py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center mb-8 md:mb-12 lg:mb-16">
            <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-3 md:mb-4 lg:mb-6 text-gray-900">
              Um novo conceito de morar no Rio
            </h2>
            <p className="text-sm md:text-base lg:text-lg text-gray-700 leading-relaxed">
              {empreendimento.descricao}
            </p>
          </div>

          {/* Cards de Destaques - adaptados para mobile */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 lg:gap-8 mb-8 md:mb-12 lg:mb-16">
            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
              <CardContent className="p-4 md:p-6 lg:p-8 text-center">
                <div className="bg-blue-100 rounded-full p-3 md:p-4 w-12 h-12 md:w-16 md:h-16 mx-auto mb-3 md:mb-4 flex items-center justify-center">
                  <Waves className="w-6 h-6 md:w-8 md:h-8 text-blue-600" />
                </div>
                <h3 className="text-base md:text-lg lg:text-xl font-bold mb-2 md:mb-3">
                  Lazer Completo
                </h3>
                <p className="text-xs md:text-sm lg:text-base text-gray-600">
                  SkyBar rooftop, piscina, academia e muito mais para sua
                  diversão
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
              <CardContent className="p-4 md:p-6 lg:p-8 text-center">
                <div className="bg-green-100 rounded-full p-3 md:p-4 w-12 h-12 md:w-16 md:h-16 mx-auto mb-3 md:mb-4 flex items-center justify-center">
                  <TreePine className="w-6 h-6 md:w-8 md:h-8 text-green-600" />
                </div>
                <h3 className="text-base md:text-lg lg:text-xl font-bold mb-2 md:mb-3">
                  Localização Premium
                </h3>
                <p className="text-xs md:text-sm lg:text-base text-gray-600">
                  No coração da revitalização do Porto Maravilha
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
              <CardContent className="p-4 md:p-6 lg:p-8 text-center">
                <div className="bg-purple-100 rounded-full p-3 md:p-4 w-12 h-12 md:w-16 md:h-16 mx-auto mb-3 md:mb-4 flex items-center justify-center">
                  <Users className="w-6 h-6 md:w-8 md:h-8 text-purple-600" />
                </div>
                <h3 className="text-base md:text-lg lg:text-xl font-bold mb-2 md:mb-3">
                  Conveniência
                </h3>
                <p className="text-xs md:text-sm lg:text-base text-gray-600">
                  Vista panorâmica e acabamentos de alto padrão
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Seção de Galeria - adaptada para mobile */}
      <section className="py-12 md:py-16 lg:py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8 md:mb-12 lg:mb-16">
            <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-3 md:mb-4 text-gray-900">
              Conheça cada detalhe
            </h2>
            <p className="text-sm md:text-base lg:text-lg text-gray-600 max-w-2xl mx-auto">
              Explore todas as áreas e ambientes que farão parte do seu novo
              estilo de vida
            </p>
          </div>

          <PhotoCarousel
            photos={empreendimento.imagens}
            className="mb-8 md:mb-12 lg:mb-16"
          />
        </div>
      </section>

      {/* Seção de Diferenciais - adaptada para mobile */}
      <section className="flex items-center justify-center min-h-screen py-12 md:py-16 lg:py-20 bg-slate-50">
        <div className="container mx-auto px-4 flex justify-center">
          <div className="max-w-4xl w-full text-center">
            {" "}
            {/* Container centralizado com largura máxima */}
            <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-4 md:mb-6 lg:mb-8 text-gray-900">
              Diferenciais únicos
            </h2>
            <div className={`grid grid-cols-1 gap-4 md:gap-6 justify-center`}>
              {empreendimento.diferenciais.map((item, index) => (
                <div
                  key={index}
                  className="flex items-center justify-center group" // Centraliza cada item
                >
                  <CheckCircle className="w-4 h-4 md:w-5 md:h-5 text-green-500 mr-2 md:mr-3 flex-shrink-0 group-hover:scale-110 transition-transform" />
                  <span className="text-xs md:text-sm lg:text-base text-gray-700 group-hover:text-gray-900 transition-colors">
                    {item}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Localização - adaptada para mobile */}
      <section className="py-12 md:py-16 lg:py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8 md:mb-12 lg:mb-16">
            <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-3 md:mb-4 text-gray-900">
              Localização Privilegiada
            </h2>
            <p className="text-sm md:text-base lg:text-lg text-gray-600 max-w-3xl mx-auto">
              Estrategicamente localizado na região
            </p>
          </div>

          <div
            className={`grid grid-cols-1 gap-6 md:gap-8 lg:grid-cols-2 lg:gap-12 items-center`}
          >
            <div className="space-y-4 md:space-y-6">
              <div className="bg-blue-50 rounded-xl p-3 md:p-4 lg:p-6">
                <h3 className="text-base md:text-lg lg:text-xl font-bold mb-3 md:mb-4 text-blue-900">
                  Proximidades da Localização:
                </h3>
                <ul className="space-y-2 md:space-y-3">
                  <li className="flex items-start">
                    <CheckCircle className="w-4 h-4 md:w-5 md:h-5 text-blue-500 mr-2 md:mr-3 flex-shrink-0 mt-0.5" />
                    <span className="text-xs md:text-sm lg:text-base text-gray-700">
                      15 min do Museu do Amanhã e MAR
                    </span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-4 h-4 md:w-5 md:h-5 text-blue-500 mr-2 md:mr-3 flex-shrink-0 mt-0.5" />
                    <span className="text-xs md:text-sm lg:text-base text-gray-700">
                      10 min do Centro da cidade
                    </span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-4 h-4 md:w-5 md:h-5 text-blue-500 mr-2 md:mr-3 flex-shrink-0 mt-0.5" />
                    <span className="text-xs md:text-sm lg:text-base text-gray-700">
                      30 min da Zona Sul
                    </span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-4 h-4 md:w-5 md:h-5 text-blue-500 mr-2 md:mr-3 flex-shrink-0 mt-0.5" />
                    <span className="text-xs md:text-sm lg:text-base text-gray-700">
                      Próximo às principais vias de acesso
                    </span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-4 h-4 md:w-5 md:h-5 text-blue-500 mr-2 md:mr-3 flex-shrink-0 mt-0.5" />
                    <span className="text-xs md:text-sm lg:text-base text-gray-700">
                      Fácil acesso a transporte público (VLT e metrô)
                    </span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="rounded-2xl overflow-hidden shadow-2xl">
              <iframe
                src={empreendimento.mapa}
                width="100%"
                height="400"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Localização do Residencial Pixinguinha"
                className={`w-full ${isMobile ? "h-64" : "h-80 lg:h-96"}`}
              ></iframe>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Final - adaptado para mobile */}
      <section className="py-12 md:py-16 lg:py-20 bg-gradient-to-r from-blue-600 to-blue-800 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold mb-3 md:mb-4 lg:mb-6">
              Não Perca Esta Oportunidade!
            </h2>
            <p className="text-base md:text-lg lg:text-xl mb-6 md:mb-8 lg:mb-12 text-blue-100">
              Garanta já sua unidade no Residencial Pixinguinha com condições
              especiais de lançamento
            </p>

            <div
              className={`grid grid-cols-1 gap-6 md:gap-8 lg:grid-cols-2 lg:gap-12 items-center`}
            >
              <div className="space-y-3 md:space-y-4 lg:space-y-6">
                <div className="text-left">
                  <h3 className="text-lg md:text-xl lg:text-2xl font-bold mb-3 md:mb-4">
                    Condições Especiais de Lançamento:
                  </h3>
                  <ul className="space-y-1 md:space-y-2 text-blue-100">
                    <li className="text-sm md:text-base">
                      • Entrada facilitada
                    </li>
                    <li className="text-sm md:text-base">
                      • Financiamento direto com a construtora
                    </li>
                    <li className="text-sm md:text-base">
                      • Desconto especial para pagamento à vista
                    </li>
                    <li className="text-sm md:text-base">
                      • Parcelas durante a obra
                    </li>
                  </ul>
                </div>
              </div>

              <div className="bg-white/15 backdrop-blur-sm rounded-2xl p-3 md:p-4 lg:p-6 border border-white/20">
                <LeadCaptureForm
                  nomeLancamento="Pixinguinha"
                  redirectTo="/obrigado"
                  title="Quero garantir minha unidade"
                  description="Preencha seus dados para receber mais informações"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default LandingPixinguinha;
