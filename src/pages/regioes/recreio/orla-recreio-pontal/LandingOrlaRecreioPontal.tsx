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
import { fotosCarrossel } from "./assets/fotos";
import Footer from "@/components/Footer";
import Header from "@/components/Header";


const LandingOrlaRecreioPontal = () => {
  // TODO: Substituir por imagem real do empreendimento
  const backgroundImage = "/assets/lancamentos/orla-recreio-pontal/background-orla-recreio-pontal.jpg";

  const amenidades = [
    { nome: "Churrasqueira", icone: "🔥" },
    { nome: "Salão de Festas", icone: "🎉" },
    { nome: "Playground", icone: "🎪" },
    { nome: "Coworking", icone: "💻" },
    { nome: "Lavanderia", icone: "🧺" },
    { nome: "Piscina", icone: "🏊" },
  ];

  const plantas = [
    {
      tipo: "Studio",
      area: "32.44m²",
      descricao: "Ambiente integrado e funcional",
    },
    {
      tipo: "1 Quarto",
      area: "38.99m²",
      descricao: "Conforto e praticidade",
    },
    {
      tipo: "2 Quartos",
      area: "38.58m²",
      descricao: "Ideal para famílias",
    },
    {
      tipo: "Garden",
      area: "59.08m²",
      descricao: "Espaço exclusivo com jardim",
    }
  ];

  const referenciasMapa = [
    "Praia do Pontal",
    "Avenida das Américas",
    "Recreio Shopping",
    "Barra da Tijuca",
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
                    <Waves className="w-5 h-5" />
                    <span className="text-sm font-medium tracking-wide">
                      RECREIO DOS BANDEIRANTES
                    </span>
                  </div>

                  <h1 className="text-5xl lg:text-7xl font-bold bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">
                    Orla Recreio Pontal
                  </h1>

                  <p className="text-xl lg:text-2xl text-blue-100 font-light">
                    Viva o ano inteiro como em férias
                  </p>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center gap-3 text-blue-200">
                    <MapPin className="w-5 h-5 flex-shrink-0" />
                    <span className="text-lg">
                      Recreio dos Bandeirantes, Rio de Janeiro
                    </span>
                  </div>

                  <div className="flex items-center gap-3 text-blue-200">
                    <Building2 className="w-5 h-5 flex-shrink-0" />
                    <span className="text-lg">
                      Projeto de Érico Franco Guimarães
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
                    Garden
                  </Badge>
                  <Badge
                    variant="secondary"
                    className="bg-blue-700/80 text-white border-blue-500 text-sm py-2 px-4"
                  >
                    <Waves className="w-4 h-4 mr-2" />
                    Vista Mar
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
                  Quero Conhecer o Orla Recreio
                </Button>
              </div>

              {/* Coluna Direita - Form de Interesse */}
              <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-8 shadow-2xl border border-white/20">
                <LeadCaptureForm
                  nomeLancamento="Orla Recreio Pontal"
                  title="Garanta sua unidade"
                  description="Preencha seus dados e receba informações exclusivas sobre o Orla Recreio Pontal"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Botão voltar ao topo */}
        <div className="absolute top-6 left-6">
          <Button
            variant="ghost"
            size="sm"
            asChild
            className="text-white hover:bg-white/20"
          >
            <Link to="/">← Voltar à Home</Link>
          </Button>
        </div>
      </div>

      {/* Seção Galeria de Fotos e Vídeos */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-slate-800 mb-4">
              Conheça o Orla Recreio Pontal
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Arquitetura contemporânea no coração do Recreio dos Bandeirantes,
              conectando você ao melhor do Rio de Janeiro.
            </p>
          </div>

          <PhotoCarousel photos={fotosCarrossel} />
        </div>
      </section>

      {/* Seção Plantas e Tipologias */}
      <section className="py-16 lg:py-24 bg-gradient-to-br from-slate-50 to-blue-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-slate-800 mb-4">
              Plantas Exclusivas
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Do Studio ao Garden, encontre a opção perfeita para o seu estilo
              de vida
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
              Lazer Completo
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Amenidades pensadas para proporcionar qualidade de vida e
              bem-estar
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
                  Localização Estratégica
                </h2>
                <p className="text-lg text-blue-100 leading-relaxed">
                  No coração do Recreio dos Bandeirantes, conectado aos
                  principais pontos do Rio de Janeiro com mobilidade urbana
                  excepcional.
                </p>
              </div>

              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-blue-200">
                  Pontos de Referência:
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
                  src="https://www.google.com/maps/embed?pb=!1m16!1m12!1m3!1d3671.8443804853187!2d-43.48421922468586!3d-23.029485429168957!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!2m1!1sR.%20Z%C3%A9lio%20Valverde%2C%20s%2Fn%C2%BA%2C%20Recreio.%20Rio%20de%20Janeiro%20-%20RJ!5e0!3m2!1spt-BR!2sbr!4v1751989579777!5m2!1spt-BR!2sbr"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Localização do Orla Recreio Pontal"
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
                Tenho Interesse no Orla Recreio Pontal
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
                    nomeLancamento="Orla Recreio Pontal"
                    title="Receba informações exclusivas"
                    description="Nossa equipe especializada entrará em contato em breve"
                  />
                </div>
              </div>

              <div className="space-y-8">
                <div className="space-y-6">
                  <h3 className="text-2xl font-bold text-slate-800">
                    Por que escolher o Orla Recreio Pontal?
                  </h3>

                  <div className="space-y-4">
                    <div className="flex items-start gap-4">
                      <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                        <span className="text-white text-sm">✓</span>
                      </div>
                      <div>
                        <h4 className="font-semibold text-slate-800">
                          Localização Premium
                        </h4>
                        <p className="text-slate-600">
                          No coração do Recreio, próximo a tudo
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                        <span className="text-white text-sm">✓</span>
                      </div>
                      <div>
                        <h4 className="font-semibold text-slate-800">
                          Construtora CURY
                        </h4>
                        <p className="text-slate-600">
                          Tradição e qualidade comprovadas
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                        <span className="text-white text-sm">✓</span>
                      </div>
                      <div>
                        <h4 className="font-semibold text-slate-800">
                          Opções Flexíveis
                        </h4>
                        <p className="text-slate-600">
                          Do Studio ao Garden, para todos os perfis
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
                        Atendimento Especializado
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
      <Footer />
    </div>
  );
};

export default LandingOrlaRecreioPontal;
