import React, { useEffect } from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/Footer";
import { PropertyFilters } from "@/components/ui/property-filters";
import { usePropertyFilters } from "@/hooks/use-property-filters";
import { Button } from "@/components/ui/button";
import { MapPin, BedDouble, Ruler } from "lucide-react";
import { Link } from "react-router-dom";
import { Imovel } from "@/cards/imoveis";
import { useState } from "react";
import { useLancamentos } from "@/hooks/useLancamentos"; // Importe o hook
import { tipologiaApi } from "@/utils/apiConfig";

const LancamentosPage = () => {
  const [availableTipologias, setAvailableTipologias] = useState<string[]>([]);
  const [availableFinalidades, setAvailableFinalidades] = useState<string[]>(
    []
  );

  const { lancamentos, loading } = useLancamentos();

  // Adicione este useEffect para buscar tipologias
  useEffect(() => {
    const fetchTipologias = async () => {
      try {
        const response = await tipologiaApi.obterTodasTipologias();
        const tipologias = response.map((t: any) => t.nome);
        setAvailableTipologias(tipologias);
      } catch (error) {
        console.error("Erro ao buscar tipologias:", error);
      }
    };

    fetchTipologias();
  }, []);

  // Estado para controlar quantos cards estão sendo exibidos
  const [itemsToShow, setItemsToShow] = useState(4);

  // Hook de filtros usando os lançamentos
  const {
    filters,
    setters,
    filteredProperties,
    availableRegions,
    clearFilters,
    hasActiveFilters,
  } = usePropertyFilters(lancamentos);

  // Imóveis visíveis na tela (limitados pelo estado itemsToShow)
  const imoveisVisiveis = filteredProperties.slice(0, itemsToShow);

  // Verificar se ainda há mais imóveis para carregar
  const hasMoreItems = itemsToShow < filteredProperties.length;

  // Função para carregar mais 4 imóveis
  const loadMoreItems = () => {
    setItemsToShow((prev) => prev + 4);
  };

  // Função para obter label do tipo de card
  const getCardTypeLabel = (tipo: string) => {
    switch (tipo) {
      case "lancamento":
        return "Lançamento";
      case "aluguel":
        return "Aluguel";
      case "imoveis-usados":
        return "Pronto";
      default:
        return tipo;
    }
  };

  // Função para obter cor do tipo de card
  const getCardTypeColor = (tipo: string) => {
    switch (tipo) {
      case "lancamento":
        return "bg-blue-600";
      case "aluguel":
        return "bg-green-600";
      case "imoveis-usados":
        return "bg-gray-600";
      default:
        return "bg-blue-600";
    }
  };

  // Estado vazio quando não há resultados após filtros
  const EmptyState = () => (
    <div className="text-center py-16 bg-gray-50 rounded-2xl">
      <div className="max-w-md mx-auto">
        <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg
            className="w-8 h-8 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
            />
          </svg>
        </div>
        <p className="text-gray-500 text-lg mb-2">
          Nenhum lançamento encontrado
        </p>
        <p className="text-gray-400 text-sm mb-4">
          Tente ajustar os filtros para ver mais opções.
        </p>
        {hasActiveFilters && (
          <Button
            onClick={clearFilters}
            variant="outline"
            className="border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white"
          >
            Limpar Filtros
          </Button>
        )}
      </div>
    </div>
  );

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-gray-100">
        <Header />
        <div className="container mx-auto px-4 py-20 text-center">
          <div className="flex justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
          </div>
          <p className="mt-4 text-gray-600">Carregando lançamentos...</p>
        </div>
        <Footer isHomePage={false} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-gray-100">
      <Header />

      <div className="pt-6 sm:pt-8">
        <div className="container mx-auto px-4">
          {/* Cabeçalho da página */}
          <div className="text-center mb-8 sm:mb-12">
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Lançamentos
            </h1>
            <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto px-4">
              Explore nossos empreendimentos em lançamento nas melhores regiões
              do Rio de Janeiro.
            </p>
          </div>

          <div className="max-w-4xl mx-auto text-center">
            {/* Barra de Filtros */}
            <PropertyFilters
              selectedFinalidade={filters.selectedFinalidade}
              selectedTipo={filters.selectedTipo}
              selectedBairro={filters.selectedBairro}
              selectedQuartos={filters.selectedQuartos}
              selectedMetragem={filters.selectedMetragem}
              selectedValor={filters.selectedValor}
              onFinalidadeChange={setters.setSelectedFinalidade}
              onTipoChange={setters.setSelectedTipo}
              onBairroChange={setters.setSelectedBairro}
              onQuartosChange={setters.setSelectedQuartos}
              onMetragemChange={setters.setSelectedMetragem}
              onValorChange={setters.setSelectedValor}
              availableRegions={availableRegions}
              showSearchButton={false}
              showFinalidadeBox={false}
              availableTipologias={availableTipologias} // Passando as tipologias
              availableFinalidades={availableFinalidades} // Passando as finalidades
            />
          </div>

          {/* Informações dos resultados */}
          {filteredProperties.length > 0 && (
            <div className="text-center mb-6">
              <p className="text-gray-600">
                {hasActiveFilters
                  ? `${filteredProperties.length} lançamentos encontrados`
                  : `${filteredProperties.length} lançamentos disponíveis`}
                {hasActiveFilters && (
                  <Button
                    onClick={clearFilters}
                    variant="link"
                    className="ml-2 text-blue-600 hover:text-blue-700 p-0 h-auto"
                  >
                    (limpar filtros)
                  </Button>
                )}
              </p>
            </div>
          )}

          {/* Conteúdo principal */}
          {filteredProperties.length > 0 ? (
            <>
              {/* Grid de imóveis - 2 por linha */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 sm:gap-12 max-w-6xl mx-auto">
                {imoveisVisiveis.map((imovel: Imovel) => (
                  <div
                    key={imovel.id}
                    className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
                  >
                    <div className="relative">
                      <img
                        src={imovel.imagem}
                        alt={imovel.titulo}
                        className="w-full h-72 sm:h-80 object-cover"
                      />
                      {/* Badge do tipo de imóvel */}
                      <div className="mt-2 flex flex-wrap gap-1">
                        {imovel.tipologia?.map((tipo, index) => (
                          <span
                            key={index}
                            className="text-xs bg-gray-100 px-2 py-1 rounded"
                          >
                            {tipo}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="p-8">
                      {/* Localização */}
                      <div className="flex items-center text-gray-600 mb-2">
                        <MapPin className="w-4 h-4 mr-1" />
                        <span className="text-sm">{imovel.regiao}</span>
                      </div>

                      {/* Título */}
                      <h3 className="text-xl font-bold text-gray-900 mb-2">
                        {imovel.titulo}
                      </h3>

                      {/* Descrição */}
                      <p className="text-gray-600 mb-4 line-clamp-2">
                        {imovel.descricao}
                      </p>

                      {/* Detalhes (quartos e área) */}
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center space-x-4 text-sm text-gray-500">
                          <div className="flex items-center">
                            <BedDouble className="w-4 h-4 mr-1" />
                            <span>Até {imovel.quartos} quartos</span>
                          </div>
                          <div className="flex items-center">
                            <Ruler className="w-4 h-4 mr-1" />
                            <span> Até {imovel.area} m²</span>
                          </div>
                        </div>
                      </div>

                      {/* Preço e botão */}
                      <div className="flex items-center justify-between">
                        <span className="text-2xl font-bold text-blue-600">
                          {imovel.preco}
                        </span>
                        <Button
                          asChild
                          className="bg-blue-600 hover:bg-blue-700"
                        >
                          <Link to={imovel.url}>Ver Detalhes</Link>
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Botão "Carregar Mais" - só aparece se há mais itens */}
              {hasMoreItems && (
                <div className="text-center mt-12">
                  <Button
                    onClick={loadMoreItems}
                    size="lg"
                    variant="outline"
                    className="border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white"
                  >
                    Carregar Mais
                  </Button>
                </div>
              )}

              {/* Mensagem quando não há mais itens para carregar */}
              {!hasMoreItems && filteredProperties.length > 4 && (
                <div className="text-center mt-12">
                  <p className="text-gray-500">
                    Você visualizou todos os {filteredProperties.length}{" "}
                    lançamentos
                    {hasActiveFilters
                      ? " que atendem aos filtros selecionados"
                      : " disponíveis"}
                    .
                  </p>
                </div>
              )}
            </>
          ) : (
            <EmptyState />
          )}
        </div>
      </div>

      <Footer isHomePage={false} />
    </div>
  );
};

export default LancamentosPage;
