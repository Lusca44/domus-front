
/**
 * CONFIGURAÇÃO CENTRALIZADA DA API
 * 
 * Este arquivo contém toda a configuração para fazer requisições HTTP para o backend.
 * É o ponto central onde você configura a URL base da sua API e outros parâmetros.
 */

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
  baseUrl: import.meta.env.VITE_API_BASE_URL || 'http://localhost:3001/api',
  timeout: 10000, // Tempo limite para requisições (10 segundos)
  headers: {
    'Content-Type': 'application/json', // Tipo de conteúdo padrão
  },
};

/**
 * CLASSE PRINCIPAL PARA REQUISIÇÕES HTTP
 * 
 * Esta classe encapsula toda a lógica de comunicação com o backend:
 * - Adiciona automaticamente o token de autenticação
 * - Trata erros de forma consistente
 * - Aplica timeout nas requisições
 * - Centraliza a configuração de headers
 */
export class ApiClient {
  private baseUrl: string;
  private timeout: number;
  private defaultHeaders: Record<string, string>;

  constructor() {
    this.baseUrl = API_CONFIG.baseUrl;
    this.timeout = API_CONFIG.timeout;
    this.defaultHeaders = API_CONFIG.headers;
  }

  /**
   * MÉTODO PRIVADO: Obter headers com token de autenticação
   * 
   * Automaticamente pega o token do localStorage e adiciona no header Authorization
   * Formato: "Bearer seu-token-aqui"
   */
  private getAuthHeaders(): Record<string, string> {
    const token = localStorage.getItem('token');
    return {
      ...this.defaultHeaders,
      ...(token && { Authorization: `Bearer ${token}` }),
    };
  }

  /**
   * MÉTODO PRIVADO: Fazer requisição HTTP genérica
   * 
   * Este método é usado internamente por GET, POST, PUT, DELETE
   * - Adiciona automaticamente os headers de autenticação
   * - Aplica timeout para evitar requisições infinitas
   * - Trata erros HTTP de forma consistente
   * - Converte automaticamente a resposta para JSON
   */
  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    // Monta a URL completa: baseUrl + endpoint
    const url = `${this.baseUrl}${endpoint}`;
    
    // Configuração da requisição
    const config: RequestInit = {
      ...options,
      headers: {
        ...this.getAuthHeaders(), // Headers com autenticação
        ...options.headers, // Headers específicos da requisição
      },
      signal: AbortSignal.timeout(this.timeout), // Timeout automático
    };

    try {
      console.log(`📡 Fazendo requisição para: ${url}`);
      const response = await fetch(url, config);
      
      // Verificar se a resposta foi bem-sucedida (status 200-299)
      if (!response.ok) {
        throw new Error(`HTTP Error: ${response.status} - ${response.statusText}`);
      }

      const data = await response.json();
      console.log(`✅ Resposta recebida:`, data);
      return data;
    } catch (error) {
      console.error('❌ Erro na requisição:', error);
      throw error; // Re-lança o erro para ser tratado pelo componente
    }
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
  async get<T>(endpoint: string): Promise<T> {
    return this.request<T>(endpoint, { method: 'GET' });
  }

  // POST: Criar novos dados
  async post<T>(endpoint: string, data?: any): Promise<T> {
    return this.request<T>(endpoint, {
      method: 'POST',
      body: data ? JSON.stringify(data) : undefined,
    });
  }

  // PUT: Atualizar dados existentes
  async put<T>(endpoint: string, data?: any): Promise<T> {
    return this.request<T>(endpoint, {
      method: 'PUT',
      body: data ? JSON.stringify(data) : undefined,
    });
  }

  // DELETE: Excluir dados
  async delete<T>(endpoint: string): Promise<T> {
    return this.request<T>(endpoint, { method: 'DELETE' });
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
  // GET /api/leads - Buscar todas as leads
  getAll: (): Promise<any[]> => apiClient.get('/leads'),
  
  // GET /api/leads/:id - Buscar lead específica
  getById: (id: string): Promise<any> => apiClient.get(`/leads/${id}`),
  
  // POST /api/leads - Criar nova lead
  // ESTE É O MÉTODO QUE VOCÊ VAI USAR NO FORMULÁRIO
  create: (data: any): Promise<any> => apiClient.post('/leads', data),
  
  // PUT /api/leads/:id - Atualizar lead existente
  update: (id: string, data: any): Promise<any> => apiClient.put(`/leads/${id}`, data),
  
  // DELETE /api/leads/:id - Excluir lead
  delete: (id: string): Promise<any> => apiClient.delete(`/leads/${id}`),
};

/**
 * API PARA AUTENTICAÇÃO
 * 
 * Endpoints para login, perfil do usuário, etc.
 */
export const authApi = {
  // POST /api/auth/login - Fazer login
  login: (credentials: any): Promise<any> => apiClient.post('/auth/login', credentials),
  
  // GET /api/auth/profile - Buscar perfil do usuário
  profile: (): Promise<any> => apiClient.get('/auth/profile'),
  
  // PUT /api/auth/profile - Atualizar perfil
  updateProfile: (data: any): Promise<any> => apiClient.put('/auth/profile', data),
  
  // PUT /api/auth/profile/password - Alterar senha
  changePassword: (data: any): Promise<any> => apiClient.put('/auth/profile/password', data),
};

export default apiClient;
