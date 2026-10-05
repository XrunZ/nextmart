import React from "react";
import { cn } from "@/lib/utils";

export function Skeleton({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("animate-pulse rounded-md bg-zinc-200 dark:bg-zinc-800", className)}
      {...props}
    />
  );
}

export function ProductSkeletonCard() {
  return (
    <div className="flex flex-col rounded-card border border-border bg-surface p-4 gap-3">
      <Skeleton className="h-44 w-full rounded-md" />
      <div className="flex flex-col gap-2 pt-1">
        <Skeleton className="h-3 w-1/3" />
        <Skeleton className="h-4 w-4/5" />
        <Skeleton className="h-3 w-1/4" />
      </div>
      <div className="flex items-center justify-between pt-3 border-t border-border">
        <Skeleton className="h-6 w-16" />
        <Skeleton className="h-9 w-9 rounded-btn" />
      </div>
    </div>
  );
}
