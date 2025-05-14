
import { Toaster } from "@/components/ui/toaster";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Menu, LogOut } from "lucide-react";
import { cn } from "@/lib/utils";
import { SidebarProvider, SidebarTrigger, SidebarInset } from "@/components/ui/sidebar";
import { AppSidebar } from "./AppSidebar";
import { useIsMobile } from "@/hooks/use-mobile";
import { useAuth } from "@/contexts/AuthContext";
import { Navigate } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface MainLayoutProps {
  children: React.ReactNode;
  fullWidth?: boolean;
  requireAuth?: boolean;
}

export const MainLayout = ({
  children,
  fullWidth = false,
  requireAuth = true
}: MainLayoutProps) => {
  const isMobile = useIsMobile();
  const {
    user,
    loading,
    signOut
  } = useAuth();

  // If authentication is required and the user is not authenticated, redirect to login
  if (requireAuth && !loading && !user) {
    return <Navigate to="/auth" replace />;
  }
  
  return (
    <SidebarProvider defaultOpen={!isMobile}>
      <div className="flex min-h-screen w-full bg-background">
        <AppSidebar />
        <SidebarInset className={cn("px-4 py-6 md:px-8", fullWidth ? "max-w-none" : "max-w-7xl mx-auto")}>
          <header className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <SidebarTrigger className="md:hidden" />
              <div className="hidden md:flex items-center gap-2">
                <img src="/logo.png" alt="TunnelGrid.ai Logo" className="w-8 h-8" />
                <span className="font-mono font-bold text-xl">TunnelGrid.ai</span>
              </div>
            </div>
            
            {user && (
              <div className="ml-auto flex items-center gap-2">
                <Avatar className="h-8 w-8">
                  <AvatarFallback>{user.email?.charAt(0) || 'U'}</AvatarFallback>
                </Avatar>
                <Button variant="ghost" size="sm" onClick={() => signOut()}>
                  <LogOut className="h-4 w-4 mr-2" />
                  Logout
                </Button>
              </div>
            )}
          </header>
          <main>{children}</main>
        </SidebarInset>
      </div>
      <Toaster />
    </SidebarProvider>
  );
};
