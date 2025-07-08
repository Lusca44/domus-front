import cardPixinguinhaImg from "./images/card-pixinguinha.jpeg";
import cardPortoCariocaImg from "./images/card-porto-carioca.jpg";
import cardCaminhosDaGuanabara from "./images/card-caminhos-da-guanabara.jpeg";
import cardArcosPortoImg from "./images/card-arcos-do-porto.jpeg.webp";
import cardCiataResidencialImg from "./images/card-ciata.png";
import cardNovaOlariaImg from "./images/card-nova-olaria-fachada.png";
import cardOrlaMauaImg from "./images/cad-orla-maua-piscina-roof-top.png";
import cardMetropolitanDreamBarraImg from "./images/card-metropolitan-dream-vista-aerea.png";
import cardAmericas19Img from "./images/card-americas19.jpeg";
import cardOrlaRecreioPontalImg from "./images/card-orla-recreio-pontal.jpeg";
import cardThePierImg from "./images/card-the-pier-residencial.jpeg";
import { Imovel } from "../imoveis";

// **AQUI É ONDE VOCÊ DEVE ADICIONAR NOVOS CARDS DE LANÇAMENTOS**
// Para adicionar um novo lançamento, copie este padrão:
export const lancamentos: Imovel[] = [
  {
    id: "1",
    titulo: "Residencial Pixinguinha",
    descricao: "Apartamentos modernos no coração do Porto Maravilha",
    preco: "A partir de R$ 294.900",
    imagem: cardPixinguinhaImg,
    regiao: "Porto Maravilha",
    quartos: 3,
    area: "45m²",
    url: "/porto-maravilha/lancamento/pixinguinha",
    destaque: true,
    tipo: "lancamento",
  },
  {
    id: "2",
    titulo: "Porto Carioca",
    descricao: "Apartamentos modernos no coração do Porto Maravilha",
    preco: "A partir de R$ 294.900",
    imagem: cardPortoCariocaImg,
    regiao: "Porto Maravilha",
    quartos: 3,
    area: "85m²",
    url: "/porto-maravilha/lancamento/porto-carioca",
    destaque: true,
    tipo: "lancamento",
  },
  {
    id: "3",
    titulo: "Caminhos da Guanabara",
    descricao: "Um manifesto em forma de arte e arquitetura que preenche Niterói. Onde todos seus caminhos se encontram.",
    preco: "A partir de R$ 294.900",
    imagem: cardCaminhosDaGuanabara,
    regiao: "Niterói",
    quartos: 2,
    area: "38m²",
    url: "/lancamentos/caminhos-da-guanabara",
    destaque: true,
    tipo: "lancamento",
  },
  {
    id: "4",
    titulo: "Arcos do Porto",
    descricao: "A melhor forma de viver o Rio. Lazer completo no coração do Porto Maravilha com opções de Studio a Garden.",
    preco: "A partir de R$ 280.000",
    imagem: cardArcosPortoImg,
    regiao: "Porto Maravilha",
    quartos: 0, // Studio
    area: "59m²",
    url: "/lancamentos/arcos-do-porto",
    destaque: false,
    tipo: "lancamento",
  },
  {
    id: "5",
    titulo: "Ciata Residencial",
    descricao: "Cultura • Conexão • Legado. Uma homenagem a Tia Ciata no coração do Porto Maravilha, onde nasceu o samba.",
    preco: "A partir de R$ 320.000",
    imagem: cardCiataResidencialImg,
    regiao: "Porto Maravilha",
    quartos: 1, // 1 Quarto
    area: "39m²",
    url: "/lancamentos/ciata-residencial",
    destaque: false,
    tipo: "lancamento",
  },
  {
    id: "6",
    titulo: "Nova Olaria",
    descricao: "Tradição e modernidade se encontram. Uma nova forma de viver, morar e pertencer no coração de Olaria.",
    preco: "A partir de R$ 245.000",
    imagem: cardNovaOlariaImg,
    regiao: "Olaria",
    quartos: 2,
    area: "41m²",
    url: "/lancamentos/nova-olaria",
    destaque: false,
    tipo: "lancamento",
  },
  {
    id: "7",
    titulo: "Orla Mauá",
    descricao: "O coração pulsante da vida urbana carioca. Viva no Boulevard Olímpico com vista para o Museu do Amanhã.",
    preco: "A partir de R$ 380.000",
    imagem: cardOrlaMauaImg,
    regiao: "Porto Maravilha",
    quartos: 0, // Studio (tem várias opções, mas começando com Studio)
    area: "75m²",
    url: "/lancamentos/orla-maua",
    destaque: false,
    tipo: "lancamento",
  },
  {
    id: "8",
    titulo: "Metropolitan Dream Barra",
    descricao: "Mega complexo com 5 torres e lazer completo na Barra da Tijuca. Viva o seu dream living com bar da piscina, rooftop e localização premium.",
    preco: "A partir de R$ 380.000",
    imagem: cardMetropolitanDreamBarraImg,
    regiao: "Barra da Tijuca",
    quartos: 0, // Studio (tem várias opções: Studio, 1, 2, 3 quartos e Garden)
    area: "28m²",
    url: "/lancamentos/metropolitan-dream-barra",
    destaque: true,
    tipo: "lancamento",
  },
  {
    id: "9",
    titulo: "Américas19",
    descricao: "Bem-vindo ao melhor jeito de viver no Recreio. Localização premium no melhor quilômetro da Av. das Américas.",
    preco: "A partir de R$ 320.000",
    imagem: cardAmericas19Img,
    regiao: "Recreio dos Bandeirantes",
    quartos: 2, // 2 a 4 quartos (começando com 2)
    area: "58m²",
    url: "/lancamentos/americas19",
    destaque: false,
    tipo: "lancamento",
  },
  {
    id: "10",
    titulo: "Orla Recreio",
    descricao: "Vista para o mar + Lazer completo. Viva o ano inteiro como em férias na Praia do Pontal, Recreio dos Bandeirantes.",
    preco: "A partir de R$ 350.000",
    imagem: cardOrlaRecreioPontalImg,
    regiao: "Recreio dos Bandeirantes",
    quartos: 1, // 1 a 3 quartos (começando com 1)
    area: "42m²",
    url: "/lancamentos/orla-recreio-pontal",
    destaque: false,
    tipo: "lancamento",
  },
  {
    id: "11",
    titulo: "The Pier Residencial",
    descricao: "Vista eterna para a Baía de Guanabara no coração de Niterói. Rooftop premium com 5 áreas distintas.",
    preco: "A partir de R$ 420.000",
    imagem: cardThePierImg,
    regiao: "Centro, Niterói",
    quartos: 1, // 1 a 3 quartos (começando com 1)
    area: "35m²",
    url: "/lancamentos/the-pier-residencial",
    destaque: false,
    tipo: "lancamento",
  },
  // **FINAL DA ÁREA DE ADIÇÃO - quando adicionar novos cards, coloque-os aqui seguindo este padrão**
];
