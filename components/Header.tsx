import Logo from "./Logo";
import MobileNav from "./MobileNav";
import HeaderNav from "./HeaderNav";
import { getHomepageContent } from "@/lib/homepage";

// Navbar styled in dark maritime navy (#081827) to match the reference design.
export default async function Header() {
  const content = await getHomepageContent();
  const header = content.header;
  const ctaText = header.ctaText || header.bookNowText || "BOOK TICKETS";
  const rawCtaHref = header.ctaHref || "#tours";
  const ctaHref = rawCtaHref.startsWith("#") ? `/${rawCtaHref}` : rawCtaHref;

  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/10 bg-[#082B4C]/95 backdrop-blur-md">
      <div className="relative z-10 mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-8">
        <Logo
          theme="dark"
          src={header.logoImage}
          alt={header.logoAlt}
          line1={header.logoLine1}
          line2={header.logoLine2}
        />

        <HeaderNav links={header.navLinks} />

        <div className="flex items-center gap-3">
          <a
            href={ctaHref}
            className="hidden items-center gap-2 rounded-md bg-[#D9A441] px-5 py-2.5 text-xs font-bold uppercase tracking-wider text-[#082B4C] shadow-md shadow-[#D9A441]/20 transition-all duration-300 hover:bg-[#C48E2B] hover:scale-[1.02] md:inline-flex"
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-4 w-4 shrink-0 text-[#082B4C]"
            >
              <rect x="3" y="6" width="18" height="12" rx="2" />
              <line x1="7" y1="12" x2="7.01" y2="12" />
              <line x1="11" y1="12" x2="13" y2="12" />
              <line x1="17" y1="12" x2="17.01" y2="12" />
            </svg>
            <span>{ctaText.toUpperCase()}</span>
          </a>
          <MobileNav navLinks={header.navLinks} ctaText={ctaText} ctaHref={ctaHref} />
        </div>
      </div>
    </header>
  );
}
