
import React, { useState, useMemo } from "react";
import SubFilters from "./SubFilters";
import FeaturedCard from "./FeaturedCard";

const LancamentosSection = () => {
  const [selectedRegion, setSelectedRegion] = useState("todas");
  const [selectedRooms, setSelectedRooms] = useState("todos");

  // Todos os lançamentos disponíveis
  const allLancamentos = [
    {
      id: "1",
      title: "Residencial Pixinguinha",
      description: "Apartamentos modernos no coração do Porto Maravilha",
      price: "A partir de R$ 294.900",
      image: "/src/assets/images/imagem-regiao-portuaria-MAM-praca-flutuante.jpg",
      region: "Porto Maravilha",
      rooms: 2,
      bathrooms: 1,
      parking: 1,
      area: "45m²",
      url: "/porto-maravilha/lancamento/pixinguinha",
      featured: true,
    },
    {
      id: "2",
      title: "Atlântico Residence",
      description: "Luxo e conforto na Barra da Tijuca",
      price: "A partir de R$ 450.000",
      image: "/src/assets/images/imagem-barra-da-tijuca.webp",
      region: "Barra da Tijuca",
      rooms: 3,
      bathrooms: 2,
      parking: 2,
      area: "85m²",
      url: "/barra-tijuca/lancamento/atlantico",
      featured: true,
    },
    {
      id: "3",
      title: "Paradise Garden",
      description: "Tranquilidade e natureza no Recreio",
      price: "A partir de R$ 380.000",
      image: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800&h=600&fit=crop",
      region: "Recreio dos Bandeirantes",
      rooms: 2,
      bathrooms: 2,
      parking: 1,
      area: "65m²",
      url: "/recreio/lancamento/paradise",
      featured: false,
    },
    {
      id: "4",
      title: "Vista Mar Copacabana",
      description: "Apartamentos com vista para o mar em Copacabana",
      price: "A partir de R$ 520.000",
      image: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&h=600&fit=crop",
      region: "Copacabana",
      rooms: 1,
      bathrooms: 1,
      parking: 0,
      area: "35m²",
      url: "#",
      featured: true,
    },
    {
      id: "5",
      title: "Ipanema Premium",
      description: "Luxo e sofisticação no coração de Ipanema",
      price: "A partir de R$ 680.000",
      image: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&h=600&fit=crop",
      region: "Ipanema",
      rooms: 2,
      bathrooms: 2,
      parking: 1,
      area: "70m²",
      url: "#",
      featured: false,
    },
    {
      id: "6",
      title: "Tijuca Residencial",
      description: "Apartamentos familiares na Tijuca",
      price: "A partir de R$ 350.000",
      image: "https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=800&h=600&fit=crop",
      region: "Tijuca",
      rooms: 3,
      bathrooms: 2,
      parking: 1,
      area: "75m²",
      url: "#",
      featured: false,
    },
    {
      id: "7",
      title: "Porto Maravilha Elite",
      description: "Empreendimento de alto padrão no Porto Maravilha",
      price: "A partir de R$ 420.000",
      image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&h=600&fit=crop",
      region: "Porto Maravilha",
      rooms: 1,
      bathrooms: 1,
      parking: 1,
      area: "42m²",
      url: "#",
      featured: true,
    },
    {
      id: "8",
      title: "Barra Exclusive",
      description: "Apartamentos de luxo na Barra da Tijuca",
      price: "A partir de R$ 750.000",
      image: "https://images.unsplash.com/photo-1484154218962-a197022b5858?w=800&h=600&fit=crop",
      region: "Barra da Tijuca",
      rooms: 4,
      bathrooms: 3,
      parking: 2,
      area: "120m²",
      url: "#",
      featured: true,
    },
    {
      id: "9",
      title: "Recreio Family",
      description: "Ideal para famílias no Recreio dos Bandeirantes",
      price: "A partir de R$ 480.000",
      image: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&h=600&fit=crop",
      region: "Recreio dos Bandeirantes",
      rooms: 3,
      bathrooms: 2,
      parking: 2,
      area: "90m²",
      url: "#",
      featured: false,
    },
    {
      id: "10",
      title: "Copacabana Studio",
      description: "Studios modernos em Copacabana",
      price: "A partir de R$ 280.000",
      image: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&h=600&fit=crop",
      region: "Copacabana",
      rooms: 1,
      bathrooms: 1,
      parking: 0,
      area: "28m²",
      url: "#",
      featured: false,
    },
  ];

  // Filtrar lançamentos
  const filteredLancamentos = useMemo(() => {
    return allLancamentos.filter(lancamento => {
      if (selectedRegion !== "todas") {
        const regionMap: { [key: string]: string } = {
          "porto-maravilha": "Porto Maravilha",
          "barra-tijuca": "Barra da Tijuca",
          "recreio": "Recreio dos Bandeirantes",
          "copacabana": "Copacabana",
          "ipanema": "Ipanema",
          "tijuca": "Tijuca",
        };
        if (lancamento.region !== regionMap[selectedRegion]) {
          return false;
        }
      }
      if (selectedRooms !== "todos") {
        const roomsNumber = parseInt(selectedRooms);
        if (selectedRooms === "4" && lancamento.rooms < 4) {
          return false;
        } else if (selectedRooms !== "4" && lancamento.rooms !== roomsNumber) {
          return false;
        }
      }
      return true;
    });
  }, [selectedRegion, selectedRooms]);

  // Separar lançamentos em destaque e comuns
  const featuredLancamentos = filteredLancamentos.filter(l => l.featured);
  const regularLancamentos = filteredLancamentos.filter(l => !l.featured);

  return (
    <div className="space-y-12">
      <SubFilters
        onRegionChange={setSelectedRegion}
        onRoomsChange={setSelectedRooms}
        selectedRegion={selectedRegion}
        selectedRooms={selectedRooms}
      />

      {filteredLancamentos.length > 0 ? (
        <>
          {/* Lançamentos em Destaque */}
          {featuredLancamentos.length > 0 && (
            <div className="mb-16">
              <div className="text-center mb-8">
                <h3 className="text-3xl font-bold text-gray-900 mb-3 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  Lançamentos em Destaque
                </h3>
                <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto rounded-full"></div>
              </div>
              
              {/* Grid responsivo para itens em destaque - cards maiores */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 mb-8">
                {featuredLancamentos.map((lancamento) => (
                  <div 
                    key={lancamento.id} 
                    className="transform hover:scale-105 transition-all duration-500 hover:shadow-2xl"
                  >
                    <div className="bg-gradient-to-br from-white to-blue-50 rounded-2xl shadow-xl border-2 border-blue-100 overflow-hidden">
                      <FeaturedCard {...lancamento} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Outros Lançamentos */}
          {regularLancamentos.length > 0 && (
            <div className="border-t border-gray-200 pt-12">
              <h4 className="text-2xl font-bold text-gray-900 mb-8 text-center">
                Outros Lançamentos 
                <span className="text-lg font-normal text-gray-600 ml-2">
                  ({regularLancamentos.length})
                </span>
              </h4>
              
              {/* Grid responsivo para itens regulares - cards menores */}
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 lg:gap-8">
                {regularLancamentos.map((lancamento) => (
                  <div 
                    key={lancamento.id}
                    className="transform hover:scale-102 transition-all duration-300 hover:shadow-lg"
                  >
                    <FeaturedCard {...lancamento} />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Caso só tenha itens em destaque */}
          {featuredLancamentos.length > 0 && regularLancamentos.length === 0 && featuredLancamentos.length === filteredLancamentos.length && (
            <div className="text-center py-6">
              <p className="text-gray-600 text-lg">
                Exibindo apenas lançamentos em destaque para os filtros selecionados.
              </p>
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
              Nenhum lançamento encontrado
            </p>
            <p className="text-gray-400 text-sm">
              Tente ajustar os filtros para ver mais opções.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default LancamentosSection;
