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
import { LeadsTableControls } from "@/components/admin/LeadsTableControls";
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
  // Estado para armazenar todas as leads vindas do backend
  const [leads, setLeads] = useState<Lead[]>([]);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [editForm, setEditForm] = useState({ nomeCliente: "", telefoneCliente: "", nomeLancamento: ""});
  
  // ===== ESTADOS DOS FILTROS =====
  // FILTRO 1: Corretor - valores possíveis: "all", "with-corrector", "without-corrector"
  const [correctorFilter, setCorrectorFilter] = useState("all");
  
  // FILTRO 2: Nome do Lançamento - string de busca (busca parcial, case-insensitive)
  const [nomeLancamentoFilter, setNomeLancamentoFilter] = useState("");
  
  // FILTRO 3: Nome do Cliente - string de busca (busca parcial, case-insensitive)
  const [nomeClienteFilter, setNomeClienteFilter] = useState("");
  
  // ===== ESTADOS DA PAGINAÇÃO =====
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

  // FUNÇÃO CHAMADA QUANDO O USUÁRIO CLICA NO BOTÃO "PESQUISAR"
  // Esta função agora refaz a consulta ao backend com os filtros aplicados
  const handleSearch = async () => {
    console.log('🔍 Iniciando pesquisa com filtros:', {
      corrector: correctorFilter,
      nomeLancamento: nomeLancamentoFilter,
      nomeCliente: nomeClienteFilter
    });
    
    // Resetamos a página atual para aplicar os filtros na primeira página
    setCurrentPage(1);
    
    try {
      // PONTO DE INTEGRAÇÃO COM BACKEND:
      // Aqui fazemos uma nova chamada para o backend passando os filtros
      // Por enquanto, como o backend ainda não tem os endpoints com filtros,
      // continuamos usando getAll() mas você pode substituir por:
      // const data = await executeGetLeads(() => leadsApi.getAllWithFilters({
      //   correctorFilter, 
      //   nomeLancamentoFilter, 
      //   nomeClienteFilter 
      // }));
      
      console.log('🚀 Fazendo nova consulta ao backend...');
      const data = await executeGetLeads(() => leadsApi.getAll());
      console.log('✅ Dados recebidos do backend:', data);
      
      setLeads(data || []);
      
      console.log('📊 Total de leads carregadas do backend:', (data || []).length);
    } catch (error) {
      console.error('❌ Erro ao pesquisar leads:', error);
    }
  };

  // ===== LÓGICA DE FILTROS APLICADA NO FRONTEND =====
  // Este useMemo recalcula as leads filtradas sempre que os filtros ou a lista de leads muda
  // IMPORTANTE: Esta lógica deve ser replicada no backend para filtrar no banco de dados
  const filteredLeads = useMemo(() => {
    console.log('Aplicando filtros no frontend...');
    let filtered = leads;

    // === FILTRO 1: POR CORRETOR ===
    if (correctorFilter === "with-corrector") {
      // Filtra leads que TEM corretor atribuído
      // Verifica se usuarioOpcionista existe e não é string vazia/só espaços
      filtered = filtered.filter(lead => lead.usuarioOpcionista && lead.usuarioOpcionista.trim() !== "");
      console.log('Filtro aplicado: COM corretor');
    } else if (correctorFilter === "without-corrector") {
      // Filtra leads que NÃO TEM corretor atribuído
      // Verifica se usuarioOpcionista é null, undefined ou string vazia/só espaços
      filtered = filtered.filter(lead => !lead.usuarioOpcionista || lead.usuarioOpcionista.trim() === "");
      console.log('Filtro aplicado: SEM corretor');
    }
    // Se correctorFilter === "all", não aplica filtro (mostra todas)

    // === FILTRO 2: POR NOME DO LANÇAMENTO ===
    if (nomeLancamentoFilter.trim() !== "") {
      // Busca parcial, case-insensitive no nome do lançamento
      // Converte tanto o filtro quanto o campo para lowercase para comparação
      filtered = filtered.filter(lead => 
        lead.nomeLancamento.toLowerCase().includes(nomeLancamentoFilter.toLowerCase())
      );
      console.log('Filtro aplicado: Nome do lançamento contém:', nomeLancamentoFilter);
    }

    // === FILTRO 3: POR NOME DO CLIENTE ===
    if (nomeClienteFilter.trim() !== "") {
      // Busca parcial, case-insensitive no nome do cliente
      // Converte tanto o filtro quanto o campo para lowercase para comparação
      filtered = filtered.filter(lead => 
        lead.nomeCliente.toLowerCase().includes(nomeClienteFilter.toLowerCase())
      );
      console.log('Filtro aplicado: Nome do cliente contém:', nomeClienteFilter);
    }

    console.log('Total de leads após filtros:', filtered.length);
    return filtered;
  }, [leads, correctorFilter, nomeLancamentoFilter, nomeClienteFilter]);

  // ===== LÓGICA DE PAGINAÇÃO =====
  // Calcula o total de páginas baseado no número de leads filtradas
  const totalPages = Math.ceil(filteredLeads.length / itemsPerPage);
  
  // Calcula o índice inicial para a paginação
  const startIndex = (currentPage - 1) * itemsPerPage;
  
  // Aplica a paginação no array já filtrado
  const paginatedLeads = filteredLeads.slice(startIndex, startIndex + itemsPerPage);

  // Reset da página quando mudam os filtros ou itens por página
  // Isso garante que o usuário sempre volte para a primeira página ao aplicar novos filtros
  useEffect(() => {
    setCurrentPage(1);
    console.log('Página resetada para 1 devido a mudança nos filtros');
  }, [correctorFilter, nomeLancamentoFilter, nomeClienteFilter, itemsPerPage]);

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

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Gerenciar Leads</h2>
          </div>
          <Button onClick={handleExportExcel} className="gap-2">
            <Download className="h-4 w-4" />
            Exportar Excel
          </Button>
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
                            onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                            className={currentPage === 1 ? 'pointer-events-none opacity-50' : 'cursor-pointer'}
                          />
                        </PaginationItem>
                        
                        {/* Botões numerados das páginas */}
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
                        
                        {/* Botão "Próximo" - desabilitado se estiver na última página */}
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
