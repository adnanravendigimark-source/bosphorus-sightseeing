import SafeImage from "./SafeImage";
import { getHomepageContent } from "@/lib/homepage";

export default async function Hero() {
  const content = await getHomepageContent();

  return (
    <section
      id="top"
      className="relative w-full min-h-[calc(100vh-5rem)] min-h-[calc(100dvh-5rem)] flex flex-col justify-center bg-white overflow-hidden"
    >
      {/* Full-bleed panoramic background photo */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <SafeImage
          src={content.heroImage}
          alt={content.heroImageAlt || "Bosphorus sightseeing cruise in Istanbul"}
          fill
          priority
          quality={75}
          sizes="100vw"
          className="object-cover object-[80%_center] md:object-[78%_center] lg:object-right"
        />
        {/* Atmospheric gradient overlay ensuring clear text readability on mobile and desktop */}
        <div className="absolute inset-0 bg-gradient-to-b from-white/95 via-white/85 via-50% to-white/30 sm:bg-gradient-to-r sm:from-white/95 sm:via-white/75 sm:via-45% md:from-white/90 md:via-white/50 md:via-50% lg:via-52% md:to-transparent" />
      </div>

      {/* Hero content layer (positioned comfortably below the header) */}
      <div className="relative z-10 mx-auto w-full max-w-7xl px-4 sm:px-8 pt-16 sm:pt-24 lg:pt-32 pb-16 sm:pb-24 lg:pb-32 flex-1 flex flex-col justify-center">
        <div className="max-w-xl lg:max-w-2xl mt-4 sm:mt-6 lg:mt-8">
          {/* Eyebrow */}
          <p className="text-xs sm:text-[13px] font-bold tracking-[0.18em] uppercase text-bosphorus-gold">
            {content.heroBadge}
          </p>

          {/* Main headline */}
          <h1 className="mt-3 font-display text-3xl sm:text-4xl md:text-5xl lg:text-[54px] font-bold leading-[1.12] tracking-tight text-bosphorus-navy">
            {content.heroHeading}
          </h1>

          {/* Gold accent line */}
          <div className="mt-3.5 mb-5 h-[2.5px] w-12 rounded-full bg-bosphorus-gold" />

          {/* Subtitle */}
          <div
            className="rich-content text-sm sm:text-base text-bosphorus-charcoal leading-relaxed max-w-lg font-normal"
            dangerouslySetInnerHTML={{ __html: content.heroSubheading }}
          />

          {/* Action buttons */}
          <div className="mt-7 flex flex-wrap items-center gap-3.5 sm:gap-4">
            <a
              href={content.heroCtaPrimaryHref || "#tours"}
              className="group inline-flex items-center justify-center gap-2 rounded-lg bg-bosphorus-navy px-6 py-3.5 text-xs sm:text-sm font-semibold text-white shadow-sm transition-all hover:bg-bosphorus-navy/90 hover:shadow-md hover:-translate-y-0.5"
            >
              <span>{content.heroCtaPrimaryText}</span>
              <span className="transition-transform group-hover:translate-x-1">→</span>
            </a>

            <a
              href={content.heroCtaSecondaryHref || "#tours"}
              className="group inline-flex items-center justify-center gap-2 rounded-lg border border-bosphorus-charcoal/30 bg-white/40 md:bg-transparent px-6 py-3.5 text-xs sm:text-sm font-semibold text-bosphorus-charcoal transition-all hover:bg-white/80 hover:border-bosphorus-charcoal/50 hover:-translate-y-0.5"
            >
              <span>{content.heroCtaSecondaryText}</span>
              <span className="transition-transform group-hover:translate-x-1">→</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
