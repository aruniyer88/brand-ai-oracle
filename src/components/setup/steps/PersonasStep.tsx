
import { Product, Topic, Persona } from "@/types/brandTypes";
import { ReadOnlyPersonaList } from "./personas/ReadOnlyPersonaList";
import { PersonasHeader } from "./personas/PersonasHeader";

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
      <PersonasHeader />
      
      <ReadOnlyPersonaList
        personas={personas}
        topics={topics}
        products={products}
      />
    </div>
  );
};
