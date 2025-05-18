
import React from 'react';
import { Persona, Question } from "@/types/brandTypes";

interface QuestionsListProps {
  selectedPersonaId: string;
  personas: Persona[];
  questionsByPersona: Record<string, Question[]>;
}

export const QuestionsList = ({ selectedPersonaId, personas, questionsByPersona }: QuestionsListProps) => {
  return (
    <div 
      className="bg-card-dark rounded-lg border-2 border-[#00FFC2] p-4 h-[400px] overflow-auto"
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
  );
};
