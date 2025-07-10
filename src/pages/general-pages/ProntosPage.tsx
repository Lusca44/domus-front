import React from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/Footer";
import AluguelSection from "@/components/home/AluguelSection";
import ImoveisUsadosSection from "@/components/home/ImoveisUsadosSection";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const ProntosPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-gray-100">
      <Header />
      
      <div className="pt-8">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Imóveis Prontos
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Encontre imóveis prontos para morar ou investir, incluindo opções para aluguel e compra.
            </p>
          </div>
          
          <Tabs defaultValue="imoveis-usados" className="w-full">
            <div className="flex justify-center mb-8">
              <TabsList className="grid h-12 w-full max-w-md grid-cols-2">
                <TabsTrigger value="imoveis-usados" className="text-sm sm:text-base font-medium">
                  À Venda
                </TabsTrigger>
                <TabsTrigger value="aluguel" className="text-sm sm:text-base font-medium">
                  Para Alugar
                </TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value="imoveis-usados" className="mt-8">
              <ImoveisUsadosSection />
            </TabsContent>

            <TabsContent value="aluguel" className="mt-8">
              <AluguelSection />
            </TabsContent>
          </Tabs>
        </div>
      </div>

      <Footer isHomePage={false} />
    </div>
  );
};

export default ProntosPage;