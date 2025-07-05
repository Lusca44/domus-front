
export interface Video {
  url: string;
  titulo: string;
}

// TODO: Substituir por vídeos reais do empreendimento Orla Mauá
export const videos: Video[] = [
  {
    url: "/assets/lancamentos/orla-maua/video-tour-virtual.mp4",
    titulo: "Tour virtual do Orla Mauá",
  },
  {
    url: "/assets/lancamentos/orla-maua/video-rooftop.mp4",
    titulo: "Vídeo do rooftop e amenities",
  },
  {
    url: "/assets/lancamentos/orla-maua/video-localizacao.mp4",
    titulo: "Localização e pontos de interesse",
  }
];
