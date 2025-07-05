
import cardPixinguinhaImg from "./images/card-pixinguinha.jpeg";
import cardPortoCariocaImg from "./images/card-porto-carioca.jpg";
import cardCaminhosDaGuanabara from "./images/card-caminhos-da-guanabara.jpeg";
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
  // **FINAL DA ÁREA DE ADIÇÃO - quando adicionar novos cards, coloque-os aqui seguindo este padrão**
];
