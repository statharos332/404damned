import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ServicePage } from "@/components/layout/ServicePage";
import { services, getService } from "@/data/services";
import { getServiceNl } from "@/data/services.nl";
import { pickLocale } from "@/lib/utils";
import { serviceHref, serviceLanguageAlternates } from "@/lib/seo";
import { routing } from "@/i18n/routing";

export function generateStaticParams() {
  return routing.locales.flatMap((locale) =>
    services.map((s) => ({ locale, slug: s.slug }))
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const service = pickLocale(getService(slug), getServiceNl(slug), locale);
  if (!service) return { title: "Services" };
  const href = serviceHref(service, locale);
  return {
    title: service.metaTitle,
    description: service.metaDescription,
    keywords: service.keywords,
    alternates: {
      canonical: href,
      languages: serviceLanguageAlternates(service),
    },
    openGraph: {
      title: `${service.metaTitle} | 404 DAMNED`,
      description: service.metaDescription,
      url: `https://www.404damned.com${href}`,
    },
  };
}

export default async function Page({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  const service = pickLocale(getService(slug), getServiceNl(slug), locale);
  if (!service) notFound();
  return <ServicePage service={service} />;
}
