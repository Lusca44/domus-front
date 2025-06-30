
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Star, MapPin, Bed, Bath, Car } from "lucide-react";
import { Link } from "react-router-dom";

interface FeaturedCardProps {
  id: string;
  title: string;
  description: string;
  price: string;
  image: string;
  region: string;
  rooms: number;
  bathrooms: number;
  parking: number;
  area: string;
  url: string;
  featured?: boolean;
}

const FeaturedCard = ({ 
  title, 
  description, 
  price, 
  image, 
  region, 
  rooms, 
  bathrooms, 
  parking, 
  area, 
  url, 
  featured = false 
}: FeaturedCardProps) => {
  return (
    <Card className="group hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 relative">
      {featured && (
        <div className="absolute -top-3 left-4 bg-yellow-500 text-white px-3 py-1 rounded-full text-sm font-medium flex items-center gap-1 z-10">
          <Star className="w-3 h-3" />
          Destaque
        </div>
      )}

      <div className="relative overflow-hidden rounded-t-lg">
        <img
          src={image}
          alt={title}
          className="w-full h-48 sm:h-56 object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute top-4 right-4">
          <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-medium">
            {price}
          </span>
        </div>
      </div>

      <CardHeader className="pb-3">
        <CardTitle className="text-xl mb-2">{title}</CardTitle>
        <p className="text-gray-600 text-sm">{description}</p>
        <div className="flex items-center gap-1 text-gray-500 text-sm">
          <MapPin className="w-4 h-4" />
          <span>{region}</span>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        <div className="flex items-center justify-between text-sm text-gray-600">
          <div className="flex items-center gap-1">
            <Bed className="w-4 h-4" />
            <span>{rooms} quartos</span>
          </div>
          <div className="flex items-center gap-1">
            <Bath className="w-4 h-4" />
            <span>{bathrooms} banheiros</span>
          </div>
          <div className="flex items-center gap-1">
            <Car className="w-4 h-4" />
            <span>{parking} vagas</span>
          </div>
        </div>

        <div className="text-sm text-gray-600">
          <span className="font-medium">Área:</span> {area}
        </div>

        <Button asChild className="w-full bg-blue-600 hover:bg-blue-700">
          <Link to={url} onClick={() => window.scrollTo(0, 0)}>
            Ver Detalhes
          </Link>
        </Button>
      </CardContent>
    </Card>
  );
};

export default FeaturedCard;
