
import React, { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Phone, Mail } from "lucide-react";
import SubFilters from "./SubFilters";
import FeaturedCard from "./FeaturedCard";

const AluguelSection = () => {
  const [selectedRegion, setSelectedRegion] = useState("todas");
  const [selectedRooms, setSelectedRooms] = useState("todos");

  // Todos os imóveis para aluguel
  const allAluguel = [
    {
      id: "1",
      title: "Apartamento Moderno - Copacabana",
      description: "Apartamento totalmente mobiliado com vista para o mar",
      price: "R$ 3.200/mês",
      image: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&h=600&fit=crop",
      region: "Copacabana",
      rooms: 2,
      bathrooms: 1,
      parking: 1,
      area: "68m²",
      url: "#",
      featured: true,
    },
    {
      id: "2",
      title: "Casa Familiar - Barra da Tijuca",
      description: "Casa espaçosa em condomínio fechado",
      price: "R$ 4.500/mês",
      image: "https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=800&h=600&fit=crop",
      region: "Barra da Tijuca",
      rooms: 3,
      bathrooms: 2,
      parking: 2,
      area: "120m²",
      url: "#",
      featured: true,
    },
    {
      id: "3",
      title: "Loft Executivo - Ipanema",
      description: "Loft moderno para executivos",
      price: "R$ 2.800/mês",
      image: "https://images.unsplash.com/photo-1484154218962-a197022b5858?w=800&h=600&fit=crop",
      region: "Ipanema",
      rooms: 1,
      bathrooms: 1,
      parking: 1,
      area: "45m²",
      url: "#",
      featured: false,
    },
    {
      id: "4",
      title: "Cobertura Duplex - Leblon",
      description: "Cobertura com terraço e piscina privativa",
      price: "R$ 8.500/mês",
      image: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800&h=600&fit=crop",
      region: "Leblon",
      rooms: 4,
      bathrooms: 3,
      parking: 2,
      area: "200m²",
      url: "#",
      featured: true,
    },
    {
      id: "5",
      title: "Apartamento Novo - Tijuca",
      description: "Apartamento recém reformado próximo ao metrô",
      price: "R$ 2.100/mês",
      image: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&h=600&fit=crop",
      region: "Tijuca",
      rooms: 2,
      bathrooms: 1,
      parking: 1,
      area: "65m²",
      url: "#",
      featured: false,
    },
    {
      id: "6",
      title: "Studio Moderno - Botafogo",
      description: "Studio completo em prédio novo",
      price: "R$ 1.800/mês",
      image: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&h=600&fit=crop",
      region: "Botafogo",
      rooms: 1,
      bathrooms: 1,
      parking: 0,
      area: "35m²",
      url: "#",
      featured: false,
    },
  ];

  // Filtrar imóveis
  const filteredAluguel = useMemo(() => {
    return allAluguel.filter(imovel => {
      if (selectedRegion !== "todas") {
        const regionMap: { [key: string]: string } = {
          "copacabana": "Copacabana",
          "barra-tijuca": "Barra da Tijuca",
          "ipanema": "Ipanema",
          "leblon": "Leblon",
          "tijuca": "Tijuca",
          "botafogo": "Botafogo",
        };
        if (imovel.region !== regionMap[selectedRegion]) {
          return false;
        }
      }
      if (selectedRooms !== "todos") {
        const roomsNumber = parseInt(selectedRooms);
        if (selectedRooms === "4" && imovel.rooms < 4) {
          return false;
        } else if (selectedRooms !== "4" && imovel.rooms !== roomsNumber) {
          return false;
        }
      }
      return true;
    });
  }, [selectedRegion, selectedRooms]);

  // Separar imóveis em destaque e comuns
  const featuredAluguel = filteredAluguel.filter(a => a.featured);
  const regularAluguel = filteredAluguel.filter(a => !a.featured);

  return (
    <div className="space-y-12">
      <div className="text-center mb-8">
        <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">
          Imóveis para Aluguel
        </h3>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Encontre o imóvel ideal para locação com as melhores condições e localização.
        </p>
      </div>

      <SubFilters
        onRegionChange={setSelectedRegion}
        onRoomsChange={setSelectedRooms}
        selectedRegion={selectedRegion}
        selectedRooms={selectedRooms}
      />

      {filteredAluguel.length > 0 ? (
        <>
          {/* Imóveis em Destaque */}
          {featuredAluguel.length > 0 && (
            <div className="mb-16">
              <div className="text-center mb-8">
                <h4 className="text-2xl font-bold text-gray-900 mb-3 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  Imóveis em Destaque para Aluguel
                </h4>
                <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto rounded-full"></div>
              </div>
              
              {/* Grid otimizado para cards em destaque - máximo 3 por linha, centralizados */}
              <div className="flex flex-wrap justify-center gap-8 lg:gap-12">
                {featuredAluguel.map((imovel) => (
                  <div 
                    key={imovel.id} 
                    className="w-full max-w-sm lg:max-w-md xl:max-w-lg transform hover:scale-105 transition-all duration-500 hover:shadow-2xl flex-shrink-0"
                    style={{ 
                      flexBasis: featuredAluguel.length === 1 ? '400px' : 
                                 featuredAluguel.length === 2 ? '400px' : 
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

          {/* Outros Imóveis para Aluguel */}
          {regularAluguel.length > 0 && (
            <div className="border-t border-gray-200 pt-12">
              <h4 className="text-2xl font-bold text-gray-900 mb-8 text-center">
                Outros Imóveis para Aluguel
                <span className="text-lg font-normal text-gray-600 ml-2">
                  ({regularAluguel.length})
                </span>
              </h4>
              
              {/* Grid responsivo para itens regulares - centralizado */}
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-6 lg:gap-8 justify-items-center">
                {regularAluguel.map((imovel) => (
                  <div 
                    key={imovel.id}
                    className="w-full max-w-sm transform hover:scale-102 transition-all duration-300 hover:shadow-lg"
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
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z" />
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

      <div className="bg-blue-50 rounded-lg p-6 text-center">
        <h4 className="text-xl font-semibold text-gray-900 mb-2">
          Não encontrou o que procura?
        </h4>
        <p className="text-gray-600 mb-4">
          Entre em contato conosco e vamos encontrar o imóvel ideal para você.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button variant="outline" className="flex items-center gap-2">
            <Phone className="w-4 h-4" />
            (21) 2222-3333
          </Button>
          <Button variant="outline" className="flex items-center gap-2">
            <Mail className="w-4 h-4" />
            Enviar WhatsApp
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AluguelSection;
