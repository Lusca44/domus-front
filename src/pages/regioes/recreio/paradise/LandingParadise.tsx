
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
  Trees,
  Mountain,
  Heart,
} from "lucide-react";
import LeadCaptureForm from "@/components/LeadCaptureForm";
import Footer from "@/components/Footer";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";

const LandingParadise = () => {
  const [imagemAtual, setImagemAtual] = useState(0);

  const empreendimento = {
    nome: "Residencial Paradise",
    slogan: "Viva em harmonia com a natureza no Recreio.",
    descricao:
      "O Residencial Paradise oferece apartamentos de 2 a 3 quartos com vista privilegiada para as montanhas e mar. Com área de lazer integrada à natureza, incluindo trilhas ecológicas e jardins suspensos, localizado no coração verde do Recreio dos Bandeirantes.",
    entrega: "Previsão de entrega: Setembro/2026",
    caracteristicas: [
      { titulo: "Tipos", valor: "2 a 3 quartos" },
      { titulo: "Metragem", valor: "70 a 120 m²" },
      { titulo: "Vagas", valor: "1 a 2 vagas" },
    ],
    diferenciais: [
      "Vista para montanhas e vegetação",
      "Trilhas ecológicas privativas",
      "Jardins suspensos e horta comunitária",
      "Piscina natural com deck de madeira",
      "Academia ao ar livre",
      "Espaço zen para meditação",
      "Playground ecológico",
      "Segurança 24h discreta",
      "A 300m da praia",
      "Próximo ao Bosque da Barra",
    ],
    endereco: "Estrada do Pontal, 1200, Recreio dos Bandeirantes. Rio de Janeiro - RJ",
    imagens: [
      {
        url: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1200&h=800&fit=crop",
        titulo: "Fachada Integrada à Natureza"
      },
      {
        url: "https://images.unsplash.com/photo-1571055107559-3e67626fa8be?w=1200&h=800&fit=crop",
        titulo: "Vista das Montanhas"
      },
      {
        url: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=1200&h=800&fit=crop",
        titulo: "Área de Lazer Natural"
      },
      {
        url: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=1200&h=800&fit=crop",
        titulo: "Apartamento com Vista Verde"
      },
    ],
    videos: [
      {
        titulo: "Tour Virtual pela Natureza",
        url: "https://www.youtube.com/embed/dQw4w9WgXcQ",
        thumbnail: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&h=600&fit=crop"
      },
    ],
    mapa: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3677.5!2d-43.4821!3d-23.0456!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x9bdb4c8c0fffd%3A0x80d7f8b7a4b8b5dd!2sEstrada%20do%20Pontal%2C%20Recreio%20dos%20Bandeirantes%2C%20Rio%20de%20Janeiro%20-%20RJ!5e0!3m2!1spt-BR!2sbr!4v1640000000000!5m2!1spt-BR!2sbr",
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Cabeçalho */}
      <header className="border-b">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Link
            to="/recreio"
            className="flex items-center text-green-600 hover:text-green-700"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Voltar para todos os lançamentos no Recreio
          </Link>
          <Button variant="ghost" asChild>
            <a href="tel:+552122223333">Contato: (21) 2222-3333</a>
          </Button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-green-900 to-emerald-700 text-white">
        <div className="container mx-auto px-4 py-16 md:py-24">
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
                    className="bg-green-800 bg-opacity-50 rounded-lg p-3 text-center"
                  >
                    <p className="text-sm text-green-200">{item.titulo}</p>
                    <p className="font-semibold text-lg">{item.valor}</p>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <LeadCaptureForm
                nomeLancamento="Paradise"
                redirectTo="/obrigado"
                title="Garanta sua unidade no paraíso!"
                description="Preencha o formulário e nossa equipe entrará em contato com condições especiais"
              />
            </div>
          </div>
        </div>

        <div
          className="absolute inset-0 opacity-20 bg-center bg-cover"
          style={{
            backgroundImage: `url(https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=1200&h=800&fit=crop)`,
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
              Conheça todos os detalhes do Residencial Paradise
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-12">
            <div className="lg:col-span-3">
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
                      <span className="bg-green-600 text-white px-3 py-1 rounded-full text-sm font-medium">
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
                          </div>
                        </DialogContent>
                      </Dialog>
                    </div>
                  </div>
                </AspectRatio>
              </div>
            </div>

            <div className="lg:col-span-1">
              <div className="h-full">
                <h3 className="text-lg font-bold mb-4">
                  Todas as fotos
                </h3>
                <div className="grid grid-cols-2 lg:grid-cols-1 gap-3 max-h-[500px] overflow-y-auto">
                  {empreendimento.imagens.map((img, index) => (
                    <div
                      key={index}
                      className={`relative rounded-lg overflow-hidden cursor-pointer transition-all duration-300 ${
                        imagemAtual === index
                          ? "ring-3 ring-green-500 ring-offset-2"
                          : "hover:shadow-lg"
                      }`}
                      onClick={() => setImagemAtual(index)}
                    >
                      <AspectRatio ratio={4 / 3}>
                        <img
                          src={img.url}
                          alt={img.titulo}
                          className="object-cover w-full h-full"
                        />
                        {imagemAtual === index && (
                          <div className="absolute top-2 right-2">
                            <div className="bg-green-500 text-white rounded-full p-1">
                              <Eye className="w-3 h-3" />
                            </div>
                          </div>
                        )}
                      </AspectRatio>
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
                Um projeto pensado para quem valoriza o contato com a natureza
                sem abrir mão do conforto e da segurança. O Residencial Paradise
                é o equilíbrio perfeito entre sustentabilidade e modernidade.
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
            Localização Privilegiada no Recreio
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <p className="text-gray-700 text-lg">
                Situado na Estrada do Pontal, o Residencial Paradise está
                estrategicamente localizado entre a natureza preservada e as
                comodidades urbanas do Recreio dos Bandeirantes.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="text-center p-4 bg-white rounded-lg shadow">
                  <Trees className="w-8 h-8 text-green-500 mx-auto mb-2" />
                  <p className="font-semibold">Área Preservada</p>
                </div>
                <div className="text-center p-4 bg-white rounded-lg shadow">
                  <Mountain className="w-8 h-8 text-blue-500 mx-auto mb-2" />
                  <p className="font-semibold">Vista das Montanhas</p>
                </div>
                <div className="text-center p-4 bg-white rounded-lg shadow">
                  <Heart className="w-8 h-8 text-red-500 mx-auto mb-2" />
                  <p className="font-semibold">Qualidade de Vida</p>
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
                title="Localização do Residencial Paradise"
              ></iframe>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section className="py-16 bg-green-700 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Viva o Paraíso no Recreio!
            </h2>
            <p className="text-lg md:text-xl mb-8">
              Garanta já sua unidade no Residencial Paradise com condições especiais de lançamento.
            </p>

            <div className="max-w-md mx-auto">
              <LeadCaptureForm
                nomeLancamento="Paradise"
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
          nome: "no Recreio dos Bandeirantes",
          path: "/recreio"
        }}
      />
    </div>
  );
};

export default LandingParadise;
