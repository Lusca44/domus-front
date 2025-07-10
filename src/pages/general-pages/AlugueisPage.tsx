import React from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/Footer";
import AluguelSection from "@/components/home/AluguelSection";

const AlugueisPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-gray-100">
      <Header />
      
      <div className="pt-6 sm:pt-8">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8 sm:mb-12">
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Aluguéis
            </h1>
            <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto px-4">
              Encontre o imóvel perfeito para alugar nas melhores regiões do Rio de Janeiro.
            </p>
          </div>
          
          <AluguelSection />
        </div>
      </div>

      <Footer isHomePage={false} />
    </div>
  );
};

export default AlugueisPage;