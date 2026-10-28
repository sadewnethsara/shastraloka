'use client';

import React from 'react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { Truck, RotateCcw, ShieldCheck, Clock, MapPin } from 'lucide-react';

export default function ShippingReturnsPage() {
  return (
    <div className="min-h-screen bg-[var(--bg-main)] flex flex-col">
      <Header />
      <main className="page-container py-8 sm:py-16 flex-1">
        <div className="max-w-3xl mx-auto space-y-12">
          <div className="text-center space-y-3">
            <h1 className="text-3xl sm:text-4xl font-heading font-bold text-[var(--text-main)]">
              Islandwide Shipping & Returns Policy
            </h1>
            <p className="text-sm sm:text-base text-[var(--text-muted)]">
              Fast, secure courier delivery across all 25 districts in Sri Lanka with dedicated book care packaging.
            </p>
          </div>

          {/* Delivery Rates Table */}
          <div className="p-6 rounded-2xl bg-[var(--bg-card)] border border-[var(--border-subtle)] space-y-4">
            <h2 className="text-xl font-heading font-bold text-[var(--text-main)] flex items-center gap-2">
              <Truck className="w-5 h-5 text-[var(--color-primary)]" />
              <span>Courier Delivery Schedule & Rates</span>
            </h2>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead>
                  <tr className="border-b border-[var(--border-subtle)] text-xs uppercase tracking-wider text-[var(--text-muted)]">
                    <th className="py-3 px-4">Region</th>
                    <th className="py-3 px-4">Delivery Time</th>
                    <th className="py-3 px-4">Standard Rate</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[var(--border-subtle)]">
                  <tr>
                    <td className="py-3 px-4 font-semibold text-[var(--text-main)]">Colombo & Greater Suburbs</td>
                    <td className="py-3 px-4 text-[var(--text-muted)]">Next Business Day (24 hrs)</td>
                    <td className="py-3 px-4 font-bold text-[var(--text-main)]">LKR 250</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4 font-semibold text-[var(--text-main)]">Western Province (Gampaha, Kalutara)</td>
                    <td className="py-3 px-4 text-[var(--text-muted)]">24 – 36 Hours</td>
                    <td className="py-3 px-4 font-bold text-[var(--text-main)]">LKR 300</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4 font-semibold text-[var(--text-main)]">All Other Districts (Kandy, Galle, Jaffna, etc.)</td>
                    <td className="py-3 px-4 text-[var(--text-muted)]">48 – 72 Hours</td>
                    <td className="py-3 px-4 font-bold text-[var(--text-main)]">LKR 350</td>
                  </tr>
                  <tr className="bg-[var(--color-primary-subtle)]/30">
                    <td className="py-3 px-4 font-bold text-[var(--color-primary)]">Orders over LKR 3,500</td>
                    <td className="py-3 px-4 text-[var(--color-primary)] font-medium">Any District in Sri Lanka</td>
                    <td className="py-3 px-4 font-bold text-emerald-600 dark:text-emerald-400">FREE SHIPPING</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Returns & Exchanges */}
          <div className="p-6 rounded-2xl bg-[var(--bg-card)] border border-[var(--border-subtle)] space-y-4">
            <h2 className="text-xl font-heading font-bold text-[var(--text-main)] flex items-center gap-2">
              <RotateCcw className="w-5 h-5 text-[var(--color-primary)]" />
              <span>7-Day Return & Replacement Guarantee</span>
            </h2>
            <div className="text-sm text-[var(--text-muted)] leading-relaxed space-y-3">
              <p>
                We inspect every copy before dispatch to ensure binding integrity and pristine page condition. In the rare event that your book arrives damaged or defective:
              </p>
              <ul className="list-disc pl-5 space-y-1.5">
                <li>Contact our helpline at +94 11 258 9120 within 7 days of receiving your package.</li>
                <li>Our courier will arrange a doorstep replacement pickup free of charge.</li>
                <li>Digital audio chantings and digital e-book downloads are non-refundable once unlocked.</li>
              </ul>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
