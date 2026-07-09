import type { Metadata } from "next";
import { LegalPage } from "@/components/layout/LegalPage";
import { legalDocs } from "@/data/legal";

const doc = legalDocs["privacy-policy"];

export const metadata: Metadata = {
  title: doc.metaTitle,
  description: doc.metaDescription,
  alternates: { canonical: `/${doc.slug}` },
  openGraph: {
    title: `${doc.metaTitle} | 404 DAMNED`,
    description: doc.metaDescription,
    url: `https://www.404damned.com/${doc.slug}`,
  },
};

export default function PrivacyPolicyPage() {
  return <LegalPage doc={doc} />;
}
