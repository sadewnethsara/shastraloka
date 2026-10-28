'use client';

import React, { useState } from 'react';
import Header from '../../../components/Header';
import Footer from '../../../components/Footer';
import { UploadCloud, FileCheck, CheckCircle2, Send } from 'lucide-react';

export default function SubmitManuscriptPage() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-[var(--bg-main)] flex flex-col">
      <Header />
      <main className="page-container py-8 sm:py-16 flex-1">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-10">
            <div className="w-14 h-14 rounded-2xl bg-[var(--color-primary-subtle)] text-[var(--color-primary)] flex items-center justify-center mx-auto mb-3">
              <UploadCloud className="w-7 h-7" />
            </div>
            <h1 className="text-3xl sm:text-4xl font-heading font-bold text-[var(--text-main)]">
              Submit Manuscript for Publication
            </h1>
            <p className="text-sm sm:text-base text-[var(--text-muted)] mt-2">
              For scholars, translators, and authors seeking publication and nationwide bookstore distribution across Sri Lanka.
            </p>
          </div>

          <div className="p-6 sm:p-8 rounded-2xl bg-[var(--bg-card)] border border-[var(--border-subtle)] shadow-xs">
            {submitted ? (
              <div className="py-12 text-center space-y-3">
                <CheckCircle2 className="w-12 h-12 text-emerald-500 mx-auto" />
                <h2 className="text-lg font-heading font-bold text-[var(--text-main)]">Manuscript Details Received</h2>
                <p className="text-xs text-[var(--text-muted)] max-w-sm mx-auto">
                  Our editorial review board will review your proposal and reply within 10 business days.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="text-xs font-semibold text-[var(--color-primary)] underline cursor-pointer"
                >
                  Submit another proposal
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-[var(--text-muted)] mb-1.5">Lead Author / Scholar Name</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Ven. Revata Thera / Prof. Silva"
                    className="w-full px-4 py-2.5 rounded-xl bg-[var(--bg-surface)] border border-[var(--border-subtle)] text-sm text-[var(--text-main)] focus:outline-none focus:border-[var(--color-primary)]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[var(--text-muted)] mb-1.5">Manuscript Title</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Critical Commentary on the Culavamsa"
                    className="w-full px-4 py-2.5 rounded-xl bg-[var(--bg-surface)] border border-[var(--border-subtle)] text-sm text-[var(--text-main)] focus:outline-none focus:border-[var(--color-primary)]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[var(--text-muted)] mb-1.5">Category & Field</label>
                  <select className="w-full px-4 py-2.5 rounded-xl bg-[var(--bg-surface)] border border-[var(--border-subtle)] text-sm text-[var(--text-main)] focus:outline-none focus:border-[var(--color-primary)]">
                    <option>Classical Sri Lankan History & Chronicles</option>
                    <option>Buddhist Philosophy & Pali Exegesis</option>
                    <option>Indigenous Hela Veda & Ayurveda Medicine</option>
                    <option>Classical Poetry & Literature</option>
                    <option>Contemporary Fiction & Creative Writing</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[var(--text-muted)] mb-1.5">Abstract / Synopsis</label>
                  <textarea
                    rows={4}
                    required
                    placeholder="Provide a 200-word synopsis of your manuscript..."
                    className="w-full px-4 py-2.5 rounded-xl bg-[var(--bg-surface)] border border-[var(--border-subtle)] text-sm text-[var(--text-main)] focus:outline-none focus:border-[var(--color-primary)]"
                  ></textarea>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[var(--text-muted)] mb-1.5">Contact Email</label>
                  <input
                    type="email"
                    required
                    placeholder="scholar@university.lk"
                    className="w-full px-4 py-2.5 rounded-xl bg-[var(--bg-surface)] border border-[var(--border-subtle)] text-sm text-[var(--text-main)] focus:outline-none focus:border-[var(--color-primary)]"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 rounded-full bg-[var(--color-primary)] text-white text-sm font-semibold hover:opacity-90 transition flex items-center justify-center gap-2 cursor-pointer mt-6"
                >
                  <Send className="w-4 h-4" />
                  <span>Submit Manuscript Proposal</span>
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
