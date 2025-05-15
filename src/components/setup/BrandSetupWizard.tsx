
import { Tabs, TabsContent } from "@/components/ui/tabs";
import { BrandInfoStep } from "./steps/BrandInfoStep";
import { TopicsStep } from "./steps/TopicsStep";
import { PersonasStep } from "./steps/PersonasStep";
import { QuestionsStep } from "./steps/QuestionsStep";
import { ReviewStep } from "./steps/ReviewStep";
import { WizardNavigation } from "./components/WizardNavigation";
import { WizardTabs } from "./components/WizardTabs";
import { useWizardState } from "./hooks/useWizardState";

export const BrandSetupWizard = () => {
  const {
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
    handleNext,
    prevStep,
    isComplete,
    getCurrentStepIndex,
    submitSetup
  } = useWizardState();

  return (
    <div className="bg-charcoal rounded-lg shadow-lg border border-black/20">
      <Tabs value={currentStep} className="w-full animate-fade-in">
        <WizardTabs
          currentStep={currentStep}
          setCurrentStep={setCurrentStep}
          isComplete={isComplete}
        />

        <TabsContent value="brand-info" className="p-6 md:p-8">
          <BrandInfoStep 
            brandInfo={brandInfo} 
            setBrandInfo={setBrandInfo} 
            products={products} 
            setProducts={setProducts} 
          />
        </TabsContent>

        <TabsContent value="topics" className="p-6 md:p-8">
          <TopicsStep 
            topics={topics} 
            setTopics={setTopics} 
            products={products} 
          />
        </TabsContent>

        <TabsContent value="personas" className="p-6 md:p-8">
          <PersonasStep 
            personas={personas} 
            setPersonas={setPersonas} 
            topics={topics}
            products={products}
          />
        </TabsContent>

        <TabsContent value="questions" className="p-6 md:p-8">
          <QuestionsStep 
            questions={questions} 
            setQuestions={setQuestions} 
            personas={personas}
          />
        </TabsContent>

        <TabsContent value="review" className="p-6 md:p-8">
          <ReviewStep 
            brandInfo={brandInfo}
            products={products}
            topics={topics}
            personas={personas}
            questions={questions}
          />
        </TabsContent>

        <WizardNavigation
          currentStep={currentStep}
          getCurrentStepIndex={getCurrentStepIndex}
          onPrevious={prevStep}
          onNext={handleNext}
          onSubmit={submitSetup}
        />
      </Tabs>
    </div>
  );
};
