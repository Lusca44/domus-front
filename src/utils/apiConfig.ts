/**
 * CONFIGURAÇÃO CENTRALIZADA DA API COM AXIOS
 * 
 * Este arquivo contém toda a configuração para fazer requisições HTTP para o backend usando Axios.
 * É o ponto central onde você configura a URL base da sua API e outros parâmetros.
 */

import axios, { AxiosInstance, AxiosResponse, AxiosError } from 'axios';

const API_CONFIG = {
  baseUrl:  import.meta.env.VITE_API_BASE_URL || "http://localhost:8080/",
  timeout: 60000, // Tempo limite para requisições (10 segundos)
};

export class ApiClient {
  private axiosInstance: AxiosInstance;

  constructor() {
    // Criar instância do Axios com configurações padrão
    this.axiosInstance = axios.create({
      baseURL: API_CONFIG.baseUrl,
      timeout: API_CONFIG.timeout,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    // Configurar interceptors
    this.setupInterceptors();
  }

  /**
   * CONFIGURAÇÃO DOS INTERCEPTORS
   * 
   * Os interceptors permitem interceptar requisições e respostas automaticamente:
   * - Request interceptor: adiciona token de autenticação automaticamente
   * - Response interceptor: trata erros de forma consistente
   */
  private setupInterceptors(): void {
    // REQUEST INTERCEPTOR - Adiciona token de autenticação automaticamente
    this.axiosInstance.interceptors.request.use(
      (config) => {
        if (config.data instanceof FormData) {
          delete config.headers["Content-Type"];
        }
        // Obter token do localStorage
        const token = localStorage.getItem("token");

        // Adicionar token no header Authorization se existir
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }

        console.log(
          `🚀 Fazendo requisição: ${config.method?.toUpperCase()} ${config.url}`
        );
        return config;
      },
      (error) => {
        console.error("❌ Erro no request interceptor:", error);
        return Promise.reject(error);
      }
    );

    // RESPONSE INTERCEPTOR - Trata respostas e erros
    this.axiosInstance.interceptors.response.use(
      (response: AxiosResponse) => {
        console.log(
          `✅ Resposta recebida: ${response.status} - ${response.config.url}`
        );

        // Se a resposta não tem dados ou é vazia, retorna objeto vazio
        if (!response.data) {
          return {};
        }

        return response.data; // Retorna apenas os dados, não o objeto completo da resposta
      },
      (error: AxiosError) => {
        console.error("❌ Erro na resposta:", error);

        // Tratamento específico para diferentes tipos de erro
        if (error.response) {
          // Erro da API (4xx, 5xx)
          const status = error.response.status;
          const message = error.response.data || error.message;

          // Se for erro 401 (não autorizado), redirecionar para login
          if (status === 401) {
            localStorage.removeItem("token");
            localStorage.removeItem("user");
            window.location.href = "/admin/login";
          }

          throw new Error(`HTTP Error ${status}: ${message}`);
        } else if (error.request) {
          // Erro de rede (sem resposta)
          throw new Error(
            "Erro de conexão. Verifique sua internet e tente novamente."
          );
        } else {
          // Erro na configuração da requisição
          throw new Error(`Erro na requisição: ${error.message}`);
        }
      }
    );
  }

  /**
   * MÉTODOS PÚBLICOS HTTP
   *
   * Estes são os métodos que você usa nos componentes:
   * - get(): para buscar dados
   * - post(): para criar novos dados
   * - put(): para atualizar dados existentes
   * - delete(): para excluir dados
   */

  // GET: Buscar dados
  async get<T>(endpoint: string, params?: any): Promise<T> {
    return this.axiosInstance.get(endpoint, { params });
  }

  // POST: Criar novos dados
  async post<T>(endpoint: string, data?: any): Promise<T> {
    return this.axiosInstance.post(endpoint, data);
  }

  // PUT: Atualizar dados existentes
  async put<T>(endpoint: string, data?: any): Promise<T> {
    return this.axiosInstance.put(endpoint, data);
  }

  // DELETE: Excluir dados
  async delete<T>(endpoint: string): Promise<T> {
    return this.axiosInstance.delete(endpoint);
  }

  // PATCH: Atualização parcial
  async patch<T>(endpoint: string, data?: any): Promise<T> {
    return this.axiosInstance.patch(endpoint, data);
  }
}

// Instância única do cliente de API (padrão Singleton)
export const apiClient = new ApiClient();

/**
 * APIS ESPECÍFICAS PARA CADA RECURSO
 *
 * Aqui você define os endpoints específicos para cada funcionalidade.
 * ALTERE OS PATHS AQUI CONFORME SUA API:
 */

export interface LancamentoQueryParams {
  nomeLancamento?: string;
  isSemCorretor?: boolean;
  nomeCliente?: string;
  corretorId?: string;
}

/**
 * API PARA GERENCIAR LEADS
 *
 * IMPORTANTE: Altere os paths abaixo conforme sua API backend:
 * - Se sua API usa '/leads', mantenha assim
 * - Se usa '/api/leads', '/contacts', etc., altere aqui
 *
 * Exemplos de uso:
 * - leadsApi.create(dadosDoLead) // POST /api/leads
 * - leadsApi.getAll() // GET /api/leads
 */
export const leadsApi = {
  // GET /lancamento/obterLeads - Buscar todas as leads
  getAll: (params?: any): Promise<any[]> => apiClient.get('lancamento/obterLeads', params),

  // GET /lancamento/:id - Buscar lead específica
  getById: (id: string): Promise<any> => apiClient.get(`lancamento/${id}`),

  // GET /lancamento/:nomeLancamento - Buscar lead por nome do lançamento
  getByName: (nomeLancamento: string): Promise<any> => apiClient.get(`lancamento/${nomeLancamento}`),

  // POST /lancamento/cadastroLead - Criar nova lead (agora com email)
  create: (data: any): Promise<any> => apiClient.post('lancamento/cadastroLead', data),

  // PUT /lancamento/:id - Atualizar lead existente
  update: (id: string, data: any): Promise<any> => apiClient.put(`lancamento/atualizarLead/${id}`, data),

  // DELETE /lancamento/:id - Excluir lead
  delete: (id: string): Promise<any> => apiClient.delete(`lancamento/${id}`),

  // PATCH /lancamento/bulk-update - Atualização em lote de corretores
  bulkUpdateCorretor: (data: { leadIds: string[], corretorId: string | null }): Promise<any> => 
    apiClient.patch('lancamento/inserirCorretorLote', data),

  // GET /lancamento/obterLeads com filtros - Buscar leads com filtros
  getAllWithFilters: (filters: any): Promise<any[]> => 
    apiClient.get('lancamento/obterLeads', filters),
};

/**
 * API PARA AUTENTICAÇÃO
 *
 * Endpoints para login, perfil do usuário, etc.
 */
export const authApi = {
  // POST /auth/login - Fazer login
  login: (credentials: any): Promise<any> => apiClient.post('api/auth/login', credentials),

  // PUT /auth/profile - Atualizar perfil
  alterarSenha: (data: any): Promise<any> => apiClient.put('api/auth/alterarSenha', data),

  // GET /auth/profile - Buscar perfil do usuário
  profile: (): Promise<any> => apiClient.get('auth/profile'),

  // PUT /auth/profile - Atualizar perfil
  updateProfile: (data: any): Promise<any> => apiClient.put('auth/profile', data),
  
};

/**
 * API PARA GERENCIAR USUÁRIOS (ADMIN)
 * 
 * Endpoints para administradores gerenciarem usuários
 */
export const userApi = {
  // GET /users - Buscar todos os usuários
  getAll: (): Promise<any[]> => apiClient.get('users'),

  obterUsuarios: (): Promise<any> => apiClient.get("usuario/obterUsuarios"),

  // GET /users/:id - Buscar usuário específico
  getById: (id: string): Promise<any> => apiClient.get(`usuario/obterUsuario/${id}`),
  
  // GET /users/:id - Buscar usuário específico
  getAllByIds: (id: string[]): Promise<any> => apiClient.get(`usuario/obterUsuariosPorId`),

  // POST /users - Criar novo usuário
  create: (data: any): Promise<any> => apiClient.post('usuario/cadastroUsuario', data),

  // PUT /users/:id - Atualizar usuário
  update: (id: string, data: any): Promise<any> => apiClient.put(`usuario/editar/${id}`, data),

  // DELETE /users/:id - Excluir usuário
  delete: (id: string): Promise<any> => apiClient.delete(`usuario/deleteUsuario/${id}`),
  
  // PUT /users/:id - Desativa ou Ativa usuário
  alterarStatusUsuario: (id: string): Promise<any> => apiClient.put(`usuario/alterarStatusUsuarios/${id}`),
};

/**
 * API PARA GERENCIAR REGIAO
 * 
 * Endpoints para administradores gerenciarem usuários
 */
export const regiaoApi = {

  obterTodasRegioes: (): Promise<any> => apiClient.get("regiao/obterTodos"),

  getById: (id: string): Promise<any> => apiClient.get(`regiao/obterPorId/${id}`),
  
  create: (data: any): Promise<any> => apiClient.post('regiao/cadastrarRegiao', data),
  
  update: (id: string, data: any): Promise<any> => apiClient.put(`regiao/updateRegiao/${id}`, data),

  delete: (id: string): Promise<any> => apiClient.delete(`regiao/deletar/${id}`),
  
  alterarStatusDestaque: (id: string): Promise<any> => apiClient.put(`regiao/alterarStatus/${id}`),
};

/**
 * API PARA GERENCIAR TIPOLOGIA
 * 
 * Endpoints para administradores gerenciarem usuários
 */
export const tipologiaApi = {

  obterTodasTipologias: (): Promise<any> => apiClient.get("tipologia/obterTodos"),
  
  getById: (id: string): Promise<any> => apiClient.get(`tipologia/obterPorId/${id}`),
    
  create: (data: any): Promise<any> => apiClient.post('tipologia/criarTipologia', data),
    
  update: (id: string, data: any): Promise<any> => apiClient.put(`tipologia/updateTipologia/${id}`, data),

  delete: (id: string): Promise<any> => apiClient.delete(`tipologia/delteTipologia/${id}`),
};

/**
 * API PARA GERENCIAR IMOVEIS
 * 
 * Endpoints para administradores gerenciarem usuários
 */ 
export const imovelApi = {
  obterTodosImoveis: (): Promise<any> => apiClient.get("imovel/obterTodosImoveis"),

  getById: (id: string): Promise<any> => apiClient.get(`imovel/obterImovel/${id}`),
  
  getByFinalidadeId: (id: string): Promise<any> => apiClient.get(`imovel/obterImoveisPorFinalidade/${id}`),
  
  create: (data: any): Promise<any> => apiClient.post('imovel/cadastrarImovel', data),
  
  update: (id: string, data: any): Promise<any> => apiClient.put(`imovel/updateImovel/${id}`, data),

  delete: (id: string): Promise<any> => apiClient.delete(`imovel/deleteImovel/${id}`),
};

/**
 * API PARA GERENCIAR LANCAMENTOS
 * 
 * Endpoints para administradores gerenciarem usuários
 */
export const lancamentoApi = {
  obterTodosLancamentos: (): Promise<any> => apiClient.get("projeto-lancamento/obterTodosLancamentos"),

  getById: (id: string): Promise<any> => apiClient.get(`projeto-lancamento/obterLancamentoPorId/${id}`),
  
  create: (data: any): Promise<any> => apiClient.post('projeto-lancamento/criarLancamento', data),
  update: (id: string, data: any): Promise<any> => apiClient.put(`projeto-lancamento/updateLancamento/${id}`, data),
  delete: (id: string): Promise<any> => apiClient.delete(`projeto-lancamento/deleteLancamento/${id}`),
};

/**
 * API PARA GERENCIAR FINALIDADE
 * 
 * Endpoints para administradores gerenciarem usuários
 */
export const finalidadeApi = {
  obterTodasFinalidades: (): Promise<any> => apiClient.get("finalidade/obterTodasFinalidades"),

  getById: (id: string): Promise<any> => apiClient.get(`finalidade/obterFinalidadePorId/${id}`),
  
  create: (data: any): Promise<any> => apiClient.post('finalidade/cadastrarFinalidade', data),
  
  update: (id: string, data: any): Promise<any> => apiClient.put(`finalidade/updateFinalidade/${id}`, data),

  delete: (id: string): Promise<any> => apiClient.delete(`finalidade/deleteFinalidade/${id}`),
};

export const imagemApi = {
  
  salvarImagem: (file: any): Promise<any> => apiClient.post('imagem/salvarImagem', file),
  
  salvarMultiplasImagens: (files: File[]): Promise<string[]> => {
    const formData = new FormData();
    files.forEach(file => formData.append("files", file));
    return apiClient.post('imagem/salvarMultiplas', formData);
  }
};

export default apiClient;
