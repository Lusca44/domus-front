import React, { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import SubFilters from "./SubFilters";
import FeaturedCard from "./FeaturedCard";

const CompraVendaSection = () => {
  const [selectedRegion, setSelectedRegion] = useState("todas");
  const [selectedRooms, setSelectedRooms] = useState("todos");

  // Todos os imóveis para compra e venda
  const allCompraVenda = [
    {
      id: "1",
      titulo: "Cobertura Duplex - Leblon",
      descricao: "Cobertura exclusiva com vista panorâmica",
      preco: "R$ 2.800.000",
      imagem: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800&h=600&fit=crop",
      regiao: "Leblon",
      quartos: 4,
      area: "180m²",
      url: "#",
      destaque: true,
    },
    {
      id: "2",
      titulo: "Apartamento Novo - Tijuca",
      descricao: "Apartamento pronto para morar em excelente localização",
      preco: "R$ 580.000",
      imagem: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&h=600&fit=crop",
      regiao: "Tijuca",
      quartos: 2,
      area: "75m²",
      url: "#",
      destaque: true,
    },
    {
      id: "3",
      titulo: "Casa Condomínio - Recreio",
      descricao: "Casa térrea em condomínio de alto padrão",
      preco: "R$ 1.200.000",
      imagem: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&h=600&fit=crop",
      regiao: "Recreio dos Bandeirantes",
      quartos: 3,
      area: "150m²",
      url: "#",
      destaque: false,
    },
    {
      id: "4",
      titulo: "Apartamento Vista Mar - Copacabana",
      descricao: "Apartamento reformado com vista para o mar",
      preco: "R$ 1.500.000",
      imagem: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&h=600&fit=crop",
      regiao: "Copacabana",
      quartos: 3,
      area: "110m²",
      url: "#",
      destaque: true,
    },
    {
      id: "5",
      titulo: "Studio Investimento - Ipanema",
      descricao: "Excelente oportunidade de investimento",
      preco: "R$ 450.000",
      imagem: "https://images.unsplash.com/photo-1484154218962-a197022b5858?w=800&h=600&fit=crop",
      regiao: "Ipanema",
      quartos: 1,
      area: "38m²",
      url: "#",
      destaque: false,
    },
    {
      id: "6",
      titulo: "Casa Familiar - Barra da Tijuca",
      descricao: "Casa espaçosa para família grande",
      preco: "R$ 2.200.000",
      imagem: "https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=800&h=600&fit=crop",
      regiao: "Barra da Tijuca",
      quartos: 4,
      area: "220m²",
      url: "#",
      destaque: false,
    },
  ];

  // Filtrar imóveis
  const filteredCompraVenda = useMemo(() => {
    return allCompraVenda.filter(imovel => {
      if (selectedRegion !== "todas") {
        const regionMap: { [key: string]: string } = {
          "leblon": "Leblon",
          "tijuca": "Tijuca",
          "recreio": "Recreio dos Bandeirantes",
          "copacabana": "Copacabana",
          "ipanema": "Ipanema",
          "barra-tijuca": "Barra da Tijuca",
        };
        if (imovel.regiao !== regionMap[selectedRegion]) {
          return false;
        }
      }
      if (selectedRooms !== "todos") {
        const roomsNumber = parseInt(selectedRooms);
        if (selectedRooms === "4" && imovel.quartos < 4) {
          return false;
        } else if (selectedRooms !== "4" && imovel.quartos !== roomsNumber) {
          return false;
        }
      }
      return true;
    });
  }, [selectedRegion, selectedRooms]);

  // Separar imóveis em destaque e comuns
  const featuredCompraVenda = filteredCompraVenda.filter(i => i.destaque);
  const regularCompraVenda = filteredCompraVenda.filter(i => !i.destaque);

  return (
    <div className="space-y-12">
      <div className="text-center mb-8">
        <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">
          Compra e Venda de Imóveis
        </h3>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Serviços completos para compra, venda e investimento imobiliário com segurança e agilidade.
        </p>
      </div>

      <SubFilters
        onRegionChange={setSelectedRegion}
        onRoomsChange={setSelectedRooms}
        selectedRegion={selectedRegion}
        selectedRooms={selectedRooms}
      />

      {filteredCompraVenda.length > 0 ? (
        <>
          {/* Imóveis em Destaque */}
          {featuredCompraVenda.length > 0 && (
            <div className="mb-16">
              <div className="text-center mb-8">
                <h4 className="text-2xl font-bold text-gray-900 mb-3 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  Oportunidades em Destaque
                </h4>
                <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto rounded-full"></div>
              </div>
              
              {/* Grid otimizado para cards em destaque - máximo 3 por linha, centralizados */}
              <div className="flex flex-wrap justify-center gap-8 lg:gap-12">
                {featuredCompraVenda.map((imovel) => (
                  <div 
                    key={imovel.id} 
                    className="w-full max-w-sm lg:max-w-md xl:max-w-lg transform hover:scale-105 transition-all duration-500 hover:shadow-2xl flex-shrink-0"
                    style={{ 
                      flexBasis: featuredCompraVenda.length === 1 ? '400px' : 
                                 featuredCompraVenda.length === 2 ? '400px' : 
                                 'min(400px, calc(33.333% - 2rem))'
                    }}
                  >
                    <div className="bg-gradient-to-br from-white to-blue-50 rounded-2xl shadow-xl border-2 border-blue-100 overflow-hidden h-full">
                      <FeaturedCard {...imovel} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Outras Oportunidades */}
          {regularCompraVenda.length > 0 && (
            <div className="border-t border-gray-200 pt-12">
              <h4 className="text-2xl font-bold text-gray-900 mb-8 text-center">
                Outras Oportunidades
                <span className="text-lg font-normal text-gray-600 ml-2">
                  ({regularCompraVenda.length})
                </span>
              </h4>
              
              {/* Grid responsivo com centralização automática - máximo 4 por linha */}
              <div className="flex flex-wrap justify-center gap-6 lg:gap-8">
                {regularCompraVenda.map((imovel) => (
                  <div 
                    key={imovel.id}
                    className="w-full max-w-sm transform hover:scale-102 transition-all duration-300 hover:shadow-lg flex-shrink-0"
                    style={{ 
                      flexBasis: 'min(320px, calc(25% - 1.5rem))',
                      minWidth: '280px'
                    }}
                  >
                    <FeaturedCard {...imovel} />
                  </div>
                ))}
              </div>
            </div>
          )}
        </>
      ) : (
        <div className="text-center py-16 bg-gray-50 rounded-2xl">
          <div className="max-w-md mx-auto">
            <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
            </div>
            <p className="text-gray-500 text-lg mb-2">
              Nenhum imóvel encontrado
            </p>
            <p className="text-gray-400 text-sm">
              Tente ajustar os filtros para ver mais opções.
            </p>
          </div>
        </div>
      )}

      <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-lg p-8 text-white">
        <div className="max-w-4xl mx-auto">
          <h4 className="text-2xl font-bold mb-4 text-center">
            Por que escolher a Feitozza Imóveis?
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            {[
              "Mais de 10 anos de experiência no mercado",
              "Equipe especializada e certificada",
              "Atendimento personalizado",
              "Processo 100% transparente",
            ].map((diferencial, index) => (
              <div key={index} className="flex items-center gap-3">
                <div className="w-2 h-2 bg-white rounded-full flex-shrink-0"></div>
                <span className="text-white/90">{diferencial}</span>
              </div>
            ))}
          </div>
          <div className="text-center">
            <Button 
              variant="secondary" 
              size="lg"
              className="font-semibold"
            >
              Agende uma Consultoria Gratuita
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompraVendaSection;
