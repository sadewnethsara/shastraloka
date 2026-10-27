# Shastraloka (ශාස්ත්‍රලෝක) — Classical Sri Lankan Bookstore

A boutique e-commerce platform dedicated to preserving and collecting rare Sri Lankan historical chronicles, Theravada Buddhist treatises, classical Sinhala Kavya poetry, and indigenous Ayurvedic palm-leaf manuscripts.

---

## Quick Start

```bash
# Install dependencies
pnpm install

# Start local development server
pnpm dev

# Build for production (TypeScript check & static generation)
pnpm build
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## AI Agent & Developer Guide

> **Important for AI Coding Assistants:**  
> Please read [**`AGENTS.md`**](./AGENTS.md) before making structural, architectural, or component changes. It defines the mandatory rules (e.g. Bag terminology, Handbag icon usage, UI component policies, and scrolling conventions).

---

## Architecture & Features

- **Framework:** Next.js 16 (App Router, Turbopack, React 19)
- **Styling:** Tailwind CSS v4, custom CSS variables, and classical Sri Lankan typography
- **Icons:** `lucide-react`
- **Catalog:** Curated Sri Lankan classics (Mahavamsa, Chulavamsa, Visuddhimagga, Selalihini Sandeshaya, etc.) with real photography, audio chanting samples, and archival binding options.
- **Shopping Bag:** Slide-out drawer with free delivery progress and discount coupon application.
- **Reading Boards:** Pinterest-style collections to curate and save treatises.
- **Courier Checkout:** Multi-step island-wide delivery with district-specific rates (Colombo, Kandy, Galle, Jaffna, etc.) and Cash on Delivery (COD) / Card options.
- **Component System:** Standalone Tailwind primitives in `src/components/ui/` with the complete local Gestalt component suite in `src/components/ui/gestalt/`.
