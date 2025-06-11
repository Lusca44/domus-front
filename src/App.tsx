
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import LandingVistaBaia from "./pages/LandingVistaBaia";
import PaginaAgradecimento from "./pages/PaginaAgradecimento";
import AdminLogin from "./pages/admin/AdminLogin";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminLeads from "./pages/admin/AdminLeads";
import AdminProfile from "./pages/admin/AdminProfile";

/**
 * Configuração principal da aplicação
 * 
 * Este componente configura o QueryClient, TooltipProvider, Toasters,
 * e o sistema de roteamento para as páginas do portal de lançamentos.
 * 
 * Rotas disponíveis:
 * - /: Página principal (Index) - Portal de lançamentos
 * - /lancamento/vista-baia: Landing page do empreendimento Vista Baía
 * - /obrigado: Página de agradecimento após envio de formulário
 * - /admin/login: Tela de login administrativo
 * - /admin/dashboard: Dashboard administrativo
 * - /admin/leads: Lista de leads cadastradas
 * - /admin/profile: Perfil do usuário logado
 * - *: Página 404 (NotFound) para rotas não encontradas
 */
const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/lancamento/vista-baia" element={<LandingVistaBaia />} />
          <Route path="/obrigado" element={<PaginaAgradecimento />} />
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/admin/leads" element={<AdminLeads />} />
          <Route path="/admin/profile" element={<AdminProfile />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
