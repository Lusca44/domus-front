
import { useState } from "react";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { ProtectedRoute } from "@/components/admin/ProtectedRoute";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/hooks/use-toast";
import { useApi } from "@/hooks/useApi";
import { UserPlus, Save } from "lucide-react";

interface UserFormData {
  nome: string;
  email: string;
  senha: string;
  telefone: string;
  isAdmin: string;
  isAtivo: boolean;
}

const AdminUsers = () => {
  const { toast } = useToast();
  const { loading, execute } = useApi({
    showSuccessToast: true,
    successMessage: "Usuário cadastrado com sucesso!",
  });

  const [formData, setFormData] = useState<UserFormData>({
    nome: "",
    email: "",
    senha: "",
    telefone: "",
    isAdmin: "N", // 'S' para admin, 'N' para corretor
    isAtivo: true,
  });

  const handleInputChange = (field: keyof UserFormData, value: string | boolean) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const resetForm = () => {
    setFormData({
      nome: "",
      email: "",
      senha: "",
      telefone: "",
      isAdmin: "N",
      isAtivo: true,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.nome || !formData.email || !formData.senha) {
      toast({
        title: "Erro de validação",
        description: "Nome, email e senha são obrigatórios.",
        variant: "destructive",
      });
      return;
    }

    try {
      // TODO: Implementar a chamada real para sua API de cadastro de usuários
      // A estrutura do objeto já está compatível com seu backend
      await execute(async () => {
        // Exemplo de como fazer a requisição:
        // const response = await fetch('SUA_URL_API/usuarios', {
        //   method: 'POST',
        //   headers: {
        //     'Content-Type': 'application/json',
        //   },
        //   body: JSON.stringify({
        //     ...formData,
        //     dataCadastro: new Date().toISOString().split('T')[0], // formato yyyy-MM-dd
        //   })
        // });
        // 
        // if (!response.ok) {
        //   throw new Error('Erro ao cadastrar usuário');
        // }
        // 
        // return await response.json();
        
        // Por enquanto, simular sucesso
        console.log('Dados a serem enviados:', formData);
        return { success: true };
      });

      resetForm();
    } catch (error) {
      console.error('Erro ao cadastrar usuário:', error);
    }
  };

  return (
    <ProtectedRoute>
      <AdminLayout>
        <div className="space-y-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              Cadastrar Usuários
            </h2>
            <p className="text-gray-600">
              Cadastre novos corretores ou administradores no sistema.
            </p>
          </div>

          <Card className="max-w-2xl">
            <CardHeader>
              <div className="flex items-center space-x-2">
                <UserPlus className="h-6 w-6 text-blue-600" />
                <CardTitle>Novo Usuário</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="nome">Nome *</Label>
                    <Input
                      id="nome"
                      type="text"
                      value={formData.nome}
                      onChange={(e) => handleInputChange("nome", e.target.value)}
                      placeholder="Nome completo"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">Email *</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleInputChange("email", e.target.value)}
                      placeholder="email@exemplo.com"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="senha">Senha *</Label>
                    <Input
                      id="senha"
                      type="password"
                      value={formData.senha}
                      onChange={(e) => handleInputChange("senha", e.target.value)}
                      placeholder="Digite a senha"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="telefone">Telefone</Label>
                    <Input
                      id="telefone"
                      type="tel"
                      value={formData.telefone}
                      onChange={(e) => handleInputChange("telefone", e.target.value)}
                      placeholder="(11) 99999-9999"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="tipo">Tipo de Usuário</Label>
                    <Select
                      value={formData.isAdmin}
                      onValueChange={(value) => handleInputChange("isAdmin", value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione o tipo" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="N">Corretor Opcionista</SelectItem>
                        <SelectItem value="S">Administrador</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Switch
                      id="isAtivo"
                      checked={formData.isAtivo}
                      onCheckedChange={(checked) => handleInputChange("isAtivo", checked)}
                    />
                    <Label htmlFor="isAtivo">Usuário ativo</Label>
                  </div>
                </div>

                <div className="flex gap-4 pt-4">
                  <Button
                    type="submit"
                    disabled={loading}
                    className="flex items-center gap-2"
                  >
                    <Save className="h-4 w-4" />
                    {loading ? "Cadastrando..." : "Cadastrar Usuário"}
                  </Button>
                  
                  <Button
                    type="button"
                    variant="outline"
                    onClick={resetForm}
                    disabled={loading}
                  >
                    Limpar Formulário
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>

          <div className="mt-8 p-4 bg-blue-50 rounded-lg">
            <h3 className="font-medium text-blue-900 mb-2">Informações importantes:</h3>
            <ul className="text-sm text-blue-800 space-y-1">
              <li>• <strong>Corretores Opcionistas:</strong> Usuários com isAdmin = 'N'</li>
              <li>• <strong>Administradores:</strong> Usuários com isAdmin = 'S'</li>
              <li>• A data de cadastro será definida automaticamente</li>
              <li>• Usuários inativos não poderão fazer login no sistema</li>
            </ul>
          </div>
        </div>
      </AdminLayout>
    </ProtectedRoute>
  );
};

export default AdminUsers;
