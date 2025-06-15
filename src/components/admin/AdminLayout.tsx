
import { useNavigate } from "react-router-dom";
import { SidebarProvider, SidebarInset, SidebarTrigger } from "@/components/ui/sidebar";
import { AdminSidebar } from "./AdminSidebar";

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
        <SidebarInset className="flex-1">
          <header className="flex h-14 sm:h-16 shrink-0 items-center gap-2 border-b px-2 sm:px-4 bg-white">
            <SidebarTrigger className="h-8 w-8 p-0 hover:bg-gray-100 transition-colors" />
            <div className="ml-auto">
              <h1 className="text-lg sm:text-xl font-semibold text-gray-900">
                Sistema Administrativo
              </h1>
            </div>
          </header>
          <main className="flex-1 p-2 sm:p-4 bg-gray-50 min-h-[calc(100vh-3.5rem)] sm:min-h-[calc(100vh-4rem)]">
            {children}
          </main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}
