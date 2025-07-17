
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from '@/components/ui/toaster';

// Import das páginas existentes
import LancamentosPage from '@/pages/general-pages/LancamentosPage';
import ProntosPage from '@/pages/general-pages/ProntosPage';
import AlugueisPage from '@/pages/general-pages/AlugueisPage';

// Import das páginas admin existentes
import FinalidadesPage from '@/pages/admin/FinalidadesPage';
import TipologiasPage from '@/pages/admin/TipologiasPage';
import LancamentosAdminPage from '@/pages/admin/LancamentosAdminPage';
import ImoveisAdminPage from '@/pages/admin/ImoveisAdminPage';

// Import do componente de proteção
import { ProtectedRoute } from '@/components/admin/ProtectedRoute';

// Import das Landing Pages estáticas
import LandingPixinguinha from '@/pages/regioes/porto/pixinguinha/LandingPixinguinha';
import LandingNovaOlaria from '@/pages/regioes/olaria/nova-olaria/LandingNovaOlaria';

// Import das Landing Pages dinâmicas
import DynamicLancamentoLanding from '@/pages/dynamic-landing/DynamicLancamentoLanding';
import DynamicImovelLanding from '@/pages/dynamic-landing/DynamicImovelLanding';

// Criar cliente do React Query
const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <Routes>
          {/* Rotas públicas existentes */}
          <Route path="/" element={<LancamentosPage />} />
          <Route path="/lancamentos" element={<LancamentosPage />} />
          <Route path="/prontos" element={<ProntosPage />} />
          <Route path="/alugueis" element={<AlugueisPage />} />
          
          {/* Rotas de regiões específicas (estáticas) */}
          <Route path="/regioes/porto/pixinguinha" element={<LandingPixinguinha />} />
          <Route path="/regioes/olaria/nova-olaria" element={<LandingNovaOlaria />} />
          
          {/* Rotas dinâmicas para landing pages */}
          <Route path="/lancamento/:id" element={<DynamicLancamentoLanding />} />
          <Route path="/imovel/:id" element={<DynamicImovelLanding />} />
          
          {/* Rotas protegidas do admin */}
          <Route path="/admin/*" element={
            <ProtectedRoute>
              <Routes>
                <Route path="finalidades" element={<FinalidadesPage />} />
                <Route path="tipologias" element={<TipologiasPage />} />
                <Route path="lancamentos" element={<LancamentosAdminPage />} />
                <Route path="imoveis" element={<ImoveisAdminPage />} />
              </Routes>
            </ProtectedRoute>
          } />
          
          {/* Rota 404 - temporária */}
          <Route path="*" element={
            <div className="min-h-screen flex items-center justify-center">
              <div className="text-center">
                <h1 className="text-2xl font-bold text-gray-900 mb-4">Página não encontrada</h1>
                <p className="text-gray-600">A página que você procura não existe.</p>
              </div>
            </div>
          } />
        </Routes>
        <Toaster />
      </Router>
    </QueryClientProvider>
  );
}

export default App;
