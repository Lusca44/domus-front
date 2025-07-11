import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Edit, User } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/hooks/useAuth";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { userApi, authApi } from "@/utils/apiConfig";
import { useTokenValidation } from "@/hooks/useTokenValidation";

interface UserProfile {
  id?: string;
  nome: string;
  email: string;
  telefone: string;
  isAdmin?: boolean;
  role?: string;
  ativo?: boolean;
  dataCadastro?: string;
  createdAt?: string;
}

interface EditFormData {
  name: string;
  email: string;
  phone: string;
}

interface PasswordFormData {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

const AdminProfile = () => {
  // Estados do componente
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [passwordModalOpen, setPasswordModalOpen] = useState(false);
  
  // Formulários
  const [editForm, setEditForm] = useState<EditFormData>({ 
    name: "", 
    email: "", 
    phone: "" 
  });
  const [passwordForm, setPasswordForm] = useState<PasswordFormData>({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  // Hooks
  const { toast } = useToast();
  const { authState, isLoading: authLoading } = useAuth();
  
  // Validação de token
  useTokenValidation();

  /**
   * Efeito para carregar o perfil quando a autenticação estiver pronta
   * Aguarda o carregamento da autenticação antes de fazer requisições
   */
  useEffect(() => {
    // Só executa quando a autenticação terminar de carregar
    if (!authLoading) {
      if (authState.isAuthenticated && authState.user?.id) {
        fetchProfile();
      } else {
        setIsLoading(false);
      }
    }
  }, [authLoading, authState.isAuthenticated, authState.user?.id]);

  /**
   * Busca os dados do perfil do usuário logado
   */
  const fetchProfile = async () => {
    if (!authState.user?.id) {
      toast({
        title: "Erro de autenticação",
        description: "Usuário não identificado. Faça login novamente.",
        variant: "destructive",
      });
      setIsLoading(false);
      return;
    }

    try {
      setIsLoading(true);
      
      // Buscar dados do perfil via API
      const profileData = await userApi.getById(authState.user.id);
      
      // Definir dados do perfil
      setProfile(profileData);
      
      // Preencher formulário de edição
      setEditForm({
        name: profileData.nome || "",
        email: profileData.email || "",
        phone: profileData.telefone || "",
      });

    } catch (error) {
      console.error("Erro ao carregar perfil:", error);
      
      // Em caso de erro, usar dados do authState como fallback
      if (authState.user) {
        setEditForm({
          name: authState.user.name || authState.user.nome || "",
          email: authState.user.email || "",
          phone: authState.user.telefone || "",
        });
      }
      
      toast({
        title: "Erro ao carregar perfil",
        description: "Alguns dados podem não estar atualizados.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Salva as alterações do perfil
   */
  const handleSaveProfile = async () => {
    try {
      
      const updateProfile = {
        nome: editForm.name,
        email: editForm.email,
        telefone: editForm.phone,
      }
      userApi.update(authState.user.id, updateProfile);
      
      setProfile(updateProfile);
      
      localStorage.setItem("user", JSON.stringify(updateProfile));
      
      toast({
        title: "Perfil atualizado",
        description: "Suas informações foram atualizadas com sucesso.",
      });
      
      setEditModalOpen(false);
    } catch (error) {
      console.error("Erro ao atualizar perfil:", error);
      toast({
        title: "Erro ao atualizar",
        description: "Não foi possível atualizar o perfil.",
        variant: "destructive",
      });
    }
  };

  /**
   * Altera a senha do usuário
   */
  const handleChangePassword = async () => {
    // Validar se as senhas coincidem
    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      toast({
        title: "Erro na senha",
        description: "As senhas não coincidem.",
        variant: "destructive",
      });
      return;
    }

    // Validar tamanho mínimo da senha
    if (passwordForm.newPassword.length < 6) {
      toast({
        title: "Erro na senha",
        description: "A nova senha deve ter pelo menos 6 caracteres.",
        variant: "destructive",
      });
      return;
    }

    try {
      const userData = profile || authState.user;

      const data = await authApi.alterarSenha({
        email: userData.email,
        senha: passwordForm.currentPassword,
        senhaNova: passwordForm.newPassword,
      });

      toast({
        description: data,
      });
      
      // Resetar formulário e fechar modal
      setPasswordModalOpen(false);
      setPasswordForm({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
    } catch (error) {
      console.error("Erro ao alterar senha:", error);
      toast({
        title: "Erro ao alterar senha",
        description: "Verifique se a senha atual está correta.",
        variant: "destructive",
      });
    }
  };

  /**
   * Renderiza dados do perfil ou fallback
   */
  const renderProfileData = () => {
    const userData = profile || authState.user;
    
    if (!userData) {
      return (
        <div className="text-center py-4">
          <p className="text-gray-500">Dados do usuário não encontrados.</p>
        </div>
      );
    }

    return (
      <>
        <div>
          <Label className="text-sm font-medium text-gray-500">Nome</Label>
          <p className="text-sm">{userData.nome || userData.name || "Não informado"}</p>
        </div>
        <div>
          <Label className="text-sm font-medium text-gray-500">Email</Label>
          <p className="text-sm">{userData.email || "Não informado"}</p>
        </div>
        <div>
          <Label className="text-sm font-medium text-gray-500">Telefone</Label>
          <p className="text-sm">{userData.telefone || "Não informado"}</p>
        </div>
        {profile && (
          <>
            <div>
              <Label className="text-sm font-medium text-gray-500">Função</Label>
              <p className="text-sm">{profile.role || "Usuário"}</p>
            </div>
            <div>
              <Label className="text-sm font-medium text-gray-500">Membro desde</Label>
              <p className="text-sm">
                {new Date(profile.createdAt || profile.dataCadastro).toLocaleDateString()}
              </p>
            </div>
          </>
        )}
        <Button onClick={() => setEditModalOpen(true)} className="w-full">
          <Edit className="h-4 w-4 mr-2" />
          Editar Informações
        </Button>
      </>
    );
  };

  // Loading state - aguardando autenticação ou carregamento do perfil
  if (authLoading || isLoading) {
    return (
      <AdminLayout>
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-pulse">Carregando perfil...</div>
          </div>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="max-w-4xl mx-auto py-6">
        {/* Cabeçalho da página */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Meu Perfil</h1>
          <p className="text-gray-600">
            Gerencie suas informações pessoais e configurações de segurança
          </p>
        </div>

        {/* Cards principais */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Card de Informações Pessoais */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <User className="h-5 w-5" />
                <span>Informações Pessoais</span>
              </CardTitle>
              <CardDescription>
                Visualize e edite suas informações pessoais
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {renderProfileData()}
            </CardContent>
          </Card>

          {/* Card de Segurança */}
          <Card>
            <CardHeader>
              <CardTitle>Segurança</CardTitle>
              <CardDescription>
                Gerencie sua senha e configurações de segurança
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button
                onClick={() => setPasswordModalOpen(true)}
                className="w-full"
                variant="outline"
              >
                Alterar Senha
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Modal de Edição do Perfil */}
        <Dialog open={editModalOpen} onOpenChange={setEditModalOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Editar Perfil</DialogTitle>
              <DialogDescription>
                Edite suas informações pessoais.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="name">Nome</Label>
                <Input
                  id="name"
                  value={editForm.name}
                  onChange={(e) =>
                    setEditForm({ ...editForm, name: e.target.value })
                  }
                  placeholder="Digite seu nome"
                />
              </div>
              <div>
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={editForm.email}
                  onChange={(e) =>
                    setEditForm({ ...editForm, email: e.target.value })
                  }
                  placeholder="Digite seu email"
                />
              </div>
              <div>
                <Label htmlFor="phone">Telefone</Label>
                <Input
                  id="phone"
                  value={editForm.phone}
                  onChange={(e) =>
                    setEditForm({ ...editForm, phone: e.target.value })
                  }
                  placeholder="Digite seu telefone"
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setEditModalOpen(false)}>
                Cancelar
              </Button>
              <Button onClick={handleSaveProfile}>Salvar</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Modal de Alteração de Senha */}
        <Dialog open={passwordModalOpen} onOpenChange={setPasswordModalOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Alterar Senha</DialogTitle>
              <DialogDescription>
                Digite sua senha atual e a nova senha.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="currentPassword">Senha Atual</Label>
                <Input
                  id="currentPassword"
                  type="password"
                  value={passwordForm.currentPassword}
                  onChange={(e) =>
                    setPasswordForm({
                      ...passwordForm,
                      currentPassword: e.target.value,
                    })
                  }
                  placeholder="Digite sua senha atual"
                />
              </div>
              <div>
                <Label htmlFor="newPassword">Nova Senha</Label>
                <Input
                  id="newPassword"
                  type="password"
                  value={passwordForm.newPassword}
                  onChange={(e) =>
                    setPasswordForm({
                      ...passwordForm,
                      newPassword: e.target.value,
                    })
                  }
                  placeholder="Digite a nova senha (mín. 6 caracteres)"
                />
              </div>
              <div>
                <Label htmlFor="confirmPassword">Confirmar Nova Senha</Label>
                <Input
                  id="confirmPassword"
                  type="password"
                  value={passwordForm.confirmPassword}
                  onChange={(e) =>
                    setPasswordForm({
                      ...passwordForm,
                      confirmPassword: e.target.value,
                    })
                  }
                  placeholder="Confirme a nova senha"
                />
              </div>
            </div>
            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => setPasswordModalOpen(false)}
              >
                Cancelar
              </Button>
              <Button onClick={handleChangePassword}>Alterar Senha</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </AdminLayout>
  );
};

export default AdminProfile;
