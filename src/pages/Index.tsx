import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { MainLayout } from "@/components/layout/MainLayout";
import { Command, CommandInput, CommandEmpty, CommandGroup, CommandItem, CommandList } from "@/components/ui/command";
import { Check } from "lucide-react";
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
const Index = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [selectedBrand, setSelectedBrand] = useState<Brand | null>(null);

  // Always initialize as an array, never undefined
  const filteredBrands = search ? mockBrands.filter(brand => brand.name.toLowerCase().includes(search.toLowerCase()) || brand.domain.toLowerCase().includes(search.toLowerCase())) : [];
  const handleSelectBrand = (brand: Brand) => {
    setSelectedBrand(brand);
  };
  const handleAnalyze = () => {
    if (selectedBrand) {
      navigate("/setup", {
        state: {
          selectedBrand
        }
      });
    }
  };
  return <MainLayout>
      <div className="max-w-3xl mx-auto text-center mt-16 mb-12">
        <h1 className="text-4xl font-bold mb-6">Stay Ahead in AI Search</h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Own how your brand appears across top AI platforms like ChatGPT, Google Gemini, and Claude. 
          Monitor AI-generated mentions and get clear, actionable steps to boost visibility and control your narrative.
        </p>
      </div>

      <div className="max-w-2xl mx-auto">
        <div className="border rounded-xl p-6 shadow-sm bg-white">
          <div className="mb-6">
            {!selectedBrand ? <div className="relative">
                <Command className="rounded-lg border shadow-md">
                  <CommandInput placeholder="Search for a brand..." value={search} onValueChange={setSearch} />
                  <CommandList>
                    
                    <CommandGroup>
                      {filteredBrands.map(brand => <CommandItem key={brand.id} value={brand.name} onSelect={() => handleSelectBrand(brand)} className="flex items-center py-3 cursor-pointer">
                          <div className="flex items-center gap-3 flex-1">
                            <div className="w-8 h-8 bg-slate-100 rounded-md flex items-center justify-center overflow-hidden">
                              {brand.logo ? <img src={brand.logo} alt={brand.name} className="w-full h-full object-cover" /> : <span className="text-xs font-medium">{brand.name.substring(0, 2)}</span>}
                            </div>
                            <div>
                              <p className="font-medium">{brand.name}</p>
                              <p className="text-sm text-muted-foreground">{brand.domain}</p>
                            </div>
                          </div>
                          <Check className={cn("h-4 w-4", selectedBrand?.id === brand.id ? "opacity-100" : "opacity-0")} />
                        </CommandItem>)}
                    </CommandGroup>
                  </CommandList>
                </Command>
              </div> : <div className="flex flex-col items-center justify-center py-8">
                <div className="w-24 h-24 bg-slate-100 rounded-md flex items-center justify-center overflow-hidden mb-4">
                  {selectedBrand.logo ? <img src={selectedBrand.logo} alt={selectedBrand.name} className="w-full h-full object-cover" /> : <span className="text-2xl font-medium">{selectedBrand.name.substring(0, 2)}</span>}
                </div>
                <h2 className="text-xl font-bold mb-1">{selectedBrand.name}</h2>
                <p className="text-sm text-muted-foreground mb-8">{selectedBrand.domain}</p>
                
                <Button onClick={handleAnalyze} className="w-full text-lg py-6">
                  Analyze {selectedBrand.name}
                </Button>
              </div>}
          </div>

          {!selectedBrand}
        </div>
      </div>
    </MainLayout>;
};
export default Index;