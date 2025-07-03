
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/general-pages/HomePage";
import LandingPixinguinha from "./pages/regioes/porto/pixinguinha/LandingPixinguinha";
import LandingPortoCarioca from "./pages/regioes/porto/porto-carioca/LandingPortoCarioca";
import LandingAtlantico from "./pages/regioes/barra/atlantico/LandingAtlantico";
import LandingParadise from "./pages/regioes/recreio/paradise/LandingParadise";
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

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          {/* Página inicial com hubs de regiões */}
          <Route path="/" element={<HomePage />} />

          <Route
            path="/porto-maravilha/lancamento/pixinguinha"
            element={<LandingPixinguinha />}
          />

          <Route
            path="/porto-maravilha/lancamento/porto-carioca"
            element={<LandingPortoCarioca />}
          />

          <Route
            path="/barra-tijuca/lancamento/atlantico"
            element={<LandingAtlantico />}
          />

          <Route
            path="/recreio/lancamento/paradise"
            element={<LandingParadise />}
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
  );
}

export default App;
