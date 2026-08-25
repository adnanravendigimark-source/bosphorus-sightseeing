"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { NavLink } from "@/lib/homepage";

// Desktop nav links — a client component so it can read the real current
// route via usePathname() and mark the matching link active. Header.tsx
// itself is a Server Component (it fetches CMS content), so this logic
// can't live there directly; a hardcoded "Home is always active" check
// would be wrong on every other page.
export default function HeaderNav({ links }: { links: NavLink[] }) {
  const pathname = usePathname();

  return (
    <nav className="hidden items-center gap-8 md:flex">
      {links.map((link) => {
        // Hash links (e.g. "/#tours") only ever match on the homepage —
        // treat them as inactive elsewhere rather than false-matching via
        // startsWith("/").
        const isActive = link.href.includes("#")
          ? pathname === "/" && link.href === "/#tours"
          : link.href === "/"
            ? pathname === "/"
            : pathname.startsWith(link.href);

        return (
          <Link
            key={link.href + link.label}
            href={link.href}
            aria-current={isActive ? "page" : undefined}
            className={`relative py-1 text-[14px] font-medium transition-colors ${
              isActive
                ? "font-semibold text-bosphorus-gold after:absolute after:bottom-[-6px] after:left-0 after:right-0 after:h-[2px] after:rounded-full after:bg-bosphorus-gold"
                : "text-bosphorus-navy hover:text-bosphorus-gold"
            }`}
          >
            {link.label}
          </Link>
        );
      })}
    </nav>
  );
}
