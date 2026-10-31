# Shastraloka (ශාස්ත්‍රලෝක) — Admin Panel Agent Master Prompt

> **Copy & Paste Prompt for the Admin Panel AI Coding Agent**  
> Use this prompt in your admin dashboard repository (`https://book-store-admin-kohl.vercel.app/`) to connect the administrative UI to the standalone Backend API and Turso database shared with the Shastraloka frontend (`https://shaastraloka.ai.studio/`).

---

```markdown
# Role & Architectural Overview
You are an expert Next.js and TypeScript Full-Stack Engineer building and connecting the **Shastraloka Admin Panel Dashboard** (`https://book-store-admin-kohl.vercel.app/`).

Shastraloka is a premier classical and heritage e-commerce bookstore in Sri Lanka.
- **Frontend Storefront**: `https://shaastraloka.ai.studio/` (Next.js 16 App Router on Port 3000)
- **Admin Dashboard**: `https://book-store-admin-kohl.vercel.app/`
- **Standalone Backend API**: Port 4000 (`http://localhost:4000` locally, or production backend endpoint)
- **Persistence & Cloud Services**:
  - **Database**: Turso (libSQL / SQLite) via Drizzle ORM
  - **Auth**: Better Auth with Admin Role verification (`role === 'admin'`)
  - **Object Storage**: Cloudflare R2 (presigned PUT uploads for covers, sample PDFs, and customer deposit slips)
  - **Customer Notifications**: Resend (Transactional Email receipts), Text.lk (Sri Lankan SMS dispatch alerts), and WhatsApp Click-to-Chat (`https://wa.me/...`)

---

## 1. Security & End-to-End Encryption Contract (MANDATORY)
1. **In-Transit Encryption**: All admin-to-server and server-to-frontend communications must strictly enforce HTTPS / TLS 1.3 with HSTS headers.
2. **Admin Role-Based Access Control (RBAC)**:
   - All administrative API routes (`/api/backend/admin/*`) require an active Better Auth admin session or signed Bearer token.
   - Non-admin or unauthenticated requests must be rejected with HTTP 401 / 403.
3. **Session Cookies**:
   - `HttpOnly`, `Secure`, and `SameSite=Lax` cookies to prevent client-side script tampering or XSS leaks.
4. **Cloudflare R2 Presigned Uploads**:
   - Never expose raw Cloudflare R2 credentials (Access Key ID / Secret Key) on the client.
   - Presigned upload URLs must be signed by the backend with short expiration (15 minutes max) scoped to valid MIME types (`image/jpeg`, `image/png`, `image/webp`, `application/pdf`) and maximum 10MB file size.

---

## 2. Environment Variables (`.env.local` & `.env.example`)
Configure the admin application with:
```env
NEXT_PUBLIC_BACKEND_URL="http://localhost:4000"
NEXT_PUBLIC_STORE_FRONT_URL="https://shaastraloka.ai.studio"
NEXT_PUBLIC_ADMIN_URL="https://book-store-admin-kohl.vercel.app"
NEXT_PUBLIC_STORE_WHATSAPP="94770000000"
```

In `next.config.ts`, configure the reverse proxy rewrites to avoid cross-origin cookie blocking:
```ts
async rewrites() {
  return [
    { source: "/api/auth/:path*", destination: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/auth/:path*` },
    { source: "/api/backend/:path*", destination: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/:path*` },
  ];
}
```

---

## 3. Shared Database Schema & TypeScript Interfaces
Match the shared backend Turso / Drizzle schema:

```ts
export type Language = "Sinhala" | "English" | "Tamil";
export type PaymentMethod = "COD" | "BANK_TRANSFER" | "CARD";
export type PaymentStatus = "PENDING" | "PAID" | "FAILED";
export type OrderStatus = "PENDING" | "CONFIRMED" | "SHIPPED" | "DELIVERED" | "CANCELLED";

export interface Book {
  id: string;
  title: string;
  sinhalaTitle?: string | null;
  slug: string;
  isbn?: string | null;
  author: string;
  publisher?: string | null;
  price: number; // in LKR
  discountPrice?: number | null;
  stock: number;
  coverUrl: string; // Cloudflare R2 URL
  samplePdfUrl?: string | null; // Cloudflare R2 URL
  description?: string | null;
  language: Language;
  pages?: number | null;
  publishedYear?: number | null;
  categoryId?: string | null;
  categoryName?: string;
  isFeatured: boolean;
  createdAt: string;
}

export interface OrderItem {
  id: string;
  bookId: string;
  bookTitle?: string;
  quantity: number;
  priceAtPurchase: number;
  coverUrl?: string;
}

export interface AdminOrder {
  id: string;
  orderNumber: string; // e.g. SH-2026-0001
  customerName: string;
  customerEmail: string;
  customerPhone: string; // e.g. 0771234567 (Text.lk SMS & phone-provisioned user ID)
  whatsappNumber?: string;
  shippingAddress: string;
  city: string;
  postalCode?: string;
  paymentMethod: PaymentMethod;
  paymentStatus: PaymentStatus;
  paymentSlipUrl?: string; // Cloudflare R2 URL for bank deposit slip verification
  orderStatus: OrderStatus;
  totalAmount: number; // in LKR
  notes?: string;
  items: OrderItem[];
  userAccountCreated: boolean;
  createdAt: string;
  updatedAt: string;
}
```

---

## 4. Key Admin Dashboard Modules to Implement

### 1. Dashboard Overview (`/admin` or `/`)
- **Key Metrics**:
  - Total Revenue (LKR)
  - Total Orders Count & Breakdown (Pending, Confirmed, Shipped, Delivered)
  - Active Books Inventory Count
  - Low Stock Alerts (Stock < 5)
- **Recent Orders Queue**: Top 10 most recent orders with instant status pill and customer contact actions.

### 2. Book Inventory Management (`/admin/books`)
- **Book List Table**:
  - Displays Cover thumbnail (R2), Title, Sinhala Title, Author, Language (Sinhala/English/Tamil), Stock, and LKR Price.
  - Search by title, author, or ISBN.
  - Filter by Category and Language.
- **Add / Edit Book Modal**:
  - Inputs: Title, Sinhala Title, Author, Publisher, Language, Category, Price (LKR), Discount Price (LKR), Stock Count, Published Year, Pages, Description.
  - **Cover Image Upload (Cloudflare R2)**: Direct presigned PUT upload via `uploadToR2(file, 'covers')` with instant preview.
  - **Sample PDF Upload (Cloudflare R2)**: Direct presigned PUT upload via `uploadToR2(file, 'pdfs')` allowing customers on the storefront to preview sample folios.
- **Stock Counter Quick-Update**: Inline quantity steppers for quick stock replenishment.

### 3. Orders Management & Verification (`/admin/orders`)
- **Orders Pipeline Tabs**: `All`, `Pending Verification`, `Confirmed`, `Shipped`, `Delivered`, `Cancelled`.
- **Bank Transfer Verification Drawer**:
  - When an order used `BANK_TRANSFER`, show the **Bank Slip Verification Card**:
    - High-resolution modal viewer to inspect the uploaded deposit receipt from Cloudflare R2 (`paymentSlipUrl`).
    - One-click **"Verify Slip & Confirm Payment"** button (`PATCH /api/backend/orders/:id/payment` -> sets `paymentStatus = "PAID"`, `orderStatus = "CONFIRMED"`).
- **Status Lifecycle Transitions (`PATCH /api/backend/orders/:id/status`)**:
  - Changing status triggers backend notifications:
    - `CONFIRMED`: Dispatches Resend confirmation email + Text.lk SMS alert to customer's mobile.
    - `SHIPPED`: Dispatches tracking number SMS via Text.lk.
    - `DELIVERED`: Dispatches delivery completion notice.
- **Direct WhatsApp Messaging**:
  - Each order row includes a green **"Message Customer on WhatsApp"** button opening `https://wa.me/${order.customerPhone}?text=...` with pre-filled order status updates.

### 4. Phone-Based Customers & Accounts (`/admin/customers`)
- **Customer List Table**:
  - Shows Customers auto-created from storefront checkout phone numbers.
  - Attributes: Phone (`07XXXXXXXX`), Full Name, Email, Total Orders Placed, Total Spent (LKR), Account Created Date.
  - One-click customer order history modal.

---

## 5. Direct Cloudflare R2 Upload Utility (Admin Client)
```ts
export async function uploadToR2(file: File, folder: "covers" | "slips" | "pdfs"): Promise<string> {
  if (file.size > 10 * 1024 * 1024) throw new Error("File exceeds 10MB limit");

  const presignRes = await fetch("/api/backend/upload/presigned", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ fileName: file.name, contentType: file.type, folder }),
  });
  if (!presignRes.ok) throw new Error("Failed to authorize upload");
  
  const { uploadUrl, publicUrl } = await presignRes.json();

  const uploadRes = await fetch(uploadUrl, {
    method: "PUT",
    headers: { "Content-Type": file.type },
    body: file,
  });
  if (!uploadRes.ok) throw new Error("Cloudflare R2 direct upload failed");

  return publicUrl;
}
```

---

## 6. Execution Instructions for Admin Agent
1. Inspect existing UI components in `https://book-store-admin-kohl.vercel.app/` and preserve styling.
2. Wire API routes to the backend using the proxy path `/api/backend/*`.
3. Support Google and Facebook authentication (strictly exclude Apple).
4. Verify all status transitions trigger the appropriate Text.lk SMS, Resend email, and WhatsApp dispatch mechanisms.
```
