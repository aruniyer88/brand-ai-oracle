
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { SetupStep } from "../constants/wizardSteps";

interface WizardNavigationProps {
  currentStep: SetupStep;
  getCurrentStepIndex: () => number;
  onPrevious: () => void;
  onNext: () => void;
  onSubmit: () => void;
}

export const WizardNavigation = ({
  currentStep,
  getCurrentStepIndex,
  onPrevious,
  onNext,
  onSubmit
}: WizardNavigationProps) => {
  return (
    <div className="p-6 border-t flex justify-between">
      <Button
        variant="outline"
        onClick={onPrevious}
        disabled={getCurrentStepIndex() === 0}
      >
        <ChevronLeft className="mr-2 h-4 w-4" /> Previous
      </Button>

      {currentStep !== "review" ? (
        <Button onClick={onNext}>
          Next <ChevronRight className="ml-2 h-4 w-4" />
        </Button>
      ) : (
        <Button onClick={onSubmit}>
          Submit
        </Button>
      )}
    </div>
  );
};
