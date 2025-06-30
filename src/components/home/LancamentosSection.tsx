
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
      titulo: "Residencial Pixinguinha",
      descricao: "Apartamentos modernos no coração do Porto Maravilha",
      preco: "A partir de R$ 294.900",
      imagem: "/src/assets/images/imagem-regiao-portuaria-MAM-praca-flutuante.jpg",
      regiao: "Porto Maravilha",
      quartos: 2,
      area: "45m²",
      url: "/porto-maravilha/lancamento/pixinguinha",
      destaque: true,
    },
    {
      id: "2",
      titulo: "Atlântico Residence",
      descricao: "Luxo e conforto na Barra da Tijuca",
      preco: "A partir de R$ 450.000",
      imagem: "/src/assets/images/imagem-barra-da-tijuca.webp",
      regiao: "Barra da Tijuca",
      quartos: 3,
      area: "85m²",
      url: "/barra-tijuca/lancamento/atlantico",
      destaque: true,
    },
    {
      id: "3",
      titulo: "Paradise Garden",
      descricao: "Tranquilidade e natureza no Recreio",
      preco: "A partir de R$ 380.000",
      imagem: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800&h=600&fit=crop",
      regiao: "Recreio dos Bandeirantes",
      quartos: 2,
      area: "65m²",
      url: "/recreio/lancamento/paradise",
      destaque: false,
    },
    {
      id: "4",
      titulo: "Vista Mar Copacabana",
      descricao: "Apartamentos com vista para o mar em Copacabana",
      preco: "A partir de R$ 520.000",
      imagem: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&h=600&fit=crop",
      regiao: "Copacabana",
      quartos: 1,
      area: "35m²",
      url: "#",
      destaque: true,
    },
    {
      id: "5",
      titulo: "Ipanema Premium",
      descricao: "Luxo e sofisticação no coração de Ipanema",
      preco: "A partir de R$ 680.000",
      imagem: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&h=600&fit=crop",
      regiao: "Ipanema",
      quartos: 2,
      area: "70m²",
      url: "#",
      destaque: false,
    },
    {
      id: "6",
      titulo: "Tijuca Residencial",
      descricao: "Apartamentos familiares na Tijuca",
      preco: "A partir de R$ 350.000",
      imagem: "https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=800&h=600&fit=crop",
      regiao: "Tijuca",
      quartos: 3,
      area: "75m²",
      url: "#",
      destaque: false,
    },
    {
      id: "7",
      titulo: "Porto Maravilha Elite",
      descricao: "Empreendimento de alto padrão no Porto Maravilha",
      preco: "A partir de R$ 420.000",
      imagem: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&h=600&fit=crop",
      regiao: "Porto Maravilha",
      quartos: 1,
      area: "42m²",
      url: "#",
      destaque: true,
    },
    {
      id: "8",
      titulo: "Barra Exclusive",
      descricao: "Apartamentos de luxo na Barra da Tijuca",
      preco: "A partir de R$ 750.000",
      imagem: "https://images.unsplash.com/photo-1484154218962-a197022b5858?w=800&h=600&fit=crop",
      regiao: "Barra da Tijuca",
      quartos: 4,
      area: "120m²",
      url: "#",
      destaque: true,
    },
    {
      id: "9",
      titulo: "Recreio Family",
      descricao: "Ideal para famílias no Recreio dos Bandeirantes",
      preco: "A partir de R$ 480.000",
      imagem: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&h=600&fit=crop",
      regiao: "Recreio dos Bandeirantes",
      quartos: 3,
      area: "90m²",
      url: "#",
      destaque: false,
    },
    {
      id: "10",
      titulo: "Copacabana Studio",
      descricao: "Studios modernos em Copacabana",
      preco: "A partir de R$ 280.000",
      imagem: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&h=600&fit=crop",
      regiao: "Copacabana",
      quartos: 1,
      area: "28m²",
      url: "#",
      destaque: false,
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
        if (lancamento.regiao !== regionMap[selectedRegion]) {
          return false;
        }
      }
      if (selectedRooms !== "todos") {
        const roomsNumber = parseInt(selectedRooms);
        if (selectedRooms === "4" && lancamento.quartos < 4) {
          return false;
        } else if (selectedRooms !== "4" && lancamento.quartos !== roomsNumber) {
          return false;
        }
      }
      return true;
    });
  }, [selectedRegion, selectedRooms]);

  // Separar lançamentos em destaque e comuns
  const featuredLancamentos = filteredLancamentos.filter(l => l.destaque);
  const regularLancamentos = filteredLancamentos.filter(l => !l.destaque);

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
              
              {/* Grid otimizado para cards em destaque - máximo 3 por linha, centralizados */}
              <div className="flex flex-wrap justify-center gap-8 lg:gap-12">
                {featuredLancamentos.map((lancamento) => (
                  <div 
                    key={lancamento.id} 
                    className="w-full max-w-sm lg:max-w-md xl:max-w-lg transform hover:scale-105 transition-all duration-500 hover:shadow-2xl flex-shrink-0"
                    style={{ 
                      flexBasis: featuredLancamentos.length === 1 ? '400px' : 
                                 featuredLancamentos.length === 2 ? '400px' : 
                                 'min(400px, calc(33.333% - 2rem))'
                    }}
                  >
                    <div className="bg-gradient-to-br from-white to-blue-50 rounded-2xl shadow-xl border-2 border-blue-100 overflow-hidden h-full">
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
              
              {/* Grid responsivo com centralização automática - máximo 4 por linha */}
              <div className="flex flex-wrap justify-center gap-6 lg:gap-8">
                {regularLancamentos.map((lancamento) => (
                  <div 
                    key={lancamento.id}
                    className="w-full max-w-sm transform hover:scale-102 transition-all duration-300 hover:shadow-lg flex-shrink-0"
                    style={{ 
                      flexBasis: 'min(320px, calc(25% - 1.5rem))',
                      minWidth: '280px'
                    }}
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
