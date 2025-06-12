
/**
 * Configuração centralizada da API
 */
const API_CONFIG = {
  baseUrl: import.meta.env.VITE_API_BASE_URL || 'http://localhost:3001/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
};

/**
 * Classe para realizar requisições HTTP com configuração centralizada
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
   * Obter headers com token de autenticação
   */
  private getAuthHeaders(): Record<string, string> {
    const token = localStorage.getItem('token');
    return {
      ...this.defaultHeaders,
      ...(token && { Authorization: `Bearer ${token}` }),
    };
  }

  /**
   * Fazer requisição HTTP genérica
   */
  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const url = `${this.baseUrl}${endpoint}`;
    const config: RequestInit = {
      ...options,
      headers: {
        ...this.getAuthHeaders(),
        ...options.headers,
      },
      signal: AbortSignal.timeout(this.timeout),
    };

    try {
      const response = await fetch(url, config);
      
      if (!response.ok) {
        throw new Error(`HTTP Error: ${response.status} - ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      console.error('API Request Error:', error);
      throw error;
    }
  }

  /**
   * Métodos HTTP específicos
   */
  async get<T>(endpoint: string): Promise<T> {
    return this.request<T>(endpoint, { method: 'GET' });
  }

  async post<T>(endpoint: string, data?: any): Promise<T> {
    return this.request<T>(endpoint, {
      method: 'POST',
      body: data ? JSON.stringify(data) : undefined,
    });
  }

  async put<T>(endpoint: string, data?: any): Promise<T> {
    return this.request<T>(endpoint, {
      method: 'PUT',
      body: data ? JSON.stringify(data) : undefined,
    });
  }

  async delete<T>(endpoint: string): Promise<T> {
    return this.request<T>(endpoint, { method: 'DELETE' });
  }
}

// Instância única do cliente de API
export const apiClient = new ApiClient();

// Funções específicas para diferentes recursos
export const leadsApi = {
  getAll: (): Promise<any[]> => apiClient.get('/leads'),
  getById: (id: string): Promise<any> => apiClient.get(`/leads/${id}`),
  create: (data: any): Promise<any> => apiClient.post('/leads', data),
  update: (id: string, data: any): Promise<any> => apiClient.put(`/leads/${id}`, data),
  delete: (id: string): Promise<any> => apiClient.delete(`/leads/${id}`),
};

export const authApi = {
  login: (credentials: any): Promise<any> => apiClient.post('/auth/login', credentials),
  profile: (): Promise<any> => apiClient.get('/auth/profile'),
  updateProfile: (data: any): Promise<any> => apiClient.put('/auth/profile', data),
  changePassword: (data: any): Promise<any> => apiClient.put('/auth/profile/password', data),
};

export default apiClient;
