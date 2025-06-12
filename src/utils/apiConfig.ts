
interface ApiConfig {
  baseUrl: string;
  apiKey: string;
  timeout: number;
}

/**
 * Classe para gerenciar configurações da API
 */
export class ApiConfigManager {
  private static readonly CONFIG_KEY = 'apiConfig';
  
  private static readonly DEFAULT_CONFIG: ApiConfig = {
    baseUrl: '',
    apiKey: '',
    timeout: 5000
  };

  /**
   * Obter configurações da API
   */
  static getConfig(): ApiConfig {
    try {
      const saved = localStorage.getItem(this.CONFIG_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        return { ...this.DEFAULT_CONFIG, ...parsed };
      }
    } catch (error) {
      console.error('Erro ao carregar configurações da API:', error);
    }
    return this.DEFAULT_CONFIG;
  }

  /**
   * Salvar configurações da API
   */
  static saveConfig(config: ApiConfig): void {
    try {
      localStorage.setItem(this.CONFIG_KEY, JSON.stringify(config));
    } catch (error) {
      console.error('Erro ao salvar configurações da API:', error);
      throw new Error('Não foi possível salvar as configurações');
    }
  }

  /**
   * Verificar se a API está configurada
   */
  static isConfigured(): boolean {
    const config = this.getConfig();
    return Boolean(config.baseUrl && config.apiKey);
  }

  /**
   * Obter headers padrão para requisições
   */
  static getHeaders(): Record<string, string> {
    const config = this.getConfig();
    return {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${config.apiKey}`,
    };
  }

  /**
   * Fazer requisição para a API com configurações automáticas
   */
  static async makeRequest(
    endpoint: string, 
    options: RequestInit = {}
  ): Promise<Response> {
    const config = this.getConfig();
    
    if (!this.isConfigured()) {
      throw new Error('API não configurada. Configure as variáveis de ambiente primeiro.');
    }

    const url = `${config.baseUrl}${endpoint}`;
    const requestOptions: RequestInit = {
      ...options,
      headers: {
        ...this.getHeaders(),
        ...options.headers,
      },
      signal: AbortSignal.timeout(config.timeout),
    };

    return fetch(url, requestOptions);
  }
}

export default ApiConfigManager;
