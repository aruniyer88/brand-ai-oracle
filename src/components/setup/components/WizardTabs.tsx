
import { TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CheckCircle } from "lucide-react";
import { STEPS, SetupStep, stepLabels } from "../constants/wizardSteps";

interface WizardTabsProps {
  currentStep: SetupStep;
  setCurrentStep: (step: SetupStep) => void;
  isComplete: (step: SetupStep) => boolean;
}

export const WizardTabs = ({
  currentStep,
  setCurrentStep,
  isComplete
}: WizardTabsProps) => {
  return (
    <TabsList className="w-full grid grid-cols-5 mb-4 rounded-t-lg bg-slate-100/80">
      {STEPS.map((step) => (
        <TabsTrigger
          key={step}
          value={step}
          onClick={() => setCurrentStep(step)}
          disabled={false}
          className="relative"
        >
          {isComplete(step) && (
            <CheckCircle className="h-4 w-4 absolute -top-1 -right-1 text-green-500" />
          )}
          {stepLabels[step]}
        </TabsTrigger>
      ))}
    </TabsList>
  );
};
