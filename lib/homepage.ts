import { sql } from "./db";

export interface GalleryImage {
  src: string;
  alt: string;
  label: string;
}

export interface TimelineRow {
  time: string;
  step: string;
}

export interface HoursRow {
  range: string;
  time: string;
}

export interface NavLink {
  label: string;
  href: string;
}

export interface FooterLink {
  label: string;
  href: string;
}

export interface FooterColumn {
  title: string;
  links: FooterLink[];
}

// Tour grid intro (the heading + subheading directly above the tour cards,
// right below the hero — see components/TourGrid.tsx).
export interface TourSection {
  eyebrow: string;
  heading: string;
  subheading: string;
}

// "What You See" section (the route timeline + what-you'll-notice section
// right below the tour grid).
export interface WhySection {
  eyebrow: string;
  heading: string;
  intro: string; // rich text HTML
  timelineHeading: string;
  timeline: TimelineRow[];
  learnHeading: string;
  learn: string[];
  note: string;
  // Optional third block — used here for "Where you can board".
  extraHeading: string;
  extraItems: { name: string; note: string }[];
  ctaText: string;
  ctaButtonText: string;
  ctaHref: string;
}

// "Bosphorus Highlights" trust/highlights section, right below the
// "What You See" section — see components/RiverHighlights.tsx.
export interface HighlightCard {
  icon: string; // emoji, rendered as-is
  title: string;
  body: string;
}
export interface HighlightsSection {
  eyebrow: string;
  heading: string;
  subheading: string;
  cards: HighlightCard[];
}

// "Waterfront Palaces & Mansions" (daytime-only) section.
export interface TowerSection {
  eyebrow: string;
  heading: string;
  body: string; // rich text HTML
  bullets: string[];
  ctaButtonText: string;
  ctaHref: string;
  images: GalleryImage[];
}

// "Practical Info" section (cruise schedule / boarding points / best time).
export interface PracticalSection {
  hoursHeading: string;
  hours: HoursRow[];
  hoursNote: string;
  addressHeading: string;
  address: string;
  metro: string;
  bestTimeHeading: string;
  bestTimeBody: string; // rich text HTML
}

// "Compare & Choose" price table intro.
export interface PriceSection {
  eyebrow: string;
  heading: string;
  subheading: string;
  note: string;
  // Column headers for the price-comparison table below — admin-editable
  // so a differently-shaped product (e.g. a river cruise site with
  // "Duration"/"Meal Included" instead of "Live Guide"/"Tower Access")
  // never needs a code change to relabel its own table.
  itemLabel: string;
  priceLabel: string;
  column1Label: string;
  column2Label: string;
  bestForLabel: string;
  // Label on each row's action button (kept separate from the site-wide
  // "Book Now" button text since this table's cells are narrow).
  bookLabel: string;
}

// Wrapper heading above the FAQ accordion — see components/FAQSection.tsx.
// The questions/answers themselves are separately admin-editable via
// /admin/faqs (lib/data.ts's getFaqs()).
export interface FaqSection {
  eyebrow: string;
  heading: string;
}

// Custom 404 page — see app/not-found.tsx.
export interface NotFoundSection {
  heading: string;
  body: string;
  primaryButtonText: string;
  primaryButtonHref: string;
  secondaryButtonText: string;
  secondaryButtonHref: string;
}

// Homepage "From the Blog" teaser section — see components/BlogSection.tsx.
// Distinct from the /blog listing page itself (BlogPageSection below).
export interface BlogTeaserSection {
  eyebrow: string;
  heading: string;
  subheading: string;
  viewAllText: string;
  readArticleText: string;
}

// The /blog listing page, plus the small wrapper labels shared by every
// blog article page (Back link, Quick Answer/Table of Contents labels,
// Related Guides/Articles headings, sidebar CTA) — see app/blog/page.tsx,
// app/blog/[slug]/page.tsx, components/QuickAnswer.tsx,
// components/TableOfContents.tsx, components/RelatedPosts.tsx, and
// components/BlogSidebar.tsx. The posts themselves are edited separately
// from /admin/posts.
export interface BlogPageSection {
  eyebrow: string;
  heading: string;
  subheading: string;
  emptyStateText: string;
  featuredLinkText: string;
  ctaHeading: string;
  ctaButtonText: string;
  backToGuidesText: string;
  quickAnswerLabel: string;
  tocLabel: string;
  relatedGuidesHeading: string;
  sidebarRelatedHeading: string;
  sidebarRecommendedBadge: string;
  sidebarCompareLinkText: string;
  // Label above the inline mid-article tour promo card — see
  // components/TourPromoCard.tsx (rendered via RecommendedTour.tsx).
  promoRecommendedText: string;
}

// Dark call-to-action banner at the very end of the homepage, right before
// the footer — see components/CtaBanner.tsx.
export interface CtaBannerSection {
  heading: string;
  subtext: string;
  buttonText: string;
  buttonHref: string;
}

export interface HomepageSections {
  tours: TourSection;
  highlights: HighlightsSection;
  why: WhySection;
  tower: TowerSection;
  practical: PracticalSection;
  price: PriceSection;
  ctaBanner: CtaBannerSection;
  faq: FaqSection;
  notFound: NotFoundSection;
  blogTeaser: BlogTeaserSection;
  blogPage: BlogPageSection;
}

// Site-wide navbar — edited from the Homepage admin tab for simplicity,
// but rendered on every page (see components/Header.tsx).
export interface HeaderContent {
  logoImage: string; // blank = use the bundled Logo.png asset
  logoAlt: string;
  // The two-line wordmark text shown next to (or under) the logo image —
  // see components/Logo.tsx. Shown regardless of whether logoImage is set.
  logoLine1: string;
  logoLine2: string;
  // The leading "Home" crumb every Breadcrumbs trail starts with — see
  // components/Breadcrumbs.tsx.
  homeLabel: string;
  // Shared label for every "Book Now" button site-wide (tour cards, the
  // mobile sticky bar, blog sidebar) — see components/TourCard.tsx,
  // TourPromoCard.tsx, FeaturedTour.tsx, BlogSidebar.tsx.
  bookNowText: string;
  navLinks: NavLink[];
  ctaText: string;
  ctaHref: string;
}

// Site-wide footer — same "edited from Homepage, rendered everywhere" deal.
export interface FooterContent {
  tagline: string; // rich text HTML
  columns: FooterColumn[];
  addressHeading: string;
  addressLine1: string;
  addressLine2: string;
  copyrightText: string;
}

// Site-wide brand colors — blank fields fall back to the original
// hardcoded hex values (see globals.css :root), so leaving these blank
// changes nothing. See app/layout.tsx for how these become live CSS.
export interface ThemeColors {
  primary: string; // "bosphorus-gold" — main CTA buttons
  secondary: string; // "bosphorus-navy" — accents, links
  dark: string; // "bosphorus-charcoal" — hero background
  accent: string; // "gold-400" — ratings, badges
}

export interface HomepageContent {
  heroBadge: string;
  heroHeading: string;
  heroSubheading: string;
  heroImage: string;
  heroImageAlt: string;
  heroCtaPrimaryText: string;
  heroCtaPrimaryHref: string;
  heroCtaSecondaryText: string;
  heroCtaSecondaryHref: string;
  ratingValue: string;
  ratingCount: string;
  // "Featured/Recommended Tour" widget — a compact sticky bar on mobile,
  // a richer showcase card on desktop. Which tour it promotes and its
  // copy are both editable from /admin/recommended.
  showFeaturedTour: boolean;
  featuredTourId: string;
  featuredBadgeLabel: string;
  featuredUrgencyText: string;
  featuredReasons: string[];
  // Everything below the hero — What You See, Waterfront Palaces &
  // Mansions, Practical Info, and the Price Comparison intro.
  sections: HomepageSections;
  // Site-wide navbar + footer (see interfaces above).
  header: HeaderContent;
  footer: FooterContent;
  // Site-wide brand colors.
  theme: ThemeColors;
  // On-page SEO title/description — falls back to the root layout's
  // site-wide defaults if left blank (see app/page.tsx generateMetadata).
  metaTitle: string;
  metaDescription: string;
  // Used only by the "Advanced SEO" tab's on-page checklist — not written
  // to any meta tag, just a helper so the person editing content can see
  // whether the phrase they're targeting actually shows up in the H1/
  // title/description.
  focusKeyword: string;
  // Search Engine Indexing toggle (admin-editable from /admin/indexing).
  // false (default) = indexable (index, follow). true = noindex, nofollow.
  noIndex: boolean;
  // Independent "Link Following" toggle — see lib/seo.ts's resolveRobots.
  noFollow: boolean;
  // Blank = auto-generate from SITE_URL + "/" (see lib/seo.ts resolveCanonical).
  canonicalUrl: string;
  // Open Graph / Twitter overrides — blank falls back to the page's own
  // title/description/hero image (see lib/seo.ts resolveOg).
  ogTitle: string;
  ogDescription: string;
  ogImage: string;
}

// Every default below is a byte-for-byte transcription of the copy that
// used to be hardcoded directly in Header.tsx / Footer.tsx / Hero.tsx /
// WhatYouSee.tsx / PalacesAndMansions.tsx / PracticalInfo.tsx /
// PriceComparison.tsx — moving it here and having each component render
// whatever's in the (possibly-blank) database column, falling back to
// this, means the live site looks 100% identical until someone actually
// edits a field in /admin/homepage.
export const DEFAULT_HEADER: HeaderContent = {
  logoImage: "",
  logoAlt: "Bosphorus Boat Cruise Tickets",
  logoLine1: "BOSPHORUS",
  logoLine2: "BOAT CRUISE —",
  homeLabel: "Home",
  bookNowText: "Book Tickets",
  navLinks: [
    { label: "Home", href: "/" },
    { label: "About Us", href: "/about" },
    { label: "Blog", href: "/blog" },
    { label: "Contact", href: "/contact" },
  ],
  ctaText: "BOOK TICKETS",
  ctaHref: "/#tours",
};

export const DEFAULT_FOOTER: FooterContent = {
  tagline:
    "<strong>Independent booking guide.</strong> Not affiliated with any Bosphorus cruise operator — we curate day and afternoon sightseeing cruises from licensed operators and earn a commission on bookings made through our links, at no extra cost to you.",
  columns: [
    {
      title: "Explore",
      links: [
        { label: "Bosphorus Cruises", href: "/#tours" },
        { label: "Waterfront Palaces", href: "/#palaces-mansions" },
        { label: "Cruise Prices", href: "/#prices" },
        { label: "FAQ", href: "/#faq" },
      ],
    },
    {
      title: "Company",
      links: [
        { label: "About Us", href: "/about" },
        { label: "Blog", href: "/blog" },
        { label: "Contact", href: "/contact" },
        { label: "Privacy Policy", href: "/privacy-policy" },
      ],
    },
  ],
  addressHeading: "Main Boarding Point",
  addressLine1: "Eminönü Pier",
  addressLine2: "Fatih, Istanbul, Turkey",
  copyrightText:
    "Bosphorus Boat Cruise Tickets. All prices shown in EUR and subject to change by the cruise operator.",
};

export const DEFAULT_THEME: ThemeColors = {
  primary: "#D9A441",   // Bosphorus Gold
  secondary: "#082B4C", // Bosphorus Navy
  dark: "#082B4C",      // Bosphorus Navy
  accent: "#E5BA5A",    // Soft Gold
};

export const DEFAULT_SECTIONS: HomepageSections = {
  tours: {
    eyebrow: "Bosphorus Cruises & Tickets",
    heading: "Bosphorus Sightseeing Cruise Tours & Tickets",
    subheading:
      "Four clear options — a quick short circle cruise, a full-day cruise to Anadolu Kavağı, a lunch cruise, and a Two Continents combo. Every departure runs in daylight or the afternoon, never at night.",
  },
  highlights: {
    eyebrow: "Why the Bosphorus",
    heading: "Bosphorus Highlights",
    subheading:
      "The Bosphorus isn't just a way to get between landmarks — it's a viewpoint on its own. Here's what makes the ride itself worth booking, in daylight.",
    cards: [
      {
        title: "Iconic Waterfront",
        body: "Dolmabahçe Palace, Ortaköy Mosque, and dozens of wooden yalı mansions all sit directly on the water — no other viewpoint in Istanbul strings them together in one trip.",
        icon: "🕌",
      },
      {
        title: "Two Continents, One Strait",
        body: "Every route crosses between Europe and Asia — you can watch the shoreline change character from one side of the boat to the other.",
        icon: "🌉",
      },
      {
        title: "Open-Air Decks",
        body: "Every cruise opens its upper deck so you can feel the sea air and get an unobstructed line of sight for photos in full daylight.",
        icon: "🌬️",
      },
      {
        title: "Daylight Views",
        body: "Every departure on this site runs in the morning or afternoon, so you always see the palaces, mosques, and bridges clearly lit — no night or dinner cruises here.",
        icon: "☀️",
      },
    ],
  },
  why: {
    eyebrow: "The Route",
    heading: "What You Actually See on a Bosphorus Sightseeing Cruise",
    intro:
      "Two hours, one loop, and more of Istanbul's skyline than you could comfortably reach on foot in an afternoon. Here's the Short Circle Cruise route, landmark by landmark.",
    timelineHeading: "Sample cruise route",
    timeline: [
      { time: "0:00", step: "Depart Eminönü pier, with the Golden Horn and Galata Bridge behind you" },
      { time: "0:15", step: "Dolmabahçe Palace — the Ottoman Empire's last imperial palace, right on the water" },
      { time: "0:30", step: "Ortaköy Mosque, framed under the first Bosphorus Bridge" },
      { time: "0:50", step: "Wooden yalı mansions and waterfront villages along the Asian shore" },
      { time: "1:10", step: "Rumeli Fortress, near the Fatih Sultan Mehmet Bridge — the turnaround point" },
      { time: "1:40", step: "Return past Beşiktaş and Kabataş, back to Eminönü" },
    ],
    learnHeading: "Good to know before boarding",
    learn: [
      "Boarding opens 20–30 minutes before departure; top-deck seating is first-come, first-served",
      "Audio guides are multilingual and accessible via your smartphone or onboard headsets",
      "Cruises run rain or shine — the lower deck is fully enclosed and heated in cooler months",
      "Every cruise on this site departs in morning or afternoon daylight",
    ],
    note: "Route order may vary slightly depending on weather and harbor traffic, but all listed landmarks are covered.",
    extraHeading: "Where you can board",
    extraItems: [
      { name: "Eminönü Pier", note: "The main departure point for most sightseeing cruises, in the historic peninsula" },
      { name: "Kabataş Pier", note: "Reachable by the T1 tram and funicular — used by several afternoon departures" },
      { name: "Beşiktaş Pier", note: "On the European shore, a short walk from Dolmabahçe Palace" },
    ],
    ctaText: "Convinced? The Short Circle Sightseeing Cruise starts at €24/person and departs several times a day.",
    ctaButtonText: "Book the Sightseeing Cruise →",
    ctaHref: "#tours",
  },
  tower: {
    eyebrow: "Waterfront Palaces & Mansions",
    heading: "See Istanbul's Ottoman Palaces From the Water — By Day",
    body:
      "The best view of Istanbul's waterfront palaces isn't from the street — it's from the Bosphorus itself, in daylight. <strong>Dolmabahçe Palace</strong>, Çırağan Palace, and dozens of centuries-old wooden yalı mansions sit directly on the water, visible only from a passing boat. The Full-Day Cruise to Anadolu Kavağı and the Two Continents Afternoon Tour both spend the most time along this stretch.",
    bullets: [
      "Dolmabahçe Palace and Çırağan Palace are both visible only from the water side, not the road",
      "Wooden yalı mansions along the Asian shore date back to the Ottoman era",
      "Morning departures get the clearest light for photos of the waterfront palaces",
      "Every cruise on this site runs in daylight or the afternoon — no night departures",
    ],
    ctaButtonText: "See Full-Day & Combo Cruises",
    ctaHref: "#tours",
    images: [
      {
        src: "/palace-dolmabahce.jpg",
        alt: "Dolmabahce Palace on the Bosphorus shoreline in Istanbul during the day",
        label: "Dolmabahçe Palace",
      },
      {
        src: "/palace-maidens-tower.jpg",
        alt: "Maiden's Tower in the Bosphorus strait in Istanbul during daytime",
        label: "Maiden's Tower",
      },
      {
        src: "/tour-short-circle.jpg",
        alt: "Ortakoy Mosque on the Bosphorus strait in Istanbul during daytime sightseeing cruise",
        label: "Ortaköy Mosque",
      },
      {
        src: "/palace-yali.jpg",
        alt: "Historic Ottoman wooden waterfront mansions along the Bosphorus",
        label: "Yalı Mansions",
      },
    ],
  },
  practical: {
    hoursHeading: "Cruise Schedule (2026)",
    hours: [
      { range: "Short Circle Cruise", time: "9:30 AM – 5:00 PM, departures every 45–60 min (April – October)" },
      { range: "Full-Day Cruise to Anadolu Kavağı", time: "10:30 AM departure, approx. 4:30 PM return, year-round" },
      { range: "Lunch Cruise", time: "12:30 PM – 2:00 PM departures" },
      { range: "Two Continents Afternoon Tour", time: "1:00 PM – 2:30 PM departures" },
    ],
    hoursNote: "Exact departure times vary by operator and season — your confirmation email has the exact time.",
    addressHeading: "Boarding Points",
    address:
      "Eminönü Pier — Fatih, the main dock for most sightseeing and full-day cruises. Reachable by T1 tram (Eminönü stop).\nKabataş Pier — reachable by T1 tram and the Kabataş–Taksim funicular, used by several afternoon departures.\nBeşiktaş Pier — on the European shore, a short walk from Dolmabahçe Palace.",
    metro: "Arrive 15–20 minutes early — your confirmation email lists the exact pier and dock number.",
    bestTimeHeading: "Best Time for a Cruise",
    bestTimeBody:
      "Morning departures get the clearest light for photos and the shortest boarding lines — book a 9:30–10:30 AM slot if you can. June through August is peak season, so weekday mornings book out fastest.",
  },
  price: {
    eyebrow: "Compare & Choose",
    heading: "Compare & Choose Your Cruise",
    subheading:
      "All four options side by side — pick the one that fits your trip, then book straight from the table.",
    note: "Children typically get reduced rates on most cruises — check each ticket's booking page for exact age tiers.",
    itemLabel: "Cruise Type",
    priceLabel: "Price",
    column1Label: "Duration",
    column2Label: "Meal Included",
    bestForLabel: "Best For",
    bookLabel: "Book",
  },
  ctaBanner: {
    heading: "Ready to Cruise the Bosphorus?",
    subtext: "Book your sightseeing cruise today and see Istanbul's skyline the way it's meant to be seen — from the water.",
    buttonText: "Explore Cruises",
    buttonHref: "#tours",
  },
  faq: {
    eyebrow: "Frequently Asked Questions",
    heading: "Bosphorus Cruise FAQs",
  },
  notFound: {
    heading: "Looks like this page missed the boat.",
    body: "The page you're looking for doesn't exist or may have moved. Try one of these instead.",
    primaryButtonText: "Compare Bosphorus Cruises & Tickets →",
    primaryButtonHref: "/#tours",
    secondaryButtonText: "Read the Travel Guide",
    secondaryButtonHref: "/blog",
  },
  blogTeaser: {
    eyebrow: "From the Blog",
    heading: "Bosphorus Cruise Guides & Tips",
    subheading:
      "Expert advice on picking the right daytime cruise and insider tips to help you plan your Istanbul trip.",
    viewAllText: "View All Articles",
    readArticleText: "Read Article",
  },
  blogPage: {
    eyebrow: "Bosphorus Cruise Blog",
    heading: "Bosphorus Cruise Travel Guide",
    subheading: "Practical guides to help you plan your visit and pick the right daytime cruise.",
    emptyStateText: "No articles published yet — check back soon.",
    featuredLinkText: "Read the guide",
    ctaHeading: "Ready to book your Bosphorus cruise?",
    ctaButtonText: "Compare Bosphorus Cruises & Tickets →",
    backToGuidesText: "← All guides",
    quickAnswerLabel: "Quick Answer",
    tocLabel: "In This Guide",
    relatedGuidesHeading: "Related Guides",
    sidebarRelatedHeading: "Related Articles",
    sidebarRecommendedBadge: "Recommended",
    sidebarCompareLinkText: "Compare all cruises & tickets →",
    promoRecommendedText: "Recommended for you",
  },
};

// Used only if the `homepage` table is empty or unreachable (e.g. before
// `node scripts/setup-db.mjs` has been run) — a real image rather than an
// empty string so the hero section never renders broken/blank.
const DEFAULT_HOMEPAGE_CONTENT: HomepageContent = {
  heroBadge: "BOSPHORUS SIGHTSEEING CRUISE TOUR",
  heroHeading: "Bosphorus Sightseeing Cruise Tour",
  heroSubheading:
    "Sail between Europe and Asia and discover Istanbul's most stunning views, historic landmarks and unforgettable moments.",
  heroImage:
    "https://images.unsplash.com/photo-1763965367191-6455ef032c79?q=80&w=2400&auto=format&fit=crop",
  heroImageAlt: "Sightseeing cruise boat on the Bosphorus strait in front of Ortakoy Mosque and bridge",
  heroCtaPrimaryText: "Day Cruise Tickets",
  heroCtaPrimaryHref: "#tours",
  heroCtaSecondaryText: "Afternoon Cruise Tickets",
  heroCtaSecondaryHref: "#tours",
  ratingValue: "4.7 / 5",
  ratingCount: "3,250+ reviews",
  showFeaturedTour: true,
  featuredTourId: "bosphorus-short-circle-sightseeing-cruise",
  featuredBadgeLabel: "Recommended",
  featuredUrgencyText: "Best Price · Limited Availability",
  featuredReasons: [
    "Our most-booked cruise — 18,000+ reviews, averaging 4.35 stars",
    "Departs several times a day, April through October",
    "Free cancellation up to 24 hours before",
  ],
  sections: DEFAULT_SECTIONS,
  header: DEFAULT_HEADER,
  footer: DEFAULT_FOOTER,
  theme: DEFAULT_THEME,
  metaTitle: "",
  metaDescription: "",
  focusKeyword: "Bosphorus Sightseeing Cruise Tour",
  noIndex: false,
  noFollow: false,
  canonicalUrl: "",
  ogTitle: "",
  ogDescription: "",
  ogImage: "",
};

function parseReasons(value: unknown): string[] {
  if (Array.isArray(value)) return value;
  if (typeof value === "string") {
    try {
      const parsed = JSON.parse(value);
      return Array.isArray(parsed) ? parsed : [];
    } catch {
      return [];
    }
  }
  return [];
}

// Generic "parse a JSONB column, fall back to a default object if it's
// missing/empty/malformed" helper — every *_json column on the homepage
// row (sections, header, footer, theme) goes through this, deep-merged
// with its default so adding a new field later never breaks a site that
// was already customized before that field existed.
function parseJsonWithDefault<T extends object>(value: unknown, fallback: T): T {
  let parsed: unknown = value;
  if (typeof value === "string") {
    try {
      parsed = JSON.parse(value);
    } catch {
      parsed = null;
    }
  }
  if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) return fallback;
  return { ...fallback, ...(parsed as Partial<T>) };
}

function rowToHomepage(row: any): HomepageContent {
  const sectionsRaw = parseJsonWithDefault<HomepageSections>(row.sections_json, DEFAULT_SECTIONS);
  return {
    heroBadge: row.hero_badge || "",
    heroHeading: row.hero_heading || "",
    heroSubheading: row.hero_subheading || "",
    heroImage: row.hero_image || "",
    heroImageAlt: row.hero_image_alt || "",
    heroCtaPrimaryText: row.hero_cta_primary_text || DEFAULT_HOMEPAGE_CONTENT.heroCtaPrimaryText,
    heroCtaPrimaryHref: row.hero_cta_primary_href || DEFAULT_HOMEPAGE_CONTENT.heroCtaPrimaryHref,
    heroCtaSecondaryText: row.hero_cta_secondary_text || DEFAULT_HOMEPAGE_CONTENT.heroCtaSecondaryText,
    heroCtaSecondaryHref: row.hero_cta_secondary_href || DEFAULT_HOMEPAGE_CONTENT.heroCtaSecondaryHref,
    ratingValue: row.rating_value || "",
    ratingCount: row.rating_count || "",
    showFeaturedTour: !!row.show_featured_tour,
    featuredTourId: row.featured_tour_id || "",
    featuredBadgeLabel: row.featured_badge_label || "",
    featuredUrgencyText: row.featured_urgency_text || "",
    featuredReasons: parseReasons(row.featured_reasons),
    sections: {
      tours: { ...DEFAULT_SECTIONS.tours, ...sectionsRaw.tours },
      highlights: { ...DEFAULT_SECTIONS.highlights, ...sectionsRaw.highlights },
      why: { ...DEFAULT_SECTIONS.why, ...sectionsRaw.why },
      tower: { ...DEFAULT_SECTIONS.tower, ...sectionsRaw.tower },
      practical: { ...DEFAULT_SECTIONS.practical, ...sectionsRaw.practical },
      price: { ...DEFAULT_SECTIONS.price, ...sectionsRaw.price },
      ctaBanner: { ...DEFAULT_SECTIONS.ctaBanner, ...sectionsRaw.ctaBanner },
      faq: { ...DEFAULT_SECTIONS.faq, ...sectionsRaw.faq },
      notFound: { ...DEFAULT_SECTIONS.notFound, ...sectionsRaw.notFound },
      blogTeaser: { ...DEFAULT_SECTIONS.blogTeaser, ...sectionsRaw.blogTeaser },
      blogPage: { ...DEFAULT_SECTIONS.blogPage, ...sectionsRaw.blogPage },
    },
    header: parseJsonWithDefault<HeaderContent>(row.header_json, DEFAULT_HEADER),
    footer: parseJsonWithDefault<FooterContent>(row.footer_json, DEFAULT_FOOTER),
    theme: parseJsonWithDefault<ThemeColors>(row.theme_json, DEFAULT_THEME),
    metaTitle: row.meta_title || "",
    metaDescription: row.meta_description || "",
    focusKeyword: row.focus_keyword || "",
    noIndex: !!row.no_index,
    noFollow: !!row.no_follow,
    canonicalUrl: row.canonical_url || "",
    ogTitle: row.og_title || "",
    ogDescription: row.og_description || "",
    ogImage: row.og_image || "",
  };
}

export async function getHomepageContent(): Promise<HomepageContent> {
  try {
    const rows = await sql`SELECT * FROM homepage WHERE id = 1 LIMIT 1`;
    return rows.length ? rowToHomepage(rows[0]) : DEFAULT_HOMEPAGE_CONTENT;
  } catch {
    return DEFAULT_HOMEPAGE_CONTENT;
  }
}

// Lightweight version of the above for Header/Footer/RootLayout, which
// render on every single page (not just the homepage) and only need the
// three site-wide columns — avoids pulling the full hero/sections payload
// on every page load just to read the navbar.
export async function getSiteChrome(): Promise<{ header: HeaderContent; footer: FooterContent; theme: ThemeColors }> {
  try {
    const rows = await sql`SELECT header_json, footer_json, theme_json FROM homepage WHERE id = 1 LIMIT 1`;
    if (!rows.length) return { header: DEFAULT_HEADER, footer: DEFAULT_FOOTER, theme: DEFAULT_THEME };
    const row = rows[0] as any;
    return {
      header: parseJsonWithDefault<HeaderContent>(row.header_json, DEFAULT_HEADER),
      footer: parseJsonWithDefault<FooterContent>(row.footer_json, DEFAULT_FOOTER),
      theme: parseJsonWithDefault<ThemeColors>(row.theme_json, DEFAULT_THEME),
    };
  } catch {
    return { header: DEFAULT_HEADER, footer: DEFAULT_FOOTER, theme: DEFAULT_THEME };
  }
}

// The Homepage admin page (/admin/homepage) is now one tabbed form, but
// still deliberately only ever PUTs the columns it owns — NOT
// featured_tour_* (owned by /admin/recommended) and NOT no_index/no_follow
// (owned by /admin/indexing) — so those two pages can never be clobbered
// by a stale snapshot sitting in this form, no matter which was saved most
// recently. See setHomepageIndexing/saveRecommendedTour below for the
// other two column-scoped save functions this splits against.
export async function saveHomepageCopy(data: {
  heroBadge: string;
  heroHeading: string;
  heroSubheading: string;
  heroImage: string;
  heroImageAlt: string;
  heroCtaPrimaryText: string;
  heroCtaPrimaryHref: string;
  heroCtaSecondaryText: string;
  heroCtaSecondaryHref: string;
  ratingValue: string;
  ratingCount: string;
  metaTitle: string;
  metaDescription: string;
  focusKeyword: string;
  canonicalUrl: string;
  ogTitle: string;
  ogDescription: string;
  ogImage: string;
}): Promise<void> {
  await sql`
    INSERT INTO homepage (
      id, hero_badge, hero_heading, hero_subheading, hero_image, hero_image_alt,
      hero_cta_primary_text, hero_cta_primary_href,
      hero_cta_secondary_text, hero_cta_secondary_href,
      rating_value, rating_count, meta_title, meta_description, focus_keyword,
      canonical_url, og_title, og_description, og_image
    ) VALUES (
      1, ${data.heroBadge}, ${data.heroHeading}, ${data.heroSubheading}, ${data.heroImage},
      ${data.heroImageAlt},
      ${data.heroCtaPrimaryText || ""}, ${data.heroCtaPrimaryHref || ""},
      ${data.heroCtaSecondaryText || ""}, ${data.heroCtaSecondaryHref || ""},
      ${data.ratingValue}, ${data.ratingCount},
      ${data.metaTitle || ""}, ${data.metaDescription || ""}, ${data.focusKeyword || ""},
      ${data.canonicalUrl || ""}, ${data.ogTitle || ""}, ${data.ogDescription || ""}, ${data.ogImage || ""}
    )
    ON CONFLICT (id) DO UPDATE SET
      hero_badge = EXCLUDED.hero_badge,
      hero_heading = EXCLUDED.hero_heading,
      hero_subheading = EXCLUDED.hero_subheading,
      hero_image = EXCLUDED.hero_image,
      hero_image_alt = EXCLUDED.hero_image_alt,
      hero_cta_primary_text = EXCLUDED.hero_cta_primary_text,
      hero_cta_primary_href = EXCLUDED.hero_cta_primary_href,
      hero_cta_secondary_text = EXCLUDED.hero_cta_secondary_text,
      hero_cta_secondary_href = EXCLUDED.hero_cta_secondary_href,
      rating_value = EXCLUDED.rating_value,
      rating_count = EXCLUDED.rating_count,
      meta_title = EXCLUDED.meta_title,
      meta_description = EXCLUDED.meta_description,
      focus_keyword = EXCLUDED.focus_keyword,
      canonical_url = EXCLUDED.canonical_url,
      og_title = EXCLUDED.og_title,
      og_description = EXCLUDED.og_description,
      og_image = EXCLUDED.og_image
  `;
}

// Touches ONLY the indexing columns — used by the centralized "Indexing"
// admin tab (/admin/indexing) so flipping this page's Index/Follow toggle
// there can never clobber the Homepage form's content or vice versa,
// no matter which was saved most recently.
export async function setHomepageIndexing(noIndex: boolean, noFollow: boolean): Promise<void> {
  await sql`
    INSERT INTO homepage (id, no_index, no_follow)
    VALUES (1, ${!!noIndex}, ${!!noFollow})
    ON CONFLICT (id) DO UPDATE SET
      no_index = EXCLUDED.no_index,
      no_follow = EXCLUDED.no_follow
  `;
}

// Mirror image of saveHomepageCopy above — only touches the Recommended
// Tour widget's own columns, leaving the Homepage page's hero copy alone.
export async function saveRecommendedTour(data: {
  showFeaturedTour: boolean;
  featuredTourId: string;
  featuredBadgeLabel: string;
  featuredUrgencyText: string;
  featuredReasons: string[];
}): Promise<void> {
  await sql`
    INSERT INTO homepage (
      id, show_featured_tour, featured_tour_id, featured_badge_label,
      featured_urgency_text, featured_reasons
    ) VALUES (
      1, ${!!data.showFeaturedTour}, ${data.featuredTourId}, ${data.featuredBadgeLabel},
      ${data.featuredUrgencyText}, ${JSON.stringify(data.featuredReasons || [])}::jsonb
    )
    ON CONFLICT (id) DO UPDATE SET
      show_featured_tour = EXCLUDED.show_featured_tour,
      featured_tour_id = EXCLUDED.featured_tour_id,
      featured_badge_label = EXCLUDED.featured_badge_label,
      featured_urgency_text = EXCLUDED.featured_urgency_text,
      featured_reasons = EXCLUDED.featured_reasons
  `;
}

// Touches ONLY sections_json — the "What You See" / "Waterfront Palaces
// & Mansions" / "Practical Info" / "Price Comparison" content.
export async function saveHomepageSections(sections: HomepageSections): Promise<void> {
  await sql`
    INSERT INTO homepage (id, sections_json)
    VALUES (1, ${JSON.stringify(sections)}::jsonb)
    ON CONFLICT (id) DO UPDATE SET sections_json = EXCLUDED.sections_json
  `;
}

// Touches ONLY header_json — the site-wide navbar (logo, nav links, CTA
// button). Renders on every page, edited from the Homepage admin tab.
export async function saveSiteHeader(header: HeaderContent): Promise<void> {
  await sql`
    INSERT INTO homepage (id, header_json)
    VALUES (1, ${JSON.stringify(header)}::jsonb)
    ON CONFLICT (id) DO UPDATE SET header_json = EXCLUDED.header_json
  `;
}

// Touches ONLY footer_json — the site-wide footer.
export async function saveSiteFooter(footer: FooterContent): Promise<void> {
  await sql`
    INSERT INTO homepage (id, footer_json)
    VALUES (1, ${JSON.stringify(footer)}::jsonb)
    ON CONFLICT (id) DO UPDATE SET footer_json = EXCLUDED.footer_json
  `;
}

// Touches ONLY theme_json — the site-wide brand colors.
export async function saveSiteTheme(theme: ThemeColors): Promise<void> {
  await sql`
    INSERT INTO homepage (id, theme_json)
    VALUES (1, ${JSON.stringify(theme)}::jsonb)
    ON CONFLICT (id) DO UPDATE SET theme_json = EXCLUDED.theme_json
  `;
}
