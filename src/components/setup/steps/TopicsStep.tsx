
import { useEffect } from "react";
import { nanoid } from "nanoid";
import { Topic, Product } from "@/types/brandTypes";
import { TopicChip } from "./topics/TopicChip";

interface TopicsStepProps {
  topics: Topic[];
  setTopics: (topics: Topic[]) => void;
  products: Product[];
}

// Sample topics to pre-populate if none exist
const sampleTopics = [
  "Product Quality",
  "Customer Service",
  "Sustainability",
  "Innovation",
  "Value for Money",
  "Brand Reputation",
  "User Experience",
  "Product Features",
  "Reliability",
  "Industry Trends"
];

export const TopicsStep = ({ topics, setTopics, products }: TopicsStepProps) => {
  // Pre-populate with sample topics if none exist
  useEffect(() => {
    if (topics.length === 0) {
      const initialTopics = sampleTopics.map(name => ({
        id: nanoid(),
        name,
        description: ""
      }));
      setTopics(initialTopics);
    }
  }, [topics.length, setTopics]);

  const handleUpdateTopic = (updatedTopic: Topic) => {
    setTopics(topics.map(topic => 
      topic.id === updatedTopic.id ? updatedTopic : topic
    ));
  };

  return (
    <div className="space-y-8 animate-fade-in">
      <div>
        <div className="flex items-center gap-2 mb-2">
          <span className="bg-brand-purple/20 text-brand-purple text-xs font-medium px-2.5 py-1 rounded-full">
            Step 2 of 5
          </span>
        </div>
        <h2 className="text-2xl font-heading mb-2 text-white tracking-tight bg-gradient-to-r from-brand-blue via-brand-purple to-brand-cyan bg-clip-text text-transparent">
          Brand Topics
        </h2>
        <p className="text-muted-foreground mb-6">
          These are the key topics that your audience commonly discusses about your brand. 
          Click on any topic to edit it.
        </p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {topics.map((topic) => (
          <TopicChip
            key={topic.id}
            topic={topic}
            onUpdate={handleUpdateTopic}
          />
        ))}
      </div>

      {topics.length === 0 && (
        <div className="text-center p-8 border-2 border-dashed rounded-lg">
          <p className="text-muted-foreground">
            No topics available. Please add topics to continue.
          </p>
        </div>
      )}
    </div>
  );
};
