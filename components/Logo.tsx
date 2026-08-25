import Link from "next/link";
import Image from "next/image";

// Inline vector mark of a modern luxury yacht / cruise boat with wake and sail lines.
function YachtMarkSvg({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 50" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      {/* Triangular Mast / Rigging */}
      <path d="M32 4L16 26H48L32 4Z" stroke="#FFFFFF" strokeWidth="2" strokeLinejoin="round" fill="#FFFFFF" fillOpacity="0.1" />
      <line x1="32" y1="4" x2="32" y2="26" stroke="#FFFFFF" strokeWidth="1.8" />
      <line x1="23" y1="16" x2="41" y2="16" stroke="#FFFFFF" strokeWidth="1.2" />
      {/* Yacht Hull */}
      <path d="M6 33L14 26H50L58 33L54 38H10L6 33Z" stroke="#FFFFFF" strokeWidth="2" strokeLinejoin="round" fill="#FFFFFF" fillOpacity="0.15" />
      {/* Hull Accent Stripe */}
      <line x1="18" y1="32" x2="46" y2="32" stroke="#E5A83B" strokeWidth="1.6" strokeLinecap="round" />
      {/* Water / Wake lines */}
      <path d="M2 42C12 44.5 24 44.5 36 42C44 40.5 54 41.5 62 43.5" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" />
      <path d="M10 47C18 48.5 28 48.5 38 47C44 46 50 46.5 54 47.5" stroke="#E5A83B" strokeWidth="1.6" strokeLinecap="round" />
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
          <span className="block font-sans text-[10px] sm:text-xs font-semibold tracking-[0.25em] text-[#E5A83B]">
            {line2 || "BOAT CRUISE —"}
          </span>
        </div>
      </Link>
    );
  }

  const image = (
    <span className="relative block h-10 w-12 shrink-0 overflow-hidden transition-transform duration-300 group-hover:scale-105">
      {customSrc ? (
        <Image src={customSrc} alt={alt} fill priority sizes="48px" className="object-contain" />
      ) : (
        <YachtMarkSvg className="h-full w-full" />
      )}
    </span>
  );

  const wordmark = (
    <div className="flex min-w-0 flex-col justify-center">
      <span
        className={`block truncate font-display text-xl sm:text-[1.35rem] font-bold tracking-[0.08em] leading-none ${
          isDark ? "text-white" : "text-stone-900"
        }`}
      >
        {line1 || "BOSPHORUS"}
      </span>
      <span className="block truncate font-sans text-[10px] sm:text-[11px] font-semibold tracking-[0.22em] text-[#E5A83B] leading-none mt-1">
        {line2 || "BOAT CRUISE —"}
      </span>
    </div>
  );

  return (
    <Link href="/" className={`group inline-flex min-w-0 items-center gap-3 ${className}`}>
      {image}
      {wordmark}
    </Link>
  );
}
