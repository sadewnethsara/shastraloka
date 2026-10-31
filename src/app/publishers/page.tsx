'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import {
  Award,
  BookOpen,
  CheckCircle2,
  ChevronRight,
  Feather,
  Globe,
  Handbag,
  MapPin,
  Search,
  ShieldCheck,
  Sparkles,
  Star,
  Users,
} from 'lucide-react';
import Header from '../../components/Header';
import SearchGuides from '../../components/SearchGuides';
import Footer from '../../components/Footer';
import BookCard from '../../components/BookCard';
import ViewportSection from '../../components/ui/ViewportSection';
import { useApp } from '../../context/AppContext';
import { BOOKS, Book } from '../../data/books';
import { PUBLISHERS, PublisherProfile } from '../../data/publishers';


export default function PublishersPage() {
  const { addToBag, showToast } = useApp();
  const [searchFilter, setSearchFilter] = useState('');
  const [selectedSpecialty, setSelectedSpecialty] = useState('All Guilds');
  const [followedIds, setFollowedIds] = useState<Record<string, boolean>>({
    'shastraloka-guild-press': true,
  });

  const specialties = [
    'All Guilds',
    'Ancient Chronicles & Epigraphy',
    'Buddhist Philosophy & Tipitaka',
    'Classical Sinhala Poetry (Kavya)',
    'Jataka Stories & Ola Manuscripts',
    'Indigenous Ayurveda & Vastu',
  ];

  const filteredPublishers = useMemo(() => {
    return PUBLISHERS.filter((pub) => {
      const matchesSpecialty =
        selectedSpecialty === 'All Guilds' || pub.specialty === selectedSpecialty;
      const q = searchFilter.trim().toLowerCase();
      const matchesSearch =
        !q ||
        pub.name.toLowerCase().includes(q) ||
        pub.sinhalaName.includes(q) ||
        pub.location.toLowerCase().includes(q) ||
        pub.specialty.toLowerCase().includes(q) ||
        pub.description.toLowerCase().includes(q);
      return matchesSpecialty && matchesSearch;
    });
  }, [searchFilter, selectedSpecialty]);

  const toggleFollow = (pub: PublisherProfile) => {
    const isNowFollowed = !followedIds[pub.id];
    setFollowedIds((prev) => ({ ...prev, [pub.id]: isNowFollowed }));
    showToast(
      isNowFollowed
        ? `Following ${pub.name} • You'll be notified of new archival editions`
        : `Unfollowed ${pub.name}`
    );
  };

  const handleAddPublisherBundle = (pub: PublisherProfile, books: Book[]) => {
    books.forEach((book) => addToBag(book, book.binding, 1));
    showToast(`Added ${books.length} editions from ${pub.name} to your Bag!`);
  };

  return (
    <div className="min-h-screen bg-[var(--bg-main)] text-[var(--text-main)] flex flex-col">
      <Header isSticky />
      <SearchGuides />

      <main className="page-container flex-1 py-8 sm:py-10 space-y-10">
        {/* Hero Banner */}
        <section className="relative rounded-3xl overflow-hidden bg-[var(--banner-guild-bg)] text-[var(--banner-guild-text)] p-6 sm:p-10 lg:p-12 shadow-sm border border-[var(--banner-guild-border)]">
          <div className="max-w-3xl space-y-4 relative z-10">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[var(--bg-card)]/80 backdrop-blur-xs border border-[var(--banner-guild-border)] text-xs font-bold uppercase tracking-wider text-[var(--banner-guild-accent)]">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Verified Sri Lankan Scriptoriums & Archival Presses</span>
            </div>

            <h1
              className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight leading-tight text-[var(--banner-guild-text)]"
              
            >
              Publishers &amp; Monastic Guilds
            </h1>

<p className="text-sm sm:text-base text-[var(--banner-guild-accent)] font-semibold">
              Shastraloka Publishers Guild • Archival Press & Palm-Leaf Scriptoriums
            </p>

            <p className="text-sm sm:text-base text-[var(--banner-guild-muted)] leading-relaxed max-w-2xl">
              Every treatise on Shastraloka is printed and bound by accredited Sri Lankan
              archival presses, temple scriptoriums, and traditional palm-leaf foundries
              committed to preserving 2,500 years of literary heritage.
            </p>

            {/* Key Guild Metrics */}
            <div className="pt-3 flex flex-wrap items-center gap-6 text-xs sm:text-sm text-[var(--banner-guild-text)]">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-[var(--banner-guild-accent)]" />
                <span>
                  <strong>5</strong> Accredited Heritage Presses
                </span>
              </div>
              <div className="flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-[var(--banner-guild-accent)]" />
                <span>
                  <strong>{BOOKS.length}</strong> Unabridged Classical Editions
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Award className="w-4 h-4 text-[var(--banner-guild-accent)]" />
                <span>
                  <strong>100gsm</strong> Acid-Free Archival Paper Standard
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* Search & Specialty Filter Bar */}
        <section className="space-y-4">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="relative flex-1 max-w-md">
              <Search className="w-4 h-4 text-[var(--text-muted)] absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchFilter}
                onChange={(e) => setSearchFilter(e.target.value)}
                placeholder="Search publishers by name, city (Anuradhapura, Kandy), or subject..."
                className="w-full pl-10 pr-4 py-2.5 rounded-full bg-[var(--bg-input)] border border-[var(--border-subtle)] text-xs sm:text-sm text-[var(--text-main)] outline-none focus:border-[var(--color-primary)] transition"
              />
            </div>

            <div className="flex items-center gap-2 overflow-x-auto pb-1">
              {specialties.map((spec) => {
                const active = selectedSpecialty === spec;
                return (
                  <button
                    key={spec}
                    type="button"
                    onClick={() => setSelectedSpecialty(spec)}
                    className={`px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition cursor-pointer ${active
                        ? 'bg-[var(--pill-active-bg)] text-[var(--pill-active-text)] shadow-xs'
                        : 'bg-[var(--pill-bg)] text-[var(--text-muted)] hover:bg-[var(--pill-hover)] hover:text-[var(--text-main)]'
                      }`}
                  >
                    {spec}
                  </button>
                );
              })}
            </div>
          </div>
        </section>

        {/* Publishers Directory Cards */}
        <section className="space-y-8">
          {filteredPublishers.map((pub, pubIdx) => {
            const pubBooks = BOOKS.filter((b) => pub.bookIds.includes(b.id));
            const isFollowed = !!followedIds[pub.id];

            return (
              <ViewportSection
                key={pub.id}
                eager={pubIdx === 0}
                minHeight={380}
                skeletonTitle={pub.name}
              >
              <div
                className="rounded-3xl bg-[var(--bg-card)] border border-[var(--border-subtle)] shadow-xs overflow-hidden transition-shadow hover:shadow-md"
              >
                {/* Top Banner Strip */}
                <div className="p-6 sm:p-8 bg-[var(--banner-guild-bg)] text-[var(--banner-guild-text)] border-b border-[var(--banner-guild-border)] flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                  <div className="flex items-start sm:items-center gap-4 sm:gap-5">
                    <div
                      className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl flex items-center justify-center font-heading font-bold text-2xl sm:text-3xl shadow-sm border-2 shrink-0 bg-[var(--bg-card)] text-[var(--banner-guild-accent)] border-[var(--banner-guild-border)]"
                    >
                      {pub.avatarText}
                    </div>

                    <div className="space-y-1.5">
                      <div className="flex flex-wrap items-center gap-2">
                        <span
                          className="px-2.5 py-0.5 rounded-full text-[11px] font-bold uppercase tracking-wider bg-[var(--bg-card)] text-[var(--banner-guild-accent)] border border-[var(--banner-guild-border)]"
                        >
                          {pub.badgeText}
                        </span>
                        <span className="text-xs text-[var(--banner-guild-muted)] flex items-center gap-1">
                          <MapPin className="w-3.5 h-3.5" />
                          {pub.location} • Est. {pub.foundedYear}
                        </span>
                      </div>

                      <Link
                        href={`/publishers/${pub.id}`}
                        className="group inline-flex items-center gap-2"
                      >
                        <h2
                          className="text-xl sm:text-2xl font-bold text-[var(--banner-guild-text)] group-hover:underline"
                        >
                          {pub.name}
                        </h2>
                        <CheckCircle2
                          className="w-5 h-5 shrink-0 text-[var(--banner-guild-accent)]"
                        />
                      </Link>

<p className="text-xs sm:text-sm text-[var(--banner-guild-accent)] font-medium">
                        {pub.sinhalaName} — {pub.tagline}
                      </p>
                    </div>
                  </div>

                  {/* Stats & Actions */}
                  <div className="flex flex-wrap items-center gap-3 sm:gap-4 shrink-0">
                    <div className="flex items-center gap-4 px-4 py-2 rounded-2xl bg-[var(--bg-card)] border border-[var(--banner-guild-border)] text-xs">
                      <div>
                        <div className="font-bold text-[var(--text-main)] flex items-center gap-1">
                          <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                          <span>{pub.rating}</span>
                        </div>
                        <span className="text-[11px] text-[var(--text-muted)]">
                          {pub.reviewsCount.toLocaleString()} reviews
                        </span>
                      </div>
                      <div className="h-7 w-px bg-[var(--border-subtle)]" />
                      <div>
                        <div className="font-bold text-[var(--text-main)] flex items-center gap-1">
                          <Users className="w-3.5 h-3.5 text-[var(--banner-guild-accent)]" />
                          <span>{pub.followersCount}</span>
                        </div>
                        <span className="text-[11px] text-[var(--text-muted)]">Scholars</span>
                      </div>
                      <div className="h-7 w-px bg-[var(--border-subtle)]" />
                      <div>
                        <div className="font-bold text-[var(--text-main)]">{pubBooks.length}</div>
                        <span className="text-[11px] text-[var(--text-muted)]">Treatises</span>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => toggleFollow(pub)}
                      className={`px-4 py-2.5 rounded-full text-xs font-bold transition cursor-pointer ${isFollowed
                          ? 'bg-[var(--pill-active-bg)] text-[var(--pill-active-text)] hover:opacity-90'
                          : 'bg-[var(--bg-card)] text-[var(--text-main)] border border-[var(--border-strong)] hover:bg-[var(--bg-hover)]'
                        }`}
                    >
                      {isFollowed ? 'Following Guild ✓' : '+ Follow Guild'}
                    </button>

                    <Link
                      href={`/publishers/${pub.id}`}
                      className="px-4 py-2.5 rounded-full bg-[var(--color-primary)] hover:bg-[var(--color-primary-hover)] text-white text-xs font-bold transition flex items-center gap-1.5 shadow-xs"
                    >
                      <span>Visit Scriptorium</span>
                      <ChevronRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>

                {/* Publisher Body & Treatises Preview */}
                <div className="p-6 sm:p-8 space-y-6">
                  <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-5 border-b border-[var(--border-subtle)]">
                    <div className="space-y-1.5 max-w-3xl">
                      <p className="text-xs sm:text-sm text-[var(--text-main)] leading-relaxed">
                        {pub.description}
                      </p>
                      <div className="inline-flex items-center gap-2 text-xs text-[var(--brand-brown)] font-semibold pt-1">
                        <Feather className="w-3.5 h-3.5" />
                        <span>Archival Standard: {pub.craftsmanshipNote}</span>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => handleAddPublisherBundle(pub, pubBooks)}
                      className="self-start lg:self-center px-4 py-2.5 rounded-full bg-[var(--bg-input)] hover:bg-[var(--bg-hover)] border border-[var(--border-subtle)] text-[var(--text-main)] text-xs font-bold transition cursor-pointer flex items-center gap-2 shrink-0"
                    >
                      <Handbag className="w-4 h-4 text-[var(--color-primary)]" />
                      <span>Add Complete Imprint ({pubBooks.length} Books) to Bag</span>
                    </button>
                  </div>

                  {/* Imprint Books Grid */}
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-xs font-bold uppercase tracking-wider text-[var(--text-muted)]">
                        Published Treatises by {pub.name} ({pubBooks.length})
                      </h3>
                      <Link
                        href={`/publishers/${pub.id}`}
                        className="text-xs font-bold text-[var(--color-primary)] hover:underline flex items-center gap-1"
                      >
                        <span>View full catalog &amp; colophon</span>
                        <ChevronRight className="w-3.5 h-3.5" />
                      </Link>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
                      {pubBooks.map((book) => (
                        <BookCard key={book.id} book={book} />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              </ViewportSection>
            );
          })}
        </section>
      </main>

      <Footer />
    </div>
  );
}