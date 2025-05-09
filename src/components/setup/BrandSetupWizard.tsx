
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
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
  const location = useLocation();

  // Initialize brand information if available from navigation state
  useEffect(() => {
    if (location.state?.selectedBrand) {
      const { name, domain } = location.state.selectedBrand;
      setBrandInfo({
        name,
        aliases: [],
        website: domain,
        socialLinks: [],
      });
    }
  }, [location.state]);

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
        if (!brandInfo.name || !brandInfo.website || products.length === 0) {
          toast({
            title: "Missing information",
            description: "Please provide brand information and select at least one product.",
            variant: "destructive",
          });
          return false;
        }
        return true;
      case "topics":
        if (topics.length === 0) {
          toast({
            title: "No topics selected",
            description: "Please select or add at least one topic.",
            variant: "destructive",
          });
          return false;
        }
        return true;
      case "personas":
        if (personas.length === 0) {
          toast({
            title: "No personas selected",
            description: "Please select or add at least one persona.",
            variant: "destructive",
          });
          return false;
        }
        return true;
      case "questions":
        if (questions.length === 0) {
          toast({
            title: "No questions defined",
            description: "Please add at least one question.",
            variant: "destructive",
          });
          return false;
        }
        return true;
      case "review":
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
        return !!brandInfo.name && !!brandInfo.website && products.length > 0;
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
      description: "Your brand setup has been saved. Running AI analysis...",
    });
    
    // Navigate to the reports page after submission
    // This would typically redirect to a loading or processing screen
    // For now we'll just display a toast
  };

  const stepLabels = {
    "brand-info": "Brand & Product",
    "topics": "Topics",
    "personas": "Personas",
    "questions": "Questions",
    "review": "Review"
  };

  return (
    <div className="border rounded-lg shadow-sm bg-white">
      <Tabs value={currentStep} className="w-full">
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

        <TabsContent value="brand-info" className="p-6">
          <BrandInfoStep brandInfo={brandInfo} setBrandInfo={setBrandInfo} products={products} setProducts={setProducts} />
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
