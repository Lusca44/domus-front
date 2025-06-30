
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MapPin, Building2, Phone, Mail, Star } from "lucide-react";
import regioesHubs from "./cards-home-page";
import Footer from "@/components/Footer";
import LancamentosSection from "@/components/home/LancamentosSection";
import AluguelSection from "@/components/home/AluguelSection";
import CompraVendaSection from "@/components/home/CompraVendaSection";

/**
 * Página Inicial - Hubs de Regiões
 *
 * Esta página apresenta todos os hubs de lançamentos organizados por região,
 * permitindo que os usuários naveguem facilmente para os empreendimentos
 * de seu interesse em diferentes áreas do Rio de Janeiro.
 */
const HomePage = () => {
  const qtdLancamentosAtivos = () => {
    let quantidade = 0;
    regioesHubs.forEach((regiao) => {
      quantidade += regiao.lancamentosAtivos;
    });
    return quantidade;
  };

  const qtdRegioes = () => {
    return regioesHubs.length;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-gray-100">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-4 sm:py-6">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <div className="text-center sm:text-left">
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
                Feitozza Imóveis
              </h1>
              <p className="text-sm sm:text-base text-gray-600 mt-1">
                Lançamentos Imobiliários, vendas e alugueis no Rio de Janeiro
              </p>
            </div>
            <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4 text-sm text-gray-600">
              <div className="flex items-center gap-1">
                <Phone className="w-4 h-4" />
                <span>(21) 2222-3333</span>
              </div>
              <div className="flex items-center gap-1">
                <Mail className="w-4 h-4" />
                <span>contato@feitozza.com.br</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-12 sm:py-16 lg:py-20">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-4xl mx-auto">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 sm:mb-6">
              Encontre Seu Novo
              <span className="text-blue-600 block sm:inline sm:ml-3">
                Lar no Rio
              </span>
            </h2>
            <p className="text-lg sm:text-xl text-gray-700 mb-8 sm:mb-10 leading-relaxed px-4">
              Descubra imóveis exclusivos nas melhores regiões do Rio de
              Janeiro. Qualidade, localização privilegiada e o melhor
              custo-benefício.
            </p>

            {/* Stats */}
            {/* TODO Remover isso*/}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8 max-w-2xl mx-auto">
              <div className="text-center">
                <div className="text-2xl sm:text-3xl font-bold text-blue-600">
                  {qtdRegioes()}
                </div>
                <div className="text-sm sm:text-base text-gray-600">
                  Regiões Atendidas
                </div>
              </div>
              <div className="text-center">
                <div className="text-2xl sm:text-3xl font-bold text-blue-600">
                  {qtdLancamentosAtivos()}
                </div>
                <div className="text-sm sm:text-base text-gray-600">
                  Lançamento Ativo
                </div>
              </div>
              <div className="text-center">
                <div className="text-2xl sm:text-3xl font-bold text-blue-600">
                  24h
                </div>
                <div className="text-sm sm:text-base text-gray-600">
                  Atendimento
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Navigation Tabs Section */}
      <section className="py-12 sm:py-16">
        <div className="container mx-auto px-4">
          <Tabs defaultValue="lancamentos" className="w-full">
            <div className="flex justify-center mb-8">
              <TabsList className="grid w-full max-w-md grid-cols-3 h-12">
                <TabsTrigger 
                  value="lancamentos" 
                  className="text-sm sm:text-base font-medium"
                >
                  Lançamentos
                </TabsTrigger>
                <TabsTrigger 
                  value="aluguel" 
                  className="text-sm sm:text-base font-medium"
                >
                  Alugueis
                </TabsTrigger>
                <TabsTrigger 
                  value="compra-venda" 
                  className="text-sm sm:text-base font-medium"
                >
                  Imóveis Usados
                </TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value="lancamentos" className="mt-8">
              <div className="text-center mb-10 sm:mb-12">
                <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3 sm:mb-4">
                  Escolha Sua Região Ideal
                </h3>
                <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto">
                  Explore nossos empreendimentos organizados por região e encontre a
                  localização perfeita para seu novo lar.
                </p>
              </div>
              <LancamentosSection />
            </TabsContent>

            <TabsContent value="aluguel" className="mt-8">
              <AluguelSection />
            </TabsContent>

            <TabsContent value="compra-venda" className="mt-8">
              <CompraVendaSection />
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 sm:py-16 bg-blue-600 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h3 className="text-2xl sm:text-3xl font-bold mb-4">
              Não Encontrou Sua Região Ideal?
            </h3>
            <p className="text-lg sm:text-xl mb-6 sm:mb-8 opacity-90">
              Entre em contato conosco e descubra outras oportunidades de
              investimento no Rio de Janeiro.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                variant="secondary"
                className="bg-white text-blue-600 hover:bg-gray-100"
                asChild
              >
                <a href="tel:+552122223333">
                  <Phone className="w-4 h-4 mr-2" />
                  Ligar Agora
                </a>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white hover:text-blue-600"
                asChild
              >
                <a href="mailto:contato@feitozza.com.br">
                  <Mail className="w-4 h-4 mr-2" />
                  Enviar Email
                </a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer usando o novo componente */}
      <Footer isHomePage={true} />
    </div>
  );
};

export default HomePage;
