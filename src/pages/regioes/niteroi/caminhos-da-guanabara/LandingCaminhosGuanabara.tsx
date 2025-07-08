import React from 'react';
import { ArrowRight, MapPin, Users, Car, Dumbbell, Waves, TreePine, Shield, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import LeadCaptureForm from '@/components/LeadCaptureForm';
import PhotoCarousel from '@/components/PhotoCarousel';
import fotos from './assets/fotos';
import videos from './assets/videos';

const LandingCaminhosGuanabara = () => {
  // Dados do empreendimento
  const empreendimento = {
    nome: "Caminhos da Guanabara",
    localizacao: "Niterói, RJ",
    construtora: "Incorporadora",
    arquiteto: "Joaquim Andrade Neto",
    entrega: "Dezembro/2026",
    unidades: "1068 unidades",
    blocos: "2 blocos",
    pavimentos: "22 pavimentos",
    quartos: "1, 2 e 3 quartos",
    metragem: "A partir de 38m²",
    preco: "A partir de R$ 294.900",
    tags: ["2 quartos", "Suíte", "Vaga"],
    destaque: "Lazer completo + Rooftop"
  };

  const diferenciais = [
    {
      icon: <Waves className="w-6 h-6" />,
      titulo: "Vista da Baía de Guanabara",
      descricao: "Apartamentos com vista privilegiada da baía mais famosa do Brasil"
    },
    {
      icon: <TreePine className="w-6 h-6" />,
      titulo: "Próximo ao Caminho Niemeyer",
      descricao: "A poucos minutos do complexo arquitetônico mais icônico de Niterói"
    },
    {
      icon: <Dumbbell className="w-6 h-6" />,
      titulo: "Lazer Completo + Rooftop",
      descricao: "Área de lazer ampla com rooftop para contemplar a vista única"
    },
    {
      icon: <Shield className="w-6 h-6" />,
      titulo: "Projeto Exclusivo",
      descricao: "Assinado por Joaquim Andrade Neto, referência em arquitetura residencial"
    }
  ];

  const lazerCompleto = [
    "Piscina adulto e infantil",
    "Rooftop com vista panorâmica", 
    "Academia completa",
    "Salão de festas",
    "Espaço gourmet",
    "Playground",
    "Quadra esportiva",
    "Sauna",
    "Spa relaxante",
    "Coworking",
    "Pet place",
    "Bicicletário"
  ];

  const localizacao = [
    { nome: "MAC - Museu de Arte Contemporânea", distancia: "5 min" },
    { nome: "Plaza Shopping Niterói", distancia: "8 min" },
    { nome: "Estação das Barcas", distancia: "10 min" },
    { nome: "Teatro Popular Oscar Niemeyer", distancia: "12 min" },
    { nome: "Praia de Icaraí", distancia: "15 min" },
    { nome: "Centro do Rio (via barcas)", distancia: "20 min" }
  ];

  // TODO: Replace with actual background image
  const backgroundStyle = {
    backgroundImage: `linear-gradient(rgba(0, 40, 85, 0.7), rgba(0, 60, 120, 0.8)), url('/assets/lancamentos/caminhos-da-guanabara/background-caminhos-guanabara.jpg')`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundAttachment: 'fixed'
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-slate-100">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center text-white overflow-hidden" style={backgroundStyle}>
        <div className="absolute inset-0 bg-gradient-to-b from-blue-900/20 via-transparent to-blue-900/40"></div>
        
        <div className="container mx-auto px-6 py-20 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <div className="flex flex-wrap gap-2 mb-4">
                  {empreendimento.tags.map((tag, index) => (
                    <Badge key={index} variant="secondary" className="bg-blue-100 text-blue-800 hover:bg-blue-200">
                      {tag}
                    </Badge>
                  ))}
                </div>
                
                <h1 className="text-5xl lg:text-7xl font-bold leading-tight">
                  {empreendimento.nome}
                </h1>
                
                <div className="flex items-center gap-3 text-xl">
                  <MapPin className="w-6 h-6 text-blue-300" />
                  <span className="text-blue-100">{empreendimento.localizacao}</span>
                </div>
                
                <p className="text-xl lg:text-2xl text-blue-100 font-light leading-relaxed">
                  Um manifesto em forma de arte e arquitetura que preenche Niterói. 
                  Onde todos seus caminhos se encontram.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                  <div className="text-3xl font-bold text-white mb-2">{empreendimento.preco}</div>
                  <div className="text-blue-200">{empreendimento.metragem}</div>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                  <div className="text-3xl font-bold text-white mb-2">{empreendimento.entrega}</div>
                  <div className="text-blue-200">Previsão de entrega</div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 text-lg font-semibold shadow-xl">
                  <Sparkles className="w-5 h-5 mr-2" />
                  Tenho Interesse
                </Button>
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-blue-900 px-8 py-4 text-lg font-semibold">
                  Ver Galeria <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </div>
            </div>

            <div className="lg:pl-8">
              <LeadCaptureForm 
                nomeLancamento={empreendimento.nome}
                title="Tenho Interesse"
                description="Preencha seus dados e receba informações exclusivas sobre o Caminhos da Guanabara"
              />
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white rounded-full mt-2 animate-pulse"></div>
          </div>
        </div>
      </section>

      {/* Destaques do Empreendimento */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              O Seu Novo Lar em Niterói
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-blue-800 mx-auto rounded-full mb-6"></div>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Arquitetura de vanguarda, localização privilegiada e qualidade incomparável se encontram 
              no Caminhos da Guanabara
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {diferenciais.map((diferencial, index) => (
              <div key={index} className="group text-center p-8 rounded-2xl bg-gradient-to-br from-blue-50 to-white border border-blue-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-blue-600 group-hover:text-white transition-all duration-300">
                  {diferencial.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">{diferencial.titulo}</h3>
                <p className="text-gray-600 leading-relaxed">{diferencial.descricao}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Especificações Técnicas */}
      <section className="py-20 bg-gradient-to-br from-slate-50 to-blue-50">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-8">
              Especificações do Projeto
            </h2>
            <div className="space-y-8">
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 max-w-3xl mx-auto">
                <div className="bg-white p-6 rounded-xl shadow-lg border border-blue-100">
                  <div className="text-3xl font-bold text-blue-600 mb-2">{empreendimento.unidades}</div>
                  <div className="text-gray-600">Total de unidades</div>
                </div>
                <div className="bg-white p-6 rounded-xl shadow-lg border border-blue-100">
                  <div className="text-3xl font-bold text-blue-600 mb-2">{empreendimento.blocos}</div>
                  <div className="text-gray-600">Blocos residenciais</div>
                </div>
                <div className="bg-white p-6 rounded-xl shadow-lg border border-blue-100">
                  <div className="text-3xl font-bold text-blue-600 mb-2">{empreendimento.pavimentos}</div>
                  <div className="text-gray-600">Pavimentos</div>
                </div>
                <div className="bg-white p-6 rounded-xl shadow-lg border border-blue-100">
                  <div className="text-3xl font-bold text-blue-600 mb-2">{empreendimento.quartos}</div>
                  <div className="text-gray-600">Opções disponíveis</div>
                </div>
              </div>
              
              <div className="bg-white p-8 rounded-xl shadow-lg border border-blue-100 max-w-2xl mx-auto">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Projeto Arquitetônico</h3>
                <p className="text-gray-600 mb-4">
                  Assinado por <strong>{empreendimento.arquiteto}</strong>, referência nacional em 
                  arquitetura residencial contemporânea.
                </p>
                <p className="text-gray-600">
                  Design moderno que valoriza a integração com a paisagem natural de Niterói, 
                  priorizando iluminação natural e ventilação cruzada.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Galeria de Fotos */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              Conheça o Empreendimento
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-blue-800 mx-auto rounded-full mb-6"></div>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Explore cada detalhe do seu futuro lar através de nossa galeria completa
            </p>
          </div>

          <PhotoCarousel photos={fotos} className="max-w-6xl mx-auto" />
        </div>
      </section>

      {/* Lazer Completo */}
      <section className="py-20 bg-gradient-to-br from-blue-600 to-blue-800 text-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold mb-6">
              Lazer Completo + Rooftop
            </h2>
            <div className="w-24 h-1 bg-white mx-auto rounded-full mb-6"></div>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto">
              Uma estrutura de lazer pensada para proporcionar momentos únicos para toda a família
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {lazerCompleto.map((item, index) => (
              <div key={index} className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20 hover:bg-white/20 transition-all duration-300">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                    <Sparkles className="w-6 h-6 text-white" />
                  </div>
                  <span className="text-lg font-medium">{item}</span>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <p className="text-2xl text-blue-100 font-light">
              + Rooftop com vista panorâmica da Baía de Guanabara
            </p>
          </div>
        </div>
      </section>

      {/* Localização */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-8">
                Localização Privilegiada
              </h2>
              <p className="text-xl text-gray-600 mb-12">
                No coração de Niterói, próximo aos principais pontos de interesse da cidade 
                e com fácil acesso ao Centro do Rio de Janeiro.
              </p>

              <div className="space-y-4">
                {localizacao.map((local, index) => (
                  <div key={index} className="flex items-center justify-between p-4 bg-white rounded-xl shadow-md border border-gray-100">
                    <div className="flex items-center gap-4">
                      <div className="w-3 h-3 bg-blue-600 rounded-full"></div>
                      <span className="font-medium text-gray-900">{local.nome}</span>
                    </div>
                    <span className="text-blue-600 font-semibold">{local.distancia}</span>
                  </div>
                ))}
              </div>

              <div className="mt-8 p-6 bg-blue-50 rounded-xl border-l-4 border-blue-600">
                <h3 className="font-bold text-gray-900 mb-2">Conectividade Total</h3>
                <p className="text-gray-600">
                  Acesso rápido ao Centro do Rio via barcas, facilitando o deslocamento para trabalho 
                  e lazer na capital fluminense.
                </p>
              </div>
            </div>

            <div className="space-y-6">
              {/* TODO: Replace with actual map */}
              <div className="bg-gray-200 rounded-2xl h-96 flex items-center justify-center">
                <p className="text-gray-500">Mapa de Localização - Niterói</p>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-blue-100 p-6 rounded-xl text-center">
                  <div className="text-2xl font-bold text-blue-600 mb-2">10 min</div>
                  <div className="text-gray-600">Centro de Niterói</div>
                </div>
                <div className="bg-blue-100 p-6 rounded-xl text-center">
                  <div className="text-2xl font-bold text-blue-600 mb-2">20 min</div>
                  <div className="text-gray-600">Centro do Rio</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section className="py-20 bg-gradient-to-br from-gray-900 to-blue-900 text-white">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl lg:text-5xl font-bold mb-8">
              Seu Novo Caminho Começa Aqui
            </h2>
            <p className="text-xl text-gray-300 mb-12 leading-relaxed">
              Não perca a oportunidade de fazer parte deste empreendimento único em Niterói. 
              Garante já sua unidade no Caminhos da Guanabara.
            </p>

            <div className="grid md:grid-cols-2 gap-12 items-start">
              <div className="space-y-6">
                <div className="text-left">
                  <h3 className="text-2xl font-bold mb-4">Por que escolher agora?</h3>
                  <ul className="space-y-3 text-gray-300">
                    <li className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                      Condições especiais de lançamento
                    </li>
                    <li className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                      Localização em valorização constante
                    </li>
                    <li className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                      Projeto arquitetônico exclusivo
                    </li>
                    <li className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                      Estrutura de lazer completa
                    </li>
                  </ul>
                </div>
              </div>

              <div>
                <LeadCaptureForm 
                  nomeLancamento={empreendimento.nome}
                  title="Receba Informações Exclusivas"
                  description="Fale com nossos especialistas e conheça as condições especiais"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LandingCaminhosGuanabara;
