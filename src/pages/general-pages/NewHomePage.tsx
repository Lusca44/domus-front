import React, { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { MapPin, Search, BedDouble, Ruler } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Link } from "react-router-dom";
import Header from "@/components/layout/Header";
import Footer from "@/components/Footer";
import { lancamentos } from "@/cards/lancamentos/lancamentos";
import { alugueis } from "@/cards/alugueis/alugueis";
import { imoveisUsados } from "@/cards/imoveis-usados/imoveis-usados";

const NewHomePage = () => {
  const [selectedFinalidade, setSelectedFinalidade] = useState("");
  const [selectedTipo, setSelectedTipo] = useState("");
  const [selectedBairro, setSelectedBairro] = useState("");
  const [selectedQuartos, setSelectedQuartos] = useState("");
  const [selectedMetragem, setSelectedMetragem] = useState("");
  const [selectedValor, setSelectedValor] = useState("");

  // Combinar todos os imóveis
  const todosImoveis = useMemo(() => {
    return [...lancamentos, ...alugueis, ...imoveisUsados];
  }, []);

  // Função para extrair valor numérico do preço
  const extractPrice = (preco: string): number => {
    const numbers = preco.replace(/[^\d]/g, '');
    return parseInt(numbers) || 0;
  };

  // Função para extrair área numérica
  const extractArea = (area: string): number => {
    const numbers = area.replace(/[^\d,]/g, '').replace(',', '.');
    return parseFloat(numbers) || 0;
  };

  // Função para verificar se o imóvel atende aos filtros
  const matchesFilters = (imovel: any) => {
    // Filtro de finalidade
    if (selectedFinalidade) {
      if (selectedFinalidade === "venda" && imovel.tipo === "aluguel") return false;
      if (selectedFinalidade === "aluguel" && imovel.tipo !== "aluguel") return false;
    }

    // Filtro de bairro
    if (selectedBairro && imovel.regiao.toLowerCase() !== selectedBairro) return false;

    // Filtro de quartos
    if (selectedQuartos) {
      const quartos = parseInt(selectedQuartos);
      if (quartos === 4 && imovel.quartos < 4) return false;
      if (quartos !== 4 && imovel.quartos !== quartos) return false;
    }

    // Filtro de metragem
    if (selectedMetragem) {
      const area = extractArea(imovel.area);
      switch (selectedMetragem) {
        case "0-50":
          if (area > 50) return false;
          break;
        case "50-80":
          if (area < 50 || area > 80) return false;
          break;
        case "80-120":
          if (area < 80 || area > 120) return false;
          break;
        case "120+":
          if (area < 120) return false;
          break;
      }
    }

    // Filtro de valor
    if (selectedValor) {
      const preco = extractPrice(imovel.preco);
      switch (selectedValor) {
        case "0-300000":
          if (preco > 300000) return false;
          break;
        case "300000-500000":
          if (preco < 300000 || preco > 500000) return false;
          break;
        case "500000-800000":
          if (preco < 500000 || preco > 800000) return false;
          break;
        case "800000+":
          if (preco < 800000) return false;
          break;
      }
    }

    return true;
  };

  // Filtrar imóveis baseado nos filtros selecionados
  const imoveisFiltrados = useMemo(() => {
    return todosImoveis.filter(matchesFilters);
  }, [todosImoveis, selectedFinalidade, selectedTipo, selectedBairro, selectedQuartos, selectedMetragem, selectedValor]);

  // Agrupar por região (usando imóveis filtrados para busca ou todos para exibição inicial)
  const imoveisParaAgrupar = (selectedFinalidade || selectedTipo || selectedBairro || selectedQuartos || selectedMetragem || selectedValor) 
    ? imoveisFiltrados 
    : todosImoveis;

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
      <section className="relative bg-gradient-to-r from-blue-900 to-blue-700 text-white py-20">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Encontre Seu Novo
              <span className="block text-blue-300">Lar no Rio</span>
            </h1>
            <p className="text-xl mb-12 opacity-90">
              Descubra imóveis exclusivos nas melhores regiões do Rio de Janeiro
            </p>

            {/* Barra de Busca */}
            <div className="bg-white rounded-lg p-6 shadow-xl">
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-4">
                <Select value={selectedFinalidade} onValueChange={setSelectedFinalidade}>
                  <SelectTrigger className="text-gray-900">
                    <SelectValue placeholder="Finalidade" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">Todas</SelectItem>
                    <SelectItem value="venda">Venda</SelectItem>
                    <SelectItem value="aluguel">Locação</SelectItem>
                  </SelectContent>
                </Select>

                <Select value={selectedTipo} onValueChange={setSelectedTipo}>
                  <SelectTrigger className="text-gray-900">
                    <SelectValue placeholder="Tipo" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">Todos</SelectItem>
                    <SelectItem value="apartamento">Apartamento</SelectItem>
                    <SelectItem value="casa">Casa</SelectItem>
                    <SelectItem value="cobertura">Cobertura</SelectItem>
                    <SelectItem value="loja">Loja</SelectItem>
                  </SelectContent>
                </Select>

                <Select value={selectedBairro} onValueChange={setSelectedBairro}>
                  <SelectTrigger className="text-gray-900">
                    <SelectValue placeholder="Bairro" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">Todos</SelectItem>
                    {Object.keys(imoveisPorRegiao).map(regiao => (
                      <SelectItem key={regiao} value={regiao.toLowerCase()}>
                        {regiao}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Select value={selectedQuartos} onValueChange={setSelectedQuartos}>
                  <SelectTrigger className="text-gray-900">
                    <SelectValue placeholder="Quartos" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">Todos</SelectItem>
                    <SelectItem value="1">1 Quarto</SelectItem>
                    <SelectItem value="2">2 Quartos</SelectItem>
                    <SelectItem value="3">3 Quartos</SelectItem>
                    <SelectItem value="4">4+ Quartos</SelectItem>
                  </SelectContent>
                </Select>

                <Select value={selectedMetragem} onValueChange={setSelectedMetragem}>
                  <SelectTrigger className="text-gray-900">
                    <SelectValue placeholder="Área" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">Todas</SelectItem>
                    <SelectItem value="0-50">Até 50m²</SelectItem>
                    <SelectItem value="50-80">50m² - 80m²</SelectItem>
                    <SelectItem value="80-120">80m² - 120m²</SelectItem>
                    <SelectItem value="120+">Acima de 120m²</SelectItem>
                  </SelectContent>
                </Select>

                <Select value={selectedValor} onValueChange={setSelectedValor}>
                  <SelectTrigger className="text-gray-900">
                    <SelectValue placeholder="Valor" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">Todos</SelectItem>
                    <SelectItem value="0-300000">Até R$ 300.000</SelectItem>
                    <SelectItem value="300000-500000">R$ 300.000 - R$ 500.000</SelectItem>
                    <SelectItem value="500000-800000">R$ 500.000 - R$ 800.000</SelectItem>
                    <SelectItem value="800000+">Acima de R$ 800.000</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="flex justify-center">
                <Button size="lg" className="bg-blue-600 hover:bg-blue-700 px-12">
                  <Search className="w-4 h-4 mr-2" />
                  Buscar Imóveis
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Regiões em Destaque */}
      {regioesDestaque.map((regiao) => {
        const imoveisRegiao = imoveisPorRegiao[regiao]
          .filter(imovel => imovel.destaque)
          .slice(0, 2); // Apenas 2 cards por região

        return (
          <section key={regiao} className="py-16 bg-gray-50">
            <div className="container mx-auto px-4">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">
                  {regiao}
                </h2>
                <div className="w-24 h-1 bg-blue-600 mx-auto"></div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                {imoveisRegiao.map((imovel) => (
                  <div
                    key={imovel.id}
                    className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
                  >
                    <div className="relative">
                      <img
                        src={imovel.imagem}
                        alt={imovel.titulo}
                        className="w-full h-64 object-cover"
                      />
                      <div className={`absolute top-4 left-4 ${getCardTypeColor(imovel.tipo)} text-white px-3 py-1 rounded-full text-sm font-medium`}>
                        {getCardTypeLabel(imovel.tipo)}
                      </div>
                    </div>
                    
                    <div className="p-6">
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
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Outras Regiões
              </h2>
              <div className="w-24 h-1 bg-blue-600 mx-auto"></div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              {imoveisOutrasRegioes.map((imovel) => (
                <div
                  key={imovel.id}
                  className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow border"
                >
                  <div className="relative">
                    <img
                      src={imovel.imagem}
                      alt={imovel.titulo}
                      className="w-full h-64 object-cover"
                    />
                    <div className={`absolute top-4 left-4 ${getCardTypeColor(imovel.tipo)} text-white px-3 py-1 rounded-full text-sm font-medium`}>
                      {getCardTypeLabel(imovel.tipo)}
                    </div>
                  </div>
                  
                  <div className="p-6">
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
                <Link to="/lancamentos">
                  Ver Todos os Imóveis
                </Link>
              </Button>
            </div>
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="py-16 bg-blue-600 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h3 className="text-3xl font-bold mb-6">
              Não Encontrou o Imóvel Ideal?
            </h3>
            <p className="text-xl mb-8 opacity-90">
              Entre em contato conosco e descubra outras oportunidades exclusivas no Rio de Janeiro.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
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