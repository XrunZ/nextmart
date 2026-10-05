"use client";

import React from "react";
import Link from "next/link";
import { ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/Button";

interface EmptyCartProps {
  onCloseDrawer?: () => void;
}

export function EmptyCart({ onCloseDrawer }: EmptyCartProps) {
  return (
    <div className="flex flex-col items-center justify-center py-12 px-4 text-center my-auto">
      <div className="rounded-full bg-zinc-100 dark:bg-zinc-800 p-4 mb-4 text-muted">
        <ShoppingBag className="h-8 w-8" />
      </div>
      <h3 className="text-base font-semibold text-foreground mb-1">
        Your cart is empty
      </h3>
      <p className="text-xs text-muted max-w-xs mb-6">
        Browse products and find something you like to start building your order.
      </p>
      <Link href="/" onClick={onCloseDrawer}>
        <Button variant="primary" size="md">
          Browse Products
        </Button>
      </Link>
    </div>
  );
}
