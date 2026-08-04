import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: {
          950: "#0E1013",
          900: "#14171C",
          800: "#1B1F26",
          700: "#262B34",
          600: "#383F4B",
        },
        canvas: {
          50: "#F7F8FA",
          100: "#EEF0F3",
          200: "#E2E5EA",
        },
        brand: {
          400: "#F7B955",
          500: "#F5A623",
          600: "#DB8F14",
        },
        teal: {
          400: "#2DD4BF",
          500: "#14B8A6",
          600: "#0D9488",
        },
        coral: {
          400: "#FB7185",
          500: "#EF4444",
        },
      },
      fontFamily: {
        display: ["var(--font-manrope)", "sans-serif"],
        sans: ["var(--font-inter)", "sans-serif"],
      },
      boxShadow: {
        card: "0 1px 2px rgba(14,16,19,0.04), 0 1px 12px rgba(14,16,19,0.05)",
      },
      borderRadius: {
        xl2: "1.25rem",
      },
    },
  },
  plugins: [],
};
export default config;
