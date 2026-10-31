'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import HouseRulesLayout, { REGIONAL_POLICY_VARIATIONS } from '../../components/HouseRulesLayout';

export default function PrivacyPage() {
  const [selectedLang, setSelectedLang] = useState<string>('English - Sri Lanka');

  return (
    <HouseRulesLayout activeSlug="privacy" title="Privacy Policy" lastUpdated="29 Oct, 2026">
      <p>
        As Sri Lanka&apos;s premier classical bookstore and archival manuscript sanctuary (operating on{' '}
        <span className="font-semibold text-[var(--text-main)]">shastraloka.lk</span>), we take our national and
        international data protection obligations seriously. Our privacy policy includes this Global Privacy Policy, our{' '}
        <Link href="/terms" className="underline text-[var(--text-main)] hover:text-[var(--color-primary)]">
          Cookie &amp; Local Storage Technologies Policy
        </Link>
        , and our{' '}
        <Link href="/shipping-returns" className="underline text-[var(--text-main)] hover:text-[var(--color-primary)]">
          Islandwide Courier Dispatch Disclosures
        </Link>
        . Please select your preferred language (and, where applicable, regional variation) from the list below to view our
        Global Privacy Policy.
      </p>

      {/* Regional & Language Variations List (Matches Etsy Privacy Policy bullet list) */}
      <ul className="list-disc pl-6 space-y-2 py-2">
        {REGIONAL_POLICY_VARIATIONS.map((item) => (
          <li key={item.lang} className="text-sm text-[var(--text-main)]">
            <span className="font-medium">{item.lang}</span> -{' '}
            <button
              type="button"
              onClick={() => setSelectedLang(item.lang)}
              className={`underline text-left transition-colors ${
                selectedLang === item.lang ? 'text-[var(--color-primary)] font-semibold' : 'hover:text-[var(--color-primary)]'
              }`}
            >
              {item.label}
            </button>
          </li>
        ))}
      </ul>

      {/* Detailed Bookstore Privacy Sections */}
      <div className="mt-8 pt-6 border-t border-[var(--border-subtle)] space-y-5">
        <div className="inline-block px-3 py-1 rounded-full bg-[var(--bg-wash)] border border-[var(--border-subtle)] text-xs font-semibold text-[var(--text-main)]">
          Viewing: {selectedLang} Edition
        </div>

        <section className="space-y-2">
          <h2 className="font-heading font-bold text-lg sm:text-xl font-bold text-[var(--text-main)]">
            1. Information We Collect When You Browse or Order Books
          </h2>
          <p className="text-sm text-[var(--text-muted)] leading-relaxed">
            When you add treatises to your Shopping Bag, curate reading boards, or place an islandwide LKR order, we collect
            only the essential details required to fulfill your order: your name, Sri Lankan district delivery address, contact
            telephone number for courier coordination, and payment confirmation. Saved reading boards and Bag items are also
            persisted locally in your browser so you never lose your curated manuscripts.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="font-heading font-bold text-lg sm:text-xl font-bold text-[var(--text-main)]">
            2. Scholarly Citations, Reviews &amp; Manuscript Submissions
          </h2>
          <p className="text-sm text-[var(--text-muted)] leading-relaxed">
            If you submit a palm-leaf transcription, scholarly review, or digitization grant application, your attributed scholar
            name and institutional affiliation (e.g., University of Peradeniya, Pirivena Archive) are displayed publicly only
            with your explicit consent.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="font-heading font-bold text-lg sm:text-xl font-bold text-[var(--text-main)]">
            3. Your Data Rights &amp; Privacy Settings
          </h2>
          <p className="text-sm text-[var(--text-muted)] leading-relaxed">
            You may inspect, export, or clear your saved reading lists, Bag history, and marketing preferences at any time via{' '}
            <Link href="/profile/settings" className="underline text-[var(--text-main)] hover:text-[var(--color-primary)]">
              Privacy Settings
            </Link>{' '}
            or by contacting our Data Protection Archivist at{' '}
            <span className="font-medium text-[var(--text-main)]">privacy@shastraloka.lk</span>.
          </p>
        </section>
      </div>
    </HouseRulesLayout>
  );
}
