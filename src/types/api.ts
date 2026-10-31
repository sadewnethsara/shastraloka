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
  price: number; // LKR
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

export interface CreateOrderPayload {
  customerName: string;
  customerEmail: string;
  customerPhone: string; // e.g. 0771234567 or 94771234567 (Text.lk SMS + automatic user account creation)
  whatsappNumber?: string; // Used for WhatsApp order confirmation
  shippingAddress: string;
  city: string;
  postalCode?: string;
  paymentMethod: PaymentMethod;
  paymentSlipUrl?: string; // Required if paymentMethod === 'BANK_TRANSFER' (Uploaded to R2)
  notes?: string;
  items: {
    bookId: string;
    quantity: number;
  }[];
}

export interface OrderResponse {
  order: {
    id: string;
    orderNumber: string; // e.g., SH-2026-0001
    totalAmount: number;
    paymentMethod: PaymentMethod;
    orderStatus: OrderStatus;
    createdAt: string;
    customerPhone?: string;
  };
  notifications: {
    emailQueued: boolean; // Resend
    smsQueued: boolean;   // Text.lk
    whatsappRedirectUrl: string; // Click-to-chat wa.me URL with pre-filled order summary
  };
  userAccountCreated?: boolean; // Indicates if an account was automatically provisioned via phone
}

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  phone?: string;
  role: "customer" | "admin" | "curator";
  avatarUrl?: string;
  createdAt: string;
}

export interface PresignedUploadResponse {
  uploadUrl: string; // Signed PUT URL to Cloudflare R2
  publicUrl: string; // Public HTTPS URL to view/download file from R2
  key: string;
  expiresInSeconds: number;
}
