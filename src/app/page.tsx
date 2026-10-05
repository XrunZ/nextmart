import React, { Suspense } from "react";
import { getProducts, getCategories } from "@/lib/api/products";
import { ProductSection } from "@/components/products/ProductSection";
import { ProductSkeletonCard } from "@/components/ui/Skeleton";
import { BRAND_TAGLINE } from "@/lib/constants";

export const revalidate = 3600;

function ProductSectionFallback() {
  return (
    <div className="flex flex-col gap-6">
      <div className="h-10 w-full animate-pulse rounded-input bg-zinc-200 dark:bg-zinc-800" />
      <div className="flex gap-2">
        {Array.from({ length: 5 }).map((_, i) => (
          <div
            key={i}
            className="h-8 w-24 animate-pulse rounded-btn bg-zinc-200 dark:bg-zinc-800"
          />
        ))}
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
        {Array.from({ length: 8 }).map((_, i) => (
          <ProductSkeletonCard key={i} />
        ))}
      </div>
    </div>
  );
}

export default async function HomePage() {
  const [products, categories] = await Promise.all([
    getProducts(),
    getCategories(),
  ]);

  return (
    <div className="mx-auto max-w-site px-4 py-8 sm:px-6 lg:px-8">
      {/* Short Introduction (Minimal Modern Hero) */}
      <div className="mb-8 flex flex-col gap-1">
        <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-foreground">
          Explore Products
        </h1>
        <p className="text-sm text-muted font-normal">
          {BRAND_TAGLINE}
        </p>
      </div>

      {/* Interactive Product Section (Search, Filter, Grid) */}
      <Suspense fallback={<ProductSectionFallback />}>
        <ProductSection initialProducts={products} categories={categories} />
      </Suspense>
    </div>
  );
}
