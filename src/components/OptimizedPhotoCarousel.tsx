// components/OptimizedPhotoCarousel.tsx
import React, { useState, useEffect, useRef } from 'react';
import { Dialog, DialogContent, DialogTrigger, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useIsMobile } from '@/hooks/use-mobile';

interface Photo {
  src: string;
  titulo: string;
}

interface PhotoCarouselProps {
  photos: Photo[];
  className?: string;
}


const OptimizedPhotoCarousel: React.FC<PhotoCarouselProps> = ({ photos, className }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [loadedImages, setLoadedImages] = useState<Map<number, boolean>>(new Map());
  const isMobile = useIsMobile();
  const mainImageRef = useRef<HTMLImageElement>(null);
  const thumbnailsRef = useRef<HTMLDivElement>(null);

  // Pré-carrega imagens adjacentes
 useEffect(() => {
    const loadImages = async () => {
      const newLoadedImages = new Map<number, boolean>();
      
      await Promise.all(photos.map(async (photo, index) => {
        try {
          await new Promise<void>((resolve, reject) => {
            const img = new Image();
            img.src = photo.src;
            img.onload = () => {
              newLoadedImages.set(index, true);
              resolve();
            };
            img.onerror = reject;
          });
        } catch (e) {
          console.error(`Erro ao carregar imagem ${index}:`, e);
          newLoadedImages.set(index, false);
        }
      }));

      setLoadedImages(newLoadedImages);
    };

    if (photos.length > 0) {
      loadImages();
    }
  }, [photos]);

  // Rola para a miniatura ativa quando necessário
  useEffect(() => {
    if (thumbnailsRef.current) {
      const activeThumb = thumbnailsRef.current.children[currentIndex] as HTMLElement;
      if (activeThumb) {
        thumbnailsRef.current.scrollTo({
          left: activeThumb.offsetLeft - thumbnailsRef.current.offsetWidth / 2 + activeThumb.offsetWidth / 2,
          behavior: 'smooth'
        });
      }
    }
  }, [currentIndex]);

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
    if (e.key === 'ArrowLeft') prevPhoto();
    if (e.key === 'ArrowRight') nextPhoto();
    if (e.key === 'Escape') setIsFullscreen(false);
  };

  const handleImageClick = () => {
    setIsFullscreen(true);
  };

  return (
    <div className={cn("w-full max-w-4xl mx-auto", className)}>
      {/* Main Photo */}
      <div className="relative group">
        <div className="aspect-[16/10] overflow-hidden rounded-xl bg-gray-900 shadow-lg cursor-pointer" onClick={handleImageClick}>
          {loadedImages.get(currentIndex) ? (
            <img
              ref={mainImageRef}
              src={photos[currentIndex].src}
              alt={photos[currentIndex].titulo}
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
         ) : (
            <div className="w-full h-full bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 animate-pulse" />
          )}
          
          {/* Overlay simplificado */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent">
            <div className="absolute bottom-0 left-0 right-0 p-4">
              <div className="flex items-center justify-between">
                <span className="bg-white/80 backdrop-blur-sm text-gray-900 px-3 py-1 rounded-full text-xs font-medium">
                  {currentIndex + 1} de {photos.length}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation buttons */}
        {photos.length > 1 && !isMobile && (
          <>
            <Button
              variant="ghost"
              size="icon"
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white shadow-lg"
              onClick={prevPhoto}
            >
              <ChevronLeft className="w-6 h-6" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white shadow-lg"
              onClick={nextPhoto}
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
          <div className="relative w-full h-full flex items-center justify-center p-4">
            <div className="relative max-w-full max-h-full flex items-center justify-center">
              {loadedImages.has(currentIndex) ? (
                <img
                  src={photos[currentIndex].src}
                  alt={photos[currentIndex].titulo}
                  className="max-w-[90vw] max-h-[80vh] object-contain"
                />
              ) : (
                <div className="w-64 h-64 bg-gradient-to-r from-gray-700 via-gray-800 to-gray-700 animate-pulse rounded-xl" />
              )}
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
            
            {/* Navigation */}
            {photos.length > 1 && (
              <>
                <Button
                  variant="ghost"
                  size="icon"
                  className={cn(
                    "absolute left-4 top-1/2 -translate-y-1/2 text-white hover:bg-white/20 z-10 bg-black/50",
                    isMobile ? "w-12 h-12" : "w-10 h-10"
                  )}
                  onClick={prevPhoto}
                >
                  <ChevronLeft className={cn(isMobile ? "w-8 h-8" : "w-6 h-6")} />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className={cn(
                    "absolute right-4 top-1/2 -translate-y-1/2 text-white hover:bg-white/20 z-10 bg-black/50",
                    isMobile ? "w-12 h-12" : "w-10 h-10"
                  )}
                  onClick={nextPhoto}
                >
                  <ChevronRight className={cn(isMobile ? "w-8 h-8" : "w-6 h-6")} />
                </Button>
              </>
            )}
            
            {/* Photo information */}
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

      {/* Thumbnails horizontais */}
      {photos.length > 1 && (
        <div className={cn("mt-4", isMobile ? "px-1" : "px-2")}>
          <div 
            ref={thumbnailsRef}
            className="flex gap-2 overflow-x-auto pb-2 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent"
          >
            {photos.map((photo, index) => {
              const isActive = index === currentIndex;
              const isLoaded = loadedImages.get(index);
              
              return (
                <button
                  key={index}
                  onClick={() => goToPhoto(index)}
                  className={cn(
                    "flex-shrink-0 rounded-lg overflow-hidden border-2 transition-all duration-200",
                    isMobile ? "w-16 h-12" : "w-20 h-16",
                    isActive
                      ? "border-blue-500 ring-2 ring-blue-200 scale-105"
                      : "border-gray-200 hover:border-gray-300 hover:scale-102"
                  )}
                  aria-label={`Visualizar ${photo.titulo}`}
                >
                  {isLoaded ? (
                    <img
                      src={photo.src}
                      alt={photo.titulo}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-gray-200 animate-pulse" />
                  )}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default OptimizedPhotoCarousel;