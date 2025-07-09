import React, { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MapPin, Building2, Phone, Mail, Star } from "lucide-react";
import regioesHubs from "./cards-home-page";
import Footer from "@/components/Footer";
import LancamentosSection from "@/components/home/LancamentosSection";
import AluguelSection from "@/components/home/AluguelSection";
import ImoveisUsadosSection from "@/components/home/ImoveisUsadosSection";
import { lancamentos } from "@/cards/lancamentos/lancamentos";
import { alugueis } from "@/cards/alugueis/alugueis";
import { imoveisUsados } from "@/cards/imoveis-usados/imoveis-usados";

/**
 * Página Inicial - Hubs de Regiões
 *
 * Esta página apresenta todos os hubs de lançamentos organizados por região,
 * permitindo que os usuários naveguem facilmente para os empreendimentos
 * de seu interesse em diferentes áreas do Rio de Janeiro.
 */
const HomePage = () => {
  // Verificar quais categorias têm itens disponíveis
  const availableTabs = useMemo(() => {
    const tabs = [];
    
    if (lancamentos.length > 0) {
      tabs.push({ value: "lancamentos", label: "Lançamentos" });
    }
    
    if (alugueis.length > 0) {
      tabs.push({ value: "aluguel", label: "Alugueis" });
    }
    
    if (imoveisUsados.length > 0) {
      tabs.push({ value: "imoveis-usados", label: "Imóveis Usados" });
    }
    
    return tabs;
  }, []);

  // Definir a aba padrão como a primeira disponível
  const defaultTab = availableTabs[0]?.value || "lancamentos";
  
  // Estado para controlar a aba ativa
  const [activeTab, setActiveTab] = useState(defaultTab);

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

  // Função para obter estatísticas baseadas na aba ativa
  const getStats = (tab: string) => {
    switch (tab) {
      case "lancamentos":
        const regioesLancamentos = [...new Set(lancamentos.map(item => item.regiao))].length;
        return {
          regioes: regioesLancamentos,
          quantidade: lancamentos.length,
          tipoLabel: "Lançamentos",
          quantidadeLabel: "Lançamentos Disponíveis"
        };
      case "aluguel":
        const regioesAlugueis = [...new Set(alugueis.map(item => item.regiao))].length;
        return {
          regioes: regioesAlugueis,
          quantidade: alugueis.length,
          tipoLabel: "Aluguéis",
          quantidadeLabel: "Aluguéis Disponíveis"
        };
      case "imoveis-usados":
        const regioesUsados = [...new Set(imoveisUsados.map(item => item.regiao))].length;
        return {
          regioes: regioesUsados,
          quantidade: imoveisUsados.length,
          tipoLabel: "Imóveis Usados",
          quantidadeLabel: "Imóveis Disponíveis"
        };
      default:
        return {
          regioes: qtdRegioes(),
          quantidade: qtdLancamentosAtivos(),
          tipoLabel: "Lançamentos",
          quantidadeLabel: "Lançamentos Ativos"
        };
    }
  };

  const currentStats = getStats(activeTab);

  // Se não há nenhuma categoria disponível, não renderizar as abas
  if (availableTabs.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-gray-100">
        {/* Header */}
        <header className="bg-white shadow-sm border-b">
          <div className="container mx-auto px-4 py-4 sm:py-6">
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
              <div className="text-center sm:text-left">
                <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
                  Feitoza Imóveis
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
                  <span>Feitozaimoveis@yahoo.com</span>
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

        {/* Mensagem quando não há imóveis */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            <div className="text-center py-16 bg-gray-50 rounded-2xl">
              <div className="max-w-md mx-auto">
                <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Building2 className="w-8 h-8 text-gray-400" />
                </div>
                <p className="text-gray-500 text-lg mb-2">
                  Em breve novos imóveis
                </p>
                <p className="text-gray-400 text-sm">
                  Entre em contato conosco para mais informações.
                </p>
              </div>
            </div>
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
                  <a href="mailto:Feitozaimoveis@yahoo.com">
                    <Mail className="w-4 h-4 mr-2" />
                    Enviar Email
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </section>

        <Footer isHomePage={true} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-gray-100">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-4 sm:py-6">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <div className="text-center sm:text-left">
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
                Feitoza Imóveis
              </h1>
              <p className="text-sm sm:text-base text-gray-600 mt-1">
                Lançamentos Imobiliários, vendas e alugueis no Rio de Janeiro
              </p>
            </div>
            <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4 text-sm text-gray-600">
              {/* TODO Atualizar numero  */}
              {/* <div className="flex items-center gap-1">
                <Phone className="w-4 h-4" />
                <span>(21) 2222-3333</span>
              </div> */}
              <div className="flex items-center gap-1">
                <Mail className="w-4 h-4" />
                <span>Feitozaimoveis@yahoo.com</span>
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

            {/* Stats dinâmicas baseadas na aba ativa */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8 max-w-2xl mx-auto">
              <div className="text-center">
                <div className="text-2xl sm:text-3xl font-bold text-blue-600">
                  {currentStats.regioes}
                </div>
                <div className="text-sm sm:text-base text-gray-600">
                  Regiões Atendidas
                </div>
              </div>
              <div className="text-center">
                <div className="text-2xl sm:text-3xl font-bold text-blue-600">
                  {currentStats.quantidade}
                </div>
                <div className="text-sm sm:text-base text-gray-600">
                  {currentStats.quantidadeLabel}
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
          <Tabs defaultValue={defaultTab} onValueChange={setActiveTab} className="w-full">
            <div className="flex justify-center mb-8">
              <TabsList 
                className={`grid h-12 ${
                  availableTabs.length === 1 ? 'w-full max-w-xs grid-cols-1' :
                  availableTabs.length === 2 ? 'w-full max-w-md grid-cols-2' :
                  'w-full max-w-md grid-cols-3'
                }`}
              >
                {availableTabs.map((tab) => (
                  <TabsTrigger 
                    key={tab.value}
                    value={tab.value} 
                    className="text-sm sm:text-base font-medium"
                  >
                    {tab.label}
                  </TabsTrigger>
                ))}
              </TabsList>
            </div>

            {availableTabs.find(tab => tab.value === "lancamentos") && (
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
            )}

            {availableTabs.find(tab => tab.value === "aluguel") && (
              <TabsContent value="aluguel" className="mt-8">
                <AluguelSection />
              </TabsContent>
            )}

            {availableTabs.find(tab => tab.value === "imoveis-usados") && (
              <TabsContent value="imoveis-usados" className="mt-8">
                <ImoveisUsadosSection />
              </TabsContent>
            )}
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
              
              {/* TODO Atualizar numero  */}
              {/* <Button
                size="lg"
                variant="secondary"
                className="bg-white text-blue-600 hover:bg-gray-100"
                asChild
              >
                <a href="tel:+552122223333">
                  <Phone className="w-4 h-4 mr-2" />
                  Ligar Agora
                </a>
              </Button> */}
              <Button
                size="lg"
                variant="outline"
                className="border-white text-blue-600 hover:bg-white hover:text-blue-600"
                asChild
              >
                <a href="mailto:Feitozaimoveis@yahoo.com">
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
