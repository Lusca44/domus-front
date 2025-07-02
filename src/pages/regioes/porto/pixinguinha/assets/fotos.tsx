import fachada from './img/fachada.jpg'
import predioFotoMontagem from './img/predio-foto-montagem.jpeg.webp'
import roofTopLetreiro from './img/rooftop-letreiro.jpg'
import skybar from './img/skybar.jpeg'
import vistaAereaLocalizacao from './img/vista-area-localizacao.png'
import academia from './img/academia.jpeg'

export interface Foto {
  url: string;
  titulo: string;
  tipo: string;
}

const fotos: Foto[] = [
  {
    url: fachada,
    titulo: "Foto-montagem do rooftop",
    tipo: "fachada",
  },
  {
    url: predioFotoMontagem,
    titulo: "Foto-montagem do rooftop",
    tipo: "foto-montagem do prédio",
  },
  {
    url: roofTopLetreiro,
    titulo: "Foto-montagem do rooftop",
    tipo: "foto-montagem do rooftop ",
  },
  {
    url: skybar,
    titulo: "skybar no rooftop",
    tipo: "skybar no rooftop",
  },
  {
    url: vistaAereaLocalizacao,
    titulo: "vista aerea da localização",
    tipo: "vista aerea da localização",
  },
  {
    url: academia,
    titulo: "Academia",
    tipo: "lazer",
  },

];

export default fotos;
