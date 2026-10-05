"use client";

import React, { useState } from "react";
import { Plus, Minus, ShoppingBag, Check } from "lucide-react";
import { Product } from "@/types/product";
import { useCart } from "@/hooks/useCart";
import { Button } from "@/components/ui/Button";

interface ProductAddToCartFormProps {
  product: Product;
}

export function ProductAddToCartForm({ product }: ProductAddToCartFormProps) {
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  const handleDecrease = () => {
    if (quantity > 1) setQuantity(quantity - 1);
  };

  const handleIncrease = () => {
    setQuantity(quantity + 1);
  };

  const handleAddToCart = () => {
    addToCart(product, quantity);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2">
      {/* Quantity Control */}
      <div className="flex items-center justify-between rounded-btn border border-border bg-surface px-3 py-2 w-full sm:w-auto">
        <span className="text-xs text-muted font-medium sm:hidden">Quantity</span>
        <div className="flex items-center gap-3">
          <button
            onClick={handleDecrease}
            disabled={quantity <= 1}
            className="text-muted hover:text-foreground disabled:opacity-30 transition-colors p-1"
            aria-label="Decrease quantity"
          >
            <Minus className="h-4 w-4" />
          </button>
          <span className="text-sm font-bold text-foreground min-w-[24px] text-center select-none">
            {quantity}
          </span>
          <button
            onClick={handleIncrease}
            className="text-muted hover:text-foreground transition-colors p-1"
            aria-label="Increase quantity"
          >
            <Plus className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Add To Cart Button */}
      <Button
        onClick={handleAddToCart}
        variant={added ? "accent" : "primary"}
        size="lg"
        className="flex-1 gap-2"
      >
        {added ? (
          <>
            <Check className="h-5 w-5" />
            Added to Cart!
          </>
        ) : (
          <>
            <ShoppingBag className="h-5 w-5" />
            Add to Cart
          </>
        )}
      </Button>
    </div>
  );
}
