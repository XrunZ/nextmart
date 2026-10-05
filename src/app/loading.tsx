import React from "react";
import { ProductSkeletonCard } from "@/components/ui/Skeleton";

export default function Loading() {
  return (
    <div className="mx-auto max-w-site px-4 py-8 sm:px-6 lg:px-8">
      {/* Intro Header Skeleton */}
      <div className="mb-8 space-y-3">
        <div className="h-8 w-48 animate-pulse rounded bg-zinc-200 dark:bg-zinc-800" />
        <div className="h-4 w-72 animate-pulse rounded bg-zinc-200 dark:bg-zinc-800" />
        <div className="h-10 w-full max-w-md animate-pulse rounded bg-zinc-200 dark:bg-zinc-800 mt-4" />
      </div>

      {/* Grid Skeleton */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
        {Array.from({ length: 8 }).map((_, i) => (
          <ProductSkeletonCard key={i} />
        ))}
      </div>
    </div>
  );
}
