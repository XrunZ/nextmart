"use client";

import React from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { formatCategoryName } from "@/lib/utils";
import { cn } from "@/lib/utils";

interface ProductFilterProps {
  categories: string[];
}

export function ProductFilter({ categories }: ProductFilterProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentCategory = searchParams.get("category") || "all";

  const handleSelectCategory = (category: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (category.toLowerCase() === "all") {
      params.delete("category");
    } else {
      params.set("category", category);
    }
    const queryString = params.toString();
    router.replace(queryString ? `/?${queryString}` : "/", { scroll: false });
  };

  const allCategories = ["all", ...categories];

  return (
    <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none max-w-full">
      {allCategories.map((cat) => {
        const isSelected =
          currentCategory.toLowerCase() === cat.toLowerCase();
        return (
          <button
            key={cat}
            onClick={() => handleSelectCategory(cat)}
            className={cn(
              "px-3.5 py-1.5 rounded-btn text-xs font-medium whitespace-nowrap transition-all duration-150 border select-none",
              isSelected
                ? "bg-primary text-background border-primary shadow-sm"
                : "bg-surface text-muted border-border hover:text-foreground hover:border-zinc-300 dark:hover:border-zinc-700"
            )}
          >
            {cat.toLowerCase() === "all" ? "All Products" : formatCategoryName(cat)}
          </button>
        );
      })}
    </div>
  );
}
