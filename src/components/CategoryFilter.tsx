'use client';

import React from 'react';
import { CATEGORIES } from '../data/books';
import { useApp } from '../context/AppContext';

export default function CategoryFilter() {
  const { selectedCategory, setSelectedCategory, activeBoardFilter, setActiveBoardFilter } = useApp();

  return (
    <div className="w-full max-w-[1720px] mx-auto px-4 sm:px-6 pt-5 pb-3">
      {/* If a board filter is currently active, show a badge with Clear option */}
      {activeBoardFilter && (
        <div className="mb-4 flex items-center justify-between p-3.5 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-amber-600 dark:text-amber-400">
          <div className="flex items-center gap-2">
            <span className="text-sm font-bold">Currently viewing filtered board collection</span>
          </div>
          <button
            onClick={() => setActiveBoardFilter(null)}
            className="text-xs font-bold underline hover:no-underline cursor-pointer"
          >
            Show All Books Feed
          </button>
        </div>
      )}

      {/* Category Filter Pills */}
      <div className="flex items-center gap-2.5 overflow-x-auto pb-2 scrollbar-none no-scrollbar">
        {CATEGORIES.map((category) => {
          const isActive = selectedCategory === category && !activeBoardFilter;
          return (
            <button
              key={category}
              onClick={() => {
                setActiveBoardFilter(null);
                setSelectedCategory(category);
              }}
              className={`shrink-0 px-4 py-2 rounded-full text-sm font-bold pill-btn cursor-pointer whitespace-nowrap transition-all duration-200 ${
                isActive
                  ? 'bg-[var(--pill-active-bg)] text-[var(--pill-active-text)] shadow-sm'
                  : 'bg-[var(--pill-bg)] text-[var(--text-main)] hover:bg-[var(--pill-hover)]'
              }`}
            >
              {category}
            </button>
          );
        })}
      </div>
    </div>
  );
}
