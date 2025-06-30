
import React, { useState, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Home, TrendingUp, Calculator, Users } from "lucide-react";
import SubFilters from "./SubFilters";
import FeaturedCard from "./FeaturedCard";

const CompraVendaSection = () => {
  const [selectedRegion, setSelectedRegion] = useState("todas");
  const [selectedRooms, setSelectedRooms] = useState("todos");

  const servicos = [
    {
      id: 1,
      titulo: "Compra de Imóveis",
      descricao: "Encontre o imóvel dos seus sonhos com nossa consultoria especializada",
      caracteristicas: ["Avaliação profissional", "Financiamento facilitado", "Documentação completa"],
      icon: Home,
    },
    {
      id: 2,
      titulo: "Venda de Imóveis",
      descricao: "Venda seu imóvel rapidamente com o melhor preço do mercado",
      caracteristicas: ["Avaliação gratuita", "Marketing digital", "Negociação especializada"],
      icon: TrendingUp,
    },
    {
      id: 3,
      titulo: "Consultoria Financeira",
      descricao: "Orientação completa para financiamento e investimento imobiliário",
      caracteristicas: ["Simulação de financiamento", "Análise de crédito", "Melhores taxas"],
      icon: Calculator,
    },
    {
      id: 4,
      titulo: "Assessoria Jurídica",
      descricao: "Suporte jurídico completo para sua transação imobiliária",
      caracteristicas: ["Análise documental", "Suporte legal", "Segurança na compra"],
      icon: Users,
    },
  ];

  const diferenciais = [
    "Mais de 10 anos de experiência no mercado",
    "Equipe especializada e certificada",
    "Atendimento personalizado",
    "Processo 100% transparente",
  ];

  // Cards destacados para compra e venda
  const featuredCompraVenda = [
    {
      id: "1",
      title: "Cobertura Duplex - Leblon",
      description: "Cobertura exclusiva com vista panorâmica",
      price: "R$ 2.800.000",
      image: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800&h=600&fit=crop",
      region: "Leblon",
      rooms: 4,
      bathrooms: 3,
      parking: 2,
      area: "180m²",
      url: "#",
      featured: true,
    },
    {
      id: "2",
      title: "Apartamento Novo - Tijuca",
      description: "Apartamento pronto para morar em excelente localização",
      price: "R$ 580.000",
      image: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&h=600&fit=crop",
      region: "Tijuca",
      rooms: 2,
      bathrooms: 1,
      parking: 1,
      area: "75m²",
      url: "#",
      featured: true,
    },
    {
      id: "3",
      title: "Casa Condomínio - Recreio",
      description: "Casa térrea em condomínio de alto padrão",
      price: "R$ 1.200.000",
      image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&h=600&fit=crop",
      region: "Recreio dos Bandeirantes",
      rooms: 3,
      bathrooms: 2,
      parking: 2,
      area: "150m²",
      url: "#",
      featured: false,
    },
  ];

  // Filtrar imóveis destacados
  const filteredFeatured = useMemo(() => {
    return featuredCompraVenda.filter(imovel => {
      if (selectedRegion !== "todas") {
        const regionMap: { [key: string]: string } = {
          "recreio": "Recreio dos Bandeirantes",
          "tijuca": "Tijuca",
          "leblon": "Leblon",
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

      {/* Imóveis Destacados */}
      {filteredFeatured.length > 0 && (
        <div className="mb-12">
          <div className="text-center mb-8">
            <h4 className="text-2xl font-bold text-gray-900 mb-3 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Oportunidades em Destaque
            </h4>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto rounded-full"></div>
          </div>
          
          {/* Grid otimizado para cards em destaque - máximo 3 por linha, centralizados */}
          <div className="flex flex-wrap justify-center gap-8 lg:gap-12 mb-8">
            {filteredFeatured.map((imovel) => (
              <div 
                key={imovel.id} 
                className="w-full max-w-sm lg:max-w-md xl:max-w-lg transform hover:scale-105 transition-all duration-500 hover:shadow-2xl flex-shrink-0"
                style={{ 
                  flexBasis: filteredFeatured.length === 1 ? '400px' : 
                             filteredFeatured.length === 2 ? '400px' : 
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

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 mb-12">
        {servicos.map((servico) => {
          const IconComponent = servico.icon;
          return (
            <Card
              key={servico.id}
              className="group hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
            >
              <CardHeader className="pb-4">
                <div className="flex items-center gap-4 mb-2">
                  <div className="p-3 bg-blue-100 rounded-full">
                    <IconComponent className="w-6 h-6 text-blue-600" />
                  </div>
                  <CardTitle className="text-xl">{servico.titulo}</CardTitle>
                </div>
                <p className="text-gray-600">{servico.descricao}</p>
              </CardHeader>

              <CardContent className="space-y-4">
                <div className="space-y-2">
                  {servico.caracteristicas.map((caracteristica, index) => (
                    <div
                      key={index}
                      className="flex items-center text-sm text-gray-600"
                    >
                      <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mr-2 flex-shrink-0"></div>
                      <span>{caracteristica}</span>
                    </div>
                  ))}
                </div>

                <Button className="w-full bg-blue-600 hover:bg-blue-700 mt-4">
                  Saiba Mais
                </Button>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-lg p-8 text-white">
        <div className="max-w-4xl mx-auto">
          <h4 className="text-2xl font-bold mb-4 text-center">
            Por que escolher a Feitozza Imóveis?
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            {diferenciais.map((diferencial, index) => (
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
