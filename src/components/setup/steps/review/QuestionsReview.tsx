
import { Persona, Question } from "@/types/brandTypes";

interface QuestionsReviewProps {
  questions: Question[];
  personas: Persona[];
}

export const QuestionsReview = ({ questions, personas }: QuestionsReviewProps) => {
  if (questions.length === 0) {
    return (
      <div className="text-center p-4 bg-slate-50 rounded-md">
        <p className="text-muted-foreground">No questions added yet.</p>
      </div>
    );
  }

  return (
    <div className="space-y-2">
      {questions.map((question) => (
        <div
          key={question.id}
          className="border rounded-md p-3 bg-slate-50"
        >
          <p className="font-medium">{question.text}</p>
          {question.personaId && (
            <p className="text-xs text-muted-foreground mt-1">
              Asked by: {personas.find(p => p.id === question.personaId)?.name || "Unknown persona"}
            </p>
          )}
        </div>
      ))}
    </div>
  );
};
