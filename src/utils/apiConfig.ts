/**
 * CONFIGURAÇÃO CENTRALIZADA DA API COM AXIOS
 * 
 * Este arquivo contém toda a configuração para fazer requisições HTTP para o backend usando Axios.
 * É o ponto central onde você configura a URL base da sua API e outros parâmetros.
 */

import axios, { AxiosInstance, AxiosResponse, AxiosError } from 'axios';

/**
 * CONFIGURAÇÃO PRINCIPAL - ALTERE AQUI SUA URL DO BACKEND
 *
 * baseUrl: URL base do seu servidor backend
 * - Em desenvolvimento: geralmente 'http://localhost:3001/api' ou 'http://localhost:8000/api'
 * - Em produção: sua URL real como 'https://meubackend.com/api'
 *
 * Para usar variável de ambiente, crie um arquivo .env.local na raiz do projeto com:
 * VITE_API_BASE_URL=https://sua-api.com/api
 */
const API_CONFIG = {
  baseUrl: "http://localhost:8080/",
  // baseUrl: import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080/',
  timeout: 10000, // Tempo limite para requisições (10 segundos)
};

/**
 * CLASSE PRINCIPAL PARA REQUISIÇÕES HTTP COM AXIOS
 * 
 * Esta classe encapsula toda a lógica de comunicação com o backend:
 * - Adiciona automaticamente o token de autenticação via interceptors
 * - Trata erros de forma consistente
 * - Aplica timeout nas requisições
 * - Centraliza a configuração de headers
 */
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
        // Obter token do localStorage
        const token = localStorage.getItem('token');
        
        // Adicionar token no header Authorization se existir
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }

        console.log(`🚀 Fazendo requisição: ${config.method?.toUpperCase()} ${config.url}`);
        return config;
      },
      (error) => {
        console.error('❌ Erro no request interceptor:', error);
        return Promise.reject(error);
      }
    );

    // RESPONSE INTERCEPTOR - Trata respostas e erros
    this.axiosInstance.interceptors.response.use(
      (response: AxiosResponse) => {
        console.log(`✅ Resposta recebida: ${response.status} - ${response.config.url}`);
        
        // Se a resposta não tem dados ou é vazia, retorna objeto vazio
        if (!response.data) {
          return {};
        }
        
        return response.data; // Retorna apenas os dados, não o objeto completo da resposta
      },
      (error: AxiosError) => {
        console.error('❌ Erro na resposta:', error);
        
        // Tratamento específico para diferentes tipos de erro
        if (error.response) {
          // Erro da API (4xx, 5xx)
          const status = error.response.status;
          const message = error.response.data || error.message;
          
          // Se for erro 401 (não autorizado), redirecionar para login
          if (status === 401) {
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            window.location.href = '/admin/login';
          }
          
          throw new Error(`HTTP Error ${status}: ${message}`);
        } else if (error.request) {
          // Erro de rede (sem resposta)
          throw new Error('Erro de conexão. Verifique sua internet e tente novamente.');
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
  update: (id: string, data: any): Promise<any> => apiClient.put(`lancamento/${id}`, data),

  // DELETE /lancamento/:id - Excluir lead
  delete: (id: string): Promise<any> => apiClient.delete(`lancamento/${id}`),

  // PATCH /lancamento/bulk-update - Atualização em lote de corretores
  bulkUpdateCorretor: (data: { leadIds: string[], newCorretorId: string | null }): Promise<any> => 
    apiClient.patch('lancamento/bulk-update-corretor', data),

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

  // GET /auth/profile - Buscar perfil do usuário
  profile: (): Promise<any> => apiClient.get('auth/profile'),

  // PUT /auth/profile - Atualizar perfil
  updateProfile: (data: any): Promise<any> => apiClient.put('auth/profile', data),

  // PUT /auth/profile/password - Alterar senha
  changePassword: (data: any): Promise<any> => apiClient.put('auth/profile/password', data),
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

  // POST /users - Criar novo usuário
  create: (data: any): Promise<any> => apiClient.post('cadastroUsuario', data),

  // PUT /users/:id - Atualizar usuário
  update: (id: string, data: any): Promise<any> => apiClient.put(`users/${id}`, data),

  // DELETE /users/:id - Excluir usuário
  delete: (id: string): Promise<any> => apiClient.delete(`users/${id}`),
};

export default apiClient;
