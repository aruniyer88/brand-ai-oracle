
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Product, Topic } from "@/types/brandTypes";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  PlusCircle,
  Edit,
  Trash2,
  Sparkles,
} from "lucide-react";
import { nanoid } from "nanoid";

interface TopicsStepProps {
  topics: Topic[];
  setTopics: (topics: Topic[]) => void;
  products: Product[];
}

export const TopicsStep = ({
  topics,
  setTopics,
  products,
}: TopicsStepProps) => {
  const [topicName, setTopicName] = useState("");
  const [topicDescription, setTopicDescription] = useState("");
  const [selectedProducts, setSelectedProducts] = useState<string[]>([]);
  const [editingTopicId, setEditingTopicId] = useState<string | null>(null);

  const resetForm = () => {
    setTopicName("");
    setTopicDescription("");
    setSelectedProducts([]);
    setEditingTopicId(null);
  };

  const addTopic = () => {
    if (!topicName.trim()) {
      return;
    }

    const newTopic: Topic = {
      id: editingTopicId || nanoid(),
      name: topicName.trim(),
      description: topicDescription.trim(),
      products: selectedProducts.length > 0 ? selectedProducts : undefined,
    };

    if (editingTopicId) {
      setTopics(topics.map((t) => (t.id === editingTopicId ? newTopic : t)));
    } else {
      setTopics([...topics, newTopic]);
    }

    resetForm();
  };

  const editTopic = (topic: Topic) => {
    setTopicName(topic.name);
    setTopicDescription(topic.description || "");
    setSelectedProducts(topic.products || []);
    setEditingTopicId(topic.id);
  };

  const deleteTopic = (id: string) => {
    setTopics(topics.filter((t) => t.id !== id));
  };

  const generateAITopics = () => {
    // In a real implementation, this would call an AI service to generate topics
    // based on the products that have been added.
    
    // For this simulation, we'll add some example topics
    const exampleTopics: Topic[] = [
      {
        id: nanoid(),
        name: "Sustainability",
        description: "Environmental impact and eco-friendly practices",
      },
      {
        id: nanoid(),
        name: "Product Quality",
        description: "Durability, materials, and manufacturing standards",
      },
      {
        id: nanoid(),
        name: "Customer Experience",
        description: "Service quality, returns policy, and customer support",
      },
    ];
    
    setTopics([...topics, ...exampleTopics]);
  };

  const toggleProductSelection = (productId: string) => {
    if (selectedProducts.includes(productId)) {
      setSelectedProducts(selectedProducts.filter((id) => id !== productId));
    } else {
      setSelectedProducts([...selectedProducts, productId]);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-xl font-semibold mb-2">Brand Topics</h2>
          <p className="text-muted-foreground">
            Define topics relevant to your brand and products.
          </p>
        </div>
        <Button onClick={generateAITopics}>
          <Sparkles className="mr-2 h-4 w-4" /> Generate Topics with AI
        </Button>
      </div>

      <div className="border rounded-lg p-4 space-y-4 bg-slate-50">
        <div className="space-y-2">
          <Label htmlFor="topic-name">Topic Name</Label>
          <Input
            id="topic-name"
            value={topicName}
            onChange={(e) => setTopicName(e.target.value)}
            placeholder="e.g., Sustainability, Budget fitness gear"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="topic-description">Description (optional)</Label>
          <Textarea
            id="topic-description"
            value={topicDescription}
            onChange={(e) => setTopicDescription(e.target.value)}
            placeholder="Briefly describe what this topic covers"
          />
        </div>

        {products.length > 0 && (
          <div className="space-y-2">
            <Label>Related Products (optional)</Label>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
              {products.map((product) => (
                <div
                  key={product.id}
                  className={`border rounded-md p-2 cursor-pointer ${
                    selectedProducts.includes(product.id as string)
                      ? "border-brand-purple bg-purple-50"
                      : "border-gray-200"
                  }`}
                  onClick={() => toggleProductSelection(product.id as string)}
                >
                  <p className="font-medium">{product.name}</p>
                  <p className="text-xs text-muted-foreground">
                    {product.category}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="flex justify-end">
          <Button onClick={addTopic}>
            {editingTopicId ? "Update Topic" : "Add Topic"}
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
        {topics.map((topic) => (
          <Card key={topic.id}>
            <CardHeader>
              <CardTitle>{topic.name}</CardTitle>
              {topic.description && (
                <CardDescription>{topic.description}</CardDescription>
              )}
            </CardHeader>
            {topic.products && topic.products.length > 0 && (
              <CardContent>
                <p className="text-sm font-medium mb-1">Related Products:</p>
                <div className="space-y-1">
                  {topic.products.map((productId) => {
                    const product = products.find((p) => p.id === productId);
                    return (
                      product && (
                        <div key={productId} className="text-sm">
                          • {product.name}
                        </div>
                      )
                    );
                  })}
                </div>
              </CardContent>
            )}
            <CardFooter className="flex justify-end space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => editTopic(topic)}
              >
                <Edit className="h-4 w-4 mr-2" /> Edit
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="text-red-500"
                onClick={() => deleteTopic(topic.id as string)}
              >
                <Trash2 className="h-4 w-4 mr-2" /> Delete
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>

      {topics.length === 0 && (
        <div className="text-center p-8 border-2 border-dashed rounded-lg">
          <p className="text-muted-foreground">
            No topics added yet. Add your first topic above or generate topics with AI.
          </p>
        </div>
      )}
    </div>
  );
};
