import SafeImage from "./SafeImage";
import { getHomepageContent } from "@/lib/homepage";

// Hero section matching the reference design:
// Full-bleed scenic photo with left-weighted contrast overlay,
// Display title + cursive golden accent subtitle ("Day & Afternoon Tickets"),
// Dual tickets CTA buttons, Trustpilot review block, and water hotspot marker.
export default async function Hero() {
  const content = await getHomepageContent();

  return (
    <section
      id="top"
      className="relative flex min-h-[calc(100dvh-5rem)] flex-col justify-center overflow-hidden bg-[#082B4C] text-white"
    >
      {/* Full-bleed photo background with boat positioned on the right —
          now wired to the admin's "Hero background photo" field (was
          previously hardcoded to /hero-cruise.jpg regardless of what was
          uploaded/saved in /admin/homepage). Falls back to the original
          static file if the field is left blank. */}
      <div className="absolute inset-0 z-0">
        <SafeImage
          src={content.heroImage || "/hero-cruise.jpg"}
          alt={content.heroImageAlt || "Bosphorus sightseeing boat cruise in Istanbul"}
          fill
          priority
          sizes="100vw"
          className="object-cover object-[right_center] lg:object-center"
        />
        {/* Soft left-weighted gradient so text is readable while the boat, mosque, bridge and sky stay crystal clear, vivid and crisp */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#082B4C]/90 via-[#082B4C]/45 via-45% to-transparent pointer-events-none" />
      </div>

      <div className="relative z-10 mx-auto w-full max-w-7xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
        <div className="max-w-2xl">
          {/* Eyebrow */}
          <span className="inline-block text-xs sm:text-sm font-semibold uppercase tracking-[0.22em] text-[#D9A441]">
            {content.heroBadge || "BOSPHORUS SIGHTSEEING CRUISE TOUR"}
          </span>

          {/* Main Heading — now wired to the admin's "Hero headline (H1)"
              field (was previously hardcoded plain text, so editing/saving
              it in /admin/homepage had no visible effect). whitespace-pre-line
              preserves manual line breaks typed into the textarea, matching
              the old hardcoded two-line layout by default. */}
          <h1 className="mt-3 font-display text-4xl sm:text-5xl lg:text-[4.2rem] font-bold leading-[1.08] tracking-tight text-white drop-shadow whitespace-pre-line">
            {content.heroHeading || "Bosphorus\nSightseeing Cruise Tour"}
          </h1>

          {/* Cursive / Calligraphy Script Subtitle */}
          <p className="mt-1 font-script text-4xl sm:text-5xl lg:text-6xl font-normal text-[#D9A441] drop-shadow leading-none">
            Day &amp; Afternoon Tickets
          </p>

          {/* Description */}
          <p className="mt-6 max-w-xl text-base sm:text-lg font-normal leading-relaxed text-white/95 drop-shadow">
            {content.heroSubheading
              ? content.heroSubheading.replace(/<[^>]+>/g, " ")
              : "Sail between Europe and Asia and discover Istanbul's most stunning views, historic landmarks and unforgettable moments."}
          </p>

          {/* Dual Action Buttons */}
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <a
              href={content.heroCtaPrimaryHref || "#tours"}
              className="group inline-flex items-center justify-center gap-2 rounded-md bg-[#D9A441] px-6 py-3.5 text-sm sm:text-base font-bold text-[#082B4C] shadow-lg shadow-[#D9A441]/20 transition-all duration-300 hover:bg-[#C48E2B] hover:scale-[1.02]"
            >
              <span>{content.heroCtaPrimaryText || "Day Cruise Tickets"}</span>
              <span className="transition-transform group-hover:translate-x-1">→</span>
            </a>

            <a
              href={content.heroCtaSecondaryHref || "#tours"}
              className="group inline-flex items-center justify-center gap-2 rounded-md border border-[#D9A441] bg-[#082B4C]/60 px-6 py-3.5 text-sm sm:text-base font-semibold text-white backdrop-blur-md transition-all duration-300 hover:bg-[#082B4C]/90 hover:scale-[1.02]"
            >
              <span>{content.heroCtaSecondaryText || "Afternoon Cruise Tickets"}</span>
              <span className="transition-transform group-hover:translate-x-1">→</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
