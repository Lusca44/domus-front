
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, FileText } from "lucide-react";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { ProtectedRoute } from "@/components/admin/ProtectedRoute";

const AdminDashboard = () => {
  return (
    <ProtectedRoute>
      <AdminLayout>
        <div className="space-y-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              Bem-vindo ao Painel Administrativo
            </h2>
            <p className="text-gray-600">
              Gerencie leads e perfil do sistema.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Gerenciar Leads */}
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-center space-x-2">
                  <Users className="h-6 w-6 text-blue-600" />
                  <CardTitle>Gerenciar Leads</CardTitle>
                </div>
                <CardDescription>
                  Visualize, edite e gerencie todas as leads capturadas.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Link to="/admin/leads">
                  <Button className="w-full">
                    Acessar Leads
                  </Button>
                </Link>
              </CardContent>
            </Card>

            {/* Perfil do Usuário */}
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-center space-x-2">
                  <FileText className="h-6 w-6 text-purple-600" />
                  <CardTitle>Meu Perfil</CardTitle>
                </div>
                <CardDescription>
                  Visualize e edite suas informações pessoais.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Link to="/admin/profile">
                  <Button className="w-full" variant="secondary">
                    Ver Perfil
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>

          {/* Estatísticas Rápidas */}
          <div className="mt-8">
            <h3 className="text-lg font-medium text-gray-900 mb-4">
              Estatísticas Rápidas
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-white p-4 rounded-lg shadow">
                <div className="text-2xl font-bold text-blue-600">0</div>
                <div className="text-sm text-gray-500">Total de Leads</div>
              </div>
              <div className="bg-white p-4 rounded-lg shadow">
                <div className="text-2xl font-bold text-green-600">0</div>
                <div className="text-sm text-gray-500">Leads Hoje</div>
              </div>
              <div className="bg-white p-4 rounded-lg shadow">
                <div className="text-2xl font-bold text-purple-600">0%</div>
                <div className="text-sm text-gray-500">Taxa de Conversão</div>
              </div>
            </div>
          </div>
        </div>
      </AdminLayout>
    </ProtectedRoute>
  );
};

export default AdminDashboard;
