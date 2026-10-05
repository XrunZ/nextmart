"use client";

import React from "react";
import Link from "next/link";
import { ArrowLeft, ShoppingBag } from "lucide-react";
import { useCart } from "@/hooks/useCart";
import { CartItem } from "@/components/cart/CartItem";
import { CartSummary } from "@/components/cart/CartSummary";
import { EmptyCart } from "@/components/cart/EmptyCart";
import { Button } from "@/components/ui/Button";

export default function CartPage() {
  const { cart, totalItems } = useCart();

  return (
    <div className="mx-auto max-w-site px-4 py-8 sm:px-6 lg:px-8">
      {/* Top Header Navigation */}
      <div className="mb-8 flex items-center justify-between border-b border-border pb-4">
        <div>
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-xs text-muted hover:text-foreground mb-2 transition-colors"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            Back to Products
          </Link>
          <h1 className="text-2xl font-bold tracking-tight text-foreground flex items-center gap-3">
            Your Shopping Cart
            <span className="rounded-full bg-zinc-100 dark:bg-zinc-800 px-2.5 py-0.5 text-xs font-semibold text-muted">
              {totalItems} {totalItems === 1 ? "item" : "items"}
            </span>
          </h1>
        </div>
      </div>

      {cart.length === 0 ? (
        <div className="py-12 border border-dashed border-border rounded-card bg-surface">
          <EmptyCart />
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Cart Item List */}
          <div className="lg:col-span-8 rounded-card border border-border bg-surface p-6">
            <div className="divide-y divide-border">
              {cart.map((item) => (
                <CartItem key={item.product.id} item={item} />
              ))}
            </div>
          </div>

          {/* Order Summary Panel */}
          <div className="lg:col-span-4 sticky top-24 rounded-card border border-border bg-surface p-6">
            <h2 className="text-base font-bold text-foreground mb-4 pb-2 border-b border-border">
              Order Summary
            </h2>
            <CartSummary />
          </div>
        </div>
      )}
    </div>
  );
}
