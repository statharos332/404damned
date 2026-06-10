import type { Metadata, Viewport } from "next";
import { DM_Sans, Space_Grotesk, JetBrains_Mono } from "next/font/google";
import "@/styles/globals.css";
import { SmoothScrollProvider } from "@/components/layout/SmoothScrollProvider";
import { CustomCursor } from "@/components/ui/CustomCursor";
import { LightningStrike } from "@/components/ui/LightningStrike";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://404damned.nl"),
  title: {
    default: "404 DAMNED — Premium Digital Agency Amsterdam",
    template: "%s | 404 DAMNED",
  },
  description:
    "We don't build websites. We build digital weapons. Premium web development, e-commerce, AI automation & growth systems for ambitious Dutch businesses.",
  keywords: [
    "digital agency Amsterdam",
    "web development Amsterdam",
    "Next.js development",
    "e-commerce development",
    "Magento development",
    "AI automation",
    "premium digital agency Netherlands",
    "website Amsterdam",
    "SEO Amsterdam",
  ],
  authors: [{ name: "404 DAMNED", url: "https://404damned.nl" }],
  creator: "404 DAMNED",
  publisher: "404 DAMNED",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "nl_NL",
    alternateLocale: "en_US",
    url: "https://404damned.nl",
    siteName: "404 DAMNED",
    title: "404 DAMNED — Premium Digital Agency Amsterdam",
    description:
      "We don't build websites. We build digital weapons. Premium web development, e-commerce & AI automation for ambitious businesses.",
    // og:image is generated automatically by src/app/opengraph-image.tsx
  },
  twitter: {
    card: "summary_large_image",
    title: "404 DAMNED — Premium Digital Agency Amsterdam",
    description: "We don't build websites. We build digital weapons.",
    creator: "@404damned",
    // twitter image also comes from opengraph-image.tsx
  },
  alternates: {
    canonical: "https://404damned.nl",
  },
};

export const viewport: Viewport = {
  themeColor: "#050505",
  width: "device-width",
  initialScale: 1,
};

const structuredData = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  "@id": "https://404damned.nl/#organization",
  name: "404 DAMNED",
  alternateName: "404 DAMNED Digital Agency",
  description:
    "Premium digital agency in Amsterdam specialising in web development, e-commerce, AI automation, branding, SEO and growth systems for ambitious businesses.",
  url: "https://404damned.nl",
  logo: "https://404damned.nl/icon.svg",
  image: "https://404damned.nl/opengraph-image",
  telephone: "+31-20-000-0000",
  email: "hello@404damned.nl",
  priceRange: "€€€€",
  foundingDate: "2017",
  slogan: "We don't build websites. We build digital weapons.",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Keizersgracht 123",
    addressLocality: "Amsterdam",
    postalCode: "1015 CJ",
    addressRegion: "North Holland",
    addressCountry: "NL",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: 52.3676,
    longitude: 4.8852,
  },
  areaServed: [
    { "@type": "Country", name: "Netherlands" },
    { "@type": "City", name: "Amsterdam" },
  ],
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "09:00",
      closes: "18:00",
    },
  ],
  sameAs: [
    "https://www.linkedin.com/company/404damned",
    "https://www.instagram.com/404damned",
    "https://twitter.com/404damned",
  ],
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Digital Services",
    itemListElement: [
      "Web Development",
      "E-commerce Development",
      "Magento Development",
      "WordPress Development",
      "Next.js Applications",
      "AI Automation",
      "Social Media Management",
      "Branding",
      "SEO",
    ].map((s) => ({
      "@type": "Offer",
      itemOffered: { "@type": "Service", name: s },
    })),
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${dmSans.variable} ${spaceGrotesk.variable} ${jetbrainsMono.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </head>
      <body className="bg-black text-white antialiased overflow-x-hidden">
        <SmoothScrollProvider>
          <CustomCursor />
          <LightningStrike />
          {children}
        </SmoothScrollProvider>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
