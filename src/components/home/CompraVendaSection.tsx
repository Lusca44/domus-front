
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Home, TrendingUp, Calculator, Users } from "lucide-react";

const CompraVendaSection = () => {
  const servicos = [
    {
      id: 1,
      titulo: "Compra de Imóveis",
      descricao: "Encontre o imóvel dos seus sonhos com nossa consultoria especializada",
      caracteristicas: ["Avaliação profissional", "Financiamento facilitado", "Documentação completa"],
      icon: Home,
    },
    {
      id: 2,
      titulo: "Venda de Imóveis",
      descricao: "Venda seu imóvel rapidamente com o melhor preço do mercado",
      caracteristicas: ["Avaliação gratuita", "Marketing digital", "Negociação especializada"],
      icon: TrendingUp,
    },
    {
      id: 3,
      titulo: "Consultoria Financeira",
      descricao: "Orientação completa para financiamento e investimento imobiliário",
      caracteristicas: ["Simulação de financiamento", "Análise de crédito", "Melhores taxas"],
      icon: Calculator,
    },
    {
      id: 4,
      titulo: "Assessoria Jurídica",
      descricao: "Suporte jurídico completo para sua transação imobiliária",
      caracteristicas: ["Análise documental", "Suporte legal", "Segurança na compra"],
      icon: Users,
    },
  ];

  const diferenciais = [
    "Mais de 10 anos de experiência no mercado",
    "Equipe especializada e certificada",
    "Atendimento personalizado",
    "Processo 100% transparente",
  ];

  return (
    <div className="space-y-8">
      <div className="text-center mb-8">
        <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">
          Compra e Venda de Imóveis
        </h3>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Serviços completos para compra, venda e investimento imobiliário com segurança e agilidade.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 mb-12">
        {servicos.map((servico) => {
          const IconComponent = servico.icon;
          return (
            <Card
              key={servico.id}
              className="group hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
            >
              <CardHeader className="pb-4">
                <div className="flex items-center gap-4 mb-2">
                  <div className="p-3 bg-blue-100 rounded-full">
                    <IconComponent className="w-6 h-6 text-blue-600" />
                  </div>
                  <CardTitle className="text-xl">{servico.titulo}</CardTitle>
                </div>
                <p className="text-gray-600">{servico.descricao}</p>
              </CardHeader>

              <CardContent className="space-y-4">
                <div className="space-y-2">
                  {servico.caracteristicas.map((caracteristica, index) => (
                    <div
                      key={index}
                      className="flex items-center text-sm text-gray-600"
                    >
                      <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mr-2 flex-shrink-0"></div>
                      <span>{caracteristica}</span>
                    </div>
                  ))}
                </div>

                <Button className="w-full bg-blue-600 hover:bg-blue-700 mt-4">
                  Saiba Mais
                </Button>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-lg p-8 text-white">
        <div className="max-w-4xl mx-auto">
          <h4 className="text-2xl font-bold mb-4 text-center">
            Por que escolher a Feitozza Imóveis?
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            {diferenciais.map((diferencial, index) => (
              <div key={index} className="flex items-center gap-3">
                <div className="w-2 h-2 bg-white rounded-full flex-shrink-0"></div>
                <span className="text-white/90">{diferencial}</span>
              </div>
            ))}
          </div>
          <div className="text-center">
            <Button 
              variant="secondary" 
              size="lg"
              className="font-semibold"
            >
              Agende uma Consultoria Gratuita
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompraVendaSection;
