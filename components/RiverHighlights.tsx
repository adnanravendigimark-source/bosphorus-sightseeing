import { getHomepageContent } from "@/lib/homepage";

// Content editable from /admin/homepage → Content tab (see
// lib/homepage.ts's HighlightsSection / DEFAULT_SECTIONS.highlights).
export default async function RiverHighlights() {
  const { sections } = await getHomepageContent();
  const s = sections.highlights;

  return (
    <section className="bg-[#081827] border-t border-b border-white/10 py-20 text-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#E5A93C]">
          {s.eyebrow}
        </span>
        <h2 className="mt-2 font-display text-3xl sm:text-4xl font-bold tracking-tight text-white">{s.heading}</h2>
        <p className="mt-3 max-w-2xl text-base text-white/70 leading-relaxed">{s.subheading}</p>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {s.cards.map((item) => (
            <div
              key={item.title}
              className="group rounded-2xl border border-white/10 bg-white/[0.04] p-7 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#E5A93C]/50 hover:bg-white/[0.08]"
            >
              <span className="text-3xl sm:text-4xl">{item.icon}</span>
              <h3 className="mt-4 font-display text-xl font-bold text-white group-hover:text-[#E5A93C] transition-colors">{item.title}</h3>
              <p className="mt-2 text-sm text-white/70 leading-relaxed">{item.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
