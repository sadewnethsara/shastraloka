'use client';

import React from 'react';
import { useApp } from '../context/AppContext';
import { IconCheck } from './Icons';

export default function Toast() {
  const { toastMessage } = useApp();

  if (!toastMessage) return null;

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 pointer-events-none animate-slide-up">
      <div className="px-5 py-2.5 rounded-full bg-[var(--pill-active-bg)] text-[var(--pill-active-text)] text-xs sm:text-sm font-semibold shadow-2xl flex items-center gap-2.5 border border-[var(--border-subtle)]">
        <span className="w-5 h-5 rounded-full bg-[#e60023] text-white flex items-center justify-center">
          <IconCheck size={12} />
        </span>
        <span>{toastMessage}</span>
      </div>
    </div>
  );
}
