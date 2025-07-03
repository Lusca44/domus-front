import cardPixinguinhaImg from "./images/card-pixinguinha.jpeg";
import cardPortoCariocaImg from "./images/card-porto-carioca.jpg";
import { Imovel } from "../imoveis";

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
];
