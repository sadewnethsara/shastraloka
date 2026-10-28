'use client';

import React from 'react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-[var(--bg-main)] flex flex-col">
      <Header />
      <main className="page-container py-8 sm:py-16 flex-1">
        <div className="max-w-3xl mx-auto space-y-8">
          <div className="border-b border-[var(--border-subtle)] pb-6">
            <h1 className="text-3xl sm:text-4xl font-heading font-bold text-[var(--text-main)] mb-2">
              Terms & Conditions
            </h1>
            <p className="text-sm text-[var(--text-muted)]">
              Last updated: October 2026 • Shastraloka Classical Bookstore (shastraloka.lk | ශාස්ත්රාලෝක.ලංකා)
            </p>
          </div>

          <div className="space-y-6 text-sm text-[var(--text-muted)] leading-relaxed">
            <section className="space-y-2">
              <h2 className="text-lg font-heading font-bold text-[var(--text-main)]">1. Acceptance of Terms</h2>
              <p>
                By accessing or placing an order through Shastraloka (accessible via shastraloka.lk and ශාස්ත්රාලෝක.ලංකා), you agree to be bound by these Terms and Conditions.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="text-lg font-heading font-bold text-[var(--text-main)]">2. Bookstore Catalog & Pricing</h2>
              <p>
                All book prices are quoted in Sri Lankan Rupees (LKR) inclusive of applicable taxes. We reserve the right to correct any typographical or pricing errors prior to dispatch.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="text-lg font-heading font-bold text-[var(--text-main)]">3. Orders & Payment</h2>
              <p>
                Orders may be paid via Cash on Delivery (COD) or verified electronic payment gateways. Orders placed for physical delivery will be verified via SMS or phone confirmation when necessary.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="text-lg font-heading font-bold text-[var(--text-main)]">4. Intellectual Property & Digital Content</h2>
              <p>
                Digital manuscript scans, audio chantings, and scholarly annotations published on Shastraloka are protected by copyright. Unauthorized reproduction or commercial distribution without written consent is prohibited.
              </p>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
