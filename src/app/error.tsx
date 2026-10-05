"use client";

import React, { useEffect } from "react";
import { AlertCircle, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/Button";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Unhandled NextMart application error:", error);
  }, [error]);

  return (
    <div className="mx-auto max-w-site px-4 py-16 text-center flex flex-col items-center justify-center">
      <div className="rounded-full bg-red-50 dark:bg-red-950/50 p-4 mb-4 text-danger border border-red-200 dark:border-red-900">
        <AlertCircle className="h-8 w-8" />
      </div>
      <h2 className="text-xl font-bold text-foreground mb-2">
        Unable to load products
      </h2>
      <p className="text-sm text-muted max-w-md mb-6 leading-relaxed">
        Something went wrong while fetching product data. Please check your internet connection and try again.
      </p>
      <Button onClick={() => reset()} variant="primary" size="md" className="gap-2">
        <RefreshCw className="h-4 w-4" />
        Try Again
      </Button>
    </div>
  );
}
