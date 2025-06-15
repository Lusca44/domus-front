
import { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";
import { Download } from "lucide-react";
import { leadsApi } from "@/utils/apiConfig";
import { useApi } from "@/hooks/useApi";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { LeadsFilters } from "@/components/admin/LeadsFilters";
import { LeadsTable } from "@/components/admin/LeadsTable";
import { LeadsEditModal } from "@/components/admin/LeadsEditModal";
import { LeadsDeleteModal } from "@/components/admin/LeadsDeleteModal";
import { exportLeadsToExcel } from "@/utils/excelExport";

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
  
  // Filtros e paginação
  const [correctorFilter, setCorrectorFilter] = useState("all");
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  
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

  // Filtrar leads baseado no filtro selecionado
  const filteredLeads = useMemo(() => {
    if (correctorFilter === "all") return leads;
    if (correctorFilter === "with-corrector") {
      return leads.filter(lead => lead.usuarioOpcionista && lead.usuarioOpcionista.trim() !== "");
    }
    if (correctorFilter === "without-corrector") {
      return leads.filter(lead => !lead.usuarioOpcionista || lead.usuarioOpcionista.trim() === "");
    }
    return leads;
  }, [leads, correctorFilter]);

  // Calcular paginação
  const totalPages = Math.ceil(filteredLeads.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedLeads = filteredLeads.slice(startIndex, startIndex + itemsPerPage);

  // Reset página quando mudar filtro
  useEffect(() => {
    setCurrentPage(1);
  }, [correctorFilter, itemsPerPage]);

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

  const handleExportExcel = () => {
    exportLeadsToExcel(leads); // Exporta todas as leads do backend, não apenas as filtradas/paginadas
  };

  // Para implementação futura com API:
  // const fetchLeadsWithFilters = async (page: number, limit: number, filter: string) => {
  //   const params = new URLSearchParams({
  //     page: page.toString(),
  //     limit: limit.toString(),
  //     correctorFilter: filter
  //   });
  //   
  //   try {
  //     const data = await executeGetLeads(() => 
  //       fetch(`${API_BASE_URL}/leads?${params}`, {
  //         headers: { Authorization: `Bearer ${token}` }
  //       }).then(res => res.json())
  //     );
  //     setLeads(data.leads);
  //     setTotalPages(data.totalPages);
  //   } catch (error) {
  //     console.error('Erro ao buscar leads:', error);
  //   }
  // };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Gerenciar Leads</h2>
            <p className="text-gray-600">Total de {filteredLeads.length} leads encontradas</p>
          </div>
          <Button onClick={handleExportExcel} className="gap-2">
            <Download className="h-4 w-4" />
            Exportar Excel
          </Button>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Filtros e Configurações</CardTitle>
          </CardHeader>
          <CardContent>
            <LeadsFilters
              correctorFilter={correctorFilter}
              onCorrectorFilterChange={setCorrectorFilter}
              itemsPerPage={itemsPerPage}
              onItemsPerPageChange={setItemsPerPage}
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Lista de Leads</CardTitle>
          </CardHeader>
          <CardContent>
            {loadingLeads ? (
              <div className="text-center py-8">Carregando leads...</div>
            ) : (
              <>
                <LeadsTable
                  leads={paginatedLeads}
                  onEdit={handleEdit}
                  onDelete={handleDelete}
                />

                {/* Paginação */}
                {totalPages > 1 && (
                  <div className="mt-4">
                    <Pagination>
                      <PaginationContent>
                        <PaginationItem>
                          <PaginationPrevious 
                            onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                            className={currentPage === 1 ? 'pointer-events-none opacity-50' : 'cursor-pointer'}
                          />
                        </PaginationItem>
                        
                        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                          <PaginationItem key={page}>
                            <PaginationLink
                              onClick={() => setCurrentPage(page)}
                              isActive={currentPage === page}
                              className="cursor-pointer"
                            >
                              {page}
                            </PaginationLink>
                          </PaginationItem>
                        ))}
                        
                        <PaginationItem>
                          <PaginationNext 
                            onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                            className={currentPage === totalPages ? 'pointer-events-none opacity-50' : 'cursor-pointer'}
                          />
                        </PaginationItem>
                      </PaginationContent>
                    </Pagination>
                  </div>
                )}
              </>
            )}
          </CardContent>
        </Card>
      </div>

      <LeadsEditModal
        open={editModalOpen}
        onOpenChange={setEditModalOpen}
        editForm={editForm}
        onEditFormChange={setEditForm}
        onSave={handleSaveEdit}
      />

      <LeadsDeleteModal
        open={deleteModalOpen}
        onOpenChange={setDeleteModalOpen}
        selectedLead={selectedLead}
        onConfirm={confirmDelete}
      />
    </AdminLayout>
  );
};

export default AdminLeads;
