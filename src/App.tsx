
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/general-pages/HomePage";
import IndexPorto from "./pages/regioes/porto/pixinguinha/Index";
import LandingPixinguinha from "./pages/regioes/porto/pixinguinha/LandingPixinguinha";
import IndexBarra from "./pages/regioes/barra/Index";
import LandingAtlantico from "./pages/regioes/barra/atlantico/LandingAtlantico";
import IndexRecreiro from "./pages/regioes/recreio/Index";
import LandingParadise from "./pages/regioes/recreio/paradise/LandingParadise";
import NotFound from "./pages/general-pages/NotFound";
import PaginaAgradecimento from "./pages/general-pages/PaginaAgradecimento";
import AdminLogin from "./pages/admin/AdminLogin";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminLeads from "./pages/admin/AdminLeads";
import AdminProfile from "./pages/admin/AdminProfile";
import AdminSettings from "./pages/admin/AdminSettings";
import { Toaster } from "@/components/ui/toaster";

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          {/* Página inicial com hubs de regiões */}
          <Route path="/" element={<HomePage />} />

          {/* Rotas região PORTO MARAVILHA*/}
          <Route path="/porto-maravilha" element={<IndexPorto />} />
          <Route
            path="/porto-maravilha/lancamento/pixinguinha"
            element={<LandingPixinguinha />}
          />

          {/* Rotas região BARRA DA TIJUCA */}
          <Route path="/barra-tijuca" element={<IndexBarra />} />
          <Route
            path="/barra-tijuca/lancamento/atlantico"
            element={<LandingAtlantico />}
          />

          {/* Rotas região RECREIO DOS BANDEIRANTES */}
          <Route path="/recreio" element={<IndexRecreiro />} />
          <Route
            path="/recreio/lancamento/paradise"
            element={<LandingParadise />}
          />

          <Route path="/obrigado" element={<PaginaAgradecimento />} />

          {/* Rotas administrativas */}
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/admin/leads" element={<AdminLeads />} />
          <Route path="/admin/profile" element={<AdminProfile />} />
          <Route path="/admin/settings" element={<AdminSettings />} />

          {/* Rota 404 */}
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Toaster />
      </div>
    </Router>
  );
}

export default App;
