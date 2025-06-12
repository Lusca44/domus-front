
import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Save, Eye, EyeOff, LogOut } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface ApiConfig {
  baseUrl: string;
  apiKey: string;
  timeout: number;
}

const AdminSettings = () => {
  const [config, setConfig] = useState<ApiConfig>({
    baseUrl: '',
    apiKey: '',
    timeout: 5000
  });
  const [showApiKey, setShowApiKey] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    // Verificar se o usuário está autenticado
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/admin/login");
      return;
    }
    loadConfig();
  }, [navigate]);

  const loadConfig = () => {
    // Carregar configurações do localStorage
    const savedConfig = localStorage.getItem("apiConfig");
    if (savedConfig) {
      try {
        const parsedConfig = JSON.parse(savedConfig);
        setConfig(parsedConfig);
      } catch (error) {
        console.error("Erro ao carregar configurações:", error);
      }
    }
  };

  const handleSave = async () => {
    setIsLoading(true);
    
    try {
      // Validações básicas
      if (!config.baseUrl.trim()) {
        toast({
          title: "Erro de validação",
          description: "URL base da API é obrigatória.",
          variant: "destructive",
        });
        return;
      }

      if (!config.apiKey.trim()) {
        toast({
          title: "Erro de validação",
          description: "Chave da API é obrigatória.",
          variant: "destructive",
        });
        return;
      }

      // Validar formato da URL
      try {
        new URL(config.baseUrl);
      } catch {
        toast({
          title: "Erro de validação",
          description: "URL base deve ter formato válido (ex: https://api.exemplo.com).",
          variant: "destructive",
        });
        return;
      }

      // Salvar no localStorage
      localStorage.setItem("apiConfig", JSON.stringify(config));
      
      toast({
        title: "Configurações salvas",
        description: "As configurações da API foram salvas com sucesso.",
      });

    } catch (error) {
      toast({
        title: "Erro ao salvar",
        description: "Não foi possível salvar as configurações.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleTestConnection = async () => {
    if (!config.baseUrl.trim()) {
      toast({
        title: "Configuração incompleta",
        description: "Configure a URL base antes de testar a conexão.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch(`${config.baseUrl}/health`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${config.apiKey}`,
          'Content-Type': 'application/json',
        },
        signal: AbortSignal.timeout(config.timeout),
      });

      if (response.ok) {
        toast({
          title: "Conexão bem-sucedida",
          description: "A API está respondendo corretamente.",
        });
      } else {
        toast({
          title: "Erro na conexão",
          description: `API retornou status ${response.status}`,
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Erro de conexão",
        description: "Não foi possível conectar com a API. Verifique a URL e as configurações.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/admin/login");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <Link to="/admin/dashboard">
                <Button variant="ghost" size="sm">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Voltar
                </Button>
              </Link>
              <h1 className="text-xl font-semibold text-gray-900">
                Configurações da API
              </h1>
            </div>
            <Button variant="outline" size="sm" onClick={handleLogout}>
              <LogOut className="h-4 w-4 mr-2" />
              Sair
            </Button>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto py-6 sm:px-6 lg:px-8">
        <Card>
          <CardHeader>
            <CardTitle>Configurações de Conexão com API</CardTitle>
            <CardDescription>
              Configure as variáveis de ambiente para conectar com sua API externa.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            
            {/* URL Base da API */}
            <div className="space-y-2">
              <Label htmlFor="baseUrl">URL Base da API *</Label>
              <Input
                id="baseUrl"
                placeholder="https://api.exemplo.com"
                value={config.baseUrl}
                onChange={(e) => setConfig(prev => ({ ...prev, baseUrl: e.target.value }))}
              />
              <p className="text-sm text-gray-500">
                URL completa do seu servidor de API (incluindo protocolo https://)
              </p>
            </div>

            {/* Chave da API */}
            <div className="space-y-2">
              <Label htmlFor="apiKey">Chave da API *</Label>
              <div className="relative">
                <Input
                  id="apiKey"
                  type={showApiKey ? "text" : "password"}
                  placeholder="sua-chave-da-api-aqui"
                  value={config.apiKey}
                  onChange={(e) => setConfig(prev => ({ ...prev, apiKey: e.target.value }))}
                  className="pr-10"
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                  onClick={() => setShowApiKey(!showApiKey)}
                >
                  {showApiKey ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </Button>
              </div>
              <p className="text-sm text-gray-500">
                Token de autenticação para acessar sua API
              </p>
            </div>

            {/* Timeout */}
            <div className="space-y-2">
              <Label htmlFor="timeout">Timeout (ms)</Label>
              <Input
                id="timeout"
                type="number"
                placeholder="5000"
                min="1000"
                max="30000"
                value={config.timeout}
                onChange={(e) => setConfig(prev => ({ ...prev, timeout: parseInt(e.target.value) || 5000 }))}
              />
              <p className="text-sm text-gray-500">
                Tempo limite para requisições em milissegundos (padrão: 5000ms)
              </p>
            </div>

            {/* Botões de Ação */}
            <div className="flex space-x-4 pt-4">
              <Button onClick={handleSave} disabled={isLoading}>
                <Save className="h-4 w-4 mr-2" />
                {isLoading ? "Salvando..." : "Salvar Configurações"}
              </Button>
              
              <Button 
                variant="outline" 
                onClick={handleTestConnection} 
                disabled={isLoading || !config.baseUrl}
              >
                {isLoading ? "Testando..." : "Testar Conexão"}
              </Button>
            </div>

            {/* Informações Importantes */}
            <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-md">
              <h4 className="text-sm font-medium text-yellow-800 mb-2">
                ⚠️ Informações Importantes:
              </h4>
              <ul className="text-sm text-yellow-700 space-y-1">
                <li>• As configurações são salvas localmente no navegador</li>
                <li>• Para maior segurança, considere usar variáveis de ambiente no servidor</li>
                <li>• O teste de conexão tentará acessar o endpoint `/health` da sua API</li>
                <li>• Certifique-se de que sua API aceita requisições CORS do domínio atual</li>
              </ul>
            </div>

          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default AdminSettings;
