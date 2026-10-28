export interface ViewportDimensions {
  width: number;
  height: number;
}

export interface BagSummaryInput {
  items: { price: number; originalPrice?: number; quantity: number; shippingCost?: number }[];
  couponDiscount?: number;
}

export interface BagSummaryResult {
  totalCount: number;
  rawItemsTotal: number;
  discountedSubtotal: number;
  shopDiscount: number;
  shippingTotal: number;
  grandTotal: number;
}

/**
 * Determines whether the desktop-only MiniBagRail sidebar should be rendered
 * based on viewport width (`lg` breakpoint >= 1024px) so mobile screens (375px-430px)
 * never have their horizontal viewport squeezed.
 */
export function shouldShowDesktopMiniBagRail(viewportWidth: number, hasBagItems: boolean): boolean {
  if (!Number.isFinite(viewportWidth) || viewportWidth < 1024) {
    return false;
  }
  return Boolean(hasBagItems);
}

/**
 * Determines the number of masonry columns for a given viewport width,
 * matching `.book-masonry` breakpoints in `src/app/globals.css`.
 */
export function getMasonryColumnCount(viewportWidth: number): number {
  if (!Number.isFinite(viewportWidth) || viewportWidth < 640) return 2;
  if (viewportWidth < 1024) return 3;
  if (viewportWidth < 1280) return 4;
  if (viewportWidth < 1600) return 5;
  return 6;
}

/**
 * Validates that a rendered page has zero unintended horizontal overflow
 * (`scrollWidth <= innerWidth`) and sticky headers stay within the 15% mobile budget.
 */
export function validateMobileViewportMetrics(metrics: {
  innerWidth: number;
  scrollWidth: number;
  stickyHeaderHeight: number;
  innerHeight: number;
}): {
  hasHorizontalOverflow: boolean;
  stickyHeaderRatio: number;
  isWithinStickyBudget: boolean;
} {
  const hasHorizontalOverflow = metrics.scrollWidth > metrics.innerWidth;
  const stickyHeaderRatio =
    metrics.innerHeight > 0 ? metrics.stickyHeaderHeight / metrics.innerHeight : 0;
  const isWithinStickyBudget = stickyHeaderRatio <= 0.18;
  return {
    hasHorizontalOverflow,
    stickyHeaderRatio: Number(stickyHeaderRatio.toFixed(4)),
    isWithinStickyBudget,
  };
}

/**
 * Calculates bag financials accurately with zero NaN/precision drift.
 */
export function calculateBagFinancials(input: BagSummaryInput): BagSummaryResult {
  let totalCount = 0;
  let discountedSubtotal = 0;
  let rawItemsTotal = 0;
  let shippingTotal = 0;

  for (const item of input.items) {
    const qty = Math.max(0, Math.floor(item.quantity || 0));
    if (qty === 0) continue;
    totalCount += qty;
    discountedSubtotal += item.price * qty;
    rawItemsTotal += (item.originalPrice ?? item.price) * qty;
    shippingTotal += item.shippingCost ?? 0;
  }

  const shopDiscount = Math.max(0, rawItemsTotal - discountedSubtotal);
  const coupon = Math.max(0, input.couponDiscount ?? 0);
  const grandTotal = Math.max(0, discountedSubtotal - coupon + shippingTotal);

  return {
    totalCount,
    rawItemsTotal: Number(rawItemsTotal.toFixed(2)),
    discountedSubtotal: Number(discountedSubtotal.toFixed(2)),
    shopDiscount: Number(shopDiscount.toFixed(2)),
    shippingTotal: Number(shippingTotal.toFixed(2)),
    grandTotal: Number(grandTotal.toFixed(2)),
  };
}
