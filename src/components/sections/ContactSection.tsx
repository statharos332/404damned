"use client";

import { useState, useRef } from "react";
import { m, useInView, AnimatePresence } from "framer-motion";

const budgetOptions = [
  "€2.500 – €5.000",
  "€5.000 – €15.000",
  "€15.000 – €30.000",
  "€30.000+",
];

const serviceOptions = [
  "Web Development",
  "E-Commerce",
  "AI Automation",
  "Branding",
  "SEO",
  "Social Media",
  "Full Partnership",
];

export function ContactSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    company: "",
    service: "",
    budget: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  // honeypot — hidden field; bots fill it, humans don't
  const [website, setWebsite] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formState, website }),
      });
      const data = await res.json();
      if (!res.ok || !data.ok) {
        throw new Error(data.error || "Something went wrong. Please try again.");
      }
      setSubmitted(true);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Something went wrong. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="py-32 md:py-48 px-6 md:px-12 bg-[#080808]">
      <div className="max-w-[1400px] mx-auto" ref={ref}>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
          {/* Left — copy */}
          <div>
            <m.div
              initial={{ opacity: 0, x: -20 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              className="text-xs text-[#D6001C] tracking-[0.3em] uppercase font-mono mb-4"
            >
              — Start the War
            </m.div>
            <m.h2
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.1, duration: 0.8 }}
              className="text-5xl md:text-6xl font-black tracking-tight leading-[0.9] uppercase mb-8"
            >
              Ready to
              <br />
              <span className="text-[#D6001C]">Dominate</span>
              <br />
              Your Market?
            </m.h2>
            <m.p
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.2, duration: 0.7 }}
              className="text-gray-400 leading-relaxed mb-12 max-w-sm"
            >
              One conversation is all it takes. We&apos;ll tell you exactly what it will take to make your competitors irrelevant.
            </m.p>

            {/* Info */}
              <m.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.3, duration: 0.7 }}
                  className="space-y-6"
              >
                  {[
                      {
                          label: "Email",
                          value: "info@404damned.com",
                          href: "mailto:info@404damned.com",
                      },
                      {
                          label: "Phone",
                          value: "+31 647 62 5711",
                          href: "tel:+31647625711",
                      },
                      {
                          label: "Location",
                          value: "Amsterdam",
                      },
                      {
                          label: "Response time",
                          value: "Within 4 business hours",
                      },
                  ].map((item) => (
                      <div key={item.label} className="flex gap-4">
                          <div className="text-xs text-gray-600 tracking-wider uppercase w-28 pt-0.5">
                              {item.label}
                          </div>

                          {item.href ? (
                              <a
                                  href={item.href}
                                  className="text-white hover:text-[#D6001C] transition-colors duration-200"
                              >
                                  {item.value}
                              </a>
                          ) : (
                              <div className="text-white">{item.value}</div>
                          )}
                      </div>
                  ))}
              </m.div>
          </div>

          {/* Right — form */}
          <m.div
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2, duration: 0.8 }}
          >
            <AnimatePresence mode="wait">
              {submitted ? (
                <m.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="border border-[#D6001C]/30 bg-[#D6001C]/5 p-12 text-center h-full flex flex-col items-center justify-center gap-6 min-h-[500px]"
                >
                  <div className="w-16 h-16 rounded-full border-2 border-[#D6001C] flex items-center justify-center">
                    <svg className="w-6 h-6 text-[#D6001C]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-black">Message received.</h3>
                  <p className="text-gray-400 max-w-xs">
                    We&apos;ll review your brief and reach out within 4 business hours. Prepare for impact.
                  </p>
                </m.div>
              ) : (
                <m.form
                  key="form"
                  onSubmit={handleSubmit}
                  className="space-y-6 relative"
                >
                  {/* Name + Company */}
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs text-gray-600 tracking-wider uppercase block mb-2">Name *</label>
                      <input
                        required
                        type="text"
                        value={formState.name}
                        onChange={(e) => setFormState((p) => ({ ...p, name: e.target.value }))}
                        className="w-full bg-transparent border border-white/10 focus:border-[#D6001C]/50 outline-none px-4 py-3 text-white text-sm transition-colors duration-300 placeholder:text-gray-700"
                        placeholder="Jouw naam"
                      />
                    </div>
                    <div>
                      <label className="text-xs text-gray-600 tracking-wider uppercase block mb-2">Company</label>
                      <input
                        type="text"
                        value={formState.company}
                        onChange={(e) => setFormState((p) => ({ ...p, company: e.target.value }))}
                        className="w-full bg-transparent border border-white/10 focus:border-[#D6001C]/50 outline-none px-4 py-3 text-white text-sm transition-colors duration-300 placeholder:text-gray-700"
                        placeholder="Bedrijfsnaam"
                      />
                    </div>
                  </div>

                  {/* Email */}
                  <div>
                    <label className="text-xs text-gray-600 tracking-wider uppercase block mb-2">Email *</label>
                    <input
                      required
                      type="email"
                      value={formState.email}
                      onChange={(e) => setFormState((p) => ({ ...p, email: e.target.value }))}
                      className="w-full bg-transparent border border-white/10 focus:border-[#D6001C]/50 outline-none px-4 py-3 text-white text-sm transition-colors duration-300 placeholder:text-gray-700"
                      placeholder="jij@bedrijf.nl"
                    />
                  </div>

                  {/* Service */}
                  <div>
                    <label className="text-xs text-gray-600 tracking-wider uppercase block mb-2">Service</label>
                    <div className="flex flex-wrap gap-2">
                      {serviceOptions.map((s) => (
                        <button
                          key={s}
                          type="button"
                          onClick={() => setFormState((p) => ({ ...p, service: s }))}
                          className={`text-xs px-3 py-2 border transition-all duration-200 ${
                            formState.service === s
                              ? "border-[#D6001C] bg-[#D6001C]/10 text-[#D6001C]"
                              : "border-white/10 text-gray-500 hover:border-white/20"
                          }`}
                          data-cursor-hover
                        >
                          {s}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Budget */}
                  <div>
                    <label className="text-xs text-gray-600 tracking-wider uppercase block mb-2">Budget</label>
                    <div className="flex flex-wrap gap-2">
                      {budgetOptions.map((b) => (
                        <button
                          key={b}
                          type="button"
                          onClick={() => setFormState((p) => ({ ...p, budget: b }))}
                          className={`text-xs px-3 py-2 border transition-all duration-200 ${
                            formState.budget === b
                              ? "border-[#D6001C] bg-[#D6001C]/10 text-[#D6001C]"
                              : "border-white/10 text-gray-500 hover:border-white/20"
                          }`}
                          data-cursor-hover
                        >
                          {b}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Message */}
                  <div>
                    <label className="text-xs text-gray-600 tracking-wider uppercase block mb-2">Tell us your situation</label>
                    <textarea
                      rows={4}
                      value={formState.message}
                      onChange={(e) => setFormState((p) => ({ ...p, message: e.target.value }))}
                      className="w-full bg-transparent border border-white/10 focus:border-[#D6001C]/50 outline-none px-4 py-3 text-white text-sm transition-colors duration-300 resize-none placeholder:text-gray-700"
                      placeholder="What are you trying to achieve? What's broken? What does success look like?"
                    />
                  </div>

                  {/* Honeypot — visually hidden, off-screen. Real users never see/fill it. */}
                  <div aria-hidden="true" className="absolute -left-[9999px] top-0 w-px h-px overflow-hidden">
                    <label>
                      Website
                      <input
                        type="text"
                        tabIndex={-1}
                        autoComplete="off"
                        value={website}
                        onChange={(e) => setWebsite(e.target.value)}
                      />
                    </label>
                  </div>

                  {/* Error message */}
                  {error && (
                    <div className="border border-[#D6001C]/40 bg-[#D6001C]/10 text-[#FF6B7A] text-sm px-4 py-3">
                      {error}
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-[#D6001C] hover:bg-[#FF1A35] text-white font-bold text-sm tracking-widest uppercase py-4 transition-all duration-300 disabled:opacity-50 flex items-center justify-center gap-3"
                    data-cursor-hover
                  >
                    {loading ? (
                      <>
                        <div className="w-4 h-4 border border-white/30 border-t-white rounded-full animate-spin" />
                        Sending...
                      </>
                    ) : (
                      "Send the Brief →"
                    )}
                  </button>
                </m.form>
              )}
            </AnimatePresence>
          </m.div>
        </div>
      </div>
    </section>
  );
}
