
import React, { useState, useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import { ChevronDown, ArrowRight, Play, CheckCircle, Shield, LineChart, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { AuthDialog } from "@/components/landing/AuthDialog";

export default function Index() {
  const location = useLocation();
  const [authDialogOpen, setAuthDialogOpen] = useState(false);
  const [authDialogTab, setAuthDialogTab] = useState<"login" | "book">("book");
  const [isHeaderSticky, setIsHeaderSticky] = useState(false);
  const [activeSectionId, setActiveSectionId] = useState("");
  
  // Refs for scroll animations
  const howItWorksRef = useRef<HTMLDivElement>(null);
  const benefitsRef = useRef<HTMLDivElement>(null);
  const screenshotRef = useRef<HTMLDivElement>(null);
  const faqsRef = useRef<HTMLDivElement>(null);
  
  // Check for auth dialog state from navigation
  useEffect(() => {
    if (location.state && location.state.openAuthDialog) {
      setAuthDialogTab(location.state.authTab || "login");
      setAuthDialogOpen(true);
      
      // Clear the state so it doesn't reopen on page refresh
      window.history.replaceState({}, document.title);
    }
  }, [location.state]);
  
  // Handle sticky header
  useEffect(() => {
    const handleScroll = () => {
      setIsHeaderSticky(window.scrollY > 50);
      
      // Handle active section for navigation
      const sections = [
        { id: "hero", ref: null },
        { id: "how-it-works", ref: howItWorksRef },
        { id: "benefits", ref: benefitsRef },
        { id: "screenshot", ref: screenshotRef },
        { id: "faqs", ref: faqsRef }
      ];
      
      let currentSection = "";
      sections.forEach(section => {
        if (section.ref && section.ref.current) {
          const rect = section.ref.current.getBoundingClientRect();
          if (rect.top <= 100 && rect.bottom >= 100) {
            currentSection = section.id;
          }
        }
      });
      
      if (currentSection) {
        setActiveSectionId(currentSection);
      } else if (window.scrollY < 100) {
        setActiveSectionId("hero");
      }

      // Trigger scroll animations
      document.querySelectorAll('.scroll-fade-in').forEach(el => {
        const rect = el.getBoundingClientRect();
        const isVisible = (
          rect.top <= (window.innerHeight || document.documentElement.clientHeight) * 0.85 &&
          rect.bottom >= 0
        );
        
        if (isVisible) {
          el.classList.add('visible');
        }
      });
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  // Handle citation bloom animation
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
        } else {
          entry.target.classList.remove('active');
        }
      });
    }, { threshold: 0.3 });
    
    const citationBloom = document.querySelector('.citation-bloom');
    if (citationBloom) {
      observer.observe(citationBloom);
    }
    
    return () => {
      if (citationBloom) {
        observer.unobserve(citationBloom);
      }
    };
  }, []);
  
  const handleBookMeeting = () => {
    setAuthDialogTab("book");
    setAuthDialogOpen(true);
  };
  
  // FAQ data
  const faqs = [
    {
      question: "What's the difference between LLM monitoring and AI Search monitoring?",
      answer: "LLM monitoring typically tracks interactions with a specific model like ChatGPT. Our AI Search monitoring provides a comprehensive view across multiple AI search experiences including ChatGPT, Copilot, Google AI Overviews, and Perplexity, showing how your brand appears in each context with actionable insights to improve visibility."
    },
    {
      question: "How do your results differ from manual searches in AI tools?",
      answer: "Manual searches are subject to personal search history, location bias, and inconsistent prompting. Our platform uses standardized, controlled prompts across multiple models to provide reliable, reproducible results that accurately represent how AI systems perceive your brand, eliminating variables that can skew manual testing."
    },
    {
      question: "How often is the data refreshed?",
      answer: "Our platform automatically refreshes your brand's AI visibility data weekly to track changes over time. Premium plans offer daily refreshes, and all customers can trigger manual refreshes after implementing recommendations to see immediate impact."
    },
    {
      question: "How do you handle data privacy and confidentiality?",
      answer: "We prioritize data security and privacy. All brand audits are conducted using isolated instances to prevent cross-contamination. Your competitive intelligence and brand data are encrypted, access-controlled, and never shared with third parties or used to train AI models."
    }
  ];
  
  // How it works steps data
  const howItWorksSteps = [
    {
      icon: <div className="w-12 h-12 rounded-full bg-muted text-accent flex items-center justify-center">1</div>,
      title: "Enter your brand",
      description: "Input your brand name and key competitors to establish monitoring scope"
    },
    {
      icon: <div className="w-12 h-12 rounded-full bg-muted text-accent flex items-center justify-center">2</div>,
      title: "Multi-model queries",
      description: "Our platform queries major AI models using standardized prompts"
    },
    {
      icon: <div className="w-12 h-12 rounded-full bg-muted text-accent flex items-center justify-center">3</div>,
      title: "Visibility scoring",
      description: "Receive comprehensive visibility and sentiment analysis across models"
    },
    {
      icon: <div className="w-12 h-12 rounded-full bg-muted text-accent flex items-center justify-center">4</div>,
      title: "Action plan",
      description: "Get actionable recommendations to improve AI visibility and citations"
    }
  ];

  // Benefits data
  const benefits = [
    {
      icon: <LineChart className="h-8 w-8 text-accent" />,
      title: "Comprehensive AI Visibility Tracking",
      description: "Monitor your brand's presence across all major AI models in one dashboard with side-by-side comparisons."
    },
    {
      icon: <Shield className="h-8 w-8 text-accent" />,
      title: "Citation Intelligence",
      description: "Identify which sources AI models rely on when discussing your brand and optimize those critical touchpoints."
    },
    {
      icon: <Zap className="h-8 w-8 text-accent" />,
      title: "Strategic Optimization",
      description: "Follow prioritized recommendations that have the highest impact on improving AI visibility and perception."
    }
  ];

  return (
    <div className="flex flex-col min-h-screen bg-charcoal text-foreground">
      {/* Sticky header */}
      <header className={`sticky-header fixed top-0 left-0 w-full z-50 transition-all duration-300 ${isHeaderSticky ? 'scrolled' : ''}`}>
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center">
            <a href="#" className="flex items-center gap-2">
              <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-accent">
                <path d="M16 2C8.268 2 2 8.268 2 16s6.268 14 14 14 14-6.268 14-14S23.732 2 16 2zm0 5a3 3 0 110 6 3 3 0 010-6zm5 15c-2.757 0-5-2.243-5-5a1 1 0 012 0c0 1.654 1.346 3 3 3s3-1.346 3-3a1 1 0 012 0c0 2.757-2.243 5-5 5zm-5-4a1 1 0 01-1-1v-3a1 1 0 012 0v3a1 1 0 01-1 1z" fill="currentColor" />
              </svg>
              <span className="font-mono font-bold text-xl">Rabbit Hole</span>
            </a>
          </div>

          {/* Navigation - only show on desktop and when scrolled on mobile */}
          <nav className={`hidden md:flex items-center space-x-6 ${isHeaderSticky ? 'flex' : ''}`}>
            <a href="#how-it-works" className={`text-foreground/80 hover:text-accent transition-colors ${activeSectionId === 'how-it-works' ? 'text-accent' : ''}`}>
              How It Works
            </a>
            <a href="#benefits" className={`text-foreground/80 hover:text-accent transition-colors ${activeSectionId === 'benefits' ? 'text-accent' : ''}`}>
              Benefits
            </a>
            <a href="#faqs" className={`text-foreground/80 hover:text-accent transition-colors ${activeSectionId === 'faqs' ? 'text-accent' : ''}`}>
              FAQs
            </a>
          </nav>

          {/* CTA button */}
          <Button 
            className="bg-accent text-primary-foreground hover:bg-accent/90"
            onClick={handleBookMeeting}
          >
            Book a meeting
          </Button>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero Section */}
        <section id="hero" className="relative min-h-screen flex items-center pt-16 overflow-hidden">
          <div className="absolute inset-0 z-0">
            <div className="absolute inset-0 bg-gradient-to-b from-charcoal via-navy/90 to-charcoal/90"></div>
            {/* Background network animation */}
            <div className="absolute inset-0 opacity-20">
              <svg width="100%" height="100%" viewBox="0 0 800 800" xmlns="http://www.w3.org/2000/svg">
                <g className="citation-bloom">
                  <circle className="dot" cx="400" cy="400" r="8" fill="#3BFFD3" />
                  <circle className="dot" cx="320" cy="300" r="6" fill="#3BFFD3" />
                  <circle className="dot" cx="480" cy="320" r="6" fill="#3BFFD3" />
                  <circle className="dot" cx="520" cy="450" r="5" fill="#3BFFD3" />
                  <circle className="dot" cx="280" cy="460" r="5" fill="#3BFFD3" />
                  <circle className="dot" cx="350" cy="500" r="5" fill="#3BFFD3" />
                  <circle className="dot" cx="450" cy="510" r="5" fill="#3BFFD3" />
                  <line className="line" x1="400" y1="400" x2="320" y2="300" stroke="#3BFFD3" strokeWidth="1" />
                  <line className="line" x1="400" y1="400" x2="480" y2="320" stroke="#3BFFD3" strokeWidth="1" />
                  <line className="line" x1="400" y1="400" x2="520" y2="450" stroke="#3BFFD3" strokeWidth="1" />
                  <line className="line" x1="400" y1="400" x2="280" y2="460" stroke="#3BFFD3" strokeWidth="1" />
                  <line className="line" x1="400" y1="400" x2="350" y2="500" stroke="#3BFFD3" strokeWidth="1" />
                  <line className="line" x1="400" y1="400" x2="450" y2="510" stroke="#3BFFD3" strokeWidth="1" />
                </g>
              </svg>
            </div>
          </div>
          
          <div className="container mx-auto px-4 py-20 md:py-32 relative z-10">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="space-y-8 animate-fade-in">
                <div className="space-y-6">
                  <h1 className="text-4xl md:text-5xl lg:text-6xl font-mono font-bold leading-tight tracking-tight">
                    See exactly how AI search engines talk about your brand today.
                  </h1>
                  <p className="text-xl text-foreground/80 max-w-lg">
                    Audit and boost your brand's visibility in answers from ChatGPT, Copilot, Google AI Overviews, and other AI-powered search experiences.
                  </p>
                </div>

                <div className="flex flex-wrap gap-4">
                  <Button 
                    size="lg" 
                    className="bg-accent hover:bg-accent/90 text-primary-foreground font-mono"
                    onClick={handleBookMeeting}
                  >
                    Book a meeting
                  </Button>
                  <Button 
                    size="lg" 
                    variant="link" 
                    className="text-foreground/90 hover:text-accent flex items-center gap-2"
                  >
                    <Play className="h-4 w-4" />
                    Watch 90-sec demo
                  </Button>
                </div>
              </div>

              <div className="relative hidden md:block">
                <div className="animate-float shadow-2xl rounded-xl overflow-hidden border border-white/10 backdrop-blur-sm">
                  <img src="/placeholder.svg" alt="AI Visibility Dashboard" className="w-full h-auto" />
                </div>
                <div className="absolute -bottom-6 -right-6 p-4 bg-accent/10 backdrop-blur-md border border-accent/30 rounded-lg">
                  <p className="text-accent font-mono text-sm">
                    <span className="font-bold">73%</span> of users now find brands through AI search
                  </p>
                </div>
              </div>
            </div>
            
            {/* Scroll indicator */}
            <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
              <a href="#how-it-works" className="flex flex-col items-center text-foreground/50 hover:text-accent">
                <span className="text-xs mb-2 font-mono">Scroll</span>
                <ChevronDown className="h-6 w-6" />
              </a>
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section id="how-it-works" ref={howItWorksRef} className="py-20 md:py-24 bg-navy">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-3xl mx-auto mb-12 scroll-fade-in">
              <h2 className="text-3xl md:text-4xl font-mono font-bold mb-4">How It Works</h2>
              <p className="text-lg text-foreground/80">Our platform gives you unprecedented visibility into how AI models perceive and present your brand.</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-12">
              {howItWorksSteps.map((step, index) => (
                <div key={index} className={`scroll-fade-in stagger-${index + 1}`}>
                  <div className="flex flex-col items-center text-center space-y-4 p-6 bg-darkgray rounded-lg border border-muted hover:border-accent/50 transition-colors">
                    {step.icon}
                    <h3 className="text-xl font-mono font-bold">{step.title}</h3>
                    <p className="text-foreground/70">{step.description}</p>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="mt-12 text-center">
              <Button 
                className="bg-accent hover:bg-accent/90 text-primary-foreground font-mono"
                onClick={handleBookMeeting}
              >
                Schedule my audit
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            </div>
          </div>
        </section>
        
        {/* Benefits Section */}
        <section id="benefits" ref={benefitsRef} className="py-20 md:py-24 bg-charcoal">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-3xl mx-auto mb-12 scroll-fade-in">
              <h2 className="text-3xl md:text-4xl font-mono font-bold mb-4">Unlock AI Visibility</h2>
              <p className="text-lg text-foreground/80">
                Don't leave your brand's AI presence to chance. Our platform helps you take control.
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8 mt-12">
              {benefits.map((benefit, index) => (
                <Card key={index} className={`bg-darkgray border-muted hover:border-accent/30 hover-scale scroll-fade-in stagger-${index + 1}`}>
                  <CardContent className="p-8 flex flex-col h-full">
                    <div className="mb-6">{benefit.icon}</div>
                    <h3 className="text-xl font-mono font-bold mb-3">{benefit.title}</h3>
                    <p className="text-foreground/70 flex-grow">{benefit.description}</p>
                    <div className="mt-6">
                      <Button variant="link" className="p-0 text-accent hover:text-accent/80 font-mono">
                        Learn more
                        <ArrowRight className="h-4 w-4 ml-2" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Screenshot Demo Section */}
        <section id="screenshot" ref={screenshotRef} className="py-20 md:py-24 bg-navy">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-3xl mx-auto mb-12 scroll-fade-in">
              <h2 className="text-3xl md:text-4xl font-mono font-bold mb-4">See It In Action</h2>
              <p className="text-lg text-foreground/80">
                Visualize your brand's AI presence with our comprehensive dashboard
              </p>
            </div>
            
            <div className="max-w-5xl mx-auto mt-10 relative scroll-fade-in">
              <div className="shadow-2xl rounded-xl overflow-hidden border border-accent/20">
                <div className="aspect-video bg-darkgray rounded-md overflow-hidden">
                  <img 
                    src="/placeholder.svg" 
                    alt="Rabbit Hole Analytics Dashboard" 
                    className="w-full h-full object-cover"
                  />
                  
                  {/* Play button overlay */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Button 
                      className="bg-accent hover:bg-accent/90 text-primary-foreground rounded-full h-16 w-16 flex items-center justify-center"
                      size="icon"
                    >
                      <Play className="h-8 w-8" />
                    </Button>
                  </div>
                </div>
              </div>
              
              <div className="mt-8 text-center">
                <Button 
                  className="bg-accent hover:bg-accent/90 text-primary-foreground font-mono"
                  onClick={handleBookMeeting}
                >
                  Schedule my audit call
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              </div>
            </div>
          </div>
        </section>
        
        {/* FAQs Section */}
        <section id="faqs" ref={faqsRef} className="py-20 md:py-24 bg-charcoal">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-3xl mx-auto mb-12 scroll-fade-in">
              <h2 className="text-3xl md:text-4xl font-mono font-bold mb-4">Frequently Asked Questions</h2>
            </div>
            
            <div className="max-w-3xl mx-auto mt-8 scroll-fade-in">
              <Accordion type="single" collapsible className="w-full">
                {faqs.map((faq, index) => (
                  <AccordionItem key={index} value={`item-${index}`} className="border-muted">
                    <AccordionTrigger className="text-lg font-mono font-medium hover:text-accent py-5">
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent className="text-foreground/70">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
            
            <div className="mt-12 text-center">
              <Button 
                className="bg-accent hover:bg-accent/90 text-primary-foreground font-mono"
                onClick={handleBookMeeting}
              >
                Book a meeting
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 md:py-20 bg-accent text-primary-foreground">
          <div className="container mx-auto px-4 text-center">
            <div className="max-w-3xl mx-auto space-y-6">
              <h2 className="text-3xl md:text-4xl font-mono font-bold">Ready to see your brand through AI's eyes?</h2>
              <p className="text-xl">
                Join the 250+ companies already gaining an advantage with Rabbit Hole Analytics.
              </p>
              <div className="pt-4">
                <Button 
                  size="lg" 
                  className="bg-primary-foreground text-accent hover:bg-primary-foreground/90 font-mono"
                  onClick={handleBookMeeting}
                >
                  Book Your Demo
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-navy text-foreground/80 py-12">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid gap-8 md:grid-cols-4">
            <div>
              <div className="flex items-center gap-2 mb-6">
                <svg width="24" height="24" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-accent">
                  <path d="M16 2C8.268 2 2 8.268 2 16s6.268 14 14 14 14-6.268 14-14S23.732 2 16 2zm0 5a3 3 0 110 6 3 3 0 010-6zm5 15c-2.757 0-5-2.243-5-5a1 1 0 012 0c0 1.654 1.346 3 3 3s3-1.346 3-3a1 1 0 012 0c0 2.757-2.243 5-5 5zm-5-4a1 1 0 01-1-1v-3a1 1 0 012 0v3a1 1 0 01-1 1z" fill="currentColor" />
                </svg>
                <span className="font-mono font-bold">Rabbit Hole Analytics</span>
              </div>
              <p className="text-sm text-foreground/60 mb-4">
                Helping brands thrive in the AI-first search era.
              </p>
            </div>
            
            <div>
              <h4 className="font-mono font-semibold mb-4">Product</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="/features" className="hover:text-accent">Features</a></li>
                <li><a href="/pricing" className="hover:text-accent">Pricing</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-mono font-semibold mb-4">Resources</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="/blog" className="hover:text-accent">Blog</a></li>
                <li><a href="/support" className="hover:text-accent">Support</a></li>
                <li><a href="/documentation" className="hover:text-accent">Documentation</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-mono font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="/about" className="hover:text-accent">About</a></li>
                <li><a href="/contact" className="hover:text-accent">Contact</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-muted mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-foreground/60">© 2025 Rabbit Hole Analytics. All rights reserved.</p>
            <div className="flex space-x-4 mt-4 md:mt-0">
              <a href="https://twitter.com" className="text-foreground/60 hover:text-accent">
                <span className="sr-only">Twitter</span>
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                </svg>
              </a>
              <a href="https://linkedin.com" className="text-foreground/60 hover:text-accent">
                <span className="sr-only">LinkedIn</span>
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </footer>

      {/* Book meeting dialog */}
      <AuthDialog 
        isOpen={authDialogOpen}
        onOpenChange={setAuthDialogOpen}
        defaultTab={authDialogTab}
      />
      
      {/* Add client-side JS for animations */}
      <script dangerouslySetInnerHTML={{
        __html: `
          document.addEventListener('DOMContentLoaded', function() {
            // Initialize citation bloom animation
            setTimeout(() => {
              document.querySelector('.citation-bloom')?.classList.add('active');
            }, 500);
            
            // Initialize scroll animations
            const scrollElements = document.querySelectorAll('.scroll-fade-in');
            const handleScroll = () => {
              scrollElements.forEach(el => {
                const rect = el.getBoundingClientRect();
                const isVisible = (
                  rect.top <= (window.innerHeight || document.documentElement.clientHeight) * 0.85 &&
                  rect.bottom >= 0
                );
                
                if (isVisible) {
                  el.classList.add('visible');
                }
              });
            };
            
            // Initial check
            handleScroll();
            
            // Add event listener for scroll
            window.addEventListener('scroll', handleScroll);
          });
        `
      }} />
    </div>
  );
}
