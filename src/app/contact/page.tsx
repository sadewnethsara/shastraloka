'use client';

import React, { useState } from 'react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { Mail, Phone, MapPin, Send, CheckCircle2 } from 'lucide-react';

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-[var(--bg-main)] flex flex-col">
      <Header />
      <main className="page-container py-8 sm:py-16 flex-1">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-3xl sm:text-4xl font-heading font-bold text-[var(--text-main)] mb-3">
              Get in Touch with Shastraloka
            </h1>
            <p className="text-sm sm:text-base text-[var(--text-muted)] max-w-xl mx-auto">
              Have questions regarding book orders, manuscript submissions, or courier tracking? Our support team is here to assist.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {/* Contact Details */}
            <div className="space-y-6">
              <div className="p-6 rounded-2xl bg-[var(--bg-card)] border border-[var(--border-subtle)] space-y-4">
                <h2 className="text-lg font-heading font-bold text-[var(--text-main)] mb-4">
                  Headquarters & Archive Hub
                </h2>

                <div className="flex items-start gap-3 text-sm">
                  <MapPin className="w-5 h-5 text-[var(--color-primary)] shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-[var(--text-main)]">Shastraloka Publishing</p>
                    <p className="text-[var(--text-muted)]">No. 45/2, Sri Dharmarama Road, Colombo 03, Sri Lanka</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 text-sm">
                  <Phone className="w-5 h-5 text-[var(--color-primary)] shrink-0" />
                  <div>
                    <p className="font-semibold text-[var(--text-main)]">+94 11 258 9120 / +94 77 123 4567</p>
                    <p className="text-xs text-[var(--text-muted)]">Monday – Saturday: 8:30 AM – 6:30 PM</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 text-sm">
                  <Mail className="w-5 h-5 text-[var(--color-primary)] shrink-0" />
                  <div>
                    <p className="font-semibold text-[var(--text-main)]">orders@shastraloka.lk</p>
                    <p className="text-xs text-[var(--text-muted)]">Scholarly manuscripts: research@shastraloka.lk</p>
                  </div>
                </div>
              </div>

              <div className="p-6 rounded-2xl bg-[var(--bg-card)] border border-[var(--border-subtle)] text-xs text-[var(--text-muted)] space-y-2">
                <p className="font-bold text-[var(--text-main)]">Dual-Domain Online Ordering:</p>
                <p>Official Primary Store: <span className="text-[var(--color-primary)] font-semibold">https://shastraloka.lk</span></p>
                <p>National Domain: <span className="text-[var(--color-primary)] font-semibold">https://ශාස්ත්රාලෝක.ලංකා</span></p>
              </div>
            </div>

            {/* Message Form */}
            <div className="p-6 sm:p-8 rounded-2xl bg-[var(--bg-card)] border border-[var(--border-subtle)]">
              {submitted ? (
                <div className="py-12 text-center space-y-3">
                  <CheckCircle2 className="w-12 h-12 text-emerald-500 mx-auto" />
                  <h3 className="text-lg font-heading font-bold text-[var(--text-main)]">Message Dispatched</h3>
                  <p className="text-xs text-[var(--text-muted)]">
                    Our team will reply to your email within 24 business hours.
                  </p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="text-xs font-semibold text-[var(--color-primary)] underline cursor-pointer"
                  >
                    Send another message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <h2 className="text-lg font-heading font-bold text-[var(--text-main)] mb-2">
                    Send a Direct Message
                  </h2>

                  <div>
                    <label className="block text-xs font-semibold text-[var(--text-muted)] mb-1">Your Name</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Dr. Nimal Perera"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[var(--bg-surface)] border border-[var(--border-subtle)] text-sm text-[var(--text-main)] focus:outline-none focus:border-[var(--color-primary)]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[var(--text-muted)] mb-1">Email Address</label>
                    <input
                      type="email"
                      required
                      placeholder="nimal@example.com"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[var(--bg-surface)] border border-[var(--border-subtle)] text-sm text-[var(--text-main)] focus:outline-none focus:border-[var(--color-primary)]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[var(--text-muted)] mb-1">Inquiry Topic</label>
                    <select className="w-full px-3.5 py-2.5 rounded-xl bg-[var(--bg-surface)] border border-[var(--border-subtle)] text-sm text-[var(--text-main)] focus:outline-none focus:border-[var(--color-primary)]">
                      <option>Book Order Inquiry</option>
                      <option>Courier Delivery Status</option>
                      <option>Rare Manuscript Request</option>
                      <option>Author / Publisher Partnership</option>
                      <option>Other Feedback</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[var(--text-muted)] mb-1">Message</label>
                    <textarea
                      required
                      rows={4}
                      placeholder="How can our literary team help you?"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[var(--bg-surface)] border border-[var(--border-subtle)] text-sm text-[var(--text-main)] focus:outline-none focus:border-[var(--color-primary)]"
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 rounded-full bg-[var(--color-primary)] text-white text-sm font-semibold hover:opacity-90 transition flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <Send className="w-4 h-4" />
                    <span>Submit Message</span>
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
