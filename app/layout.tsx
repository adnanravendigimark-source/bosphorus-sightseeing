import type { Metadata } from "next";
import Script from "next/script";
import { Cormorant_Garamond, Alex_Brush } from "next/font/google";
import { SITE_URL } from "@/lib/site";
import { resolveRobots } from "@/lib/seo";
import { getSiteChrome } from "@/lib/homepage";
import { hexToRgbTriplet } from "@/lib/color";
import "./globals.css";

// Forces every page in the app to render dynamically, root layout included
export const dynamic = "force-dynamic";

// Real display typeface, loaded once here and exposed as a CSS variable so
// every font-display usage site-wide (headings, the logo wordmark) picks
// it up automatically.
const displayFont = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-display",
});

const scriptFont = Alex_Brush({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-script",
});

// SEO: title + description written to target the site's focus keyword,
// "Bosphorus Sightseeing Cruise Tour" — day and afternoon cruises only, by
// design (no night/dinner cruise products or copy anywhere on this site).
// Keep this unique per page as you add more landing pages.
//
// metadataBase MUST be your real deployed domain — it's used to resolve
// canonical URLs and OG image URLs. Update this in lib/site.ts once you
// attach a custom domain in Vercel.

// Default social-share image — used whenever a page doesn't set its own
// (blog posts override this with their own photo in generateMetadata).
// Without this, links shared to WhatsApp/iMessage/Facebook/Twitter show no
// preview image at all, which measurably hurts click-through on shared
// links — a big deal for a site that depends on organic + social traffic.
const DEFAULT_OG_IMAGE =
  "https://images.unsplash.com/photo-1763965367191-6455ef032c79?q=80&w=2400&auto=format&fit=crop";

// Organization + WebSite structured data — site-wide brand identity signal
// for Google (E-E-A-T). Deliberately NOT a TouristAttraction/LocalBusiness
// schema for any single cruise operator — this site is an independent
// affiliate guide, not the official operator, and the footer disclaimer
// says so; schema claiming to BE the attraction would misrepresent that.
const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Bosphorus Boat Cruise Tickets",
  url: SITE_URL,
  description:
    "Independent guide comparing daytime and afternoon Bosphorus sightseeing cruise tours from licensed operators in Istanbul.",
};

const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "Bosphorus Boat Cruise Tickets",
  url: SITE_URL,
};

// Search indexing is controlled entirely by each page's own "Search
// Engine Indexing" admin toggle, resolved via lib/seo.ts's
// resolveRobots(). This root layout has no page of its own, so it
// resolves with no noIndex (false, i.e. index/follow) — every public
// page below it either inherits this default (if it doesn't define its
// own `robots`) or overrides it with its own resolveRobots() call (if it
// has a per-page toggle — see app/page.tsx, app/about/page.tsx,
// app/contact/page.tsx, app/blog/**, app/privacy-policy/page.tsx).
export function generateMetadata(): Metadata {
  const robots = resolveRobots(false);

  return {
    metadataBase: new URL(SITE_URL),
    // Kept under 60 characters so Google doesn't truncate it in results.
    title: {
      default: "Bosphorus Sightseeing Cruise Tour Tickets (2026)",
      template: "%s | Bosphorus Boat Cruise Tickets",
    },
    // Kept under 155 characters for the same reason.
    description:
      "Compare day and afternoon Bosphorus sightseeing cruise tours in Istanbul — short circle, full-day, and Two Continents combo. Instant booking, free cancellation on most tickets.",
    keywords: [
      // Focus keyword
      "Bosphorus Sightseeing Cruise Tour",
      // Core high-volume terms
      "Bosphorus cruise Istanbul",
      "Istanbul Bosphorus tour",
      // Experience-based high-intent
      "Bosphorus day cruise",
      "Bosphorus afternoon cruise",
      "short circle Bosphorus cruise",
      "full Bosphorus cruise Anadolu Kavagi",
      // Comparison/informational intent
      "short circle vs full Bosphorus cruise",
      "best Bosphorus sightseeing cruise",
      // Booking intent
      "book Bosphorus cruise tour online",
      "Bosphorus cruise tickets 2026",
    ],
    alternates: {
      canonical: "/",
    },
    robots,
    openGraph: {
      title: "Bosphorus Sightseeing Cruise Tour Tickets | Day & Afternoon Cruises",
      description:
        "Short circle, full-day, and Two Continents Bosphorus sightseeing cruises. Compare prices and book online in Istanbul — daytime and afternoon departures only.",
      type: "website",
      url: SITE_URL,
      siteName: "Bosphorus Boat Cruise Tickets",
      images: [{ url: DEFAULT_OG_IMAGE, width: 2400, height: 1350, alt: "A sightseeing boat on the Bosphorus with Istanbul's skyline in daylight" }],
    },
    twitter: {
      card: "summary_large_image",
      title: "Bosphorus Sightseeing Cruise Tour Tickets | Day & Afternoon Cruises",
      description:
        "Short circle, full-day, and Two Continents Bosphorus sightseeing cruises. Compare prices and book online in Istanbul — daytime and afternoon departures only.",
      images: [DEFAULT_OG_IMAGE],
    },
  };
}

// Turns the admin's saved "Brand Colors" (theme_json, /admin/homepage →
// Advanced SEO tab) into the CSS variable overrides tailwind.config.ts's
// bosphorus.*/gold-400 colors read from — see globals.css :root for the
// defaults this replaces. Any color left blank (or invalid) by the admin
// is simply omitted, so it keeps using the CSS default. Doing this with a
// plain <style> tag (not next/head or a client component) means it's
// server-rendered with the rest of the page, so there's no flash of the
// wrong color on load.
function buildThemeStyle(theme: { primary: string; secondary: string; dark: string; accent: string }) {
  const vars: [string, string | null][] = [
    ["--color-bosphorus-gold", hexToRgbTriplet(theme.primary)],
    ["--color-bosphorus-navy", hexToRgbTriplet(theme.secondary)],
    ["--color-bosphorus-charcoal", hexToRgbTriplet(theme.dark)],
    ["--color-gold-400", hexToRgbTriplet(theme.accent)],
  ];
  const declarations = vars
    .filter(([, value]) => value !== null)
    .map(([name, value]) => `${name}:${value};`)
    .join("");
  return declarations ? `:root{${declarations}}` : "";
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { theme } = await getSiteChrome();
  const themeStyle = buildThemeStyle(theme);

  return (
    <html lang="en" className={`${displayFont.variable} ${scriptFont.variable}`}>
      <head>
        {/* Warms up the connection to Google's analytics domains ahead of
            the afterInteractive gtag.js load below, shaving the DNS/TLS
            handshake off its actual request instead of paying for it when
            the script fires (PageSpeed: shortens the "Network dependency
            tree" / request-chain latency). */}
        <link rel="preconnect" href="https://www.googletagmanager.com" />
        <link rel="preconnect" href="https://www.google-analytics.com" />
        <link rel="dns-prefetch" href="https://www.googletagmanager.com" />
        <link rel="dns-prefetch" href="https://www.google-analytics.com" />
        {/* Google tag (gtag.js) — GA4 measurement ID G-KJTD4JBDZP, this
            site's own property (do not reuse this ID on another site — it
            will mix both sites' traffic together). */}
        <Script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-KJTD4JBDZP"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());

            gtag('config', 'G-KJTD4JBDZP');
          `}
        </Script>
      </head>
      <body className="font-body bg-stone-50 text-stone-900 antialiased">
        {/* :root custom properties apply from anywhere in the document, so
            this doesn't need to live in <head> — Next.js's metadata API
            already owns <head> in the App Router, and manually adding one
            here would conflict with it. */}
        {themeStyle && <style dangerouslySetInnerHTML={{ __html: themeStyle }} />}
        {children}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
        />
      </body>
    </html>
  );
}
