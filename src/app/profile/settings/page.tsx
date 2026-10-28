'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Header from '../../../components/Header';
import Footer from '../../../components/Footer';
import { useApp } from '../../../context/AppContext';
import { Settings, Save, ArrowLeft, CheckCircle2 } from 'lucide-react';

export default function ProfileSettingsPage() {
  const { isDark, toggleTheme } = useApp();
  const [name, setName] = useState('Kasun Fernando');
  const [district, setDistrict] = useState('Colombo');
  const [phone, setPhone] = useState('077 123 4567');
  const [saved, setSaved] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="min-h-screen bg-[var(--bg-main)] flex flex-col">
      <Header />
      <main className="page-container py-8 sm:py-12 flex-1">
        <div className="max-w-2xl mx-auto">
          <div className="flex items-center justify-between pb-6 border-b border-[var(--border-subtle)] mb-8">
            <div>
              <h1 className="text-2xl sm:text-3xl font-heading font-bold text-[var(--text-main)] flex items-center gap-2.5">
                <Settings className="w-6 h-6 text-[var(--color-primary)]" />
                <span>Account & Delivery Settings</span>
              </h1>
              <p className="text-xs sm:text-sm text-[var(--text-muted)] mt-1">
                Manage your profile details and primary shipping district
              </p>
            </div>
            <Link
              href="/profile"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-[var(--color-primary)] hover:underline"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Profile</span>
            </Link>
          </div>

          <form onSubmit={handleSave} className="p-6 sm:p-8 rounded-2xl bg-[var(--bg-card)] border border-[var(--border-subtle)] space-y-6">
            <div>
              <label className="block text-xs font-semibold text-[var(--text-muted)] mb-1.5">Full Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl bg-[var(--bg-surface)] border border-[var(--border-subtle)] text-sm text-[var(--text-main)] focus:outline-none focus:border-[var(--color-primary)]"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-[var(--text-muted)] mb-1.5">Primary Delivery District</label>
              <select
                value={district}
                onChange={(e) => setDistrict(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl bg-[var(--bg-surface)] border border-[var(--border-subtle)] text-sm text-[var(--text-main)] focus:outline-none focus:border-[var(--color-primary)]"
              >
                <option value="Colombo">Colombo (Next Day Delivery)</option>
                <option value="Gampaha">Gampaha</option>
                <option value="Kalutara">Kalutara</option>
                <option value="Kandy">Kandy</option>
                <option value="Galle">Galle</option>
                <option value="Matara">Matara</option>
                <option value="Kurunegala">Kurunegala</option>
                <option value="Anuradhapura">Anuradhapura</option>
                <option value="Jaffna">Jaffna</option>
                <option value="Badulla">Badulla</option>
                <option value="Ratnapura">Ratnapura</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-[var(--text-muted)] mb-1.5">Delivery Contact Phone</label>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl bg-[var(--bg-surface)] border border-[var(--border-subtle)] text-sm text-[var(--text-main)] focus:outline-none focus:border-[var(--color-primary)]"
              />
            </div>

            <div className="pt-2 border-t border-[var(--border-subtle)] flex items-center justify-between">
              <span className="text-sm font-semibold text-[var(--text-main)]">Dark Mode Theme</span>
              <button
                type="button"
                onClick={toggleTheme}
                className="px-3.5 py-1.5 rounded-full border border-[var(--border-subtle)] text-xs font-semibold text-[var(--text-main)] hover:bg-[var(--bg-surface)] transition cursor-pointer"
              >
                {isDark ? 'Switch to Light' : 'Switch to Dark'}
              </button>
            </div>

            <div className="pt-4 flex items-center gap-3">
              <button
                type="submit"
                className="px-6 py-2.5 rounded-full bg-[var(--color-primary)] text-white text-sm font-semibold hover:opacity-90 transition flex items-center gap-2 cursor-pointer"
              >
                <Save className="w-4 h-4" />
                <span>Save Changes</span>
              </button>
              {saved && (
                <span className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Settings saved successfully</span>
                </span>
              )}
            </div>
          </form>
        </div>
      </main>
      <Footer />
    </div>
  );
}
