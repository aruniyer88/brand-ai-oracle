
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Product, Topic, Persona } from "@/types/brandTypes";
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
  X,
} from "lucide-react";
import { nanoid } from "nanoid";

interface PersonasStepProps {
  personas: Persona[];
  setPersonas: (personas: Persona[]) => void;
  topics: Topic[];
  products: Product[];
}

export const PersonasStep = ({
  personas,
  setPersonas,
  topics,
  products,
}: PersonasStepProps) => {
  const [personaName, setPersonaName] = useState("");
  const [personaDescription, setPersonaDescription] = useState("");
  const [painPoint, setPainPoint] = useState("");
  const [painPoints, setPainPoints] = useState<string[]>([]);
  const [motivator, setMotivator] = useState("");
  const [motivators, setMotivators] = useState<string[]>([]);
  const [selectedTopicId, setSelectedTopicId] = useState<string>("");
  const [selectedProductId, setSelectedProductId] = useState<string>("");
  const [demographics, setDemographics] = useState<{
    ageRange?: string;
    gender?: string;
    location?: string;
    goals?: string[];
  }>({});
  const [editingPersonaId, setEditingPersonaId] = useState<string | null>(null);
  const [goal, setGoal] = useState("");

  const resetForm = () => {
    setPersonaName("");
    setPersonaDescription("");
    setPainPoints([]);
    setMotivators([]);
    setSelectedTopicId("");
    setSelectedProductId("");
    setDemographics({});
    setEditingPersonaId(null);
    setPainPoint("");
    setMotivator("");
    setGoal("");
  };

  const addPainPoint = () => {
    if (painPoint.trim()) {
      setPainPoints((prev) => [...prev, painPoint.trim()]);
      setPainPoint("");
    }
  };

  const removePainPoint = (index: number) => {
    const updated = [...painPoints];
    updated.splice(index, 1);
    setPainPoints(updated);
  };

  const addMotivator = () => {
    if (motivator.trim()) {
      setMotivators((prev) => [...prev, motivator.trim()]);
      setMotivator("");
    }
  };

  const removeMotivator = (index: number) => {
    const updated = [...motivators];
    updated.splice(index, 1);
    setMotivators(updated);
  };

  const addGoal = () => {
    if (goal.trim()) {
      setDemographics({
        ...demographics,
        goals: [...(demographics.goals || []), goal.trim()],
      });
      setGoal("");
    }
  };

  const removeGoal = (index: number) => {
    if (demographics.goals) {
      const updated = [...demographics.goals];
      updated.splice(index, 1);
      setDemographics({
        ...demographics,
        goals: updated,
      });
    }
  };

  const addPersona = () => {
    if (!personaName.trim() || painPoints.length === 0 || motivators.length === 0) {
      return;
    }

    const newPersona: Persona = {
      id: editingPersonaId || nanoid(),
      name: personaName.trim(),
      description: personaDescription.trim(),
      painPoints: [...painPoints],
      motivators: [...motivators],
      demographics: { ...demographics },
      topicId: selectedTopicId || undefined,
      productId: selectedProductId || undefined,
    };

    if (editingPersonaId) {
      setPersonas(
        personas.map((p) => (p.id === editingPersonaId ? newPersona : p))
      );
    } else {
      setPersonas([...personas, newPersona]);
    }

    resetForm();
  };

  const editPersona = (persona: Persona) => {
    setPersonaName(persona.name);
    setPersonaDescription(persona.description);
    setPainPoints(persona.painPoints);
    setMotivators(persona.motivators);
    setSelectedTopicId(persona.topicId || "");
    setSelectedProductId(persona.productId || "");
    setDemographics(persona.demographics || {});
    setEditingPersonaId(persona.id);
  };

  const deletePersona = (id: string) => {
    setPersonas(personas.filter((p) => p.id !== id));
  };

  const generateAIPersonas = () => {
    // In a real implementation, this would call an AI service
    // For now, let's simulate with some example personas based on topics
    
    if (topics.length === 0) return;
    
    const newPersonas: Persona[] = topics.slice(0, 2).map((topic) => ({
      id: nanoid(),
      name: `${topic.name} Enthusiast`,
      description: `A person interested in ${topic.name.toLowerCase()} aspects of products`,
      painPoints: ["Difficulty finding honest information", "Overwhelmed by options"],
      motivators: ["Wants the best value", "Seeks authentic brands"],
      demographics: {
        ageRange: "25-40",
        goals: ["Make informed purchasing decisions"],
      },
      topicId: topic.id,
    }));
    
    setPersonas([...personas, ...newPersonas]);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-xl font-semibold mb-2">Customer Personas</h2>
          <p className="text-muted-foreground">
            Define personas that represent your typical customers.
          </p>
        </div>
        <Button 
          onClick={generateAIPersonas}
          disabled={topics.length === 0}
        >
          <Sparkles className="mr-2 h-4 w-4" /> Generate Personas with AI
        </Button>
      </div>

      <div className="border rounded-lg p-4 space-y-4 bg-slate-50">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="persona-name">Persona Name</Label>
            <Input
              id="persona-name"
              value={personaName}
              onChange={(e) => setPersonaName(e.target.value)}
              placeholder="e.g., Budget-Conscious Fitness Enthusiast"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="persona-description">Short Description</Label>
            <Input
              id="persona-description"
              value={personaDescription}
              onChange={(e) => setPersonaDescription(e.target.value)}
              placeholder="Briefly describe this persona"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {topics.length > 0 && (
            <div className="space-y-2">
              <Label htmlFor="topic-select">Related Topic (optional)</Label>
              <Select
                value={selectedTopicId}
                onValueChange={setSelectedTopicId}
              >
                <SelectTrigger id="topic-select">
                  <SelectValue placeholder="Select a topic" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">None</SelectItem>
                  {topics.map((topic) => (
                    <SelectItem key={topic.id} value={topic.id as string}>
                      {topic.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}

          {products.length > 0 && (
            <div className="space-y-2">
              <Label htmlFor="product-select">Related Product (optional)</Label>
              <Select
                value={selectedProductId}
                onValueChange={setSelectedProductId}
              >
                <SelectTrigger id="product-select">
                  <SelectValue placeholder="Select a product" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">None</SelectItem>
                  {products.map((product) => (
                    <SelectItem key={product.id} value={product.id as string}>
                      {product.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}
        </div>

        <div className="space-y-2">
          <Label>Pain Points</Label>
          <div className="flex space-x-2">
            <Input
              value={painPoint}
              onChange={(e) => setPainPoint(e.target.value)}
              placeholder="e.g., Finding affordable quality products"
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  addPainPoint();
                  e.preventDefault();
                }
              }}
            />
            <Button type="button" onClick={addPainPoint}>
              <PlusCircle className="h-4 w-4 mr-2" /> Add
            </Button>
          </div>

          {painPoints.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-2">
              {painPoints.map((point, index) => (
                <div
                  key={index}
                  className="flex items-center bg-white border rounded-full px-3 py-1"
                >
                  <span className="text-sm">{point}</span>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-5 w-5 p-0 ml-1"
                    onClick={() => removePainPoint(index)}
                  >
                    <X className="h-3 w-3" />
                  </Button>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="space-y-2">
          <Label>Motivators</Label>
          <div className="flex space-x-2">
            <Input
              value={motivator}
              onChange={(e) => setMotivator(e.target.value)}
              placeholder="e.g., Wants to support sustainable brands"
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  addMotivator();
                  e.preventDefault();
                }
              }}
            />
            <Button type="button" onClick={addMotivator}>
              <PlusCircle className="h-4 w-4 mr-2" /> Add
            </Button>
          </div>

          {motivators.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-2">
              {motivators.map((item, index) => (
                <div
                  key={index}
                  className="flex items-center bg-white border rounded-full px-3 py-1"
                >
                  <span className="text-sm">{item}</span>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-5 w-5 p-0 ml-1"
                    onClick={() => removeMotivator(index)}
                  >
                    <X className="h-3 w-3" />
                  </Button>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="space-y-4">
          <h3 className="text-md font-medium">Demographics (Optional)</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="age-range">Age Range</Label>
              <Input
                id="age-range"
                value={demographics.ageRange || ""}
                onChange={(e) =>
                  setDemographics({
                    ...demographics,
                    ageRange: e.target.value,
                  })
                }
                placeholder="e.g., 25-34"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="gender">Gender</Label>
              <Input
                id="gender"
                value={demographics.gender || ""}
                onChange={(e) =>
                  setDemographics({
                    ...demographics,
                    gender: e.target.value,
                  })
                }
                placeholder="e.g., Any"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="location">Location</Label>
              <Input
                id="location"
                value={demographics.location || ""}
                onChange={(e) =>
                  setDemographics({
                    ...demographics,
                    location: e.target.value,
                  })
                }
                placeholder="e.g., Urban areas"
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <Label>Goals</Label>
            <div className="flex space-x-2">
              <Input
                value={goal}
                onChange={(e) => setGoal(e.target.value)}
                placeholder="e.g., Save money while staying fit"
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    addGoal();
                    e.preventDefault();
                  }
                }}
              />
              <Button type="button" onClick={addGoal}>
                <PlusCircle className="h-4 w-4 mr-2" /> Add
              </Button>
            </div>

            {demographics.goals && demographics.goals.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-2">
                {demographics.goals.map((item, index) => (
                  <div
                    key={index}
                    className="flex items-center bg-white border rounded-full px-3 py-1"
                  >
                    <span className="text-sm">{item}</span>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-5 w-5 p-0 ml-1"
                      onClick={() => removeGoal(index)}
                    >
                      <X className="h-3 w-3" />
                    </Button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="flex justify-end">
          <Button onClick={addPersona}>
            {editingPersonaId ? "Update Persona" : "Add Persona"}
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
        {personas.map((persona) => (
          <Card key={persona.id}>
            <CardHeader>
              <CardTitle>{persona.name}</CardTitle>
              <CardDescription>{persona.description}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="text-sm font-semibold mb-1">Pain Points:</h4>
                <ul className="list-disc pl-5 space-y-1">
                  {persona.painPoints.map((point, idx) => (
                    <li key={idx} className="text-sm">{point}</li>
                  ))}
                </ul>
              </div>
              
              <div>
                <h4 className="text-sm font-semibold mb-1">Motivators:</h4>
                <ul className="list-disc pl-5 space-y-1">
                  {persona.motivators.map((item, idx) => (
                    <li key={idx} className="text-sm">{item}</li>
                  ))}
                </ul>
              </div>
              
              {persona.demographics && Object.keys(persona.demographics).length > 0 && (
                <div>
                  <h4 className="text-sm font-semibold mb-1">Demographics:</h4>
                  <div className="text-sm space-y-1">
                    {persona.demographics.ageRange && (
                      <p>Age: {persona.demographics.ageRange}</p>
                    )}
                    {persona.demographics.gender && (
                      <p>Gender: {persona.demographics.gender}</p>
                    )}
                    {persona.demographics.location && (
                      <p>Location: {persona.demographics.location}</p>
                    )}
                    {persona.demographics.goals && persona.demographics.goals.length > 0 && (
                      <div>
                        <p className="font-medium">Goals:</p>
                        <ul className="list-disc pl-5">
                          {persona.demographics.goals.map((goal, idx) => (
                            <li key={idx}>{goal}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </div>
              )}
              
              {(persona.topicId || persona.productId) && (
                <div className="text-sm">
                  <h4 className="font-semibold mb-1">Related To:</h4>
                  {persona.topicId && (
                    <p>
                      Topic: {topics.find(t => t.id === persona.topicId)?.name}
                    </p>
                  )}
                  {persona.productId && (
                    <p>
                      Product: {products.find(p => p.id === persona.productId)?.name}
                    </p>
                  )}
                </div>
              )}
            </CardContent>
            <CardFooter className="flex justify-end space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => editPersona(persona)}
              >
                <Edit className="h-4 w-4 mr-2" /> Edit
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="text-red-500"
                onClick={() => deletePersona(persona.id as string)}
              >
                <Trash2 className="h-4 w-4 mr-2" /> Delete
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>

      {personas.length === 0 && (
        <div className="text-center p-8 border-2 border-dashed rounded-lg">
          <p className="text-muted-foreground">
            No personas added yet. Add your first persona above or generate personas with AI.
          </p>
        </div>
      )}
    </div>
  );
};
