import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"], // usamos next-themes con atributo class
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        midnight: "#0A245F",
        deepblue: "#143A8C",
        brand: {
          bg: "#0A245F",
          text: "#0F172A",
          muted: "#6B7280",
          gray: "#E6EAF2",
          white: "#FFFFFF",
        },
      },
      fontFamily: {
        display: ["var(--font-display)", "serif"],
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
      },
      boxShadow: {
        soft: "0 8px 30px rgba(10,36,95,0.08)",
      },
      container: {
        center: true,
        padding: {
          DEFAULT: "1rem",
          sm: "1.25rem",
          md: "1.5rem",
          lg: "2rem",
          xl: "2.5rem",
        },
      },
      borderColor: {
        DEFAULT: "color-mix(in oklab, #000 8%, transparent)",
      },
    },
  },
  plugins: [],
};

export default config;
