
import { useNavigate } from "react-router-dom";
import { SidebarProvider, SidebarInset, SidebarTrigger } from "@/components/ui/sidebar";
import { AdminSidebar } from "./AdminSidebar";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";

interface AdminLayoutProps {
  children: React.ReactNode;
}

export function AdminLayout({ children }: AdminLayoutProps) {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/admin/login");
  };

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <AdminSidebar onLogout={handleLogout} />
        <SidebarInset>
          <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4 bg-white">
            <SidebarTrigger asChild>
              <Button 
                variant="ghost" 
                size="sm"
                className="h-8 w-8 p-0 hover:bg-gray-100 transition-colors"
              >
                <Menu className="h-4 w-4" />
                <span className="sr-only">Alternar menu lateral</span>
              </Button>
            </SidebarTrigger>
            <div className="ml-auto">
              <h1 className="text-xl font-semibold text-gray-900">
                Sistema Administrativo
              </h1>
            </div>
          </header>
          <main className="flex-1 p-4 bg-gray-50">
            {children}
          </main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}
