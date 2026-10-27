'use client';

import React, { forwardRef, useState } from 'react';

export interface SearchFieldProps {
  id?: string;
  value: string;
  onChange: (value: string) => void;
  onSubmit?: (value: string) => void;
  onClear?: () => void;
  placeholder?: string;
  accessibilityLabel: string;
  autoFocus?: boolean;
  size?: 'sm' | 'md' | 'lg';
  showSubmitButton?: boolean;
  submitButtonColor?: 'orange' | 'dark' | 'red';
  className?: string;
}

export const SearchField = forwardRef<HTMLInputElement, SearchFieldProps>(
  function SearchField(
    {
      id = 'gestalt-search-field',
      value,
      onChange,
      onSubmit,
      onClear,
      placeholder = 'Search for anything...',
      accessibilityLabel,
      autoFocus = false,
      size = 'md',
      showSubmitButton = true,
      submitButtonColor = 'orange',
      className = '',
    },
    ref
  ) {
    const [isFocused, setIsFocused] = useState(false);

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        onSubmit?.(value);
      } else if (e.key === 'Escape') {
        e.preventDefault();
        onClear ? onClear() : onChange('');
      }
    };

    const handleClear = () => {
      onClear ? onClear() : onChange('');
    };

    const submitColorClasses = {
      orange: 'bg-[#F1641E] hover:bg-[#d95616] text-white',
      dark: 'bg-[#222222] hover:bg-black text-white',
      red: 'bg-[#e60023] hover:bg-[#ad081b] text-white',
    }[submitButtonColor];

    const sizeClasses = {
      sm: {
        container: 'h-9',
        input: 'text-xs pl-4 pr-11 py-1.5',
        button: 'w-7 h-7 right-1',
      },
      md: {
        container: 'h-11',
        input: 'text-sm pl-5 pr-14 py-2.5',
        button: 'w-9 h-9 right-1.5',
      },
      lg: {
        container: 'h-13',
        input: 'text-base pl-6 pr-16 py-3',
        button: 'w-10 h-10 right-1.5',
      },
    }[size];

    return (
      <div
        className={`relative flex items-center w-full transition-all duration-150 ${sizeClasses.container} ${className}`}
      >
        <input
          ref={ref}
          id={id}
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onKeyDown={handleKeyDown}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder={placeholder}
          aria-label={accessibilityLabel}
          autoFocus={autoFocus}
          className={`w-full h-full bg-white dark:bg-[#19191d] text-[#222222] dark:text-neutral-100 placeholder:text-neutral-500 border-2 rounded-full transition-all duration-200 outline-hidden ${
            isFocused
              ? 'border-[#222222] dark:border-neutral-200 shadow-sm'
              : 'border-neutral-800 dark:border-neutral-700 hover:border-neutral-900'
          } ${sizeClasses.input}`}
        />

        {/* Clear Button */}
        {value.length > 0 && (
          <button
            type="button"
            onClick={handleClear}
            aria-label="Clear search input"
            className={`absolute flex items-center justify-center p-1 rounded-full text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-200 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition ${
              showSubmitButton ? 'right-12 sm:right-14' : 'right-3'
            }`}
          >
            <svg
              className="w-4 h-4"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        )}

        {/* Submit Icon Button */}
        {showSubmitButton && (
          <button
            type="button"
            onClick={() => onSubmit?.(value)}
            aria-label="Submit search"
            className={`absolute rounded-full flex items-center justify-center transition-transform active:scale-90 shadow-xs cursor-pointer ${sizeClasses.button} ${submitColorClasses}`}
          >
            <svg
              className="w-4 h-4 stroke-[2.5]"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
          </button>
        )}
      </div>
    );
  }
);

export default SearchField;
