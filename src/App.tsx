
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NewHomePage from "./pages/general-pages/NewHomePage";
import AnunciePage from "./pages/general-pages/AnunciePage";
import ContatoPage from "./pages/general-pages/ContatoPage";
import NotFound from "./pages/general-pages/NotFound";
import PaginaAgradecimento from "./pages/general-pages/PaginaAgradecimento";
import AdminLogin from "./pages/admin/AdminLogin";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminLeads from "./pages/admin/AdminLeads";
import AdminProfile from "./pages/admin/AdminProfile";
import AdminUsers from "./pages/admin/AdminUsers";
import AdminSettings from "./pages/admin/AdminSettings";

import React from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from '@/components/ui/toaster';

// Import das páginas existentes
import LancamentosPage from '@/pages/general-pages/LancamentosPage';
import ProntosPage from '@/pages/general-pages/ProntosPage';
import AlugueisPage from '@/pages/general-pages/AlugueisPage';

// Import das páginas admin criadas
import FinalidadesPage from '@/pages/admin/FinalidadesPage';
import TipologiasPage from '@/pages/admin/TipologiasPage';
import LancamentosAdminPage from '@/pages/admin/LancamentosAdminPage';
import ImoveisAdminPage from '@/pages/admin/ImoveisAdminPage';

// Import do componente de proteção
import { ProtectedRoute } from '@/components/admin/ProtectedRoute';

// Import das Landing Pages dinâmicas
import DynamicLancamentoLanding from '@/pages/dynamic-landing/DynamicLancamentoLanding';
import DynamicImovelLanding from '@/pages/dynamic-landing/DynamicImovelLanding';

// Criar cliente do React Query
const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <div className="App">
          <Routes>
            {/* Página inicial com hubs de regiões */}
            <Route path="/" element={<NewHomePage />} />
            <Route path="/lancamentos" element={<LancamentosPage />} />
            <Route path="/alugueis" element={<AlugueisPage />} />
            <Route path="/prontos" element={<ProntosPage />} />
            <Route path="/anuncie" element={<AnunciePage />} />
            <Route path="/contato" element={<ContatoPage />} />

            {/* Landing Pages dinâmicas */}
            <Route path="/lancamento/:id" element={<DynamicLancamentoLanding />} />
            <Route path="/imovel/:id" element={<DynamicImovelLanding />} />

            <Route path="/obrigado" element={<PaginaAgradecimento />} />

            {/* Rota de login - não protegida */}
            <Route path="/admin/login" element={<AdminLogin />} />

            {/* Rotas administrativas protegidas */}
            <Route
              path="/admin/dashboard"
              element={
                <ProtectedRoute>
                  <AdminDashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/leads"
              element={
                <ProtectedRoute>
                  <AdminLeads />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/users"
              element={
                <ProtectedRoute>
                  <AdminUsers />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/profile"
              element={
                <ProtectedRoute>
                  <AdminProfile />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/settings"
              element={
                <ProtectedRoute>
                  <AdminSettings />
                </ProtectedRoute>
              }
            />
            
            {/* Novas rotas administrativas criadas */}
            <Route
              path="/admin/finalidades"
              element={
                <ProtectedRoute>
                  <FinalidadesPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/tipologias"
              element={
                <ProtectedRoute>
                  <TipologiasPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/lancamentos"
              element={
                <ProtectedRoute>
                  <LancamentosAdminPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/imoveis"
              element={
                <ProtectedRoute>
                  <ImoveisAdminPage />
                </ProtectedRoute>
              }
            />

            {/* Rota 404 */}
            <Route path="*" element={<NotFound />} />
          </Routes>
          <Toaster />
        </div>
      </Router>
    </QueryClientProvider>
  );
}

export default App;
