
import { SidebarProvider, SidebarInset, SidebarTrigger } from "@/components/ui/sidebar";
import { AdminSidebar } from "./AdminSidebar";
import { useAuth } from "@/hooks/useAuth";

interface AdminLayoutProps {
  children: React.ReactNode;
}

export function AdminLayout({ children }: AdminLayoutProps) {
  const { logout, user } = useAuth();

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <AdminSidebar onLogout={logout} />
        <SidebarInset>
          <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4 bg-white">
            <SidebarTrigger className="h-8 w-8 p-0 hover:bg-gray-100 transition-colors -ml-1" />
            <div className="ml-auto flex items-center gap-4">
              <div className="text-sm text-gray-600">
                Bem-vindo, {user?.name || user?.email || 'Usuário'}
              </div>
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
