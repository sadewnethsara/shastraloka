'use client';

import React from 'react';
import Link from 'next/link';
import HouseRulesLayout from '../../components/HouseRulesLayout';
import { Truck, ShieldCheck, RotateCcw, PackageCheck } from 'lucide-react';

export default function ShippingReturnsPage() {
  return (
    <HouseRulesLayout activeSlug="shipping-returns" title="Shipping & Returns Policy" lastUpdated="29 Oct, 2026">
      <p>
        Every volume ordered from <strong className="text-[var(--text-main)]">Shastraloka (ශාස්ත්‍රාලෝක)</strong> is wrapped in
        moisture-resistant archival kraft paper and cushioned with corner protectors before leaving our Colombo &amp; Kandy
        vaults.
      </p>

      {/* Highlights Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-6">
        <div className="p-4 rounded-2xl bg-[var(--bg-surface)] border border-[var(--border-subtle)]">
          <Truck className="w-5 h-5 text-[#F1641E] mb-2" />
          <h3 className="text-sm font-bold text-[var(--text-main)]">All 25 Sri Lankan Districts</h3>
          <p className="text-xs text-[var(--text-muted)] mt-1">
            Next-day delivery in Colombo, Gampaha, Kalutara &amp; Kandy; 2–3 business days islandwide.
          </p>
        </div>
        <div className="p-4 rounded-2xl bg-[var(--bg-surface)] border border-[var(--border-subtle)]">
          <PackageCheck className="w-5 h-5 text-[#F1641E] mb-2" />
          <h3 className="text-sm font-bold text-[var(--text-main)]">Free Courier Over LKR 5,000</h3>
          <p className="text-xs text-[var(--text-muted)] mt-1">
            Complimentary insured delivery on all Shopping Bags over LKR 5,000 or with code FREEDELIVERYLK.
          </p>
        </div>
        <div className="p-4 rounded-2xl bg-[var(--bg-surface)] border border-[var(--border-subtle)]">
          <RotateCcw className="w-5 h-5 text-[#F1641E] mb-2" />
          <h3 className="text-sm font-bold text-[var(--text-main)]">14-Day Archival Exchange</h3>
          <p className="text-xs text-[var(--text-muted)] mt-1">
            Easy replacement or full LKR refund if any book arrives with transit wear or binding defects.
          </p>
        </div>
        <div className="p-4 rounded-2xl bg-[var(--bg-surface)] border border-[var(--border-subtle)]">
          <ShieldCheck className="w-5 h-5 text-[#F1641E] mb-2" />
          <h3 className="text-sm font-bold text-[var(--text-main)]">Worldwide Scholarly Air Post</h3>
          <p className="text-xs text-[var(--text-muted)] mt-1">
            Tracked DHL &amp; EMS dispatches to universities and readers in UK, US, Europe, India, and Japan.
          </p>
        </div>
      </div>

      <section className="space-y-2">
        <h2 className="font-heading font-bold text-lg sm:text-xl font-bold text-[var(--text-main)]">
          1. District Delivery Rates &amp; Timelines
        </h2>
        <p className="text-sm text-[var(--text-muted)] leading-relaxed">
          Standard islandwide courier rates range from LKR 350 (Colombo &amp; suburbs) to LKR 450 (outstation districts). You can
          track your parcel in real time via our{' '}
          <Link href="/track-order" className="underline text-[var(--text-main)] hover:text-[#F1641E]">
            Track Order
          </Link>{' '}
          page using your order reference.
        </p>
      </section>

      <section className="space-y-2">
        <h2 className="font-heading font-bold text-lg sm:text-xl font-bold text-[var(--text-main)]">
          2. Returns, Replacements &amp; Collector Editions
        </h2>
        <p className="text-sm text-[var(--text-muted)] leading-relaxed">
          Unmarked print editions may be returned within 14 days of delivery for a full refund or exchange. Custom-inscribed
          brass-clasp collector slipcases are eligible for complimentary replacement if damaged in transit.
        </p>
      </section>
    </HouseRulesLayout>
  );
}
