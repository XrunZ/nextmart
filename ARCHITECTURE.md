# NextMart Architecture

## 1. Architecture Style

NextMart uses a **Modular Monolith** architecture.

The application is a single Next.js application, but responsibilities are separated into logical modules.

The architecture is intentionally simple.

The objective is:

> Keep the project easy to understand while maintaining clear separation of responsibilities.

Do not introduce microservices or enterprise-level architecture.

---

# 2. High-Level Architecture

```text
                         ┌─────────────────────┐
                         │   Fake Store API    │
                         └──────────┬──────────┘
                                    │
                                    ▼
                         ┌─────────────────────┐
                         │  Next.js App Router │
                         │    Server Fetching  │
                         └──────────┬──────────┘
                                    │
                                    ▼
                         ┌─────────────────────┐
                         │   Product Feature   │
                         └──────────┬──────────┘
                                    │
                   ┌────────────────┼────────────────┐
                   ▼                ▼                ▼
                Search           Filter          Products
                   │                │                │
                   └────────────────┼────────────────┘
                                    ▼
                              Cart State
                                    │
                    ┌───────────────┼───────────────┐
                    ▼               ▼               ▼
                 Header        Cart Drawer      Cart Page
```

---

# 3. Recommended Project Structure

```text
src/
├── app/
│   ├── layout.tsx
│   ├── page.tsx
│   ├── search/
│   │   └── page.tsx
│   ├── cart/
│   │   └── page.tsx
│   ├── products/
│   │   └── [id]/
│   │       └── page.tsx
│   ├── loading.tsx
│   ├── error.tsx
│   └── globals.css
│
├── components/
│   ├── ui/
│   ├── layout/
│   ├── products/
│   └── cart/
│
├── lib/
│   ├── api/
│   │   └── products.ts
│   ├── utils.ts
│   └── constants.ts
│
├── types/
│   └── product.ts
│
└── hooks/
    └── ...
```

Do not create every folder immediately.

Only introduce a directory when there is a real need for it.

---

# 4. Main Modules

## Products

Responsible for:

- fetching products,
- displaying products,
- product details,
- product categories.

```text
products/
├── ProductCard
├── ProductGrid
├── ProductSearch
└── ProductFilter
```

---

## Search

Responsible for:

- search input,
- search query,
- filtering products,
- no-result state.

---

## Cart

Responsible for:

- cart state,
- adding products,
- removing products,
- quantity,
- subtotal,
- total item count,
- empty cart.

```text
cart/
├── Cart
├── CartItem
├── CartSummary
└── EmptyCart
```

---

# 5. Data Flow

Product data:

```text
Fake Store API
      ↓
getProducts()
      ↓
Next.js Server Component
      ↓
Product Grid
      ↓
Product Card
```

Search:

```text
Products
    +
Search Query
    +
Category
    ↓
Derived Filter
    ↓
Product Grid
```

Cart:

```text
Product Card
      ↓
addToCart()
      ↓
Cart State
      ↓
Header / Cart / Summary
```

---

# 6. State Architecture

NextMart intentionally demonstrates several types of state.

### Server Data

Product information comes from Fake Store API.

```text
Products
Categories
Product Details
```

### Local UI State

Used for temporary component interaction.

Examples:

```text
Modal open/close
Dropdown
Input state
```

### Search State

Search query may be represented through URL parameters.

Example:

```text
/search?q=laptop
```

### Cart State

Cart is client-side state.

```text
cartItems
```

### Derived State

Calculated from existing state.

```text
filteredProducts
totalItems
totalPrice
```

Derived state must not be duplicated as independent state.

---

# 7. Client / Server Boundary

Use Server Components for:

```text
Product fetching
Static content
Layouts
Metadata
Product detail fetching
```

Use Client Components for:

```text
Search interaction
Cart interaction
Quantity controls
Interactive filters
Buttons requiring state
```

Keep Client Components as small as practical.

---

# 8. Cart Data Model

```ts
type CartItem = {
  product: Product;
  quantity: number;
};
```

Cart operations:

```text
addToCart()
removeFromCart()
increaseQuantity()
decreaseQuantity()
clearCart()
```

Derived values:

```text
totalItems
totalPrice
```

---

# 9. Filtering Pipeline

Filtering should follow a predictable pipeline:

```text
API Products
     ↓
Search Filter
     ↓
Category Filter
     ↓
Filtered Products
     ↓
Product Grid
```

The original product array must remain immutable.

---

# 10. Error Boundaries

Handle:

```text
API Error
Product Not Found
Loading
Empty Search
Empty Cart
```

Errors should be isolated where possible.

---

# 11. Future Scalability

The architecture can later be extended with:

```text
Authentication
      ↓
Database
      ↓
Persistent Cart
      ↓
Orders
      ↓
Payment
```

However, these features are outside the current scope.

Do not implement future architecture prematurely.

---

# 12. Architectural Rules

Always prefer:

```text
Simple
  ↓
Clear
  ↓
Reusable
  ↓
Modular
  ↓
Scalable when necessary
```

Avoid:

```text
Premature abstraction
Complex global state
Unnecessary services
Unnecessary dependencies
Microservices
Over-engineered patterns
```

NextMart is a small application and should remain understandable.