import Link from "next/link";
import { Navigation } from "@/components/layout/Navigation";
import { Footer } from "@/components/layout/Footer";

/**
 * Branded 404 — the signature moment for a studio literally called
 * "404 DAMNED". Framer-free (pure CSS glitch) so it stays instant.
 */
export default function NotFound() {
  return (
    <main className="relative bg-[#050505] min-h-screen flex flex-col">
      <Navigation />

      <section className="flex-1 flex flex-col items-center justify-center text-center px-6 py-40">
        <p className="font-mono text-xs uppercase tracking-[0.4em] text-[#D6001C] mb-8">
          [ Error / Signal lost ]
        </p>

        <h1
          className="glitch-404 font-display font-black uppercase leading-none tracking-tighter text-[clamp(6rem,26vw,20rem)]"
          data-text="404"
        >
          404
        </h1>

        <h2 className="mt-4 font-display font-black uppercase tracking-tight text-2xl sm:text-4xl text-white">
          This page got what it{" "}
          <span className="text-[#D6001C]">deserved.</span>
        </h2>

        <p className="mt-6 max-w-md text-gray-400 leading-relaxed">
          The URL you hit doesn&apos;t exist — or it was taken out. Everything we
          build on purpose, though, is very much alive. Pick a way back in.
        </p>

        <div className="mt-10 flex flex-col sm:flex-row items-center gap-4">
          <Link
            href="/"
            className="w-full sm:w-auto text-center bg-[#D6001C] hover:bg-[#FF1A35] text-white px-8 py-4 text-xs font-bold tracking-[0.2em] uppercase transition-all hover:-translate-y-0.5"
          >
            Back to Base &rarr;
          </Link>
          <Link
            href="/work"
            className="w-full sm:w-auto text-center border border-white/15 hover:border-white/40 text-white px-8 py-4 text-xs font-bold tracking-[0.2em] uppercase transition-colors"
          >
            See the Work
          </Link>
        </div>

        <div className="mt-12 flex flex-wrap justify-center gap-x-6 gap-y-2 font-mono text-xs uppercase tracking-widest">
          {[
            { label: "Insights", href: "/insights" },
            { label: "Services", href: "/#services" },
            { label: "Contact", href: "/#contact" },
          ].map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="text-gray-500 hover:text-[#D6001C] transition-colors"
            >
              {l.label}
            </Link>
          ))}
        </div>
      </section>

      <Footer />
    </main>
  );
}
