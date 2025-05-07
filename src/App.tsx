
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import SandboxPage from "./pages/SandboxPage";
import NotFound from "./pages/NotFound";
import BrandSetupPage from "./pages/BrandSetupPage";
import BrandSearchPage from "./pages/BrandSearchPage";
import ReportsPage from "./pages/ReportsPage";
import ReportViewPage from "./pages/ReportViewPage";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
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
          {/* Placeholder routes that will be implemented later */}
          <Route path="/audit" element={<Index />} />
          <Route path="/monitoring" element={<Index />} />
          <Route path="/analytics" element={<Index />} />
          <Route path="/settings" element={<Index />} />
          <Route path="/help" element={<Index />} />
          {/* Catch-all route */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
