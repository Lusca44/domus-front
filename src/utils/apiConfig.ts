// Mock implementation if needed
export const imovelApi = {
  getByFinalidadeId: async (finalidadeId: string) => {
    try {
      // Try to use supabase if available
      const { supabase, isSupabaseConfigured } = await import('../integrations/supabase/client');
      
      if (isSupabaseConfigured) {
        const { data, error } = await supabase
          .from('imoveis')
          .select('*')
          .eq('finalidadeId', finalidadeId);
          
        if (error) {
          console.error('Erro ao buscar imóveis por finalidade:', error);
          return [];
        }
        
        return data || [];
      } else {
        console.log('Supabase não configurado, usando dados mock para getByFinalidadeId');
        // Return mock data if Supabase is not configured
        return [
          {
            id: `mock-${finalidadeId}-1`,
            titulo: `Imóvel ${finalidadeId === '6875aeb4b6b99837cba82feb' ? 'para Aluguel' : 'à Venda'} 1`,
            descricaoImovel: "Excelente imóvel em localização privilegiada",
            valor: finalidadeId === '6875aeb4b6b99837cba82feb' ? "2500" : "450000",
            urlFotoCard: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&h=600&fit=crop",
            regiaoId: "Porto Maravilha",
            quantidadeQuartos: "2",
            areaQuadrada: "65"
          },
          {
            id: `mock-${finalidadeId}-2`,
            titulo: `Imóvel ${finalidadeId === '6875aeb4b6b99837cba82feb' ? 'para Aluguel' : 'à Venda'} 2`,
            descricaoImovel: "Ótima oportunidade no coração da cidade",
            valor: finalidadeId === '6875aeb4b6b99837cba82feb' ? "3200" : "780000",
            urlFotoCard: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&h=600&fit=crop",
            regiaoId: "Barra da Tijuca",
            quantidadeQuartos: "3",
            areaQuadrada: "85"
          }
        ];
      }
    } catch (error) {
      console.error('Erro ao carregar imóveis por finalidade:', error);
      return [];
    }
  },
  
  // Add other methods as needed for the imovel API
  obterImovelPorId: async (id: string) => {
    try {
      // Try to use supabase if available
      const { supabase, isSupabaseConfigured } = await import('../integrations/supabase/client');
      
      if (isSupabaseConfigured) {
        const { data, error } = await supabase
          .from('imoveis')
          .select('*')
          .eq('id', id)
          .single();
          
        if (error) {
          console.error('Erro ao buscar imóvel por id:', error);
          return null;
        }
        
        return data;
      } else {
        console.log('Supabase não configurado, usando dados mock para obterImovelPorId');
        // Return mock data if Supabase is not configured
        return {
          id: id,
          titulo: "Imóvel Modelo",
          urlFotoCard: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&h=600&fit=crop",
          urlsFotos: [
            "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&h=600&fit=crop",
            "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&h=600&fit=crop",
            "https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=800&h=600&fit=crop"
          ],
          finalidadeId: ["Aluguel"],
          tipologiaId: ["Apartamento"],
          regiaoId: "Porto Maravilha",
          endereco: "Rua Exemplo, 123 - Rio de Janeiro",
          quantidadeQuartos: "2",
          quantidadeBanheiros: "2",
          quantidadeVagas: "1",
          quantidadeSuites: "1",
          areaQuadrada: "70",
          descricaoImovel: "Excelente imóvel com vista para o mar, próximo a todos os serviços e transporte público.",
          valor: "3500",
          valorCondominio: "800",
          valorIptu: "200",
          urlLocalizacaoMaps: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3675.2961758225746!2d-43.19587248503514!3d-22.905755985013192!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x997f5e8c1348d9%3A0x57137a9792bce241!2sPorto%20Maravilha%2C%20Rio%20de%20Janeiro%20-%20RJ!5e0!3m2!1spt-BR!2sbr!4v1625851863817!5m2!1spt-BR!2sbr"
        };
      }
    } catch (error) {
      console.error('Erro ao carregar imóvel por id:', error);
      return null;
    }
  },
};

// Add lancamentoApi if not already present
export const lancamentoApi = {
  obterTodosLancamentos: async () => {
    try {
      // Try to use supabase if available
      const { supabase, isSupabaseConfigured } = await import('../integrations/supabase/client');
      
      if (isSupabaseConfigured) {
        const { data, error } = await supabase
          .from('lancamentos')
          .select('*');
          
        if (error) {
          console.error('Erro ao buscar lançamentos:', error);
          return [];
        }
        
        return data || [];
      } else {
        console.log('Supabase não configurado, usando dados mock para obterTodosLancamentos');
        // Return mock data if Supabase is not configured
        return [
          {
            id: "mock-lancamento-1",
            nomeLancamento: "Residencial Exemplo",
            slogan: "O melhor lugar para morar",
            sobreLancamento: {
              texto: "Empreendimento exclusivo com toda a infraestrutura que você precisa."
            },
            cardLancamentoInfo: {
              valor: "450000",
              urlImagemCard: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&h=600&fit=crop",
              quartosDisponiveis: ["1", "2", "3"],
              areasDisponiveis: ["45", "65", "90"],
              isCardDestaque: true,
              statusObra: "Em obras"
            }
          },
          {
            id: "mock-lancamento-2",
            nomeLancamento: "Edifício Vista Mar",
            slogan: "Viva com mais qualidade",
            sobreLancamento: {
              texto: "Apartamentos com vista para o mar e total infraestrutura de lazer."
            },
            cardLancamentoInfo: {
              valor: "780000",
              urlImagemCard: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&h=600&fit=crop",
              quartosDisponiveis: ["2", "3", "4"],
              areasDisponiveis: ["70", "95", "120"],
              isCardDestaque: true,
              statusObra: "Lançamento"
            }
          }
        ];
      }
    } catch (error) {
      console.error('Erro ao carregar lançamentos:', error);
      return [];
    }
  }
};
