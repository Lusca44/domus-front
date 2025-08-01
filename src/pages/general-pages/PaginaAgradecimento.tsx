
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { CheckCircle2, ArrowRight, Home } from "lucide-react";
import { useLocation } from "react-router-dom";

/**
 * Página de Agradecimento
 *
 * Esta página é exibida após o usuário enviar um formulário de captação de lead.
 * Ela confirma o recebimento dos dados e incentiva o próximo passo da jornada.
 *
 * É possível personalizar a mensagem e os botões de call-to-action conforme
 * a origem do formulário, usando parâmetros na URL.
 */
const PaginaAgradecimento = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);

  const dadosAgradecimento = {
    nomeCliente: searchParams.get('nomeCliente'),
    nomeLancamento: searchParams.get('nomeLancamento')
  }

  /**
   * Mensagens personalizadas conforme a origem do lead
   * Pode ser expandido conforme necessário
   */
  const getMensagem = () => {
    return {
      titulo: `Obrigado pelo seu interesse, ${dadosAgradecimento.nomeCliente}!`,
      subtitulo: `Sua solicitação informações sobre o ${dadosAgradecimento.nomeLancamento} foi recebida com sucesso. Nossa equipe entrará em contato em breve.`,
      acoes: [
        {
          texto: "Ver todos os lançamentos no Rio de Janeiro!",
          url: "/",
        },
      ],
    };
  };

  const mensagem = getMensagem();

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-6 sm:p-8 text-center">
        {/* Ícone de sucesso */}
        <div className="flex justify-center mb-4 sm:mb-6">
          <div className="rounded-full bg-green-100 p-3">
            <CheckCircle2 className="h-10 w-10 sm:h-12 sm:w-12 text-green-600" />
          </div>
        </div>

        {/* Título e mensagem */}
        <h1 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3">
          {mensagem.titulo}
        </h1>

        <p className="text-sm sm:text-base text-gray-600 mb-6 sm:mb-8 leading-relaxed">
          {mensagem.subtitulo}
        </p>

        {/* Detalhes sobre próximos passos */}
        <div className="bg-blue-50 rounded-lg p-4 mb-6 sm:mb-8">
          <p className="text-blue-700 text-xs sm:text-sm leading-relaxed">
            Nossa equipe entrará em contato assim que puder para te ajudar!. Se
            preferir, também pode nos ligar diretamente:
          </p>
          
          {/* TODO Atualizar numero  */}
          {/* <p className="text-blue-800 font-semibold mt-2 text-sm sm:text-base">
            Central de Vendas: (21) 2222-3333
          </p> */}
        </div>

        {/* Botões de ação */}
        <div className="space-y-3 sm:space-y-4">
          {mensagem.acoes.map((acao, index) => (
            <Button key={index} className="w-full text-sm sm:text-base" asChild>
              <Link to={acao.url}>
                {acao.texto}
              </Link>
            </Button>
          ))}
        </div>
      </div>

      {/* Footer simples */}
      <p className="mt-6 sm:mt-8 text-gray-500 text-xs sm:text-sm text-center px-4">
        &copy; 2025 Feitoza imóveis. Todos os direitos reservados.
      </p>
    </div>
  );
};

export default PaginaAgradecimento;
