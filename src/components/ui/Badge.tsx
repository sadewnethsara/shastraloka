'use client';

import React from 'react';

export type BadgeVariant =
  | 'info'
  | 'success'
  | 'warning'
  | 'error'
  | 'neutral'
  | 'recommendation'
  | 'sale'
  | 'price'
  | 'bestseller';

export interface BadgeProps {
  text?: string;
  children?: React.ReactNode;
  variant?: BadgeVariant;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const variantStyles: Record<BadgeVariant, string> = {
  price:
    'bg-[var(--bg-card)]/95 text-[var(--text-main)] border border-[var(--border-subtle)] font-bold shadow-xs backdrop-blur-xs',
  sale:
    'bg-[var(--color-success-bg)] text-[var(--color-success)] font-bold',
  bestseller:
    'bg-[var(--banner-guild-bg)] text-[var(--banner-guild-accent)] border border-[var(--banner-guild-border)] font-semibold tracking-wide',
  info:
    'bg-blue-50 text-blue-700 dark:bg-blue-950/50 dark:text-blue-300 border border-blue-200 dark:border-blue-800',
  success:
    'bg-[var(--color-success-bg)] text-[var(--color-success)] border border-[var(--border-subtle)]',
  warning:
    'bg-[var(--color-warning-bg)] text-[var(--color-warning)] border border-[var(--border-subtle)]',
  error:
    'bg-[var(--color-danger-bg)] text-[var(--color-danger)] border border-[var(--border-subtle)]',
  neutral:
    'bg-[var(--bg-input)] text-[var(--text-body)] border border-[var(--border-subtle)]',
  recommendation:
    'bg-purple-50 text-purple-700 dark:bg-purple-950/50 dark:text-purple-300 border border-purple-200 dark:border-purple-800',
};

const sizeStyles = {
  sm: 'text-[10px] px-2 py-0.5 rounded-full',
  md: 'text-xs px-2.5 py-0.5 rounded-full',
  lg: 'text-sm px-3 py-1 rounded-full',
};

export function Badge({
  text,
  children,
  variant = 'neutral',
  size = 'md',
  className = '',
}: BadgeProps) {
  return (
    <span
      className={`inline-flex items-center justify-center leading-none select-none transition-colors ${variantStyles[variant]} ${sizeStyles[size]} ${className}`}
    >
      {text || children}
    </span>
  );
}

export default Badge;
