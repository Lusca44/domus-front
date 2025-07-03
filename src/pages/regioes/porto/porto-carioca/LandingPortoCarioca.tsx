
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
    mapa: "https://www.google.com/maps/embed?pb=!1m21!1m12!1m3!1d14431.125032052134!2d-43.211162307681796!3d-22.904241560534498!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!4m6!3e6!4m0!4m3!3m2!1d-22.9044362!2d-43.208009499999996!5e0!3m2!1spt-BR!2sbr!4v1749758760039!5m2!1spt-BR!2sbr",
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Cabeçalho */}
      <header className="border-b bg-white sticky top-0 z-50">
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

      {/* Hero Section com Layout Diferenciado */}
      <section className="relative min-h-screen flex items-center bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-transparent" />
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl" />
        </div>

        <div className="container mx-auto px-4 py-16 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Coluna de Conteúdo - Maior */}
            <div className="lg:col-span-7 space-y-8">
              <div className="space-y-4">
                <div className="inline-flex items-center px-4 py-2 bg-blue-500/20 rounded-full text-blue-300 text-sm font-medium backdrop-blur-sm">
                  <Building className="w-4 h-4 mr-2" />
                  Lançamento Exclusivo
                </div>
                <h1 className="text-4xl md:text-6xl font-bold text-white leading-tight">
                  {empreendimento.nome}
                </h1>
                <p className="text-xl md:text-2xl text-blue-200 font-light">
                  {empreendimento.slogan}
                </p>
              </div>

              <div className="flex items-start text-blue-100">
                <MapPin className="w-5 h-5 mr-3 mt-1 text-blue-400 flex-shrink-0" />
                <p className="text-lg">{empreendimento.endereco}</p>
              </div>

              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                <p className="text-2xl font-bold text-white mb-4">
                  {empreendimento.entrega}
                </p>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {empreendimento.caracteristicas.map((item, index) => {
                    const IconComponent = item.icone;
                    return (
                      <div key={index} className="text-center">
                        <div className="bg-blue-500/20 rounded-lg p-3 mb-2 mx-auto w-fit">
                          <IconComponent className="w-6 h-6 text-blue-300" />
                        </div>
                        <p className="text-xs text-blue-200">{item.titulo}</p>
                        <p className="font-semibold text-white">{item.valor}</p>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Coluna do Formulário - Menor */}
            <div className="lg:col-span-5">
              <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-2xl border border-white/20">
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
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900">
              Um novo conceito de morar no Rio
            </h2>
            <p className="text-lg text-gray-700 leading-relaxed">
              {empreendimento.descricao}
            </p>
          </div>

          {/* Cards de Destaques */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
              <CardContent className="p-8 text-center">
                <div className="bg-blue-100 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                  <Waves className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-bold mb-3">Lazer Completo</h3>
                <p className="text-gray-600">
                  Rooftop, piscinas, academia e muito mais para sua diversão
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
              <CardContent className="p-8 text-center">
                <div className="bg-green-100 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                  <TreePine className="w-8 h-8 text-green-600" />
                </div>
                <h3 className="text-xl font-bold mb-3">Localização Premium</h3>
                <p className="text-gray-600">
                  No coração da revitalização do Porto Maravilha
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
              <CardContent className="p-8 text-center">
                <div className="bg-purple-100 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                  <Users className="w-8 h-8 text-purple-600" />
                </div>
                <h3 className="text-xl font-bold mb-3">Conveniência</h3>
                <p className="text-gray-600">
                  Área comercial integrada e serviços no próprio condomínio
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Seção de Galeria */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">
              Conheça cada detalhe
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Explore todas as áreas e ambientes que farão parte do seu novo estilo de vida
            </p>
          </div>

          <PhotoCarousel 
            photos={empreendimento.imagens}
            className="mb-16"
          />
        </div>
      </section>

      {/* Seção de Diferenciais */}
      <section className="py-20 bg-slate-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-8 text-gray-900">
                Diferenciais únicos
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {empreendimento.diferenciais.map((item, index) => (
                  <div key={index} className="flex items-start group">
                    <CheckCircle className="w-5 h-5 text-green-500 mr-3 flex-shrink-0 mt-0.5 group-hover:scale-110 transition-transform" />
                    <span className="text-gray-700 group-hover:text-gray-900 transition-colors">
                      {item}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-gradient-to-br from-blue-600 to-blue-800 rounded-2xl p-8 text-white">
              <h3 className="text-2xl font-bold mb-6">Por que escolher o Porto Carioca?</h3>
              <ul className="space-y-4">
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-blue-300 rounded-full mr-3"></div>
                  <span>Região em plena valorização imobiliária</span>
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-blue-300 rounded-full mr-3"></div>
                  <span>Proximidade com principais pontos turísticos</span>
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-blue-300 rounded-full mr-3"></div>
                  <span>Excelente conectividade urbana</span>
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-blue-300 rounded-full mr-3"></div>
                  <span>Projeto arquitetônico diferenciado</span>
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
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">
              Localização Estratégica
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Posicionado no epicentro da transformação urbana do Rio de Janeiro
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <div className="bg-blue-50 rounded-xl p-6">
                <h3 className="text-xl font-bold mb-4 text-blue-900">Principais Atrações Próximas:</h3>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-blue-500 mr-3 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">5 min do Museu do Amanhã</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-blue-500 mr-3 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">10 min do MAR (Museu de Arte do Rio)</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-blue-500 mr-3 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">15 min do Centro Histórico</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-blue-500 mr-3 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">Próximo ao VLT e estação de metrô</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-blue-500 mr-3 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">Acesso rápido à Zona Sul</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="rounded-2xl overflow-hidden shadow-2xl">
              <iframe
                src={empreendimento.mapa}
                width="100%"
                height="450"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Localização do Porto Carioca Residencial"
                className="w-full"
              ></iframe>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-blue-800 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-5xl font-bold mb-6">
              Sua nova vida no Porto Maravilha começa aqui
            </h2>
            <p className="text-xl mb-12 text-blue-100">
              Não perca a oportunidade de fazer parte da maior transformação urbana do Rio de Janeiro
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                <div className="text-left">
                  <h3 className="text-2xl font-bold mb-4">Condições Especiais de Lançamento:</h3>
                  <ul className="space-y-2 text-blue-100">
                    <li>• Entrada facilitada</li>
                    <li>• Financiamento direto com a construtora</li>
                    <li>• Desconto especial para pagamento à vista</li>
                    <li>• Parcelas durante a obra</li>
                  </ul>
                </div>
              </div>

              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
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
