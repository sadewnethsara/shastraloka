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

### Rule 6: SEO, Dual-Domain (`shastraloka.lk` & `ශාස්ත්රාලෝක.ලංකා`) & AI Discoverability Standards
- **Official Brand Names:** Always include both **"Shastraloka"** and **"ශාස්ත්රාලෝක"** (alongside **"ශාස්ත්‍රලෝක"**) in SEO metadata, titles, JSON-LD, and footer branding.
- **Official Domains:** Always maintain dual-domain support for **`https://shastraloka.lk`** and **`https://ශාස්ත්රාලෝක.ලංකා`** (Punycode: `xn--j1b1a4b2a9d2a.xn--fzc2c9e2c`) in `src/utils/seoConfig.ts`, `src/app/layout.tsx`, `src/app/sitemap.ts`, `src/app/robots.ts`, and `public/llms.txt`.
- **Social Sharing & Structured Data:** Never remove the OpenGraph (`og:*`), Twitter (`twitter:*`), WhatsApp metadata, or Schema.org `@graph` JSON-LD (`BookStore`, `WebSite` with `SearchAction`, `ItemList`/`Book`/`Offer` in `LKR`, and `FAQPage`).
- **New Books & Routes:** Whenever new books or routes are added to `src/data/books.ts`, ensure they include `price` (LKR), `originalPrice` (LKR), `sinhalaTitle`, and `tags` so `sitemap.ts`, `searchEngine.ts`, and `seoConfig.ts` automatically index them with LKR price & offer percentage badges.
- **External SEO Documentation:** Keep [`guide.md`](guide.md) in the root directory updated when SEO routes or schemas change.

### Rule 7: Theme Architecture & Zero Hardcoded Colors Policy
- **All Theme Colors Must Reside in CSS Theme Files:**
  - Every theme token is defined in [`src/styles/themes/`](src/styles/themes/):
    - [`src/styles/themes/light.css`](src/styles/themes/light.css) (`:root`, `[data-theme="light"]`, `.light`)
    - [`src/styles/themes/dark.css`](src/styles/themes/dark.css) (`[data-theme="dark"]`, `.dark`)
    - [`src/styles/themes/sepia.css`](src/styles/themes/sepia.css) (`[data-theme="sepia"]`, `.theme-sepia`)
    - [`src/styles/themes/emerald.css`](src/styles/themes/emerald.css) (`[data-theme="emerald"]`, `.theme-emerald`)
  - Imported and bound to Tailwind v4 in [`src/app/globals.css`](src/app/globals.css) with `@custom-variant dark (&:where(.dark, .dark *, [data-theme="dark"], [data-theme="dark"] *));` so `dark:` classes strictly obey the app's active theme rather than OS media queries.
- **Zero Hardcoded Page/Section Colors:**
  - **NEVER** hardcode light-only (`bg-white`, `bg-[#FAF8F5]`, `text-[#222222]`) or dark-only (`bg-[#23382C]`, `bg-[#121215]`, `bg-neutral-900 text-white`) hex colors on pages, banners, headers, footers, modals, or cards.
  - **ALWAYS** use semantic CSS variables:
    - Backgrounds: `bg-[var(--bg-main)]`, `bg-[var(--bg-surface)]`, `bg-[var(--bg-wash)]`, `bg-[var(--bg-card)]`, `bg-[var(--bg-input)]`, `bg-[var(--bg-hover)]`, `bg-[var(--footer-bg)]`
    - Text: `text-[var(--text-main)]`, `text-[var(--text-body)]`, `text-[var(--text-muted)]`, `text-[var(--text-dim)]`
    - Borders: `border-[var(--border-subtle)]`, `border-[var(--border-strong)]`
    - Interactive Pills & Primary Actions: `bg-[var(--pill-active-bg)] text-[var(--pill-active-text)]`, `bg-[var(--pill-bg)]`
    - Editorial / Guild / Scriptorium Banners: `bg-[var(--banner-guild-bg)]`, `bg-[var(--banner-guild-surface)]`, `border-[var(--banner-guild-border)]`, `text-[var(--banner-guild-text)]`, `text-[var(--banner-guild-muted)]`, `text-[var(--banner-guild-accent)]`, `bg-[var(--hero-banner-bg)]`

### Rule 8: Clean Bookstore Catalog Grid vs. Pinterest Search Body
- **Curated Collection Pages (`/bestsellers`, `/new-releases`, `/gifts`, `/categories`, `/archives`, `/authors`, `/wishlist`, `/publishers/[id]`) Must Use `CleanBookCard`:**
  - Do **NOT** use Pinterest-style staggered masonry (`book-masonry` or `BookCard` with board-picker dropdowns and Save pills) on collection/catalog pages.
  - Always use [`src/components/CleanBookCard.tsx`](src/components/CleanBookCard.tsx) inside a uniform grid (`grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5`):
    - Uniform `aspect-[3/4]` cover frame.
    - Minimal details below cover: 1-line title, 1-line author, and LKR price.
    - **Desktop (`md:flex`)**: `"Add to Bag"` button with `Handbag` icon appears smoothly on hover (`group-hover`).
    - **Mobile (`md:hidden`)**: Compact `"Add to Bag"` button is always visible below the price for single-tap addition.
- **Pinterest Visual Discovery Body (`/search`)**:
  - Reserved specifically for `/search` where users visually explore closest matches and related suggestions.

---

## 3. Directory Layout

```text
shastraloka/
├── src/
│   ├── app/                      # Next.js App Router routes
│   │   ├── layout.tsx            # Root layout with fonts, SEO metadata, JSON-LD, Providers
│   │   ├── page.tsx              # Homepage (Hero, Best Sellers, New Releases, Curations)
│   │   ├── robots.ts             # Dynamic robots.txt for search engines & AI crawlers
│   │   ├── sitemap.ts            # Dynamic sitemap.xml for all routes, books & categories
│   │   ├── globals.css           # Design tokens, @custom-variant dark & theme CSS imports
│   │   ├── gestalt.css           # Local Gestalt styling bundle
│   │   ├── bag/page.tsx          # Dedicated Shopping Bag page
│   │   ├── bestsellers/page.tsx  # Clean Best Sellers catalog grid
│   │   ├── new-releases/page.tsx # Clean New Arrivals & Releases catalog grid
│   │   ├── gifts/page.tsx        # Clean Collector Editions & Gifts catalog grid
│   │   ├── categories/page.tsx   # Clean Category browser grid
│   │   ├── archives/page.tsx     # Clean Historical Archives grid
│   │   ├── authors/page.tsx      # Clean Authors & Scholars grid
│   │   ├── wishlist/page.tsx     # Clean Saved Reading List grid
│   │   ├── books/[id]/page.tsx   # Product Detail Page (Dual-column classical layout)
│   │   ├── checkout/page.tsx     # Multi-step checkout (District courier, payment, summary)
│   │   ├── orders/page.tsx       # Orders history
│   │   ├── orders/[id]/page.tsx  # Order tracking & courier delivery timeline
│   │   ├── profile/page.tsx      # User profile, saved collections
│   │   ├── profile/boards/[id]/  # Dedicated board reading list view
│   │   ├── publishers/page.tsx   # Publishers & Press Houses directory
│   │   ├── publishers/[id]/      # Dedicated Publisher catalog & profile
│   │   └── search/page.tsx       # Pinterest + Amazon visual search & filter discovery body
│   ├── styles/
│   │   └── themes/               # Centralized CSS Theme Token Files
│   │       ├── light.css         # Light theme variables (Warm Parchment / Clean Ivory)
│   │       ├── dark.css          # Dark theme variables (Obsidian / Midnight Archive)
│   │       ├── sepia.css         # Sepia theme variables (Palm-Leaf Ola Manuscript)
│   │       └── emerald.css       # Emerald theme variables (Ceylon Sanctuary)
│   ├── components/               # App Domain Components
│   │   ├── Header.tsx            # Universal top navigation & live search autocomplete
│   │   ├── Footer.tsx            # Universal footer with SEO directory & dual domains
│   │   ├── CleanBookCard.tsx     # Clean non-Pinterest bookstore card (hover Add on desktop, visible Add on mobile)
│   │   ├── BookCard.tsx          # Masonry book item for /search visual discovery
│   │   ├── BookModal.tsx         # Quick view modal with audio chanting & reviews
│   │   ├── BoardsModal.tsx       # Save book to Pinterest-style Board dialog
│   │   ├── Icons.tsx             # Shared icons (IconBag, IconHandbag use Lucide Handbag)
│   │   ├── Providers.tsx         # AppProvider, BookModal, BagDrawer, Toast wrapper
│   │   └── ui/                   # Reusable UI Primitives
│   ├── context/
│   │   └── AppContext.tsx        # Global store: Bag, Boards, Likes, Orders, Theme, Toast
│   ├── data/
│   │   └── books.ts              # Books catalog (Gajaga, Mahavamsa, Chulavamsa, Kavya, Ayurveda)
│   └── utils/
│       ├── searchEngine.ts       # Fuzzy book matching, autocomplete & LKR discount engine
│       └── seoConfig.ts          # Dual-domain SEO config, competitive keywords & JSON-LD graph
├── public/
│   └── llms.txt                  # AI & LLM search engine index (ChatGPT, Gemini, Claude, Perplexity)
├── guide.md                      # External SEO, Google Search Console & Bing Webmaster Guide
└── AGENTS.md                     # This agent architecture guide
```

---

## 4. Development & Build Verification

Always run this command before reporting any task as completed:

```bash
pnpm build
```
- **Must pass with Exit Code 0.**
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
| **2026-10-28** | Added Pinterest search body, live autocomplete & LKR offer % tags | Implemented `src/utils/searchEngine.ts` and rebuilt `/search` with closest-book-first ranking and suggested books. |
| **2026-10-28** | Added full SEO, Dual Domains (`shastraloka.lk` & `ශාස්ත්රාලෝක.ලංකා`), `llms.txt` & `guide.md` | Configured Schema.org `@graph`, `sitemap.ts`, `robots.ts`, competitive bookstore SEO keywords, and external Search Console guide. |
| **2026-10-28** | Centralized all themes into `src/styles/themes/*.css` & removed hardcoded dark/light colors | Added `@custom-variant dark`, semantic `--banner-guild-*`, `--footer-bg`, `--hero-banner-bg` tokens across Light, Dark, Sepia, and Emerald themes, and fixed dark-only hardcoded sections on `/publishers`, `/books/[id]`, `/checkout`, `/bag`, and `/profile`. |
| **2026-10-28** | Built `CleanBookCard` & clean non-Pinterest UI for Best Sellers, New Releases & Collection pages | Created uniform 3:4 bookstore grids with minimal details, desktop hover "Add to Bag", and mobile always-visible "Add to Bag" button across `/bestsellers`, `/new-releases`, `/gifts`, `/categories`, `/archives`, `/authors`, `/wishlist`, `/publishers/[id]`, and homepage sections. |
