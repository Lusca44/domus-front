import React from "react";
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
  Home,
  Car,
  Waves,
  Dumbbell,
  Users,
  Shield,
  Building,
  TreePine,
  Menu,
  Phone,
  Play,
} from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Dialog, DialogContent, DialogTrigger, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import LeadCaptureForm from "@/components/LeadCaptureForm";
import PhotoCarousel from "@/components/PhotoCarousel";
import { useIsMobile } from "@/hooks/use-mobile";
import fotos from "./assets/fotos";
import videos from "./assets/videos";
import fotomontagem from './assets/img/emccamp - porto - fotomontagem a.jpg';
import Footer from "@/components/Footer";
import Header from "@/components/Header";

/**
 * Landing Page - Porto Carioca Residencial
 *
 * Esta página apresenta informações detalhadas sobre o empreendimento
 * Porto Carioca Residencial com um layout diferenciado e moderno.
 */
const LandingPortoCarioca = () => {
  const isMobile = useIsMobile();

  /**
   * Dados do empreendimento Porto Carioca
   * Baseado nas informações do site https://emccamp.com.br/empreendimento/porto-carioca/
   */
  const empreendimento = {
    nome: "Porto Carioca Residencial",
    slogan: "Viva a transformação do Porto Maravilha",
    descricao:
      "O Porto Carioca Residencial é um empreendimento de alto padrão localizado no coração da revitalização do Porto Maravilha. Com apartamentos de 1 a 3 quartos, oferece uma infraestrutura completa de lazer e conveniência, incluindo área comercial própria, academia, piscinas e muito mais.",
    entrega: "Previsão de entrega: Dezembro/2026",
    caracteristicas: [
      { titulo: "Tipos", valor: "1 a 3 quartos", icone: Home },
      { titulo: "Vagas", valor: "Opcionais", icone: Car },
      { titulo: "Lazer", valor: "Completo", icone: Waves },
      { titulo: "Segurança", valor: "24h", icone: Shield },
    ],
    diferenciais: [
      "Rooftop com vista panorâmica da Baía de Guanabara",
      "Ponto de recarga de carro elético",
      "Piscina adulto e infantil",
      "Academia completamente equipada",
      "Quadra poliesportiva no rooftop",
      "Quadra de beach tennis",
      "Sauna seca e úmida", 
      "Salão de festas com varanda",
      "Área comercial integrada ao térreo",
      "Coworking e sala de reuniões",
      "Brinquedoteca infantil",
      "Bike storage",
      "Pet place",
      "Segurança 24h com portaria qualificada",
      "Localização privilegiada no Porto Maravilha"
    ],
    endereco: "Rua General Luís Mendes de Morais, Santo Cristo, Rio de Janeiro - RJ",
    imagens: fotos,
    videos: videos,
    mapa: "https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d7350.69197335138!2d-43.208164!3d-22.900606000000003!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x997f36dc8775b9%3A0xca5025e6d4a2a39a!2sPorto%20Carioca%20-%20Emccamp!5e0!3m2!1spt-BR!2sbr!4v1751558926239!5m2!1spt-BR!2sbr%22"
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
            Voltar para início
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

  // Função para detectar se é um vídeo do YouTube
  const isYouTubeVideo = (url: string) => {
    return url.includes('youtube.com') || url.includes('youtu.be') || url.includes('embed');
  };

  // Função para converter URL do YouTube para embed
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

  return (
    <div className="min-h-screen bg-white">
      {/* Cabeçalho - adaptado para mobile */}
      <Header />

      {/* Hero Section com Background Image - adaptado para mobile */}
      <section className="relative min-h-screen flex items-center overflow-hidden">
        {/* Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url(${fotomontagem})`,
          }}
        >
          {/* Overlay Gradiente */}
          <div className="absolute inset-0 bg-gradient-to-r from-slate-900/90 via-slate-900/70 to-slate-900/90"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-slate-900/60"></div>
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
                <p
                  className={`font-bold text-white mb-3 md:mb-4 ${
                    isMobile ? "text-lg" : "text-xl lg:text-2xl"
                  }`}
                >
                  {empreendimento.entrega}
                </p>
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
                  nomeLancamento="Porto Carioca"
                  redirectTo="/obrigado"
                  title="Garante sua unidade no Porto Carioca!"
                  description="Preencha o formulário e receba condições exclusivas de lançamento"
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
                  Rooftop, piscinas, academia e muito mais para sua diversão
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
                  Área comercial integrada e serviços no próprio condomínio
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

          {/* Seção de Vídeos */}
          <div className="mt-16">
            <div className="text-center mb-8">
              <h3 className="text-xl sm:text-2xl md:text-3xl font-bold mb-4 text-gray-900">
                Vídeos do Empreendimento
              </h3>
              <p className="text-sm md:text-base lg:text-lg text-gray-600">
                Conheça cada detalhe do seu futuro lar!
              </p>
            </div>
            <div className="flex justify-center">
              <Carousel className="w-full max-w-4xl">
                <CarouselContent className="flex justify-center items-center">
                  {empreendimento.videos.map((video, index) => (
                    <CarouselItem
                      key={index}
                      className="flex justify-center md:basis-1/2 lg:basis-1/3"
                    >
                      <div className="w-full max-w-sm">
                        <Dialog>
                          <DialogTrigger asChild>
                            <Card className="overflow-hidden cursor-pointer group hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                              <div className="relative">
                                <AspectRatio ratio={16 / 9}>
                                  <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                                    {isYouTubeVideo(video.url) ? (
                                      // Thumbnail do YouTube
                                      <div className="relative w-full h-full">
                                        <iframe
                                          src={
                                            video.url
                                              .replace("watch?v=", "embed/")
                                              .replace("youtu.be/", "embed/")
                                              .split("?")[0]
                                          }
                                          title={video.titulo}
                                          className="w-full h-full pointer-events-none"
                                          style={{ pointerEvents: "none" }}
                                        />
                                        <div className="absolute inset-0 bg-black/40 group-hover:bg-black/30 transition-all duration-300 flex items-center justify-center">
                                          <div className="bg-white/90 group-hover:bg-white rounded-full p-4 group-hover:scale-110 transition-all duration-300 shadow-lg">
                                            <Play className="w-8 h-8 text-blue-600 ml-1" />
                                          </div>
                                        </div>
                                      </div>
                                    ) : (
                                      // Thumbnail do vídeo local
                                      <div className="relative w-full h-full">
                                        <video
                                          className="w-full h-full object-cover"
                                          muted
                                          playsInline
                                        >
                                          <source
                                            src={video.url}
                                            type="video/mp4"
                                          />
                                        </video>
                                        <div className="absolute inset-0 bg-black/40 group-hover:bg-black/30 transition-all duration-300 flex items-center justify-center">
                                          <div className="bg-white/90 group-hover:bg-white rounded-full p-4 group-hover:scale-110 transition-all duration-300 shadow-lg">
                                            <Play className="w-8 h-8 text-blue-600 ml-1" />
                                          </div>
                                        </div>
                                      </div>
                                    )}
                                  </div>
                                </AspectRatio>
                                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent text-white p-4">
                                  <p className="font-semibold text-sm">
                                    {video.titulo}
                                  </p>
                                </div>
                              </div>
                            </Card>
                          </DialogTrigger>
                          <DialogContent className="max-w-4xl w-[90vw] max-h-[80vh] p-4 overflow-hidden">
                            <DialogTitle className="sr-only">
                              {video.titulo}
                            </DialogTitle>
                            <DialogDescription className="sr-only">
                              Reprodução do vídeo: {video.titulo}
                            </DialogDescription>
                            <div className="w-full mx-auto h-full flex flex-col">
                              <div className="flex-1 min-h-0">
                                <AspectRatio
                                  ratio={16 / 9}
                                  className="w-full h-full max-h-[calc(80vh-80px)]"
                                >
                                  {isYouTubeVideo(video.url) ? (
                                    <iframe
                                      width="100%"
                                      height="100%"
                                      src={getYouTubeEmbedUrl(video.url)}
                                      title={video.titulo}
                                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                      allowFullScreen
                                      className="rounded object-contain"
                                    ></iframe>
                                  ) : (
                                    <video
                                      width="100%"
                                      height="100%"
                                      controls
                                      autoPlay
                                      className="rounded object-contain max-h-full"
                                    >
                                      <source
                                        src={video.url}
                                        type="video/mp4"
                                      />
                                      Seu navegador não suporta vídeos HTML5.
                                    </video>
                                  )}
                                </AspectRatio>
                              </div>
                              <div className="mt-2 text-center flex-shrink-0">
                                <h4 className="text-sm font-semibold truncate">
                                  {video.titulo}
                                </h4>
                              </div>
                            </div>
                          </DialogContent>
                        </Dialog>
                      </div>
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <CarouselPrevious className="left-2 bg-white/90 hover:bg-white shadow-lg" />
                <CarouselNext className="right-2 bg-white/90 hover:bg-white shadow-lg" />
              </Carousel>
            </div>
          </div>
        </div>
      </section>

      {/* Seção de Diferenciais - adaptada para mobile */}
      <section className="py-12 md:py-16 lg:py-20 bg-slate-50">
        <div className="container mx-auto px-4">
          <div
            className={`grid grid-cols-1 gap-8 md:gap-12 lg:grid-cols-2 lg:gap-16 items-center`}
          >
            <div>
              <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-4 md:mb-6 lg:mb-8 text-gray-900">
                Diferenciais únicos
              </h2>
              <div
                className={`grid grid-cols-1 gap-2 md:gap-3 lg:gap-4 ${
                  isMobile ? "" : "md:grid-cols-2"
                }`}
              >
                {empreendimento.diferenciais.map((item, index) => (
                  <div key={index} className="flex items-start group">
                    <CheckCircle className="w-4 h-4 md:w-5 md:h-5 text-green-500 mr-2 md:mr-3 flex-shrink-0 mt-0.5 group-hover:scale-110 transition-transform" />
                    <span className="text-xs md:text-sm lg:text-base text-gray-700 group-hover:text-gray-900 transition-colors">
                      {item}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-gradient-to-br from-blue-600 to-blue-800 rounded-2xl p-4 md:p-6 lg:p-8 text-white">
              <h3 className="text-lg md:text-xl lg:text-2xl font-bold mb-3 md:mb-4 lg:mb-6">
                Por que escolher o Porto Carioca?
              </h3>
              <ul className="space-y-2 md:space-y-3 lg:space-y-4">
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-blue-300 rounded-full mr-3 flex-shrink-0"></div>
                  <span className="text-xs md:text-sm lg:text-base">
                    Região em plena valorização imobiliária
                  </span>
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-blue-300 rounded-full mr-3 flex-shrink-0"></div>
                  <span className="text-xs md:text-sm lg:text-base">
                    Proximidade com principais pontos turísticos
                  </span>
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-blue-300 rounded-full mr-3 flex-shrink-0"></div>
                  <span className="text-xs md:text-sm lg:text-base">
                    Excelente conectividade urbana
                  </span>
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-blue-300 rounded-full mr-3 flex-shrink-0"></div>
                  <span className="text-xs md:text-sm lg:text-base">
                    Projeto arquitetônico diferenciado
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Localização - adaptada para mobile */}
      <section className="py-12 md:py-16 lg:py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8 md:mb-12 lg:mb-16">
            <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-3 md:mb-4 text-gray-900">
              Localização Estratégica
            </h2>
            <p className="text-sm md:text-base lg:text-lg text-gray-600 max-w-3xl mx-auto">
              Posicionado no epicentro da transformação urbana do Rio de Janeiro
            </p>
          </div>

          <div
            className={`grid grid-cols-1 gap-6 md:gap-8 lg:grid-cols-2 lg:gap-12 items-center`}
          >
            <div className="space-y-4 md:space-y-6">
              <div className="bg-blue-50 rounded-xl p-3 md:p-4 lg:p-6">
                <h3 className="text-base md:text-lg lg:text-xl font-bold mb-3 md:mb-4 text-blue-900">
                  Facilidades da Localização:
                </h3>
                <ul className="space-y-2 md:space-y-3">
                  <li className="flex items-start">
                    <CheckCircle className="w-4 h-4 md:w-5 md:h-5 text-blue-500 mr-2 md:mr-3 flex-shrink-0 mt-0.5" />
                    <span className="text-xs md:text-sm lg:text-base text-gray-700">
                      Em frente ao futuro estádio do Flamengo
                    </span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-4 h-4 md:w-5 md:h-5 text-blue-500 mr-2 md:mr-3 flex-shrink-0 mt-0.5" />
                    <span className="text-xs md:text-sm lg:text-base text-gray-700">
                      Hospital da Gamboa - 1,2 km
                    </span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-4 h-4 md:w-5 md:h-5 text-blue-500 mr-2 md:mr-3 flex-shrink-0 mt-0.5" />
                    <span className="text-xs md:text-sm lg:text-base text-gray-700">
                      Supermercado Supermarket - 850 m
                    </span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-4 h-4 md:w-5 md:h-5 text-blue-500 mr-2 md:mr-3 flex-shrink-0 mt-0.5" />
                    <span className="text-xs md:text-sm lg:text-base text-gray-700">
                      Escolas
                    </span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-4 h-4 md:w-5 md:h-5 text-blue-500 mr-2 md:mr-3 flex-shrink-0 mt-0.5" />
                    <span className="text-xs md:text-sm lg:text-base text-gray-700">
                      Próximo ao VLT e estação de metrô
                    </span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-4 h-4 md:w-5 md:h-5 text-blue-500 mr-2 md:mr-3 flex-shrink-0 mt-0.5" />
                    <span className="text-xs md:text-sm lg:text-base text-gray-700">
                      Academias
                    </span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-4 h-4 md:w-5 md:h-5 text-blue-500 mr-2 md:mr-3 flex-shrink-0 mt-0.5" />
                    <span className="text-xs md:text-sm lg:text-base text-gray-700">
                      Farmácias
                    </span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-4 h-4 md:w-5 md:h-5 text-blue-500 mr-2 md:mr-3 flex-shrink-0 mt-0.5" />
                    <span className="text-xs md:text-sm lg:text-base text-gray-700">
                      Hortifruti
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
                title="Localização do Porto Carioca Residencial"
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
              Sua nova vida no Porto Maravilha começa aqui
            </h2>
            <p className="text-base md:text-lg lg:text-xl mb-6 md:mb-8 lg:mb-12 text-blue-100">
              Não perca a oportunidade de fazer parte da maior transformação
              urbana do Rio de Janeiro
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
                  nomeLancamento="Porto Carioca"
                  redirectTo="/obrigado"
                  title="Quero conhecer as condições especiais"
                  description="Receba informações exclusivas sobre valores e condições"
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

export default LandingPortoCarioca;
