'use client';

import React from 'react';
import Link from 'next/link';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { BookOpen, Award, Globe, Sparkles, ShieldCheck, ArrowRight } from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[var(--bg-main)] text-[var(--text-main)] flex flex-col">
      <Header isSticky />
      <main className="flex-1 pb-20">
      {/* Hero Banner */}
      <section className="bg-[var(--hero-banner-bg)] border-b border-[var(--border-subtle)] py-14 sm:py-20">
        <div className="page-container text-center">
          <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[var(--bg-surface)] border border-[var(--border-subtle)] text-xs font-semibold text-[#F1641E] mb-4">
            <Sparkles className="w-3.5 h-3.5" /> Shastraloka • Heritage Inc.
          </span>
          <h1 className="font-heading font-bold text-3xl sm:text-5xl font-normal text-[var(--text-main)] leading-tight max-w-3xl mx-auto">
            We&apos;re on a mission to keep Sri Lanka&apos;s literary heritage alive and accessible.
          </h1>
          <p className="text-sm sm:text-base text-[var(--text-muted)] max-w-2xl mx-auto mt-4 leading-relaxed">
            Founded in Colombo and Kandy, Shastraloka bridges ancient palm-leaf (ola) scriptoriums, royal court chronicles,
            and contemporary Sinhala, Pali, Sanskrit, and English scholarship in one curated bookstore.
          </p>
        </div>
      </section>

      {/* Stats Strip */}
      <section className="page-container -mt-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-6 rounded-3xl bg-[var(--bg-surface)] border border-[var(--border-subtle)] shadow-sm">
          <div className="text-center">
            <p className="font-heading font-bold text-2xl sm:text-3xl font-bold text-[var(--text-main)]">12,400+</p>
            <p className="text-xs text-[var(--text-muted)] mt-1">Catalogued Titles &amp; Folios</p>
          </div>
          <div className="text-center">
            <p className="font-heading font-bold text-2xl sm:text-3xl font-bold text-[var(--text-main)]">25 Districts</p>
            <p className="text-xs text-[var(--text-muted)] mt-1">Insured Islandwide Delivery</p>
          </div>
          <div className="text-center">
            <p className="font-heading font-bold text-2xl sm:text-3xl font-bold text-[var(--text-main)]">48 Guilds</p>
            <p className="text-xs text-[var(--text-muted)] mt-1">Partner Presses &amp; Pirivenas</p>
          </div>
          <div className="text-center">
            <p className="font-heading font-bold text-2xl sm:text-3xl font-bold text-[var(--text-main)]">100% Archival</p>
            <p className="text-xs text-[var(--text-muted)] mt-1">Acid-Free Paper &amp; Binding</p>
          </div>
        </div>
      </section>

      {/* Pillars */}
      <section className="page-container py-16 grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-6 rounded-3xl bg-[var(--bg-surface)] border border-[var(--border-subtle)] space-y-3">
          <BookOpen className="w-7 h-7 text-[#F1641E]" />
          <h2 className="font-heading font-bold text-xl font-normal text-[var(--text-main)]">
            Authentic Critical Editions
          </h2>
          <p className="text-xs sm:text-sm text-[var(--text-muted)] leading-relaxed">
            Every edition of the <em>Mahavamsa</em>, <em>Chulavamsa</em>, <em>Sidatsangarava</em>, and <em>Sandesha Kavya</em>{' '}
            is vetted by senior philologists and printed with complete word-for-word glossaries.
          </p>
        </div>

        <div className="p-6 rounded-3xl bg-[var(--bg-surface)] border border-[var(--border-subtle)] space-y-3">
          <Award className="w-7 h-7 text-[#F1641E]" />
          <h2 className="font-heading font-bold text-xl font-normal text-[var(--text-main)]">
            Supporting Local Artisans &amp; Scholars
          </h2>
          <p className="text-xs sm:text-sm text-[var(--text-muted)] leading-relaxed">
            Royalties from every Shopping Bag directly fund palm-leaf conservation grants and traditional Kandyan bookbinders.
          </p>
        </div>

        <div className="p-6 rounded-3xl bg-[var(--bg-surface)] border border-[var(--border-subtle)] space-y-3">
          <Globe className="w-7 h-7 text-[#F1641E]" />
          <h2 className="font-heading font-bold text-xl font-normal text-[var(--text-main)]">
            Dual-Domain Cultural Access
          </h2>
          <p className="text-xs sm:text-sm text-[var(--text-muted)] leading-relaxed">
            Accessible globally via both <strong>shastraloka.lk</strong> and native Sinhala IDN{' '}
            <strong className="font-sinhala">ශාස්ත්රාලෝක.ලංකා</strong> for seamless discovery.
          </p>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="page-container">
        <div className="p-8 sm:p-10 rounded-3xl bg-[var(--banner-guild-bg)] border border-[var(--banner-guild-border)] flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[var(--banner-guild-accent)]">
              <ShieldCheck className="w-4 h-4" /> Preservation Charter
            </div>
            <h2 className="font-heading font-bold text-2xl sm:text-3xl text-[var(--banner-guild-text)]">
              Explore the Shastraloka Books Storefront
            </h2>
            <p className="text-xs sm:text-sm text-[var(--banner-guild-muted)] max-w-xl">
              Browse our curated best sellers, rare archival facsimiles, or apply for a manuscript digitization grant.
            </p>
          </div>
          <div className="flex flex-wrap gap-3 shrink-0">
            <Link
              href="/books"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[var(--pill-active-bg)] text-[var(--pill-active-text)] text-xs sm:text-sm font-semibold"
            >
              Browse Books Store <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/scholars/grants"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-[var(--border-strong)] bg-[var(--bg-surface)] text-[var(--text-main)] text-xs sm:text-sm font-semibold"
            >
              Digitization Grants
            </Link>
          </div>
        </div>
      </section>
      </main>
      <Footer />
    </div>
  );
}
