'use client';

import React from 'react';
import { useApp } from '../context/AppContext';

export default function Toast() {
  const { toastMessage } = useApp();

  if (!toastMessage) return null;

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 pointer-events-none animate-slide-up">
      <div className="px-5 py-3 rounded-full bg-[#111111] text-white text-xs sm:text-sm font-bold shadow-2xl flex items-center gap-2.5 border border-white/15">
        <span className="w-5 h-5 rounded-full bg-[#e60023] text-white flex items-center justify-center text-xs">
          ✓
        </span>
        <span>{toastMessage}</span>
      </div>
    </div>
  );
}
