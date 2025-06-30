
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ArrowRight, Star } from "lucide-react";
import regioesHubs from "@/pages/general-pages/cards-home-page";

const LancamentosSection = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8 lg:gap-12">
      {regioesHubs.map((regiao) => (
        <Card
          key={regiao.id}
          className={`group hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 ${
            regiao.destaque ? "ring-2 ring-blue-500 ring-offset-2" : ""
          }`}
        >
          {regiao.destaque && (
            <div className="absolute -top-3 left-4 bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-medium flex items-center gap-1 z-10">
              <Star className="w-3 h-3" />
              Destaque
            </div>
          )}

          <div className="relative overflow-hidden rounded-t-lg">
            <img
              src={regiao.imagem}
              alt={regiao.nome}
              className="w-full h-48 sm:h-56 object-cover group-hover:scale-105 transition-transform duration-300"
            />
            <div className="absolute top-4 right-4">
              <span
                className={`px-2 py-1 rounded-full text-xs font-medium ${
                  regiao.status === "Disponível"
                    ? "bg-green-100 text-green-800"
                    : "bg-yellow-100 text-yellow-800"
                }`}
              >
                {regiao.status}
              </span>
            </div>
          </div>

          <CardHeader className="pb-3">
            <div className="flex items-start justify-between">
              <div>
                <CardTitle className="text-xl sm:text-2xl mb-2">
                  {regiao.nome}
                </CardTitle>
                <CardDescription className="text-sm sm:text-base">
                  {regiao.descricao}
                </CardDescription>
              </div>
            </div>
          </CardHeader>

          <CardContent className="space-y-4">
            <div className="space-y-2">
              {regiao.caracteristicas
                .slice(0, 3)
                .map((caracteristica, index) => (
                  <div
                    key={index}
                    className="flex items-center text-sm text-gray-600"
                  >
                    <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mr-2 flex-shrink-0"></div>
                    <span>{caracteristica}</span>
                  </div>
                ))}
            </div>

            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pt-4 border-t">
              <div>
                <p className="text-xs text-gray-500">
                  {regiao.lancamentosAtivos} lançamento
                  {regiao.lancamentosAtivos !== 1 ? "s" : ""} ativo
                  {regiao.lancamentosAtivos !== 1 ? "s" : ""}
                </p>
                <p className="font-semibold text-blue-600 text-sm sm:text-base">
                  {regiao.precoPartir}
                </p>
              </div>

              <Button
                asChild
                className={`w-full sm:w-auto ${
                  regiao.status === "Disponível"
                    ? "bg-blue-600 hover:bg-blue-700"
                    : "bg-gray-400 cursor-not-allowed"
                }`}
                disabled={regiao.status !== "Disponível"}
              >
                <Link
                  to={regiao.status === "Disponível" ? regiao.url : "#"}
                  onClick={() => window.scrollTo(0, 0)}
                >
                  <span className="flex items-center gap-2">
                    {regiao.status === "Disponível"
                      ? "Ver Lançamentos"
                      : "Em Breve"}
                    {regiao.status === "Disponível" && (
                      <ArrowRight className="w-4 h-4" />
                    )}
                  </span>
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default LancamentosSection;
