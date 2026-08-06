import type { Metadata, Viewport } from "next";
import { DM_Sans, Space_Grotesk, JetBrains_Mono } from "next/font/google";
import "@/styles/globals.css";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import { getMessages, getTranslations, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import { SmoothScrollProvider } from "@/components/layout/SmoothScrollProvider";
import { MotionProvider } from "@/components/layout/MotionProvider";
import { CustomCursor } from "@/components/ui/CustomCursor";
import { LightningStrike } from "@/components/ui/LightningStrike";
import { BookingProvider } from "@/components/ui/BookingProvider";
import { Showreel } from "@/components/ui/Showreel";
import { ShowreelProvider } from "@/components/ui/ShowreelProvider";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";

const dmSans = DM_Sans({
  subsets: ["latin", "latin-ext"],
  variable: "--font-body",
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin", "latin-ext"],
  variable: "--font-display",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin", "latin-ext"],
  variable: "--font-mono",
  display: "swap",
  // Only used in small labels/badges — don't preload-compete with the
  // display + body fonts that drive the LCP text.
  preload: false,
});

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export const viewport: Viewport = {
  themeColor: "#050505",
  width: "device-width",
  initialScale: 1,
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Metadata" });
  const isNl = locale === "nl";
  const path = isNl ? "/nl" : "/";

  return {
    metadataBase: new URL("https://www.404damned.com"),
    title: {
      default: t("title"),
      template: "%s | 404 DAMNED",
    },
    description: t("description"),
    keywords: t.raw("keywords") as string[],
    authors: [{ name: "404 DAMNED", url: "https://www.404damned.com" }],
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
      locale: isNl ? "nl_NL" : "en_US",
      alternateLocale: isNl ? "en_US" : "nl_NL",
      url: `https://www.404damned.com${path}`,
      siteName: "404 DAMNED",
      title: t("title"),
      description: t("ogDescription"),
      // og:image is generated automatically by src/app/[locale]/opengraph-image.tsx
    },
    twitter: {
      card: "summary_large_image",
      title: t("title"),
      description: t("twitterDescription"),
      // twitter image also comes from opengraph-image.tsx
    },
    alternates: {
      canonical: `https://www.404damned.com${path}`,
      languages: {
        en: "https://www.404damned.com/",
        nl: "https://www.404damned.com/nl",
        "x-default": "https://www.404damned.com/",
      },
    },
  };
}

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }
  setRequestLocale(locale);

  const messages = await getMessages();
  const t = await getTranslations({ locale, namespace: "Metadata" });
  const offerCatalog = t.raw("offerCatalog") as string[];

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "@id": "https://www.404damned.com/#organization",
    name: "404 DAMNED",
    alternateName: "404 DAMNED Digital Agency",
    description: t("orgDescription"),
    url: "https://www.404damned.com",
    logo: "https://www.404damned.com/icon.svg",
    image: "https://www.404damned.com/opengraph-image",
    telephone: "+31647625711",
    email: "info@404damned.com",
    priceRange: "€€€€",
    foundingDate: "2017",
    slogan: t("slogan"),
    founder: {
      "@type": "Person",
      "@id": "https://www.404damned.com/about#nick-grigoriadis",
      name: "Nick Grigoriadis",
    },
    employee: [
      {
        "@type": "Person",
        "@id": "https://www.404damned.com/about#nick-grigoriadis",
        name: "Nick Grigoriadis",
        jobTitle: t("founderTitle"),
      },
      {
        "@type": "Person",
        "@id": "https://www.404damned.com/about#stathis-papounidis",
        name: "Stathis Papounidis",
        jobTitle: t("developerTitle"),
      },
      // Tatiana Petsiou is joining as the third team member but isn't
      // formally on board yet — omitted from `employee` until then so
      // this structured data stays accurate. She's still shown on the
      // About page, marked as "joining soon".
    ],
    address: {
      "@type": "PostalAddress",
      addressLocality: "Amsterdam",
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
      "https://www.instagram.com/404_damned",
    ],
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Digital Services",
      itemListElement: offerCatalog.map((s) => ({
        "@type": "Offer",
        itemOffered: { "@type": "Service", name: s },
      })),
    },
  };

  // Site-level identity — links every page back to the organization so Google
  // understands the whole domain belongs to one brand (helps sitelinks/knowledge).
  const websiteData = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": "https://www.404damned.com/#website",
    url: "https://www.404damned.com",
    name: "404 DAMNED",
    description: t("siteDescription"),
    inLanguage: locale,
    publisher: { "@id": "https://www.404damned.com/#organization" },
  };

  return (
    <html lang={locale} className={`${dmSans.variable} ${spaceGrotesk.variable} ${jetbrainsMono.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteData) }}
        />
      </head>
      <body className="bg-black text-white antialiased overflow-x-hidden">
        <NextIntlClientProvider messages={messages}>
          <SmoothScrollProvider>
            <MotionProvider>
              <CustomCursor />
              <LightningStrike />
              <BookingProvider>
                <ShowreelProvider>
                  {children}
                  <Showreel />
                </ShowreelProvider>
              </BookingProvider>
            </MotionProvider>
          </SmoothScrollProvider>
        </NextIntlClientProvider>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
