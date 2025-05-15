
import { useState, useCallback, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { MainLayout } from "@/components/layout/MainLayout";
import { SearchBar } from "@/components/brand/SearchBar";
import { BrandCard } from "@/components/brand/BrandCard";
import { cn } from "@/lib/utils";

interface Brand {
  id: string;
  name: string;
  domain: string;
  logo?: string;
}

// Mock data for brands
const mockBrands: Brand[] = [
  {
    id: "1",
    name: "Nike",
    domain: "nike.com",
    logo: "https://placehold.co/100x100?text=Nike"
  },
  {
    id: "2",
    name: "Nike Air Jordan",
    domain: "jordan.nike.com",
    logo: "https://placehold.co/100x100?text=AJ"
  },
  {
    id: "3",
    name: "Nike Inc.",
    domain: "about.nike.com",
    logo: "https://placehold.co/100x100?text=Nike+Inc"
  },
  {
    id: "4",
    name: "Adidas",
    domain: "adidas.com",
    logo: "https://placehold.co/100x100?text=Adidas"
  },
  {
    id: "5",
    name: "TechPulse",
    domain: "techpulse.io",
    logo: "https://placehold.co/100x100?text=TP"
  },
  {
    id: "6",
    name: "EcoSmart",
    domain: "ecosmart.com",
    logo: "https://placehold.co/100x100?text=Eco"
  }
];

const BrandSearchPage = () => {
  const navigate = useNavigate();
  const [selectedBrand, setSelectedBrand] = useState<Brand | null>(null);
  const [animateGrid, setAnimateGrid] = useState(false);

  const handleSelectBrand = useCallback((brand: Brand) => {
    setSelectedBrand(brand);
  }, []);
  
  const handleAnalyze = useCallback(() => {
    if (selectedBrand) {
      navigate("/setup", {
        state: {
          selectedBrand
        }
      });
    }
  }, [navigate, selectedBrand]);

  // Animation trigger for grid
  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimateGrid(true);
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  // Check for reduced motion preference
  const prefersReducedMotion = typeof window !== 'undefined' && 
    window.matchMedia && 
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  return (
    <MainLayout>
      <div className="max-w-3xl mx-auto h-[calc(100vh-6rem)] flex flex-col justify-center items-center px-4 relative">
        {/* Grid background - ultra-subtle */}
        <div className="absolute inset-0 grid grid-cols-12 grid-rows-12 pointer-events-none">
          {Array.from({length: 144}).map((_, i) => (
            <div 
              key={i} 
              className={cn(
                "border border-accent/5 opacity-0 transition-opacity duration-500", 
                animateGrid && !prefersReducedMotion && "opacity-8"
              )} 
              style={{
                transitionDelay: `${Math.random() * 1000}ms`
              }} 
            />
          ))}
        </div>

        <div className="text-center mb-10 relative z-10">
          <h1 className="font-heading font-mono text-4xl font-bold mb-3 text-white tracking-tighter">TunnelGrid Brand Audit</h1>
          <p className="text-lg text-muted-foreground">
            Search for a brand to analyze its presence in AI systems
          </p>
        </div>

        <div className="border border-border/30 rounded-xl p-8 shadow-md bg-darkgray w-full max-w-2xl animate-fade-in transition-all relative z-10">
          {!selectedBrand ? (
            <div className="flex flex-col items-center">
              <SearchBar 
                brands={mockBrands}
                selectedBrand={selectedBrand}
                onSelectBrand={handleSelectBrand}
              />
              
              {/* Add space below to accommodate dropdown without layout shift */}
              <div className="mt-16 text-center">
                {/* Empty div kept for layout consistency */}
              </div>
            </div>
          ) : (
            <BrandCard 
              brand={selectedBrand} 
              onAnalyze={handleAnalyze}
              onBack={() => setSelectedBrand(null)} 
            />
          )}
        </div>
      </div>
    </MainLayout>
  );
};

export default BrandSearchPage;
