
import { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { MainLayout } from "@/components/layout/MainLayout";
import { Command, CommandInput, CommandEmpty, CommandGroup, CommandItem, CommandList } from "@/components/ui/command";
import { Check, ArrowRight, Search as SearchIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface Brand {
  id: string;
  name: string;
  domain: string;
  logo?: string;
}

// Mock data for brands
const mockBrands: Brand[] = [{
  id: "1",
  name: "Nike",
  domain: "nike.com",
  logo: "https://placehold.co/100x100?text=Nike"
}, {
  id: "2",
  name: "Nike Air Jordan",
  domain: "jordan.nike.com",
  logo: "https://placehold.co/100x100?text=AJ"
}, {
  id: "3",
  name: "Nike Inc.",
  domain: "about.nike.com",
  logo: "https://placehold.co/100x100?text=Nike+Inc"
}, {
  id: "4",
  name: "Adidas",
  domain: "adidas.com",
  logo: "https://placehold.co/100x100?text=Adidas"
}, {
  id: "5",
  name: "TechPulse",
  domain: "techpulse.io",
  logo: "https://placehold.co/100x100?text=TP"
}, {
  id: "6",
  name: "EcoSmart",
  domain: "ecosmart.com",
  logo: "https://placehold.co/100x100?text=Eco"
}];

const BrandSearchPage = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [selectedBrand, setSelectedBrand] = useState<Brand | null>(null);

  // Always initialize as an array, never undefined
  const filteredBrands = search 
    ? mockBrands.filter(brand => 
        brand.name.toLowerCase().includes(search.toLowerCase()) || 
        brand.domain.toLowerCase().includes(search.toLowerCase())
      ) 
    : [];
  
  const hasSearchResults = search !== "" && filteredBrands.length > 0;
  const noResultsFound = search !== "" && filteredBrands.length === 0;
  
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
  
  const handleSearchSubmit = () => {
    if (filteredBrands.length > 0 && !selectedBrand) {
      handleSelectBrand(filteredBrands[0]);
    }
  };
  
  return (
    <MainLayout>
      <div className="max-w-3xl mx-auto pt-8 px-4">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold mb-3 gradient-text">Brand AI Analysis</h1>
          <p className="text-lg text-muted-foreground">
            Search for a brand to analyze its presence in AI systems
          </p>
        </div>

        <div className="border rounded-xl p-8 shadow-md bg-white">
          {!selectedBrand ? (
            <div className="flex flex-col items-center">
              <div className="w-full max-w-lg mx-auto relative">
                <Command className="rounded-lg overflow-hidden border-2 shadow-md">
                  <div className="flex items-center border-b px-4 py-2">
                    <SearchIcon className="mr-2 h-5 w-5 shrink-0 opacity-70" />
                    <CommandInput 
                      placeholder="Type a brand name..." 
                      value={search} 
                      onValueChange={setSearch}
                      className="flex-1 text-base"
                    />
                    <Button 
                      size="sm" 
                      className="bg-accent hover:bg-accent/90 text-accent-foreground ml-2"
                      onClick={handleSearchSubmit}
                    >
                      <span className="mr-1">Go</span>
                      <ArrowRight className="h-4 w-4" />
                    </Button>
                  </div>
                  
                  {(hasSearchResults || noResultsFound) && (
                    <CommandList>
                      {noResultsFound && (
                        <CommandEmpty>No brands found</CommandEmpty>
                      )}
                      <CommandGroup>
                        {filteredBrands.map(brand => (
                          <CommandItem 
                            key={brand.id} 
                            value={brand.name} 
                            onSelect={() => handleSelectBrand(brand)} 
                            className="flex items-center py-3 cursor-pointer hover:bg-accent/10"
                          >
                            <div className="flex items-center gap-3 flex-1">
                              <div className="w-10 h-10 bg-slate-100 rounded-md flex items-center justify-center overflow-hidden">
                                {brand.logo ? (
                                  <img 
                                    src={brand.logo} 
                                    alt={brand.name} 
                                    className="w-full h-full object-cover" 
                                  />
                                ) : (
                                  <span className="text-sm font-medium">
                                    {brand.name.substring(0, 2)}
                                  </span>
                                )}
                              </div>
                              <div>
                                <p className="font-medium">{brand.name}</p>
                                <p className="text-sm text-muted-foreground">{brand.domain}</p>
                              </div>
                            </div>
                            <Check className={cn(
                              "h-4 w-4", 
                              selectedBrand?.id === brand.id ? "opacity-100" : "opacity-0"
                            )} />
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </CommandList>
                  )}
                </Command>
              </div>
              
              <div className="mt-8 text-center">
                <p className="text-muted-foreground">
                  Find out how your brand is perceived by AI systems and get actionable insights.
                </p>
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-8">
              <div className="w-24 h-24 bg-slate-100 rounded-lg flex items-center justify-center overflow-hidden mb-4 shadow-sm">
                {selectedBrand.logo ? (
                  <img 
                    src={selectedBrand.logo} 
                    alt={selectedBrand.name} 
                    className="w-full h-full object-cover" 
                  />
                ) : (
                  <span className="text-2xl font-medium">
                    {selectedBrand.name.substring(0, 2)}
                  </span>
                )}
              </div>
              <h2 className="text-2xl font-bold mb-1">{selectedBrand.name}</h2>
              <p className="text-sm text-muted-foreground mb-8">{selectedBrand.domain}</p>
              
              <Button 
                onClick={handleAnalyze} 
                className="w-full max-w-md text-lg py-6 bg-accent hover:bg-accent/90 text-accent-foreground"
              >
                Analyze {selectedBrand.name}
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              
              <Button
                variant="ghost"
                size="sm"
                className="mt-4"
                onClick={() => setSelectedBrand(null)}
              >
                Search for another brand
              </Button>
            </div>
          )}
        </div>
      </div>
    </MainLayout>
  );
};

export default BrandSearchPage;
