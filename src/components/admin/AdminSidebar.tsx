
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Users, FileText, LogOut, Home } from "lucide-react";
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

const menuItems = [
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

export function AdminSidebar({ onLogout }: AdminSidebarProps) {
  const location = useLocation();

  return (
    <Sidebar className="w-64 sm:w-72">
      <SidebarContent className="p-2 sm:p-4">
        <SidebarGroup>
          <SidebarGroupLabel className="text-base sm:text-lg font-semibold px-2">
            Painel Admin
          </SidebarGroupLabel>
          <SidebarGroupContent className="mt-2">
            <SidebarMenu className="space-y-1">
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton 
                    asChild 
                    isActive={location.pathname === item.url}
                    className="w-full justify-start px-3 py-2 text-sm sm:text-base"
                  >
                    <Link to={item.url} className="flex items-center gap-3">
                      <item.icon className="h-4 w-4 sm:h-5 sm:w-5" />
                      <span className="hidden sm:inline">{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className="p-2 sm:p-4">
        <Button 
          variant="outline" 
          onClick={onLogout} 
          className="w-full text-sm sm:text-base py-2"
        >
          <LogOut className="h-4 w-4 mr-2" />
          <span className="hidden sm:inline">Sair</span>
        </Button>
      </SidebarFooter>
    </Sidebar>
  );
}
