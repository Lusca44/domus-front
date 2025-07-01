import React, { useState } from "react";
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
  Eye,
  Maximize,
  Waves,
  Car,
  ShoppingBag,
} from "lucide-react";
import LeadCaptureForm from "@/components/LeadCaptureForm";
import Footer from "@/components/Footer";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import imgBackGround from '@/assets/images/imagem-barra-da-tijuca.webp' // tirar esse import e criar uma pasta de assets so pra isso


const LandingAtlantico = () => {
  const [imagemAtual, setImagemAtual] = useState(0);

  const empreendimento = {
    nome: "Residencial Atlântico",
    slogan: "O luxo encontra o mar na Barra da Tijuca.",
    descricao:
      "O Residencial Atlântico oferece apartamentos de 2 a 4 quartos com acabamento premium e vista privilegiada para o mar. Com lazer completo que inclui piscina olímpica, quadra de tênis e spa, localizado na melhor quadra da Barra da Tijuca.",
    entrega: "Previsão de entrega: Dezembro/2026",
    caracteristicas: [
      { titulo: "Tipos", valor: "2 a 4 quartos" },
      { titulo: "Metragem", valor: "85 a 180 m²" },
      { titulo: "Vagas", valor: "2 a 3 vagas" },
    ],
    diferenciais: [
      "Vista panorâmica para o mar",
      "Piscina olímpica aquecida",
      "Quadra de tênis oficial",
      "Spa com sauna e massagem",
      "Academia com personal trainer",
      "Espaço gourmet com churrasqueira",
      "Playground infantil",
      "Segurança 24h com portaria inteligente",
      "A 100m da praia",
      "Próximo ao BarraShopping",
    ],
    endereco: "Av. das Américas, 3000, Barra da Tijuca. Rio de Janeiro - RJ",
    imagens: [
      {
        url: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=1200&h=800&fit=crop",
        titulo: "Fachada Principal"
      },
      {
        url: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=1200&h=800&fit=crop",
        titulo: "Área de Lazer"
      },
      {
        url: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=1200&h=800&fit=crop",
        titulo: "Apartamento Decorado"
      },
      {
        url: "https://images.unsplash.com/photo-1571055107559-3e67626fa8be?w=1200&h=800&fit=crop",
        titulo: "Vista do Mar"
      },
    ],
    videos: [
      {
        titulo: "Tour Virtual do Empreendimento",
        url: "https://www.youtube.com/embed/dQw4w9WgXcQ",
        thumbnail: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&h=600&fit=crop"
      },
      {
        titulo: "Vista Aérea da Região",
        url: "https://www.youtube.com/embed/dQw4w9WgXcQ",
        thumbnail: "https://images.unsplash.com/photo-1431576901776-e539bd916ba2?w=800&h=600&fit=crop"
      },
      {
        titulo: "Apartamento Decorado",
        url: "https://www.youtube.com/embed/dQw4w9WgXcQ",
        thumbnail: "https://images.unsplash.com/photo-1721322800607-8c38375eef04?w=800&h=600&fit=crop"
      }
    ],
    mapa: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3673.6962439934426!2d-43.3618!3d-23.0184!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x9bdb2654c0fffd%3A0x80d7f8b7a4b8b5dd!2sAv.%20das%20Am%C3%A9ricas%2C%20Barra%20da%20Tijuca%2C%20Rio%20de%20Janeiro%20-%20RJ!5e0!3m2!1spt-BR!2sbr!4v1640000000000!5m2!1spt-BR!2sbr",
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Cabeçalho */}
      <header className="border-b">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Link
            to="/barra-tijuca"
            className="flex items-center text-blue-600 hover:text-blue-700"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Voltar para todos os lançamentos na Barra da Tijuca
          </Link>
          <Button variant="ghost" asChild>
            <a href="tel:+552122223333">Contato: (21) 2222-3333</a>
          </Button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-cyan-700 to-blue-500 text-white">
        <div className="container mx-auto px-4 py-16 md:py-24 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="space-y-6">
              <h1 className="text-4xl md:text-5xl font-bold leading-tight">
                {empreendimento.nome}
              </h1>
              <p className="text-xl md:text-2xl font-light">
                {empreendimento.slogan}
              </p>
              <div className="flex items-center text-gray-200">
                <MapPin className="w-5 h-5 mr-2" />
                <p>{empreendimento.endereco}</p>
              </div>
              <p className="text-2xl font-semibold text-yellow-300">
                {empreendimento.entrega}
              </p>
              <div className="grid grid-cols-3 gap-4 mt-6">
                {empreendimento.caracteristicas.map((item, index) => (
                  <div
                    key={index}
                    className="bg-cyan-800 bg-opacity-50 rounded-lg p-3 text-center"
                  >
                    <p className="text-sm text-cyan-200">{item.titulo}</p>
                    <p className="font-semibold text-lg">{item.valor}</p>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <LeadCaptureForm
                nomeLancamento="Atlântico"
                redirectTo="/obrigado"
                title="Garanta sua unidade na Barra!"
                description="Preencha o formulário e nossa equipe entrará em contato com condições especiais"
              />
            </div>
          </div>
        </div>

        <div
          className="absolute inset-0 opacity-40 bg-center bg-cover z-0"
          style={{
            backgroundImage: `url(${imgBackGround})`,
          }}
        ></div>
      </section>

      {/* Seção de Galeria */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Galeria de Fotos
            </h2>
            <p className="text-gray-600 text-lg">
              Conheça todos os detalhes do Residencial Atlântico
            </p>
          </div>

          <div className="max-w-4xl mx-auto mb-12">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl bg-white p-4">
              <AspectRatio ratio={16 / 10}>
                <img
                  src={empreendimento.imagens[imagemAtual].url}
                  alt={empreendimento.imagens[imagemAtual].titulo}
                  className="object-cover w-full h-full rounded-xl"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-6 rounded-b-xl">
                  <h3 className="text-white text-xl font-semibold mb-2">
                    {empreendimento.imagens[imagemAtual].titulo}
                  </h3>
                  <div className="flex items-center justify-between">
                    <span className="bg-cyan-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                      {imagemAtual + 1} de {empreendimento.imagens.length}
                    </span>
                    <div className="flex gap-2">
                      <Button
                        variant="secondary"
                        size="sm"
                        className="bg-white/20 hover:bg-white/30 text-white border-white/30"
                        onClick={() => setImagemAtual(imagemAtual > 0 ? imagemAtual - 1 : empreendimento.imagens.length - 1)}
                      >
                        Anterior
                      </Button>
                      <Button
                        variant="secondary"
                        size="sm"
                        className="bg-white/20 hover:bg-white/30 text-white border-white/30"
                        onClick={() => setImagemAtual(imagemAtual < empreendimento.imagens.length - 1 ? imagemAtual + 1 : 0)}
                      >
                        Próxima
                      </Button>
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button
                            variant="secondary"
                            size="sm"
                            className="bg-white/20 hover:bg-white/30 text-white border-white/30"
                          >
                            <Maximize className="w-4 h-4 mr-2" />
                            Ver em tela cheia
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-6xl max-h-[90vh] p-0">
                          <div className="relative">
                            <img
                              src={empreendimento.imagens[imagemAtual].url}
                              alt={empreendimento.imagens[imagemAtual].titulo}
                              className="w-full h-auto object-contain"
                            />
                          </div>
                        </DialogContent>
                      </Dialog>
                    </div>
                  </div>
                </div>
              </AspectRatio>
            </div>
          </div>

          {/* Seção de Vídeos - Adicionada */}
          <div className="mt-16">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold mb-4">
                Vídeos do Empreendimento
              </h3>
              <p className="text-gray-600">
                Faça um tour virtual e conheça cada detalhe
              </p>
            </div>
            <Carousel className="w-full max-w-4xl mx-auto">
              <CarouselContent className="-ml-4">
                {empreendimento.videos.map((video, index) => (
                  <CarouselItem
                    key={index}
                    className="pl-4 md:basis-1/2 lg:basis-1/3"
                  >
                    <Dialog>
                      <DialogTrigger asChild>
                        <Card className="overflow-hidden cursor-pointer group hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                          <div className="relative">
                            <AspectRatio ratio={16 / 9}>
                              <img
                                src={video.thumbnail}
                                alt={video.titulo}
                                className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-500"
                              />
                              <div className="absolute inset-0 bg-black/40 group-hover:bg-black/30 transition-all duration-300 flex items-center justify-center">
                                <div className="bg-white/90 group-hover:bg-white rounded-full p-4 group-hover:scale-110 transition-all duration-300 shadow-lg">
                                  <Play className="w-8 h-8 text-cyan-600 ml-1" />
                                </div>
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
                      <DialogContent className="max-w-4xl">
                        <div className="aspect-video">
                          <iframe
                            width="100%"
                            height="100%"
                            src={video.url}
                            title={video.titulo}
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                            className="rounded"
                          ></iframe>
                        </div>
                        <div className="mt-4">
                          <h4 className="text-lg font-semibold">
                            {video.titulo}
                          </h4>
                        </div>
                      </DialogContent>
                    </Dialog>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="left-2 bg-white/90 hover:bg-white shadow-lg" />
              <CarouselNext className="right-2 bg-white/90 hover:bg-white shadow-lg" />
            </Carousel>
          </div>
        </div>
      </section>

      {/* Seção de Descrição */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="space-y-6">
              <h2 className="text-3xl font-bold">Sobre o Empreendimento</h2>
              <p className="text-gray-700 text-lg leading-relaxed">
                {empreendimento.descricao}
              </p>
              <p className="text-gray-700">
                Localizado na melhor quadra da Barra da Tijuca, o Residencial Atlântico
                oferece uma experiência única de moradia à beira-mar, com toda a
                infraestrutura e comodidade que você merece.
              </p>
            </div>

            <div>
              <h3 className="text-2xl font-bold mb-6">Diferenciais</h3>
              <ul className="space-y-3">
                {empreendimento.diferenciais.map((item, index) => (
                  <li key={index} className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Localização */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-10 text-center">
            Localização Privilegiada na Barra
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <p className="text-gray-700 text-lg">
                Situado na Av. das Américas, o Residencial Atlântico está no coração
                da Barra da Tijuca, com acesso direto às melhores atrações da região.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="text-center p-4 bg-white rounded-lg shadow">
                  <Waves className="w-8 h-8 text-blue-500 mx-auto mb-2" />
                  <p className="font-semibold">100m da Praia</p>
                </div>
                <div className="text-center p-4 bg-white rounded-lg shadow">
                  <ShoppingBag className="w-8 h-8 text-green-500 mx-auto mb-2" />
                  <p className="font-semibold">5 min do Shopping</p>
                </div>
                <div className="text-center p-4 bg-white rounded-lg shadow">
                  <Car className="w-8 h-8 text-purple-500 mx-auto mb-2" />
                  <p className="font-semibold">Acesso ao BRT</p>
                </div>
              </div>
            </div>

            <div className="rounded-lg overflow-hidden shadow-lg">
              <iframe
                src={empreendimento.mapa}
                width="100%"
                height="400"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Localização do Residencial Atlântico"
              ></iframe>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section className="py-16 bg-cyan-700 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Viva o Luxo na Barra da Tijuca!
            </h2>
            <p className="text-lg md:text-xl mb-8">
              Garante já sua unidade no Residencial Atlântico com condições especiais de lançamento.
            </p>

            <div className="max-w-md mx-auto">
              <LeadCaptureForm
                nomeLancamento="Atlântico"
                redirectTo="/obrigado"
                title="Quero garantir minha unidade"
                description="Preencha seus dados para receber mais informações"
              />
            </div>
          </div>
        </div>
      </section>

      <Footer 
        empreendimentoNome={empreendimento.nome}
        empreendimentoEndereco={empreendimento.endereco}
        regiao={{
          nome: "na Barra da Tijuca",
          path: "/barra-tijuca"
        }}
      />
    </div>
  );
};

export default LandingAtlantico;
