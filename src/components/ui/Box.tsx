'use client';

import React from 'react';

export interface BoxProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
  padding?: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 8 | 12;
  paddingX?: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 8 | 12;
  paddingY?: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 8 | 12;
  margin?: 'auto' | 0 | 1 | 2 | 3 | 4 | 6;
  marginBottom?: 0 | 1 | 2 | 3 | 4 | 6 | 8;
  maxWidth?: number | string;
  display?: 'flex' | 'block' | 'inline-block' | 'none';
  direction?: 'row' | 'column';
  alignItems?: 'start' | 'end' | 'center' | 'baseline' | 'stretch';
  justifyContent?: 'start' | 'end' | 'center' | 'between' | 'around';
  className?: string;
}

const spacingMap: Record<number, string> = {
  0: '0',
  1: '0.25rem',
  2: '0.5rem',
  3: '0.75rem',
  4: '1rem',
  5: '1.25rem',
  6: '1.5rem',
  8: '2rem',
  12: '3rem',
};

export function Box({
  children,
  padding,
  paddingX,
  paddingY,
  margin,
  marginBottom,
  maxWidth,
  display,
  direction,
  alignItems,
  justifyContent,
  className = '',
  style,
  ...props
}: BoxProps) {
  const dynamicStyle: React.CSSProperties = { ...style };

  if (maxWidth) dynamicStyle.maxWidth = typeof maxWidth === 'number' ? `${maxWidth}px` : maxWidth;
  if (margin === 'auto') dynamicStyle.margin = 'auto';
  if (typeof padding === 'number') dynamicStyle.padding = spacingMap[padding];
  if (typeof paddingX === 'number') {
    dynamicStyle.paddingLeft = spacingMap[paddingX];
    dynamicStyle.paddingRight = spacingMap[paddingX];
  }
  if (typeof paddingY === 'number') {
    dynamicStyle.paddingTop = spacingMap[paddingY];
    dynamicStyle.paddingBottom = spacingMap[paddingY];
  }
  if (typeof marginBottom === 'number') {
    dynamicStyle.marginBottom = spacingMap[marginBottom];
  }

  const flexClasses = display === 'flex'
    ? `flex ${direction === 'column' ? 'flex-col' : 'flex-row'} ${
        alignItems === 'center' ? 'items-center' : ''
      } ${justifyContent === 'between' ? 'justify-between' : ''} ${
        justifyContent === 'center' ? 'justify-center' : ''
      }`
    : display === 'block'
    ? 'block'
    : '';

  return (
    <div
      className={`${flexClasses} ${className}`}
      style={dynamicStyle}
      {...props}
    >
      {children}
    </div>
  );
}

export interface FlexProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
  gap?: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 8;
  direction?: 'row' | 'column';
  alignItems?: 'start' | 'end' | 'center' | 'baseline' | 'stretch';
  justifyContent?: 'start' | 'end' | 'center' | 'between' | 'around';
  wrap?: boolean;
  flex?: string;
  maxWidth?: number | string;
  padding?: 0 | 1 | 2 | 3 | 4 | 6;
  className?: string;
}

export function Flex({
  children,
  gap = 2,
  direction = 'row',
  alignItems = 'stretch',
  justifyContent = 'start',
  wrap = false,
  flex,
  maxWidth,
  padding,
  className = '',
  style,
  ...props
}: FlexProps) {
  const dynamicStyle: React.CSSProperties = { ...style };
  if (maxWidth) dynamicStyle.maxWidth = typeof maxWidth === 'number' ? `${maxWidth}px` : maxWidth;
  if (flex) dynamicStyle.flex = flex === 'grow' ? '1 1 0%' : flex;
  if (typeof padding === 'number') dynamicStyle.padding = spacingMap[padding];

  const gapClasses = {
    0: 'gap-0',
    1: 'gap-1',
    2: 'gap-2',
    3: 'gap-3',
    4: 'gap-4',
    5: 'gap-5',
    6: 'gap-6',
    8: 'gap-8',
  }[gap];

  const alignClasses = {
    start: 'items-start',
    end: 'items-end',
    center: 'items-center',
    baseline: 'items-baseline',
    stretch: 'items-stretch',
  }[alignItems];

  const justifyClasses = {
    start: 'justify-start',
    end: 'justify-end',
    center: 'justify-center',
    between: 'justify-between',
    around: 'justify-around',
  }[justifyContent];

  return (
    <div
      className={`flex ${
        direction === 'column' ? 'flex-col' : 'flex-row'
      } ${gapClasses} ${alignClasses} ${justifyClasses} ${
        wrap ? 'flex-wrap' : ''
      } ${className}`}
      style={dynamicStyle}
      {...props}
    >
      {children}
    </div>
  );
}

export default Box;
