"use client";

import React, { useState } from "react";
import Image, { ImageProps } from "next/image";
import { Package } from "lucide-react";
import { cn } from "@/lib/utils";

interface ProductImageProps extends Omit<ImageProps, "onError"> {
  fallbackTitle?: string;
}

export function ProductImage({
  src,
  alt,
  className,
  fallbackTitle,
  ...props
}: ProductImageProps) {
  const [error, setError] = useState(false);

  if (error || !src) {
    return (
      <div
        className={cn(
          "flex flex-col items-center justify-center p-4 text-center bg-zinc-50 dark:bg-zinc-900 text-muted rounded-md w-full h-full border border-dashed border-border select-none",
          className
        )}
      >
        <Package className="h-8 w-8 text-muted/60 mb-1" />
        <span className="text-[11px] font-medium line-clamp-1 text-muted">
          {fallbackTitle || alt || "No Image Available"}
        </span>
      </div>
    );
  }

  return (
    <Image
      src={src}
      alt={alt}
      className={className}
      onError={() => setError(true)}
      unoptimized
      {...props}
    />
  );
}
