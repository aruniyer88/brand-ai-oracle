
import { useState } from "react";
import { MainLayout } from "@/components/layout/MainLayout";
import { WelcomeHeader } from "@/components/dashboard/WelcomeHeader";
import { BrandSelect } from "@/components/dashboard/BrandSelect";
import { PerceptionScoreCard } from "@/components/dashboard/PerceptionScoreCard";
import { SentimentChart } from "@/components/dashboard/SentimentChart";
import { TopicsCard } from "@/components/dashboard/TopicsCard";
import { RecommendationsCard } from "@/components/dashboard/RecommendationsCard";
import { Button } from "@/components/ui/button";
import { FileText } from "lucide-react";
import { Link } from "react-router-dom";

// Mock data
const mockTopics = [
  { id: "1", name: "Innovation", percentage: 75 },
  { id: "2", name: "Customer Service", percentage: 60 },
  { id: "3", name: "Product Quality", percentage: 85 },
  { id: "4", name: "Sustainability", percentage: 45 },
];

// Fixed the type to use string literals for priority
const mockRecommendations = [
  {
    id: "1",
    title: "Update product descriptions for better AI visibility",
    description:
      "Current product descriptions lack detailed features which affects how AI models represent your offerings. Add more specific technical specs and use cases.",
    priority: "high" as "high",
  },
  {
    id: "2",
    title: "Address sustainability narrative gap",
    description:
      "AI models have limited information about your sustainability initiatives. Consider publishing an ESG report or highlighting green practices on your website.",
    priority: "medium" as "medium",
  },
  {
    id: "3",
    title: "Improve structured data markup",
    description:
      "Add more comprehensive schema.org markup to your website to help AI models better understand your brand relationships and product hierarchy.",
    priority: "medium" as "medium",
  },
];

const Index = () => {
  const [selectedBrand, setSelectedBrand] = useState("TechPulse");
  
  const handleBrandSelect = (brandId: string) => {
    console.log("Selected brand ID:", brandId);
    // In a real app, this would trigger data loading for the selected brand
  };

  return (
    <MainLayout>
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
        <WelcomeHeader brandName={selectedBrand} />
        <div className="flex items-center space-x-2 mt-4 md:mt-0">
          <BrandSelect onSelect={handleBrandSelect} />
          <Button variant="outline">
            <FileText className="mr-2 h-4 w-4" />
            Export Report
          </Button>
        </div>
      </div>

      <div className="flex justify-end mb-6">
        <Button asChild variant="default">
          <Link to="/setup">
            Setup New Brand
          </Link>
        </Button>
      </div>

      <div className="dashboard-grid mb-8">
        <PerceptionScoreCard score={78.5} change={2.3} title="Visibility Score" />
        <PerceptionScoreCard score={65.2} change={-1.8} title="Influence Score" />
        <PerceptionScoreCard score={82.7} change={4.5} title="Brand Alignment" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-8">
        <SentimentChart />
        <TopicsCard topics={mockTopics} />
      </div>

      <RecommendationsCard recommendations={mockRecommendations} />
    </MainLayout>
  );
};

export default Index;
