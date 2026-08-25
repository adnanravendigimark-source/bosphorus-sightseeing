import Link from "next/link";
import Image from "next/image";

// Inline vector mark (mosque dome + minaret on the shore, a sightseeing
// boat on the water below) — drawn directly in code so the brand never
// depends on an external logo file. An admin-uploaded image (the `src`
// prop) always overrides this default mark when one is set.
function MarkSvg({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      {/* Waterline */}
      <path
        d="M3 41c3.5-1.8 7-1.8 10.5 0s7 1.8 10.5 0 7-1.8 10.5 0 7 1.8 10.5 0"
        stroke="#D9A441"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      {/* Mosque dome */}
      <path
        d="M6 22c0-5.5 4-9 9-9s9 3.5 9 9z"
        fill="#D9A441"
        fillOpacity="0.28"
        stroke="#D9A441"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <line x1="15" y1="13" x2="15" y2="9" stroke="#D9A441" strokeWidth="1.3" strokeLinecap="round" />
      <circle cx="15" cy="7.5" r="1.1" fill="#D9A441" />
      {/* Minaret with crescent finial */}
      <path
        d="M35 22V11l2-3 2 3v11"
        fill="#D9A441"
        fillOpacity="0.28"
        stroke="#D9A441"
        strokeWidth="1.4"
        strokeLinejoin="round"
      />
      <path d="M35.3 6.8a1.7 1.7 0 1 0 2.1 2.4" stroke="#D9A441" strokeWidth="1.1" fill="none" strokeLinecap="round" />
      {/* Sightseeing boat hull */}
      <path
        d="M4 34.5 7 29c5.5-2 11-3 17-3s11.5 1 17 3l3 5.5c-6.5 3-13.5 4.5-20 4.5s-13.5-1.5-20-4.5z"
        fill="#D9A441"
        fillOpacity="0.22"
        stroke="#D9A441"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
      {/* Boat cabin roof */}
      <path
        d="M12 29v-5c4-2 8-3 12-3s8 1 12 3v5"
        fill="#D9A441"
        fillOpacity="0.15"
        stroke="#D9A441"
        strokeWidth="1.3"
        strokeLinejoin="round"
      />
      {/* Cabin windows */}
      <circle cx="17" cy="26.5" r="1.4" fill="#D9A441" />
      <circle cx="24" cy="25.7" r="1.4" fill="#D9A441" />
      <circle cx="31" cy="26.5" r="1.4" fill="#D9A441" />
    </svg>
  );
}

export default function Logo({
  className = "",
  variant = "compact",
  theme = "light",
  src = "",
  alt = "Bosphorus Boat Cruise Tickets",
  line1 = "Bosphorus",
  line2 = "Boat Cruise",
}: {
  className?: string;
  variant?: "compact" | "stacked";
  theme?: "light" | "dark";
  src?: string;
  alt?: string;
  line1?: string;
  line2?: string;
}) {
  const isDark = theme === "dark";
  const customSrc = src?.trim();

  if (variant === "stacked") {
    return (
      <Link href="/" className={`inline-flex flex-col items-center gap-3.5 ${className}`}>
        <span className="relative block h-16 w-16 sm:h-20 sm:w-20 transition-transform duration-300 hover:scale-105">
          {customSrc ? (
            <Image src={customSrc} alt={alt} fill sizes="80px" className="object-contain" priority />
          ) : (
            <MarkSvg className="h-full w-full" />
          )}
        </span>
        <div className="text-center leading-tight">
          <span
            className={`block font-display text-2xl sm:text-3xl font-bold italic tracking-tight ${
              isDark ? "text-white" : "text-stone-900"
            }`}
          >
            {line1}
          </span>
          <span className="block font-sans text-xs font-extrabold uppercase tracking-[0.32em] bg-gradient-to-r from-[#D9A441] via-[#E0B669] to-[#D9A441] bg-clip-text text-transparent">
            {line2}
          </span>
        </div>
      </Link>
    );
  }

  const image = (
    <span className="relative block h-9 w-9 shrink-0 overflow-hidden sm:h-10 sm:w-10 transition-transform duration-300 group-hover:scale-105">
      {customSrc ? (
        <Image src={customSrc} alt={alt} fill priority sizes="40px" className="object-contain" />
      ) : (
        <MarkSvg className="h-full w-full" />
      )}
    </span>
  );

  const wordmark = (
    <span className="flex min-w-0 items-center gap-3">
      <span
        className={`h-8 w-[1.5px] shrink-0 rounded-full ${
          isDark
            ? "bg-gradient-to-b from-[#D9A441]/80 to-[#123F63]/30"
            : "bg-gradient-to-b from-[#123F63]/60 to-[#D9A441]/30"
        }`}
        aria-hidden="true"
      />
      <div className="flex min-w-0 flex-col leading-[1.08]">
        <span
          className={`block truncate font-display text-[1.4rem] sm:text-[1.5rem] font-bold italic tracking-tight ${
            isDark ? "text-white" : "text-stone-900"
          }`}
        >
          {line1}
        </span>
        <span className="block truncate font-sans text-[10px] font-extrabold uppercase tracking-[0.32em] bg-gradient-to-r from-[#D9A441] via-[#E0B669] to-[#D9A441] bg-clip-text text-transparent">
          {line2}
        </span>
      </div>
    </span>
  );

  // min-w-0 lets the wordmark shrink/truncate on narrow screens instead of
  // forcing the header to overflow (or collide with the mobile hamburger)
  // if an admin-entered site name is long — see MobileNav.tsx.
  return (
    <Link href="/" className={`group inline-flex min-w-0 items-center gap-2 ${className}`}>
      {image}
      {wordmark}
    </Link>
  );
}
