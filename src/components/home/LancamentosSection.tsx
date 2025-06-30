
import React, { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ArrowRight, Star } from "lucide-react";
import regioesHubs from "@/pages/general-pages/cards-home-page";
import SubFilters from "./SubFilters";
import FeaturedCard from "./FeaturedCard";

const LancamentosSection = () => {
  const [selectedRegion, setSelectedRegion] = useState("todas");
  const [selectedRooms, setSelectedRooms] = useState("todos");

  // Cards destacados para lançamentos
  const featuredLancamentos = [
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
  ];

  // Filtrar regiões
  const filteredRegioes = useMemo(() => {
    return regioesHubs.filter(regiao => {
      if (selectedRegion !== "todas" && regiao.id !== selectedRegion) {
        return false;
      }
      return true;
    });
  }, [selectedRegion]);

  // Filtrar lançamentos destacados
  const filteredFeatured = useMemo(() => {
    return featuredLancamentos.filter(lancamento => {
      if (selectedRegion !== "todas") {
        const regionMap: { [key: string]: string } = {
          "porto-maravilha": "Porto Maravilha",
          "barra-tijuca": "Barra da Tijuca",
          "recreio": "Recreio dos Bandeirantes",
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
      <div className="text-center mb-10 sm:mb-12">
        <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3 sm:mb-4">
          Escolha Sua Região Ideal
        </h3>
        <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto">
          Explore nossos empreendimentos organizados por região e encontre a
          localização perfeita para seu novo lar.
        </p>
      </div>

      <SubFilters
        onRegionChange={setSelectedRegion}
        onRoomsChange={setSelectedRooms}
        selectedRegion={selectedRegion}
        selectedRooms={selectedRooms}
      />

      {/* Lançamentos Destacados */}
      {filteredFeatured.length > 0 && (
        <div className="mb-12">
          <h4 className="text-xl font-bold text-gray-900 mb-6">
            Lançamentos em Destaque
          </h4>
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8 lg:gap-12">
            {filteredFeatured.map((lancamento) => (
              <FeaturedCard key={lancamento.id} {...lancamento} />
            ))}
          </div>
        </div>
      )}

      {/* Regiões */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8 lg:gap-12">
        {filteredRegioes.map((regiao) => (
          <Card
            key={regiao.id}
            className={`group hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 ${
              regiao.destaque ? "ring-2 ring-blue-500 ring-offset-2" : ""
            }`}
          >
            {regiao.destaque && (
              <div className="absolute -top-3 left-4 bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-medium flex items-center gap-1 z-10">
                <Star className="w-3 h-3" />
                Destaque
              </div>
            )}

            <div className="relative overflow-hidden rounded-t-lg">
              <img
                src={regiao.imagem}
                alt={regiao.nome}
                className="w-full h-48 sm:h-56 object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute top-4 right-4">
                <span
                  className={`px-2 py-1 rounded-full text-xs font-medium ${
                    regiao.status === "Disponível"
                      ? "bg-green-100 text-green-800"
                      : "bg-yellow-100 text-yellow-800"
                  }`}
                >
                  {regiao.status}
                </span>
              </div>
            </div>

            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle className="text-xl sm:text-2xl mb-2">
                    {regiao.nome}
                  </CardTitle>
                  <CardDescription className="text-sm sm:text-base">
                    {regiao.descricao}
                  </CardDescription>
                </div>
              </div>
            </CardHeader>

            <CardContent className="space-y-4">
              <div className="space-y-2">
                {regiao.caracteristicas
                  .slice(0, 3)
                  .map((caracteristica, index) => (
                    <div
                      key={index}
                      className="flex items-center text-sm text-gray-600"
                    >
                      <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mr-2 flex-shrink-0"></div>
                      <span>{caracteristica}</span>
                    </div>
                  ))}
              </div>

              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pt-4 border-t">
                <div>
                  <p className="text-xs text-gray-500">
                    {regiao.lancamentosAtivos} lançamento
                    {regiao.lancamentosAtivos !== 1 ? "s" : ""} ativo
                    {regiao.lancamentosAtivos !== 1 ? "s" : ""}
                  </p>
                  <p className="font-semibold text-blue-600 text-sm sm:text-base">
                    {regiao.precoPartir}
                  </p>
                </div>

                <Button
                  asChild
                  className={`w-full sm:w-auto ${
                    regiao.status === "Disponível"
                      ? "bg-blue-600 hover:bg-blue-700"
                      : "bg-gray-400 cursor-not-allowed"
                  }`}
                  disabled={regiao.status !== "Disponível"}
                >
                  <Link
                    to={regiao.status === "Disponível" ? regiao.url : "#"}
                    onClick={() => window.scrollTo(0, 0)}
                  >
                    <span className="flex items-center gap-2">
                      {regiao.status === "Disponível"
                        ? "Ver Lançamentos"
                        : "Em Breve"}
                      {regiao.status === "Disponível" && (
                        <ArrowRight className="w-4 h-4" />
                      )}
                    </span>
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default LancamentosSection;
