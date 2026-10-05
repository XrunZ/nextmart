# NextMart Design System

## 1. Brand

### Name

**NextMart**

### Tagline

**Simple shopping. Built with Next.js.**

The brand should communicate:

- modern,
- simple,
- technical,
- reliable,
- approachable.

The visual identity should not look like a generic AI-generated e-commerce template.

---

# 2. Design Direction

NextMart is a **minimal modern e-commerce interface**.

The primary focus is product discovery and interaction.

Use the following products as design references:

### Linear

Reference for:

- spacing,
- typography hierarchy,
- subtle borders,
- interaction states,
- minimal visual language.

### Vercel

Reference for:

- monochromatic foundation,
- typography,
- whitespace,
- simple layouts,
- developer-oriented aesthetic.

### Raycast

Reference for:

- compact controls,
- keyboard-friendly interaction,
- polished UI states.

### Apple Store

Reference for:

- product presentation,
- product imagery,
- visual hierarchy,
- clean product pages.

Do not copy their branding or layouts.

Use them only as visual references.

---

# 3. Visual Personality

NextMart should feel:

- Clean
- Modern
- Minimal
- Technical
- Premium
- Lightweight
- Product-focused

The product should remain the primary visual focus.

---

# 4. Color System

## Light Mode

```text
Background       #FAFAFA
Surface          #FFFFFF
Foreground       #171717
Muted            #737373
Border           #E5E5E5
Primary          #18181B
Primary Hover    #27272A

Accent           #2563EB
Accent Hover     #1D4ED8

Success          #16A34A
Warning          #D97706
Danger           #DC2626
```

## Dark Mode

```text
Background       #09090B
Surface          #18181B
Foreground       #FAFAFA
Muted            #A1A1AA
Border           #27272A
Primary          #FAFAFA
Primary Hover    #E4E4E7

Accent           #60A5FA
Accent Hover     #93C5FD

Success          #22C55E
Warning          #F59E0B
Danger           #EF4444
```

Do not introduce additional colors without a clear design reason.

---

# 5. Typography

Preferred fonts:

```text
Geist
```

Fallback:

```text
Inter
```

Hierarchy:

```text
Display      40–48px
H1           32–40px
H2           24–30px
H3           20–24px
Body         16px
Small        14px
Caption      12–13px
```

Use typography as the primary hierarchy mechanism.

Avoid excessive bold text.

---

# 6. Spacing

Use a 4px spacing system:

```text
4px
8px
12px
16px
20px
24px
32px
40px
48px
64px
80px
96px
```

Avoid arbitrary spacing values.

---

# 7. Layout

Maximum desktop content width:

```text
1200px
```

Reading-heavy content:

```text
720–800px
```

Horizontal padding:

```text
Mobile: 16–20px
Tablet: 24–32px
Desktop: 32–48px
```

Use whitespace intentionally.

---

# 8. Header

Desktop:

```text
┌─────────────────────────────────────────────┐
│ NEXTMART      Search products...       Cart │
└─────────────────────────────────────────────┘
```

Mobile:

```text
┌────────────────────────────┐
│ NEXTMART              Cart │
├────────────────────────────┤
│ Search products...         │
└────────────────────────────┘
```

The header should remain compact.

Do not create a huge navigation area.

---

# 9. Homepage

The homepage should prioritize products rather than marketing content.

Recommended structure:

```text
Header
   ↓
Short Introduction
   ↓
Search
   ↓
Category Filter
   ↓
Product Grid
```

Example:

```text
NEXTMART

Simple shopping. Built with Next.js.

[ Search products... ]

All   Electronics   Jewelry   Clothing

┌──────┐ ┌──────┐ ┌──────┐ ┌──────┐
│ IMG  │ │ IMG  │ │ IMG  │ │ IMG  │
│      │ │      │ │      │ │      │
│ Name │ │ Name │ │ Name │ │ Name │
│ $49  │ │ $29  │ │ $79  │ │ $39  │
└──────┘ └──────┘ └──────┘ └──────┘
```

Avoid a giant hero section.

---

# 10. Product Grid

Responsive layout:

```text
Mobile   → 2 columns
Tablet   → 3 columns
Desktop  → 4 columns
```

Maintain consistent card dimensions.

Product imagery should have generous whitespace.

---

# 11. Product Card

Structure:

```text
┌──────────────────────────────┐
│                              │
│        PRODUCT IMAGE         │
│                              │
├──────────────────────────────┤
│ Category                     │
│ Product Name                 │
│ ★ 4.5                        │
│                              │
│ $49.99                [ + ]  │
└──────────────────────────────┘
```

Prioritize:

1. Image
2. Product name
3. Price
4. Rating
5. Add-to-cart interaction

Do not overload cards with information.

---

# 12. Product Detail

Recommended:

```text
┌─────────────────────────────────────┐
│                                     │
│ Product Image     Product Name      │
│                   Rating             │
│                   Description        │
│                   Price              │
│                   Quantity           │
│                   [ Add to Cart ]    │
│                                     │
└─────────────────────────────────────┘
```

The product image should receive significant visual space.

---

# 13. Search

Search is a primary interaction.

```text
┌─────────────────────────────────────┐
│ Search products...                  │
└─────────────────────────────────────┘
```

Requirements:

- visible focus state,
- keyboard accessible,
- clear query,
- responsive,
- empty result state.

Search results should update predictably.

---

# 14. Category Filter

Use compact controls:

```text
All
Electronics
Jewelry
Men's Clothing
Women's Clothing
```

Selected category must have clear visual feedback.

Do not turn every category into a large card.

---

# 15. Cart

Desktop can use a drawer.

Mobile can use a full-screen panel or dedicated page.

Example:

```text
Cart
────────────────────────

Product
$49.99
[-] 2 [+]

Product
$29.99
[-] 1 [+]

────────────────────────

3 items

Total
$129.97

[ Checkout ]
```

Checkout is visual only for the current scope.

Do not implement payment functionality unless requested.

---

# 16. Cart Interaction

State transitions should be clear:

```text
Add to Cart
     ↓
Cart Count +1
     ↓
Quantity Updated
     ↓
Total Recalculated
```

Use subtle feedback.

Do not use excessive animations.

---

# 17. Loading State

Use skeleton cards that resemble the final product layout.

```text
┌───────────────┐
│               │
│   ░░░░░░░     │
│               │
│ ░░░░░░░░░░    │
│ ░░░░░░        │
│               │
│ ░░░░░         │
└───────────────┘
```

---

# 18. Empty States

## Search

```text
No products found

Try another search term.
```

## Cart

```text
Your cart is empty

Browse products and find something you like.

[ Browse Products ]
```

Empty states should always provide useful context.

---

# 19. Error State

```text
Unable to load products

Something went wrong while fetching products.

[ Try Again ]
```

Keep the language clear and human.

---

# 20. Buttons

### Primary

Used for:

- Add to Cart
- Checkout
- important actions.

### Secondary

Used for:

- secondary actions,
- filters,
- alternative navigation.

### Ghost

Used for:

- low-priority controls,
- icon actions.

Button radius:

```text
8px
```

Do not use excessive pill-shaped buttons.

---

# 21. Borders

Use subtle borders:

```text
1px solid #E5E5E5
```

Dark:

```text
1px solid #27272A
```

Prefer borders and contrast over large shadows.

---

# 22. Radius

Recommended:

```text
Inputs      8px
Buttons     8px
Cards       10–12px
Panels      16px
```

Do not round everything excessively.

---

# 23. Shadows

Use shadows only to communicate elevation.

Avoid adding shadows to every component.

Preferred visual hierarchy:

```text
Spacing
+
Border
+
Contrast
```

before:

```text
Large Shadow
```

---

# 24. Animation

Use subtle transitions:

```text
150–200ms
ease-out
```

Allowed:

- hover,
- focus,
- drawer,
- quantity change,
- loading.

Avoid:

- bouncing,
- excessive parallax,
- floating objects,
- continuous motion.

Respect:

```text
prefers-reduced-motion
```

---

# 25. Anti AI-Slop

Do not automatically use:

- purple/blue gradients,
- giant gradient hero,
- glassmorphism,
- floating blobs,
- excessive rounded cards,
- excessive shadows,
- random icons,
- fake testimonials,
- fake statistics,
- meaningless badges,
- oversized headings,
- excessive animations,
- generic SaaS landing page patterns.

The design should feel intentionally composed.

---

# 26. Design Priority

Always prioritize:

```text
Usability
    ↓
Information Hierarchy
    ↓
Typography
    ↓
Spacing
    ↓
Product Imagery
    ↓
Interaction
    ↓
Decoration
```

Decoration must never compensate for poor hierarchy.

---

# 27. Brand Usage

Always write the brand as:

```text
NextMart
```

For visual wordmark treatment:

```text
NEXTMART
```

Do not use:

```text
Next Mart
Next-MART
Nextmart
NEXT MART
```

unless specifically required by the context.

---

# 28. Overall Experience

NextMart should feel like:

> A polished, lightweight modern shopping interface built with Next.js.

It should **not** feel like:

> A generic AI-generated e-commerce template.

The product, search, and cart interactions should be the center of the experience.