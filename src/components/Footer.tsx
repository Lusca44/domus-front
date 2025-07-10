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
        <div className="flex flex-col sm:flex-row justify-center items-center flex-wrap gap-6 sm:gap-8">
          {/* Bloco 1 - Empreendimento */}
          <div className="text-center max-w-xs px-4">
            <h3 className="text-base sm:text-lg font-semibold mb-4">{empreendimentoNome}</h3>
            <p className="text-gray-400 text-sm sm:text-base">{empreendimentoEndereco}</p>
          </div>

          {/* Bloco 2 - Contato */}
          <div className="text-center max-w-xs px-4">
            <h3 className="text-base sm:text-lg font-semibold mb-4">Contato</h3>
            {/* TODO Atualizar numero  */}
            {/* <p className="text-gray-400">Central de Vendas: (21) 2222-3333</p> */}
            <p className="text-gray-400 text-sm sm:text-base">
              Email: Feitozaimoveis@yahoo.com
            </p>
          </div>

          {/* Bloco 3 - Links */}
          <div className="text-center max-w-xs px-4">
            <h3 className="text-base sm:text-lg font-semibold mb-4">Links Úteis</h3>
            <ul className="space-y-2 text-gray-400 text-sm sm:text-base">
              {isHomePage ? (
                <li>
                  <Link
                    to="/admin/login"
                    className="hover:text-white transition-colors"
                    onClick={() => window.scrollTo(0, 0)}
                  >
                    Area administrativa
                  </Link>
                </li>
              ) : (
                <>
                  <li>
                    <Link
                      to="/"
                      className="hover:text-white transition-colors"
                      onClick={() => window.scrollTo(0, 0)}
                    >
                      Todos os Lançamentos no Rio de Janeiro
                    </Link>
                  </li>
                  {regiao && (
                    <li>
                      <Link
                        to={regiao.path}
                        className="hover:text-white transition-colors"
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
                  <Link to="/" className="hover:text-white transition-colors">
                    Todos os Lançamentos no Rio de Janeiro
                  </Link>
                </li>
              ) : null}
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-6 sm:mt-8 pt-6 text-center text-gray-500 text-xs sm:text-sm">
          <p>&copy; 2025 Feitoza imóveis. Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
