import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { QueryClient } from 'react-query';
import { Toaster } from '@/components/ui/toaster';

// Import das páginas
import NewHomePage from '@/pages/NewHomePage';
import LancamentosPage from '@/pages/LancamentosPage';
import ProntosPage from '@/pages/ProntosPage';
import AlugueisPage from '@/pages/AlugueisPage';
import SobrePage from '@/pages/SobrePage';
import ContatoPage from '@/pages/ContatoPage';
import ObrigadoPage from '@/pages/ObrigadoPage';
import PoliticaPrivacidadePage from '@/pages/PoliticaPrivacidadePage';
import TermosUsoPage from '@/pages/TermosUsoPage';
import NotFoundPage from '@/pages/NotFoundPage';
import LoginPage from '@/pages/LoginPage';
import DashboardPage from '@/pages/admin/DashboardPage';
import LeadsPage from '@/pages/admin/LeadsPage';
import ProfilePage from '@/pages/admin/ProfilePage';
import UsersPage from '@/pages/admin/UsersPage';
import ProtectedRoute from '@/components/ProtectedRoute';

// Import das Landing Pages estáticas
import LandingPixinguinha from '@/pages/regioes/porto/pixinguinha/LandingPixinguinha';
import LandingNovaOlaria from '@/pages/regioes/olaria/nova-olaria/LandingNovaOlaria';

import DynamicLancamentoLanding from '@/pages/dynamic-landing/DynamicLancamentoLanding';
import DynamicImovelLanding from '@/pages/dynamic-landing/DynamicImovelLanding';
import FinalidadesPage from '@/pages/admin/FinalidadesPage';
import TipologiasPage from '@/pages/admin/TipologiasPage';
import LancamentosAdminPage from '@/pages/admin/LancamentosAdminPage';
import ImoveisAdminPage from '@/pages/admin/ImoveisAdminPage';

function App() {
  return (
    <QueryClient>
      <Router>
        <Routes>
          {/* Rotas públicas */}
          <Route path="/" element={<NewHomePage />} />
          <Route path="/lancamentos" element={<LancamentosPage />} />
          <Route path="/prontos" element={<ProntosPage />} />
          <Route path="/alugueis" element={<AlugueisPage />} />
          <Route path="/sobre" element={<SobrePage />} />
          <Route path="/contato" element={<ContatoPage />} />
          <Route path="/obrigado" element={<ObrigadoPage />} />
          <Route path="/politica-privacidade" element={<PoliticaPrivacidadePage />} />
          <Route path="/termos-uso" element={<TermosUsoPage />} />
          
          {/* Rotas de regiões específicas (estáticas) */}
          <Route path="/regioes/porto/pixinguinha" element={<LandingPixinguinha />} />
          <Route path="/regioes/olaria/nova-olaria" element={<LandingNovaOlaria />} />
          
          {/* Rotas dinâmicas para landing pages */}
          <Route path="/lancamento/:id" element={<DynamicLancamentoLanding />} />
          <Route path="/imovel/:id" element={<DynamicImovelLanding />} />
          
          {/* Rotas de autenticação */}
          <Route path="/admin/login" element={<LoginPage />} />
          
          {/* Rotas protegidas do admin */}
          <Route path="/admin/*" element={
            <ProtectedRoute>
              <Routes>
                <Route path="dashboard" element={<DashboardPage />} />
                <Route path="leads" element={<LeadsPage />} />
                <Route path="profile" element={<ProfilePage />} />
                <Route path="users" element={<UsersPage />} />
                <Route path="finalidades" element={<FinalidadesPage />} />
                <Route path="tipologias" element={<TipologiasPage />} />
                <Route path="lancamentos" element={<LancamentosAdminPage />} />
                <Route path="imoveis" element={<ImoveisAdminPage />} />
              </Routes>
            </ProtectedRoute>
          } />
          
          {/* Rota 404 */}
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
        <Toaster />
      </Router>
    </QueryClient>
  );
}

export default App;
