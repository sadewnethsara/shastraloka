export interface Book {
  id: string;
  title: string;
  sinhalaTitle: string;
  author: string;
  translator?: string;
  category: string;
  price: number; // in LKR
  originalPrice: number; // in LKR
  rating: number;
  reviewsCount: number;
  heightRatio: number; // for staggered masonry layout
  coverImage: string; // real photographic book cover URL
  galleryImages?: string[]; // additional archival plates & manuscript folios
  themeColor: string;
  accentColor: string;
  bgGradient: string;
  embossPattern: string;
  symbol: string;
  description: string;
  versesSnippet: {
    original: string;
    transliteration: string;
    english: string;
  };
  pages: number;
  language: string;
  binding: 'Clothbound Hardcover' | 'Deluxe Gold Embossed' | 'Ola Leaf Collector Box' | 'Royal Silkbound Edition';
  tags: string[];
  featured?: boolean;
  usdPrice?: number;
  originalUsdPrice?: number;
  urgencyText?: string;
  sellerName?: string;
  sellerAvatar?: string;
  sellerRating?: number;
  sellerReviews?: string;
  isDigital?: boolean;
}

export const CATEGORIES = [
  'All Treatises',
  'Ancient Chronicles (Itihasa)',
  'Buddhist Philosophy (Abhidhamma)',
  'Classical Sinhala Poetry (Kavya)',
  'Indigenous Ayurveda (Deshiya Wedakama)',
  'Jataka Stories & Folk Wisdom',
  'Temple Architecture & Vastu',
  'Ancient Inscriptions & Culture',
] as const;

export const BOOKS: Book[] = [
  {
    id: 'mahawamsa-great-chronicle',
    title: 'The Mahavamsa: Great Chronicle of Sri Lanka',
    sinhalaTitle: 'මහාවංසය',
    author: 'Ven. Mahanama Thero (5th Century CE)',
    translator: 'Prof. Wilhelm Geiger & Ven. Sumangala',
    category: 'Ancient Chronicles (Itihasa)',
    price: 3850,
    originalPrice: 4950,
    rating: 4.98,
    reviewsCount: 1640,
    heightRatio: 1.48,
    coverImage: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=800&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1457369804613-52c61a468e7d?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?auto=format&fit=crop&w=1200&q=80'
    ],
    themeColor: '#2b231f',
    accentColor: '#d4af37',
    bgGradient: 'linear-gradient(145deg, #1f1a17 0%, #3a302a 60%, #15110e 100%)',
    embossPattern: 'lion-crest',
    symbol: 'ශ්‍රී',
    description: 'The monumental historical poem documenting the unbroken 2,500-year history of Sri Lanka, detailing the advent of Vijaya, King Devanampiya Tissa, the arrival of the Sacred Bodhi Tree, and King Dutugemunu.',
    versesSnippet: {
      original: 'නමෝ තස්ස භගවතෝ අරහතෝ සම්මා සම්බුද්ධස්ස। මහාවංසං පවක්ඛාමි නානාචක්කේහි විත්ථතං॥',
      transliteration: 'namō tassa bhagavatō arahatō sammā sambuddhassa | mahāvaṁsaṁ pavakkhāmi nānācakkēhi vitthataṁ',
      english: 'Reverence to the Blessed One, the Exalted, the Fully Enlightened! I will recount the Mahavamsa, the Great Chronicle, compiled for the serene joy and spiritual elevation of the pious.'
    },
    pages: 820,
    language: 'English with Original Sinhala & Pali References',
    binding: 'Deluxe Gold Embossed',
    tags: ['Mahavamsa', 'Anuradhapura', 'Dutugemunu', 'Chronicle', 'Sri Lankan History'],
    featured: true,
  },
  {
    id: 'visuddhimagga-path-of-purification',
    title: 'Visuddhimagga: The Path of Purification',
    sinhalaTitle: 'විසුද්ධිමග්ග',
    author: 'Bhadantacariya Buddhaghosa (Mahavihara)',
    translator: 'Bhikkhu Nanamoli',
    category: 'Buddhist Philosophy (Abhidhamma)',
    price: 4600,
    originalPrice: 5800,
    rating: 4.99,
    reviewsCount: 1280,
    heightRatio: 1.55,
    coverImage: 'https://images.unsplash.com/photo-1457369804613-52c61a468e7d?auto=format&fit=crop&w=800&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1457369804613-52c61a468e7d?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=1200&q=80'
    ],
    themeColor: '#1c2430',
    accentColor: '#c5a059',
    bgGradient: 'linear-gradient(145deg, #131922 0%, #202b3a 60%, #0d1118 100%)',
    embossPattern: 'dhamma-wheel',
    symbol: 'ධ',
    description: 'The quintessential master treatise of Theravada Buddhist doctrine composed at the Mahavihara of Anuradhapura. Exhaustively details Sila (Morality), Samadhi (Concentration), and Panna (Wisdom).',
    versesSnippet: {
      original: 'සීලේ පතිට්ඨාය නරෝ සපඤ්ඤෝ චිත්තං පඤ්ඤඤ්ච භාවයං। ආතාපී නිපකෝ භික්ඛු සෝ ඉමං විජටයේ ජටං॥',
      transliteration: 'sīlē patiṭṭhāya narō sapaññō cittaṁ paññañca bhāvayaṁ | ātāpī nipakō bhikkhū sō imaṁ vijaṭayē jaṭaṁ',
      english: 'When a wise person, established on virtue, develops mind and insight, then as an ardent and discerning seeker, they untangle this inner tangle of worldly existence.'
    },
    pages: 980,
    language: 'English with Classical Pali Terminology',
    binding: 'Ola Leaf Collector Box',
    tags: ['Theravada', 'Buddhaghosa', 'Samadhi', 'Vipassana', 'Anuradhapura'],
    featured: true,
  },
  {
    id: 'dhammapada-illustrated',
    title: 'The Dhammapada: Verses of the Path',
    sinhalaTitle: 'ධම්මපදය',
    author: 'Gautama Buddha',
    translator: 'Ven. Narada Mahathera',
    category: 'Buddhist Philosophy (Abhidhamma)',
    price: 1950,
    originalPrice: 2800,
    rating: 4.96,
    reviewsCount: 2150,
    heightRatio: 1.38,
    coverImage: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=800&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&w=1200&q=80'
    ],
    themeColor: '#34261d',
    accentColor: '#d4af37',
    bgGradient: 'linear-gradient(145deg, #221812 0%, #423024 60%, #17100b 100%)',
    embossPattern: 'lotus-radiance',
    symbol: 'ප',
    description: '423 timeless ethical verses on mindfulness, karma, speech, tranquility, and awakening, presented with word-by-word Sinhala roots, Pali chants, and poetic English commentary.',
    versesSnippet: {
      original: 'මනෝපුබ්බංගමා ධම්මා මනෝසෙට්ඨා මනෝමයා। මනසා චේ පදුට්ඨේන භාසති වා කරෝති වා තතෝ නං දුක්ඛමන්වේති॥',
      transliteration: 'manōpubbaṅgamā dhammā manōseṭṭhā manōmayā | manasā cē paduṭṭhēna bhāsati vā karōti vā tatō naṁ dukkham-anvēti',
      english: 'Mind precedes all mental states; mind is their chief; they are all mind-wrought. If with an impure mind a person speaks or acts, suffering follows them even as the wheel follows the hoof of the ox.'
    },
    pages: 340,
    language: 'Pali, Sinhala & English Edition',
    binding: 'Royal Silkbound Edition',
    tags: ['Mindfulness', 'Theravada', 'Pali Canon', 'Ethical Life', 'Buddhism'],
    featured: true,
  },
  {
    id: 'selalihini-sandeshaya',
    title: 'Selalihini Sandeshaya: The Starling’s Message',
    sinhalaTitle: 'සැළලිහිණි සන්දේශය',
    author: 'Ven. Sri Rahula Thero of Totagamuwa (15th Century)',
    translator: 'Lionel De Fonseka & Harold Peiris',
    category: 'Classical Sinhala Poetry (Kavya)',
    price: 1850,
    originalPrice: 2400,
    rating: 4.93,
    reviewsCount: 420,
    heightRatio: 1.44,
    coverImage: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&w=800&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&w=1200&q=80'
    ],
    themeColor: '#1d2c23',
    accentColor: '#96c496',
    bgGradient: 'linear-gradient(145deg, #131d17 0%, #293d31 60%, #0d140f 100%)',
    embossPattern: 'bird-flight-flora',
    symbol: 'ස',
    description: 'The golden jewel of Kotte-period messenger poetry. Written to dispatch a starling bird to Lord Vibhishana at the Kelaniya Temple praying for a male heir to King Parakramabahu VI.',
    versesSnippet: {
      original: 'සරසවියක් ලැඳි සුවඳැති තුඩ මුවිනී। කරණිය සව් සත වෙත සිරි සඟසඳිනී॥',
      transliteration: 'sarasaviyak læⁿdi suvaⁿdæti tuḍa muvinī | karaṇiya sav sata veta siri saⁿgasaⁿdinī',
      english: 'O gentle bird with sweet fragrance upon thy beak, beloved of Saraswati, fly gracefully to convey our prayer for peace, health, and sovereign blessing.'
    },
    pages: 260,
    language: 'Sinhala Original with English Metric Translation',
    binding: 'Clothbound Hardcover',
    tags: ['Kotte Period', 'Sandesha', 'Totagamuwa', 'Kelaniya', 'Classical Poetry'],
  },
  {
    id: 'guttila-kavyaya',
    title: 'Guttila Kavyaya: Song of the Master Musician',
    sinhalaTitle: 'ගුත්තිල කාව්‍යය',
    author: 'Ven. Vettave Thero (15th Century)',
    translator: 'Prof. Ediriweera Sarachchandra Commentary',
    category: 'Classical Sinhala Poetry (Kavya)',
    price: 1650,
    originalPrice: 2200,
    rating: 4.91,
    reviewsCount: 380,
    heightRatio: 1.4,
    coverImage: 'https://images.unsplash.com/photo-1476275466078-4007374efbbe?auto=format&fit=crop&w=800&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1476275466078-4007374efbbe?auto=format&fit=crop&w=1200&q=80'
    ],
    themeColor: '#302029',
    accentColor: '#d6a5b8',
    bgGradient: 'linear-gradient(145deg, #1d1318 0%, #3d2934 60%, #140d10 100%)',
    embossPattern: 'veena-melody',
    symbol: 'ග',
    description: 'The poignant musical epic celebrating the contest between the noble maestro Guttila and his ungrateful student Musila. Revered for its intoxicating rhythmic meter (Matra vrutta).',
    versesSnippet: {
      original: 'සියපිනෙන් පෑදූ සියපත් සියක් ගැබ සැපැමිණි රොන් කෙළින බිඟු රොද සෙයින් විජයග්‍රහණ පානා॥',
      transliteration: 'siyapinen pǣdū siyapat siyak gæba sæpæmiṇi ron keḷina biⁿgu roda seyin',
      english: 'As divine swarms of bees revel amidst lotus pollen blossoming from a hundred virtues, the master struck the veena chords, enrapturing all heavenly beings.'
    },
    pages: 280,
    language: 'Classical Sinhala with Critical English Notes',
    binding: 'Clothbound Hardcover',
    tags: ['Veena', 'Sinhala Kavya', 'Music Contest', 'Sarachchandra', 'Kotte'],
  },
  {
    id: 'deshiya-cikitsa-samgrahaya',
    title: 'Deshiya Cikitsa: Sri Lankan Indigenous Medicine',
    sinhalaTitle: 'දේශීය වෛද්‍ය සංග්‍රහය',
    author: 'King Buddhadasa & Traditional Weda Ralahamis',
    translator: 'Dr. C.G. Uragoda & Indigenous Medicine Council',
    category: 'Indigenous Ayurveda (Deshiya Wedakama)',
    price: 3450,
    originalPrice: 4500,
    rating: 4.97,
    reviewsCount: 710,
    heightRatio: 1.52,
    coverImage: 'https://images.unsplash.com/photo-1471107340929-a87cd0f5b5f3?auto=format&fit=crop&w=800&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1471107340929-a87cd0f5b5f3?auto=format&fit=crop&w=1200&q=80'
    ],
    themeColor: '#242e2b',
    accentColor: '#7fb8a4',
    bgGradient: 'linear-gradient(145deg, #171d1b 0%, #303c38 60%, #0f1311 100%)',
    embossPattern: 'rare-ceylon-herbs',
    symbol: 'වෙ',
    description: 'Comprehensive compendium of Sri Lanka\'s secret indigenous medical traditions (Deshiya Wedakama), Hela Wedakama, fracture healing (Kadum-Bindum), venom therapy, and Ceylon herbal elixirs.',
    versesSnippet: {
      original: 'ඖෂධං සර්ව රෝගාණාං ස්වභාව ධර්ම ශක්තිතෝ। ආයුරාරෝග්‍ය සම්පත්තිං දෙස්සෙයං සුජන හිතේ॥',
      transliteration: 'auṣadhaṁ sarva rōgāṇāṁ svabhāva dharma śaktitō | āyurārōgya sampattiṁ desseyan sujana hitē',
      english: 'Drawing upon the restorative forces of nature and island herbs, this ancient wisdom bestows the wealth of longevity and holistic vitality upon all beings.'
    },
    pages: 740,
    language: 'English with Sinhala Plant Names & Formulae',
    binding: 'Deluxe Gold Embossed',
    tags: ['Hela Wedakama', 'King Buddhadasa', 'Ceylon Herbs', 'Indigenous Medicine', 'Wellness'],
  },
  {
    id: 'chulavamsa-chronicle',
    title: 'Culavamsa: Later Chronicle of Ceylon',
    sinhalaTitle: 'චූලවංසය',
    author: 'Ven. Dhammakitti Thero & Council of Scribes',
    translator: 'Wilhelm Geiger & C.M. Rickmers',
    category: 'Ancient Chronicles (Itihasa)',
    price: 3600,
    originalPrice: 4800,
    rating: 4.92,
    reviewsCount: 520,
    heightRatio: 1.58,
    coverImage: 'https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?auto=format&fit=crop&w=800&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=1200&q=80'
    ],
    themeColor: '#30261f',
    accentColor: '#cda869',
    bgGradient: 'linear-gradient(145deg, #201914 0%, #3e3229 60%, #15100c 100%)',
    embossPattern: 'polonnaruwa-pillar',
    symbol: 'චූ',
    description: 'The monumental historical sequel continuing the Mahavamsa narrative from King Mahasena to the Polonnaruwa, Dambadeniya, Yapahuwa, Gampola, and Kingdom of Kandy eras.',
    versesSnippet: {
      original: 'පරාක්‍රමභුජෝ රාජා ලංකාදීපේ නරේශ්වරෝ। වැවක් තනා සරුසාර කෙත් කරවී සියලු රට॥',
      transliteration: 'parākramabhujō rājā laṅkādīpē narēśvarō | vævak tanā sarusāra ket karavī siyalu raṭa',
      english: 'King Parakramabahu the Great decreed: "Not even a single drop of water falling as rain from the heavens shall flow into the ocean without being used for the welfare of mankind."'
    },
    pages: 860,
    language: 'English with Historical Maps & Inscriptions',
    binding: 'Clothbound Hardcover',
    tags: ['Polonnaruwa', 'Parakramabahu', 'Parakrama Samudra', 'Sigiriya', 'Chulavamsa'],
    featured: true,
  },
  {
    id: 'pansiya-panas-jataka-potha',
    title: 'Pansiya Panas Jataka: 550 Birth Stories of the Bodhisattva',
    sinhalaTitle: 'පන්සිය පනස් ජාතක පොත් වහන්සේ',
    author: 'Kurunegala Era Scribes (14th Century CE)',
    translator: 'Prof. T.W. Rhys Davids & Ven. K. Gunaratana',
    category: 'Jataka Stories & Folk Wisdom',
    price: 5200,
    originalPrice: 6500,
    rating: 4.99,
    reviewsCount: 1980,
    heightRatio: 1.62,
    coverImage: 'https://images.unsplash.com/photo-1516979187457-637abb4f9353?auto=format&fit=crop&w=800&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1516979187457-637abb4f9353?auto=format&fit=crop&w=1200&q=80'
    ],
    themeColor: '#2b1f20',
    accentColor: '#d8ab76',
    bgGradient: 'linear-gradient(145deg, #1b1314 0%, #392a2b 60%, #110b0c 100%)',
    embossPattern: 'bodhisattva-sun',
    symbol: 'ජා',
    description: 'The treasure-house of Sinhala moral narrative and cultural heritage recounting the 550 previous existences of Gautama Buddha perfecting Paramitas across aeons.',
    versesSnippet: {
      original: 'සසර සැරිසරන බෝසත් සිරි පිරූ පෙරුමන් මහිමයෙන්। සකල සත වෙත පතළ මෙත් ගුණ සදා දිනේ ලෝ තලේ॥',
      transliteration: 'sasara særisarana bōsat siri pirū peruman mahimayen',
      english: 'Through countless lifetimes traversing Samsara, the Bodhisattva perfected boundless compassion, wisdom, and sacrificial selflessness for the salvation of all living beings.'
    },
    pages: 1420,
    language: '2-Volume Deluxe Boxset with Line Art Plates',
    binding: 'Ola Leaf Collector Box',
    tags: ['Jataka', 'Kurunegala', 'Bodhisattva', 'Moral Tales', 'Illustrated'],
    featured: true,
  },
  {
    id: 'subhashithaya-alagiyawanna',
    title: 'Subhashithaya: Gems of Practical Sinhala Wisdom',
    sinhalaTitle: 'සුභාෂිතය',
    author: 'Alagiyawanna Mukaveti (16th Century)',
    translator: 'Prof. C.H.B. Reynolds',
    category: 'Classical Sinhala Poetry (Kavya)',
    price: 1450,
    originalPrice: 1950,
    rating: 4.94,
    reviewsCount: 610,
    heightRatio: 1.35,
    coverImage: 'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?auto=format&fit=crop&w=800&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?auto=format&fit=crop&w=1200&q=80'
    ],
    themeColor: '#20282b',
    accentColor: '#89b4be',
    bgGradient: 'linear-gradient(145deg, #141a1c 0%, #2a3438 60%, #0d1112 100%)',
    embossPattern: 'gem-facets',
    symbol: 'සු',
    description: '100 scintillating moral epigrams offering unshakeable guidance on friendship, virtue, discernment, deceitful company, humility, and the impermanence of worldly vanity.',
    versesSnippet: {
      original: 'පඬිවරුන් සමග එක්ව විසීම යහපති। මෝඩයන් හා ඇසුර විපතට හේතු වෙයි॥',
      transliteration: 'paⁿḍivarun samaga ekva visīma yahapati | mōḍayan hā æsura vipataṭa hētu veyi',
      english: 'Association with the wise is true nobility; fellowship with the heedless is the root of misfortune. Like pure water poured into water, a wise mind absorbs virtue effortlessly.'
    },
    pages: 210,
    language: 'Sinhala & English Bilingual Edition',
    binding: 'Royal Silkbound Edition',
    tags: ['Subhashitha', 'Sitawaka', 'Alagiyawanna', 'Proverbs', 'Moral Poetry'],
  },
  {
    id: 'saddharma-ratnavaliya',
    title: 'Saddharma Ratnavaliya: Jewel Garland of the Law',
    sinhalaTitle: 'සද්ධර්ම රත්නාවලිය',
    author: 'Ven. Dharmasena Thero (13th Century Dambadeniya)',
    translator: 'Prof. Ranjini Obeyesekere',
    category: 'Buddhist Philosophy (Abhidhamma)',
    price: 3200,
    originalPrice: 4200,
    rating: 4.95,
    reviewsCount: 540,
    heightRatio: 1.48,
    coverImage: 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&w=800&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&w=1200&q=80'
    ],
    themeColor: '#27202d',
    accentColor: '#bfa0cc',
    bgGradient: 'linear-gradient(145deg, #19141d 0%, #352b3d 60%, #100d13 100%)',
    embossPattern: 'dambadeniya-lotus',
    symbol: 'ර',
    description: 'A masterpiece of vivid medieval Sinhala storytelling adapting the Dhammapada commentary. Renowned for its lively idiomatic dialogue, humor, domestic insight, and profound Buddhist psychology.',
    versesSnippet: {
      original: 'ධර්මය නම් වූ අමෘතය පානය කළ තැනැත්තේ මේ ලොවද පරලොවද සුවපත් වන්නේය॥',
      transliteration: 'dharmaya nam vū amṛtaya pānaya kaḷa tænættē mē lovada paralovada suvapat vannēya',
      english: 'One who partakes of the nectar of Dhamma abides in serenity both in this realm and beyond. Good deeds perfume the soul beyond the direction of the winds.'
    },
    pages: 680,
    language: 'English Translation with Sinhala Excerpts',
    binding: 'Clothbound Hardcover',
    tags: ['Dambadeniya', 'Dharmasena', 'Medieval Stories', 'Dhamma Stories', 'Classics'],
  },
  {
    id: 'amavatura-gurulugomi',
    title: 'Amavatura: The Stream of Nectar',
    sinhalaTitle: 'අමාවතුර',
    author: 'Gurulugomi (12th Century Polonnaruwa)',
    translator: 'Ven. Walpola Rahula Commentary & English Notes',
    category: 'Classical Sinhala Poetry (Kavya)',
    price: 2150,
    originalPrice: 2850,
    rating: 4.93,
    reviewsCount: 390,
    heightRatio: 1.42,
    coverImage: 'https://images.unsplash.com/photo-1495446815901-a7297e633e8d?auto=format&fit=crop&w=800&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1495446815901-a7297e633e8d?auto=format&fit=crop&w=1200&q=80'
    ],
    themeColor: '#232b2b',
    accentColor: '#8ec3c3',
    bgGradient: 'linear-gradient(145deg, #161c1c 0%, #2f3a3a 60%, #0e1212 100%)',
    embossPattern: 'nectar-stream',
    symbol: 'අ',
    description: 'The monumental classical prose work elaborating on the Buddha’s attribute "Purisadhamma Sarathi" (Tamer of untamed beings). Celebrated for its pristine, unornamented pure Sinhala vocabulary (Elu).',
    versesSnippet: {
      original: 'දමනය කළ නොහී මුරණ්ඩු සත්ත්වයන් කරුණා ගුණයෙන් හා ප්‍රඥාවෙන් හික්මවූ සේක॥',
      transliteration: 'damanya kaḷa nohī muraṇḍu sattvayan karuṇā guṇayen hā prajñāven hikmavū sēka',
      english: 'Through supreme compassion and peerless wisdom, the Great Teacher subdued the fiercest minds, steering them from darkness into the unshakeable peace of Truth.'
    },
    pages: 420,
    language: 'Elu Sinhala & Modern English',
    binding: 'Deluxe Gold Embossed',
    tags: ['Gurulugomi', 'Elu', 'Polonnaruwa Era', 'Prose Masterpiece', 'Buddha Charita'],
  },
  {
    id: 'ruwanwelisaya-ancient-architecture',
    title: 'Sacred Architecture of Ceylon: Anuradhapura Stupas',
    sinhalaTitle: 'ලක්දිව පුරාණ වාස්තු විද්‍යාව',
    author: 'Prof. Senake Bandaranayake & Roland Silva',
    translator: 'National Heritage Research Council',
    category: 'Temple Architecture & Vastu',
    price: 4900,
    originalPrice: 6200,
    rating: 4.97,
    reviewsCount: 480,
    heightRatio: 1.6,
    coverImage: 'https://images.unsplash.com/photo-1506880018603-83d5b814b5a6?auto=format&fit=crop&w=800&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1506880018603-83d5b814b5a6?auto=format&fit=crop&w=1200&q=80'
    ],
    themeColor: '#34261e',
    accentColor: '#d69e2e',
    bgGradient: 'linear-gradient(145deg, #221812 0%, #443227 60%, #150f0b 100%)',
    embossPattern: 'dagoba-dome',
    symbol: 'වා',
    description: 'An exhaustive architectural analysis of the giant brick stupas of Ruwanwelisaya, Jetavanaramaya (the tallest brick monument of the ancient world), moonstones (Sandakada Pahana), and hydraulic stone dams.',
    versesSnippet: {
      original: 'රුවන්වැලි සෑ විස්මිත නිර්මාණය ලක්දිව වාස්තු ශිල්පීන්ගේ සදාතනික කූටප්‍රාප්තියයි॥',
      transliteration: 'ruvanvæli sǣ vismita nirmāṇaya lakdiva vāstu śilpīngē sadātanika kūṭaprāptiyayi',
      english: 'The monumental dome of Ruwanwelisaya stands as an everlasting testament to the mathematical precision, spiritual harmony, and astronomical alignment of ancient Sinhala builders.'
    },
    pages: 610,
    language: 'English with Full-Color Architectural Blueprints',
    binding: 'Ola Leaf Collector Box',
    tags: ['Ruwanwelisaya', 'Jetavanarama', 'Sandakada Pahana', 'Ancient Architecture', 'Stupas'],
    featured: true,
  },
  {
    id: 'epigraphia-zeylanica',
    title: 'Epigraphia Zeylanica: Stone Records of Ancient Ceylon',
    sinhalaTitle: 'ශිලා ලේඛන සංග්‍රහය',
    author: 'Don Martino de Zilva Wickremasinghe & Senarath Paranavitana',
    category: 'Ancient Inscriptions & Culture',
    price: 4800,
    originalPrice: 6000,
    rating: 4.96,
    reviewsCount: 310,
    heightRatio: 1.54,
    coverImage: 'https://images.unsplash.com/photo-1505664194779-8beaceb93744?auto=format&fit=crop&w=800&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1505664194779-8beaceb93744?auto=format&fit=crop&w=1200&q=80'
    ],
    themeColor: '#24272c',
    accentColor: '#a0aab8',
    bgGradient: 'linear-gradient(145deg, #17191d 0%, #30353c 60%, #0f1013 100%)',
    embossPattern: 'ancient-brahmi-rock',
    symbol: 'ශි',
    description: 'The authoritative multi-volume compilation of rock and pillar inscriptions from Mihintale, Sigiriya, Polonnaruwa, and Badulla, deciphering ancient Sinhala script and royal edicts.',
    versesSnippet: {
      original: 'ගලක කෙටූ අකුරු කලක් නොමැකී පවතින්නාක් මෙන් ධර්මිෂ්ඨ රජුගේ නාමය සදා බැබළෙන්නේය॥',
      transliteration: 'galaka keṭū akuru kalak nomækī pavatinnāk men dharmishṭha rajugē nāmaya sadā bæbæḷennēya',
      english: 'As inscriptions deeply engraved upon granite rocks endure the passage of millennia, so too does the righteous sovereign\'s benevolent name illuminate the island\'s memory.'
    },
    pages: 720,
    language: 'Early Sinhala Inscriptions with English Decipherment',
    binding: 'Deluxe Gold Embossed',
    tags: ['Paranavitana', 'Sigiriya Graffiti', 'Mihintale Slabs', 'Inscriptions', 'Brahmi'],
  },
  {
    id: 'pujavaliya-mayurapada',
    title: 'Pujavaliya: The Garland of Offerings',
    sinhalaTitle: 'පූජාවලිය',
    author: 'Ven. Mayurapada Buddhaputta Thero (13th Century)',
    translator: 'Prof. K.N. Jayatilleke & S. Jayawardhana',
    category: 'Jataka Stories & Folk Wisdom',
    price: 2750,
    originalPrice: 3500,
    rating: 4.91,
    reviewsCount: 470,
    heightRatio: 1.45,
    coverImage: 'https://images.unsplash.com/photo-1521587760476-6c12a4b040da?auto=format&fit=crop&w=800&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1521587760476-6c12a4b040da?auto=format&fit=crop&w=1200&q=80'
    ],
    themeColor: '#32251d',
    accentColor: '#d6a365',
    bgGradient: 'linear-gradient(145deg, #201712 0%, #433227 60%, #150f0b 100%)',
    embossPattern: 'jasmine-garland',
    symbol: 'පූ',
    description: 'Written during the reign of King Parakramabahu II at Dambadeniya, this devotional masterpiece praises the Buddha as "Araham" (Worthy of supreme veneration) with captivating cultural narratives.',
    versesSnippet: {
      original: 'සියලු ලෝවැසියන්ගේ හිතසුව පිණිස සම්බුදු ගුණ සුවඳ විහිදුවන පූජාවලී රත්නය සකස් විය॥',
      transliteration: 'siyalu lōvæsiyangē hitasuva piṇisa sambudu guṇa suvaⁿda vihiduvana pūjāvalī ratnaya',
      english: 'Composed for the spiritual enrichment of all people of Lanka, dispensing the celestial fragrance of the Buddha\'s virtues like an unwithering garland of sacred jasmine blossoms.'
    },
    pages: 580,
    language: 'Classical Sinhala with Parallel English Guide',
    binding: 'Clothbound Hardcover',
    tags: ['Pujavaliya', 'Dambadeniya', 'Mayurapada', 'Araham', 'Sinhala Prose'],
  },
  {
    id: 'kavyashekhara-totagamuwa',
    title: 'Kavyashekhara: The Crown of Classical Poetry',
    sinhalaTitle: 'කාව්‍යශේඛරය',
    author: 'Ven. Sri Rahula Thero (15th Century)',
    translator: 'Prof. W.S. Karunaratne',
    category: 'Classical Sinhala Poetry (Kavya)',
    price: 1950,
    originalPrice: 2600,
    rating: 4.94,
    reviewsCount: 340,
    heightRatio: 1.38,
    coverImage: 'https://images.unsplash.com/photo-1519682337058-a94d519337bc?auto=format&fit=crop&w=800&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1519682337058-a94d519337bc?auto=format&fit=crop&w=1200&q=80'
    ],
    themeColor: '#2b2317',
    accentColor: '#cfa950',
    bgGradient: 'linear-gradient(145deg, #1c160e 0%, #3a2f1f 60%, #120e09 100%)',
    embossPattern: 'royal-diadem',
    symbol: 'කා',
    description: 'The Mahakavya (Great Epic) of classical Sinhala verse versifying the Sattubhassa Jataka in 15 cantos, commissioned by Queen Ulakudaya Devi of Kotte. Filled with advice on education and filial piety.',
    versesSnippet: {
      original: 'පොතපත බැලීමෙන් නුවණැස පෑදෙන්නේය। උගතුන් ඇසුරින් ලොව බැබළෙන්නේය॥',
      transliteration: 'potapata bælīmen nuvaṇæsa pǣdennēya | ugatun æsurin lova bæbæḷennēya',
      english: 'Through the loving contemplation of sacred scrolls, the eye of wisdom is awakened; through communion with the learned, the nation shines in perpetual splendor.'
    },
    pages: 310,
    language: 'Classical Sinhala with Metric English Translation',
    binding: 'Royal Silkbound Edition',
    tags: ['Sri Rahula', 'Kotte Kingdom', 'Mahakavya', 'Sattubhassa Jataka', 'Crown Jewel'],
  }
];

