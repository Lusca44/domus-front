import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { ArrowLeft, Edit, Trash2, LogOut } from "lucide-react";
import { leadsApi } from "@/utils/apiConfig";
import { useApi } from "@/hooks/useApi";

interface Lead {
  id: string;
  nomeLancamento: string;
  nomeCliente: string;
  telefoneCliente: string;
  usuarioOpcionista: string;
}

const AdminLeads = () => {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [editForm, setEditForm] = useState({ nomeCliente: "", telefoneCliente: "", nomeLancamento: ""});
  const navigate = useNavigate();

  // Usando o hook customizado para diferentes operações
  const { loading: loadingLeads, execute: executeGetLeads } = useApi<any[]>({
    showErrorToast: true,
    errorMessage: 'Erro ao carregar leads'
  });

  const { execute: executeUpdateLead } = useApi({
    showSuccessToast: true,
    successMessage: 'Lead atualizada com sucesso'
  });

  const { execute: executeDeleteLead } = useApi({
    showSuccessToast: true,
    successMessage: 'Lead excluída com sucesso'
  });

  useEffect(() => {
    // Verificar se o usuário está autenticado
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/admin/login");
      return;
    }
    fetchLeads();
  }, [navigate]);

  const fetchLeads = async () => {
    try {
      const data = await executeGetLeads(() => leadsApi.getAll());
      console.log(data)
      setLeads(data || []);
    } catch (error) {
      console.error('Erro ao buscar leads:', error);
    }
  };

  const handleEdit = (lead: Lead) => {
    setSelectedLead(lead);
    setEditForm({
      nomeCliente: lead.nomeCliente,
      telefoneCliente: lead.telefoneCliente,
      nomeLancamento: lead.nomeLancamento
    });
    setEditModalOpen(true);
  };

  const handleSaveEdit = async () => {
    if (!selectedLead) return;

    try {
      await executeUpdateLead(() => leadsApi.update(selectedLead.id, editForm));
      setEditModalOpen(false);
      fetchLeads();
    } catch (error) {
      console.error('Erro ao atualizar lead:', error);
    }
  };

  const handleDelete = (lead: Lead) => {
    setSelectedLead(lead);
    setDeleteModalOpen(true);
  };

  const confirmDelete = async () => {
    if (!selectedLead) return;

    try {
      await executeDeleteLead(() => leadsApi.delete(selectedLead.id));
      setDeleteModalOpen(false);
      fetchLeads();
    } catch (error) {
      console.error('Erro ao excluir lead:', error);
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
                Gerenciar Leads
              </h1>
            </div>
            <Button variant="outline" size="sm" onClick={handleLogout}>
              <LogOut className="h-4 w-4 mr-2" />
              Sair
            </Button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <Card>
          <CardHeader>
            <CardTitle>Lista de Leads</CardTitle>
          </CardHeader>
          <CardContent>
            {loadingLeads ? (
              <div className="text-center py-8">Carregando leads...</div>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Interesse</TableHead>
                    <TableHead>Nome</TableHead>
                    <TableHead>Telefone</TableHead>
                    <TableHead>Corretor Opcionista</TableHead>
                    <TableHead>Ações</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {leads.map((lead) => (
                    <TableRow key={lead.id}>
                      {/* INTERESSE */}
                      <TableCell>{lead.nomeLancamento}</TableCell> 
                      {/* NOME */}
                      <TableCell>{lead.nomeCliente}</TableCell>
                      {/* TELEFONE */}
                      <TableCell>{lead.telefoneCliente}</TableCell>
                      <TableCell>{lead.usuarioOpcionista}</TableCell>
                      {/* DATA */}
                      <TableCell>
                        <div className="flex space-x-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleEdit(lead)}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleDelete(lead)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </CardContent>
        </Card>
      </main>

      {/* Modal de Edição */}
      <Dialog open={editModalOpen} onOpenChange={setEditModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Editar Lead</DialogTitle>
            <DialogDescription>
              Edite as informações da lead selecionada.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="name">Nome</Label>
              <Input
                id="name"
                value={editForm.nomeCliente}
                onChange={(e) => setEditForm({ ...editForm, nomeCliente: e.target.value })}
              />
            </div>
            <div>
              <Label htmlFor="phone">Telefone</Label>
              <Input
                id="phone"
                value={editForm.telefoneCliente}
                onChange={(e) => setEditForm({ ...editForm, telefoneCliente: e.target.value })}
              />
            </div>
            <div>
              <Label htmlFor="interest">Interesse</Label>
              <Input
                id="interest"
                value={editForm.nomeLancamento}
                onChange={(e) => setEditForm({ ...editForm, nomeLancamento: e.target.value })}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setEditModalOpen(false)}>
              Cancelar
            </Button>
            <Button onClick={handleSaveEdit}>Salvar</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Modal de Exclusão */}
      <AlertDialog open={deleteModalOpen} onOpenChange={setDeleteModalOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Confirmar Exclusão</AlertDialogTitle>
            <AlertDialogDescription>
              Tem certeza que deseja excluir a lead "{selectedLead?.nomeCliente}"? Esta ação não pode ser desfeita.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction onClick={confirmDelete}>Excluir</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default AdminLeads;
