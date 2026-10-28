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
import { useApp } from '../../context/AppContext';
import { BOOKS, Book } from '../../data/books';

export interface PublisherProfile {
  id: string;
  name: string;
  sinhalaName: string;
  tagline: string;
  location: string;
  foundedYear: number;
  verifiedGuild: boolean;
  rating: number;
  reviewsCount: number;
  followersCount: string;
  specialty: string;
  badgeText: string;
  accentColor: string;
  bannerGradient: string;
  avatarText: string;
  description: string;
  craftsmanshipNote: string;
  bookIds: string[];
}

export const PUBLISHERS: PublisherProfile[] = [
  {
    id: 'shastraloka-guild-press',
    name: 'Shastraloka Guild Press',
    sinhalaName: 'ශාස්ත්‍රලෝක මුද්‍රණ සංසදය',
    tagline: 'Flagship Archival & Royal Chronicle Imprint',
    location: 'Colombo 07 & Kandy, Sri Lanka',
    foundedYear: 1984,
    verifiedGuild: true,
    rating: 4.99,
    reviewsCount: 2470,
    followersCount: '18.4K',
    specialty: 'Ancient Chronicles & Epigraphy',
    badgeText: 'Master Archival Guild',
    accentColor: '#d4af37',
    bannerGradient: 'linear-gradient(135deg, #1f1a17 0%, #3a302a 60%, #15110e 100%)',
    avatarText: 'SG',
    description:
      'Founded by classical philologists and master bookbinders, Shastraloka Guild Press produces museum-grade Smyth-sewn clothbound and 24k gold-embossed editions of Sri Lanka’s foundational historical chronicles and rock inscriptions.',
    craftsmanshipNote: '100gsm acid-free Munken cream paper • Brass corner-guarded dispatch',
    bookIds: [
      'mahawamsa-great-chronicle',
      'chulavamsa-chronicle',
      'epigraphia-zeylanica',
    ],
  },
  {
    id: 'mahavihara-monastic-press',
    name: 'Mahavihara Monastic Press',
    sinhalaName: 'මහාවිහාර ධර්ම ග්‍රන්ථ ප්‍රකාශකයෝ',
    tagline: 'Canonical Pali & Theravada Abhidhamma Scriptorium',
    location: 'Sacred City of Anuradhapura',
    foundedYear: 1956,
    verifiedGuild: true,
    rating: 4.98,
    reviewsCount: 3970,
    followersCount: '24.1K',
    specialty: 'Buddhist Philosophy & Tipitaka',
    badgeText: 'Monastic Scriptorium',
    accentColor: '#c5a059',
    bannerGradient: 'linear-gradient(135deg, #131922 0%, #23382C 65%, #0d1118 100%)',
    avatarText: 'MM',
    description:
      'Operating in partnership with senior Mahavihara scholar-monks, this press preserves unabridged Pali-Sinhala-English editions of the Visuddhimagga, Dhammapada commentaries, and medieval Dambadeniya devotional classics.',
    craftsmanshipNote: 'Bilingual Pali-English concordance • Hand-loomed silk ribbon markers',
    bookIds: [
      'visuddhimagga-path-of-purification',
      'dhammapada-illustrated',
      'saddharma-ratnavaliya',
    ],
  },
  {
    id: 'totagamuwa-kavya-mandapa',
    name: 'Totagamuwa Kavya Mandapa',
    sinhalaName: 'තොටගමුව කාව්‍ය මණ්ඩපය',
    tagline: 'Classical Sinhala Sandesha & Elu Prose House',
    location: 'Galle Fort & Kotte, Sri Lanka',
    foundedYear: 1972,
    verifiedGuild: true,
    rating: 4.95,
    reviewsCount: 2140,
    followersCount: '12.8K',
    specialty: 'Classical Sinhala Poetry (Kavya)',
    badgeText: 'Poetic Heritage Press',
    accentColor: '#96c496',
    bannerGradient: 'linear-gradient(135deg, #131d17 0%, #293d31 60%, #0d140f 100%)',
    avatarText: 'TK',
    description:
      'Dedicated to the golden eras of Polonnaruwa, Kotte, and Sitawaka literature, Totagamuwa Kavya Mandapa publishes metric English translations alongside original Elu Sinhala verses with scansion and musical notations.',
    craftsmanshipNote: 'Royal Silkbound & Clothbound editions • Critical metric annotations',
    bookIds: [
      'selalihini-sandeshaya',
      'guttila-kavyaya',
      'subhashithaya-alagiyawanna',
      'amavatura-gurulugomi',
      'kavyashekhara-totagamuwa',
    ],
  },
  {
    id: 'kurunegala-royal-ola-foundry',
    name: 'Kurunegala Royal Ola Foundry',
    sinhalaName: 'කුරුණෑගල පුස්කොළ පොත් සංරක්ෂණාගාරය',
    tagline: 'Traditional Palm-Leaf & Jataka Boxset Artisans',
    location: 'Kurunegala & Dambadeniya',
    foundedYear: 1968,
    verifiedGuild: true,
    rating: 4.97,
    reviewsCount: 2450,
    followersCount: '15.6K',
    specialty: 'Jataka Stories & Ola Manuscripts',
    badgeText: 'Ola Leaf Artisans',
    accentColor: '#d8ab76',
    bannerGradient: 'linear-gradient(135deg, #201712 0%, #433227 60%, #150f0b 100%)',
    avatarText: 'KO',
    description:
      'Specializing in multi-volume collector boxsets and fragrant dummala-treated palm-leaf replicas, the Kurunegala Foundry safeguards the 550 Jataka birth stories and devotional offerings of medieval Lanka.',
    craftsmanshipNote: 'Handcrafted Calamander wood & Ola Leaf collector boxes',
    bookIds: ['pansiya-panas-jataka-potha', 'pujavaliya-mayurapada'],
  },
  {
    id: 'heladiva-ayurveda-vastu-council',
    name: 'Heladiva Ayurveda & Vastu Council',
    sinhalaName: 'හෙළදිව දේශීය වෛද්‍ය හා වාස්තු පර්ෂදය',
    tagline: 'Indigenous Medicine & Sacred Stupa Architecture Press',
    location: 'Peradeniya, Central Province',
    foundedYear: 1979,
    verifiedGuild: true,
    rating: 4.97,
    reviewsCount: 1190,
    followersCount: '9.9K',
    specialty: 'Indigenous Ayurveda & Vastu',
    badgeText: 'Scientific & Heritage Council',
    accentColor: '#7fb8a4',
    bannerGradient: 'linear-gradient(135deg, #171d1b 0%, #303c38 60%, #0f1311 100%)',
    avatarText: 'HA',
    description:
      'A research collective of traditional Weda Ralahamis and architectural historians documenting Deshiya Wedakama herbal pharmacopeias and the hydraulic and stupa engineering of Anuradhapura.',
    craftsmanshipNote: 'Full-color botanical plates & architectural fold-out blueprints',
    bookIds: ['deshiya-cikitsa-samgrahaya', 'ruwanwelisaya-ancient-architecture'],
  },
];

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

      <main className="flex-1 max-w-[1440px] w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10 space-y-10">
        {/* Hero Banner */}
        <section className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-[#23382C] via-[#1B2B22] to-[#121D17] text-[#F5F2EB] p-6 sm:p-10 lg:p-12 shadow-md border border-[#2D4537]">
          <div className="max-w-3xl space-y-4 relative z-10">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/10 backdrop-blur-xs border border-white/15 text-xs font-bold uppercase tracking-wider text-[#E8B059]">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Verified Sri Lankan Scriptoriums & Archival Presses</span>
            </div>

            <h1
              className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight leading-tight"
              style={{ fontFamily: 'Georgia, Cambria, "Times New Roman", Times, serif' }}
            >
              Publishers &amp; Monastic Guilds
            </h1>

            <p className="font-sinhala text-sm sm:text-base text-[#E8B059] font-semibold">
              ශාස්ත්‍රලෝක ප්‍රකාශක සංසදය • පුරාණ ග්‍රන්ථ හා පුස්කොළ පොත් මුද්‍රණාල
            </p>

            <p className="text-sm sm:text-base text-[#D7E2DC] leading-relaxed max-w-2xl">
              Every treatise on Shastraloka is printed and bound by accredited Sri Lankan
              archival presses, temple scriptoriums, and traditional palm-leaf foundries
              committed to preserving 2,500 years of literary heritage.
            </p>

            {/* Key Guild Metrics */}
            <div className="pt-3 flex flex-wrap items-center gap-6 text-xs sm:text-sm text-[#EAE5D9]">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-[#E8B059]" />
                <span>
                  <strong>5</strong> Accredited Heritage Presses
                </span>
              </div>
              <div className="flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-[#E8B059]" />
                <span>
                  <strong>{BOOKS.length}</strong> Unabridged Classical Editions
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Award className="w-4 h-4 text-[#E8B059]" />
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
                className="w-full pl-10 pr-4 py-2.5 rounded-full bg-[var(--bg-input)] border border-[var(--border-subtle)] text-xs sm:text-sm text-[var(--text-main)] outline-none focus:border-[#F1641E] transition"
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
                        ? 'bg-[#222222] text-white dark:bg-neutral-100 dark:text-neutral-900 shadow-xs'
                        : 'bg-[var(--bg-input)] text-[var(--text-muted)] hover:text-[var(--text-main)]'
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
          {filteredPublishers.map((pub) => {
            const pubBooks = BOOKS.filter((b) => pub.bookIds.includes(b.id));
            const isFollowed = !!followedIds[pub.id];

            return (
              <div
                key={pub.id}
                className="rounded-3xl bg-[var(--bg-surface)] border border-[var(--border-subtle)] shadow-xs overflow-hidden transition-shadow hover:shadow-md"
              >
                {/* Top Banner Strip */}
                <div
                  className="p-6 sm:p-8 text-white flex flex-col lg:flex-row lg:items-center justify-between gap-6"
                  style={{ background: pub.bannerGradient }}
                >
                  <div className="flex items-start sm:items-center gap-4 sm:gap-5">
                    <div
                      className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl flex items-center justify-center font-serif font-bold text-2xl sm:text-3xl shadow-md shrink-0 border-2"
                      style={{
                        backgroundColor: 'rgba(255,255,255,0.1)',
                        borderColor: pub.accentColor,
                        color: pub.accentColor,
                      }}
                    >
                      {pub.avatarText}
                    </div>

                    <div className="space-y-1.5">
                      <div className="flex flex-wrap items-center gap-2">
                        <span
                          className="px-2.5 py-0.5 rounded-full text-[11px] font-bold uppercase tracking-wider"
                          style={{
                            backgroundColor: 'rgba(255,255,255,0.14)',
                            color: pub.accentColor,
                          }}
                        >
                          {pub.badgeText}
                        </span>
                        <span className="text-xs text-neutral-300 flex items-center gap-1">
                          <MapPin className="w-3.5 h-3.5" />
                          {pub.location} • Est. {pub.foundedYear}
                        </span>
                      </div>

                      <Link
                        href={`/publishers/${pub.id}`}
                        className="group inline-flex items-center gap-2"
                      >
                        <h2
                          className="text-xl sm:text-2xl font-bold text-white group-hover:underline"
                          style={{
                            fontFamily: 'Georgia, Cambria, "Times New Roman", Times, serif',
                          }}
                        >
                          {pub.name}
                        </h2>
                        <CheckCircle2
                          className="w-5 h-5 shrink-0"
                          style={{ color: pub.accentColor }}
                        />
                      </Link>

                      <p className="font-sinhala text-xs sm:text-sm text-amber-200/90">
                        {pub.sinhalaName} — {pub.tagline}
                      </p>
                    </div>
                  </div>

                  {/* Stats & Actions */}
                  <div className="flex flex-wrap items-center gap-3 sm:gap-4 shrink-0">
                    <div className="flex items-center gap-4 px-4 py-2 rounded-2xl bg-black/25 backdrop-blur-xs border border-white/10 text-xs">
                      <div>
                        <div className="font-bold text-white flex items-center gap-1">
                          <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                          <span>{pub.rating}</span>
                        </div>
                        <span className="text-[11px] text-neutral-300">
                          {pub.reviewsCount.toLocaleString()} reviews
                        </span>
                      </div>
                      <div className="h-7 w-px bg-white/15" />
                      <div>
                        <div className="font-bold text-white flex items-center gap-1">
                          <Users className="w-3.5 h-3.5 text-amber-300" />
                          <span>{pub.followersCount}</span>
                        </div>
                        <span className="text-[11px] text-neutral-300">Scholars</span>
                      </div>
                      <div className="h-7 w-px bg-white/15" />
                      <div>
                        <div className="font-bold text-white">{pubBooks.length}</div>
                        <span className="text-[11px] text-neutral-300">Treatises</span>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => toggleFollow(pub)}
                      className={`px-4 py-2.5 rounded-full text-xs font-bold transition cursor-pointer ${isFollowed
                          ? 'bg-white text-neutral-900 hover:bg-neutral-200'
                          : 'bg-white/15 text-white border border-white/30 hover:bg-white/25'
                        }`}
                    >
                      {isFollowed ? 'Following Guild ✓' : '+ Follow Guild'}
                    </button>

                    <Link
                      href={`/publishers/${pub.id}`}
                      className="px-4 py-2.5 rounded-full bg-[#F1641E] hover:bg-[#d45314] text-white text-xs font-bold transition flex items-center gap-1.5 shadow-xs"
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
                      <div className="inline-flex items-center gap-2 text-xs text-[#a66523] dark:text-amber-400 font-semibold pt-1">
                        <Feather className="w-3.5 h-3.5" />
                        <span>Archival Standard: {pub.craftsmanshipNote}</span>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => handleAddPublisherBundle(pub, pubBooks)}
                      className="self-start lg:self-center px-4 py-2.5 rounded-full bg-[var(--bg-input)] hover:bg-[var(--bg-hover)] border border-[var(--border-subtle)] text-[var(--text-main)] text-xs font-bold transition cursor-pointer flex items-center gap-2 shrink-0"
                    >
                      <Handbag className="w-4 h-4 text-[#F1641E]" />
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
                        className="text-xs font-bold text-[#F1641E] hover:underline flex items-center gap-1"
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
            );
          })}
        </section>
      </main>

      <Footer />
    </div>
  );
}