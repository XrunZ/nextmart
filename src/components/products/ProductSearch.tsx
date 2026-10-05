"use client";

import React, { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Search, X } from "lucide-react";
import { Input } from "@/components/ui/Input";

interface ProductSearchProps {
  onSearchChange?: (query: string) => void;
}

export function ProductSearch({ onSearchChange }: ProductSearchProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialQuery = searchParams.get("q") || "";
  const [query, setQuery] = useState(initialQuery);

  useEffect(() => {
    setQuery(searchParams.get("q") || "");
  }, [searchParams]);

  const updateUrl = (newQuery: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (newQuery.trim()) {
      params.set("q", newQuery.trim());
    } else {
      params.delete("q");
    }
    const queryString = params.toString();
    router.replace(queryString ? `/?${queryString}` : "/", { scroll: false });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setQuery(val);
    if (onSearchChange) onSearchChange(val);
    updateUrl(val);
  };

  const handleClear = () => {
    setQuery("");
    if (onSearchChange) onSearchChange("");
    updateUrl("");
  };

  return (
    <div className="relative w-full">
      <Input
        value={query}
        onChange={handleChange}
        placeholder="Search products by title..."
        icon={<Search className="h-4 w-4 text-muted" />}
        className="pr-9 h-11 text-base sm:text-sm"
      />
      {query && (
        <button
          type="button"
          onClick={handleClear}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-muted hover:text-foreground p-1 rounded-full transition-colors"
          aria-label="Clear search query"
        >
          <X className="h-4 w-4" />
        </button>
      )}
    </div>
  );
}
