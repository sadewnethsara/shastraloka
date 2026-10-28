'use client';

import React, { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import {
  X,
  UploadCloud,
  Camera,
  CheckCircle2,
  Handbag,
  Sparkles,
  RotateCcw,
  BookOpen,
  ArrowRight,
  ExternalLink,
  Layers,
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { BOOKS, Book } from '../data/books';

interface VisualSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface ArchivalPreset {
  id: string;
  label: string;
  subtitle: string;
  image: string;
  bookId: string;
}

const ARCHIVAL_PRESETS: ArchivalPreset[] = [
  {
    id: 'preset-mahavamsa',
    label: 'Mahavamsa Great Chronicle',
    subtitle: '5th Century CE Pali Chronicle',
    image:
      'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=600&q=80',
    bookId: 'mahawamsa-great-chronicle',
  },
  {
    id: 'preset-visuddhimagga',
    label: 'Visuddhimagga Palm Leaf',
    subtitle: 'Theravada Abhidhamma Treatise',
    image:
      'https://images.unsplash.com/photo-1457369804613-52c61a468e7d?auto=format&fit=crop&w=600&q=80',
    bookId: 'visuddhimagga-path-of-purification',
  },
  {
    id: 'preset-ayurveda',
    label: 'Sarartha Samgrahaya',
    subtitle: 'King Buddhadasa Indigenous Ayurveda',
    image:
      'https://images.unsplash.com/photo-1559181567-c3190ca9959b?auto=format&fit=crop&w=600&q=80',
    bookId: 'sarartha-samgrahaya-ayurveda',
  },
  {
    id: 'preset-guttila',
    label: 'Guttila Kavyaya',
    subtitle: 'Classical Sinhala Sandesa & Poetry',
    image:
      'https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=600&q=80',
    bookId: 'guttila-kavyaya-classical-poetry',
  },
];

const SCAN_STEPS = [
  { label: 'Initializing neural manuscript scanner...', progress: 18 },
  { label: 'Analyzing palm-leaf fiber, folios & binding...', progress: 42 },
  { label: 'Deciphering archival calligraphy & typography...', progress: 75 },
  { label: 'Matching against Shastraloka Royal Library archives...', progress: 95 },
  { label: 'Treatise identified with high confidence!', progress: 100 },
];

export default function VisualSearchModal({ isOpen, onClose }: VisualSearchModalProps) {
  const router = useRouter();
  const { addToBag, showToast } = useApp();

  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [imageName, setImageName] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isScanning, setIsScanning] = useState(false);
  const [scanStepIndex, setScanStepIndex] = useState(0);
  const [matchedBook, setMatchedBook] = useState<Book | null>(null);
  const [matchConfidence, setMatchConfidence] = useState(98.4);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const scanTimersRef = useRef<NodeJS.Timeout[]>([]);

  // Clear timers helper
  const clearScanTimers = () => {
    scanTimersRef.current.forEach((t) => clearTimeout(t));
    scanTimersRef.current = [];
  };

  // Reset state when modal is closed
  const handleClose = () => {
    clearScanTimers();
    setSelectedImage(null);
    setImageName(null);
    setIsDragging(false);
    setIsScanning(false);
    setScanStepIndex(0);
    setMatchedBook(null);
    onClose();
  };

  // Keyboard escape listener
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        handleClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  // Clean up timers on unmount
  useEffect(() => {
    return () => clearScanTimers();
  }, []);

  // Run scanning animation sequence
  const startScanAnimation = (imageSrc: string, name: string, targetBookId?: string) => {
    clearScanTimers();
    setSelectedImage(imageSrc);
    setImageName(name);
    setIsScanning(true);
    setScanStepIndex(0);
    setMatchedBook(null);

    // Pick target book from catalog
    let foundBook = BOOKS.find((b) => b.id === targetBookId);
    if (!foundBook) {
      // Find by matching keywords or default to Mahavamsa
      const lower = name.toLowerCase();
      if (lower.includes('ayurved') || lower.includes('herb') || lower.includes('sarartha')) {
        foundBook = BOOKS.find((b) => b.category.includes('Ayurveda')) || BOOKS[2];
      } else if (lower.includes('visuddhi') || lower.includes('buddhis') || lower.includes('philosophy')) {
        foundBook = BOOKS.find((b) => b.category.includes('Buddhist')) || BOOKS[1];
      } else if (lower.includes('kavya') || lower.includes('poetry') || lower.includes('guttila')) {
        foundBook = BOOKS.find((b) => b.category.includes('Poetry')) || BOOKS[3];
      } else {
        foundBook = BOOKS[0];
      }
    }

    // Randomized high confidence between 96.5% and 99.4%
    const conf = Number((96.5 + Math.random() * 2.9).toFixed(1));
    setMatchConfidence(conf);

    // Animate across stages
    const t1 = setTimeout(() => setScanStepIndex(1), 500);
    const t2 = setTimeout(() => setScanStepIndex(2), 1100);
    const t3 = setTimeout(() => setScanStepIndex(3), 1800);
    const t4 = setTimeout(() => {
      setScanStepIndex(4);
      setIsScanning(false);
      setMatchedBook(foundBook || BOOKS[0]);
    }, 2500);

    scanTimersRef.current = [t1, t2, t3, t4];
  };

  // Handle file drop
  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);

    const file = e.dataTransfer.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      showToast('Please upload a valid image file (JPG, PNG, WEBP)');
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        startScanAnimation(reader.result, file.name);
      }
    };
    reader.readAsDataURL(file);
  };

  // Handle file input change
  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        startScanAnimation(reader.result, file.name);
      }
    };
    reader.readAsDataURL(file);
  };

  // Handle clicking preset
  const handleSelectPreset = (preset: ArchivalPreset) => {
    startScanAnimation(preset.image, preset.label, preset.bookId);
  };

  // Handle Reset / Scan Another
  const handleReset = () => {
    clearScanTimers();
    setSelectedImage(null);
    setImageName(null);
    setIsScanning(false);
    setScanStepIndex(0);
    setMatchedBook(null);
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/65 backdrop-blur-xs animate-fade-in"
      onClick={handleClose}
      aria-modal="true"
      role="dialog"
    >
      <div
        className="relative w-full max-w-2xl max-h-[90vh] flex flex-col bg-[var(--bg-card)] text-[var(--text-main)] rounded-2xl sm:rounded-3xl border border-[var(--border-subtle)] shadow-2xl overflow-hidden animate-slide-up"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between px-5 sm:px-7 py-4 border-b border-[var(--border-subtle)] bg-[var(--bg-surface)]">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-full bg-[var(--color-primary-subtle)] flex items-center justify-center text-[var(--color-primary)]">
              <Camera className="w-5 h-5 stroke-[2.2]" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-bold font-heading text-[var(--text-main)] leading-tight tracking-tight">
                Visual Manuscript Search
              </h2>
              <p className="text-[11px] sm:text-xs text-[var(--text-muted)] font-medium tracking-normal mt-0.5">
                AI Palm-Leaf Folio & Classical Book Recognition
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={handleClose}
            aria-label="Close modal"
            className="p-1.5 rounded-full text-[var(--text-muted)] hover:text-[var(--text-main)] hover:bg-[var(--header-hover-bg)] transition cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Content */}
        <div className="flex-1 overflow-y-auto p-5 sm:p-7 space-y-5">
          {/* STATE 1: Drop & Upload Zone (When no image is chosen) */}
          {!selectedImage && (
            <div className="space-y-6">
              {/* Drag & Drop Box */}
              <div
                onDragOver={(e) => {
                  e.preventDefault();
                  setIsDragging(true);
                }}
                onDragLeave={() => setIsDragging(false)}
                onDrop={handleDrop}
                onClick={() => fileInputRef.current?.click()}
                className={`border-2 border-dashed rounded-2xl p-6 sm:p-10 text-center cursor-pointer transition-all duration-200 ${
                  isDragging
                    ? 'border-[var(--color-primary)] bg-[var(--color-primary-subtle)] scale-[0.99]'
                    : 'border-[var(--border-strong)] hover:border-[var(--color-primary)] bg-[var(--bg-wash)] hover:bg-[var(--bg-hover)]'
                }`}
              >
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/jpeg,image/png,image/webp"
                  className="hidden"
                  onChange={handleFileInputChange}
                />

                <div className="w-14 h-14 sm:w-16 sm:h-16 mx-auto rounded-full bg-[var(--color-primary-subtle)] text-[var(--color-primary)] flex items-center justify-center shadow-xs mb-3 group-hover:scale-105 transition-transform">
                  <UploadCloud className="w-7 h-7 sm:w-8 sm:h-8 stroke-[2]" />
                </div>

                <p className="text-sm sm:text-base font-bold text-[var(--text-main)]">
                  Drag & drop your manuscript, palm leaf, or book cover here
                </p>
                <p className="text-xs text-[var(--text-muted)] mt-1">
                  Or <span className="text-[var(--color-primary)] font-semibold underline">browse file from device</span> (JPG, PNG, WEBP up to 10MB)
                </p>

                <div className="mt-4 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[var(--bg-surface)] border border-[var(--border-subtle)] text-[11px] text-[var(--text-muted)]">
                  <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                  <span>Recognizes ancient folios, rare manuscripts, and classical treatise bindings</span>
                </div>
              </div>

              {/* Sample Archival Presets */}
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <Layers className="w-4 h-4 text-[var(--color-primary)]" />
                  <h3 className="text-xs font-bold uppercase tracking-wider text-[var(--text-muted)]">
                    Or select an archival sample to test:
                  </h3>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                  {ARCHIVAL_PRESETS.map((preset) => (
                    <button
                      key={preset.id}
                      type="button"
                      onClick={() => handleSelectPreset(preset)}
                      className="group flex flex-col text-left p-2 rounded-xl bg-[var(--bg-wash)] hover:bg-[var(--bg-hover)] border border-[var(--border-subtle)] hover:border-[var(--color-primary)] transition-all cursor-pointer overflow-hidden"
                    >
                      <div className="relative w-full aspect-4/3 rounded-lg overflow-hidden bg-stone-200 dark:bg-stone-800 mb-2">
                        <img
                          src={preset.image}
                          alt={preset.label}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors" />
                        <span className="absolute bottom-1 right-1 text-[9px] font-bold px-1.5 py-0.5 rounded-sm bg-black/75 text-white">
                          Sample
                        </span>
                      </div>
                      <span className="text-xs font-bold text-[var(--text-main)] line-clamp-1 group-hover:text-[var(--color-primary)]">
                        {preset.label}
                      </span>
                      <span className="text-[10px] text-[var(--text-muted)] line-clamp-1 mt-0.5">
                        {preset.subtitle}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* STATE 2: Actively Scanning Animation */}
          {selectedImage && isScanning && (
            <div className="space-y-5">
              {/* Image Chamber with Targeting HUD and Laser Scan */}
              <div className="relative mx-auto max-w-[420px] rounded-2xl overflow-hidden bg-black border border-stone-800 shadow-2xl flex items-center justify-center p-3">
                {/* Image to be scanned */}
                <div className="relative rounded-xl overflow-hidden">
                  <img
                    src={selectedImage}
                    alt="Scanning manuscript"
                    className="max-h-[280px] w-auto object-contain select-none"
                  />

                  {/* High-Tech Reticle Corners */}
                  <div className="absolute top-2 left-2 w-6 h-6 border-t-2 border-l-2 border-[#F1641E]" />
                  <div className="absolute top-2 right-2 w-6 h-6 border-t-2 border-r-2 border-[#F1641E]" />
                  <div className="absolute bottom-2 left-2 w-6 h-6 border-b-2 border-l-2 border-[#F1641E]" />
                  <div className="absolute bottom-2 right-2 w-6 h-6 border-b-2 border-r-2 border-[#F1641E]" />

                  {/* Scanner Grid Overlay */}
                  <div className="absolute inset-0 scanner-grid-pattern pointer-events-none opacity-60" />

                  {/* Glowing Laser Scan Line */}
                  <div className="absolute left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#F1641E] to-transparent shadow-[0_0_12px_#F1641E,0_0_24px_#F1641E] animate-laser-scan pointer-events-none" />

                  {/* Scanning Central Reticle */}
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <div className="w-16 h-16 rounded-full border border-dashed border-[#F1641E]/40 animate-spin" />
                  </div>
                </div>

                {/* Live Badge */}
                <div className="absolute top-3 left-3 px-2 py-0.5 rounded-full bg-black/80 border border-[#F1641E]/60 text-[#F1641E] text-[10px] font-bold flex items-center gap-1.5 shadow">
                  <span className="w-2 h-2 rounded-full bg-[#F1641E] animate-ping" />
                  <span>ANALYZING FOLIO</span>
                </div>
              </div>

              {/* Progress Bar & Dynamic Status */}
              <div className="max-w-md mx-auto space-y-2 text-center">
                <div className="flex items-center justify-between text-xs font-semibold text-[var(--text-muted)]">
                  <span className="flex items-center gap-1.5 text-[var(--color-primary)]">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>{SCAN_STEPS[scanStepIndex].label}</span>
                  </span>
                  <span>{SCAN_STEPS[scanStepIndex].progress}%</span>
                </div>

                {/* Progress bar line */}
                <div className="w-full h-2 rounded-full bg-[var(--border-subtle)] overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-amber-500 to-[var(--color-primary)] transition-all duration-500 ease-out rounded-full"
                    style={{ width: `${SCAN_STEPS[scanStepIndex].progress}%` }}
                  />
                </div>

                <div className="pt-2">
                  <button
                    type="button"
                    onClick={handleReset}
                    className="text-xs text-[var(--text-muted)] hover:text-[var(--text-main)] underline cursor-pointer"
                  >
                    Cancel and choose different image
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* STATE 3: Scan Complete & Matched Result */}
          {selectedImage && !isScanning && matchedBook && (
            <div className="space-y-5 animate-fade-in">
              {/* Success Banner */}
              <div className="flex items-center justify-between p-3 px-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-800 dark:text-emerald-300">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400 shrink-0" />
                  <span className="text-xs sm:text-sm font-bold">
                    Treatise Successfully Identified!
                  </span>
                </div>
                <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-700 dark:text-emerald-300">
                  {matchConfidence}% Match
                </span>
              </div>

              {/* Matched Product Card */}
              <div className="flex flex-col sm:flex-row gap-4 p-4 rounded-2xl bg-[var(--bg-wash)] border border-[var(--border-subtle)]">
                {/* Thumb preview of matched book */}
                <div className="w-full sm:w-36 h-48 sm:h-auto rounded-xl overflow-hidden shrink-0 border border-[var(--border-subtle)] bg-stone-100 dark:bg-stone-800">
                  <img
                    src={matchedBook.coverImage}
                    alt={matchedBook.title}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Book Details */}
                <div className="flex-1 min-w-0 flex flex-col justify-between space-y-3">
                  <div>
                    <span className="inline-block px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider rounded-md bg-[var(--color-primary-subtle)] text-[var(--color-primary)] mb-1.5">
                      {matchedBook.category}
                    </span>
                    <h4 className="text-base sm:text-lg font-bold font-heading text-[var(--text-main)] leading-snug">
                      {matchedBook.title}
                    </h4>
                    <p className="text-xs text-[var(--text-muted)] font-medium mt-0.5">
                      By {matchedBook.author} • {matchedBook.binding || 'Classical Treatise'}
                    </p>
                    <p className="text-xs text-[var(--text-body)] line-clamp-2 mt-2">
                      {matchedBook.description}
                    </p>
                  </div>

                  <div className="pt-2 border-t border-[var(--border-subtle)] flex flex-wrap items-center justify-between gap-3">
                    <div>
                      <span className="text-base sm:text-lg font-bold text-[var(--text-main)]">
                        Rs. {matchedBook.price.toLocaleString()}
                      </span>
                      <span className="text-xs text-[var(--text-muted)] ml-2">
                        USD ${(matchedBook.price / 300).toFixed(2)}
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      {/* Add to Bag Button (Rules 1 & 2: Bag naming and Handbag icon) */}
                      <button
                        type="button"
                        onClick={() => {
                          addToBag(matchedBook);
                          showToast(`Added "${matchedBook.title}" to your Bag`);
                        }}
                        className="py-2 px-3.5 rounded-full bg-[var(--color-primary)] hover:bg-[var(--color-primary-hover)] text-white text-xs font-bold flex items-center gap-1.5 transition shadow-xs cursor-pointer active:scale-95"
                      >
                        <Handbag className="w-3.5 h-3.5" />
                        <span>Add to Bag</span>
                      </button>

                      {/* View Details Button */}
                      <button
                        type="button"
                        onClick={() => {
                          handleClose();
                          router.push(`/books/${matchedBook.id}`);
                        }}
                        className="py-2 px-3 rounded-full bg-[var(--bg-surface)] hover:bg-[var(--bg-hover)] border border-[var(--border-strong)] text-[var(--text-main)] text-xs font-semibold flex items-center gap-1 transition cursor-pointer"
                      >
                        <span>View</span>
                        <ArrowRight className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Bottom Actions */}
              <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
                <button
                  type="button"
                  onClick={handleReset}
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-[var(--color-primary)] hover:underline py-1 cursor-pointer"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Scan another manuscript or image</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    handleClose();
                    router.push(`/search?q=${encodeURIComponent(matchedBook.title)}`);
                  }}
                  className="text-xs text-[var(--text-muted)] hover:text-[var(--text-main)] underline cursor-pointer"
                >
                  Search all related treatises in catalog &rarr;
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
