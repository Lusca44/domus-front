
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogTrigger, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useIsMobile } from '@/hooks/use-mobile';
import { resolveImageUrl } from '@/utils/imageConfig';

interface Photo {
  src: string;
  titulo: string;
}

interface PhotoCarouselProps {
  photos: Photo[];
  className?: string;
}

const PhotoCarousel: React.FC<PhotoCarouselProps> = ({ photos, className }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const isMobile = useIsMobile();

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

  const handleImageClick = () => {
    setIsFullscreen(true);
  };

  return (
    <div className={cn("w-full max-w-4xl mx-auto", className)}>
      {/* Main Photo */}
      <div className="relative group">
        <div className="aspect-[16/10] overflow-hidden rounded-xl bg-gray-900 shadow-lg cursor-pointer" onClick={handleImageClick}>
          <img
            src={photos[currentIndex].src}
            alt={photos[currentIndex].titulo}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
          
          {/* Overlay with information - simplified for mobile */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <div className="absolute bottom-0 left-0 right-0 p-4 md:p-6">
              <h3 className="text-white text-lg md:text-xl font-semibold mb-2">
                {photos[currentIndex].titulo}
              </h3>
              <div className="flex items-center justify-between">
                <span className="bg-white/20 backdrop-blur-sm text-white px-3 py-1 rounded-full text-sm font-medium">
                  {currentIndex + 1} de {photos.length}
                </span>
                {!isMobile && (
                  <span className="text-white/80 text-sm">Clique para ampliar</span>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Navigation buttons - adapted for mobile */}
        {!isMobile && (
          <>
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
          </>
        )}
      </div>

      {/* Fullscreen Modal */}
      <Dialog open={isFullscreen} onOpenChange={setIsFullscreen}>
        <DialogContent 
          className="max-w-[100vw] max-h-[100vh] w-screen h-screen p-0 bg-black/95 border-0 [&>button]:hidden" 
          onKeyDown={handleKeyDown}
        >
          <DialogTitle className="sr-only">Visualização em tela cheia</DialogTitle>
          <DialogDescription className="sr-only">Imagem do empreendimento em tamanho ampliado</DialogDescription>
          <div className="relative w-full h-full flex items-center justify-center p-4">
            <div className="relative max-w-full max-h-full flex items-center justify-center">
              <img
                src={photos[currentIndex].src}
                alt={photos[currentIndex].titulo}
                className="max-w-[90vw] max-h-[80vh] object-contain"
              />
            </div>
            
            {/* Close Button */}
            <Button
              variant="ghost"
              size="icon"
              className="absolute top-4 right-4 text-white hover:bg-white/20 z-20 bg-black/50"
              onClick={() => setIsFullscreen(false)}
            >
              <X className="w-6 h-6" />
            </Button>
            
            {/* Navigation in Fullscreen - adapted for mobile */}
            <Button
              variant="ghost"
              size="icon"
              className={cn(
                "absolute left-4 top-1/2 -translate-y-1/2 text-white hover:bg-white/20 disabled:opacity-30 z-10 bg-black/50",
                isMobile ? "w-12 h-12" : "w-10 h-10"
              )}
              onClick={prevPhoto}
              disabled={photos.length <= 1}
            >
              <ChevronLeft className={cn(isMobile ? "w-8 h-8" : "w-6 h-6")} />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className={cn(
                "absolute right-4 top-1/2 -translate-y-1/2 text-white hover:bg-white/20 disabled:opacity-30 z-10 bg-black/50",
                isMobile ? "w-12 h-12" : "w-10 h-10"
              )}
              onClick={nextPhoto}
              disabled={photos.length <= 1}
            >
              <ChevronRight className={cn(isMobile ? "w-8 h-8" : "w-6 h-6")} />
            </Button>
            
            {/* Photo information in fullscreen - adapted for mobile */}
            <div className={cn(
              "absolute bottom-4 left-4 right-4 text-center z-10",
              isMobile && "bottom-6"
            )}>
              <p className={cn(
                "text-white font-medium mb-2",
                isMobile ? "text-base" : "text-lg"
              )}>
                {photos[currentIndex].titulo}
              </p>
              <p className="text-white/70 text-sm">
                {currentIndex + 1} de {photos.length}
              </p>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Thumbnails - adapted for mobile */}
      <div className={cn("mt-4", isMobile ? "px-1" : "px-2")}>
        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
          {photos.map((photo, index) => (
            <button
              key={index}
              onClick={() => goToPhoto(index)}
              className={cn(
                "flex-shrink-0 rounded-lg overflow-hidden border-2 transition-all duration-200",
                isMobile ? "w-16 h-12" : "w-20 h-16",
                index === currentIndex
                  ? "border-blue-500 ring-2 ring-blue-200 scale-105"
                  : "border-gray-200 hover:border-gray-300 hover:scale-102"
              )}
            >
              <img
                src={photo.src}
                alt={photo.titulo}
                className="w-full h-full object-cover"
              />
            </button>
          ))}
        </div>
      </div>

      {/* Dot indicators for mobile */}
      {isMobile && (
        <div className="flex justify-center mt-4 gap-2">
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
      )}
    </div>
  );
};

export default PhotoCarousel;
