import video1 from './videos/video-pixinguinha-1.mp4'
import video2 from './videos/video-pixinguinha-2.mp4'
import video3 from './videos/video-pixinguinha-3.mp4'

export interface Video {
    url: string,
    titulo: string,
    thumbnailLocal?: string
} 

const videos: Video[] = [
      {
        url: video1,
        titulo: 'Video informacional empreendimento',
        thumbnailLocal: '/assets/videos/vista-aerea.mp4'
      },
      {
        url: video2,
        titulo: 'Video informacional empreendimento',
        thumbnailLocal: '/assets/videos/apartamento-decorado.mp4'
      },
      {
        url: video3,
        titulo: 'Video informacional empreendimento',
        thumbnailLocal: '/assets/videos/apartamento-decorado.mp4'
      },
];

export default videos;
