import React from "react";
import Link from "next/link";
import { FileQuestion, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <div className="mx-auto max-w-site px-4 py-20 text-center flex flex-col items-center justify-center">
      <div className="rounded-full bg-zinc-100 dark:bg-zinc-800 p-4 mb-4 text-muted">
        <FileQuestion className="h-8 w-8" />
      </div>
      <h2 className="text-2xl font-bold text-foreground mb-2">
        Page Not Found
      </h2>
      <p className="text-sm text-muted max-w-sm mb-6">
        The product or page you are looking for does not exist or has been removed.
      </p>
      <Link href="/">
        <Button variant="primary" size="md" className="gap-2">
          <ArrowLeft className="h-4 w-4" />
          Back to Homepage
        </Button>
      </Link>
    </div>
  );
}
