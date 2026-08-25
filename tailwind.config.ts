import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Bosphorus Navy & Gold palette
        stone: {
          // Warm Ivory — main background
          50: "#F7F4EC",
          // Charcoal — body text
          900: "#252A2D",
        },
        gold: {
          // Bosphorus Gold tints/shades — highlights, active links, prices
          400: "rgb(var(--color-gold-400) / <alpha-value>)",
          500: "#D9A441",
          600: "#BD8A2E",
        },
        // Deep Ottoman Blue — secondary sections
        ottoman: {
          900: "#123F63",
        },
        bosphorus: {
          // Main brand, header, CTA, footer (admin-overridable via CSS vars)
          navy: "rgb(var(--color-bosphorus-navy) / <alpha-value>)",
          // Highlights, active links, prices (admin-overridable via CSS vars)
          gold: "rgb(var(--color-bosphorus-gold) / <alpha-value>)",
          // Body text (admin-overridable via CSS vars)
          charcoal: "rgb(var(--color-bosphorus-charcoal) / <alpha-value>)",
          // Warm Ivory — main background
          ivory: "#F7F4EC",
          // Soft Sky — light sections/cards
          sky: "#E5EEF3",
          // Warm Sand — borders and subtle backgrounds
          sand: "#DDD2BF",
        },
        navy: {
          // Bosphorus Navy — main brand, header, CTA, footer
          900: "#082B4C",
        },
      },
      fontFamily: {
        display: ["var(--font-display)", "Cormorant Garamond", "Georgia", "ui-serif", "serif"],
        body: ["system-ui", "-apple-system", "sans-serif"],
      },
      backgroundImage: {
        // Soft radial wash used behind the hero — retuned to Navy/Gold so
        // it works with the new palette.
        mosaic:
          "radial-gradient(circle at 20% 20%, rgba(217,164,65,0.20) 0, transparent 40%), radial-gradient(circle at 80% 0%, rgba(18,63,99,0.30) 0, transparent 40%), radial-gradient(circle at 50% 80%, rgba(8,43,76,0.30) 0, transparent 45%)",
      },
    },
  },
  plugins: [],
};
export default config;
