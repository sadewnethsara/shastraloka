'use client';

import React from 'react';

export interface AccordionProps {
  title: string;
  isOpen: boolean;
  onToggle: () => void;
  children: React.ReactNode;
  className?: string;
}

export function Accordion({
  title,
  isOpen,
  onToggle,
  children,
  className = '',
}: AccordionProps) {
  return (
    <div className={`border-b border-neutral-300/70 dark:border-neutral-800 ${className}`}>
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={isOpen}
        className="w-full py-3.5 flex items-center justify-between text-xs sm:text-sm font-bold text-[#222222] dark:text-neutral-100 cursor-pointer"
      >
        <span>{title}</span>
        <svg
          className={`w-4 h-4 text-neutral-600 dark:text-neutral-400 transition-transform duration-200 ${
            isOpen ? 'rotate-180' : ''
          }`}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </button>

      {isOpen && (
        <div className="pb-3.5 pt-0.5 space-y-2 pl-1 animate-fadeIn">
          {children}
        </div>
      )}
    </div>
  );
}

export default Accordion;
