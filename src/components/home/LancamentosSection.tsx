
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

  return (
    <div className="space-y-8">
      <SubFilters
        onRegionChange={setSelectedRegion}
        onRoomsChange={setSelectedRooms}
        selectedRegion={selectedRegion}
        selectedRooms={selectedRooms}
      />

      {/* Todos os Lançamentos */}
      {filteredLancamentos.length > 0 ? (
        <div>
          <h4 className="text-xl font-bold text-gray-900 mb-6">
            {selectedRegion !== "todas" || selectedRooms !== "todos" 
              ? "Lançamentos Filtrados" 
              : "Todos os Lançamentos"} 
            ({filteredLancamentos.length})
          </h4>
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8 lg:gap-12">
            {filteredLancamentos.map((lancamento) => (
              <FeaturedCard key={lancamento.id} {...lancamento} />
            ))}
          </div>
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">
            Nenhum lançamento encontrado com os filtros selecionados.
          </p>
          <p className="text-gray-400 text-sm mt-2">
            Tente ajustar os filtros para ver mais opções.
          </p>
        </div>
      )}
    </div>
  );
};

export default LancamentosSection;
