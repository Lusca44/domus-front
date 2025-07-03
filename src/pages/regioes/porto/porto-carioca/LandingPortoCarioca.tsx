
import React from "react";
import { Link } from "react-router-dom";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
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
} from "lucide-react";
import LeadCaptureForm from "@/components/LeadCaptureForm";
import Footer from "@/components/Footer";
import PhotoCarousel from "@/components/PhotoCarousel";
import fotos from "./assets/fotos";
import fotomontagem from './assets/img/emccamp - porto - fotomontagem a.jpg';

/**
 * Landing Page - Porto Carioca Residencial
 *
 * Esta página apresenta informações detalhadas sobre o empreendimento
 * Porto Carioca Residencial com um layout diferenciado e moderno.
 */
const LandingPortoCarioca = () => {
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
    mapa: "https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d7350.69197335138!2d-43.208164!3d-22.900606000000003!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x997f36dc8775b9%3A0xca5025e6d4a2a39a!2sPorto%20Carioca%20-%20Emccamp!5e0!3m2!1spt-BR!2sbr!4v1751558926239!5m2!1spt-BR!2sbr%22"
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Cabeçalho */}
      <header className="border-b bg-white/95 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Link
            to="/"
            className="flex items-center text-blue-600 hover:text-blue-700 transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Voltar para início
          </Link>
          <Button variant="ghost" asChild>
            <a href="tel:+552122223333" className="font-semibold">
              Contato: (21) 2222-3333
            </a>
          </Button>
        </div>
      </header>

      {/* Hero Section com Background Image */}
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

        <div className="container mx-auto px-4 py-16 relative z-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center min-h-[80vh]">
            {/* Coluna de Conteúdo - Maior */}
            <div className="lg:col-span-7 space-y-6 lg:space-y-8">
              <div className="space-y-4">
                <div className="inline-flex items-center px-4 py-2 bg-blue-500/30 backdrop-blur-sm rounded-full text-blue-200 text-sm font-medium border border-blue-400/30">
                  <Building className="w-4 h-4 mr-2" />
                  Lançamento Exclusivo
                </div>
                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight">
                  {empreendimento.nome}
                </h1>
                <p className="text-lg sm:text-xl md:text-2xl text-blue-200 font-light">
                  {empreendimento.slogan}
                </p>
              </div>

              <div className="flex items-start text-blue-100">
                <MapPin className="w-5 h-5 mr-3 mt-1 text-blue-400 flex-shrink-0" />
                <p className="text-base lg:text-lg">{empreendimento.endereco}</p>
              </div>

              <div className="bg-white/15 backdrop-blur-sm rounded-xl p-4 lg:p-6 border border-white/20 shadow-xl">
                <p className="text-xl lg:text-2xl font-bold text-white mb-4">
                  {empreendimento.entrega}
                </p>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 lg:gap-4">
                  {empreendimento.caracteristicas.map((item, index) => {
                    const IconComponent = item.icone;
                    return (
                      <div key={index} className="text-center">
                        <div className="bg-blue-500/25 backdrop-blur-sm rounded-lg p-3 mb-2 mx-auto w-fit border border-blue-400/30">
                          <IconComponent className="w-5 h-5 lg:w-6 lg:h-6 text-blue-300" />
                        </div>
                        <p className="text-xs text-blue-200">{item.titulo}</p>
                        <p className="font-semibold text-white text-sm">{item.valor}</p>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Coluna do Formulário - Menor */}
            <div className="lg:col-span-5">
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

      {/* Seção Sobre o Empreendimento */}
      <section className="py-16 lg:py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center mb-12 lg:mb-16">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 lg:mb-6 text-gray-900">
              Um novo conceito de morar no Rio
            </h2>
            <p className="text-base lg:text-lg text-gray-700 leading-relaxed">
              {empreendimento.descricao}
            </p>
          </div>

          {/* Cards de Destaques */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 mb-12 lg:mb-16">
            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
              <CardContent className="p-6 lg:p-8 text-center">
                <div className="bg-blue-100 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                  <Waves className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="text-lg lg:text-xl font-bold mb-3">Lazer Completo</h3>
                <p className="text-sm lg:text-base text-gray-600">
                  Rooftop, piscinas, academia e muito mais para sua diversão
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
              <CardContent className="p-6 lg:p-8 text-center">
                <div className="bg-green-100 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                  <TreePine className="w-8 h-8 text-green-600" />
                </div>
                <h3 className="text-lg lg:text-xl font-bold mb-3">Localização Premium</h3>
                <p className="text-sm lg:text-base text-gray-600">
                  No coração da revitalização do Porto Maravilha
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
              <CardContent className="p-6 lg:p-8 text-center">
                <div className="bg-purple-100 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                  <Users className="w-8 h-8 text-purple-600" />
                </div>
                <h3 className="text-lg lg:text-xl font-bold mb-3">Conveniência</h3>
                <p className="text-sm lg:text-base text-gray-600">
                  Área comercial integrada e serviços no próprio condomínio
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Seção de Galeria */}
      <section className="py-16 lg:py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12 lg:mb-16">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 text-gray-900">
              Conheça cada detalhe
            </h2>
            <p className="text-base lg:text-lg text-gray-600 max-w-2xl mx-auto">
              Explore todas as áreas e ambientes que farão parte do seu novo estilo de vida
            </p>
          </div>

          <PhotoCarousel 
            photos={empreendimento.imagens}
            className="mb-12 lg:mb-16"
          />
        </div>
      </section>

      {/* Seção de Diferenciais */}
      <section className="py-16 lg:py-20 bg-slate-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-6 lg:mb-8 text-gray-900">
                Diferenciais únicos
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 lg:gap-4">
                {empreendimento.diferenciais.map((item, index) => (
                  <div key={index} className="flex items-start group">
                    <CheckCircle className="w-5 h-5 text-green-500 mr-3 flex-shrink-0 mt-0.5 group-hover:scale-110 transition-transform" />
                    <span className="text-sm lg:text-base text-gray-700 group-hover:text-gray-900 transition-colors">
                      {item}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-gradient-to-br from-blue-600 to-blue-800 rounded-2xl p-6 lg:p-8 text-white">
              <h3 className="text-xl lg:text-2xl font-bold mb-4 lg:mb-6">Por que escolher o Porto Carioca?</h3>
              <ul className="space-y-3 lg:space-y-4">
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-blue-300 rounded-full mr-3 flex-shrink-0"></div>
                  <span className="text-sm lg:text-base">Região em plena valorização imobiliária</span>
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-blue-300 rounded-full mr-3 flex-shrink-0"></div>
                  <span className="text-sm lg:text-base">Proximidade com principais pontos turísticos</span>
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-blue-300 rounded-full mr-3 flex-shrink-0"></div>
                  <span className="text-sm lg:text-base">Excelente conectividade urbana</span>
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-blue-300 rounded-full mr-3 flex-shrink-0"></div>
                  <span className="text-sm lg:text-base">Projeto arquitetônico diferenciado</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Localização */}
      <section className="py-16 lg:py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12 lg:mb-16">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 text-gray-900">
              Localização Estratégica
            </h2>
            <p className="text-base lg:text-lg text-gray-600 max-w-3xl mx-auto">
              Posicionado no epicentro da transformação urbana do Rio de Janeiro
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            <div className="space-y-6">
              <div className="bg-blue-50 rounded-xl p-4 lg:p-6">
                <h3 className="text-lg lg:text-xl font-bold mb-4 text-blue-900">Facilidades da Localização:</h3>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-blue-500 mr-3 flex-shrink-0 mt-0.5" />
                    <span className="text-sm lg:text-base text-gray-700">Em frente ao futuro estádio do Flamengo</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-blue-500 mr-3 flex-shrink-0 mt-0.5" />
                    <span className="text-sm lg:text-base text-gray-700">Hospital da Gamboa - 1,2 km</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-blue-500 mr-3 flex-shrink-0 mt-0.5" />
                    <span className="text-sm lg:text-base text-gray-700">Supermercado Supermarket - 850 m</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-blue-500 mr-3 flex-shrink-0 mt-0.5" />
                    <span className="text-sm lg:text-base text-gray-700">Escolas</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-blue-500 mr-3 flex-shrink-0 mt-0.5" />
                    <span className="text-sm lg:text-base text-gray-700">Próximo ao VLT e estação de metrô</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-blue-500 mr-3 flex-shrink-0 mt-0.5" />
                    <span className="text-sm lg:text-base text-gray-700">Academias</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-blue-500 mr-3 flex-shrink-0 mt-0.5" />
                    <span className="text-sm lg:text-base text-gray-700">Farmácias</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-blue-500 mr-3 flex-shrink-0 mt-0.5" />
                    <span className="text-sm lg:text-base text-gray-700">Hortifruti</span>
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
                className="w-full h-80 lg:h-96"
              ></iframe>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section className="py-16 lg:py-20 bg-gradient-to-r from-blue-600 to-blue-800 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 lg:mb-6">
              Sua nova vida no Porto Maravilha começa aqui
            </h2>
            <p className="text-lg lg:text-xl mb-8 lg:mb-12 text-blue-100">
              Não perca a oportunidade de fazer parte da maior transformação urbana do Rio de Janeiro
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 items-center">
              <div className="space-y-4 lg:space-y-6">
                <div className="text-left">
                  <h3 className="text-xl lg:text-2xl font-bold mb-4">Condições Especiais de Lançamento:</h3>
                  <ul className="space-y-2 text-blue-100">
                    <li className="text-sm lg:text-base">• Entrada facilitada</li>
                    <li className="text-sm lg:text-base">• Financiamento direto com a construtora</li>
                    <li className="text-sm lg:text-base">• Desconto especial para pagamento à vista</li>
                    <li className="text-sm lg:text-base">• Parcelas durante a obra</li>
                  </ul>
                </div>
              </div>

              <div className="bg-white/15 backdrop-blur-sm rounded-2xl p-4 lg:p-6 border border-white/20">
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
      <Footer
        empreendimentoNome={empreendimento.nome}
        empreendimentoEndereco={empreendimento.endereco}
        regiao={{
          nome: "no Porto Maravilha",
          path: "/",
        }}
      />
    </div>
  );
};

export default LandingPortoCarioca;
