import React, { useMemo, useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { MapPin, BedDouble, Ruler } from "lucide-react";
import { Link } from "react-router-dom";
import Header from "@/components/layout/Header";
import Footer from "@/components/Footer";
import { PropertyFilters } from "@/components/ui/property-filters";
import { usePropertyFilters } from "@/hooks/use-property-filters";
import { useLancamentos } from "@/hooks/useLancamentos";
import { alugueis } from "@/cards/alugueis/alugueis";
import { imoveisUsados } from "@/cards/imoveis-usados/imoveis-usados";
import fotos from '@/assets/images/carrocel-home/fotos-carrocel'
import { useRegioes } from "@/hooks/useRegioes";

const NewHomePage = () => {
  const backgroundImages = fotos;
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const { lancamentos, loading: loadingLancamentos } = useLancamentos();
  const { regioesDestaque, loading: loadingRegioes } = useRegioes();

  // Combinar todos os imóveis
  const todosImoveis = useMemo(() => {
    return [...lancamentos, ...alugueis, ...imoveisUsados];
  }, [lancamentos]);

  const {
    filters,
    setters,
    filteredProperties,
    availableRegions,
    hasActiveFilters
  } = usePropertyFilters(todosImoveis);
  
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => 
        (prevIndex + 1) % backgroundImages.length
      );
    }, 5000); // Muda a cada 5 segundos

    return () => clearInterval(interval);
  }, [backgroundImages.length]);



  const obterValorFiltroFinalidade = () => {

    if(filters.selectedFinalidade != 'null'){
      if(filters.selectedFinalidade === 'venda'){
        return {path : "/prontos", texto: "imóveis prontos"};
      }else if (filters.selectedFinalidade === 'aluguel'){
        return {path : "/alugueis", texto: "imóveis a alugar"};
      }else if (filters.selectedFinalidade === 'lancamento'){
        return {path : "/lancamentos", texto: "lançamentos"};
      }
    }else {
      return {path : "/lancamentos", texto: "lançamentos"};
    }
  }

  // Agrupar por região (tipagem mais segura)
const imoveisPorRegiao = useMemo(() => {
  const grupos: Record<string, typeof todosImoveis> = {};

  todosImoveis.forEach((imovel) => {
    if (!grupos[imovel.regiao]) {
      grupos[imovel.regiao] = [];
    }
    grupos[imovel.regiao].push(imovel);
  });

  return grupos;
}, [todosImoveis]);

   // Obter regiões em destaque da API
  const regioesDestaqueNomes = useMemo(() => {
    return regioesDestaque.map(regiao => regiao.nomeRegiao);
  }, [regioesDestaque]);
    
  // Obter outras regiões (não destacadas)
  const outrasRegioes = useMemo(() => {
    return Object.keys(imoveisPorRegiao).filter(regiao => 
      !regioesDestaqueNomes.includes(regiao)
    );
  }, [imoveisPorRegiao, regioesDestaqueNomes]);

 // Obter APENAS 2 imóveis aleatórios de outras regiões (no total)
const imoveisOutrasRegioes = useMemo(() => {
  // 1. Pegar uma amostra de cada região
  const amostrasPorRegiao = outrasRegioes.map(regiao => {
    const imoveis = imoveisPorRegiao[regiao] || [];
    if (imoveis.length === 0) return null;
    
    // Pegar um imóvel aleatório desta região
    const randomIndex = Math.floor(Math.random() * imoveis.length);
    return imoveis[randomIndex];
  }).filter(Boolean); // Remover regiões vazias

  // 2. Embaralhar as amostras
  const embaralhados = [...amostrasPorRegiao].sort(() => Math.random() - 0.5);
  
  // 3. Pegar no máximo 2
  return embaralhados.slice(0, 2);
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
        {/* Background Carousel */}
        <div className="absolute inset-0 overflow-hidden">
          {/* Renderização das imagens do carrossel de background */}
          {backgroundImages.map((image, index) => (
            <div
              key={index}
              className={`absolute inset-0 bg-cover bg-center bg-no-repeat transition-opacity duration-1000 ${
                index === currentImageIndex ? 'opacity-100' : 'opacity-0'
              }`}
              style={{
                backgroundImage: `url(${image})`
              }}
            />
          ))}
        </div>
        <div className="absolute inset-0 bg-black/50"></div>
        <div className="relative container mx-auto px-4">
          {/* <div className="max-w-4xl mx-auto text-center"> */}
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
              showSearchButton={false}
              showFinalidadeBox={true}
            />
          {/* </div> */}
        </div>
      </section>

      {/* Regiões em Destaque */}
     {!loadingRegioes && regioesDestaqueNomes.map((regiaoNome) => {
  // Verificar se a região existe no agrupamento
  const imoveisRegiao = imoveisPorRegiao.hasOwnProperty(regiaoNome) 
    ? imoveisPorRegiao[regiaoNome].slice(0, 2)
    : [];

  if (imoveisRegiao.length === 0) return null;

        return (
          <section key={regiaoNome} className="py-12 sm:py-16 bg-gray-50">
            <div className="container mx-auto px-4">
              <div className="text-center mb-8 sm:mb-12">
                <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">
                  {regiaoNome}
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
                            <span>Até {imovel.quartos} quartos</span>
                          </div>
                          <div className="flex items-center">
                            <Ruler className="w-4 h-4 mr-1" />
                            <span>Até {imovel.area} m²</span>
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
                <Link to={obterValorFiltroFinalidade().path}>
                {/* <Link to="/prontos"> */}
                  Ver Todos os {obterValorFiltroFinalidade().texto}
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
                className="border-white text-blue-600 hover:bg-white hover:text-blue-600"
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
