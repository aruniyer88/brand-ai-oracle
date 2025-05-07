
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BrandInfoStep } from "./steps/BrandInfoStep";
import { ProductsStep } from "./steps/ProductsStep";
import { TopicsStep } from "./steps/TopicsStep";
import { PersonasStep } from "./steps/PersonasStep";
import { QuestionsStep } from "./steps/QuestionsStep";
import { ReviewStep } from "./steps/ReviewStep";
import { Button } from "@/components/ui/button";
import { BrandEntity, Product, Topic, Persona, Question } from "@/types/brandTypes";
import { AlertTriangle, CheckCircle, ChevronLeft, ChevronRight } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const STEPS = [
  "brand-info",
  "products",
  "topics",
  "personas",
  "questions",
  "review"
] as const;

type SetupStep = typeof STEPS[number];

export const BrandSetupWizard = () => {
  const [currentStep, setCurrentStep] = useState<SetupStep>("brand-info");
  const [brandInfo, setBrandInfo] = useState<BrandEntity>({
    name: "",
    aliases: [],
    website: "",
    socialLinks: [],
  });
  const [products, setProducts] = useState<Product[]>([]);
  const [topics, setTopics] = useState<Topic[]>([]);
  const [personas, setPersonas] = useState<Persona[]>([]);
  const [questions, setQuestions] = useState<Question[]>([]);
  const { toast } = useToast();

  const getCurrentStepIndex = () => STEPS.indexOf(currentStep);
  
  const nextStep = () => {
    const currentIndex = getCurrentStepIndex();
    if (currentIndex < STEPS.length - 1) {
      setCurrentStep(STEPS[currentIndex + 1]);
    }
  };

  const prevStep = () => {
    const currentIndex = getCurrentStepIndex();
    if (currentIndex > 0) {
      setCurrentStep(STEPS[currentIndex - 1]);
    }
  };

  const validateCurrentStep = (): boolean => {
    switch (currentStep) {
      case "brand-info":
        if (!brandInfo.name || !brandInfo.website) {
          toast({
            title: "Missing information",
            description: "Please provide brand name and website.",
            variant: "destructive",
          });
          return false;
        }
        return true;
      case "products":
        if (products.length === 0) {
          toast({
            title: "No products added",
            description: "Please add at least one product.",
            variant: "destructive",
          });
          return false;
        }
        return true;
      // For the other steps, let's allow moving forward even if not completed
      default:
        return true;
    }
  };

  const handleNext = () => {
    if (validateCurrentStep()) {
      nextStep();
    }
  };

  const isComplete = (step: SetupStep): boolean => {
    switch (step) {
      case "brand-info":
        return !!brandInfo.name && !!brandInfo.website;
      case "products":
        return products.length > 0;
      case "topics":
        return topics.length > 0;
      case "personas":
        return personas.length > 0;
      case "questions":
        return questions.length > 0;
      case "review":
        return false; // Review is never "complete"
    }
  };

  const submitSetup = () => {
    // Here we would send the data to the backend
    toast({
      title: "Setup Complete",
      description: "Your brand setup has been saved.",
    });
  };

  return (
    <div className="border rounded-lg shadow-sm bg-white">
      <Tabs value={currentStep} className="w-full">
        <TabsList className="w-full grid grid-cols-6 mb-4 rounded-t-lg bg-slate-100/80">
          {STEPS.map((step) => (
            <TabsTrigger
              key={step}
              value={step}
              onClick={() => setCurrentStep(step)}
              disabled={false} // Let them jump around
              className="relative"
            >
              {isComplete(step) && (
                <CheckCircle className="h-4 w-4 absolute -top-1 -right-1 text-green-500" />
              )}
              {step
                .split("-")
                .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                .join(" ")}
            </TabsTrigger>
          ))}
        </TabsList>

        <TabsContent value="brand-info" className="p-6">
          <BrandInfoStep brandInfo={brandInfo} setBrandInfo={setBrandInfo} />
        </TabsContent>

        <TabsContent value="products" className="p-6">
          <ProductsStep products={products} setProducts={setProducts} />
        </TabsContent>

        <TabsContent value="topics" className="p-6">
          <TopicsStep 
            topics={topics} 
            setTopics={setTopics} 
            products={products} 
          />
        </TabsContent>

        <TabsContent value="personas" className="p-6">
          <PersonasStep 
            personas={personas} 
            setPersonas={setPersonas} 
            topics={topics}
            products={products}
          />
        </TabsContent>

        <TabsContent value="questions" className="p-6">
          <QuestionsStep 
            questions={questions} 
            setQuestions={setQuestions} 
            personas={personas}
          />
        </TabsContent>

        <TabsContent value="review" className="p-6">
          <ReviewStep 
            brandInfo={brandInfo}
            products={products}
            topics={topics}
            personas={personas}
            questions={questions}
          />
        </TabsContent>

        <div className="p-6 border-t flex justify-between">
          <Button
            variant="outline"
            onClick={prevStep}
            disabled={getCurrentStepIndex() === 0}
          >
            <ChevronLeft className="mr-2 h-4 w-4" /> Previous
          </Button>

          {currentStep !== "review" ? (
            <Button onClick={handleNext}>
              Next <ChevronRight className="ml-2 h-4 w-4" />
            </Button>
          ) : (
            <Button onClick={submitSetup}>
              Submit
            </Button>
          )}
        </div>
      </Tabs>
    </div>
  );
};
