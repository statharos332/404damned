"use client";

import { createContext, useContext, useState, useCallback, useRef } from "react";
import dynamic from "next/dynamic";

const BookingModal = dynamic(
  () => import("./BookingModal").then((m) => m.BookingModal),
  { ssr: false }
);

const BookingContext = createContext<{ openBooking: () => void }>({
  openBooking: () => {},
});

/**
 * Wrap the app once; call useBooking().openBooking() from any button.
 * BookingModal (framer-motion, calendar UI) only loads once it's actually
 * opened, instead of being part of every page's initial JS bundle.
 */
export function BookingProvider({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  const [everOpened, setEverOpened] = useState(false);
  // Whatever had focus when "Book a call" was clicked — there's no single
  // Dialog.Trigger (buttons live in Nav, mobile menu, CTAs, etc.), so Radix
  // can't infer it on its own. We capture it here and hand it to the modal
  // to refocus on close.
  const triggerRef = useRef<HTMLElement | null>(null);

  const openBooking = useCallback(() => {
    triggerRef.current = document.activeElement as HTMLElement | null;
    setEverOpened(true);
    setOpen(true);
  }, []);
  const closeBooking = useCallback(() => setOpen(false), []);

  return (
    <BookingContext.Provider value={{ openBooking }}>
      {children}
      {everOpened && (
        <BookingModal open={open} onClose={closeBooking} triggerRef={triggerRef} />
      )}
    </BookingContext.Provider>
  );
}

export function useBooking() {
  return useContext(BookingContext);
}
