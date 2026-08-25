import { getHomepageContent } from "@/lib/homepage";

// Dark call-to-action banner at the very end of the homepage, right before
// the footer. Heading/subtext/button are editable from /admin/homepage →
// Content tab (see lib/homepage.ts's CtaBannerSection / DEFAULT_SECTIONS.ctaBanner).
export default async function CtaBanner() {
  const { sections } = await getHomepageContent();
  const s = sections.ctaBanner;

  return (
    <section className="py-14 sm:py-16 bg-bosphorus-sky">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="relative overflow-hidden rounded-2xl bg-bosphorus-navy px-6 py-8 sm:px-10 sm:py-10 shadow-xl shadow-black/15 border border-white/10">
          {/* Subtle gold nautical watermarks */}
          <div className="pointer-events-none absolute -left-10 -bottom-10 h-56 w-56 opacity-10">
            <svg viewBox="0 0 100 100" fill="none" stroke="#E5A93C" strokeWidth="2" className="h-full w-full">
              <path d="M10 70q40-20 80 0M10 82q40-20 80 0M50 70V15M42 22c4-6 12-6 16 0" />
            </svg>
          </div>
          <div className="pointer-events-none absolute -right-10 -top-10 h-56 w-56 opacity-5">
            <svg viewBox="0 0 100 100" fill="none" stroke="#E5A93C" strokeWidth="2" className="h-full w-full">
              <path d="M10 90h80M20 90V50M35 90V30M50 90V15M65 90V40M80 90V60" />
            </svg>
          </div>

          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
            {/* Left Content */}
            <div className="flex items-center gap-4 sm:gap-5">
              {/* Line-art boat icon */}
              <div className="hidden sm:flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-white/10 text-bosphorus-gold border border-white/15">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.75"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-6 w-6"
                >
                  <path d="M3 17h18l-2 4H5l-2-4Z" />
                  <path d="M5 17V9l7-4 7 4v8" />
                  <path d="M12 5v12" />
                </svg>
              </div>

              <div>
                <h2 className="font-display text-xl sm:text-2xl font-bold text-white tracking-tight">
                  {s.heading}
                </h2>
                <p className="mt-1 text-xs text-white/70">{s.subtext}</p>
              </div>
            </div>

            {/* Right Action Button */}
            <a
              href={s.buttonHref}
              className="group inline-flex shrink-0 items-center justify-center gap-2 rounded-lg bg-bosphorus-gold px-7 py-3 text-xs font-bold uppercase tracking-wider text-[#081827] shadow-md transition-all hover:opacity-90 hover:shadow-lg hover:-translate-y-0.5"
            >
              <span>{s.buttonText}</span>
              <span className="transition-transform group-hover:translate-x-1">→</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
