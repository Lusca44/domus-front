import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useApi } from '@/hooks/useApi';
import { imovelApi } from '@/utils/apiConfig';
import { Button } from '@/components/ui/button';
import {
  MapPin,
  Phone,
  Car,
  Home,
  ArrowLeft,
  CheckCircle,
  Loader2,
  Bath,
  Bed,
  Square,
  MapPin as Location,
  Menu,
} from 'lucide-react';
import LeadCaptureForm from '@/components/LeadCaptureForm';
import PhotoCarousel from '@/components/OptimizedPhotoCarousel';
import { Link } from 'react-router-dom';
import Footer from '@/components/Footer';
import Header from '@/components/Header';
import { resolveImageUrl } from "@/utils/imageConfig";
import { useIsMobile } from '@/hooks/use-mobile';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';

interface Imovel {
  id: string;
  titulo: string;
  descricaoImovel?: string;
  endereco?: string;
  valor?: number;
  areaQuadrada?: string;
  quantidadeQuartos?: number;
  quantidadeBanheiros?: number;
  quantidadeVagas?: number;
  urlFotoCard?: string;
  urlsFotos?: string[];
  urlLocalizacaoMaps?: string;
  diferenciais?: string[];
  finalidadeId?: { nome: string };
  regiaoId?: { nome: string };
  tipologiaId?: { nome: string };
  finalidade?: any;
  regiao?: any;
  valorCondominio?: number;
  valorIptu?: number;
  quantidadeSuites?: number;
  tipologia?: any;
}

/**
 * Landing Page Dinâmica para Imóveis com tema azul
 */
export default function DynamicImovelLanding() {
  const { id } = useParams<{ id: string }>();
  const [imovel, setImovel] = useState<Imovel | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const isMobile = useIsMobile();
  
  const { execute: fetchImovel } = useApi();

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
        const data = await fetchImovel(() => imovelApi.getById(id));
        console.log(data)
        setImovel(data);
      } catch (err) {
        console.error('Erro ao carregar imóvel:', err);
        setError('Erro ao carregar os dados do imóvel');
      } finally {
        setLoading(false);
      }
    };

    loadImovel();
  }, [id, fetchImovel]);

  /**
   * Prepara as características para exibição
   */
  const getCaracteristicas = () => {
    if (!imovel) return [];
    
    const caracteristicas = [];
    
    if (imovel.tipologia?.nome) {
      caracteristicas.push({
        titulo: 'Tipo',
        valor: imovel.tipologia.nome,
        icone: Home
      });
    }
    
    if (imovel.areaQuadrada) {
      caracteristicas.push({
        titulo: 'Área',
        valor: imovel.areaQuadrada,
        icone: Square
      });
    }
    
    if (imovel.quantidadeQuartos) {
      caracteristicas.push({
        titulo: 'Quartos',
        valor: `${imovel.quantidadeQuartos} ${imovel.quantidadeQuartos === 1 ? 'quarto' : 'quartos'}`,
        icone: Bed
      });
    }
    
    if (imovel.quantidadeBanheiros) {
      caracteristicas.push({
        titulo: 'Banheiros',
        valor: `${imovel.quantidadeBanheiros} ${imovel.quantidadeBanheiros === 1 ? 'banheiro' : 'banheiros'}`,
        icone: Bath
      });
    }
    
    if (imovel.quantidadeVagas) {
      caracteristicas.push({
        titulo: 'Vagas',
        valor: `${imovel.quantidadeVagas} ${imovel.quantidadeVagas === 1 ? 'vaga' : 'vagas'}`,
        icone: Car
      });
    }
    
    if (imovel.regiao?.nome) {
      caracteristicas.push({
        titulo: 'Região',
        valor: imovel.regiao.nome,
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

      console.log("FOTO BACK")
      console.log(imovel.urlFotoCard)
      fotos.push({
        src: resolveImageUrl(imovel.urlFotoCard),
        alt: `${imovel.urlFotoCard} - Imagem principal`,
        titulo: 'Fachada'
      });
    }
    
    if (imovel.urlsFotos && imovel.urlsFotos.length > 0) {
      imovel.urlsFotos.forEach((img, index) => {
        fotos.push({
          src: resolveImageUrl(img),
          alt: `${imovel.titulo} - Imagem ${index + 1}`,
          titulo: `Ambiente ${index + 1}`
        });
      });
    }
    
    return fotos;
  };

  /**
   * Estados de loading e erro
   */
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-8 h-8 animate-spin mx-auto mb-4 text-blue-600" />
          <p className="text-blue-600">Carregando imóvel...</p>
        </div>
      </div>
    );
  }

  if (error || !imovel) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 flex items-center justify-center">
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

  // Componente para o menu mobile
  const MobileMenu = () => (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="md:hidden">
          <Menu className="w-5 h-5" />
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="w-80">
        <div className="flex flex-col space-y-6 mt-6">
          <Link
            to="/"
            className="flex items-center text-blue-600 hover:text-blue-700 transition-colors text-lg"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Voltar para Início
          </Link>
          <div className="border-t pt-4">
            <a 
              href="tel:+552122223333" 
              className="flex items-center text-gray-900 hover:text-blue-600 transition-colors text-lg font-semibold"
            >
              <Phone className="w-5 h-5 mr-3" />
              (21) 2222-3333
            </a>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <Header />

      {/* Hero Section - Design atualizado com tons de azul */}
      <section className="relative min-h-screen flex items-center overflow-hidden">
        {/* Background Image */}
        {imovel.urlFotoCard ? (
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage: `url(${resolveImageUrl(imovel.urlFotoCard)})`,
            }}
          >
            {/* Overlay Gradiente */}
            <div className="absolute inset-0 bg-gradient-to-r from-blue-900/90 via-blue-900/70 to-blue-900/90"></div>
            <div className="absolute inset-0 bg-gradient-to-t from-blue-900/80 via-transparent to-blue-900/60"></div>
          </div>
        ) : (
          <div className="absolute inset-0 bg-cover bg-center bg-no-repeat">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-900/90 via-blue-900/70 to-blue-900/90"></div>
            <div className="absolute inset-0 bg-gradient-to-t from-blue-900/80 via-transparent to-blue-900/60"></div>
          </div>
        )}

        {/* Background Pattern Adicional */}
        <div className="absolute inset-0 opacity-20 z-10">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/30 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-cyan-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        </div>

        <div className="container mx-auto px-4 py-8 md:py-16 relative z-20">
          <div
            className={`grid grid-cols-1 ${
              isMobile ? "gap-8" : "lg:grid-cols-12 gap-8 lg:gap-12"
            } items-center min-h-[80vh]`}
          >
            {/* Coluna de Conteúdo */}
            <div
              className={`${
                isMobile ? "" : "lg:col-span-7"
              } space-y-4 md:space-y-6 lg:space-y-8`}
            >
              <div className="space-y-3 md:space-y-4">
                <div className="inline-flex items-center px-3 md:px-4 py-2 bg-blue-500/30 backdrop-blur-sm rounded-full text-blue-200 text-xs md:text-sm font-medium border border-blue-400/30">
                  <Home className="w-3 h-3 md:w-4 md:h-4 mr-2" />
                  {imovel.finalidade?.nome || "Disponível"}
                </div>
                <h1
                  className={`font-bold text-white leading-tight ${
                    isMobile
                      ? "text-2xl sm:text-3xl"
                      : "text-3xl sm:text-4xl md:text-5xl lg:text-6xl"
                  }`}
                >
                  {imovel.titulo}
                </h1>
                {imovel.tipologia?.nome && (
                  <p
                    className={`text-blue-200 font-light ${
                      isMobile
                        ? "text-base sm:text-lg"
                        : "text-lg sm:text-xl md:text-2xl"
                    }`}
                  >
                    {imovel.tipologia.nome}
                  </p>
                )}
              </div>

              {imovel.endereco && (
                <div className="flex items-start text-blue-100">
                  <MapPin className="w-4 h-4 md:w-5 md:h-5 mr-2 md:mr-3 mt-1 text-blue-400 flex-shrink-0" />
                  <p className="text-sm md:text-base lg:text-lg">
                    {imovel.endereco}
                  </p>
                </div>
              )}

              {/* Características */}
              <div className="flex flex-wrap gap-3 mt-4">
                {caracteristicas.slice(0, 3).map((item, index) => {
                  const IconComponent = item.icone;
                  return (
                    <div
                      key={index}
                      className="flex items-center space-x-2 bg-blue-500/20 backdrop-blur-sm px-3 py-1.5 rounded-lg border border-blue-400/30 text-blue-100"
                    >
                      <IconComponent className="w-3 h-3 md:w-4 md:h-4" />
                      <span className="text-xs md:text-sm">{item.valor}</span>
                    </div>
                  );
                })}
              </div>

              {imovel.valor && (
                <div className="mt-4">
                  <div className="inline-block bg-white/15 backdrop-blur-sm rounded-xl px-4 py-3 md:px-6 md:py-4 border border-white/20">
                    <span className="text-xl md:text-2xl lg:text-3xl font-bold text-white">
                      R$ {imovel.valor.toLocaleString("pt-BR")}
                    </span>
                    {imovel.finalidade?.nome?.toLowerCase() === "aluguel" && (
                      <span className="text-base md:text-lg text-blue-200 ml-2">
                        /mês
                      </span>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Coluna do Formulário */}
            <div className={`${isMobile ? "" : "lg:col-span-5"}`}>
              <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-2xl border border-white/30 overflow-hidden">
                <LeadCaptureForm
                  nomeLancamento={imovel.titulo}
                  redirectTo="/obrigado"
                  title="Tenho interesse neste imóvel"
                  description="Preencha o formulário e nossa equipe entrará em contato"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Seção de Galeria */}
      {fotos.length > 0 && (
        <section className="py-12 md:py-16 lg:py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-8 md:mb-12 lg:mb-16">
              <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-3 md:mb-4 text-gray-900">
                Conheça cada detalhe
              </h2>
              <p className="text-sm md:text-base lg:text-lg text-gray-600 max-w-2xl mx-auto">
                Explore todos os ambientes que farão parte do seu novo lar
              </p>
            </div>

            <PhotoCarousel
              photos={fotos}
              className="rounded-2xl overflow-hidden shadow-2xl mb-8 md:mb-12 lg:mb-16"
            />
          </div>
        </section>
      )}

      {/* Seção de Características */}
      <section className="py-12 md:py-16 lg:py-20 bg-blue-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8 md:mb-12 lg:mb-16">
            <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-3 md:mb-4 text-gray-900">
              Características do Imóvel
            </h2>
            {imovel.descricaoImovel && (
              <p className="text-sm md:text-base lg:text-lg text-gray-600 max-w-2xl mx-auto">
                {imovel.descricaoImovel}
              </p>
            )}
          </div>

          {caracteristicas.length > 0 && (
            <div className="flex flex-wrap justify-center gap-6 max-w-6xl mx-auto">
              {caracteristicas.map((item, index) => {
                const IconComponent = item.icone;
                return (
                  <div
                    key={index}
                    className="w-full md:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)] bg-white rounded-xl p-6 border border-blue-100 shadow-sm hover:shadow-md transition-shadow"
                  >
                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                      <IconComponent className="w-6 h-6 text-blue-600" />
                    </div>
                    <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-2">
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

      {/* Seção de Diferenciais */}
      {imovel.diferenciais && imovel.diferenciais.length > 0 && (
        <section className="py-12 md:py-16 lg:py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-8 md:mb-12 lg:mb-16">
              <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-3 md:mb-4 text-gray-900">
                Diferenciais do Imóvel
              </h2>
              <p className="text-sm md:text-base lg:text-lg text-gray-600">
                Tudo o que torna este imóvel especial
              </p>
            </div>

            <div className="max-w-4xl mx-auto">
              <div className="grid md:grid-cols-2 gap-4">
                {imovel.diferenciais.map((item, index) => (
                  <div
                    key={index}
                    className="flex items-center group bg-blue-50 p-4 rounded-lg border border-blue-100"
                  >
                    <CheckCircle className="w-5 h-5 text-blue-600 mr-3 flex-shrink-0 group-hover:text-green-500 transition-colors" />
                    <span className="text-gray-700 group-hover:text-gray-900 transition-colors">
                      {item}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Seção de Localização */}
      {imovel.endereco && (
        <section className="py-12 md:py-16 lg:py-20 bg-blue-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-8 md:mb-12 lg:mb-16">
              <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-3 md:mb-4 text-gray-900">
                Localização
              </h2>
              <p className="text-sm md:text-base lg:text-lg text-gray-600">
                {imovel.endereco}
              </p>
            </div>

            {imovel.urlLocalizacaoMaps && (
              <div className="max-w-4xl mx-auto">
                <div className="bg-white rounded-2xl shadow-xl p-4 md:p-6 border border-blue-100">
                  <iframe
                    src={imovel.urlLocalizacaoMaps}
                    width="100%"
                    height="400"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title={`Localização de ${imovel.titulo}`}
                    className="w-full h-80 md:h-96 rounded-lg"
                  />
                </div>
              </div>
            )}
          </div>
        </section>
      )}

      {/* CTA Final */}
      <section className="py-12 md:py-16 lg:py-20 bg-gradient-to-r from-blue-600 to-blue-800 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-3 md:mb-4">
              Não perca esta oportunidade!
            </h2>
            <p className="text-sm md:text-base lg:text-lg mb-6 md:mb-8 text-blue-100">
              Entre em contato agora mesmo e agende sua visita
            </p>

            <div className="grid grid-cols-1 gap-6 md:gap-8 lg:grid-cols-2 lg:gap-12 items-center">
              <div className="space-y-3 md:space-y-4">
                <div className="text-left bg-blue-500/20 p-4 rounded-lg">
                  <h3 className="text-lg md:text-xl font-bold mb-3">
                    Condições especiais:
                  </h3>
                  <ul className="space-y-1 text-blue-100">
                    <li className="flex items-start">
                      <CheckCircle className="w-4 h-4 text-blue-300 mr-2 mt-0.5 flex-shrink-0" />
                      <span>Financiamento facilitado</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="w-4 h-4 text-blue-300 mr-2 mt-0.5 flex-shrink-0" />
                      <span>Desconto para pagamento à vista</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="w-4 h-4 text-blue-300 mr-2 mt-0.5 flex-shrink-0" />
                      <span>Visita personalizada</span>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="bg-white/15 backdrop-blur-sm rounded-2xl p-4 md:p-6 border border-white/20">
                <LeadCaptureForm
                  nomeLancamento={imovel.titulo}
                  redirectTo="/obrigado"
                  title="Quero saber mais"
                  description="Preencha seus dados para receber informações"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
}