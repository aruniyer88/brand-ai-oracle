
import { useState, useCallback } from "react";
import { Command, CommandInput, CommandEmpty, CommandGroup, CommandItem, CommandList } from "@/components/ui/command";
import { Check, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface Brand {
  id: string;
  name: string;
  domain: string;
  logo?: string;
}

interface SearchBarProps {
  brands: Brand[];
  selectedBrand: Brand | null;
  onSelectBrand: (brand: Brand) => void;
}

export const SearchBar = ({ brands, selectedBrand, onSelectBrand }: SearchBarProps) => {
  const [search, setSearch] = useState("");

  // Filter brands based on search
  const filteredBrands = search ? brands.filter(brand => 
    brand.name.toLowerCase().includes(search.toLowerCase()) || 
    brand.domain.toLowerCase().includes(search.toLowerCase())
  ) : [];
  
  const hasSearchResults = search !== "" && filteredBrands.length > 0;
  const noResultsFound = search !== "" && filteredBrands.length === 0;
  
  const handleSearchSubmit = () => {
    if (filteredBrands.length > 0) {
      onSelectBrand(filteredBrands[0]);
    }
  };

  return (
    <div className="w-full max-w-lg mx-auto">
      <div className="relative">
        <div className="rounded-lg overflow-hidden border-2 bg-background shadow-md">
          <Command className="rounded-lg overflow-visible border-none">
            <div className="relative h-[52px]">
              <CommandInput 
                placeholder="Type a brand name..." 
                value={search} 
                onValueChange={setSearch} 
                className="flex-1 pr-16" 
                onKeyDown={e => {
                  if (e.key === 'Enter') handleSearchSubmit();
                }} 
              />
              <div className="absolute right-3 top-1/2 -translate-y-1/2 z-50">
                <Button 
                  size="sm" 
                  className="bg-[#3BFFD3] hover:bg-[#3BFFD3]/90 text-black font-medium rounded-full px-4" 
                  onClick={handleSearchSubmit}
                >
                  <span className="mr-1">Go</span>
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
            
            {/* Always render CommandList with fixed dimensions */}
            <div className="overflow-hidden">
              <CommandList className="max-h-64 overflow-y-auto">
                {noResultsFound && <CommandEmpty>No brands found</CommandEmpty>}
                
                {hasSearchResults && (
                  <CommandGroup>
                    {filteredBrands.map(brand => (
                      <CommandItem
                        key={brand.id}
                        value={brand.name}
                        onSelect={() => onSelectBrand(brand)}
                        className="flex items-center py-3 cursor-pointer border border-transparent hover:border-accent/80 hover:shadow-[0_0_8px_rgba(59,255,211,0.3)] focus:border-accent/80 focus:shadow-[0_0_8px_rgba(59,255,211,0.3)] transition-all duration-200"
                      >
                        <div className="flex items-center gap-3 flex-1">
                          <div className="w-10 h-10 bg-slate-800 rounded-md flex items-center justify-center overflow-hidden">
                            {brand.logo ? (
                              <img src={brand.logo} alt={brand.name} className="w-full h-full object-cover" />
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
                        <Check className={cn("h-4 w-4 text-accent", selectedBrand?.id === brand.id ? "opacity-100" : "opacity-0")} />
                      </CommandItem>
                    ))}
                  </CommandGroup>
                )}
              </CommandList>
            </div>
          </Command>
        </div>
      </div>
    </div>
  );
};
