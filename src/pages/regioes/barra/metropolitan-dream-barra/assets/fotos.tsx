import fachadaPortaria from './img/metropolitan-dream-fachada-portaria.png'
import fachadaLojas from './img/metropolitan-dream-fachada-lojas.png'
import fachadaPredio from './img/metropolitan-dream-fachada-predio.png'
import vistaAerea from './img/metropolitan-dream-vista-aerea.png'
import vistaAereaLocalizacao from './img/metropolitan-dream-vista-aerea-localizacao.png'
import churrasqueira from './img/metropolitan-dream-churrasqueira.png'
import apoioChurrasqueira  from './img/metropolitan-dream-apoio-churrasqueira.png'
import areaFitness from './img/metropolitan-dream-area-fitness.png'
import areaPetCare from './img/metropolitan-dream-area-pet-care.png'
import barDaPiscina from './img/metropolitan-dream-bar-da-piscina.png'
import brinquedoteca from './img/metropolitan-dream-brinquedoteca.png'
import campoSociety from './img/metropolitan-dream-campo-society.png'
import areaCoworking from './img/metropolitan-dream-coworking.png'
import easyMarket from './img/metropolitan-dream-easy-market.png'
import lavanderia from './img/metropolitan-dream-lavanderia.png'
import lounge from './img/metropolitan-dream-lounge.png'
import oficina from './img/metropolitan-dream-oficina.png'
import petPlace from './img/metropolitan-dream-pet-place.png'
import piscinaAdultoInfantil from './img/metropolitan-dream-piscina-adulto-e-infantil.png'
import playground from './img/metropolitan-dream-playground.png'
import rooftop from './img/metropolitan-dream-rooftop.png'
import salaoDeFestas from './img/metropolitan-dream-salao-de-festas.png'
import salaoDeJogos from './img/metropolitan-dream-salao-de-jogos.png'


export interface Photo {
  url: string;
  titulo: string;
}

const fotos: Photo[] = [
  {
    url: fachadaPortaria,
    titulo: "Fachada Portaria"
  },
  {
    url: fachadaLojas, 
    titulo: "Fachada Lojas"
  },
  {
    url: fachadaPredio,
    titulo: "Fachada predio"
  },
  {
    url: vistaAerea,
    titulo: "Vista aerea"
  },
  {
    url: vistaAereaLocalizacao,
    titulo: "Vista aerea com a localização"
  },
  {
    url: churrasqueira,
    titulo: "Churrasqueira"
  },
  {
    url: apoioChurrasqueira,
    titulo: "Apoio churrasqueira"
  },
  {
    url: areaFitness,
    titulo: "Area fitness"
  },
  {
    url: areaPetCare,
    titulo: "Aerea Pet Care"
  },
  {
    url: barDaPiscina,
    titulo: "Bar da piscina"
  },
  {
    url: brinquedoteca,
    titulo: "Brinquedoteca"
  },
  {
    url: campoSociety,
    titulo: "Campo society"
  },
  {
    url: areaCoworking,
    titulo: "Area coworking"
  },
  {
    url: easyMarket,
    titulo: "Easy Market"
  },
  {
    url: lavanderia,
    titulo: "Lavanderia"
  },
  {
    url: lounge,
    titulo: "Lounge"
  },
  {
    url: oficina,
    titulo: "Oficina"
  },
  {
    url: petPlace,
    titulo: "Pet Place"
  },
  {
    url: piscinaAdultoInfantil,
    titulo: "Piscina adulto e infantil"
  },
  {
    url: playground,
    titulo: "Playground"
  },
  {
    url: rooftop,
    titulo: "Rooftop"
  },
  {
    url: salaoDeFestas,
    titulo: "Salão de festas"
  },
  {
    url: salaoDeJogos,
    titulo: "Salão de jogos"
  },
];

export default fotos;
