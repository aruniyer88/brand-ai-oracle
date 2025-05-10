
import React from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate, useNavigate, useSearchParams } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import Index from "./pages/Index";
import SandboxPage from "./pages/SandboxPage";
import NotFound from "./pages/NotFound";
import BrandSetupPage from "./pages/BrandSetupPage";
import BrandSearchPage from "./pages/BrandSearchPage";
import ReportsPage from "./pages/ReportsPage";
import ReportViewPage from "./pages/ReportViewPage";
import SettingsPage from "./pages/SettingsPage";
import AuthPage from "./pages/AuthPage";

const queryClient = new QueryClient();

// Redirect component for Auth page
const AuthRedirect = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const tab = searchParams.get('tab');
  
  // Navigate to home with state to trigger auth dialog
  React.useEffect(() => {
    navigate('/', { 
      state: { 
        openAuthDialog: true, 
        authTab: tab === 'signup' ? 'signup' : 'login' 
      } 
    });
  }, [navigate, tab]);
  
  return null;
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <AuthProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/sandbox" element={<SandboxPage />} />
            <Route path="/setup" element={<BrandSetupPage />} />
            <Route path="/search" element={<BrandSearchPage />} />
            <Route path="/reports" element={<ReportsPage />} />
            <Route path="/reports/:reportId" element={<ReportViewPage />} />
            <Route path="/settings" element={<SettingsPage />} />
            <Route path="/auth" element={<AuthRedirect />} />
            {/* Placeholder routes that will be implemented later */}
            <Route path="/audit" element={<Index />} />
            <Route path="/monitoring" element={<Index />} />
            <Route path="/analytics" element={<Index />} />
            <Route path="/help" element={<Index />} />
            {/* Catch-all route */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
