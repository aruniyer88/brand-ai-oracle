
import { useState } from "react";
import { Persona, Question } from "@/types/brandTypes";
import { useIsMobile } from "@/hooks/use-mobile";
import { ScrollArea } from "@/components/ui/scroll-area";

interface QuestionsStepProps {
  questions: Question[];
  setQuestions: (questions: Question[]) => void;
  personas: Persona[];
}

export const QuestionsStep = ({
  questions,
  setQuestions,
  personas,
}: QuestionsStepProps) => {
  const [selectedPersonaId, setSelectedPersonaId] = useState<string>(
    personas.length > 0 ? personas[0].id as string : ""
  );
  const isMobile = useIsMobile();

  // Group questions by persona
  const questionsByPersona: Record<string, Question[]> = {};
  personas.forEach(persona => {
    const personaQuestions = questions.filter(q => q.personaId === persona.id);
    questionsByPersona[persona.id as string] = personaQuestions.slice(0, 10);
  });

  // Handle persona selection
  const handlePersonaSelect = (personaId: string) => {
    setSelectedPersonaId(personaId);
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-heading font-semibold mb-2">Customer Questions</h2>
        <p className="text-text-secondary">
          Review the 10 key questions we will ask AI models for each customer persona.
        </p>
      </div>

      <div className={`flex ${isMobile ? 'flex-col' : 'flex-row'} gap-4`}>
        {/* Persona navigation */}
        {isMobile ? (
          <ScrollArea className="w-full overflow-x-auto">
            <div className="flex space-x-2 pb-2">
              {personas.map((persona) => (
                <button
                  key={persona.id}
                  onClick={() => handlePersonaSelect(persona.id as string)}
                  className={`shrink-0 px-4 py-2 rounded-lg border-2 transition-all duration-300 ${
                    selectedPersonaId === persona.id
                      ? "bg-[#00FFC2] border-[#00FFC2] text-black font-medium"
                      : "bg-transparent border-[#00FFC2] text-white"
                  }`}
                >
                  {persona.name}
                </button>
              ))}
            </div>
          </ScrollArea>
        ) : (
          <div className="w-1/4 min-w-[200px]">
            <ScrollArea className="h-[400px] pr-4">
              <div className="space-y-2">
                {personas.map((persona) => (
                  <button
                    key={persona.id}
                    onClick={() => handlePersonaSelect(persona.id as string)}
                    className={`w-full text-left px-4 py-2 rounded-lg border-2 transition-all duration-300 ${
                      selectedPersonaId === persona.id
                        ? "bg-[#00FFC2] border-[#00FFC2] text-black font-medium"
                        : "bg-transparent border-[#00FFC2] text-white"
                    }`}
                  >
                    {persona.name}
                  </button>
                ))}
              </div>
            </ScrollArea>
          </div>
        )}

        {/* Questions list */}
        <div className={`${isMobile ? 'w-full' : 'w-3/4'}`}>
          <div 
            className={`bg-card-dark rounded-lg border-2 border-[#00FFC2] p-4 h-[400px] overflow-auto`}
          >
            {selectedPersonaId && personas.find(p => p.id === selectedPersonaId) ? (
              <div className="space-y-4">
                <h3 className="font-medium text-white">
                  Questions for {personas.find(p => p.id === selectedPersonaId)?.name}
                </h3>
                
                {questionsByPersona[selectedPersonaId] && 
                 questionsByPersona[selectedPersonaId].length > 0 ? (
                  <ol className="space-y-3 list-decimal pl-6">
                    {questionsByPersona[selectedPersonaId].map((question, index) => (
                      <li key={question.id || index} className="text-sm text-white">
                        {question.text}
                      </li>
                    ))}
                  </ol>
                ) : (
                  <p className="text-text-secondary text-center py-8">
                    No questions available for this persona.
                  </p>
                )}
              </div>
            ) : (
              <p className="text-text-secondary text-center py-8">
                Select a persona to view questions.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
