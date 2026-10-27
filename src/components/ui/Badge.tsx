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
    'bg-white/95 dark:bg-[#202025]/95 text-[#222222] dark:text-white border border-neutral-300 dark:border-neutral-700 font-bold shadow-xs backdrop-blur-xs',
  sale:
    'bg-[#A0E193]/70 text-[#0F743B] dark:bg-[#0F743B]/30 dark:text-[#76d691] font-bold',
  bestseller:
    'bg-[#fdf6e8] text-[#a66523] dark:bg-[#342410] dark:text-[#f8c17b] border border-[#f5e8c8] dark:border-[#523816] font-semibold tracking-wide',
  info:
    'bg-blue-50 text-blue-700 dark:bg-blue-950/50 dark:text-blue-300 border border-blue-200 dark:border-blue-800',
  success:
    'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800',
  warning:
    'bg-amber-50 text-amber-700 dark:bg-amber-950/50 dark:text-amber-300 border border-amber-200 dark:border-amber-800',
  error:
    'bg-rose-50 text-rose-700 dark:bg-rose-950/50 dark:text-rose-300 border border-rose-200 dark:border-rose-800',
  neutral:
    'bg-neutral-100 text-neutral-700 dark:bg-neutral-800 dark:text-neutral-300 border border-neutral-200 dark:border-neutral-700',
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
