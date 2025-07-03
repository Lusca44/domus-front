
import fachada2 from './img/porto-carioca-fachada-2.webp'
import fachadaLoja from './img/porto-carioca-fachada-loja.webp'
import fachadaMarket from './img/porto-carioca-fachada-market.webp'
import piscina from './img/porto-carioca-piscina-adulto.webp'
import piscinaRaia from './img/porto-carioca-piscina-raia.webp'
import rooftop from './img/porto-carioca-rooftop.webp'
import quadraRooftop from './img/porto-carioca-quadra-rooftop.webp'
import academia from './img/porto-carioca-academia.webp'
import bar from './img/porto-carioca-bar.webp'
import beachTenis from './img/porto-carioca-beach-tenis.webp'
import sauna from './img/porto-carioca-sauna.webp'
import fotomontagem from './img/emccamp - porto - fotomontagem a.jpg'
import portaria from './img/emccamp - porto - portaria.jpg'
import loja from './img/emccamp - porto - loja.jpg'
import varanda from './img/emccamp - porto - varanda salao de festas.jpg'
import guarita from './img/emccamp - porto  - geral guarita com prédio.jpg'
import vistaAereaLocalizacao from './img/porto-carioca-vista-aerea-localizacao.png'
import vistaAerea from './img/porto-carioca-vista-aerea.png'

export interface Foto {
  url: string;
  titulo: string;
}

const fotos: Foto[] = [
  {
    url: fotomontagem,
    titulo: "Fachada do empreendimento",
  },
  {
    url: fachada2,
    titulo: "Vista da fachada principal",
  },
  {
    url: vistaAereaLocalizacao,
    titulo: "Vista aerea da localização",
  },
  {
    url: vistaAerea,
    titulo: "Vista aerea",
  },
  {
    url: guarita,
    titulo: "Vista geral com guarita",
  },
  {
    url: portaria,
    titulo: "Portaria elegante",
  },
  {
    url: fachadaLoja,
    titulo: "Fachada com área comercial",
  },
  {
    url: fachadaMarket,
    titulo: "Área do mercado",
  },
  {
    url: piscina,
    titulo: "Piscina adulto",
  },
  {
    url: piscinaRaia,
    titulo: "Piscina para natação",
  },
  {
    url: rooftop,
    titulo: "Área de rooftop",
  },
  {
    url: quadraRooftop,
    titulo: "Quadra no rooftop",
  },
  {
    url: academia,
    titulo: "Academia completa",
  },
  {
    url: bar,
    titulo: "Área do bar",
  },
  {
    url: beachTenis,
    titulo: "Quadra de beach tennis",
  },
  {
    url: sauna,
    titulo: "Sauna relaxante",
  },
  {
    url: varanda,
    titulo: "Varanda do salão de festas",
  },
  {
    url: loja,
    titulo: "Área comercial",
  },
];

export default fotos;
