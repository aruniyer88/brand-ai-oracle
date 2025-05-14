
import { Product } from "@/types/brandTypes";

interface ProductsReviewProps {
  products: Product[];
}

export const ProductsReview = ({ products }: ProductsReviewProps) => {
  if (products.length === 0) {
    return (
      <div className="text-center p-4 bg-slate-50 rounded-md">
        <p className="text-muted-foreground">No products added yet.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {products.map((product) => (
        <div
          key={product.id}
          className="border rounded-md p-4 bg-slate-50"
        >
          <div className="flex justify-between items-center">
            <h4 className="font-semibold">{product.name}</h4>
            <span className="bg-slate-200 px-2 py-0.5 rounded-full text-xs">
              {product.category}
            </span>
          </div>
          <div className="mt-2">
            <h5 className="text-sm font-medium">Value Props:</h5>
            <div className="flex flex-wrap gap-1 mt-1">
              {product.valueProps.map((prop, index) => (
                <span
                  key={index}
                  className="bg-white px-2 py-0.5 rounded-md text-xs border"
                >
                  {prop}
                </span>
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
