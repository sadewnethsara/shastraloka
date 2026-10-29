'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import HouseRulesLayout from '../../components/HouseRulesLayout';
import { Handbag, Truck, Gift, BookOpen, ShieldCheck, MessageSquare } from 'lucide-react';

const FAQ_ITEMS = [
  {
    q: 'How do I track my islandwide LKR book order?',
    a: 'Visit the Track Order page (/track-order) or your Orders History (/orders) and enter your order ID (e.g., ORD-9482) to view live courier checkpoints across all 25 districts of Sri Lanka.',
  },
  {
    q: 'Can I order both Sinhala and English scholarly editions in the same Shopping Bag?',
    a: 'Yes! Your Shopping Bag supports any combination of Sinhala, Pali, Sanskrit, and English critical editions, as well as Hardbound, Paperback, and Palm-Leaf Facsimile bindings.',
  },
  {
    q: 'How do Shastraloka Gift Cards and festival offer codes work?',
    a: 'You can purchase instant digital or printable LKR Gift Cards on /gift-cards, or apply storewide promotional codes (like SHASTRA30) inside your Shopping Bag or Checkout.',
  },
  {
    q: 'Do you supply books in bulk to Pirivenas, schools, and university libraries?',
    a: 'Yes. Institutional orders receive a 20%–35% academic grant discount and tax invoice. Contact our Curator Desk on /contact or apply via /scholars/grants.',
  },
];

export default function HelpPage() {
  const [filterText, setFilterText] = useState('');

  const filteredFaqs = FAQ_ITEMS.filter(
    (item) =>
      !filterText.trim() ||
      item.q.toLowerCase().includes(filterText.toLowerCase()) ||
      item.a.toLowerCase().includes(filterText.toLowerCase())
  );

  return (
    <HouseRulesLayout activeSlug="help" title="Help Center & House Rules" lastUpdated="29 Oct, 2026">
      <p>
        Need assistance with an archival edition, islandwide courier dispatch, or gift card? Browse our quick help topics below
        or filter frequently asked questions.
      </p>

      {/* Topic Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 my-6">
        <Link
          href="/track-order"
          className="p-4 rounded-2xl bg-[var(--bg-surface)] border border-[var(--border-subtle)] hover:border-[var(--border-strong)] transition-all group"
        >
          <Truck className="w-5 h-5 text-[#F1641E] mb-2" />
          <h3 className="text-sm font-bold text-[var(--text-main)] group-hover:text-[#F1641E]">Track a Dispatch</h3>
          <p className="text-xs text-[var(--text-muted)] mt-1">Live Sri Lanka courier status &amp; delivery ETA</p>
        </Link>

        <Link
          href="/bag"
          className="p-4 rounded-2xl bg-[var(--bg-surface)] border border-[var(--border-subtle)] hover:border-[var(--border-strong)] transition-all group"
        >
          <Handbag className="w-5 h-5 text-[#F1641E] mb-2" />
          <h3 className="text-sm font-bold text-[var(--text-main)] group-hover:text-[#F1641E]">Shopping Bag &amp; Payment</h3>
          <p className="text-xs text-[var(--text-muted)] mt-1">LKR cards, LankaQR, Bank Transfer &amp; COD</p>
        </Link>

        <Link
          href="/gift-cards"
          className="p-4 rounded-2xl bg-[var(--bg-surface)] border border-[var(--border-subtle)] hover:border-[var(--border-strong)] transition-all group"
        >
          <Gift className="w-5 h-5 text-[#F1641E] mb-2" />
          <h3 className="text-sm font-bold text-[var(--text-main)] group-hover:text-[#F1641E]">Gift Cards &amp; Vouchers</h3>
          <p className="text-xs text-[var(--text-muted)] mt-1">Send or redeem a Shastraloka literary gift card</p>
        </Link>
      </div>

      {/* Filter FAQ input */}
      <div className="mb-4">
        <input
          type="text"
          value={filterText}
          onChange={(e) => setFilterText(e.target.value)}
          placeholder="Filter help questions (e.g., courier, gift card, pirivena)..."
          className="w-full px-4 py-2.5 rounded-xl border border-[var(--border-strong)] bg-[var(--bg-input)] text-xs sm:text-sm text-[var(--text-main)] placeholder:text-[var(--text-muted)] focus:outline-none"
        />
      </div>

      {/* FAQ Accordion List */}
      <div className="space-y-3">
        {filteredFaqs.map((faq) => (
          <div
            key={faq.q}
            className="p-4 rounded-2xl bg-[var(--bg-surface)] border border-[var(--border-subtle)] space-y-1.5"
          >
            <h3 className="text-sm font-bold text-[var(--text-main)] flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-[#F1641E] shrink-0" />
              {faq.q}
            </h3>
            <p className="text-xs sm:text-sm text-[var(--text-muted)] leading-relaxed pl-6">{faq.a}</p>
          </div>
        ))}
      </div>

      {/* Official House Rules Directory */}
      <div className="mt-8 p-5 rounded-2xl bg-[var(--bg-wash)] border border-[var(--border-subtle)] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-sm font-bold text-[var(--text-main)]">
            <ShieldCheck className="w-4 h-4 text-[#F1641E]" />
            Still need a human archivist?
          </div>
          <p className="text-xs text-[var(--text-muted)]">
            Our Colombo &amp; Peradeniya scholarly support desk responds within 4 hours.
          </p>
        </div>
        <Link
          href="/contact"
          className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full bg-[var(--pill-active-bg)] text-[var(--pill-active-text)] text-xs font-semibold shrink-0"
        >
          <MessageSquare className="w-3.5 h-3.5" />
          Contact Curator Desk
        </Link>
      </div>
    </HouseRulesLayout>
  );
}
