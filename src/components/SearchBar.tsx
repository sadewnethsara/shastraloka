import React, { useState, useRef, useEffect } from 'react';
import { Search, Camera, Mic, X } from 'lucide-react';

export interface RecentSearchItem {
    id: string;
    label: string;
    thumbnail?: React.ReactNode;
}

interface SearchBarProps {
    value: string;
    onChange: (value: string) => void;
    onSubmit?: (value: string) => void;
    recentSearches: RecentSearchItem[];
    onRemoveRecent?: (id: string) => void;
    onRestoreRecent?: () => void;
    onCameraClick?: () => void;
    onMicClick?: () => void;
    placeholder?: string;
}

export function SearchBar({
    value,
    onChange,
    onSubmit,
    recentSearches,
    onRemoveRecent,
    onRestoreRecent,
    onCameraClick,
    onMicClick,
    placeholder = 'Search sacred manuscripts, Mahavamsa, Ayurveda...',
}: SearchBarProps) {
    const [isOpen, setIsOpen] = useState(false);
    const wrapperRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    // Close on outside click / touch
    useEffect(() => {
        const handler = (e: MouseEvent | TouchEvent) => {
            if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) {
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handler);
        document.addEventListener('touchstart', handler);
        return () => {
            document.removeEventListener('mousedown', handler);
            document.removeEventListener('touchstart', handler);
        };
    }, []);

    // Close on Escape
    useEffect(() => {
        const handler = (e: KeyboardEvent) => {
            if (e.key === 'Escape') {
                setIsOpen(false);
                inputRef.current?.blur();
            }
        };
        document.addEventListener('keydown', handler);
        return () => document.removeEventListener('keydown', handler);
    }, []);

    const filtered = recentSearches.filter(
        (item) => !value.trim() || item.label.toLowerCase().includes(value.toLowerCase())
    );

    const selectRecent = (item: RecentSearchItem) => {
        onChange(item.label);
        onSubmit?.(item.label);
        setIsOpen(false);
    };

    return (
        <div ref={wrapperRef} className="relative w-full min-w-0 flex-1 max-w-[780px]">
            {/* Search pill - Consistent background color across all states without changing color when clicked */}
            <div
                onClick={() => {
                    setIsOpen(true);
                    inputRef.current?.focus();
                }}
                className={`relative z-30 flex items-center w-full h-10 sm:h-[46px] rounded-full transition-all bg-[var(--bg-input)] ${
                    isOpen
                        ? 'ring-2 ring-[var(--color-primary)] border border-transparent shadow-sm'
                        : 'border-[1.5px] border-[var(--border-strong)] hover:border-[var(--color-primary)] shadow-xs'
                }`}
            >
                <input
                    ref={inputRef}
                    type="text"
                    inputMode="search"
                    enterKeyHint="search"
                    autoComplete="off"
                    value={value}
                    onFocus={() => setIsOpen(true)}
                    onChange={(e) => {
                        onChange(e.target.value);
                        setIsOpen(true);
                    }}
                    onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                            onSubmit?.(value);
                            setIsOpen(false);
                            inputRef.current?.blur();
                        }
                    }}
                    placeholder={placeholder}
                    className="w-full min-w-0 h-full text-base sm:text-[14.5px] text-[var(--header-text)] placeholder-[var(--header-text-muted)] bg-transparent focus:outline-none pl-4 sm:pl-5 pr-2"
                />

                {value && (
                    <button
                        type="button"
                        onClick={(e) => {
                            e.stopPropagation();
                            onChange('');
                            inputRef.current?.focus();
                        }}
                        title="Clear search"
                        aria-label="Clear search"
                        className="p-1.5 mr-0.5 text-[var(--header-text-muted)] hover:text-[var(--header-text)] rounded-full hover:bg-[var(--header-hover-bg)] shrink-0 cursor-pointer"
                    >
                        <X className="w-4 h-4" />
                    </button>
                )}

                <div className="flex items-center gap-0.5 sm:gap-1 pr-1.5 sm:pr-2 shrink-0">
                    {/* Camera: hidden on very small screens */}
                    <button
                        type="button"
                        onClick={(e) => {
                            e.stopPropagation();
                            setIsOpen(true);
                            onCameraClick?.();
                        }}
                        title="Visual manuscript search"
                        aria-label="Visual manuscript search"
                        className="hidden min-[400px]:flex relative p-2 rounded-full text-[var(--header-text)] hover:bg-[var(--header-hover-bg)] transition-colors cursor-pointer"
                    >
                        <Camera className="w-[18px] h-[18px] sm:w-[20px] sm:h-[20px] stroke-[2]" />
                        <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-primary)] absolute bottom-2 right-1.5" />
                    </button>

                    <button
                        type="button"
                        onClick={(e) => {
                            e.stopPropagation();
                            setIsOpen(true);
                            onMicClick?.();
                        }}
                        title="Voice search"
                        aria-label="Voice search"
                        className="p-1.5 sm:p-2 rounded-full text-[var(--header-text)] hover:bg-[var(--header-hover-bg)] transition-colors cursor-pointer"
                    >
                        <Mic className="w-[18px] h-[18px] sm:w-[20px] sm:h-[20px] stroke-[2]" />
                    </button>

                    {/* Orange search button - Always visible */}
                    <button
                        type="button"
                        onClick={(e) => {
                            e.stopPropagation();
                            onSubmit?.(value);
                            setIsOpen(false);
                            inputRef.current?.blur();
                        }}
                        aria-label="Search"
                        className="hidden sm:flex ml-0.5 w-[34px] h-[34px] rounded-full bg-[var(--color-primary)] hover:bg-[var(--color-primary-hover)] text-white items-center justify-center shrink-0 transition-colors shadow-xs cursor-pointer active:scale-95"
                    >
                        <Search className="w-4 h-4 stroke-[2.5]" />
                    </button>
                </div>
            </div>

            {/* Recent searches dropdown */}
            {isOpen && (
                <div
                    className="
                        z-40 bg-[var(--header-dropdown-bg)] text-[var(--header-text)] border border-[var(--header-dropdown-border)] overflow-y-auto overscroll-contain
                        fixed inset-x-2 top-[64px] max-h-[calc(100dvh-76px)] rounded-2xl
                        px-3.5 pt-4 pb-5 shadow-[0_18px_40px_rgba(0,0,0,0.22)]
                        sm:absolute sm:inset-x-0 sm:top-[50px] sm:max-h-[470px]
                        sm:rounded-b-[24px] sm:rounded-t-[8px] sm:px-6 sm:pt-5 sm:pb-6
                    "
                >
                    <div className="flex items-center justify-between mb-3 sm:mb-4">
                        <h3 className="text-[15px] sm:text-[16px] font-bold text-[var(--header-text)] tracking-tight">
                            Recent searches
                        </h3>
                        <div className="flex items-center gap-3">
                            {onRestoreRecent && (
                                <button
                                    type="button"
                                    onClick={onRestoreRecent}
                                    className="text-xs font-semibold text-[var(--color-primary)] hover:underline py-1 cursor-pointer"
                                >
                                    Restore all
                                </button>
                            )}
                            <button
                                type="button"
                                onClick={() => setIsOpen(false)}
                                className="text-xs font-semibold text-[var(--header-text-muted)] hover:text-[var(--header-text)] py-1 cursor-pointer"
                            >
                                Close
                            </button>
                        </div>
                    </div>

                    {filtered.length === 0 ? (
                        <p className="py-6 text-center text-sm text-[var(--header-text-muted)]">No recent searches</p>
                    ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3">
                            {filtered.map((item) => (
                                <div
                                    key={item.id}
                                    onClick={() => selectRecent(item)}
                                    className="group flex items-center justify-between p-1.5 pr-2 sm:pr-3.5 rounded-[12px] sm:rounded-[14px] bg-[var(--bg-input)] hover:bg-[var(--header-hover-bg)] border border-transparent hover:border-[var(--header-dropdown-border)] transition-all cursor-pointer"
                                >
                                    <div className="flex items-center gap-3 sm:gap-3.5 min-w-0">
                                        <div className="w-12 h-12 sm:w-[50px] sm:h-[50px] rounded-[10px] overflow-hidden shrink-0 border border-black/5 bg-stone-200 dark:bg-stone-800">
                                            {item.thumbnail}
                                        </div>
                                        <span className="text-[13.5px] sm:text-[14px] font-medium text-[var(--header-text)] truncate">
                                            {item.label}
                                        </span>
                                    </div>

                                    {onRemoveRecent && (
                                        <button
                                            type="button"
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                onRemoveRecent(item.id);
                                            }}
                                            title="Remove"
                                            aria-label={`Remove ${item.label}`}
                                            className="p-2 rounded-full text-[var(--header-text-muted)] hover:text-[var(--header-text)] hover:bg-[var(--header-hover-bg)] transition-opacity sm:opacity-0 sm:group-hover:opacity-100 sm:focus:opacity-100 cursor-pointer"
                                        >
                                            <X className="w-3.5 h-3.5" />
                                        </button>
                                    )}
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}
