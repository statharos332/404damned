import type { Metadata } from "next";
import { LegalPage } from "@/components/layout/LegalPage";
import { legalDocs } from "@/data/legal";
import { legalDocsNl } from "@/data/legal.nl";
import { pickLocale } from "@/lib/utils";
import { localizedPath, languageAlternates } from "@/lib/seo";
import { routing } from "@/i18n/routing";

const doc = legalDocs["terms-of-service"];

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const localizedDoc = pickLocale(legalDocs["terms-of-service"], legalDocsNl["terms-of-service"], locale);
  const path = `/${doc.slug}`;
  return {
    title: localizedDoc.metaTitle,
    description: localizedDoc.metaDescription,
    alternates: {
      canonical: localizedPath(path, locale),
      languages: languageAlternates(path),
    },
    openGraph: {
      title: `${localizedDoc.metaTitle} | 404 DAMNED`,
      description: localizedDoc.metaDescription,
      url: `https://www.404damned.com${localizedPath(path, locale)}`,
    },
  };
}

export default async function TermsOfServicePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const localizedDoc = pickLocale(legalDocs["terms-of-service"], legalDocsNl["terms-of-service"], locale);
  return <LegalPage doc={localizedDoc} />;
}
