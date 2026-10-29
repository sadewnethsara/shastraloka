'use client';

import React from 'react';
import Link from 'next/link';
import HouseRulesLayout from '../../components/HouseRulesLayout';

export default function TermsPage() {
  return (
    <HouseRulesLayout activeSlug="terms" title="Terms of Use" lastUpdated="29 Oct, 2026">
      <p>
        Welcome to <strong className="text-[var(--text-main)]">Shastraloka (ශාස්ත්‍රාලෝක / ශාස්ත්රාලෝක)</strong>. These Terms of
        Use govern your access to and purchases from our online bookstore, digital scriptorium, and archival facsimile catalog
        at <span className="font-medium text-[var(--text-main)]">shastraloka.lk</span> and{' '}
        <span className="font-medium font-sinhala text-[var(--text-main)]">ශාස්ත්රාලෝක.ලංකා</span>.
      </p>

      <section className="space-y-2 pt-2">
        <h2 className="font-serif text-lg sm:text-xl font-bold text-[var(--text-main)]">
          1. Editions, Pricing in LKR &amp; Authenticity Guarantee
        </h2>
        <p className="text-sm text-[var(--text-muted)] leading-relaxed">
          All books, hardbound royal chronicles, and palm-leaf (ola) facsimiles listed on Shastraloka are priced in Sri Lankan
          Rupees (LKR). Offer percentages reflect verified discounts off the publisher&apos;s recommended retail price. Every
          collector edition is accompanied by an archival seal from the issuing guild or university press.
        </p>
      </section>

      <section className="space-y-2 pt-2">
        <h2 className="font-serif text-lg sm:text-xl font-bold text-[var(--text-main)]">
          2. Shopping Bag, Gift Cards &amp; Promotional Vouchers
        </h2>
        <p className="text-sm text-[var(--text-muted)] leading-relaxed">
          Items placed in your Shopping Bag reserve current promotional pricing during your active session. Shastraloka Gift
          Cards (<Link href="/gift-cards" className="underline text-[var(--text-main)]">view Gift Cards</Link>) are denominated
          in LKR, never expire, and may be redeemed toward any print edition, slipcase set, or digital folio.
        </p>
      </section>

      <section className="space-y-2 pt-2">
        <h2 className="font-serif text-lg sm:text-xl font-bold text-[var(--text-main)]">
          3. Archival Copyright &amp; Scholarly Fair Use
        </h2>
        <p className="text-sm text-[var(--text-muted)] leading-relaxed">
          While classical Pali, Sanskrit, and Sinhala root texts (such as the <em>Mahavamsa</em>, <em>Gajaga Wannama</em>, and{' '}
          <em>Sarartha Sangrahaya</em>) belong to Sri Lanka&apos;s cultural heritage, modern critical commentaries, English
          translations, and high-resolution folio photography remain protected by publisher copyright. Educators and pirivena
          libraries may quote excerpts with attribution to Shastraloka Heritage Press.
        </p>
      </section>

      <section className="space-y-2 pt-2">
        <h2 className="font-serif text-lg sm:text-xl font-bold text-[var(--text-main)]">
          4. Related Policies
        </h2>
        <ul className="list-disc pl-6 space-y-1.5 text-sm">
          <li>
            <Link href="/privacy" className="underline text-[var(--text-main)] hover:text-[#F1641E]">
              Shastraloka Global Privacy Policy
            </Link>
          </li>
          <li>
            <Link href="/shipping-returns" className="underline text-[var(--text-main)] hover:text-[#F1641E]">
              Islandwide Shipping, Courier &amp; Returns Charter
            </Link>
          </li>
          <li>
            <Link href="/help" className="underline text-[var(--text-main)] hover:text-[#F1641E]">
              Help Center &amp; Scholarly Support
            </Link>
          </li>
        </ul>
      </section>
    </HouseRulesLayout>
  );
}
