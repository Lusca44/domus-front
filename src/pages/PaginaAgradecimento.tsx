import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { CheckCircle2, ArrowRight, Home } from "lucide-react";

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
  /**
   * Mensagens personalizadas conforme a origem do lead
   * Pode ser expandido conforme necessário
   */
  const getMensagem = () => {
    // Personalização caso o nome tenha sido passado na URL

    // Personalização por origem do formulário
    // Mensagem padrão para qualquer outra origem
    return {
      titulo: `Obrigado pelo seu interesse!`,
      subtitulo:
        "Sua solicitação foi recebida com sucesso. Nossa equipe entrará em contato em breve.",
      acoes: [
        {
          texto: "Ver todos os lançamentos",
          url: "/",
          icone: <Home className="ml-2 h-4 w-4" />,
        },
      ],
    };
  };

  const mensagem = getMensagem();

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8 text-center">
        {/* Ícone de sucesso */}
        <div className="flex justify-center mb-6">
          <div className="rounded-full bg-green-100 p-3">
            <CheckCircle2 className="h-12 w-12 text-green-600" />
          </div>
        </div>

        {/* Título e mensagem */}
        <h1 className="text-2xl font-bold text-gray-900 mb-3">
          {mensagem.titulo}
        </h1>

        <p className="text-gray-600 mb-8">{mensagem.subtitulo}</p>

        {/* Detalhes sobre próximos passos */}
        <div className="bg-blue-50 rounded-lg p-4 mb-8">
          <p className="text-blue-700 text-sm">
            Nossa equipe geralmente retorna o contato em até 24 horas úteis. Se
            preferir, também pode nos ligar diretamente:
          </p>
          <p className="text-blue-800 font-semibold mt-2">
            Central de Vendas: (21) 2222-3333
          </p>
        </div>

        {/* Botões de ação */}
        <div className="space-y-4">
          {mensagem.acoes.map((acao, index) => (
            <Button key={index} className="w-full" asChild>
              <Link to={acao.url}>
                {acao.texto}
                {acao.icone}
              </Link>
            </Button>
          ))}

          <Button variant="outline" className="w-full" asChild>
            <Link to="/">Voltar para a página do lançamento</Link>
          </Button>
        </div>
      </div>

      {/* Footer simples */}
      <p className="mt-8 text-gray-500 text-sm text-center">
        &copy; 2025 Imobiliária Feitozza. Todos os direitos reservados.
      </p>
    </div>
  );
};

export default PaginaAgradecimento;
