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
    sinhalaName: 'Shastraloka Archival Imprints',
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
    sinhalaName: 'Mahavihara Canonical Publications',
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
    sinhalaName: 'Totagamuwa Poetic Scriptorium',
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
    sinhalaName: 'Kurunegala Palm-Leaf Conservation Archive',
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
    sinhalaName: 'Heladiva Indigenous Medicine Council',
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
