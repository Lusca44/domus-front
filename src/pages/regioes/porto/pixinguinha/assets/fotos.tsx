export interface Foto {
  url: string;
  titulo: string;
  tipo: string;
}

const fotos: Foto[] = [
  {
    url: "https://images.unsplash.com/photo-1459767129954-1b1c1f9b9ace?w=1200",
    titulo: "Fachada do Empreendimento",
    tipo: "fachada",
  },
  {
    url: "https://images.unsplash.com/photo-1460574283810-2aab119d8511?w=1200",
    titulo: "Vista da Baía de Guanabara",
    tipo: "vista",
  },
  {
    url: "https://images.unsplash.com/photo-1486718448742-163732cd1544?w=1200",
    titulo: "Hall de Entrada",
    tipo: "areas-comuns",
  },
  {
    url: "https://images.unsplash.com/photo-1721322800607-8c38375eef04?w=1200",
    titulo: "Apartamento Decorado - Sala",
    tipo: "apartamento",
  },
  {
    url: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1200",
    titulo: "Piscina e Área de Lazer",
    tipo: "lazer",
  },
  {
    url: "https://images.unsplash.com/photo-1518005020951-eccb494ad742?w=1200",
    titulo: "Academia",
    tipo: "lazer",
  },
  {
    url: "https://images.unsplash.com/photo-1496307653780-42ee777d4833?w=1200",
    titulo: "Salão de Festas",
    tipo: "areas-comuns",
  },
  {
    url: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=1200",
    titulo: "Apartamento 3 Quartos - Suite Master",
    tipo: "apartamento",
  },
];

export default fotos;
