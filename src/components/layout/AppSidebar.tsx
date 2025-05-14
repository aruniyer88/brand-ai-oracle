import { Search, Settings, FileText } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Sidebar, SidebarContent, SidebarGroup, SidebarGroupContent, SidebarMenu, SidebarMenuItem, SidebarMenuButton, SidebarFooter } from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
export const AppSidebar = () => {
  const location = useLocation();
  const navItems = [{
    name: "Brand Audit",
    icon: Search,
    path: "/search"
  }, {
    name: "My Reports",
    icon: FileText,
    path: "/my-reports"
  }, {
    name: "Settings",
    icon: Settings,
    path: "/settings"
  }];
  return <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <div className="px-3 py-4">
              <Link to="/search" className="flex flex-col items-center mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-accent to-accent/70 text-white rounded-xl flex items-center justify-center mb-2 shadow-md">
                  <span className="text-xl font-bold">RH</span>
                </div>
                <div className="text-center">
                  <h2 className="text-xl font-bold text-sidebar-foreground">TunnelGrid.ai</h2>
                  
                </div>
              </Link>
            </div>

            <SidebarMenu>
              {navItems.map(item => <SidebarMenuItem key={item.name}>
                  <SidebarMenuButton asChild isActive={location.pathname === item.path || item.path === "/search" && location.pathname === "/audit"} tooltip={item.name}>
                    <Link to={item.path} className="flex items-center gap-2">
                      <item.icon className="h-5 w-5" />
                      <span>{item.name}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>)}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>;
};