
import { useState, useEffect } from "react";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { ProtectedRoute } from "@/components/admin/ProtectedRoute";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { UserPlus, Users, UserX, Trash2 } from "lucide-react";
import { useApi } from "@/hooks/useApi";
import { userApi } from "@/utils/apiConfig";
import { UserCreateModal } from "@/components/admin/UserCreateModal";
import { UserDeactivateModal } from "@/components/admin/UserDeactivateModal";
import { UserDeleteModal } from "@/components/admin/UserDeleteModal";
import { useTokenValidation } from "@/hooks/useTokenValidation";

interface User {
  id: string;
  nome: string;
  email: string;
  telefone?: string;
  admin: boolean;
  ativo: boolean;
  dataCadastro: string;
}

const AdminUsers = () => {
  // Validação de token
  useTokenValidation();

  const [users, setUsers] = useState<User[]>([]);
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [deactivateModalOpen, setDeactivateModalOpen] = useState(false);
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
      console.log("----")
      console.log(data)
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

  const handleDeactivate = (user: User) => {
    setSelectedUser(user);
    setDeactivateModalOpen(true);
  };

  const handleDelete = (user: User) => {
    setSelectedUser(user);
    setDeleteModalOpen(true);
  };

  return (
    <ProtectedRoute>
      <AdminLayout>
        <div className="space-y-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-2">
                Gerenciar Usuários
              </h2>
              <p className="text-sm md:text-base text-gray-600">
                Liste e gerencie todos os usuários do sistema.
              </p>
            </div>
            <Button
              onClick={() => setCreateModalOpen(true)}
              className="flex items-center gap-2 w-full md:w-auto"
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
                <>
                  {/* Desktop Table */}
                  <div className="hidden md:block">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Nome</TableHead>
                          <TableHead>Email</TableHead>
                          <TableHead>Telefone</TableHead>
                          <TableHead>Tipo</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead>Data Cadastro</TableHead>
                          <TableHead>Ações</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {users.map((user) => (
                          <TableRow key={user.id}>
                            {/* NOME */}
                            <TableCell className="font-medium">
                              {user.nome}
                            </TableCell>
                            {/* EMAIL */}
                            <TableCell>{user.email}</TableCell>
                            {/* TELEFONE */}
                            <TableCell>{user.telefone || "-"}</TableCell>
                            {/* TIPO */}
                            <TableCell>
                              <span
                                className={`px-2 py-1 rounded-full text-xs ${
                                  user.admin
                                    ? "bg-purple-100 text-purple-800"
                                    : "bg-blue-100 text-blue-800"
                                }`}
                              >
                                {user.admin ? "Administrador" : "Corretor"}
                              </span>
                            </TableCell>
                            <TableCell>
                              <span
                                className={`px-2 py-1 rounded-full text-xs ${
                                  user.ativo
                                    ? "bg-green-100 text-green-800"
                                    : "bg-red-100 text-red-800"
                                }`}
                              >
                                {user.ativo ? "Ativo" : "Inativo"}
                              </span>
                            </TableCell>
                            <TableCell>
                              {new Date(user.dataCadastro).toLocaleDateString(
                                "pt-BR"
                              )}
                            </TableCell>
                            <TableCell>
                              <div className="flex gap-2">
                                <Button
                                  size="sm"
                                  variant="outline"
                                  className={
                                    user.ativo
                                      ? "text-orange-600"
                                      : "text-green-600"
                                  }
                                  onClick={() => handleDeactivate(user)}
                                >
                                  <UserX className="h-3 w-3" />
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
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>

                  {/* Mobile Cards */}
                  <div className="md:hidden space-y-4">
                    {users.map((user) => (
                      <Card key={user.id} className="p-4 space-y-3">
                        <div className="flex justify-between items-start">
                          <div className="flex-1">
                            <h3 className="font-medium text-sm">{user.nome}</h3>
                            <p className="text-xs text-gray-600 break-all">
                              {user.email}
                            </p>
                            {user.telefone && (
                              <p className="text-xs text-gray-600">
                                {user.telefone}
                              </p>
                            )}
                          </div>
                        </div>

                        <div className="flex flex-wrap gap-2">
                          <span
                            className={`px-2 py-1 rounded-full text-xs ${
                              user.admin
                                ? "bg-purple-100 text-purple-800"
                                : "bg-blue-100 text-blue-800"
                            }`}
                          >
                            {user.admin ? "Admin" : "Corretor"}
                          </span>
                          <span
                            className={`px-2 py-1 rounded-full text-xs ${
                              user.ativo
                                ? "bg-green-100 text-green-800"
                                : "bg-red-100 text-red-800"
                            }`}
                          >
                            {user.ativo ? "Ativo" : "Inativo"}
                          </span>
                        </div>

                        <div className="flex justify-between items-center">
                          <span className="text-xs text-gray-500">
                            {new Date(user.dataCadastro).toLocaleDateString(
                              "pt-BR"
                            )}
                          </span>
                          <div className="flex gap-2">
                            <Button
                              size="sm"
                              variant="outline"
                              className={
                                user.ativo
                                  ? "text-orange-600"
                                  : "text-green-600"
                              }
                              onClick={() => handleDeactivate(user)}
                            >
                              <UserX className="h-3 w-3" />
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
                        </div>
                      </Card>
                    ))}
                  </div>
                </>
              )}
            </CardContent>
          </Card>

          <div className="mt-8 p-4 bg-blue-50 rounded-lg">
            <h3 className="font-medium text-blue-900 mb-2">
              Informações importantes:
            </h3>
            <ul className="text-sm text-blue-800 space-y-1">
              <li>
                • <strong>ATENÇÃO:</strong> Usuários excluidos serão apagados para sempre, caso queria manter dados relacionados a ele apenas desative-o
              </li>
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

        <UserDeactivateModal
          open={deactivateModalOpen}
          onOpenChange={setDeactivateModalOpen}
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
