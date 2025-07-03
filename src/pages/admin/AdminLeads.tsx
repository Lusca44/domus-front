import { useState, useEffect, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Download, Users } from "lucide-react";
import { leadsApi } from "@/utils/apiConfig";
import { useApi } from "@/hooks/useApi";
import { useAuth } from "@/hooks/useAuth";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { ProtectedRoute } from "@/components/admin/ProtectedRoute";
import { LeadsFilters } from "@/components/admin/LeadsFilters";
import { LeadsTableControls } from "@/components/admin/LeadsTableControls";
import { LeadsTable } from "@/components/admin/LeadsTable";
import { LeadsEditModal } from "@/components/admin/LeadsEditModal";
import { LeadsDeleteModal } from "@/components/admin/LeadsDeleteModal";
import { LeadsBulkEditModal } from "@/components/admin/LeadsBulkEditModal";
import { exportLeadsToExcel } from "@/utils/excelExport";

interface Lead {
  id: string;
  nomeLancamento: string;
  nomeCliente: string;
  emailCliente: string;
  telefoneCliente: string;
  usuarioOpcionistaId: string;
}

const AdminLeads = () => {
  const { isAdmin, user, isLoading: authLoading, token } = useAuth(); // Obter informações do usuário logado

  // Estado para armazenar todas as leads vindas do backend
  const [leads, setLeads] = useState<Lead[]>([]);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [bulkEditModalOpen, setBulkEditModalOpen] = useState(false);
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);

  // ATUALIZADO: Incluindo o campo corretorOpcionistaId no formulário
  const [editForm, setEditForm] = useState({
    nomeCliente: "",
    emailCliente: "",
    telefoneCliente: "",
    nomeLancamento: "",
    corretorOpcionistaId: "null", // ID do corretor selecionado
  });

  // ===== ESTADOS DOS FILTROS =====
  // FILTRO 1: Corretor - agora é um boolean (true = mostrar apenas sem corretor, false = mostrar todos)
  const [correctorFilter, setCorrectorFilter] = useState(false);

  // FILTRO 2: Nome do Lançamento - string de busca (busca parcial, case-insensitive)
  const [nomeLancamentoFilter, setNomeLancamentoFilter] = useState("");

  // FILTRO 3: Nome do Cliente - string de busca (busca parcial, case-insensitive)
  const [nomeClienteFilter, setNomeClienteFilter] = useState("");

  // NOVO FILTRO 4: Minhas leads - boolean (true = mostrar apenas leads onde eu sou o corretor)
  const [myLeadsFilter, setMyLeadsFilter] = useState(false);

  // ===== ESTADOS DA PAGINAÇÃO =====
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);

  const { loading: loadingLeads, execute: executeGetLeads } = useApi<any[]>({
    showErrorToast: true,
    errorMessage: "Erro ao carregar leads",
  });

  const { loading: loadingUpdateLead, execute: executeUpdateLead } = useApi({
    showSuccessToast: true,
    successMessage: "Lead atualizada com sucesso",
  });

  const { loading: loadingDeleteLead, execute: executeDeleteLead } = useApi({
    showSuccessToast: true,
    successMessage: "Lead excluída com sucesso",
  });

  const { loading: loadingBulkUpdate, execute: executeBulkUpdateLeads } = useApi({
    showSuccessToast: true,
    successMessage: "Leads atualizadas em lote com sucesso",
  });

  useEffect(() => {
    if (!authLoading) {
      fetchLeads();
    }
  }, [authLoading]);

  const fetchLeads = async () => {
    try {
      if (authLoading) return;
      // TODO: IMPLEMENTAR FILTRO AUTOMÁTICO PARA CORRETORES
      // Se o usuário não for admin, deve filtrar automaticamente apenas suas leads
      // Exemplo de parâmetros para o backend:
      // const params = !isAdmin ? { corretorId: user?.id } : {};
      // const data = await executeGetLeads(() => leadsApi.getAllWithFilters(params));

      var params: any = {
        nomeLancamento: nomeLancamentoFilter,
        isSemCorretor: correctorFilter,
        nomeCliente: nomeClienteFilter,
        corretorId: null,
      };

      if ((isAdmin && myLeadsFilter) || !isAdmin) {
        params.corretorId = user.id;
      }
      const data = await executeGetLeads(() => leadsApi.getAll(params));

      setLeads(data);
    } catch (error) {
      console.error("Erro ao buscar leads:", error);
    }
  };

  // FUNÇÃO CHAMADA QUANDO O USUÁRIO CLICA NO BOTÃO "PESQUISAR"
  // Esta função agora refaz a consulta ao backend com os filtros aplicados
  const handleSearch = async () => {
    console.log("🔍 Iniciando pesquisa com filtros:", {
      corrector: correctorFilter,
      nomeLancamento: nomeLancamentoFilter,
      nomeCliente: nomeClienteFilter,
      myLeads: myLeadsFilter,
      isAdmin: isAdmin,
      userId: user?.id,
    });

    setCurrentPage(1);

    try {
      console.log("🚀 Fazendo nova consulta ao backend...");

      var params: any = {
        nomeLancamento: nomeLancamentoFilter,
        isSemCorretor: correctorFilter,
        nomeCliente: nomeClienteFilter,
        corretorId: (isAdmin && myLeadsFilter) || !isAdmin ? user.id : null,
      };

      const data = await executeGetLeads(() => leadsApi.getAll(params));

      console.log("✅ Dados recebidos do backend:", data);

      setLeads(data || []);

      console.log(
        "📊 Total de leads carregadas do backend:",
        (data || []).length
      );
    } catch (error) {
      console.error("❌ Erro ao pesquisar leads:", error);
    }
  };

  // ===== LÓGICA DE FILTROS APLICADA NO FRONTEND =====
  // Este useMemo recalcula as leads filtradas sempre que os filtros ou a lista de leads muda
  // IMPORTANTE: Esta lógica deve ser replicada no backend para filtrar no banco de dados
  const filteredLeads = useMemo(() => {
    console.log("Aplicando filtros no frontend...");
    let filtered = leads;

    // === FILTRO AUTOMÁTICO PARA CORRETORES ===
    // LÓGICA COMENTADA: Corretores só veem suas próprias leads
    // if (!isAdmin && user?.id) {
    //   filtered = filtered.filter(lead => lead.usuarioOpcionista === user.id);
    //   console.log('🔒 Filtro automático do corretor aplicado');
    // }

    // === FILTRO 1: POR CORRETOR (APENAS PARA ADMIN) ===
    if (isAdmin && correctorFilter === true) {
      // Filtra leads que NÃO TEM corretor atribuído (checkbox marcado = sem corretor)
      // Verifica se usuarioOpcionista é null, undefined ou string vazia/só espaços
      filtered = filtered.filter(
        (lead) =>
          !lead.usuarioOpcionistaId || lead.usuarioOpcionistaId.trim() === ""
      );
      console.log("Filtro aplicado: SEM corretor (checkbox marcado)");
    }

    // === NOVO FILTRO: MINHAS LEADS (APENAS PARA ADMIN) ===
    // Permite que admin veja apenas as leads onde ele é o corretor opcionista
    // if (isAdmin && myLeadsFilter === true && user?.id) {
    //   filtered = filtered.filter(lead => lead.usuarioOpcionista === user.id);
    //   console.log('Filtro aplicado: Minhas leads como corretor (admin)');
    // }

    // === FILTRO 2: POR NOME DO LANÇAMENTO ===
    if (nomeLancamentoFilter.trim() !== "") {
      // Busca parcial, case-insensitive no nome do nome do lançamento
      // Converte tanto o filtro quanto o campo para lowercase para comparação
      filtered = filtered.filter((lead) =>
        lead.nomeLancamento
          .toLowerCase()
          .includes(nomeLancamentoFilter.toLowerCase())
      );
      console.log(
        "Filtro aplicado: Nome do lançamento contém:",
        nomeLancamentoFilter
      );
    }

    // === FILTRO 3: POR NOME DO CLIENTE ===
    if (nomeClienteFilter.trim() !== "") {
      // Busca parcial, case-insensitive no nome do cliente
      // Converte tanto o filtro quanto o campo para lowercase para comparação
      filtered = filtered.filter((lead) =>
        lead.nomeCliente.toLowerCase().includes(nomeClienteFilter.toLowerCase())
      );
      console.log(
        "Filtro aplicado: Nome do cliente contém:",
        nomeClienteFilter
      );
    }

    console.log("Total de leads após filtros:", filtered.length);
    return filtered;
  }, [
    leads,
    correctorFilter,
    nomeLancamentoFilter,
    nomeClienteFilter,
    myLeadsFilter,
    isAdmin,
    user?.id,
  ]);

  // ===== LÓGICA DE PAGINAÇÃO =====
  // Calcula o total de páginas baseado no número de leads filtradas
  const totalPages = Math.ceil(filteredLeads.length / itemsPerPage);

  // Calcula o índice inicial para a paginação
  const startIndex = (currentPage - 1) * itemsPerPage;

  // Aplica a paginação no array já filtrado
  const paginatedLeads = filteredLeads.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  // Reset da página quando mudam os filtros ou itens por página
  // Isso garante que o usuário sempre volte para a primeira página ao aplicar novos filtros
  useEffect(() => {
    setCurrentPage(1);
    console.log("Página resetada para 1 devido a mudança nos filtros");
  }, [
    correctorFilter,
    nomeLancamentoFilter,
    nomeClienteFilter,
    myLeadsFilter,
    itemsPerPage,
  ]);

  const handleEdit = (lead: Lead) => {
    setSelectedLead(lead);
    setEditForm({
      nomeCliente: lead.nomeCliente,
      emailCliente: lead.emailCliente,
      telefoneCliente: lead.telefoneCliente,
      nomeLancamento: lead.nomeLancamento,
      corretorOpcionistaId: lead.usuarioOpcionistaId || "null", // Usar o ID atual do corretor
    });
    setEditModalOpen(true);
  };

  const handleSaveEdit = async () => {
    if (!selectedLead) return;

    try {
      const usuarioOpcionista =
        editForm.corretorOpcionistaId === "null"
          ? ""
          : editForm.corretorOpcionistaId;

      const updateData = {
        nomeCliente: editForm.nomeCliente,
        emailCliente: editForm.emailCliente,
        nomeLancamento: editForm.nomeLancamento,
        telefoneCliente: editForm.telefoneCliente,
        usuarioOpcionista: usuarioOpcionista,
      };

      console.log("📤 Enviando dados para atualização:", updateData);

      await executeUpdateLead(() =>
        leadsApi.update(selectedLead.id, updateData)
      );
      setEditModalOpen(false);
      fetchLeads();
    } catch (error) {
      console.error("Erro ao atualizar lead:", error);
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
      console.error("Erro ao excluir lead:", error);
    }
  };

  const handleBulkUpdate = async (leadIds: string[], newCorretorId: string) => {
    try {
      console.log("📤 Atualizando leads em lote:", {
        leadIds,
        newCorretorId: newCorretorId || "Remover corretor",
      });

      const updateData = {
        leadIds: leadIds,
        corretorId: newCorretorId || null
      };

      await executeBulkUpdateLeads(() => leadsApi.bulkUpdateCorretor(updateData));
      fetchLeads();
    } catch (error) {
      console.error("Erro ao atualizar leads em lote:", error);
    }
  };

  const handleExportExcel = () => {
    exportLeadsToExcel(leads); // Exporta todas as leads do backend, não apenas as filtradas/paginadas
  };

  return (
    <ProtectedRoute>
      <AdminLayout>
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">
                {isAdmin ? "Gerenciar Leads" : "Minhas Leads"}
              </h2>
              <p className="text-gray-600 mt-1">
                {isAdmin
                  ? "Gerencie todas as leads e atribua corretores"
                  : "Visualize e gerencie suas leads como corretor opcionista"}
              </p>
            </div>
            <div className="flex gap-3">
              {/* Botão de edição em lote - apenas para administradores */}
              {isAdmin && (
                <Button
                  onClick={() => setBulkEditModalOpen(true)}
                  variant="outline"
                  className="gap-2"
                  disabled={filteredLeads.length === 0}
                >
                  <Users className="h-4 w-4" />
                  Editar em Lote
                </Button>
              )}
              <Button onClick={handleExportExcel} className="gap-2">
                <Download className="h-4 w-4" />
                Exportar Excel
              </Button>
            </div>
          </div>

          {/* CARD DOS FILTROS */}
          <Card>
            <CardHeader>
              <CardTitle>Filtros</CardTitle>
            </CardHeader>
            <CardContent>
              {/* Componente de filtros - todos os estados e callbacks são passados via props */}
              <LeadsFilters
                correctorFilter={correctorFilter}
                onCorrectorFilterChange={setCorrectorFilter}
                nomeLancamentoFilter={nomeLancamentoFilter}
                onNomeLancamentoFilterChange={setNomeLancamentoFilter}
                nomeClienteFilter={nomeClienteFilter}
                onNomeClienteFilterChange={setNomeClienteFilter}
                myLeadsFilter={myLeadsFilter}
                onMyLeadsFilterChange={setMyLeadsFilter}
                onSearch={handleSearch}
              />
            </CardContent>
          </Card>

          {/* CARD DA TABELA DE LEADS */}
          <Card>
            <CardHeader>
              <CardTitle>Lista de Leads</CardTitle>
            </CardHeader>
            <CardContent>
              {loadingLeads ? (
                <div className="text-center py-8">Carregando leads...</div>
              ) : (
                <>
                  {/* Controles da tabela - mostra quantos itens por página e total filtrado */}
                  <LeadsTableControls
                    itemsPerPage={itemsPerPage}
                    onItemsPerPageChange={setItemsPerPage}
                    totalItems={filteredLeads.length}
                  />

                  {/* Tabela com as leads paginadas (já filtradas) */}
                  <LeadsTable
                    leads={paginatedLeads}
                    onEdit={handleEdit}
                    onDelete={handleDelete}
                  />

                  {/* COMPONENTE DE PAGINAÇÃO */}
                  {/* Só mostra se houver mais de uma página */}
                  {totalPages > 1 && (
                    <div className="mt-4">
                      <Pagination>
                        <PaginationContent>
                          {/* Botão "Anterior" - desabilitado se estiver na primeira página */}
                          <PaginationItem>
                            <PaginationPrevious
                              onClick={() =>
                                setCurrentPage(Math.max(1, currentPage - 1))
                              }
                              className={
                                currentPage === 1
                                  ? "pointer-events-none opacity-50"
                                  : "cursor-pointer"
                              }
                            />
                          </PaginationItem>

                          {/* Botões numerados das páginas */}
                          {Array.from(
                            { length: totalPages },
                            (_, i) => i + 1
                          ).map((page) => (
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

                          {/* Botão "Próximo" - desabilitado se estiver na última página */}
                          <PaginationItem>
                            <PaginationNext
                              onClick={() =>
                                setCurrentPage(
                                  Math.min(totalPages, currentPage + 1)
                                )
                              }
                              className={
                                currentPage === totalPages
                                  ? "pointer-events-none opacity-50"
                                  : "cursor-pointer"
                              }
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
          loading={loadingUpdateLead}
        />

        <LeadsDeleteModal
          open={deleteModalOpen}
          onOpenChange={setDeleteModalOpen}
          selectedLead={selectedLead}
          onConfirm={confirmDelete}
          loading={loadingDeleteLead}
        />

        {isAdmin && (
          <LeadsBulkEditModal
            open={bulkEditModalOpen}
            onOpenChange={setBulkEditModalOpen}
            leads={filteredLeads}
            onBulkUpdate={handleBulkUpdate}
            loading={loadingBulkUpdate}
          />
        )}
      </AdminLayout>
    </ProtectedRoute>
  );
};

export default AdminLeads;
