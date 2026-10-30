'use client';

import React, { forwardRef } from 'react';
import { Tooltip } from './Tooltip';

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
  tooltipText?: string;
  tooltipDirection?: 'up' | 'down' | 'left' | 'right';
  variant?: IconButtonVariant;
  size?: IconButtonSize;
  badgeCount?: number;
  selected?: boolean;
}

const variantStyles: Record<IconButtonVariant, string> = {
  default:
    'bg-transparent hover:bg-[var(--bg-hover)] text-[var(--text-main)]',
  primary: 'bg-[var(--pill-active-bg)] hover:opacity-90 text-[var(--pill-active-text)] shadow-xs',
  red: 'bg-[#e60023] hover:bg-[#ad081b] text-white shadow-xs',
  orange: 'bg-[var(--color-primary)] hover:bg-[var(--color-primary-hover)] text-white shadow-xs',
  white:
    'bg-white/90 hover:bg-white text-neutral-800 shadow-md backdrop-blur-xs',
  semiTransparent:
    'bg-black/5 hover:bg-black/10 dark:bg-white/10 dark:hover:bg-white/20 text-[var(--text-main)]',
  ghost:
    'bg-transparent hover:bg-[var(--bg-hover)] text-[var(--text-muted)]',
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
      tooltipText,
      tooltipDirection = 'down',
      title,
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
    const resolvedTooltip = tooltipText || title || accessibilityLabel;

    const btn = (
      <button
        ref={ref}
        type="button"
        aria-label={accessibilityLabel}
        aria-pressed={selected}
        className={`relative inline-flex items-center justify-center rounded-full transition-all duration-150 select-none cursor-pointer focus:outline-hidden focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[var(--color-primary)] active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed ${
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
          <span className="absolute -top-1 -right-1 min-w-[18px] h-[18px] px-1 rounded-full bg-[var(--color-primary)] text-white text-[10px] font-bold flex items-center justify-center shadow-xs">
            {badgeCount > 99 ? '99+' : badgeCount}
          </span>
        )}
      </button>
    );

    if (resolvedTooltip) {
      return (
        <Tooltip text={resolvedTooltip} idealDirection={tooltipDirection}>
          {btn}
        </Tooltip>
      );
    }

    return btn;
  }
);

export default IconButton;
