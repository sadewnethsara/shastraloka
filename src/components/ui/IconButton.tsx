'use client';

import React, { forwardRef } from 'react';

export type IconButtonVariant =
  | 'default'
  | 'primary'
  | 'red'
  | 'orange'
  | 'white'
  | 'semiTransparent'
  | 'ghost';

export type IconButtonSize = 'xs' | 'sm' | 'md' | 'lg';

export interface IconButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  icon?: React.ReactNode;
  accessibilityLabel: string;
  variant?: IconButtonVariant;
  size?: IconButtonSize;
  badgeCount?: number;
  selected?: boolean;
}

const variantStyles: Record<IconButtonVariant, string> = {
  default:
    'bg-transparent hover:bg-neutral-100 dark:hover:bg-neutral-800 text-[#222222] dark:text-neutral-100',
  primary: 'bg-[#222222] hover:bg-black text-white shadow-xs',
  red: 'bg-[#e60023] hover:bg-[#ad081b] text-white shadow-xs',
  orange: 'bg-[#F1641E] hover:bg-[#d95616] text-white shadow-xs',
  white:
    'bg-white/90 hover:bg-white text-neutral-800 shadow-md backdrop-blur-xs',
  semiTransparent:
    'bg-black/5 hover:bg-black/10 dark:bg-white/10 dark:hover:bg-white/20 text-[#222222] dark:text-white',
  ghost:
    'bg-transparent hover:bg-neutral-100 dark:hover:bg-neutral-800 text-neutral-600 dark:text-neutral-300',
};

const sizeStyles: Record<IconButtonSize, { container: string; iconSize: string }> = {
  xs: { container: 'w-7 h-7', iconSize: 'w-3.5 h-3.5' },
  sm: { container: 'w-8 h-8', iconSize: 'w-4 h-4' },
  md: { container: 'w-10 h-10', iconSize: 'w-5 h-5' },
  lg: { container: 'w-12 h-12', iconSize: 'w-6 h-6' },
};

export const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(
  function IconButton(
    {
      icon,
      children,
      accessibilityLabel,
      variant = 'default',
      size = 'md',
      badgeCount,
      selected = false,
      className = '',
      ...props
    },
    ref
  ) {
    const config = sizeStyles[size];

    return (
      <button
        ref={ref}
        type="button"
        aria-label={accessibilityLabel}
        aria-pressed={selected}
        className={`relative inline-flex items-center justify-center rounded-full transition-all duration-150 select-none cursor-pointer focus:outline-hidden focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#F1641E] active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed ${
          config.container
        } ${variantStyles[variant]} ${
          selected ? 'ring-2 ring-[#e60023] ring-offset-1' : ''
        } ${className}`}
        {...props}
      >
        <span className="flex items-center justify-center shrink-0">
          {icon || children}
        </span>

        {typeof badgeCount === 'number' && badgeCount > 0 && (
          <span className="absolute -top-1 -right-1 min-w-[18px] h-[18px] px-1 rounded-full bg-[#F1641E] text-white text-[10px] font-bold flex items-center justify-center shadow-xs">
            {badgeCount > 99 ? '99+' : badgeCount}
          </span>
        )}
      </button>
    );
  }
);

export default IconButton;
