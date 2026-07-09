/**
 * ============================================================
 *  404 DAMNED — Legal content (GDPR-oriented, NL/EU)
 * ============================================================
 *  Plain-language legal pages for an Amsterdam digital agency.
 *  Company facts live in one place (COMPANY) so the pages stay
 *  consistent with the footer / structured data in layout.tsx.
 *
 *  NOTE: These are solid, honest starting documents — not a
 *  substitute for review by Dutch/EU legal counsel before you
 *  rely on them commercially.
 * ============================================================
 */

export const COMPANY = {
  name: "404 DAMNED",
  legalName: "404 DAMNED",
  kvk: "42082502",
  email: "info@404damned.com",
  phone: "+31 6 47625711",
  addressLine: "Amsterdam, Netherlands",
  country: "Netherlands",
  website: "https://www.404damned.com",
  // The date the docs were last reviewed — keep in sync when you edit.
  updated: "10 July 2026",
} as const;

export type LegalBlock =
  | { type: "p"; text: string }
  | { type: "sub"; text: string }
  | { type: "list"; items: string[] };

export interface LegalSection {
  id: string;
  heading: string;
  blocks: LegalBlock[];
}

export interface LegalDoc {
  slug: "privacy-policy" | "terms-of-service" | "cookie-policy";
  kicker: string;
  title: string;
  titleAccent: string;
  intro: string;
  metaTitle: string;
  metaDescription: string;
  sections: LegalSection[];
}

/* ------------------------------------------------------------------ */
/*  PRIVACY POLICY                                                     */
/* ------------------------------------------------------------------ */

const privacy: LegalDoc = {
  slug: "privacy-policy",
  kicker: "[ Privacy Policy ]",
  title: "How we handle",
  titleAccent: "your data.",
  intro:
    "This policy explains what personal data 404 DAMNED collects, why we collect it, how we use it, and the rights you have under the EU General Data Protection Regulation (GDPR). We keep data collection to the minimum we need to run this studio.",
  metaTitle: "Privacy Policy",
  metaDescription:
    "How 404 DAMNED, an Amsterdam digital agency, collects, uses and protects your personal data under the GDPR — plus your rights and how to exercise them.",
  sections: [
    {
      id: "controller",
      heading: "1. Who we are",
      blocks: [
        {
          type: "p",
          text: `${COMPANY.name} is the data controller responsible for your personal data. We are a digital agency based in Amsterdam, the Netherlands, registered with the Dutch Chamber of Commerce (KVK) under number ${COMPANY.kvk}.`,
        },
        {
          type: "p",
          text: `For any privacy question, or to exercise your rights, contact us at ${COMPANY.email}. We are based in ${COMPANY.addressLine}.`,
        },
      ],
    },
    {
      id: "what",
      heading: "2. What data we collect",
      blocks: [
        {
          type: "p",
          text: "We only collect data you give us or that is strictly needed to operate the website. Specifically:",
        },
        {
          type: "list",
          items: [
            "Contact details you submit — name, email address, company name and anything you write in the contact form or send us by email.",
            "Project information — the service, budget range and brief you share so we can respond to your enquiry.",
            "Technical and usage data — anonymised, aggregated analytics such as pages viewed and performance metrics. We do not use this to identify you personally.",
            "Communication records — the emails and messages we exchange while scoping or delivering work.",
          ],
        },
        {
          type: "p",
          text: "We do not knowingly collect sensitive categories of data (such as health, religion or political views), and we do not collect data from children.",
        },
      ],
    },
    {
      id: "why",
      heading: "3. Why we use it and our legal basis",
      blocks: [
        {
          type: "p",
          text: "Under the GDPR we must have a lawful basis for every use of your data. Ours are:",
        },
        {
          type: "list",
          items: [
            "To respond to your enquiry and provide quotes — legitimate interest and taking steps to enter into a contract at your request.",
            "To deliver the services we agree — performance of a contract.",
            "To send project updates, invoices and essential service messages — performance of a contract and legitimate interest.",
            "To keep the website secure and improve it via anonymous analytics — legitimate interest.",
            "To meet legal, tax and accounting obligations — legal obligation.",
            "To send marketing (only if you opt in) — consent, which you can withdraw at any time.",
          ],
        },
      ],
    },
    {
      id: "sharing",
      heading: "4. Who we share it with",
      blocks: [
        {
          type: "p",
          text: "We never sell your data. We share it only with trusted processors who help us run the studio, and only to the extent needed:",
        },
        {
          type: "list",
          items: [
            "Hosting & infrastructure — Vercel Inc., which hosts this website and provides privacy-friendly, aggregated analytics.",
            "Email — Google Workspace, which we use to receive and reply to your enquiries.",
            "Payment & accounting providers — to issue and process invoices where you become a client.",
          ],
        },
        {
          type: "p",
          text: "Each provider is bound by a data-processing agreement. Where a provider processes data outside the European Economic Area, that transfer is protected by appropriate safeguards such as the EU Standard Contractual Clauses.",
        },
      ],
    },
    {
      id: "retention",
      heading: "5. How long we keep it",
      blocks: [
        {
          type: "p",
          text: "We keep personal data only as long as we need it. Enquiries that don't turn into projects are deleted within 24 months. Client and financial records are kept for the seven years required by Dutch tax law, after which they are securely deleted.",
        },
      ],
    },
    {
      id: "rights",
      heading: "6. Your rights",
      blocks: [
        {
          type: "p",
          text: "Under the GDPR you have the right to:",
        },
        {
          type: "list",
          items: [
            "Access — get a copy of the personal data we hold about you.",
            "Rectification — have inaccurate or incomplete data corrected.",
            "Erasure — ask us to delete your data (‘the right to be forgotten’).",
            "Restriction & objection — limit or object to how we use your data.",
            "Portability — receive your data in a portable format.",
            "Withdraw consent — at any time, where we rely on consent.",
          ],
        },
        {
          type: "p",
          text: `To exercise any of these, email us at ${COMPANY.email}. We respond within one month. If you believe we've mishandled your data, you can also lodge a complaint with the Dutch Data Protection Authority (Autoriteit Persoonsgegevens) at autoriteitpersoonsgegevens.nl.`,
        },
      ],
    },
    {
      id: "security",
      heading: "7. How we protect it",
      blocks: [
        {
          type: "p",
          text: "We use encryption in transit (HTTPS), reputable infrastructure providers, access controls and the principle of least privilege. No system is perfectly secure, but we take reasonable, industry-standard measures to protect your data and will notify you and the relevant authority of any breach that affects your rights, as required by law.",
        },
      ],
    },
    {
      id: "changes",
      heading: "8. Changes to this policy",
      blocks: [
        {
          type: "p",
          text: "We may update this policy as our practices or the law evolve. The date at the top reflects the latest revision. Material changes will be made clear on this page.",
        },
      ],
    },
  ],
};

/* ------------------------------------------------------------------ */
/*  TERMS OF SERVICE                                                   */
/* ------------------------------------------------------------------ */

const terms: LegalDoc = {
  slug: "terms-of-service",
  kicker: "[ Terms of Service ]",
  title: "The terms of",
  titleAccent: "working together.",
  intro:
    "These terms govern your use of this website and the services 404 DAMNED provides. By using the site or engaging us, you agree to them. Specific projects are also governed by a separate written proposal or contract, which takes precedence where it conflicts with these terms.",
  metaTitle: "Terms of Service",
  metaDescription:
    "The terms that govern use of the 404 DAMNED website and the digital agency services we provide — scope, payment, intellectual property, liability and governing law.",
  sections: [
    {
      id: "agreement",
      heading: "1. These terms",
      blocks: [
        {
          type: "p",
          text: `This website is operated by ${COMPANY.name} (KVK ${COMPANY.kvk}), Amsterdam, the Netherlands. By accessing the site or commissioning our services you agree to these terms. If you don't agree, please don't use the site.`,
        },
      ],
    },
    {
      id: "services",
      heading: "2. Our services",
      blocks: [
        {
          type: "p",
          text: "We provide digital services including web development, e-commerce, AI automation, branding, SEO and related work. The exact scope, deliverables, timeline and price for any engagement are set out in a written proposal, statement of work or contract agreed between us. Anything on this website — including indicative pricing — is for information only and does not constitute a binding offer.",
        },
      ],
    },
    {
      id: "proposals",
      heading: "3. Proposals & payment",
      blocks: [
        {
          type: "list",
          items: [
            "Proposals are valid for 30 days unless stated otherwise.",
            "Unless agreed otherwise, projects begin after acceptance and payment of the agreed deposit.",
            "Invoices are due within 14 days of the invoice date.",
            "All prices are exclusive of VAT (BTW) unless stated otherwise.",
            "Late payment may result in work being paused and statutory interest and reasonable collection costs being charged.",
          ],
        },
      ],
    },
    {
      id: "client",
      heading: "4. Your responsibilities",
      blocks: [
        {
          type: "p",
          text: "To deliver on time and on budget, we rely on you to provide content, feedback, approvals and access promptly, and to ensure any material you supply is accurate and that you have the rights to use it. Delays in providing what we need may affect timelines and cost.",
        },
      ],
    },
    {
      id: "ip",
      heading: "5. Intellectual property",
      blocks: [
        {
          type: "p",
          text: "On full payment of all sums due for a project, ownership of the final deliverables created specifically for you transfers to you, except for: third-party assets (fonts, plugins, libraries, stock media) which remain under their own licences; and our pre-existing tools, frameworks and know-how, which we retain and may reuse.",
        },
        {
          type: "p",
          text: "Unless you ask us in writing not to, we may show finished work in our portfolio and marketing. All content, code and design on this website itself remains our property and may not be copied without permission.",
        },
      ],
    },
    {
      id: "warranty",
      heading: "6. Warranties & liability",
      blocks: [
        {
          type: "p",
          text: "We deliver our services with professional care and skill. Beyond that, the website and its content are provided ‘as is’ without further warranties. To the fullest extent permitted by law, our total liability arising from any engagement is limited to the fees you paid for that engagement, and we are not liable for indirect or consequential losses such as lost profits or data. Nothing in these terms limits liability that cannot be limited under Dutch law.",
        },
      ],
    },
    {
      id: "termination",
      heading: "7. Termination",
      blocks: [
        {
          type: "p",
          text: "Either party may end an engagement in writing if the other materially breaches these terms or the project contract and fails to fix it within 14 days of notice. On termination you pay for all work completed and costs committed up to that date.",
        },
      ],
    },
    {
      id: "law",
      heading: "8. Governing law",
      blocks: [
        {
          type: "p",
          text: `These terms are governed by the law of the ${COMPANY.country}. Any dispute we can't resolve amicably will be submitted to the competent court in Amsterdam.`,
        },
        {
          type: "p",
          text: `Questions about these terms? Email us at ${COMPANY.email}.`,
        },
      ],
    },
  ],
};

/* ------------------------------------------------------------------ */
/*  COOKIE POLICY                                                      */
/* ------------------------------------------------------------------ */

const cookies: LegalDoc = {
  slug: "cookie-policy",
  kicker: "[ Cookie Policy ]",
  title: "Cookies, kept",
  titleAccent: "to a minimum.",
  intro:
    "We built this site to be fast and privacy-friendly, so we use as few cookies and trackers as possible. This page explains what we do use and how you can control it.",
  metaTitle: "Cookie Policy",
  metaDescription:
    "What cookies and similar technologies 404 DAMNED uses on its website, why, and how you can control them. We keep tracking to the strict minimum.",
  sections: [
    {
      id: "what",
      heading: "1. What cookies are",
      blocks: [
        {
          type: "p",
          text: "Cookies are small text files a website stores on your device. They're widely used to make sites work, remember preferences, and understand how a site is used. Similar technologies like local storage do comparable things.",
        },
      ],
    },
    {
      id: "use",
      heading: "2. What we use",
      blocks: [
        {
          type: "p",
          text: "We do not run advertising cookies or sell data to advertisers. We use only:",
        },
        {
          type: "list",
          items: [
            "Essential storage — needed for the site to function and stay secure. These don't track you and don't require consent.",
            "Privacy-friendly analytics — Vercel Analytics and Speed Insights, which measure traffic and performance in an aggregated, anonymised way to help us improve the site. They are designed to work without identifying individual visitors.",
          ],
        },
        {
          type: "p",
          text: "We do not use third-party marketing pixels (such as Meta or Google Ads) on this website.",
        },
      ],
    },
    {
      id: "control",
      heading: "3. How to control cookies",
      blocks: [
        {
          type: "p",
          text: "You can block or delete cookies at any time through your browser settings — most browsers let you refuse cookies or alert you when one is set. Blocking essential storage may stop parts of the site working correctly.",
        },
        {
          type: "p",
          text: "You can also enable ‘Do Not Track’ or a global privacy control in your browser; we respect these signals where technically feasible.",
        },
      ],
    },
    {
      id: "more",
      heading: "4. More information",
      blocks: [
        {
          type: "p",
          text: `For how we handle personal data more broadly, see our Privacy Policy. Any questions about cookies can go to ${COMPANY.email}.`,
        },
      ],
    },
  ],
};

export const legalDocs: Record<LegalDoc["slug"], LegalDoc> = {
  "privacy-policy": privacy,
  "terms-of-service": terms,
  "cookie-policy": cookies,
};
