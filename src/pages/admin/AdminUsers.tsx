import { useState, useEffect } from "react";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { ProtectedRoute } from "@/components/admin/ProtectedRoute";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { UserPlus, Users, Edit, Trash2 } from "lucide-react";
import { useApi } from "@/hooks/useApi";
import { userApi } from "@/utils/apiConfig";
import { UserCreateModal } from "@/components/admin/UserCreateModal";
import { UserEditModal } from "@/components/admin/UserEditModal";
import { UserDeleteModal } from "@/components/admin/UserDeleteModal";
import { useTokenValidation } from "@/hooks/useTokenValidation";

interface User {
  id: string;
  nome: string;
  email: string;
  telefone?: string;
  isAdmin: boolean;
  ativo: boolean;
  dataCadastro: string;
}

const AdminUsers = () => {
  // Validação de token
  useTokenValidation();

  const [users, setUsers] = useState<User[]>([]);
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  const { loading: loadingUsers, execute: executeGetUsers } = useApi<User[]>({
    showErrorToast: true,
    errorMessage: "Erro ao carregar usuários",
  });

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const data = await executeGetUsers(() => userApi.obterUsuarios());
      setUsers(data || []);
    } catch (error) {
      console.error("Erro ao buscar usuários:", error);
    }
  };

  const handleUserCreated = () => {
    fetchUsers(); // Recarregar a lista após criar usuário
  };

  const handleUserUpdated = () => {
    fetchUsers(); // Recarregar a lista após atualizar usuário
  };

  const handleUserDeleted = () => {
    fetchUsers(); // Recarregar a lista após excluir usuário
  };

  const handleEdit = (user: User) => {
    setSelectedUser(user);
    setEditModalOpen(true);
  };

  const handleDelete = (user: User) => {
    setSelectedUser(user);
    setDeleteModalOpen(true);
  };

  return (
    <ProtectedRoute>
      <AdminLayout>
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                Gerenciar Usuários
              </h2>
              <p className="text-gray-600">
                Liste e gerencie todos os usuários do sistema.
              </p>
            </div>
            <Button
              onClick={() => setCreateModalOpen(true)}
              className="flex items-center gap-2"
            >
              <UserPlus className="h-4 w-4" />
              Novo Usuário
            </Button>
          </div>

          <Card>
            <CardHeader>
              <div className="flex items-center space-x-2">
                <Users className="h-6 w-6 text-blue-600" />
                <CardTitle>Lista de Usuários</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              {loadingUsers ? (
                <div className="text-center py-8">Carregando usuários...</div>
              ) : users.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                  Nenhum usuário encontrado
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left p-3">Nome</th>
                        <th className="text-left p-3">Email</th>
                        <th className="text-left p-3">Telefone</th>
                        <th className="text-left p-3">Tipo</th>
                        <th className="text-left p-3">Status</th>
                        <th className="text-left p-3">Data Cadastro</th>
                        <th className="text-left p-3">Ações</th>
                      </tr>
                    </thead>
                    <tbody>
                      {users.map((user) => (
                        <tr key={user.id} className="border-b hover:bg-gray-50">
                          <td className="p-3 font-medium">{user.nome}</td>
                          <td className="p-3">{user.email}</td>
                          <td className="p-3">{user.telefone || '-'}</td>
                          <td className="p-3">
                            <span className={`px-2 py-1 rounded-full text-xs ${
                              user.isAdmin 
                                ? 'bg-purple-100 text-purple-800' 
                                : 'bg-blue-100 text-blue-800'
                            }`}>
                              {user.isAdmin ? 'Administrador' : 'Corretor'}
                            </span>
                          </td>
                          <td className="p-3">
                            <span className={`px-2 py-1 rounded-full text-xs ${
                              user.ativo 
                                ? 'bg-green-100 text-green-800' 
                                : 'bg-red-100 text-red-800'
                            }`}>
                              {user.ativo ? 'Ativo' : 'Inativo'}
                            </span>
                          </td>
                          <td className="p-3">
                            {new Date(user.dataCadastro).toLocaleDateString('pt-BR')}
                          </td>
                          <td className="p-3">
                            <div className="flex gap-2">
                              <Button 
                                size="sm" 
                                variant="outline"
                                onClick={() => handleEdit(user)}
                              >
                                <Edit className="h-3 w-3" />
                              </Button>
                              <Button 
                                size="sm" 
                                variant="outline" 
                                className="text-red-600"
                                onClick={() => handleDelete(user)}
                              >
                                <Trash2 className="h-3 w-3" />
                              </Button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
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

        <UserCreateModal
          open={createModalOpen}
          onOpenChange={setCreateModalOpen}
          onUserCreated={handleUserCreated}
        />

        <UserEditModal
          open={editModalOpen}
          onOpenChange={setEditModalOpen}
          user={selectedUser}
          onUserUpdated={handleUserUpdated}
        />

        <UserDeleteModal
          open={deleteModalOpen}
          onOpenChange={setDeleteModalOpen}
          user={selectedUser}
          onUserDeleted={handleUserDeleted}
        />
      </AdminLayout>
    </ProtectedRoute>
  );
};

export default AdminUsers;
