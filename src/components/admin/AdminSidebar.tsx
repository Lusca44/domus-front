import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Users, FileText, LogOut, Home, UserPlus, Globe, Building } from "lucide-react";
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
  const { isAdmin } = useAuth();

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
  ];

  // Menu items exclusivos para administradores
  const adminOnlyItems = [
    {
      title: "Usuários",
      url: "/admin/users",
      icon: UserPlus,
    },
    {
      title: "Finalidades",
      url: "/admin/finalidades",
      icon: Building,
    },
    {
      title: "Tipologias",
      url: "/admin/tipologias",
      icon: Home,
    },
    {
      title: "Lançamentos",
      url: "/admin/lancamentos",
      icon: Building,
    },
    {
      title: "Imóveis",
      url: "/admin/imoveis",
      icon: Home,
    },
    {
      title: "Regioes",
      url: "/admin/regioes",
      icon: Home,
    },
  ];

  // Menu items que aparecem para todos
  const bottomMenuItems = [
    {
      title: "Meu Perfil",
      url: "/admin/profile",
      icon: FileText,
    },
    {
      title: "Ir para o site",
      url: "/",
      icon: Globe,
    },
  ];

  // Combinar menus baseado no tipo de usuário
  const menuItems = isAdmin 
    ? [...baseMenuItems, ...adminOnlyItems, ...bottomMenuItems]
    : [...baseMenuItems, ...bottomMenuItems];

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
