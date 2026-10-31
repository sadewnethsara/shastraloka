'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useApp, ThemeMode } from '../../../context/AppContext';
import { CELEBRATION_EVENTS } from '../../../data/celebrations';
import Header from '../../../components/Header';
import Footer from '../../../components/Footer';
import { Shield, Palette, MapPin, Check, ArrowLeft, CalendarHeart, Sparkles } from 'lucide-react';

export default function ProfileSettingsPage() {
  const {
    theme,
    setTheme,
    activeCelebration,
    isCelebrationMode,
    setActiveCelebrationById,
    showToast,
  } = useApp();
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

  const standardThemes: { id: ThemeMode; label: string; desc: string; swatch: string }[] = [
    { id: 'light', label: 'Warm Parchment (Light)', desc: 'Clean ivory & classic ink', swatch: '#FAF8F5' },
    { id: 'sepia', label: 'Palm-Leaf Ola (Sepia)', desc: 'Traditional warm manuscript tone', swatch: '#F4ECD8' },
    { id: 'emerald', label: 'Ceylon Sanctuary (Emerald)', desc: 'Deep monastic forest palette', swatch: '#0D2118' },
  ];

  const celebrationThemes: {
    id: ThemeMode;
    celebrationId: string;
    label: string;
    dateLabel: string;
    desc: string;
    swatch: string;
  }[] = [
    {
      id: 'womens-day',
      celebrationId: 'womens-day',
      label: "International Women's Day",
      dateLabel: 'Mar 8',
      desc: 'Royal amethyst & rose lotus palette',
      swatch: '#9D174D',
    },
    {
      id: 'childrens-day',
      celebrationId: 'childrens-day',
      label: "World Children's Day",
      dateLabel: 'Oct 1 / Nov 20',
      desc: 'Joyful sky & coral storybook palette',
      swatch: '#0284C7',
    },
    {
      id: 'teachers-day',
      celebrationId: 'teachers-day',
      label: "World Teachers' Day (Guru Puja)",
      dateLabel: 'Oct 5–6',
      desc: 'Scholarly indigo & warm amber palette',
      swatch: '#3730A3',
    },
    {
      id: 'avurudu',
      celebrationId: 'sinhala-tamil-new-year',
      label: 'Sinhala & Tamil New Year / Deepavali',
      dateLabel: 'Apr 13–14 / Oct–Nov',
      desc: 'Festive vermilion & auspicious gold palette',
      swatch: '#B91C1C',
    },
    {
      id: 'vesak',
      celebrationId: 'vesak-poya',
      label: 'Sacred Vesak Poya',
      dateLabel: 'May Full Moon',
      desc: 'Serene ivory & temple lotus gold palette',
      swatch: '#B45309',
    },
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
          <h1 className="font-heading font-bold text-3xl sm:text-4xl font-normal text-[var(--text-main)]">
            Account &amp; Privacy Settings
          </h1>
          <p className="text-xs sm:text-sm text-[var(--text-muted)] mt-1">
            Manage your reading sanctuary theme, celebration event themes, Sri Lankan district courier address, and privacy preferences.
          </p>
        </div>

        {/* Reading Theme Selector */}
        <section className="p-6 rounded-3xl bg-[var(--bg-surface)] border border-[var(--border-subtle)] space-y-5">
          <div className="flex items-center justify-between gap-2 flex-wrap">
            <div className="flex items-center gap-2">
              <Palette className="w-5 h-5 text-[var(--color-primary)]" />
              <h2 className="font-heading font-bold text-xl font-normal text-[var(--text-main)]">
                Sanctuary Reading Themes
              </h2>
            </div>
            <span className="text-xs font-semibold text-[var(--text-muted)]">
              Active theme: <strong className="text-[var(--color-primary)] uppercase">{theme}</strong>
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {standardThemes.map((t) => {
              const active = theme === t.id && !isCelebrationMode;
              return (
                <button
                  key={t.id}
                  type="button"
                  onClick={() => {
                    setActiveCelebrationById(null);
                    setTheme(t.id);
                    showToast(`Switched to ${t.label}`);
                  }}
                  className={`p-4 rounded-2xl border text-left transition-all flex items-center justify-between cursor-pointer ${
                    active
                      ? 'border-[var(--color-primary)] bg-[var(--bg-wash)] ring-1 ring-[var(--color-primary)]'
                      : 'border-[var(--border-subtle)] bg-[var(--bg-main)] hover:border-[var(--border-strong)]'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span
                      className="w-6 h-6 rounded-full border border-black/15 shrink-0 shadow-2xs"
                      style={{ backgroundColor: t.swatch }}
                    />
                    <div>
                      <p className="text-sm font-bold text-[var(--text-main)]">{t.label}</p>
                      <p className="text-xs text-[var(--text-muted)] mt-0.5">{t.desc}</p>
                    </div>
                  </div>
                  {active && <Check className="w-4 h-4 text-[var(--color-primary)] shrink-0" />}
                </button>
              );
            })}
          </div>

          {/* Celebration & Cultural Calendar Themes */}
          <div className="pt-4 border-t border-[var(--border-subtle)] space-y-3">
            <div className="flex items-center justify-between gap-2 flex-wrap">
              <div className="flex items-center gap-2">
                <CalendarHeart className="w-5 h-5 text-[var(--color-primary)]" />
                <div>
                  <h3 className="font-heading font-bold text-base text-[var(--text-main)]">
                    Celebration &amp; Festival Themes
                  </h3>
                  <p className="text-xs text-[var(--text-muted)]">
                    Preview seasonal palettes, homepage hero curation, and date-matched book offers.
                  </p>
                </div>
              </div>
              {isCelebrationMode && (
                <button
                  type="button"
                  onClick={() => setActiveCelebrationById(null)}
                  className="px-3 py-1.5 rounded-full text-xs font-bold bg-[var(--bg-main)] border border-[var(--border-strong)] text-[var(--text-main)] hover:bg-[var(--bg-hover)] transition cursor-pointer"
                >
                  Reset to Classic Sanctuary
                </button>
              )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {celebrationThemes.map((ct) => {
                const active = theme === ct.id;
                return (
                  <button
                    key={ct.id}
                    type="button"
                    onClick={() => {
                      setActiveCelebrationById(ct.celebrationId);
                      setTheme(ct.id);
                    }}
                    className={`p-4 rounded-2xl border text-left transition-all flex items-center justify-between cursor-pointer ${
                      active
                        ? 'border-[var(--color-primary)] bg-[var(--color-primary-subtle)] ring-1 ring-[var(--color-primary)]'
                        : 'border-[var(--border-subtle)] bg-[var(--bg-main)] hover:border-[var(--border-strong)]'
                    }`}
                  >
                    <div className="flex items-center gap-3 min-w-0 pr-2">
                      <span
                        className="w-6 h-6 rounded-full border border-white/25 shrink-0 shadow-xs"
                        style={{ backgroundColor: ct.swatch }}
                      />
                      <div className="min-w-0">
                        <div className="flex items-center gap-1.5 flex-wrap">
                          <p className="text-sm font-bold text-[var(--text-main)] truncate">{ct.label}</p>
                          <span className="px-2 py-0.5 rounded-full text-[10px] font-extrabold bg-[var(--bg-surface)] text-[var(--color-primary)] border border-[var(--border-subtle)]">
                            {ct.dateLabel}
                          </span>
                        </div>
                        <p className="text-xs text-[var(--text-muted)] mt-0.5 truncate">{ct.desc}</p>
                      </div>
                    </div>
                    {active && <Check className="w-4 h-4 text-[var(--color-primary)] shrink-0" />}
                  </button>
                );
              })}
            </div>

            {/* Full Celebration Date Event Picker */}
            <div className="pt-3">
              <p className="text-xs font-bold text-[var(--text-muted)] uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-[var(--color-primary)]" />
                <span>Simulate Specific Celebration Date &amp; Offers</span>
              </p>
              <div className="flex flex-wrap gap-2">
                {CELEBRATION_EVENTS.map((ev) => {
                  const isCurrentEvent = isCelebrationMode && activeCelebration.id === ev.id;
                  return (
                    <button
                      key={ev.id}
                      type="button"
                      onClick={() => setActiveCelebrationById(ev.id)}
                      className={`px-3 py-1.5 rounded-full text-xs font-bold transition cursor-pointer flex items-center gap-1.5 ${
                        isCurrentEvent
                          ? 'bg-[var(--color-primary)] text-white shadow-xs'
                          : 'bg-[var(--bg-main)] text-[var(--text-body)] border border-[var(--border-subtle)] hover:border-[var(--border-strong)]'
                      }`}
                    >
                      <span>{ev.title}</span>
                      <span className={`text-[10px] ${isCurrentEvent ? 'text-white/90' : 'text-[var(--text-muted)]'}`}>
                        ({ev.dateLabel})
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        {/* Courier & Privacy Form */}
        <form onSubmit={handleSave} className="space-y-6">
          <section className="p-6 rounded-3xl bg-[var(--bg-surface)] border border-[var(--border-subtle)] space-y-4">
            <div className="flex items-center gap-2">
              <MapPin className="w-5 h-5 text-[#F1641E]" />
              <h2 className="font-heading font-bold text-xl font-normal text-[var(--text-main)]">
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
              <h2 className="font-heading font-bold text-xl font-normal text-[var(--text-main)]">
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
