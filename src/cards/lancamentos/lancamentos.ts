
import cardPixinguinhaImg from "./images/card-pixinguinha.jpeg";
import { Imovel } from "../imoveis";

// **AQUI É ONDE VOCÊ DEVE ADICIONAR NOVOS CARDS DE LANÇAMENTOS**
// Para adicionar um novo lançamento, copie este padrão:

// ATENÇÃO: Este arquivo será atualizado automaticamente quando novos lançamentos
// forem cadastrados no sistema administrativo. Os lançamentos cadastrados
// através da API aparecerão automaticamente aqui.

export let lancamentos: Imovel[] = [
  {
    id: "1",
    titulo: "Residencial Pixinguinha",
    descricao:
      "Studios, quartos com opção de suíte e vaga lazer completo com rooftop",
    preco: "A partir de R$ 310.000",
    imagem: cardPixinguinhaImg,
    regiao: "Porto Maravilha",
    regiaoDestaque: true,
    quartos: 3,
    quartosDisponiveis: [0, 1, 2, 3], // tem studio
    area: "83,63m²",
    areasDisponiveis: ["32m²", "39m²", "50m²", "53m²", "70m²", "83m²"], // Áreas disponíveis para este lançamento
    url: "/porto-maravilha/lancamento/pixinguinha",
    destaque: true,
    tipo: "lancamento",
    tipagem: ["garden", "apartamento"],
    statusObra: "Lançamento", // Status atual da obra
  }
  // **FINAL DA ÁREA DE ADIÇÃO - quando adicionar novos cards, coloque-os aqui seguindo este padrão**
  
  // **LANÇAMENTOS DINÂMICOS DA API**
  // Os lançamentos cadastrados via admin aparecerão automaticamente aqui
  // quando o sistema sincronizar os dados da API
];

// Função para atualizar os lançamentos dinamicamente (será usada pelo sistema admin)
export const updateLancamentosFromAPI = (apiLancamentos: Imovel[]) => {
  // Remove lançamentos dinâmicos anteriores (mantém apenas os estáticos)
  const estaticos = lancamentos.filter(l => l.id === "1"); // Mantém apenas o Pixinguinha estático
  
  // Adiciona os novos lançamentos da API
  lancamentos.length = 0; // Limpa o array
  lancamentos.push(...estaticos, ...apiLancamentos);
};

// Função para carregar lançamentos da API automaticamente
export const loadLancamentosFromAPI = async () => {
  try {
    const { lancamentoApi } = await import('../../utils/apiConfig');
    const apiLancamentos = await lancamentoApi.obterTodosLancamentos();
    
    if (apiLancamentos && apiLancamentos.length > 0) {
      const lancamentosForCards: Imovel[] = apiLancamentos
        .filter((lancamento: any) => lancamento.cardLancamentoInfo)
        .map((lancamento: any, index: number) => {
          const cardInfo = lancamento.cardLancamentoInfo;
          
          return {
            id: lancamento.id || String(index + 2), // Começar do ID 2 para não conflitar com o estático
            titulo: lancamento.nomeLancamento,
            descricao: lancamento.sobreLancamento?.texto || lancamento.slogan || '',
            preco: `A partir de R$ ${cardInfo.valor}`,
            imagem: cardInfo.urlImagemCard || '/placeholder.svg',
            regiao: 'Região não informada', // Será preenchido com dados da região
            quartos: parseInt(cardInfo.quartosDisponiveis[0]) || 1,
            quartosDisponiveis: cardInfo.quartosDisponiveis.map((q: string) => parseInt(q)),
            area: cardInfo.areasDisponiveis[0] ? `${cardInfo.areasDisponiveis[0]}m²` : '0m²',
            areasDisponiveis: cardInfo.areasDisponiveis.map((a: string) => `${a}m²`),
            url: `/lancamento/${lancamento.id}`,
            destaque: cardInfo.isCardDestaque,
            tipo: "lancamento" as const,
            statusObra: cardInfo.statusObra,
            regiaoDestaque: cardInfo.isCardDestaque
          };
        });
      
      // Atualiza o array com os novos lançamentos
      updateLancamentosFromAPI(lancamentosForCards);
    }
  } catch (error) {
    console.error('Erro ao carregar lançamentos da API:', error);
  }
};

// Carrega os lançamentos automaticamente quando o módulo é importado
loadLancamentosFromAPI();
