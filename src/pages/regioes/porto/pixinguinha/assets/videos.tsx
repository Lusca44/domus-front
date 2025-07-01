
export interface Video {
    url: string,
    titulo: string,
    thumbnail: string
} 

const videos: Video[] = [
      {
        url: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
        titulo: 'Tour Virtual do Empreendimento',
        thumbnail: 'https://images.unsplash.com/photo-1487958449943-2429e8be8625?w=800&h=600&fit=crop'
      },
      {
        url: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
        titulo: 'Vista Aérea da Região',
        thumbnail: 'https://images.unsplash.com/photo-1431576901776-e539bd916ba2?w=800&h=600&fit=crop'
      },
      {
        url: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
        titulo: 'Apartamento Decorado',
        thumbnail: 'https://images.unsplash.com/photo-1721322800607-8c38375eef04?w=800&h=600&fit=crop'
      }
];

export default videos;
