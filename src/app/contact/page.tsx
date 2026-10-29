'use client';

import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { MapPin, Phone, Mail, Clock, Send, BookOpen, CheckCircle2 } from 'lucide-react';

export default function ContactPage() {
  const { showToast } = useApp();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [topic, setTopic] = useState('Book Availability & Rare Editions');
  const [message, setMessage] = useState('');
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !message.trim()) return;
    setSent(true);
    showToast('Your message has been dispatched to the Shastraloka Chief Archivist.');
  };

  return (
    <div className="min-h-screen bg-[var(--bg-main)] text-[var(--text-main)] flex flex-col">
      <Header isSticky />
      <main className="flex-1 pb-20">
      <section className="bg-[var(--hero-banner-bg)] border-b border-[var(--border-subtle)] py-12">
        <div className="page-container">
          <span className="text-xs font-bold uppercase tracking-widest text-[#F1641E]">
            Shastraloka • Reader &amp; Scholar Desk
          </span>
          <h1 className="font-heading font-bold text-3xl sm:text-4xl md:text-5xl font-normal text-[var(--text-main)] mt-1">
            Contact Shastraloka Bookshop
          </h1>
          <p className="text-sm sm:text-base text-[var(--text-muted)] max-w-2xl mt-2">
            Inquire about rare palm-leaf facsimiles, institutional library orders, islandwide LKR dispatches, or manuscript
            authentication.
          </p>
        </div>
      </section>

      <div className="page-container pt-10 grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left: Sanctuary Locations & Contact Channels */}
        <div className="lg:col-span-5 space-y-4">
          <div className="p-6 rounded-3xl bg-[var(--bg-surface)] border border-[var(--border-subtle)] space-y-5">
            <h2 className="font-heading font-bold text-xl font-normal text-[var(--text-main)]">
              Archival Reading Rooms &amp; Vaults
            </h2>

            <div className="flex items-start gap-3.5">
              <div className="w-10 h-10 rounded-xl bg-[var(--bg-wash)] flex items-center justify-center shrink-0 text-[#F1641E]">
                <MapPin className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-[var(--text-main)]">Colombo 07 Flagship Scriptorium</h3>
                <p className="text-xs text-[var(--text-muted)] leading-relaxed mt-0.5">
                  No. 42, Ananda Coomaraswamy Mawatha (Nelum Pokuna Precinct), Colombo 07, Sri Lanka
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3.5">
              <div className="w-10 h-10 rounded-xl bg-[var(--bg-wash)] flex items-center justify-center shrink-0 text-[#F1641E]">
                <BookOpen className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-[var(--text-main)]">Kandy Palm-Leaf Conservation Wing</h3>
                <p className="text-xs text-[var(--text-muted)] leading-relaxed mt-0.5">
                  18 Raja Veediya, Near Dalada Maligawa Heritage Quarter, Kandy, Sri Lanka
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3.5">
              <div className="w-10 h-10 rounded-xl bg-[var(--bg-wash)] flex items-center justify-center shrink-0 text-[#F1641E]">
                <Phone className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-[var(--text-main)]">Direct Telephone &amp; WhatsApp Desk</h3>
                <p className="text-xs text-[var(--text-muted)] mt-0.5">+94 11 269 4488 • +94 77 882 1900</p>
              </div>
            </div>

            <div className="flex items-start gap-3.5">
              <div className="w-10 h-10 rounded-xl bg-[var(--bg-wash)] flex items-center justify-center shrink-0 text-[#F1641E]">
                <Mail className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-[var(--text-main)]">Official Electronic Mail</h3>
                <p className="text-xs text-[var(--text-muted)] mt-0.5">curators@shastraloka.lk • orders@shastraloka.lk</p>
              </div>
            </div>

            <div className="flex items-start gap-3.5">
              <div className="w-10 h-10 rounded-xl bg-[var(--bg-wash)] flex items-center justify-center shrink-0 text-[#F1641E]">
                <Clock className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-[var(--text-main)]">Sanctuary Hours</h3>
                <p className="text-xs text-[var(--text-muted)] mt-0.5">
                  Daily 9:00 AM – 7:00 PM (Closed on Full Moon Poya Days)
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Right: Inquiry Form */}
        <div className="lg:col-span-7">
          <div className="p-6 sm:p-8 rounded-3xl bg-[var(--bg-surface)] border border-[var(--border-subtle)]">
            {sent ? (
              <div className="py-12 text-center space-y-4">
                <div className="w-14 h-14 rounded-full bg-emerald-500/15 text-emerald-600 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-7 h-7" />
                </div>
                <h2 className="font-heading font-bold text-2xl text-[var(--text-main)]">Inquiry Received by Our Curators</h2>
                <p className="text-sm text-[var(--text-muted)] max-w-md mx-auto">
                  Thank you, <span className="font-semibold text-[var(--text-main)]">{name}</span>. Our literary desk will
                  respond to <span className="font-semibold text-[var(--text-main)]">{email}</span> shortly.
                </p>
                <button
                  onClick={() => {
                    setSent(false);
                    setMessage('');
                  }}
                  className="px-6 py-2.5 rounded-full bg-[var(--pill-active-bg)] text-[var(--pill-active-text)] text-xs font-semibold"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <h2 className="font-heading font-bold text-xl sm:text-2xl font-normal text-[var(--text-main)] mb-2">
                  Send a Dispatch to Our Booksellers
                </h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-[var(--text-main)] mb-1.5">Your Name *</label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Prof. Ananda Wickramasinghe"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-[var(--border-strong)] bg-[var(--bg-input)] text-sm text-[var(--text-main)] focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-[var(--text-main)] mb-1.5">Email Address *</label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="scholar@shastraloka.lk"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-[var(--border-strong)] bg-[var(--bg-input)] text-sm text-[var(--text-main)] focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[var(--text-main)] mb-1.5">Inquiry Topic</label>
                  <select
                    value={topic}
                    onChange={(e) => setTopic(e.target.value)}
                    aria-label="Inquiry Topic"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[var(--border-strong)] bg-[var(--bg-input)] text-sm text-[var(--text-main)] focus:outline-none"
                  >
                    <option>Book Availability &amp; Rare Editions</option>
                    <option>Islandwide Order &amp; Courier Tracking</option>
                    <option>University / Pirivena Bulk Library Order</option>
                    <option>Gift Cards &amp; Bespoke Collector Slipcases</option>
                    <option>Manuscript Digitization Partnership</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[var(--text-main)] mb-1.5">Message *</label>
                  <textarea
                    rows={5}
                    required
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Tell us the book title, author, or order number you are inquiring about..."
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[var(--border-strong)] bg-[var(--bg-input)] text-sm text-[var(--text-main)] focus:outline-none resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="inline-flex items-center justify-center gap-2 px-7 py-3 rounded-full bg-[var(--pill-active-bg)] text-[var(--pill-active-text)] text-sm font-semibold hover:opacity-90 transition-opacity"
                >
                  <Send className="w-4 h-4" />
                  Send Message
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
