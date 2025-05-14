
import React from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

interface CTASectionProps {
  onAuthClick: (tab: "login" | "book") => void;
}

export const CTASection = ({ onAuthClick }: CTASectionProps) => {
  return (
    <section className="py-16 md:py-20 bg-accent text-primary-foreground">
      <div className="container mx-auto px-4 text-center">
        <div className="max-w-3xl mx-auto space-y-6">
          <h2 className="text-3xl md:text-4xl font-mono font-bold">Ready to map your brand's AI network?</h2>
          <p className="text-xl">
            Join the 250+ companies already gaining an advantage with TunnelGrid.ai
          </p>
          <div className="pt-4">
            <Button 
              size="lg" 
              className="bg-primary-foreground text-accent hover:bg-primary-foreground/90 font-mono"
              onClick={() => onAuthClick("book")}
            >
              Book Your Demo
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};
