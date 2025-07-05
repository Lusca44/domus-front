
// Importações dos vídeos do empreendimento Américas19
import videoTourVirtual from "/public/assets/lancamentos/americas19/video-tour-virtual.mp4";
import videoAreaLazer from "/public/assets/lancamentos/americas19/video-area-lazer.mp4";
import videoLocalizacao from "/public/assets/lancamentos/americas19/video-localizacao.mp4";

export const videosAmericas19 = {
  tourVirtual: videoTourVirtual,
  areaLazer: videoAreaLazer,
  localizacao: videoLocalizacao,
};

// Array de vídeos para o carrossel
export const videosCarrossel = [
  {
    src: videosAmericas19.tourVirtual,
    title: "Tour Virtual",
    description: "Conheça todos os ambientes"
  },
  {
    src: videosAmericas19.areaLazer,
    title: "Área de Lazer",
    description: "Lazer completo para toda família"
  },
  {
    src: videosAmericas19.localizacao,
    title: "Localização",
    description: "Melhor quilômetro da Av. das Américas"
  },
];
