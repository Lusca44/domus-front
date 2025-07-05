
import React from "react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  MapPin,
  Clock,
  Calendar,
  Phone,
  Mail,
  Star,
  Car,
  Waves,
  Building,
  Dumbbell,
  Users,
  Coffee,
  Wine,
  Eye,
  Home,
  Train,
} from "lucide-react";
import LeadCaptureForm from "@/components/LeadCaptureForm";
import PhotoCarousel from "@/components/PhotoCarousel";
import Footer from "@/components/Footer";
import { fotos } from "./assets/fotos";
import { videos } from "./assets/videos";

const LandingOrlaMaua = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-yellow-50">
      {/* Header fixo */}
      <header className="fixed top-0 left-0 right-0 bg-white/95 backdrop-blur-sm shadow-sm z-50 border-b border-blue-100">
        <div className="container mx-auto px-4 py-3">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-900 to-yellow-600 rounded-lg flex items-center justify-center">
                <Building className="w-4 h-4 text-white" />
              </div>
              <div>
                <h1 className="font-bold text-lg text-gray-900">Orla Mauá</h1>
                <p className="text-sm text-gray-600">
                  Coração do Porto Maravilha
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="hidden md:flex items-center space-x-4 text-sm text-gray-600">
                <div className="flex items-center space-x-1">
                  <Phone className="w-4 h-4" />
                  <span>(21) 2222-3333</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Mail className="w-4 h-4" />
                  <span>contato@feitozaimoveis.com</span>
                </div>
              </div>
              <Button
                className="bg-gradient-to-r from-blue-900 to-yellow-600 hover:from-blue-800 hover:to-yellow-700 text-white"
                onClick={() =>
                  document
                    .getElementById("form-interesse")
                    ?.scrollIntoView({ behavior: "smooth" })
                }
              >
                Tenho Interesse
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section
        className="relative h-screen flex items-center justify-center text-white overflow-hidden"
        style={{
          backgroundImage:
            'url("/assets/lancamentos/orla-maua/background-orla-maua.jpg")',
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        {/* Overlay com gradiente premium */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/90 via-blue-800/80 to-yellow-800/70"></div>

        <div className="relative z-10 text-center max-w-4xl mx-auto px-4">
          <div className="mb-6">
            <div className="inline-flex items-center space-x-2 bg-yellow-600/20 backdrop-blur-sm px-4 py-2 rounded-full border border-yellow-400/30 mb-4">
              <Star className="w-4 h-4 text-yellow-400" />
              <span className="text-sm font-medium">Localização Premium</span>
            </div>
          </div>

          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
            <span className="block text-yellow-100">Orla Mauá</span>
            <span className="block text-2xl md:text-3xl lg:text-4xl font-normal text-blue-200 mt-2">
              O coração pulsante da vida urbana carioca
            </span>
          </h1>

          <p className="text-lg md:text-xl text-blue-100 mb-8 max-w-2xl mx-auto leading-relaxed">
            Viva no Boulevard Olímpico, em frente ao Museu do Amanhã. 
            Arquitetura de Afonso Kuenner com rooftop exclusivo e vista panorâmica.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <div className="flex items-center space-x-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-lg border border-white/20">
              <MapPin className="w-4 h-4" />
              <span>Porto Maravilha, Rio de Janeiro</span>
            </div>
            <div className="flex items-center space-x-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-lg border border-white/20">
              <Building className="w-4 h-4" />
              <span>609 unidades | 25 pavimentos</span>
            </div>
            <div className="flex items-center space-x-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-lg border border-white/20">
              <Train className="w-4 h-4" />
              <span>VLT na porta</span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              className="bg-yellow-600 hover:bg-yellow-700 text-white px-8 py-3 text-lg"
              onClick={() =>
                document
                  .getElementById("form-interesse")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
            >
              Tenho Interesse
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-white text-white hover:bg-white hover:text-blue-800 px-8 py-3 text-lg"
              onClick={() =>
                document
                  .getElementById("carrossel")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
            >
              Ver Fotos
            </Button>
          </div>
        </div>

        {/* Indicador de scroll */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white/70 rounded-full mt-2 animate-pulse"></div>
          </div>
        </div>
      </section>

      {/* Seção de Destaque - Localização Premium */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Localização Exclusiva
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              No coração do Porto Maravilha, onde a história e a modernidade se encontram
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="text-center p-6 rounded-xl bg-gradient-to-br from-blue-50 to-blue-100 border border-blue-200">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-900 to-yellow-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Building className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                Boulevard Olímpico
              </h3>
              <p className="text-gray-600">
                Em frente ao Museu do Amanhã e Mural do Kobra
              </p>
            </div>

            <div className="text-center p-6 rounded-xl bg-gradient-to-br from-blue-50 to-blue-100 border border-blue-200">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-900 to-yellow-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Train className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                VLT na Porta
              </h3>
              <p className="text-gray-600">
                Mobilidade urbana de primeira classe
              </p>
            </div>

            <div className="text-center p-6 rounded-xl bg-gradient-to-br from-blue-50 to-blue-100 border border-blue-200">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-900 to-yellow-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Star className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                Afonso Kuenner
              </h3>
              <p className="text-gray-600">
                Projeto arquitetônico de renome internacional
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Carrossel de Fotos */}
      <section
        id="carrossel"
        className="py-16 bg-gradient-to-br from-blue-50 to-yellow-50"
      >
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Conheça o Orla Mauá
            </h2>
            <p className="text-lg text-gray-600">
              Descubra todos os detalhes do seu futuro lar premium
            </p>
          </div>

          <div className="max-w-6xl mx-auto">
            <PhotoCarousel
              photos={fotos}
              className="rounded-2xl overflow-hidden shadow-2xl"
            />
          </div>
        </div>
      </section>

      {/* Seção de Amenities Premium */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Rooftop Exclusivo & Amenities Premium
            </h2>
            <p className="text-lg text-gray-600">
              Lazer de alto padrão com vista panorâmica da Baía de Guanabara
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            <div className="text-center p-6 rounded-xl bg-gradient-to-br from-blue-50 to-blue-100 border border-blue-200 hover:shadow-lg transition-all duration-300">
              <Waves className="w-12 h-12 text-blue-600 mx-auto mb-3" />
              <h3 className="font-bold text-gray-900 mb-2">Piscinas Rooftop</h3>
              <p className="text-sm text-gray-600">Vista panorâmica da baía</p>
            </div>

            <div className="text-center p-6 rounded-xl bg-gradient-to-br from-yellow-50 to-yellow-100 border border-yellow-200 hover:shadow-lg transition-all duration-300">
              <Users className="w-12 h-12 text-yellow-600 mx-auto mb-3" />
              <h3 className="font-bold text-gray-900 mb-2">Espaço Gourmet</h3>
              <p className="text-sm text-gray-600">Para eventos especiais</p>
            </div>

            <div className="text-center p-6 rounded-xl bg-gradient-to-br from-purple-50 to-purple-100 border border-purple-200 hover:shadow-lg transition-all duration-300">
              <Eye className="w-12 h-12 text-purple-600 mx-auto mb-3" />
              <h3 className="font-bold text-gray-900 mb-2">Mirante</h3>
              <p className="text-sm text-gray-600">Vista 360° do Rio</p>
            </div>

            <div className="text-center p-6 rounded-xl bg-gradient-to-br from-indigo-50 to-indigo-100 border border-indigo-200 hover:shadow-lg transition-all duration-300">
              <Coffee className="w-12 h-12 text-indigo-600 mx-auto mb-3" />
              <h3 className="font-bold text-gray-900 mb-2">Coworking</h3>
              <p className="text-sm text-gray-600">Escritório moderno</p>
            </div>

            <div className="text-center p-6 rounded-xl bg-gradient-to-br from-green-50 to-green-100 border border-green-200 hover:shadow-lg transition-all duration-300">
              <Dumbbell className="w-12 h-12 text-green-600 mx-auto mb-3" />
              <h3 className="font-bold text-gray-900 mb-2">Academia</h3>
              <p className="text-sm text-gray-600">Equipamentos modernos</p>
            </div>

            <div className="text-center p-6 rounded-xl bg-gradient-to-br from-red-50 to-red-100 border border-red-200 hover:shadow-lg transition-all duration-300">
              <Wine className="w-12 h-12 text-red-600 mx-auto mb-3" />
              <h3 className="font-bold text-gray-900 mb-2">Pub</h3>
              <p className="text-sm text-gray-600">Lounge para relaxar</p>
            </div>

            <div className="text-center p-6 rounded-xl bg-gradient-to-br from-pink-50 to-pink-100 border border-pink-200 hover:shadow-lg transition-all duration-300">
              <Users className="w-12 h-12 text-pink-600 mx-auto mb-3" />
              <h3 className="font-bold text-gray-900 mb-2">Salão de Festas</h3>
              <p className="text-sm text-gray-600">Eventos memoráveis</p>
            </div>

            <div className="text-center p-6 rounded-xl bg-gradient-to-br from-teal-50 to-teal-100 border border-teal-200 hover:shadow-lg transition-all duration-300">
              <Car className="w-12 h-12 text-teal-600 mx-auto mb-3" />
              <h3 className="font-bold text-gray-900 mb-2">Estacionamento</h3>
              <p className="text-sm text-gray-600">Vagas cobertas</p>
            </div>
          </div>
        </div>
      </section>

      {/* Seção de Plantas e Tipologias */}
      <section className="py-16 bg-gradient-to-br from-blue-50 to-yellow-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Plantas Inteligentes
            </h2>
            <p className="text-lg text-gray-600">
              Apartamentos de Studio a 3 quartos com layouts otimizados
            </p>
          </div>

          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-white rounded-2xl shadow-xl p-6 border border-blue-100">
                <h3 className="text-xl font-bold text-gray-900 mb-4">
                  Studio & 1 Quarto
                </h3>
                <div className="space-y-3 mb-6">
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                    <span className="text-gray-700">Studio: A partir de 25m²</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                    <span className="text-gray-700">1 Quarto: A partir de 35m²</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                    <span className="text-gray-700">Layouts otimizados</span>
                  </div>
                </div>
                <img
                  src="/assets/lancamentos/orla-maua/apartamento-decorado-1quarto.jpg"
                  alt="Apartamento 1 quarto decorado"
                  className="w-full h-48 object-cover rounded-xl"
                />
              </div>

              <div className="bg-white rounded-2xl shadow-xl p-6 border border-blue-100">
                <h3 className="text-xl font-bold text-gray-900 mb-4">
                  2 & 3 Quartos
                </h3>
                <div className="space-y-3 mb-6">
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-yellow-600 rounded-full"></div>
                    <span className="text-gray-700">2 Quartos: A partir de 55m²</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-yellow-600 rounded-full"></div>
                    <span className="text-gray-700">3 Quartos: A partir de 75m²</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-yellow-600 rounded-full"></div>
                    <span className="text-gray-700">Suíte master com closet</span>
                  </div>
                </div>
                <img
                  src="/assets/lancamentos/orla-maua/apartamento-decorado-3quartos.jpg"
                  alt="Apartamento 3 quartos decorado"
                  className="w-full h-48 object-cover rounded-xl"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Seção Cultural - Pontos de Interesse */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Patrimônio Cultural na Sua Porta
            </h2>
            <p className="text-lg text-gray-600">
              Viva cercado de história, arte e cultura no Porto Maravilha
            </p>
          </div>

          <div className="max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <div className="space-y-6">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-900 to-yellow-600 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Building className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-900 mb-1">
                        Museu do Amanhã
                      </h3>
                      <p className="text-gray-600">
                        Arquitetura futurística de Santiago Calatrava
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-900 to-yellow-600 rounded-lg flex items-center justify-center flex-shrink-0">
                      <div className="w-6 h-6 bg-white rounded flex items-center justify-center">
                        <span className="text-blue-900 font-bold text-xs">🎨</span>
                      </div>
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-900 mb-1">
                        Museu de Arte do Rio
                      </h3>
                      <p className="text-gray-600">
                        Arte contemporânea e cultura carioca
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-900 to-yellow-600 rounded-lg flex items-center justify-center flex-shrink-0">
                      <div className="w-6 h-6 bg-white rounded flex items-center justify-center">
                        <span className="text-blue-900 font-bold text-xs">🏛️</span>
                      </div>
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-900 mb-1">
                        Cais do Valongo
                      </h3>
                      <p className="text-gray-600">
                        Patrimônio Mundial da UNESCO
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-900 to-yellow-600 rounded-lg flex items-center justify-center flex-shrink-0">
                      <div className="w-6 h-6 bg-white rounded flex items-center justify-center">
                        <span className="text-blue-900 font-bold text-xs">🎭</span>
                      </div>
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-900 mb-1">
                        Mural do Kobra
                      </h3>
                      <p className="text-gray-600">
                        Maior mural de street art do mundo
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="relative">
                <img
                  src="/assets/lancamentos/orla-maua/vista-museu-amanha.jpg"
                  alt="Vista para o Museu do Amanhã"
                  className="w-full h-96 object-cover rounded-2xl shadow-xl"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-blue-900/30 to-transparent rounded-2xl"></div>
                <div className="absolute bottom-4 left-4 right-4">
                  <div className="bg-white/90 backdrop-blur-sm rounded-lg p-4">
                    <div className="flex items-center space-x-2">
                      <MapPin className="w-4 h-4 text-blue-600" />
                      <span className="font-medium text-gray-900">
                        Av. Venezuela, 194 - Porto Maravilha
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section - Formulário */}
      <section
        id="form-interesse"
        className="py-16 bg-gradient-to-br from-blue-900 to-yellow-600 text-white"
      >
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Garanta Já o Seu Orla Mauá
              </h2>
              <p className="text-lg text-blue-100">
                Preencha o formulário e receba informações exclusivas sobre plantas, 
                preços e condições especiais de lançamento
              </p>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
              <LeadCaptureForm
                nomeLancamento="Orla Mauá"
                title="Receba informações exclusivas"
                description="Nossa equipe especializada entrará em contato em breve"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default LandingOrlaMaua;
