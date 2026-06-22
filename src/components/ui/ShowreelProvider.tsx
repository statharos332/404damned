"use client";

import { createContext, useContext, useState, useCallback } from "react";
import dynamic from "next/dynamic";

const ShowreelModal = dynamic(
  () => import("./ShowreelModal").then((m) => m.ShowreelModal),
  { ssr: false }
);

const ShowreelContext = createContext<{ openShowreel: () => void }>({
  openShowreel: () => {},
});

/**
 * Provides a single fullscreen showreel player for the whole app.
 * Any button (the desktop widget under the logo, or the mobile menu item)
 * calls openShowreel() to launch it WITH sound. The heavy player markup
 * (ShowreelModal, framer-motion) only loads once it's actually opened.
 */
export function ShowreelProvider({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  const [everOpened, setEverOpened] = useState(false);

  const openShowreel = useCallback(() => {
    setEverOpened(true);
    setOpen(true);
  }, []);
  const close = useCallback(() => setOpen(false), []);

  return (
    <ShowreelContext.Provider value={{ openShowreel }}>
      {children}
      {everOpened && <ShowreelModal open={open} onClose={close} />}
    </ShowreelContext.Provider>
  );
}

export function useShowreel() {
  return useContext(ShowreelContext);
}
