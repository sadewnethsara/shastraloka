'use client';

import React from 'react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { BookOpen, Award, ShieldCheck, HeartHandshake } from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[var(--bg-main)] flex flex-col">
      <Header />
      <main className="page-container py-8 sm:py-16 flex-1">
        <div className="max-w-3xl mx-auto space-y-12">
          {/* Header */}
          <div className="text-center space-y-4">
            <span className="text-xs font-bold uppercase tracking-widest text-[var(--color-primary)]">
              Preserving Heritage • Inspiring Wisdom
            </span>
            <h1 className="text-3xl sm:text-5xl font-heading font-bold text-[var(--text-main)] tracking-tight">
              About Shastraloka
            </h1>
            <p className="text-base sm:text-lg text-[var(--text-muted)] leading-relaxed">
              Sri Lanka’s premier digital bookstore and scholarly preservation repository dedicated to reviving classical manuscripts, Mahavamsa chronicles, Buddhist philosophy, and mainstream literary masterpieces.
            </p>
          </div>

          {/* Pillars */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-6">
            <div className="p-6 rounded-2xl bg-[var(--bg-card)] border border-[var(--border-subtle)] text-center space-y-3">
              <div className="w-12 h-12 rounded-xl bg-[var(--color-primary-subtle)] text-[var(--color-primary)] flex items-center justify-center mx-auto">
                <BookOpen className="w-6 h-6" />
              </div>
              <h3 className="font-heading font-bold text-lg text-[var(--text-main)]">Scholarly Preservation</h3>
              <p className="text-xs text-[var(--text-muted)] leading-relaxed">
                Digitizing and archiving rare ola leaf manuscripts and historical chronicles with scholarly precision.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[var(--bg-card)] border border-[var(--border-subtle)] text-center space-y-3">
              <div className="w-12 h-12 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mx-auto">
                <Award className="w-6 h-6" />
              </div>
              <h3 className="font-heading font-bold text-lg text-[var(--text-main)]">Authoritative Editions</h3>
              <p className="text-xs text-[var(--text-muted)] leading-relaxed">
                Direct partnerships with Buddhist Cultural Centre, M.D. Gunasena, and Godage Publishers for verified texts.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[var(--bg-card)] border border-[var(--border-subtle)] text-center space-y-3">
              <div className="w-12 h-12 rounded-xl bg-blue-500/10 text-blue-600 dark:text-blue-400 flex items-center justify-center mx-auto">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="font-heading font-bold text-lg text-[var(--text-main)]">Islandwide Reach</h3>
              <p className="text-xs text-[var(--text-muted)] leading-relaxed">
                Reliable 24-48 hour tracked delivery across all 25 districts in Sri Lanka with Cash on Delivery support.
              </p>
            </div>
          </div>

          {/* Story */}
          <div className="space-y-6 text-sm sm:text-base text-[var(--text-main)] leading-relaxed border-t border-[var(--border-subtle)] pt-10">
            <h2 className="text-2xl font-heading font-bold">Our Cultural Mission</h2>
            <p>
              For centuries, the knowledge systems of Sri Lanka—ranging from the Mahavamsa and Chulavamsa to indigenous Hela Veda medicine and Tripitaka philosophy—were inscribed onto durable ola palm leaves. As modern reading evolves, Shastraloka was founded to make these national treasures universally accessible.
            </p>
            <p>
              Alongside classical heritage treatises, we curate high-demand contemporary fiction, translated world literature, educational past papers, and university textbooks, serving both Sri Lankan households and the worldwide diaspora.
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
