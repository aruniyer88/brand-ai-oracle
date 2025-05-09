import React from "react";
import { Button } from "@/components/ui/button";
import { Play } from "lucide-react";
import { Link } from "react-router-dom";
export const LandingHero = () => {
  return <div className="relative bg-primary text-primary-foreground overflow-hidden">
      {/* Header Navigation */}
      <header className="container mx-auto px-4 py-4 flex items-center justify-between">
        {/* Logo on the left */}
        <div className="flex items-center">
          <Link to="/" className="flex items-center gap-2">
            <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-accent">
              <path d="M16 2C8.268 2 2 8.268 2 16s6.268 14 14 14 14-6.268 14-14S23.732 2 16 2zm0 5a3 3 0 110 6 3 3 0 010-6zm5 15c-2.757 0-5-2.243-5-5a1 1 0 012 0c0 1.654 1.346 3 3 3s3-1.346 3-3a1 1 0 012 0c0 2.757-2.243 5-5 5zm-5-4a1 1 0 01-1-1v-3a1 1 0 012 0v3a1 1 0 01-1 1z" fill="currentColor" />
            </svg>
            <span className="font-bold text-xl">Rabbit Hole Analytics</span>
          </Link>
        </div>

        {/* Navigation links in center */}
        <nav className="hidden md:flex items-center space-x-6">
          <a href="#features" className="text-primary-foreground/90 hover:text-primary-foreground transition-colors">
            How it Works
          </a>
          <a href="#testimonials" className="text-primary-foreground/90 hover:text-primary-foreground transition-colors">
            Testimonials
          </a>
          <Link to="/blog" className="text-primary-foreground/90 hover:text-primary-foreground transition-colors">
            Blog
          </Link>
        </nav>

        {/* Buttons on the right */}
        <div className="flex items-center space-x-4">
          <Button variant="outline" className="border-white/20 text-white bg-slate-900 hover:bg-slate-800">
            Login
          </Button>
          <Button className="bg-accent hover:bg-accent/90 text-accent-foreground rounded-full">
            Get Started
          </Button>
        </div>
      </header>

      <div className="container mx-auto px-4 py-20 md:py-32">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div className="space-y-4">
              <h1 className="text-4xl md:text-5xl font-bold tracking-tight lg:text-7xl">
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