
import { Persona, Question } from "@/types/brandTypes";
import { ScrollArea } from "@/components/ui/scroll-area";

interface QuestionsReviewProps {
  questions: Question[];
  personas: Persona[];
}

export const QuestionsReview = ({ questions, personas }: QuestionsReviewProps) => {
  // Group questions by persona
  const questionsByPersona: Record<string, Question[]> = {};
  
  personas.forEach(persona => {
    questionsByPersona[persona.id as string] = questions.filter(
      q => q.personaId === persona.id
    );
  });
  
  // Also collect questions without a persona
  const unassignedQuestions = questions.filter(q => !q.personaId);
  
  if (questions.length === 0) {
    return (
      <div className="text-center p-4 bg-card-dark rounded-md border border-black/20">
        <p className="text-text-secondary">No questions added yet.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {personas.map(persona => {
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
