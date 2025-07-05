
export interface Video {
    url: string,
    titulo: string,
    thumbnailLocal?: string
} 

const videos: Video[] = [
      {
        url: "https://youtu.be/placeholder-video-1",
        titulo: 'Vídeo Promocional - Caminhos da Guanabara',
        thumbnailLocal: '/assets/lancamentos/caminhos-da-guanabara/video-promocional-thumb.jpg'
      },
      {
        url: "https://youtu.be/placeholder-video-2",
        titulo: 'Tour Virtual - Apartamento Decorado',
        thumbnailLocal: '/assets/lancamentos/caminhos-da-guanabara/tour-apartamento-thumb.jpg'
      },
      {
        url: "https://youtu.be/placeholder-video-3",
        titulo: 'Área de Lazer Completa',
        thumbnailLocal: '/assets/lancamentos/caminhos-da-guanabara/area-lazer-thumb.jpg'
      },
      {
        url: "https://youtu.be/placeholder-video-4",
        titulo: 'Localização e Entorno',
        thumbnailLocal: '/assets/lancamentos/caminhos-da-guanabara/localizacao-thumb.jpg'
      },
];

export default videos;
