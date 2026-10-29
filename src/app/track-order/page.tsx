'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useApp } from '../../context/AppContext';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { Truck, Search, PackageCheck, MapPin, CheckCircle2, ArrowRight } from 'lucide-react';

export default function TrackOrderPage() {
  const { orders } = useApp();
  const [orderInput, setOrderInput] = useState('LK-847291');
  const [searchedId, setSearchedId] = useState('LK-847291');

  const matchedOrder = orders.find(
    (o) => o?.id && o.id.toLowerCase() === searchedId.trim().toLowerCase()
  );

  const handleLookup = (e: React.FormEvent) => {
    e.preventDefault();
    if (!orderInput.trim()) return;
    setSearchedId(orderInput.trim());
  };

  return (
    <div className="min-h-screen bg-[var(--bg-main)] text-[var(--text-main)] flex flex-col">
      <Header isSticky />

      <main className="flex-1 pb-20">
        <section className="bg-[var(--hero-banner-bg)] border-b border-[var(--border-subtle)] py-12">
          <div className="max-w-[960px] mx-auto px-4 sm:px-6 text-center">
            <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#F1641E] mb-2">
              <Truck className="w-4 h-4" /> Islandwide Courier Telemetry
            </span>
            <h1 className="font-heading font-bold text-3xl sm:text-4xl font-normal text-[var(--text-main)]">
              Track Your Shastraloka Book Dispatch
            </h1>
            <p className="text-xs sm:text-sm text-[var(--text-muted)] max-w-lg mx-auto mt-1.5">
              Enter your Order ID (e.g., <code className="font-mono font-bold">LK-847291</code>) to inspect archival packaging and
              district courier checkpoints.
            </p>

            <form onSubmit={handleLookup} className="max-w-md mx-auto mt-6 flex items-center gap-2">
              <div className="relative flex-1">
                <input
                  type="text"
                  value={orderInput}
                  onChange={(e) => setOrderInput(e.target.value)}
                  placeholder="Enter Order ID (e.g. LK-847291)"
                  className="w-full pl-4 pr-10 py-3 rounded-full border border-[var(--border-strong)] bg-[var(--bg-input)] text-sm text-[var(--text-main)] focus:outline-none"
                />
                <Search className="w-4 h-4 text-[var(--text-muted)] absolute right-3.5 top-1/2 -translate-y-1/2" />
              </div>
              <button
                type="submit"
                className="px-6 py-3 rounded-full bg-[var(--pill-active-bg)] text-[var(--pill-active-text)] text-xs sm:text-sm font-semibold shrink-0"
              >
                Track Order
              </button>
            </form>
          </div>
        </section>

        <div className="max-w-[900px] mx-auto px-4 sm:px-6 pt-10">
          <div className="p-6 sm:p-8 rounded-3xl bg-[var(--bg-surface)] border border-[var(--border-subtle)] space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-4 pb-5 border-b border-[var(--border-subtle)]">
              <div>
                <span className="text-xs text-[var(--text-muted)]">Dispatch Reference</span>
                <h2 className="font-heading font-bold text-2xl font-bold text-[var(--text-main)]">{searchedId.toUpperCase()}</h2>
                <p className="text-xs text-[var(--text-muted)] mt-0.5">
                  Destination: {matchedOrder?.customer?.address || 'Colombo 07 / Kandy District Hub, Sri Lanka'}
                </p>
              </div>
              <div className="text-right">
                <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-emerald-500/15 text-emerald-600 text-xs font-bold capitalize">
                  <PackageCheck className="w-4 h-4" />
                  {matchedOrder?.status || 'In Transit — Islandwide Express'}
                </span>
                <p className="text-xs text-[var(--text-muted)] mt-1.5">
                  Total: LKR {(matchedOrder?.total || 4250).toLocaleString()}
                </p>
              </div>
            </div>

            {/* 4-Step Delivery Timeline */}
            <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 py-2">
              {[
                {
                  step: '1. Order Confirmed',
                  desc: 'Verified at Colombo 07 Scriptorium Vault',
                  time: 'Completed • 09:15 AM',
                  done: true,
                },
                {
                  step: '2. Archival Wrapping',
                  desc: 'Moisture-sealed with brass seal & corner guards',
                  time: 'Completed • 11:40 AM',
                  done: true,
                },
                {
                  step: '3. District Courier Hub',
                  desc: 'Dispatched via Certis Lanka / Pronto Express',
                  time: 'Active Checkpoint',
                  done: true,
                },
                {
                  step: '4. Doorstep Delivery',
                  desc: 'Estimated arrival within 24 hours',
                  time: 'Upcoming',
                  done: false,
                },
              ].map((checkpoint) => (
                <div
                  key={checkpoint.step}
                  className={`p-4 rounded-2xl border ${
                    checkpoint.done
                      ? 'bg-[var(--bg-wash)] border-[var(--border-strong)]'
                      : 'bg-[var(--bg-main)] border-[var(--border-subtle)] opacity-75'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <CheckCircle2
                      className={`w-5 h-5 ${checkpoint.done ? 'text-[#F1641E]' : 'text-[var(--text-dim)]'}`}
                    />
                    <span className="text-[11px] font-medium text-[var(--text-muted)]">{checkpoint.time}</span>
                  </div>
                  <h3 className="text-xs sm:text-sm font-bold text-[var(--text-main)]">{checkpoint.step}</h3>
                  <p className="text-xs text-[var(--text-muted)] mt-1 leading-relaxed">{checkpoint.desc}</p>
                </div>
              ))}
            </div>

            <div className="pt-4 border-t border-[var(--border-subtle)] flex flex-wrap items-center justify-between gap-4 text-xs text-[var(--text-muted)]">
              <span className="inline-flex items-center gap-1.5">
                <MapPin className="w-4 h-4 text-[#F1641E]" /> Insured islandwide courier across all 25 districts
              </span>
              <Link
                href="/orders"
                className="inline-flex items-center gap-1 font-semibold text-[var(--text-main)] hover:text-[#F1641E] underline"
              >
                View full Orders History <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
