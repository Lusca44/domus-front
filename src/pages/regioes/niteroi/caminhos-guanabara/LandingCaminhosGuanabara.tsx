
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
  Palette,
  Camera,
} from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Dialog, DialogContent, DialogTrigger, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import LeadCaptureForm from "@/components/LeadCaptureForm";
import Footer from "@/components/Footer";
import { useIsMobile } from "@/hooks/use-mobile";
import fotos from "./assets/fotos";
import videos from "./assets/videos";

/**
 * Landing Page - Caminhos da Guanabara
 *
 * Esta página apresenta informações detalhadas sobre o empreendimento
 * Caminhos da Guanabara em Niterói com layout idêntico ao Porto Carioca.
 */
const LandingCaminhosGuanabara = () => {
  const isMobile = useIsMobile();

  /**
   * Dados do empreendimento Caminhos da Guanabara
   */
  const empreendimento = {
    nome: "Caminhos da Guanabara",
    slogan: "Onde todos seus caminhos se encontram",
    descricao:
      "Um manifesto em forma de arte e arquitetura que preenche Niterói. De um lado, o mar da grandiosa Baía de Guanabara abraça o litoral. Do outro, a efervescência cultural toma conta do Caminho Niemeyer. Um novo projeto conectando um novo estilo de vida a uma nova forma de viver a cidade.",
    entrega: "Previsão de entrega: Dezembro/2027",
    caracteristicas: [
      { titulo: "Tipos", valor: "1 e 2 quartos", icone: Home },
      { titulo: "Vagas", valor: "Opcionais", icone: Car },
      { titulo: "Lazer", valor: "Completo + Rooftop", icone: Waves },
      { titulo: "Segurança", valor: "24h", icone: Shield },
    ],
    diferenciais: [
      "Vista privilegiada da Baía de Guanabara",
      "Próximo ao Caminho Niemeyer",
      "Fachada assinada por A+ Arquitetura",
      "2 blocos com 1.068 residências",
      "Rooftop com espaço gourmet e solário",
      "Piscina adulto e infantil com deck molhado",
      "Academia interna e externa",
      "Campo society e quadra de areia",
      "Coworking completo",
      "Pet care e brinquedoteca",
      "Salão de jogos e festas",
      "Sauna e churrasqueiras",
      "Lavanderia pay-per-use",
      "Áreas entregues equipadas e decoradas",
      "Localização estratégica em Niterói"
    ],
    endereco: "Niterói - RJ, próximo ao Caminho Niemeyer",
    imagens: fotos,
    videos: videos,
    mapa: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3675.1234567890!2d-43.1234567!3d-22.8876543!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x997f0f0f0f0f0f0f%3A0x0!2sNiterói%2C%20RJ!5e0!3m2!1spt-BR!2sbr!4v1234567890123!5m2!1spt-BR!2sbr"
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
            className="flex items-center text-emerald-600 hover:text-emerald-700 transition-colors text-lg"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Voltar para início
          </Link>
          <div className="border-t pt-4">
            <a 
              href="tel:+552122223333" 
              className="flex items-center text-gray-900 hover:text-emerald-600 transition-colors text-lg font-semibold"
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
      {/* Header */}
      <header className="border-b bg-white/95 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          {!isMobile ? (
            <>
              <Link
                to="/"
                className="flex items-center text-emerald-600 hover:text-emerald-700 transition-colors"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Voltar para início
              </Link>
              <Button variant="ghost" asChild>
                <a href="tel:+552122223333" className="font-semibold">
                  Contato: (21) 2222-3333
                </a>
              </Button>
            </>
          ) : (
            <>
              <div className="text-lg font-bold text-gray-900">Caminhos da Guanabara</div>
              <MobileMenu />
            </>
          )}
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-900 via-teal-800 to-cyan-900">
          <div className="absolute inset-0 opacity-20">
            <div className="absolute top-0 left-0 w-full h-full" 
                 style={{
                   backgroundImage: `radial-gradient(circle at 25% 25%, rgba(255,255,255,0.1) 0%, transparent 50%), 
                                   radial-gradient(circle at 75% 75%, rgba(255,255,255,0.1) 0%, transparent 50%)`,
                   backgroundSize: '200px 200px'
                 }}>
            </div>
          </div>
        </div>

        <div className="absolute inset-0 overflow-hidden z-10">
          <div className="absolute top-20 right-20 w-32 h-32 border border-emerald-300/30 rounded-full animate-pulse"></div>
          <div className="absolute bottom-20 left-20 w-24 h-24 border border-teal-300/30 rounded-full animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 border border-cyan-300/20 rounded-full animate-pulse delay-500"></div>
        </div>

        <div className="container mx-auto px-4 py-16 relative z-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center min-h-[80vh]">
            <div className="lg:col-span-7 space-y-8">
              <div className="space-y-4">
                <div className="inline-flex items-center px-4 py-2 bg-emerald-500/30 backdrop-blur-sm rounded-full text-emerald-200 text-sm font-medium border border-emerald-400/30">
                  <Palette className="w-4 h-4 mr-2" />
                  Arte & Arquitetura
                </div>
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight">
                  {empreendimento.nome}
                </h1>
                <p className="text-xl sm:text-2xl text-emerald-200 font-light">
                  {empreendimento.slogan}
                </p>
              </div>

              <div className="flex items-start text-emerald-100">
                <MapPin className="w-5 h-5 mr-3 mt-1 text-emerald-400 flex-shrink-0" />
                <p className="text-lg">{empreendimento.endereco}</p>
              </div>

              <div className="bg-white/15 backdrop-blur-sm rounded-xl p-6 border border-white/20 shadow-xl">
                <p className="text-2xl font-bold text-white mb-4">
                  {empreendimento.entrega}
                </p>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {empreendimento.caracteristicas.map((item, index) => {
                    const IconComponent = item.icone;
                    return (
                      <div key={index} className="text-center">
                        <div className="bg-emerald-500/25 backdrop-blur-sm rounded-lg p-3 mb-2 mx-auto w-fit border border-emerald-400/30">
                          <IconComponent className="w-6 h-6 text-emerald-300" />
                        </div>
                        <p className="text-xs text-emerald-200">{item.titulo}</p>
                        <p className="font-semibold text-white text-sm">{item.valor}</p>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="bg-white/98 backdrop-blur-sm rounded-2xl shadow-2xl border border-white/30 overflow-hidden">
                <LeadCaptureForm
                  nomeLancamento="Caminhos da Guanabara"
                  redirectTo="/obrigado"
                  title="Descubra seu novo lar em Niterói!"
                  description="Preencha o formulário e receba informações exclusivas"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Sobre o Empreendimento */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center mb-16">
            <h2 className="text-4xl font-bold mb-6 text-gray-900">
              Conectando um novo estilo de vida
            </h2>
            <p className="text-lg text-gray-700 leading-relaxed">
              {empreendimento.descricao}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
              <CardContent className="p-8 text-center">
                <div className="bg-emerald-100 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                  <Waves className="w-8 h-8 text-emerald-600" />
                </div>
                <h3 className="text-xl font-bold mb-3">Lazer Completo</h3>
                <p className="text-gray-600">
                  Rooftop, piscinas, campo society e muito mais
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
              <CardContent className="p-8 text-center">
                <div className="bg-teal-100 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                  <TreePine className="w-8 h-8 text-teal-600" />
                </div>
                <h3 className="text-xl font-bold mb-3">Vista da Baía</h3>
                <p className="text-gray-600">
                  Localização privilegiada com vista para a Baía de Guanabara
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
              <CardContent className="p-8 text-center">
                <div className="bg-cyan-100 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                  <Palette className="w-8 h-8 text-cyan-600" />
                </div>
                <h3 className="text-xl font-bold mb-3">Arte & Cultura</h3>
                <p className="text-gray-600">
                  Próximo ao Caminho Niemeyer e MAC Niterói
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Galeria de Fotos */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 text-gray-900">
              Conheça cada ambiente
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Descubra todos os espaços que farão parte do seu novo estilo de vida em Niterói
            </p>
          </div>

          <Carousel className="w-full max-w-6xl mx-auto">
            <CarouselContent className="-ml-4">
              {empreendimento.imagens.map((foto, index) => (
                <CarouselItem key={index} className="pl-4 basis-full md:basis-1/2 lg:basis-1/3">
                  <div className="p-1">
                    <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group">
                      <div className="relative">
                        <AspectRatio ratio={4/3}>
                          <img
                            src={foto.url}
                            alt={foto.titulo}
                            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                          />
                        </AspectRatio>
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          <div className="absolute bottom-0 left-0 right-0 p-4">
                            <h3 className="text-white font-semibold text-base">
                              {foto.titulo}
                            </h3>
                          </div>
                        </div>
                      </div>
                    </Card>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="left-2 bg-white/90 hover:bg-white shadow-lg" />
            <CarouselNext className="right-2 bg-white/90 hover:bg-white shadow-lg" />
          </Carousel>
        </div>
      </section>

      {/* Galeria de Vídeos */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 text-gray-900">
              Vídeos do Empreendimento
            </h2>
            <p className="text-lg text-gray-600">
              Viva uma experiência única em Niterói
            </p>
          </div>

          <Carousel className="w-full max-w-4xl mx-auto">
            <CarouselContent className="-ml-4">
              {empreendimento.videos.map((video, index) => (
                <CarouselItem key={index} className="pl-4 basis-full md:basis-1/2 lg:basis-1/3">
                  <div className="p-1">
                    <Dialog>
                      <DialogTrigger asChild>
                        <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer overflow-hidden group">
                          <div className="relative">
                            <AspectRatio ratio={16/9}>
                              <div className="w-full h-full bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center">
                                <div className="text-center">
                                  <div className="bg-white/20 backdrop-blur-sm rounded-full p-4 mb-4 group-hover:bg-white/30 transition-colors duration-300">
                                    <Play className="w-8 h-8 text-white" />
                                  </div>
                                  <h3 className="text-white font-semibold text-base px-4">
                                    {video.titulo}
                                  </h3>
                                </div>
                              </div>
                            </AspectRatio>
                          </div>
                        </Card>
                      </DialogTrigger>
                      <DialogContent className="max-w-4xl w-[90vw] p-0">
                        <DialogTitle className="sr-only">{video.titulo}</DialogTitle>
                        <DialogDescription className="sr-only">
                          Vídeo: {video.titulo}
                        </DialogDescription>
                        <div className="relative">
                          <AspectRatio ratio={16/9}>
                            {isYouTubeVideo(video.url) ? (
                              <iframe
                                src={getYouTubeEmbedUrl(video.url)}
                                title={video.titulo}
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                                className="w-full h-full rounded-lg"
                              />
                            ) : (
                              <video
                                controls
                                autoPlay
                                className="w-full h-full rounded-lg"
                              >
                                <source src={video.url} type="video/mp4" />
                                Seu navegador não suporta vídeos HTML5.
                              </video>
                            )}
                          </AspectRatio>
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
      </section>

      {/* Diferenciais */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl font-bold mb-8 text-gray-900">
                Diferenciais únicos
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {empreendimento.diferenciais.map((item, index) => (
                  <div key={index} className="flex items-start group">
                    <CheckCircle className="w-5 h-5 text-emerald-500 mr-3 flex-shrink-0 mt-0.5 group-hover:scale-110 transition-transform" />
                    <span className="text-base text-gray-700 group-hover:text-gray-900 transition-colors">
                      {item}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-gradient-to-br from-emerald-600 to-teal-800 rounded-2xl p-8 text-white">
              <h3 className="text-2xl font-bold mb-6">Por que escolher Caminhos da Guanabara?</h3>
              <ul className="space-y-4">
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-emerald-300 rounded-full mr-3 flex-shrink-0"></div>
                  <span>1.068 residências em 2 blocos modernos</span>
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-emerald-300 rounded-full mr-3 flex-shrink-0"></div>
                  <span>Fachada assinada por A+ Arquitetura</span>
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-emerald-300 rounded-full mr-3 flex-shrink-0"></div>
                  <span>Próximo ao MAC e Teatro Oscar Niemeyer</span>
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-emerald-300 rounded-full mr-3 flex-shrink-0"></div>
                  <span>Áreas entregues equipadas e decoradas</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Localização */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 text-gray-900">
              Localização Privilegiada
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              No coração de Niterói, cercado por arte, cultura e a beleza da Baía de Guanabara
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <div className="bg-emerald-50 rounded-xl p-6">
                <h3 className="text-xl font-bold mb-4 text-emerald-900">Pontos de Interesse Próximos:</h3>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-emerald-500 mr-3 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">Museu de Arte Contemporânea (MAC)</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-emerald-500 mr-3 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">Teatro Popular Oscar Niemeyer</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-emerald-500 mr-3 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">Plaza Shopping Niterói</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-emerald-500 mr-3 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">Estação Arariboia das Barcas</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-emerald-500 mr-3 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">Universidade Federal Fluminense (UFF)</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-emerald-500 mr-3 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">Memorial Roberto Silveira</span>
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
                title="Localização do Caminhos da Guanabara"
                className="w-full h-96"
              ></iframe>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section className="py-20 bg-gradient-to-r from-emerald-600 to-teal-800 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-5xl font-bold mb-6">
              Seu novo lar em Niterói te espera
            </h2>
            <p className="text-xl mb-12 text-emerald-100">
              Onde todos seus caminhos se encontram com arte, cultura e a beleza da Baía de Guanabara
            </p>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                <div className="text-left">
                  <h3 className="text-2xl font-bold mb-4">Condições Especiais:</h3>
                  <ul className="space-y-2 text-emerald-100">
                    <li>• Apartamentos de 1 e 2 quartos</li>
                    <li>• Vagas opcionais disponíveis</li>
                    <li>• Financiamento facilitado</li>
                    <li>• Áreas equipadas e decoradas</li>
                  </ul>
                </div>
              </div>

              <div className="bg-white/15 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                <LeadCaptureForm
                  nomeLancamento="Caminhos da Guanabara"
                  redirectTo="/obrigado"
                  title="Quero conhecer os Caminhos da Guanabara"
                  description="Receba informações exclusivas sobre este lançamento único"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer
        empreendimentoNome={empreendimento.nome}
        empreendimentoEndereco={empreendimento.endereco}
        regiao={{
          nome: "em Niterói",
          path: "/",
        }}
      />
    </div>
  );
};

export default LandingCaminhosGuanabara;
