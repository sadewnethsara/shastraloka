'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Search, ChevronDown, KeyRound, ScrollText, Truck, HelpCircle, ShieldCheck } from 'lucide-react';
import Header from './Header';
import Footer from './Footer';

interface HouseRulesLayoutProps {
  activeSlug: 'privacy' | 'terms' | 'shipping-returns' | 'help';
  title: string;
  lastUpdated?: string;
  children: React.ReactNode;
}

const HOUSE_RULE_PAGES = [
  { slug: 'privacy', label: 'Privacy Policy', href: '/privacy' },
  { slug: 'terms', label: 'Terms of Use', href: '/terms' },
  { slug: 'shipping-returns', label: 'Shipping & Returns Policy', href: '/shipping-returns' },
  { slug: 'help', label: 'Help Center & Buyer Protection', href: '/help' },
];

export const REGIONAL_POLICY_VARIATIONS = [
  { lang: 'සිංහල', label: 'ශාස්ත්‍රලෝක පෞද්ගලිකත්ව සහ පුස්තකාල ප්‍රතිපත්තිය (Sri Lanka)' },
  { lang: 'English - Sri Lanka', label: 'Shastraloka Global & Islandwide Policy (LKR)' },
  { lang: 'English - India', label: 'Shastraloka South Asian Indology Policy' },
  { lang: 'English - UK', label: 'Shastraloka Commonwealth & British Library Dispatch Policy' },
  { lang: 'English - US', label: 'Shastraloka North American Scholarly Policy' },
  { lang: 'தமிழ் - இலங்கை', label: 'சாஸ்திரலோக தனியுரிமைக் கொள்கை (Sri Lanka Tamil)' },
  { lang: 'Pali / Monastic', label: 'Mahavihara & Pirivena Archival Access Charter' },
  { lang: 'Deutsch', label: 'Shastraloka: Datenschutzrichtlinie für Indologie' },
  { lang: 'Français', label: 'Shastraloka: Règlement concernant la confidentialité' },
  { lang: '日本語', label: 'シャストラローカ：仏教学・プライバシーポリシー' },
];

export default function HouseRulesLayout({
  activeSlug,
  title,
  lastUpdated = '29 Oct, 2026',
  children,
}: HouseRulesLayoutProps) {
  const router = useRouter();
  const [policyQuery, setPolicyQuery] = useState('');
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const handlePolicySearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!policyQuery.trim()) return;
    router.push(`/help?q=${encodeURIComponent(policyQuery.trim())}`);
  };

  const renderIcon = () => {
    switch (activeSlug) {
      case 'privacy':
        return <KeyRound className="w-12 h-12 text-[var(--text-main)] stroke-[1.35]" />;
      case 'terms':
        return <ScrollText className="w-12 h-12 text-[var(--text-main)] stroke-[1.35]" />;
      case 'shipping-returns':
        return <Truck className="w-12 h-12 text-[var(--text-main)] stroke-[1.35]" />;
      default:
        return <HelpCircle className="w-12 h-12 text-[var(--text-main)] stroke-[1.35]" />;
    }
  };

  return (
    <div className="min-h-screen bg-[var(--bg-main)] text-[var(--text-main)] flex flex-col">
      <Header isSticky />

      {/* Top Bar: "Our House Rules" + "Search our policies" (Matches Etsy Legal Privacy screenshot) */}
      <div className="border-b border-[var(--border-subtle)] bg-[var(--bg-surface)]">
        <div className="page-container py-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h2 className="font-heading font-bold text-xl sm:text-2xl font-bold text-[var(--text-main)]">
              Our House Rules
            </h2>
            <p className="text-xs sm:text-sm text-[var(--text-muted)] mt-0.5">
              Get to know Shastraloka&apos;s legal terms, preservation charters, and bookstore policies
            </p>
          </div>

          <form onSubmit={handlePolicySearch} className="w-full sm:w-80 relative flex items-center">
            <input
              type="text"
              value={policyQuery}
              onChange={(e) => setPolicyQuery(e.target.value)}
              placeholder="Search our policies"
              className="w-full pl-4 pr-11 py-2.5 rounded-xl border border-[var(--border-strong)] bg-[var(--bg-input)] text-xs sm:text-sm text-[var(--text-main)] placeholder:text-[var(--text-muted)] focus:outline-none"
            />
            <button
              type="submit"
              aria-label="Search policies"
              className="absolute right-2 w-8 h-8 rounded-lg flex items-center justify-center text-[var(--text-main)] hover:bg-[var(--bg-hover)]"
            >
              <Search className="w-4 h-4" />
            </button>
          </form>
        </div>
      </div>

      {/* Main Centered Policy Column */}
      <article className="flex-1 w-full max-w-[760px] mx-auto px-4 sm:px-6 pt-10 sm:pt-14 pb-20">
        {/* Breadcrumb with Policy Switcher Dropdown */}
        <div className="flex items-center gap-2 text-xs text-[var(--text-muted)] mb-3 relative">
          <Link href="/help" className="underline hover:text-[var(--text-main)]">
            Our House Rules
          </Link>
          <span>/</span>
          <div className="relative">
            <button
              type="button"
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="inline-flex items-center gap-1 font-medium text-[var(--text-main)] underline underline-offset-4"
            >
              {title}
              <ChevronDown className="w-3.5 h-3.5" />
            </button>
            {dropdownOpen && (
              <div className="absolute left-0 top-full mt-2 w-60 rounded-2xl bg-[var(--bg-surface)] border border-[var(--border-strong)] shadow-xl py-1.5 z-30">
                {HOUSE_RULE_PAGES.map((p) => (
                  <Link
                    key={p.slug}
                    href={p.href}
                    onClick={() => setDropdownOpen(false)}
                    className={`block px-4 py-2 text-xs sm:text-sm transition-colors ${
                      p.slug === activeSlug
                        ? 'bg-[var(--bg-wash)] font-semibold text-[#F1641E]'
                        : 'text-[var(--text-main)] hover:bg-[var(--bg-hover)]'
                    }`}
                  >
                    {p.label}
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Title + Key/Scroll Line-Art Emblem */}
        <div className="flex items-center justify-between gap-6 pb-6 mb-8 border-b border-[var(--border-subtle)]">
          <h1 className="font-heading font-bold text-3xl sm:text-4xl md:text-[42px] font-normal text-[var(--text-main)] tracking-tight">
            {title}
          </h1>
          <div className="w-20 h-20 rounded-2xl bg-[var(--bg-wash)] border border-[var(--border-subtle)] flex items-center justify-center shrink-0">
            {renderIcon()}
          </div>
        </div>

        {/* Policy Body Content */}
        <div className="space-y-6 text-sm sm:text-[15px] text-[var(--text-body)] leading-relaxed">
          {children}
        </div>

        {/* Last updated footer */}
        <div className="mt-10 pt-6 border-t border-[var(--border-subtle)] flex flex-wrap items-center justify-between gap-4 text-xs text-[var(--text-muted)]">
          <span>Last updated on {lastUpdated}</span>
          <span className="inline-flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-[#F1641E]" />
            Verified under Sri Lanka Personal Data Protection Act &amp; Literary Heritage Charter
          </span>
        </div>
      </article>

      <Footer />
    </div>
  );
}
