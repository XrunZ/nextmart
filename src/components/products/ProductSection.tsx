"use client";

import React, { useMemo } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Product } from "@/types/product";
import { ProductSearch } from "./ProductSearch";
import { ProductFilter } from "./ProductFilter";
import { ProductGrid } from "./ProductGrid";

interface ProductSectionProps {
  initialProducts: Product[];
  categories: string[];
}

export function ProductSection({
  initialProducts,
  categories,
}: ProductSectionProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const searchQuery = searchParams.get("q") || "";
  const selectedCategory = searchParams.get("category") || "all";

  // STRICTLY DERIVED STATE - computed via useMemo without duplicating array in useState
  const filteredProducts = useMemo(() => {
    return initialProducts.filter((product) => {
      // Search Title Match (case-insensitive)
      const matchesSearch = searchQuery.trim()
        ? product.title.toLowerCase().includes(searchQuery.toLowerCase().trim())
        : true;

      // Category Match
      const matchesCategory =
        selectedCategory.toLowerCase() === "all"
          ? true
          : product.category.toLowerCase() === selectedCategory.toLowerCase();

      return matchesSearch && matchesCategory;
    });
  }, [initialProducts, searchQuery, selectedCategory]);

  const handleResetFilters = () => {
    router.replace("/", { scroll: false });
  };

  return (
    <div className="flex flex-col gap-6">
      {/* Search & Filter Controls Bar */}
      <div className="flex flex-col gap-4">
        <ProductSearch />
        <ProductFilter categories={categories} />
      </div>

      {/* Filter Stats Header */}
      <div className="flex items-center justify-between text-xs text-muted pt-2 border-t border-border">
        <span>
          Showing{" "}
          <strong className="text-foreground font-semibold">
            {filteredProducts.length}
          </strong>{" "}
          {filteredProducts.length === 1 ? "product" : "products"}
          {(searchQuery || selectedCategory !== "all") && " (filtered)"}
        </span>

        {(searchQuery || selectedCategory !== "all") && (
          <button
            onClick={handleResetFilters}
            className="text-accent hover:underline text-xs font-medium"
          >
            Clear all filters
          </button>
        )}
      </div>

      {/* Product Grid */}
      <ProductGrid
        products={filteredProducts}
        onResetFilters={handleResetFilters}
      />
    </div>
  );
}
