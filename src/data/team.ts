/**
 * ============================================================
 *  404 DAMNED — Team (single source of truth)
 * ============================================================
 *  Real people, real LinkedIn profiles. This backs the /about page
 *  and the Person JSON-LD in layout.tsx — the studio's main
 *  E-E-A-T signal (Google + visitors both want to know who's
 *  actually behind the work).
 *
 *  photo is optional — drop a real photo at /public/team/<slug>.jpg
 *  (any aspect, will be cropped square) and set the path here.
 *  Until then the card falls back to an initials badge.
 * ============================================================
 */

export interface TeamMember {
  slug: string;
  name: string;
  role: string;
  bio: string;
  linkedin: string;
  photo?: string; // /team/<slug>.jpg
}

export const team: TeamMember[] = [
  {
    slug: "nick-grigoriadis",
    name: "Nick Grigoriadis",
    role: "Founder — Management & Project Management",
    bio: "Nick runs the studio end to end — client relationships, project delivery and the business side of 404 DAMNED. His background is in company management and project management, with a career built on getting teams to actually ship. That's where the studio's discipline around timelines and delivery comes from.",
    linkedin: "https://www.linkedin.com/in/nick-grigoriadis-082094365/",
  },
  {
    slug: "stathis-papounidis",
    name: "Stathis Papounidis",
    role: "Developer & Designer",
    bio: "Stathis designs and builds what you see and click. His background is web development and e-commerce, shipping projects for agencies and large clients for years before co-founding 404 DAMNED — which is the reason the studio builds everything custom instead of reaching for a template.",
    linkedin: "https://www.linkedin.com/in/stathis-papounidis-132b91129/",
  },
  {
    slug: "tatiana-petsiou",
    name: "Tatiana Petsiou",
    role: "Web Developer & Digital Marketing",
    bio: "Tatiana works across web development and digital marketing — e-commerce builds, newsletter marketing, and custom WooCommerce projects built on template systems like ACF. She's the one making sure a site keeps performing after launch, not just on the day it ships.",
    linkedin: "https://www.linkedin.com/in/tatiana-petsiou-723756148/",
  },
];

export function getTeamMember(slug: string): TeamMember | undefined {
  return team.find((t) => t.slug === slug);
}
