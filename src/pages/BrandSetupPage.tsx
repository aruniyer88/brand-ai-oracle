
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { MainLayout } from "@/components/layout/MainLayout";
import { BrandSetupWizard } from "@/components/setup/BrandSetupWizard";

const BrandSetupPage = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // Check if we have a brand from navigation
  useEffect(() => {
    if (!location.state?.selectedBrand && !location.state?.manualSetup) {
      // Redirect to home if no brand is selected and not in manual setup mode
      navigate("/");
    }
  }, [location.state, navigate]);

  return <MainLayout>
      <div className="max-w-4xl mx-auto py-8 px-4">
        <h1 className="text-3xl font-heading font-bold mb-6 text-white tracking-tight">Brand Setup</h1>
        
        <div className="relative">
          {/* Grid background overlay */}
          <div className="absolute inset-0 grid-background opacity-[0.06] rounded-lg pointer-events-none"></div>
          <BrandSetupWizard />
        </div>
      </div>
    </MainLayout>;
};

export default BrandSetupPage;
