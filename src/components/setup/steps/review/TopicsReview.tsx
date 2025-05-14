
import { Product, Topic } from "@/types/brandTypes";

interface TopicsReviewProps {
  topics: Topic[];
  products: Product[];
}

export const TopicsReview = ({ topics, products }: TopicsReviewProps) => {
  if (topics.length === 0) {
    return (
      <div className="text-center p-4 bg-slate-50 rounded-md">
        <p className="text-muted-foreground">No topics added yet.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {topics.map((topic) => (
        <div
          key={topic.id}
          className="border rounded-md p-4 bg-slate-50"
        >
          <h4 className="font-semibold">{topic.name}</h4>
          {topic.description && <p className="text-sm mt-1">{topic.description}</p>}
          
          {topic.products && topic.products.length > 0 && (
            <div className="mt-2">
              <h5 className="text-sm font-medium">Related Products:</h5>
              <div className="flex flex-wrap gap-1 mt-1">
                {topic.products.map((productId) => {
                  const product = products.find((p) => p.id === productId);
                  return (
                    product && (
                      <span
                        key={productId}
                        className="bg-white px-2 py-0.5 rounded-md text-xs border"
                      >
                        {product.name}
                      </span>
                    )
                  );
                })}
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};
