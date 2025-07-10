import React, { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { MapPin, Search, Building2, BedDouble, Ruler } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Link } from "react-router-dom";
import Header from "@/components/layout/Header";
import Footer from "@/components/Footer";
import { lancamentos } from "@/cards/lancamentos/lancamentos";
import { alugueis } from "@/cards/alugueis/alugueis";
import { imoveisUsados } from "@/cards/imoveis-usados/imoveis-usados";

const NewHomePage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedFinalidade, setSelectedFinalidade] = useState("");
  const [selectedTipo, setSelectedTipo] = useState("");
  const [selectedBairro, setSelectedBairro] = useState("");

  // Combinar todos os imóveis
  const todosImoveis = useMemo(() => {
    return [...lancamentos, ...alugueis, ...imoveisUsados];
  }, []);

  // Agrupar por região
  const imoveisPorRegiao = useMemo(() => {
    const grupos: { [key: string]: typeof todosImoveis } = {};
    
    todosImoveis.forEach(imovel => {
      if (!grupos[imovel.regiao]) {
        grupos[imovel.regiao] = [];
      }
      grupos[imovel.regiao].push(imovel);
    });

    return grupos;
  }, [todosImoveis]);

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
              <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-4">
                <Input
                  placeholder="Código do imóvel"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="text-gray-900"
                />
                
                <Select value={selectedFinalidade} onValueChange={setSelectedFinalidade}>
                  <SelectTrigger className="text-gray-900">
                    <SelectValue placeholder="Finalidade" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="venda">Venda</SelectItem>
                    <SelectItem value="aluguel">Locação</SelectItem>
                  </SelectContent>
                </Select>

                <Select value={selectedTipo} onValueChange={setSelectedTipo}>
                  <SelectTrigger className="text-gray-900">
                    <SelectValue placeholder="Tipo" />
                  </SelectTrigger>
                  <SelectContent>
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
                    {Object.keys(imoveisPorRegiao).map(regiao => (
                      <SelectItem key={regiao} value={regiao.toLowerCase()}>
                        {regiao}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
                  <Search className="w-4 h-4 mr-2" />
                  Buscar
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