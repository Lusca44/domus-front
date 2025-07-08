import fachada from './img/orla-maua-fachada.webp'
import fachadaPredio from './img/orla-maua-fachada-predio.png'
import piscinaRoofTop from './img/cad-orla-maua-piscina-roof-top.png'
import academia from './img/orla-maua-academia.jpeg'
import vistaAereaLocalizacao from './img/orla-maua-vista-aerea-localizacao.png'
import brinquedoteca from './img/orla-maua-area-kids.jpeg'
import coworking from './img/orla-maua-coworking.png'
import easyMarket from './img/orla-maua-easy-market.png'
import espacoDelivery from './img/orla-maua-espaco-delivery.png'
import espacoGourmet from './img/orla-maua-espaco-gourmet.png'
import espacoTeen from './img/orla-maua-espaco-teen.png'
import espacoZen from './img/orla-maua-espaco-zen.png'
import lavanderia from './img/orla-maua-lavanderia.jpeg'
import miniCampo from './img/orla-maua-mini-campo.png'
import mirante from './img/orla-maua-mirante.png'
import oficina from './img/orla-maua-oficina.jpeg'
import psicina from './img/orla-maua-piscina.jpeg'
import playgroung from './img/orla-maua-playground.png'
import pub from './img/orla-maua-pub.png'
import salaoDeFestas from './img/orla-maua-salao-de-festas.png'

export interface Photo {
  url: string;
  titulo: string;
}

// TODO: Substituir por fotos reais do empreendimento Orla Mauá
export const fotos: Photo[] = [
  {
    url: fachada,
    titulo: "Fachada",
  },
  {
    url: fachadaPredio, 
    titulo: "Fachada predio",
  },
  {
    url: piscinaRoofTop,
    titulo: "Rooftop com piscina e vista panorâmica",
  },
  {
    url: academia,
    titulo: "Academia",
  },
  {
    url: vistaAereaLocalizacao,
    titulo: "vista aerea localização",
  },
  {
    url: brinquedoteca,
    titulo: "Brinquedoteca",
  },
  {
    url: coworking,
    titulo: "Espaço de coworking moderno",
  },
  {
    url: easyMarket,
    titulo: "Easy Market",
  },
  {
    url: espacoDelivery,
    titulo: "Espaço delivery",
  },
  {
    url: espacoGourmet,
    titulo: "Espaço gourmet",
  },
  {
    url: espacoTeen,
    titulo: "Espaço teen",
  },
  {
    url: espacoZen,
    titulo: "Espaço zen",
  },
  {
    url: lavanderia,
    titulo: "Lavanderia",
  },
  {
    url: miniCampo,
    titulo: "Mini campo",
  },
  {
    url: mirante,
    titulo: "Mirante com vista panorâmica",
  },
  {
    url: oficina,
    titulo: "Oficina",
  },
  {
    url: psicina,
    titulo: "Piscina",
  },
  {
    url: playgroung,
    titulo: "Playground",
  },
  {
    url: pub,
    titulo: "Pub",
  },
  {
    url: salaoDeFestas,
    titulo: "Salao de festas",
  },
];
