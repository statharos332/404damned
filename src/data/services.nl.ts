/**
 * ============================================================
 *  404 DAMNED — Service landing pages (Dutch)
 * ============================================================
 *  Dutch mirror of services.ts — same slugs/order/stack/related,
 *  translated (not literal) copy targeting Dutch search intent.
 *  Keep in sync whenever services.ts changes.
 * ============================================================
 */

import type { Service } from "./services";

export const servicesNl: Service[] = [
  {
    slug: "web-development",
    name: "Webontwikkeling",
    h1: "Webontwikkeling in Amsterdam",
    tagline: "Snelle, custom websites en webapps gebouwd om te converteren.",
    metaTitle: "Webontwikkeling Amsterdam — Custom Next.js Websites",
    metaDescription:
      "Premium webontwikkeling in Amsterdam. Wij bouwen snelle, custom Next.js-websites en webapps, ontworpen voor conversie, snelheid en vindbaarheid. Plan een strategiegesprek.",
    keywords: [
      "website laten bouwen Amsterdam",
      "webontwikkelaar Amsterdam",
      "Next.js ontwikkeling Nederland",
      "maatwerk website Amsterdam",
      "webontwikkeling bureau Amsterdam",
    ],
    intro:
      "Stathis bouwt al voor het web — voor bureaus, voor grote klanten, voor zichzelf — sinds lang voordat 404 DAMNED bestond. Elke site die wij opleveren komt uit die achtergrond voort: custom gecodeerd in Next.js en React, afgesteld tot hij in minder dan een seconde laadt, en zo gestructureerd dat Google hem daadwerkelijk kan lezen in plaats van moet gokken.",
    sections: [
      {
        heading: "Snelheid beslist meer dan waar de meeste mensen budget voor vrijmaken",
        body: "Een landingspagina die drie seconden laadt, verliest een aanzienlijk deel van de bezoekers nog voordat ze een woord hebben gelezen. Wij bouwen vanaf de eerste commit voor een LCP onder de 1,5 seconde en vrijwel geen layout shift, want snelheid achteraf repareren kost altijd meer dan hem er vanaf dag één in bouwen.",
      },
      {
        heading: "Geen thema dat kunstmatig wordt opgerekt tot jouw merk",
        body: "Elke build begint bij een leeg bestand in React en Next.js. Dat duurt langer dan een thema installeren en de kleuren omzetten, maar het betekent dat de site precies zo snel en onderscheidend is als jouw bedrijf nodig heeft — en dat de code schoon genoeg blijft om over twee jaar, door jouw team of het onze, uit te breiden zonder alles opnieuw te bouwen.",
      },
      {
        heading: "Gebouwd zodat Google het begrijpt, niet alleen mensen",
        body: "Semantische markup, server-side rendering, structured data en een schone URL-structuur worden niet achteraf toegevoegd — ze horen bij dezelfde build. Een site die zoekmachines makkelijk kunnen uitlezen, is niet toevallig ook een site die makkelijker te onderhouden blijft naarmate je groeit.",
      },
    ],
    deliverables: [
      "Custom UI/UX-ontwerp & bouw",
      "Next.js / React-applicatie",
      "Headless CMS-integratie",
      "Core Web Vitals & snelheidsoptimalisatie",
      "Technische SEO-basis",
      "Analytics & conversietracking",
      "Doorlopende support & doorontwikkeling",
    ],
    stack: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Headless CMS", "Vercel"],
    faqs: [
      {
        q: "Wat kost een website in Amsterdam?",
        a: "Een custom marketingsite begint doorgaans rond de €5.000; grotere webapps en platforms lopen daarna op afhankelijk van de scope. Wij maken een offerte na een kort gesprek, zodra we echt weten wat je nodig hebt — geen vast pakket dat de factuur oprekt.",
      },
      {
        q: "Hoe lang duurt het om een website te bouwen?",
        a: "De meeste custom builds gaan binnen 4 tot 8 weken live. De belangrijkste variabelen zijn de scope en hoe snel content en feedback vanuit jouw kant terugkomen — we leggen de planning vast in de offerte en houden ons daaraan.",
      },
      {
        q: "Werken jullie met WordPress of custom code?",
        a: "Custom, in Next.js en React — daar komen de snelheid en controle vandaan. Heeft een project echt een CMS nodig, dan koppelen we een snelle headless oplossing zodat jouw team content kan aanpassen zonder de code aan te raken.",
      },
      {
        q: "Gaat mijn website ook echt scoren in Google?",
        a: "De build zelf is snel, crawlbaar en gestructureerd opgeleverd — dat is de basis die nodig is om te kunnen ranken. Of hij daadwerkelijk gaat scoren hangt ook af van content en backlinks over tijd, waar we apart bij kunnen helpen.",
      },
    ],
    related: ["ecommerce", "seo", "ai-automation"],
  },

  {
    slug: "ecommerce",
    name: "E-commerce",
    h1: "E-commerce ontwikkeling in Amsterdam",
    tagline: "Sterk converterende webshops op Shopify, Magento & headless.",
    metaTitle: "E-commerce ontwikkeling Amsterdam — Shopify & Magento",
    metaDescription:
      "E-commerce ontwikkeling in Amsterdam. Sterk converterende webshops op Shopify, Magento en headless commerce, gebouwd voor snelheid, schaal en omzet. Plan een gesprek.",
    keywords: [
      "webshop laten bouwen Amsterdam",
      "Magento bureau Nederland",
      "Shopify bureau Amsterdam",
      "headless commerce Nederland",
      "webshop ontwikkeling Amsterdam",
    ],
    intro:
      "Tatiana en Stathis bouwen samen al jaren webshops op Shopify, Magento en WooCommerce — van kleine catalogi tot complexe B2B-prijsstructuren. Welk platform ook bij jouw fase past, de build draait om één getal: de conversieratio, niet hoe de demo eruitzag in een pitch.",
    sections: [
      {
        heading: "Het juiste platform voor jouw fase",
        body: "Shopify brengt je snel live. Magento (Adobe Commerce) kan complexe catalogi en B2B-prijsregels aan waar Shopify op vastloopt. Een headless build is zinvol wanneer performance en ontwerpvrijheid zwaarder wegen dan lanceersnelheid. Wij vertellen je welk platform bij jouw bedrijf past, ook als dat niet het platform is dat voor ons het makkelijkst te bouwen is.",
      },
      {
        heading: "Conversie is het hele punt",
        body: "Een webshop is een machine die verkeer omzet in bestellingen, en de meeste lekken zijn saai: een checkout met één stap te veel, productpagina's die traag laden, een mobiele ervaring die duidelijk een bijzaak was. Daar beginnen wij, want daar zit het echte geld.",
      },
      {
        heading: "Migraties zonder drama",
        body: "Het vertrekken bij een trage, verouderde webshop is het moment waarop veel sites hun ranking van de ene op de andere dag verliezen. Wij mappen elke oude URL naar de nieuwe, nemen structured data en metadata mee, en migreren catalogi en klanten zorgvuldig genoeg zodat je de SEO-waarde behoudt die je al hebt opgebouwd.",
      },
    ],
    deliverables: [
      "Webshopontwerp & custom build",
      "Shopify / Magento / headless inrichting",
      "Checkout- & conversieoptimalisatie",
      "Platformmigratie",
      "Betaal- & verzendintegraties",
      "Snelheid & Core Web Vitals-afstelling",
      "Analytics & tracking-inrichting",
    ],
    stack: ["Shopify", "Magento / Adobe Commerce", "Next.js", "Headless commerce", "Stripe", "Vercel"],
    faqs: [
      {
        q: "Wat is beter, Shopify of Magento?",
        a: "Shopify wint op lanceersnelheid en eenvoud. Magento (Adobe Commerce) wint zodra je catalogus, prijsregels of B2B-eisen complex worden. We matchen het platform aan jouw catalogus en team tijdens een gesprek, niet ervoor.",
      },
      {
        q: "Kunnen jullie mijn bestaande webshop migreren zonder ranking te verliezen?",
        a: "Ja — dat is het grootste risico van een migratie, en ook het grootste deel van het werk. Oude URL's worden gemapt naar nieuwe, structured data en metadata gaan mee, en content wordt zorgvuldig genoeg overgezet zodat je SEO-waarde niet terugvalt naar nul.",
      },
      {
        q: "Bouwen jullie headless e-commerce?",
        a: "Zeker. Een custom Next.js-front-end bovenop Shopify of een commerce-backend levert de snelst mogelijke webshop op, zonder ontwerpplafond. De extra engineering is het waard wanneer snelheid en een onderscheidende storefront voor jou een echt concurrentievoordeel zijn.",
      },
      {
        q: "Hoe verhogen jullie de conversieratio?",
        a: "Door frictie weg te nemen, in deze volgorde: paginasnelheid, lengte van de checkout, duidelijkheid van productpagina's, mobiele UX, vertrouwenssignalen. Daarna meten we tegen echte analytics in plaats van te gokken wat de volgende stap is.",
      },
    ],
    related: ["web-development", "seo", "branding"],
  },

  {
    slug: "ai-automation",
    name: "AI-automatisering",
    h1: "AI-automatisering voor bedrijven in Amsterdam",
    tagline: "Custom AI-systemen die het repetitieve werk van je overnemen.",
    metaTitle: "AI-automatisering Amsterdam — Custom AI-systemen voor bedrijven",
    metaDescription:
      "AI-automatisering in Amsterdam. Wij bouwen custom AI-systemen en workflows die repetitief werk wegnemen, kosten verlagen en jouw operatie laten schalen. Plan een strategiegesprek.",
    keywords: [
      "AI-automatisering Amsterdam",
      "AI-automatisering bureau Nederland",
      "AI voor bedrijven Amsterdam",
      "workflow automatisering Nederland",
      "maatwerk AI-oplossingen Amsterdam",
    ],
    intro:
      "De meeste 'AI-automatisering'-pitches blijken uiteindelijk een chatbot te zijn die ergens op een website is geplakt. Wat wij bouwen zit juist verweven in je echte workflows — de inbox, de CRM, het spreadsheet waar je tegenop ziet — en doet het schrijven, sorteren, beantwoorden en samenvatten dat stiekem uren van je week opeet.",
    sections: [
      {
        heading: "Automatiseer het werk dat je week opeet",
        body: "Leadafhandeling, content-concepten, data-invoer, supporttriage, terugkerende rapportages — dit zijn de taken die de tijd van een team opslurpen zonder dat er veel echt oordeelsvermogen bij nodig is. Wij brengen in kaart waar je week daadwerkelijk naartoe gaat, en bouwen systemen voor de delen die geen mens met de hand hoeft te doen.",
      },
      {
        heading: "Verweven met je bestaande tools",
        body: "Een automatisering die los naast je werkproces staat, wordt niet gebruikt. Wij koppelen rechtstreeks aan je CRM, inbox, spreadsheets en webshop, zodat het systeem binnen je bestaande proces werkt in plaats van dat je een nieuw proces moet aanleren.",
      },
      {
        heading: "Op maat, gemeten, en van jou",
        body: "Wij bouwen naar jouw workflow, niet naar een sjabloon, en meten het resultaat dat ertoe doet — bespaarde uren, verlaagde kosten, opgeleverde output — zodat direct duidelijk is of het systeem zijn plek heeft verdiend. Jij bent eigenaar van wat we bouwen; wij hebben het alleen gebouwd.",
      },
    ],
    deliverables: [
      "Workflow-audit & kansenkaart",
      "Custom AI-automatiseringsbuild",
      "LLM- & API-integraties",
      "CRM- / inbox- / tooling-koppelingen",
      "Content-generatiesystemen",
      "Testen, monitoring & overdracht",
    ],
    stack: ["OpenAI / Claude", "Next.js", "Node.js", "Vercel", "Automation APIs", "Vector search"],
    faqs: [
      {
        q: "Wat kan AI-automatisering daadwerkelijk voor mijn bedrijf doen?",
        a: "Alles wat repetitief is en regel- of taalgebaseerd: content opstellen, leads kwalificeren, routinevragen beantwoorden, documenten samenvatten, data tussen tools verplaatsen. Wij beginnen met in kaart brengen waar je de meeste tijd verliest, en bouwen daar als eerste voor.",
      },
      {
        q: "Is dit gewoon een chatbot?",
        a: "Nee — een chatbot is één kleine use case tussen vele. Het meeste dat wij bouwen heeft helemaal geen interface: het draait binnen een workflow, voert de taak van begin tot eind uit, en je team hoeft er niet meer over na te denken.",
      },
      {
        q: "Werkt het samen met de tools die we al gebruiken?",
        a: "Ja, via hun API's — je CRM, e-mail, spreadsheets, webshop, interne systemen. De automatisering wordt gebouwd om bij jouw proces te passen, niet andersom.",
      },
      {
        q: "Hoe weten we dat het de moeite waard is?",
        a: "Elke automatisering wordt vooraf afgebakend rond een meetbaar resultaat — bespaarde uren of verlaagde kosten — en we beginnen met de taak met het hoogste rendement, zodat je het snel ziet werken in plaats van het op vertrouwen aan te moeten nemen.",
      },
    ],
    related: ["web-development", "ecommerce", "seo"],
  },

  {
    slug: "branding",
    name: "Branding",
    h1: "Branding & identiteit in Amsterdam",
    tagline: "Scherpe, onderscheidende merken die niet op de rest lijken.",
    metaTitle: "Branding Amsterdam — Merkidentiteit & designbureau",
    metaDescription:
      "Branding en identiteitsontwerp in Amsterdam. Wij bouwen onderscheidende merken — strategie, logo, visueel systeem en tone-of-voice — die aandacht afdwingen en premium prijzen rechtvaardigen.",
    keywords: [
      "branding Amsterdam",
      "merkidentiteit Amsterdam",
      "brandingbureau Nederland",
      "logo laten ontwerpen Amsterdam",
      "visuele identiteit Nederland",
    ],
    intro:
      "De meeste merken lijken op hun concurrenten met een ander logo erop geplakt. Wij beginnen met positionering — voor wie je er werkelijk bent, waar je tegen ingaat — voordat er ook maar één visual wordt gemaakt, zodat de identiteit die eruit rolt met niemand anders te verwarren is.",
    sections: [
      {
        heading: "Strategie vóór decoratie",
        body: "Een merk is een keuze over voor wie je er bent en voor wie niet, gemaakt voordat het moodboard wordt geopend. Sla die stap over en je eindigt met een logo dat er leuk uitziet en niets zegt. Wij beginnen met positionering, zodat elke visuele keuze daarna een reden heeft.",
      },
      {
        heading: "Een compleet visueel systeem",
        body: "Logo, typografie, kleur, motion, beeldtaal, en de regels die alles samenhouden op een website, een deck, een advertentie en een visitekaartje. Je krijgt een systeem, niet één logobestand en een schouderophaal over hoe je het verder moet toepassen.",
      },
      {
        heading: "Een stem die klinkt als jij",
        body: "De woorden doen er net zoveel toe als de visuals. Wij schrijven de tone-of-voice en boodschap die jouw positionering doorvertaalt naar elke kop, zodat het merk zichzelf blijft — op je homepage of in de inbox van een klant.",
      },
    ],
    deliverables: [
      "Merkstrategie & positionering",
      "Logo- & wordmark-ontwerp",
      "Volledig visueel identiteitssysteem",
      "Typografie & kleursysteem",
      "Brand guidelines",
      "Boodschap & tone-of-voice",
      "Lanceermateriaal",
    ],
    stack: ["Merkstrategie", "Identiteitsontwerp", "Designsystemen", "Art direction", "Motion", "Copywriting"],
    faqs: [
      {
        q: "Wat zit er in een brandingtraject?",
        a: "Meestal positionering en strategie, een logo en volledige visuele identiteit — typografie, kleur, beeldtaal — brand guidelines, en boodschap. Een startup-lancering en een rebrand vragen om andere dingen, dus we bakenen het af op jouw fase in plaats van een vast pakket te verkopen.",
      },
      {
        q: "Wat is het verschil tussen branding en een logo?",
        a: "Een logo is één asset. Een merk is het hele systeem: hoe je gepositioneerd bent, hoe je eruitziet en klinkt overal waar je verschijnt. Het logo is wat mensen als eerste zien; de strategie eronder is wat het geheel laat samenhangen.",
      },
      {
        q: "Ontwerpen jullie het merk en de website samen?",
        a: "Vaak, en dat is de sterkere combinatie. Wanneer hetzelfde team de identiteit en de site bouwt, komt het merk online volledig tot zijn recht in plaats van te verwateren ergens in de overdracht tussen twee bureaus.",
      },
    ],
    related: ["web-development", "social-media", "ecommerce"],
  },

  {
    slug: "seo",
    name: "SEO",
    h1: "SEO-diensten in Amsterdam",
    tagline: "Technische, eerlijke SEO die zich opstapelt tot echt verkeer.",
    metaTitle: "SEO Amsterdam — Technische SEO & groeibureau",
    metaDescription:
      "SEO-diensten in Amsterdam. Technische SEO, content en zoekstrategie die zich opstapelen tot rankings en gekwalificeerd verkeer — zonder trucjes, zonder keyword stuffing.",
    keywords: [
      "SEO Amsterdam",
      "SEO bureau Amsterdam",
      "SEO diensten Nederland",
      "technische SEO Amsterdam",
      "zoekmachineoptimalisatie Nederland",
    ],
    intro:
      "SEO is meestal weinig glamoureus: technisch repareren wat kapot is, content schrijven die daadwerkelijk antwoord geeft op wat mensen zoeken, en het soort links verdienen waar het langer over duurt dan wie dan ook wil horen. Dat vertellen we liever vooraf dan je een shortcut te verkopen die niet bestaat.",
    sections: [
      {
        heading: "Technisch fundament eerst",
        body: "De rest werkt niet als de site traag is of zoekmachines hem niet goed kunnen crawlen. Wij repareren eerst Core Web Vitals, indexeringsproblemen, structured data en site-architectuur, want dat is de bodem waarop al het andere wordt gebouwd.",
      },
      {
        heading: "Content die echte zoekopdrachten beantwoordt",
        body: "Wij richten ons op de exacte zoekopdrachten die jouw klanten intypen en bouwen pagina's die daar daadwerkelijk antwoord op geven — geen pagina's volgestopt met het keyword en opgerekt tot een woordenaantal. Dunne content wordt inmiddels door Google's eigen systemen weggefilterd; substantie overleeft.",
      },
      {
        heading: "Gemeten, niet mystiek",
        body: "Impressies, posities en clicks, bijgehouden in Search Console en helder gerapporteerd. Geen vanity metrics, geen 'vertrouw op het proces' — gewoon wat beweegt, wat niet, en wat we daar vervolgens aan doen.",
      },
    ],
    deliverables: [
      "Technische SEO-audit & reparaties",
      "Core Web Vitals-optimalisatie",
      "Keyword- & zoekstrategie",
      "On-page optimalisatie",
      "Structured data / schema",
      "AI-crawler zichtbaarheid (llms.txt) voor WordPress-sites",
      "Contentstrategie & landingspagina's",
      "Search Console-rapportage",
    ],
    stack: ["Technische SEO", "Search Console", "Schema.org", "Contentstrategie", "Core Web Vitals", "Analytics"],
    faqs: [
      {
        q: "Hoe lang duurt het voordat SEO werkt?",
        a: "Technische reparaties kunnen binnen weken zichtbaar worden. Concurrerende commerciële rankings kosten daarbovenop meestal enkele maanden consistente content en linkbuilding. Iedereen die pagina 1 binnen enkele dagen belooft, is niet eerlijk tegen je.",
      },
      {
        q: "Garanderen jullie een positie op pagina 1?",
        a: "Niemand die geloofwaardig is kan een specifieke ranking garanderen — dat bepaalt Google, niet wij. Wat we wel kunnen garanderen is het juiste werk: solide technisch fundament, oprecht nuttige content, en rapportage die je daadwerkelijk kunt inzien.",
      },
      {
        q: "Wat is het verschil tussen technische SEO en content?",
        a: "Technische SEO maakt de site snel en leesbaar voor zoekmachines. Content geeft ze iets om te ranken. Een technisch perfecte site die niets te zeggen heeft, gaat niet ranken, en geweldige content op een kapotte site ook niet — je hebt beide nodig.",
      },
      {
        q: "Wat is llms.txt en zetten jullie dat op?",
        a: "Een opkomende conventie — een schone, machine-leesbare index van je site zodat AI-systemen als ChatGPT en Perplexity die kunnen lezen in plaats van te gokken op je HTML. Voor WordPress-sites bouwen we dat automatisch, met echte AI-samenvattingen per pagina in plaats van een gok op keywords. Hoe het precies werkt, inclusief een echte bug die we live tegenkwamen tijdens het testen, staat uitgeschreven in onze inzichten.",
      },
    ],
    related: ["web-development", "ecommerce", "ai-automation"],
  },

  {
    slug: "social-media",
    name: "Social media",
    h1: "Social media management in Amsterdam",
    tagline: "Content en social die een merk bouwen, niet zomaar posts.",
    metaTitle: "Social media management Amsterdam — Content & strategie",
    metaDescription:
      "Social media management in Amsterdam. Strategie, content en beheer voor Instagram, LinkedIn en meer — een merk bouwen dat mensen daadwerkelijk volgen.",
    keywords: [
      "social media management Amsterdam",
      "social media bureau Nederland",
      "contentcreatie Amsterdam",
      "Instagram marketing Amsterdam",
      "LinkedIn marketing Nederland",
    ],
    intro:
      "Posten om het posten verspilt ieders tijd, ook die van jou. Wij behandelen social als een merkkanaal met een echte strategie erachter — geen contentkalender die alleen bestaat omdat iemand zei dat je meer moest posten.",
    sections: [
      {
        heading: "Strategie vóór je post",
        body: "Met wie je praat, waar je voor staat, hoe 'goed' eruitziet op elk platform — bepaald voordat de eerste post live gaat, zodat de content een richting heeft in plaats van achter alles aan te rennen wat die week trending is.",
      },
      {
        heading: "Content waar je voor stopt met scrollen",
        body: "Feeds belonen middelmatige content niet, ze scrollen er gewoon voorbij. Wij maken visuals, video en copy die gebouwd zijn om een stop en een save te verdienen, niet alleen om een vakje in de kalender te vullen.",
      },
      {
        heading: "Consistente uitvoering",
        body: "De accounts die winnen op social laten zich betrouwbaar zien, niet in vlagen. Wij regelen de kalender, productie en posting zodat jouw aanwezigheid scherp blijft zonder dat het je week opeet.",
      },
    ],
    deliverables: [
      "Social strategie & kanaalplan",
      "Contentcreatie (video & stills)",
      "Contentkalender & planning",
      "Community management",
      "Profiel- & bio-optimalisatie",
      "Performance-rapportage",
    ],
    stack: ["Instagram", "LinkedIn", "TikTok", "Contentproductie", "Copywriting", "Analytics"],
    faqs: [
      {
        q: "Op welke platforms moet mijn bedrijf actief zijn?",
        a: "Welke je klanten daadwerkelijk gebruiken — meestal wint één of twee goed uitgevoerd van vijf slecht uitgevoerd. Voor de meeste merken is dat Instagram plus LinkedIn of TikTok, gekozen op basis van je doelgroep, niet op wat trending is.",
      },
      {
        q: "Maken jullie de content of plannen jullie hem alleen in?",
        a: "Beide, afhankelijk van wat je nodig hebt. Wij kunnen de visuals, video en copy volledig produceren, of werken vanuit je bestaande materiaal en alleen strategie, kalender en beheer op ons nemen.",
      },
      {
        q: "Hoe meten jullie succes op social media?",
        a: "Aan de hand van resultaten die er echt toe doen voor het bedrijf — bereik, engagement, volgersgroei en, waar van toepassing, verkeer en leads. Helder gerapporteerd, niet als vanity-cijfers zonder inhoud.",
      },
    ],
    related: ["branding", "web-development", "seo"],
  },
];

export function getServiceNl(slug: string): Service | undefined {
  return servicesNl.find((s) => s.slug === slug);
}
