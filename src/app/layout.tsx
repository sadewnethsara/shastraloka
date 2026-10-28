import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Outfit, Noto_Serif_Sinhala } from "next/font/google";
import "./globals.css";
import Providers from "../components/Providers";
import { SEO_BRAND, SEO_KEYWORDS, buildGlobalSchemaGraph } from "../utils/seoConfig";

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700", "800"],
  fallback: ["system-ui", "-apple-system", "sans-serif"],
});

const outfit = Outfit({
  variable: "--font-heading",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700", "800", "900"],
  fallback: ["system-ui", "-apple-system", "sans-serif"],
});

const notoSerifSinhala = Noto_Serif_Sinhala({
  variable: "--font-sinhala",
  subsets: ["sinhala"],
  display: "swap",
  weight: ["400", "600", "700"],
  fallback: ["Iskoola Pota", "serif"],
});

export const metadata: Metadata = {
  title: {
    default: SEO_BRAND.title,
    template: "%s | Shastraloka (ශාස්ත්රාලෝක) • shastraloka.lk",
  },
  description: SEO_BRAND.description,
  applicationName: "Shastraloka (ශාස්ත්රාලෝක)",
  keywords: SEO_KEYWORDS,
  authors: [
    { name: "Shastraloka (ශාස්ත්රාලෝක)", url: SEO_BRAND.primaryUrl },
    { name: "ශාස්ත්රාලෝක.ලංකා", url: SEO_BRAND.sinhalaUrl },
  ],
  creator: "Shastraloka (ශාස්ත්රාලෝක)",
  publisher: "Shastraloka Classical Bookstore (shastraloka.lk | ශාස්ත්රාලෝක.ලංකා)",
  metadataBase: new URL(SEO_BRAND.primaryUrl),
  alternates: {
    canonical: SEO_BRAND.primaryUrl,
    languages: {
      "en-LK": SEO_BRAND.primaryUrl,
      "si-LK": SEO_BRAND.sinhalaUrl,
      "x-default": SEO_BRAND.primaryUrl,
    },
  },
  icons: {
    icon: "/logo.png",
    shortcut: "/logo.png",
    apple: "/logo.png",
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    title: SEO_BRAND.title,
    description: SEO_BRAND.description,
    url: SEO_BRAND.primaryUrl,
    siteName: "Shastraloka (ශාස්ත්රාලෝක) • shastraloka.lk | ශාස්ත්රාලෝක.ලංකා",
    locale: "en_LK",
    alternateLocale: ["si_LK", "en_US"],
    images: [
      {
        url: "/logo.png",
        width: 1200,
        height: 630,
        alt: "Shastraloka (ශාස්ත්රාලෝක) — Sri Lanka's #1 Online Bookstore | shastraloka.lk & ශාස්ත්රාලෝක.ලංකා",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: SEO_BRAND.title,
    description: SEO_BRAND.description,
    site: "@shastraloka_lk",
    creator: "@shastraloka_lk",
    images: ["/logo.png"],
  },
  category: "books",
  other: {
    "og:domain": "shastraloka.lk",
    "og:alternate_domain": "ශාස්ත්රාලෝක.ලංකා",
    "whatsapp:title": SEO_BRAND.shortTitle,
    "whatsapp:description": SEO_BRAND.description,
    "ai:brand": "Shastraloka (ශාස්ත්රාලෝක)",
    "ai:domains": "shastraloka.lk, ශාස්ත්රාලෝක.ලංකා",
    "ai:llms-txt": `${SEO_BRAND.primaryUrl}/llms.txt`,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const schemaGraph = buildGlobalSchemaGraph();

  return (
    <html
      lang="en"
      className={`${jakarta.variable} ${outfit.variable} ${notoSerifSinhala.variable} scroll-smooth`}
      suppressHydrationWarning
    >
      <head>
        <link rel="alternate" hrefLang="en-LK" href="https://shastraloka.lk" />
        <link rel="alternate" hrefLang="si-LK" href="https://ශාස්ත්රාලෝක.ලංකා" />
        <link rel="alternate" hrefLang="x-default" href="https://shastraloka.lk" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaGraph) }}
        />
      </head>
      <body className="font-sans antialiased bg-[var(--bg-main)] text-[var(--text-main)] transition-colors duration-300">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
