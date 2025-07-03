
import fachada from './img/caminhos-da-guabara-fachada.webp'
import fachadaLojas from './img/caminhos-da-guabara-fachada-lojas.png'
import piscinaAdulto from './img/caminhos-da-guabara-piscina-adulto.png'
import academia from './img/caminhos-da-guabara-academia.png'
import academiaExterna from './img/caminhos-da-guabara-academia-externa.png'
import rooftopGourmet from './img/caminhos-da-guabara-rooftop-area-gourmet.png'
import solario from './img/caminhos-da-guabara-solario.png'
import vistaAereaLocalizacao from './img/caminhos-da-guabara-visao-aerea-localizacao.png'

export interface Foto {
  url: string;
  titulo: string;
}

const fotos: Foto[] = [
  {
    url: fachada,
    titulo: "Fachada Principal"
  },
  {
    url: vistaAereaLocalizacao,
    titulo: "Vista Aérea da Localização"
  },
  {
    url: fachadaLojas,
    titulo: "Fachada com Área Comercial"
  },
  {
    url: piscinaAdulto,
    titulo: "Piscina Adulto"
  },
  {
    url: academia,
    titulo: "Academia Completa"
  },
  {
    url: academiaExterna,
    titulo: "Academia Externa"
  },
  {
    url: rooftopGourmet,
    titulo: "Rooftop - Área Gourmet"
  },
  {
    url: solario,
    titulo: "Solário"
  }
];

export default fotos;
