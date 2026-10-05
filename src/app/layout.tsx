import type { Metadata } from "next";
import { Suspense } from "react";
import "./globals.css";
import { CartProvider } from "@/context/CartContext";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { CartDrawer } from "@/components/cart/CartDrawer";
import { BRAND_NAME, BRAND_TAGLINE } from "@/lib/constants";

export const metadata: Metadata = {
  title: `${BRAND_NAME} - Simple e-commerce`,
  description: BRAND_TAGLINE,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="flex min-h-screen flex-col bg-background text-foreground antialiased">
        <CartProvider>
          <Suspense fallback={null}>
            <Header />
          </Suspense>

          <main className="flex-1">{children}</main>

          <CartDrawer />
          <Footer />
        </CartProvider>
      </body>
    </html>
  );
}
