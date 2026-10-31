'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useApp } from '../context/AppContext';
import { BOOKS } from '../data/books';
import { IconShieldCheck, IconTruck, IconBook, IconStar, IconClose } from './Icons';

export default function HeroBanner() {
  const { openBookModal, setSelectedCategory } = useApp();
  const [dismissed, setDismissed] = useState(false);

  if (dismissed) return null;

  const mahawamsa = BOOKS.find((b) => b.id === 'mahawamsa-great-chronicle') || BOOKS[0];
  const visuddhimagga = BOOKS.find((b) => b.id === 'gajaga-wannama-royal-chronicle') || BOOKS[1];
  const fallbackCover =
    'https://grantha.lk/media/catalog/product/cache/5fa2393eb818a642e720faf99039a3de/m/a/manikkawatha_1.jpg';

  return (
    <div className="page-container mb-6">
      {/* Etsy-Inspired Editorial Secondary Band */}
      <div className="relative overflow-hidden rounded-xl bg-[var(--banner-guild-bg)] border border-[var(--banner-guild-border)] text-[var(--banner-guild-text)] p-6 sm:p-10 shadow-xs transition-colors">
        {/* Dismiss button */}
        <button
          onClick={() => setDismissed(true)}
          className="absolute top-4 right-4 w-7 h-7 rounded-full bg-[var(--bg-input)] hover:bg-[var(--bg-hover)] text-[var(--text-muted)] flex items-center justify-center text-xs cursor-pointer z-20"
          title="Dismiss banner"
          aria-label="Dismiss banner"
        >
          <IconClose size={14} />
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left Text Column */}
          <div className="lg:col-span-7 flex flex-col gap-3.5">
            {/* National Classical Archive Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--banner-guild-surface)] border border-[var(--banner-guild-border)] text-[var(--banner-guild-accent)] text-xs font-semibold tracking-wide w-fit">
              <span className="font-heading font-bold text-sm tracking-tight">SL</span>
              <span>National Classical Archive • National Heritage Collection</span>
            </div>

            {/* Display Headline */}
            <h1 className="text-2xl sm:text-3xl lg:text-[32px] font-heading font-bold tracking-tight text-[var(--banner-guild-text)] leading-snug">
              Treasury of Classical <span className="text-[var(--banner-guild-accent)]">Sri Lankan Chronicles</span> &amp; Ancient Treatises
            </h1>

            <p className="text-sm sm:text-base text-[var(--banner-guild-muted)] max-w-xl leading-relaxed">
              Discover authentic, archival editions of the Mahavamsa, Visuddhimagga, classical Sinhala Sandesha poetry, Jataka narratives, and indigenous Ayurvedic healing preserved in museum-grade physical bindings.
            </p>

            {/* Quick Actions */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                onClick={() => openBookModal(mahawamsa)}
                className="h-11 px-5 rounded-[var(--radius-btn,9999px)] bg-[var(--color-primary)] hover:bg-[var(--color-primary-hover)] text-white font-semibold text-sm pill-btn shadow-xs cursor-pointer flex items-center gap-2"
              >
                <span>Featured: The Mahavamsa (Great Chronicle)</span>
                <span>&rarr;</span>
              </button>

              <button
                onClick={() => setSelectedCategory('Buddhism, Philosophy & Classical Heritage')}
                className="h-11 px-5 rounded-full bg-[var(--bg-card)] text-[var(--text-main)] font-semibold text-sm border border-[var(--border-subtle)] hover:bg-[var(--bg-hover)] transition-colors cursor-pointer"
              >
                Explore Buddhist Philosophy
              </button>
            </div>

            {/* Key Value Assurances (Etsy & Pinterest Trust Badges) */}
            <div className="flex flex-wrap items-center gap-4 pt-3 text-xs text-[var(--banner-guild-muted)] font-medium">
              <span className="flex items-center gap-1.5">
                <IconShieldCheck size={16} className="text-[var(--banner-guild-accent)]" />
                <span>Certified National Archive Texts</span>
              </span>
              <span className="flex items-center gap-1.5">
                <IconTruck size={16} className="text-[var(--banner-guild-accent)]" />
                <span>Island-wide Courier (COD Available)</span>
              </span>
              <span className="flex items-center gap-1.5">
                <IconBook size={16} className="text-[var(--banner-guild-accent)]" />
                <span>Deluxe Gold Foil &amp; Hardcover</span>
              </span>
            </div>
          </div>

          {/* Right Column: Real Photographic Preview Cards */}
          <div className="lg:col-span-5 hidden lg:flex items-center justify-center gap-4">
            {/* Card 1: Visuddhimagga */}
            <div
              onClick={() => openBookModal(visuddhimagga)}
              className="w-40 bg-[var(--bg-card)] rounded-lg p-2.5 shadow-sm hover:shadow-md transition-shadow cursor-pointer border border-[var(--border-subtle)]"
            >
              <div className="w-full aspect-[1/1.4] rounded-md overflow-hidden bg-[var(--bg-wash)]">
                <img
                  src={visuddhimagga.coverImage}
                  alt={visuddhimagga.title}
                  referrerPolicy="no-referrer"
                  onError={(e) => {
                    if (e.currentTarget.src !== fallbackCover) e.currentTarget.src = fallbackCover;
                  }}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="pt-2">
                <p className="text-xs text-[var(--banner-guild-accent)] font-medium truncate">
                  {visuddhimagga.category}
                </p>
                <p className="font-heading font-bold text-xs text-[var(--text-main)] truncate mt-0.5">
                  {visuddhimagga.title}
                </p>
                <p className="text-xs font-bold text-[var(--text-main)] mt-1">
                  Rs. {visuddhimagga.price.toLocaleString()}
                </p>
              </div>
            </div>

            {/* Card 2: Mahavamsa (Featured) */}
            <div
              onClick={() => openBookModal(mahawamsa)}
              className="w-48 bg-[var(--bg-card)] rounded-lg p-3 shadow-md hover:shadow-lg transition-shadow cursor-pointer border-2 border-[var(--banner-guild-accent)]/40"
            >
              <div className="flex items-center justify-between pb-1.5 text-[11px] font-semibold text-[var(--banner-guild-accent)]">
                <span>NATIONAL CHRONICLE</span>
                <span className="flex items-center gap-0.5">
                  <IconStar size={11} className="text-amber-500" />
                  <span>4.98</span>
                </span>
              </div>
              <div className="w-full aspect-[1/1.45] rounded-md overflow-hidden bg-[var(--bg-wash)]">
                <img
                  src={mahawamsa.coverImage}
                  alt={mahawamsa.title}
                  referrerPolicy="no-referrer"
                  onError={(e) => {
                    if (e.currentTarget.src !== fallbackCover) e.currentTarget.src = fallbackCover;
                  }}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="pt-2">
                <p className="text-xs text-[var(--banner-guild-accent)] font-medium truncate">
                  {mahawamsa.category}
                </p>
                <p className="font-heading font-bold text-xs sm:text-sm text-[var(--text-main)] line-clamp-1 mt-0.5">
                  {mahawamsa.title}
                </p>
                <div className="flex items-center justify-between mt-1">
                  <span className="text-xs font-bold text-[var(--text-main)]">
                    Rs. {mahawamsa.price.toLocaleString()}
                  </span>
                  <span className="px-2 py-0.5 rounded-full bg-[var(--color-accent-badge)] text-[var(--color-accent-badge-text)] text-[10px] font-bold">
                    Featured
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
