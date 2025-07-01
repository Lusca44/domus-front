
export interface Video {
    url: string,
    titulo: string,
    thumbnailLocal?: string
} 

const videos: Video[] = [
      {
        url: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
        titulo: 'Tour Virtual do Empreendimento',
        thumbnailLocal: '/assets/videos/tour-virtual.mp4'
      },
      {
        url: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
        titulo: 'Vista Aérea da Região',
        thumbnailLocal: '/assets/videos/vista-aerea.mp4'
      },
      {
        url: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
        titulo: 'Apartamento Decorado',
        thumbnailLocal: '/assets/videos/apartamento-decorado.mp4'
      }
];

export default videos;
