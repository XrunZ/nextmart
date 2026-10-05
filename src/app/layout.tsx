import type { Metadata } from "next";
import { Suspense } from "react";
import "./globals.css";
import { CartProvider } from "@/context/CartContext";
import { ThemeProvider } from "@/context/ThemeContext";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { CartDrawer } from "@/components/cart/CartDrawer";
import { BRAND_NAME, BRAND_TAGLINE } from "@/lib/constants";

export const metadata: Metadata = {
  title: `${BRAND_NAME} - Simple e-commerce`,
  description: BRAND_TAGLINE,
};

const themeInitScript = `
  (function() {
    try {
      var saved = localStorage.getItem('nextmart_theme');
      if (saved === 'dark' || (!saved && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    } catch (e) {}
  })();
`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
      </head>
      <body
        suppressHydrationWarning
        className="flex min-h-screen flex-col bg-background text-foreground antialiased transition-colors duration-200"
      >
        <ThemeProvider>
          <CartProvider>
            <Suspense fallback={null}>
              <Header />
            </Suspense>

            <main className="flex-1">{children}</main>

            <CartDrawer />
            <Footer />
          </CartProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
