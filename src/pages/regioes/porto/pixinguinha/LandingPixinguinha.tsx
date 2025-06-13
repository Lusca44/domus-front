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
  BedDouble,
  Bath,
  ExternalLink,
  CheckCircle,
  MapPin,
  ArrowLeft,
  Play,
  Eye,
  Maximize,
} from "lucide-react";
import LeadCaptureForm from "@/components/LeadCaptureForm";
import Footer from "@/components/Footer";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import fotos from "./assets/fotos";
import videos from "./assets/videos";
import ImgBackground from "./assets/back-ground-pixinguinha.jpeg";

/**
 * Landing Page - Residencial Pixinguinha
 *
 * Esta página apresenta informações detalhadas sobre o empreendimento
 * Residencial Pixinguinha e captura leads interessados neste lançamento específico.
 *
 * Características:
 * - Apresentação do empreendimento com imagens e vídeos
 * - Detalhes do projeto (plantas, acabamentos, localização)
 * - Formulário de captação de leads
 * - Elementos de confiança (depoimentos, parceiros)
 */
const LandingPixinguinha = () => {
  // Estado para galeria de imagens
  const [imagemAtual, setImagemAtual] = useState(0);

  /**
   * Dados do empreendimento
   * Em um ambiente de produção, esses dados poderiam vir de uma API
   *
   * IMPORTANTE: Substitua todas as URLs de imagens por suas imagens reais
   */
  const empreendimento = {
    nome: "Residencial Pixinguinha",
    slogan: "A junção do passado e o presente moldando o futuro.",
    descricao:
      "O Pixinguinha oferece estúdios e apartamentos com 1 à 3 quartos com acabamento de alto padrão. Condominio com lazer completo e um SkyBar com uma vista incrível. Localizado no coração do Porto Maravilha, próximo a museus, restaurantes e do futuro estadio do Flamengo.",
    entrega: "Previsão de entrega: Maio/2027",
    caracteristicas: [
      // { titulo: "Tipos", valor: "com vaga e suíte"},
      // { titulo: "Quartos", valor: "1 a 3" },
      // { titulo: "Metragem", valor: "31 a 70 m²" },
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
    // IMAGENS: Array expandido com mais imagens

    imagens: fotos,
    // VÍDEOS: Array com múltiplos vídeos
    videos: videos,
    // URL do mapa: Substitua pelo link no Google Maps
    mapa: "https://www.google.com/maps/embed?pb=!1m21!1m12!1m3!1d14431.125032052134!2d-43.211162307681796!3d-22.904241560534498!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!4m6!3e6!4m0!4m3!3m2!1d-22.9044362!2d-43.208009499999996!5e0!3m2!1spt-BR!2sbr!4v1749758760039!5m2!1spt-BR!2sbr",
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Cabeçalho */}
      <header className="border-b">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Link
            to="/porto-maravilha"
            className="flex items-center text-blue-600 hover:text-blue-700"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Voltar para todos os lançamentos no Porto Maravilha
          </Link>
          <Button variant="ghost" asChild>
            <a href="tel:+552122223333">Contato: (21) 2222-3333</a>
          </Button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-blue-900 to-blue-700 text-white">
        <div className="container mx-auto px-4 py-16 md:py-24">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 z-10">
            {/* Coluna de Conteúdo */}
            <div className="space-y-6 z-10 ">
              <h1 className="text-4xl md:text-5xl font-bold leading-tight">
                {empreendimento.nome}
              </h1>
              <p className="text-xl md:text-2xl font-light">
                {empreendimento.slogan}
              </p>
              <div className="flex items-center text-white-900">
                <MapPin className="w-5 h-5 mr-2" />
                <p>{empreendimento.endereco}</p>
              </div>
              <p className="text-2xl font-semibold text-white-900 ">
                {empreendimento.entrega}
              </p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
                {empreendimento.caracteristicas.map((item, index) => (
                  <div
                    key={index}
                    className="bg-blue-800 bg-opacity-50 rounded-lg p-3 text-center"
                  >
                    <p className="text-sm text-blue-200">{item.titulo}</p>
                    <p className="font-semibold text-lg">{item.valor}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Coluna do Formulário */}
            <div className="relative z-20">
              <LeadCaptureForm
                nomeLancamento="Pixinguinha"
                redirectTo="/obrigado"
                title="Garanta sua unidade no lançamento!"
                description="Preencha o formulário e nossa equipe entrará em contato com condições especiais"
              />
            </div>
          </div>
        </div>

        {/* Decoração de fundo - reduzindo opacidade para melhor contraste do texto */}
        <div
          className="absolute inset-0 opacity-40 bg-center bg-cover z-0"
          style={{
            backgroundImage: `url(${ImgBackground})`,
          }}
        ></div>
      </section>

      {/* Seção de Galeria Renovada */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Galeria de Fotos
            </h2>
            <p className="text-gray-600 text-lg">
              Conheça todos os detalhes do empreendimento através de nossas
              imagens
            </p>
          </div>

          {/* Layout lado a lado - Imagem Principal + Thumbnails */}
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-12">
            {/* Imagem Principal - 3/4 do espaço */}
            <div className="lg:col-span-3">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl bg-white p-4">
                <AspectRatio ratio={16 / 10}>
                  <img
                    src={empreendimento.imagens[imagemAtual].url}
                    alt={empreendimento.imagens[imagemAtual].titulo}
                    className="object-cover w-full h-full rounded-xl"
                  />
                  {/* Overlay com informações */}
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-6 rounded-b-xl">
                    <h3 className="text-white text-xl font-semibold mb-2">
                      {empreendimento.imagens[imagemAtual].titulo}
                    </h3>
                    <div className="flex items-center justify-between">
                      <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                        {imagemAtual + 1} de {empreendimento.imagens.length}
                      </span>
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
                            <div className="absolute bottom-0 left-0 right-0 bg-black/70 text-white p-4">
                              <h4 className="text-lg font-semibold">
                                {empreendimento.imagens[imagemAtual].titulo}
                              </h4>
                            </div>
                          </div>
                        </DialogContent>
                      </Dialog>
                    </div>
                  </div>
                </AspectRatio>
              </div>
            </div>

            {/* Lista de Thumbnails - 1/4 do espaço */}
            <div className="lg:col-span-1">
              <div className="h-full">
                <h3 className="text-lg font-bold mb-4 text-center lg:text-left">
                  Todas as fotos
                </h3>
                <div className="grid grid-cols-2 lg:grid-cols-1 gap-3 max-h-[500px] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
                  {empreendimento.imagens.map((img, index) => (
                    <div
                      key={index}
                      className={`relative rounded-lg overflow-hidden cursor-pointer transition-all duration-300 transform hover:scale-105 shadow-md ${
                        imagemAtual === index
                          ? "ring-3 ring-blue-500 ring-offset-2 shadow-blue-500/50"
                          : "hover:shadow-lg"
                      }`}
                      onClick={() => setImagemAtual(index)}
                    >
                      <AspectRatio ratio={4 / 3}>
                        <img
                          src={img.url}
                          alt={img.titulo}
                          className="object-cover w-full h-full transition-all duration-300"
                        />
                        {/* Overlay sutil */}
                        <div
                          className={`absolute inset-0 transition-all duration-300 ${
                            imagemAtual === index
                              ? "bg-blue-600/20"
                              : "bg-black/10 hover:bg-black/20"
                          }`}
                        />
                        {/* Indicador de seleção */}
                        {imagemAtual === index && (
                          <div className="absolute top-2 right-2">
                            <div className="bg-blue-500 text-white rounded-full p-1">
                              <Eye className="w-3 h-3" />
                            </div>
                          </div>
                        )}
                      </AspectRatio>
                      {/* Título da thumbnail */}
                      <div className="absolute bottom-0 left-0 right-0 bg-black/70 text-white p-2">
                        <p className="text-xs font-medium truncate">
                          {img.titulo}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Seção de Vídeos Melhorada */}
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
                                  <Play className="w-8 h-8 text-blue-600 ml-1" />
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
                Projeto arquitetônico moderno com fachada imponente, o Vista
                Baía Residencial foi elaborado para proporcionar o máximo de
                conforto e bem-estar aos moradores. Com áreas comuns amplas e
                bem equipadas, o empreendimento é ideal para quem busca
                qualidade de vida em uma das áreas mais promissoras do Rio de
                Janeiro.
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
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-10 text-center">
            Localização Privilegiada
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <p className="text-gray-700 text-lg">
                O Vista Baía Residencial está estrategicamente localizado no
                coração do Porto Maravilha, área que vem se valorizando
                constantemente nos últimos anos devido aos investimentos em
                infraestrutura e cultura.
              </p>

              <ul className="space-y-3">
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">
                    15 min do Museu do Amanhã e MAR
                  </span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">
                    10 min do Centro da cidade
                  </span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">30 min da Zona Sul</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">
                    Próximo às principais vias de acesso
                  </span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">
                    Fácil acesso a transporte público (VLT e metrô)
                  </span>
                </li>
              </ul>
            </div>

            <div className="rounded-lg overflow-hidden shadow-lg">
              {/* MAPA: Substitua o src pelo link correto do Google Maps */}
              <iframe
                src={empreendimento.mapa}
                width="100%"
                height="400"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Localização do Vista Baía Residencial"
              ></iframe>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section className="py-16 bg-blue-700 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Não Perca Esta Oportunidade!
            </h2>
            <p className="text-lg md:text-xl mb-8">
              Garanta já sua unidade no Vista Baía Residencial com condições
              especiais de lançamento.
            </p>

            <div className="max-w-md mx-auto">
              <LeadCaptureForm
                nomeLancamento="Pixinguinha"
                redirectTo="/obrigado"
                title="Quero garantir minha unidade"
                description="Preencha seus dados para receber mais informações"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Footer usando o novo componente */}
      <Footer 
        empreendimentoNome={empreendimento.nome}
        empreendimentoEndereco={empreendimento.endereco}
        regiao={{
          nome: "no Porto Maravilha",
          path: "/porto-maravilha"
        }}
      />
    </div>
  );
};

export default LandingPixinguinha;
