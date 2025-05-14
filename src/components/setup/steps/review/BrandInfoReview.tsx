
import { BrandEntity } from "@/types/brandTypes";

interface BrandInfoReviewProps {
  brandInfo: BrandEntity;
}

export const BrandInfoReview = ({ brandInfo }: BrandInfoReviewProps) => {
  return (
    <div className="space-y-4 p-4 rounded-md bg-slate-50">
      <div>
        <h4 className="font-medium">Brand Name</h4>
        <p>{brandInfo.name || "Not set"}</p>
      </div>

      <div>
        <h4 className="font-medium">Website</h4>
        <p>{brandInfo.website || "Not set"}</p>
      </div>

      {brandInfo.wikiUrl && (
        <div>
          <h4 className="font-medium">Wiki URL</h4>
          <p>{brandInfo.wikiUrl}</p>
        </div>
      )}

      {brandInfo.aliases.length > 0 && (
        <div>
          <h4 className="font-medium">Aliases</h4>
          <div className="flex flex-wrap gap-2">
            {brandInfo.aliases.map((alias, index) => (
              <span
                key={index}
                className="bg-white px-2 py-1 rounded-full text-sm border"
              >
                {alias}
              </span>
            ))}
          </div>
        </div>
      )}

      {brandInfo.socialLinks.length > 0 && (
        <div>
          <h4 className="font-medium">Social Links</h4>
          <ul className="space-y-1">
            {brandInfo.socialLinks.map((link, index) => (
              <li key={index}>
                <span className="font-medium">{link.platform}:</span>{" "}
                {link.url}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};
