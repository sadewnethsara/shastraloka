'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Accordion } from './ui/Accordion';

export const FOOTER_COLUMNS = [
  {
    title: 'Shop & Discover',
    links: [
      'Gift cards',
      'Books Storefront',
      'Special Offers & Deals',
      'Best Sellers',
      'New Arrivals & Releases',
      'Archival & Vintage Finds',
    ],
  },
  {
    title: 'Scholars & Temples',
    links: [
      'Submit a Manuscript',
      'Digitization Grants',
      'Authors & Scholars',
      'Publishers & Guilds',
    ],
  },
  {
    title: 'About',
    links: [
      'Shastraloka Heritage Inc.',
      'Preservation Policies',
      'Historical Archives',
      'Terms of Use',
      'Privacy Policy',
    ],
  },
  {
    title: 'Help',
    links: [
      'Help Center',
      'Shipping & Delivery',
      'Track Order',
      'Privacy settings',
      'Contact Us',
    ],
  },
];

const FOOTER_LINK_ROUTES: Record<string, string> = {
  'Gift cards': '/gift-cards',
  'Books Storefront': '/books',
  'Special Offers & Deals': '/offers',
  'Best Sellers': '/bestsellers',
  'New Arrivals & Releases': '/new-releases',
  'Archival & Vintage Finds': '/archives',
  'Submit a Manuscript': '/scholars/submit-manuscript',
  'Digitization Grants': '/scholars/grants',
  'Authors & Scholars': '/authors',
  'Publishers & Guilds': '/publishers',
  'Shastraloka Heritage Inc.': '/about',
  'Preservation Policies': '/terms',
  'Historical Archives': '/archives',
  'Terms of Use': '/terms',
  'Privacy Policy': '/privacy',
  'Help Center': '/help',
  'Shipping & Delivery': '/shipping-returns',
  'Track Order': '/track-order',
  'Privacy settings': '/privacy',
  'Contact Us': '/contact',
};

export default function Footer() {
  const router = useRouter();
  const [openFooterSection, setOpenFooterSection] = useState<string | null>(null);

  const toggleFooterAccordion = (title: string) => {
    setOpenFooterSection((prev) => (prev === title ? null : title));
  };

  const navigateToSearch = (term: string) => {
    const mappedRoute = FOOTER_LINK_ROUTES[term];
    if (mappedRoute) {
      router.push(mappedRoute);
    } else {
      router.push(`/search?q=${encodeURIComponent(term)}`);
    }
  };

  return (
    <footer className="bg-[var(--footer-bg)] text-[var(--text-main)] pt-10 sm:pt-12 pb-8 border-t border-[var(--border-subtle)] transition-colors w-full overflow-hidden">
      <div className="page-container box-border">
        {/* DESKTOP & TABLET FOOTER (md and up) */}
        <div className="hidden md:block">
          {/* Top Header Row: Mission Statement + Tablet Illustration (on md to lg) */}
          <div className="flex items-center justify-between gap-6 mb-8 pb-6 border-b border-[var(--border-subtle)] lg:border-b-0 lg:pb-0">
            <div>
              <div className="inline-flex lg:hidden items-center gap-2.5 mb-2.5">
                <div className="w-8 h-8 rounded-lg bg-[var(--color-primary)] text-white flex items-center justify-center shadow-xs">
                  <span className="font-heading text-lg font-bold">S</span>
                </div>
                <span className="font-heading text-lg font-bold text-[var(--color-primary)] tracking-tight">
                  Shastraloka
                </span>
              </div>
              <h2 className="text-[24px] lg:text-[28px] leading-[1.2] text-[var(--text-main)] max-w-sm font-bold">
                We&apos;re on a mission to
                <br />
                keep sacred wisdom alive.
              </h2>
            </div>

            {/* Tablet-positioned Scholar & Palm Leaf Illustration (md to lg) */}
            <div className="hidden md:flex lg:hidden justify-end shrink-0">
              <svg
                viewBox="0 0 260 150"
                className="w-44 h-auto select-none"
                aria-hidden="true"
              >
                <circle cx="95" cy="40" r="14" fill="var(--color-primary)" opacity="0.3" />
                <circle cx="80" cy="70" r="12" fill="var(--color-primary)" />
                <path d="M58 140 C58 102, 102 102, 102 140 Z" fill="var(--color-primary)" opacity="0.7" />
                <rect
                  x="110"
                  y="45"
                  width="64"
                  height="56"
                  rx="4"
                  fill="var(--bg-card)"
                  stroke="var(--text-main)"
                  strokeWidth="3"
                />
                <path
                  d="M120 85 L138 62 L152 78 L164 68"
                  stroke="var(--color-primary)"
                  strokeWidth="4"
                  strokeLinecap="round"
                  fill="none"
                />
                <circle cx="130" cy="58" r="5" fill="var(--color-primary)" />
                <circle cx="192" cy="66" r="13" fill="var(--text-main)" />
                <path d="M155 140 L172 95 L215 95 L230 140 Z" fill="var(--text-main)" />
                <path
                  d="M155 102 L135 80"
                  stroke="var(--text-main)"
                  strokeWidth="8"
                  strokeLinecap="round"
                />
              </svg>
            </div>
          </div>

          <div className="grid grid-cols-12 gap-8 items-end pb-8 lg:pb-10">
            <div className="col-span-12 lg:col-span-8 grid grid-cols-4 gap-6">
              {FOOTER_COLUMNS.map((col) => (
                <div key={col.title}>
                  <h3 className="text-xs font-bold text-[var(--text-main)] mb-3">
                    {col.title}
                  </h3>
                  <ul className="space-y-2">
                    {col.links.map((link) => (
                      <li key={link}>
                        <button
                          type="button"
                          onClick={() => navigateToSearch(link)}
                          className="text-xs text-[var(--text-muted)] hover:text-[var(--text-main)] hover:underline cursor-pointer text-left transition-colors"
                        >
                          {link}
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            {/* Classical Sri Lankan Scholar & Palm Leaf Illustration (Desktop lg+) */}
            <div className="hidden lg:flex lg:col-span-4 justify-end">
              <svg
                viewBox="0 0 260 150"
                className="w-56 h-auto select-none"
                aria-hidden="true"
              >
                <circle cx="95" cy="40" r="14" fill="var(--color-primary)" opacity="0.3" />
                <circle cx="80" cy="70" r="12" fill="var(--color-primary)" />
                <path d="M58 140 C58 102, 102 102, 102 140 Z" fill="var(--color-primary)" opacity="0.7" />
                <rect
                  x="110"
                  y="45"
                  width="64"
                  height="56"
                  rx="4"
                  fill="var(--bg-card)"
                  stroke="var(--text-main)"
                  strokeWidth="3"
                />
                <path
                  d="M120 85 L138 62 L152 78 L164 68"
                  stroke="var(--color-primary)"
                  strokeWidth="4"
                  strokeLinecap="round"
                  fill="none"
                />
                <circle cx="130" cy="58" r="5" fill="var(--color-primary)" />
                <circle cx="192" cy="66" r="13" fill="var(--text-main)" />
                <path d="M155 140 L172 95 L215 95 L230 140 Z" fill="var(--text-main)" />
                <path
                  d="M155 102 L135 80"
                  stroke="var(--text-main)"
                  strokeWidth="8"
                  strokeLinecap="round"
                />
              </svg>
            </div>
          </div>

          {/* App Store & Google Play Badges */}
          <div className="flex items-center gap-3 pb-8">
            <button
              type="button"
              className="bg-[var(--pill-active-bg)] text-[var(--pill-active-text)] px-3.5 py-1.5 rounded-lg flex items-center gap-2 hover:opacity-90 transition cursor-pointer"
            >
              <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current">
                <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 6.33c.64-.78 1.08-1.86.96-2.94-.93.04-2.06.62-2.72 1.4-.58.68-1.1 1.79-.96 2.84 1.04.08 2.08-.52 2.72-1.3" />
              </svg>
              <div className="text-left">
                <div className="text-[8px] uppercase leading-none opacity-80">
                  Download on the
                </div>
                <div className="text-xs font-semibold leading-tight">App Store</div>
              </div>
            </button>

            <button
              type="button"
              className="bg-[var(--pill-active-bg)] text-[var(--pill-active-text)] px-3.5 py-1.5 rounded-lg flex items-center gap-2 hover:opacity-90 transition cursor-pointer"
            >
              <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current">
                <path d="M3 20.5v-17c0-.83.94-1.3 1.6-.8l14 8.5c.6.37.6 1.23 0 1.6l-14 8.5c-.66.5-1.6.03-1.6-.8z" />
              </svg>
              <div className="text-left">
                <div className="text-[8px] uppercase leading-none opacity-80">
                  GET IT ON
                </div>
                <div className="text-xs font-semibold leading-tight">Google Play</div>
              </div>
            </button>
          </div>
        </div>

        {/* MOBILE FOOTER (< md) */}
        <div className="md:hidden space-y-5 pb-6">
          <div className="w-12 h-12 rounded-xl bg-[var(--color-primary)] text-white flex items-center justify-center shadow-xs">
            <span
              className="font-heading text-2xl font-bold"
            >
              S
            </span>
          </div>

          {/* Collapsible Accordions for 4 Columns */}
          <div className="divide-y divide-[var(--border-subtle)] border-y border-[var(--border-subtle)]">
            {FOOTER_COLUMNS.map((col) => (
              <Accordion
                key={col.title}
                title={col.title}
                isOpen={openFooterSection === col.title}
                onToggle={() => toggleFooterAccordion(col.title)}
              >
                <ul className="space-y-2">
                  {col.links.map((link) => (
                    <li key={link}>
                      <button
                        type="button"
                        onClick={() => navigateToSearch(link)}
                        className="text-xs text-[var(--text-muted)] hover:text-[var(--text-main)] hover:underline block py-0.5"
                      >
                        {link}
                      </button>
                    </li>
                  ))}
                </ul>
              </Accordion>
            ))}
          </div>

          {/* Mobile App Download Badges */}
          <div className="flex items-center gap-3 pt-1">
            <button
              type="button"
              className="bg-[var(--pill-active-bg)] text-[var(--pill-active-text)] px-3.5 py-1.5 rounded-lg flex items-center gap-2"
            >
              <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current">
                <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 6.33c.64-.78 1.08-1.86.96-2.94-.93.04-2.06.62-2.72 1.4-.58.68-1.1 1.79-.96 2.84 1.04.08 2.08-.52 2.72-1.3" />
              </svg>
              <div className="text-left">
                <div className="text-[8px] uppercase leading-none opacity-80">
                  Download on the
                </div>
                <div className="text-xs font-semibold leading-tight">App Store</div>
              </div>
            </button>

            <button
              type="button"
              className="bg-[var(--pill-active-bg)] text-[var(--pill-active-text)] px-3.5 py-1.5 rounded-lg flex items-center gap-2"
            >
              <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current">
                <path d="M3 20.5v-17c0-.83.94-1.3 1.6-.8l14 8.5c.6.37.6 1.23 0 1.6l-14 8.5c-.66.5-1.6.03-1.6-.8z" />
              </svg>
              <div className="text-left">
                <div className="text-[8px] uppercase leading-none opacity-80">
                  GET IT ON
                </div>
                <div className="text-xs font-semibold leading-tight">Google Play</div>
              </div>
            </button>
          </div>
        </div>

        {/* SRI LANKA ONLINE BOOKSTORE & AI DISCOVERY SEO DIRECTORY */}
        <div className="pt-5 pb-4 border-t border-[var(--border-subtle)] text-[11px] text-[var(--text-muted)]">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <p className="font-bold text-[var(--text-main)]">
              Shastraloka (ශාස්ත්රාලෝක | ශාස්ත්‍රලෝක) — Sri Lanka&apos;s Premier Online Bookstore
            </p>
            <div className="flex items-center gap-3 font-semibold text-[var(--color-primary)]">
              <a href="https://shastraloka.lk" className="hover:underline">
                shastraloka.lk
              </a>
              <span>•</span>
              <a href="https://shastraloka.lk" className="hover:underline">
                shastraloka.lk
              </a>
            </div>
          </div>
        </div>

        {/* BOTTOM LEGAL & REGION BAR */}
        <div className="pt-4 border-t border-[var(--border-subtle)] flex flex-col items-center text-center md:flex-row md:items-center md:justify-between md:text-left gap-4 text-[11px] text-[var(--text-muted)]">
          <div className="flex flex-wrap items-center justify-center md:justify-start gap-4">
            <span className="inline-flex items-center gap-1.5 font-semibold text-[var(--text-main)]">
              <svg className="w-3.5 h-3.5 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="10" />
                <line x1="2" y1="12" x2="22" y2="12" />
                <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
              </svg>
              <span>Sri Lanka (LKR) • shastraloka.lk | Royal Archival Editions</span>
            </span>
          </div>

          <div className="flex flex-wrap items-center justify-center md:justify-end gap-x-4 gap-y-1.5 text-center md:text-right">
            <span>&copy; 2026 Shastraloka (ශාස්ත්රාලෝක) Heritage, Inc. All rights reserved.</span>
            <a href="/terms" className="underline hover:text-[var(--text-main)]">Terms of Use</a>
            <a href="/privacy" className="underline hover:text-[var(--text-main)]">Privacy Policy</a>
            <a href="/sitemap.xml" className="underline hover:text-[var(--text-main)]">Sitemap XML</a>
            <a href="/llms.txt" className="underline hover:text-[var(--text-main)]">AI &amp; LLM Index</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
