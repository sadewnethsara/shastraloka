'use client';

import React, { useRef, useEffect } from 'react';

export interface DropdownProps {
  isOpen: boolean;
  onClose: () => void;
  align?: 'left' | 'right' | 'center';
  width?: string;
  children: React.ReactNode;
  className?: string;
}

export function Dropdown({
  isOpen,
  onClose,
  align = 'left',
  width = 'w-64',
  children,
  className = '',
}: DropdownProps) {
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        onClose();
      }
    }
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const alignStyles = {
    left: 'left-0',
    right: 'right-0',
    center: 'left-1/2 -translate-x-1/2',
  }[align];

  return (
    <>
      <div className="fixed inset-0 z-20" onClick={onClose} />
      <div
        ref={menuRef}
        className={`absolute ${alignStyles} mt-2 ${width} max-h-96 overflow-y-auto bg-[var(--bg-card)] rounded-[var(--radius-card)] shadow-2xl border border-[var(--border-subtle)] py-2 z-30 animate-fadeIn ${className}`}
      >
        {children}
      </div>
    </>
  );
}

export default Dropdown;
