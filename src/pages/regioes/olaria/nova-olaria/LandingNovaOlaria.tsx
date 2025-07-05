
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
  Trees,
  Dumbbell,
  Users,
  Gamepad2,
  Coffee,
  Heart,
  Bike,
  Home,
} from "lucide-react";
import LeadCaptureForm from "@/components/LeadCaptureForm";
import PhotoCarousel from "@/components/PhotoCarousel";
import Footer from "@/components/Footer";
import { fotos } from "./assets/fotos";
import { videos } from "./assets/videos";

const LandingNovaOlaria = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50">
      {/* Header fixo */}
      <header className="fixed top-0 left-0 right-0 bg-white/95 backdrop-blur-sm shadow-sm z-50 border-b border-orange-100">
        <div className="container mx-auto px-4 py-3">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-br from-orange-600 to-red-600 rounded-lg flex items-center justify-center">
                <Home className="w-4 h-4 text-white" />
              </div>
              <div>
                <h1 className="font-bold text-lg text-gray-900">Nova Olaria</h1>
                <p className="text-sm text-gray-600">
                  Tradição • Modernidade • Pertencimento
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
                className="bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700 text-white"
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
            'url("/assets/lancamentos/nova-olaria/background-nova-olaria.jpg")',
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        {/* Overlay com gradiente terroso */}
        <div className="absolute inset-0 bg-gradient-to-br from-orange-900/80 via-red-800/70 to-amber-900/80"></div>

        <div className="relative z-10 text-center max-w-4xl mx-auto px-4">
          <div className="mb-6">
            <div className="inline-flex items-center space-x-2 bg-orange-600/20 backdrop-blur-sm px-4 py-2 rounded-full border border-orange-400/30 mb-4">
              <Star className="w-4 h-4 text-yellow-400" />
              <span className="text-sm font-medium">Lançamento Exclusivo</span>
            </div>
          </div>

          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
            <span className="block text-orange-100">Nova Olaria</span>
            <span className="block text-2xl md:text-3xl lg:text-4xl font-normal text-orange-200 mt-2">
              Uma nova forma de viver, morar e pertencer
            </span>
          </h1>

          <p className="text-lg md:text-xl text-orange-100 mb-8 max-w-2xl mx-auto leading-relaxed">
            Tradição e modernidade se encontram no coração de Olaria. Amplo
            lazer, localização estratégica e a qualidade CURY.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <div className="flex items-center space-x-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-lg border border-white/20">
              <MapPin className="w-4 h-4" />
              <span>Olaria, Rio de Janeiro</span>
            </div>
            <div className="flex items-center space-x-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-lg border border-white/20">
              <Home className="w-4 h-4" />
              <span>Apartamentos 2 quartos</span>
            </div>
            <div className="flex items-center space-x-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-lg border border-white/20">
              <Clock className="w-4 h-4" />
              <span>Pronto para morar</span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              className="bg-orange-600 hover:bg-orange-700 text-white px-8 py-3 text-lg"
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
              className="border-white text-white hover:bg-white hover:text-orange-800 px-8 py-3 text-lg"
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

      {/* Seção de Destaque - Tradição e Modernidade */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Tradição que se Renova
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              No coração de Olaria, onde a história encontra o futuro, nasce um
              novo conceito de morar.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="text-center p-6 rounded-xl bg-gradient-to-br from-orange-50 to-red-50 border border-orange-100">
              <div className="w-16 h-16 bg-gradient-to-br from-orange-600 to-red-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <MapPin className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                Localização Estratégica
              </h3>
              <p className="text-gray-600">
                Próximo ao BRT Fiscal de Ramos, Colégio Pedro II e Shopping Nova
                América
              </p>
            </div>

            <div className="text-center p-6 rounded-xl bg-gradient-to-br from-orange-50 to-red-50 border border-orange-100">
              <div className="w-16 h-16 bg-gradient-to-br from-orange-600 to-red-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Waves className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                Amplo Lazer
              </h3>
              <p className="text-gray-600">
                Piscinas, campo society, fitness externo e muito mais para toda
                família
              </p>
            </div>

            <div className="text-center p-6 rounded-xl bg-gradient-to-br from-orange-50 to-red-50 border border-orange-100">
              <div className="w-16 h-16 bg-gradient-to-br from-orange-600 to-red-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Star className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                Qualidade CURY
              </h3>
              <p className="text-gray-600">
                Mais de 45 anos construindo sonhos com excelência e tradição
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Carrossel de Fotos */}
      <section
        id="carrossel"
        className="py-16 bg-gradient-to-br from-orange-50 to-red-50"
      >
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Conheça o Nova Olaria
            </h2>
            <p className="text-lg text-gray-600">
              Descubra todos os detalhes do seu futuro lar
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

      {/* Seção de Amenities */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Lazer Completo para Toda Família
            </h2>
            <p className="text-lg text-gray-600">
              Espaços pensados para momentos únicos e inesquecíveis
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            <div className="text-center p-6 rounded-xl bg-gradient-to-br from-blue-50 to-blue-100 border border-blue-200 hover:shadow-lg transition-all duration-300">
              <Waves className="w-12 h-12 text-blue-600 mx-auto mb-3" />
              <h3 className="font-bold text-gray-900 mb-2">Piscinas</h3>
              <p className="text-sm text-gray-600">Adulto e infantil</p>
            </div>

            <div className="text-center p-6 rounded-xl bg-gradient-to-br from-green-50 to-green-100 border border-green-200 hover:shadow-lg transition-all duration-300">
              <div className="w-12 h-12 bg-green-600 rounded-lg flex items-center justify-center mx-auto mb-3">
                <span className="text-white font-bold text-xs">⚽</span>
              </div>
              <h3 className="font-bold text-gray-900 mb-2">Campo Society</h3>
              <p className="text-sm text-gray-600">Para jogos e diversão</p>
            </div>

            <div className="text-center p-6 rounded-xl bg-gradient-to-br from-purple-50 to-purple-100 border border-purple-200 hover:shadow-lg transition-all duration-300">
              <Gamepad2 className="w-12 h-12 text-purple-600 mx-auto mb-3" />
              <h3 className="font-bold text-gray-900 mb-2">Lounge Jogos</h3>
              <p className="text-sm text-gray-600">Entretenimento garantido</p>
            </div>

            <div className="text-center p-6 rounded-xl bg-gradient-to-br from-orange-50 to-orange-100 border border-orange-200 hover:shadow-lg transition-all duration-300">
              <Dumbbell className="w-12 h-12 text-orange-600 mx-auto mb-3" />
              <h3 className="font-bold text-gray-900 mb-2">Fitness Externo</h3>
              <p className="text-sm text-gray-600">Exercite-se ao ar livre</p>
            </div>

            <div className="text-center p-6 rounded-xl bg-gradient-to-br from-pink-50 to-pink-100 border border-pink-200 hover:shadow-lg transition-all duration-300">
              <Heart className="w-12 h-12 text-pink-600 mx-auto mb-3" />
              <h3 className="font-bold text-gray-900 mb-2">Brinquedoteca</h3>
              <p className="text-sm text-gray-600">Diversão para os pequenos</p>
            </div>

            <div className="text-center p-6 rounded-xl bg-gradient-to-br from-yellow-50 to-yellow-100 border border-yellow-200 hover:shadow-lg transition-all duration-300">
              <Users className="w-12 h-12 text-yellow-600 mx-auto mb-3" />
              <h3 className="font-bold text-gray-900 mb-2">Salão de Festas</h3>
              <p className="text-sm text-gray-600">
                Celebre momentos especiais
              </p>
            </div>

            <div className="text-center p-6 rounded-xl bg-gradient-to-br from-indigo-50 to-indigo-100 border border-indigo-200 hover:shadow-lg transition-all duration-300">
              <Coffee className="w-12 h-12 text-indigo-600 mx-auto mb-3" />
              <h3 className="font-bold text-gray-900 mb-2">Coworking</h3>
              <p className="text-sm text-gray-600">Trabalhe com conforto</p>
            </div>

            <div className="text-center p-6 rounded-xl bg-gradient-to-br from-teal-50 to-teal-100 border border-teal-200 hover:shadow-lg transition-all duration-300">
              <Bike className="w-12 h-12 text-teal-600 mx-auto mb-3" />
              <h3 className="font-bold text-gray-900 mb-2">Bicicletário</h3>
              <p className="text-sm text-gray-600">Mobilidade sustentável</p>
            </div>
          </div>
        </div>
      </section>

      {/* Seção de Plantas e Tipologias */}
      <section className="py-16 bg-gradient-to-br from-orange-50 to-red-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Plantas Inteligentes
            </h2>
            <p className="text-lg text-gray-600">
              Apartamentos de 2 quartos pensados para o seu conforto
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-2xl shadow-xl p-8 border border-orange-100">
              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">
                    Apartamento 2 Quartos
                  </h3>
                  <div className="space-y-3">
                    <div className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-orange-600 rounded-full"></div>
                      <span className="text-gray-700">
                        Área: 38,50m² a 41,34m²
                      </span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-orange-600 rounded-full"></div>
                      <span className="text-gray-700">
                        2 quartos com possibilidade de suíte
                      </span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-orange-600 rounded-full"></div>
                      <span className="text-gray-700">
                        Sala de estar integrada
                      </span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-orange-600 rounded-full"></div>
                      <span className="text-gray-700">
                        Cozinha e área de serviço
                      </span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-orange-600 rounded-full"></div>
                      <span className="text-gray-700">Varanda com vista</span>
                    </div>
                  </div>
                </div>

                <div className="relative">
                  <img
                    src="/assets/lancamentos/nova-olaria/apartamento-decorado-2quartos.jpg"
                    alt="Apartamento 2 quartos decorado"
                    className="w-full h-64 object-cover rounded-xl shadow-lg"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-orange-900/20 to-transparent rounded-xl"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Seção de Localização */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Localização Privilegiada
            </h2>
            <p className="text-lg text-gray-600">
              No coração de Olaria, próximo a tudo que você precisa
            </p>
          </div>

          <div className="max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <div className="space-y-6">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-orange-600 to-red-600 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Car className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-900 mb-1">
                        BRT Fiscal de Ramos
                      </h3>
                      <p className="text-gray-600">
                        Conexão rápida com toda a cidade
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-orange-600 to-red-600 rounded-lg flex items-center justify-center flex-shrink-0">
                      <div className="w-6 h-6 bg-white rounded flex items-center justify-center">
                        <span className="text-orange-600 font-bold text-xs">
                          🎓
                        </span>
                      </div>
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-900 mb-1">
                        Colégio Pedro II
                      </h3>
                      <p className="text-gray-600">
                        Educação de qualidade próxima
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-orange-600 to-red-600 rounded-lg flex items-center justify-center flex-shrink-0">
                      <div className="w-6 h-6 bg-white rounded flex items-center justify-center">
                        <span className="text-orange-600 font-bold text-xs">
                          🛍️
                        </span>
                      </div>
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-900 mb-1">
                        Shopping Nova América
                      </h3>
                      <p className="text-gray-600">Compras e entretenimento</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-orange-600 to-red-600 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Trees className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-900 mb-1">
                        Parques e Lazer
                      </h3>
                      <p className="text-gray-600">
                        Área verde e qualidade de vida
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="relative">
                <img
                  src="/assets/lancamentos/nova-olaria/vista-aerea-empreendimento.jpg"
                  alt="Vista aérea da localização"
                  className="w-full h-96 object-cover rounded-2xl shadow-xl"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-orange-900/30 to-transparent rounded-2xl"></div>
                <div className="absolute bottom-4 left-4 right-4">
                  <div className="bg-white/90 backdrop-blur-sm rounded-lg p-4">
                    <div className="flex items-center space-x-2">
                      <MapPin className="w-4 h-4 text-orange-600" />
                      <span className="font-medium text-gray-900">
                        Olaria, Rio de Janeiro
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
        className="py-16 bg-gradient-to-br from-orange-600 to-red-600 text-white"
      >
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Garanta Já o Seu Nova Olaria
              </h2>
              <p className="text-lg text-orange-100">
                Preencha o formulário e receba informações exclusivas sobre
                preços, plantas e condições especiais
              </p>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
              <LeadCaptureForm
                nomeLancamento="Nova Olaria"
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

export default LandingNovaOlaria;
