import { Imovel } from '../imoveis';

// Base alugueis data
export let alugueis: Imovel[] = [
  {
    id: "11",
    titulo: "Apartamento Moderno - Copacabana",
    descricao: "Apartamento totalmente mobiliado com vista para o mar",
    preco: "R$ 3.200/mês",
    imagem: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&h=600&fit=crop",
    regiao: "Copacabana",
    quartos: 2,
    area: "68m²",
    url: "#",
    destaque: true,
    tipo: "aluguel",
  },
  {
    id: "12",
    titulo: "Casa Familiar - Barra da Tijuca",
    descricao: "Casa espaçosa em condomínio fechado",
    preco: "R$ 4.500/mês",
    imagem: "https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=800&h=600&fit=crop",
    regiao: "Barra da Tijuca",
    quartos: 3,
    area: "120m²",
    url: "#",
    destaque: true,
    tipo: "aluguel",
  },
  {
    id: "13",
    titulo: "Loft Executivo - Ipanema",
    descricao: "Loft moderno para executivos",
    preco: "R$ 2.800/mês",
    imagem: "https://images.unsplash.com/photo-1484154218962-a197022b5858?w=800&h=600&fit=crop",
    regiao: "Ipanema",
    quartos: 1,
    area: "45m²",
    url: "#",
    destaque: false,
    tipo: "aluguel",
  },
  {
    id: "14",
    titulo: "Cobertura Duplex - Leblon",
    descricao: "Cobertura com terraço e piscina privativa",
    preco: "R$ 8.500/mês",
    imagem: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800&h=600&fit=crop",
    regiao: "Leblon",
    quartos: 4,
    area: "200m²",
    url: "#",
    destaque: true,
    tipo: "aluguel",
  },
  {
    id: "15",
    titulo: "Apartamento Novo - Tijuca",
    descricao: "Apartamento recém reformado próximo ao metrô",
    preco: "R$ 2.100/mês",
    imagem: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&h=600&fit=crop",
    regiao: "Tijuca",
    quartos: 2,
    area: "65m²",
    url: "#",
    destaque: false,
    tipo: "aluguel",
  },
  {
    id: "16",
    titulo: "Studio Moderno - Botafogo",
    descricao: "Studio completo em prédio novo",
    preco: "R$ 1.800/mês",
    imagem: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&h=600&fit=crop",
    regiao: "Botafogo",
    quartos: 1,
    area: "35m²",
    url: "#",
    destaque: false,
    tipo: "aluguel",
  },
];

// Function to update alugueis from API
export const updateAlugueisFromAPI = (apiAlugueis: Imovel[]) => {
  // Keep static entries (if needed)
  const estaticos = alugueis.slice(0, 6);
  
  // Add new entries from API
  alugueis.length = 0; 
  alugueis.push(...estaticos, ...apiAlugueis);
};

// Function to load alugueis from API
export const loadAlugueisFromAPI = async () => {
  try {
    const { imovelApi } = await import('../../utils/apiConfig');
    // Get rentals using the finalidade ID for "Aluguel"
    const apiImoveis = await imovelApi.getByFinalidadeId("6875aeb4b6b99837cba82feb");
    
    if (apiImoveis && apiImoveis.length > 0) {
      const imoveisForCards: Imovel[] = apiImoveis.map((imovel: any, index: number) => {
        return {
          id: imovel.id || `api-aluguel-${index}`,
          titulo: imovel.titulo || "Imóvel para Aluguel",
          descricao: imovel.descricaoImovel || "",
          preco: imovel.valor ? `R$ ${imovel.valor}/mês` : "Consulte",
          imagem: imovel.urlFotoCard || "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&h=600&fit=crop",
          regiao: imovel.regiaoId || "Região não informada",
          quartos: parseInt(imovel.quantidadeQuartos) || 1,
          quartosDisponiveis: imovel.quantidadeQuartos ? [parseInt(imovel.quantidadeQuartos)] : [1],
          area: imovel.areaQuadrada ? `${imovel.areaQuadrada}m²` : "N/A",
          areasDisponiveis: imovel.areaQuadrada ? [`${imovel.areaQuadrada}m²`] : ["N/A"],
          url: `/imovel/${imovel.id}`,
          destaque: true, // Can be adjusted based on API data if available
          tipo: "aluguel" as const,
        };
      });
      
      // Update alugueis array with API data
      updateAlugueisFromAPI(imoveisForCards);
    }
  } catch (error) {
    console.error('Erro ao carregar alugueis da API:', error);
  }
};

// Load alugueis automatically when module is imported
loadAlugueisFromAPI();
