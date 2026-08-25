import SafeImage from "./SafeImage";
import { getHomepageContent } from "@/lib/homepage";

// Hero section matching the Bosphorus Boat Cruise reference design:
// Full-bleed scenic photo with left-weighted contrast overlay,
// Display title + cursive golden accent subtitle ("Day & Afternoon Tickets"),
// Dual tickets CTA buttons, and interactive water hotspot dot.
export default async function Hero() {
  const content = await getHomepageContent();

  return (
    <section
      id="top"
      className="relative flex min-h-[calc(100dvh-5rem)] flex-col justify-center overflow-hidden bg-[#081827] text-white"
    >
      {/* Full-bleed photo background */}
      <div className="absolute inset-0 z-0">
        <SafeImage
          src="/hero-cruise.jpg"
          alt={content.heroImageAlt || "Bosphorus sightseeing boat cruise in Istanbul"}
          fill
          priority
          sizes="100vw"
          className="object-cover object-[center_right] sm:object-center"
        />
        {/* Left-to-right gradient overlay for text readability while keeping the boat and mosque clearly visible */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#081827]/90 via-[#081827]/60 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#081827] via-transparent to-black/25" />
      </div>

      {/* Pulsing Hotspot Marker in Bosphorus water (matching design visual) */}
      <div className="pointer-events-none absolute bottom-[28%] left-[38%] z-10 hidden lg:block" aria-hidden="true">
        <span className="relative flex h-5 w-5">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-sky-400 opacity-75" />
          <span className="relative inline-flex h-5 w-5 rounded-full border-2 border-white bg-sky-500 shadow-md shadow-sky-500/50" />
        </span>
      </div>

      <div className="relative z-10 mx-auto w-full max-w-7xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
        <div className="max-w-2xl">
          {/* Eyebrow */}
          <span className="inline-block text-xs sm:text-sm font-semibold uppercase tracking-[0.22em] text-[#E5A83B]">
            {content.heroBadge || "BOSPHORUS SIGHTSEEING CRUISE TOUR"}
          </span>

          {/* Main Heading */}
          <h1 className="mt-3 font-display text-4xl sm:text-5xl lg:text-[4.2rem] font-bold leading-[1.08] tracking-tight text-white drop-shadow">
            Bosphorus <br />
            Sightseeing Cruise Tour
          </h1>

          {/* Cursive / Calligraphy Script Subtitle */}
          <p className="mt-1 font-script text-4xl sm:text-5xl lg:text-6xl font-normal text-[#E5A83B] drop-shadow leading-none">
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
              className="group inline-flex items-center justify-center gap-2 rounded-md bg-[#E5A83B] px-6 py-3.5 text-sm sm:text-base font-bold text-[#081827] shadow-lg shadow-[#E5A83B]/20 transition-all duration-300 hover:bg-[#D99B26] hover:scale-[1.02]"
            >
              <span>{content.heroCtaPrimaryText || "Day Cruise Tickets"}</span>
              <span className="transition-transform group-hover:translate-x-1">→</span>
            </a>

            <a
              href={content.heroCtaSecondaryHref || "#tours"}
              className="group inline-flex items-center justify-center gap-2 rounded-md border border-[#E5A83B] bg-[#081827]/60 px-6 py-3.5 text-sm sm:text-base font-semibold text-white backdrop-blur-md transition-all duration-300 hover:bg-[#081827]/90 hover:scale-[1.02]"
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

