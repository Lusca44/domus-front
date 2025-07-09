import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";


const Header = () => {

    return (
      <>
        <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-slate-200">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between h-16">
              <Button
                variant="ghost"
                size="sm"
                asChild
                className="text-slate-700 hover:text-blue-600 hover:bg-blue-50"
              >
                <Link to="/" className="flex items-center gap-2">
                  <ArrowLeft className="w-4 h-4" />
                  Voltar para o início
                </Link>
              </Button>
            </div>
          </div>
        </header>
      </>
    );
};

export default Header;