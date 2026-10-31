'use client';

import React, { useState } from 'react';
import { useApp } from '../../../context/AppContext';
import Header from '../../../components/Header';
import Footer from '../../../components/Footer';
import { ScrollText, Upload, CheckCircle2, Sparkles, ShieldCheck } from 'lucide-react';
import {
  sanitizeSingleLine,
  sanitizeText,
  secureApiPost,
  SECURITY_LIMITS,
} from '../../../utils/security';

export default function SubmitManuscriptPage() {
  const { showToast } = useApp();
  const [title, setTitle] = useState('');
  const [scholarName, setScholarName] = useState('');
  const [language, setLanguage] = useState('Sinhala / Pali Critical Edition');
  const [synopsis, setSynopsis] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const cleanTitle = sanitizeSingleLine(title, SECURITY_LIMITS.MAX_MANUSCRIPT_TITLE_LENGTH);
    const cleanScholar = sanitizeSingleLine(scholarName, SECURITY_LIMITS.MAX_NAME_LENGTH);
    const cleanLang = sanitizeSingleLine(language, 100);
    const cleanSynopsis = sanitizeText(synopsis, SECURITY_LIMITS.MAX_INQUIRY_MESSAGE_LENGTH);

    if (!cleanTitle || cleanTitle.length < 3) {
      showToast('Please enter a valid manuscript or treatise title.');
      return;
    }
    if (!cleanScholar || cleanScholar.length < 2) {
      showToast('Please enter the author, editor, or translator name.');
      return;
    }
    if (!cleanSynopsis || cleanSynopsis.length < 10) {
      showToast('Please provide an abstract or chapter overview.');
      return;
    }

    const res = await secureApiPost('/api/inquiries', {
      type: 'manuscript',
      name: cleanScholar,
      title: cleanTitle,
      topic: cleanLang,
      message: cleanSynopsis,
    });
    if (!res.ok && res.error) {
      showToast(res.error);
      return;
    }

    setTitle(cleanTitle);
    setScholarName(cleanScholar);
    setSynopsis(cleanSynopsis);
    setSubmitted(true);
    showToast('Manuscript dossier submitted to the Shastraloka Editorial Council');
  };

  return (
    <div className="min-h-screen bg-[var(--bg-main)] text-[var(--text-main)] flex flex-col">
      <Header isSticky />
      <main className="flex-1 pb-20">
      <section className="bg-[var(--hero-banner-bg)] border-b border-[var(--border-subtle)] py-12">
        <div className="page-container">
          <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[var(--color-primary)]">
            <Sparkles className="w-3.5 h-3.5" /> Shastraloka University &amp; Guild Press
          </span>
          <h1 className="font-heading font-bold text-3xl sm:text-4xl font-normal text-[var(--text-main)] mt-1">
            Submit a Manuscript or Critical Translation
          </h1>
          <p className="text-sm text-[var(--text-muted)] max-w-2xl mt-2">
            We partner with Sri Lankan philologists, pirivena archivists, and literary translators to publish acid-free print
            editions and palm-leaf facsimiles.
          </p>
        </div>
      </section>

      <div className="page-container pt-10">
        {submitted ? (
          <div className="p-8 rounded-3xl bg-[var(--bg-surface)] border border-[var(--border-subtle)] text-center space-y-4">
            <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto" />
            <h2 className="font-heading font-bold text-2xl text-[var(--text-main)]">Manuscript Dossier Registered</h2>
            <p className="text-sm text-[var(--text-muted)] max-w-md mx-auto">
              Thank you, <span className="font-semibold text-[var(--text-main)]">{scholarName}</span>. Our Editorial Board will
              review <em>{title}</em> within 14 business days.
            </p>
            <button
              onClick={() => {
                setSubmitted(false);
                setTitle('');
                setSynopsis('');
              }}
              className="px-6 py-2.5 rounded-full bg-[var(--pill-active-bg)] text-[var(--pill-active-text)] text-xs font-semibold"
            >
              Submit another proposal
            </button>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="p-6 sm:p-8 rounded-3xl bg-[var(--bg-surface)] border border-[var(--border-subtle)] space-y-5"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-[var(--text-main)] mb-1.5">
                  Manuscript / Treatise Title *
                </label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. Annotated Kokila Sandeshaya"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[var(--border-strong)] bg-[var(--bg-input)] text-sm text-[var(--text-main)]"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-[var(--text-main)] mb-1.5">
                  Author / Editor / Translator Name *
                </label>
                <input
                  type="text"
                  required
                  value={scholarName}
                  onChange={(e) => setScholarName(e.target.value)}
                  placeholder="Ven. / Prof. / Dr. Name"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[var(--border-strong)] bg-[var(--bg-input)] text-sm text-[var(--text-main)]"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-[var(--text-main)] mb-1.5">Primary Language &amp; Tradition</label>
              <select
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                aria-label="Primary Language and Tradition"
                className="w-full px-3.5 py-2.5 rounded-xl border border-[var(--border-strong)] bg-[var(--bg-input)] text-sm text-[var(--text-main)]"
              >
                <option>Sinhala / Pali Critical Edition</option>
                <option>Sanskrit Poetics &amp; Lexicography</option>
                <option>Indigenous Hela Veda / Ayurvedic Treatise</option>
                <option>Royal Court Chronicle &amp; Epigraphy</option>
                <option>Contemporary Sri Lankan Literary Fiction / Essay</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-[var(--text-main)] mb-1.5">
                Abstract, Provenance &amp; Chapter Overview *
              </label>
              <textarea
                rows={5}
                required
                value={synopsis}
                onChange={(e) => setSynopsis(e.target.value)}
                placeholder="Describe the palm-leaf source or literary scope, estimated page count, and scholarly apparatus..."
                className="w-full px-3.5 py-2.5 rounded-xl border border-[var(--border-strong)] bg-[var(--bg-input)] text-sm text-[var(--text-main)] resize-none"
              />
            </div>

            <div className="p-4 rounded-2xl bg-[var(--bg-wash)] border border-dashed border-[var(--border-strong)] flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Upload className="w-5 h-5 text-[var(--color-primary)]" />
                <div>
                  <p className="text-xs font-bold text-[var(--text-main)]">Attach Sample Folios or PDF Chapter (Optional)</p>
                  <p className="text-[11px] text-[var(--text-muted)]">Supports PDF, DOCX, or high-resolution TIFF scans</p>
                </div>
              </div>
              <span className="inline-flex items-center gap-1 text-xs font-semibold text-[var(--text-main)]">
                <ShieldCheck className="w-4 h-4 text-[var(--color-primary)]" /> Confidential Review
              </span>
            </div>

            <button
              type="submit"
              className="inline-flex items-center gap-2 px-7 py-3 rounded-full bg-[var(--pill-active-bg)] text-[var(--pill-active-text)] text-sm font-semibold"
            >
              <ScrollText className="w-4 h-4" />
              Submit Proposal to Editorial Council
            </button>
          </form>
        )}
      </div>
      </main>
      <Footer />
    </div>
  );
}
