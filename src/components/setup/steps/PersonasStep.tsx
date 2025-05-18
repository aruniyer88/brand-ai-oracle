
import { Product, Topic, Persona } from "@/types/brandTypes";
import { ReadOnlyPersonaList } from "./personas/ReadOnlyPersonaList";

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
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-heading font-semibold mb-2">Customer Personas</h2>
        <p className="text-text-secondary">
          These are the target personas for the brand. We've analyzed and identified 
          the key customer profiles most relevant to your audience.
        </p>
      </div>

      <ReadOnlyPersonaList
        personas={personas}
        topics={topics}
        products={products}
      />
    </div>
  );
};
