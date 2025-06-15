import ImgCardPorto from '../../assets/images/imagem-regiao-portuaria-MAM-praca-flutuante.jpg'
import ImgCardBarra from '../../assets/images/imagem-barra-da-tijuca.webp'

export interface RegiaoCard {
  id: string;
  nome: string;
  descricao: string;
  caracteristicas: string[];
  lancamentosAtivos: number;
  precoPartir: string;
  imagem: string;
  url: string;
  status: string;
  destaque: boolean;
}

const cardsRegioes: RegiaoCard[] = [
  {
    id: "porto-maravilha",
    nome: "Porto Maravilha",
    descricao: "Hub de inovação e cultura com vista para a Baía de Guanabara",
    caracteristicas: [
      "Região em constante valorização",
      "Próximo a museus e pontos turísticos",
      "Excelente infraestrutura de transporte",
      "Vista privilegiada da Baía de Guanabara",
    ],
    lancamentosAtivos: 1,
    precoPartir: "A partir de R$ 294.900",
    imagem: ImgCardPorto,
    url: "/porto-maravilha",
    status: "Disponível",
    destaque: true,
  },
  {
    id: "barra-tijuca",
    nome: "Barra da Tijuca",
    descricao: "Urbanização premium entre lagoas, praias e centros de luxo",
    caracteristicas: [
      "Praias de classe mundial",
      "Shopping centers e entretenimento",
      "Condomínios de alto padrão",
      "Fácil acesso à Zona Oeste",
    ],
    lancamentosAtivos: 1,
    precoPartir: "A partir de R$ 294.900",
    imagem: ImgCardBarra,
    url: "/barra-tijuca",
    status: "Disponível",
    destaque: false,
  },
  {
    id: "recreio",
    nome: "Recreio dos Bandeirantes",
    descricao: "Tranquilidade entre trilhas, praias e infraestrutura planejada",
    caracteristicas: [
      "Praias extensas e preservadas",
      "Ambiente familiar e seguro",
      "Próximo à natureza exuberante",
      "Qualidade de vida diferenciada",
    ],
    lancamentosAtivos: 1,
    precoPartir: "A partir de R$ 294.900",
    imagem:
      "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800&h=600&fit=crop",
    url: "/recreio",
    status: "Disponível",
    destaque: false,
  },
];

export default cardsRegioes;
