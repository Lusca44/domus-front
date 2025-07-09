
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Star, MapPin, Bed } from "lucide-react";
import { Link } from "react-router-dom";

interface FeaturedCardProps {
  id: string;
  titulo: string;
  descricao: string;
  preco: string;
  imagem: string;
  regiao: string;
  quartos: number;
  area: string;
  url: string;
  destaque?: boolean;
  tipo: string;
}

const FeaturedCard = ({ 
  titulo, 
  descricao, 
  preco, 
  imagem, 
  regiao, 
  quartos, 
  area, 
  url, 
  destaque = false,
  tipo
}: FeaturedCardProps) => {
  return (
    <div className="relative w-full h-full">
      <Card className="group hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 h-full flex flex-col">
        <div className="relative overflow-hidden rounded-t-lg">
          <img
            src={imagem}
            alt={titulo}
            className="w-full h-32 md:h-48 object-cover group-hover:scale-105 transition-transform duration-300"
          />

          {/* Container para os balões alinhados */}
          <div className="absolute top-4 left-4 right-4 flex justify-between items-start">
            {/* Balão de destaque */}
            {destaque && (
              <div className="bg-yellow-500 text-white px-3 py-1 rounded-full text-sm font-medium flex items-center gap-1 shadow-lg">
                <Star className="w-3 h-3" />
                Destaque
              </div>
            )}

            {/* Balão de preço */}
            <div className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-medium shadow-md ml-auto">
              {preco}
            </div>
          </div>
        </div>

        <CardHeader className="pb-3 flex-grow-0">
          <CardTitle className="text-sm md:text-lg mb-2 line-clamp-2 min-h-[2.5rem] md:min-h-[3.5rem]">
            {titulo}
          </CardTitle>
          <p className="text-gray-600 text-xs md:text-sm line-clamp-2 md:line-clamp-3 mb-2 min-h-[2.5rem] md:min-h-[4.5rem]">
            {descricao}
          </p>
          <div className="flex items-center gap-1 text-gray-500 text-xs md:text-sm">
            <MapPin className="w-3 h-3 md:w-4 md:h-4 flex-shrink-0" />
            <span className="truncate">{regiao}</span>
          </div>
        </CardHeader>

        <CardContent className="space-y-2 md:space-y-4 pt-0 flex-grow flex flex-col justify-end">
          <div className="grid grid-cols-1 gap-1 md:gap-2 text-xs md:text-sm text-gray-600">
            <div className="flex items-center gap-1">
              <Bed className="w-3 h-3 md:w-4 md:h-4 flex-shrink-0" />
              <span>Até {quartos} quartos</span>
            </div>
          </div>

          <div className="text-xs md:text-sm text-gray-600">
            <span className="font-medium">
              Área: {tipo == "lancamento" && <> Até </>}
            </span>{" "}
            {area}
          </div>

          <Button
            asChild
            className="w-full bg-blue-600 hover:bg-blue-700 mt-auto text-xs md:text-sm py-2 md:py-3"
          >
            <Link to={url} onClick={() => window.scrollTo(0, 0)}>
              Ver Detalhes
            </Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default FeaturedCard;
