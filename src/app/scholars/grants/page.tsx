'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useApp } from '../../../context/AppContext';
import Header from '../../../components/Header';
import Footer from '../../../components/Footer';
import { Award, BookOpen, CheckCircle2, Sparkles, ArrowRight } from 'lucide-react';

const GRANT_TIERS = [
  {
    title: 'Pirivena & Temple Ola Conservation Grant',
    amount: 'Up to LKR 450,000',
    desc: 'Covers sweet-flag oil treatment, wooden Kambamba cover restoration, and macro photography of endangered palm-leaf bundles.',
  },
  {
    title: 'Critical Translation & Commentary Fellowship',
    amount: 'Up to LKR 300,000',
    desc: 'Supports scholars translating classical Sinhala, Pali, or Sanskrit treatises into bilingual annotated print editions.',
  },
  {
    title: 'Regional Library & School Heritage Box',
    amount: '50 Curated Volumes',
    desc: 'Donates a complete collection of Shastraloka historical chronicles and dictionaries to rural Sri Lankan libraries.',
  },
];

export default function ScholarsGrantsPage() {
  const { showToast } = useApp();
  const [institution, setInstitution] = useState('');
  const [applicant, setApplicant] = useState('');
  const [selectedTier, setSelectedTier] = useState(GRANT_TIERS[0].title);
  const [applied, setApplied] = useState(false);

  const handleApply = (e: React.FormEvent) => {
    e.preventDefault();
    if (!institution.trim() || !applicant.trim()) return;
    setApplied(true);
    showToast('Grant application registered with the Shastraloka Preservation Fund');
  };

  return (
    <div className="min-h-screen bg-[var(--bg-main)] text-[var(--text-main)] flex flex-col">
      <Header isSticky />
      <main className="flex-1 pb-20">
      <section className="bg-[var(--hero-banner-bg)] border-b border-[var(--border-subtle)] py-12">
        <div className="max-w-[1080px] mx-auto px-4 sm:px-6">
          <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#F1641E]">
            <Sparkles className="w-3.5 h-3.5" /> ශාස්ත්‍රාලෝක • Cultural Preservation Fund
          </span>
          <h1 className="font-heading font-bold text-3xl sm:text-4xl font-normal text-[var(--text-main)] mt-1">
            Palm-Leaf Digitization &amp; Scholarly Grants
          </h1>
          <p className="text-sm text-[var(--text-muted)] max-w-2xl mt-2">
            2.5% of every book purchased on Shastraloka directly funds the conservation of Sri Lankan temple libraries and
            critical academic translations.
          </p>
        </div>
      </section>

      <div className="max-w-[1080px] mx-auto px-4 sm:px-6 pt-10 space-y-10">
        {/* Grant Tiers */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {GRANT_TIERS.map((tier) => (
            <div
              key={tier.title}
              className="p-6 rounded-3xl bg-[var(--bg-surface)] border border-[var(--border-subtle)] flex flex-col justify-between space-y-4"
            >
              <div className="space-y-2">
                <Award className="w-6 h-6 text-[#F1641E]" />
                <span className="inline-block text-xs font-bold px-2.5 py-1 rounded-full bg-[var(--bg-wash)] text-[var(--text-main)]">
                  {tier.amount}
                </span>
                <h2 className="font-heading font-bold text-lg font-bold text-[var(--text-main)]">{tier.title}</h2>
                <p className="text-xs text-[var(--text-muted)] leading-relaxed">{tier.desc}</p>
              </div>
              <button
                type="button"
                onClick={() => setSelectedTier(tier.title)}
                className={`w-full py-2.5 rounded-full text-xs font-semibold border transition-colors ${
                  selectedTier === tier.title
                    ? 'bg-[var(--pill-active-bg)] text-[var(--pill-active-text)] border-[var(--pill-active-bg)]'
                    : 'border-[var(--border-strong)] bg-[var(--bg-main)] text-[var(--text-main)]'
                }`}
              >
                {selectedTier === tier.title ? 'Selected Grant Tier' : 'Select This Grant'}
              </button>
            </div>
          ))}
        </div>

        {/* Application Form */}
        <div className="p-6 sm:p-8 rounded-3xl bg-[var(--bg-surface)] border border-[var(--border-subtle)]">
          {applied ? (
            <div className="text-center py-8 space-y-3">
              <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto" />
              <h3 className="font-heading font-bold text-2xl text-[var(--text-main)]">Grant Application Received</h3>
              <p className="text-sm text-[var(--text-muted)] max-w-md mx-auto">
                We have logged the application for <strong>{institution}</strong> under <em>{selectedTier}</em>.
              </p>
              <Link
                href="/archives"
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#F1641E] underline pt-2"
              >
                Explore digitized archival editions <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          ) : (
            <form onSubmit={handleApply} className="space-y-4">
              <h3 className="font-heading font-bold text-xl text-[var(--text-main)] flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-[#F1641E]" /> Apply for the 2026–2027 Grant Cycle
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-[var(--text-main)] mb-1.5">
                    Pirivena / University / Library Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={institution}
                    onChange={(e) => setInstitution(e.target.value)}
                    placeholder="e.g. Vidyalankara Pirivena Library"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[var(--border-strong)] bg-[var(--bg-input)] text-sm text-[var(--text-main)]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[var(--text-main)] mb-1.5">
                    Lead Archivist / Scholar Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={applicant}
                    onChange={(e) => setApplicant(e.target.value)}
                    placeholder="Dr. / Ven. Applicant Name"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[var(--border-strong)] bg-[var(--bg-input)] text-sm text-[var(--text-main)]"
                  />
                </div>
              </div>
              <button
                type="submit"
                className="px-7 py-3 rounded-full bg-[var(--pill-active-bg)] text-[var(--pill-active-text)] text-xs sm:text-sm font-semibold"
              >
                Submit Grant Application
              </button>
            </form>
          )}
        </div>
      </div>
      </main>
      <Footer />
    </div>
  );
}
