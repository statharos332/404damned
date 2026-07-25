/**
 * ============================================================
 *  404 DAMNED — Legal content (Dutch)
 * ============================================================
 *  Dutch mirror of legal.ts — same slugs/section ids/block
 *  structure, translated into natural, AVG-correct Dutch.
 *
 *  NOTE: These are solid, honest starting documents — not a
 *  substitute for review by Dutch/EU legal counsel before you
 *  rely on them commercially.
 * ============================================================
 */

import { COMPANY as COMPANY_EN, type LegalDoc } from "./legal";

// Company facts are locale-neutral (name/KVK/email are identical either way);
// only the handful of fields that read as English prose get a Dutch override.
export const COMPANY_NL = {
  ...COMPANY_EN,
  addressLine: "Amsterdam, Nederland",
  country: "Nederland",
  updated: "10 juli 2026",
};

/* ------------------------------------------------------------------ */
/*  PRIVACYBELEID                                                      */
/* ------------------------------------------------------------------ */

const privacy: LegalDoc = {
  slug: "privacy-policy",
  kicker: "[ Privacybeleid ]",
  title: "Hoe wij omgaan met",
  titleAccent: "jouw gegevens.",
  intro:
    "Dit beleid legt uit welke persoonsgegevens 404 DAMNED verzamelt, waarom we dat doen, hoe we ze gebruiken, en welke rechten je hebt onder de Algemene Verordening Gegevensbescherming (AVG). We houden gegevensverzameling tot het minimum dat nodig is om deze studio te runnen.",
  metaTitle: "Privacybeleid",
  metaDescription:
    "Hoe 404 DAMNED, een digital bureau uit Amsterdam, jouw persoonsgegevens verzamelt, gebruikt en beschermt onder de AVG — plus je rechten en hoe je die kunt uitoefenen.",
  sections: [
    {
      id: "controller",
      heading: "1. Wie wij zijn",
      blocks: [
        {
          type: "p",
          text: `${COMPANY_NL.name} is de verwerkingsverantwoordelijke voor jouw persoonsgegevens. Wij zijn een digital bureau gevestigd in Amsterdam, Nederland, ingeschreven bij de Kamer van Koophandel (KVK) onder nummer ${COMPANY_NL.kvk}.`,
        },
        {
          type: "p",
          text: `Voor privacyvragen, of om je rechten uit te oefenen, kun je contact met ons opnemen via ${COMPANY_NL.email}. Wij zijn gevestigd in ${COMPANY_NL.addressLine}.`,
        },
      ],
    },
    {
      id: "what",
      heading: "2. Welke gegevens we verzamelen",
      blocks: [
        {
          type: "p",
          text: "Wij verzamelen alleen gegevens die je ons zelf geeft, of die strikt noodzakelijk zijn om de website te laten werken. Specifiek gaat het om:",
        },
        {
          type: "list",
          items: [
            "Contactgegevens die je zelf invult — naam, e-mailadres, bedrijfsnaam en alles wat je schrijft in het contactformulier of ons per e-mail stuurt.",
            "Projectinformatie — de dienst, het budget en de briefing die je deelt zodat we op je aanvraag kunnen reageren.",
            "Technische en gebruiksgegevens — geanonimiseerde, geaggregeerde analytics zoals bekeken pagina's en performance-metrics. Wij gebruiken dit niet om je persoonlijk te identificeren.",
            "Communicatiegegevens — de e-mails en berichten die we uitwisselen tijdens het scopen of opleveren van werk.",
          ],
        },
        {
          type: "p",
          text: "Wij verzamelen niet bewust gevoelige categorieën gegevens (zoals gezondheid, religie of politieke voorkeur), en we verzamelen geen gegevens van kinderen.",
        },
      ],
    },
    {
      id: "why",
      heading: "3. Waarom we het gebruiken en onze grondslag",
      blocks: [
        {
          type: "p",
          text: "Onder de AVG moeten we voor elk gebruik van jouw gegevens een rechtmatige grondslag hebben. Onze grondslagen zijn:",
        },
        {
          type: "list",
          items: [
            "Om te reageren op je aanvraag en offertes te verstrekken — gerechtvaardigd belang en het nemen van stappen om op jouw verzoek een overeenkomst aan te gaan.",
            "Om de afgesproken diensten te leveren — uitvoering van een overeenkomst.",
            "Om projectupdates, facturen en essentiële servicemeldingen te versturen — uitvoering van een overeenkomst en gerechtvaardigd belang.",
            "Om de website veilig te houden en te verbeteren via anonieme analytics — gerechtvaardigd belang.",
            "Om te voldoen aan wettelijke, fiscale en administratieve verplichtingen — wettelijke verplichting.",
            "Om marketing te versturen (alleen als je je hiervoor aanmeldt) — toestemming, die je op elk moment kunt intrekken.",
          ],
        },
      ],
    },
    {
      id: "sharing",
      heading: "4. Met wie we gegevens delen",
      blocks: [
        {
          type: "p",
          text: "Wij verkopen jouw gegevens nooit. We delen ze alleen met vertrouwde verwerkers die ons helpen de studio te runnen, en alleen voor zover nodig:",
        },
        {
          type: "list",
          items: [
            "Hosting & infrastructuur — Vercel Inc., dat deze website host en privacyvriendelijke, geaggregeerde analytics levert.",
            "E-mail — Google Workspace, dat we gebruiken om jouw aanvragen te ontvangen en te beantwoorden.",
            "Betaal- & boekhoudpartijen — om facturen op te stellen en te verwerken wanneer je klant wordt.",
          ],
        },
        {
          type: "p",
          text: "Elke partij is gebonden aan een verwerkersovereenkomst. Verwerkt een partij gegevens buiten de Europese Economische Ruimte, dan wordt die overdracht beschermd door passende waarborgen zoals de EU Standard Contractual Clauses.",
        },
      ],
    },
    {
      id: "retention",
      heading: "5. Hoe lang we gegevens bewaren",
      blocks: [
        {
          type: "p",
          text: "Wij bewaren persoonsgegevens niet langer dan nodig. Aanvragen die niet tot een project leiden, worden binnen 24 maanden verwijderd. Klant- en financiële gegevens bewaren we de zeven jaar die de Nederlandse belastingwet voorschrijft, waarna ze veilig worden verwijderd.",
        },
      ],
    },
    {
      id: "rights",
      heading: "6. Jouw rechten",
      blocks: [
        {
          type: "p",
          text: "Onder de AVG heb je recht op:",
        },
        {
          type: "list",
          items: [
            "Inzage — een kopie ontvangen van de persoonsgegevens die we over je hebben.",
            "Rectificatie — onjuiste of onvolledige gegevens laten corrigeren.",
            "Verwijdering — ons vragen je gegevens te wissen ('het recht op vergetelheid').",
            "Beperking & bezwaar — het gebruik van je gegevens laten beperken of hiertegen bezwaar maken.",
            "Overdraagbaarheid — je gegevens ontvangen in een overdraagbaar formaat.",
            "Toestemming intrekken — op elk moment, waar we op toestemming steunen.",
          ],
        },
        {
          type: "p",
          text: `Om een van deze rechten uit te oefenen, e-mail je naar ${COMPANY_NL.email}. Wij reageren binnen één maand. Denk je dat we niet zorgvuldig met je gegevens zijn omgegaan, dan kun je ook een klacht indienen bij de Autoriteit Persoonsgegevens via autoriteitpersoonsgegevens.nl.`,
        },
      ],
    },
    {
      id: "security",
      heading: "7. Hoe we gegevens beschermen",
      blocks: [
        {
          type: "p",
          text: "Wij gebruiken encryptie tijdens verzending (HTTPS), betrouwbare infrastructuurpartijen, toegangscontroles en het principe van minimale toegangsrechten. Geen enkel systeem is perfect beveiligd, maar we nemen redelijke, in de branche gebruikelijke maatregelen om je gegevens te beschermen, en informeren jou en de relevante toezichthouder over elk datalek dat je rechten raakt, zoals wettelijk vereist.",
        },
      ],
    },
    {
      id: "changes",
      heading: "8. Wijzigingen in dit beleid",
      blocks: [
        {
          type: "p",
          text: "We kunnen dit beleid bijwerken naarmate onze werkwijze of de wetgeving verandert. De datum bovenaan geeft de laatste herziening weer. Ingrijpende wijzigingen maken we duidelijk zichtbaar op deze pagina.",
        },
      ],
    },
  ],
};

/* ------------------------------------------------------------------ */
/*  ALGEMENE VOORWAARDEN                                               */
/* ------------------------------------------------------------------ */

const terms: LegalDoc = {
  slug: "terms-of-service",
  kicker: "[ Algemene Voorwaarden ]",
  title: "De voorwaarden van",
  titleAccent: "onze samenwerking.",
  intro:
    "Deze voorwaarden regelen jouw gebruik van deze website en de diensten die 404 DAMNED levert. Door de site te gebruiken of ons in te schakelen, ga je hiermee akkoord. Specifieke projecten worden daarnaast geregeld door een aparte, schriftelijke offerte of overeenkomst, die voorrang heeft wanneer die conflicteert met deze voorwaarden.",
  metaTitle: "Algemene Voorwaarden",
  metaDescription:
    "De voorwaarden die het gebruik regelen van de 404 DAMNED-website en de diensten van ons digital bureau — scope, betaling, intellectueel eigendom, aansprakelijkheid en toepasselijk recht.",
  sections: [
    {
      id: "agreement",
      heading: "1. Deze voorwaarden",
      blocks: [
        {
          type: "p",
          text: `Deze website wordt beheerd door ${COMPANY_NL.name} (KVK ${COMPANY_NL.kvk}), Amsterdam, Nederland. Door de site te bezoeken of onze diensten af te nemen, ga je akkoord met deze voorwaarden. Ga je hier niet mee akkoord, gebruik de site dan niet.`,
        },
      ],
    },
    {
      id: "services",
      heading: "2. Onze diensten",
      blocks: [
        {
          type: "p",
          text: "Wij leveren digitale diensten, waaronder webontwikkeling, e-commerce, AI-automatisering, branding, SEO en aanverwant werk. De precieze scope, opleveringen, planning en prijs voor elke opdracht staan in een schriftelijke offerte, statement of work of overeenkomst die we samen afspreken. Alles op deze website — inclusief indicatieve prijzen — dient uitsluitend ter informatie en vormt geen bindend aanbod.",
        },
      ],
    },
    {
      id: "proposals",
      heading: "3. Offertes & betaling",
      blocks: [
        {
          type: "list",
          items: [
            "Offertes zijn 30 dagen geldig, tenzij anders vermeld.",
            "Tenzij anders overeengekomen, starten projecten na acceptatie en betaling van de afgesproken aanbetaling.",
            "Facturen dienen binnen 14 dagen na factuurdatum te worden voldaan.",
            "Alle prijzen zijn exclusief btw, tenzij anders vermeld.",
            "Te late betaling kan leiden tot het opschorten van werkzaamheden en het in rekening brengen van wettelijke rente en redelijke incassokosten.",
          ],
        },
      ],
    },
    {
      id: "client",
      heading: "4. Jouw verantwoordelijkheden",
      blocks: [
        {
          type: "p",
          text: "Om op tijd en binnen budget op te leveren, vertrouwen wij erop dat jij content, feedback, akkoorden en toegang tijdig aanlevert, en dat al het materiaal dat je aanlevert klopt en je daar de rechten op hebt. Vertraging in het aanleveren van wat wij nodig hebben kan invloed hebben op planning en kosten.",
        },
      ],
    },
    {
      id: "ip",
      heading: "5. Intellectueel eigendom",
      blocks: [
        {
          type: "p",
          text: "Na volledige betaling van alle verschuldigde bedragen voor een project gaat de eigendom van de eindopleveringen die specifiek voor jou zijn gemaakt over op jou, met uitzondering van: assets van derden (fonts, plugins, libraries, stockmateriaal) die onder hun eigen licenties blijven vallen; en onze reeds bestaande tools, frameworks en kennis, die wij behouden en mogen hergebruiken.",
        },
        {
          type: "p",
          text: "Tenzij je ons schriftelijk vraagt dit niet te doen, mogen wij afgerond werk tonen in ons portfolio en onze marketing. Alle content, code en design op deze website zelf blijven ons eigendom en mogen niet zonder toestemming worden gekopieerd.",
        },
      ],
    },
    {
      id: "warranty",
      heading: "6. Garanties & aansprakelijkheid",
      blocks: [
        {
          type: "p",
          text: "Wij leveren onze diensten met professionele zorg en vakkundigheid. Daarbuiten worden de website en de inhoud ervan 'as is' aangeboden, zonder verdere garanties. Voor zover maximaal toegestaan door de wet is onze totale aansprakelijkheid uit een opdracht beperkt tot de vergoeding die je voor die opdracht hebt betaald, en zijn wij niet aansprakelijk voor indirecte schade of gevolgschade zoals gederfde winst of dataverlies. Niets in deze voorwaarden beperkt aansprakelijkheid die onder Nederlands recht niet beperkt mag worden.",
        },
      ],
    },
    {
      id: "termination",
      heading: "7. Beëindiging",
      blocks: [
        {
          type: "p",
          text: "Elke partij kan een opdracht schriftelijk beëindigen als de andere partij deze voorwaarden of de projectovereenkomst wezenlijk schendt en dit niet binnen 14 dagen na kennisgeving herstelt. Bij beëindiging betaal je voor al het uitgevoerde werk en de tot dan toe gemaakte kosten.",
        },
      ],
    },
    {
      id: "law",
      heading: "8. Toepasselijk recht",
      blocks: [
        {
          type: "p",
          text: "Op deze voorwaarden is Nederlands recht van toepassing. Geschillen die we niet in der minne kunnen oplossen, worden voorgelegd aan de bevoegde rechter in Amsterdam.",
        },
        {
          type: "p",
          text: `Vragen over deze voorwaarden? Mail ons via ${COMPANY_NL.email}.`,
        },
      ],
    },
  ],
};

/* ------------------------------------------------------------------ */
/*  COOKIEBELEID                                                       */
/* ------------------------------------------------------------------ */

const cookies: LegalDoc = {
  slug: "cookie-policy",
  kicker: "[ Cookiebeleid ]",
  title: "Cookies, tot",
  titleAccent: "een minimum beperkt.",
  intro:
    "Wij bouwden deze site om snel en privacyvriendelijk te zijn, dus gebruiken we zo min mogelijk cookies en trackers. Deze pagina legt uit wat we wél gebruiken en hoe je dat kunt beheren.",
  metaTitle: "Cookiebeleid",
  metaDescription:
    "Welke cookies en vergelijkbare technologieën 404 DAMNED gebruikt op zijn website, waarom, en hoe je ze kunt beheren. Wij houden tracking tot een strikt minimum.",
  sections: [
    {
      id: "what",
      heading: "1. Wat cookies zijn",
      blocks: [
        {
          type: "p",
          text: "Cookies zijn kleine tekstbestanden die een website op jouw apparaat opslaat. Ze worden veel gebruikt om sites te laten werken, voorkeuren te onthouden en te begrijpen hoe een site wordt gebruikt. Vergelijkbare technologieën zoals local storage doen soortgelijke dingen.",
        },
      ],
    },
    {
      id: "use",
      heading: "2. Wat wij gebruiken",
      blocks: [
        {
          type: "p",
          text: "Wij gebruiken geen advertentiecookies en verkopen geen gegevens aan adverteerders. We gebruiken alleen:",
        },
        {
          type: "list",
          items: [
            "Essentiële opslag — nodig om de site te laten functioneren en veilig te houden. Deze volgen je niet en vereisen geen toestemming.",
            "Privacyvriendelijke analytics — Vercel Analytics en Speed Insights, die verkeer en performance op een geaggregeerde, geanonimiseerde manier meten om ons te helpen de site te verbeteren. Ze zijn ontworpen om te werken zonder individuele bezoekers te identificeren.",
          ],
        },
        {
          type: "p",
          text: "Wij gebruiken geen marketingpixels van derden (zoals Meta of Google Ads) op deze website.",
        },
      ],
    },
    {
      id: "control",
      heading: "3. Hoe je cookies kunt beheren",
      blocks: [
        {
          type: "p",
          text: "Je kunt cookies op elk moment blokkeren of verwijderen via je browserinstellingen — de meeste browsers laten je cookies weigeren of waarschuwen je wanneer er een wordt geplaatst. Het blokkeren van essentiële opslag kan ervoor zorgen dat onderdelen van de site niet correct werken.",
        },
        {
          type: "p",
          text: "Je kunt ook 'Do Not Track' of een globale privacyinstelling in je browser inschakelen; wij respecteren deze signalen waar technisch mogelijk.",
        },
      ],
    },
    {
      id: "more",
      heading: "4. Meer informatie",
      blocks: [
        {
          type: "p",
          text: `Voor hoe we in bredere zin omgaan met persoonsgegevens, zie ons Privacybeleid. Vragen over cookies kun je sturen naar ${COMPANY_NL.email}.`,
        },
      ],
    },
  ],
};

export const legalDocsNl: Record<LegalDoc["slug"], LegalDoc> = {
  "privacy-policy": privacy,
  "terms-of-service": terms,
  "cookie-policy": cookies,
};
