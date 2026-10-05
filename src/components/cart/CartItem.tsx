"use client";

import React from "react";
import Link from "next/link";
import { Plus, Minus, Trash2 } from "lucide-react";
import { CartItem as CartItemType } from "@/types/product";
import { formatPrice } from "@/lib/utils";
import { useCart } from "@/hooks/useCart";
import { ProductImage } from "@/components/products/ProductImage";

interface CartItemProps {
  item: CartItemType;
  onCloseDrawer?: () => void;
}

export function CartItem({ item, onCloseDrawer }: CartItemProps) {
  const { updateQuantity, removeFromCart } = useCart();
  const { product, quantity } = item;

  const handleDecrease = () => {
    updateQuantity(product.id, quantity - 1);
  };

  const handleIncrease = () => {
    updateQuantity(product.id, quantity + 1);
  };

  const handleRemove = () => {
    removeFromCart(product.id);
  };

  const itemSubtotal = product.price * quantity;

  return (
    <div className="flex items-start gap-4 py-4 border-b border-border last:border-0">
      {/* Product Thumbnail */}
      <Link
        href={`/products/${product.id}`}
        onClick={onCloseDrawer}
        className="relative h-16 w-16 shrink-0 overflow-hidden rounded-md bg-white dark:bg-zinc-900 p-2 border border-border flex items-center justify-center group"
      >
        <ProductImage
          src={product.image}
          alt={product.title}
          fill
          sizes="64px"
          className="object-contain transition-transform duration-200 group-hover:scale-105"
          fallbackTitle={product.title}
        />
      </Link>

      {/* Product Details & Quantity */}
      <div className="flex flex-1 flex-col justify-between min-w-0">
        <div className="flex items-start justify-between gap-2">
          <Link
            href={`/products/${product.id}`}
            onClick={onCloseDrawer}
            className="text-xs font-semibold text-foreground hover:text-accent transition-colors line-clamp-2 leading-tight"
          >
            {product.title}
          </Link>
          <button
            onClick={handleRemove}
            className="text-muted hover:text-danger p-1 rounded transition-colors shrink-0"
            aria-label={`Remove ${product.title} from cart`}
          >
            <Trash2 className="h-4 w-4" />
          </button>
        </div>

        <div className="mt-2 flex items-center justify-between">
          {/* Quantity Controls */}
          <div className="flex items-center rounded-btn border border-border bg-surface">
            <button
              onClick={handleDecrease}
              className="px-2 py-1 text-muted hover:text-foreground hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
              aria-label="Decrease quantity"
            >
              <Minus className="h-3.5 w-3.5" />
            </button>
            <span className="px-2 text-xs font-semibold text-foreground min-w-[24px] text-center select-none">
              {quantity}
            </span>
            <button
              onClick={handleIncrease}
              className="px-2 py-1 text-muted hover:text-foreground hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
              aria-label="Increase quantity"
            >
              <Plus className="h-3.5 w-3.5" />
            </button>
          </div>

          {/* Subtotal */}
          <div className="text-xs font-bold text-foreground">
            {formatPrice(itemSubtotal)}
          </div>
        </div>
      </div>
    </div>
  );
}
