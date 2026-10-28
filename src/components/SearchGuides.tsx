'use client';

import React from 'react';
import { useApp } from '../context/AppContext';
import {
  Compass,
  BookOpen,
  GraduationCap,
  Languages,
  Sparkles,
  Smile,
  Library,
  X as IconClose,
} from 'lucide-react';

interface GuideChip {
  id: string;
  label: string;
  query: string;
  icon: React.ReactNode;
}

const SEARCH_GUIDES: GuideChip[] = [
  {
    id: 'all',
    label: 'All Books',
    query: '',
    icon: <Compass className="w-4 h-4" />,
  },
  {
    id: 'novels',
    label: 'Novels',
    query: 'Novels',
    icon: <BookOpen className="w-4 h-4" />,
  },
  {
    id: 'past-papers',
    label: 'A/L Past Papers',
    query: 'Past Papers',
    icon: <GraduationCap className="w-4 h-4" />,
  },
  {
    id: 'translations',
    label: 'Translations',
    query: 'Translations',
    icon: <Languages className="w-4 h-4" />,
  },
  {
    id: 'self-help',
    label: 'Self-Help',
    query: 'Self-Help',
    icon: <Sparkles className="w-4 h-4" />,
  },
  {
    id: 'children',
    label: "Children's",
    query: 'Children',
    icon: <Smile className="w-4 h-4" />,
  },
  {
    id: 'classics',
    label: 'Classics',
    query: 'Classics',
    icon: <Library className="w-4 h-4" />,
  },
];

export interface SearchGuidesProps {
  onSelectGuide?: (query: string) => void;
  className?: string;
}

export default function SearchGuides({ onSelectGuide, className = '' }: SearchGuidesProps = {}) {
  const { searchQuery, setSearchQuery } = useApp();

  return (
    <div className={`w-full bg-[var(--bg-surface)] border-b border-[var(--border-subtle)] py-2.5 px-4 sm:px-6 overflow-hidden ${className}`}>
      <div className="page-container flex items-center gap-2 overflow-x-auto no-scrollbar scroll-smooth">
        <span className="text-xs font-bold text-[var(--text-muted)] shrink-0 mr-1 flex items-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5 text-[#F1641E]" />
          <span>Explore:</span>
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
                const nextQuery = isActive && chip.query !== '' ? '' : chip.query;
                setSearchQuery(nextQuery);
                if (onSelectGuide) {
                  onSelectGuide(nextQuery);
                }
              }}
              className={`shrink-0 h-9 px-3.5 rounded-full text-xs font-semibold border transition-all duration-150 cursor-pointer flex items-center gap-1.5 ${
                isActive
                  ? 'bg-[var(--pill-active-bg)] text-[var(--pill-active-text)] border-[var(--pill-active-bg)] shadow-xs'
                  : 'bg-[var(--bg-input)] hover:bg-[var(--bg-hover)] text-[var(--text-main)] border-transparent'
              }`}
            >
              <span className={isActive ? 'text-[var(--pill-active-text)]' : 'text-[var(--text-muted)]'}>
                {chip.icon}
              </span>
              <span>{chip.label}</span>
            </button>
          );
        })}

        {searchQuery && (
          <button
            onClick={() => {
              setSearchQuery('');
              if (onSelectGuide) {
                onSelectGuide('');
              }
            }}
            className="shrink-0 h-9 px-3 rounded-full text-xs font-medium bg-[var(--bg-input)] hover:bg-[var(--bg-hover)] text-[var(--text-main)] cursor-pointer transition-colors flex items-center gap-1"
          >
            <IconClose className="w-3.5 h-3.5" />
            <span>Clear</span>
          </button>
        )}
      </div>
    </div>
  );
}
