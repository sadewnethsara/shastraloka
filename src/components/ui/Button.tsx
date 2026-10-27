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
  primary: 'bg-[#222222] hover:bg-black text-white active:scale-[0.98]',
  dark: 'bg-[#111111] hover:bg-black text-white active:scale-[0.98]',
  red: 'bg-[#e60023] hover:bg-[#ad081b] text-white shadow-xs active:scale-[0.98]',
  orange: 'bg-[#F1641E] hover:bg-[#d95616] text-white shadow-xs active:scale-[0.98]',
  secondary: 'bg-neutral-100 hover:bg-neutral-200 text-[#222222] dark:bg-neutral-800 dark:hover:bg-neutral-700 dark:text-neutral-100 active:scale-[0.98]',
  tertiary: 'bg-transparent hover:bg-black/5 dark:hover:bg-white/10 text-[#222222] dark:text-white',
  outline: 'bg-transparent border border-neutral-300 dark:border-neutral-700 hover:bg-neutral-100 dark:hover:bg-neutral-800 text-[#222222] dark:text-neutral-100',
  ghost: 'bg-transparent hover:bg-neutral-100 dark:hover:bg-neutral-800 text-neutral-700 dark:text-neutral-300',
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
  const roundedClass = pill ? 'rounded-full' : 'rounded-xl';

  return (
    <button
      ref={ref}
      aria-label={accessibilityLabel || (typeof text === 'string' ? text : undefined)}
      disabled={disabled || loading}
      className={`inline-flex items-center justify-center font-medium transition-all duration-150 select-none cursor-pointer focus:outline-hidden focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#F1641E] disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none ${variantStyles[variant]} ${sizeStyles[size]} ${roundedClass} ${
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
