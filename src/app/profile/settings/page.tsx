'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useApp, ThemeMode } from '../../../context/AppContext';
import Header from '../../../components/Header';
import Footer from '../../../components/Footer';
import { Shield, Palette, MapPin, Check, ArrowLeft } from 'lucide-react';

export default function ProfileSettingsPage() {
  const { theme, setTheme, showToast } = useApp();
  const [fullName, setFullName] = useState('Sadew Wijesinghe');
  const [district, setDistrict] = useState('Colombo');
  const [address, setAddress] = useState('No. 42, Ananda Coomaraswamy Mawatha, Colombo 07');
  const [emailAlerts, setEmailAlerts] = useState(true);
  const [smsCourier, setSmsCourier] = useState(true);
  const [PersonalizedOffers, setPersonalizedOffers] = useState(true);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    showToast('Reader profile & privacy settings saved');
  };

  const themes: { id: ThemeMode; label: string; desc: string }[] = [
    { id: 'light', label: 'Warm Parchment (Light)', desc: 'Clean ivory & classic ink' },
    { id: 'dark', label: 'Midnight Archive (Dark)', desc: 'Low-glare obsidian reading mode' },
    { id: 'sepia', label: 'Palm-Leaf Ola (Sepia)', desc: 'Traditional warm manuscript tone' },
    { id: 'emerald', label: 'Ceylon Sanctuary (Emerald)', desc: 'Deep monastic forest palette' },
  ];

  return (
    <div className="min-h-screen bg-[var(--bg-main)] text-[var(--text-main)] flex flex-col">
      <Header isSticky />
      <main className="flex-1 pb-20">
      <div className="max-w-[880px] mx-auto px-4 sm:px-6 pt-10 space-y-8">
        <div>
          <Link
            href="/profile"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-[var(--text-muted)] hover:text-[var(--text-main)] mb-3"
          >
            <ArrowLeft className="w-3.5 h-3.5" /> Back to Reader Profile
          </Link>
          <h1 className="font-serif text-3xl sm:text-4xl font-normal text-[var(--text-main)]">
            Account &amp; Privacy Settings
          </h1>
          <p className="text-xs sm:text-sm text-[var(--text-muted)] mt-1">
            Manage your reading sanctuary theme, Sri Lankan district courier address, and privacy preferences.
          </p>
        </div>

        {/* Reading Theme Selector */}
        <section className="p-6 rounded-3xl bg-[var(--bg-surface)] border border-[var(--border-subtle)] space-y-4">
          <div className="flex items-center gap-2">
            <Palette className="w-5 h-5 text-[#F1641E]" />
            <h2 className="font-serif text-xl font-normal text-[var(--text-main)]">Sanctuary Reading Theme</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {themes.map((t) => {
              const active = theme === t.id;
              return (
                <button
                  key={t.id}
                  type="button"
                  onClick={() => setTheme(t.id)}
                  className={`p-4 rounded-2xl border text-left transition-all flex items-center justify-between ${
                    active
                      ? 'border-[#F1641E] bg-[var(--bg-wash)]'
                      : 'border-[var(--border-subtle)] bg-[var(--bg-main)] hover:border-[var(--border-strong)]'
                  }`}
                >
                  <div>
                    <p className="text-sm font-bold text-[var(--text-main)]">{t.label}</p>
                    <p className="text-xs text-[var(--text-muted)] mt-0.5">{t.desc}</p>
                  </div>
                  {active && <Check className="w-4 h-4 text-[#F1641E]" />}
                </button>
              );
            })}
          </div>
        </section>

        {/* Courier & Privacy Form */}
        <form onSubmit={handleSave} className="space-y-6">
          <section className="p-6 rounded-3xl bg-[var(--bg-surface)] border border-[var(--border-subtle)] space-y-4">
            <div className="flex items-center gap-2">
              <MapPin className="w-5 h-5 text-[#F1641E]" />
              <h2 className="font-serif text-xl font-normal text-[var(--text-main)]">
                Default Islandwide Courier Address
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-[var(--text-main)] mb-1.5">Reader Name</label>
                <input
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[var(--border-strong)] bg-[var(--bg-input)] text-sm text-[var(--text-main)]"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-[var(--text-main)] mb-1.5">Sri Lankan District</label>
                <input
                  type="text"
                  value={district}
                  onChange={(e) => setDistrict(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[var(--border-strong)] bg-[var(--bg-input)] text-sm text-[var(--text-main)]"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-[var(--text-main)] mb-1.5">Street &amp; Sanctuary Address</label>
              <input
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-[var(--border-strong)] bg-[var(--bg-input)] text-sm text-[var(--text-main)]"
              />
            </div>
          </section>

          <section className="p-6 rounded-3xl bg-[var(--bg-surface)] border border-[var(--border-subtle)] space-y-4">
            <div className="flex items-center gap-2">
              <Shield className="w-5 h-5 text-[#F1641E]" />
              <h2 className="font-serif text-xl font-normal text-[var(--text-main)]">
                Privacy &amp; Notification Controls
              </h2>
            </div>

            <label className="flex items-center justify-between py-2 border-b border-[var(--border-subtle)] cursor-pointer">
              <div>
                <p className="text-sm font-semibold text-[var(--text-main)]">New Archival Facsimile Dispatches</p>
                <p className="text-xs text-[var(--text-muted)]">Receive alerts when rare palm-leaf editions are restocked</p>
              </div>
              <input
                type="checkbox"
                checked={emailAlerts}
                onChange={(e) => setEmailAlerts(e.target.checked)}
                className="w-4 h-4 accent-[#F1641E]"
              />
            </label>

            <label className="flex items-center justify-between py-2 border-b border-[var(--border-subtle)] cursor-pointer">
              <div>
                <p className="text-sm font-semibold text-[var(--text-main)]">SMS Courier Checkpoints</p>
                <p className="text-xs text-[var(--text-muted)]">Receive SMS updates on the day of district delivery</p>
              </div>
              <input
                type="checkbox"
                checked={smsCourier}
                onChange={(e) => setSmsCourier(e.target.checked)}
                className="w-4 h-4 accent-[#F1641E]"
              />
            </label>

            <label className="flex items-center justify-between py-2 cursor-pointer">
              <div>
                <p className="text-sm font-semibold text-[var(--text-main)]">Personalized Literary Offers &amp; Coupons</p>
                <p className="text-xs text-[var(--text-muted)]">Allow tailored LKR festival vouchers on /offers</p>
              </div>
              <input
                type="checkbox"
                checked={PersonalizedOffers}
                onChange={(e) => setPersonalizedOffers(e.target.checked)}
                className="w-4 h-4 accent-[#F1641E]"
              />
            </label>
          </section>

          <div className="flex items-center justify-between">
            <Link href="/privacy" className="text-xs underline text-[var(--text-muted)] hover:text-[var(--text-main)]">
              Read full Shastraloka Privacy Policy
            </Link>
            <button
              type="submit"
              className="px-7 py-3 rounded-full bg-[var(--pill-active-bg)] text-[var(--pill-active-text)] text-sm font-semibold"
            >
              Save Settings
            </button>
          </div>
        </form>
      </div>
      </main>
      <Footer />
    </div>
  );
}
