
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogTrigger, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, Maximize, X } from 'lucide-react';
import { cn } from '@/lib/utils';

interface Photo {
  url: string;
  titulo: string;
}

interface PhotoCarouselProps {
  photos: Photo[];
  className?: string;
}

const PhotoCarousel: React.FC<PhotoCarouselProps> = ({ photos, className }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const nextPhoto = () => {
    setCurrentIndex((prev) => (prev + 1) % photos.length);
  };

  const prevPhoto = () => {
    setCurrentIndex((prev) => (prev - 1 + photos.length) % photos.length);
  };

  const goToPhoto = (index: number) => {
    setCurrentIndex(index);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowLeft') {
      e.preventDefault();
      prevPhoto();
    }
    if (e.key === 'ArrowRight') {
      e.preventDefault();
      nextPhoto();
    }
    if (e.key === 'Escape') {
      e.preventDefault();
      setIsFullscreen(false);
    }
  };

  return (
    <div className={cn("w-full max-w-4xl mx-auto", className)}>
      {/* Foto Principal */}
      <div className="relative group">
        <div className="aspect-[16/10] overflow-hidden rounded-xl bg-gray-100 shadow-lg">
          <img
            src={photos[currentIndex].url}
            alt={photos[currentIndex].titulo}
            className="w-full h-full object-contain bg-gray-50 transition-transform duration-300 group-hover:scale-105"
          />
          
          {/* Overlay com informações */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <div className="absolute bottom-0 left-0 right-0 p-6">
              <h3 className="text-white text-xl font-semibold mb-2">
                {photos[currentIndex].titulo}
              </h3>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="bg-white/20 backdrop-blur-sm text-white px-3 py-1 rounded-full text-sm font-medium">
                    {currentIndex + 1} de {photos.length}
                  </span>
                </div>
                <Dialog open={isFullscreen} onOpenChange={setIsFullscreen}>
                  <DialogTrigger asChild>
                    <Button
                      variant="secondary"
                      size="sm"
                      className="bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white border-white/30"
                    >
                      <Maximize className="w-4 h-4 mr-2" />
                      Ampliar
                    </Button>
                  </DialogTrigger>
                  <DialogContent 
                    className="max-w-[95vw] max-h-[95vh] w-full h-full p-0 bg-black/95 border-0" 
                    onKeyDown={handleKeyDown}
                  >
                    <DialogTitle className="sr-only">Visualização em tela cheia</DialogTitle>
                    <DialogDescription className="sr-only">Imagem do empreendimento em tamanho ampliado</DialogDescription>
                    <div className="relative w-full h-full flex items-center justify-center p-4">
                      <img
                        src={photos[currentIndex].url}
                        alt={photos[currentIndex].titulo}
                        className="max-w-full max-h-full object-contain"
                      />
                      
                      {/* Botão Fechar */}
                      <Button
                        variant="ghost"
                        size="icon"
                        className="absolute top-4 right-4 text-white hover:bg-white/20 z-10"
                        onClick={() => setIsFullscreen(false)}
                      >
                        <X className="w-6 h-6" />
                      </Button>
                      
                      {/* Navegação no Fullscreen */}
                      <Button
                        variant="ghost"
                        size="icon"
                        className="absolute left-4 top-1/2 -translate-y-1/2 text-white hover:bg-white/20 disabled:opacity-30 z-10"
                        onClick={prevPhoto}
                        disabled={photos.length <= 1}
                      >
                        <ChevronLeft className="w-8 h-8" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-white hover:bg-white/20 disabled:opacity-30 z-10"
                        onClick={nextPhoto}
                        disabled={photos.length <= 1}
                      >
                        <ChevronRight className="w-8 h-8" />
                      </Button>
                      
                      {/* Informações da foto no fullscreen */}
                      <div className="absolute bottom-4 left-4 right-4 text-center">
                        <p className="text-white text-lg font-medium mb-2">
                          {photos[currentIndex].titulo}
                        </p>
                        <p className="text-white/70 text-sm">
                          {currentIndex + 1} de {photos.length}
                        </p>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
            </div>
          </div>
        </div>

        {/* Botões de navegação */}
        <Button
          variant="ghost"
          size="icon"
          className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          onClick={prevPhoto}
          disabled={photos.length <= 1}
        >
          <ChevronLeft className="w-6 h-6" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          onClick={nextPhoto}
          disabled={photos.length <= 1}
        >
          <ChevronRight className="w-6 h-6" />
        </Button>
      </div>

      {/* Miniaturas */}
      <div className="mt-4 px-2">
        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
          {photos.map((photo, index) => (
            <button
              key={index}
              onClick={() => goToPhoto(index)}
              className={cn(
                "flex-shrink-0 w-20 h-16 rounded-lg overflow-hidden border-2 transition-all duration-200",
                index === currentIndex
                  ? "border-blue-500 ring-2 ring-blue-200 scale-105"
                  : "border-gray-200 hover:border-gray-300 hover:scale-102"
              )}
            >
              <img
                src={photo.url}
                alt={photo.titulo}
                className="w-full h-full object-cover"
              />
            </button>
          ))}
        </div>
      </div>

      {/* Indicadores de pontos (backup para mobile) */}
      <div className="flex justify-center mt-4 gap-2 md:hidden">
        {photos.map((_, index) => (
          <button
            key={index}
            onClick={() => goToPhoto(index)}
            className={cn(
              "w-2 h-2 rounded-full transition-all duration-200",
              index === currentIndex
                ? "bg-blue-500 w-6"
                : "bg-gray-300 hover:bg-gray-400"
            )}
          />
        ))}
      </div>
    </div>
  );
};

export default PhotoCarousel;
