
import { Toaster } from "@/components/ui/toaster";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import { cn } from "@/lib/utils";
import { 
  SidebarProvider, 
  SidebarTrigger,
  SidebarInset
} from "@/components/ui/sidebar";
import { AppSidebar } from "./AppSidebar";
import { useIsMobile } from "@/hooks/use-mobile";

interface MainLayoutProps {
  children: React.ReactNode;
  fullWidth?: boolean;
}

export const MainLayout = ({ children, fullWidth = false }: MainLayoutProps) => {
  const isMobile = useIsMobile();

  return (
    <SidebarProvider defaultOpen={!isMobile}>
      <div className="flex min-h-screen w-full bg-background">
        <AppSidebar />
        <SidebarInset className={cn(
          "px-4 py-6 md:px-8", 
          fullWidth ? "max-w-none" : "max-w-7xl mx-auto"
        )}>
          <header className="flex items-center justify-between mb-6">
            <SidebarTrigger className="md:hidden" />
          </header>
          <main>{children}</main>
        </SidebarInset>
      </div>
      <Toaster />
    </SidebarProvider>
  );
};
