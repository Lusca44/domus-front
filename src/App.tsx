
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import IndexPorto from "./pages/regioes/porto/pixinguinha/Index";
import LandingPixinguinha from "./pages/regioes/porto/pixinguinha/LandingPixinguinha";
import NotFound from "./pages/NotFound";
import PaginaAgradecimento from "./pages/PaginaAgradecimento";
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
          {/* Rotas região PORTO MARAVILHA*/}
          <Route path="/porto-maravilha" element={<IndexPorto />} />
          <Route path="/porto-maravilha/lancamento/pixinguinha" element={<LandingPixinguinha />} />
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
