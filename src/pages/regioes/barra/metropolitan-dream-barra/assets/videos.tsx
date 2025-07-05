
export interface Video {
  url: string;
  titulo: string;
  thumbnailLocal?: string;
}

const videos: Video[] = [
  {
    url: "/assets/lancamentos/metropolitan-dream-barra/video-tour-virtual.mp4",
    titulo: "Tour Virtual - Metropolitan Dream Barra",
    thumbnailLocal: "/assets/lancamentos/metropolitan-dream-barra/fachada-principal.jpg"
  },
  {
    url: "/assets/lancamentos/metropolitan-dream-barra/video-area-lazer.mp4", 
    titulo: "Áreas de Lazer Premium",
    thumbnailLocal: "/assets/lancamentos/metropolitan-dream-barra/bar-piscina.jpg"
  },
  {
    url: "/assets/lancamentos/metropolitan-dream-barra/video-localizacao.mp4",
    titulo: "Localização Estratégica na Barra",
    thumbnailLocal: "/assets/lancamentos/metropolitan-dream-barra/vista-avenidas.jpg"
  }
];

export default videos;
