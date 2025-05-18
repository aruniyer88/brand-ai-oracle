
import { useState, useEffect } from "react";
import { Persona, Question } from "@/types/brandTypes";
import { useIsMobile } from "@/hooks/use-mobile";
import { QuestionsHeader } from "./questions/QuestionsHeader";
import { PersonaNavigation } from "./questions/PersonaNavigation";
import { QuestionsList } from "./questions/QuestionsList";
import { getDummyQuestions } from "./questions/getDummyQuestions";

// Dummy personas for testing (matching the ones from ReadOnlyPersonaList)
const dummyPersonas: Persona[] = [
  {
    id: "dummy-1",
    name: "Tech Professional",
    description: "Technology professionals who are looking for advanced solutions to improve workflow efficiency.",
    painPoints: ["Limited time for research", "Complex integration requirements", "Need for reliable support"],
    motivators: ["Productivity improvements", "Time savings", "Cutting-edge features"],
    demographics: {
      ageRange: "28-45",
      gender: "All genders",
      location: "Urban areas",
      goals: ["Streamline workflows", "Reduce overhead costs"]
    }
  },
  {
    id: "dummy-2",
    name: "Small Business Owner",
    description: "Entrepreneurs and small business owners seeking cost-effective solutions.",
    painPoints: ["Budget constraints", "Limited technical knowledge", "Need for simple solutions"],
    motivators: ["Cost savings", "Easy implementation", "Growth opportunities"],
    demographics: {
      ageRange: "30-55",
      gender: "All genders",
      location: "Nationwide",
      goals: ["Expand customer base", "Optimize operations"]
    }
  },
  {
    id: "dummy-3",
    name: "Creative Professional",
    description: "Designers, writers, and content creators who need tools to enhance their creative output.",
    painPoints: ["Deadline pressures", "Need for inspiration", "Technical limitations"],
    motivators: ["Enhanced creative freedom", "Collaboration features", "Portfolio showcase options"],
    demographics: {
      ageRange: "25-40",
      gender: "All genders",
      location: "Urban creative hubs",
      goals: ["Improve creative output", "Find new clients"]
    }
  }
];

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
  // Use provided personas or fallback to dummy personas if empty
  const displayPersonas = personas.length > 0 ? personas : dummyPersonas;
  
  const [selectedPersonaId, setSelectedPersonaId] = useState<string>(
    displayPersonas.length > 0 ? displayPersonas[0].id as string : ""
  );
  const isMobile = useIsMobile();

  // Generate dummy questions if none provided
  useEffect(() => {
    if (questions.length === 0 && displayPersonas.length > 0) {
      const dummyQuestionsArray: Question[] = [];
      
      // Generate 10 questions for each persona
      displayPersonas.forEach(persona => {
        const personaQuestions = getDummyQuestions(persona.id as string);
        dummyQuestionsArray.push(...personaQuestions);
      });
      
      setQuestions(dummyQuestionsArray);
    }
  }, [displayPersonas, questions.length, setQuestions]);

  // Group questions by persona
  const questionsByPersona: Record<string, Question[]> = {};
  displayPersonas.forEach(persona => {
    const personaQuestions = questions.filter(q => q.personaId === persona.id);
    questionsByPersona[persona.id as string] = personaQuestions.slice(0, 10);
  });

  // Handle persona selection
  const handlePersonaSelect = (personaId: string) => {
    setSelectedPersonaId(personaId);
  };

  return (
    <div className="space-y-6">
      <QuestionsHeader />

      <div className={`flex ${isMobile ? 'flex-col' : 'flex-row'} gap-4`}>
        {/* Persona navigation */}
        <PersonaNavigation
          personas={displayPersonas}
          selectedPersonaId={selectedPersonaId}
          onPersonaSelect={handlePersonaSelect}
          isMobile={isMobile}
        />

        {/* Questions list */}
        <div className={`${isMobile ? 'w-full' : 'w-3/4'}`}>
          <QuestionsList 
            selectedPersonaId={selectedPersonaId}
            personas={displayPersonas}
            questionsByPersona={questionsByPersona}
          />
        </div>
      </div>
    </div>
  );
};
