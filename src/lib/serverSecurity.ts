import { NextRequest, NextResponse } from 'next/server';
import { safeJsonParse } from '../utils/security';

// ============================================================================
// 1. IN-MEMORY SLIDING-WINDOW RATE LIMITER
// ============================================================================

interface RateLimitBucket {
  count: number;
  resetAt: number;
}

const rateLimitStore = new Map<string, RateLimitBucket>();

function getClientIp(req: NextRequest): string {
  const forwarded = req.headers.get('x-forwarded-for');
  if (forwarded) {
    return forwarded.split(',')[0].trim().slice(0, 64);
  }
  const realIp = req.headers.get('x-real-ip');
  if (realIp) {
    return realIp.trim().slice(0, 64);
  }
  return 'local-client';
}

export function enforceRateLimit(
  req: NextRequest,
  actionBucket: string,
  maxRequests = 20,
  windowMs = 60_000
): NextResponse | null {
  const now = Date.now();
  const key = `${actionBucket}:${getClientIp(req)}`;
  const entry = rateLimitStore.get(key);

  if (!entry || now > entry.resetAt) {
    rateLimitStore.set(key, { count: 1, resetAt: now + windowMs });
    return null;
  }

  entry.count += 1;
  if (entry.count > maxRequests) {
    const retryAfterSec = Math.ceil((entry.resetAt - now) / 1000);
    return NextResponse.json(
      { error: 'Too many requests. Please wait a moment and try again.' },
      {
        status: 429,
        headers: { 'Retry-After': String(Math.max(1, retryAfterSec)) },
      }
    );
  }

  return null;
}

// ============================================================================
// 2. CSRF & ORIGIN VERIFICATION GUARD
// ============================================================================

export function verifyCsrfAndOrigin(req: NextRequest): NextResponse | null {
  const requestedWith = req.headers.get('x-requested-with');
  if (requestedWith !== 'Shastraloka-Web-Client') {
    return NextResponse.json(
      { error: 'Forbidden: Missing or invalid security request header.' },
      { status: 403 }
    );
  }

  const origin = req.headers.get('origin');
  const host = req.headers.get('host');
  if (origin && host) {
    try {
      const originHost = new URL(origin).host;
      if (originHost !== host) {
        return NextResponse.json(
          { error: 'Forbidden: Cross-origin state mutation blocked.' },
          { status: 403 }
        );
      }
    } catch {
      return NextResponse.json(
        { error: 'Forbidden: Malformed Origin header.' },
        { status: 403 }
      );
    }
  }

  return null;
}

// ============================================================================
// 3. SAFE PAYLOAD PARSER WITH SIZE CAP & PROTOTYPE POLLUTION DEFENSE
// ============================================================================

export async function parseSafeRequestBody<T = Record<string, unknown>>(
  req: NextRequest,
  maxBytes = 16_384
): Promise<{ ok: true; data: T } | { ok: false; response: NextResponse }> {
  const contentLength = Number(req.headers.get('content-length') || 0);
  if (contentLength > maxBytes) {
    return {
      ok: false,
      response: NextResponse.json(
        { error: 'Payload too large.' },
        { status: 413 }
      ),
    };
  }

  try {
    const rawText = await req.text();
    if (rawText.length > maxBytes) {
      return {
        ok: false,
        response: NextResponse.json(
          { error: 'Payload too large.' },
          { status: 413 }
        ),
      };
    }

    const parsed = safeJsonParse<T | null>(rawText, null);
    if (!parsed || typeof parsed !== 'object') {
      return {
        ok: false,
        response: NextResponse.json(
          { error: 'Invalid JSON request body.' },
          { status: 400 }
        ),
      };
    }

    return { ok: true, data: parsed };
  } catch {
    return {
      ok: false,
      response: NextResponse.json(
        { error: 'Malformed request payload.' },
        { status: 400 }
      ),
    };
  }
}

// ============================================================================
// 4. POSTGRESQL / CLOUD SQL REPOSITORY INTERFACE (PARAMETERIZED READY)
// ============================================================================

export interface PostgresOrderRecord {
  orderId: string;
  customerEmail: string;
  customerName: string;
  customerPhone: string;
  shippingAddress: string;
  city: string;
  district: string;
  postalCode: string;
  subtotalLkr: number;
  discountLkr: number;
  shippingLkr: number;
  totalLkr: number;
  paymentMethod: 'cod' | 'card' | 'bank';
  createdAtIso: string;
}

/**
 * Parameterized SQL repository contract for Cloud SQL / PostgreSQL.
 * When process.env.DATABASE_URL is configured with Drizzle ORM or node-postgres,
 * all writes use $1, $2 parameterized bindings — never string concatenation.
 */
export const isPostgresConfigured = (): boolean => {
  return Boolean(process.env.DATABASE_URL && process.env.DATABASE_URL.startsWith('postgres'));
};
