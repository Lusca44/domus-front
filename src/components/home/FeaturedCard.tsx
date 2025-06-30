
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
    <div className="relative">
      {featured && (
        <div className="absolute -top-2 left-4 bg-yellow-500 text-white px-3 py-1 rounded-full text-sm font-medium flex items-center gap-1 z-20 shadow-lg">
          <Star className="w-3 h-3" />
          Destaque
        </div>
      )}
      
      <Card className="group hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 h-full flex flex-col">
        <div className="relative overflow-hidden rounded-t-lg">
          <img
            src={image}
            alt={title}
            className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
          />
          <div className="absolute top-4 right-4">
            <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-medium shadow-md">
              {price}
            </span>
          </div>
        </div>

        <CardHeader className="pb-3 flex-grow">
          <CardTitle className="text-lg mb-2 line-clamp-2">{title}</CardTitle>
          <p className="text-gray-600 text-sm line-clamp-2 mb-2">{description}</p>
          <div className="flex items-center gap-1 text-gray-500 text-sm">
            <MapPin className="w-4 h-4 flex-shrink-0" />
            <span className="truncate">{region}</span>
          </div>
        </CardHeader>

        <CardContent className="space-y-4 pt-0">
          <div className="grid grid-cols-3 gap-2 text-sm text-gray-600">
            <div className="flex items-center gap-1">
              <Bed className="w-4 h-4 flex-shrink-0" />
              <span>{rooms}q</span>
            </div>
            <div className="flex items-center gap-1">
              <Bath className="w-4 h-4 flex-shrink-0" />
              <span>{bathrooms}b</span>
            </div>
            <div className="flex items-center gap-1">
              <Car className="w-4 h-4 flex-shrink-0" />
              <span>{parking}v</span>
            </div>
          </div>

          <div className="text-sm text-gray-600">
            <span className="font-medium">Área:</span> {area}
          </div>

          <Button asChild className="w-full bg-blue-600 hover:bg-blue-700 mt-auto">
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
