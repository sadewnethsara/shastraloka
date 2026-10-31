import { NextRequest, NextResponse } from 'next/server';
import {
  enforceRateLimit,
  parseSafeRequestBody,
  verifyCsrfAndOrigin,
  isPostgresConfigured,
} from '../../../../lib/serverSecurity';
import {
  isValidEmail,
  isValidPhone,
  sanitizeCouponCode,
  sanitizeEmail,
  sanitizePhone,
  sanitizePostalCode,
  sanitizeSingleLine,
  SECURITY_LIMITS,
} from '../../../../utils/security';
import { BOOKS } from '../../../../data/books';

const DISTRICT_RATES: Record<string, number> = {
  Kandy: 350,
  Colombo: 250,
  Gampaha: 300,
  Kalutara: 300,
  Matale: 350,
  'Nuwara Eliya': 380,
  Galle: 350,
  Matara: 350,
  Hambantota: 380,
  Kurunegala: 350,
  Puttalam: 380,
  Anuradhapura: 380,
  Polonnaruwa: 380,
  Badulla: 380,
  Monaragala: 400,
  Ratnapura: 350,
  Kegalle: 350,
  Ampara: 400,
  Batticaloa: 420,
  Trincomalee: 420,
  Jaffna: 420,
  Kilinochchi: 420,
  Mannar: 420,
  Mullaitivu: 420,
  Vavuniya: 400,
};

const VALID_COUPONS: Record<string, number> = {
  LANKA20: 20,
  SHASTRA20: 20,
};

export async function POST(req: NextRequest) {
  const csrfError = verifyCsrfAndOrigin(req);
  if (csrfError) return csrfError;

  const rateLimitError = enforceRateLimit(req, 'validate-checkout', 20, 60_000);
  if (rateLimitError) return rateLimitError;

  const parsed = await parseSafeRequestBody<{
    items?: Array<{ id?: string; quantity?: number; price?: number }>;
    district?: string;
    couponCode?: string;
    customer?: {
      email?: string;
      fullName?: string;
      streetAddress?: string;
      city?: string;
      postalCode?: string;
      phone?: string;
    };
  }>(req, 16_384);

  if (!parsed.ok) return parsed.response;

  const { items = [], district = 'Colombo', couponCode = '', customer } = parsed.data;

  if (customer) {
    const email = sanitizeEmail(customer.email);
    const fullName = sanitizeSingleLine(customer.fullName, SECURITY_LIMITS.MAX_NAME_LENGTH);
    const streetAddress = sanitizeSingleLine(
      customer.streetAddress,
      SECURITY_LIMITS.MAX_ADDRESS_LENGTH
    );
    const city = sanitizeSingleLine(customer.city, SECURITY_LIMITS.MAX_CITY_LENGTH);
    const phone = sanitizePhone(customer.phone);
    const postalCode = sanitizePostalCode(customer.postalCode);

    if (!isValidEmail(email)) {
      return NextResponse.json({ error: 'Invalid customer email address.' }, { status: 400 });
    }
    if (!fullName || !streetAddress || !city) {
      return NextResponse.json(
        { error: 'Full name, street address, and city are required.' },
        { status: 400 }
      );
    }
    if (!isValidPhone(phone)) {
      return NextResponse.json(
        { error: 'Please provide a valid contact phone number (9–15 digits).' },
        { status: 400 }
      );
    }
    if (postalCode && postalCode.length > SECURITY_LIMITS.MAX_POSTAL_LENGTH) {
      return NextResponse.json({ error: 'Invalid postal code.' }, { status: 400 });
    }
  }

  // Canonical catalog lookup to prevent client-side price manipulation
  const catalogById = new Map(BOOKS.map((b) => [b.id, b]));
  let verifiedSubtotal = 0;

  for (const item of items.slice(0, SECURITY_LIMITS.MAX_BAG_ITEMS_COUNT)) {
    const id = sanitizeSingleLine(item.id, 100);
    const qty = Math.min(
      SECURITY_LIMITS.MAX_BAG_ITEM_QUANTITY,
      Math.max(1, Math.floor(Number(item.quantity) || 1))
    );
    const catalogBook = catalogById.get(id);
    if (catalogBook) {
      verifiedSubtotal += catalogBook.price * qty;
    } else {
      // Fallback for checkout local pin items or gift cards with bounded price
      const boundedPrice = Math.min(
        SECURITY_LIMITS.MAX_GIFT_CARD_LKR,
        Math.max(500, Math.round(Number(item.price) || 0))
      );
      verifiedSubtotal += boundedPrice * qty;
    }
  }

  const normalizedCoupon = sanitizeCouponCode(couponCode);
  const discountPercent = VALID_COUPONS[normalizedCoupon] || 0;
  const discountAmount = Math.round((verifiedSubtotal * discountPercent) / 100);
  const safeDistrict = sanitizeSingleLine(district, 60);
  const districtRate = DISTRICT_RATES[safeDistrict] ?? 350;
  const shippingFee = verifiedSubtotal >= 5000 ? 0 : districtRate;
  const finalTotal = Math.max(0, verifiedSubtotal - discountAmount) + shippingFee;

  return NextResponse.json({
    ok: true,
    dbConnected: isPostgresConfigured(),
    verifiedSubtotal,
    discountPercent,
    discountAmount,
    shippingFee,
    finalTotal,
  });
}
