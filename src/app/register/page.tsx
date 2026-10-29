'use client';

import React from 'react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import AuthModal from '../../components/AuthModal';
import { Heart } from 'lucide-react';

export default function RegisterPage() {
  return (
    <div className="min-h-screen bg-[var(--bg-main)] text-[var(--text-main)] flex flex-col">
      <Header isSticky />

      {/* Backdrop Content (Matches Screenshot 075903 behind the Create your account Dialog / Mobile Bottom Sheet) */}
      <main className="flex-1 page-container py-16 text-center flex flex-col items-center justify-center">
        <div className="w-16 h-16 rounded-full bg-[var(--bg-wash)] border border-[var(--border-subtle)] flex items-center justify-center mb-4">
          <Heart className="w-7 h-7 text-[var(--text-muted)]" />
        </div>
        <h1 className="font-heading font-bold text-2xl sm:text-3xl text-[var(--text-main)]">
          Create your Shastraloka reader account
        </h1>
        <p className="text-sm text-[var(--text-muted)] max-w-md mt-2">
          These are a few of your favorite things... or they will be, once you favorite something on Shastraloka.
        </p>
      </main>

      <Footer />

      {/* Desktop Modal Dialog / Mobile Bottom Sheet */}
      <AuthModal standaloneMode="register" />
    </div>
  );
}
