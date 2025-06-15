
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Home, ArrowLeft } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="text-center max-w-md w-full">
        <div className="mb-6 sm:mb-8">
          <h1 className="text-6xl sm:text-8xl font-bold text-gray-900 mb-4">404</h1>
          <h2 className="text-xl sm:text-2xl font-semibold text-gray-700 mb-2">
            Página não encontrada
          </h2>
          <p className="text-sm sm:text-base text-gray-600 mb-6 sm:mb-8">
            Oops! A página que você está procurando não existe ou foi movida.
          </p>
        </div>

        <div className="space-y-3 sm:space-y-4">
          <Button asChild className="w-full sm:w-auto">
            <a href="/" className="flex items-center gap-2">
              <Home className="h-4 w-4" />
              Voltar para Início
            </a>
          </Button>
          
          <Button variant="outline" onClick={() => window.history.back()} className="w-full sm:w-auto">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Voltar
          </Button>
        </div>

        <div className="mt-8 pt-6 border-t border-gray-200">
          <p className="text-xs sm:text-sm text-gray-500">
            &copy; 2025 Imobiliária Feitozza. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
