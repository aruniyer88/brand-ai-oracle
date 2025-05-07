
import { Toaster } from "@/components/ui/toaster";
import { SidebarNav } from "./SidebarNav";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import { cn } from "@/lib/utils";

interface MainLayoutProps {
  children: React.ReactNode;
}

export const MainLayout = ({ children }: MainLayoutProps) => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  return (
    <div className="flex min-h-screen bg-background">
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-50 flex w-64 flex-col bg-sidebar transition-transform duration-300 ease-in-out lg:static lg:translate-x-0",
          !sidebarOpen && "-translate-x-full"
        )}
      >
        <SidebarNav />
      </aside>
      <div className="flex flex-1 flex-col">
        <header className="sticky top-0 z-40 flex h-16 items-center border-b bg-background px-4 lg:px-6">
          <Button
            variant="ghost"
            className="mr-2 lg:hidden"
            onClick={toggleSidebar}
          >
            <Menu className="h-6 w-6" />
            <span className="sr-only">Toggle sidebar</span>
          </Button>
          <div className="flex flex-1 items-center justify-end space-x-4">
            <div className="flex items-center space-x-1">
              <Button variant="ghost" size="sm">
                Help
              </Button>
              <Button variant="ghost" size="sm">
                Account
              </Button>
            </div>
          </div>
        </header>
        <main className="flex-1 overflow-auto px-4 py-8 lg:px-8">{children}</main>
      </div>
      <Toaster />
    </div>
  );
};
