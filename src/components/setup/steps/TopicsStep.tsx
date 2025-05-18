
import React from "react";
import { Topic, Product } from "@/types/brandTypes";
import { TopicsHeader } from "./topics/TopicsHeader";
import { TopicsGrid } from "./topics/TopicsGrid";
import { useTopicsInitialization } from "./topics/useTopicsInitialization";

interface TopicsStepProps {
  topics: Topic[];
  setTopics: (topics: Topic[]) => void;
  products: Product[];
}

export const TopicsStep: React.FC<TopicsStepProps> = ({ 
  topics, 
  setTopics, 
  products 
}) => {
  const { handleUpdateTopic } = useTopicsInitialization(topics, setTopics);

  return (
    <div className="space-y-8 animate-fade-in">
      <TopicsHeader />
      <TopicsGrid topics={topics} onUpdateTopic={handleUpdateTopic} />
    </div>
  );
};
