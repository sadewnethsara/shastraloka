import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Playfair_Display, Noto_Serif_Sinhala } from "next/font/google";
import "./globals.css";

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700", "800"],
  fallback: ["system-ui", "-apple-system", "sans-serif"],
});

const playfair = Playfair_Display({
  variable: "--font-serif",
  subsets: ["latin"],
  display: "swap",
  weight: ["500", "600", "700", "800", "900"],
  fallback: ["Georgia", "serif"],
});

const notoSerifSinhala = Noto_Serif_Sinhala({
  variable: "--font-sinhala",
  subsets: ["sinhala"],
  display: "swap",
  weight: ["400", "600", "700"],
  fallback: ["Iskoola Pota", "serif"],
});

export const metadata: Metadata = {
  title: "Shastraloka (ශාස්ත්‍රලෝක) | Sri Lanka's Premier Classical Bookstore",
  description: "Discover and collect rare Sri Lankan historical chronicles, Theravada Buddhist treatises, Sinhala Kavya poetry, and indigenous Ayurvedic medicine at shastraloka.lk.",
  keywords: ["shastraloka.lk", "Sri Lanka books", "Mahavamsa", "Visuddhimagga", "Sinhala books", "Dhammapada", "Ceylon literature", "Ayurveda Sri Lanka"],
  metadataBase: new URL("https://shastraloka.lk"),
  icons: {
    icon: "/logo.png",
    apple: "/logo.png",
  },
  openGraph: {
    title: "Shastraloka | Sri Lanka's Premier Classical Bookstore",
    description: "Explore the timeless treasury of Sri Lankan classical chronicles, Buddhist treatises, and Sinhala literature.",
    url: "https://shastraloka.lk",
    siteName: "Shastraloka.lk",
    images: [{ url: "/logo.png", width: 800, height: 800, alt: "Shastraloka Books" }],
    type: "website",
  },
};

import Providers from "../components/Providers";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html 
      lang="en" 
      className={`${jakarta.variable} ${playfair.variable} ${notoSerifSinhala.variable} scroll-smooth`} 
      suppressHydrationWarning
    >
      <body className="font-sans antialiased bg-white dark:bg-[#0a0a0c] text-[var(--text-main)] transition-colors duration-300">
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
