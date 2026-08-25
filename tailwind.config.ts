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
          // Bosphorus Gold highlights, active links, prices
          400: "#E5BA5A",
          500: "#D9A441",
          600: "#C48E2B",
        },
        // Deep Ottoman Blue — secondary sections
        ottoman: {
          900: "#123F63",
        },
        bosphorus: {
          navy: "rgb(var(--color-bosphorus-navy) / <alpha-value>)",
          ottoman: "#123F63",
          gold: "rgb(var(--color-bosphorus-gold) / <alpha-value>)",
          charcoal: "rgb(var(--color-bosphorus-charcoal) / <alpha-value>)",
          ivory: "#F7F4EC",
          sky: "#E5EEF3",
          sand: "#DDD2BF",
        },
        navy: {
          900: "#082B4C",
          800: "#123F63",
        },
      },
      fontFamily: {
        display: ["var(--font-display)", "Cormorant Garamond", "Georgia", "ui-serif", "serif"],
        script: ["var(--font-script)", "Alex Brush", "cursive"],
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
