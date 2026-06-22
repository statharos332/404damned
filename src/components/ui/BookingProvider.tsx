"use client";

import { createContext, useContext, useState, useCallback } from "react";
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

  const openBooking = useCallback(() => {
    setEverOpened(true);
    setOpen(true);
  }, []);
  const closeBooking = useCallback(() => setOpen(false), []);

  return (
    <BookingContext.Provider value={{ openBooking }}>
      {children}
      {everOpened && <BookingModal open={open} onClose={closeBooking} />}
    </BookingContext.Provider>
  );
}

export function useBooking() {
  return useContext(BookingContext);
}
