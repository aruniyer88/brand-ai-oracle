import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { BrandEntity, SocialLink, Product } from "@/types/brandTypes";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

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
        {/*<p className="text-sm text-muted-foreground mb-1">Step 1 of 5</p>*/}
        <h2 className="text-2xl font-heading font-semibold text-white mb-6">
          Brand & Product
        </h2>
      </div>

      {/* Non-editable brand information */}
      <div className="p-6 rounded-lg border border-border bg-card shadow-sm hover:shadow-md transition">
        <div className="flex items-center space-x-4 mb-4">
          <div className="w-16 h-16 rounded-full border border-border/40 flex items-center justify-center text-2xl font-heading">
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
        
        <RadioGroup 
          value={selectedProductId || ""} 
          onValueChange={handleProductSelection} 
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
        >
          {sampleProducts.map(product => (
            <div 
              key={product.id} 
              className={`flex items-center space-x-3 p-4 rounded-lg border ${
                selectedProductId === product.id 
                  ? 'border-brand-purple bg-brand-purple/10' 
                  : 'border-border hover:border-brand-purple/40'
              } bg-card transition-shadow hover:shadow-md cursor-pointer`}
            >
              <RadioGroupItem 
                value={product.id} 
                id={product.id} 
                className="radio-accent" 
              />
              <Label 
                htmlFor={product.id} 
                className="flex-grow font-medium cursor-pointer"
              >
                {product.name}
                <span className="inline-block ml-2 text-xs rounded bg-border/40 px-2 py-0.5">
                  {product.category}
                </span>
              </Label>
            </div>
          ))}
            
          {/* Simplified custom product option */}
          <div className={`flex items-center space-x-3 p-4 rounded-lg border ${
            selectedProductId === "custom" 
              ? 'border-brand-purple bg-brand-purple/10' 
              : 'border-border hover:border-brand-purple/40'
          } bg-card hover:shadow-md`}>
            <RadioGroupItem value="custom" id="custom" className="radio-accent" />
            <div className="flex-1 space-y-1">
              <Label htmlFor="custom-input" className="font-medium">Custom Product</Label>
              <Input 
                id="custom-input"
                className="bg-background border border-input rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-brand-purple/40"
                placeholder="Enter your custom product" 
                value={customProduct} 
                onChange={handleCustomProductChange} 
                onBlur={handleCustomProductBlur} 
              />
            </div>
          </div>
        </RadioGroup>
      </div>
    </div>;
};
