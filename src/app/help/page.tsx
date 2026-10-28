'use client';

import React, { useState } from 'react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { HelpCircle, ChevronDown, Truck, CreditCard, RotateCcw, BookOpen } from 'lucide-react';

const FAQS = [
  {
    q: 'How long does islandwide courier delivery take?',
    a: 'Deliveries within the Western Province (Colombo, Gampaha, Kalutara) typically arrive within 24 hours. Deliveries across all other islandwide districts (Kandy, Galle, Kurunegala, Jaffna, etc.) take 48 to 72 business hours via our tracked courier partners.',
  },
  {
    q: 'Do you offer Cash on Delivery (COD)?',
    a: 'Yes, Cash on Delivery is supported for all 25 districts in Sri Lanka. You can also pay securely online via Visa, MasterCard, and Koko / Mintpay installments.',
  },
  {
    q: 'Are your classical chronicles authoritative and authentic?',
    a: 'Every sacred treatise, Mahavamsa volume, and historical chronicle is sourced directly from accredited academic repositories including Buddhist Cultural Centre, M.D. Gunasena, and Godage Publishers with verified scholar annotations.',
  },
  {
    q: 'What is your return and exchange policy?',
    a: 'If your book arrives damaged in transit or with printing defects, you can request an exchange within 7 days of delivery. We provide free doorstep courier pickup for approved exchanges.',
  },
  {
    q: 'How does digital visual search work?',
    a: 'Our Visual Manuscript Search allows you to upload a photo of a book cover, handwritten title, or ola leaf inscription. Our neural image engine recognizes the text and surfaces matching volumes from our catalog.',
  },
];

export default function HelpPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="min-h-screen bg-[var(--bg-main)] flex flex-col">
      <Header />
      <main className="page-container py-8 sm:py-16 flex-1">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <div className="w-14 h-14 rounded-2xl bg-[var(--color-primary-subtle)] text-[var(--color-primary)] flex items-center justify-center mx-auto mb-3">
              <HelpCircle className="w-7 h-7" />
            </div>
            <h1 className="text-3xl sm:text-4xl font-heading font-bold text-[var(--text-main)]">
              Frequently Asked Questions & Help Center
            </h1>
            <p className="text-sm sm:text-base text-[var(--text-muted)] mt-2">
              Everything you need to know about purchasing, courier delivery, and classical text editions at Shastraloka.
            </p>
          </div>

          <div className="space-y-4">
            {FAQS.map((faq, idx) => {
              const isOpen = openIndex === idx;
              return (
                <div
                  key={idx}
                  className="rounded-2xl bg-[var(--bg-card)] border border-[var(--border-subtle)] overflow-hidden transition"
                >
                  <button
                    onClick={() => setOpenIndex(isOpen ? null : idx)}
                    className="w-full p-5 text-left flex items-center justify-between gap-4 cursor-pointer"
                  >
                    <span className="font-heading font-bold text-base text-[var(--text-main)]">
                      {faq.q}
                    </span>
                    <ChevronDown
                      className={`w-5 h-5 text-[var(--text-muted)] shrink-0 transition-transform ${
                        isOpen ? 'rotate-180 text-[var(--color-primary)]' : ''
                      }`}
                    />
                  </button>
                  {isOpen && (
                    <div className="px-5 pb-5 pt-1 text-sm text-[var(--text-muted)] leading-relaxed border-t border-[var(--border-subtle)] mt-1">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
