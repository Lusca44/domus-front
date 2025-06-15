
import React from "react";
import { Link } from "react-router-dom";

interface FooterProps {
  isHomePage?: boolean;
  isLinkRio?: boolean;
  empreendimentoNome?: string;
  empreendimentoEndereco?: string;
  regiao?: {
    nome: string;
    path: string;
  };
}

/**
 * Componente Footer Reutilizável
 *
 * Este componente renderiza o footer das landing pages com links dinâmicos
 * baseados na região do empreendimento.
 */
const Footer: React.FC<FooterProps> = ({
  isHomePage,
  isLinkRio,
  empreendimentoNome,
  empreendimentoEndereco,
  regiao,
}) => {
  return (
    <footer className="bg-gray-900 text-white py-8 sm:py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
          {/* Bloco 1 - Empreendimento */}
          <div className="space-y-2">
            <h3 className="text-lg font-semibold mb-4">{empreendimentoNome}</h3>
            <p className="text-gray-400 text-sm sm:text-base">{empreendimentoEndereco}</p>
          </div>

          {/* Bloco 2 - Contato */}
          <div className="space-y-2">
            <h3 className="text-lg font-semibold mb-4">Contato</h3>
            <p className="text-gray-400 text-sm sm:text-base">Central de Vendas: (21) 2222-3333</p>
            <p className="text-gray-400 text-sm sm:text-base break-all sm:break-normal">
              Email: contato@portolancamentos.com.br
            </p>
          </div>

          {/* Bloco 3 - Links */}
          <div className="space-y-2">
            <h3 className="text-lg font-semibold mb-4">Links Úteis</h3>
            <ul className="space-y-2 text-gray-400 text-sm sm:text-base">
              {isHomePage ? (
                <li>
                  <Link
                    to="/admin/login"
                    className="hover:text-white transition-colors block"
                    onClick={() => window.scrollTo(0, 0)}
                  >
                    Área administrativa
                  </Link>
                </li>
              ) : (
                <>
                  <li>
                    <Link
                      to="/"
                      className="hover:text-white transition-colors block"
                      onClick={() => window.scrollTo(0, 0)}
                    >
                      Todos os Lançamentos no Rio de Janeiro
                    </Link>
                  </li>
                  {regiao && (
                    <li>
                      <Link
                        to={regiao.path}
                        className="hover:text-white transition-colors block"
                        onClick={() => window.scrollTo(0, 0)}
                      >
                        Todos os Lançamentos {regiao.nome}
                      </Link>
                    </li>
                  )}
                </>
              )}

              {isLinkRio ? (
                <li>
                  <Link 
                    to="/" 
                    className="hover:text-white transition-colors block"
                    onClick={() => window.scrollTo(0, 0)}
                  >
                    Todos os Lançamentos no Rio de Janeiro
                  </Link>
                </li>
              ) : null}
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-6 text-center text-gray-500 text-xs sm:text-sm">
          <p>&copy; 2025 Imobiliária Feitozza. Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
