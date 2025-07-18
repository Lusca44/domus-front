import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useApi } from '@/hooks/useApi';
import { lancamentoApi } from '@/utils/apiConfig';
import { Button } from '@/components/ui/button';
import { 
  MapPin, 
  Building, 
  Clock, 
  Home, 
  CheckCircle, 
  Users, 
  Waves, 
  TreePine, 
  ArrowLeft,
  Phone,
  Menu
} from 'lucide-react';
import LeadCaptureForm from '@/components/LeadCaptureForm';
import PhotoCarousel from '@/components/PhotoCarousel';
import Footer from '@/components/Footer';
import Header from '@/components/Header';
import { useIsMobile } from '@/hooks/use-mobile';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Card, CardContent } from '@/components/ui/card';
import { resolveImageUrl } from "@/utils/imageConfig";

interface Lancamento {
  id: string;
  nomeLancamento: string;
  urlFotoBackGround?: string;
  urlsFotos?: string[];
  slogan?: string;
  regiaoId?: string;
  endereco?: string;
  sobreLancamento?: {
    titulo: string;
    texto: string;
    cardsSobreLancamento?: Array<{
      icone: string;
      titulo: string;
      texto: string;
    }>;
  };
  diferenciaisLancamento?: string[];
  proximidadesDaLocalizacao?: string[];
  localizacaoMapsSource?: string;
  cardLancamentoInfo?: {
    valor: string;
    quartosDisponiveis: string[];
    isCardDestaque: boolean;
    areasDisponiveis: string[];
    finalidadeId: string;
    tipologiaId: string[];
    urlImagemCard: string;
    statusObra: 'Lançamento' | 'Em obras' | 'Pronto';
  };
  regiao?: { nome: string };
  tipologia?: { nome: string };
}

export default function DynamicLancamentoLanding() {
  const { id } = useParams<{ id: string }>();
  const [lancamento, setLancamento] = useState<Lancamento | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const isMobile = useIsMobile();
  
  const { execute: fetchLancamento } = useApi();

  useEffect(() => {
    const loadLancamento = async () => {
      if (!id) {
        setError('ID do lançamento não encontrado');
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const data = await fetchLancamento(() => lancamentoApi.getById(id));
        setLancamento(data);
      } catch (err) {
        console.error('Erro ao carregar lançamento:', err);
        setError('Erro ao carregar os dados do lançamento');
      } finally {
        setLoading(false);
      }
    };

    loadLancamento();
  }, [id, fetchLancamento]);

  // Prepara características para exibição
  const getCaracteristicas = () => {
    if (!lancamento) return [];
    
    return [
      ...(lancamento.tipologia?.nome ? [{
        titulo: 'Tipos',
        valor: lancamento.tipologia.nome,
        icone: Home
      }] : []),
      ...(lancamento.cardLancamentoInfo?.areasDisponiveis?.length ? [{
        titulo: 'Áreas',
        valor: lancamento.cardLancamentoInfo.areasDisponiveis.map(a => `${a}m²`).join(', '),
        icone: Building
      }] : []),
      ...(lancamento.cardLancamentoInfo?.statusObra ? [{
        titulo: 'Status',
        valor: lancamento.cardLancamentoInfo.statusObra,
        icone: Clock
      }] : []),
      ...(lancamento.regiao?.nome ? [{
        titulo: 'Região',
        valor: lancamento.regiao.nome,
        icone: MapPin
      }] : []),
      ...(lancamento.cardLancamentoInfo?.quartosDisponiveis?.length ? [{
        titulo: 'Quartos',
        valor: lancamento.cardLancamentoInfo.quartosDisponiveis.join(', '),
        icone: Home
      }] : [])
    ];
  };

  // Prepara as fotos para o carrossel
  const getFotos = () => {
    if (!lancamento) return [];
    
    const fotos = [];
    
    if (lancamento.urlFotoBackGround) {
      fotos.push({
        src: resolveImageUrl(lancamento.urlFotoBackGround),
        alt: `${lancamento.nomeLancamento} - Imagem principal`,
        titulo: 'Fachada'
      });
    }
    
    if (lancamento.urlsFotos) {
      lancamento.urlsFotos.forEach((img, index) => {
        fotos.push({
          src: resolveImageUrl(img),
          alt: `${lancamento.nomeLancamento} - Imagem ${index + 1}`,
          titulo: `Ambiente ${index + 1}`
        });

      });
    }
    
    return fotos;
  };

  // Renderização condicional para loading e erro
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-orange-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Carregando lançamento...</p>
        </div>
      </div>
    );
  }

  if (error || !lancamento) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-500 mb-4">
            <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Lançamento não encontrado</h1>
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

      {/* Hero Section - Mesmo design da LandingPixinguinha */}
      <section className="relative min-h-screen flex items-center overflow-hidden">
        {/* Background Image */}
        {lancamento.urlFotoBackGround && (
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage: `url(${lancamento.urlFotoBackGround})`,
            }}
          >
            {/* Overlay Gradiente */}
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
                  <Building className="w-3 h-3 md:w-4 md:h-4 mr-2" />
                  {lancamento.cardLancamentoInfo?.statusObra || "Lançamento"}
                </div>
                <h1
                  className={`font-bold text-white leading-tight ${
                    isMobile
                      ? "text-2xl sm:text-3xl"
                      : "text-3xl sm:text-4xl md:text-5xl lg:text-6xl"
                  }`}
                >
                  {lancamento.nomeLancamento}
                </h1>
                {lancamento.slogan && (
                  <p
                    className={`text-blue-200 font-light ${
                      isMobile
                        ? "text-base sm:text-lg"
                        : "text-lg sm:text-xl md:text-2xl"
                    }`}
                  >
                    {lancamento.slogan}
                  </p>
                )}
              </div>

              {lancamento.endereco && (
                <div className="flex items-start text-blue-100">
                  <MapPin className="w-4 h-4 md:w-5 md:h-5 mr-2 md:mr-3 mt-1 text-blue-400 flex-shrink-0" />
                  <p className="text-sm md:text-base lg:text-lg">
                    {lancamento.endereco}
                  </p>
                </div>
              )}

              {caracteristicas.length > 0 && (
                <div className="bg-white/15 backdrop-blur-sm rounded-xl p-4 md:p-6 border border-white/20 shadow-xl">
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-4">
                    {caracteristicas.map((item, index) => {
                      const IconComponent = item.icone;
                      return (
                        <div key={index} className="text-center">
                          <div className="bg-blue-500/25 backdrop-blur-sm rounded-lg p-2 md:p-3 mb-2 mx-auto w-fit border border-blue-400/30">
                            <IconComponent className="w-4 h-4 md:w-5 md:h-5 lg:w-6 lg:h-6 text-blue-300" />
                          </div>
                          <p className="text-xs text-blue-200 break-words">
                            {item.titulo}
                          </p>
                          <p className="font-semibold text-white text-xs md:text-sm break-words">
                            {item.valor}
                          </p>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>

            {/* Coluna do Formulário */}
            <div className={`${isMobile ? "" : "lg:col-span-5"}`}>
              <div className="bg-white/98 backdrop-blur-sm rounded-2xl shadow-2xl border border-white/30 overflow-hidden">
                <LeadCaptureForm
                  nomeLancamento={lancamento.nomeLancamento}
                  redirectTo="/obrigado"
                  title="Garanta sua unidade no lançamento!"
                  description="Preencha o formulário e nossa equipe entrará em contato com condições especiais"
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
                Explore todas as áreas e ambientes que farão parte do seu novo
                estilo de vida
              </p>
            </div>

            <PhotoCarousel photos={fotos} className="mb-8 md:mb-12 lg:mb-16" />
          </div>
        </section>
      )}

      {/* Seção de Diferenciais */}
      {lancamento.diferenciaisLancamento &&
        lancamento.diferenciaisLancamento.length > 0 && (
          <section className="flex items-center justify-center min-h-screen py-12 md:py-16 lg:py-20 bg-slate-50">
            <div className="container mx-auto px-4 flex justify-center">
              <div className="max-w-4xl w-full text-center">
                <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-4 md:mb-6 lg:mb-8 text-gray-900">
                  Diferenciais únicos
                </h2>
                <div
                  className={`grid grid-cols-1 gap-4 md:gap-6 justify-center`}
                >
                  {lancamento.diferenciaisLancamento.map((item, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-center group"
                    >
                      <CheckCircle className="w-4 h-4 md:w-5 md:h-5 text-green-500 mr-2 md:mr-3 flex-shrink-0 group-hover:scale-110 transition-transform" />
                      <span className="text-xs md:text-sm lg:text-base text-gray-700 group-hover:text-gray-900 transition-colors">
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
      {lancamento.endereco && (
        <section className="py-12 md:py-16 lg:py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-8 md:mb-12 lg:mb-16">
              <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-3 md:mb-4 text-gray-900">
                Localização Privilegiada
              </h2>
              <p className="text-sm md:text-base lg:text-lg text-gray-600 max-w-3xl mx-auto">
                {lancamento.endereco}
              </p>
            </div>

            <div
              className={`grid grid-cols-1 gap-6 md:gap-8 lg:grid-cols-2 lg:gap-12 items-center`}
            >
              {lancamento.proximidadesDaLocalizacao &&
                lancamento.proximidadesDaLocalizacao.length > 0 && (
                  <div className="space-y-4 md:space-y-6">
                    <div className="bg-blue-50 rounded-xl p-3 md:p-4 lg:p-6">
                      <h3 className="text-base md:text-lg lg:text-xl font-bold mb-3 md:mb-4 text-blue-900">
                        Proximidades da Localização:
                      </h3>
                      <ul className="space-y-2 md:space-y-3">
                        {lancamento.proximidadesDaLocalizacao.map(
                          (item, index) => (
                            <li key={index} className="flex items-start">
                              <CheckCircle className="w-4 h-4 md:w-5 md:h-5 text-blue-500 mr-2 md:mr-3 flex-shrink-0 mt-0.5" />
                              <span className="text-xs md:text-sm lg:text-base text-gray-700">
                                {item}
                              </span>
                            </li>
                          )
                        )}
                      </ul>
                    </div>
                  </div>
                )}

              {lancamento.localizacaoMapsSource && (
                <div className="rounded-2xl overflow-hidden shadow-2xl">
                  <iframe
                    src={lancamento.localizacaoMapsSource}
                    width="100%"
                    height="400"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title={`Localização do ${lancamento.nomeLancamento}`}
                    className={`w-full ${isMobile ? "h-64" : "h-80 lg:h-96"}`}
                  ></iframe>
                </div>
              )}
            </div>
          </div>
        </section>
      )}

      {/* CTA Final */}
      <section className="py-12 md:py-16 lg:py-20 bg-gradient-to-r from-blue-600 to-blue-800 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold mb-3 md:mb-4 lg:mb-6">
              Não Perca Esta Oportunidade!
            </h2>
            <p className="text-base md:text-lg lg:text-xl mb-6 md:mb-8 lg:mb-12 text-blue-100">
              Garanta já sua unidade no {lancamento.nomeLancamento} com
              condições especiais de lançamento
            </p>

            <div
              className={`grid grid-cols-1 gap-6 md:gap-8 lg:grid-cols-2 lg:gap-12 items-center`}
            >
              <div className="space-y-3 md:space-y-4 lg:space-y-6">
                <div className="text-left">
                  <h3 className="text-lg md:text-xl lg:text-2xl font-bold mb-3 md:mb-4">
                    Condições Especiais de Lançamento:
                  </h3>
                  <ul className="space-y-1 md:space-y-2 text-blue-100">
                    <li className="text-sm md:text-base">
                      • Entrada facilitada
                    </li>
                    <li className="text-sm md:text-base">
                      • Financiamento direto com a construtora
                    </li>
                    <li className="text-sm md:text-base">
                      • Desconto especial para pagamento à vista
                    </li>
                    <li className="text-sm md:text-base">
                      • Parcelas durante a obra
                    </li>
                  </ul>
                </div>
              </div>

              <div className="bg-white/15 backdrop-blur-sm rounded-2xl p-3 md:p-4 lg:p-6 border border-white/20">
                <LeadCaptureForm
                  nomeLancamento={lancamento.nomeLancamento}
                  redirectTo="/obrigado"
                  title="Quero garantir minha unidade"
                  description="Preencha seus dados para receber mais informações"
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