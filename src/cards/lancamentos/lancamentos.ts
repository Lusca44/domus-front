import cardPixinguinhaImg from "./images/card-pixinguinha.jpeg";
import { Imovel } from "../imoveis";

// **AQUI É ONDE VOCÊ DEVE ADICIONAR NOVOS CARDS DE LANÇAMENTOS**
// Para adicionar um novo lançamento, copie este padrão:
export const lancamentos: Imovel[] = [
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
];
