'use client';

import React from 'react';
import { useApp } from '../context/AppContext';
import {
  IconSparkle,
  IconBook,
  IconScroll,
  IconLeaf,
  IconFeather,
  IconCrown,
  IconAudioWave,
  IconCompass,
  IconClose,
} from './Icons';

interface GuideChip {
  id: string;
  label: string;
  sinhalaLabel?: string;
  query: string;
  icon: React.ReactNode;
}

const SEARCH_GUIDES: GuideChip[] = [
  {
    id: 'all',
    label: 'All Treatises',
    sinhalaLabel: 'සියලු ග්‍රන්ථ',
    query: '',
    icon: <IconCompass size={15} />,
  },
  {
    id: 'chronicles',
    label: 'Mahavamsa & Chronicles',
    sinhalaLabel: 'මහාවංසය',
    query: 'Mahavamsa',
    icon: <IconBook size={15} />,
  },
  {
    id: 'buddhism',
    label: 'Theravada Philosophy',
    sinhalaLabel: 'විසුද්ධිමග්ග',
    query: 'Buddhist',
    icon: <IconScroll size={15} />,
  },
  {
    id: 'ayurveda',
    label: 'Ayurveda & Healing',
    sinhalaLabel: 'දේශීය වෙදකම',
    query: 'Ayurveda',
    icon: <IconLeaf size={15} />,
  },
  {
    id: 'poetry',
    label: 'Classical Poetry (Kavya)',
    sinhalaLabel: 'සැළලිහිණිය',
    query: 'Poetry',
    icon: <IconFeather size={15} />,
  },
  {
    id: 'ola-leaf',
    label: 'Ola Leaf Replicas',
    sinhalaLabel: 'පුස්කොළ පොත්',
    query: 'Ola Leaf',
    icon: <IconScroll size={15} />,
  },
  {
    id: 'gold-embossed',
    label: 'Gold Foil Deluxe',
    sinhalaLabel: 'රන් මුද්‍රිත',
    query: 'Gold',
    icon: <IconCrown size={15} />,
  },
  {
    id: 'audiobooks',
    label: 'Recitations & Audio',
    sinhalaLabel: 'සජ්ඣායනා',
    query: 'chanting',
    icon: <IconAudioWave size={15} />,
  },
  {
    id: 'aesthetic',
    label: 'Archival Curations',
    sinhalaLabel: 'පුස්තකාල එකතුව',
    query: 'aesthetic',
    icon: <IconSparkle size={15} />,
  },
];

export default function SearchGuides() {
  const { searchQuery, setSearchQuery } = useApp();

  return (
    <div className="w-full bg-[var(--bg-surface)] border-b border-[var(--border-subtle)] py-2.5 px-4 sm:px-6 overflow-hidden">
      <div className="max-w-[1720px] mx-auto flex items-center gap-2 overflow-x-auto no-scrollbar scroll-smooth">
        <span className="text-xs font-semibold text-[var(--text-muted)] shrink-0 mr-1">
          Explore:
        </span>

        {SEARCH_GUIDES.map((chip) => {
          const isActive =
            chip.query === ''
              ? searchQuery === ''
              : searchQuery.toLowerCase().includes(chip.query.toLowerCase());

          return (
            <button
              key={chip.id}
              onClick={() => {
                if (isActive && chip.query !== '') {
                  setSearchQuery('');
                } else {
                  setSearchQuery(chip.query);
                }
              }}
              className={`shrink-0 h-9 px-3.5 rounded-full text-xs font-medium border transition-colors duration-150 cursor-pointer flex items-center gap-1.5 ${
                isActive
                  ? 'bg-[#222222] dark:bg-neutral-100 text-white dark:text-neutral-900 border-[#222222] dark:border-neutral-100 shadow-xs'
                  : 'bg-[var(--bg-input)] hover:bg-[var(--bg-hover)] text-[var(--text-main)] border-transparent'
              }`}
            >
              <span className={isActive ? 'text-white dark:text-neutral-900' : 'text-[var(--text-muted)]'}>
                {chip.icon}
              </span>
              <span>{chip.label}</span>
              {chip.sinhalaLabel && (
                <span className="font-sinhala text-[11px] opacity-60 hidden md:inline">
                  • {chip.sinhalaLabel}
                </span>
              )}
            </button>
          );
        })}

        {searchQuery && (
          <button
            onClick={() => setSearchQuery('')}
            className="shrink-0 h-9 px-3 rounded-full text-xs font-medium bg-[var(--bg-input)] hover:bg-[var(--bg-hover)] text-[var(--text-main)] cursor-pointer transition-colors flex items-center gap-1"
          >
            <IconClose size={12} />
            <span>Clear</span>
          </button>
        )}
      </div>
    </div>
  );
}
