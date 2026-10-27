'use client';

import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { BOOKS } from '../data/books';

export default function HeroBanner() {
  const { openBookModal, setSelectedCategory } = useApp();
  const [dismissed, setDismissed] = useState(false);

  if (dismissed) return null;

  const mahawamsa = BOOKS[0];
  const visuddhimagga = BOOKS[1];
  const dhammapada = BOOKS[2];

  return (
    <div className="max-w-[1720px] mx-auto px-4 sm:px-6 mb-6">
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-[#1f0507] via-[#480c12] to-[#170305] text-white p-6 sm:p-10 shadow-xl border border-red-950/40">
        
        {/* Ambient Glow */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-red-600/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-1/3 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
        
        {/* Dismiss button */}
        <button
          onClick={() => setDismissed(true)}
          className="absolute top-4 right-4 w-8 h-8 rounded-full bg-black/40 hover:bg-black/60 text-white/70 hover:text-white flex items-center justify-center text-sm cursor-pointer z-20"
          title="Dismiss banner"
        >
          ✕
        </button>

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left Text */}
          <div className="lg:col-span-7 flex flex-col gap-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-400/20 border border-amber-300/30 text-amber-300 text-xs font-bold tracking-wider uppercase w-fit">
              <span>✦</span> ශ්‍රී ලංකා පුස්තකාල එකතුව • Ceylon Heritage Collection
            </div>

            <h1 className="text-3xl sm:text-5xl font-serif font-black tracking-tight text-white leading-tight">
              Treasury of Ancient <span className="text-amber-300">Sri Lankan Chronicles</span> & Treatises
            </h1>

            <p className="text-base sm:text-lg text-white/80 max-w-xl font-medium leading-relaxed">
              Discover authentic editions of the Mahavamsa, Visuddhimagga, classical Sinhala Sandesha poetry, Jataka narratives, and indigenous Ayurvedic healing preserved in an infinite visual layout.
            </p>

            {/* Quick Actions */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                onClick={() => openBookModal(mahawamsa)}
                className="px-6 py-3 rounded-full bg-[#e60023] hover:bg-[#ad081b] text-white font-bold text-sm sm:text-base pill-btn shadow-lg cursor-pointer flex items-center gap-2"
              >
                <span>Featured: The Mahavamsa (මහාවංසය)</span>
                <span>→</span>
              </button>

              <button
                onClick={() => setSelectedCategory('Buddhist Philosophy (Abhidhamma)')}
                className="px-5 py-3 rounded-full bg-white/10 hover:bg-white/20 text-white font-bold text-sm sm:text-base pill-btn backdrop-blur-sm border border-white/15 cursor-pointer"
              >
                Explore Buddhist Philosophy
              </button>
            </div>

            {/* Key Value Props */}
            <div className="flex flex-wrap items-center gap-3 pt-3 text-xs text-amber-200/90 font-medium">
              <span className="flex items-center gap-1.5 bg-black/30 px-3 py-1.5 rounded-full border border-white/10">
                <span>✓</span> Authentic Sinhala & Pali Translations
              </span>
              <span className="flex items-center gap-1.5 bg-black/30 px-3 py-1.5 rounded-full border border-white/10">
                <span>✓</span> Sri Lanka Island-wide Delivery (COD Available)
              </span>
              <span className="flex items-center gap-1.5 bg-black/30 px-3 py-1.5 rounded-full border border-white/10">
                <span>✓</span> Deluxe Gold Embossed & Ola Leaf Bindings
              </span>
            </div>
          </div>

          {/* Right Floating Visual Cards */}
          <div className="lg:col-span-5 hidden lg:flex items-center justify-center gap-4 relative">
            {/* Card 1 - Visuddhimagga */}
            <div 
              onClick={() => openBookModal(visuddhimagga)}
              className="w-44 h-64 rounded-2xl p-4 flex flex-col justify-between shadow-2xl cursor-pointer hover:scale-105 transition-transform duration-300 border border-amber-300/30 transform -rotate-3"
              style={{ background: visuddhimagga.bgGradient }}
            >
              <span className="text-[10px] uppercase font-bold tracking-widest text-amber-300">Abhidhamma</span>
              <div className="text-center font-sinhala font-bold text-amber-100 text-lg">
                {visuddhimagga.sinhalaTitle}
              </div>
              <div className="text-[11px] text-white/80 font-bold">Rs. {visuddhimagga.price.toLocaleString()}</div>
            </div>

            {/* Card 2 - Mahavamsa (Center Hero) */}
            <div 
              onClick={() => openBookModal(mahawamsa)}
              className="w-48 h-72 rounded-2xl p-4 flex flex-col justify-between shadow-2xl cursor-pointer hover:scale-105 transition-transform duration-300 border-2 border-amber-300/50 transform z-10"
              style={{ background: mahawamsa.bgGradient }}
            >
              <div className="flex justify-between items-center text-xs text-amber-300 font-bold">
                <span>CHRONICLE</span>
                <span>🦁</span>
              </div>
              <div className="text-center">
                <div className="font-sinhala font-bold text-amber-200 text-2xl">
                  {mahawamsa.sinhalaTitle}
                </div>
                <div className="text-xs text-white/90 mt-1 font-serif line-clamp-2">{mahawamsa.title}</div>
              </div>
              <div className="flex justify-between items-center text-xs font-bold text-white">
                <span>★ 4.98</span>
                <span className="px-2 py-0.5 rounded-full bg-[#e60023]">SAVE</span>
              </div>
            </div>

            {/* Card 3 - Dhammapada */}
            <div 
              onClick={() => openBookModal(dhammapada)}
              className="w-44 h-64 rounded-2xl p-4 flex flex-col justify-between shadow-2xl cursor-pointer hover:scale-105 transition-transform duration-300 border border-amber-300/30 transform rotate-3"
              style={{ background: dhammapada.bgGradient }}
            >
              <span className="text-[10px] uppercase font-bold tracking-widest text-amber-300">Dhamma</span>
              <div className="text-center font-sinhala font-bold text-amber-100 text-lg">
                {dhammapada.sinhalaTitle}
              </div>
              <div className="text-[11px] text-white/80 font-bold">Rs. {dhammapada.price.toLocaleString()}</div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
