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
import Footer from "@/components/Footer";
import { fotosAmericas19 } from "./assets/fotos";

const LandingAmericas19 = () => {
  // TODO: Substituir por imagem real do empreendimento
  const backgroundImage = "/assets/lancamentos/americas19/background-americas19.jpg";

  const diferenciais = [
    { nome: "Piscina Adulto e Infantil", icone: "🏊" },
    { nome: "Espaço Gourmet", icone: "🍽️" },
    { nome: "Academia", icone: "🏋️" },
    { nome: "Brinquedoteca", icone: "🧸" },
    { nome: "Salão de Festas", icone: "🎉" },
    { nome: "Espaço Coworking", icone: "💻" },
  ];

  const plantas = [
    {
      tipo: "2 Quartos",
      area: "58m² a 62m²",
      descricao: "Conforto e espaço para toda a família",
    },
    {
      tipo: "3 Quartos",
      area: "72m² a 78m²",
      descricao: "Ideal para quem busca mais espaço",
    },
    {
      tipo: "4 Quartos",
      area: "90m² a 95m²",
      descricao: "Luxo e exclusividade em cada detalhe",
    },
  ];

  const referenciasMapa = [
    "Shopping centers",
    "Restaurantes renomados",
    "Escolas e universidades",
    "Hospitais e clínicas",
    "Parques e áreas de lazer",
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
                      RECREIO DOS BANDEIRANTES
                    </span>
                  </div>

                  <h1 className="text-5xl lg:text-7xl font-bold bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">
                    Américas 19
                  </h1>

                  <p className="text-xl lg:text-2xl text-blue-100 font-light">
                    O melhor jeito de viver no Recreio
                  </p>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center gap-3 text-blue-200">
                    <MapPin className="w-5 h-5 flex-shrink-0" />
                    <span className="text-lg">
                      Avenida das Américas, Recreio dos Bandeirantes
                    </span>
                  </div>

                  <div className="flex items-center gap-3 text-blue-200">
                    <Building2 className="w-5 h-5 flex-shrink-0" />
                    <span className="text-lg">
                      Projeto de Arquitetura Contemporânea
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
                    Varanda Gourmet
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
                  Quero Conhecer o Américas 19
                </Button>
              </div>

              {/* Coluna Direita - Form de Interesse */}
              <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-8 shadow-2xl border border-white/20">
                <LeadCaptureForm
                  nomeLancamento="Américas 19"
                  title="Garanta sua unidade"
                  description="Preencha seus dados e receba informações exclusivas sobre o Américas 19"
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
              Conheça o Américas 19
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Viva em um dos endereços mais desejados do Recreio, com
              infraestrutura completa e design inovador.
            </p>
          </div>

          <PhotoCarousel photos={[...fotosAmericas19]} />
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
              Escolha a planta que se adapta ao seu estilo de vida, com opções
              de 2, 3 e 4 quartos.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
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
              Desfrute de momentos inesquecíveis com a família e amigos em
              espaços pensados para o seu bem-estar.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {diferenciais.map((diferencial, index) => (
              <div key={index} className="text-center group">
                <div className="w-20 h-20 bg-gradient-to-br from-blue-100 to-slate-100 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300 border-2 border-blue-200/50">
                  <span className="text-3xl">{diferencial.icone}</span>
                </div>
                <h3 className="font-semibold text-slate-800">
                  {diferencial.nome}
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
                  More no melhor ponto do Recreio, próximo a tudo que você
                  precisa para viver com praticidade e conforto.
                </p>
              </div>

              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-blue-200">
                  Próximo a:
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
                  Fácil acesso a transporte público e principais vias da região
                </span>
              </div>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
              <div className="w-full h-96 rounded-xl overflow-hidden">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3673.449447424948!2d-43.47180272468866!3d-23.00494427917334!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x9bdb1d38fff333%3A0x4635b53979a9a9a7!2sAv.%20das%20Am%C3%A9ricas%2C%2019%20-%20Recreio%20dos%20Bandeirantes%2C%20Rio%20de%20Janeiro%20-%20RJ%2C%2022790-701!5e0!3m2!1spt-BR!2sbr!4v1751972099394!5m2!1spt-BR!2sbr"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Localização do Américas 19"
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
                Tenho Interesse no Américas 19
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
                    nomeLancamento="Américas 19"
                    title="Receba informações exclusivas"
                    description="Nossa equipe especializada entrará em contato em breve"
                  />
                </div>
              </div>

              <div className="space-y-8">
                <div className="space-y-6">
                  <h3 className="text-2xl font-bold text-slate-800">
                    Por que escolher o Américas 19?
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
                          Infraestrutura Completa
                        </h4>
                        <p className="text-slate-600">
                          Lazer e comodidade para toda a família
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                        <span className="text-white text-sm">✓</span>
                      </div>
                      <div>
                        <h4 className="font-semibold text-slate-800">
                          Acabamentos de Alto Padrão
                        </h4>
                        <p className="text-slate-600">
                          Qualidade e sofisticação em cada detalhe
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
      <Footer isHomePage={false} />
    </div>
  );
};

export default LandingAmericas19;
