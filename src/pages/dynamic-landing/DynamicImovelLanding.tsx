
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useApi } from '@/hooks/useApi';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  MapPin,
  Phone,
  Mail,
  Star,
  Car,
  Home,
  ArrowLeft,
  CheckCircle,
  Building,
  Loader2,
  Bath,
  Bed,
  Square,
  MapPin as Location,
} from 'lucide-react';
import LeadCaptureForm from '@/components/LeadCaptureForm';
import PhotoCarousel from '@/components/PhotoCarousel';
import { Link } from 'react-router-dom';
import Footer from '@/components/Footer';
import Header from '@/components/Header';
import { ImovelAPI } from '@/types/api';
import { supabase, isSupabaseConfigured } from "@/integrations/supabase/client";

/**
 * Landing Page Dinâmica para Imóveis
 * 
 * Esta página gera automaticamente uma landing page para qualquer imóvel
 * cadastrado no sistema, consumindo dados da API do backend.
 */
export default function DynamicImovelLanding() {
  const { id } = useParams<{ id: string }>();
  const [imovel, setImovel] = useState<ImovelAPI | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  /**
   * Carrega os dados do imóvel pela API
   */
  useEffect(() => {
    const loadImovel = async () => {
      if (!id) {
        setError('ID do imóvel não encontrado');
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        
        if (!isSupabaseConfigured() || !supabase) {
          console.warn('Supabase not configured, using mock data');
          // Mock data for development
          const mockImovel: ImovelAPI = {
            id: id,
            titulo: "Apartamento Moderno no Centro",
            urlFotoCard: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800",
            urlsFotos: [
              "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800",
              "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800"
            ],
            finalidadeId: ["Venda"],
            tipologiaId: ["Apartamento"],
            regiaoId: "Centro",
            endereco: "Rua das Flores, 123 - Centro, Rio de Janeiro",
            quantidadeQuartos: "2",
            quantidadeBanheiros: "1",
            quantidadeVagas: "1",
            quantidadeSuites: "1",
            areaQuadrada: "65",
            descricaoImovel: "Apartamento moderno e bem localizado no centro da cidade",
            valor: "450000",
            valorCondominio: "350",
            valorIptu: "200",
            urlLocalizacaoMaps: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3675.2962040845813!2d-43.18753!3d-22.903538!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x997f58a6a00a9d%3A0x3f251d85272aa76a!2sTeatro%20Municipal%20do%20Rio%20de%20Janeiro!5e0!3m2!1spt-BR!2sbr!4v1673886755654!5m2!1spt-BR!2sbr"
          };
          setImovel(mockImovel);
          setLoading(false);
          return;
        }
        
        const { data, error } = await supabase.functions.invoke('obterImovelPorId', {
          body: { id }
        });
        
        if (error) {
          throw error;
        }
        
        setImovel(data);
      } catch (err) {
        console.error('Erro ao carregar imóvel:', err);
        setError('Erro ao carregar os dados do imóvel');
      } finally {
        setLoading(false);
      }
    };

    loadImovel();
  }, [id]);

  /**
   * Prepara as características para exibição
   */
  const getCaracteristicas = () => {
    if (!imovel) return [];
    
    const caracteristicas = [];
    
    if (imovel.tipologiaId && imovel.tipologiaId.length > 0) {
      caracteristicas.push({
        titulo: 'Tipo',
        valor: imovel.tipologiaId.join(', '),
        icone: Home
      });
    }
    
    if (imovel.areaQuadrada) {
      caracteristicas.push({
        titulo: 'Área',
        valor: `${imovel.areaQuadrada}m²`,
        icone: Square
      });
    }
    
    if (imovel.quantidadeQuartos) {
      const quartos = parseInt(imovel.quantidadeQuartos);
      caracteristicas.push({
        titulo: 'Quartos',
        valor: `${quartos} ${quartos === 1 ? 'quarto' : 'quartos'}`,
        icone: Bed
      });
    }
    
    if (imovel.quantidadeBanheiros) {
      const banheiros = parseInt(imovel.quantidadeBanheiros);
      caracteristicas.push({
        titulo: 'Banheiros',
        valor: `${banheiros} ${banheiros === 1 ? 'banheiro' : 'banheiros'}`,
        icone: Bath
      });
    }
    
    if (imovel.quantidadeVagas) {
      const vagas = parseInt(imovel.quantidadeVagas);
      caracteristicas.push({
        titulo: 'Vagas',
        valor: `${vagas} ${vagas === 1 ? 'vaga' : 'vagas'}`,
        icone: Car
      });
    }
    
    if (imovel.regiaoId) {
      caracteristicas.push({
        titulo: 'Região',
        valor: imovel.regiaoId,
        icone: Location
      });
    }

    return caracteristicas;
  };

  /**
   * Prepara as fotos para o carrossel
   */
  const getFotos = () => {
    if (!imovel) return [];
    
    const fotos = [];
    
    if (imovel.urlFotoCard) {
      fotos.push({
        src: imovel.urlFotoCard,
        alt: `${imovel.titulo} - Imagem principal`,
        titulo: 'Fachada'
      });
    }
    
    if (imovel.urlsFotos && imovel.urlsFotos.length > 0) {
      imovel.urlsFotos.forEach((img, index) => {
        fotos.push({
          src: img,
          alt: `${imovel.titulo} - Imagem ${index + 1}`,
          titulo: `Ambiente ${index + 1}`
        });
      });
    }
    
    return fotos;
  };

  /**
   * Determina a cor do tema baseado na finalidade
   */
  const getThemeColors = () => {
    const finalidade = imovel?.finalidadeId?.[0]?.toLowerCase();
    
    if (finalidade === 'aluguel') {
      return {
        primary: 'blue',
        gradient: 'from-blue-50 to-indigo-50',
        heroGradient: 'from-blue-900/80 via-blue-800/70 to-indigo-900/80',
        buttonBg: 'bg-blue-600 hover:bg-blue-700',
        accentBg: 'bg-blue-600/20',
        accentBorder: 'border-blue-400/30',
        cardGradient: 'from-blue-50 to-indigo-50',
        cardBorder: 'border-blue-100',
        iconBg: 'from-blue-600 to-indigo-600',
        ctaGradient: 'from-blue-600 to-indigo-600'
      };
    }
    
    // Padrão para venda
    return {
      primary: 'green',
      gradient: 'from-green-50 to-emerald-50',
      heroGradient: 'from-green-900/80 via-green-800/70 to-emerald-900/80',
      buttonBg: 'bg-green-600 hover:bg-green-700',
      accentBg: 'bg-green-600/20',
      accentBorder: 'border-green-400/30',
      cardGradient: 'from-green-50 to-emerald-50',
      cardBorder: 'border-green-100',
      iconBg: 'from-green-600 to-emerald-600',
      ctaGradient: 'from-green-600 to-emerald-600'
    };
  };

  /**
   * Estados de loading e erro
   */
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-8 h-8 animate-spin mx-auto mb-4 text-gray-600" />
          <p className="text-gray-600">Carregando imóvel...</p>
        </div>
      </div>
    );
  }

  if (error || !imovel) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-500 mb-4">
            <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Imóvel não encontrado</h1>
          <p className="text-gray-600 mb-4">{error}</p>
          <Button asChild>
            <Link to="/">Voltar ao início</Link>
          </Button>
        </div>
      </div>
    );
  }

  const caracteristicas = getCaracteristicas();
  const fotos = getFotos();
  const theme = getThemeColors();

  return (
    <div className={`min-h-screen bg-gradient-to-br ${theme.gradient}`}>
      {/* Header */}
      <Header />

      {/* Hero Section */}
      <section
        className="relative h-screen flex items-center justify-center text-white overflow-hidden"
        style={{
          backgroundImage: imovel.urlFotoCard ? `url("${imovel.urlFotoCard}")` : `linear-gradient(135deg, ${theme.primary === 'blue' ? '#2563eb' : '#059669'} 0%, ${theme.primary === 'blue' ? '#1d4ed8' : '#047857'} 100%)`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        {/* Overlay */}
        <div className={`absolute inset-0 bg-gradient-to-br ${theme.heroGradient}`}></div>

        <div className="relative z-10 text-center max-w-4xl mx-auto px-4">
          <div className="mb-6">
            <div className={`inline-flex items-center space-x-2 ${theme.accentBg} backdrop-blur-sm px-4 py-2 rounded-full border ${theme.accentBorder} mb-4`}>
              <Star className="w-4 h-4 text-yellow-400" />
              <span className="text-sm font-medium">
                {imovel.finalidadeId?.[0] || 'Disponível'}
              </span>
            </div>
          </div>

          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
            <span className="block text-white">{imovel.titulo}</span>
            {imovel.tipologiaId && imovel.tipologiaId.length > 0 && (
              <span className="block text-2xl md:text-3xl lg:text-4xl font-normal text-white/90 mt-2">
                {imovel.tipologiaId.join(', ')}
              </span>
            )}
          </h1>

          {imovel.descricaoImovel && (
            <p className="text-lg md:text-xl text-white/90 mb-8 max-w-2xl mx-auto leading-relaxed">
              {imovel.descricaoImovel}
            </p>
          )}

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            {caracteristicas.slice(0, 3).map((item, index) => {
              const IconComponent = item.icone;
              return (
                <div key={index} className="flex items-center space-x-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-lg border border-white/20">
                  <IconComponent className="w-4 h-4" />
                  <span>{item.valor}</span>
                </div>
              );
            })}
          </div>

          {imovel.valor && (
            <div className="mb-8">
              <div className="inline-block bg-white/15 backdrop-blur-sm rounded-xl px-6 py-4 border border-white/20">
                <span className="text-2xl md:text-3xl font-bold">
                  R$ {parseInt(imovel.valor).toLocaleString('pt-BR')}
                </span>
                {imovel.finalidadeId?.[0]?.toLowerCase() === 'aluguel' && (
                  <span className="text-lg text-white/80 ml-2">/mês</span>
                )}
                {imovel.valorCondominio && (
                  <div className="text-sm text-white/70 mt-1">
                    + Condomínio R$ {parseInt(imovel.valorCondominio).toLocaleString('pt-BR')}
                  </div>
                )}
              </div>
            </div>
          )}

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              className={`${theme.buttonBg} text-white px-8 py-3 text-lg`}
              onClick={() =>
                document
                  .getElementById("form-interesse")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
            >
              Tenho Interesse
            </Button>
            {fotos.length > 0 && (
              <Button
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white hover:text-gray-800 px-8 py-3 text-lg"
                onClick={() =>
                  document
                    .getElementById("carrossel")
                    ?.scrollIntoView({ behavior: "smooth" })
                }
              >
                Ver Fotos
              </Button>
            )}
          </div>
        </div>

        {/* Indicador de scroll */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white/70 rounded-full mt-2 animate-pulse"></div>
          </div>
        </div>
      </section>

      {/* Seção de Características */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Características do Imóvel
            </h2>
            {imovel.descricaoImovel && (
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                {imovel.descricaoImovel}
              </p>
            )}
          </div>

          {caracteristicas.length > 0 && (
            <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              {caracteristicas.slice(0, 6).map((item, index) => {
                const IconComponent = item.icone;
                return (
                  <div key={index} className={`text-center p-6 rounded-xl bg-gradient-to-br ${theme.cardGradient} border ${theme.cardBorder}`}>
                    <div className={`w-16 h-16 bg-gradient-to-br ${theme.iconBg} rounded-full flex items-center justify-center mx-auto mb-4`}>
                      <IconComponent className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">
                      {item.titulo}
                    </h3>
                    <p className="text-gray-600">{item.valor}</p>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* Carrossel de Fotos */}
      {fotos.length > 0 && (
        <section
          id="carrossel"
          className={`py-16 bg-gradient-to-br ${theme.gradient}`}
        >
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Conheça o Imóvel
              </h2>
              <p className="text-lg text-gray-600">
                Veja todos os detalhes em imagens
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
      )}

      {/* Seção de Localização */}
      {imovel.endereco && (
        <section className={`py-16 bg-gradient-to-br ${theme.gradient}`}>
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Localização
              </h2>
              <p className="text-lg text-gray-600">
                {imovel.endereco}
              </p>
            </div>

            {imovel.urlLocalizacaoMaps && (
              <div className="max-w-4xl mx-auto">
                <div className={`bg-white rounded-2xl shadow-xl p-8 border ${theme.cardBorder}`}>
                  <iframe
                    src={imovel.urlLocalizacaoMaps}
                    width="100%"
                    height="400"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title={`Localização de ${imovel.titulo}`}
                    className="w-full h-96 rounded-xl"
                  />
                </div>
              </div>
            )}
          </div>
        </section>
      )}

      {/* CTA Section - Formulário */}
      <section
        id="form-interesse"
        className={`py-16 bg-gradient-to-br ${theme.ctaGradient} text-white`}
      >
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Interessado neste imóvel?
              </h2>
              <p className="text-lg text-white/90">
                Preencha o formulário e nossa equipe entrará em contato para 
                {imovel.finalidadeId?.[0]?.toLowerCase() === 'aluguel' ? ' agendar uma visita' : ' mais informações'}
              </p>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
              <LeadCaptureForm
                nomeLancamento={imovel.titulo}
                title="Fale conosco"
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
}
