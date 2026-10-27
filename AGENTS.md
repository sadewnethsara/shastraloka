# Shastraloka (ශාස්ත්‍රලෝක) — Architectural & Agent Guide

> **For AI Coding Agents:** Read this file first before making changes. It defines the architectural standards, established conventions, design rules, and file layout.

---

## 1. Project Overview & Tech Stack
- **Framework:** Next.js 16.4+ (App Router, Turbopack, React 19)
- **Styling:** Tailwind CSS v4, CSS Custom Properties (`src/app/globals.css`, `src/app/gestalt.css`)
- **Typography:** Serif (Playfair Display / Georgia for titles) + Sans (Plus Jakarta Sans for UI body) + Sinhala (`Noto Serif Sinhala`)
- **Icons:** `lucide-react` (Primary icon library)
- **State Management:** React Context in [`src/context/AppContext.tsx`](src/context/AppContext.tsx) + `localStorage` persistence

---

## 2. Critical Core Invariants (Rules That Must Not Be Broken)

### Rule 1: Always "Bag" (NEVER "Cart")
- All user-facing text, button labels, toasts, and code functions must use **"Bag"** or **"Shopping Bag"** (e.g., `"Add to Bag"`, `"Shopping Bag"`, `"Your bag is empty"`).
- State and handlers in [`src/context/AppContext.tsx`](src/context/AppContext.tsx) are:
  - State: `bag: BagItem[]`, `isBagOpen: boolean`, `bagCount: number`, `bagTotal: number`
  - Actions: `addToBag()`, `removeFromBag()`, `updateBagQuantity()`, `clearBag()`, `setIsBagOpen()`
  - *(Note: `cart` and `addToCart` exist strictly as backward-compatible aliases; never write new code using `cart`).*

### Rule 2: Handbag Icon Everywhere
- Always use `Handbag` from `lucide-react` for any shopping bag or cart icon representation.
- Example:
  ```tsx
  import { Handbag } from 'lucide-react';
  <Handbag className="w-5 h-5" />
  ```
- Do **not** use `ShoppingCart`, generic shopping bags, or raw SVGs.

### Rule 3: Header Structure & Standards
- Desktop Header contains:
  1. Serif Logo (`Shastraloka` in Georgia/Playfair serif with leaf/manuscript accent)
  2. Categories dropdown menu
  3. Pill search field (`SearchField`) with clear button and orange search button (`#F1641E`)
  4. Quick links (Gifts, Favorites/Boards count)
  5. **Highlighted Bag Button**: Pill button with `Handbag` icon, quantity badge, and explicit bold **"Bag"** text.
- Header icons must be from `lucide-react` (e.g., `Menu`, `Search`, `Heart`, `User`, `Gift`, `Sun`, `Moon`, `Handbag`, `X`).

### Rule 4: Product Detail Page Scrolling
- The product detail page ([`src/app/books/[id]/page.tsx`](src/app/books/[id]/page.tsx)) uses **natural single-page grid scrolling** (`items-start`).
- Both left (cover preview) and right (metadata, pricing, binding formats) columns scroll together.
- **Do not** introduce fixed height containers (`h-screen overflow-y-auto`) that trap scroll on one side.

### Rule 5: UI Components & Gestalt Policy
- **NO external npm dependency on `gestalt` or `gestalt-design-tokens`.** They are removed from `package.json`.
- **Primary UI Components:** Handcrafted, accessible Tailwind components exist in [`src/components/ui/`](src/components/ui/):
  - `Button`, `IconButton`, `SearchField`, `Badge`, `Card`, `Modal`, `Toast`, `Dropdown`, `Accordion`, `Box`.
- **Extended Gestalt Library:** The full suite of ~90 Gestalt components is stored locally in [`src/components/ui/gestalt/`](src/components/ui/gestalt/) and wrapped in [`src/components/ui/`](src/components/ui/).
  - If you need `Tabs`, `Spinner`, `Avatar`, `Tooltip`, `Masonry`, `Table`, `SideNavigation`, etc., import directly:
    ```tsx
    import { Tabs, Spinner, Avatar, Tooltip } from '@/components/ui';
    ```

---

## 3. Directory Layout

```text
shastraloka/
├── src/
│   ├── app/                      # Next.js App Router routes
│   │   ├── layout.tsx            # Root layout with fonts, Providers, globals.css
│   │   ├── page.tsx              # Homepage (Hero, Explore Feed, Editorial, Masonry)
│   │   ├── globals.css           # Design tokens, theme variables & Tailwind
│   │   ├── gestalt.css           # Local Gestalt styling bundle
│   │   ├── books/[id]/page.tsx   # Product Detail Page (Dual-column classical layout)
│   │   ├── checkout/page.tsx     # Multi-step checkout (District courier, payment, summary)
│   │   ├── orders/page.tsx       # Orders history
│   │   ├── orders/[id]/page.tsx  # Order tracking & courier delivery timeline
│   │   ├── profile/page.tsx      # User profile, saved collections
│   │   ├── profile/boards/[id]/  # Dedicated board reading list view
│   │   └── search/page.tsx       # Live search & category filtering results
│   ├── components/               # App Domain Components
│   │   ├── Header.tsx            # Universal top navigation & mobile menu
│   │   ├── Footer.tsx            # Universal footer with newsletter & heritage badges
│   │   ├── BagDrawer.tsx         # Slide-out Shopping Bag drawer with coupon & delivery progress
│   │   ├── CartDrawer.tsx        # Re-exports BagDrawer for compatibility
│   │   ├── BookCard.tsx          # Masonry book item with hover save & "+ Add to Bag"
│   │   ├── BookModal.tsx         # Quick view modal with audio chanting & reviews
│   │   ├── BoardsModal.tsx       # Save book to Pinterest-style Board dialog
│   │   ├── Icons.tsx             # Shared icons (IconBag, IconHandbag use Lucide Handbag)
│   │   ├── Providers.tsx         # AppProvider, BookModal, BagDrawer, Toast wrapper
│   │   └── ui/                   # Reusable UI Primitives
│   │       ├── Button.tsx        # Tailored Button (primary, orange, outline, danger)
│   │       ├── SearchField.tsx   # Rounded search field with clear & submit buttons
│   │       ├── BagDrawer.tsx     # Shopping bag drawer
│   │       ├── index.ts          # Barrel export for all UI components
│   │       └── gestalt/          # Local standalone Gestalt component library
│   ├── context/
│   │   └── AppContext.tsx        # Global store: Bag, Boards, Likes, Orders, Theme, Toast
│   └── data/
│       └── books.ts              # Books catalog (Mahavamsa, Chulavamsa, Kavya, Ayurveda)
├── package.json                  # Dependencies (Next.js, React, Tailwind, Lucide, classnames)
├── tsconfig.json                 # Path aliases (@/*, @/gestalt/*, gestalt)
└── AGENTS.md                     # This agent architecture guide
```

---

## 4. Development & Build Verification

Always run this command before reporting any task as completed:

```bash
pnpm build
```
- **Must pass with Exit Code 0.**
- Generates 11 static and partially prerendered routes.
- TypeScript check must report 0 errors.

---

## 5. Changelog of Structural Decisions

| Date | Change Summary | Context / Rationale |
|---|---|---|
| **2026-10-28** | Replaced all "Cart" references with "Bag" | User branding decision. State updated to `bag`, `bagCount`, `bagTotal`, `addToBag`, `BagDrawer`. |
| **2026-10-28** | Standardized all bag icons to `Handbag` (`lucide-react`) | User required Pinterest-style Handbag icon everywhere. Replaced `ShoppingCart`/`ShoppingBag`. |
| **2026-10-28** | Replaced all Header icons with `lucide-react` | Standardized header icon styling across mobile and desktop. |
| **2026-10-28** | Fixed Product Detail Page dual-scroll bug | Removed separate scroll locking so both columns scroll smoothly together in `items-start` grid. |
| **2026-10-28** | Removed npm `gestalt` & bundled UI locally | Avoided heavy external package locks while preserving all 99 Gestalt components locally in `src/components/ui/gestalt/`. |
