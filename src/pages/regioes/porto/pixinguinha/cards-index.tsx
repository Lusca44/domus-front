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
    localizacao: 'Santo Cristo - Rio de Janeiro - RJ',
    imagem: `${imgCard}`,
    urlLanding: '/porto-maravilha/lancamento/pixinguinha'
  },
  {
    id: 2,
    nome: 'Residencial Arcos do Porto',
    descricao: 'Edifício residencial de alto padrão no coração da zona portuária',
    quartos: '1-3',
    localizacao: 'Santo Cristo - Rio de Janeiro - RJ',
    imagem: `${imgCard}`,
    urlLanding: '/porto-maravilha/lancamento/pixinguinha'
  },
];

export default lancamentos;