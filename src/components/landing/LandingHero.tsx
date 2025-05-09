
import React from "react";
import { Button } from "@/components/ui/button";
import { Play } from "lucide-react";
export const LandingHero = () => {
  return <div className="relative bg-primary text-primary-foreground overflow-hidden">
      <div className="container mx-auto px-4 py-20 md:py-32">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div className="space-y-4">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
                AI Has Opinions. <br />
                <span className="gradient-text">Shape Them.</span>
              </h1>
              <p className="text-xl text-primary-foreground/90 max-w-lg">
                Audit your brand's AI presence, measure your share of voice, and learn how to top the ranks in machine-generated content.
              </p>
            </div>

            <div className="flex flex-wrap gap-4">
              <Button size="lg" className="rounded-full bg-accent hover:bg-accent/90 text-accent-foreground">
                Book Demo
              </Button>
              <Button size="lg" variant="link" className="text-primary-foreground flex items-center gap-2">
                <Play className="h-4 w-4" />
                Watch 90-sec video
              </Button>
            </div>

            
          </div>

          <div className="relative">
            <div className="animate-float shadow-2xl rounded-xl overflow-hidden border border-white/20">
              <img src="/placeholder.svg" alt="Rabbit Hole Analytics Dashboard" className="w-full h-auto" />
            </div>
          </div>
        </div>
      </div>
    </div>;
};
