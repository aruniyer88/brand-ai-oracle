
import { useState, useEffect, useRef } from "react";
import { useDebounce } from "./use-debounce";

interface Brand {
  id: string;
  name: string;
  domain: string;
  logo?: string;
}

interface UseSearchProps {
  brands: Brand[];
  onSelectBrand: (brand: Brand) => void;
}

export function useSearch({ brands, onSelectBrand }: UseSearchProps) {
  const [search, setSearch] = useState("");
  const [filteredBrands, setFilteredBrands] = useState<Brand[]>([]);
  const [activeIndex, setActiveIndex] = useState(-1);
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  
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

  const handleSelectBrand = (brand: Brand) => {
    setSearch("");
    setIsDropdownVisible(false);
    onSelectBrand(brand);
  };
  
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!filteredBrands.length) return;
    
    switch(e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setActiveIndex(prev => {
          const newIndex = prev < filteredBrands.length - 1 ? prev + 1 : prev;
          return newIndex;
        });
        break;
      case 'ArrowUp':
        e.preventDefault();
        setActiveIndex(prev => {
          const newIndex = prev > 0 ? prev - 1 : 0;
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

  const scrollActiveItemIntoView = (index: number, resultsListRef: React.RefObject<HTMLDivElement>) => {
    if (resultsListRef.current && index >= 0) {
      const items = resultsListRef.current.querySelectorAll('[role="option"]');
      if (items[index]) {
        items[index].scrollIntoView({ block: 'nearest' });
      }
    }
  };

  const hasSearchResults = filteredBrands.length > 0;
  const noResultsFound = debouncedSearch !== "" && filteredBrands.length === 0;

  return {
    search,
    setSearch,
    filteredBrands,
    activeIndex,
    setActiveIndex,
    isDropdownVisible,
    setIsDropdownVisible,
    handleSelectBrand,
    handleKeyDown,
    scrollActiveItemIntoView,
    hasSearchResults,
    noResultsFound
  };
}
