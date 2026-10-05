import React from "react";
import Link from "next/link";
import { BRAND_NAME, BRAND_TAGLINE } from "@/lib/constants";

export function Footer() {
  return (
    <footer className="mt-auto border-t border-border bg-surface text-muted text-xs transition-colors">
      <div className="mx-auto max-w-site px-4 py-8 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex flex-col gap-1 text-center sm:text-left">
            <span className="font-semibold text-foreground">{BRAND_NAME}</span>
            <span>{BRAND_TAGLINE}</span>
          </div>

          <div className="flex items-center gap-6">
            <Link href="/" className="hover:text-foreground transition-colors">
              Products
            </Link>
            <Link href="/cart" className="hover:text-foreground transition-colors">
              Cart
            </Link>
            <a
              href="https://fakestoreapi.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-foreground transition-colors"
            >
              Fake Store API
            </a>
          </div>
        </div>

        <div className="mt-6 border-t border-border pt-4 text-center sm:text-left text-[11px]">
          &copy; {new Date().getFullYear()} NextMart. Built for state management & clean architecture practice.
        </div>
      </div>
    </footer>
  );
}
