
import { useState, useEffect, useRef } from "react";
import { Command, CommandInput, CommandEmpty, CommandGroup, CommandItem, CommandList } from "@/components/ui/command";
import { Check, ArrowRight, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useDebounce } from "@/hooks/use-debounce";
import { toast } from "@/hooks/use-toast";

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
  const [filteredBrands, setFilteredBrands] = useState<Brand[]>([]);
  const [activeIndex, setActiveIndex] = useState(-1);
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const searchContainerRef = useRef<HTMLDivElement>(null);
  const resultsListRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  
  const debouncedSearch = useDebounce(search, 300);
  
  // Filter brands based on debounced search term
  useEffect(() => {
    if (debouncedSearch) {
      const filtered = brands.filter(brand => 
        brand.name.toLowerCase().includes(debouncedSearch.toLowerCase()) || 
        brand.domain.toLowerCase().includes(debouncedSearch.toLowerCase())
      );
      setFilteredBrands(filtered);
      setActiveIndex(-1); // Reset active index when results change
    } else {
      setFilteredBrands([]);
    }
  }, [debouncedSearch, brands]);

  const hasSearchResults = filteredBrands.length > 0;
  const noResultsFound = debouncedSearch !== "" && filteredBrands.length === 0;
  
  // Handle click outside to close dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        searchContainerRef.current && 
        !searchContainerRef.current.contains(event.target as Node)
      ) {
        setIsDropdownVisible(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Auto-focus input on mount
  useEffect(() => {
    const timer = setTimeout(() => {
      inputRef.current?.focus();
    }, 100);
    
    return () => clearTimeout(timer);
  }, []);

  // Keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!filteredBrands.length) return;
    
    switch(e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setActiveIndex(prev => {
          const newIndex = prev < filteredBrands.length - 1 ? prev + 1 : prev;
          scrollActiveItemIntoView(newIndex);
          return newIndex;
        });
        break;
      case 'ArrowUp':
        e.preventDefault();
        setActiveIndex(prev => {
          const newIndex = prev > 0 ? prev - 1 : 0;
          scrollActiveItemIntoView(newIndex);
          return newIndex;
        });
        break;
      case 'Enter':
        e.preventDefault();
        if (activeIndex >= 0) {
          handleSelectBrand(filteredBrands[activeIndex]);
        } else if (filteredBrands.length > 0) {
          handleSelectBrand(filteredBrands[0]);
        }
        break;
      case 'Escape':
        e.preventDefault();
        setSearch("");
        setIsDropdownVisible(false);
        break;
      default:
        break;
    }
  };
  
  // Scroll active item into view
  const scrollActiveItemIntoView = (index: number) => {
    if (resultsListRef.current && index >= 0) {
      const items = resultsListRef.current.querySelectorAll('[role="option"]');
      if (items[index]) {
        items[index].scrollIntoView({ block: 'nearest' });
      }
    }
  };
  
  const handleSelectBrand = (brand: Brand) => {
    setSearch("");
    setIsDropdownVisible(false);
    onSelectBrand(brand);
    toast({
      title: "Brand selected",
      description: `You've selected ${brand.name}`,
    });
  };
  
  const handleSearchSubmit = () => {
    if (filteredBrands.length > 0) {
      handleSelectBrand(filteredBrands[0]);
    } else if (debouncedSearch) {
      toast({
        title: "No brands found",
        description: "Please try a different search term",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="w-full max-w-lg mx-auto">
      {/* Relative positioned container */}
      <div 
        ref={searchContainerRef}
        className="relative"
      >
        {/* Relative positioned shell */}
        <div 
          className="relative"
          aria-haspopup="listbox"
          aria-expanded={isDropdownVisible}
          aria-owns="search-results-list"
        >
          <div className="rounded-lg overflow-hidden border-2 bg-background border-border/30 shadow-md">
            <Command className="rounded-lg overflow-visible border-none">
              <div className="relative h-[52px]">
                <div className="flex items-center border-b px-3 h-[52px] min-h-[52px]">
                  <Search className="mr-2 h-4 w-4 shrink-0 opacity-50" />
                  <input 
                    ref={inputRef}
                    type="text"
                    placeholder="Type a brand name..." 
                    value={search} 
                    onChange={(e) => setSearch(e.target.value)} 
                    className="flex-1 bg-transparent border-none outline-none pr-16"
                    onKeyDown={handleKeyDown}
                    onFocus={() => setIsDropdownVisible(true)}
                    role="combobox"
                    aria-controls="search-results-list"
                    aria-activedescendant={activeIndex >= 0 ? `brand-item-${filteredBrands[activeIndex].id}` : undefined}
                  />
                  <div className="absolute right-3 top-1/2 -translate-y-1/2 z-10">
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
              </div>
              
              {/* Absolutely positioned dropdown */}
              {(isDropdownVisible && (hasSearchResults || noResultsFound)) && (
                <div 
                  className="absolute top-full left-0 w-full z-50 bg-background border-2 border-t-0 border-border/30 rounded-b-lg shadow-lg mt-[-1px]" 
                  style={{
                    maxHeight: '300px',
                    overflowY: 'auto',
                  }}
                >
                  <div 
                    ref={resultsListRef}
                    className="py-1"
                    id="search-results-list"
                    role="listbox"
                  >
                    {noResultsFound && <div className="py-6 text-center text-sm">No brands found</div>}
                    
                    {hasSearchResults && (
                      <div>
                        {filteredBrands.map((brand, index) => (
                          <div
                            key={brand.id}
                            id={`brand-item-${brand.id}`}
                            onClick={() => handleSelectBrand(brand)}
                            className={cn(
                              "flex items-center py-3 px-3 cursor-pointer border border-transparent transition-all duration-200",
                              activeIndex === index 
                                ? "border-accent/80 shadow-[0_0_8px_rgba(59,255,211,0.3)] bg-accent/5" 
                                : "hover:border-accent/80 hover:shadow-[0_0_8px_rgba(59,255,211,0.3)] focus:border-accent/80 focus:shadow-[0_0_8px_rgba(59,255,211,0.3)]"
                            )}
                            role="option"
                            aria-selected={activeIndex === index}
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
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              )}
            </Command>
          </div>
        </div>
      </div>
    </div>
  );
};
