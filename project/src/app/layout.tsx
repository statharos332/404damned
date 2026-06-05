import type { Metadata, Viewport } from "next";
import { DM_Sans, Space_Grotesk } from "next/font/google";
import "@/styles/globals.css";
import { SmoothScrollProvider } from "@/components/layout/SmoothScrollProvider";
import { CustomCursor } from "@/components/ui/CustomCursor";

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
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "404 DAMNED — Premium Digital Agency Amsterdam",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "404 DAMNED — Premium Digital Agency Amsterdam",
    description: "We don't build websites. We build digital weapons.",
    images: ["/og-image.jpg"],
    creator: "@404damned",
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
  name: "404 DAMNED",
  description: "Premium digital agency in Amsterdam specialising in web development, e-commerce, AI automation and growth systems.",
  url: "https://404damned.nl",
  telephone: "+31-20-000-0000",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Keizersgracht 123",
    addressLocality: "Amsterdam",
    postalCode: "1015 CJ",
    addressCountry: "NL",
  },
  areaServed: "Netherlands",
  serviceType: [
    "Web Development",
    "E-commerce Development",
    "AI Automation",
    "SEO",
    "Branding",
    "Social Media Management",
  ],
  priceRange: "€€€€",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="nl" className={`${dmSans.variable} ${spaceGrotesk.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </head>
      <body className="bg-black text-white antialiased overflow-x-hidden">
        <SmoothScrollProvider>
          <CustomCursor />
          {children}
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
