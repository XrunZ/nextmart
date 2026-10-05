# NextMart E-Commerce Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a minimal, modern Next.js e-commerce application (NextMart) powered by Fake Store API, featuring server-side data fetching, URL-based search & filtering, client-side cart state with derived values, slide-over cart drawer & dedicated cart page, loading skeletons, error boundaries, responsive grid, and strict design system adherence without AI slop.

**Architecture:** Modular Monolith architecture following Next.js App Router best practices. Server Components used by default for fetching and layout; Client Components isolated to stateful interactions (search, filters, cart, drawer). State architecture enforces derived values (totalItems, totalPrice, filteredProducts) without state duplication.

**Tech Stack:** Next.js 15 (App Router, TypeScript), Tailwind CSS, Lucide React icons, React Context for Cart state.

**Spec:** `AGENT.MD`, `ARCHITECTURE.md`, `DESIGN.md`

## Global Constraints

- Brand name MUST be formatted as `NextMart` (or visual wordmark `NEXTMART`).
- Data source MUST be Fake Store API (`https://fakestoreapi.com`).
- No external state management libraries (Redux, Zustand, etc.) — use React useState/Context.
- Total items and total price MUST be derived state calculated via `.reduce()`.
- Filtered products MUST be derived state, not duplicated state.
- Light and Dark mode styling MUST strictly use color tokens from `DESIGN.md`.
- Mobile product grid: 2 columns; Tablet: 3 columns; Desktop: 4 columns.
- Maximum desktop container width: 1200px.

---

### Task 1: Project Initialization & Configuration

**Files:**
- Create: `package.json`
- Create: `tsconfig.json`
- Create: `tailwind.config.ts`
- Create: `postcss.config.mjs`
- Create: `next.config.ts`
- Create: `src/app/globals.css`
- Create: `src/app/layout.tsx`
- Create: `src/app/page.tsx`
- Create: `.gitignore`

**Interfaces:**
- Consumes: Next.js + React + Tailwind CSS + Lucide React dependencies
- Produces: Runnable Next.js setup with Tailwind CSS and NextMart design system tokens defined in `globals.css`

- [ ] **Step 1: Scaffold Next.js project dependencies and configuration files**
- [ ] **Step 2: Define design system tokens, Tailwind config, and CSS variables in `globals.css`**
- [ ] **Step 3: Run `npm install` and verify `npm run build` / `npm run dev` initial setup**
- [ ] **Step 4: Commit initial setup**

---

### Task 2: Data Types & API Layer

**Files:**
- Create: `src/types/product.ts`
- Create: `src/lib/constants.ts`
- Create: `src/lib/utils.ts`
- Create: `src/lib/api/products.ts`

**Interfaces:**
- Consumes: Fake Store API endpoints (`https://fakestoreapi.com/products`, `/products/:id`, `/products/categories`)
- Produces: `Product`, `Rating`, `CartItem` types; `getProducts()`, `getProduct(id)`, `getCategories()` data fetching utilities; `formatPrice()` helper.

- [ ] **Step 1: Write TypeScript interfaces for `Product`, `Rating`, `CartItem` in `src/types/product.ts`**
- [ ] **Step 2: Create utility functions (`cn`, `formatPrice`, `capitalizeCategory`) in `src/lib/utils.ts` and constants in `src/lib/constants.ts`**
- [ ] **Step 3: Create API data fetchers in `src/lib/api/products.ts` with error handling**
- [ ] **Step 4: Test API fetching with a quick script or unit check**
- [ ] **Step 5: Commit API layer**

---

### Task 3: Cart Context & Client State Management

**Files:**
- Create: `src/context/CartContext.tsx`
- Create: `src/hooks/useCart.ts`

**Interfaces:**
- Consumes: `Product`, `CartItem` types from `src/types/product.ts`
- Produces: `CartContext`, `CartProvider`, `useCart()` hook offering:
  - `cart: CartItem[]`
  - `addToCart(product, quantity)`
  - `removeFromCart(productId)`
  - `updateQuantity(productId, quantity)`
  - `clearCart()`
  - `totalItems: number` (derived)
  - `totalPrice: number` (derived)
  - `isDrawerOpen: boolean`
  - `openDrawer()` / `closeDrawer()` / `toggleDrawer()`

- [ ] **Step 1: Create `CartContext.tsx` with React Context and localStorage persistence**
- [ ] **Step 2: Compute `totalItems` and `totalPrice` as derived state using `cart.reduce(...)`**
- [ ] **Step 3: Export custom `useCart` hook in `src/hooks/useCart.ts`**
- [ ] **Step 4: Commit Cart state context**

---

### Task 4: UI Primitive Components

**Files:**
- Create: `src/components/ui/Button.tsx`
- Create: `src/components/ui/Input.tsx`
- Create: `src/components/ui/Badge.tsx`
- Create: `src/components/ui/Skeleton.tsx`

**Interfaces:**
- Consumes: Tailwind classes and HTML element props
- Produces: Reusable `Button` (Primary, Secondary, Ghost sizes/variants), `Input`, `Badge`, and `Skeleton` elements strictly adhering to `DESIGN.md` (8px border radius, subtle hover states).

- [ ] **Step 1: Implement `Button.tsx` with variants (primary, secondary, ghost, danger) and radius 8px**
- [ ] **Step 2: Implement `Input.tsx` with focus ring and 8px radius**
- [ ] **Step 3: Implement `Badge.tsx` and `Skeleton.tsx`**
- [ ] **Step 4: Commit UI components**

---

### Task 5: Layout & Header Components

**Files:**
- Create: `src/components/layout/Header.tsx`
- Create: `src/components/layout/Footer.tsx`
- Modify: `src/app/layout.tsx`

**Interfaces:**
- Consumes: `CartProvider`, `useCart`, `NEXTMART` wordmark styling
- Produces: Responsive `Header` with logo, desktop/mobile search bar trigger, cart icon button with badge counter, and `Footer`.

- [ ] **Step 1: Implement `Header.tsx` adhering to desktop and mobile layouts in `DESIGN.md` Section 8**
- [ ] **Step 2: Implement `Footer.tsx` with subtle borders and simple typography**
- [ ] **Step 3: Wrap root layout in `CartProvider` and add `Header` and `Footer`**
- [ ] **Step 4: Commit Layout components**

---

### Task 6: Product Grid, Cards, Search & Category Filter

**Files:**
- Create: `src/components/products/ProductCard.tsx`
- Create: `src/components/products/ProductGrid.tsx`
- Create: `src/components/products/ProductSearch.tsx`
- Create: `src/components/products/ProductFilter.tsx`
- Create: `src/components/products/ProductSection.tsx`

**Interfaces:**
- Consumes: `Product` data, `useCart` hook, URL search parameters (`q`, `category`)
- Produces:
  - `ProductCard`: Responsive image, category, title, star rating, price, quick Add to Cart button
  - `ProductGrid`: 2-col (mobile), 3-col (tablet), 4-col (desktop) grid layout
  - `ProductSearch`: Input updating URL search query `?q=`
  - `ProductFilter`: Compact category pills (All, Electronics, Jewelry, Men's Clothing, Women's Clothing) updating URL `?category=`
  - Derived product filtering (search title match + category match) without array mutation

- [ ] **Step 1: Implement `ProductCard.tsx` with clean spacing, price, rating, and add-to-cart interaction**
- [ ] **Step 2: Implement `ProductGrid.tsx` with responsive 2/3/4 grid layout and empty search state**
- [ ] **Step 3: Implement `ProductSearch.tsx` and `ProductFilter.tsx` connected to `useRouter` / `useSearchParams`**
- [ ] **Step 4: Build `ProductSection.tsx` to combine Search, Filter, and Grid with derived filtering logic**
- [ ] **Step 5: Commit Product components**

---

### Task 7: Cart Drawer & Cart Page Components

**Files:**
- Create: `src/components/cart/CartDrawer.tsx`
- Create: `src/components/cart/CartItem.tsx`
- Create: `src/components/cart/CartSummary.tsx`
- Create: `src/components/cart/EmptyCart.tsx`
- Create: `src/app/cart/page.tsx`

**Interfaces:**
- Consumes: `useCart` hook, `CartItem` data
- Produces:
  - `CartDrawer`: Slide-over panel for quick cart viewing, editing quantity `[-] q [+]`, item deletion, subtotal calculation, and checkout trigger.
  - `src/app/cart/page.tsx`: Dedicated full cart page with detailed order summary.
  - `EmptyCart`: Clear call to action to browse products when cart is empty.

- [ ] **Step 1: Implement `CartItem.tsx` with item image, details, `[-] q [+]` quantity control, and remove button**
- [ ] **Step 2: Implement `CartSummary.tsx` and `EmptyCart.tsx`**
- [ ] **Step 3: Implement `CartDrawer.tsx` overlay slide-over panel with keyboard Esc and backdrop close**
- [ ] **Step 4: Implement `src/app/cart/page.tsx` dedicated cart page**
- [ ] **Step 5: Commit Cart components & pages**

---

### Task 8: Product Detail Page & Route Pages

**Files:**
- Create: `src/app/products/[id]/page.tsx`
- Create: `src/app/search/page.tsx`
- Create: `src/app/loading.tsx`
- Create: `src/app/error.tsx`
- Create: `src/app/not-found.tsx`

**Interfaces:**
- Consumes: Server-side `getProduct(id)` fetching, Client quantity selector, `useCart`
- Produces:
  - Product Detail Page (`/products/[id]`): High-res image display, rating, description, quantity selector, primary Add to Cart button.
  - Search Page (`/search`): Handles query search view.
  - Loading skeleton & Error boundary components.

- [ ] **Step 1: Implement Product Detail Page (`src/app/products/[id]/page.tsx`) with Server Component data fetch and Client Add-To-Cart control**
- [ ] **Step 2: Implement Search Page (`src/app/search/page.tsx`) reusing `ProductSection`**
- [ ] **Step 3: Implement Skeleton Loading (`src/app/loading.tsx`) and Error handling (`src/app/error.tsx`, `not-found.tsx`)**
- [ ] **Step 4: Commit Product Detail Page and system routes**

---

### Task 9: Homepage Assembly & Integration Verification

**Files:**
- Modify: `src/app/page.tsx`

**Interfaces:**
- Consumes: `getProducts()`, `getCategories()`, `ProductSection`
- Produces: Complete NextMart homepage featuring brand header intro, search & category filters, product grid, loading skeletons, and interactive cart drawer.

- [ ] **Step 1: Assemble Homepage in `src/app/page.tsx` with server fetch of products and categories**
- [ ] **Step 2: Run `npm run build` and verify zero TypeScript or lint errors**
- [ ] **Step 3: Test all functionality (Search, Category Filter, Add to Cart, Cart Drawer, Cart Page, Product Details, Responsive views)**
- [ ] **Step 4: Final commit and verify completion**
