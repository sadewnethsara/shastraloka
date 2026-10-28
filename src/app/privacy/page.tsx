'use client';

import React from 'react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-[var(--bg-main)] flex flex-col">
      <Header />
      <main className="page-container py-8 sm:py-16 flex-1">
        <div className="max-w-3xl mx-auto space-y-8">
          <div className="border-b border-[var(--border-subtle)] pb-6">
            <h1 className="text-3xl sm:text-4xl font-heading font-bold text-[var(--text-main)] mb-2">
              Privacy Policy
            </h1>
            <p className="text-sm text-[var(--text-muted)]">
              Last updated: October 2026 • Shastraloka Classical Bookstore (shastraloka.lk | ශාස්ත්රාලෝක.ලංකා)
            </p>
          </div>

          <div className="space-y-6 text-sm text-[var(--text-muted)] leading-relaxed">
            <section className="space-y-2">
              <h2 className="text-lg font-heading font-bold text-[var(--text-main)]">1. Information We Collect</h2>
              <p>
                When you place a book order, save reading lists to your Pinterest-style boards, or create an account, we collect necessary shipping details including your full name, phone number, shipping address, and email.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="text-lg font-heading font-bold text-[var(--text-main)]">2. How We Use Your Data</h2>
              <p>
                Your information is used strictly to fulfill book deliveries across Sri Lankan postal districts, notify you of courier transit updates, and provide personalized literary recommendations.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="text-lg font-heading font-bold text-[var(--text-main)]">3. Data Protection & Security</h2>
              <p>
                We do not sell, rent, or trade your personal information to third parties. Courier partners only receive the contact and address information required to complete delivery to your doorstep.
              </p>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
