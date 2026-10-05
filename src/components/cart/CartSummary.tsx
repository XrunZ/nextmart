"use client";

import React, { useState } from "react";
import { useCart } from "@/hooks/useCart";
import { formatPrice } from "@/lib/utils";
import { Button } from "@/components/ui/Button";
import { ShoppingBag, ArrowRight, Trash2 } from "lucide-react";

interface CartSummaryProps {
  onCloseDrawer?: () => void;
}

export function CartSummary({ onCloseDrawer }: CartSummaryProps) {
  const { totalItems, totalPrice, clearCart } = useCart();
  const [isCheckedOut, setIsCheckedOut] = useState(false);

  const handleCheckout = () => {
    setIsCheckedOut(true);
    setTimeout(() => {
      clearCart();
      setIsCheckedOut(false);
      if (onCloseDrawer) onCloseDrawer();
    }, 2000);
  };

  if (totalItems === 0) return null;

  return (
    <div className="flex flex-col gap-4 border-t border-border pt-4 mt-auto bg-surface">
      {/* Items Breakdown */}
      <div className="flex flex-col gap-2 text-xs">
        <div className="flex items-center justify-between text-muted">
          <span>Total items</span>
          <span className="font-semibold text-foreground">{totalItems}</span>
        </div>
        <div className="flex items-center justify-between text-muted">
          <span>Shipping</span>
          <span className="font-semibold text-success">Free</span>
        </div>
        <div className="flex items-center justify-between text-sm font-bold text-foreground pt-2 border-t border-border">
          <span>Total Amount</span>
          <span className="text-base text-accent">{formatPrice(totalPrice)}</span>
        </div>
      </div>

      {/* Checkout Notice or Actions */}
      {isCheckedOut ? (
        <div className="p-3 rounded-btn bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-200 dark:border-emerald-900 text-center text-xs font-semibold text-emerald-600 dark:text-emerald-400 animate-fade-in">
          Order placed successfully! Clearing cart...
        </div>
      ) : (
        <div className="flex flex-col gap-2">
          <Button
            onClick={handleCheckout}
            variant="accent"
            size="lg"
            className="w-full justify-between"
          >
            <span className="flex items-center gap-2">
              <ShoppingBag className="h-4 w-4" />
              Checkout
            </span>
            <ArrowRight className="h-4 w-4" />
          </Button>

          <Button
            onClick={clearCart}
            variant="ghost"
            size="sm"
            className="w-full text-muted hover:text-danger text-xs gap-1.5"
          >
            <Trash2 className="h-3.5 w-3.5" />
            Clear Cart
          </Button>
        </div>
      )}
    </div>
  );
}
