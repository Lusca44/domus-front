import React from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/Footer';

const LancamentosPage = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="container mx-auto px-4 py-12">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Lançamentos
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Conheça nossos lançamentos imobiliários exclusivos no Rio de Janeiro
          </p>
        </div>

        {/* Conteúdo será implementado posteriormente */}
        <div className="mt-12 text-center">
          <div className="bg-white rounded-lg shadow-md p-8">
            <p className="text-gray-500">
              Em breve: Página completa de lançamentos
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default LancamentosPage;