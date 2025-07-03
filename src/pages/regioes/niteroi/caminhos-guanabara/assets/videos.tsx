
import vistaAereaVideo from './videos/caminhos-da-guabara_visao-aerea.mp4'

export interface Video {
  url: string;
  titulo: string;
}

const videos: Video[] = [
  {
    url: vistaAereaVideo,
    titulo: "Vista Aérea - Caminhos da Guanabara"
  },
  {
    url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    titulo: "Tour Virtual - Áreas Comuns"
  },
  {
    url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    titulo: "Apartamento Decorado - 2 Quartos"
  }
];

export default videos;
