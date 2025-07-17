
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useApi } from '@/hooks/useApi';
import { lancamentoApi } from '@/utils/apiConfig';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
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
  ArrowLeft,
  CheckCircle,
  Building,
  Loader2,
} from 'lucide-react';
import LeadCaptureForm from '@/components/LeadCaptureForm';
import PhotoCarousel from '@/components/PhotoCarousel';
import { Link } from 'react-router-dom';
import Footer from '@/components/Footer';
import Header from '@/components/Header';

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

/**
 * Landing Page Dinâmica para Lançamentos
 * 
 * Esta página gera automaticamente uma landing page para qualquer lançamento
 * cadastrado no sistema, consumindo dados da API do backend.
 */
export default function DynamicLancamentoLanding() {
  const { id } = useParams<{ id: string }>();
  const [lancamento, setLancamento] = useState<Lancamento | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  const { execute: fetchLancamento } = useApi();

  /**
   * Carrega os dados do lançamento pela API
   */
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

  /**
   * Prepara as características para exibição
   */
  const getCaracteristicas = () => {
    if (!lancamento) return [];
    
    const caracteristicas = [];
    
    if (lancamento.tipologia?.nome) {
      caracteristicas.push({
        titulo: 'Tipo',
        valor: lancamento.tipologia.nome,
        icone: Home
      });
    }
    
    if (lancamento.cardLancamentoInfo?.areasDisponiveis && lancamento.cardLancamentoInfo.areasDisponiveis.length > 0) {
      caracteristicas.push({
        titulo: 'Áreas',
        valor: lancamento.cardLancamentoInfo.areasDisponiveis.map(a => `${a}m²`).join(', '),
        icone: Building
      });
    }
    
    if (lancamento.cardLancamentoInfo?.statusObra) {
      caracteristicas.push({
        titulo: 'Status',
        valor: lancamento.cardLancamentoInfo.statusObra,
        icone: Clock
      });
    }
    
    if (lancamento.regiao?.nome) {
      caracteristicas.push({
        titulo: 'Região',
        valor: lancamento.regiao.nome,
        icone: MapPin
      });
    }

    if (lancamento.cardLancamentoInfo?.quartosDisponiveis && lancamento.cardLancamentoInfo.quartosDisponiveis.length > 0) {
      caracteristicas.push({
        titulo: 'Quartos',
        valor: lancamento.cardLancamentoInfo.quartosDisponiveis.join(', '),
        icone: Home
      });
    }

    return caracteristicas;
  };

  /**
   * Prepara as fotos para o carrossel
   */
  const getFotos = () => {
    if (!lancamento) return [];
    
    const fotos = [];
    
    if (lancamento.urlFotoBackGround) {
      fotos.push({
        src: lancamento.urlFotoBackGround,
        alt: `${lancamento.nomeLancamento} - Imagem principal`,
        titulo: 'Fachada'
      });
    }
    
    if (lancamento.urlsFotos && lancamento.urlsFotos.length > 0) {
      lancamento.urlsFotos.forEach((img, index) => {
        fotos.push({
          src: img,
          alt: `${lancamento.nomeLancamento} - Imagem ${index + 1}`,
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
      <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-8 h-8 animate-spin mx-auto mb-4 text-orange-600" />
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50">
      {/* Header */}
      <Header />

      {/* Hero Section */}
      <section
        className="relative h-screen flex items-center justify-center text-white overflow-hidden"
        style={{
          backgroundImage: lancamento.urlFotoBackGround ? `url("${lancamento.urlFotoBackGround}")` : 'linear-gradient(135deg, #f97316 0%, #ea580c 100%)',
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-orange-900/80 via-red-800/70 to-amber-900/80"></div>

        <div className="relative z-10 text-center max-w-4xl mx-auto px-4">
          <div className="mb-6">
            <div className="inline-flex items-center space-x-2 bg-orange-600/20 backdrop-blur-sm px-4 py-2 rounded-full border border-orange-400/30 mb-4">
              <Star className="w-4 h-4 text-yellow-400" />
              <span className="text-sm font-medium">{lancamento.cardLancamentoInfo?.statusObra || 'Lançamento'}</span>
            </div>
          </div>

          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
            <span className="block text-orange-100">{lancamento.nomeLancamento}</span>
            {lancamento.slogan && (
              <span className="block text-2xl md:text-3xl lg:text-4xl font-normal text-orange-200 mt-2">
                {lancamento.slogan}
              </span>
            )}
          </h1>

          {lancamento.sobreLancamento?.texto && (
            <p className="text-lg md:text-xl text-orange-100 mb-8 max-w-2xl mx-auto leading-relaxed">
              {lancamento.sobreLancamento.texto}
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
            {fotos.length > 0 && (
              <Button
                size="lg"
                variant="outline"
                className="border-white text-orange-600 hover:bg-white hover:text-orange-800 px-8 py-3 text-lg"
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

      {/* Seção de Destaque */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              {lancamento.nomeLancamento}
            </h2>
            {lancamento.sobreLancamento?.titulo && (
              <h3 className="text-xl font-semibold text-orange-600 mb-2">
                {lancamento.sobreLancamento.titulo}
              </h3>
            )}
            {lancamento.sobreLancamento?.texto && (
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                {lancamento.sobreLancamento.texto}
              </p>
            )}
          </div>

          {caracteristicas.length > 0 && (
            <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              {caracteristicas.slice(0, 3).map((item, index) => {
                const IconComponent = item.icone;
                return (
                  <div key={index} className="text-center p-6 rounded-xl bg-gradient-to-br from-orange-50 to-red-50 border border-orange-100">
                    <div className="w-16 h-16 bg-gradient-to-br from-orange-600 to-red-600 rounded-full flex items-center justify-center mx-auto mb-4">
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
          className="py-16 bg-gradient-to-br from-orange-50 to-red-50"
        >
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Conheça o {lancamento.nomeLancamento}
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
      )}

      {/* Seção de Diferenciais */}
      {lancamento.diferenciaisLancamento && lancamento.diferenciaisLancamento.length > 0 && (
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Diferenciais únicos
              </h2>
              <p className="text-lg text-gray-600">
                Tudo o que você precisa para uma vida completa
              </p>
            </div>

            <div className="max-w-4xl mx-auto">
              <div className="grid md:grid-cols-2 gap-4">
                {lancamento.diferenciaisLancamento.map((item, index) => (
                  <div key={index} className="flex items-center group">
                    <CheckCircle className="w-5 h-5 text-green-500 mr-3 flex-shrink-0 group-hover:scale-110 transition-transform" />
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

      {/* Seção de Proximidades */}
      {lancamento.proximidadesDaLocalizacao && lancamento.proximidadesDaLocalizacao.length > 0 && (
        <section className="py-16 bg-gradient-to-br from-orange-50 to-red-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Proximidades e Conveniências
              </h2>
              <p className="text-lg text-gray-600">
                Tudo que você precisa está pertinho de você
              </p>
            </div>

            <div className="max-w-4xl mx-auto">
              <div className="grid md:grid-cols-2 gap-4">
                {lancamento.proximidadesDaLocalizacao.map((item, index) => (
                  <div key={index} className="flex items-center group">
                    <MapPin className="w-5 h-5 text-orange-500 mr-3 flex-shrink-0 group-hover:scale-110 transition-transform" />
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
      {lancamento.endereco && (
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Localização Privilegiada
              </h2>
              <p className="text-lg text-gray-600">
                {lancamento.endereco}
              </p>
            </div>

            {lancamento.localizacaoMapsSource && (
              <div className="max-w-4xl mx-auto">
                <div className="bg-white rounded-2xl shadow-xl p-8 border border-orange-100">
                  <iframe
                    src={lancamento.localizacaoMapsSource}
                    width="100%"
                    height="400"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title={`Localização do ${lancamento.nomeLancamento}`}
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
        className="py-16 bg-gradient-to-br from-orange-600 to-red-600 text-white"
      >
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Garanta Já o Seu {lancamento.nomeLancamento}
              </h2>
              <p className="text-lg text-orange-100">
                Preencha o formulário e receba informações exclusivas sobre
                preços, plantas e condições especiais
              </p>
              {lancamento.cardLancamentoInfo?.valor && (
                <div className="mt-6">
                  <span className="text-2xl font-bold text-yellow-300">
                    A partir de R$ {lancamento.cardLancamentoInfo.valor}
                  </span>
                </div>
              )}
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
              <LeadCaptureForm
                nomeLancamento={lancamento.nomeLancamento}
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
}
