import React from "react";
import { Product } from "@/types/product";
import { ProductCard } from "./ProductCard";
import { SearchX } from "lucide-react";
import { Button } from "@/components/ui/Button";

interface ProductGridProps {
  products: Product[];
  onResetFilters?: () => void;
}

export function ProductGrid({ products, onResetFilters }: ProductGridProps) {
  if (products.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 px-4 text-center border border-dashed border-border rounded-card bg-surface/50 my-6">
        <div className="rounded-full bg-zinc-100 dark:bg-zinc-800 p-4 mb-4 text-muted">
          <SearchX className="h-8 w-8" />
        </div>
        <h3 className="text-base font-semibold text-foreground mb-1">
          No products found
        </h3>
        <p className="text-sm text-muted max-w-sm mb-6">
          We couldn&apos;t find any products matching your current search or category filter.
        </p>
        {onResetFilters && (
          <Button onClick={onResetFilters} variant="secondary" size="sm">
            Reset Filters
          </Button>
        )}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
