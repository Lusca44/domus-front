import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Mail, Menu, X } from 'lucide-react';

const Header = () => {
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navigation = [
    { name: 'HOME', href: '/' },
    { name: 'LANÇAMENTOS', href: '/lancamentos' },
    { name: 'PRONTOS', href: '/prontos' },
    { name: 'ANUNCIE', href: '/anuncie' },
    { name: 'CONTATO', href: '/contato' }
  ];

  const isActive = (href: string) => {
    return location.pathname === href;
  };

  return (
    <header className="bg-white shadow-sm">
      {/* Barra superior */}
      <div className="bg-gradient-to-r from-yellow-500 to-yellow-600 text-white py-2">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center text-sm">
            <span className="font-medium">
              FEITOZA IMÓVEIS - A IMOBILIÁRIA DA SUA FAMÍLIA!
            </span>
            <div className="flex items-center gap-1">
              <Mail className="w-4 h-4" />
              <span>Feitozaimoveis@yahoo.com</span>
            </div>
          </div>
        </div>
      </div>

      {/* Menu principal */}
      <nav className="bg-slate-800 text-white">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-2">
              <div className="text-xl font-bold text-yellow-400">
                FEITOZA IMÓVEIS
              </div>
            </Link>

            {/* Menu Desktop */}
            <div className="hidden md:flex space-x-8">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`px-3 py-2 text-sm font-medium transition-colors duration-200 ${
                    isActive(item.href)
                      ? 'text-yellow-400 border-b-2 border-yellow-400'
                      : 'text-white hover:text-yellow-400'
                  }`}
                >
                  {item.name}
                </Link>
              ))}
            </div>

            {/* Menu Mobile */}
            <div className="md:hidden">
              <button
                type="button"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="text-white hover:text-yellow-400 focus:outline-none"
              >
                {isMobileMenuOpen ? (
                  <X className="h-6 w-6" />
                ) : (
                  <Menu className="h-6 w-6" />
                )}
              </button>
            </div>
          </div>

          {/* Menu Mobile Expandido */}
          {isMobileMenuOpen && (
            <div className="md:hidden">
              <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    to={item.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`block px-3 py-2 text-base font-medium transition-colors duration-200 ${
                      isActive(item.href)
                        ? 'text-yellow-400 bg-slate-700'
                        : 'text-white hover:text-yellow-400 hover:bg-slate-700'
                    }`}
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Header;