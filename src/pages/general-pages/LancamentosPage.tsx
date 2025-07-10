import React from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/Footer";
import LancamentosSection from "@/components/home/LancamentosSection";

const LancamentosPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-gray-100">
      <Header />
      
      <div className="pt-6 sm:pt-8">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8 sm:mb-12">
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Lançamentos
            </h1>
            <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto px-4">
              Explore nossos empreendimentos em lançamento nas melhores regiões do Rio de Janeiro.
            </p>
          </div>
          
          <LancamentosSection />
        </div>
      </div>

      <Footer isHomePage={false} />
    </div>
  );
};

export default LancamentosPage;