
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Product, Topic, Persona } from "@/types/brandTypes";
import { Sparkles } from "lucide-react";
import { nanoid } from "nanoid";
import { PersonaForm } from "./personas/PersonaForm";
import { PersonaAccordionList } from "./personas/PersonaAccordionList";
import { EmptyState } from "./personas/EmptyState";
import { Progress } from "@/components/ui/progress";

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

  // Limit to 8 personas max
  const maxPersonasReached = personas.length >= 8;

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

    if (maxPersonasReached && !editingPersonaId) {
      // Don't add new personas if we've hit the limit
      return;
    }

    const newPersona: Persona = {
      id: editingPersonaId || nanoid(),
      name: personaName.trim(),
      description: personaDescription.trim(),
      painPoints: [...painPoints],
      motivators: [...motivators],
      demographics: { ...demographics },
      topicId: selectedTopicId && selectedTopicId !== "none" ? selectedTopicId : undefined,
      productId: selectedProductId && selectedProductId !== "none" ? selectedProductId : undefined,
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
    setSelectedTopicId(persona.topicId || "none");
    setSelectedProductId(persona.productId || "none");
    setDemographics(persona.demographics || {});
    setEditingPersonaId(persona.id);
  };

  const deletePersona = (id: string) => {
    setPersonas(personas.filter((p) => p.id !== id));
  };

  const generateAIPersonas = () => {
    // Don't generate new personas if we've hit the limit
    if (maxPersonasReached) return;
    
    // In a real implementation, this would call an AI service
    // For now, let's simulate with some example personas based on topics
    if (topics.length === 0) return;
    
    // Calculate how many personas we can still add
    const remainingSlots = 8 - personas.length;
    const topicsToUse = topics.slice(0, remainingSlots);
    
    const newPersonas: Persona[] = topicsToUse.map((topic) => ({
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
            Define personas that represent your typical customers. (Maximum: 8)
          </p>
        </div>
        <Button 
          onClick={generateAIPersonas}
          disabled={topics.length === 0 || maxPersonasReached}
        >
          <Sparkles className="mr-2 h-4 w-4" /> Generate Personas with AI
        </Button>
      </div>

      {!maxPersonasReached || editingPersonaId ? (
        <PersonaForm
          editingPersonaId={editingPersonaId}
          persona={personaFormData}
          topics={topics}
          products={products}
          onSubmit={addPersona}
          onValueChange={handleFormValueChange}
        />
      ) : (
        <div className="bg-card-dark border border-black/20 rounded-lg p-4 text-center text-sm">
          <p>You've reached the maximum of 8 personas. Edit or delete existing personas to make changes.</p>
        </div>
      )}

      <div className="mt-6 space-y-4">
        {personas.length > 0 ? (
          <PersonaAccordionList
            personas={personas}
            topics={topics}
            products={products}
            onEdit={editPersona}
            onDelete={deletePersona}
          />
        ) : (
          <EmptyState />
        )}
      </div>
    </div>
  );
};
