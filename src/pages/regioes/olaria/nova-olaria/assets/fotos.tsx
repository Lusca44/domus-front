import fachada from './img/card-nova-olaria-fachada.png'
import vistaAereaLocalziacao from './img/nova-olaria-vista-aerea-localizacao.png'
import academia from './img/nova-olaria-academia.png'
import areaDeJogos from './img/nova-olaria-area-de-jogos.png'
import bicicletario from './img/nova-olaria-bicicletario.png'
import brinquedoteca from './img/nova-olaria-brinquedoteca.png'
import campoSociety from './img/nova-olaria-campo-socienty.png'
import coworking from './img/nova-olaria-coworking.png'
import areaFitnessExterna from './img/nova-olaria-fitnes-externa.png'
import oficina from './img/nova-olaria-oficina.png'
import petPlace from './img/nova-olaria-pet-place.png'
import piscina from './img/nova-olaria-piscinia.png'
import playground from './img/nova-olaria-playground.png'
import salaoDeJogosComPub from './img/nova-olaria-salao-de-jogos-com-pub.png'
import salaoDeFestas from './img/nova-olaria-salao-festas.png'


export interface Photo {
  url: string;
  titulo: string;
}

// TODO: Substituir por fotos reais do empreendimento Nova Olaria
export const fotos: Photo[] = [
  {
    url: fachada,
    titulo: "Fachada",
  },
  {
    url: vistaAereaLocalziacao, 
    titulo: "Vista aérea com localização",
  },
  {
    url: academia,
    titulo: "Academia",
  },
  {
    url: areaDeJogos,
    titulo: "Area de jogos",
  },
  {
    url: bicicletario,
    titulo: "Bicicletário",
  },
  {
    url: brinquedoteca,
    titulo: "Brinquedoteca",
  },
  {
    url: campoSociety,
    titulo: "Campo Society",
  },
  {
    url: coworking,
    titulo: "Coworking",
  },
  {
    url: areaFitnessExterna,
    titulo: "Espaço fitness externo",
  },
  {
    url: oficina,
    titulo: "Oficina",
  },
  {
    url: petPlace,
    titulo: "Pet place",
  },
  {
    url: piscina,
    titulo: "Piscina",
  },
  {
    url: playground,
    titulo: "Playground",
  },
  {
    url: salaoDeJogosComPub,
    titulo: "Salão de jogos com Pub",
  },
  {
    url: salaoDeFestas,
    titulo: "Salão de festas",
  },
];
