
import { Persona, Product, Topic } from "@/types/brandTypes";

interface PersonasReviewProps {
  personas: Persona[];
  topics: Topic[];
  products: Product[];
}

export const PersonasReview = ({ personas, topics, products }: PersonasReviewProps) => {
  if (personas.length === 0) {
    return (
      <div className="text-center p-4 bg-slate-50 rounded-md">
        <p className="text-muted-foreground">No personas added yet.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {personas.map((persona) => (
        <div
          key={persona.id}
          className="border rounded-md p-4 bg-slate-50"
        >
          <h4 className="font-semibold">{persona.name}</h4>
          <p className="text-sm">{persona.description}</p>
          
          <div className="mt-3 grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h5 className="text-sm font-medium">Pain Points:</h5>
              <ul className="list-disc pl-5 space-y-1 mt-1">
                {persona.painPoints.map((point, idx) => (
                  <li key={idx} className="text-xs">{point}</li>
                ))}
              </ul>
            </div>
            
            <div>
              <h5 className="text-sm font-medium">Motivators:</h5>
              <ul className="list-disc pl-5 space-y-1 mt-1">
                {persona.motivators.map((item, idx) => (
                  <li key={idx} className="text-xs">{item}</li>
                ))}
              </ul>
            </div>
          </div>

          {(persona.topicId || persona.productId) && (
            <div className="mt-2 text-xs">
              <h5 className="font-medium">Related To:</h5>
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
        </div>
      ))}
    </div>
  );
};
