"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { ShoppingBag, Search, X } from "lucide-react";
import { BRAND_WORDMARK } from "@/lib/constants";
import { useCart } from "@/hooks/useCart";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { ThemeToggle } from "./ThemeToggle";

export function Header() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { totalItems, openDrawer } = useCart();
  const [searchQuery, setSearchQuery] = useState(searchParams.get("q") || "");

  useEffect(() => {
    setSearchQuery(searchParams.get("q") || "");
  }, [searchParams]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/?q=${encodeURIComponent(searchQuery.trim())}`);
    } else {
      router.push("/");
    }
  };

  const clearSearch = () => {
    setSearchQuery("");
    const params = new URLSearchParams(searchParams.toString());
    params.delete("q");
    const newUrl = params.toString() ? `/?${params.toString()}` : "/";
    router.push(newUrl);
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b border-border bg-surface/90 backdrop-blur-md transition-colors">
      <div className="mx-auto max-w-site px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between gap-4">
          {/* Brand Logo */}
          <Link
            href="/"
            className="text-lg font-bold tracking-tight text-foreground hover:opacity-80 transition-opacity flex items-center gap-2 shrink-0"
          >
            <span className="bg-primary text-background px-2 py-0.5 rounded text-xs font-black tracking-widest">
              NEXT
            </span>
            <span className="font-semibold tracking-tight">MART</span>
          </Link>

          {/* Search Bar (Desktop) */}
          <form
            onSubmit={handleSearchSubmit}
            className="hidden sm:flex flex-1 max-w-md mx-4 relative items-center"
          >
            <Input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search products..."
              icon={<Search className="h-4 w-4 text-muted" />}
              className="pr-8"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={clearSearch}
                className="absolute right-3 text-muted hover:text-foreground p-0.5 rounded-full"
                aria-label="Clear search"
              >
                <X className="h-3.5 w-3.5" />
              </button>
            )}
          </form>

          {/* Right Actions */}
          <div className="flex items-center gap-2 shrink-0">
            <ThemeToggle />

            <Link href="/cart" className="hidden sm:inline-flex">
              <Button variant="ghost" size="sm" className="text-muted hover:text-foreground">
                View Cart Page
              </Button>
            </Link>

            <Button
              onClick={openDrawer}
              variant="secondary"
              size="md"
              className="relative gap-2 px-3 sm:px-4"
              aria-label={`Shopping Cart (${totalItems} items)`}
            >
              <ShoppingBag className="h-4 w-4" />
              <span className="hidden xs:inline font-medium text-xs">Cart</span>
              {totalItems > 0 && (
                <span className="ml-1 inline-flex items-center justify-center rounded-full bg-accent text-white px-2 py-0.5 text-xs font-bold min-w-[20px] h-5">
                  {totalItems}
                </span>
              )}
            </Button>
          </div>
        </div>

        {/* Mobile Search Bar Row */}
        <div className="pb-3 sm:hidden">
          <form onSubmit={handleSearchSubmit} className="relative flex items-center">
            <Input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search products..."
              icon={<Search className="h-4 w-4 text-muted" />}
              className="pr-8"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={clearSearch}
                className="absolute right-3 text-muted hover:text-foreground p-0.5"
                aria-label="Clear search"
              >
                <X className="h-3.5 w-3.5" />
              </button>
            )}
          </form>
        </div>
      </div>
    </header>
  );
}
