import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { PlusCircle, X } from "lucide-react";
import { BrandEntity, SocialLink, Product } from "@/types/brandTypes";
import { Checkbox } from "@/components/ui/checkbox";
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
  const [newAlias, setNewAlias] = useState("");
  const [newSocialPlatform, setNewSocialPlatform] = useState("");
  const [newSocialUrl, setNewSocialUrl] = useState("");
  const addAlias = () => {
    if (newAlias.trim()) {
      setBrandInfo({
        ...brandInfo,
        aliases: [...brandInfo.aliases, newAlias.trim()]
      });
      setNewAlias("");
    }
  };
  const removeAlias = (index: number) => {
    const updatedAliases = [...brandInfo.aliases];
    updatedAliases.splice(index, 1);
    setBrandInfo({
      ...brandInfo,
      aliases: updatedAliases
    });
  };
  const addSocialLink = () => {
    if (newSocialPlatform.trim() && newSocialUrl.trim()) {
      setBrandInfo({
        ...brandInfo,
        socialLinks: [...brandInfo.socialLinks, {
          platform: newSocialPlatform.trim(),
          url: newSocialUrl.trim()
        }]
      });
      setNewSocialPlatform("");
      setNewSocialUrl("");
    }
  };
  const removeSocialLink = (index: number) => {
    const updatedSocialLinks = [...brandInfo.socialLinks];
    updatedSocialLinks.splice(index, 1);
    setBrandInfo({
      ...brandInfo,
      socialLinks: updatedSocialLinks
    });
  };
  return <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold mb-2">Brand Information</h2>
        <p className="text-muted-foreground">
          Define your brand's core information and online presence.
        </p>
      </div>

      <div className="space-y-4">
        <div className="grid grid-cols-1 gap-4">
          <div className="space-y-2">
            <Label htmlFor="brand-name">Brand Name</Label>
            <Input id="brand-name" value={brandInfo.name} onChange={e => setBrandInfo({
            ...brandInfo,
            name: e.target.value
          })} placeholder="Enter brand name" />
          </div>

          <div className="space-y-2">
            <Label htmlFor="brand-website">Website</Label>
            <Input id="brand-website" value={brandInfo.website} onChange={e => setBrandInfo({
            ...brandInfo,
            website: e.target.value
          })} placeholder="https://www.example.com" />
          </div>

          

          
        </div>
      </div>

      

      

      <Separator />

      
    </div>;
};