"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Star, Plus, Check } from "lucide-react";
import { Product } from "@/types/product";
import { formatPrice, formatCategoryName } from "@/lib/utils";
import { useCart } from "@/hooks/useCart";
import { Button } from "@/components/ui/Button";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const { addToCart } = useCart();
  const [added, setAdded] = useState(false);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product, 1);
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  return (
    <div className="group relative flex flex-col justify-between rounded-card border border-border bg-surface p-4 transition-all duration-200 hover:border-zinc-300 dark:hover:border-zinc-700">
      <Link href={`/products/${product.id}`} className="flex flex-col gap-3">
        {/* Image Container with generous padding */}
        <div className="relative aspect-square w-full overflow-hidden rounded-md bg-white p-6 flex items-center justify-center border border-zinc-100 dark:border-zinc-800">
          <Image
            src={product.image}
            alt={product.title}
            fill
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
            className="object-contain transition-transform duration-300 group-hover:scale-105"
            priority={false}
          />
        </div>

        {/* Content Info */}
        <div className="flex flex-col gap-1.5 pt-1">
          <span className="text-[11px] font-medium uppercase tracking-wider text-muted">
            {formatCategoryName(product.category)}
          </span>

          <h3 className="text-sm font-semibold text-foreground line-clamp-2 leading-snug group-hover:text-accent transition-colors">
            {product.title}
          </h3>

          {/* Rating */}
          <div className="flex items-center gap-1.5 text-xs text-muted mt-0.5">
            <div className="flex items-center text-amber-500">
              <Star className="h-3.5 w-3.5 fill-current" />
            </div>
            <span className="font-medium text-foreground">
              {product.rating?.rate?.toFixed(1) ?? "4.5"}
            </span>
            <span className="text-[11px]">
              ({product.rating?.count ?? 0})
            </span>
          </div>
        </div>
      </Link>

      {/* Footer / Price & Add Button */}
      <div className="mt-4 flex items-center justify-between pt-3 border-t border-border gap-2">
        <span className="text-base font-bold text-foreground">
          {formatPrice(product.price)}
        </span>

        <Button
          onClick={handleAddToCart}
          variant={added ? "accent" : "primary"}
          size="icon"
          className="shrink-0 h-9 w-9 rounded-btn"
          aria-label={`Add ${product.title} to cart`}
        >
          {added ? (
            <Check className="h-4 w-4 text-white" />
          ) : (
            <Plus className="h-4 w-4" />
          )}
        </Button>
      </div>
    </div>
  );
}
