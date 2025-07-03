
import { apiClient } from '@/utils/apiConfig';
import { LandingPageData, LandingPageFormData } from '@/types/landingPage';

/**
 * API para gerenciar Landing Pages dinâmicas
 * AJUSTE OS ENDPOINTS CONFORME SUA API BACKEND
 */
export const landingPageApi = {
  // GET /landing-pages - Buscar todas as landing pages
  getAll: (): Promise<LandingPageData[]> => apiClient.get('landing-pages'),

  // GET /landing-pages/:id - Buscar landing page específica
  getById: (id: string): Promise<LandingPageData> => apiClient.get(`landing-pages/${id}`),

  // GET /landing-pages/slug/:slug - Buscar landing page por slug
  getBySlug: (slug: string): Promise<LandingPageData> => apiClient.get(`landing-pages/slug/${slug}`),

  // POST /landing-pages - Criar nova landing page
  create: (data: LandingPageFormData): Promise<LandingPageData> => apiClient.post('landing-pages', data),

  // PUT /landing-pages/:id - Atualizar landing page
  update: (id: string, data: Partial<LandingPageFormData>): Promise<LandingPageData> => 
    apiClient.put(`landing-pages/${id}`, data),

  // DELETE /landing-pages/:id - Excluir landing page
  delete: (id: string): Promise<void> => apiClient.delete(`landing-pages/${id}`),

  // PUT /landing-pages/:id/status - Alterar status
  updateStatus: (id: string, status: 'ativo' | 'inativo' | 'rascunho'): Promise<LandingPageData> =>
    apiClient.put(`landing-pages/${id}/status`, { status }),
};
