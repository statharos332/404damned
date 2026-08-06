/**
 * ============================================================
 *  404 DAMNED — Team (Dutch)
 * ============================================================
 *  Dutch mirror of team.ts — same slugs/order/photos, translated
 *  role + bio copy. Keep in sync whenever team.ts changes.
 * ============================================================
 */

import type { TeamMember } from "./team";

export const teamNl: TeamMember[] = [
  {
    slug: "nick-grigoriadis",
    name: "Nick Grigoriadis",
    role: "Oprichter — Bedrijfsvoering & Projectmanagement",
    bio: "Nick runt de studio van A tot Z — klantcontact, projectlevering en de zakelijke kant van 404 DAMNED. Zijn achtergrond ligt in bedrijfsvoering en projectmanagement, met een carrière die draait om teams die daadwerkelijk opleveren. Vandaar de discipline binnen de studio als het gaat om deadlines en levering.",
    linkedin: "https://www.linkedin.com/in/nick-grigoriadis-082094365/",
    photo: "/team/nick-grigoriadis.jpg",
  },
  {
    slug: "stathis-papounidis",
    name: "Stathis Papounidis",
    role: "Developer & Designer",
    bio: "Stathis ontwerpt en bouwt wat je ziet en aanklikt. Zijn achtergrond ligt in webontwikkeling en e-commerce; hij leverde jarenlang projecten voor bureaus en grote klanten voordat hij 404 DAMNED mede oprichtte — vandaar dat de studio alles op maat bouwt in plaats van een template te gebruiken.",
    linkedin: "https://www.linkedin.com/in/stathis-papounidis-132b91129/",
  },
  {
    slug: "tatiana-petsiou",
    name: "Tatiana Petsiou",
    role: "Webontwikkelaar & Digital Marketing",
    bio: "Tatiana werkt op het snijvlak van webontwikkeling en digital marketing — e-commercebouw, nieuwsbriefmarketing en custom WooCommerce-projecten op templatesystemen zoals ACF. Zij sluit binnenkort aan als derde teamlid van 404 DAMNED.",
    linkedin: "https://www.linkedin.com/in/tatiana-petsiou-723756148/",
    comingSoon: true,
  },
];

export function getTeamMemberNl(slug: string): TeamMember | undefined {
  return teamNl.find((t) => t.slug === slug);
}
