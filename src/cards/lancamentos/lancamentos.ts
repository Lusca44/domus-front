
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
  // **AQUI É ONDE VOCÊ DEVE ADICIONAR NOVOS CARDS DE LANÇAMENTOS**
  // Para adicionar um novo lançamento, copie este padrão:
  {
    id: "3", // Incremente o ID
    titulo: "Caminhos da Guanabara", // Nome do empreendimento
    descricao: "Um manifesto em forma de arte e arquitetura que preenche Niterói",
    preco: "A partir de R$ 294.900", // Preço inicial
    imagem: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80", // URL da imagem
    regiao: "Niterói", // **IMPORTANTE**: Esta região aparecerá automaticamente no filtro
    quartos: 2, // Número de quartos - também aparece automaticamente no filtro
    area: "45m²", // Área do apartamento
    url: "/niteroi/lancamento/caminhos-guanabara", // Link para a landing page
    destaque: false, // Se é destaque ou não
    tipo: "lancamento", // Sempre "lancamento" para este arquivo
  }
  // **FINAL DA ÁREA DE ADIÇÃO - quando adicionar novos cards, coloque-os aqui seguindo este padrão**
];
