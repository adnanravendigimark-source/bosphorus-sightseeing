import Link from "next/link";
import Logo from "./Logo";
import MobileNav from "./MobileNav";
import { getSiteChrome } from "@/lib/homepage";

// Navbar — logo, nav links, and the CTA button are all CMS-editable from
// /admin/homepage → Content tab (see lib/homepage.ts's HeaderContent).
// Styled in deep maritime navy with warm gold active states and CTA.
export default async function Header() {
  const { header } = await getSiteChrome();
  return (
    <header className="sticky top-0 z-50 h-20 border-b border-white/10 bg-[#081827]/90 backdrop-blur-md">
      <div className="mx-auto flex h-full max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Logo
          src={header.logoImage}
          alt={header.logoAlt}
          line1={header.logoLine1}
          line2={header.logoLine2}
          theme="dark"
        />

        <nav className="hidden items-center gap-7 text-sm font-medium text-white/80 md:flex">
          {header.navLinks.map((link) => {
            const isHome = link.href === "/" || link.label.toLowerCase() === "home";
            return (
              <Link
                key={link.href + link.label}
                href={link.href}
                className={`transition-colors duration-200 py-1 ${
                  isHome
                    ? "font-semibold text-[#E5A93C] border-b-2 border-[#E5A93C]"
                    : "hover:text-[#E5A93C]"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-3">
          <Link
            href={header.ctaHref || "/#tours"}
            className="hidden items-center gap-2 rounded-md bg-[#E5A83B] px-5 py-2.5 text-xs font-bold uppercase tracking-wider text-[#081827] shadow-md shadow-[#E5A83B]/20 transition-all duration-300 hover:bg-[#D99B26] hover:scale-[1.02] md:inline-flex"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
              <rect x="3" y="6" width="18" height="12" rx="2" />
              <line x1="7" y1="12" x2="7.01" y2="12" />
              <line x1="11" y1="12" x2="13" y2="12" />
              <line x1="17" y1="12" x2="17.01" y2="12" />
            </svg>
            {header.ctaText || "BOOK TICKETS"}
          </Link>
          <MobileNav navLinks={header.navLinks} ctaText={header.ctaText || "BOOK TICKETS"} ctaHref={header.ctaHref || "/#tours"} />
        </div>
      </div>
    </header>
  );
}

