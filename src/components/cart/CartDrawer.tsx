"use client";

import React, { useEffect } from "react";
import { X, ShoppingBag } from "lucide-react";
import { useCart } from "@/hooks/useCart";
import { CartItem } from "./CartItem";
import { CartSummary } from "./CartSummary";
import { EmptyCart } from "./EmptyCart";
import { Button } from "@/components/ui/Button";

export function CartDrawer() {
  const { cart, totalItems, isDrawerOpen, closeDrawer } = useCart();

  // Handle ESC key press
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isDrawerOpen) {
        closeDrawer();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isDrawerOpen, closeDrawer]);

  // Lock body scroll when drawer is open
  useEffect(() => {
    if (isDrawerOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isDrawerOpen]);

  if (!isDrawerOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      {/* Backdrop */}
      <div
        onClick={closeDrawer}
        className="fixed inset-0 bg-black/40 backdrop-blur-xs transition-opacity animate-fade-in"
        aria-hidden="true"
      />

      {/* Slide-over Drawer Content */}
      <div className="relative z-10 flex h-full w-full max-w-md flex-col bg-surface p-6 shadow-2xl border-l border-border transition-transform animate-slide-in">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-border pb-4">
          <div className="flex items-center gap-2">
            <ShoppingBag className="h-5 w-5 text-accent" />
            <h2 className="text-base font-bold text-foreground">Shopping Cart</h2>
            <span className="rounded-full bg-zinc-100 dark:bg-zinc-800 px-2 py-0.5 text-xs font-semibold text-muted">
              {totalItems}
            </span>
          </div>

          <Button
            onClick={closeDrawer}
            variant="ghost"
            size="icon"
            className="h-8 w-8 text-muted hover:text-foreground"
            aria-label="Close cart drawer"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>

        {/* Cart Item List / Empty State */}
        {cart.length === 0 ? (
          <EmptyCart onCloseDrawer={closeDrawer} />
        ) : (
          <div className="flex-1 overflow-y-auto py-2 pr-1 my-2">
            {cart.map((item) => (
              <CartItem
                key={item.product.id}
                item={item}
                onCloseDrawer={closeDrawer}
              />
            ))}
          </div>
        )}

        {/* Summary Footer */}
        {cart.length > 0 && <CartSummary onCloseDrawer={closeDrawer} />}
      </div>
    </div>
  );
}
