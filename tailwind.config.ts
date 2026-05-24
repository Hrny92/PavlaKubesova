import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        poppins: ["var(--font-poppins)", "system-ui", "sans-serif"],
      },
      colors: {
        gold: "#C9A84C",
        "gold-light": "#D4B56A",
        navy: "#0C0E1A",
        "navy-2": "#111525",
        "navy-3": "#141828",
      },
      fontSize: {
        // Fluid hero heading
        "hero": ["clamp(3.5rem, 9vw, 9rem)", { lineHeight: "1.05", fontWeight: "800" }],
      },
    },
  },
  plugins: [],
};

export default config;
