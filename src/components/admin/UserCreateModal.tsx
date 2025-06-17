
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { useApi } from "@/hooks/useApi";
import { Save } from "lucide-react";

interface UserFormData {
  nome: string;
  email: string;
  senha: string;
  telefone: string;
  isAdmin: string;
  isAtivo: boolean;
}

interface UserCreateModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onUserCreated: () => void;
}

export function UserCreateModal({ open, onOpenChange, onUserCreated }: UserCreateModalProps) {
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
    isAdmin: "N",
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
      await execute(async () => {
        console.log('Dados a serem enviados:', formData);
        return { success: true };
      });

      resetForm();
      onUserCreated();
      onOpenChange(false);
    } catch (error) {
      console.error('Erro ao cadastrar usuário:', error);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Novo Usuário</DialogTitle>
          <DialogDescription>
            Cadastre um novo corretor ou administrador no sistema.
          </DialogDescription>
        </DialogHeader>
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

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              disabled={loading}
            >
              Cancelar
            </Button>
            <Button
              type="submit"
              disabled={loading}
              className="flex items-center gap-2"
            >
              <Save className="h-4 w-4" />
              {loading ? "Cadastrando..." : "Cadastrar Usuário"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
