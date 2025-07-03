export interface Video {
    url: string,
    titulo: string,
    thumbnailLocal?: string
} 

const videos: Video[] = [
      {
        url: "https://youtu.be/cvwgs5lmU24",
        titulo: 'Video informacional empreendimento',
        thumbnailLocal: '/assets/videos/vista-aerea.mp4'
      },
      {
        url: "https://www.youtube.com/watch?v=IBJkBYPOGic",
        titulo: 'Video informacional empreendimento',
        thumbnailLocal: '/assets/videos/vista-aerea.mp4'
      },
];

export default videos;
