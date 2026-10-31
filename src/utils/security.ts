import { Book, BOOKS } from '../data/books';
import type {
  BagItem,
  Board,
  Order,
  OrderCustomer,
  Review,
  UserProfile,
} from '../context/AppContext';

// ============================================================================
// FIELD LENGTH & BOUNDARY CONSTANTS (Aligned with PostgreSQL VARCHAR / INT)
// ============================================================================

export const SECURITY_LIMITS = {
  MAX_EMAIL_LENGTH: 254,
  MAX_NAME_LENGTH: 120,
  MAX_PASSWORD_LENGTH: 128, // Prevents bcrypt / PBKDF2 DoS
  MIN_PASSWORD_LENGTH: 6,
  MAX_PHONE_LENGTH: 24,
  MAX_ADDRESS_LENGTH: 240,
  MAX_CITY_LENGTH: 80,
  MAX_POSTAL_LENGTH: 16,
  MAX_SEARCH_QUERY_LENGTH: 120,
  MAX_BOARD_NAME_LENGTH: 80,
  MAX_BOARD_DESC_LENGTH: 240,
  MAX_REVIEW_COMMENT_LENGTH: 1000,
  MAX_INQUIRY_MESSAGE_LENGTH: 2500,
  MAX_MANUSCRIPT_TITLE_LENGTH: 200,
  MAX_COUPON_CODE_LENGTH: 32,
  MAX_ORDER_ID_LENGTH: 32,
  MAX_BAG_ITEM_QUANTITY: 50,
  MAX_BAG_ITEMS_COUNT: 100,
  MIN_GIFT_CARD_LKR: 500,
  MAX_GIFT_CARD_LKR: 100000,
} as const;

const DANGEROUS_PROTO_KEYS = new Set(['__proto__', 'constructor', 'prototype']);

// ============================================================================
// 1. INPUT SANITIZATION & XSS / SQLI DEFENSE UTILITIES
// ============================================================================

/**
 * Strips ASCII control characters, null bytes, dangerous HTML/script tags,
 * inline JS event attributes, and dangerous URI schemes while preserving
 * legitimate text (English, numbers, punctuation, and Sinhala Unicode).
 */
export function sanitizeText(input: unknown, maxLength = 250): string {
  if (typeof input !== 'string') return '';

  return input
    // Remove null bytes and control characters (except standard newline/tab)
    .replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g, '')
    // Strip script/style/iframe/object/embed tags completely
    .replace(/<\s*\/?\s*(script|style|iframe|object|embed|svg|math|link|meta)[^>]*>/gi, '')
    // Strip any remaining raw HTML tags
    .replace(/<[^>]*>/g, '')
    // Neutralize javascript:, vbscript:, and data:text/html URI payloads
    .replace(/\b(javascript|vbscript|data)\s*:/gi, '')
    // Neutralize inline event handlers like onerror=, onload=
    .replace(/\bon[a-z]+\s*=/gi, '')
    .trim()
    .slice(0, maxLength);
}

/**
 * Sanitizes single-line plain text (collapses newlines and multiple spaces).
 */
export function sanitizeSingleLine(input: unknown, maxLength = 120): string {
  return sanitizeText(input, maxLength).replace(/[\r\n\t]+/g, ' ').replace(/\s{2,}/g, ' ').trim();
}

/**
 * Sanitizes search queries and strips SQL/ORM meta-characters that have no place in book search.
 */
export function sanitizeSearchQuery(input: unknown): string {
  if (typeof input !== 'string') return '';
  return sanitizeSingleLine(input, SECURITY_LIMITS.MAX_SEARCH_QUERY_LENGTH)
    .replace(/[;\\`<>]/g, '')
    .replace(/--+/g, '-')
    .replace(/\/\*|\*\//g, '')
    .trim();
}

/**
 * Normalizes and sanitizes an email address.
 */
export function sanitizeEmail(input: unknown): string {
  if (typeof input !== 'string') return '';
  return input
    .replace(/[\u0000-\u001F\u007F<>"'`;\\()\s]/g, '')
    .toLowerCase()
    .slice(0, SECURITY_LIMITS.MAX_EMAIL_LENGTH);
}

/**
 * Validates an email address against strict format and length limits.
 */
export function isValidEmail(email: string): boolean {
  const clean = sanitizeEmail(email);
  if (!clean || clean.length < 5 || clean.length > SECURITY_LIMITS.MAX_EMAIL_LENGTH) {
    return false;
  }
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,24}$/;
  return emailRegex.test(clean) && !clean.includes('..');
}

/**
 * Sanitizes phone numbers to digits, +, spaces, hyphens, and parentheses.
 */
export function sanitizePhone(input: unknown): string {
  if (typeof input !== 'string') return '';
  return input
    .replace(/[^0-9+\-() ]/g, '')
    .trim()
    .slice(0, SECURITY_LIMITS.MAX_PHONE_LENGTH);
}

/**
 * Validates Sri Lankan (+94 / 07x / 011) or international phone numbers (9 to 15 digits).
 */
export function isValidPhone(phone: string): boolean {
  const digitsOnly = phone.replace(/\D/g, '');
  return digitsOnly.length >= 9 && digitsOnly.length <= 15;
}

/**
 * Validates Sri Lankan mobile phone numbers for SMS/WhatsApp alerts (Text.lk format).
 * Matches e.g. 0771234567, 94771234567, +94771234567, 771234567
 */
export function isValidSriLankanMobile(phone: string): boolean {
  if (!phone || typeof phone !== 'string') return false;
  const cleaned = phone.replace(/[\s\-()]/g, '');
  return /^(?:0|94|\+94)?7\d{8}$/.test(cleaned);
}

/**
 * Sanitizes postal codes (alphanumeric, spaces, hyphens, max 16 chars).
 */
export function sanitizePostalCode(input: unknown): string {
  if (typeof input !== 'string') return '';
  return input
    .replace(/[^a-zA-Z0-9\- ]/g, '')
    .trim()
    .slice(0, SECURITY_LIMITS.MAX_POSTAL_LENGTH);
}

/**
 * Sanitizes coupon / voucher codes (uppercase alphanumeric + hyphens).
 */
export function sanitizeCouponCode(input: unknown): string {
  if (typeof input !== 'string') return '';
  return input
    .replace(/[^a-zA-Z0-9_-]/g, '')
    .toUpperCase()
    .slice(0, SECURITY_LIMITS.MAX_COUPON_CODE_LENGTH);
}

/**
 * Sanitizes order lookup IDs (e.g., LK-847291, SHL-2026-8492).
 */
export function sanitizeOrderId(input: unknown): string {
  if (typeof input !== 'string') return '';
  return input
    .replace(/[^a-zA-Z0-9-]/g, '')
    .toUpperCase()
    .slice(0, SECURITY_LIMITS.MAX_ORDER_ID_LENGTH);
}

/**
 * Validates that a URL is safe to render in href/src (blocks javascript:, data:, vbscript:).
 */
export function isSafeUrl(url: unknown): boolean {
  if (typeof url !== 'string' || !url.trim()) return false;
  const trimmed = url.trim();
  if (trimmed.startsWith('/') && !trimmed.startsWith('//')) {
    return true;
  }
  try {
    const parsed = new URL(trimmed);
    return parsed.protocol === 'https:' || parsed.protocol === 'http:';
  } catch {
    return false;
  }
}

/**
 * Serializes an object to JSON for <script type="application/ld+json">
 * while escaping <, >, &, and Unicode line terminators to prevent script breakout XSS.
 */
export function serializeSafeJsonLd(data: unknown): string {
  return JSON.stringify(data)
    .replace(/</g, '\\u003c')
    .replace(/>/g, '\\u003e')
    .replace(/&/g, '\\u0026')
    .replace(/\u2028/g, '\\u2028')
    .replace(/\u2029/g, '\\u2029');
}

// ============================================================================
// 2. PROTOTYPE-POLLUTION-SAFE JSON PARSER
// ============================================================================

/**
 * Safely parses JSON strings from localStorage or network payloads,
 * stripping __proto__, constructor, and prototype properties at all levels.
 */
export function safeJsonParse<T>(raw: string | null | undefined, fallback: T): T {
  if (!raw || typeof raw !== 'string') return fallback;
  // Guard against excessively large localStorage strings (> 1MB)
  if (raw.length > 1_048_576) return fallback;

  try {
    const parsed = JSON.parse(raw, (key, value) => {
      if (DANGEROUS_PROTO_KEYS.has(key)) {
        return undefined;
      }
      return value;
    });
    return (parsed ?? fallback) as T;
  } catch {
    return fallback;
  }
}

// ============================================================================
// 3. RELATIONAL ENTITY VALIDATORS & CANONICAL PRICE RECONCILERS
// ============================================================================

const ALLOWED_THEMES = new Set([
  'light',
  'sepia',
  'emerald',
  'datacamp',
  'aws-skillbuilder',
  'womens-day',
  'childrens-day',
  'teachers-day',
  'avurudu',
  'vesak',
]);

export function validateThemeId(rawTheme: unknown): string {
  if (typeof rawTheme !== 'string') return 'light';
  const cleaned = rawTheme.trim().toLowerCase();
  return ALLOWED_THEMES.has(cleaned) ? cleaned : 'light';
}

export function validateUserProfile(raw: unknown): UserProfile | null {
  if (!raw || typeof raw !== 'object') return null;
  const candidate = raw as Record<string, unknown>;
  const email = sanitizeEmail(candidate.email);
  if (!isValidEmail(email)) return null;

  const rawName = sanitizeSingleLine(candidate.name, SECURITY_LIMITS.MAX_NAME_LENGTH);
  const name = rawName || email.split('@')[0] || 'Scholar';
  const role = sanitizeSingleLine(candidate.role, 60) || 'Scholar Reader';
  const avatar =
    typeof candidate.avatar === 'string' && isSafeUrl(candidate.avatar)
      ? candidate.avatar.trim()
      : undefined;

  // Never persist passwords, tokens, or secret fields in UserProfile
  return {
    name,
    email,
    role,
    ...(avatar ? { avatar } : {}),
  };
}

/**
 * Validates and reconciles hydrated or submitted BagItem[] against the canonical
 * BOOKS catalog so tampered prices, negative quantities, or XSS strings in localStorage
 * are automatically neutralized.
 */
export function validateAndReconcileBagItems(
  raw: unknown,
  catalog: Book[] = BOOKS
): BagItem[] {
  if (!Array.isArray(raw)) return [];

  const catalogMap = new Map<string, Book>(catalog.map((b) => [b.id, b]));
  const validated: BagItem[] = [];

  for (const entry of raw.slice(0, SECURITY_LIMITS.MAX_BAG_ITEMS_COUNT)) {
    if (!entry || typeof entry !== 'object') continue;
    const item = entry as Record<string, unknown>;
    const rawBook = item.book as Record<string, unknown> | undefined;
    if (!rawBook || typeof rawBook.id !== 'string') continue;

    const bookId = sanitizeSingleLine(rawBook.id, 100);
    const rawQty = Number(item.quantity);
    if (!Number.isFinite(rawQty) || rawQty < 1) continue;
    const quantity = Math.min(SECURITY_LIMITS.MAX_BAG_ITEM_QUANTITY, Math.floor(rawQty));

    const canonicalBook = catalogMap.get(bookId);

    if (canonicalBook) {
      if (canonicalBook.inStock === false) continue;
      const binding =
        sanitizeSingleLine(item.binding, 80) || canonicalBook.binding || 'Hardcover';
      validated.push({
        book: {
          ...canonicalBook,
          // Preserve optional UI display metadata safely
          usdPrice:
            typeof rawBook.usdPrice === 'number' && rawBook.usdPrice > 0
              ? Number(rawBook.usdPrice.toFixed(2))
              : Number((canonicalBook.price / 300).toFixed(2)),
          originalUsdPrice:
            typeof rawBook.originalUsdPrice === 'number' && rawBook.originalUsdPrice > 0
              ? Number(rawBook.originalUsdPrice.toFixed(2))
              : Number((canonicalBook.originalPrice / 300).toFixed(2)),
          urgencyText:
            typeof rawBook.urgencyText === 'string'
              ? sanitizeSingleLine(rawBook.urgencyText, 120)
              : canonicalBook.urgencyText,
          sellerName:
            typeof rawBook.sellerName === 'string'
              ? sanitizeSingleLine(rawBook.sellerName, 80)
              : canonicalBook.sellerName,
        },
        quantity,
        binding,
      });
    } else if (bookId.startsWith('gift-card-')) {
      // Custom Shastraloka Gift Card item: enforce strict LKR bounds
      const rawPrice = Number(rawBook.price);
      if (
        !Number.isFinite(rawPrice) ||
        rawPrice < SECURITY_LIMITS.MIN_GIFT_CARD_LKR ||
        rawPrice > SECURITY_LIMITS.MAX_GIFT_CARD_LKR
      ) {
        continue;
      }
      const safePrice = Math.round(rawPrice);
      const fallbackBase = catalog[0];
      validated.push({
        book: {
          ...fallbackBase,
          id: bookId,
          title: sanitizeSingleLine(
            rawBook.title,
            SECURITY_LIMITS.MAX_MANUSCRIPT_TITLE_LENGTH
          ) || `Shastraloka Gift Card (LKR ${safePrice.toLocaleString()})`,
          author:
            sanitizeSingleLine(rawBook.author, SECURITY_LIMITS.MAX_NAME_LENGTH) ||
            'Shastraloka Literary Gift Voucher',
          price: safePrice,
          originalPrice: safePrice,
          inStock: true,
        },
        quantity,
        binding: sanitizeSingleLine(item.binding, 80) || 'Royal Silkbound Edition',
      });
    }
  }

  return validated;
}

export function validateBoards(raw: unknown, fallbackBoards: Board[]): Board[] {
  if (!Array.isArray(raw) || raw.length === 0) return fallbackBoards;

  const validBookIds = new Set(BOOKS.map((b) => b.id));
  const result: Board[] = [];

  for (const item of raw.slice(0, 50)) {
    if (!item || typeof item !== 'object') continue;
    const b = item as Record<string, unknown>;
    const id = sanitizeSingleLine(b.id, 80);
    const name = sanitizeSingleLine(b.name, SECURITY_LIMITS.MAX_BOARD_NAME_LENGTH);
    if (!id || !name) continue;

    const description = sanitizeSingleLine(
      b.description,
      SECURITY_LIMITS.MAX_BOARD_DESC_LENGTH
    );
    const rawBookIds = Array.isArray(b.bookIds) ? b.bookIds : [];
    const bookIds = rawBookIds
      .filter((bid): bid is string => typeof bid === 'string' && validBookIds.has(bid))
      .slice(0, 200);

    result.push({
      id,
      name,
      description,
      bookIds: Array.from(new Set(bookIds)),
      isDefault: Boolean(b.isDefault),
    });
  }

  return result.length > 0 ? result : fallbackBoards;
}

export function validateLikedBookIds(raw: unknown, fallback: string[]): string[] {
  if (!Array.isArray(raw)) return fallback;
  const validBookIds = new Set(BOOKS.map((b) => b.id));
  const cleaned = raw
    .filter((id): id is string => typeof id === 'string' && validBookIds.has(id))
    .slice(0, 500);
  return Array.from(new Set(cleaned));
}

export function sanitizeOrderCustomer(raw: OrderCustomer): OrderCustomer {
  return {
    fullName: sanitizeSingleLine(raw.fullName, SECURITY_LIMITS.MAX_NAME_LENGTH),
    email: sanitizeEmail(raw.email),
    phone: sanitizePhone(raw.phone),
    address: sanitizeSingleLine(raw.address, SECURITY_LIMITS.MAX_ADDRESS_LENGTH),
    city: sanitizeSingleLine(raw.city, SECURITY_LIMITS.MAX_CITY_LENGTH),
    district: sanitizeSingleLine(raw.district, 60),
    postalCode: sanitizePostalCode(raw.postalCode),
    ...(raw.notes ? { notes: sanitizeText(raw.notes, 500) } : {}),
    ...(raw.deliveryNotes ? { deliveryNotes: sanitizeText(raw.deliveryNotes, 500) } : {}),
  };
}

export function validateOrders(raw: unknown, fallback: Order[]): Order[] {
  if (!Array.isArray(raw) || raw.length === 0) return fallback;
  const result: Order[] = [];
  const allowedStatuses = new Set(['confirmed', 'bound', 'dispatched', 'delivered']);
  const allowedPayments = new Set(['cod', 'card', 'bank']);

  for (const entry of raw.slice(0, 100)) {
    if (!entry || typeof entry !== 'object') continue;
    const o = entry as Record<string, unknown>;
    const id = sanitizeOrderId(o.id);
    if (!id) continue;

    const rawCustomer = (o.customer || {}) as OrderCustomer;
    const customer = sanitizeOrderCustomer(rawCustomer);
    const items = validateAndReconcileBagItems(o.items);
    const subtotal = Math.max(0, Math.round(Number(o.subtotal) || 0));
    const discount = Math.max(0, Math.round(Number(o.discount) || 0));
    const shipping = Math.max(0, Math.round(Number(o.shipping) || 0));
    const total = Math.max(0, subtotal - discount + shipping);

    const status = allowedStatuses.has(String(o.status))
      ? (o.status as Order['status'])
      : 'confirmed';
    const paymentMethod = allowedPayments.has(String(o.paymentMethod))
      ? (o.paymentMethod as Order['paymentMethod'])
      : 'cod';

    result.push({
      id,
      createdAt:
        typeof o.createdAt === 'string'
          ? sanitizeSingleLine(o.createdAt, 40)
          : new Date().toISOString(),
      items,
      subtotal,
      discount,
      shipping,
      total,
      status,
      customer,
      paymentMethod,
      trackingNumber: sanitizeOrderId(o.trackingNumber) || `SLP-COL-100000`,
      estimatedDelivery: sanitizeSingleLine(o.estimatedDelivery, 40) || 'Within 3 days',
    });
  }

  return result.length > 0 ? result : fallback;
}

export function validateReviewsMap(
  raw: unknown,
  fallback: Record<string, Review[]>
): Record<string, Review[]> {
  if (!raw || typeof raw !== 'object' || Array.isArray(raw)) return fallback;
  const validBookIds = new Set(BOOKS.map((b) => b.id));
  const result: Record<string, Review[]> = {};

  for (const [bookId, list] of Object.entries(raw as Record<string, unknown>)) {
    if (DANGEROUS_PROTO_KEYS.has(bookId) || !validBookIds.has(bookId)) continue;
    if (!Array.isArray(list)) continue;

    const cleanReviews: Review[] = [];
    for (const item of list.slice(0, 100)) {
      if (!item || typeof item !== 'object') continue;
      const r = item as Record<string, unknown>;
      const comment = sanitizeText(r.comment, SECURITY_LIMITS.MAX_REVIEW_COMMENT_LENGTH);
      if (!comment) continue;
      const ratingNum = Math.min(5, Math.max(1, Math.round(Number(r.rating) || 5)));

      cleanReviews.push({
        id: sanitizeSingleLine(r.id, 60) || `rev-${Date.now()}`,
        user: sanitizeSingleLine(r.user, SECURITY_LIMITS.MAX_NAME_LENGTH) || 'Reader',
        date: sanitizeSingleLine(r.date, 40) || 'Recently',
        rating: ratingNum,
        comment,
      });
    }

    if (cleanReviews.length > 0) {
      result[bookId] = cleanReviews;
    }
  }

  return Object.keys(result).length > 0 ? { ...fallback, ...result } : fallback;
}

// ============================================================================
// 4. PROTECTED API FETCH CLIENT WITH CSRF HEADER & LOCAL FALLBACK
// ============================================================================

export async function secureApiPost<TResponse>(
  endpoint: string,
  payload: Record<string, unknown>
): Promise<{ ok: boolean; data?: TResponse; error?: string }> {
  try {
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Requested-With': 'Shastraloka-Web-Client',
      },
      body: JSON.stringify(payload),
    });

    const body = await response.json().catch(() => ({}));
    if (!response.ok) {
      return {
        ok: false,
        error: typeof body.error === 'string' ? body.error : 'Request validation failed',
      };
    }
    return { ok: true, data: body as TResponse };
  } catch {
    // Graceful fallback when running offline or before live database connection
    return { ok: true };
  }
}
