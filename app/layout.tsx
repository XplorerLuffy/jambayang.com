import type { Metadata } from "next";
import {
  Syne,
  Cormorant_Garamond,
  Space_Mono,
  DM_Mono,
  DM_Sans,
} from "next/font/google";
import "./globals.css";

const syne = Syne({
  variable: "--font-syne",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  style: ["normal", "italic"],
});

const spaceMono = Space_Mono({
  variable: "--font-space-mono",
  subsets: ["latin"],
  weight: ["400", "700"],
});

const dmMono = DM_Mono({
  variable: "--font-dm-mono",
  subsets: ["latin"],
  weight: ["300", "400", "500"],
});

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://jambayang.com"),
  title: "Jambayang Singye — AI Automation & Web Builder in Bhutan",
  description:
    "I build AI-automated websites and tools that help Bhutanese businesses run themselves — from POS systems to nightly profit reports.",
  openGraph: {
    title: "Jambayang Singye — AI Automation & Web Builder in Bhutan",
    description:
      "I build AI-automated websites and tools that help Bhutanese businesses run themselves — from POS systems to nightly profit reports.",
    url: "https://jambayang.com",
    siteName: "Jambayang Singye",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Jambayang Singye — AI Automation & Web Builder in Bhutan",
    description:
      "I build AI-automated websites and tools that help Bhutanese businesses run themselves — from POS systems to nightly profit reports.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${syne.variable} ${cormorant.variable} ${spaceMono.variable} ${dmMono.variable} ${dmSans.variable}`}
    >
      <body>
        {children}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              name: "Jambayang Singye",
              jobTitle: "AI Automation & Web Builder",
              address: {
                "@type": "PostalAddress",
                addressLocality: "Gelephu",
                addressRegion: "Sarpang",
                addressCountry: "BT",
              },
              knowsAbout: [
                "Next.js",
                "Supabase",
                "Make.com",
                "AI Automation",
                "POS Integration",
              ],
            }),
          }}
        />
      </body>
    </html>
  );
}
