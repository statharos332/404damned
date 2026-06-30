"use client";

import { useState, useMemo, useEffect } from "react";
import { AnimatePresence, m } from "framer-motion";

/**
 * Custom "book a call" modal — brutalist take on a Cal.com-style picker.
 * Step 1: pick a date (calendar) + time slot.
 * Step 2: enter name/email/note → submit.
 * Submits to /api/contact (reuses the existing email pipeline) with a
 * [CALL BOOKING] subject, or you can wire it to Cal.com later (see notes).
 */

const SLOTS = ["09:00", "10:00", "11:00", "13:00", "14:00", "15:00", "16:00", "17:00"];
const DAYS = ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"];
const MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

export function BookingModal({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const today = useMemo(() => {
    const d = new Date();
    d.setHours(0, 0, 0, 0);
    return d;
  }, []);

  const [view, setView] = useState(() => new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [slot, setSlot] = useState<string | null>(null);
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [form, setForm] = useState({ name: "", email: "", note: "" });
  const [sending, setSending] = useState(false);
  const [error, setError] = useState("");

  // lock body scroll while open
  useEffect(() => {
    if (open) {
      const prev = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = prev;
      };
    }
  }, [open]);

  // close on Escape
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  // reset when closed
  useEffect(() => {
    if (!open) {
      setTimeout(() => {
        setStep(1);
        setSelectedDate(null);
        setSlot(null);
        setForm({ name: "", email: "", note: "" });
        setError("");
      }, 300);
    }
  }, [open]);

  const year = view.getFullYear();
  const month = view.getMonth();
  const firstDay = new Date(year, month, 1);
  // Monday-first offset
  const startOffset = (firstDay.getDay() + 6) % 7;
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const cells: (Date | null)[] = [];
  for (let i = 0; i < startOffset; i++) cells.push(null);
  for (let d = 1; d <= daysInMonth; d++) cells.push(new Date(year, month, d));

  const sameDay = (a: Date, b: Date) =>
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate();

  const isPast = (d: Date) => d < today;
  const isWeekend = (d: Date) => d.getDay() === 0 || d.getDay() === 6;

  const canPrev = new Date(year, month, 1) > today;

  const submit = async () => {
    setError("");
    if (!form.name.trim() || !form.email.trim()) {
      setError("Name and email are required.");
      return;
    }
    setSending(true);
    try {
      const when =
        selectedDate &&
        `${selectedDate.toLocaleDateString("en-GB", {
          weekday: "long",
          day: "numeric",
          month: "long",
        })} at ${slot}`;
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          message: `[CALL BOOKING] Requested slot: ${when}.\n\n${form.note}`,
          service: "Call booking",
          budget: "—",
          company: "—",
          website: "", // honeypot
        }),
      });
      if (!res.ok) throw new Error("failed");
      setStep(3);
    } catch {
      setError("Something went wrong. Please try again or email us directly.");
    } finally {
      setSending(false);
    }
  };

  return (
    <AnimatePresence>
      {open && (
        <m.div
          className="fixed inset-0 z-[10000] flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {/* backdrop */}
          <div
            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            onClick={onClose}
          />

          {/* modal */}
          <m.div
            className="relative w-full max-w-3xl bg-[#070708] border border-white/15 max-h-[90vh] overflow-y-auto"
            initial={{ scale: 0.94, y: 20, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 0.96, y: 10, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* grid texture top */}
            <div className="absolute inset-0 bg-grid opacity-30 pointer-events-none" />

            {/* header */}
            <div className="relative flex items-center justify-between p-6 border-b border-white/10">
              <div>
                <p className="font-mono text-[0.65rem] uppercase tracking-[0.3em] text-[#00E5FF]">
                  [ schedule ]
                </p>
                <h3 className="font-display font-black uppercase text-2xl text-white tracking-tight mt-1">
                  Book a call
                </h3>
              </div>
              <button
                onClick={onClose}
                aria-label="Close"
                className="font-mono text-2xl text-gray-500 hover:text-[#D6001C] transition-colors w-10 h-10 flex items-center justify-center border border-white/10 hover:border-[#D6001C]"
              >
                ×
              </button>
            </div>

            <div className="relative p-6">
              {step === 1 && (
                <div className="grid md:grid-cols-2 gap-8">
                  {/* calendar */}
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <span className="font-bold text-white">
                        {MONTHS[month]} {year}
                      </span>
                      <div className="flex gap-2">
                        <button
                          disabled={!canPrev}
                          onClick={() => setView(new Date(year, month - 1, 1))}
                          className="w-8 h-8 border border-white/15 text-white disabled:opacity-30 hover:border-[#00E5FF] hover:text-[#00E5FF] transition-colors font-mono"
                        >
                          ‹
                        </button>
                        <button
                          onClick={() => setView(new Date(year, month + 1, 1))}
                          className="w-8 h-8 border border-white/15 text-white hover:border-[#00E5FF] hover:text-[#00E5FF] transition-colors font-mono"
                        >
                          ›
                        </button>
                      </div>
                    </div>
                    <div className="grid grid-cols-7 gap-1 mb-2">
                      {DAYS.map((d) => (
                        <div
                          key={d}
                          className="text-center font-mono text-[0.6rem] uppercase text-gray-600 py-1"
                        >
                          {d}
                        </div>
                      ))}
                    </div>
                    <div className="grid grid-cols-7 gap-1">
                      {cells.map((date, i) => {
                        if (!date) return <div key={i} />;
                        const disabled = isPast(date) || isWeekend(date);
                        const selected = selectedDate && sameDay(date, selectedDate);
                        return (
                          <button
                            key={i}
                            disabled={disabled}
                            onClick={() => {
                              setSelectedDate(date);
                              setSlot(null);
                            }}
                            className={`aspect-square text-sm font-mono transition-all ${
                              selected
                                ? "bg-[#D6001C] text-white"
                                : disabled
                                ? "text-gray-700 cursor-not-allowed"
                                : "text-gray-300 hover:bg-white/10 hover:text-white border border-transparent hover:border-white/20"
                            }`}
                          >
                            {date.getDate()}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* time slots */}
                  <div>
                    <p className="font-mono text-xs uppercase tracking-widest text-gray-500 mb-4">
                      {selectedDate
                        ? selectedDate.toLocaleDateString("en-GB", {
                            weekday: "long",
                            day: "numeric",
                            month: "long",
                          })
                        : "Select a date first"}
                    </p>
                    <div className="grid grid-cols-2 gap-2">
                      {SLOTS.map((s) => (
                        <button
                          key={s}
                          disabled={!selectedDate}
                          onClick={() => setSlot(s)}
                          className={`py-3 font-mono text-sm border transition-all ${
                            slot === s
                              ? "border-[#00E5FF] text-[#00E5FF] bg-[#00E5FF]/10"
                              : "border-white/15 text-gray-300 hover:border-white/40 disabled:opacity-30 disabled:cursor-not-allowed"
                          }`}
                        >
                          {s}
                        </button>
                      ))}
                    </div>
                    <p className="mt-4 font-mono text-[0.6rem] text-gray-600">
                      // CET · Amsterdam · 30 min
                    </p>
                    <button
                      disabled={!selectedDate || !slot}
                      onClick={() => setStep(2)}
                      className="mt-6 w-full bg-[#D6001C] hover:bg-[#FF1A35] disabled:opacity-30 disabled:cursor-not-allowed text-white py-4 font-bold tracking-[0.2em] uppercase text-xs transition-all"
                    >
                      Continue →
                    </button>
                  </div>
                </div>
              )}

              {step === 2 && (
                <div className="max-w-md mx-auto">
                  <button
                    onClick={() => setStep(1)}
                    className="font-mono text-xs text-gray-500 hover:text-white mb-6"
                  >
                    ‹ back
                  </button>
                  <p className="font-mono text-xs text-[#00E5FF] mb-6">
                    {selectedDate?.toLocaleDateString("en-GB", {
                      weekday: "long",
                      day: "numeric",
                      month: "long",
                    })}{" "}
                    · {slot} CET
                  </p>
                  <div className="space-y-4">
                    <input
                      type="text"
                      placeholder="Your name"
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      className="w-full bg-transparent border border-white/15 focus:border-[#00E5FF] text-white px-4 py-3 font-mono text-sm outline-none transition-colors"
                    />
                    <input
                      type="email"
                      placeholder="Your email"
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      className="w-full bg-transparent border border-white/15 focus:border-[#00E5FF] text-white px-4 py-3 font-mono text-sm outline-none transition-colors"
                    />
                    <textarea
                      placeholder="What do you want to talk about? (optional)"
                      rows={3}
                      value={form.note}
                      onChange={(e) => setForm({ ...form, note: e.target.value })}
                      className="w-full bg-transparent border border-white/15 focus:border-[#00E5FF] text-white px-4 py-3 font-mono text-sm outline-none transition-colors resize-none"
                    />
                    {error && (
                      <p className="text-[#D6001C] font-mono text-xs">{error}</p>
                    )}
                    <button
                      onClick={submit}
                      disabled={sending}
                      className="w-full bg-[#D6001C] hover:bg-[#FF1A35] disabled:opacity-50 text-white py-4 font-bold tracking-[0.2em] uppercase text-xs transition-all"
                    >
                      {sending ? "Sending…" : "Confirm booking →"}
                    </button>
                  </div>
                </div>
              )}

              {step === 3 && (
                <div className="text-center py-12">
                  <div className="text-5xl mb-6">⚡</div>
                  <h4 className="font-display font-black uppercase text-3xl text-white tracking-tight">
                    Locked in.
                  </h4>
                  <p className="mt-4 text-gray-400 max-w-sm mx-auto">
                    We got your request for{" "}
                    <span className="text-white">
                      {selectedDate?.toLocaleDateString("en-GB", {
                        weekday: "long",
                        day: "numeric",
                        month: "long",
                      })}{" "}
                      at {slot}
                    </span>
                    . We&apos;ll confirm by email shortly.
                  </p>
                  <button
                    onClick={onClose}
                    className="mt-8 border border-white/20 hover:border-[#00E5FF] hover:text-[#00E5FF] text-white px-8 py-3 font-mono text-xs uppercase tracking-widest transition-all"
                  >
                    Close
                  </button>
                </div>
              )}
            </div>
          </m.div>
        </m.div>
      )}
    </AnimatePresence>
  );
}
