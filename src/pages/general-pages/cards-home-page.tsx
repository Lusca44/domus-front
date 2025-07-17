
import ImgCardPorto from '../../assets/images/imagem-regiao-portuaria-MAM-praca-flutuante.jpg'
import ImgCardBarra from '../../assets/images/imagem-barra-da-tijuca.webp'
import { useEffect, useState } from 'react';

export interface RegiaoCard {
  id: string;
  nome: string;
  descricao: string;
  caracteristicas: string[];
  lancamentosAtivos: number;
  precoPartir: string;
  imagem: string;
  url: string;
  status: string;
  destaque: boolean;
}

export interface RegiaoAPI {
  nomeRegiao: string;
  id: string;
  destaque: boolean;
}

// Static region cards as fallback
const staticCardsRegioes: RegiaoCard[] = [
  {
    id: "porto-maravilha",
    nome: "Porto Maravilha",
    descricao: "Hub de inovação e cultura com vista para a Baía de Guanabara",
    caracteristicas: [
      "Região em constante valorização",
      "Próximo a museus e pontos turísticos",
      "Excelente infraestrutura de transporte",
      "Vista privilegiada da Baía de Guanabara",
    ],
    lancamentosAtivos: 1,
    precoPartir: "A partir de R$ 294.900",
    imagem: ImgCardPorto,
    url: "/porto-maravilha",
    status: "Disponível",
    destaque: true,
  },
  {
    id: "barra-tijuca",
    nome: "Barra da Tijuca",
    descricao: "Urbanização premium entre lagoas, praias e centros de luxo",
    caracteristicas: [
      "Praias de classe mundial",
      "Shopping centers e entretenimento",
      "Condomínios de alto padrão",
      "Fácil acesso à Zona Oeste",
    ],
    lancamentosAtivos: 1,
    precoPartir: "A partir de R$ 294.900",
    imagem: ImgCardBarra,
    url: "/barra-tijuca",
    status: "Disponível",
    destaque: false,
  },
  {
    id: "recreio",
    nome: "Recreio dos Bandeirantes",
    descricao: "Tranquilidade entre trilhas, praias e infraestrutura planejada",
    caracteristicas: [
      "Praias extensas e preservadas",
      "Ambiente familiar e seguro",
      "Próximo à natureza exuberante",
      "Qualidade de vida diferenciada",
    ],
    lancamentosAtivos: 1,
    precoPartir: "A partir de R$ 294.900",
    imagem:
      "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800&h=600&fit=crop",
    url: "/recreio",
    status: "Disponível",
    destaque: false,
  },
  {
    id: "niteroi",
    nome: "Niterói",
    descricao: "Arte, cultura e vista panorâmica da Baía de Guanabara",
    caracteristicas: [
      "Patrimônio arquitetônico único",
      "Museus e centros culturais",
      "Vista privilegiada do Rio",
      "Conexão com o centro via barcas",
    ],
    lancamentosAtivos: 1,
    precoPartir: "A partir de R$ 294.900",
    imagem: "https://images.unsplash.com/photo-1584464491033-06628f3a6b7b?w=800&h=600&fit=crop",
    url: "/niteroi",
    status: "Disponível",
    destaque: false,
  },
];

// Function to load region cards from API
export const loadRegionsFromAPI = async (): Promise<RegiaoCard[]> => {
  try {
    // Dynamically import the API to avoid circular dependencies
    const { obterTodasRegioes } = await import('../../services/filterApi');
    const regioesApi = await obterTodasRegioes();
    
    if (regioesApi && regioesApi.length > 0) {
      // Map API regions to RegiaoCard format
      const regionCards: RegiaoCard[] = regioesApi.map((regiao: RegiaoAPI) => {
        // Find if we have an existing static card for this region to reuse its data
        const existingCard = staticCardsRegioes.find(
          card => card.nome.toLowerCase() === regiao.nomeRegiao.toLowerCase()
        );

        // Default image based on region name
        let defaultImage = ImgCardPorto;
        if (regiao.nomeRegiao.includes("Barra")) {
          defaultImage = ImgCardBarra;
        }

        return {
          id: regiao.id,
          nome: regiao.nomeRegiao,
          descricao: existingCard?.descricao || `Excelente localização em ${regiao.nomeRegiao}`,
          caracteristicas: existingCard?.caracteristicas || [
            "Localização privilegiada",
            "Infraestrutura completa",
            "Fácil acesso",
            "Opções de lazer nas proximidades",
          ],
          lancamentosAtivos: existingCard?.lancamentosAtivos || 1,
          precoPartir: existingCard?.precoPartir || "A partir de R$ 290.000",
          imagem: existingCard?.imagem || defaultImage,
          url: `/${regiao.nomeRegiao.toLowerCase().replace(/ /g, "-")}`,
          status: "Disponível",
          destaque: regiao.destaque,
        };
      });
      
      return regionCards;
    }
  } catch (error) {
    console.error('Erro ao carregar regiões da API:', error);
  }
  
  // Return static cards as fallback
  return staticCardsRegioes;
};

// Export a function to get the cards, which can be used in components
export const getCardsRegioes = async (): Promise<RegiaoCard[]> => {
  return await loadRegionsFromAPI();
};

// Default export for backward compatibility
export default staticCardsRegioes;
