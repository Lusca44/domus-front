import cardPixinguinhaImg from "./images/card-pixinguinha.jpeg";
import cardPortoCariocaImg from "./images/card-porto-carioca.jpg";
import cardCaminhosDaGuanabara from "./images/card-caminhos-da-guanabara.jpeg";
import cardArcosPortoImg from "./images/card-arcos-do-porto.jpeg.webp";
import cardCiataResidencialImg from "./images/card-ciata.png";
import cardNovaOlariaImg from "./images/card-nova-olaria-fachada.png";
import cardOrlaMauaImg from "./images/cad-orla-maua-piscina-roof-top.png";
import cardMetropolitanDreamBarraImg from "./images/card-metropolitan-dream-vista-aerea.png";
import cardAmericas19Img from "./images/card-americas-19-fachada.jpeg.webp";
import cardOrlaRecreioPontalImg from "./images/card-orla-praia-pontal-psicina.png";
import cardThePierImg from "./images/card-the-pier-vista-eterna-baia.png";
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
  }, 
  {
    id: "2",
    titulo: "Porto Carioca",
    descricao:
      "O Porto Carioca é um empreendimento projetado para proporcionar segurança, lazer e comodidade a todos os seus moradores",
    preco: "A partir de R$ 449.060",
    imagem: cardPortoCariocaImg,
    regiao: "Porto Maravilha",
    regiaoDestaque: true,
    quartos: 3,
    quartosDisponiveis: [2, 3],
    area: "85,26m²",
    areasDisponiveis: [
      "46m²",
      "52m²",
      "61m²",
      "64m²",
      "67m²",
      "70m²",
      "73m²",
      "85m²",
      "80m²",
    ], // Áreas disponíveis para este lançamento
    url: "/porto-maravilha/lancamento/porto-carioca",
    destaque: true,
    tipo: "lancamento",
    tipagem: ["garden", "apartamento"],
    statusObra: "Pronto", // Status atual da obra
  },
  {
    id: "3",
    titulo: "Caminhos da Guanabara",
    descricao:
      "Um manifesto em forma de arte e arquitetura que preenche Niterói. Onde todos seus caminhos se encontram.",
    preco: "A partir de R$ 260.323",
    imagem: cardCaminhosDaGuanabara,
    regiao: "Niterói",
    quartos: 2,
    quartosDisponiveis: [0, 1, 2],
    area: "51,30m²",
    areasDisponiveis: ["32m²", "51m²", "42m²", "43m²"], // Áreas disponíveis para este lançamento
    url: "/lancamentos/caminhos-da-guanabara",
    destaque: false,
    tipo: "lancamento",
    tipagem: ["apartamento"],
    statusObra: "Em obras", // Status atual da obra
  },
  {
    id: "4",
    titulo: "Arcos do Porto",
    descricao:
      "A melhor forma de viver o Rio. Lazer completo no coração do Porto Maravilha com opções de Studio a Garden.",
    preco: "A partir de R$ 336.396",
    imagem: cardArcosPortoImg,
    regiao: "Porto Maravilha",
    quartos: 2,
    quartosDisponiveis: [0, 1, 2], // tem studio
    area: "59,08m²",
    areasDisponiveis: ["32m²", "33m²", "38m²", "55m²", "59m²"], // Áreas disponíveis para este lançamento
    url: "/lancamentos/arcos-do-porto",
    destaque: false,
    tipo: "lancamento",
    tipagem: ["apartamento"],
    statusObra: "Pronto", // Status atual da obra
  },
  {
    id: "5",
    titulo: "Ciata Residencial",
    descricao:
      "Cultura • Conexão • Legado. Uma homenagem a Tia Ciata no coração do Porto Maravilha, onde nasceu o samba.",
    preco: "A partir de R$ 325.455",
    imagem: cardCiataResidencialImg,
    regiao: "Porto Maravilha",
    quartos: 2,
    quartosDisponiveis: [0, 1, 2],
    area: "39,65m²",
    areasDisponiveis: ["31m²", "32,97m²", "39,65m²"], // Áreas disponíveis para este lançamento
    url: "/lancamentos/ciata-residencial",
    destaque: false,
    tipo: "lancamento",
    tipagem: ["apartamento"],
    statusObra: "Lançamento", // Status atual da obra
  },
  {
    id: "6",
    titulo: "Nova Olaria",
    descricao:
      "Tradição e modernidade se encontram. Uma nova forma de viver, morar e pertencer no coração de Olaria.",
    preco: "A partir de R$ 259.430",
    imagem: cardNovaOlariaImg,
    regiao: "Olaria",
    quartos: 2,
    quartosDisponiveis: [2],
    area: "41,34m²",
    areasDisponiveis: ["38,50m²", "41,34m²"], // Áreas disponíveis para este lançamento
    url: "/lancamentos/nova-olaria",
    destaque: false,
    tipo: "lancamento",
    tipagem: ["apartamento"],
    statusObra: "Em obras", // Status atual da obra
  },
  {
    id: "7",
    titulo: "Orla Mauá",
    descricao:
      "O coração pulsante da vida urbana carioca. Viva no Boulevard Olímpico com vista para o Museu do Amanhã.",
    preco: "A partir de R$ 721.407",
    imagem: cardOrlaMauaImg,
    regiao: "Porto Maravilha",
    quartos: 3,
    quartosDisponiveis: [0, 1, 2, 3],
    area: "76,56m²",
    areasDisponiveis: ["30m²", "33m²", "38m²", "42m²", "61m²", "65m²", "76m²"], // Áreas disponíveis para este lançamento
    url: "/lancamentos/orla-maua",
    destaque: false,
    tipo: "lancamento",
    tipagem: ["apartamento"],
    statusObra: "Lançamento", // Status atual da obra
  },
  {
    id: "8",
    titulo: "Metropolitan Dream Barra",
    descricao:
      "Mega complexo com 5 torres e lazer completo na Barra da Tijuca. Viva o seu dream living com bar da piscina, rooftop e localização premium.",
    preco: "A partir de R$ 334.588",
    imagem: cardMetropolitanDreamBarraImg,
    regiao: "Barra da Tijuca",
    regiaoDestaque: true,
    quartos: 3,
    quartosDisponiveis: [0, 1, 2, 3, 4], // tem loft
    area: "79,74m²",
    areasDisponiveis: [
      "31m²",
      "30m²",
      "33m²",
      "65m²",
      "34m²",
      "32m²",
      "52m²",
      "56m²",
      "79m²",
      "67m²",
    ], // Áreas disponíveis para este lançamento
    url: "/lancamentos/metropolitan-dream-barra",
    destaque: true,
    tipo: "lancamento",
    tipagem: ["garden", "apartamento", "loft"],
    statusObra: "Pronto", // Status atual da obra
  },
  {
    id: "9",
    titulo: "Américas 19",
    descricao:
      "Bem-vindo ao melhor jeito de viver no Recreio. Localização premium no melhor quilômetro da Av. das Américas.",
    preco: "A partir de R$ 452.610",
    imagem: cardAmericas19Img,
    regiao: "Recreio dos Bandeirantes",
    quartos: 3,
    quartosDisponiveis: [2, 3], // tem duplex cobertura
    area: "136,25m²",
    areasDisponiveis: ["54m²", "64m²", "99m²", "103m²", "136m²"], // Áreas disponíveis para este lançamento
    url: "/lancamentos/americas19",
    destaque: false,
    tipo: "lancamento",
    tipagem: ["duplex", "apartamento", "cobertura", "garden"],
    statusObra: "Em obras", // Status atual da obra
  },
  {
    id: "10",
    titulo: "Orla Recreio",
    descricao:
      "Vista para o mar + Lazer completo. Viva o ano inteiro como em férias na Praia do Pontal, Recreio dos Bandeirantes.",
    preco: "A partir de R$ 401.314",
    imagem: cardOrlaRecreioPontalImg,
    regiao: "Recreio dos Bandeirantes",
    quartos: 3,
    quartosDisponiveis: [1, 2, 3],
    area: "67,98m²",
    areasDisponiveis: ["48m²", "55m²", "67m²", "50m²", "47m²", "59m²"], // Áreas disponíveis para este lançamento
    url: "/lancamentos/orla-recreio-pontal",
    destaque: false,
    tipo: "lancamento",
    tipagem: ["apartamento"],
    statusObra: "Lançamento", // Status atual da obra
  },
  {
    id: "11",
    titulo: "The Pier Residencial",
    descricao:
      "Vista eterna para a Baía de Guanabara no coração de Niterói. Rooftop premium com 5 áreas distintas.",
    preco: "A partir de R$ 337.730",
    imagem: cardThePierImg,
    regiao: "Centro, Niterói",
    quartos: 3,
    quartosDisponiveis: [1, 2, 3],
    area: "57,12m²",
    areasDisponiveis: ["28m²", "31m²", "35m²", "43m²", "44m²", "51m²", "57m²"], // Áreas disponíveis para este lançamento
    url: "/lancamentos/the-pier-residencial",
    destaque: false,
    tipo: "lancamento",
    tipagem: ["apartamento"],
    statusObra: "Pronto", // Status atual da obra
  },
  // **FINAL DA ÁREA DE ADIÇÃO - quando adicionar novos cards, coloque-os aqui seguindo este padrão**
];
