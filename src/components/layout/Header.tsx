import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const menuItems = [
    { label: "HOME", path: "/" },
    { label: "LANÇAMENTOS", path: "/lancamentos" },
    { label: "ALUGUÉIS", path: "/alugueis" },
    { label: "PRONTOS", path: "/prontos" },
    { label: "ANUNCIE", path: "/anuncie" },
    { label: "CONTATO", path: "/contato" },
  ];

  return (
    <header className="bg-white shadow-sm border-b">
      <div className="container mx-auto px-4">
        {/* Desktop Header */}
        <div className="flex items-center justify-between h-16 sm:h-20">
          <div className="text-left flex-1">
            <Link to="/" className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 block">
              Feitoza Imóveis
            </Link>
            <p className="text-xs sm:text-sm text-gray-600 mt-1 hidden sm:block leading-tight">
              Lançamentos Imobiliários, vendas e alugueis no Rio de Janeiro
            </p>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-6 xl:space-x-8">
            {menuItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className="text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors whitespace-nowrap"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="sm"
            onClick={toggleMenu}
            className="lg:hidden flex-shrink-0 ml-4"
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </Button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="lg:hidden border-t border-gray-200 py-4 bg-white">
            <nav className="flex flex-col space-y-1">
              {menuItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className="text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-blue-50 transition-colors px-4 py-3 rounded-lg mx-2"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;