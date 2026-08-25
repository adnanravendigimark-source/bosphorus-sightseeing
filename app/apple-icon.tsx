import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg, #082B4C 0%, #123F63 100%)",
          borderRadius: "40px",
          border: "4px solid #D9A441",
        }}
      >
        <svg width="128" height="128" viewBox="0 0 48 48" fill="none">
          {/* Waterline */}
          <path
            d="M3 41c3.5-1.8 7-1.8 10.5 0s7 1.8 10.5 0 7-1.8 10.5 0 7 1.8 10.5 0"
            stroke="#D9A441"
            strokeWidth="1.8"
            strokeLinecap="round"
          />
          {/* Mosque dome */}
          <path d="M6 22c0-5.5 4-9 9-9s9 3.5 9 9z" fill="#D9A441" fillOpacity="0.3" stroke="#D9A441" strokeWidth="1.8" strokeLinejoin="round" />
          <line x1="15" y1="13" x2="15" y2="9" stroke="#D9A441" strokeWidth="1.5" strokeLinecap="round" />
          <circle cx="15" cy="7.5" r="1.3" fill="#D9A441" />
          {/* Minaret with crescent finial */}
          <path d="M35 22V11l2-3 2 3v11" fill="#D9A441" fillOpacity="0.3" stroke="#D9A441" strokeWidth="1.8" strokeLinejoin="round" />
          <path d="M35.3 6.8a1.9 1.9 0 1 0 2.3 2.6" stroke="#D9A441" strokeWidth="1.3" fill="none" strokeLinecap="round" />
          {/* Sightseeing boat hull */}
          <path
            d="M4 34.5 7 29c5.5-2 11-3 17-3s11.5 1 17 3l3 5.5c-6.5 3-13.5 4.5-20 4.5s-13.5-1.5-20-4.5z"
            fill="#D9A441"
            fillOpacity="0.28"
            stroke="#D9A441"
            strokeWidth="1.9"
            strokeLinejoin="round"
          />
          {/* Boat cabin roof */}
          <path d="M12 29v-5c4-2 8-3 12-3s8 1 12 3v5" fill="#D9A441" fillOpacity="0.18" stroke="#D9A441" strokeWidth="1.6" strokeLinejoin="round" />
          {/* Cabin windows */}
          <circle cx="17" cy="26.5" r="1.6" fill="#D9A441" />
          <circle cx="24" cy="25.7" r="1.6" fill="#D9A441" />
          <circle cx="31" cy="26.5" r="1.6" fill="#D9A441" />
        </svg>
      </div>
    ),
    { ...size }
  );
}
