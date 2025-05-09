
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { BrandEntity, Product, Topic, Persona, Question } from "@/types/brandTypes";
import { useToast } from "@/hooks/use-toast";
import { STEPS, SetupStep } from "../constants/wizardSteps";

export const useWizardState = () => {
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
  };

  return {
    currentStep,
    setCurrentStep,
    brandInfo,
    setBrandInfo,
    products,
    setProducts,
    topics,
    setTopics,
    personas,
    setPersonas,
    questions,
    setQuestions,
    nextStep,
    prevStep,
    handleNext,
    isComplete,
    getCurrentStepIndex,
    submitSetup,
  };
};
