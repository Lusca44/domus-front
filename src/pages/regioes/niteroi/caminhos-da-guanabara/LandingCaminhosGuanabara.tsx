import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  MapPin, 
  Home, 
  Users, 
  Car, 
  Waves, 
  Building2, 
  Ship, 
  Anchor,
  ArrowLeft
} from "lucide-react";
import PhotoCarousel from "@/components/PhotoCarousel";
import LeadCaptureForm from "@/components/LeadCaptureForm";
import fotos from "./assets/fotos";
import Footer from "@/components/Footer";
import Header from "@/components/Header";

const LandingCaminhosGuanabara = () => {
  // TODO: Substituir por imagem real do empreendimento
  const backgroundImage = "/assets/lancamentos/caminhos-da-guanabara/background-caminhos-da-guanabara.jpg";

  const amenidades = [
    { nome: "Bicicletário", icone: "🚲" },
    { nome: "Churrasqueira", icone: "🔥" },
    { nome: "Coworking", icone: "💻" },
    { nome: "Espaço Gourmet", icone: "🍽️" },
    { nome: "Fitness", icone: "💪" },
    { nome: "Lavanderia", icone: "🧺" },
    { nome: "Pet Care", icone: "🐾" },
    { nome: "Piscina", icone: "🏊" },
    { nome: "Playground", icone: "🎪" },
    { nome: "Salão de Festas", icone: "🎉" },
    { nome: "Salão de Jogos", icone: "🎮" },
    { nome: "Sauna", icone: "🧖" },
  ];

  const plantas = [
    {
      tipo: "Studio",
      area: "38m²",
      descricao: "Aconchego e praticidade em um só lugar"
    },
    {
      tipo: "2 Quartos",
      area: "58m²",
      descricao: "Conforto e espaço para toda a família"
    }
  ];

  const referenciasMapa = [
    "A 5 minutos do Centro de Niterói",
    "Próximo à estação das Barcas",
    "Fácil acesso ao Rio de Janeiro",
    "Perto de supermercados e shoppings",
    "Região com diversas opções de lazer",
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Header com botão voltar */}
      <Header />

      {/* Background Hero Section */}
      <div
        className="relative h-screen bg-cover bg-center bg-no-repeat pt-16"
        style={{ backgroundImage: `url(${backgroundImage})` }}
      >
        {/* Overlay com gradiente marinho */}
        <div className="absolute inset-0 bg-gradient-to-r from-slate-900/80 via-blue-900/70 to-slate-800/60"></div>

        {/* Conteúdo Hero */}
        <div className="relative z-10 flex items-center justify-center h-full">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              {/* Coluna Esquerda - Informações */}
              <div className="text-white space-y-8">
                <div className="space-y-4">
                  <div className="flex items-center gap-2 text-blue-300">
                    <Ship className="w-5 h-5" />
                    <span className="text-sm font-medium tracking-wide">
                      NITERÓI
                    </span>
                  </div>

                  <h1 className="text-5xl lg:text-7xl font-bold bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">
                    Caminhos da Guanabara
                  </h1>

                  <p className="text-xl lg:text-2xl text-blue-100 font-light">
                    Um novo jeito de viver Niterói
                  </p>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center gap-3 text-blue-200">
                    <MapPin className="w-5 h-5 flex-shrink-0" />
                    <span className="text-lg">
                      Rua Visconde do Rio Branco, Niterói
                    </span>
                  </div>

                  <div className="flex items-center gap-3 text-blue-200">
                    <Building2 className="w-5 h-5 flex-shrink-0" />
                    <span className="text-lg">
                      Projeto de João Niemeyer
                    </span>
                  </div>
                </div>

                {/* Tags de destaque */}
                <div className="flex flex-wrap gap-3">
                  <Badge
                    variant="secondary"
                    className="bg-blue-600/80 text-white border-blue-400 text-sm py-2 px-4"
                  >
                    <Anchor className="w-4 h-4 mr-2" />
                    Lazer Completo
                  </Badge>
                  <Badge
                    variant="secondary"
                    className="bg-blue-700/80 text-white border-slate-400 text-sm py-2 px-4"
                  >
                    <Home className="w-4 h-4 mr-2" />
                    Studios e 2 Quartos
                  </Badge>
                  <Badge
                    variant="secondary"
                    className="bg-blue-700/80 text-white border-blue-500 text-sm py-2 px-4"
                  >
                    <Waves className="w-4 h-4 mr-2" />
                    Vista Baía de Guanabara
                  </Badge>
                </div>

                {/* Botão CTA */}
                <Button
                  size="lg"
                  className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 py-4 text-lg shadow-2xl hover:shadow-blue-500/25 transition-all duration-300"
                  onClick={() =>
                    document
                      .getElementById("interesse")
                      ?.scrollIntoView({ behavior: "smooth" })
                  }
                >
                  <Ship className="w-5 h-5 mr-2" />
                  Quero Conhecer Caminhos da Guanabara
                </Button>
              </div>

              {/* Coluna Direita - Form de Interesse */}
              <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-8 shadow-2xl border border-white/20">
                <LeadCaptureForm
                  nomeLancamento="Caminhos da Guanabara"
                  title="Garanta sua unidade"
                  description="Preencha seus dados e receba informações exclusivas sobre o Caminhos da Guanabara"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Seção Galeria de Fotos e Vídeos */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-slate-800 mb-4">
              Conheça Caminhos da Guanabara
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Arquitetura contemporânea que se integra à paisagem de Niterói,
              conectando você ao melhor da cidade.
            </p>
          </div>

          <PhotoCarousel photos={fotos} />
        </div>
      </section>

      {/* Seção Plantas e Tipologias */}
      <section className="py-16 lg:py-24 bg-gradient-to-br from-slate-50 to-blue-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-slate-800 mb-4">
              Plantas Inteligentes
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Studios e 2 Quartos, pensados para o seu estilo de vida
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {plantas.map((planta, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-slate-100"
              >
                <div className="text-center space-y-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-slate-600 rounded-full flex items-center justify-center mx-auto">
                    <Home className="w-8 h-8 text-white" />
                  </div>

                  <div>
                    <h3 className="text-xl font-bold text-slate-800">
                      {planta.tipo}
                    </h3>
                    <p className="text-2xl font-bold text-blue-600 mt-1">
                      {planta.area}
                    </p>
                  </div>

                  <p className="text-slate-600 text-sm">{planta.descricao}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Seção Amenidades */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-slate-800 mb-4">
              Lazer e Conforto
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Desfrute de momentos únicos com a sua família e amigos
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {amenidades.map((amenidade, index) => (
              <div key={index} className="text-center group">
                <div className="w-20 h-20 bg-gradient-to-br from-blue-100 to-slate-100 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300 border-2 border-blue-200/50">
                  <span className="text-3xl">{amenidade.icone}</span>
                </div>
                <h3 className="font-semibold text-slate-800">
                  {amenidade.nome}
                </h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Seção Localização */}
      <section className="py-16 lg:py-24 bg-gradient-to-br from-slate-800 to-blue-900 text-white">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div>
                <h2 className="text-3xl lg:text-4xl font-bold mb-4">
                  Localização Privilegiada
                </h2>
                <p className="text-lg text-blue-100 leading-relaxed">
                  More perto de tudo que Niterói tem de melhor, com fácil
                  acesso ao Rio de Janeiro.
                </p>
              </div>

              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-blue-200">
                  Referenciais Próximos:
                </h3>
                <div className="grid grid-cols-1 gap-3">
                  {referenciasMapa.map((referencia, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                      <span className="text-blue-100">{referencia}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex items-center gap-3 text-blue-200">
                <Car className="w-5 h-5" />
                <span>
                  Acesso facilitado via transporte público e particular
                </span>
              </div>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
              <div className="w-full h-96 rounded-xl overflow-hidden">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3679.5684547593776!2d-43.12444892469393!3d-22.81044737918346!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x997f747343997f%3A0x4b9e62965044f51b!2sR.%20Visc.%20do%20Rio%20Branco%2C%20451%20-%20Centro%2C%20Niter%C3%B3i%20-%20RJ%2C%2024020-007!5e0!3m2!1spt-BR!2sbr!4v1715053484978!5m2!1spt-BR!2sbr"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Localização do Caminhos da Guanabara"
                  className="w-full h-full rounded-xl"
                ></iframe>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Seção Formulário de Interesse */}
      <section
        id="interesse"
        className="py-16 lg:py-24 bg-gradient-to-br from-blue-50 to-slate-50"
      >
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl lg:text-4xl font-bold text-slate-800 mb-4">
                Tenho Interesse no Caminhos da Guanabara
              </h2>
              <p className="text-lg text-slate-600">
                Preencha o formulário e nossa equipe entrará em contato com
                informações exclusivas
              </p>
            </div>

            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                <div className="bg-white rounded-2xl p-8 shadow-lg">
                  <LeadCaptureForm
                    nomeLancamento="Caminhos da Guanabara"
                    title="Receba informações exclusivas"
                    description="Nossa equipe especializada entrará em contato em breve"
                  />
                </div>
              </div>

              <div className="space-y-8">
                <div className="space-y-6">
                  <h3 className="text-2xl font-bold text-slate-800">
                    Por que escolher Caminhos da Guanabara?
                  </h3>

                  <div className="space-y-4">
                    <div className="flex items-start gap-4">
                      <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                        <span className="text-white text-sm">✓</span>
                      </div>
                      <div>
                        <h4 className="font-semibold text-slate-800">
                          Localização Estratégica
                        </h4>
                        <p className="text-slate-600">
                          No coração de Niterói, próximo a tudo
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                        <span className="text-white text-sm">✓</span>
                      </div>
                      <div>
                        <h4 className="font-semibold text-slate-800">
                          Design Moderno
                        </h4>
                        <p className="text-slate-600">
                          Arquitetura que valoriza o seu estilo
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                        <span className="text-white text-sm">✓</span>
                      </div>
                      <div>
                        <h4 className="font-semibold text-slate-800">
                          Lazer Completo
                        </h4>
                        <p className="text-slate-600">
                          Diversão garantida para toda a família
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-r from-blue-600 to-slate-600 rounded-2xl p-6 text-white">
                  <div className="flex items-center gap-4">
                    <Users className="w-8 h-8" />
                    <div>
                      <h4 className="font-semibold">
                        Atendimento Personalizado
                      </h4>
                      <p className="text-blue-100">
                        Nossa equipe está pronta para atendê-lo
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer  />
    </div>
  );
};

export default LandingCaminhosGuanabara;
