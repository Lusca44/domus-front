
import React from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import {
  MapPin,
  Building2,
  Users,
  Car,
  ArrowLeft,
  Utensils,
  Dumbbell,
  TreePine,
  Music,
  Heart,
  Star,
} from "lucide-react";
import PhotoCarousel from '@/components/PhotoCarousel';
import LeadCaptureForm from '@/components/LeadCaptureForm';
import Footer from '@/components/Footer';
import { Link } from "react-router-dom";
import { fotos } from './assets/fotos';
import { videos } from './assets/videos';

const LandingCiataResidencial = () => {
  const todasAsMidias = [...fotos, ...videos];

  const amenidades = [
    { icon: Music, nome: "Lounge Bar", descricao: "Espaço cultural inspirado no quintal da Tia Ciata" },
    { icon: Dumbbell, nome: "Fitness", descricao: "Academia completa para seu bem-estar" },
    { icon: Users, nome: "Playground", descricao: "Diversão garantida para as crianças" },
    { icon: Car, nome: "Bicicletário", descricao: "Mobilidade sustentável" },
    { icon: Utensils, nome: "Easy Market", descricao: "Conveniência no seu dia a dia" },
    { icon: TreePine, nome: "Redário", descricao: "Relaxamento ao ar livre" }
  ];

  const plantas = [
    { tipo: "Studio", area: "31,55m²", quartos: 0, destaque: "Compacto e funcional" },
    { tipo: "1 Quarto", area: "35,80m²", quartos: 1, destaque: "Ideal para casais" },
    { tipo: "2 Quartos", area: "39,65m²", quartos: 2, destaque: "Perfeito para famílias" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-red-50">
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

      {/* Hero Section com Background Cultural */}
      <section 
        className="relative min-h-screen flex items-center justify-center bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `linear-gradient(rgba(139, 69, 19, 0.8), rgba(160, 82, 45, 0.7)), url('/assets/lancamentos/ciata-residencial/background-ciata-residencial.jpg')`
        }}
      >
        <div className="container mx-auto px-4 py-20 text-center text-white relative z-10">
          <div className="max-w-4xl mx-auto">
            {/* Badge de Homenagem */}
            <Badge className="mb-6 bg-amber-600 hover:bg-amber-700 text-white px-6 py-3 text-lg font-semibold">
              <Heart className="w-5 h-5 mr-2" />
              Homenagem a Tia Ciata
            </Badge>
            
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
              <span className="text-amber-200">Ciata</span>
              <span className="block text-white">Residencial</span>
            </h1>
            
            <p className="text-xl md:text-2xl mb-4 text-amber-100 font-medium">
              Cultura • Conexão • Legado
            </p>
            
            <p className="text-lg md:text-xl mb-8 text-white/90 max-w-3xl mx-auto leading-relaxed">
              No coração do Porto Maravilha, onde nasceu o samba e a resistência cultural. 
              Uma homenagem à Hilária Batista, a Tia Ciata, matriarca que transformou seu quintal 
              no berço da música brasileira.
            </p>

            <div className="flex flex-wrap justify-center gap-4 mb-12">
              <div className="bg-white/10 backdrop-blur-sm rounded-full px-6 py-3">
                <MapPin className="w-5 h-5 inline mr-2" />
                <span className="font-semibold">Porto Maravilha, RJ</span>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-full px-6 py-3">
                <Building2 className="w-5 h-5 inline mr-2" />
                <span className="font-semibold">Studio a 2 Quartos</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                className="bg-amber-600 hover:bg-amber-700 text-white px-8 py-4 text-lg font-semibold shadow-xl"
                onClick={() => document.getElementById('interesse')?.scrollIntoView({ behavior: 'smooth' })}
              >
                <Heart className="w-5 h-5 mr-2" />
                Quero Conhecer
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="border-white text-amber-600 hover:bg-white hover:text-amber-800 px-8 py-4 text-lg font-semibold backdrop-blur-sm"
                onClick={() => document.getElementById('galeria')?.scrollIntoView({ behavior: 'smooth' })}
              >
                Ver Galeria
              </Button>
            </div>
          </div>
        </div>

        {/* Indicador de Scroll */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-1 h-16 bg-white/30 rounded-full flex justify-center">
            <div className="w-1 h-4 bg-white rounded-full mt-2"></div>
          </div>
        </div>
      </section>

      {/* Seção Histórica - Tia Ciata */}
      <section className="py-20 bg-gradient-to-r from-amber-900 to-red-900 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <Badge className="mb-6 bg-amber-600 hover:bg-amber-700 text-white px-6 py-3 text-lg">
                <Music className="w-5 h-5 mr-2" />
                Legado Cultural
              </Badge>
              <h2 className="text-3xl md:text-5xl font-bold mb-6 text-amber-200">
                A História que Inspirou
              </h2>
              <p className="text-xl text-amber-100 max-w-4xl mx-auto leading-relaxed">
                Hilária Batista de Almeida, conhecida como Tia Ciata, foi uma das principais 
                figuras da comunidade baiana no Rio de Janeiro e matriarca do samba carioca.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8">
                  <h3 className="text-2xl font-bold mb-4 text-amber-200">Pequena África</h3>
                  <p className="text-lg text-white/90 leading-relaxed">
                    Em sua casa na Saúde, Tia Ciata criou um espaço de resistência cultural 
                    onde nasceram os primeiros sambas gravados do Brasil. Seu quintal era 
                    ponto de encontro de músicos, compositores e toda a comunidade negra.
                  </p>
                </div>
                
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8">
                  <h3 className="text-2xl font-bold mb-4 text-amber-200">Berço do Samba</h3>
                  <p className="text-lg text-white/90 leading-relaxed">
                    Foi em sua casa que nasceu "Pelo Telefone", considerado o primeiro 
                    samba gravado da história. Tia Ciata preservou tradições e criou 
                    um legado que ecoa até hoje no coração do Rio.
                  </p>
                </div>
              </div>

              <div className="relative">
                <div className="bg-gradient-to-br from-amber-200 to-red-200 rounded-2xl p-1">
                  <div className="bg-gradient-to-br from-amber-50 to-red-50 rounded-xl p-8 text-amber-900">
                    <div className="text-center mb-6">
                      <Music className="w-16 h-16 mx-auto mb-4 text-amber-600" />
                      <h4 className="text-2xl font-bold">O Rio encontrou seu lar</h4>
                    </div>
                    <p className="text-lg leading-relaxed text-center">
                      "Assim como Tia Ciata criou um lar para a cultura brasileira, 
                      o Ciata Residencial oferece um lar moderno no coração histórico 
                      do Porto Maravilha."
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Galeria de Fotos e Vídeos */}
      <section id="galeria" className="py-20 bg-gradient-to-br from-amber-50 to-red-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <Badge className="mb-6 bg-amber-600 hover:bg-amber-700 text-white px-6 py-3 text-lg">
              <Building2 className="w-5 h-5 mr-2" />
              Conheça o Projeto
            </Badge>
            <h2 className="text-3xl md:text-5xl font-bold mb-6 text-amber-900">
              Galeria do Empreendimento
            </h2>
            <p className="text-xl text-amber-700 max-w-3xl mx-auto">
              Descubra cada detalhe do Ciata Residencial através de nossas imagens e vídeos
            </p>
          </div>

          <div className="max-w-6xl mx-auto">
            <PhotoCarousel photos={todasAsMidias} />
          </div>
        </div>
      </section>

      {/* Amenidades com Tema Cultural */}
      <section className="py-20 bg-gradient-to-r from-amber-900 to-red-900">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <Badge className="mb-6 bg-amber-600 hover:bg-amber-700 text-white px-6 py-3 text-lg">
              <Star className="w-5 h-5 mr-2" />
              Amenidades Exclusivas
            </Badge>
            <h2 className="text-3xl md:text-5xl font-bold mb-6 text-amber-200">
              Lazer Completo Inspirado na Cultura
            </h2>
            <p className="text-xl text-amber-100 max-w-3xl mx-auto">
              Espaços projetados para conectar pessoas e preservar tradições
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {amenidades.map((amenidade, index) => (
              <Card key={index} className="bg-white/10 backdrop-blur-sm border-amber-200/20 hover:bg-white/20 transition-all duration-300 group">
                <CardContent className="p-8 text-center">
                  <div className="mb-6">
                    <div className="w-16 h-16 bg-amber-600 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                      <amenidade.icon className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-amber-200 mb-2">{amenidade.nome}</h3>
                  </div>
                  <p className="text-white/90">{amenidade.descricao}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Plantas e Tipologias */}
      <section className="py-20 bg-gradient-to-br from-amber-50 to-red-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <Badge className="mb-6 bg-amber-600 hover:bg-amber-700 text-white px-6 py-3 text-lg">
              <Building2 className="w-5 h-5 mr-2" />
              Plantas Disponíveis
            </Badge>
            <h2 className="text-3xl md:text-5xl font-bold mb-6 text-amber-900">
              Escolha Seu Novo Lar
            </h2>
            <p className="text-xl text-amber-700 max-w-3xl mx-auto">
              Apartamentos pensados para diferentes momentos da sua vida
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {plantas.map((planta, index) => (
              <Card key={index} className="group hover:shadow-2xl transition-all duration-300 border-2 border-amber-200 hover:border-amber-400">
                <CardContent className="p-8 text-center">
                  <div className="mb-6">
                    <div className="w-20 h-20 bg-gradient-to-br from-amber-600 to-red-600 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                      <span className="text-2xl font-bold text-white">{planta.quartos || 'S'}</span>
                    </div>
                    <h3 className="text-2xl font-bold text-amber-900 mb-2">{planta.tipo}</h3>
                    <p className="text-3xl font-bold text-amber-600 mb-2">{planta.area}</p>
                  </div>
                  <p className="text-amber-700 font-medium">{planta.destaque}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Localização Estratégica */}
      <section className="py-20 bg-gradient-to-r from-amber-900 to-red-900 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <Badge className="mb-6 bg-amber-600 hover:bg-amber-700 text-white px-6 py-3 text-lg">
                <MapPin className="w-5 h-5 mr-2" />
                Localização Privilegiada
              </Badge>
              <h2 className="text-3xl md:text-5xl font-bold mb-6 text-amber-200">
                No Coração do Porto Maravilha
              </h2>
              <p className="text-xl text-amber-100 max-w-3xl mx-auto">
                Conectado ao centro histórico e cultural do Rio de Janeiro
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6">
                  <h4 className="text-xl font-bold mb-3 text-amber-200">Transporte e Mobilidade</h4>
                  <ul className="space-y-2 text-white/90">
                    <li>• Terminal Rodoviário Novo Rio</li>
                    <li>• Estação Central do Brasil</li>
                    <li>• VLT Carioca</li>
                    <li>• Múltiplas linhas de ônibus</li>
                  </ul>
                </div>
                
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6">
                  <h4 className="text-xl font-bold mb-3 text-amber-200">Pontos de Interesse</h4>
                  <ul className="space-y-2 text-white/90">
                    <li>• Museu do Amanhã</li>
                    <li>• AquaRio</li>
                    <li>• Boulevard Olímpico</li>
                    <li>• Centro Cultural do Brasil</li>
                  </ul>
                </div>
              </div>

              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8">
                <h3 className="text-2xl font-bold mb-6 text-amber-200 text-center">
                  Revitalização Histórica
                </h3>
                <p className="text-lg text-white/90 leading-relaxed mb-6">
                  O Porto Maravilha representa uma das maiores revitalizações urbanas 
                  do Brasil, combinando preservação histórica com modernidade urbana.
                </p>
                <div className="bg-amber-600 rounded-xl p-4 text-center">
                  <p className="font-bold text-lg">
                    "Onde o passado encontra o futuro"
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Formulário de Interesse */}
      <section id="interesse" className="py-20 bg-gradient-to-br from-amber-50 to-red-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <Badge className="mb-6 bg-amber-600 hover:bg-amber-700 text-white px-6 py-3 text-lg">
                <Heart className="w-5 h-5 mr-2" />
                Faça Parte da História
              </Badge>
              <h2 className="text-3xl md:text-5xl font-bold mb-6 text-amber-900">
                Demonstre seu Interesse
              </h2>
              <p className="text-xl text-amber-700">
                Garante sua vaga neste empreendimento único no Porto Maravilha
              </p>
            </div>

            <div className="max-w-md mx-auto">
              <LeadCaptureForm 
                nomeLancamento="Ciata Residencial"
                title="Quero Conhecer o Ciata"
                description="Preencha seus dados e nossa equipe entrará em contato"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer isHomePage={false} />
    </div>
  );
};

export default LandingCiataResidencial;
