
import React from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, Play } from "lucide-react";

interface ScreenshotSectionProps {
  onAuthClick: (tab: "login" | "book") => void;
}

export const ScreenshotSection = ({ onAuthClick }: ScreenshotSectionProps) => {
  return (
    <section id="screenshot" className="py-20 md:py-24 bg-navy">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-12 scroll-fade-in">
          <h2 className="text-3xl md:text-4xl font-mono font-bold mb-4">The TunnelGrid in Action</h2>
          <p className="text-lg text-foreground/80">
            Visualize your brand's AI presence with our comprehensive grid mapping technology
          </p>
        </div>
        
        <div className="max-w-5xl mx-auto mt-10 relative scroll-fade-in">
          <div className="shadow-2xl rounded-xl overflow-hidden border border-accent/20">
            <div className="aspect-video bg-darkgray rounded-md overflow-hidden">
              <img 
                src="/placeholder.svg" 
                alt="TunnelGrid.ai Dashboard" 
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
              onClick={() => onAuthClick("book")}
            >
              Schedule my grid map
              <ArrowRight className="h-4 w-4 ml-2" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};
