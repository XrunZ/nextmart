# AGENTS.md

# NextMart — Agent Rules

## 1. Project Overview

**NextMart** is a simple modern e-commerce application built with Next.js.

The project uses the **Fake Store API** as its product data source.

The primary purpose of this project is to demonstrate:

- Next.js App Router
- API data fetching
- Product rendering
- React state management
- Add to cart
- Cart quantity management
- Product searching
- Product filtering
- Derived state
- Loading states
- Empty states
- Error handling
- Responsive UI

The project should remain simple, clean, and easy to understand.

Do not turn NextMart into an unnecessarily complex production-scale system.

---

# 2. Core Principles

Always prioritize:

1. Simplicity
2. Readability
3. Maintainability
4. Reusability
5. Accessibility
6. Performance
7. Good UX

Prefer the simplest solution that correctly solves the problem.

Do not introduce complexity without a clear reason.

---

# 3. Next.js Rules

Use the Next.js App Router.

Prefer Server Components by default.

Use Client Components only when the component requires:

- `useState`
- `useReducer`
- event handlers
- browser APIs
- interactive state

Avoid adding:

```tsx
"use client";
```

to an entire page when only a small component requires client-side behavior.

Prefer small Client Component boundaries.

Example:

```text
Server Page
├── Header
├── Product data
├── Product Grid
└── ProductCardClient
      └── Add to Cart
```

---

# 4. Fake Store API

Fake Store API is the primary product data source.

Products:

```text
https://fakestoreapi.com/products
```

Product detail:

```text
https://fakestoreapi.com/products/{id}
```

Categories:

```text
https://fakestoreapi.com/products/categories
```

Do not create duplicate product data unless it is required for UI testing.

Do not hardcode product information that already exists in the API.

---

# 5. Data Fetching

Centralize API functions.

Recommended:

```text
lib/
└── api/
    └── products.ts
```

Example functions:

```ts
getProducts()
getProduct(id)
getCategories()
```

API fetching should handle:

- successful responses,
- failed requests,
- empty responses,
- unexpected data.

Do not silently ignore errors.

Prefer server-side fetching when possible.

Avoid unnecessary `useEffect`-based data fetching.

---

# 6. Product Data Type

Define a shared Product type.

Example:

```ts
type Product = {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: {
    rate: number;
    count: number;
  };
};
```

Do not duplicate this type throughout the project.

Avoid `any`.

---

# 7. State Management

State management is one of the main learning objectives of NextMart.

Use React's built-in state management first.

Preferred order:

```text
Derived value
      ↓
useState
      ↓
useReducer
      ↓
Context
      ↓
External state library
```

For the current scope, prefer:

```text
useState
```

Do not install Redux, Zustand, Jotai, or another state library unless explicitly requested.

---

# 8. Cart State

The cart is client-side state.

Cart items should contain:

```ts
type CartItem = {
  product: Product;
  quantity: number;
};
```

The cart should support:

```text
addToCart()
removeFromCart()
increaseQuantity()
decreaseQuantity()
clearCart()
```

The cart must correctly handle:

- adding a new product,
- adding an existing product,
- increasing quantity,
- decreasing quantity,
- removing a product,
- clearing the cart,
- calculating item count,
- calculating total price.

---

# 9. Derived State

Do not store values that can be calculated from existing state.

Avoid:

```ts
const [cart, setCart] = useState([]);
const [totalItems, setTotalItems] = useState(0);
const [totalPrice, setTotalPrice] = useState(0);
```

Prefer:

```ts
const totalItems = cart.reduce(
  (total, item) => total + item.quantity,
  0
);

const totalPrice = cart.reduce(
  (total, item) => total + item.product.price * item.quantity,
  0
);
```

The same rule applies to filtered products.

Do not store:

```text
filteredProducts
```

as separate state.

Derive it from:

```text
products
searchQuery
selectedCategory
```

---

# 10. Search

Search is a core NextMart feature.

Search must:

- filter products by title,
- be case-insensitive,
- update as the user searches,
- handle empty queries,
- handle no results,
- preserve the original product list.

Data flow:

```text
Products
   +
Search Query
   ↓
Filtered Products
```

Do not mutate the original product array.

---

# 11. URL Search

When practical, search should be reflected in the URL.

Example:

```text
/search?q=phone
```

or:

```text
?q=phone
```

URL state should be shareable and reload-safe.

Do not maintain unnecessary duplicate state between the URL and React state.

---

# 12. Category Filtering

If category filtering is implemented:

```text
Products
   ↓
Search Filter
   ↓
Category Filter
   ↓
Filtered Products
```

Filtering should remain derived state.

Do not mutate the original API response.

---

# 13. Component Architecture

Recommended structure:

```text
components/
├── ui/
│   ├── Button.tsx
│   ├── Input.tsx
│   └── ...
│
├── layout/
│   ├── Header.tsx
│   └── Footer.tsx
│
├── products/
│   ├── ProductCard.tsx
│   ├── ProductGrid.tsx
│   ├── ProductSearch.tsx
│   └── ProductFilter.tsx
│
└── cart/
    ├── Cart.tsx
    ├── CartItem.tsx
    ├── CartSummary.tsx
    └── EmptyCart.tsx
```

Do not create components just to reduce file length.

Create a component when it:

- has a clear responsibility,
- is reused,
- contains meaningful state,
- or improves readability.

---

# 14. State Ownership

Keep state as close as possible to where it is needed.

Example:

```text
Search
   ↓
Product Search Component

Cart
   ↓
Cart State
   ├── Product Card
   ├── Header
   └── Cart Drawer
```

Do not make state global without a reason.

---

# 15. Loading State

The product page must provide a proper loading state.

Prefer skeleton product cards.

Do not show a completely blank screen while products are loading.

---

# 16. Error State

If Fake Store API fails, show a useful error state.

Example:

```text
Unable to load products.

Something went wrong while fetching products.

[Try Again]
```

Do not expose raw API errors to users.

---

# 17. Empty State

Search:

```text
No products found.

Try another search term.
```

Cart:

```text
Your cart is empty.

Browse products and add something you like.
```

Empty states should tell users what to do next.

---

# 18. Responsive Design

NextMart must work on:

- mobile,
- tablet,
- desktop.

Recommended product grid:

```text
Mobile   → 2 columns
Tablet   → 3 columns
Desktop  → 4 columns
```

Mobile is not simply a smaller desktop layout.

Navigation, cart, search, and product cards must remain usable on small screens.

---

# 19. Accessibility

Use semantic HTML.

All interactive elements must support keyboard interaction.

Requirements:

- buttons use `<button>`,
- links use `<Link>` or `<a>`,
- inputs have labels,
- images have meaningful `alt`,
- focus states are visible,
- color is not the only way to communicate state.

---

# 20. Performance

Prefer:

- Server Components,
- server-side data fetching,
- small Client Components,
- `next/image`,
- `next/font`,
- derived state.

Avoid unnecessary:

- `useEffect`,
- global state,
- memoization,
- dependencies,
- client-side fetching.

Do not optimize prematurely.

---

# 21. Dependencies

Before installing a dependency:

1. Check whether Next.js provides the functionality.
2. Check whether React provides the functionality.
3. Check whether the existing project already provides it.
4. Only then install a new package.

Keep NextMart lightweight.

---

# 22. Anti AI-Slop

Follow `DESIGN.md`.

Avoid automatically generating:

- giant gradients,
- excessive glassmorphism,
- excessive rounded cards,
- random icons,
- fake statistics,
- unnecessary hero sections,
- excessive animations,
- meaningless badges,
- generic SaaS layouts.

The UI must feel intentional.

---

# 23. Code Quality

Before finishing a feature:

- remove unused imports,
- remove dead code,
- remove duplicated logic,
- avoid unnecessary abstractions,
- check TypeScript errors,
- check lint errors,
- verify responsive behavior,
- verify loading states,
- verify error states,
- verify empty states.

Do not rewrite unrelated code.

---

# 24. Agent Workflow

Before coding:

1. Inspect the repository.
2. Read `AGENTS.md`.
3. Read `ARCHITECTURE.md`.
4. Read `DESIGN.md`.
5. Inspect existing dependencies.
6. Inspect existing components.
7. Identify reusable code.