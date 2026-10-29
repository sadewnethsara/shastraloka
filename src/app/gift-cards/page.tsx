'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Handbag, Check, HelpCircle, Sparkles, Mail, Printer } from 'lucide-react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import Toast from '../../components/Toast';
import { useApp } from '../../context/AppContext';
import { BOOKS } from '../../data/books';

interface GiftCardDesign {
  id: string;
  name: string;
  subtitle: string;
  bgClass: string;
  textClass: string;
  accentText: string;
}

const GIFT_CARD_DESIGNS: GiftCardDesign[] = [
  {
    id: 'classic-saffron',
    name: 'Classic Saffron',
    subtitle: 'ශාස්ත්‍රලෝක සම්භාව්‍ය',
    bgClass: 'bg-[#F1641E]',
    textClass: 'text-white',
    accentText: 'text-white/85',
  },
  {
    id: 'royal-indigo',
    name: 'Royal Kandyan Indigo',
    subtitle: 'මහනුවර රාජකීය',
    bgClass: 'bg-[#1D3587]',
    textClass: 'text-white',
    accentText: 'text-amber-200',
  },
  {
    id: 'lotus-lavender',
    name: 'Celestial Lotus',
    subtitle: 'නෙළුම් පෙති',
    bgClass: 'bg-[#7A78F0]',
    textClass: 'text-white',
    accentText: 'text-white/90',
  },
  {
    id: 'warm-parchment',
    name: 'Ola Leaf Parchment',
    subtitle: 'පුස්කොළ පත්‍රිකාව',
    bgClass: 'bg-[#FFF5D6]',
    textClass: 'text-[#F1641E]',
    accentText: 'text-[#7A5828]',
  },
  {
    id: 'sky-celebration',
    name: 'Vesak Lantern Sky',
    subtitle: 'වෙසක් ආලෝකය',
    bgClass: 'bg-gradient-to-br from-[#BAE6FD] to-[#7DD3FC]',
    textClass: 'text-[#1E293B]',
    accentText: 'text-[#0369A1]',
  },
  {
    id: 'crimson-seal',
    name: 'Royal Lacquer Seal',
    subtitle: 'රාජකීය මුද්‍රාව',
    bgClass: 'bg-gradient-to-br from-[#7F1D1D] to-[#450A0A]',
    textClass: 'text-[#FDE68A]',
    accentText: 'text-amber-200/80',
  },
  {
    id: 'midnight-stars',
    name: 'Nakshatra Astronomy',
    subtitle: 'නක්ෂත්‍ර තාරකා',
    bgClass: 'bg-gradient-to-br from-[#311042] via-[#1E1B4B] to-[#3B0764]',
    textClass: 'text-amber-300',
    accentText: 'text-purple-200',
  },
  {
    id: 'emerald-sanctuary',
    name: 'Ceylon Tea & Sanctuary',
    subtitle: 'හරිත අභයභූමිය',
    bgClass: 'bg-gradient-to-br from-[#064E3B] to-[#047857]',
    textClass: 'text-white',
    accentText: 'text-emerald-200',
  },
  {
    id: 'sigiriya-ochre',
    name: 'Sigiriya Fresco Gold',
    subtitle: 'සීගිරි සිතුවම්',
    bgClass: 'bg-gradient-to-br from-[#D97706] to-[#92400E]',
    textClass: 'text-white',
    accentText: 'text-amber-100',
  },
  {
    id: 'scriptorium-teal',
    name: 'Monastic Library',
    subtitle: 'පිරිවෙන් පුස්තකාලය',
    bgClass: 'bg-gradient-to-br from-[#0F766E] to-[#115E59]',
    textClass: 'text-white',
    accentText: 'text-teal-100',
  },
  {
    id: 'anuradhapura-stone',
    name: 'Sandakada Pahana',
    subtitle: 'සඳකඩ පහණ',
    bgClass: 'bg-gradient-to-br from-[#374151] to-[#111827]',
    textClass: 'text-amber-200',
    accentText: 'text-gray-300',
  },
  {
    id: 'gajaga-tusker',
    name: 'Gajaga Royal Court',
    subtitle: 'ගජගා වන්නම',
    bgClass: 'bg-gradient-to-br from-[#431407] via-[#7C2D12] to-[#9A3412]',
    textClass: 'text-[#FEF08A]',
    accentText: 'text-orange-200',
  },
];

const PRESET_AMOUNTS = [1500, 2500, 5000, 10000];

export default function GiftCardsPage() {
  const { addToBag, showToast } = useApp();

  const [selectedDesign, setSelectedDesign] = useState<GiftCardDesign>(GIFT_CARD_DESIGNS[0]);
  const [amount, setAmount] = useState<number>(2500);
  const [customAmount, setCustomAmount] = useState<string>('');
  const [deliveryMethod, setDeliveryMethod] = useState<'email' | 'print'>('email');
  const [recipientName, setRecipientName] = useState('');
  const [recipientEmail, setRecipientEmail] = useState('');
  const [message, setMessage] = useState('');
  const [senderName, setSenderName] = useState('');
  const [redeemOpen, setRedeemOpen] = useState(false);
  const [redeemCode, setRedeemCode] = useState('');
  const [justAdded, setJustAdded] = useState(false);

  const finalAmount = customAmount ? Math.max(500, Number(customAmount) || 2500) : amount;

  const handleAddGiftCardToBag = (e: React.FormEvent) => {
    e.preventDefault();
    const baseBook = BOOKS[0];
    const giftCardBook = {
      ...baseBook,
      id: `gift-card-${selectedDesign.id}-${finalAmount}`,
      title: `Shastraloka Gift Card — ${selectedDesign.name} (LKR ${finalAmount.toLocaleString()})`,
      sinhalaTitle: `ශාස්ත්‍රලෝක ත්‍යාග පත්‍රිකාව (${selectedDesign.subtitle})`,
      author: recipientName ? `For ${recipientName}` : 'Shastraloka Literary Gift Voucher',
      price: finalAmount,
      originalPrice: finalAmount,
    };

    addToBag(giftCardBook, 'Royal Silkbound Edition', 1);
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 1800);
  };

  return (
    <div className="min-h-screen bg-[var(--bg-main)] text-[var(--text-main)] flex flex-col">
      <Header isSticky />

      {/* Top Banner (Matching Image 4) */}
      <section className="bg-gradient-to-r from-[#BAE6FD]/60 via-[#E0F2FE] to-[#BAE6FD]/60 dark:from-[#0F172A] dark:via-[#1E293B] dark:to-[#0F172A] border-b border-[var(--border-subtle)] py-8 sm:py-10 px-4 text-center">
        <div className="max-w-2xl mx-auto space-y-2">
          <h1
            className="text-3xl sm:text-4xl font-normal text-[var(--text-main)]"
            style={{ fontFamily: 'Georgia, Cambria, "Times New Roman", Times, serif' }}
          >
            Give the gift of Shastraloka
          </h1>
          <p className="text-xs sm:text-sm text-[var(--text-body)]">
            Are you looking to{' '}
            <button
              type="button"
              onClick={() => setRedeemOpen(!redeemOpen)}
              className="underline font-semibold hover:text-[var(--color-primary)] cursor-pointer"
            >
              redeem a gift card
            </button>
            ?
          </p>

          {redeemOpen && (
            <div className="mt-4 max-w-md mx-auto flex items-center gap-2 bg-[var(--bg-card)] p-2 rounded-xl border border-[var(--border-subtle)] shadow-sm">
              <input
                type="text"
                value={redeemCode}
                onChange={(e) => setRedeemCode(e.target.value)}
                placeholder="Enter 16-digit Shastraloka code (e.g. SHAS-2026-GIFT)"
                className="flex-1 px-3 py-1.5 text-xs bg-transparent text-[var(--text-main)] focus:outline-none"
              />
              <button
                type="button"
                onClick={() => {
                  if (redeemCode.trim()) {
                    showToast(`Gift card ${redeemCode.toUpperCase()} verified! Credit applied to your account.`);
                    setRedeemCode('');
                    setRedeemOpen(false);
                  }
                }}
                className="px-4 py-1.5 rounded-lg bg-[var(--pill-active-bg)] text-[var(--pill-active-text)] text-xs font-bold cursor-pointer"
              >
                Redeem
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Main 2-Column Gift Card Builder (Matching Image 4) */}
      <main className="flex-1 max-w-[1140px] w-full mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
          {/* LEFT COLUMN: Large Live Gift Card Preview + 4x3 Design Picker */}
          <div className="lg:col-span-6 space-y-6">
            {/* Large Gift Card Preview */}
            <div
              className={`aspect-[16/10] w-full rounded-3xl ${selectedDesign.bgClass} ${selectedDesign.textClass} shadow-xl p-8 flex flex-col justify-between relative overflow-hidden transition-all duration-300 border border-white/15`}
            >
              <div className="flex items-center justify-between text-xs font-semibold opacity-90">
                <span className="font-sinhala">{selectedDesign.subtitle}</span>
                <span className="tabular-nums font-bold px-3 py-1 rounded-full bg-black/20 text-white">
                  LKR {finalAmount.toLocaleString()}
                </span>
              </div>

              <div className="text-center my-auto py-4">
                <div
                  className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight select-none"
                  style={{ fontFamily: 'Georgia, Cambria, "Times New Roman", Times, serif' }}
                >
                  Shastraloka
                </div>
                <div className={`text-xs sm:text-sm font-sinhala mt-1.5 ${selectedDesign.accentText}`}>
                  ශාස්ත්‍රලෝක • Classical Sri Lankan Bookstore
                </div>
              </div>

              <div className="flex items-end justify-between text-xs opacity-90">
                <div>
                  {recipientName && (
                    <div className="font-semibold">For: {recipientName}</div>
                  )}
                  {senderName && (
                    <div className="opacity-80">From: {senderName}</div>
                  )}
                </div>
                <span className="text-[11px] uppercase tracking-wider font-semibold">
                  shastraloka.lk
                </span>
              </div>
            </div>

            {/* Choose a Design (4x3 Grid) */}
            <div className="space-y-3">
              <h2 className="text-xs sm:text-sm font-bold text-[var(--text-main)]">
                Choose a design
              </h2>
              <div className="grid grid-cols-4 gap-3">
                {GIFT_CARD_DESIGNS.map((design) => {
                  const active = selectedDesign.id === design.id;
                  return (
                    <button
                      key={design.id}
                      type="button"
                      onClick={() => setSelectedDesign(design)}
                      className={`p-1 rounded-xl border-2 transition cursor-pointer ${
                        active
                          ? 'border-[var(--text-main)] shadow-sm scale-[1.02]'
                          : 'border-transparent hover:border-[var(--border-strong)]'
                      }`}
                    >
                      <div
                        className={`aspect-[16/10] w-full rounded-lg ${design.bgClass} ${design.textClass} flex flex-col items-center justify-center p-1.5 text-center`}
                      >
                        <span
                          className="text-xs sm:text-sm font-bold leading-none"
                          style={{ fontFamily: 'Georgia, Cambria, "Times New Roman", Times, serif' }}
                        >
                          Shastraloka
                        </span>
                        <span className="text-[8px] opacity-85 mt-0.5 truncate max-w-full">
                          {design.name}
                        </span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: Gift Amount, Delivery Method, Recipient Form & Add to Bag */}
          <form
            onSubmit={handleAddGiftCardToBag}
            className="lg:col-span-6 space-y-6"
          >
            {/* Choose a Gift Amount */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <label className="text-xs sm:text-sm font-bold text-[var(--text-main)]">
                  Choose a gift amount
                </label>
                <span className="text-xs font-semibold text-[var(--text-muted)]">
                  Currency: LKR (Rs.)
                </span>
              </div>

              <div className="p-3.5 rounded-xl bg-[var(--bg-surface)] border border-[var(--border-subtle)] text-xs text-[var(--text-body)] flex items-start gap-2.5">
                <Sparkles className="w-4 h-4 text-[#F1641E] shrink-0 mt-0.5" />
                <span>
                  Shastraloka Gift Cards never expire and can be redeemed across all print chronicles, collector silkbounds, and palm-leaf editions on{' '}
                  <strong className="text-[var(--text-main)]">shastraloka.lk</strong>.
                </span>
              </div>

              <div className="flex flex-wrap items-center gap-2.5 pt-1">
                {PRESET_AMOUNTS.map((preset) => {
                  const active = !customAmount && amount === preset;
                  return (
                    <button
                      key={preset}
                      type="button"
                      onClick={() => {
                        setAmount(preset);
                        setCustomAmount('');
                      }}
                      className={`px-4 py-2.5 rounded-full text-xs font-bold border transition cursor-pointer tabular-nums ${
                        active
                          ? 'bg-[var(--bg-card)] text-[var(--text-main)] border-2 border-[var(--text-main)] shadow-xs'
                          : 'bg-[var(--bg-surface)] text-[var(--text-body)] border-[var(--border-subtle)] hover:bg-[var(--bg-hover)]'
                      }`}
                    >
                      LKR {preset.toLocaleString()}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Custom Amount */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-[var(--text-main)] flex items-center gap-1.5">
                <span>Custom amount</span>
                <HelpCircle className="w-3.5 h-3.5 text-[var(--text-muted)]" />
              </label>
              <div className="relative">
                <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-xs font-semibold text-[var(--text-muted)]">
                  LKR
                </span>
                <input
                  type="number"
                  min={500}
                  max={100000}
                  value={customAmount}
                  onChange={(e) => setCustomAmount(e.target.value)}
                  placeholder="Custom amount (500 – 100,000)"
                  className="w-full h-11 pl-12 pr-4 rounded-xl bg-[var(--bg-input)] border border-[var(--border-subtle)] text-xs sm:text-sm text-[var(--text-main)] focus:outline-none focus:border-[var(--text-main)]"
                />
              </div>
            </div>

            {/* Choose a Delivery Method */}
            <div className="space-y-2.5">
              <span className="text-xs font-bold text-[var(--text-main)] block">
                Choose a delivery method
              </span>
              <label className="flex items-center gap-2.5 text-xs sm:text-sm text-[var(--text-main)] cursor-pointer">
                <input
                  type="radio"
                  name="deliveryMethod"
                  checked={deliveryMethod === 'email'}
                  onChange={() => setDeliveryMethod('email')}
                  className="w-4 h-4 accent-[var(--text-main)]"
                />
                <Mail className="w-4 h-4 text-[var(--text-muted)]" />
                <span>Email to recipient</span>
              </label>
              <label className="flex items-center gap-2.5 text-xs sm:text-sm text-[var(--text-main)] cursor-pointer">
                <input
                  type="radio"
                  name="deliveryMethod"
                  checked={deliveryMethod === 'print'}
                  onChange={() => setDeliveryMethod('print')}
                  className="w-4 h-4 accent-[var(--text-main)]"
                />
                <Printer className="w-4 h-4 text-[var(--text-muted)]" />
                <span>Email to you (printable certificate)</span>
              </label>
            </div>

            {/* To Section */}
            <div className="space-y-3">
              <span className="text-xs font-bold text-[var(--text-main)] block">
                To
              </span>
              <input
                type="text"
                value={recipientName}
                onChange={(e) => setRecipientName(e.target.value)}
                placeholder="Recipient's name"
                className="w-full h-11 px-3.5 rounded-xl bg-[var(--bg-input)] border border-[var(--border-subtle)] text-xs sm:text-sm text-[var(--text-main)] focus:outline-none focus:border-[var(--text-main)]"
              />
              {deliveryMethod === 'email' && (
                <input
                  type="email"
                  value={recipientEmail}
                  onChange={(e) => setRecipientEmail(e.target.value)}
                  placeholder="Recipient's email"
                  className="w-full h-11 px-3.5 rounded-xl bg-[var(--bg-input)] border border-[var(--border-subtle)] text-xs sm:text-sm text-[var(--text-main)] focus:outline-none focus:border-[var(--text-main)]"
                />
              )}
              <div>
                <textarea
                  rows={4}
                  maxLength={500}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Gift message (optional)"
                  className="w-full p-3.5 rounded-xl bg-[var(--bg-input)] border border-[var(--border-subtle)] text-xs sm:text-sm text-[var(--text-main)] focus:outline-none focus:border-[var(--text-main)] resize-none"
                />
                <div className="text-right text-[11px] text-[var(--text-muted)]">
                  {500 - message.length}
                </div>
              </div>
            </div>

            {/* From Section */}
            <div className="space-y-2">
              <span className="text-xs font-bold text-[var(--text-main)] block">
                From
              </span>
              <input
                type="text"
                value={senderName}
                onChange={(e) => setSenderName(e.target.value)}
                placeholder="Sender's name"
                className="w-full h-11 px-3.5 rounded-xl bg-[var(--bg-input)] border border-[var(--border-subtle)] text-xs sm:text-sm text-[var(--text-main)] focus:outline-none focus:border-[var(--text-main)]"
              />
            </div>

            {/* Add to Bag Button (Strictly following Rule 1 & Rule 2) */}
            <button
              type="submit"
              className={`w-full h-12 rounded-full font-bold text-sm flex items-center justify-center gap-2 transition cursor-pointer shadow-sm ${
                justAdded
                  ? 'bg-[var(--color-emerald)] text-white'
                  : 'bg-[var(--pill-active-bg)] text-[var(--pill-active-text)] hover:opacity-95'
              }`}
            >
              {justAdded ? (
                <>
                  <Check className="w-4 h-4" />
                  <span>Added Gift Card to Bag</span>
                </>
              ) : (
                <>
                  <Handbag className="w-4 h-4" />
                  <span>Add to Bag</span>
                </>
              )}
            </button>

            <div className="text-center text-[11px] text-[var(--text-muted)] space-y-1.5 pt-1">
              <p>
                View our Gift Card{' '}
                <Link href="/terms" className="underline hover:text-[var(--text-main)]">
                  Terms of Use
                </Link>
                .
              </p>
              <p>
                Want to arrange bulk scholarly or temple library gift cards?{' '}
                <Link href="/contact" className="underline hover:text-[var(--text-main)]">
                  Contact Shastraloka Support
                </Link>
                .
              </p>
            </div>
          </form>
        </div>
      </main>

      <Toast />
      <Footer />
    </div>
  );
}
