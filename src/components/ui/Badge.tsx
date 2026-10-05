import React from "react";
import { cn } from "@/lib/utils";

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: "default" | "secondary" | "accent" | "outline";
}

export function Badge({
  className,
  variant = "default",
  children,
  ...props
}: BadgeProps) {
  const base =
    "inline-flex items-center rounded-md px-2 py-0.5 text-xs font-medium transition-colors";

  const variants = {
    default: "bg-zinc-100 text-zinc-900 dark:bg-zinc-800 dark:text-zinc-100",
    secondary: "bg-surface text-muted border border-border",
    accent: "bg-blue-50 text-accent dark:bg-blue-950/50 dark:text-accent-hover border border-blue-200 dark:border-blue-900",
    outline: "border border-border text-foreground",
  };

  return (
    <span className={cn(base, variants[variant], className)} {...props}>
      {children}
    </span>
  );
}
