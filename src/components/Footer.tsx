'use client';

import React from 'react';

export default function Footer() {
  return (
    <footer className="mt-20 border-t border-[var(--border-subtle)] bg-[var(--bg-wash)] text-[var(--text-muted)] transition-colors">
      <div className="max-w-[1720px] mx-auto px-4 sm:px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          
          {/* Brand & Philosophy */}
          <div className="space-y-3">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-[#e60023] flex items-center justify-center text-white font-sinhala font-bold text-sm">
                ශ
              </div>
              <span className="font-serif font-bold text-lg text-[var(--text-main)]">
                Shastraloka.lk
              </span>
            </div>
            <p className="text-xs leading-relaxed text-[var(--text-muted)]">
              An infinite visual sanctuary dedicated to preserving Sri Lanka&apos;s classical historical chronicles, Theravada Buddhist treatises, Sinhala Kavya poetry, and indigenous medical texts.
            </p>
            <p className="font-sinhala font-bold text-xs text-amber-700 dark:text-amber-400">
              ධම්මෝ හවේ රක්ඛති ධම්මචාරී • ධර්මය රකින්නා ධර්මය විසින් රකිනු ලබයි
            </p>
          </div>

          {/* Core Traditions */}
          <div>
            <h4 className="font-bold text-xs uppercase tracking-wider text-[var(--text-main)] mb-3">
              Sacred Traditions
            </h4>
            <ul className="space-y-2 text-xs">
              <li><a href="#feed" className="hover:text-[#e60023] transition-colors">Mahavamsa & Ancient Chronicles</a></li>
              <li><a href="#feed" className="hover:text-[#e60023] transition-colors">Theravada Buddhist Philosophy</a></li>
              <li><a href="#feed" className="hover:text-[#e60023] transition-colors">Classical Sinhala Sandesha Poetry</a></li>
              <li><a href="#feed" className="hover:text-[#e60023] transition-colors">Deshiya Wedakama (Indigenous Medicine)</a></li>
              <li><a href="#feed" className="hover:text-[#e60023] transition-colors">Temple Architecture & Vastu Vidya</a></li>
            </ul>
          </div>

          {/* Editions & Craftsmanship */}
          <div>
            <h4 className="font-bold text-xs uppercase tracking-wider text-[var(--text-main)] mb-3">
              Binding & Craft
            </h4>
            <ul className="space-y-2 text-xs">
              <li><span className="hover:text-[var(--text-main)]">Ola Leaf Collector Boxes</span></li>
              <li><span className="hover:text-[var(--text-main)]">Deluxe Gold Foil Embossed Hardcovers</span></li>
              <li><span className="hover:text-[var(--text-main)]">Royal Silkbound Collector Editions</span></li>
              <li><span className="hover:text-[var(--text-main)]">Archival Acid-Free Preserved Paper</span></li>
              <li><span className="hover:text-[var(--text-main)]">Complete Pali Canon & Sinhala Translations</span></li>
            </ul>
          </div>

          {/* Customer Care in Sri Lanka */}
          <div>
            <h4 className="font-bold text-xs uppercase tracking-wider text-[var(--text-main)] mb-3">
              Delivery in Sri Lanka
            </h4>
            <ul className="space-y-2 text-xs">
              <li><span className="hover:text-[var(--text-main)]">Colombo Same-Day / 1-Day Delivery</span></li>
              <li><span className="hover:text-[var(--text-main)]">Island-wide Courier to All 9 Provinces</span></li>
              <li><span className="hover:text-[var(--text-main)]">Cash on Delivery (COD) Available</span></li>
              <li><span className="hover:text-[var(--text-main)]">University & Pirivena Orders</span></li>
            </ul>
          </div>

        </div>

        {/* Bottom Credits */}
        <div className="pt-8 mt-8 border-t border-[var(--border-subtle)] flex flex-col sm:flex-row items-center justify-between text-xs gap-3">
          <p>© 2026 Shastraloka.lk • Preserving Sri Lankan Classical Literature & Sacred Treatises.</p>
          <div className="flex items-center gap-4">
            <span className="hover:text-[#e60023] cursor-pointer">Colombo, Sri Lanka</span>
            <span>•</span>
            <span className="hover:text-[#e60023] cursor-pointer">support@shastraloka.lk</span>
            <span>•</span>
            <span className="text-[#e60023] font-bold">Made in Sri Lanka</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
