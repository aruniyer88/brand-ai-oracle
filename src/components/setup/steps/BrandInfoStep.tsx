
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { PlusCircle, X } from "lucide-react";
import { BrandEntity, SocialLink, Product } from "@/types/brandTypes";
import { Checkbox } from "@/components/ui/checkbox";
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
      // Handle custom product selection (without adding it yet)
      setCustomProduct(customProduct || "");
    }
  };

  const handleCustomProductAdd = () => {
    if (customProduct.trim()) {
      setProducts([{
        id: "custom",
        name: customProduct.trim(),
        category: "Custom",
        valueProps: []
      }]);
      setSelectedProductId("custom");
    }
  };

  // Add custom product when user leaves the input field if custom is selected
  const handleCustomProductBlur = () => {
    if (selectedProductId === "custom" && customProduct.trim()) {
      handleCustomProductAdd();
    }
  };

  return <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold mb-2">Brand Information</h2>
        <p className="text-muted-foreground">
          Review your brand's information and select a product.
        </p>
      </div>

      {/* Non-editable brand information */}
      <div className="p-6 bg-slate-50 rounded-lg border">
        <div className="flex items-center space-x-4 mb-4">
          {/* We could add a logo here if available */}
          <div className="w-16 h-16 bg-slate-200 rounded-full flex items-center justify-center text-2xl font-bold">
            {brandInfo.name.charAt(0)}
          </div>
          <div>
            <h3 className="font-semibold text-lg">{brandInfo.name}</h3>
            <p className="text-muted-foreground">{brandInfo.website}</p>
          </div>
        </div>
        
        <p className="text-sm text-muted-foreground">Nike is a global sportswear and athletic footwear company known for its innovative designs, high-performance products, and iconic &quot;swoosh&quot; logo. Founded in 1964, it has become one of the world's leading brands in sports apparel, footwear, and equipment, endorsed by top athletes and widely recognized for its marketing and cultural influence.</p>
      </div>

      <Separator />
      
      <div className="space-y-4">
        <h3 className="font-medium text-lg">Select a Product</h3>
        <p className="text-muted-foreground">
          Choose one product or service you want to analyze consumer perception for.
        </p>
        
        <RadioGroup value={selectedProductId || ""} onValueChange={handleProductSelection} className="space-y-3">
          {sampleProducts.map(product => <div key={product.id} className="flex items-center space-x-2 rounded-md border p-3">
              <RadioGroupItem value={product.id} id={product.id} />
              <Label htmlFor={product.id} className="font-medium flex-grow">
                {product.name}
                <span className="ml-2 text-sm text-muted-foreground">
                  {product.category}
                </span>
              </Label>
            </div>)}
            
          {/* Custom product option as a radio button */}
          <div className="flex items-center space-x-2 rounded-md border p-3">
            <RadioGroupItem value="custom" id="custom" />
            <Label htmlFor="custom" className="font-medium flex-grow">Other</Label>
          </div>
        </RadioGroup>
        
        {/* Custom product input field - only enabled when "Other" is selected */}
        {selectedProductId === "custom" && (
          <div className="mt-3 pl-6">
            <div className="flex space-x-2">
              <Input 
                placeholder="Enter custom product name" 
                value={customProduct} 
                onChange={(e) => setCustomProduct(e.target.value)} 
                onBlur={handleCustomProductBlur}
                className="flex-grow"
              />
              <Button 
                onClick={handleCustomProductAdd} 
                disabled={!customProduct.trim()}
              >
                <PlusCircle className="h-4 w-4 mr-2" /> Add
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>;
};
