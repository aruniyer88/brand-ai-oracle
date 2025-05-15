import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { BrandEntity, SocialLink, Product } from "@/types/brandTypes";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { TextCursor } from "lucide-react";

interface BrandInfoStepProps {
  brandInfo: BrandEntity;
  setBrandInfo: (brandInfo: BrandEntity) => void;
  products: Product[];
  setProducts: (products: Product[]) => void;
}

export const BrandInfoStep = ({
  brandInfo,
  setBrandInfo,
  products,
  setProducts
}: BrandInfoStepProps) => {
  const [customProduct, setCustomProduct] = useState("");
  const [selectedProductId, setSelectedProductId] = useState<string | null>(null);

  // Sample products (in a real app, these would come from an API)
  const sampleProducts = [{
    id: "prod1",
    name: "Premium Subscription",
    category: "Service"
  }, {
    id: "prod2",
    name: "Mobile Application",
    category: "Software"
  }, {
    id: "prod3",
    name: "Smart Device",
    category: "Hardware"
  }, {
    id: "prod4",
    name: "Online Course",
    category: "Education"
  }, {
    id: "prod5",
    name: "Analytics Platform",
    category: "SaaS"
  }];

  const handleProductSelection = (productId: string) => {
    setSelectedProductId(productId);

    // Find the selected product from sample products
    const selectedProduct = sampleProducts.find(p => p.id === productId);
    if (selectedProduct) {
      // Clear existing products and add the selected one
      setProducts([{
        id: selectedProduct.id,
        name: selectedProduct.name,
        category: selectedProduct.category,
        valueProps: []
      }]);
    } else if (productId === "custom") {
      // Apply custom product if it exists, otherwise keep the field empty
      if (customProduct.trim()) {
        setProducts([{
          id: "custom",
          name: customProduct.trim(),
          category: "Custom",
          valueProps: []
        }]);
      }
    }
  };

  // Handle custom product input change
  const handleCustomProductChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCustomProduct(e.target.value);
    // Auto-select the custom radio button when user starts typing
    if (e.target.value.trim()) {
      setSelectedProductId("custom");
    }
  };

  // Add custom product when user leaves the input field
  const handleCustomProductBlur = () => {
    if (customProduct.trim() && selectedProductId === "custom") {
      setProducts([{
        id: "custom",
        name: customProduct.trim(),
        category: "Custom",
        valueProps: []
      }]);
    }
  };

  return <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-heading tracking-tight font-semibold mb-6">How AI models describe your Brand</h2>
      </div>

      {/* Non-editable brand information */}
      <div className="p-6 bg-charcoal rounded-lg border border-black/20">
        <div className="flex items-center space-x-4 mb-4">
          {/* We could add a logo here if available */}
          <div className="w-16 h-16 bg-card-dark rounded-full flex items-center justify-center text-2xl font-heading">
            {brandInfo.name.charAt(0)}
          </div>
          <div>
            <h3 className="font-semibold text-lg">{brandInfo.name}</h3>
            <p className="text-text-secondary">{brandInfo.website}</p>
          </div>
        </div>
        
        <p className="text-text-secondary">Nike is a global sportswear and athletic footwear company known for its innovative designs, high-performance products, and iconic &quot;swoosh&quot; logo. Founded in 1964, it has become one of the world's leading brands in sports apparel, footwear, and equipment, endorsed by top athletes and widely recognized for its marketing and cultural influence.</p>
      </div>

      <Separator className="bg-black/20 my-8" />
      
      <div className="space-y-4">
        <h3 className="text-xl font-medium font-heading tracking-tight mb-4">Select a Product</h3>
        <p className="text-text-secondary mb-6">
          Choose one product or service you want to analyze consumer perception for.
        </p>
        
        <RadioGroup value={selectedProductId || ""} onValueChange={handleProductSelection} className="space-y-4 md:grid md:grid-cols-2 md:gap-4 md:space-y-0">
          {sampleProducts.map(product => <div key={product.id} className="flex items-center space-x-3 rounded-md border border-black/20 bg-charcoal p-4 transition-all hover:border-accent/30 group">
              <RadioGroupItem value={product.id} id={product.id} className="radio-accent" />
              <Label htmlFor={product.id} className="font-medium flex-grow cursor-pointer">
                {product.name}
                <span className="ml-2 text-xs font-heading text-text-secondary py-0.5 px-2 rounded bg-black/20">
                  {product.category}
                </span>
              </Label>
            </div>)}
            
          {/* Simplified custom product option */}
          <div className="flex items-start space-x-3 rounded-md border border-black/20 bg-charcoal p-4 transition-all hover:border-accent/30 cursor-pointer">
            <RadioGroupItem value="custom" id="custom" className="radio-accent mt-1" />
            <div className="flex flex-col flex-1">
              <Label htmlFor="custom-input" className="font-medium mb-2 cursor-pointer">Custom Product</Label>
              <Input 
                id="custom-input"
                placeholder="Enter your custom product" 
                value={customProduct} 
                onChange={handleCustomProductChange} 
                onBlur={handleCustomProductBlur} 
                className="bg-background/30 border-input" 
              />
            </div>
          </div>
        </RadioGroup>
      </div>
    </div>;
};
