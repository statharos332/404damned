import {
  Code2,
  ShoppingCart,
  Bot,
  PenTool,
  Search,
  Share2,
  type LucideIcon,
} from "lucide-react";

/** Maps a service slug (src/data/services.ts) to its badge icon. */
export const serviceIcons: Record<string, LucideIcon> = {
  "web-development": Code2,
  ecommerce: ShoppingCart,
  "ai-automation": Bot,
  branding: PenTool,
  seo: Search,
  "social-media": Share2,
};
