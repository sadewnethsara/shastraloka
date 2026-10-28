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

  const mahawamsa = BOOKS[0];
  const visuddhimagga = BOOKS[1];

  return (
    <div className="max-w-[1720px] mx-auto px-4 sm:px-6 mb-6">
      {/* Etsy-Inspired Editorial Secondary Band (Surface-Cream #fdf6e8) */}
      <div className="relative overflow-hidden rounded-xl bg-[#fdf6e8] dark:bg-[#201a14] border border-[#f5e8c8] dark:border-[#3a2e22] text-[#222222] dark:text-neutral-100 p-6 sm:p-10 shadow-xs">
        {/* Dismiss button */}
        <button
          onClick={() => setDismissed(true)}
          className="absolute top-4 right-4 w-7 h-7 rounded-full bg-black/5 hover:bg-black/10 dark:bg-white/10 dark:hover:bg-white/20 text-neutral-600 dark:text-neutral-300 flex items-center justify-center text-xs cursor-pointer z-20"
          title="Dismiss banner"
          aria-label="Dismiss banner"
        >
          <IconClose size={14} />
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left Text Column */}
          <div className="lg:col-span-7 flex flex-col gap-3.5">
            {/* National Classical Archive Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#f5e8c8] dark:bg-[#34271a] text-[#a66523] dark:text-amber-300 text-xs font-semibold tracking-wide w-fit">
              <span className="font-heading font-bold text-sm tracking-tight">SL</span>
              <span>National Classical Archive • National Heritage Collection</span>
            </div>

            {/* Display Headline (Etsy Display-XL: 32px / 600 weight) */}
            <h1 className="text-2xl sm:text-3xl lg:text-[32px] font-heading font-bold tracking-tight text-[#222222] dark:text-white leading-snug">
              Treasury of Classical <span className="text-[#a66523] dark:text-amber-400">Sri Lankan Chronicles</span> & Ancient Treatises
            </h1>

            <p className="text-sm sm:text-base text-[#3f3f3f] dark:text-neutral-300 max-w-xl leading-relaxed">
              Discover authentic, archival editions of the Mahavamsa, Visuddhimagga, classical Sinhala Sandesha poetry, Jataka narratives, and indigenous Ayurvedic healing preserved in museum-grade physical bindings.
            </p>

            {/* Quick Actions */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                onClick={() => openBookModal(mahawamsa)}
                className="h-11 px-5 rounded-full bg-[#e60023] hover:bg-[#ad081b] text-white font-semibold text-sm pill-btn shadow-xs cursor-pointer flex items-center gap-2"
              >
                <span>Featured: The Mahavamsa (Great Chronicle)</span>
                <span>&rarr;</span>
              </button>

              <button
                onClick={() => setSelectedCategory('Buddhism, Philosophy & Classical Heritage')}
                className="h-11 px-5 rounded-full bg-white dark:bg-neutral-800 text-[#222222] dark:text-white font-semibold text-sm border border-[#e6e6e6] dark:border-neutral-700 hover:bg-neutral-50 dark:hover:bg-neutral-700 transition-colors cursor-pointer"
              >
                Explore Buddhist Philosophy
              </button>
            </div>

            {/* Key Value Assurances (Etsy & Pinterest Trust Badges) */}
            <div className="flex flex-wrap items-center gap-4 pt-3 text-xs text-[#595959] dark:text-neutral-400 font-medium">
              <span className="flex items-center gap-1.5">
                <IconShieldCheck size={16} className="text-[#a66523] dark:text-amber-400" />
                <span>Certified National Archive Texts</span>
              </span>
              <span className="flex items-center gap-1.5">
                <IconTruck size={16} className="text-[#a66523] dark:text-amber-400" />
                <span>Island-wide Courier (COD Available)</span>
              </span>
              <span className="flex items-center gap-1.5">
                <IconBook size={16} className="text-[#a66523] dark:text-amber-400" />
                <span>Deluxe Gold Foil & Hardcover</span>
              </span>
            </div>
          </div>

          {/* Right Column: Real Photographic Preview Cards */}
          <div className="lg:col-span-5 hidden lg:flex items-center justify-center gap-4">
            {/* Card 1: Visuddhimagga */}
            <div
              onClick={() => openBookModal(visuddhimagga)}
              className="w-40 bg-white dark:bg-neutral-900 rounded-lg p-2.5 shadow-sm hover:shadow-md transition-shadow cursor-pointer border border-[#ebdcc2] dark:border-neutral-800"
            >
              <div className="w-full aspect-[1/1.4] rounded-md overflow-hidden bg-neutral-100">
                <img
                  src={visuddhimagga.coverImage}
                  alt={visuddhimagga.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="pt-2">
                <p className="text-xs text-[#a66523] dark:text-amber-400 font-medium truncate">
                  {visuddhimagga.category}
                </p>
                <p className="font-heading font-bold text-xs text-[#222222] dark:text-white truncate mt-0.5">
                  {visuddhimagga.title}
                </p>
                <p className="text-xs font-bold text-[#222222] dark:text-white mt-1">
                  Rs. {visuddhimagga.price.toLocaleString()}
                </p>
              </div>
            </div>

            {/* Card 2: Mahavamsa (Featured) */}
            <div
              onClick={() => openBookModal(mahawamsa)}
              className="w-48 bg-white dark:bg-neutral-900 rounded-lg p-3 shadow-md hover:shadow-lg transition-shadow cursor-pointer border-2 border-[#a66523]/40"
            >
              <div className="flex items-center justify-between pb-1.5 text-[11px] font-semibold text-[#a66523]">
                <span>NATIONAL CHRONICLE</span>
                <span className="flex items-center gap-0.5">
                  <IconStar size={11} className="text-amber-500" />
                  <span>4.98</span>
                </span>
              </div>
              <div className="w-full aspect-[1/1.45] rounded-md overflow-hidden bg-neutral-100">
                <img
                  src={mahawamsa.coverImage}
                  alt={mahawamsa.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="pt-2">
                <p className="text-xs text-[#a66523] dark:text-amber-400 font-medium truncate">
                  {mahawamsa.category}
                </p>
                <p className="font-heading font-bold text-xs sm:text-sm text-[#222222] dark:text-white line-clamp-1 mt-0.5">
                  {mahawamsa.title}
                </p>
                <div className="flex items-center justify-between mt-1">
                  <span className="text-xs font-bold text-[#222222] dark:text-white">
                    Rs. {mahawamsa.price.toLocaleString()}
                  </span>
                  <span className="px-2 py-0.5 rounded-full bg-[#e60023] text-white text-[10px] font-bold">
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
