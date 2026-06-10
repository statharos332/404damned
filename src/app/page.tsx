import dynamic from "next/dynamic";
import { Navigation } from "@/components/layout/Navigation";
import { HeroSection } from "@/components/sections/HeroSection";
import { ScrollingStrip } from "@/components/sections/ScrollingStrip";
import { ServicesSection } from "@/components/sections/ServicesSection";

/**
 * Lama-Lama-inspired party-energy homepage.
 * Above-the-fold loads eagerly; the rest is code-split for performance.
 * Scrolling strips between sections give the high-energy, in-motion feel.
 */
const sectionFallback = <div className="min-h-[50vh] bg-[#050505]" aria-hidden />;

const CaseStudiesSection = dynamic(
  () => import("@/components/sections/CaseStudiesSection").then((m) => m.CaseStudiesSection),
  { loading: () => sectionFallback }
);
const WorkPreview = dynamic(
  () => import("@/components/sections/WorkPreview").then((m) => m.WorkPreview),
  { loading: () => sectionFallback }
);
const VibeSection = dynamic(
  () => import("@/components/sections/VibeSection").then((m) => m.VibeSection),
  { loading: () => sectionFallback }
);
const WhySection = dynamic(
  () => import("@/components/sections/WhySection").then((m) => m.WhySection),
  { loading: () => sectionFallback }
);
const ProcessSection = dynamic(
  () => import("@/components/sections/ProcessSection").then((m) => m.ProcessSection),
  { loading: () => sectionFallback }
);
const ClientsStrip = dynamic(
  () => import("@/components/sections/ClientsStrip").then((m) => m.ClientsStrip),
  { loading: () => sectionFallback }
);
const PricingSection = dynamic(
  () => import("@/components/sections/PricingSection").then((m) => m.PricingSection),
  { loading: () => sectionFallback }
);
const BriefCTA = dynamic(
  () => import("@/components/sections/BriefCTA").then((m) => m.BriefCTA),
  { loading: () => sectionFallback }
);
const ContactSection = dynamic(
  () => import("@/components/sections/ContactSection").then((m) => m.ContactSection),
  { loading: () => sectionFallback }
);
const Footer = dynamic(
  () => import("@/components/layout/Footer").then((m) => m.Footer),
  { loading: () => <div className="h-64 bg-[#050505]" aria-hidden /> }
);

export default function Home() {
  return (
    <main className="relative">
      <Navigation />
      <HeroSection />

      {/* signature scrolling strip right after the hero */}
      <ScrollingStrip words={["CODE", "CREATE", "DOMINATE"]} />

      <ServicesSection />
      <CaseStudiesSection />

      <ScrollingStrip words={["NO TEMPLATES", "ONLY WEAPONS"]} reverse />

      <WorkPreview />
      <VibeSection />
      <WhySection />
      <ProcessSection />
      {/*<ClientsStrip />*/}
      <PricingSection />
      <BriefCTA />
      <ContactSection />
      <Footer />
    </main>
  );
}
