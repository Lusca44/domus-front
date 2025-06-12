import imgCard from './assets/card-pixinguinha.jpeg'

export interface Lancamento {
  id: number;
  nome: string;
  descricao: string;
  quartos: string;
  localizacao: string;
  imagem: string;
  urlLanding: string;
}

const lancamentos: Lancamento[] = [
  {
    id: 1,
    nome: 'Residencial Pixinguinha',
    descricao: 'Edifício residencial de alto padrão no coração da zona portuária',
    quartos: '1-3',
    localizacao: 'Gamboa',
    imagem: `${imgCard}`,
    urlLanding: '/porto-maravilha/lancamento/pixinguinha'
  },
];

export default lancamentos;