import { notFound } from "next/navigation";

// Matches every URL that doesn't resolve to a real page (typos, dead links,
// removed pages). Next.js only auto-renders a nested not-found.tsx when
// notFound() is called explicitly — without this catch-all, unmatched paths
// silently fall through to the framework's plain default 404 instead of the
// branded one at [locale]/not-found.tsx.
export default function CatchAll() {
  notFound();
}
