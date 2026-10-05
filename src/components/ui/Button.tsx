import React from "react";
import { cn } from "@/lib/utils";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost" | "danger" | "accent";
  size?: "sm" | "md" | "lg" | "icon";
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = "primary",
      size = "md",
      type = "button",
      children,
      disabled,
      ...props
    },
    ref
  ) => {
    const baseStyles =
      "inline-flex items-center justify-center font-medium rounded-btn transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent disabled:pointer-events-none disabled:opacity-50 select-none";

    const variants = {
      primary:
        "bg-primary text-background hover:bg-primary-hover active:scale-[0.98]",
      secondary:
        "bg-transparent border border-border text-foreground hover:bg-zinc-100 dark:hover:bg-zinc-800/80 active:scale-[0.98]",
      ghost:
        "bg-transparent text-foreground hover:bg-zinc-100 dark:hover:bg-zinc-800/80 active:scale-[0.98]",
      danger:
        "bg-danger text-white hover:bg-red-700 dark:hover:bg-red-600 active:scale-[0.98]",
      accent:
        "bg-accent text-white hover:bg-accent-hover active:scale-[0.98]",
    };

    const sizes = {
      sm: "h-8 px-3 text-xs gap-1.5",
      md: "h-10 px-4 text-sm gap-2",
      lg: "h-12 px-6 text-base gap-2.5",
      icon: "h-9 w-9 p-0 text-sm",
    };

    return (
      <button
        ref={ref}
        type={type}
        disabled={disabled}
        className={cn(baseStyles, variants[variant], sizes[size], className)}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";
