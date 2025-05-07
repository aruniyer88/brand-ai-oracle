
import { useState } from "react";
import { MainLayout } from "@/components/layout/MainLayout";
import { BrandSetupWizard } from "@/components/setup/BrandSetupWizard";

const BrandSetupPage = () => {
  return (
    <MainLayout>
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Brand Setup</h1>
        <p className="text-muted-foreground mb-8">
          Define your brand's information to generate a comprehensive AI perception report.
        </p>
        <BrandSetupWizard />
      </div>
    </MainLayout>
  );
};

export default BrandSetupPage;
