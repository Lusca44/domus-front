
import React, { useState, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Home, MapPin, Phone, Mail } from "lucide-react";
import SubFilters from "./SubFilters";
import FeaturedCard from "./FeaturedCard";

const AluguelSection = () => {
  const [selectedRegion, setSelectedRegion] = useState("todas");
  const [selectedRooms, setSelectedRooms] = useState("todos");

  const aluguelOptions = [
    {
      id: 1,
      tipo: "Apartamentos",
      descricao: "Apartamentos modernos para locação em diversas regiões",
      caracteristicas: ["1 a 4 quartos", "Área de lazer completa", "Garagem"],
      precoFaixa: "R$ 1.500 - R$ 5.000/mês",
      icon: Home,
    },
    {
      id: 2,
      tipo: "Casas",
      descricao: "Casas para aluguel em condomínios e bairros residenciais",
      caracteristicas: ["2 a 5 quartos", "Quintal privativo", "Segurança 24h"],
      precoFaixa: "R$ 2.000 - R$ 8.000/mês",
      icon: Home,
    },
    {
      id: 3,
      tipo: "Comerciais",
      descricao: "Espaços comerciais em pontos estratégicos da cidade",
      caracteristicas: ["Localização privilegiada", "Amplo estacionamento", "Fácil acesso"],
      precoFaixa: "R$ 3.000 - R$ 15.000/mês",
      icon: MapPin,
    },
  ];

  // Cards destacados para aluguel
  const featuredAluguel = [
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
  ];

  // Filtrar imóveis destacados
  const filteredFeatured = useMemo(() => {
    return featuredAluguel.filter(imovel => {
      if (selectedRegion !== "todas") {
        const regionMap: { [key: string]: string } = {
          "copacabana": "Copacabana",
          "barra-tijuca": "Barra da Tijuca",
          "ipanema": "Ipanema",
          "tijuca": "Tijuca",
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

  return (
    <div className="space-y-8">
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

      {/* Imóveis Destacados */}
      {filteredFeatured.length > 0 && (
        <div className="mb-12">
          <h4 className="text-xl font-bold text-gray-900 mb-6">
            Imóveis em Destaque para Aluguel
          </h4>
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8 lg:gap-12">
            {filteredFeatured.map((imovel) => (
              <FeaturedCard key={imovel.id} {...imovel} />
            ))}
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8 lg:gap-12">
        {aluguelOptions.map((opcao) => {
          const IconComponent = opcao.icon;
          return (
            <Card
              key={opcao.id}
              className="group hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
            >
              <CardHeader className="text-center pb-4">
                <div className="mx-auto mb-4 p-3 bg-blue-100 rounded-full w-fit">
                  <IconComponent className="w-8 h-8 text-blue-600" />
                </div>
                <CardTitle className="text-xl sm:text-2xl mb-2">
                  {opcao.tipo}
                </CardTitle>
                <p className="text-sm sm:text-base text-gray-600">
                  {opcao.descricao}
                </p>
              </CardHeader>

              <CardContent className="space-y-4">
                <div className="space-y-2">
                  {opcao.caracteristicas.map((caracteristica, index) => (
                    <div
                      key={index}
                      className="flex items-center text-sm text-gray-600"
                    >
                      <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mr-2 flex-shrink-0"></div>
                      <span>{caracteristica}</span>
                    </div>
                  ))}
                </div>

                <div className="flex flex-col items-center gap-3 pt-4 border-t">
                  <p className="font-semibold text-blue-600 text-center">
                    {opcao.precoFaixa}
                  </p>
                  <Button className="w-full bg-blue-600 hover:bg-blue-700">
                    Ver Opções Disponíveis
                  </Button>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

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
