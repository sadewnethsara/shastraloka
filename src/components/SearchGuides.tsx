'use client';

import React from 'react';
import { useApp } from '../context/AppContext';

interface GuideChip {
  id: string;
  label: string;
  sinhalaLabel?: string;
  query: string;
  bgColor: string;
  textColor: string;
  borderColor: string;
  icon: string;
}

const SEARCH_GUIDES: GuideChip[] = [
  {
    id: 'aesthetic',
    label: 'Aesthetic Covers',
    sinhalaLabel: 'කවර නිර්මාණ',
    query: 'aesthetic',
    bgColor: '#fce7f3',
    textColor: '#831843',
    borderColor: '#fbcfe8',
    icon: '✨',
  },
  {
    id: 'chronicles',
    label: 'Mahavamsa & History',
    sinhalaLabel: 'මහාවංසය',
    query: 'Mahavamsa',
    bgColor: '#fee2e2',
    textColor: '#991b1b',
    borderColor: '#fecaca',
    icon: '🦁',
  },
  {
    id: 'buddhism',
    label: 'Theravada Philosophy',
    sinhalaLabel: 'විසුද්ධිමග්ග',
    query: 'Buddhist',
    bgColor: '#fef3c7',
    textColor: '#92400e',
    borderColor: '#fde68a',
    icon: '☸️',
  },
  {
    id: 'ayurveda',
    label: 'Ayurveda & Healing',
    sinhalaLabel: 'දේශීය වෙදකම',
    query: 'Ayurveda',
    bgColor: '#d1fae5',
    textColor: '#065f46',
    borderColor: '#a7f3d0',
    icon: '🌿',
  },
  {
    id: 'poetry',
    label: 'Classical Poetry (Kavya)',
    sinhalaLabel: 'සැළලිහිණිය',
    query: 'Poetry',
    bgColor: '#e0e7ff',
    textColor: '#3730a3',
    borderColor: '#c7d2fe',
    icon: '📜',
  },
  {
    id: 'ola-leaf',
    label: 'Ola Leaf Collector Boxes',
    sinhalaLabel: 'පුස්කොළ පොත්',
    query: 'Ola Leaf',
    bgColor: '#ffedd5',
    textColor: '#9a3412',
    borderColor: '#fed7aa',
    icon: '🪶',
  },
  {
    id: 'quotes',
    label: 'Sacred Verses & Quotes',
    sinhalaLabel: 'ගාථා හා සුභාෂිත',
    query: 'verses',
    bgColor: '#f3e8ff',
    textColor: '#6b21a8',
    borderColor: '#e9d5ff',
    icon: '💬',
  },
  {
    id: 'gold-embossed',
    label: 'Gold Foil Deluxe',
    sinhalaLabel: 'රන් මුද්‍රිත',
    query: 'Gold',
    bgColor: '#fef9c3',
    textColor: '#854d0e',
    borderColor: '#fef08a',
    icon: '👑',
  },
  {
    id: 'audiobooks',
    label: 'Recitations & Audio',
    sinhalaLabel: 'සජ්ඣායනා',
    query: 'chanting',
    bgColor: '#ecfdf5',
    textColor: '#064e3b',
    borderColor: '#a7f3d0',
    icon: '🎧',
  },
];

export default function SearchGuides() {
  const { searchQuery, setSearchQuery } = useApp();

  return (
    <div className="w-full bg-[var(--bg-surface)] border-b border-[var(--border-subtle)] py-2.5 px-4 sm:px-6 overflow-hidden">
      <div className="max-w-[1720px] mx-auto flex items-center gap-2 overflow-x-auto no-scrollbar scroll-smooth">
        <span className="text-[11px] font-black uppercase tracking-wider text-[var(--text-muted)] shrink-0 mr-1 flex items-center gap-1">
          <span>Explore:</span>
        </span>

        {SEARCH_GUIDES.map((chip) => {
          const isActive = searchQuery.toLowerCase().includes(chip.query.toLowerCase());

          return (
            <button
              key={chip.id}
              onClick={() => {
                if (isActive) {
                  setSearchQuery('');
                } else {
                  setSearchQuery(chip.query);
                }
              }}
              style={{
                backgroundColor: isActive ? '#e60023' : chip.bgColor,
                color: isActive ? '#ffffff' : chip.textColor,
                borderColor: isActive ? '#e60023' : chip.borderColor,
              }}
              className={`shrink-0 px-3.5 py-1.5 rounded-full text-xs font-bold border transition-all duration-150 cursor-pointer flex items-center gap-1.5 shadow-2xs hover:scale-105 active:scale-95 ${
                isActive ? 'ring-2 ring-[#e60023]/40' : 'hover:opacity-90'
              }`}
            >
              <span>{chip.icon}</span>
              <span>{chip.label}</span>
              {chip.sinhalaLabel && (
                <span className="font-sinhala text-[10px] opacity-75 hidden sm:inline">
                  • {chip.sinhalaLabel}
                </span>
              )}
            </button>
          );
        })}

        {searchQuery && (
          <button
            onClick={() => setSearchQuery('')}
            className="shrink-0 px-3 py-1.5 rounded-full text-xs font-bold bg-[var(--bg-input)] text-[var(--text-main)] hover:bg-[var(--bg-hover)] cursor-pointer transition-colors"
          >
            Clear Filter ✕
          </button>
        )}
      </div>
    </div>
  );
}
