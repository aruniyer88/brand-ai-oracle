
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Persona, Question } from "@/types/brandTypes";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  PlusCircle,
  Edit,
  Trash2,
  Sparkles,
} from "lucide-react";
import { nanoid } from "nanoid";

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
  const [questionText, setQuestionText] = useState("");
  const [selectedPersonaId, setSelectedPersonaId] = useState<string>("");
  const [editingQuestionId, setEditingQuestionId] = useState<string | null>(null);

  const resetForm = () => {
    setQuestionText("");
    setSelectedPersonaId("");
    setEditingQuestionId(null);
  };

  const addQuestion = () => {
    if (!questionText.trim()) {
      return;
    }

    const newQuestion: Question = {
      id: editingQuestionId || nanoid(),
      text: questionText.trim(),
      personaId: selectedPersonaId || undefined,
    };

    if (editingQuestionId) {
      setQuestions(
        questions.map((q) => (q.id === editingQuestionId ? newQuestion : q))
      );
    } else {
      setQuestions([...questions, newQuestion]);
    }

    resetForm();
  };

  const editQuestion = (question: Question) => {
    setQuestionText(question.text);
    setSelectedPersonaId(question.personaId || "");
    setEditingQuestionId(question.id);
  };

  const deleteQuestion = (id: string) => {
    setQuestions(questions.filter((q) => q.id !== id));
  };

  const generateAIQuestions = () => {
    // In a real implementation, this would call an AI service
    // For now, let's simulate with some example questions
    
    if (personas.length === 0) return;
    
    // Generate questions for each persona
    const newQuestions: Question[] = [];
    
    personas.forEach(persona => {
      // Generate 2-3 questions per persona
      const personaQuestions = [
        {
          id: nanoid(),
          text: `What are the best ${persona.name.toLowerCase()} options in the market?`,
          personaId: persona.id,
        },
        {
          id: nanoid(),
          text: `How do I choose a product that addresses ${persona.painPoints[0]?.toLowerCase() || "my needs"}?`,
          personaId: persona.id,
        },
      ];
      
      newQuestions.push(...personaQuestions);
    });
    
    setQuestions([...questions, ...newQuestions]);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-xl font-semibold mb-2">Customer Questions</h2>
          <p className="text-muted-foreground">
            Define typical questions that your customers might ask AI systems.
          </p>
        </div>
        <Button 
          onClick={generateAIQuestions}
          disabled={personas.length === 0}
        >
          <Sparkles className="mr-2 h-4 w-4" /> Generate Questions with AI
        </Button>
      </div>

      <div className="border rounded-lg p-4 space-y-4 bg-slate-50">
        <div className="space-y-2">
          <Label htmlFor="question-text">Question</Label>
          <Input
            id="question-text"
            value={questionText}
            onChange={(e) => setQuestionText(e.target.value)}
            placeholder="e.g., What's the best gym wear for hot climates?"
          />
        </div>

        {personas.length > 0 && (
          <div className="space-y-2">
            <Label htmlFor="persona-select">Related Persona (optional)</Label>
            <Select
              value={selectedPersonaId}
              onValueChange={setSelectedPersonaId}
            >
              <SelectTrigger id="persona-select">
                <SelectValue placeholder="Select a persona" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="none">None</SelectItem>
                {personas.map((persona) => (
                  <SelectItem key={persona.id} value={persona.id as string}>
                    {persona.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        )}

        <div className="flex justify-end">
          <Button onClick={addQuestion}>
            {editingQuestionId ? "Update Question" : "Add Question"}
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
        {questions.map((question) => (
          <Card key={question.id}>
            <CardHeader>
              <CardTitle className="text-lg">{question.text}</CardTitle>
              {question.personaId && (
                <CardDescription>
                  Asked by: {personas.find(p => p.id === question.personaId)?.name || "Unknown persona"}
                </CardDescription>
              )}
            </CardHeader>
            <CardFooter className="flex justify-end space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => editQuestion(question)}
              >
                <Edit className="h-4 w-4 mr-2" /> Edit
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="text-red-500"
                onClick={() => deleteQuestion(question.id as string)}
              >
                <Trash2 className="h-4 w-4 mr-2" /> Delete
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>

      {questions.length === 0 && (
        <div className="text-center p-8 border-2 border-dashed rounded-lg">
          <p className="text-muted-foreground">
            No questions added yet. Add your first question above or generate questions with AI.
          </p>
        </div>
      )}
    </div>
  );
};
