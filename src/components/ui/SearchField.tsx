'use client';

import React, { forwardRef, useState } from 'react';
import { Search, X, Camera } from 'lucide-react';

export interface SearchFieldProps {
  id?: string;
  value: string;
  onChange: (value: string) => void;
  onSubmit?: (value: string) => void;
  onClear?: () => void;
  onFocus?: () => void;
  onClick?: () => void;
  onImageSearchClick?: () => void;
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
      onFocus,
      onClick,
      onImageSearchClick,
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
        if (onClear) {
          onClear();
        } else {
          onChange('');
        }
      }
    };

    const handleClear = () => {
      if (onClear) {
        onClear();
      } else {
        onChange('');
      }
    };

    const submitColorClasses = {
      orange: 'bg-[var(--color-primary)] hover:bg-[var(--color-primary-hover)] text-white',
      dark: 'bg-[var(--text-main)] hover:opacity-90 text-[var(--bg-main)]',
      red: 'bg-[var(--color-accent-badge)] hover:opacity-90 text-white',
    }[submitButtonColor];

    const sizeClasses = {
      sm: {
        container: 'h-9',
        input: 'text-xs pl-4 pr-18 py-1.5',
        button: 'w-7 h-7 right-1',
      },
      md: {
        container: 'h-11',
        input: 'text-sm pl-5 pr-22 py-2.5',
        button: 'w-9 h-9 right-1.5',
      },
      lg: {
        container: 'h-13',
        input: 'text-base pl-6 pr-24 py-3',
        button: 'w-10 h-10 right-1.5',
      },
    }[size];

    return (
      <div
        onClick={onClick}
        className={`relative flex items-center w-full transition-all duration-150 cursor-text ${sizeClasses.container} ${className}`}
      >
        <input
          ref={ref}
          id={id}
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onKeyDown={handleKeyDown}
          onFocus={() => {
            setIsFocused(true);
            onFocus?.();
          }}
          onClick={(e) => {
            e.stopPropagation();
            onClick?.();
          }}
          onBlur={() => setIsFocused(false)}
          placeholder={placeholder}
          aria-label={accessibilityLabel}
          autoFocus={autoFocus}
          className={`w-full h-full bg-[var(--bg-input)] text-[var(--text-main)] placeholder:text-[var(--text-dim)] border-2 rounded-full transition-all duration-200 outline-hidden ${isFocused
              ? 'border-[var(--border-focus)] shadow-sm'
              : 'border-[var(--border-strong)] hover:border-[var(--border-focus)]'
            } ${sizeClasses.input}`}
        />

        {/* Clear Button */}
        {value.length > 0 && (
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              handleClear();
            }}
            aria-label="Clear search input"
            className={`absolute flex items-center justify-center p-1 rounded-full text-[var(--text-dim)] hover:text-[var(--text-main)] hover:bg-[var(--header-hover-bg)] transition ${onImageSearchClick
                ? (showSubmitButton ? 'right-19 sm:right-21' : 'right-10')
                : (showSubmitButton ? 'right-12 sm:right-14' : 'right-3')
              }`}
          >
            <X className="w-4 h-4" />
          </button>
        )}

        {/* Visual Manuscript / Camera Search Icon Button */}
        {onImageSearchClick && (
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onImageSearchClick();
            }}
            title="Search sacred manuscripts by image"
            aria-label="Search sacred manuscripts by image"
            className={`absolute flex items-center justify-center p-1.5 rounded-full text-[var(--text-dim)] hover:text-[var(--color-primary)] hover:bg-[var(--header-hover-bg)] transition-colors cursor-pointer group ${showSubmitButton ? 'right-11 sm:right-13' : 'right-2 sm:right-2.5'
              }`}
          >
            <Camera className="w-4 h-4 stroke-[2.2] group-hover:scale-110 transition-transform" />
            <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-primary)] absolute bottom-1 right-1" />
          </button>
        )}

        {/* Submit Icon Button */}
        {showSubmitButton && (
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onSubmit?.(value);
            }}
            aria-label="Submit search"
            className={`absolute rounded-full flex items-center justify-center transition-transform active:scale-90 shadow-xs cursor-pointer ${sizeClasses.button} ${submitColorClasses}`}
          >
            <Search className="w-4 h-4" />
          </button>
        )}
      </div>
    );
  }
);

export default SearchField;
