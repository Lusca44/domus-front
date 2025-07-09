
import React, { useState, useMemo } from "react";
import SubFilters from "./SubFilters";
import FeaturedCard from "./FeaturedCard";
import { alugueis } from "@/cards/alugueis/alugueis";
import { getAvailableRegions, getAvailableRooms, itemMatchesFilters } from "@/config/filterConfig";

const AluguelSection = () => {
  const [selectedRegion, setSelectedRegion] = useState("todas");
  const [selectedRooms, setSelectedRooms] = useState("todos");

  // **FILTROS GERADOS AUTOMATICAMENTE** - baseado nos cards de aluguel existentes
  const availableRegions = useMemo(() => getAvailableRegions(alugueis), []);
  const availableRooms = useMemo(() => getAvailableRooms(alugueis), []);

  // **FILTRAGEM AUTOMÁTICA** - usando a função centralizada de validação
  const filteredAlugueis = useMemo(() => {
    return alugueis.filter(aluguel => 
      itemMatchesFilters(aluguel, selectedRegion, selectedRooms, alugueis)
    );
  }, [selectedRegion, selectedRooms]);

  // Separar alugueis em destaque e comuns
  const featuredAlugueis = filteredAlugueis.filter(l => l.destaque);
  const regularAlugueis = filteredAlugueis.filter(l => !l.destaque);

  const EmptyState = () => (
    <div className="text-center py-16 bg-gray-50 rounded-2xl">
      <div className="max-w-md mx-auto">
        <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
          </svg>
        </div>
        <p className="text-gray-500 text-lg mb-2">
          Nenhum aluguel encontrado
        </p>
        <p className="text-gray-400 text-sm">
          Tente ajustar os filtros para ver mais opções.
        </p>
      </div>
    </div>
  );

  return (
    <div className="space-y-12">
      {/* **FILTROS AUTOMÁTICOS** - populados baseado nos dados dos cards */}
      <SubFilters
        onRegionChange={setSelectedRegion}
        onRoomsChange={setSelectedRooms}
        selectedRegion={selectedRegion}
        selectedRooms={selectedRooms}
        availableRegions={availableRegions}
        availableRooms={availableRooms}
      />

      {filteredAlugueis.length > 0 ? (
        <>
          {/* Alugueis em Destaque */}
          {featuredAlugueis.length > 0 && (
            <div className="mb-16">
              <div className="text-center mb-8">
                <h3 className="text-3xl font-bold text-gray-900 mb-3 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  Alugueis em Destaque
                </h3>
                <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto rounded-full"></div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 lg:gap-8">
                {featuredAlugueis.map((aluguel) => (
                  <div 
                    key={aluguel.id} 
                    className="w-full transform hover:scale-105 transition-all duration-500 hover:shadow-2xl"
                  >
                    <div className="bg-gradient-to-br from-white to-blue-50 rounded-2xl shadow-xl border-2 border-blue-100 overflow-hidden h-full">
                      <FeaturedCard {...aluguel} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Outros Alugueis */}
          {regularAlugueis.length > 0 && (
            <div className="border-t border-gray-200 pt-12">
              <h4 className="text-2xl font-bold text-gray-900 mb-8 text-center">
                Outros Alugueis 
                <span className="text-lg font-normal text-gray-600 ml-2">
                  ({regularAlugueis.length})
                </span>
              </h4>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
                {regularAlugueis.map((aluguel) => (
                  <div 
                    key={aluguel.id}
                    className="w-full transform hover:scale-102 transition-all duration-300 hover:shadow-lg"
                  >
                    <FeaturedCard {...aluguel} />
                  </div>
                ))}
              </div>
            </div>
          )}

          {featuredAlugueis.length > 0 && regularAlugueis.length === 0 && featuredAlugueis.length === filteredAlugueis.length && (
            <div className="text-center py-6">
              <p className="text-gray-600 text-lg">
                Exibindo apenas alugueis em destaque para os filtros selecionados.
              </p>
            </div>
          )}
        </>
      ) : (
        <EmptyState />
      )}
    </div>
  );
};

export default AluguelSection;
