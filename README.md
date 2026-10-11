# NextMart

> **Simple shopping. Built with Next.js.**
> Belanja simpel, dibangun dengan Next.js.

A small, modern e-commerce interface built with **Next.js App Router** to demonstrate real-world React state management: server-side data fetching, add-to-cart, cart quantity handling, URL-synced search, category filtering, and derived state.

Sebuah antarmuka e-commerce modern berskala kecil yang dibangun dengan **Next.js App Router** untuk mendemonstrasikan manajemen state React di dunia nyata: pengambilan data sisi server, add-to-cart, pengelolaan kuantitas keranjang, pencarian yang tersinkron dengan URL, filter kategori, dan derived state.

![Next.js](https://img.shields.io/badge/Next.js-15-000000?logo=nextdotjs&logoColor=white)
![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=black)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3-06B6D4?logo=tailwindcss&logoColor=white)
![License: MIT](https://img.shields.io/badge/License-MIT-green)

---

## Table of Contents / Daftar Isi

- [Features / Fitur](#features--fitur)
- [Tech Stack](#tech-stack)
- [Getting Started / Memulai](#getting-started--memulai)
- [Project Structure / Struktur Project](#project-structure--struktur-project)
- [State Management](#state-management)
- [Data Source / Sumber Data](#data-source--sumber-data)
- [Scripts](#scripts)
- [Documentation / Dokumentasi](#documentation--dokumentasi)
- [License / Lisensi](#license--lisensi)

---

## Features / Fitur

| Feature | Fitur | Description / Keterangan |
| --- | --- | --- |
| Product catalog | Katalog produk | Product grid rendered from a server-side fetch. / Grid produk dari fetch sisi server. |
| Product detail | Detail produk | Dedicated page per product with quantity selector. / Halaman per produk dengan pemilih kuantitas. |
| Add to cart | Tambah ke keranjang | Quick add from card, or with quantity from detail page. / Tambah cepat dari card, atau dengan kuantitas dari halaman detail. |
| Cart management | Kelola keranjang | Increase, decrease, remove, clear, item count, and total price. / Tambah, kurang, hapus, kosongkan, jumlah item, dan total harga. |
| Cart persistence | Persistensi keranjang | Cart is saved to `localStorage` and survives refresh. / Keranjang disimpan di `localStorage` dan bertahan saat refresh. |
| Search | Pencarian | Case-insensitive, realtime, synced to `?q=` in the URL. / Case-insensitive, realtime, tersinkron ke `?q=` di URL. |
| Category filter | Filter kategori | Synced to `?category=` in the URL. / Tersinkron ke `?category=` di URL. |
| Derived state | Derived state | `filteredProducts`, `totalItems`, and `totalPrice` are computed, never stored. / `filteredProducts`, `totalItems`, dan `totalPrice` dihitung, bukan disimpan. |
| Loading state | Loading state | Skeleton product cards while data loads. / Skeleton card produk saat data dimuat. |
| Error state | Error state | Friendly error UI with a retry action. / UI error yang ramah dengan tombol coba lagi. |
| Empty states | Empty state | Clear guidance for empty search results and empty cart. / Panduan jelas untuk hasil pencarian kosong dan keranjang kosong. |
| Dark mode | Mode gelap | Light/dark theme toggle with `prefers-color-scheme` support. / Toggle tema terang/gelap dengan dukungan `prefers-color-scheme`. |
| Responsive UI | UI responsif | 2 / 3 / 4 column grid for mobile, tablet, desktop. / Grid 2 / 3 / 4 kolom untuk mobile, tablet, desktop. |

---

## Tech Stack

- **Framework** — [Next.js 15](https://nextjs.org/) (App Router, Server Components)
- **UI library** — [React 19](https://react.dev/)
- **Language** — [TypeScript 5](https://www.typescriptlang.org/) (strict)
- **Styling** — [Tailwind CSS 3](https://tailwindcss.com/)
- **Icons** — [lucide-react](https://lucide.dev/)
- **Utilities** — [clsx](https://github.com/lukeed/clsx) + [tailwind-merge](https://github.com/dcastil/tailwind-merge)
- **Linting** — ESLint (`next/core-web-vitals`)
- **Data source** — [Fake Store API](https://fakestoreapi.com/) with a resilient local fallback catalog

No external state library (Redux, Zustand, Jotai) is used — state is handled with React's built-in tools only.

Tidak ada library state eksternal (Redux, Zustand, Jotai) — state ditangani murni dengan fitur bawaan React.

---

## Getting Started / Memulai

### Prerequisites / Prasyarat

- **Node.js** 18.18 or newer (Node 20+ recommended)
- **npm** (or pnpm / yarn / bun)

### Installation / Instalasi

```bash
# 1. Clone the repository
git clone https://github.com/<your-username>/nextmart.git
cd nextmart

# 2. Install dependencies
npm install
```

### Run the development server / Jalankan server development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

Buka [http://localhost:3000](http://localhost:3000) di browser.

The app needs an internet connection on first load to reach the Fake Store API. If the API is unreachable, the app automatically falls back to a bundled catalog so the UI keeps working.

Aplikasi membutuhkan koneksi internet saat pertama kali memuat untuk mengakses Fake Store API. Jika API tidak dapat dijangkau, aplikasi otomatis memakai katalog cadangan yang sudah disertakan sehingga UI tetap berjalan.

### Production build / Build produksi

```bash
npm run build
npm run start
```

---

## Project Structure / Struktur Project

```text
src/
├── app/                     # Next.js App Router (pages, layouts, boundaries)
│   ├── layout.tsx
│   ├── page.tsx             # Home — server component
│   ├── loading.tsx          # Skeleton loading state
│   ├── error.tsx            # Error boundary
│   ├── not-found.tsx
│   ├── globals.css
│   ├── cart/page.tsx
│   ├── search/page.tsx
│   └── products/[id]/
│       ├── page.tsx
│       └── ProductAddToCartForm.tsx
│
├── components/
│   ├── ui/                  # Button, Input, Badge, Skeleton
│   ├── layout/              # Header, Footer, ThemeToggle
│   ├── products/            # ProductCard, Grid, Search, Filter, Section
│   └── cart/                # CartDrawer, CartItem, CartSummary, EmptyCart
│
├── context/                 # CartContext, ThemeContext
├── hooks/                   # useCart
├── lib/
│   ├── api/products.ts      # getProducts, getProduct, getCategories
│   ├── constants.ts
│   └── utils.ts
└── types/product.ts         # Shared Product / CartItem types
```

---

## State Management

NextMart intentionally keeps state as simple as possible. It follows this priority order:

Prioritas manajemen state di NextMart sengaja dibuat sesederhana mungkin, dengan urutan:

```text
Derived value → useState → useReducer → Context → external library
```

| State | Where it lives | Why / Alasan |
| --- | --- | --- |
| Products / categories | Server Components | Fetched on the server; no client state needed. |
| Cart | `CartContext` (`useState`) | Shared across Header, Product Card, and Cart Drawer. |
| Theme | `ThemeContext` | Global UI preference, persisted to `localStorage`. |
| Search query | URL (`?q=`) | Shareable, bookmarkable, reload-safe. |
| Category | URL (`?category=`) | Same reason — URL is the source of truth. |
| `totalItems`, `totalPrice`, `filteredProducts` | **Derived** | Computed with `reduce` / `useMemo`; never stored separately. |

**Rule:** never store a value that can be calculated from existing state. The original product array is always treated as immutable.

**Aturan:** jangan pernah menyimpan nilai yang bisa dihitung dari state yang sudah ada. Array produk asli selalu diperlakukan sebagai immutable.

---

## Data Source / Sumber Data

Product data comes from the public **Fake Store API**:

```text
https://fakestoreapi.com/products
https://fakestoreapi.com/products/{id}
https://fakestoreapi.com/products/categories
```

All fetching is centralized in [`src/lib/api/products.ts`](src/lib/api/products.ts):

- `getProducts()` — list of products (ISR, revalidate 1 hour)
- `getProduct(id)` — single product (returns `null` on 404)
- `getCategories()` — category list (ISR, revalidate 1 day)

If the API returns an error or is unreachable, the functions fall back to a bundled catalog and sanitize image URLs so the UI never breaks.

Jika API mengembalikan error atau tidak dapat dijangkau, fungsi akan memakai katalog cadangan dan menyanitasi URL gambar sehingga UI tidak pernah rusak.

---

## Scripts

| Command | Description / Keterangan |
| --- | --- |
| `npm run dev` | Start the development server. / Jalankan server development. |
| `npm run build` | Create a production build. / Buat build produksi. |
| `npm run start` | Run the production build. / Jalankan build produksi. |
| `npm run lint` | Run ESLint. / Jalankan ESLint. |
| `npx tsc --noEmit` | Type-check without emitting files. / Cek tipe tanpa output file. |

---

## Documentation / Dokumentasi

| File | Contents / Isi |
| --- | --- |
| [`AGENT.MD`](AGENT.MD) | Rules and conventions for contributors / AI agents. |
| [`ARCHITECTURE.md`](ARCHITECTURE.md) | Architecture, data flow, and module boundaries. |
| [`DESIGN.md`](DESIGN.md) | Design system: color, typography, spacing, components. |
| [`penjelasan.txt`](penjelasan.txt) | Penjelasan arsitektur dalam Bahasa Indonesia. |

---

## License / Lisensi

Released under the [MIT License](LICENSE).

Dirilis dengan [Lisensi MIT](LICENSE).
