'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Accordion } from './ui/Accordion';

export const FOOTER_COLUMNS = [
  {
    title: 'Treatises',
    links: [
      'Mahavamsa & Chulavamsa',
      'Buddhist Philosophy',
      'Sinhala Classical Kavya',
      'Indigenous Ayurveda',
      'Temple Architecture',
      'Ola Leaf Manuscripts',
    ],
  },
  {
    title: 'Scholars & Temples',
    links: [
      'Submit a Manuscript',
      'Digitization Grants',
      'University Affiliates',
      'Temple Library Program',
    ],
  },
  {
    title: 'About',
    links: [
      'Shastraloka Heritage Inc.',
      'Preservation Policies',
      'Historical Archives',
      'Careers & Research',
      'Press Releases',
      'Cultural Impact',
    ],
  },
  {
    title: 'Help',
    links: ['Help Center', 'Shipping & Delivery', 'Privacy settings', 'Contact Us'],
  },
];

export default function Footer() {
  const router = useRouter();
  const [openFooterSection, setOpenFooterSection] = useState<string | null>(null);

  const toggleFooterAccordion = (title: string) => {
    setOpenFooterSection((prev) => (prev === title ? null : title));
  };

  const navigateToSearch = (term: string) => {
    router.push(`/search?q=${encodeURIComponent(term)}`);
  };

  return (
    <footer className="bg-[#F4F2ED] dark:bg-[#18181e] text-[#222222] dark:text-neutral-200 pt-10 sm:pt-12 pb-8 border-t border-neutral-300/80 dark:border-neutral-800 transition-colors">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* DESKTOP FOOTER */}
        <div className="hidden lg:block">
          <h2
            className="text-[28px] leading-[1.2] text-[#222222] dark:text-white max-w-sm mb-8 font-bold"
            style={{ fontFamily: 'Georgia, Cambria, "Times New Roman", Times, serif' }}
          >
            We&apos;re on a mission to
            <br />
            keep sacred wisdom alive.
          </h2>

          <div className="grid grid-cols-12 gap-8 items-end pb-10">
            <div className="col-span-8 grid grid-cols-4 gap-6">
              {FOOTER_COLUMNS.map((col) => (
                <div key={col.title}>
                  <h3 className="text-xs font-bold text-[#222222] dark:text-white mb-3">
                    {col.title}
                  </h3>
                  <ul className="space-y-2">
                    {col.links.map((link) => (
                      <li key={link}>
                        <button
                          type="button"
                          onClick={() => navigateToSearch(link)}
                          className="text-xs text-neutral-600 dark:text-neutral-400 hover:underline cursor-pointer text-left transition-colors"
                        >
                          {link}
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            {/* Classical Sri Lankan Scholar & Palm Leaf Illustration */}
            <div className="col-span-4 flex justify-end">
              <svg
                viewBox="0 0 260 150"
                className="w-56 h-auto select-none"
                aria-hidden="true"
              >
                <circle cx="95" cy="40" r="14" fill="#F1641E" opacity="0.3" />
                <circle cx="80" cy="70" r="12" fill="#F1641E" />
                <path d="M58 140 C58 102, 102 102, 102 140 Z" fill="#F48C56" />
                <rect
                  x="110"
                  y="45"
                  width="64"
                  height="56"
                  rx="4"
                  fill="#FFFFFF"
                  stroke="#222222"
                  strokeWidth="3"
                />
                <path
                  d="M120 85 L138 62 L152 78 L164 68"
                  stroke="#F1641E"
                  strokeWidth="4"
                  strokeLinecap="round"
                  fill="none"
                />
                <circle cx="130" cy="58" r="5" fill="#F1641E" />
                <circle cx="192" cy="66" r="13" fill="#23232F" />
                <path d="M155 140 L172 95 L215 95 L230 140 Z" fill="#23232F" />
                <path
                  d="M155 102 L135 80"
                  stroke="#23232F"
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
              className="bg-black text-white px-3.5 py-1.5 rounded-lg flex items-center gap-2 hover:opacity-90 transition cursor-pointer"
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
              className="bg-black text-white px-3.5 py-1.5 rounded-lg flex items-center gap-2 hover:opacity-90 transition cursor-pointer"
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

        {/* TABLET & MOBILE FOOTER */}
        <div className="lg:hidden space-y-5 pb-6">
          <div className="w-12 h-12 rounded-xl bg-[#F1641E] text-white flex items-center justify-center shadow-xs">
            <span
              className="font-serif text-2xl font-bold"
              style={{ fontFamily: 'Georgia, Cambria, "Times New Roman", Times, serif' }}
            >
              S
            </span>
          </div>

          {/* Collapsible Accordions for 4 Columns */}
          <div className="divide-y divide-neutral-300/70 dark:divide-neutral-800 border-y border-neutral-300/70 dark:border-neutral-800">
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
                        className="text-xs text-neutral-600 dark:text-neutral-400 hover:underline block py-0.5"
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
              className="bg-black text-white px-3.5 py-1.5 rounded-lg flex items-center gap-2"
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
              className="bg-black text-white px-3.5 py-1.5 rounded-lg flex items-center gap-2"
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

        {/* BOTTOM LEGAL & REGION BAR */}
        <div className="pt-5 border-t border-neutral-300/70 dark:border-neutral-800 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 text-[11px] text-neutral-600 dark:text-neutral-400">
          <div className="flex items-center gap-5">
            <span className="inline-flex items-center gap-1.5 font-semibold text-[#222222] dark:text-neutral-200">
              <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="10" />
                <line x1="2" y1="12" x2="22" y2="12" />
                <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
              </svg>
              <span>Sri Lanka (LKR)</span>
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5">
            <span>&copy; 2026 Shastraloka Heritage, Inc.</span>
            <a href="#terms" className="underline hover:text-black dark:hover:text-white">Terms of Use</a>
            <a href="#privacy" className="underline hover:text-black dark:hover:text-white">Privacy Policy</a>
            <a href="#archives" className="underline hover:text-black dark:hover:text-white">Temple Archives</a>
            <a href="#regional" className="underline hover:text-black dark:hover:text-white">Preservation Program</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
