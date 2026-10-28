import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import {
  shouldShowDesktopMiniBagRail,
  getMasonryColumnCount,
  validateMobileViewportMetrics,
  calculateBagFinancials,
} from './responsiveLayout';

describe('responsiveLayout utilities', () => {
  it('hides MiniBagRail on mobile (375px, 390px) and tablet (768px) viewports', () => {
    assert.equal(shouldShowDesktopMiniBagRail(375, true), false);
    assert.equal(shouldShowDesktopMiniBagRail(390, true), false);
    assert.equal(shouldShowDesktopMiniBagRail(768, true), false);
    assert.equal(shouldShowDesktopMiniBagRail(1023, true), false);
    assert.equal(shouldShowDesktopMiniBagRail(1024, true), true);
    assert.equal(shouldShowDesktopMiniBagRail(1440, false), false);
  });

  it('returns expected masonry column counts across breakpoints', () => {
    assert.equal(getMasonryColumnCount(390), 2);
    assert.equal(getMasonryColumnCount(640), 3);
    assert.equal(getMasonryColumnCount(1024), 4);
    assert.equal(getMasonryColumnCount(1280), 5);
    assert.equal(getMasonryColumnCount(1600), 6);
  });

  it('detects horizontal overflow and validates sticky header budget on mobile', () => {
    const cleanMobile = validateMobileViewportMetrics({
      innerWidth: 390,
      scrollWidth: 390,
      stickyHeaderHeight: 112,
      innerHeight: 844,
    });
    assert.equal(cleanMobile.hasHorizontalOverflow, false);
    assert.equal(cleanMobile.isWithinStickyBudget, true);

    const overflowingMobile = validateMobileViewportMetrics({
      innerWidth: 390,
      scrollWidth: 465,
      stickyHeaderHeight: 200,
      innerHeight: 844,
    });
    assert.equal(overflowingMobile.hasHorizontalOverflow, true);
    assert.equal(overflowingMobile.isWithinStickyBudget, false);
  });

  it('computes bag financials accurately across empty, single, and multi-book bags', () => {
    const empty = calculateBagFinancials({ items: [] });
    assert.equal(empty.totalCount, 0);
    assert.equal(empty.grandTotal, 0);

    const preset1 = calculateBagFinancials({
      items: [
        { price: 8.69, originalPrice: 9.65, quantity: 1, shippingCost: 0.72 },
        { price: 1.49, originalPrice: 4.97, quantity: 1, shippingCost: 0 },
      ],
    });
    assert.equal(preset1.totalCount, 2);
    assert.equal(preset1.rawItemsTotal, 14.62);
    assert.equal(preset1.discountedSubtotal, 10.18);
    assert.equal(preset1.shopDiscount, 4.44);
    assert.equal(preset1.shippingTotal, 0.72);
    assert.equal(preset1.grandTotal, 10.9);
  });
});
