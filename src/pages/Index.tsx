import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ChevronRight, Play, CheckCircle, BarChart2, LineChart, AlertTriangle, MessageSquare } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { LandingHero } from "@/components/landing/LandingHero";
import { LandingFeature } from "@/components/landing/LandingFeature";
import { LandingCTA } from "@/components/landing/LandingCTA";
import { LandingSection } from "@/components/landing/LandingSection";
import { LandingTestimonial } from "@/components/landing/LandingTestimonial";
import { LandingWalkthrough } from "@/components/landing/LandingWalkthrough";
import { AnnouncementBar } from "@/components/landing/AnnouncementBar";
import { AuthDialog } from "@/components/landing/AuthDialog";

export default function Index() {
  const location = useLocation();
  const [authDialogOpen, setAuthDialogOpen] = useState(false);
  const [authDialogTab, setAuthDialogTab] = useState<"login" | "signup">("login");
  
  // Check for auth dialog state from navigation
  useEffect(() => {
    if (location.state && location.state.openAuthDialog) {
      setAuthDialogTab(location.state.authTab || "login");
      setAuthDialogOpen(true);
      
      // Clear the state so it doesn't reopen on page refresh
      window.history.replaceState({}, document.title);
    }
  }, [location.state]);

  // Features section data
  const features = [{
    title: "AI Visibility + Influence Score",
    description: "Our proprietary 0-100 metric shows exactly where your brand stands in AI-generated content across platforms.",
    icon: BarChart2
  }, {
    title: "Multi-Model Dashboard",
    description: "Compare side-by-side how ChatGPT, Claude, and Perplexity perceive and present your brand.",
    icon: LineChart
  }, {
    title: "Hallucination & Outdated Info Alerts",
    description: "Automatically flag incorrect or outdated information about your brand before customers see it.",
    icon: AlertTriangle
  }, {
    title: "Action-Plan Generator",
    description: "Get prioritized, AI-focused SEO recommendations ranked by potential impact on visibility.",
    icon: MessageSquare
  }];
  
  // FAQs section data
  const faqs = [{
    question: "How much does Rabbit Hole Analytics cost?",
    answer: "We offer flexible pricing plans starting with a free trial for qualified brands. Enterprise plans include custom integrations and dedicated support. Contact our sales team for detailed pricing information."
  }, {
    question: "What AI models do you support?",
    answer: "We currently support ChatGPT (3.5 & 4), Claude (Instant & 2), and Perplexity. We're constantly expanding our model coverage based on market demand and customer needs."
  }, {
    question: "How do you collect and handle data?",
    answer: "We prioritize data privacy and security. We query AI models using standardized prompts, store only aggregated metrics and relevant responses, and never share your brand's data with third parties."
  }, {
    question: "How often is data updated?",
    answer: "Our platform refreshes data weekly by default, with daily updates available on premium plans. Custom monitoring frequencies are available for enterprise customers."
  }, {
    question: "Can I integrate with my existing marketing tools?",
    answer: "Yes! We offer API access and direct integrations with popular marketing platforms. Our team can help set up custom workflows for your specific tech stack."
  }, {
    question: "How quickly can I expect to see results?",
    answer: "Most customers see meaningful AI visibility improvements within 30 days of implementing our recommendations. Your initial brand audit is ready within 48 hours of setup."
  }];
  
  return <div className="bg-background min-h-screen flex flex-col">
      <AnnouncementBar />

      <main className="flex-1">
        <LandingHero />

        {/* Sections */}
        <LandingSection title="The AI Blind Spot" description="Traditional SEO doesn't account for how AI generates answers. Without specialized tools, you're flying blind while AI models potentially misrepresent your brand, send traffic to competitors, or share outdated information." className="bg-white">
          <div className="grid gap-6 mt-8 md:grid-cols-2 lg:grid-cols-3">
            <Card className="border-none shadow-md bg-gray-50">
              <CardContent className="p-6">
                <h3 className="text-lg font-medium mb-2">Lost Visibility</h3>
                <p className="text-muted-foreground">75% of brands don't appear in AI recommendations for their own category—even when they rank #1 in Google.</p>
              </CardContent>
            </Card>
            <Card className="border-none shadow-md bg-gray-50">
              <CardContent className="p-6">
                <h3 className="text-lg font-medium mb-2">Misinformation Risk</h3>
                <p className="text-muted-foreground">42% of AI responses contain outdated or incorrect product information that damages consumer trust.</p>
              </CardContent>
            </Card>
            <Card className="border-none shadow-md bg-gray-50">
              <CardContent className="p-6">
                <h3 className="text-lg font-medium mb-2">Competitive Threat</h3>
                <p className="text-muted-foreground">Brands with strong AI visibility capture 3.5x more qualified leads from AI-assisted search compared to traditional results.</p>
              </CardContent>
            </Card>
          </div>
        </LandingSection>

        <LandingSection title="Take Control of Your AI Presence" className="bg-muted">
          <div className="grid gap-6 mt-8 md:grid-cols-2 lg:grid-cols-4">
            {features.map((feature, index) => <LandingFeature key={index} title={feature.title} description={feature.description} icon={feature.icon} />)}
          </div>
        </LandingSection>

        <LandingWalkthrough />

        <LandingSection title="What Our Early Users Say" className="bg-white">
          <div className="grid gap-6 mt-8 md:grid-cols-2 lg:grid-cols-3">
            <LandingTestimonial quote="We discovered our competitors were being recommended 4x more often by AI. After 30 days with Rabbit Hole, we're now the top recommendation." author="Sarah K." role="CMO at TechFlow" company="techflow" />
            <LandingTestimonial quote="The action plan generator alone is worth the investment. It gave us clear, practical steps that improved our AI visibility score by 35%." author="Mike T." role="Head of Growth at FitLife" company="fitlife" />
            <LandingTestimonial quote="We caught a major product misinformation issue through the alerts system before it impacted our launch. Invaluable tool for modern marketers." author="Jessica W." role="Brand Director at EcoHome" company="ecohome" />
          </div>
        </LandingSection>

        <LandingSection title="Frequently Asked Questions" className="bg-muted">
          <div className="max-w-3xl mx-auto mt-8">
            <Accordion type="single" collapsible className="w-full">
              {faqs.map((faq, index) => <AccordionItem key={index} value={`item-${index}`}>
                  <AccordionTrigger className="text-lg font-medium">{faq.question}</AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">{faq.answer}</AccordionContent>
                </AccordionItem>)}
            </Accordion>
          </div>
        </LandingSection>

        <LandingCTA />
      </main>

      <footer className="bg-primary text-primary-foreground py-12">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid gap-8 md:grid-cols-4">
            
            <div>
              <h4 className="font-semibold mb-4">Product</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="/features" className="hover:underline">Features</a></li>
                <li><a href="/pricing" className="hover:underline">Pricing</a></li>
                
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Resources</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="/blog" className="hover:underline">Blog</a></li>
                <li><a href="/support" className="hover:underline">Support</a></li>
                <li><a href="/documentation" className="hover:underline">Documentation</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="/about" className="hover:underline">About</a></li>
                
                <li><a href="/contact" className="hover:underline">Contact</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-primary-foreground/20 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-primary-foreground/70">© 2025 Rabbit Hole Analytics. All rights reserved.</p>
            <div className="flex space-x-4 mt-4 md:mt-0">
              <a href="https://twitter.com" className="text-primary-foreground hover:text-primary-foreground/80">
                <span className="sr-only">Twitter</span>
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                </svg>
              </a>
              <a href="https://linkedin.com" className="text-primary-foreground hover:text-primary-foreground/80">
                <span className="sr-only">LinkedIn</span>
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </footer>

      {/* Global Auth Dialog */}
      <AuthDialog 
        isOpen={authDialogOpen}
        onOpenChange={setAuthDialogOpen}
        defaultTab={authDialogTab}
      />
    </div>;
}
