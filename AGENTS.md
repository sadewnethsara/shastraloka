# Shastraloka (ශාස්ත්‍රලෝක) — Architectural & Agent Guide

> **For AI Coding Agents:** Read this file first before making changes. It defines the architectural standards, established conventions, design rules, and file layout.

---

## 1. Project Overview & Tech Stack
- **Framework:** Next.js 16.4+ (App Router, Turbopack, React 19)
- **Styling:** Tailwind CSS v4, CSS Custom Properties (`src/app/globals.css`, `src/app/gestalt.css`)
- **Typography:** Professional Display (Outfit `--font-heading` for titles, headers, brand logo) + Sans (Plus Jakarta Sans `--font-sans` for UI body, badges, labels)
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
  1. Brand Logo (`Shastraloka` in bold Outfit display typography with leaf/manuscript accent)
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

### Rule 7: Strict English UI & Modern Professional Pinterest Typography (No Serif, No Sinhala Script in UI)
- **Visual Aesthetic:** Strictly follow high-end Pinterest design aesthetics with clean modern typography. Headings, titles, brand logo, and modals use modern geometric display font **Outfit** (`--font-heading`, `font-heading`). UI body, labels, badges, and controls use **Plus Jakarta Sans** (`--font-sans`, `font-sans`). Traditional serif fonts (`Playfair Display`, `Georgia`, `font-serif`) are strictly eliminated in favor of clean, professional, high-end design.
- **No Sinhala Script in User-Facing UI:** All user-facing UI labels, modal headers, card subtitles, badges, search autocomplete entries, and navigation text must be rendered strictly in English. Never display Sinhala script text in visible UI components (e.g. `VisualSearchModal`, `Header`, `BookCard`, `HeroBanner`, `BookModal`, `Footer`, etc.).
- *(Note: Dual-domain SEO indexing for `https://ශාස්ත්රාලෝක.ලංකා` and catalog data fields such as `book.sinhalaTitle` remain in metadata, sitemaps, and search engines for domain resolution and SEO, but MUST NOT be rendered directly on user-facing UI elements).*

### Rule 8: Universal Page Container Standard (`page-container` / `PageContainer`)
- **Consistent Layout Across All Routes:** Every page in `src/app/` must use the universal responsive layout container matching the landing page:
  `max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 w-full`
- **Standard Implementation:**
  - Use the CSS utility class `.page-container` (defined in `src/app/globals.css`) on the page `<main className="page-container ...">` or wrapper.
  - Or import and use `<PageContainer>` from [`src/components/ui/PageContainer.tsx`](src/components/ui/PageContainer.tsx) / `@/components/PageContainer`.
  - **Never hardcode arbitrary widths** (e.g. `max-w-[1140px]`, `max-w-[1200px]`, `max-w-[1720px]`, or non-standard `px-3.5`) on top-level page containers that cause horizontal jumping between routes. Any future modification to horizontal padding or maximum width must be made in `src/app/globals.css` (`.page-container`) and [`src/components/ui/PageContainer.tsx`](src/components/ui/PageContainer.tsx) so that all pages update simultaneously.

### Rule 9: Theme Architecture & Zero Hardcoded Colors Policy
- **All Theme Colors Must Reside in CSS Theme Files:**
  - Every theme token is defined in [`src/styles/themes/`](src/styles/themes/):
    - [`src/styles/themes/light.css`](src/styles/themes/light.css) (`:root`, `[data-theme="light"]`, `.light`)
    - [`src/styles/themes/dark.css`](src/styles/themes/dark.css) (`[data-theme="dark"]`, `.dark`)
    - [`src/styles/themes/sepia.css`](src/styles/themes/sepia.css) (`[data-theme="sepia"]`, `.theme-sepia`)
    - [`src/styles/themes/emerald.css`](src/styles/themes/emerald.css) (`[data-theme="emerald"]`, `.theme-emerald`)
  - Imported and bound to Tailwind v4 in [`src/app/globals.css`](src/app/globals.css) with `@custom-variant dark (&:where(.dark, .dark *, [data-theme="dark"], [data-theme="dark"] *));` so `dark:` classes strictly obey the app's active theme rather than OS media queries.
- **Zero Hardcoded Page/Section Colors:**
  - **NEVER** hardcode light-only (`bg-white`, `bg-[#FAF8F5]`, `text-[#222222]`) or dark-only (`bg-[#23382C]`, `bg-[#121215]`, `bg-neutral-900 text-white`) hex colors on pages, banners, headers, footers, modals, or cards.
  - **ALWAYS** use semantic CSS variables.

### Rule 10: Clean Bookstore Catalog Grid vs. Pinterest Search Body
- **Curated Collection Pages (`/bestsellers`, `/new-releases`, `/gifts`, `/categories`, `/archives`, `/authors`, `/wishlist`, `/publishers/[id]`) Must Use `CleanBookCard`:**
  - Do **NOT** use Pinterest-style staggered masonry on collection/catalog pages.
  - Always use [`src/components/CleanBookCard.tsx`](src/components/CleanBookCard.tsx) inside a uniform grid (`grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5`).

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
│   │   ├── books/page.tsx        # Amazon Books-inspired Storefront (shelves, format pills, Daily Deals)
│   │   ├── bestsellers/page.tsx  # Clean Best Sellers catalog grid
│   │   ├── new-releases/page.tsx # Clean New Arrivals & Releases catalog grid
│   │   ├── gifts/page.tsx        # Best Gift Guides hub (15 circular guides, personalized editions)
│   │   ├── gift-cards/page.tsx   # Digital & Printable LKR Gift Cards builder + redeem drawer
│   │   ├── offers/page.tsx       # Special Offers & Festival Vouchers hub + Popular Gifts grid
│   │   ├── categories/page.tsx   # Clean Category browser grid
│   │   ├── categories/[slug]/    # Dynamic Category catalog grid
│   │   ├── archives/page.tsx     # Archival & Vintage Finds (5 square era cards, filters, related searches)
│   │   ├── authors/page.tsx      # Clean Authors & Scholars grid
│   │   ├── authors/[id]/         # Dedicated Author profile & CleanBookCard catalog
│   │   ├── wishlist/page.tsx     # Guest Favorites empty state & Populated Scholar Favorites collection
│   │   ├── login/page.tsx        # Sign In card with Shastraloka emblem & social login
│   │   ├── register/page.tsx     # Create Account card with Shastraloka emblem
│   │   ├── forgot-password/      # Password recovery card
│   │   ├── privacy/page.tsx      # Our House Rules / Global & Sri Lanka Privacy Policy
│   │   ├── terms/page.tsx        # Our House Rules / Terms of Use
│   │   ├── shipping-returns/     # Our House Rules / Islandwide Shipping & Returns Policy
│   │   ├── help/page.tsx         # Our House Rules / Help Center & Policy Search
│   │   ├── contact/page.tsx      # Flagship Scriptorium locations & Curator inquiry form
│   │   ├── about/page.tsx        # Shastraloka Heritage Inc. mission & preservation stats
│   │   ├── track-order/page.tsx  # Live islandwide courier order tracking lookup
│   │   ├── books/[id]/page.tsx   # Product Detail Page (Dual-column classical layout)
│   │   ├── checkout/page.tsx     # Multi-step checkout (District courier, payment, summary)
│   │   ├── checkout/success/     # Order confirmation receipt & dispatch summary
│   │   ├── orders/page.tsx       # Orders history
│   │   ├── orders/[id]/page.tsx  # Order tracking & courier delivery timeline
│   │   ├── profile/page.tsx      # User profile, saved collections
│   │   ├── profile/settings/     # Sanctuary theme, courier address & privacy settings
│   │   ├── profile/boards/[id]/  # Dedicated board reading list view
│   │   ├── publishers/page.tsx   # Publishers & Press Houses directory
│   │   ├── publishers/[id]/      # Dedicated Publisher catalog & profile
│   │   ├── scholars/grants/      # Palm-leaf digitization & translation grants portal
│   │   ├── scholars/submit-manuscript/ # Scholarly manuscript submission portal
│   │   └── search/page.tsx       # Pinterest + Amazon visual search & filter discovery body
│   ├── styles/
│   │   └── themes/               # Centralized CSS Theme Token Files
│   │       ├── light.css         # Light theme variables (Warm Parchment / Clean Ivory)
│   │       ├── dark.css          # Dark theme variables (Obsidian / Midnight Archive)
│   │       ├── sepia.css         # Sepia theme variables (Palm-Leaf Ola Manuscript)
│   │       └── emerald.css       # Emerald theme variables (Ceylon Sanctuary)
│   ├── components/               # App Domain Components
│   │   ├── Header.tsx            # Universal top navigation, 2-col Categories Mega-Menu & live autocomplete
│   │   ├── Footer.tsx            # Universal footer with SEO directory & dual domains
│   │   ├── AuthModal.tsx         # Sign In, Create Account & Forgot Password (Desktop Dialog + Mobile Bottom Sheet)
│   │   ├── HouseRulesLayout.tsx  # Shared Our House Rules legal/policy layout & policy search bar
│   │   ├── CleanBookCard.tsx     # Clean non-Pinterest bookstore card (hover Add on desktop, visible Add on mobile)
│   │   ├── BookCard.tsx          # Masonry book item for /search visual discovery
│   │   ├── BookModal.tsx         # Quick view modal with audio chanting & reviews
│   │   ├── BoardsModal.tsx       # Save book to Pinterest-style Board dialog
│   │   ├── Icons.tsx             # Shared icons (IconBag, IconHandbag use Lucide Handbag)
│   │   ├── Providers.tsx         # AppProvider, BookModal, BoardsModal, AuthModal, Toast wrapper
│   │   └── ui/                   # Reusable UI Primitives
│   ├── context/
│   │   └── AppContext.tsx        # Global store: Bag, Boards, Likes, Orders, Theme, AuthModal, Toast
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
| **2026-10-28** | Built `CleanBookCard` & clean non-Pinterest UI for catalog pages | Created uniform 3:4 bookstore grids with minimal details, desktop hover "Add to Bag", and mobile always-visible "Add to Bag" button across `/bestsellers`, `/new-releases`, `/gifts`, `/categories`, `/archives`, `/authors`, `/wishlist`, `/publishers/[id]`, and homepage sections. |
| **2026-10-28** | Removed Sinhala text from App UI & Standardized Pinterest/Etsy fonts | Enforced English Pinterest + Etsy aesthetic across all components & removed Sinhala script from UI. |
| **2026-10-28** | Standardized Universal PageContainer across all routes | Applied `page-container` and `PageContainer` (1440px + px-4 sm:px-6 lg:px-8) across all app routes. |
| **2026-10-28** | Eliminated `font-serif` & Replaced with Professional `Outfit` | Removed traditional serif (Playfair/Georgia) across all components; introduced modern `Outfit` (`--font-heading`, `font-heading`) paired with `Plus Jakarta Sans`. |
| **2026-10-29** | Upgraded all empty/stub pages & Header Mega-Menu to match 12 reference bookstore & marketplace UIs | Built 2-col visual Categories Mega-Menu (`Header.tsx`), Amazon Books Storefront (`/books`), Best Gift Guides Hub (`/gifts`), LKR Gift Cards Builder (`/gift-cards`), Special Offers & Vouchers (`/offers`), Archival & Vintage Finds (`/archives`), Guest & Collection Favorites (`/wishlist`), Our House Rules Legal & Help pages (`HouseRulesLayout.tsx`, `/privacy`, `/terms`, `/shipping-returns`, `/help`), and all dynamic/scholar pages (`/contact`, `/about`, `/track-order`, `/checkout/success`, `/categories/[slug]`, `/authors/[id]`, `/profile/settings`, `/scholars/*`). |
| **2026-10-29** | Built `AuthModal.tsx` (Desktop Dialog + Mobile Bottom Sheet) & unified `<Header isSticky />` across all pages | Implemented Login, Register, and Forgot Password as an overlay dialog with outside top-right circular `(X)` close button and 3 horizontal pill social buttons on desktop, and a slide-up bottom sheet on mobile; replaced the static inline header on `/bag` and added `<Header isSticky />` to all new pages so `<SearchBar />` and the Categories Mega-Menu open everywhere. |
