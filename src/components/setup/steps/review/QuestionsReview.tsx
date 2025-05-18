
import { Persona, Question } from "@/types/brandTypes";
import { ScrollArea } from "@/components/ui/scroll-area";

interface QuestionsReviewProps {
  questions: Question[];
  personas: Persona[];
}

// The same dummy personas used in other components
const dummyPersonas: Persona[] = [
  {
    id: "dummy-1",
    name: "Tech Professional",
    description: "Technology professionals who are looking for advanced solutions.",
    painPoints: ["Limited time", "Complex requirements"],
    motivators: ["Productivity", "Time savings"]
  },
  {
    id: "dummy-2",
    name: "Small Business Owner",
    description: "Entrepreneurs seeking cost-effective solutions.",
    painPoints: ["Budget constraints", "Limited technical knowledge"],
    motivators: ["Cost savings", "Easy implementation"]
  },
  {
    id: "dummy-3",
    name: "Creative Professional",
    description: "Designers and content creators who need creative tools.",
    painPoints: ["Deadline pressures", "Technical limitations"],
    motivators: ["Creative freedom", "Collaboration features"]
  }
];

// Simplified dummy questions generator
const getDummyQuestions = (personaId: string): Question[] => {
  return [
    { id: `${personaId}-1`, text: "What features are most important to you?", personaId },
    { id: `${personaId}-2`, text: "How do you evaluate solutions before purchasing?", personaId },
    { id: `${personaId}-3`, text: "What are your biggest pain points with current tools?", personaId },
    { id: `${personaId}-4`, text: "What's your budget range for this type of solution?", personaId },
    { id: `${personaId}-5`, text: "How quickly do you need to implement a new solution?", personaId }
  ];
};

export const QuestionsReview = ({ questions, personas }: QuestionsReviewProps) => {
  // Use provided personas or fallback to dummy personas if empty
  const displayPersonas = personas.length > 0 ? personas : dummyPersonas;
  
  // Use provided questions or generate dummy ones if empty
  const displayQuestions = questions.length > 0 ? questions : 
    displayPersonas.flatMap(persona => getDummyQuestions(persona.id as string));
  
  // Group questions by persona
  const questionsByPersona: Record<string, Question[]> = {};
  
  displayPersonas.forEach(persona => {
    questionsByPersona[persona.id as string] = displayQuestions.filter(
      q => q.personaId === persona.id
    );
  });
  
  // Also collect questions without a persona
  const unassignedQuestions = displayQuestions.filter(q => !q.personaId);
  
  return (
    <div className="space-y-4">
      {displayPersonas.map(persona => {
        const personaQuestions = questionsByPersona[persona.id as string];
        
        if (!personaQuestions || personaQuestions.length === 0) {
          return null;
        }
        
        return (
          <div key={persona.id} className="border border-black/20 rounded-lg bg-card-dark p-4">
            <h3 className="font-medium mb-2">{persona.name}</h3>
            <ScrollArea className="h-[200px] pr-2">
              <ol className="space-y-2 list-decimal pl-6">
                {personaQuestions.map((question) => (
                  <li key={question.id} className="text-sm">
                    {question.text}
                  </li>
                ))}
              </ol>
            </ScrollArea>
          </div>
        );
      })}
      
      {unassignedQuestions.length > 0 && (
        <div className="border border-black/20 rounded-lg bg-card-dark p-4">
          <h3 className="font-medium mb-2">General Questions</h3>
          <ScrollArea className="h-[200px] pr-2">
            <ol className="space-y-2 list-decimal pl-6">
              {unassignedQuestions.map((question) => (
                <li key={question.id} className="text-sm">
                  {question.text}
                </li>
              ))}
            </ol>
          </ScrollArea>
        </div>
      )}
    </div>
  );
};
