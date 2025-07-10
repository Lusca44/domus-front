import React, { useState } from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { MapPin, BedDouble, Ruler } from "lucide-react";
import { Link } from "react-router-dom";
import { alugueis } from "@/cards/alugueis/alugueis";
import { Imovel } from "@/cards/imoveis";

const AlugueisPage = () => {
  // Estado para controlar quantos cards estão sendo exibidos
  // Inicialmente mostra 4 cards
  const [itemsToShow, setItemsToShow] = useState(4);

  // Imóveis visíveis na tela (limitados pelo estado itemsToShow)
  const imoveisVisiveis = alugueis.slice(0, itemsToShow);
  
  // Verificar se ainda há mais imóveis para carregar
  const hasMoreItems = itemsToShow < alugueis.length;

  // Função para carregar mais 4 imóveis
  const loadMoreItems = () => {
    setItemsToShow(prev => prev + 4);
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-gray-100">
      <Header />
      
      <div className="pt-6 sm:pt-8">
        <div className="container mx-auto px-4">
          {/* Cabeçalho da página */}
          <div className="text-center mb-8 sm:mb-12">
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Aluguéis
            </h1>
            <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto px-4">
              Encontre o imóvel perfeito para alugar nas melhores regiões do Rio de Janeiro.
            </p>
          </div>
          
          {/* Grid de imóveis - 2 por linha, conforme padrão solicitado */}
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
                  <div className={`absolute top-4 left-4 ${getCardTypeColor(imovel.tipo)} text-white px-3 py-1 rounded-full text-sm font-medium`}>
                    {getCardTypeLabel(imovel.tipo)}
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
                        <span>{imovel.quartos} quartos</span>
                      </div>
                      <div className="flex items-center">
                        <Ruler className="w-4 h-4 mr-1" />
                        <span>{imovel.area}</span>
                      </div>
                    </div>
                  </div>
                  
                  {/* Preço e botão */}
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
          {!hasMoreItems && alugueis.length > 4 && (
            <div className="text-center mt-12">
              <p className="text-gray-500">
                Você visualizou todos os {alugueis.length} imóveis disponíveis para aluguel.
              </p>
            </div>
          )}
        </div>
      </div>

      <Footer isHomePage={false} />
    </div>
  );
};

export default AlugueisPage;