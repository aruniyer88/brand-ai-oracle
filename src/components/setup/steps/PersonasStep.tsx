
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Product, Topic, Persona } from "@/types/brandTypes";
import { Sparkles } from "lucide-react";
import { nanoid } from "nanoid";
import { PersonaForm } from "./personas/PersonaForm";
import { PersonaCard } from "./personas/PersonaCard";
import { EmptyState } from "./personas/EmptyState";

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
  const [painPoints, setPainPoints] = useState<string[]>([]);
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

  const resetForm = () => {
    setPersonaName("");
    setPersonaDescription("");
    setPainPoints([]);
    setMotivators([]);
    setSelectedTopicId("");
    setSelectedProductId("");
    setDemographics({});
    setEditingPersonaId(null);
  };

  const handleFormValueChange = (field: string, value: any) => {
    switch (field) {
      case "name":
        setPersonaName(value);
        break;
      case "description":
        setPersonaDescription(value);
        break;
      case "painPoints":
        setPainPoints(value);
        break;
      case "motivators":
        setMotivators(value);
        break;
      case "topicId":
        setSelectedTopicId(value);
        break;
      case "productId":
        setSelectedProductId(value);
        break;
      case "demographics":
        setDemographics(value);
        break;
      default:
        break;
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

  const personaFormData = {
    name: personaName,
    description: personaDescription,
    painPoints,
    motivators,
    demographics,
    topicId: selectedTopicId,
    productId: selectedProductId,
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-xl font-heading font-semibold mb-2">Customer Personas</h2>
          <p className="text-text-secondary">
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

      <PersonaForm
        editingPersonaId={editingPersonaId}
        persona={personaFormData}
        topics={topics}
        products={products}
        onSubmit={addPersona}
        onValueChange={handleFormValueChange}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
        {personas.map((persona) => (
          <PersonaCard
            key={persona.id}
            persona={persona}
            topics={topics}
            products={products}
            onEdit={editPersona}
            onDelete={deletePersona}
          />
        ))}
      </div>

      {personas.length === 0 && <EmptyState />}
    </div>
  );
};
