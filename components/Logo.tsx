import Link from "next/link";
import Image from "next/image";

// Inline vector mark of a modern luxury yacht / cruise boat with wake and sail lines.
function YachtMarkSvg({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 100 80" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      {/* Triangular Mast & Rigging */}
      <path d="M48 6L28 38H68L48 6Z" stroke="#FFFFFF" strokeWidth="2.8" strokeLinejoin="round" fill="#FFFFFF" fillOpacity="0.08" />
      <line x1="48" y1="6" x2="48" y2="38" stroke="#FFFFFF" strokeWidth="2.8" />
      <line x1="34" y1="24" x2="62" y2="24" stroke="#FFFFFF" strokeWidth="2.2" />
      {/* Bridge / Upper Cabin */}
      <path d="M26 42L46 36L72 38L62 44L26 44Z" stroke="#FFFFFF" strokeWidth="2.5" fill="#FFFFFF" fillOpacity="0.15" />
      {/* Lower Hull */}
      <path d="M20 54L34 45H70L90 41L78 54L30 55L20 54Z" fill="#FFFFFF" stroke="#FFFFFF" strokeWidth="2.5" strokeLinejoin="round" />
      {/* Double Wave Lines */}
      <path d="M12 62C18 65 26 65 32 62C38 59 46 59 52 62C58 65 66 65 72 62C78 59 84 60 90 62" stroke="#FFFFFF" strokeWidth="3" strokeLinecap="round" />
      <path d="M12 69C18 72 26 72 32 69C38 66 46 66 52 69C58 72 66 72 72 69C78 66 84 67 90 69" stroke="#FFFFFF" strokeWidth="3" strokeLinecap="round" />
    </svg>
  );
}

export default function Logo({
  className = "",
  variant = "compact",
  theme = "dark",
  src = "",
  alt = "Bosphorus Boat Cruise Tickets",
  line1 = "BOSPHORUS",
  line2 = "BOAT CRUISE —",
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
      <Link href="/" className={`inline-flex flex-col items-center gap-2 ${className}`}>
        <span className="relative block h-14 w-16 transition-transform duration-300 hover:scale-105">
          {customSrc ? (
            <Image src={customSrc} alt={alt} fill sizes="80px" className="object-contain" priority />
          ) : (
            <YachtMarkSvg className="h-full w-full" />
          )}
        </span>
        <div className="text-center leading-tight">
          <span
            className={`block font-display text-xl sm:text-2xl font-bold tracking-[0.1em] ${
              isDark ? "text-white" : "text-stone-900"
            }`}
          >
            {line1 || "BOSPHORUS"}
          </span>
          <span className="block font-sans text-[10px] sm:text-xs font-semibold tracking-[0.25em] text-[#D9A441]">
            {line2 || "BOAT CRUISE —"}
          </span>
        </div>
      </Link>
    );
  }

  const image = (
    <span className="relative block h-11 w-14 shrink-0 overflow-hidden transition-transform duration-300 group-hover:scale-105">
      {customSrc ? (
        <Image src={customSrc} alt={alt} fill priority sizes="56px" className="object-contain" />
      ) : (
        <YachtMarkSvg className="h-full w-full" />
      )}
    </span>
  );

  const wordmark = (
    <div className="flex min-w-0 flex-col justify-center">
      <span
        className={`block truncate font-display text-xl sm:text-[1.4rem] font-bold tracking-[0.08em] leading-none ${
          isDark ? "text-white" : "text-stone-900"
        }`}
      >
        {line1 || "BOSPHORUS"}
      </span>
      <span className="block truncate font-sans text-[10px] sm:text-[11px] font-semibold tracking-[0.22em] text-[#D9A441] leading-none mt-1">
        {line2 || "BOAT CRUISE —"}
      </span>
    </div>
  );

  return (
    <Link href="/" className={`group inline-flex min-w-0 items-center gap-2.5 ${className}`}>
      {image}
      {wordmark}
    </Link>
  );
}
