
import React, { createContext, useContext, useState, useEffect } from "react";

// Define the type for our text content
type TextContentMap = Record<string, string>;

// Default text content for the entire site
const defaultTextContent: TextContentMap = {
  // Header
  "header.logo": "TunnelGrid.ai",
  "header.howItWorks": "How It Works",
  "header.benefits": "Benefits",
  "header.faqs": "FAQs",
  "header.login": "Login",
  "header.bookMeeting": "Book a meeting",
  
  // Hero section
  "hero.title": "Map the hidden",
  "hero.titleAccent": "network of AI search.",
  "hero.subtitle": "TunnelGrid.ai maps the hidden network of AI answers so brands can turn mystery into measurable strategy.",
  "hero.cta": "Book a meeting",
  "hero.watchDemo": "Watch 90-sec demo",
  "hero.stat": "73% of users now find brands through AI search",
  "hero.scroll": "Scroll",
  
  // How it works section
  "howItWorks.title": "From Maze to Control Room",
  "howItWorks.subtitle": "Our platform gives you unprecedented visibility into how AI models perceive and present your brand.",
  "howItWorks.cta": "Map your brand today",
  "howItWorks.step1.title": "The Maze",
  "howItWorks.step1.description": "AI search results feel random; brands can't see how or why they appear in responses",
  "howItWorks.step2.title": "The Descent",
  "howItWorks.step2.description": "TunnelGrid.ai drills into multiple AI models, capturing every answer, citation, and nuance",
  "howItWorks.step3.title": "The Grid",
  "howItWorks.step3.description": "Raw chaos turns into a visual grid: nodes = sources, lines = influence pathways",
  "howItWorks.step4.title": "The Control Room",
  "howItWorks.step4.description": "Shift from reaction to orchestration—optimizing content and steering AI narratives",
  
  // Benefits section
  "benefits.title": "Turn Mystery Into Strategy",
  "benefits.subtitle": "Don't leave your brand's AI presence to chance. Our platform helps you take control.",
  "benefits.benefit1.title": "AI Visibility Mapping",
  "benefits.benefit1.description": "Map your brand's presence across all major AI models in one dashboard with a visual grid of connections.",
  "benefits.benefit2.title": "Citation Intelligence",
  "benefits.benefit2.description": "Identify which sources AI models rely on when discussing your brand and optimize those critical pathways.",
  "benefits.benefit3.title": "Strategic Orchestration",
  "benefits.benefit3.description": "Follow prioritized recommendations to shift from reacting to actively orchestrating your AI narratives.",
  "benefits.learnMore": "Learn more",
  
  // Screenshot section
  "screenshot.title": "The TunnelGrid in Action",
  "screenshot.subtitle": "Visualize your brand's AI presence with our comprehensive grid mapping technology",
  "screenshot.cta": "Schedule my grid map",
  
  // FAQs section
  "faqs.title": "Frequently Asked Questions",
  "faqs.faq1.question": "What's the difference between LLM monitoring and AI Search monitoring?",
  "faqs.faq1.answer": "LLM monitoring typically tracks interactions with a specific model like ChatGPT. Our AI Search monitoring provides a comprehensive view across multiple AI search experiences including ChatGPT, Copilot, Google AI Overviews, and Perplexity, showing how your brand appears in each context with actionable insights to improve visibility.",
  "faqs.faq2.question": "How do your results differ from manual searches in AI tools?",
  "faqs.faq2.answer": "Manual searches are subject to personal search history, location bias, and inconsistent prompting. Our platform uses standardized, controlled prompts across multiple models to provide reliable, reproducible results that accurately represent how AI systems perceive your brand, eliminating variables that can skew manual testing.",
  "faqs.faq3.question": "How often is the data refreshed?",
  "faqs.faq3.answer": "Our platform automatically refreshes your brand's AI visibility data weekly to track changes over time. Premium plans offer daily refreshes, and all customers can trigger manual refreshes after implementing recommendations to see immediate impact.",
  "faqs.faq4.question": "How do you handle data privacy and confidentiality?",
  "faqs.faq4.answer": "We prioritize data security and privacy. All brand audits are conducted using isolated instances to prevent cross-contamination. Your competitive intelligence and brand data are encrypted, access-controlled, and never shared with third parties or used to train AI models.",
  "faqs.cta": "Book a meeting",
  
  // CTA section
  "cta.title": "Ready to map your brand's AI network?",
  "cta.subtitle": "Join the 250+ companies already gaining an advantage with TunnelGrid.ai",
  "cta.button": "Book Your Demo",
  
  // Footer section
  "footer.about": "Helping brands thrive in the AI-first search era by mapping the hidden network of AI answers.",
  "footer.resources": "Resources",
  "footer.company": "Company",
  "footer.blog": "Blog",
  "footer.support": "Support",
  "footer.contact": "Contact",
  "footer.about": "About",
  "footer.copyright": "© 2025 TunnelGrid.ai. All rights reserved."
};

// Create context
interface TextContentContextType {
  textContent: TextContentMap;
  updateTextContent: (key: string, value: string) => void;
  isEditMode: boolean;
  setEditMode: (value: boolean) => void;
}

const TextContentContext = createContext<TextContentContextType | undefined>(undefined);

// Provider component
export function TextContentProvider({ children }: { children: React.ReactNode }) {
  const [textContent, setTextContent] = useState<TextContentMap>(defaultTextContent);
  const [isEditMode, setEditMode] = useState<boolean>(false);

  // Load saved content from localStorage on mount
  useEffect(() => {
    const savedContent = localStorage.getItem('tunnelgrid-content');
    if (savedContent) {
      try {
        setTextContent(JSON.parse(savedContent));
      } catch (error) {
        console.error("Error loading saved content", error);
      }
    }
  }, []);

  // Save content to localStorage when it changes
  useEffect(() => {
    localStorage.setItem('tunnelgrid-content', JSON.stringify(textContent));
  }, [textContent]);

  const updateTextContent = (key: string, value: string) => {
    setTextContent(prev => ({ ...prev, [key]: value }));
  };

  return (
    <TextContentContext.Provider value={{ textContent, updateTextContent, isEditMode, setEditMode }}>
      {children}
    </TextContentContext.Provider>
  );
}

// Custom hook to use the context
export function useTextContent() {
  const context = useContext(TextContentContext);
  if (context === undefined) {
    throw new Error("useTextContent must be used within a TextContentProvider");
  }
  return context;
}

// EditableText component for inline editing
interface EditableTextProps {
  contentKey: string;
  className?: string;
  placeholder?: string;
  as?: keyof JSX.IntrinsicElements;
}

export function EditableText({ contentKey, className, placeholder, as: Component = 'span' }: EditableTextProps) {
  const { textContent, updateTextContent, isEditMode } = useTextContent();
  const [editing, setEditing] = useState(false);
  const [value, setValue] = useState(textContent[contentKey] || placeholder || '');

  // Update component value when textContent changes
  useEffect(() => {
    setValue(textContent[contentKey] || placeholder || '');
  }, [textContent, contentKey, placeholder]);

  const handleDoubleClick = () => {
    if (isEditMode) {
      setEditing(true);
    }
  };

  const handleBlur = () => {
    if (value !== textContent[contentKey]) {
      updateTextContent(contentKey, value);
    }
    setEditing(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === 'Escape') {
      e.preventDefault();
      e.currentTarget.blur();
    }
  };

  if (editing) {
    return (
      <textarea
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onBlur={handleBlur}
        onKeyDown={handleKeyDown}
        className={`${className} p-1 w-full border border-accent focus:outline-none focus:ring-2 focus:ring-accent`}
        autoFocus
      />
    );
  }

  return (
    <Component 
      className={`${className} ${isEditMode ? 'cursor-text hover:bg-accent/10' : ''}`} 
      onDoubleClick={handleDoubleClick}
    >
      {textContent[contentKey] || placeholder || ''}
    </Component>
  );
}

// EditModeToggle component for toggling edit mode
export function EditModeToggle() {
  const { isEditMode, setEditMode } = useTextContent();

  return (
    <div className="fixed bottom-4 left-4 z-50 bg-accent/90 text-primary-foreground px-3 py-2 rounded-md shadow-lg">
      <label className="flex items-center space-x-2 cursor-pointer">
        <input
          type="checkbox"
          checked={isEditMode}
          onChange={(e) => setEditMode(e.target.checked)}
          className="sr-only peer"
        />
        <span className="relative flex items-center h-6 w-11 rounded-full bg-gray-600 peer-checked:bg-green-500">
          <span className="absolute h-4 w-4 left-1 top-1 rounded-full bg-white transition-transform peer-checked:translate-x-5"></span>
        </span>
        <span>Edit Mode {isEditMode ? 'On' : 'Off'}</span>
      </label>
      {isEditMode && (
        <p className="text-xs mt-1">Double-click any text to edit</p>
      )}
    </div>
  );
}
