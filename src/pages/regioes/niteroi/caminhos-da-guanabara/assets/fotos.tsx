import fachada from './img/caminhos-da-guabara-fachada.png'
import fachadaLoja from './img/caminhos-da-guabara-fachada-lojas.png'
import rooftopAreaGourmet from './img/caminhos-da-guabara-rooftop-area-gourmet.png'
import solario from './img/caminhos-da-guabara-solario.png'
import piscina from './img/caminhos-da-guabara-piscina-adulto.png'
import visaoAerea from './img/caminhos-da-guabara-visao-aerea-localizacao.png'
import academia from './img/caminhos-da-guabara-academia.png'
import academiaExterna from './img/caminhos-da-guabara-academia-externa.png'


export interface Foto {
  url: string;
  titulo: string;
}

const fotos: Foto[] = [
  {
    url: fachada,
    titulo: "Fachada Principal do Empreendimento",
  },
  {
    url: visaoAerea,
    titulo: "Vista Aérea do Complexo",
  },
  {
    url: rooftopAreaGourmet,
    titulo: "Rooftop com Vista da Baía de Guanabara",
  },
  {
    url: fachadaLoja,
    titulo: "Fachada com lojas",
  },
  {
    url: piscina,
    titulo: "Piscina Adulto",
  },
  {
    url: solario,
    titulo: "Solario",
  },
  {
    url: academia,
    titulo: "Academia Completa",
  },
  {
    url: academiaExterna,
    titulo: "Academia Externa",
  },
];

export default fotos;
