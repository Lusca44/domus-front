import React from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/Footer';
import FeaturedCard from '@/components/home/FeaturedCard';
import { lancamentos } from '@/cards/lancamentos/lancamentos';
import { alugueis } from '@/cards/alugueis/alugueis';
import { imoveisUsados } from '@/cards/imoveis-usados/imoveis-usados';
import { Imovel } from '@/cards/imoveis';

const NewHomePage = () => {
  // Combinar todos os imóveis
  const todosImoveis: Imovel[] = [...lancamentos, ...alugueis, ...imoveisUsados];

  // Filtrar imóveis de regiões destaque (máximo 2 por região)
  const regioesDestaque = () => {
    const regioesMap = new Map<string, Imovel[]>();
    
    // Agrupar por região apenas os que têm regiaoDestaque = true
    todosImoveis
      .filter(imovel => imovel.regiaoDestaque === true)
      .forEach(imovel => {
        if (!regioesMap.has(imovel.regiao)) {
          regioesMap.set(imovel.regiao, []);
        }
        regioesMap.get(imovel.regiao)!.push(imovel);
      });

    // Pegar até 2 imóveis por região de destaque
    const result: { regiao: string; imoveis: Imovel[] }[] = [];
    regioesMap.forEach((imoveis, regiao) => {
      result.push({
        regiao,
        imoveis: imoveis.slice(0, 2) // máximo 2 por região
      });
    });

    return result;
  };

  // Filtrar "Outras regiões" (imóveis que não são de regiões destaque)
  const outrasRegioes = () => {
    return todosImoveis
      .filter(imovel => !imovel.regiaoDestaque)
      .slice(0, 2); // apenas 2 cards
  };

  const regioesComDestaque = regioesDestaque();
  const imoveisOutrasRegioes = outrasRegioes();

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      {/* Hero Section */}
      <section className="relative h-[70vh] bg-gradient-to-r from-slate-900 to-slate-700 flex items-center justify-center">
        <div className="absolute inset-0 bg-black opacity-40"></div>
        <div className="relative z-10 text-center text-white px-4">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Encontre Seu Novo
            <span className="text-yellow-400 block">Lar no Rio</span>
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
            Descubra imóveis exclusivos nas melhores regiões do Rio de Janeiro
          </p>
          
          {/* Search Bar */}
          <div className="bg-white rounded-lg p-6 max-w-4xl mx-auto shadow-xl">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div>
                <select className="w-full p-3 border border-gray-300 rounded-md text-gray-800">
                  <option>Finalidade</option>
                  <option>Venda</option>
                  <option>Locação</option>
                </select>
              </div>
              <div>
                <select className="w-full p-3 border border-gray-300 rounded-md text-gray-800">
                  <option>Tipo</option>
                  <option>Apartamento</option>
                  <option>Casa</option>
                  <option>Cobertura</option>
                </select>
              </div>
              <div>
                <select className="w-full p-3 border border-gray-300 rounded-md text-gray-800">
                  <option>Bairro</option>
                  <option>Copacabana</option>
                  <option>Ipanema</option>
                  <option>Leblon</option>
                </select>
              </div>
              <div>
                <button className="w-full bg-yellow-500 hover:bg-yellow-600 text-white p-3 rounded-md font-semibold transition-colors">
                  Buscar
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Seção de Regiões Destaque */}
      {regioesComDestaque.length > 0 && (
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Regiões em Destaque
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Explore nossos imóveis nas regiões mais procuradas do Rio de Janeiro
              </p>
            </div>

            {regioesComDestaque.map((regiao, index) => (
              <div key={regiao.regiao} className={`mb-16 ${index > 0 ? 'border-t pt-16' : ''}`}>
                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold text-gray-800 mb-2">
                    {regiao.regiao}
                  </h3>
                  <div className="w-24 h-1 bg-yellow-500 mx-auto"></div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                  {regiao.imoveis.map((imovel) => (
                    <FeaturedCard
                      key={imovel.id}
                      {...imovel}
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Seção Outras Regiões */}
      {imoveisOutrasRegioes.length > 0 && (
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Outras Regiões
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Descubra também excelentes oportunidades em outras localidades
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              {imoveisOutrasRegioes.map((imovel) => (
                <FeaturedCard
                  key={imovel.id}
                  {...imovel}
                />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="py-16 bg-slate-800 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Não Encontrou Sua Região Ideal?
          </h2>
          <p className="text-lg mb-8 opacity-90 max-w-2xl mx-auto">
            Entre em contato conosco e descubra outras oportunidades de investimento no Rio de Janeiro.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-yellow-500 hover:bg-yellow-600 text-white px-8 py-3 rounded-lg font-semibold transition-colors">
              Ver Todos os Imóveis
            </button>
            <button className="border-2 border-white text-white hover:bg-white hover:text-slate-800 px-8 py-3 rounded-lg font-semibold transition-colors">
              Fale Conosco
            </button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default NewHomePage;