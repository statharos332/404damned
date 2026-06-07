import dynamic from "next/dynamic";
import { Navigation } from "@/components/layout/Navigation";
import { HeroSection } from "@/components/sections/HeroSection";
import { MarqueeBar } from "@/components/sections/MarqueeBar";
import { ServicesSection } from "@/components/sections/ServicesSection";

/**
 * Performance strategy:
 *  - Above-the-fold (Nav, Hero, Marquee, Services) load eagerly so the
 *    first screen paints instantly.
 *  - Everything below the fold is code-split and streamed in as the user
 *    scrolls, keeping the initial JS bundle small (faster LCP/TBT).
 *  A lightweight skeleton reserves space to avoid layout shift (CLS).
 */
const sectionFallback = (
  <div className="min-h-[60vh] bg-[#050505]" aria-hidden />
);

const CaseStudiesSection = dynamic(
  () => import("@/components/sections/CaseStudiesSection").then((m) => m.CaseStudiesSection),
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
const TestimonialsSection = dynamic(
  () => import("@/components/sections/TestimonialsSection").then((m) => m.TestimonialsSection),
  { loading: () => sectionFallback }
);
const PricingSection = dynamic(
  () => import("@/components/sections/PricingSection").then((m) => m.PricingSection),
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
      <MarqueeBar />
      <ServicesSection />
      <CaseStudiesSection />
      <WhySection />
      <ProcessSection />
      {/*<TestimonialsSection />*/}
      <PricingSection />
      <ContactSection />
      <Footer />
    </main>
  );
}
