import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import HomePage from "./pages/general-pages/NewHomePage";
import LancamentosPage from "./pages/general-pages/LancamentosPage";
import ProntosPage from "./pages/general-pages/ProntosPage";
import AnunciePage from "./pages/general-pages/AnunciePage";
import ContatoPage from "./pages/general-pages/ContatoPage";
import LandingPixinguinha from "./pages/regioes/porto/pixinguinha/LandingPixinguinha";
import LandingPortoCarioca from "./pages/regioes/porto/porto-carioca/LandingPortoCarioca";
import LandingCaminhosGuanabara from "./pages/regioes/niteroi/caminhos-da-guanabara/LandingCaminhosGuanabara";
import LandingArcosPorto from "./pages/regioes/porto/arcos-do-porto/LandingArcosPorto";
import LandingCiataResidencial from "./pages/regioes/porto/ciata-residencial/LandingCiataResidencial";
import LandingNovaOlaria from "./pages/regioes/olaria/nova-olaria/LandingNovaOlaria";
import LandingOrlaMaua from "./pages/regioes/porto/orla-maua/LandingOrlaMaua";
import LandingMetropolitanDreamBarra from "./pages/regioes/barra/metropolitan-dream-barra/LandingMetropolitanDreamBarra";
import LandingAmericas19 from "./pages/regioes/recreio/americas19/LandingAmericas19";
import LandingOrlaRecreioPontal from "./pages/regioes/recreio/orla-recreio-pontal/LandingOrlaRecreioPontal";
import LandingThePierResidencial from "./pages/regioes/niteroi/the-pier-residencial/LandingThePierResidencial";
import NotFound from "./pages/general-pages/NotFound";
import PaginaAgradecimento from "./pages/general-pages/PaginaAgradecimento";
import AdminLogin from "./pages/admin/AdminLogin";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminLeads from "./pages/admin/AdminLeads";
import AdminProfile from "./pages/admin/AdminProfile";
import AdminUsers from "./pages/admin/AdminUsers";
import AdminSettings from "./pages/admin/AdminSettings";
import { ProtectedRoute } from "./components/admin/ProtectedRoute";
import { Toaster } from "@/components/ui/toaster";

// Create a client
const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <div className="App">
          <Routes>
            {/* Página inicial com hubs de regiões */}
            <Route path="/" element={<HomePage />} />
            
            {/* Novas páginas do menu */}
            <Route path="/lancamentos" element={<LancamentosPage />} />
            <Route path="/prontos" element={<ProntosPage />} />
            <Route path="/anuncie" element={<AnunciePage />} />
            <Route path="/contato" element={<ContatoPage />} />

            <Route
              path="/porto-maravilha/lancamento/pixinguinha"
              element={<LandingPixinguinha />}
            />

            <Route
              path="/porto-maravilha/lancamento/porto-carioca"
              element={<LandingPortoCarioca />}
            />
            
            <Route
              path="/lancamentos/caminhos-da-guanabara"
              element={<LandingCaminhosGuanabara />}
            />

            <Route
              path="/lancamentos/arcos-do-porto"
              element={<LandingArcosPorto />}
            />

            <Route
              path="/lancamentos/ciata-residencial"
              element={<LandingCiataResidencial />}
            />

            <Route
              path="/lancamentos/nova-olaria"
              element={<LandingNovaOlaria />}
            />

            <Route
              path="/lancamentos/orla-maua"
              element={<LandingOrlaMaua />}
            />

            <Route
              path="/lancamentos/metropolitan-dream-barra"
              element={<LandingMetropolitanDreamBarra />}
            />

            <Route
              path="/lancamentos/americas19"
              element={<LandingAmericas19 />}
            />

            <Route
              path="/lancamentos/orla-recreio-pontal"
              element={<LandingOrlaRecreioPontal />}
            />

            <Route
              path="/lancamentos/the-pier-residencial"
              element={<LandingThePierResidencial />}
            />

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
