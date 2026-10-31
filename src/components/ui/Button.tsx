'use client';

import React, { forwardRef } from 'react';

export type ButtonVariant =
  | 'primary'
  | 'secondary'
  | 'tertiary'
  | 'red'
  | 'orange'
  | 'dark'
  | 'outline'
  | 'ghost'
  | 'transparent';

export type ButtonSize = 'sm' | 'md' | 'lg';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  text?: string;
  variant?: ButtonVariant;
  size?: ButtonSize;
  pill?: boolean;
  fullWidth?: boolean;
  iconStart?: React.ReactNode;
  iconEnd?: React.ReactNode;
  loading?: boolean;
  accessibilityLabel?: string;
}

const variantStyles: Record<ButtonVariant, string> = {
  primary: 'bg-[var(--pill-active-bg)] hover:opacity-90 text-[var(--pill-active-text)] active:scale-[0.98]',
  dark: 'bg-[var(--pill-active-bg)] hover:opacity-90 text-[var(--pill-active-text)] active:scale-[0.98]',
  red: 'bg-[var(--color-primary)] hover:bg-[var(--color-primary-hover)] text-white shadow-xs active:scale-[0.98]',
  orange: 'bg-[var(--color-primary)] hover:bg-[var(--color-primary-hover)] text-white shadow-xs active:scale-[0.98]',
  secondary: 'bg-[var(--bg-input)] hover:bg-[var(--bg-hover)] text-[var(--text-main)] active:scale-[0.98]',
  tertiary: 'bg-transparent hover:bg-[var(--bg-hover)] text-[var(--text-main)]',
  outline: 'bg-transparent border border-[var(--border-subtle)] hover:bg-[var(--bg-hover)] text-[var(--text-main)]',
  ghost: 'bg-transparent hover:bg-[var(--bg-hover)] text-[var(--text-body)]',
  transparent: 'bg-transparent text-current hover:opacity-80',
};

const sizeStyles: Record<ButtonSize, string> = {
  sm: 'text-xs px-3 py-1.5 h-8 gap-1.5',
  md: 'text-sm px-4 py-2 h-10 gap-2',
  lg: 'text-base px-6 py-2.5 h-12 gap-2.5',
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  {
    text,
    children,
    variant = 'primary',
    size = 'md',
    pill = true,
    fullWidth = false,
    iconStart,
    iconEnd,
    loading = false,
    accessibilityLabel,
    className = '',
    disabled,
    ...props
  },
  ref
) {
  const roundedClass = pill ? 'rounded-[var(--radius-btn,9999px)]' : 'rounded-[var(--radius-input,0.75rem)]';

  return (
    <button
      ref={ref}
      aria-label={accessibilityLabel || (typeof text === 'string' ? text : undefined)}
      disabled={disabled || loading}
      className={`inline-flex items-center justify-center font-medium transition-all duration-150 select-none cursor-pointer focus:outline-hidden focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[var(--color-primary)] disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none ${variantStyles[variant]} ${sizeStyles[size]} ${roundedClass} ${
        fullWidth ? 'w-full' : ''
      } ${className}`}
      {...props}
    >
      {loading ? (
        <svg
          className="animate-spin h-4 w-4 text-current"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          />
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          />
        </svg>
      ) : (
        <>
          {iconStart && <span className="inline-flex shrink-0">{iconStart}</span>}
          <span>{text || children}</span>
          {iconEnd && <span className="inline-flex shrink-0">{iconEnd}</span>}
        </>
      )}
    </button>
  );
});

export default Button;
