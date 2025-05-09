
import { MainLayout } from "@/components/layout/MainLayout";

const SettingsPage = () => {
  return (
    <MainLayout>
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Account Settings</h1>
        <div className="border rounded-lg shadow-sm bg-white p-6">
          <p className="text-muted-foreground">
            Account management options will be available here.
          </p>
        </div>
      </div>
    </MainLayout>
  );
};

export default SettingsPage;
