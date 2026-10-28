'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import {
    ArrowLeft,
    Award,
    BookOpen,
    CheckCircle2,
    Feather,
    Handbag,
    MapPin,
    ShieldCheck,
    Sparkles,
    Star,
    Truck,
    Users,
} from 'lucide-react';
import Header from '../../../components/Header';
import SearchGuides from '../../../components/SearchGuides';
import Footer from '../../../components/Footer';
import CleanBookCard from '../../../components/CleanBookCard';
import { useApp } from '../../../context/AppContext';
import { BOOKS } from '../../../data/books';
import { PUBLISHERS } from '../page';

export default function PublisherDetailPage() {
    const params = useParams();
    const { addToBag, showToast } = useApp();

    const publisherId = (params?.id as string) || '';
    const publisher =
        PUBLISHERS.find((p) => p.id === publisherId) || PUBLISHERS[0];

    const [isFollowing, setIsFollowing] = useState(true);
    const [bindingFilter, setBindingFilter] = useState<string>('All Bindings');

    const publisherBooks = useMemo(() => {
        const list = BOOKS.filter((b) => publisher.bookIds.includes(b.id));
        if (bindingFilter === 'All Bindings') return list;
        return list.filter((b) => b.binding === bindingFilter);
    }, [publisher, bindingFilter]);

    const allPublisherBooks = useMemo(
        () => BOOKS.filter((b) => publisher.bookIds.includes(b.id)),
        [publisher]
    );

    const bindings = useMemo(() => {
        const unique = Array.from(new Set(allPublisherBooks.map((b) => b.binding)));
        return ['All Bindings', ...unique];
    }, [allPublisherBooks]);

    const totalImprintPrice = allPublisherBooks.reduce((acc, b) => acc + b.price, 0);

    const handleAddAllToBag = () => {
        allPublisherBooks.forEach((book) => addToBag(book, book.binding, 1));
        showToast(
            `Added all ${allPublisherBooks.length} treatises from ${publisher.name} to your Bag!`
        );
    };

    return (
        <div className="min-h-screen bg-[var(--bg-main)] text-[var(--text-main)] flex flex-col">
            <Header isSticky />
            <SearchGuides />

            <main className="page-container flex-1 py-8 space-y-8">
                {/* Breadcrumb Navigation */}
                <div className="flex items-center justify-between text-xs text-[var(--text-muted)]">
                    <Link
                        href="/publishers"
                        className="inline-flex items-center gap-1.5 font-semibold hover:text-[var(--text-main)] px-3 py-1.5 rounded-full bg-[var(--bg-input)] hover:bg-[var(--bg-hover)] transition"
                    >
                        <ArrowLeft className="w-3.5 h-3.5" />
                        <span>Back to All Publishers</span>
                    </Link>

                    <div className="flex items-center gap-2">
                        <Link href="/" className="hover:underline">
                            Home
                        </Link>
                        <span>/</span>
                        <Link href="/publishers" className="hover:underline">
                            Publishers
                        </Link>
                        <span>/</span>
                        <span className="font-semibold text-[var(--text-main)]">
                            {publisher.name}
                        </span>
                    </div>
                </div>

                {/* Scriptorium Hero Header */}
                <section className="rounded-3xl p-6 sm:p-10 bg-[var(--banner-guild-bg)] text-[var(--banner-guild-text)] border border-[var(--banner-guild-border)] shadow-sm space-y-6">
                    <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                        <div className="flex items-start sm:items-center gap-5">
<div className="w-20 h-20 sm:w-24 sm:h-24 rounded-3xl flex items-center justify-center font-heading font-bold text-3xl sm:text-4xl shadow-sm border-2 shrink-0 bg-[var(--bg-card)] text-[var(--banner-guild-accent)] border-[var(--banner-guild-border)]">
                                {publisher.avatarText}
                            </div>

                            <div className="space-y-2">
                                <div className="flex flex-wrap items-center gap-2.5">
                                    <span className="px-3 py-0.5 rounded-full text-xs font-bold uppercase tracking-wider bg-[var(--bg-card)] text-[var(--banner-guild-accent)] border border-[var(--banner-guild-border)]">
                                        {publisher.badgeText}
                                    </span>
                                    <span className="text-xs text-[var(--banner-guild-muted)] flex items-center gap-1">
                                        <MapPin className="w-3.5 h-3.5" />
                                        {publisher.location} • Founded {publisher.foundedYear}
                                    </span>
                                </div>

                                <div className="flex items-center gap-2">
                                    <h1
                                        className="text-2xl sm:text-4xl font-bold tracking-tight text-[var(--banner-guild-text)]"
                                        style={{
                                        }}
                                    >
                                        {publisher.name}
                                    </h1>
                                    <CheckCircle2 className="w-6 h-6 shrink-0 text-[var(--banner-guild-accent)]" />
                                </div>

<p className="text-sm sm:text-base text-[var(--banner-guild-accent)] font-medium">
                                    {publisher.sinhalaName} • {publisher.tagline}
                                </p>
                            </div>
                        </div>

                        {/* Actions */}
                        <div className="flex flex-wrap items-center gap-3">
                            <button
                                type="button"
                                onClick={() => {
                                    setIsFollowing(!isFollowing);
                                    showToast(
                                        !isFollowing
                                            ? `Following ${publisher.name}`
                                            : `Unfollowed ${publisher.name}`
                                    );
                                }}
                                className={`px-5 py-2.5 rounded-full text-xs font-bold transition cursor-pointer ${isFollowing
                                        ? 'bg-[var(--pill-active-bg)] text-[var(--pill-active-text)] hover:opacity-90'
                                        : 'bg-[var(--bg-card)] text-[var(--text-main)] border border-[var(--border-strong)] hover:bg-[var(--bg-hover)]'
                                    }`}
                            >
                                {isFollowing ? 'Following Guild ✓' : '+ Follow Guild'}
                            </button>

                            <button
                                type="button"
                                onClick={handleAddAllToBag}
                                className="px-5 py-2.5 rounded-full bg-[var(--color-primary)] hover:bg-[var(--color-primary-hover)] text-white text-xs font-bold transition cursor-pointer flex items-center gap-2 shadow-sm"
                            >
                                <Handbag className="w-4 h-4" />
                                <span>
                                    Add Full Imprint to Bag (LKR {totalImprintPrice.toLocaleString()})
                                </span>
                            </button>
                        </div>
                    </div>

                    <p className="text-xs sm:text-sm text-[var(--banner-guild-muted)] max-w-3xl leading-relaxed">
                        {publisher.description}
                    </p>

                    {/* Guild Credentials Bar */}
                    <div className="pt-4 border-t border-[var(--banner-guild-border)] grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
                        <div className="flex items-center gap-2.5">
                            <Star className="w-4 h-4 text-amber-500 fill-amber-500 shrink-0" />
                            <div>
                                <div className="font-bold text-[var(--banner-guild-text)]">{publisher.rating} / 5.0 Rating</div>
                                <div className="text-[var(--banner-guild-muted)]">
                                    {publisher.reviewsCount.toLocaleString()} Collector Reviews
                                </div>
                            </div>
                        </div>

                        <div className="flex items-center gap-2.5">
                            <Users className="w-4 h-4 text-[var(--banner-guild-accent)] shrink-0" />
                            <div>
                                <div className="font-bold text-[var(--banner-guild-text)]">
                                    {publisher.followersCount} Readers
                                </div>
                                <div className="text-[var(--banner-guild-muted)]">Active Guild Subscribers</div>
                            </div>
                        </div>

                        <div className="flex items-center gap-2.5">
                            <Feather className="w-4 h-4 text-[var(--banner-guild-accent)] shrink-0" />
                            <div>
                                <div className="font-bold text-[var(--banner-guild-text)]">Archival Grade</div>
                                <div className="text-[var(--banner-guild-muted)]">{publisher.craftsmanshipNote}</div>
                            </div>
                        </div>

                        <div className="flex items-center gap-2.5">
                            <Truck className="w-4 h-4 text-[var(--banner-guild-accent)] shrink-0" />
                            <div>
                                <div className="font-bold text-[var(--banner-guild-text)]">Direct Guild Dispatch</div>
                                <div className="text-[var(--banner-guild-muted)]">Moisture-sealed islandwide courier</div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Filter Bar & Treatises Grid */}
                <section className="space-y-6">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[var(--border-subtle)]">
                        <div>
                            <h2
                                className="text-xl sm:text-2xl font-bold text-[var(--text-main)]"
                            >
                                Catalog of {publisher.name} ({publisherBooks.length})
                            </h2>
                            <p className="text-xs text-[var(--text-muted)] mt-0.5">
                                All editions include original Sinhala/Pali script alongside English translations
                            </p>
                        </div>

                        <div className="flex items-center gap-2 overflow-x-auto pb-1">
                            {bindings.map((binding) => {
                                const active = bindingFilter === binding;
                                return (
                                    <button
                                        key={binding}
                                        type="button"
                                        onClick={() => setBindingFilter(binding)}
                                        className={`px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition cursor-pointer ${active
                                                ? 'bg-[var(--pill-active-bg)] text-[var(--pill-active-text)]'
                                                : 'bg-[var(--pill-bg)] text-[var(--text-muted)] hover:bg-[var(--pill-hover)] hover:text-[var(--text-main)]'
                                            }`}
                                    >
                                        {binding}
                                    </button>
                                );
                            })}
                        </div>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-x-4 sm:gap-x-6 gap-y-7 sm:gap-y-9">
                        {publisherBooks.map((book) => (
                            <CleanBookCard key={book.id} book={book} />
                        ))}
                    </div>
                </section>

                {/* Explore Other Guild Presses */}
                <section className="pt-8 border-t border-[var(--border-subtle)] space-y-4">
                    <h3
                        className="text-lg font-bold text-[var(--text-main)]"
                    >
                        Other Accredited Sri Lankan Guild Presses
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                        {PUBLISHERS.filter((p) => p.id !== publisher.id).map((other) => (
                            <Link
                                key={other.id}
                                href={`/publishers/${other.id}`}
                                className="p-4 rounded-2xl bg-[var(--bg-card)] border border-[var(--border-subtle)] hover:border-[var(--color-primary)] transition group space-y-2"
                            >
                                <div className="flex items-center gap-3">
<div className="w-10 h-10 rounded-xl flex items-center justify-center font-heading font-bold text-sm text-[var(--banner-guild-accent)] bg-[var(--banner-guild-bg)] border border-[var(--banner-guild-border)] shrink-0">
                                        {other.avatarText}
                                    </div>
                                    <div className="min-w-0">
                                        <h4 className="font-bold text-sm text-[var(--text-main)] group-hover:text-[var(--color-primary)] truncate">
                                            {other.name}
                                        </h4>
                                        <p className="text-[11px] text-[var(--text-muted)] truncate">
                                            {other.location}
                                        </p>
                                    </div>
                                </div>
                                <p className="text-xs text-[var(--text-muted)] line-clamp-2">
                                    {other.tagline}
                                </p>
                            </Link>
                        ))}
                    </div>
                </section>
            </main>

            <Footer />
        </div>
    );
}