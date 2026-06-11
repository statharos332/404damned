"use client";

import { createContext, useContext, useState, useCallback } from "react";
import { BookingModal } from "./BookingModal";

const BookingContext = createContext<{ openBooking: () => void }>({
  openBooking: () => {},
});

/** Wrap the app once; call useBooking().openBooking() from any button. */
export function BookingProvider({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  const openBooking = useCallback(() => setOpen(true), []);
  const closeBooking = useCallback(() => setOpen(false), []);

  return (
    <BookingContext.Provider value={{ openBooking }}>
      {children}
      <BookingModal open={open} onClose={closeBooking} />
    </BookingContext.Provider>
  );
}

export function useBooking() {
  return useContext(BookingContext);
}
