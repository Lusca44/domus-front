
import React, { useState, useMemo } from "react";
import SubFilters from "./SubFilters";
import FeaturedCard from "./FeaturedCard";
import { lancamentos } from "@/cards/lancamentos/lancamentos";
import { getAvailableRegions, getAvailableRooms, itemMatchesFilters } from "@/config/filterConfig";

const LancamentosSection = () => {
  const [selectedRegion, setSelectedRegion] = useState("todas");
  const [selectedRooms, setSelectedRooms] = useState("todos");

  // **FILTROS GERADOS AUTOMATICAMENTE** - baseado nos cards de lançamento existentes
  const availableRegions = useMemo(() => getAvailableRegions(lancamentos), []);
  const availableRooms = useMemo(() => getAvailableRooms(lancamentos), []);

  // **FILTRAGEM AUTOMÁTICA** - usando a função centralizada de validação
  const filteredLancamentos = useMemo(() => {
    return lancamentos.filter(lancamento => 
      itemMatchesFilters(lancamento, selectedRegion, selectedRooms, lancamentos)
    );
  }, [selectedRegion, selectedRooms]);

  // Separar lançamentos em destaque e comuns
  const featuredLancamentos = filteredLancamentos.filter(l => l.destaque);
  const regularLancamentos = filteredLancamentos.filter(l => !l.destaque);

  const EmptyState = () => (
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

          {featuredLancamentos.length > 0 && regularLancamentos.length === 0 && featuredLancamentos.length === filteredLancamentos.length && (
            <div className="text-center py-6">
              <p className="text-gray-600 text-lg">
                Exibindo apenas lançamentos em destaque para os filtros selecionados.
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

export default LancamentosSection;
