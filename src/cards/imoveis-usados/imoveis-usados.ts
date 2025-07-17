import { Imovel } from '../imoveis';

// Base imoveisUsados data
export let imoveisUsados: Imovel[] = [
  {
    id: "17",
    titulo: "Cobertura Duplex - Leblon",
    descricao: "Cobertura exclusiva com vista panorâmica",
    preco: "R$ 2.800.000",
    imagem: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800&h=600&fit=crop",
    regiao: "Leblon",
    quartos: 4,
    area: "180m²",
    url: "#",
    destaque: true,
    tipo: "imoveis-usados",
  },
  {
    id: "18",
    titulo: "Apartamento Novo - Tijuca",
    descricao: "Apartamento pronto para morar em excelente localização",
    preco: "R$ 580.000",
    imagem: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&h=600&fit=crop",
    regiao: "Tijuca",
    quartos: 2,
    area: "75m²",
    url: "#",
    destaque: true,
    tipo: "imoveis-usados",
  },
  {
    id: "19",
    titulo: "Casa Condomínio - Recreio",
    descricao: "Casa térrea em condomínio de alto padrão",
    preco: "R$ 1.200.000",
    imagem: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&h=600&fit=crop",
    regiao: "Recreio dos Bandeirantes",
    quartos: 3,
    area: "150m²",
    url: "#",
    destaque: false,
    tipo: "imoveis-usados",
  },
  {
    id: "20",
    titulo: "Apartamento Vista Mar - Copacabana",
    descricao: "Apartamento reformado com vista para o mar",
    preco: "R$ 1.500.000",
    imagem: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&h=600&fit=crop",
    regiao: "Copacabana",
    quartos: 3,
    area: "110m²",
    url: "#",
    destaque: true,
    tipo: "imoveis-usados",
  },
  {
    id: "21",
    titulo: "Studio Investimento - Ipanema",
    descricao: "Excelente oportunidade de investimento",
    preco: "R$ 450.000",
    imagem: "https://images.unsplash.com/photo-1484154218962-a197022b5858?w=800&h=600&fit=crop",
    regiao: "Ipanema",
    quartos: 1,
    area: "38m²",
    url: "#",
    destaque: false,
    tipo: "imoveis-usados",
  },
  {
    id: "22",
    titulo: "Casa Familiar - Barra da Tijuca",
    descricao: "Casa espaçosa para família grande",
    preco: "R$ 2.200.000",
    imagem: "https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=800&h=600&fit=crop",
    regiao: "Barra da Tijuca",
    quartos: 4,
    area: "220m²",
    url: "#",
    destaque: false,
    tipo: "imoveis-usados",
  },
];

// Function to update imoveisUsados from API
export const updateImoveisUsadosFromAPI = (apiImoveisUsados: Imovel[]) => {
  // Keep static entries (if needed)
  const estaticos = imoveisUsados.slice(0, 6);
  
  // Add new entries from API
  imoveisUsados.length = 0; 
  imoveisUsados.push(...estaticos, ...apiImoveisUsados);
};

// Function to load imoveisUsados from API
export const loadImoveisUsadosFromAPI = async () => {
  try {
    const { imovelApi } = await import('../../utils/apiConfig');
    // Get used properties using the finalidade ID for "Venda"
    const apiImoveis = await imovelApi.getByFinalidadeId("6875aeccb6b99837cba82fec");
    
    if (apiImoveis && apiImoveis.length > 0) {
      const imoveisForCards: Imovel[] = apiImoveis.map((imovel: any, index: number) => {
        return {
          id: imovel.id || `api-venda-${index}`,
          titulo: imovel.titulo || "Imóvel à Venda",
          descricao: imovel.descricaoImovel || "",
          preco: imovel.valor ? `R$ ${imovel.valor}` : "Consulte",
          imagem: imovel.urlFotoCard || "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800&h=600&fit=crop",
          regiao: imovel.regiaoId || "Região não informada",
          quartos: parseInt(imovel.quantidadeQuartos) || 1,
          quartosDisponiveis: imovel.quantidadeQuartos ? [parseInt(imovel.quantidadeQuartos)] : [1],
          area: imovel.areaQuadrada ? `${imovel.areaQuadrada}m²` : "N/A",
          areasDisponiveis: imovel.areaQuadrada ? [`${imovel.areaQuadrada}m²`] : ["N/A"],
          url: `/imovel/${imovel.id}`,
          destaque: true, // Can be adjusted based on API data if available
          tipo: "imoveis-usados" as const,
        };
      });
      
      // Update imoveisUsados array with API data
      updateImoveisUsadosFromAPI(imoveisForCards);
    }
  } catch (error) {
    console.error('Erro ao carregar imóveis usados da API:', error);
  }
};

// Load imoveisUsados automatically when module is imported
loadImoveisUsadosFromAPI();
