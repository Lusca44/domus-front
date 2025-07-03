
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Users, FileText, LogOut, Home, UserPlus } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

interface AdminSidebarProps {
  onLogout: () => void;
}

export function AdminSidebar({ onLogout }: AdminSidebarProps) {
  const location = useLocation();
  const { isAdmin } = useAuth(); // Usar a nova flag de admin

  // Menu base que todos os usuários autenticados podem ver
  const baseMenuItems = [
    {
      title: "Dashboard",
      url: "/admin/dashboard",
      icon: Home,
    },
    {
      title: "Gerenciar Leads",
      url: "/admin/leads",
      icon: Users,
    },
    {
      title: "Meu Perfil",
      url: "/admin/profile",
      icon: FileText,
    },
  ];

  // Menu item exclusivo para administradores
  const adminOnlyItems = [
    {
      title: "Cadastrar Usuários",
      url: "/admin/users",
      icon: UserPlus,
    },
  ];

  // Combinar menus baseado no tipo de usuário
  const menuItems = isAdmin 
    ? [...baseMenuItems.slice(0, 2), ...adminOnlyItems, ...baseMenuItems.slice(2)]
    : baseMenuItems;

  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="text-lg font-semibold">
            Painel {isAdmin ? 'Admin' : 'Corretor'}
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild isActive={location.pathname === item.url}>
                    <Link to={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <Button variant="outline" onClick={onLogout} className="w-full">
          <LogOut className="h-4 w-4 mr-2" />
          Sair
        </Button>
      </SidebarFooter>
    </Sidebar>
  );
}
