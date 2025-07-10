import React, { useMemo } from "react";
import { Button } from "@/components/ui/button";
import { MapPin, BedDouble, Ruler } from "lucide-react";
import { Link } from "react-router-dom";
import Header from "@/components/layout/Header";
import Footer from "@/components/Footer";
import { PropertyFilters } from "@/components/ui/property-filters";
import { usePropertyFilters } from "@/hooks/use-property-filters";
import { lancamentos } from "@/cards/lancamentos/lancamentos";
import { alugueis } from "@/cards/alugueis/alugueis";
import { imoveisUsados } from "@/cards/imoveis-usados/imoveis-usados";

const NewHomePage = () => {
  // Combinar todos os imóveis
  const todosImoveis = useMemo(() => {
    return [...lancamentos, ...alugueis, ...imoveisUsados];
  }, []);

  const {
    filters,
    setters,
    filteredProperties,
    availableRegions,
    hasActiveFilters
  } = usePropertyFilters(todosImoveis);

  // Agrupar por região (usando imóveis filtrados se há filtros ativos, senão todos)
  const imoveisParaAgrupar = hasActiveFilters ? filteredProperties : todosImoveis;

  const imoveisPorRegiao = useMemo(() => {
    const grupos: { [key: string]: typeof todosImoveis } = {};
    
    imoveisParaAgrupar.forEach(imovel => {
      if (!grupos[imovel.regiao]) {
        grupos[imovel.regiao] = [];
      }
      grupos[imovel.regiao].push(imovel);
    });

    return grupos;
  }, [imoveisParaAgrupar]);

  // Obter regiões em destaque (que têm pelo menos um imóvel marcado como destaque)
  const regioesDestaque = useMemo(() => {
    const regioes = Object.keys(imoveisPorRegiao).filter(regiao => {
      return imoveisPorRegiao[regiao].some(imovel => imovel.destaque);
    });
    
    // Retornar apenas as primeiras 2 regiões para mostrar na tela
    return regioes.slice(0, 2);
  }, [imoveisPorRegiao]);

  // Obter outras regiões (não destacadas)
  const outrasRegioes = useMemo(() => {
    return Object.keys(imoveisPorRegiao).filter(regiao => 
      !regioesDestaque.includes(regiao)
    );
  }, [imoveisPorRegiao, regioesDestaque]);

  // Obter 2 imóveis aleatórios de outras regiões
  const imoveisOutrasRegioes = useMemo(() => {
    const imoveisOutras: typeof todosImoveis = [];
    
    outrasRegioes.forEach(regiao => {
      const imoveisRegiao = imoveisPorRegiao[regiao];
      if (imoveisRegiao.length > 0) {
        // Pegar um imóvel aleatório desta região
        const randomIndex = Math.floor(Math.random() * imoveisRegiao.length);
        imoveisOutras.push(imoveisRegiao[randomIndex]);
      }
    });
    
    // Retornar apenas 2 imóveis
    return imoveisOutras.slice(0, 2);
  }, [outrasRegioes, imoveisPorRegiao]);

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

  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-blue-900 to-blue-700 text-white py-12 sm:py-16 md:py-20">
        {/* Background Image */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: 'url(https://images.unsplash.com/photo-1721322800607-8c38375eef04?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80)'
          }}
        ></div>
        <div className="absolute inset-0 bg-black/50"></div>
        <div className="relative container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            {/* Espaço reservado onde estava o texto */}
            <div className="mb-8 sm:mb-12" style={{ height: '200px' }}></div>

            {/* Barra de Busca */}
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
              showSearchButton={true}
            />
          </div>
        </div>
      </section>

      {/* Regiões em Destaque */}
      {regioesDestaque.map((regiao) => {
        const imoveisRegiao = imoveisPorRegiao[regiao]
          .filter(imovel => imovel.destaque)
          .slice(0, 2); // Apenas 2 cards por região

        return (
          <section key={regiao} className="py-12 sm:py-16 bg-gray-50">
            <div className="container mx-auto px-4">
              <div className="text-center mb-8 sm:mb-12">
                <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">
                  {regiao}
                </h2>
                <div className="w-16 sm:w-24 h-1 bg-blue-600 mx-auto"></div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 sm:gap-12 max-w-6xl mx-auto">
                {imoveisRegiao.map((imovel) => (
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
                      <div className={`absolute top-4 left-4 ${getCardTypeColor(imovel.tipo)} text-white px-3 py-1 rounded-full text-sm font-medium`}>
                        {getCardTypeLabel(imovel.tipo)}
                      </div>
                    </div>
                    
                    <div className="p-8">
                      <div className="flex items-center text-gray-600 mb-2">
                        <MapPin className="w-4 h-4 mr-1" />
                        <span className="text-sm">{imovel.regiao}</span>
                      </div>
                      
                      <h3 className="text-xl font-bold text-gray-900 mb-2">
                        {imovel.titulo}
                      </h3>
                      
                      <p className="text-gray-600 mb-4 line-clamp-2">
                        {imovel.descricao}
                      </p>
                      
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center space-x-4 text-sm text-gray-500">
                          <div className="flex items-center">
                            <BedDouble className="w-4 h-4 mr-1" />
                            <span>{imovel.quartos} quartos</span>
                          </div>
                          <div className="flex items-center">
                            <Ruler className="w-4 h-4 mr-1" />
                            <span>{imovel.area}</span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <span className="text-2xl font-bold text-blue-600">
                          {imovel.preco}
                        </span>
                        <Button asChild className="bg-blue-600 hover:bg-blue-700">
                          <Link to={imovel.url}>
                            Ver Detalhes
                          </Link>
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        );
      })}

      {/* Outras Regiões */}
      {imoveisOutrasRegioes.length > 0 && (
        <section className="py-12 sm:py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-8 sm:mb-12">
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">
                Outras Regiões
              </h2>
              <div className="w-16 sm:w-24 h-1 bg-blue-600 mx-auto"></div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 sm:gap-12 max-w-6xl mx-auto">
              {imoveisOutrasRegioes.map((imovel) => (
                <div
                  key={imovel.id}
                  className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow border"
                >
                  <div className="relative">
                    <img
                      src={imovel.imagem}
                      alt={imovel.titulo}
                      className="w-full h-72 sm:h-80 object-cover"
                    />
                    <div className={`absolute top-4 left-4 ${getCardTypeColor(imovel.tipo)} text-white px-3 py-1 rounded-full text-sm font-medium`}>
                      {getCardTypeLabel(imovel.tipo)}
                    </div>
                  </div>
                  
                  <div className="p-8">
                    <div className="flex items-center text-gray-600 mb-2">
                      <MapPin className="w-4 h-4 mr-1" />
                      <span className="text-sm">{imovel.regiao}</span>
                    </div>
                    
                    <h3 className="text-xl font-bold text-gray-900 mb-2">
                      {imovel.titulo}
                    </h3>
                    
                    <p className="text-gray-600 mb-4 line-clamp-2">
                      {imovel.descricao}
                    </p>
                    
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-4 text-sm text-gray-500">
                        <div className="flex items-center">
                          <BedDouble className="w-4 h-4 mr-1" />
                          <span>{imovel.quartos} quartos</span>
                        </div>
                        <div className="flex items-center">
                          <Ruler className="w-4 h-4 mr-1" />
                          <span>{imovel.area}</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <span className="text-2xl font-bold text-blue-600">
                        {imovel.preco}
                      </span>
                      <Button asChild className="bg-blue-600 hover:bg-blue-700">
                        <Link to={imovel.url}>
                          Ver Detalhes
                        </Link>
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="text-center mt-12">
              <Button asChild size="lg" variant="outline" className="border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white">
                <Link to="/prontos">
                  Ver Todos os Imóveis
                </Link>
              </Button>
            </div>
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="py-12 sm:py-16 bg-blue-600 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h3 className="text-2xl sm:text-3xl font-bold mb-6">
              Não Encontrou o Imóvel Ideal?
            </h3>
            <p className="text-lg sm:text-xl mb-8 opacity-90">
              Entre em contato conosco e descubra outras oportunidades exclusivas no Rio de Janeiro.
            </p>
            <div className="flex flex-col gap-4 sm:flex-row sm:gap-4 justify-center">
              <Button
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white hover:text-blue-600"
                asChild
              >
                <Link to="/contato">
                  Entre em Contato
                </Link>
              </Button>
              <Button
                size="lg"
                className="bg-white text-blue-600 hover:bg-gray-100"
                asChild
              >
                <Link to="/anuncie">
                  Anuncie seu Imóvel
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <Footer isHomePage={true} />
    </div>
  );
};

export default NewHomePage;