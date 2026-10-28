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
import BookCard from '../../../components/BookCard';
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

            <main className="flex-1 max-w-[1440px] w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
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
                <section
                    className="rounded-3xl p-6 sm:p-10 text-white shadow-md space-y-6"
                    style={{ background: publisher.bannerGradient }}
                >
                    <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                        <div className="flex items-start sm:items-center gap-5">
                            <div
                                className="w-20 h-20 sm:w-24 sm:h-24 rounded-3xl flex items-center justify-center font-serif font-bold text-3xl sm:text-4xl shadow-lg border-2 shrink-0"
                                style={{
                                    backgroundColor: 'rgba(255,255,255,0.1)',
                                    borderColor: publisher.accentColor,
                                    color: publisher.accentColor,
                                }}
                            >
                                {publisher.avatarText}
                            </div>

                            <div className="space-y-2">
                                <div className="flex flex-wrap items-center gap-2.5">
                                    <span
                                        className="px-3 py-0.5 rounded-full text-xs font-bold uppercase tracking-wider"
                                        style={{
                                            backgroundColor: 'rgba(255,255,255,0.16)',
                                            color: publisher.accentColor,
                                        }}
                                    >
                                        {publisher.badgeText}
                                    </span>
                                    <span className="text-xs text-neutral-300 flex items-center gap-1">
                                        <MapPin className="w-3.5 h-3.5" />
                                        {publisher.location} • Founded {publisher.foundedYear}
                                    </span>
                                </div>

                                <div className="flex items-center gap-2">
                                    <h1
                                        className="text-2xl sm:text-4xl font-bold tracking-tight"
                                        style={{
                                            fontFamily: 'Georgia, Cambria, "Times New Roman", Times, serif',
                                        }}
                                    >
                                        {publisher.name}
                                    </h1>
                                    <CheckCircle2
                                        className="w-6 h-6 shrink-0"
                                        style={{ color: publisher.accentColor }}
                                    />
                                </div>

                                <p className="font-sinhala text-sm sm:text-base text-amber-200">
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
                                        ? 'bg-white text-neutral-900 hover:bg-neutral-200'
                                        : 'bg-white/15 text-white border border-white/30 hover:bg-white/25'
                                    }`}
                            >
                                {isFollowing ? 'Following Guild ✓' : '+ Follow Guild'}
                            </button>

                            <button
                                type="button"
                                onClick={handleAddAllToBag}
                                className="px-5 py-2.5 rounded-full bg-[#F1641E] hover:bg-[#d45314] text-white text-xs font-bold transition cursor-pointer flex items-center gap-2 shadow-sm"
                            >
                                <Handbag className="w-4 h-4" />
                                <span>
                                    Add Full Imprint to Bag (LKR {totalImprintPrice.toLocaleString()})
                                </span>
                            </button>
                        </div>
                    </div>

                    <p className="text-xs sm:text-sm text-neutral-200 max-w-3xl leading-relaxed">
                        {publisher.description}
                    </p>

                    {/* Guild Credentials Bar */}
                    <div className="pt-4 border-t border-white/15 grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
                        <div className="flex items-center gap-2.5">
                            <Star className="w-4 h-4 text-amber-400 fill-amber-400 shrink-0" />
                            <div>
                                <div className="font-bold text-white">{publisher.rating} / 5.0 Rating</div>
                                <div className="text-neutral-300">
                                    {publisher.reviewsCount.toLocaleString()} Collector Reviews
                                </div>
                            </div>
                        </div>

                        <div className="flex items-center gap-2.5">
                            <Users className="w-4 h-4 text-amber-300 shrink-0" />
                            <div>
                                <div className="font-bold text-white">
                                    {publisher.followersCount} Readers
                                </div>
                                <div className="text-neutral-300">Active Guild Subscribers</div>
                            </div>
                        </div>

                        <div className="flex items-center gap-2.5">
                            <Feather className="w-4 h-4 text-amber-300 shrink-0" />
                            <div>
                                <div className="font-bold text-white">Archival Grade</div>
                                <div className="text-neutral-300">{publisher.craftsmanshipNote}</div>
                            </div>
                        </div>

                        <div className="flex items-center gap-2.5">
                            <Truck className="w-4 h-4 text-amber-300 shrink-0" />
                            <div>
                                <div className="font-bold text-white">Direct Guild Dispatch</div>
                                <div className="text-neutral-300">Moisture-sealed islandwide courier</div>
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
                                style={{ fontFamily: 'Georgia, Cambria, "Times New Roman", Times, serif' }}
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
                                                ? 'bg-[#222222] text-white dark:bg-neutral-100 dark:text-neutral-900'
                                                : 'bg-[var(--bg-input)] text-[var(--text-muted)] hover:text-[var(--text-main)]'
                                            }`}
                                    >
                                        {binding}
                                    </button>
                                );
                            })}
                        </div>
                    </div>

                    <div className="book-masonry">
                        {publisherBooks.map((book) => (
                            <BookCard key={book.id} book={book} />
                        ))}
                    </div>
                </section>

                {/* Explore Other Guild Presses */}
                <section className="pt-8 border-t border-[var(--border-subtle)] space-y-4">
                    <h3
                        className="text-lg font-bold text-[var(--text-main)]"
                        style={{ fontFamily: 'Georgia, Cambria, "Times New Roman", Times, serif' }}
                    >
                        Other Accredited Sri Lankan Guild Presses
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                        {PUBLISHERS.filter((p) => p.id !== publisher.id).map((other) => (
                            <Link
                                key={other.id}
                                href={`/publishers/${other.id}`}
                                className="p-4 rounded-2xl bg-[var(--bg-surface)] border border-[var(--border-subtle)] hover:border-[#F1641E] transition group space-y-2"
                            >
                                <div className="flex items-center gap-3">
                                    <div
                                        className="w-10 h-10 rounded-xl flex items-center justify-center font-serif font-bold text-sm text-white shrink-0"
                                        style={{ background: other.bannerGradient }}
                                    >
                                        {other.avatarText}
                                    </div>
                                    <div className="min-w-0">
                                        <h4 className="font-bold text-sm text-[var(--text-main)] group-hover:text-[#F1641E] truncate">
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