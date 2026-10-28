'use client';

import React from 'react';
import Header from '../../../components/Header';
import Footer from '../../../components/Footer';
import { Award, GraduationCap, CheckCircle2, FileText } from 'lucide-react';

export default function ScholarGrantsPage() {
  return (
    <div className="min-h-screen bg-[var(--bg-main)] flex flex-col">
      <Header />
      <main className="page-container py-8 sm:py-16 flex-1">
        <div className="max-w-3xl mx-auto space-y-10">
          <div className="text-center space-y-3">
            <div className="w-14 h-14 rounded-2xl bg-amber-500/10 text-amber-600 dark:text-amber-400 flex items-center justify-center mx-auto mb-2">
              <Award className="w-7 h-7" />
            </div>
            <h1 className="text-3xl sm:text-4xl font-heading font-bold text-[var(--text-main)]">
              Classical Manuscript Research Grants
            </h1>
            <p className="text-sm sm:text-base text-[var(--text-muted)]">
              Supporting academic researchers, Pali scholars, and cultural preservationists across Sri Lanka and international universities.
            </p>
          </div>

          <div className="p-6 sm:p-8 rounded-2xl bg-[var(--bg-card)] border border-[var(--border-subtle)] space-y-6">
            <h2 className="text-xl font-heading font-bold text-[var(--text-main)]">
              2026 Manuscript Fellowship Program
            </h2>
            <p className="text-sm text-[var(--text-muted)] leading-relaxed">
              Shastraloka awards annual grants up to LKR 750,000 for approved translation, critical editing, and digital archiving projects focused on pre-colonial Sri Lankan treatises, Ayurveda pharmacology, and Ola leaf palm preservation.
            </p>

            <div className="space-y-3 text-sm">
              <div className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                <span className="text-[var(--text-main)]">Full digitization equipment access at our Colombo archive center</span>
              </div>
              <div className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                <span className="text-[var(--text-main)]">Publication and distribution backing through accredited partner publishers</span>
              </div>
              <div className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                <span className="text-[var(--text-main)]">Stipend for fieldwork across temple libraries in Anuradhapura, Polonnaruwa, and Kandy</span>
              </div>
            </div>

            <div className="pt-4 border-t border-[var(--border-subtle)]">
              <p className="text-xs text-[var(--text-muted)] mb-3">
                To submit an academic research proposal or request an application pack, email our academic committee:
              </p>
              <a
                href="mailto:grants@shastraloka.lk"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[var(--color-primary)] text-white text-xs font-semibold hover:opacity-90 transition"
              >
                <FileText className="w-4 h-4" />
                <span>Contact Academic Board (grants@shastraloka.lk)</span>
              </a>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
