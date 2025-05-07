
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { PlusCircle, X } from "lucide-react";
import { BrandEntity, SocialLink } from "@/types/brandTypes";
import { Checkbox } from "@/components/ui/checkbox";

interface BrandInfoStepProps {
  brandInfo: BrandEntity;
  setBrandInfo: (brandInfo: BrandEntity) => void;
}

export const BrandInfoStep = ({
  brandInfo,
  setBrandInfo,
}: BrandInfoStepProps) => {
  const [newAlias, setNewAlias] = useState("");
  const [newSocialPlatform, setNewSocialPlatform] = useState("");
  const [newSocialUrl, setNewSocialUrl] = useState("");

  const addAlias = () => {
    if (newAlias.trim()) {
      setBrandInfo({
        ...brandInfo,
        aliases: [...brandInfo.aliases, newAlias.trim()],
      });
      setNewAlias("");
    }
  };

  const removeAlias = (index: number) => {
    const updatedAliases = [...brandInfo.aliases];
    updatedAliases.splice(index, 1);
    setBrandInfo({
      ...brandInfo,
      aliases: updatedAliases,
    });
  };

  const addSocialLink = () => {
    if (newSocialPlatform.trim() && newSocialUrl.trim()) {
      setBrandInfo({
        ...brandInfo,
        socialLinks: [
          ...brandInfo.socialLinks,
          {
            platform: newSocialPlatform.trim(),
            url: newSocialUrl.trim(),
          },
        ],
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
      socialLinks: updatedSocialLinks,
    });
  };

  return (
    <div className="space-y-6">
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
            <Input
              id="brand-name"
              value={brandInfo.name}
              onChange={(e) =>
                setBrandInfo({ ...brandInfo, name: e.target.value })
              }
              placeholder="Enter brand name"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="brand-website">Website</Label>
            <Input
              id="brand-website"
              value={brandInfo.website}
              onChange={(e) =>
                setBrandInfo({ ...brandInfo, website: e.target.value })
              }
              placeholder="https://www.example.com"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="brand-wiki">Wiki or Wikidata URL (optional)</Label>
            <Input
              id="brand-wiki"
              value={brandInfo.wikiUrl || ""}
              onChange={(e) =>
                setBrandInfo({ ...brandInfo, wikiUrl: e.target.value })
              }
              placeholder="https://en.wikipedia.org/wiki/example"
            />
          </div>

          <div className="flex items-start space-x-2">
            <Checkbox
              id="knowledge-panel"
              checked={brandInfo.knowledgePanel}
              onCheckedChange={(checked) =>
                setBrandInfo({
                  ...brandInfo,
                  knowledgePanel: checked as boolean,
                })
              }
            />
            <div className="grid gap-1.5 leading-none">
              <Label
                htmlFor="knowledge-panel"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Has Google Knowledge Panel
              </Label>
              <p className="text-sm text-muted-foreground">
                Check if your brand appears in Google's Knowledge Panel
              </p>
            </div>
          </div>
        </div>
      </div>

      <Separator />

      <div className="space-y-4">
        <div>
          <h3 className="text-lg font-medium mb-2">Brand Aliases</h3>
          <p className="text-sm text-muted-foreground">
            Add any alternative names your brand is known by.
          </p>
        </div>

        <div className="flex space-x-2">
          <Input
            value={newAlias}
            onChange={(e) => setNewAlias(e.target.value)}
            placeholder="Enter brand alias"
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                addAlias();
                e.preventDefault();
              }
            }}
          />
          <Button type="button" onClick={addAlias}>
            <PlusCircle className="h-4 w-4 mr-2" /> Add
          </Button>
        </div>

        {brandInfo.aliases.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-2">
            {brandInfo.aliases.map((alias, index) => (
              <div
                key={index}
                className="flex items-center bg-slate-100 rounded-full px-3 py-1"
              >
                <span className="text-sm">{alias}</span>
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-5 w-5 p-0 ml-1"
                  onClick={() => removeAlias(index)}
                >
                  <X className="h-3 w-3" />
                </Button>
              </div>
            ))}
          </div>
        )}
      </div>

      <Separator />

      <div className="space-y-4">
        <div>
          <h3 className="text-lg font-medium mb-2">Social Media Profiles</h3>
          <p className="text-sm text-muted-foreground">
            Add links to your brand's social media profiles.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="md:col-span-1">
            <Label htmlFor="social-platform">Platform</Label>
            <Input
              id="social-platform"
              value={newSocialPlatform}
              onChange={(e) => setNewSocialPlatform(e.target.value)}
              placeholder="e.g., Twitter, LinkedIn"
            />
          </div>
          <div className="md:col-span-2 flex space-x-2">
            <div className="flex-1">
              <Label htmlFor="social-url">URL</Label>
              <Input
                id="social-url"
                value={newSocialUrl}
                onChange={(e) => setNewSocialUrl(e.target.value)}
                placeholder="https://..."
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    addSocialLink();
                    e.preventDefault();
                  }
                }}
              />
            </div>
            <div className="self-end">
              <Button type="button" onClick={addSocialLink}>
                <PlusCircle className="h-4 w-4 mr-2" /> Add
              </Button>
            </div>
          </div>
        </div>

        {brandInfo.socialLinks.length > 0 && (
          <div className="space-y-2 mt-4">
            {brandInfo.socialLinks.map((link, index) => (
              <div
                key={index}
                className="flex items-center justify-between bg-slate-50 p-2 rounded-md"
              >
                <div>
                  <span className="font-medium">{link.platform}:</span>{" "}
                  <span className="text-sm text-muted-foreground">
                    {link.url}
                  </span>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => removeSocialLink(index)}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
